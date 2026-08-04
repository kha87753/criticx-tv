// ===============================
// CriticX TV Official Website
// script.js
// ===============================

let APK_URL = "";

const downloadBtn = document.getElementById("downloadBtn");
const popup = document.getElementById("downloadPopup");
const countdown = document.getElementById("countdown");


// ===================================
// Download Button
// ===================================

downloadBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    APK_URL = downloadBtn.dataset.apk;

    if (!APK_URL) {

        alert("Download link is not available.");

        return;

    }

    downloadBtn.style.pointerEvents = "none";

    // Increase Download Counter
    if (window.addDownload) {

        await window.addDownload();

    }

    popup.style.display = "flex";

    let time = 3;

    countdown.innerHTML = time;

    const timer = setInterval(() => {

        time--;

        countdown.innerHTML = time;

        if (time <= 0) {

            clearInterval(timer);

            popup.style.display = "none";

            downloadBtn.style.pointerEvents = "auto";

            window.location.href = APK_URL;

        }

    }, 1000);

});


// ===================================
// Screenshot Auto Slider
// ===================================

const screenList = document.querySelector(".screen-list");

if (screenList) {

    let direction = 1;

    setInterval(() => {

        if (direction === 1) {

            screenList.scrollLeft += 280;

            if (

                screenList.scrollLeft >=

                screenList.scrollWidth -

                screenList.clientWidth

            ) {

                direction = 0;

            }

        } else {

            screenList.scrollLeft -= 280;

            if (screenList.scrollLeft <= 0) {

                direction = 1;

            }

        }

    }, 2500);

}


// ===================================
// Fade Animation
// ===================================

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0px)";

        }

    });

});

document

.querySelectorAll(

".card,.feature-card,.screenshots,.why,.community,.ads"

)

.forEach((el) => {

    el.style.opacity = "0";

    el.style.transform = "translateY(40px)";

    el.style.transition = ".8s";

    observer.observe(el);

});


// ===================================
// Console
// ===================================

console.log("CriticX TV Official Website Loaded 🚀");