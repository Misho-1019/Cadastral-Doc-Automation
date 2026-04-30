import { extractPdfText } from "./extract/extractPdfText";

async function main() {
    const text = await extractPdfText('./input/sample.pdf');

    console.log("---- EXTRACTED TEXT ----");
    console.log(text);
}

main().catch(error => {
    console.error("Failed to extract PDF text:", error);
});