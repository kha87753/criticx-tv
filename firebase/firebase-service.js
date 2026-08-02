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
// Formatter
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
// Animated Counter
// =========================

function animateDownloads(target) {

  const element = document.getElementById("downloadCount");

  target = Number(target);

  // Start from 8% - 15% lower
  const randomPercent = 0.08 + Math.random() * 0.07;

  let current = Math.max(
    Math.floor(target * (1 - randomPercent)),
    0
  );

  const duration = 900; // milliseconds

  const startTime = performance.now();

  function update(now) {

    const progress = Math.min(
      (now - startTime) / duration,
      1
    );

    const value = Math.floor(
      current + (target - current) * progress
    );

    if (progress < 1) {

      element.textContent = value.toLocaleString();

      requestAnimationFrame(update);

    } else {

      element.textContent = formatDownloads(target);

    }

  }

  requestAnimationFrame(update);

}

// =========================
// Load Website
// =========================

async function loadWebsite() {

  const websiteSnap = await getDoc(websiteRef);

  if (!websiteSnap.exists()) return;

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

// =========================
// Load Analytics
// =========================

async function loadAnalytics() {

  const analyticsSnap = await getDoc(analyticsRef);

  if (!analyticsSnap.exists()) return;

  const data = analyticsSnap.data();

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
