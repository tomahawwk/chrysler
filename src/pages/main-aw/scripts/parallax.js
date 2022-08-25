const MathUtils = {
  map: (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c,
  lerp: (a, b, n) => (1 - n) * a + n * b
};

export const parallax = scroll => {
  if (scroll > 300) {
    //document.querySelector('.f-title').classList.add('fade')
    //document.querySelector('.f-subtitle').classList.add('fade')
    document.querySelector(".activeScroll").classList.add("hidden");
  }
  else {
    //document.querySelector('.f-title').classList.remove('fade')
    //document.querySelector('.f-subtitle').classList.remove('fade')
    document.querySelector(".activeScroll").classList.remove("hidden");
  }
  const parallaxImage = document.querySelectorAll(".pic__item.animated");

  const renderedStyles = {
    innerTranslationX: {
      previous: 0,
      current: 0,
      ease: 0.3,
      maxValue: 120
    }
  };
  for (let i = 0; i < parallaxImage.length; i++) {
    const setValue = () => {
      const maxValue = renderedStyles.innerTranslationX.maxValue;
      const minValue = -1 * maxValue;
      return Math.max(
        Math.min(
          MathUtils.map(
            parallaxImage[i].getBoundingClientRect().left,
            window.innerWidth,
            -1 * parallaxImage[i].offsetWidth,
            minValue,
            maxValue
          ),
          maxValue
        ),
        minValue
      );
    };
    for (const key in renderedStyles) {
      renderedStyles[key].current = setValue();
      renderedStyles[key].previous = MathUtils.lerp(
        renderedStyles[key].previous,
        renderedStyles[key].current,
        renderedStyles[key].ease
      );
    }
    parallaxImage[i].style.transform = `translate3d(${
      (renderedStyles.innerTranslationX.previous) * 1.5
      }px, 0, 0)`;

  }
};
