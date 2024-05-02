Example of how to use SSE with Next.js. In this example I opted to use supabase as the pub/sub server sync edge functions (which don't have timeout limits) don't share the same EventEmitter instance as the rest of the serverless functions.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.