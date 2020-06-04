const showcaseOnClick = e =>{
    console.log(e.childNodes);
    const iframe =  this.childNodes[1];
   window.location = iframe.src;
}

const collection = document.getElementsByClassName("card");
let showcases = [...collection];

showcases.forEach(element => {
    element.addEventListener("click",function(){
        const iframe =  this.childNodes[1];
        window.location = iframe.src;
    });
});
document.getElementById('refresh').addEventListener('click',function(e){
    alert("Sorry! Still developing")
});

