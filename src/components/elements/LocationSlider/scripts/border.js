export const border = () => {
  const sliderBorder = document.querySelector(".slider__border");
  if (sliderBorder) {
    var lines = sliderBorder.querySelectorAll(".stroke");
    const time = 2500;
    const step = time / lines.length;
    const animateBorder = () => {
      for (let i = 0; i < lines.length; i++) {
        lines[0].classList.add("stroke--active");
        setTimeout(() => {
          if (i > 0) {
            if (lines[i - 1].classList.contains("stroke--active")) {
              lines[i].classList.add("stroke--active");
            }
          }
        }, step * i);
      }
    };
    animateBorder();
  }
};

export const clearBorder = () => {
  var lines = document.querySelectorAll(".stroke");
  for (let i = 0; i < lines.length; i++) {
    lines[i].classList.remove("stroke--active");
    lines[i].style.display = "none";
    setTimeout(() => {
      lines[i].style.display = "block";
    }, 10);
  }
};
