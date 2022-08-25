export const observe = (observer) => {
    const anim = document.querySelectorAll('.observe');
    for(let i = 0; i < anim.length; i++){
        observer.observe(anim[i]);
    }
}