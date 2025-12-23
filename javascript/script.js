const headerNavMenuList = document.querySelectorAll('.header-nav-menu__list');
const header = document.querySelector('header');
const headerHeight = header.offsetHeight;
const menuOpen = document.querySelector('.menu__open');
const menuClose = document.querySelector('.menu__close');
const hamMenuPage = document.querySelector('.ham-menu-page');
const hamMenuContainer= document.querySelector('.ham-menu__container');
const hamMenuList = document.querySelectorAll('.ham-menu__list');
const sectionName = document.querySelectorAll('.section-name__item');
const mealVisualTextItem = document.querySelector('.meal-visual-text__item');
const aroundTextBlock = document.querySelectorAll('.around-text__block');
const mealMenuItem = document.querySelectorAll('.meal-menu__item');
const mainVisualContainer = document.querySelector('.main-visual__container');




const updateHeaderHeight = () => {
  console.log(headerHeight);
};

window.addEventListener('resize', updateHeaderHeight);

const menuOpenTime = 480;
const menuCloseTime = 480;

const menuOpenOptions = {
  duration: menuOpenTime,
  easing: 'ease-out',
  fill: 'forwards',
};

const menuCloseOptions = {
  duration: menuCloseTime,
  easing: 'ease-out',
  fill: 'forwards',
  direction: 'reverse'
};

let currentAngle = 0;

const hamMenuAnimation = (isOpen) => {
  if (!isOpen) {
  hamMenuPage.animate({
    opacity: ['0', '1'],
    visibility: ['hidden', 'visible'],
  }, menuOpenOptions);

  menuOpen.animate({
    opacity: ['1', '0'],
    visibility: ['visible', 'hidden'],
    rotate: [`${currentAngle}deg`, `${currentAngle + 180}deg`]
  }, menuOpenOptions);

    menuClose.animate({
      opacity: ['0', '1'],
      visibility: ['hidden', 'visible'],
      rotate: [`${currentAngle + 180}deg`, `${currentAngle + 360}deg`]
    }, menuOpenOptions);
} else {
    hamMenuPage.animate({
    opacity: ['1', '0'],
    visibility: ['visible', 'hidden'],
  }, menuOpenOptions);

  menuOpen.animate({
    opacity: ['0', '1'],
    visibility: ['hidden', 'visible'],
    rotate: [`${currentAngle}deg`, `${currentAngle + 180}deg`]
  }, menuOpenOptions);

    menuClose.animate({
      opacity: ['1', '0'],
      visibility: ['visible', 'hidden'],
      rotate: [`${currentAngle + 180}deg`, `${currentAngle + 360}deg`]
    }, menuOpenOptions);
  }
  currentAngle += 180;
};

menuOpen.addEventListener('click', () => {
  hamMenuAnimation(false);
});

menuClose.addEventListener('click', () => {
  hamMenuAnimation(true);
});

//  smooth scroll function =================================
const smoothSc = (targetEle, Scdelay) => {
  setTimeout(() => {
    window.scrollTo({
      top: targetEle.offsetTop - headerHeight,
      behavior: 'smooth'
    });
  }, Scdelay);
}

//  nav click ===============================================
const menuClick = (el,menuOption) => {
  el.forEach((els) => {
    els.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = els.getAttribute('href').substring(1);
      const targetEle = document.getElementById(targetId);
      smoothSc(targetEle, 0);

      const hamMenuPageOpacity = window.getComputedStyle(hamMenuPage);
      if (hamMenuPageOpacity.opacity === "1") {
        hamMenuAnimation(menuOption);
      }
    });
  });
};

menuClick(hamMenuList, menuCloseOptions);
menuClick(headerNavMenuList);

//  scroll animation ===============================================
const scrollAnimation = (entries, observer) => {
    entries.forEach((entry) => {
    const keyframes = {
      opacity: [0, 1],
      transform: ['translate(0px, 10px)', 'translate(0, 0)'],
    }
    if (entry.isIntersecting) {
      entry.target.animate(keyframes, 800);
      console.log(entry.target);
      
      observer.unobserve(entry.target);
      console.log(observer);
    }
  });
};
const sectionObserber = new IntersectionObserver(scrollAnimation);

sectionName.forEach((els) => {
  sectionObserber.observe(els);
});

aroundTextBlock.forEach((els) => {
  sectionObserber.observe(els);
});

const scrollAnimationOpacity = (entries, observer) => {
    entries.forEach((entry) => {
    const keyframes = {
      opacity: [0, 1],
      // transform: ['translate(0px, 10px)', 'translate(0, 0)'],
    }
    if (entry.isIntersecting) {
      entry.target.animate(keyframes, 1600);
      console.log(entry.target);
      
      observer.unobserve(entry.target);
      console.log(observer);
    }
  });
};

const OpacityObserber = new IntersectionObserver(scrollAnimationOpacity);

OpacityObserber.observe(mealVisualTextItem);

mealMenuItem.forEach((els) => {
  OpacityObserber.observe(els);
});

OpacityObserber.observe(mainVisualContainer);





