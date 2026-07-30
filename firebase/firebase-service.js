import { db } from "./firebase-config.js";

import {
  doc,
  getDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// =========================
// Firestore References
// =========================

const websiteRef = doc(db, "website", "app");
const analyticsRef = doc(db, "analytics", "counters");

// =========================
// Download Counter Formatter
// =========================

function formatDownloads(count) {
  count = Number(count);

  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace(".0", "") + "M+";
  }

  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(".0", "") + "K+";
  }

  return count.toString();
}

// =========================
// Load Website Information
// =========================

async function loadWebsite() {

  const websiteSnap = await getDoc(websiteRef);

  if (websiteSnap.exists()) {

    const data = websiteSnap.data();

    document.getElementById("appName").textContent =
      data.appName;

    document.getElementById("description").textContent =
      data.description;

    document.getElementById("version").textContent =
      data.version;

    document.getElementById("updated").textContent =
      data.updated;

    document.getElementById("downloadBtn").dataset.apk =
      data.apkUrl;

    document.getElementById("messengerBtn").href =
      data.messenger;

    document.getElementById("telegramBtn").href =
      data.telegram;

    if (document.getElementById("latest")) {
      document.getElementById("latest").textContent =
        data.latest;
    }

  }

}

// =========================
// Load Analytics
// =========================

async function loadAnalytics() {

  const analyticsSnap = await getDoc(analyticsRef);

  if (analyticsSnap.exists()) {

    const data = analyticsSnap.data();

    document.getElementById("downloadCount").textContent =
      formatDownloads(data.downloads);

  }

}

// =========================
// Visitor Counter
// =========================

async function addVisitor() {

  await updateDoc(analyticsRef, {
    visitors: increment(1)
  });

}

// =========================
// Download Counter
// =========================

window.addDownload = async function () {

  await updateDoc(analyticsRef, {
    downloads: increment(1)
  });

};

// =========================
// Initialize
// =========================

loadWebsite();
loadAnalytics();
addVisitor();
