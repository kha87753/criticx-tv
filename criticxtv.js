let hls;

function play(url) {
    const video = document.getElementById("video");
    const status = document.getElementById("status");

    status.innerText = "Loading...";

    if (hls) {
        hls.destroy();
    }

    if (Hls.isSupported()) {

        hls = new Hls();

        hls.loadSource(url);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
            status.innerText = "Live Playing ✔";
        });

        hls.on(Hls.Events.ERROR, function () {
            status.innerText = "Stream Error ❌";
        });

    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {

        video.src = url;

        video.addEventListener("loadedmetadata", function () {
            video.play();
            status.innerText = "Live Playing ✔";
        });

    } else {
        status.innerText = "HLS Not Supported ❌";
    }
}