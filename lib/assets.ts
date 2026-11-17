import fs from "fs";
import path from "path";

const portraitFiles = ["portrait.jpg", "portrait.jpeg", "portrait.png", "portrait.webp"];

export function getLocalAssets() {
  const assetsDir = path.join(process.cwd(), "public", "assets");
  const portrait = portraitFiles.find((file) => fs.existsSync(path.join(assetsDir, file)));
  return {
    portraitSrc: portrait ? `/assets/${portrait}` : null,
    resumeReady: fs.existsSync(path.join(process.cwd(), "public", "resume.pdf")),
  };
}
