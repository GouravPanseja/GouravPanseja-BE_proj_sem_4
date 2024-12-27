import lerp from "lerp";
export default function animateVideo(videoSection,video, headerLeft, headerRight){
   

    let {bottom} = videoSection.getBoundingClientRect();
    
    let scale = 1 - ((bottom - window.innerHeight) * .0005)

    if (scale < 0.2) scale = 0.2;
    else if (scale > 1) scale = 1;

    video.style.transform = `scale(${scale})`
    
    console.log(video.getBoundingClientRect());
    // Text transformation 

    let textTrans = bottom - window.innerHeight;
    if(textTrans < 0) textTrans = 0;
    headerLeft.style.transform = `translateX(${-textTrans}px)`
    headerRight.style.transform = `translateX(${textTrans}px)`

}  

// // PROJECTS // //


// let projectTargetX = 0;
// let projectCurrentX = 0;

// let percentages = {
//     small: 700,
//     medium:300,
//     large:100
// }
// function setLimit(){
//     let limit;

//     if(window.innerWidth <= 600){
//         limit = percentages.small;
//     }
//     else if(window.innerWidth <= 1100){
//         limit = percentages.medium;
//     }
//     else limit = percentages.large;


// }

// window.addEventListener("resize",setLimit);

         
// function animateProjects(main,projectSlider, projectsSticky){
//     let offsetTop = projectsSticky.parentElement.offsetTop;
    
//     let percentage = (main.scrollTop - offsetTop) / window.innerHeight *100;

//     projectTargetX = percentage;
//     projectCurrentX = lerp(projectCurrentX, projectTargetX,.1);

//     projectSlider.style.transform = `translate3d(${-(projectCurrentX)})vw,0,0)`
// }

// export function animate(main,projectSlider,projectsSticky){
//     console.log()
//     animateProjects(main,projectSlider,projectsSticky);

// }
let projectTargetX = 0;
let projectCurrentX = 0;

let percentages = {
    small: 700,
    medium: 300,
    large: 100
}


let limit = window.innerWidth <= 600 ? percentages.small :
            window.innerWidth <= 1100 ? percentages.medium :
            percentages.large;

function setLimit(){
    limit = window.innerWidth <= 600 ? percentages.small :
            window.innerWidth <= 1100 ? percentages.medium :
            percentages.large
}

window.addEventListener('resize', setLimit);

export function animateProjects(main,projectsSticky,projectSlider){

    let offsetTop = projectsSticky.parentElement.offsetTop;
    let percentage = ((main.scrollTop - offsetTop) / window.innerHeight) * 100;
    
    percentage = percentage < 0 ? 0 : percentage > limit ? limit : percentage;
    projectTargetX = percentage;
    projectCurrentX = lerp(projectCurrentX, projectTargetX, .1);
    projectSlider.style.transform = `translate3d(${-(projectCurrentX)}vw, 0 , 0)`;
}


// post animation


console.log()

export function scrollBlogPosts(blogSection, blogPosts){
    let blogSectionTop  =blogSection.getBoundingClientRect().top;

    for(let i = 0; i < blogPosts.length ; i++){
        if(blogPosts[i].parentElement.getBoundingClientRect().top <= 1){
            // +1 to account for the frist blog tilte div
            let offset = (blogSectionTop + (window.innerHeight * (i +1 ))) * 0.0005;
            
            offset = offset < -1 ? -1 : offset >= 0 ? 0 : offset;

            blogPosts[i].style.transform = `scale(${1 + offset})`
        }
    }
}

// circle animation



export function scrollCircle(circleSection,circle){
    let {top} =  circleSection.getBoundingClientRect();

    let scaleTop = Math.abs(top);
    let scale = (scaleTop/window.innerHeight);

    scale = scale < 0 ? 0 : scale > 1 ? 1 : scale;

    if(top <= 0){
        circle.style.transform = `translate(-50% , -50%) scale(${scale})`
    }
    else{   
        circle.style.transform = `translate(-50% , -50%) scale(${0})`
    }

}

export function scrollDiscover(CircleContainer, leftText, rightText){
    let {bottom} = CircleContainer.getBoundingClientRect();

    let textTrans = bottom - window.innerHeight;
 
    textTrans = textTrans < 0 ? 0 : textTrans;
    leftText.style.transform= `translateX(${-textTrans}px)`;
    rightText.style.transform= `translateX(${-textTrans}px)`;

}



