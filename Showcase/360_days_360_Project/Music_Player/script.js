try {
    (async function () {
         var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if(isSafari) alert("For some technique problrem. You may need to use Google Chrome to open this app.")

        const musicContainer = document.getElementById("music_container");

        const playBtn = document.getElementById("play");
        const prevBtn = document.getElementById("prev");
        const nextBtn = document.getElementById("next");

        const audio = document.getElementById("audio");
        const progress = document.getElementById("progress");
        const progressContainer = document.getElementById("progress_container");

        const title = document.getElementById("title");
        const cover = document.getElementById("cover");

        // song title
        let songs = [];

        //keep track of song
        let songIndex = +0;

        await fetchPlayList();

        // Initially load song details into DOM
        await loadSong(songs[songIndex]);

        // fetch playlist
        async function fetchPlayList() {
            let json = await fetch(
                "https://api.imjad.cn/cloudmusic/?type=playlist&id=2073101707"
            );
            const playList_one = await json.json();
            json = await fetch(
                "https://api.imjad.cn/cloudmusic/?type=playlist&id=578054567"
            );
            const playList_two = await json.json();
            songs = [...playList_one.privileges, ...playList_two.privileges];
        }

        // update song details
        async function loadSong(song) {
            const detail_json = await fetch(
                `https://api.imjad.cn/cloudmusic/?type=detail&id=${song.id}`
            );
            const detail = await detail_json.json();
            const music_json = await fetch(
                `https://api.imjad.cn/cloudmusic/?type=song&id=${song.id}`
            );
            const music = await music_json.json();

            title.innerText = detail.songs[0].al.name || "";
            audio.src = music.data[0].url || "";
            cover.src = detail.songs[0].al.picUrl || "";
        }

        function playSong() {
            musicContainer.classList.add("play");
            playBtn.querySelector("i.fas").classList.remove("fa-play");
            playBtn.querySelector("i.fas").classList.add("fa-pause");

            audio.play();
        }

        function pauseSong() {
            musicContainer.classList.remove("play");
            playBtn.querySelector("i.fas").classList.add("fa-play");
            playBtn.querySelector("i.fas").classList.remove("fa-pause");

            audio.pause();
        }

        function prevSong() {
            if (--songIndex < 0) {
                songIndex = songs.length - 1;
            }

            loadSong(songs[songIndex]);
            playSong();
        }

        function nextSong() {
            if (++songIndex > songs.length - 1) {
                songIndex = 0;
            }

            loadSong(songs[songIndex]);
            playSong();
        }

        // Update progress bar
        function updateProgress(e) {
            const { duration, currentTime } = e.srcElement;
            const precent = (currentTime / duration) * 100;
            progress.style.width = `${precent}%`;
        }

        function setProgress(e) {
            // get total width of progress bar
            const width = this.clientWidth;
            // get User click x position
            const clickX = e.offsetX;
            const duration = audio.duration;

            audio.currentTime = (clickX / width) * duration;
        }

        // Event listeners
        playBtn.addEventListener("click", () => {
            const isPlaying = musicContainer.classList.contains("play");

            if (isPlaying) {
                pauseSong();
            } else {
                playSong();
            }
        });

        // Change song
        prevBtn.addEventListener("click", prevSong);
        nextBtn.addEventListener("click", nextSong);

        //Click progress bar
        progressContainer.addEventListener("click", setProgress);

        // Time/song update
        audio.addEventListener("timeupdate", updateProgress);

        // when Song ends change to next song
        audio.addEventListener("ended", nextSong);
    })();
} catch (e) {
    alert("sorry.Please wait a moment.Api server have some problem");
}
