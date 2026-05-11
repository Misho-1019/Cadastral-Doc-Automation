# Cadastral Document Automation

Automates the generation of Bulgarian notarial sale contracts from cadastral PDF documents and structured input data.

## Features

- Extracts property data from cadastral PDF
- Merges extracted data with user-provided information
- Automatically formats:
  - Dates (Bulgarian wording)
  - Monetary values (including cents)
  - Addresses (including Roman numerals and wording)
- Generates a ready-to-use DOCX contract based on a legal template

## Tech Stack

- Node.js + Express
- TypeScript
- docxtemplater (DOCX generation)
- React + Vite (frontend)
- Tailwind CSS

## How to Run

### Backend

```bash
npm install
npm run dev