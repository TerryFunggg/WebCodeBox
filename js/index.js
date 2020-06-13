/*
 * @author: Terry Fung
 * @since: Thursday, 4th June 2020 5:45:22 pm
 */

const SHOWCASE_LIMIT = 4;

const showcases_box = document.getElementById("showcases");
fetchShowcase();

// Get footer year
document.getElementById("year").innerHTML = new Date().getFullYear();

document.getElementById("refresh").addEventListener("click", function (e) {
    showcases_box.innerHTML = "";
    fetchShowcase();
});

async function fetchShowcase() {
    // Get project info form showcase.json
    const response = await fetch("./showcase.json");
    const data = await response.json();

    const shuffled = shuffleItems(data);
    const showcases = shuffled.slice(0, SHOWCASE_LIMIT);

    insertShowcase(showcases);
    initTimeLine(data);

    const collection = document.getElementsByClassName("card");

    // add onClick listener for each showcase
    addListenerForCards([...collection]);
}

function insertShowcase(showcases) {
    showcases.forEach((item) => {
        showcases_box.innerHTML += `
                <div class="col mb-4">
                    <div class="card box">
                    <iframe style="border:none; width:100%;height:500px;" class="card-img-top "
                    src="${item.link}"></iframe>
                    <div class="card-body">
                        <h4 class="card-title text-center">${item.name}</h4>
                    </div>
                    </div>
                </div>`;
    });
}

function initTimeLine(data) {
    console.log(data);
    let list = data
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const timeline = document.getElementById("timeline");
    let html = "";

    for (let index = 0; index < list.length; index++) {
        let position = "left";
        let tag = "info";

        if (index % 2 == 0) position = "right";
        if (list[index].tag.includes("css")) tag = "danger";
        html += `
        <div class="timeline-item timeline-item-${position}">
            <div class="timeline-content">
                <a href="${list[index].link}"><h4>${list[index].name}</h4></a>
                <p>post at ${list[index].createdAt}</p>
                <span class="badge badge-${tag}">${list[index].tag}</span>
            </div>
        </div>
        `;
    }
    timeline.innerHTML = html;
}

function shuffleItems(data) {
    return data
        .map((x) => {
            return { data: x, srt: Math.random() };
        })
        .sort((a, b) => {
            return a.srt - b.srt;
        })
        .map((x) => x.data);
}

function addListenerForCards(showcases) {
    showcases.forEach((element) => {
        element.addEventListener("click", function () {
            const iframe = this.childNodes[1];
            window.location = iframe.src;
        });
    });
}
