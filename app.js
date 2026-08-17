/**
 * NIT Jalandhar Lab Cover Page & Index Generator Logic
 * Created by : ELYTRA | Aka : ARMAAN (bunk manager)
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const headerLogoImg = document.getElementById('headerLogoImg');
  const pvLogoImg = document.getElementById('pvLogoImg');
  
  // Inputs
  const studentNameInput = document.getElementById('studentName');
  const rollNumberInput = document.getElementById('rollNumber');
  const groupNameInput = document.getElementById('groupName');
  const subjectLineInput = document.getElementById('subjectLine');
  const teacherNameInput = document.getElementById('teacherName');
  const degreeBranchInput = document.getElementById('degreeBranch');
  const semesterSessionInput = document.getElementById('semesterSession');
  const teacherDeptInput = document.getElementById('teacherDept');
  const indexPageCountSelect = document.getElementById('indexPageCount');
  
  // Preview Elements
  const pvSubject = document.getElementById('pvSubject');
  const pvDegree = document.getElementById('pvDegree');
  const pvSemester = document.getElementById('pvSemester');
  const pvGroup = document.getElementById('pvGroup');
  const pvTeacher = document.getElementById('pvTeacher');
  const pvTeacherDept = document.getElementById('pvTeacherDept');
  const pvStudentName = document.getElementById('pvStudentName');
  const pvRollNumber = document.getElementById('pvRollNumber');
  const pvInstName = document.getElementById('pvInstName');
  const pvInstAddr1 = document.getElementById('pvInstAddr1');
  const pvInstAddr2 = document.getElementById('pvInstAddr2');
  const indexSheetsWrapper = document.getElementById('indexSheetsWrapper');
  const coverSheet = document.getElementById('coverSheet');
  
  // Buttons & UI Controls
  const downloadPdfBtn = document.getElementById('downloadPdfBtn');
  const printBtn = document.getElementById('printBtn');
  const quickShareBtn = document.getElementById('quickShareBtn');
  const shareBtn = document.getElementById('shareBtn');
  const whatsappShareBtn = document.getElementById('whatsappShareBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const moreOptionsHeader = document.getElementById('moreOptionsHeader');
  const moreOptionsContent = document.getElementById('moreOptionsContent');
  const accIcon = document.getElementById('accIcon');
  
  // Success / Crazy Transition Rating Screen Elements
  const successScreen = document.getElementById('successScreen');
  const backToEditorBtn = document.getElementById('backToEditorBtn');
  const successShareBtn = document.getElementById('successShareBtn');
  const starRating = document.getElementById('starRating');
  const ratingFeedbackMsg = document.getElementById('ratingFeedbackMsg');
  const reactionChips = document.querySelectorAll('.reaction-chip');
  
  // Zoom & View
  const zoomInBtn = document.getElementById('zoomInBtn');
  const zoomOutBtn = document.getElementById('zoomOutBtn');
  const zoomResetBtn = document.getElementById('zoomResetBtn');
  const zoomLevelText = document.getElementById('zoomLevelText');
  const pagesScaleContainer = document.getElementById('pagesScaleContainer');
  const pageTabContainer = document.getElementById('pageTabContainer');
  const previewViewport = document.getElementById('previewViewport');

  // Toast
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  let currentZoom = 0.75;
  let activeTab = 'all';

  // 1. Setup Base64 Logo if available
  if (window.NITJ_LOGO_BASE64) {
    if (headerLogoImg) headerLogoImg.src = window.NITJ_LOGO_BASE64;
    if (pvLogoImg) pvLogoImg.src = window.NITJ_LOGO_BASE64;
  }

  // 2. Format Semester with Superscript (e.g. 3rd -> 3<sup>rd</sup>)
  function formatSemesterText(str) {
    if (!str) return '';
    return str.replace(/(\d+)(st|nd|rd|th)\b/gi, '$1<sup>$2</sup>');
  }

  // 3. Render Index Table HTML
  function generateIndexTableHtml(pageIndex) {
    let rowsHtml = '';
    for (let i = 1; i <= 24; i++) {
      rowsHtml += `
        <tr>
          <td>&nbsp;</td>
          <td class="col-title-td">&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
      `;
    }

    return `
      <div class="a4-sheet index-page" id="indexSheet_${pageIndex}">
        <div class="index-page-title">INDEX</div>
        <table class="index-table">
          <thead>
            <tr>
              <th class="col-sno">S. No.</th>
              <th class="col-title">Title</th>
              <th class="col-date">Date</th>
              <th class="col-sig">Signature</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;
  }

  // 4. Update Preview Data
  function updatePreview() {
    const rawName = studentNameInput ? studentNameInput.value.trim() : '';
    const rawRoll = rollNumberInput ? rollNumberInput.value.trim() : '';
    
    // Default placeholders for preview if user hasn't typed yet
    const sName = rawName || 'YOUR NAME';
    const rNumber = rawRoll || 'ROLL NUMBER';

    const gName = groupNameInput ? groupNameInput.value.trim() || 'G1 [0-31]' : 'G1 [0-31]';
    const sub = subjectLineInput ? subjectLineInput.value.trim() || 'Object Oriented Programming Lab (ITDC- 0231)' : '';
    const deg = degreeBranchInput ? degreeBranchInput.value.trim() || 'B.TECH. Information Technology' : 'B.TECH. Information Technology';
    const sem = semesterSessionInput ? semesterSessionInput.value.trim() || '3rd SEMESTER, July-Dec 2026' : '3rd SEMESTER, July-Dec 2026';
    const tName = teacherNameInput ? teacherNameInput.value.trim() || 'Dr. Kusum Bharti' : 'Dr. Kusum Bharti';
    const tDept = teacherDeptInput ? teacherDeptInput.value.trim() || 'Department of Information Technology' : 'Department of Information Technology';

    // Cover Page updates
    if (pvStudentName) pvStudentName.textContent = sName.toUpperCase();
    if (pvRollNumber) pvRollNumber.textContent = rNumber;
    if (pvGroup) pvGroup.textContent = gName.toLowerCase().startsWith('group') ? gName : `Group: ${gName}`;
    if (pvSubject) pvSubject.textContent = sub;
    if (pvDegree) pvDegree.textContent = deg;
    if (pvSemester) pvSemester.innerHTML = formatSemesterText(sem);
    if (pvTeacher) pvTeacher.textContent = tName;
    if (pvTeacherDept) pvTeacherDept.textContent = tDept;

    const count = parseInt(indexPageCountSelect ? indexPageCountSelect.value : '3', 10);

    // Index Pages Rendering
    let indexHtml = '';
    for (let i = 1; i <= count; i++) {
      indexHtml += generateIndexTableHtml(i);
    }
    if (indexSheetsWrapper) indexSheetsWrapper.innerHTML = indexHtml;

    updatePageTabs(count);
  }

  // 5. Update Navigation Tabs in Toolbar
  function updatePageTabs(indexCount) {
    if (!pageTabContainer) return;
    let tabsHtml = `
      <button type="button" class="preview-tab-btn ${activeTab === 'all' ? 'active' : ''}" data-view="all">All</button>
      <button type="button" class="preview-tab-btn ${activeTab === 'cover' ? 'active' : ''}" data-view="cover">Cover</button>
    `;
    for (let i = 1; i <= indexCount; i++) {
      tabsHtml += `
        <button type="button" class="preview-tab-btn ${activeTab === `index${i}` ? 'active' : ''}" data-view="index${i}">Index ${i}</button>
      `;
    }
    pageTabContainer.innerHTML = tabsHtml;

    // Attach click handlers to tabs
    pageTabContainer.querySelectorAll('.preview-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        pageTabContainer.querySelectorAll('.preview-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeTab = btn.dataset.view;
        applyViewFilter(activeTab);
      });
    });
  }

  function applyViewFilter(view) {
    const allSheets = document.querySelectorAll('.a4-sheet');
    allSheets.forEach(sheet => {
      sheet.style.display = 'flex';
    });

    if (view === 'all') {
      return;
    } else if (view === 'cover') {
      allSheets.forEach(sheet => {
        if (sheet.id !== 'coverSheet') sheet.style.display = 'none';
      });
    } else if (view.startsWith('index')) {
      const idx = view.replace('index', '');
      allSheets.forEach(sheet => {
        if (sheet.id !== `indexSheet_${idx}`) sheet.style.display = 'none';
      });
    }
  }

  // 6. Event Listeners for Direct Reactive Inputs
  const reactiveInputs = [
    studentNameInput, rollNumberInput, groupNameInput,
    subjectLineInput, teacherNameInput, degreeBranchInput, 
    semesterSessionInput, teacherDeptInput, indexPageCountSelect
  ].filter(Boolean);

  reactiveInputs.forEach(input => {
    input.addEventListener('input', updatePreview);
    input.addEventListener('change', updatePreview);
  });

  // More Options Accordion Toggle
  if (moreOptionsHeader && moreOptionsContent) {
    moreOptionsHeader.addEventListener('click', () => {
      const isOpen = moreOptionsContent.classList.toggle('open');
      if (accIcon) accIcon.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
    });
  }

  // Responsive Zoom & Screen Fitting
  function applyZoom(zoom) {
    currentZoom = Math.max(0.35, Math.min(1.4, zoom));
    if (pagesScaleContainer) {
      pagesScaleContainer.style.transform = `scale(${currentZoom})`;
    }
    if (zoomLevelText) {
      zoomLevelText.textContent = `${Math.round(currentZoom * 100)}%`;
    }
  }

  function autoFitZoom() {
    if (!previewViewport) return;
    const vpWidth = previewViewport.clientWidth - 40;
    const a4WidthPx = 794;
    const calcZoom = Math.min(1.0, Math.max(0.36, vpWidth / a4WidthPx));
    applyZoom(calcZoom);
  }

  if (zoomInBtn) zoomInBtn.addEventListener('click', () => applyZoom(currentZoom + 0.1));
  if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => applyZoom(currentZoom - 0.1));
  if (zoomResetBtn) zoomResetBtn.addEventListener('click', autoFitZoom);

  // 7. Toast Notification Utility
  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // 8. Generate Shareable URL
  function buildShareUrl() {
    const url = new URL(window.location.origin + window.location.pathname);
    if (subjectLineInput && subjectLineInput.value) url.searchParams.set('subject', subjectLineInput.value);
    if (teacherNameInput && teacherNameInput.value) url.searchParams.set('teacher', teacherNameInput.value);
    if (degreeBranchInput && degreeBranchInput.value) url.searchParams.set('degree', degreeBranchInput.value);
    if (semesterSessionInput && semesterSessionInput.value) url.searchParams.set('semester', semesterSessionInput.value);
    if (groupNameInput && groupNameInput.value) url.searchParams.set('group', groupNameInput.value);
    if (indexPageCountSelect && indexPageCountSelect.value) url.searchParams.set('indexCount', indexPageCountSelect.value);
    return url.toString();
  }

  function copyShareLink() {
    const shareLink = buildShareUrl();
    navigator.clipboard.writeText(shareLink).then(() => {
      showToast('📋 Link copied! Send it to your batchmates.');
    }).catch(() => {
      prompt('Copy this link to share:', shareLink);
    });
  }

  if (shareBtn) shareBtn.addEventListener('click', copyShareLink);
  if (quickShareBtn) quickShareBtn.addEventListener('click', copyShareLink);

  // WhatsApp Share
  function openWhatsAppShare() {
    const shareLink = buildShareUrl();
    const text = encodeURIComponent(`📄 *NITJ Lab Cover Page Generator* 🎓\n\nGenerate and download your official lab cover page & index in 5 seconds. Just enter Name & Roll Number:\n👉 ${shareLink}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  }

  if (whatsappShareBtn) whatsappShareBtn.addEventListener('click', openWhatsAppShare);
  if (successShareBtn) successShareBtn.addEventListener('click', openWhatsAppShare);

  // 9. Load URL Search Parameters on Startup
  function loadUrlParams() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('name') && studentNameInput) studentNameInput.value = params.get('name');
    if (params.has('roll') && rollNumberInput) rollNumberInput.value = params.get('roll');
    if (params.has('group') && groupNameInput) groupNameInput.value = params.get('group');
    if (params.has('subject') && subjectLineInput) subjectLineInput.value = params.get('subject');
    if (params.has('degree') && degreeBranchInput) degreeBranchInput.value = params.get('degree');
    if (params.has('semester') && semesterSessionInput) semesterSessionInput.value = params.get('semester');
    if (params.has('teacher') && teacherNameInput) teacherNameInput.value = params.get('teacher');
    if (params.has('indexCount') && indexPageCountSelect) indexPageCountSelect.value = params.get('indexCount');
  }

  // 10. Crazy Confetti Transition Trigger
  function triggerCrazyConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { x: 0.2, y: 0.6 }
      });
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { x: 0.8, y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { y: 0.4 }
        });
      }, 350);
    }
  }

  // 11. PDF Generator Function
  async function generatePdf() {
    applyViewFilter('all');

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const sheets = document.querySelectorAll('.a4-sheet');
    const totalSheets = sheets.length;

    // Temporarily reset transform for clean canvas capture
    const prevTransform = pagesScaleContainer.style.transform;
    pagesScaleContainer.style.transform = 'none';

    for (let i = 0; i < totalSheets; i++) {
      const sheet = sheets[i];
      
      const canvas = await html2canvas(sheet, {
        scale: 2.2, // high DPI crisp rendering
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      
      if (i > 0) {
        pdf.addPage('a4', 'portrait');
      }

      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
    }

    // Restore scale transform
    pagesScaleContainer.style.transform = prevTransform;

    const rNumber = rollNumberInput.value.trim() || 'CoverPage';
    const sName = studentNameInput.value.trim() || '';
    const cleanSubject = subjectLineInput.value.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 25);
    const filename = `${rNumber}_${sName ? sName.replace(/\s+/g, '_') + '_' : ''}${cleanSubject}.pdf`;

    return { pdf, filename };
  }

  // 12. Download PDF with Crazy Transition to Rating Screen
  downloadPdfBtn.addEventListener('click', async () => {
    const rawName = studentNameInput ? studentNameInput.value.trim() : '';
    const rawRoll = rollNumberInput ? rollNumberInput.value.trim() : '';

    if (!rawName || !rawRoll) {
      if (!rawName && studentNameInput) {
        studentNameInput.focus();
      } else if (!rawRoll && rollNumberInput) {
        rollNumberInput.focus();
      }
      showToast('⚠️ Please enter your Name and Roll Number first!');
      return;
    }

    const originalText = downloadPdfBtn.innerHTML;
    try {
      downloadPdfBtn.disabled = true;
      downloadPdfBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>
        Generating PDF...
      `;

      const { pdf, filename } = await generatePdf();
      pdf.save(filename);

      // Trigger Crazy Transition & Confetti!
      triggerCrazyConfetti();
      
      setTimeout(() => {
        if (successScreen) {
          successScreen.classList.add('active');
        }
      }, 400);

    } catch (err) {
      console.error(err);
      alert('Error generating PDF. You can also use the Print button to Save as PDF.');
    } finally {
      downloadPdfBtn.disabled = false;
      downloadPdfBtn.innerHTML = originalText;
    }
  });

  // 13. Rating Screen Interactions
  if (starRating) {
    const stars = starRating.querySelectorAll('.star');
    const feedbackTexts = [
      'We will improve! 🛠️',
      'Thanks for the feedback! 👍',
      'Good to know! ⭐',
      'Awesome! High five! 🙌',
      '10/10 Bunk Approved! 🚀🔥'
    ];

    stars.forEach(star => {
      star.addEventListener('mouseenter', () => {
        const rating = parseInt(star.dataset.rating, 10);
        stars.forEach((s, idx) => {
          s.classList.toggle('hovered', idx < rating);
        });
      });

      star.addEventListener('click', () => {
        const rating = parseInt(star.dataset.rating, 10);
        stars.forEach((s, idx) => {
          s.classList.toggle('active', idx < rating);
        });
        if (ratingFeedbackMsg) {
          ratingFeedbackMsg.textContent = feedbackTexts[rating - 1] || 'Thank you!';
        }
        if (typeof confetti === 'function' && rating >= 4) {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
        }
      });
    });

    starRating.addEventListener('mouseleave', () => {
      stars.forEach(s => s.classList.remove('hovered'));
    });
  }

  // Reaction Tags
  reactionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      if (chip.classList.contains('active') && typeof confetti === 'function') {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.75 } });
      }
    });
  });

  // Back to Editor
  if (backToEditorBtn) {
    backToEditorBtn.addEventListener('click', () => {
      if (successScreen) {
        successScreen.classList.remove('active');
      }
    });
  }

  // 14. Print Cover Page
  printBtn.addEventListener('click', () => {
    applyViewFilter('all');
    window.print();
  });

  // 15. Theme Toggle
  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.body.removeAttribute('data-theme');
      localStorage.setItem('nitj_theme', 'light');
    } else {
      document.body.setAttribute('data-theme', 'dark');
    }
  });

  if (localStorage.getItem('nitj_theme') === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
  }

  // Initial Boot
  loadUrlParams();
  updatePreview();
  autoFitZoom();
  window.addEventListener('resize', autoFitZoom);
});
