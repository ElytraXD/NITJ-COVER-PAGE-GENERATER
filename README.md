# NIT Jalandhar Lab Cover Page & Index Generator 🎓📄

A Google Form-style web application for students of **Dr. B. R. Ambedkar National Institute of Technology (NIT Jalandhar)** to instantly generate and download official lab cover pages and index sheets.

---

## ✨ Features

- **⚡ Instant 1-Click Generation**: Students enter their **Name** and **Roll Number** (and select their lab group: `G1`, `G2`, `G3`, or `G4`), and click **Download PDF**.
- **🎯 Pixel-Perfect Alignment**: Faithfully reproduces the official institute typography (Times New Roman serif), central emblem with Sanskrit motto (*"सरस्वती नमस्तुभ्यं"*), two-column *Submitted To / Submitted By* layout, and address block.
- **📑 Multi-Page Index Sheets**: Includes customizable Index sheets (0, 1, 2, or 3 pages) with pre-formatted grid columns: *S. No., Title, Date, Signature*.
- **👥 Who Used It (Student Activity Tracking)**: Automatically records every cover generation (Student Name, Roll Number, Group, Subject, Teacher, Timestamp, and Device).
- **⭐ Ratings & Feedback System**: Students can leave 1–5 star ratings, reaction badges (*"🔥 Super Fast"*, *"😎 Bunk Approved"*), and direct feedback notes for the creator upon downloading.
- **👑 Creator Admin Portal (ELYTRA Hub)**:
  - Access via clicking the footer credit badge `created by : ELYTRA`, pressing `Ctrl + Shift + A`, or visiting `http://localhost:3000/#admin`.
  - Passcode protected (Default PIN: `elytra`).
  - View real-time KPI metrics, search/filter student usage rosters, view all ratings, and **Export full class attendance/usage to Excel (CSV)**.
- **🔗 Shareable Pre-Filled Links & WhatsApp Blast**: 1-click WhatsApp share with pre-filled parameters so classmates only type their name & roll number.
- **🖨️ Direct High-Res Print**: Native vector print stylesheet (`@media print`) configured for exact borderless A4 paper output.
- **🌙 Dark / Light Theme**: Comfortable UI for late-night lab file submissions.

---

## 🚀 How to Run Locally

### Option 1: Python Local Server (Recommended for Live Tracking)
Run in PowerShell / Terminal:
```bash
python server.py
```
- App URL: **[http://localhost:3000](http://localhost:3000)**
- Creator Admin Portal: **[http://localhost:3000/#admin](http://localhost:3000/#admin)**

### Option 2: Direct Browser
Simply double-click `index.html` in your browser. (Offline storage + LocalStorage analytics sync is fully enabled).

---

## 👑 Creator Admin Portal Shortcut

| Method | How to Trigger |
| :--- | :--- |
| **Mouse Click** | Click the *"created by : ELYTRA"* badge at the bottom of the form |
| **Keyboard Shortcut** | Press `Ctrl + Shift + A` (or `Cmd + Shift + A` on Mac) |
| **Direct URL** | Add `/#admin` to the URL (e.g., `http://localhost:3000/#admin`) |

---

## 🛠️ Technology Stack
- **HTML5 & Vanilla CSS3**: Responsive grid layout, glassmorphic UI, and `@media print` A4 document rules.
- **Modern JavaScript (ES6+)**: Reactive state DOM synchronization, real-time analytics engine, and Excel CSV generator.
- **Python HTTP REST API**: Lightweight server with `/api/track`, `/api/rate`, and `/api/admin/data` endpoints.
- **jsPDF & html2canvas**: Client-side high-resolution multi-page PDF generation.
- **Canvas-Confetti**: Micro-interactions and celebratory animations.

---

**Made with ❤️ by ELYTRA (ARMAAN)**
