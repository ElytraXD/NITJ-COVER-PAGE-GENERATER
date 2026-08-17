# NIT Jalandhar Lab Cover Page & Index Generator 🎓📄

A Google Form-style web application for students of **Dr. B. R. Ambedkar National Institute of Technology (NIT Jalandhar)** to instantly generate and download official lab cover pages and index sheets.

![Cover Page Template](cover_preview.png)

## ✨ Features

- **⚡ Instant 1-Click Generation**: Students enter their **Name** and **Roll Number** (and select their lab group: `G1`, `G2`, `G3`, or `G4`), and click **Download PDF**.
- **🎯 Pixel-Perfect Alignment**: Faithfully reproduces the official institute typography (Times New Roman serif), central vector emblem with Sanskrit motto (*"सरस्वती नमस्तुभ्यं"*), two-column *Submitted To / Submitted By* layout, and address block.
- **📑 Multi-Page Index Sheets**: Includes customizable Index sheets (1 to 4 pages) with pre-formatted grid columns: *S. No., Title, Date, Signature*.
- **🔗 Shareable Pre-Filled Links**: Faculty or Class Representatives (CRs) can configure course/subject details and generate a share link so classmates only need to type their name and roll number.
- **📦 Batch Generation Mode**: Generate and download cover pages for an entire class in a single compressed `.zip` file from a roster or CSV list.
- **🖨️ Direct High-Res Print**: Native vector print stylesheet (`@media print`) configured for exact borderless A4 paper output.
- **🌙 Dark / Light Theme**: Comfortable UI for late-night lab file submissions.

---

## 🚀 How to Run Locally

### Option 1: Direct Browser
Simply double-click [`index.html`](file:///d:/projects/extra/index.html) in your browser!

### Option 2: Python Local Server
Run in PowerShell / Terminal:
```bash
python server.py
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🛠️ Technology Stack
- **HTML5 & Vanilla CSS3**: Responsive grid layout and `@media print` A4 document rules.
- **Modern JavaScript (ES6+)**: Reactive state bindings and dynamic SVG vector generation.
- **jsPDF & html2canvas**: Client-side high-resolution multi-page PDF generation.
- **JSZip & FileSaver**: Instant client-side batch processing and ZIP downloads.
