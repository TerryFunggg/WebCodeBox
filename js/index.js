const limit = 5;
let page = 1;

// get project from json file
async function getShowcase(){
   const res = await fetch('../showcase.json');
   const showcases = await res.json();
   return showcases.slice(page - 1 , limit);
//    TODO: set the limit
}

// insert project html
async function addShowcase(){
    const showcases = await getShowcase();
    let container = document.querySelector('.container');
    showcases.forEach(item => {
        container.innerHTML += `
        <a href="${item.link}" class="project ${item.tag.includes('project') ? 'span' : 'span'}">
            <div class="figure">
                <iframe src="${item.link}" frameborder="0"></iframe>
                    <div class="caption ${checkTag(item.tag)}">
                        <h3>${item.name}</h3>
                    <p class="cta">View Project <i class="fas fa-arrow-right"></i></p>
                </div>
            </div>
    </a>
        `
    });
}

function checkTag(tag){
    if(tag.includes('project')){
        return 'bg-primary';
    }else if(tag.includes('css')){
        return 'bg-secondary'
    }
}

function showLoading(){
    const loading = document.querySelector('.loader');
    loading.classList.add('show');

    setTimeout(() => {
        loading.classList.remove('show');

        setTimeout(() =>{
            page++;
            //TODO: addShowcase();
        }, 300);
    }, 1000)
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

window.addEventListener('scroll', ()=> {
    const {scrollTop, scrollHeight,clientHeight} = document.documentElement;
    
    if(scrollTop + clientHeight >= scrollHeight - 5){
        showLoading();
    }
});

addShowcase();