export const triggers = () => {
    const triggerList = document.querySelectorAll('.layer-trigger')
    const layers = document.querySelectorAll('.layer')
    var count = 0;
    for (let i = 0; i < triggerList.length; i++) {
        if (triggerList[i].classList.contains('animated')) {
            count = triggerList[i].dataset.trigger;
        }
    }
    for (let i = 0; i < layers.length; i++) {
        layers[i].style.display = 'none'
    }
    layers[count].style.display = 'flex'
}
