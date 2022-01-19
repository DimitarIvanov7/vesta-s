//animation on scrolling

function observeFunc(anim, option, threshHold){
    
    const observer = new IntersectionObserver(function(entries){
        entries.forEach(entry =>{
            if(entry.isIntersecting){
                entry.target.classList.add(option)
            }
            
        })
    }, {
        threshold: threshHold,
    })

    observer.observe(anim);
}


function displayAnimation(){
    const upAnim = document.querySelectorAll(".up-anim");
    const leftAnim = document.querySelectorAll(".left-anim");
    const rightAnim = document.querySelectorAll(".right-anim");

    upAnim.forEach(anim => {
        observeFunc(anim, "up-anim-show", 0)
    });

    leftAnim.forEach(anim => {
        observeFunc(anim, "left-anim-show", .3)
    });

    rightAnim.forEach(anim => {
        observeFunc(anim, "right-anim-show", .3)
    });

}