import TweenMax from "gsap/TweenMax";
import initPageTransitions from "./initPageTransitions";

class Demo3 {
    constructor() {
        initPageTransitions();
        this.initCursor();
        this.initHovers();
    }
    initCursor() {
        const { Back } = window;
        this.outerCursor = document.querySelector(".circle-cursor--outer");
        this.innerCursor = document.querySelector(".circle-cursor--inner");
        this.outerCursorBox = this.outerCursor.getBoundingClientRect();
        this.outerCursorSpeed = 0;
        this.easing = Back.easeOut.config(1.7);
        this.clientX = -100;
        this.clientY = -100;
        this.showCursor = false;
        console.log("Курсор");
        const unveilCursor = () => {
            TweenMax.set(this.innerCursor, {
                x: this.clientX,
                y: this.clientY
            });
            TweenMax.set(this.outerCursor, {
                x: this.clientX - this.outerCursorBox.width / 2,
                y: this.clientY - this.outerCursorBox.height / 2
            });
            setTimeout(() => {
                this.outerCursorSpeed = 0.2;
            }, 100);
            this.showCursor = true;
        };
        document.addEventListener("mousemove", unveilCursor);

        document.addEventListener("mousemove", e => {
            this.clientX = e.clientX;
            this.clientY = e.clientY;
        });

        const render = () => {
            TweenMax.set(this.innerCursor, {
                x: this.clientX,
                y: this.clientY
            });
            if (!this.isStuck) {
                TweenMax.to(this.outerCursor, this.outerCursorSpeed, {
                    x: this.clientX - this.outerCursorBox.width / 2,
                    y: this.clientY - this.outerCursorBox.height / 2
                });
            }
            if (this.showCursor) {
                document.removeEventListener("mousemove", unveilCursor);
            }
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
    }

    initHovers() {
        const handleMouseEnter = e => {
            this.isStuck = true;
            TweenMax.set(this.innerCursor, { opacity: 0 });
            const target = e.currentTarget;
            const box = target.getBoundingClientRect();
            this.outerCursorOriginals = {
                width: this.outerCursorBox.width,
                height: this.outerCursorBox.height
            };
            TweenMax.to(this.outerCursor, 0.2, {
                x: box.left,
                y: box.top,
                width: box.width,
                height: box.height,
                opacity: 0.4,
                borderColor: "#000000"
            });
        };
        const zoomEnter = () => {
            document.querySelector('.cursor').classList.add('zoom')
        };

        const zoomLeave = () => {
            document.querySelector('.cursor').classList.remove('zoom')
        };
        const zoomOutEnter = () => {
            document.querySelector('.cursor').classList.add('zoom-out')
        };

        const zoomOutLeave = () => {
            document.querySelector('.cursor').classList.remove('zoom-out')
        };
        const rightEnter = () => {
            document.querySelector('.cursor').classList.add('right')
        };

        const rightLeave = () => {
            document.querySelector('.cursor').classList.remove('right')
        };

        const leftEnter = () => {
            document.querySelector('.cursor').classList.add('left')
        };

        const leftLeave = () => {
            document.querySelector('.cursor').classList.remove('left')
        };
        const handleMouseLeave = () => {
            this.isStuck = false;
            TweenMax.set(this.innerCursor, { opacity: 1 });
            TweenMax.to(this.outerCursor, 0.2, {
                width: this.outerCursorOriginals.width,
                height: this.outerCursorOriginals.height,
                opacity: 0.4,
                borderColor: "#000000"
            });
        };

        const linkItems = document.querySelectorAll(".cursor__link");
        linkItems.forEach(item => {
            item.addEventListener("mouseenter", handleMouseEnter);
            item.addEventListener("mouseleave", handleMouseLeave);
        });
        const burger = document.querySelector(".menu__btn");
        linkItems.forEach(item => {
            item.addEventListener("mouseenter", handleMouseEnter);
            item.addEventListener("mouseleave", handleMouseLeave);
        });
        const mainNavHoverTween = TweenMax.to(this.outerCursor, 0.3, {
            backgroundColor: "#ffffff",
            ease: this.easing,
            paused: true
        });

        const mainNavMouseEnter = () => {
            this.outerCursorSpeed = 0;
            TweenMax.set(this.innerCursor, { opacity: 0 });
            mainNavHoverTween.play();
        };

        const mainNavMouseLeave = () => {
            this.outerCursorSpeed = 0.2;
            TweenMax.set(this.innerCursor, { opacity: 1 });
            mainNavHoverTween.reverse();
        };

        const mainNavLinks = document.querySelectorAll(".circle__link");
        mainNavLinks.forEach(item => {
            item.addEventListener("mouseenter", mainNavMouseEnter);
            item.addEventListener("mouseleave", mainNavMouseLeave);
        });

        const photos = document.querySelectorAll(".zoom"),
            zoomOut = document.querySelectorAll(".zoom-out");
        photos.forEach(item => {
            item.addEventListener("mouseenter", zoomEnter);
            item.addEventListener("mouseleave", zoomLeave);
        });
        zoomOut.forEach(item => {
            item.addEventListener("mouseenter", zoomOutEnter);
            item.addEventListener("mouseleave", zoomOutLeave);
        });
        const right = document.querySelector(".hidden__arrow.next");
        if (right) {
            right.addEventListener("mouseenter", rightEnter);
            right.addEventListener("mouseleave", rightLeave);
        }

        const left = document.querySelector(".hidden__arrow.prev");
        if (left) {
            left.addEventListener("mouseenter", leftEnter);
            left.addEventListener("mouseleave", leftLeave);
        }

    }
}

export default Demo3;
