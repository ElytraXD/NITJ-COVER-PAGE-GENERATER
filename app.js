/**
 * NIT Jalandhar Lab Cover Page & Index Generator Logic
 * Created by : ELYTRA | Aka : ARMAAN (bunk manager)
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements - Branding & Emblems
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
  const ratingCommentInput = document.getElementById('ratingCommentInput');
  const submitRatingBtn = document.getElementById('submitRatingBtn');
  const ratingSuccessBanner = document.getElementById('ratingSuccessBanner');
  
  // Admin Triggers & Modals
  const creatorAdminTrigger = document.getElementById('creatorAdminTrigger');
  const headerAdminBtn = document.getElementById('headerAdminBtn');
  const secretAdminTriggerEgg = document.getElementById('secretAdminTriggerEgg');
  const adminAuthModal = document.getElementById('adminAuthModal');
  const closeAuthModalBtn = document.getElementById('closeAuthModalBtn');
  const cancelAuthBtn = document.getElementById('cancelAuthBtn');
  const unlockAdminBtn = document.getElementById('unlockAdminBtn');
  const adminPasscodeInput = document.getElementById('adminPasscodeInput');
  const authErrorMsg = document.getElementById('authErrorMsg');

  // Admin Dashboard Elements
  const adminDashboardModal = document.getElementById('adminDashboardModal');
  const closeDashboardModalBtn = document.getElementById('closeDashboardModalBtn');
  const adminRefreshBtn = document.getElementById('adminRefreshBtn');
  const adminExportCsvBtn = document.getElementById('adminExportCsvBtn');
  const adminTabBtns = document.querySelectorAll('.admin-tab-btn');
  const adminTabPanes = document.querySelectorAll('.admin-tab-pane');

  // Admin Overview KPI Elements
  const statTotalDownloads = document.getElementById('statTotalDownloads');
  const statUniqueUsers = document.getElementById('statUniqueUsers');
  const statAvgRating = document.getElementById('statAvgRating');
  const statTotalRatings = document.getElementById('statTotalRatings');
  const ratingBarsContainer = document.getElementById('ratingBarsContainer');
  const insightTopSubject = document.getElementById('insightTopSubject');
  const insightTopGroup = document.getElementById('insightTopGroup');
  const insightLatestTime = document.getElementById('insightLatestTime');
  const tabCountGenerations = document.getElementById('tabCountGenerations');
  const tabCountRatings = document.getElementById('tabCountRatings');

  // Admin Roster Table Elements
  const rosterSearchInput = document.getElementById('rosterSearchInput');
  const rosterGroupFilter = document.getElementById('rosterGroupFilter');
  const rosterTableBody = document.getElementById('rosterTableBody');
  const rosterEmptyState = document.getElementById('rosterEmptyState');

  // Admin Ratings Feed Elements
  const ratingFilterPills = document.querySelectorAll('#ratingFilterPills .filter-pill');
  const ratingsFeedList = document.getElementById('ratingsFeedList');
  const ratingsEmptyState = document.getElementById('ratingsEmptyState');

  // Admin Settings Elements
  const newPasscodeInput = document.getElementById('newPasscodeInput');
  const savePasscodeBtn = document.getElementById('savePasscodeBtn');
  const passcodeChangeFeedback = document.getElementById('passcodeChangeFeedback');
  const customWebhookUrlInput = document.getElementById('customWebhookUrlInput');
  const saveWebhookBtn = document.getElementById('saveWebhookBtn');
  const clearAnalyticsBtn = document.getElementById('clearAnalyticsBtn');

  // Zoom & Viewport
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
  let selectedRating = 5;
  let cachedAdminData = null;
  let authenticatedPasscode = '';
  let activeStarFilter = 'all';

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

    const gName = groupNameInput ? groupNameInput.value.trim() || 'G1' : 'G1';
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

  // 6. Direct Reactive Inputs
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

  // 11. Device / Browser Detector Utility
  function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'Tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      if (/iPhone/i.test(ua)) return 'iPhone';
      if (/Android/i.test(ua)) return 'Android Mobile';
      return 'Mobile';
    }
    if (/Windows/i.test(ua)) return 'Windows PC';
    if (/Macintosh|Mac OS/i.test(ua)) return 'Mac OS';
    if (/Linux/i.test(ua)) return 'Linux';
    return 'Desktop Browser';
  }

  // 12. Student Activity & Usage Tracking Service
  async function trackUserGeneration(actionType = 'download_pdf') {
    const rawName = studentNameInput ? studentNameInput.value.trim() : '';
    const rawRoll = rollNumberInput ? rollNumberInput.value.trim() : '';
    if (!rawName && !rawRoll) return;

    const payload = {
      id: 'gen_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      action: actionType,
      name: rawName,
      roll: rawRoll,
      group: groupNameInput ? groupNameInput.value.trim() || 'G1' : 'G1',
      subject: subjectLineInput ? subjectLineInput.value.trim() : '',
      teacher: teacherNameInput ? teacherNameInput.value.trim() : '',
      degree: degreeBranchInput ? degreeBranchInput.value.trim() : '',
      semester: semesterSessionInput ? semesterSessionInput.value.trim() : '',
      index_pages: parseInt(indexPageCountSelect ? indexPageCountSelect.value : '3', 10),
      timestamp: new Date().toISOString(),
      device: getDeviceType()
    };

    // 1. Save to LocalStorage queue (fallback for static host / offline)
    try {
      const localGenerations = JSON.parse(localStorage.getItem('nitj_local_generations') || '[]');
      localGenerations.unshift(payload);
      localStorage.setItem('nitj_local_generations', JSON.stringify(localGenerations.slice(0, 300)));
    } catch (e) {}

    // 2. Post to Local Python Server API if available
    try {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    } catch (e) {}

    // 3. Post to Custom Webhook if configured (e.g. Discord, Make, SheetDB)
    const customWebhook = localStorage.getItem('nitj_custom_webhook');
    if (customWebhook && customWebhook.startsWith('http')) {
      try {
        fetch(customWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `📄 **NITJ Cover Downloaded**\n👤 **Name:** ${payload.name}\n🔢 **Roll:** ${payload.roll}\n👥 **Group:** ${payload.group}\n📚 **Subject:** ${payload.subject}\n📱 **Device:** ${payload.device}`,
            data: payload
          })
        }).catch(() => {});
      } catch (e) {}
    }
  }

  // 13. PDF Generator Function
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

  // 14. Download PDF with Tracking & Transition to Rating Screen
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

      // Track this student generation!
      trackUserGeneration('download_pdf');

      // Trigger Confetti Transition
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

  // 15. Rating Screen Logic & Review Submission
  const feedbackTexts = [
    'We will improve! 🛠️',
    'Thanks for the feedback! 👍',
    'Good to know! ⭐',
    'Awesome! High five! 🙌',
    '10/10 Bunk Approved! 🚀🔥'
  ];

  function updateStarUi(rating) {
    selectedRating = rating;
    if (!starRating) return;
    const stars = starRating.querySelectorAll('.star');
    stars.forEach((s, idx) => {
      s.classList.toggle('active', idx < rating);
    });
    if (ratingFeedbackMsg) {
      ratingFeedbackMsg.textContent = feedbackTexts[rating - 1] || 'Thank you!';
    }
  }

  if (starRating) {
    const stars = starRating.querySelectorAll('.star');
    stars.forEach(star => {
      star.addEventListener('mouseenter', () => {
        const rating = parseInt(star.dataset.rating, 10);
        stars.forEach((s, idx) => {
          s.classList.toggle('hovered', idx < rating);
        });
      });

      star.addEventListener('click', () => {
        const rating = parseInt(star.dataset.rating, 10);
        updateStarUi(rating);
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

  // Submit Rating to Armaan
  async function submitRatingAndReview() {
    const rawName = studentNameInput ? studentNameInput.value.trim() : '';
    const rawRoll = rollNumberInput ? rollNumberInput.value.trim() : '';
    const comment = ratingCommentInput ? ratingCommentInput.value.trim() : '';
    
    const activeTags = [];
    reactionChips.forEach(chip => {
      if (chip.classList.contains('active')) {
        activeTags.push(chip.textContent.trim());
      }
    });

    const ratingPayload = {
      id: 'rate_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      name: rawName || 'Anonymous Student',
      roll: rawRoll || '',
      rating: selectedRating,
      comment: comment,
      tags: activeTags,
      timestamp: new Date().toISOString()
    };

    // Save locally
    try {
      const localRatings = JSON.parse(localStorage.getItem('nitj_local_ratings') || '[]');
      // Update existing if same roll or append
      const existingIdx = localRatings.findIndex(r => r.roll && rawRoll && r.roll.toLowerCase() === rawRoll.toLowerCase());
      if (existingIdx !== -1) {
        localRatings[existingIdx] = ratingPayload;
      } else {
        localRatings.unshift(ratingPayload);
      }
      localStorage.setItem('nitj_local_ratings', JSON.stringify(localRatings.slice(0, 300)));
    } catch (e) {}

    // Send to local server
    try {
      fetch('/api/rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ratingPayload)
      }).catch(() => {});
    } catch (e) {}

    // Send to custom webhook
    const customWebhook = localStorage.getItem('nitj_custom_webhook');
    if (customWebhook && customWebhook.startsWith('http')) {
      try {
        const starEmoji = '⭐'.repeat(selectedRating);
        fetch(customWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `⭐ **New Rating for Armaan!**\n🌟 **Rating:** ${starEmoji} (${selectedRating}/5)\n👤 **Student:** ${ratingPayload.name} (${ratingPayload.roll || 'N/A'})\n🏷️ **Tags:** ${activeTags.join(', ') || 'None'}\n💬 **Note:** ${comment || 'No comment'}`,
            data: ratingPayload
          })
        }).catch(() => {});
      } catch (e) {}
    }

    if (submitRatingBtn) {
      submitRatingBtn.innerHTML = '✓ Submitted!';
      submitRatingBtn.disabled = true;
    }
    if (ratingSuccessBanner) {
      ratingSuccessBanner.style.display = 'flex';
    }
    if (typeof confetti === 'function') {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    }
    showToast('❤️ Thank you! Your rating has been received.');
  }

  if (submitRatingBtn) {
    submitRatingBtn.addEventListener('click', submitRatingAndReview);
  }

  // Back to Editor
  if (backToEditorBtn) {
    backToEditorBtn.addEventListener('click', () => {
      if (successScreen) {
        successScreen.classList.remove('active');
      }
    });
  }

  // 16. Print Cover Page
  printBtn.addEventListener('click', () => {
    trackUserGeneration('print_cover');
    applyViewFilter('all');
    window.print();
  });

  // 17. Theme Toggle
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

  // ==========================================================================
  // 18. CREATOR ADMIN PORTAL & DASHBOARD SYSTEM
  // ==========================================================================

  function formatTimeAgo(isoString) {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    const now = new Date();
    const diffSec = Math.floor((now - date) / 1000);

    if (diffSec < 60) return 'Just now';
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)} mins ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} hrs ago`;
    
    // Format friendly date
    return date.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function openAdminAuthModal() {
    if (authenticatedPasscode) {
      openAdminDashboard();
      return;
    }
    if (adminAuthModal) {
      adminAuthModal.style.display = 'flex';
      if (authErrorMsg) authErrorMsg.style.display = 'none';
      if (adminPasscodeInput) {
        adminPasscodeInput.value = '';
        setTimeout(() => adminPasscodeInput.focus(), 100);
      }
    }
  }

  function closeAdminAuthModal() {
    if (adminAuthModal) adminAuthModal.style.display = 'none';
  }

  function openAdminDashboard() {
    if (adminDashboardModal) {
      adminDashboardModal.style.display = 'flex';
      loadAdminDashboardData();
    }
  }

  function closeAdminDashboard() {
    if (adminDashboardModal) adminDashboardModal.style.display = 'none';
    if (window.location.hash === '#admin') {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  }

  // Unlock Admin Portal
  async function attemptAdminUnlock() {
    const enteredPin = adminPasscodeInput ? adminPasscodeInput.value.trim() : '';
    if (!enteredPin) {
      if (authErrorMsg) {
        authErrorMsg.textContent = 'Please enter a passcode.';
        authErrorMsg.style.display = 'block';
      }
      return;
    }

    if (unlockAdminBtn) {
      unlockAdminBtn.disabled = true;
      unlockAdminBtn.textContent = 'Checking...';
    }

    try {
      // 1. Try server API
      const res = await fetch(`/api/admin/data?passcode=${encodeURIComponent(enteredPin)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          authenticatedPasscode = enteredPin;
          localStorage.setItem('nitj_admin_passcode', enteredPin);
          closeAdminAuthModal();
          openAdminDashboard();
          renderAdminDashboard(data);
          return;
        }
      }
      
      // 2. Fallback check for static host (Netlify / GitHub Pages)
      const storedPin = localStorage.getItem('nitj_admin_passcode') || 'ohhsoualsoknowhtml';
      if (enteredPin === storedPin || enteredPin === 'ohhsoualsoknowhtml') {
        authenticatedPasscode = enteredPin;
        closeAdminAuthModal();
        openAdminDashboard();
        return;
      }

      if (authErrorMsg) {
        authErrorMsg.textContent = 'Incorrect passcode!';
        authErrorMsg.style.display = 'block';
      }
    } catch (e) {
      // Offline fallback
      const storedPin = localStorage.getItem('nitj_admin_passcode') || 'ohhsoualsoknowhtml';
      if (enteredPin === storedPin || enteredPin === 'ohhsoualsoknowhtml') {
        authenticatedPasscode = enteredPin;
        closeAdminAuthModal();
        openAdminDashboard();
      } else {
        if (authErrorMsg) {
          authErrorMsg.textContent = 'Incorrect passcode!';
          authErrorMsg.style.display = 'block';
        }
      }
    } finally {
      if (unlockAdminBtn) {
        unlockAdminBtn.disabled = false;
        unlockAdminBtn.textContent = 'Unlock Dashboard';
      }
    }
  }

  // Load Dashboard Data (Server API with LocalStorage Merge)
  async function loadAdminDashboardData() {
    let serverData = null;
    try {
      const pin = authenticatedPasscode || localStorage.getItem('nitj_admin_passcode') || 'ohhsoualsoknowhtml';
      const res = await fetch(`/api/admin/data?passcode=${encodeURIComponent(pin)}`);
      if (res.ok) {
        serverData = await res.json();
      }
    } catch (e) {}

    // LocalStorage Data
    const localGens = JSON.parse(localStorage.getItem('nitj_local_generations') || '[]');
    const localRates = JSON.parse(localStorage.getItem('nitj_local_ratings') || '[]');

    let mergedData = null;

    if (serverData && serverData.success) {
      // Merge unique local generations into server generations
      const sGenerations = serverData.generations || [];
      const sRatings = serverData.ratings || [];

      // Combine by ID or timestamp
      const genIdSet = new Set(sGenerations.map(g => g.id || g.timestamp));
      localGens.forEach(lg => {
        if (!genIdSet.has(lg.id || lg.timestamp)) {
          sGenerations.unshift(lg);
        }
      });

      mergedData = serverData;
      mergedData.generations = sGenerations;
      mergedData.ratings = sRatings.length > 0 ? sRatings : localRates;
    } else {
      // Build full dataset from local storage (e.g. on GitHub Pages)
      const validRatings = localRates.filter(r => r.rating > 0);
      const avg = validRatings.length ? (validRatings.reduce((a, b) => a + b.rating, 0) / validRatings.length).toFixed(1) : '0.0';
      
      const starCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      validRatings.forEach(r => {
        if (starCounts[r.rating] !== undefined) starCounts[r.rating]++;
      });

      const subjects = {};
      const groups = {};
      localGens.forEach(g => {
        if (g.subject) subjects[g.subject] = (subjects[g.subject] || 0) + 1;
        if (g.group) groups[g.group] = (groups[g.group] || 0) + 1;
      });

      const uniqueRolls = new Set(localGens.map(g => g.roll ? g.roll.toLowerCase().trim() : ''));
      uniqueRolls.delete('');

      mergedData = {
        success: true,
        stats: {
          total_generations: localGens.length,
          unique_users: Math.max(uniqueRolls.size, localGens.length),
          avg_rating: parseFloat(avg),
          total_ratings: validRatings.length,
          star_counts: starCounts,
          top_subject: Object.keys(subjects).sort((a, b) => subjects[b] - subjects[a])[0] || 'N/A',
          top_group: Object.keys(groups).sort((a, b) => groups[b] - groups[a])[0] || 'N/A'
        },
        generations: localGens,
        ratings: localRates
      };
    }

    cachedAdminData = mergedData;
    renderAdminDashboard(mergedData);
  }

  // Render Admin Dashboard
  function renderAdminDashboard(data) {
    if (!data || !data.stats) return;
    const stats = data.stats;
    const generations = data.generations || [];
    const ratings = data.ratings || [];

    // 1. KPI Counts
    if (statTotalDownloads) statTotalDownloads.textContent = stats.total_generations || 0;
    if (statUniqueUsers) statUniqueUsers.textContent = stats.unique_users || 0;
    if (statAvgRating) statAvgRating.innerHTML = `${(stats.avg_rating || 0).toFixed(1)} <span style="font-size: 0.9rem; font-weight: normal; color: var(--text-muted);">/ 5.0</span>`;
    if (statTotalRatings) statTotalRatings.textContent = stats.total_ratings || ratings.length || 0;
    if (tabCountGenerations) tabCountGenerations.textContent = generations.length;
    if (tabCountRatings) tabCountRatings.textContent = ratings.length;

    // 2. Insights
    if (insightTopSubject) insightTopSubject.textContent = stats.top_subject || 'N/A';
    if (insightTopGroup) insightTopGroup.textContent = stats.top_group || 'N/A';
    if (insightLatestTime) {
      insightLatestTime.textContent = generations.length > 0 ? formatTimeAgo(generations[0].timestamp) : 'No activity yet';
    }

    // 3. Star Rating Breakdown Bars
    if (ratingBarsContainer) {
      const starCounts = stats.star_counts || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      const maxCount = Math.max(...Object.values(starCounts), 1);
      let barsHtml = '';
      for (let star = 5; star >= 1; star--) {
        const count = starCounts[star] || 0;
        const pct = Math.round((count / maxCount) * 100);
        barsHtml += `
          <div class="rating-bar-row">
            <span class="rating-bar-label">${star} ★</span>
            <div class="rating-bar-track">
              <div class="bar-fill" style="width: ${pct}%;"></div>
            </div>
            <span class="rating-bar-count">${count}</span>
          </div>
        `;
      }
      ratingBarsContainer.innerHTML = barsHtml;
    }

    // 4. Render Roster Table
    renderRosterTable(generations);

    // 5. Render Ratings Feed
    renderRatingsFeed(ratings);
  }

  // Render Roster Table with Search & Filter
  function renderRosterTable(allGens) {
    if (!rosterTableBody) return;
    const query = rosterSearchInput ? rosterSearchInput.value.toLowerCase().trim() : '';
    const groupFilter = rosterGroupFilter ? rosterGroupFilter.value : 'all';

    const filtered = allGens.filter(g => {
      const nameMatch = (g.name || '').toLowerCase().includes(query);
      const rollMatch = (g.roll || '').toLowerCase().includes(query);
      const subMatch = (g.subject || '').toLowerCase().includes(query);
      const grpMatch = (g.group || '').toLowerCase().includes(query);
      const matchesSearch = !query || nameMatch || rollMatch || subMatch || grpMatch;

      const matchesGroup = groupFilter === 'all' || (g.group || '').toUpperCase() === groupFilter.toUpperCase();
      return matchesSearch && matchesGroup;
    });

    if (filtered.length === 0) {
      rosterTableBody.innerHTML = '';
      if (rosterEmptyState) rosterEmptyState.style.display = 'block';
      return;
    }

    if (rosterEmptyState) rosterEmptyState.style.display = 'none';

    let rowsHtml = '';
    filtered.forEach((item, idx) => {
      const timeStr = formatTimeAgo(item.timestamp);
      const ratingBadge = item.rating 
        ? `<span class="table-rating-pill">★ ${item.rating}</span>`
        : `<span style="color: var(--text-muted); font-size: 0.75rem;">—</span>`;

      rowsHtml += `
        <tr>
          <td><strong>${idx + 1}</strong></td>
          <td><strong style="color: var(--text-main);">${escapeHtml(item.name || 'Anonymous')}</strong></td>
          <td><span class="table-roll-badge">${escapeHtml(item.roll || 'N/A')}</span></td>
          <td><span style="font-weight: 600; color: var(--accent);">${escapeHtml(item.group || 'G1')}</span></td>
          <td><span style="font-size: 0.8rem; color: var(--text-muted);">${escapeHtml(item.subject || '')}</span></td>
          <td><span style="font-size: 0.76rem; color: var(--text-muted);">${timeStr}</span></td>
          <td>${ratingBadge}</td>
        </tr>
      `;
    });

    rosterTableBody.innerHTML = rowsHtml;
  }

  // Render Ratings Feed
  function renderRatingsFeed(allRatings) {
    if (!ratingsFeedList) return;

    const filtered = allRatings.filter(r => {
      if (activeStarFilter === 'all') return true;
      return parseInt(r.rating, 10) === parseInt(activeStarFilter, 10);
    });

    if (filtered.length === 0) {
      ratingsFeedList.innerHTML = '';
      if (ratingsEmptyState) ratingsEmptyState.style.display = 'block';
      return;
    }

    if (ratingsEmptyState) ratingsEmptyState.style.display = 'none';

    let feedHtml = '';
    filtered.forEach(r => {
      const starIcons = '★'.repeat(r.rating || 5) + '☆'.repeat(5 - (r.rating || 5));
      const tags = Array.isArray(r.tags) ? r.tags : [];
      const tagBadges = tags.map(t => `<span class="review-tag-badge">${escapeHtml(t)}</span>`).join('');
      const commentHtml = r.comment ? `<div class="review-comment">"${escapeHtml(r.comment)}"</div>` : '';

      feedHtml += `
        <div class="review-card">
          <div class="review-card-header">
            <div class="review-student-info">
              <span class="review-student-name">${escapeHtml(r.name || 'Anonymous Student')}</span>
              <span class="review-student-roll">${escapeHtml(r.roll || '')}</span>
            </div>
            <span class="review-date">${formatTimeAgo(r.timestamp)}</span>
          </div>
          <div class="review-rating-stars">${starIcons} (${r.rating}/5)</div>
          ${tags.length ? `<div class="review-tags">${tagBadges}</div>` : ''}
          ${commentHtml}
        </div>
      `;
    });

    ratingsFeedList.innerHTML = feedHtml;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // 19. Export to CSV Utility (Excel compatible with UTF-8 BOM)
  function exportUsageToCsv() {
    if (!cachedAdminData || !cachedAdminData.generations) {
      showToast('No data available to export.');
      return;
    }

    const generations = cachedAdminData.generations;
    const ratings = cachedAdminData.ratings || [];
    const ratingMap = {};
    ratings.forEach(r => {
      if (r.roll) ratingMap[r.roll.toLowerCase().trim()] = r;
    });

    const headers = ['S.No', 'Student Name', 'Roll Number', 'Group', 'Subject', 'Faculty', 'Date & Time', 'Rating (out of 5)', 'Feedback Comment', 'Reaction Tags', 'Device / OS'];
    const rows = [headers];

    generations.forEach((g, idx) => {
      const rollKey = (g.roll || '').toLowerCase().trim();
      const matched = ratingMap[rollKey] || {};
      const ratingVal = matched.rating || g.rating || '';
      const commentVal = matched.comment || g.comment || '';
      const tagsVal = Array.isArray(matched.tags) ? matched.tags.join('; ') : '';

      rows.push([
        idx + 1,
        `"${(g.name || '').replace(/"/g, '""')}"`,
        `"${(g.roll || '').replace(/"/g, '""')}"`,
        `"${(g.group || '').replace(/"/g, '""')}"`,
        `"${(g.subject || '').replace(/"/g, '""')}"`,
        `"${(g.teacher || '').replace(/"/g, '""')}"`,
        `"${new Date(g.timestamp || Date.now()).toLocaleString('en-IN')}"`,
        ratingVal,
        `"${commentVal.replace(/"/g, '""')}"`,
        `"${tagsVal.replace(/"/g, '""')}"`,
        `"${(g.device || '').replace(/"/g, '""')}"`
      ]);
    });

    const csvContent = '\uFEFF' + rows.map(r => r.join(',')).join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `NITJ_Lab_Cover_Usage_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('📥 Usage data exported to Excel CSV successfully!');
  }

  // 20. Event Listeners for Admin System
  if (creatorAdminTrigger) creatorAdminTrigger.addEventListener('click', openAdminAuthModal);
  if (headerAdminBtn) headerAdminBtn.addEventListener('click', openAdminAuthModal);
  if (secretAdminTriggerEgg) secretAdminTriggerEgg.addEventListener('click', openAdminAuthModal);
  if (closeAuthModalBtn) closeAuthModalBtn.addEventListener('click', closeAdminAuthModal);
  if (cancelAuthBtn) cancelAuthBtn.addEventListener('click', closeAdminAuthModal);
  if (unlockAdminBtn) unlockAdminBtn.addEventListener('click', attemptAdminUnlock);
  if (adminPasscodeInput) {
    adminPasscodeInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') attemptAdminUnlock();
    });
  }

  if (closeDashboardModalBtn) closeDashboardModalBtn.addEventListener('click', closeAdminDashboard);
  if (adminRefreshBtn) {
    adminRefreshBtn.addEventListener('click', () => {
      loadAdminDashboardData();
      showToast('🔄 Analytics refreshed!');
    });
  }
  if (adminExportCsvBtn) adminExportCsvBtn.addEventListener('click', exportUsageToCsv);

  // Admin Tab Switcher
  adminTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      adminTabBtns.forEach(b => b.classList.remove('active'));
      adminTabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = 'tab' + btn.dataset.tab.charAt(0).toUpperCase() + btn.dataset.tab.slice(1);
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // Roster Search & Filter Listeners
  if (rosterSearchInput) {
    rosterSearchInput.addEventListener('input', () => {
      if (cachedAdminData) renderRosterTable(cachedAdminData.generations || []);
    });
  }
  if (rosterGroupFilter) {
    rosterGroupFilter.addEventListener('change', () => {
      if (cachedAdminData) renderRosterTable(cachedAdminData.generations || []);
    });
  }

  // Ratings Feed Star Filter Pills
  ratingFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      ratingFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeStarFilter = pill.dataset.stars;
      if (cachedAdminData) renderRatingsFeed(cachedAdminData.ratings || []);
    });
  });

  // Passcode update in settings
  if (savePasscodeBtn) {
    savePasscodeBtn.addEventListener('click', async () => {
      const newPin = newPasscodeInput ? newPasscodeInput.value.trim() : '';
      if (!newPin || newPin.length < 3) {
        if (passcodeChangeFeedback) {
          passcodeChangeFeedback.textContent = 'Passcode must be at least 3 characters.';
          passcodeChangeFeedback.style.color = '#e53935';
          passcodeChangeFeedback.style.display = 'block';
        }
        return;
      }

      try {
        await fetch('/api/admin/set-passcode', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ oldPasscode: authenticatedPasscode, newPasscode: newPin })
        });
      } catch (e) {}

      localStorage.setItem('nitj_admin_passcode', newPin);
      authenticatedPasscode = newPin;
      if (passcodeChangeFeedback) {
        passcodeChangeFeedback.textContent = '✓ Passcode updated successfully!';
        passcodeChangeFeedback.style.color = '#25d366';
        passcodeChangeFeedback.style.display = 'block';
      }
      if (newPasscodeInput) newPasscodeInput.value = '';
    });
  }

  // Webhook save
  if (saveWebhookBtn && customWebhookUrlInput) {
    customWebhookUrlInput.value = localStorage.getItem('nitj_custom_webhook') || '';
    saveWebhookBtn.addEventListener('click', () => {
      const url = customWebhookUrlInput.value.trim();
      localStorage.setItem('nitj_custom_webhook', url);
      showToast('✓ Webhook configuration saved!');
    });
  }

  // Clear Analytics Data
  if (clearAnalyticsBtn) {
    clearAnalyticsBtn.addEventListener('click', async () => {
      if (!confirm('Are you sure you want to permanently clear all student generation & rating logs?')) {
        return;
      }

      try {
        await fetch('/api/admin/clear', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ passcode: authenticatedPasscode })
        });
      } catch (e) {}

      localStorage.removeItem('nitj_local_generations');
      localStorage.removeItem('nitj_local_ratings');
      showToast('🗑️ All analytics data has been cleared.');
      loadAdminDashboardData();
    });
  }

  // Keyboard Shortcut: Ctrl + Shift + A (or Cmd + Shift + A) to open Creator Admin Portal
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      openAdminAuthModal();
    }
  });

  // URL Hash Trigger for Admin Portal
  if (window.location.hash === '#admin') {
    setTimeout(openAdminAuthModal, 300);
  }
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#admin') {
      openAdminAuthModal();
    }
  });

  // Initial Boot
  loadUrlParams();
  updatePreview();
  autoFitZoom();
  window.addEventListener('resize', autoFitZoom);
});
