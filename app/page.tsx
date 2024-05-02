import { createClient } from "@/lib/supabase";
import styles from "./page.module.css";
import SSEComponent from "./sse";

export default async function Home() {
  async function sendEvent() {
    "use server";
    const supabase = createClient();
    await supabase.from("notes").insert({ title: new Date().toISOString() });
  }

  return (
    <main className={styles.main}>
      <SSEComponent />

      <form action={sendEvent}>
        <button type="submit">Send</button>
      </form>
    </main>
  );
}
