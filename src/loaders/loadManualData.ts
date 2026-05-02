import fs from "fs";
import path from "path";

export function loadManualData(filePath: string) {
    const absolutePath = path.resolve(filePath);

    if (!fs.existsSync(absolutePath)) {
        throw new Error(`Manual data file not found at: ${absolutePath}`);
    }

    const fileContent = fs.readFileSync(absolutePath, 'utf-8');

    try {
        return JSON.parse(fileContent);
    } catch (err) {
        throw new Error("Invalid JSON format in manual data file.");
    }
}