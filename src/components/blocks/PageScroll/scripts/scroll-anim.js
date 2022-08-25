
import { observe } from './custom'
export let scrollAnim = (scroll) => {
  console.log(observe)
  const options = {
    threshold: [0, 1]
  };
  const addEffect = (elem) => {
    elem.target.classList.add('animated');
  }
  const removeEffect = (elem) => {
    elem.target.classList.remove('animated');
  }
  const observer = new IntersectionObserver(items => {
    items.forEach(elem => {
      if (elem.isIntersecting) {
        addEffect(elem);
      }
      else {
        removeEffect(elem);
      }
    });
  }, options);

  observe(observer);
}