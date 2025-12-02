import { createServer } from "http";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = 6868;

// Path to the built userscript file (relative to project root)
const builtScriptPath = resolve(__dirname, "../kickstiny.user.js");

const server = createServer((req, res) => {
  if (req.url.startsWith("/index.js")) {
    // Check if the built file exists
    if (!existsSync(builtScriptPath)) {
      res.writeHead(404, {
        "Content-Type": "text/plain; charset=utf-8",
      });
      res.end(
        'Error: kickstiny.user.js not found. Please run "npm run dev" first.',
      );
      return;
    }

    try {
      const content = readFileSync(builtScriptPath, "utf-8");
      res.writeHead(200, {
        "Content-Type": "text/javascript; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      });
      res.end(content);
    } catch (error) {
      res.writeHead(500, {
        "Content-Type": "text/plain; charset=utf-8",
      });
      res.end("Error reading file: " + error.message);
    }
  } else {
    res.writeHead(404, {
      "Content-Type": "text/plain; charset=utf-8",
    });
    res.end("Not found");
  }
});

server.listen(PORT, () => {
  console.log(`Development server running at http://localhost:${PORT}/`);
  console.log(`Serving: ${builtScriptPath}`);
});
