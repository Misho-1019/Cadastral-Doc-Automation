# 🏠 Cadastral Document Automation

### Full-Stack Cadastral PDF Parsing & Legal DOCX Generation Platform

A production-oriented full-stack application designed to generate **Bulgarian property transaction documents** from cadastral PDF data and structured manual input.

This project focuses on **real-world document automation, cadastral data extraction, legal-template generation, validation, and guided user input** — not just file upload or form handling.

---

## 🎯 Project Purpose

Preparing property transaction documents often requires manually copying information from cadastral PDF files, combining it with seller and buyer details, formatting monetary values, and aligning everything with a legal document template.

**Cadastral Document Automation** streamlines this workflow by:

- extracting cadastral property data from uploaded PDF documents
- collecting required transaction details through a guided wizard form
- validating seller, buyer, payment, bank, and tax information
- formatting Bulgarian legal wording for dates, amounts, addresses, and signatures
- generating a completed DOCX document from a real legal template
- allowing the user to download the generated document immediately

The project was built to simulate a practical internal document-generation tool for real estate and legal workflows, where structured automation reduces repetitive manual work and improves consistency.

---

## 🚀 Core Features

### Cadastral PDF Processing

- Upload cadastral PDF documents from the frontend
- Extract raw text from the uploaded PDF
- Parse property-related cadastral information
- Map extracted PDF fields into legal-template variables
- Support parsed property details such as identifiers, address, area, floor, building, parcel, neighbouring properties, and cadastral scheme data

### Guided Document Wizard

- Multi-step React wizard form
- Step-by-step navigation for easier data entry
- PDF upload step with improved file-selection UX
- Seller and buyer information sections
- Contract, payment, bank, and tax evaluation sections
- Final review step before document generation
- Reset flow for generating another document after a successful download

### Bilingual Interface

- Bulgarian and English UI language switcher
- Translated wizard steps, buttons, labels, helper messages, and success screen
- Example-guided placeholders for important fields
- Bulgarian legal document generation based on the provided DOCX template

### DOCX Generation

- Legal DOCX template rendering with `docxtemplater`
- Template variable replacement using double-brace delimiters
- Merging of parsed cadastral data and manually entered form data
- Automatic formatting of prices, deposits, remaining amounts, and tax evaluation
- Bulgarian wording for monetary values and contract dates
- Signature-name formatting for seller and buyer
- Automatic browser download of the generated DOCX file

### Validation & UX

- Frontend step validation before moving through the wizard
- Backend required-field validation before DOCX generation
- Clear structured backend error responses for missing fields
- Duplicate-submit protection during document generation
- Temporary uploaded file cleanup in the main generation flow

---

## 🌐 Live Demo

- **Frontend:** _Add deployed frontend URL here_
- **Backend API:** _Add deployed backend URL here_

> ⚠️ Note:  
> This is a portfolio deployment.  
> Generated documents depend on the uploaded cadastral PDF structure and the provided manual form data.

---

## 🖼️ Screenshots

### 1️⃣ Home Page / Language Selection

![Home Page](views/home-page-placeholder.png)

### 2️⃣ PDF Upload Step

![PDF Upload Step](views/pdf-upload-placeholder.png)

### 3️⃣ Seller & Buyer Wizard Steps

![Seller Step](views/seller-step-placeholder.png)
![Buyer Step](views/buyer-step-placeholder.png)

### 4️⃣ Contract, Payment & Bank Details

![Contract Step](views/contract-step-placeholder.png)
![Payment Step](views/payment-step-placeholder.png)
![Bank Step](views/bank-step-placeholder.png)

### 5️⃣ Final Review & Generate Step

![Generate Step](views/generate-step-placeholder.png)

### 6️⃣ Success Screen / Generate Another Document

![Success Screen](views/success-screen-placeholder.png)

### 7️⃣ Generated DOCX Output

![Generated Document](views/generated-docx-placeholder.png)

---

## 🛠️ Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS v4
- JavaScript
- Bilingual translation object for BG/EN UI text

### Backend

- Node.js
- Express
- TypeScript
- Multer
- pdf-parse
- PizZip
- Docxtemplater
- TSX development runtime

### Document Generation

- DOCX legal template stored in `templates/template.docx`
- Double-brace template delimiters: `{{ field_name }}`
- Generated file returned as `generated-contract.docx`

---

## 🏗️ Architecture Overview

The application follows a client-server architecture with a dedicated document-generation pipeline.

### Client Layer

The React frontend handles the user-facing workflow:

- language selection
- PDF upload
- multi-step form navigation
- frontend required-field checks
- request creation using `FormData`
- generated DOCX download handling
- post-generation reset flow

### Backend API Layer

The Express backend exposes endpoints for PDF parsing and document generation. It receives multipart form data, validates the request, extracts PDF content, prepares template data, renders the DOCX file, and returns it to the frontend.

### Parsing & Mapping Layer

Backend utility modules separate the PDF-processing logic from the route handler:

- PDF text extraction
- cadastral text parsing
- mapping parsed cadastral values into template fields
- address formatting
- Bulgarian number, date, ordinal, and money wording

### Template Generation Layer

The final data object is passed into the DOCX template engine. The backend renders the legal template, writes the result to the output directory, and sends the completed document back to the user as a downloadable file.

This structure keeps the main route focused on orchestration while document-specific formatting and parsing logic remains isolated in utility modules.

---

## 🔄 Document Generation Flow

1. User selects Bulgarian or English interface language
2. User uploads a cadastral PDF file
3. User completes the wizard form with seller, buyer, contract, payment, bank, and tax details
4. Frontend validates each wizard step before allowing the user to continue
5. Frontend sends the PDF and form data to the backend as `multipart/form-data`
6. Backend extracts text from the cadastral PDF
7. Backend parses cadastral property data from the extracted text
8. Backend validates the manual form data
9. Backend formats monetary values, tax evaluation, contract date wording, addresses, and signature names
10. Backend merges cadastral data and manual form data into a final template object
11. Backend renders the DOCX legal template
12. Generated DOCX file is downloaded in the browser as `generated-contract.docx`
13. User can start another document through a clean reset flow

---

## 📄 Main API Endpoints

### Health Check

```txt
GET /
```

Returns a simple confirmation that the document generator server is running.

### Generate Document

```txt
POST /generate
```

Expected request format:

```txt
multipart/form-data
```

Required fields:

```txt
file: cadastral PDF file
data: JSON string containing the manual wizard form data
```

Successful response:

```txt
generated-contract.docx
```

### Upload & Parse PDF

```txt
POST /upload-pdf
```

Helper endpoint for uploading a PDF and returning parsed cadastral data as JSON. This is useful for development, debugging, and checking the extracted cadastral fields separately from the full DOCX generation flow.

---

## 🧾 Required Manual Data

The wizard collects the transaction-specific information that cannot be reliably extracted from the cadastral PDF alone:

- Seller name, EGN, ID card, issue date, and address
- Buyer name, EGN, ID card, issue date, and address
- Contract date
- Notary name
- Preliminary contract date
- Sale price
- Deposit amount
- Remaining amount
- Seller bank name
- Seller bank BIC
- Seller bank IBAN
- Tax evaluation

Example input formats:

```txt
Contract date: 02.04.2026
Sale price: 360000
Tax evaluation: 48 492,90
IBAN: BG 67 UNCR 4242 XXXX XXXX XX
```

---

## ✅ Validation

The frontend validates the current wizard step before allowing the user to continue.

Examples:

- A PDF file is required before leaving the upload step
- Seller name and seller EGN are required in the seller step
- Buyer name and buyer EGN are required in the buyer step
- Contract date and notary name are required in the contract step
- Sale price is required in the payment step
- Seller bank name and IBAN are required in the bank step
- Tax evaluation is required in the tax step

The backend performs a stricter validation pass before generating the DOCX document. If required data is missing, it returns a structured response:

```json
{
    "error": "Validation failed",
    "fields": {
        "seller_name": "Seller name is required."
    }
}
```

This protects the DOCX generation pipeline from incomplete template data and makes errors easier to handle on the frontend.

---

## 📁 Project Structure

```txt
backend/
  server.ts
  types/
    generateRequest.ts
    templateData.ts
  utils/
    extractPdfText.ts
    parseCadastralPdf.ts
    mapPdfToTemplateData.ts
    validateTemplateData.ts
    formatMoney.ts
    dateToWordsBG.ts
    formatAddressBG.ts
    numberToWords.ts
    ordinalWords.ts
    toTitleCaseBG.ts
  templates/
    template.docx
  uploads/
  output/

frontend/
  src/
    App.jsx
    i18n.js
    main.jsx
    index.css
    App.css
  public/
  vite.config.js
```

---

## ▶️ Running Locally

### 1️⃣ Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```txt
http://localhost:3030
```

### 2️⃣ Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

The frontend is configured to send document-generation requests to:

```txt
http://localhost:3030/generate
```

---

## 🧪 Manual Testing Checklist

### Bulgarian Flow

- Select BG interface
- Upload a valid cadastral PDF
- Complete all wizard steps with Bulgarian example-style data
- Generate the DOCX file
- Confirm the file downloads as `generated-contract.docx`
- Open the document and check key legal paragraphs

### English Flow

- Select EN interface
- Repeat the same PDF upload and form flow
- Confirm frontend labels, placeholders, navigation, and success messages display in English
- Generate and download the DOCX file
- Verify the generated legal document still uses the Bulgarian template correctly

### Key Document Checks

- Seller and buyer names are inserted correctly
- Property description matches the cadastral PDF data
- Contract date and date wording are correct
- Sale price, deposit, remaining amount, and tax evaluation are formatted correctly
- Bank details are inserted correctly
- Signature names are formatted correctly
- No template placeholders remain unresolved

---

## 🌱 Future Improvements

- Display backend validation errors directly under the matching frontend fields
- Add a preview screen with a full data summary before generation
- Move API URL into environment configuration
- Add automated tests for parser utilities and validation logic
- Add support for additional legal document templates
- Improve file cleanup for the standalone PDF parsing endpoint
- Add persistent document history for generated files
- Add deployment configuration for a hosted portfolio demo

---

## 👤 Author Note

Built with a production mindset, focusing on practical legal-document automation, structured PDF parsing, guided data collection, and reliable DOCX template generation.

This project demonstrates how a full-stack application can automate a repetitive document workflow by combining extracted cadastral data, validated manual input, and legal-template rendering into a clean end-to-end user experience.