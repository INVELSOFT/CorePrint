const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
}

const enquiry = {
  brand: "",
  issue: "",
  device: "",
  inkChanged: "",
  internetChanged: ""
};

function setError(id, message) {
  const errorBox = document.getElementById(id);

  if (errorBox) {
    errorBox.textContent = message;
  }
}

function updateStep3Button() {
  const button = document.getElementById("nextStep3");

  if (!button) {
    return;
  }

  button.disabled = !(
    enquiry.device &&
    enquiry.inkChanged &&
    enquiry.internetChanged
  );
}

function showStep(stepNumber) {
  document.querySelectorAll(".wizard-step").forEach((step) => {
    step.classList.remove("active");
  });

  const nextStep = document.querySelector(`[data-step="${stepNumber}"]`);
  const progressFill = document.getElementById("progressFill");

  if (nextStep) {
    nextStep.classList.add("active");
  }

  if (progressFill) {
    progressFill.style.width = `${(stepNumber / 6) * 100}%`;
  }
}

function getYesNo(value) {
  return value || "Not answered";
}

function getCheckedText(value) {
  return value ? "Yes" : "No";
}

function renderReview() {
  const reviewGrid = document.getElementById("reviewGrid");

  if (!reviewGrid) {
    return;
  }

  const fields = [
    ["Printer Brand", enquiry.brand],
    ["Printer Model", enquiry.model || "Not provided"],
    ["Problem", enquiry.issue],
    ["Connected Device", enquiry.device],
    ["Recently Changed Ink", getYesNo(enquiry.inkChanged)],
    ["Recently Changed Internet", getYesNo(enquiry.internetChanged)],
    ["Customer Name", enquiry.name],
    ["Customer Email", enquiry.email],
    ["Customer Phone", enquiry.phone],
    ["Email Instructions", getCheckedText(enquiry.sendInstructions)],
    ["Callback Requested", getCheckedText(enquiry.requestCallback)],
    ["Message", enquiry.message || "No extra message"]
  ];

  reviewGrid.innerHTML = fields
    .map(([label, value]) => {
      return `
        <div class="review-item">
          <span>${label}</span>
          <strong>${value}</strong>
        </div>
      `;
    })
    .join("");
}

// ═══════════════════════════════════════════
//  TROUBLESHOOTING DATABASE
// ═══════════════════════════════════════════
const troubleshootingDB = {
  "Printer Offline": {
    windows: { title: "Printer Offline (Windows)", steps: ["Open Settings → Bluetooth & devices → Printers & scanners.", "Click your printer and make sure 'Use Printer Offline' is NOT checked.", "Press Win+R, type services.msc and restart the Print Spooler service.", "Open the print queue and cancel all stuck/pending documents.", "Remove the printer from Windows and re-add it via 'Add a printer'.", "Restart the printer — unplug power for 30 seconds, then plug back in."] },
    mac: { title: "Printer Offline (Mac)", steps: ["Go to Apple Menu → System Settings → Printers & Scanners.", "Remove the printer by clicking the minus (−) button.", "Right-click the printer list and choose 'Reset printing system'.", "Re-add the printer using the plus (+) button.", "Ensure your Mac and printer are on the same Wi-Fi network.", "Restart both your Mac and the printer."] }
  },
  "Printer Won't Print": {
    windows: { title: "Won't Print (Windows)", steps: ["Check the printer is set as Default Printer in Settings.", "Open the print queue and cancel all stuck jobs.", "Check ink or toner levels from the printer software.", "Run the Windows Printer Troubleshooter via Settings → Troubleshoot.", "Unplug and reconnect the USB cable, or reconnect to Wi-Fi.", "Reinstall the printer driver from the manufacturer's website."] },
    mac: { title: "Won't Print (Mac)", steps: ["Check ink levels in System Settings → Printers & Scanners → Options & Supplies.", "Open the print queue and delete all pending jobs.", "Run Print Head Cleaning from Options & Supplies → Utility.", "Remove and re-add the printer in Printers & Scanners.", "Check your USB or Wi-Fi connection.", "Download the latest driver from the manufacturer's website."] }
  },
  "Can't Connect": {
    windows: { title: "Can't Connect (Windows)", steps: ["Restart the printer, PC, and Wi-Fi router one by one.", "Verify both devices are on the same Wi-Fi network (2.4GHz vs 5GHz matters).", "Temporarily disable Windows Firewall and try connecting again.", "Reinstall the printer driver from the manufacturer's website.", "Run Windows Network Troubleshooter from Settings.", "Try a direct USB connection to rule out Wi-Fi issues."] },
    mac: { title: "Can't Connect (Mac)", steps: ["Confirm your Mac and printer are on the exact same Wi-Fi network.", "Go to System Settings → Printers & Scanners and try adding the printer.", "Use AirPrint if available — it auto-detects compatible printers.", "Reset the printing system and re-add the printer.", "Download the latest driver from the manufacturer's website.", "Restart your router and reconnect the printer to Wi-Fi."] }
  },
  "Printer Print blank paper": {
    windows: { title: "Blank Paper (Windows)", steps: ["Check ink or toner levels — replace if below 15%.", "Remove cartridges and check for protective tape still attached.", "Gently shake the cartridge side-to-side and reinstall firmly.", "Run Print Head Cleaning from the printer software on your PC.", "Print a Nozzle Check test page from the Maintenance/Utility menu.", "Check print settings — ensure density is not set to zero or 'Draft'."] },
    mac: { title: "Blank Paper (Mac)", steps: ["Check ink levels from System Settings → Printers & Scanners → Options & Supplies.", "Remove cartridges and remove any protective sealing tape.", "Run Print Head Cleaning from Options & Supplies → Utility.", "Print a Nozzle Check pattern and inspect for missing lines.", "Try printing from a different app to isolate the issue.", "Replace ink cartridges if levels are critically low."] }
  },
  "Paper Jam": {
    windows: { title: "Paper Jam (Windows)", steps: ["Turn off the printer immediately and unplug from power.", "Remove the paper tray completely and check for jammed sheets.", "Open the rear access panel and slowly pull out any stuck paper.", "Open the front cover and check inside with a torch for paper fragments.", "Fan the paper stack before reloading — do not overfill the tray.", "Plug back in, power on, and test print with a single sheet first."] },
    mac: { title: "Paper Jam (Mac)", steps: ["Turn off and unplug the printer before clearing any jam.", "Remove paper tray and clear any jammed or crumpled sheets.", "Open the back access panel and remove stuck paper slowly.", "Check inside the printer for any small torn pieces of paper.", "Reload paper correctly — align edges and do not exceed the MAX line.", "Power on and print a test page with one sheet to verify."] }
  },
  "Error code or Error message": {
    windows: { title: "Error Code (Windows)", steps: ["Write down the exact error code shown on the printer display.", "Turn off printer, hold power 10 seconds, unplug for 60 seconds.", "Reinstall all ink cartridges one by one — a loose cartridge often triggers codes.", "Open all doors/trays and check for paper scraps or foreign objects.", "Visit the manufacturer's support site and search your exact error code.", "Reinstall the printer driver if the error persists."] },
    mac: { title: "Error Code (Mac)", steps: ["Note the exact error code from the printer display or Mac notification.", "Hard reset: power off, unplug for 60 seconds, power back on.", "Remove and reinstall all ink cartridges firmly.", "Reset the printing system in System Settings → Printers & Scanners.", "Search the manufacturer's website for your specific error code.", "Contact support if the code relates to a hardware component failure."] }
  },
  "Scanner issue": {
    windows: { title: "Scanner Issue (Windows)", steps: ["Ensure the printer/scanner is powered on and connected via USB or Wi-Fi.", "Open Windows Fax and Scan or the manufacturer's scan app.", "Reinstall the scanner driver from the manufacturer's website.", "Check Windows permissions: Settings → Privacy → Camera/Scanner.", "Clean the scanner glass with a soft, lint-free cloth.", "Try scanning from a different app to isolate the issue."] },
    mac: { title: "Scanner Issue (Mac)", steps: ["Go to System Settings → Privacy & Security and allow scanner access.", "Open Image Capture or the manufacturer's scan app.", "Remove and re-add the printer/scanner in Printers & Scanners.", "Reinstall the scanner driver from the manufacturer's website.", "Clean the scanner glass gently with a lint-free cloth.", "Restart both the scanner and your Mac."] }
  },
  "Set-up a new printer": {
    windows: { title: "New Printer Setup (Windows)", steps: ["Unbox and remove all protective tape and packaging materials.", "Install ink cartridges and load paper into the tray.", "Download the full driver package from the manufacturer's website.", "Run the installer and follow on-screen setup instructions.", "Connect to Wi-Fi using the printer's control panel.", "Print a test page from Settings → Printers & scanners to confirm."] },
    mac: { title: "New Printer Setup (Mac)", steps: ["Unbox, remove all packaging, install cartridges, and load paper.", "Connect the printer to your Wi-Fi network using its control panel.", "Go to Apple Menu → System Settings → Printers & Scanners.", "Click the plus (+) button — your printer should appear on the same network.", "Select it and click Add to complete the setup.", "Print a test page to verify everything works correctly."] }
  },
  "Printing Too Slowly": {
    windows: { title: "Slow Printing (Windows)", steps: ["Change print quality from 'High' or 'Photo' to 'Draft' or 'Normal'.", "Reduce the resolution of images or compress the PDF before printing.", "Switch to USB instead of Wi-Fi for faster direct printing.", "Clear the print queue and restart the Print Spooler service.", "Move the printer closer to the router to improve Wi-Fi signal.", "Restart the printer to clear any memory buildup."] },
    mac: { title: "Slow Printing (Mac)", steps: ["In the print dialog, change quality to 'Draft' or 'Normal'.", "Compress large PDFs or reduce image resolution before printing.", "Use a USB cable instead of Wi-Fi for faster printing.", "Delete stuck jobs in the print queue.", "Move the printer closer to the Wi-Fi router.", "Restart the printer — long uptime can cause slowdowns."] }
  },
  "Poor Print Quality": {
    windows: { title: "Poor Quality (Windows)", steps: ["Check ink or toner levels — replace if below 20%.", "Run Print Head Cleaning from the printer software.", "Print a Nozzle Check page — run another cleaning if lines are broken.", "Use the correct paper type matching your printer's specification.", "Change print quality from 'Draft' to 'Standard' or 'High'.", "Run Print Head Alignment from the Maintenance/Utility menu."] },
    mac: { title: "Poor Quality (Mac)", steps: ["Check ink levels in System Settings → Printers & Scanners → Options & Supplies.", "Run Print Head Cleaning from Options & Supplies → Utility.", "Print a Nozzle Check pattern — clean again if gaps are visible.", "Switch to correct paper type for your job (photo paper for photos).", "Increase print quality in the print dialog — avoid Draft mode.", "Run a Print Head Alignment from the Utility/Maintenance menu."] }
  },
  "Making Strange Noises": {
    windows: { title: "Strange Noises (Windows)", steps: ["Turn off the printer immediately and check for paper jams.", "Open all doors and look for any foreign objects inside.", "Remove and reinsert the paper tray — misalignment causes grinding.", "Check that ink cartridges are fully clicked into place.", "Print a test page after clearing any obstructions.", "If grinding continues, the issue may be mechanical — contact support."] },
    mac: { title: "Strange Noises (Mac)", steps: ["Power off immediately and inspect for a paper jam or obstruction.", "Open all trays/covers and remove any foreign objects.", "Reinstall cartridges — a loose cartridge can cause rattling.", "Check that the paper tray is properly seated.", "Print a single test sheet after inspecting.", "Persistent mechanical noise requires technical support."] }
  },
  "Wireless Printer Keeps Disconnecting": {
    windows: { title: "Wi-Fi Disconnecting (Windows)", steps: ["Restart the printer, PC, and Wi-Fi router.", "Assign a static IP to the printer via your router's admin panel.", "Connect to 2.4GHz network — it has more stable range than 5GHz.", "Reinstall the printer driver from the manufacturer's website.", "Disable power-saving settings on the printer that disconnect Wi-Fi.", "Move the printer closer to the router to improve signal strength."] },
    mac: { title: "Wi-Fi Disconnecting (Mac)", steps: ["Restart the printer and Mac, then reconnect to Wi-Fi.", "Assign the printer a static IP from your router settings.", "Use 2.4GHz network — it provides better range than 5GHz.", "Remove and re-add the printer in System Settings → Printers & Scanners.", "Turn off the printer's sleep/power-save mode if available.", "Ensure no other devices are causing Wi-Fi interference nearby."] }
  }
};

// ── Sub-step helper ──
function showSubStep(name) {
  // hide all sub-step screens
  ["6a","6b","6c"].forEach(id => {
    const el = document.querySelector(`[data-step="${id}"]`);
    if (el) el.classList.remove("active");
  });
  const target = document.querySelector(`[data-step="${name}"]`);
  if (target) target.classList.add("active");
  // scroll wizard into view
  const wiz = document.querySelector(".wizard");
  if (wiz) wiz.scrollIntoView({ behavior: "smooth", block: "start" });
}

function showSolution() {
  console.log("Final lead ready to send:", enquiry);

  // ── Populate Steps ──
  const db = troubleshootingDB[enquiry.issue];
  const isMac     = enquiry.device === "Mac computer";
  const isWindows = enquiry.device === "Windows computer";

  const winData = db ? db.windows : {
    title: `${enquiry.issue} (Windows)`,
    steps: ["Restart the printer and wait for all lights to stabilise.", "Check the Wi-Fi or USB connection is secure.", "Clear the print queue and restart the Print Spooler service.", "Reinstall the printer driver from the manufacturer's website.", "Contact our expert team if the issue persists."]
  };
  const macData = db ? db.mac : {
    title: `${enquiry.issue} (Mac)`,
    steps: ["Restart the printer and your Mac.", "Go to System Settings → Printers & Scanners.", "Remove and re-add the printer.", "Download the latest driver from the manufacturer's website.", "Contact our expert team if the issue persists."]
  };

  // ── Steps Header Sub ──
  const stHeaderSub = document.getElementById("stHeaderSub");
  if (stHeaderSub) stHeaderSub.textContent =
    `Follow these step-by-step instructions based on the issue you selected: ${enquiry.brand} · ${enquiry.issue}.`;

  const stIssueTitle = document.getElementById("stIssueTitle");
  if (stIssueTitle) stIssueTitle.textContent = `${enquiry.brand} — ${enquiry.issue}`;

  // ── Build Windows column ──
  document.getElementById("stTitleWindows").textContent = winData.title;
  document.getElementById("stStepsWindows").innerHTML = winData.steps
    .map(s => `<li><span class="st-chk">✔</span>${s}</li>`).join("");

  // ── Build Mac column ──
  document.getElementById("stTitleMac").textContent = macData.title;
  document.getElementById("stStepsMac").innerHTML = macData.steps
    .map(s => `<li><span class="st-chk">✔</span>${s}</li>`).join("");

  // ── Show/hide columns by device ──
  const colWin = document.getElementById("stColWindows");
  const colMac = document.getElementById("stColMac");
  const cols   = document.getElementById("stColumns");
  if (isMac) {
    colWin.style.display = "none"; colMac.style.display = "block";
    if (cols) cols.style.gridTemplateColumns = "1fr";
  } else if (isWindows) {
    colMac.style.display = "none"; colWin.style.display = "block";
    if (cols) cols.style.gridTemplateColumns = "1fr";
  } else {
    colWin.style.display = "block"; colMac.style.display = "block";
    if (cols) cols.style.gridTemplateColumns = "";
  }

  // ── Populate Thank You name ──
  const tyName = document.getElementById("tyCustomerName");
  if (tyName) tyName.textContent = enquiry.name || "";

  // ── Show Step 6 then sub-step 6a ──
  showStep(6);         // makes the wizard-step[data-step="6a"] container visible — but we need a different approach
  // Since we replaced data-step="6" with three separate wizard-steps (6a/6b/6c),
  // showStep() won't match. So we manually show 6a:
  document.querySelectorAll(".wizard-step").forEach(s => s.classList.remove("active"));
  showSubStep("6a");

  // Update progress to 100%
  const pf = document.getElementById("progressFill");
  if (pf) pf.style.width = "100%";
}

document.querySelectorAll(".option-card").forEach((card) => {
  card.addEventListener("click", () => {
    const field = card.dataset.field;
    const value = card.dataset.value;

    enquiry[field] = value;

    document.querySelectorAll(`[data-field="${field}"]`).forEach((item) => {
      item.classList.remove("selected");
    });

    card.classList.add("selected");

    if (field === "brand") {
      document.getElementById("nextStep1").disabled = false;
    }

    if (field === "issue") {
      document.getElementById("nextStep2").disabled = false;
    }

    if (field === "device") {
      updateStep3Button();
    }
  });
});

document.querySelectorAll(".choice-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const field = button.dataset.field;
    const value = button.dataset.value;

    enquiry[field] = value;

    document.querySelectorAll(`[data-field="${field}"]`).forEach((item) => {
      item.classList.remove("selected");
    });

    button.classList.add("selected");
    updateStep3Button();
  });
});

const nextStep1 = document.getElementById("nextStep1");
const nextStep2 = document.getElementById("nextStep2");
const nextStep3 = document.getElementById("nextStep3");

if (nextStep1) nextStep1.addEventListener("click", () => showStep(2));
if (nextStep2) {
  nextStep2.addEventListener("click", () => {
    const modelNumber = document.getElementById("modelNumber").value.trim();

    if (!modelNumber) {
      setError("step2Error", "Printer model number is required.");
      return;
    }

    setError("step2Error", "");
    showStep(3);
  });
}

if (nextStep3) {
  nextStep3.addEventListener("click", () => {
    if (!enquiry.device) {
      setError("step3Error", "Please select which device is connected with the printer.");
      return;
    }

    if (!enquiry.inkChanged || !enquiry.internetChanged) {
      setError("step3Error", "Please answer both questions before continuing.");
      return;
    }

    setError("step3Error", "");
    showStep(4);
  });
}

document.querySelectorAll("[data-back]").forEach((button) => {
  button.addEventListener("click", () => {
    showStep(Number(button.dataset.back));
  });
});

const wizardForm = document.getElementById("wizardForm");

if (wizardForm) {
  wizardForm.addEventListener("submit", (event) => {
    event.preventDefault();

    enquiry.name = document.getElementById("name").value;
    enquiry.email = document.getElementById("email").value;
    enquiry.phone = document.getElementById("phone").value;
    enquiry.model = document.getElementById("modelNumber").value;
    enquiry.message = document.getElementById("message").value;
    enquiry.sendInstructions = document.getElementById("sendInstructions").checked;
    enquiry.requestCallback = document.getElementById("requestCallback").checked;

    console.log("Wizard enquiry:", enquiry);

    renderReview();
    showStep(5);
  });
}

const submitLeadBtn = document.getElementById("submitLeadBtn");

if (submitLeadBtn) {

  submitLeadBtn.addEventListener("click", () => {

    const templateParams = {

      brand: enquiry.brand,
      model: enquiry.model,
      issue: enquiry.issue,
      device: enquiry.device,

      inkChanged: enquiry.inkChanged,
      internetChanged: enquiry.internetChanged,

      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone,
      message: enquiry.message,

      sendInstructions: enquiry.sendInstructions ? "Yes" : "No",
      requestCallback: enquiry.requestCallback ? "Yes" : "No"

    };

    emailjs.send(
      "service_x8r4jpj",
      "template_5iede4d",
      templateParams
    )

      .then(function (response) {

        console.log("SUCCESS!", response.status, response.text);

        showSolution();

      })

      .catch(function (error) {

        console.log("FULL ERROR:", error);

        alert(JSON.stringify(error));

      });

  });

}

const restartWizard = document.getElementById("restartWizard");

if (restartWizard) {
  restartWizard.addEventListener("click", () => {
    window.location.reload();
  });
}

// ── Continue to Self-Troubleshooting ──
const btnContinue = document.getElementById("btnContinueToSteps");
if (btnContinue) {
  btnContinue.addEventListener("click", () => {
    showSubStep("6b");
  });
}

// ── Finish → Thank You ──
const btnFinish = document.getElementById("btnFinish");
if (btnFinish) {
  btnFinish.addEventListener("click", () => {
    showSubStep("6c");
  });
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const contactStatus = document.getElementById("contactStatus");
    const country = document.getElementById("contactCountry").value;

    const templateParams = {
      name: document.getElementById("contactName").value,
      email: document.getElementById("contactEmail").value,
      phone: document.getElementById("contactPhone").value,
      brand: document.getElementById("contactBrand").value,
      issue: document.getElementById("contactIssue").value,
      model: "N/A",
      device: "N/A",
      inkChanged: "N/A",
      internetChanged: "N/A",
      sendInstructions: "N/A",
      requestCallback: "N/A",
      message: `Submitted via Contact page. Country: ${country}`
    };

    emailjs.send(
      "service_x8r4jpj",
      "template_5iede4d",
      templateParams
    )
      .then(function () {
        contactForm.reset();
        window.location.href = "thank-you.html";
      })
      .catch(function (error) {
        console.log("FULL ERROR:", error);
        contactStatus.textContent = "Something went wrong sending your message. Please try again or call us directly.";
      });
  });
}

const reviewForm = document.getElementById("reviewForm");

if (reviewForm) {
  reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const reviewName = document.getElementById("reviewName").value.trim();
    const reviewText = document.getElementById("reviewText").value.trim();
    const reviewsGrid = document.getElementById("reviewsGrid");
    const reviewStatus = document.getElementById("reviewStatus");

    const reviewCard = document.createElement("article");
    reviewCard.className = "review-card";
    reviewCard.innerHTML = `
      <div class="stars">★★★★★</div>
      <p>"${reviewText}"</p>
      <strong>— ${reviewName}</strong>
    `;

    reviewsGrid.prepend(reviewCard);
    reviewStatus.textContent = "Thank you! Your review has been added on this page.";
    reviewForm.reset();
  });
}
