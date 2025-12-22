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
    burger.classList.add('hidden');
  });

  closeMenu.addEventListener('click', closeAll);
  overlay.addEventListener('click', closeAll);

  function closeAll() {
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
    burger.classList.remove('hidden');
  }
});


























document.addEventListener('DOMContentLoaded', () => {
  let currentIndex = 0; // Текущий индекс изображения
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dots = document.querySelectorAll('.dot');

  // Функция для переключения слайдов
  function showSlide(index) {
    // Скрываем все слайды
    slides.forEach(slide => {
      slide.style.display = 'none';
      slide.style.opacity = 0; // Начальная непрозрачность для скрытых слайдов
    });

    // Показываем текущий слайд с анимацией
    const currentSlide = slides[index];
    currentSlide.style.display = 'block';
    currentSlide.style.opacity = 1; // Текущий слайд становится видимым

    // Устанавливаем активный класс для индикатора
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    dots[index].classList.add('active');
  }

  // Переключение на следующий слайд
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides; // Переход к следующему слайду
    showSlide(currentIndex);
  });

  // Переключение на предыдущий слайд
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Переход к предыдущему слайду
    showSlide(currentIndex);
  });

  // Переключение на слайд по индикатору
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      showSlide(currentIndex);
    });
  });

  // Инициализация слайдера
  showSlide(currentIndex);
});
