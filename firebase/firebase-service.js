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
// Download Formatter
// =========================

function formatDownloads(count) {

  count = Number(count);

  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace(".0", "") + "M+";
  }

  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(".0", "") + "K+";
  }

  return count.toLocaleString();

}

// =========================
// Premium Animated Counter
// =========================

function animateDownloads(target) {

  const element = document.getElementById("downloadCount");

  target = Number(target);

  // Start only 200-250 downloads lower
  const distance = 200 + Math.floor(Math.random() * 51);

  let start = Math.max(target - distance, 0);

  const duration = 900;
  const startTime = performance.now();

  function animate(now) {

    const progress = Math.min(
      (now - startTime) / duration,
      1
    );

    const value = Math.floor(
      start + (target - start) * progress
    );

    if (progress < 1) {

      element.textContent = value.toLocaleString();

      requestAnimationFrame(animate);

    } else {

      element.textContent = formatDownloads(target);

    }

  }

  requestAnimationFrame(animate);

}

// =========================
// Load Website
// =========================

async function loadWebsite() {

  const snap = await getDoc(websiteRef);

  if (!snap.exists()) return;

  const data = snap.data();

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

// =========================
// Load Analytics
// =========================

async function loadAnalytics() {

  const snap = await getDoc(analyticsRef);

  if (!snap.exists()) return;

  const data = snap.data();

  animateDownloads(data.downloads);

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
