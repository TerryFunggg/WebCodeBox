/*
 * @author: Terry Fung
 * @since: Thursday, 4th June 2020 5:45:22 pm
 */
const SHOWCASE_LIMIT = 4;

const showcases_box = document.getElementById("showcases");
fetchShowcase();

// Get footer year
document.getElementById('year').innerHTML = new Date().getFullYear();

document.getElementById("refresh").addEventListener("click", function (e) {
    alert("Sorry! Still developing");
});

async function fetchShowcase() {
    // Get project info form showcase.json
    const response = await fetch("./showcase.json");
    const data = await response.json();

    const shuffled = shuffleItems(data);
    const showcases = shuffled.slice(0, SHOWCASE_LIMIT);

    insertShowcase(showcases);

    const collection = document.getElementsByClassName("card");
   
    // add onClick listener for each showcase
    addListenerForCards([...collection]);
    
}

function insertShowcase(showcases) {
    showcases.forEach((item) => {
        showcases_box.innerHTML += `
                <div class="col mb-4">
                    <div class="card box">
                    <iframe style="border:none; width:100%;height:450px;" class="card-img-top "
                    src="${item.link}"></iframe>
                    <div class="card-body">
                        <h4 class="card-title text-center">${item.name}</h4>
                    </div>
                    </div>
                </div>`;
    });
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

function addListenerForCards(showcases){
showcases.forEach((element) => {
    element.addEventListener("click", function () {
        const iframe = this.childNodes[1];
        window.location = iframe.src;
    });
});
}

