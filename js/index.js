const limit = 5;
let page = 1;

let container = document.querySelector(".container");

// get project from json file
async function getShowcase() {
    const res = await fetch("../showcase.json");
    const showcases = await res.json();
    return showcases.reverse().slice(page - 1, limit);
    //    TODO: set the limit
}

// insert project html
async function addShowcase() {
    const showcases = await getShowcase();
    container.innerHTML += showcases.map( showcaseTemplate ).join("");
}

let showcaseTemplate = ( (showcase) => {
    return `<a href="${showcase.link}" class="project ${
        showcase.tag.includes("project") ? "span" : "span"
    }">
            <div class="figure">
                <iframe src="${showcase.link}" frameborder="0"></iframe>
                    <div class="caption ${checkTag(showcase.tag)}">
                        <h3>${showcase.name}</h3>
                    <p class="cta">View Project <i class="fas fa-arrow-right"></i></p>
                </div>
            </div>
    </a> `;
});

function checkTag(tag) {
    if (tag.includes("project")) 
        return "bg-primary";
     if (tag.includes("css")) 
        return "bg-secondary";
}

function showLoading() {
    const loading = document.querySelector(".loader");
    loading.classList.add("show");

    setTimeout(() => {
        loading.classList.remove("show");

        setTimeout(() => {
            page++;
            //TODO: addShowcase();
        }, 300);
    }, 1000);
}


window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }
});

addShowcase();
