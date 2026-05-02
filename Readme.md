# Cadastral Document Automation (v1)

This project generates a notarial act DOCX document based on:
- cadastral PDF input
- manually provided deal data (JSON)

## How it works

Pipeline:

PDF → text extraction → normalization → parsing →  
+ manual JSON input → calculations → derived data → validation → DOCX generation

## Requirements

- Node.js (v18+ recommended)

## Install

```bash
npm install