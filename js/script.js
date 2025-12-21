document.addEventListener('DOMContentLoaded', function() {
  let slideIndex = 0;

  function moveSlide(step) {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.portfolio-image').length;

    slideIndex += step;

    if (slideIndex < 0) {
      slideIndex = totalSlides - 1; // Если индекс меньше 0, показываем последний слайд
    } else if (slideIndex >= totalSlides) {
      slideIndex = 0; // Если индекс больше или равен общему числу слайдов, показываем первый
    }

    const slideWidth = document.querySelector('.portfolio-item').clientWidth; // Используем контейнер для расчета ширины
    const offset = -slideIndex * slideWidth; // Сдвиг на ширину одного слайда

    slides.style.transition = "transform 0.5s ease"; // Плавный сдвиг
    slides.style.transform = `translateX(${offset}px)`; // Применяем сдвиг
  }

  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');

  if (prevButton && nextButton) {
    prevButton.addEventListener('click', () => moveSlide(-1)); // Левая стрелка
    nextButton.addEventListener('click', () => moveSlide(1)); // Правая стрелка
  }

  // Инициализация первого слайда
  const slides = document.querySelector('.slides');
  const firstSlideWidth = document.querySelector('.portfolio-item').clientWidth;
  slides.style.transform = `translateX(0px)`; // Начальная позиция
});






















































document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const sideMenu = document.getElementById('sideMenu');
  const closeMenu = document.getElementById('closeMenu');
  const overlay = document.getElementById('overlay');

  burger.addEventListener('click', () => {
    sideMenu.classList.add('active');
    overlay.classList.add('active');
  });

  closeMenu.addEventListener('click', closeAll);
  overlay.addEventListener('click', closeAll);

  function closeAll() {
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
  }
});

