import { createClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const encoder = new TextEncoder();
  const supabase = createClient();

  // you can use any pub/sub system to notify the client.
  // here we use Supabase Realtime to notify the client when a new note is added without exposing supabase anon key.
  const channel = supabase
    .channel("notes")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "notes" },
      () => {
        writer.write(encoder.encode(`data: ${new Date().toISOString()}\n\n`));
        supabase.removeChannel(channel);
      }
    )
    .subscribe();

  setInterval(() => {
    writer.write(encoder.encode(`: heartbeat\n\n`));
  }, 30_000); // 30 seconds

  writer.write(encoder.encode(`: heartbeat\n\n`));

  return new NextResponse(stream.readable, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/event-stream; charset=utf-8",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
      "Content-Encoding": "none",
    },
  });
}
