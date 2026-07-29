import { db, auth } from "../firebase/firebase-config.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const logoutBtn = document.getElementById("logoutBtn");
const saveBtn = document.getElementById("saveBtn");

// Stats
const downloads = document.getElementById("downloads");
const visitors = document.getElementById("visitors");

// Inputs
const appName = document.getElementById("appName");
const version = document.getElementById("version");
const updated = document.getElementById("updated");
const apkUrl = document.getElementById("apkUrl");
const description = document.getElementById("description");
const latest = document.getElementById("latest");
const messenger = document.getElementById("messenger");
const telegram = document.getElementById("telegram");

const websiteRef = doc(db, "website", "app");
const analyticsRef = doc(db, "analytics", "counters");


// =======================
// Login Check
// =======================

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";

        return;

    }

    loadData();

});


// =======================
// Load Firestore Data
// =======================

async function loadData() {

    try {

        const websiteSnap = await getDoc(websiteRef);

        if (websiteSnap.exists()) {

            const data = websiteSnap.data();

            appName.value = data.appName || "";
            version.value = data.version || "";
            updated.value = data.updated || "";
            apkUrl.value = data.apkUrl || "";
            description.value = data.description || "";
            latest.value = data.latest || "";
            messenger.value = data.messenger || "";
            telegram.value = data.telegram || "";

        }

        const analyticsSnap = await getDoc(analyticsRef);

        if (analyticsSnap.exists()) {

            const data = analyticsSnap.data();

            downloads.textContent = data.downloads || 0;
            visitors.textContent = data.visitors || 0;

        }

    } catch (error) {

        console.error(error);
        alert("Failed to load data.");

    }

}


// =======================
// Save Changes
// =======================

saveBtn.addEventListener("click", async () => {

    saveBtn.disabled = true;
    saveBtn.textContent = "Saving...";

    try {

        await updateDoc(websiteRef, {

            appName: appName.value.trim(),
            version: version.value.trim(),
            updated: updated.value.trim(),
            apkUrl: apkUrl.value.trim(),
            description: description.value.trim(),
            latest: latest.value.trim(),
            messenger: messenger.value.trim(),
            telegram: telegram.value.trim()

        });

        alert("Website updated successfully.");

    } catch (error) {

        console.error(error);
        alert("Update failed.");

    }

    saveBtn.disabled = false;
    saveBtn.textContent = "💾 Save Changes";

});


// =======================
// Logout
// =======================

logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "login.html";

});