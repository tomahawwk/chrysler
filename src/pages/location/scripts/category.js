import ScrollBooster from "scrollbooster";
export let Category = (categoryList, sliderLay) => {
  scroll();
};

const scroll = () => {
  let viewport = document.querySelector(".category__wrap");
  let content = document.querySelector(".category");
  let sb = new ScrollBooster({
    viewport,
    content,
    mode: "x",
    onUpdate: data => {
      content.style.transform = `translateX(${-data.position.x}px)`;
    }
  });
};
