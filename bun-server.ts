// bun-server.ts
import { serve } from "bun";
import { join } from "path";
import { readFile } from "fs/promises";

const root = "./src";

serve({
  port: 7701,
  async fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname === "/" ? "/index.html" : url.pathname;

    try {
      const file = await readFile(join(root, path));
      const ext = path.split(".").pop();
      const type =
        {
          html: "text/html",
          css: "text/css",
          js: "application/javascript",
          png: "image/png",
          jpg: "image/jpeg",
          svg: "image/svg+xml",
        }[ext || ""] || "text/plain";

      return new Response(file, {
        headers: { "Content-Type": type },
      });
    } catch {
      return new Response("404 Not Found", { status: 404 });
    }
  },
});
