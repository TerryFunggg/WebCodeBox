const card = document.querySelector(".card");
document.getElementById('refresh').addEventListener('click',function(e){
    alert("Sorry! Still developing")
});

card.addEventListener("click",function(e){
   const iframe =  this.childNodes[1];
   window.location = iframe.src;
})