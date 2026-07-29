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

    document.getElementById("downloadBtn")
      .dataset.apk = data.apkUrl;

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
      Number(data.downloads).toLocaleString() + "+";

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

loadWebsite();

loadAnalytics();

addVisitor();