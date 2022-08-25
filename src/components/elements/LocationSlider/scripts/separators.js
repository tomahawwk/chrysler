export const separators = () => {
    const separators = document.querySelectorAll('.swiper-pagination-fraction')
    for(let i = 0; i < separators.length; i++){
      separators[i].innerHTML = separators[i].innerHTML.replace(' / ', '');
    }
}