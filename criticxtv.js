let hls;

function play(url) {
    const video = document.getElementById("video");
    const status = document.getElementById("status");

    status.innerText = "Loading...";

    // old stream cleanup
    if (hls) {
        hls.destroy();
        hls = null;
    }

    // HLS support check
    if (Hls.isSupported()) {

        hls = new Hls();

        hls.loadSource(url);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
            status.innerText = "Now Playing";
        });

        hls.on(Hls.Events.ERROR, function (event, data) {
            console.log("HLS Error:", data);
            status.innerText = "Stream Error - Try Another Channel";
        });

    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {

        // Safari support
        video.src = url;

        video.addEventListener("loadedmetadata", function () {
            video.play();
            status.innerText = "Now Playing";
        });

    } else {
        status.innerText = "HLS not supported in this browser";
    }
}
