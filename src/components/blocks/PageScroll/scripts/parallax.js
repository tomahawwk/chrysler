const MathUtils = {
  map: (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c,
  lerp: (a, b, n) => (1 - n) * a + n * b
};

export const parallax = scroll => {

  const parallaxImage = document.querySelectorAll(".image.animated img");

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
    parallaxImage[i].querySelector('img').style.transform = `translate3d(${
      (renderedStyles.innerTranslationX.previous)
      }px, 0, 0)`;


  }
};
