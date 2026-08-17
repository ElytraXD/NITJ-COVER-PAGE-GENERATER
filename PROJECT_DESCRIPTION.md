# 🎓 NITJ Lab Cover Page & Index Generator

> **An ultra-fast, mobile-friendly web app for students of Dr. B. R. Ambedkar National Institute of Technology (NIT Jalandhar) to instantly generate, preview, and download official lab cover pages and index sheets in seconds.**

---

## 💡 The Problem It Solves
Every semester, hundreds of engineering students waste valuable time manually formatting Word documents, struggling with misaligned logos, fixing font spacing, or paying print shops to edit basic details. 

**This web portal eliminates all that friction:** anyone can simply type their **Name** and **Roll Number**, select their **Group**, and click **Download PDF** to get their print-ready official lab cover page + index sheets immediately.

---

## ✨ Key Features

### ⚡ 1. Google Forms-Style Fast Entry
- **Zero Configuration Needed**: Students only need to enter their **Name** and **Roll Number**.
- **Pre-Configured Institute Defaults**:
  - **Subject**: *Object Oriented Programming Lab (ITDC- 0231)*
  - **Branch & Degree**: *B.TECH. Information Technology*
  - **Academic Session**: *3rd SEMESTER, July-Dec 2026*
  - **Submitted To (Faculty)**: *Dr. Kusum Bharti*
  - **Department**: *Department of Information Technology*
  - **Group**: *G1 [0-31]* or custom editable text (e.g., *G2 [32-62]*).

### 🎯 2. Pixel-Perfect Official Formatting
- **Official NITJ High-Res Emblem**: Features the circular gear logo with central atomic orbitals, torch flame, sunburst rays, and the Sanskrit motto (*"सरस्वती नमस्तुभ्यं"*).
- **Academic Typography**: Exact Times New Roman serif styling with standardized font sizing, proper superscript formatting (`3`<sup>`rd`</sup> `SEMESTER`), and precise two-column *Submitted To / Submitted By* alignment.
- **Smart 0-Index Page Detection**: When selecting *0 Index Pages* (Cover Only), the `"Index"` title at the bottom of the cover page is automatically removed. When set to 1, 2, or 3 pages, the index tables (`S. No.`, `Title`, `Date`, `Signature`) are rendered seamlessly.

### 📱 3. Mobile-First & Class Sharing
- **Responsive Layout**: Designed to look and feel like an authentic Google Form on smartphones, with auto-scaling A4 preview.
- **WhatsApp 1-Tap Share**: Formats a message with a shareable URL to blast straight to class WhatsApp groups.
- **Shareable Links**: Generates links with pre-filled course/teacher info so classmates only fill in their name and roll number.

### 🎉 4. Crazy Transition & Interactive Rating Screen
- **Celebratory Confetti Cannons**: Fires double confetti bursts upon PDF generation.
- **3D Animated Rating Card**: Includes a 5-star interactive rating system (*"10/10 Bunk Approved! 🚀🔥"*), quick reaction tags, and a smooth return to the editor.
- **Discreet Signature Credit**:
  ```text
  created by : ELYTRA
  Aka : ARMAAN (bunk manager)
  ```

---

## 🛠️ Technology Stack
- **Frontend**: HTML5, Vanilla CSS3 (Custom design system + `@media print` A4 engine).
- **Logic & Reactivity**: Vanilla JavaScript (ES6+) with real-time DOM synchronization.
- **PDF Generation**: `jsPDF` + `html2canvas` with embedded Base64 vector/PNG assets (100% offline and CORS-safe).
- **Micro-Interactions**: `canvas-confetti` for celebratory bursts.
- **Local Dev Server**: Python lightweight HTTP server with auto-detected local WiFi network IP for instant mobile testing.

---

## 🚀 How to Run & Deploy

### Local Use:
- **Direct**: Open `index.html` in any browser.
- **Local Network**: Run `python server.py` to share the app over the same WiFi.

### Free Public Deployment:
- **Netlify**: Drag and drop the project folder to [Netlify Drop](https://app.netlify.com/drop) for an instant live URL.
- **GitHub Pages**: Push to GitHub and enable Pages in repository settings.

---

**Made with ❤️ by ELYTRA (ARMAAN)**
