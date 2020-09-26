import path from "path";
import fs from "fs";

export default function getFileContent(fileName) {
    const __dirname = fs.realpathSync('.');
    return fs.readFileSync(path.resolve(__dirname, fileName));
}