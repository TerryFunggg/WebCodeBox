new hoverEffect({
    parent:document.querySelector('.distortion'),
    intensity: 0.2,
    image1:'./images/01.png',
    image2:'./images/02.png',
    displacementImage:'./images/diss.png',
    imagesRatio: 380 / 300
})


TweenMax.staggerFrom(".navbar div" , 1.5 , {
    delay: 1.5,
    opacity:0,
    y:"20",
    ease:Expo.easeInOut
},0.08);

TweenMax.staggerFrom(".media ul li" , 1.5 , {
    delay: 1.5,
    opacity:0,
    x:"-20",
    ease:Expo.easeInOut
},0.08);

TweenMax.from(".text h1 .hidetext" , 1.5 , {
    delay: 0.5,
    y:"100%",
    ease:Expo.easeInOut
});

TweenMax.from(".text h3 .hidetext" , 1.5 , {
    delay: 0.8,
    y:"100%",
    ease:Expo.easeInOut
})

TweenMax.from(".text p .hidetext" , 1.5 , {
    delay: 0.9,
    y:"100%",
    ease:Expo.easeInOut
})

TweenMax.from(".text h2" , 1.5 , {
    delay: 1,
    opacity:0,
    x:"-10000",
    ease:Expo.easeInOut
})


TweenMax.from(".sponsor img" , 1.5 , {
    delay: 1.5,
    opacity:0,
    y:"20",
    ease:Expo.easeInOut
});

TweenMax.from(".sponsor p" , 1.5 , {
    delay: 1.6,
    opacity:0,
    y:"20",
    ease:Expo.easeInOut
});

TweenMax.from(".distortion" , 1.5 , {
    delay: 2,
    opacity:0,
    y:"20",
    ease:Expo.easeInOut
});

/*  Overlay */
TweenMax.to(".first", 1.5 , {
    delay:.3,
    top:"-100%",
    ease:Expo.easeInOut
});

TweenMax.to(".second", 1.5 , {
    delay:.4,
    top:"-100%",
    ease:Expo.easeInOut
});

TweenMax.to(".thrid", 1.5 , {
    delay:.5,
    top:"-100%",
    ease:Expo.easeInOut
});
