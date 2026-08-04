import { db, auth } from "./firebase/firebase-config.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// =====================================
// Firestore References
// =====================================

const websiteRef = doc(db, "website", "app");
const analyticsRef = doc(db, "analytics", "counters");


// =====================================
// HTML Elements
// =====================================

const logoutBtn = document.getElementById("logoutBtn");
const saveBtn = document.getElementById("saveBtn");

const downloads = document.getElementById("downloads");
const visitors = document.getElementById("visitors");

const appName = document.getElementById("appName");
const version = document.getElementById("version");
const updated = document.getElementById("updated");
const apkUrl = document.getElementById("apkUrl");

const description = document.getElementById("description");
const latest = document.getElementById("latest");

const messenger = document.getElementById("messenger");
const telegram = document.getElementById("telegram");


// =====================================
// Authentication
// =====================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.replace("index.html");

        return;

    }

    await loadDashboard();

});


// =====================================
// Load Dashboard
// =====================================

async function loadDashboard() {

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

            const analytics = analyticsSnap.data();

            downloads.textContent =
                Number(analytics.downloads || 0).toLocaleString();

            visitors.textContent =
                Number(analytics.visitors || 0).toLocaleString();

        }

    }

    catch (error) {

        console.error(error);

        alert("Failed to load dashboard.");

    }

}// =====================================
// Save Changes
// =====================================

if (saveBtn) {

    saveBtn.addEventListener("click", async () => {

        saveBtn.disabled = true;

        const oldText = saveBtn.textContent;

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

            saveBtn.textContent = "✅ Saved Successfully";

            setTimeout(() => {

                saveBtn.textContent = oldText;

                saveBtn.disabled = false;

            }, 2000);

        }

        catch (error) {

            console.error(error);

            alert("Failed to save changes.");

            saveBtn.textContent = oldText;

            saveBtn.disabled = false;

        }

    });

}// =====================================
// Logout
// =====================================

if (logoutBtn) {

    logoutBtn.addEventListener("click", async () => {

        const confirmLogout = confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmLogout) return;

        try {

            await signOut(auth);

            window.location.replace("index.html");

        }

        catch (error) {

            console.error(error);

            alert("Logout failed.");

        }

    });

}


// =====================================
// Refresh Dashboard
// =====================================

window.refreshDashboard = async function () {

    await loadDashboard();

};


// =====================================
// Auto Refresh (Optional)
// =====================================

// প্রতি 60 সেকেন্ডে Firestore থেকে নতুন ডাটা লোড করবে
setInterval(() => {

    loadDashboard();

}, 60000);


// =====================================
// Dashboard Ready
// =====================================

console.log("✅ CriticX TV Admin Panel Ready");
