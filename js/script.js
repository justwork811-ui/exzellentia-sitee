// ================================
// МОДУЛЬ: СЛАЙДЕР ПОРТФОЛИО
// ================================
class PortfolioSlider {
    constructor() {
        this.slideIndex = 0;
        this.slidesContainer = document.querySelector('.slides');
        this.slides = document.querySelectorAll('.portfolio-image');
        this.prevButton = document.querySelector('.portfolio-section .prev');
        this.nextButton = document.querySelector('.portfolio-section .next');
        
        this.init();
    }
    
    init() {
        if (!this.slidesContainer || this.slides.length === 0) return;
        
        this.updateSlide();
        
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => this.move(-1));
        }
        
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => this.move(1));
        }
    }
    
    move(step) {
        this.slideIndex += step;
        
        if (this.slideIndex < 0) {
            this.slideIndex = this.slides.length - 1;
        } else if (this.slideIndex >= this.slides.length) {
            this.slideIndex = 0;
        }
        
        this.updateSlide();
    }
    
    updateSlide() {
        const slideWidth = this.slides[0]?.clientWidth || 0;
        const offset = -this.slideIndex * slideWidth;
        
        this.slidesContainer.style.transition = "transform 0.5s ease";
        this.slidesContainer.style.transform = `translateX(${offset}px)`;
    }
}

// ================================
// МОДУЛЬ: MENU
// ================================
class TeamSlider {
    constructor() {
        this.currentIndex = 0;
        this.slider = document.querySelector('.team-slider');
        this.slides = document.querySelectorAll('.team-member');
        this.prevButton = document.querySelector('.team-slider-container .prev');
        this.nextButton = document.querySelector('.team-slider-container .next');
        
        this.init();
    }
    
    init() {
        if (!this.slider || this.slides.length === 0) return;
        
        this.showSlide(this.currentIndex);
        
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => this.prev());
        }
        
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => this.next());
        }
        
        window.addEventListener('resize', () => this.showSlide(this.currentIndex));
    }
    
    showSlide(index) {
        let slidesToShow = 3;
        
        if (window.innerWidth <= 768) {
            slidesToShow = 2;
        }
        
        if (window.innerWidth <= 480) {
            slidesToShow = 1;
        }
        
        const slideWidth = 100 / slidesToShow;
        const offset = -index * slideWidth;
        
        this.slider.style.transition = 'transform 0.5s ease-in-out';
        this.slider.style.transform = `translateX(${offset}%)`;
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.showSlide(this.currentIndex);
    }
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.showSlide(this.currentIndex);
    }
}

// ================================
// МОДУЛЬ: МОБИЛЬНОЕ МЕНЮ
// ================================
class MobileMenu {
    constructor() {
        this.burger = document.getElementById('burger');
        this.sideMenu = document.getElementById('sideMenu');
        this.closeMenu = document.getElementById('closeMenu');
        this.overlay = document.getElementById('overlay');
        
        this.init();
    }
    
    init() {
        if (!this.burger || !this.sideMenu) return;
        
        this.burger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.open();
        });
        
        if (this.closeMenu) {
            this.closeMenu.addEventListener('click', (e) => {
                e.stopPropagation();
                this.close();
            });
        }
        
        // Закрытие при клике на оверлей
        if (this.overlay) {
            this.overlay.addEventListener('click', (e) => {
                if (e.target === this.overlay) {
                    this.close();
                }
            });
        }
        
        // Закрытие при клике вне меню
        document.addEventListener('click', (e) => {
            if (this.isOpen() && 
                !this.sideMenu.contains(e.target) && 
                e.target !== this.burger) {
                this.close();
            }
        });
        
        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) {
                this.close();
            }
        });
        
        // Закрытие при клике на ссылку
        const menuLinks = this.sideMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => this.close());
        });
    }
    
    open() {
        this.sideMenu.classList.add('active');
        if (this.overlay) this.overlay.classList.add('active');
        this.burger.classList.add('hidden');
        document.body.style.overflow = 'hidden';
    }
    
    close() {
        this.sideMenu.classList.remove('active');
        if (this.overlay) this.overlay.classList.remove('active');
        this.burger.classList.remove('hidden');
        document.body.style.overflow = '';
    }
    
    isOpen() {
        return this.sideMenu.classList.contains('active');
    }
}

// ================================
// МОДУЛЬ: POPUP МЕНЮ (полный с эффектом скролла)
// ================================
class SimplePopupMenu {
    constructor() {
        this.menuBtn = document.querySelector('.menu-btn');
        this.menu = document.getElementById('popupMenu');
        this.menuContent = this.menu ? this.menu.querySelector('.popup-menu-content') : null;
        
        // Настройки скролла
        this.lastScrollTop = 0;
        this.scrollThreshold = 100; // Пикселей для срабатывания
        this.scrollTimeout = null;
        this.isScrolling = false;
        this.isOpen = false;
        
        if (!this.menuBtn || !this.menu || !this.menuContent) {
            console.log('Popup menu elements not found');
            return;
        }
        
        this.init();
    }
    
    init() {
        console.log('Initializing SimplePopupMenu...');
        
        // Клик по кнопке меню
        this.menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.toggleMenu();
        });
        
        // Закрытие при клике на оверлей (вне меню)
        this.menu.addEventListener('click', (e) => {
            if (e.target === this.menu) {
                this.closeMenu();
            }
        });
        
        // Закрытие при клике на кнопку закрытия
        const closeBtn = this.menu.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeMenu();
            });
        }
        
        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });
        
        // Закрытие при клике на ссылки
        const menuLinks = this.menu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Закрытие при клике в любое место вне меню
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !this.menu.contains(e.target) && 
                e.target !== this.menuBtn) {
                this.closeMenu();
            }
        });
        
        // Эффект скрытия/показа при скролле
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Показываем кнопку при загрузке
        this.menuBtn.classList.remove('hidden');
    }
    
    handleScroll() {
        // Получаем текущую позицию скролла
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Определяем направление скролла
        if (currentScroll > this.lastScrollTop && currentScroll > this.scrollThreshold) {
            // Скролл ВНИЗ - скрываем
            this.hideMenuButton();
        } else {
            // Скролл ВВЕРХ или в начале страницы - показываем
            this.showMenuButton();
        }
        
        this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        
        // Задержка для предотвращения мерцания
        this.debounceScroll();
    }
    
    hideMenuButton() {
        this.menuBtn.classList.add('hidden');
        this.menuBtn.style.transform = 'translateY(-20px)';
    }
    
    showMenuButton() {
        this.menuBtn.classList.remove('hidden');
        this.menuBtn.style.transform = 'translateY(0)';
    }
    
    debounceScroll() {
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            this.isScrolling = false;
        }, 100);
    }
    
    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        this.menu.style.display = 'block';
        this.isOpen = true;
        document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
        console.log('Menu opened');
    }
    
    closeMenu() {
        this.menu.style.display = 'none';
        this.isOpen = false;
        document.body.style.overflow = ''; // Разблокируем скролл
        console.log('Menu closed');
    }
}


// ================================
// ИНИЦИАЛИЗАЦИЯ (с новой версией PopupMenu)
// ================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing website...');
    
    // Инициализируем модули
    const modules = {
        portfolioSlider: new PortfolioSlider(),
        teamSlider: new TeamSlider(),
        splitSlider: new SplitSliderManager(),
        mobileMenu: new MobileMenu(),
        popupMenu: new SimplePopupMenu(), // ← ИСПОЛЬЗУЕМ НОВЫЙ КЛАСС
        contactForm: new ContactForm(),
        modalManager: new ModalManager()
    };
    
    // Вспомогательные функции
    initSmoothScroll();
    initLazyLoading();
    
    window.app = modules;
    console.log('Website initialized!');
});






// ================================
// МОДУЛЬ: ФОРМА ОБРАТНОЙ СВЯЗИ
// ================================
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.modal = document.getElementById('myModal');
        this.closeModal = document.querySelector('.close');
        
        this.botToken = "8282995143:AAEirmJ1t54WmHrlV268wcTdVMmYYN9Rcw0";
        this.chatId = "-1003663720487";
        
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        if (this.closeModal) {
            this.closeModal.addEventListener('click', () => this.closeModalWindow());
        }
        
        // Закрытие модального окна при клике вне его
        document.addEventListener('click', (e) => {
            if (this.isModalOpen() && e.target === this.modal) {
                this.closeModalWindow();
            }
        });
        
        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isModalOpen()) {
                this.closeModalWindow();
            }
        });
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = this.getFormData();
        if (!formData) return;
        
        const message = this.formatMessage(formData);
        
        try {
            await this.sendToTelegram(message);
            this.showSuccessModal();
            this.form.reset();
        } catch (error) {
            console.error('Ошибка отправки:', error);
            this.showError();
        }
    }
    
    getFormData() {
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const phone = document.getElementById('phone')?.value.trim();
        const message = document.getElementById('message')?.value.trim();
        const propertyType = document.querySelector('input[name="propertyType"]:checked')?.value;
        
        if (!name || !email || !phone || !message || !propertyType) {
            alert('Bitte füllen Sie alle Felder aus.');
            return null;
        }
        
        return { name, email, phone, message, propertyType };
    }
    
    formatMessage(data) {
        return `Neue Anfrage:\n\nName: ${data.name}\nE-Mail: ${data.email}\nTelefon: ${data.phone}\nNachricht: ${data.message}\nObjekttyp: ${data.propertyType}`;
    }
    
    async sendToTelegram(message) {
        const url = `https://api.telegram.org/bot${this.botToken}/sendMessage?chat_id=${this.chatId}&text=${encodeURIComponent(message)}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response.json();
    }
    
    showSuccessModal() {
        if (!this.modal) return;
        
        this.modal.style.display = "block";
        
        setTimeout(() => {
            this.closeModalWindow();
        }, 30000);
    }
    
    closeModalWindow() {
        if (this.modal) {
            this.modal.style.display = "none";
        }
    }
    
    isModalOpen() {
        return this.modal && this.modal.style.display === "block";
    }
    
    showError() {
        alert("Fehler beim Senden der Nachricht. Bitte versuchen Sie es später.");
    }
}

// ================================
// УНИВЕРСАЛЬНЫЙ МОДАЛЬНЫЙ МЕНЕДЖЕР
// ================================
class ModalManager {
    constructor() {
        this.modals = [];
        this.init();
    }
    
    init() {
        // Автоматически находим все модальные окна
        document.querySelectorAll('[data-modal]').forEach(modal => {
            this.registerModal(modal);
        });
        
        // Закрытие всех модалок по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }
    
    registerModal(modalElement) {
        const modalId = modalElement.id;
        const openButtons = document.querySelectorAll(`[data-open-modal="${modalId}"]`);
        const closeButtons = modalElement.querySelectorAll('[data-close-modal]');
        
        // Открытие
        openButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openModal(modalId);
            });
        });
        
        // Закрытие кнопками внутри
        closeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeModal(modalId);
            });
        });
        
        // Закрытие по клику вне модалки
        modalElement.addEventListener('click', (e) => {
            if (e.target === modalElement) {
                this.closeModal(modalId);
            }
        });
        
        this.modals.push({
            id: modalId,
            element: modalElement
        });
    }
    
    openModal(modalId) {
        const modal = this.modals.find(m => m.id === modalId);
        if (modal) {
            modal.element.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeModal(modalId) {
        const modal = this.modals.find(m => m.id === modalId);
        if (modal) {
            modal.element.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
    
    closeAllModals() {
        this.modals.forEach(modal => {
            modal.element.style.display = 'none';
        });
        document.body.style.overflow = '';
    }
}

// ================================
// ИНИЦИАЛИЗАЦИЯ
// ================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing website...');
    
    // Инициализируем модули
    const modules = {
        portfolioSlider: new PortfolioSlider(),
        teamSlider: new TeamSlider(),
        mobileMenu: new MobileMenu(),
        popupMenu: new PopupMenu(),
        contactForm: new ContactForm(),
        modalManager: new ModalManager()
    };
    
    // Вспомогательные функции
    initSmoothScroll();
    initLazyLoading();
    
    window.app = modules;
    console.log('Website initialized!');
});

// ================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ================================
// УНИВЕРСАЛЬНАЯ ФУНКЦИЯ ЗАКРЫТИЯ ПО КЛИКУ ВНЕ
// ================================

/**
 * Универсальная функция для закрытия элементов по клику вне
 * @param {HTMLElement} element - Элемент который нужно закрыть
 * @param {Function} closeCallback - Функция для закрытия
 * @param {HTMLElement[]} excludeElements - Элементы, клик по которым не должен закрывать
 */
function setupOutsideClickClose(element, closeCallback, excludeElements = []) {
    if (!element || !closeCallback) return;
    
    document.addEventListener('click', function(event) {
        // Проверяем, был ли клик внутри элемента или исключённых элементов
        const isClickInside = element.contains(event.target);
        const isClickOnExcluded = excludeElements.some(el => 
            el && (el === event.target || el.contains(event.target))
        );
        
        // Если клик был вне элемента и не на исключённых элементах - закрываем
        if (!isClickInside && !isClickOnExcluded) {
            closeCallback();
        }
    });
    
    // Также закрываем по Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeCallback();
        }
    });
}





class SplitSliderManager {
    constructor() {
        this.leftPanel = document.querySelector('.left-panel');
        this.rightPanel = document.querySelector('.right-panel');
        
        this.init();
    }
    
    init() {
        if (this.leftPanel) {
            this.initSlider(this.leftPanel, 'left');
        }
        
        if (this.rightPanel) {
            this.initSlider(this.rightPanel, 'right');
        }
    }
    
    initSlider(panel, side) {
        const slides = panel.querySelectorAll('.split-slide');
        const prevBtn = panel.querySelector(`.${side}-prev`);
        const nextBtn = panel.querySelector(`.${side}-next`);
        const indicators = panel.querySelectorAll('.panel-indicators span');
        
        if (slides.length === 0) return;
        
        let currentIndex = 0;
        
        const showSlide = (index) => {
            // Скрываем все слайды
            slides.forEach(slide => {
                slide.classList.remove('active');
                slide.style.opacity = '0';
                slide.style.display = 'none';
                slide.style.visibility = 'hidden';
            });
            
            // Показываем текущий слайд
            const activeSlide = slides[index];
            activeSlide.classList.add('active');
            activeSlide.style.opacity = '1';
            activeSlide.style.display = 'block';
            activeSlide.style.visibility = 'visible';
            
            // Обновляем индикаторы
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            
            currentIndex = index;
            
            // Форсируем перерисовку для мобильных
            setTimeout(() => {
                activeSlide.style.transform = 'translateZ(0)';
            }, 50);
        };
        
        // Кнопки
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                let newIndex = currentIndex - 1;
                if (newIndex < 0) newIndex = slides.length - 1;
                showSlide(newIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                let newIndex = currentIndex + 1;
                if (newIndex >= slides.length) newIndex = 0;
                showSlide(newIndex);
            });
        }
        
        // Индикаторы
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
            });
        });
        
        // Показываем первый слайд
        showSlide(0);
        
        // Автоматически перерисовываем при изменении размера окна
        window.addEventListener('resize', () => {
            showSlide(currentIndex);
        });
    }
}











// ===== ПОРТФОЛИО JavaScript =====

// Данные проектов (все берется из HTML)
const portfolioProjects = {
  renovation: {
    id: 'renovation',
    title: "Luxus-Renovierung",
    description: "Vollständige Renovierung einer Wohnung unter Berücksichtigung aller technischen und ästhetischen Aspekte. Moderne Lösungen mit hochwertigen Materialien."
  },
  furniture: {
    id: 'furniture',
    title: "Designer Möbel",
    description: "Maßgefertigte Möbel, Einbauschränke und individuelle Einrichtungen mit hochwertigen Materialien und modernem Design."
  }
};

// Инициализация портфолио
document.addEventListener('DOMContentLoaded', function() {
  // Элементы DOM
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  const modal = document.querySelector('.portfolio-modal');
  const modalSlides = document.querySelector('.modal-slides');
  const modalTitle = document.querySelector('.modal-title');
  const modalDescription = document.querySelector('.modal-description');
  const currentSlideSpan = document.querySelector('.current-slide');
  const totalSlidesSpan = document.querySelector('.total-slides');
  const closeBtn = document.querySelector('.modal-close');
  const prevBtn = document.querySelector('.modal-prev');
  const nextBtn = document.querySelector('.modal-next');
  
  let currentProject = null;
  let currentSlideIndex = 0;
  let totalSlides = 0;
  let isLoading = false;
  
  // ===== ОТКРЫТИЕ МОДАЛЬНОГО ОКНА =====
  portfolioCards.forEach(card => {
    card.addEventListener('click', function() {
      const projectId = this.getAttribute('data-project');
      openModal(projectId);
    });
  });
  
  function openModal(projectId) {
    // Находим карточку проекта
    const card = document.querySelector(`[data-project="${projectId}"]`);
    if (!card) {
      console.error('Card not found:', projectId);
      return;
    }
    
    // Берем заголовок и описание из карточки
    const cardTitle = card.querySelector('.card-title')?.textContent || portfolioProjects[projectId]?.title || "Projekt";
    const cardDescription = card.querySelector('.card-subtitle')?.textContent || portfolioProjects[projectId]?.description || "";
    
    // Берем ВСЕ изображения и видео из скрытого блока gallery-images
    const galleryImages = card.querySelector('.gallery-images');
    let mediaElements = [];
    
    if (galleryImages) {
      // Собираем все изображения и видео
      mediaElements = Array.from(galleryImages.children);
    } else {
      // Если нет gallery-images, берем главное изображение из карточки
      const mainImg = card.querySelector('.card-image img');
      if (mainImg && mainImg.src) {
        const tempImg = document.createElement('div');
        tempImg.innerHTML = `<img data-src="${mainImg.src}" alt="${mainImg.alt || 'Bild'}">`;
        mediaElements = Array.from(tempImg.children);
      }
    }
    
    // Если нет медиа-элементов, используем заглушку
    if (mediaElements.length === 0) {
      console.warn('No media found for project:', projectId, 'using fallback');
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = `<img data-src="https://via.placeholder.com/800x600/F8F9FA/666?text=Keine+Bilder+gefunden" alt="Keine Bilder">`;
      mediaElements = Array.from(tempDiv.children);
    }
    
    // Подготавливаем массив медиафайлов
    const mediaItems = mediaElements.map(el => {
      const src = el.getAttribute('data-src') || el.src || '';
      const alt = el.getAttribute('alt') || el.getAttribute('data-alt') || 'Bild';
      
      if (el.tagName === 'VIDEO' || el.getAttribute('data-type') === 'video' || src.includes('.mp4') || src.includes('.webm')) {
        return {
          type: 'video',
          src: src,
          alt: alt,
          autoplay: el.getAttribute('data-autoplay') === 'true',
          muted: el.getAttribute('data-muted') !== 'false',
          loop: el.getAttribute('data-loop') !== 'false'
        };
      } else {
        return {
          type: 'image',
          src: src,
          alt: alt
        };
      }
    }).filter(item => item.src);
    
    if (mediaItems.length === 0) {
      console.error('No valid media found for project:', projectId);
      showErrorModal();
      return;
    }
    
    // Устанавливаем текущий проект
    currentProject = {
      id: projectId,
      title: cardTitle,
      description: cardDescription,
      media: mediaItems
    };
    
    currentSlideIndex = 0;
    totalSlides = mediaItems.length;
    
    // Показываем индикатор загрузки
    isLoading = true;
    const slider = document.querySelector('.modal-slider');
    slider.classList.add('loading');
    
    // Устанавливаем информацию
    modalTitle.textContent = currentProject.title;
    modalDescription.textContent = currentProject.description;
    totalSlidesSpan.textContent = totalSlides;
    currentSlideSpan.textContent = currentSlideIndex + 1;
    
    // Очищаем слайды
    modalSlides.innerHTML = '';
    
    // Создаем слайды
    mediaItems.forEach((media, index) => {
      if (media.type === 'video') {
        createVideoSlide(media.src, media.alt, index, media);
      } else {
        createImageSlide(media.src, media.alt, index);
      }
    });
    
    // Скрываем индикатор загрузки и показываем модальное окно
    setTimeout(() => {
      isLoading = false;
      slider.classList.remove('loading');
      
      // Показываем модальное окно
      modal.classList.add('active');
      document.body.classList.add('modal-open');
      
      // Обновляем кнопки навигации
      updateNavButtons();
      
      // Прокручиваем к первому слайду
      updateSlider();
      
      // Обновляем счетчик
      updateCounter();
      
      // Фокус для клавиатурной навигации
      closeBtn.focus();
      
      // Пытаемся запустить видео после открытия
      setTimeout(() => {
        const firstVideo = modalSlides.querySelector('video');
        if (firstVideo) {
          firstVideo.play().catch(e => {
            console.log('Video autoplay failed:', e);
          });
        }
      }, 100);
      
    }, 300);
  }
  
  // ===== СОЗДАНИЕ СЛАЙДА С ИЗОБРАЖЕНИЕМ =====
  function createImageSlide(imgSrc, alt, index) {
    const slide = document.createElement('div');
    slide.className = 'modal-slide';
    slide.dataset.index = index;
    slide.style.width = '100%';
    slide.style.flexShrink = '0';
    slide.style.display = 'flex';
    slide.style.alignItems = 'center';
    slide.style.justifyContent = 'center';
    slide.style.padding = '20px';
    slide.style.boxSizing = 'border-box';
    slide.style.backgroundColor = '#000';
    
    const imgContainer = document.createElement('div');
    imgContainer.style.width = '100%';
    imgContainer.style.height = '100%';
    imgContainer.style.display = 'flex';
    imgContainer.style.alignItems = 'center';
    imgContainer.style.justifyContent = 'center';
    imgContainer.style.position = 'relative';
    
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = alt;
    img.loading = 'lazy';
    img.style.maxWidth = '85%';
    img.style.maxHeight = '85%';
    img.style.objectFit = 'contain';
    img.style.borderRadius = '8px';
    img.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
    img.style.backgroundColor = '#111';
    img.style.padding = '10px';
    img.style.transition = 'opacity 0.5s ease';
    img.style.opacity = '0';
    
    // Обработка ошибки загрузки изображения
    img.onerror = function() {
      console.warn('Bild nicht gefunden:', imgSrc);
      this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTExIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4cHgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIGZpbGw9IiM2NjYiPkJpbGQgZmVobHQ8L3RleHQ+PC9zdmc+';
      this.alt = 'Bild konnte nicht geladen werden';
      this.style.opacity = '1';
    };
    
    // Успешная загрузка
    img.onload = function() {
      setTimeout(() => {
        img.style.opacity = '1';
      }, 100);
    };
    
    imgContainer.appendChild(img);
    slide.appendChild(imgContainer);
    modalSlides.appendChild(slide);
  }
  
  // ===== СОЗДАНИЕ СЛАЙДА С ВИДЕО =====
  function createVideoSlide(videoSrc, alt, index, options = {}) {
    console.log('Creating video slide:', videoSrc);
    
    const slide = document.createElement('div');
    slide.className = 'modal-slide';
    slide.dataset.index = index;
    slide.style.width = '100%';
    slide.style.flexShrink = '0';
    slide.style.display = 'flex';
    slide.style.alignItems = 'center';
    slide.style.justifyContent = 'center';
    slide.style.padding = '20px';
    slide.style.boxSizing = 'border-box';
    slide.style.backgroundColor = '#000';
    slide.style.position = 'relative';
    
    // Контейнер
    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.position = 'relative';
    
    // Видео элемент - ТАКОЙ ЖЕ РАЗМЕР КАК ФОТО
    const video = document.createElement('video');
    video.src = videoSrc;
    video.autoplay = options.autoplay !== false;
    video.muted = options.muted !== false;
    video.loop = options.loop !== false;
    video.playsInline = true;
    video.controls = true;
    video.preload = 'auto';
    
    // ТОЧНО ТАКИЕ ЖЕ СТИЛИ КАК У ФОТО
    video.style.maxWidth = '85%';
    video.style.maxHeight = '85%';
    video.style.objectFit = 'contain';
    video.style.borderRadius = '8px';
    video.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
    video.style.backgroundColor = '#111';
    video.style.padding = '10px';
    video.style.display = 'block';
    
    const source = document.createElement('source');
    source.src = videoSrc;
    source.type = 'video/mp4';
    video.appendChild(source);
    
    // Метка "Video"
    const videoLabel = document.createElement('div');
    videoLabel.className = 'video-label';
    videoLabel.textContent = 'VIDEO';
    videoLabel.style.position = 'absolute';
    videoLabel.style.top = '20px';
    videoLabel.style.right = '20px';
    videoLabel.style.background = 'rgba(207, 178, 109, 0.9)';
    videoLabel.style.color = 'white';
    videoLabel.style.padding = '6px 12px';
    videoLabel.style.borderRadius = '12px';
    videoLabel.style.fontSize = '12px';
    videoLabel.style.fontWeight = 'bold';
    videoLabel.style.zIndex = '10';
    videoLabel.style.textTransform = 'uppercase';
    
    // Обработка ошибки
    video.onerror = function() {
      console.error('Video error:', videoSrc);
      container.innerHTML = `
        <div style="
          max-width: 85%;
          max-height: 85%;
          background: #111;
          border-radius: 8px;
          padding: 40px;
          text-align: center;
          color: white;
        ">
          <div style="font-size: 48px;">🎬</div>
          <p>Video konnte nicht geladen werden</p>
        </div>
      `;
    };
    
    // Автозапуск
    video.addEventListener('canplay', () => {
      video.play().catch(e => {
        console.log('Video autoplay failed:', e);
      });
    });
    
    container.appendChild(video);
    container.appendChild(videoLabel);
    slide.appendChild(container);
    modalSlides.appendChild(slide);
    
    return video;
  }
  
  // ===== ПОКАЗАТЬ ОКНО С ОШИБКОЙ =====
  function showErrorModal() {
    modalSlides.innerHTML = `
      <div class="error-slide" style="width: 100%; display: flex; align-items: center; justify-content: center; padding: 40px;">
        <div style="text-align: center; max-width: 500px;">
          <div style="font-size: 64px; margin-bottom: 20px; color: #cfb26d;">📷</div>
          <h3 style="color: #333; margin-bottom: 15px; font-size: 24px;">Keine Medien gefunden</h3>
          <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
            Für dieses Projekt wurden keine Bilder oder Videos gefunden.
          </p>
        </div>
      </div>
    `;
    
    modalTitle.textContent = "Keine Medien";
    modalDescription.textContent = "Bitte Medien für dieses Projekt hinzufügen";
    
    isLoading = false;
    const slider = document.querySelector('.modal-slider');
    slider.classList.remove('loading');
    
    modal.classList.add('active');
    document.body.classList.add('modal-open');
    
    updateNavButtons();
  }
  
  // ===== ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА =====
  function closeModal() {
    // Останавливаем все видео
    document.querySelectorAll('.modal-slide video').forEach(video => {
      video.pause();
      video.currentTime = 0;
    });
    
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
    currentProject = null;
    currentSlideIndex = 0;
    
    // Сбрасываем состояние кнопок
    prevBtn.disabled = false;
    nextBtn.disabled = false;
    prevBtn.classList.remove('disabled');
    nextBtn.classList.remove('disabled');
  }
  
  // ===== НАВИГАЦИЯ ПО СЛАЙДАМ =====
  function showPrevSlide() {
    if (isLoading || !currentProject) return;
    
    if (currentSlideIndex > 0) {
      // Останавливаем текущее видео
      const currentVideo = modalSlides.children[currentSlideIndex]?.querySelector('video');
      if (currentVideo) {
        currentVideo.pause();
      }
      
      currentSlideIndex--;
      updateSlider();
      updateCounter();
      updateNavButtons();
    }
  }
  
  function showNextSlide() {
    if (isLoading || !currentProject) return;
    
    if (currentSlideIndex < totalSlides - 1) {
      // Останавливаем текущее видео
      const currentVideo = modalSlides.children[currentSlideIndex]?.querySelector('video');
      if (currentVideo) {
        currentVideo.pause();
      }
      
      currentSlideIndex++;
      updateSlider();
      updateCounter();
      updateNavButtons();
    }
  }
  
  // ===== ОБНОВЛЕНИЕ СЛАЙДЕРА =====
  function updateSlider() {
    if (!modalSlides.children.length) return;
    
    const slideWidth = 100;
    modalSlides.style.transform = `translateX(-${currentSlideIndex * slideWidth}%)`;
    modalSlides.style.transition = 'transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1)';
  }
  
  // ===== ОБНОВЛЕНИЕ СЧЕТЧИКА =====
  function updateCounter() {
    currentSlideSpan.textContent = currentSlideIndex + 1;
  }
  
  // ===== ОБНОВЛЕНИЕ КНОПОК НАВИГАЦИИ =====
  function updateNavButtons() {
    if (!currentProject) return;
    
    const slides = modalSlides.children;
    if (!slides.length) return;
    
    prevBtn.disabled = currentSlideIndex === 0;
    nextBtn.disabled = currentSlideIndex === totalSlides - 1;
    
    if (prevBtn.disabled) {
      prevBtn.classList.add('disabled');
    } else {
      prevBtn.classList.remove('disabled');
    }
    
    if (nextBtn.disabled) {
      nextBtn.classList.add('disabled');
    } else {
      nextBtn.classList.remove('disabled');
    }
  }
  
  // ===== ОБРАБОТЧИКИ СОБЫТИЙ =====
  
  // Закрытие модального окна
  closeBtn.addEventListener('click', closeModal);
  
  // Закрытие по клику на оверлей
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Навигация по слайдам
  prevBtn.addEventListener('click', showPrevSlide);
  nextBtn.addEventListener('click', showNextSlide);
  
  // Управление с клавиатуры
  document.addEventListener('keydown', function(e) {
    if (!modal.classList.contains('active')) return;
    if (isLoading) return;
    
    switch(e.key) {
      case 'Escape':
        closeModal();
        e.preventDefault();
        break;
      case 'ArrowLeft':
        showPrevSlide();
        e.preventDefault();
        break;
      case 'ArrowRight':
        showNextSlide();
        e.preventDefault();
        break;
      case ' ':
        const currentVideo = modalSlides.children[currentSlideIndex]?.querySelector('video');
        if (currentVideo) {
          if (currentVideo.paused) {
            currentVideo.play();
          } else {
            currentVideo.pause();
          }
          e.preventDefault();
        }
        break;
    }
  });
  
  // Свайпы на мобильных
  let touchStartX = 0;
  let touchEndX = 0;
  let isSwiping = false;
  
  modalSlides.addEventListener('touchstart', function(e) {
    if (isLoading) return;
    touchStartX = e.changedTouches[0].screenX;
    isSwiping = true;
  }, { passive: true });
  
  modalSlides.addEventListener('touchmove', function(e) {
    if (!isSwiping || isLoading) return;
    e.preventDefault();
  }, { passive: false });
  
  modalSlides.addEventListener('touchend', function(e) {
    if (!isSwiping || isLoading) return;
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    isSwiping = false;
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        showNextSlide();
      } else {
        showPrevSlide();
      }
    }
  }
  
  // Предзагрузка
  function preloadFirstImages() {
    portfolioCards.forEach(card => {
      const gallery = card.querySelector('.gallery-images');
      if (gallery) {
        const firstMedia = gallery.children[0];
        if (firstMedia) {
          const src = firstMedia.getAttribute('data-src') || firstMedia.src;
          if (src) {
            if (firstMedia.tagName === 'VIDEO') {
              const video = document.createElement('video');
              video.preload = 'metadata';
              video.src = src;
            } else {
              const img = new Image();
              img.src = src;
            }
          }
        }
      }
    });
  }
  
  // Запуск предзагрузки
  window.addEventListener('load', function() {
    setTimeout(preloadFirstImages, 1000);
  });
  
  // Инициализация
  updateNavButtons();
  
  // Добавляем CSS для анимации загрузки
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .modal-slider.loading::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 50px;
      height: 50px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #cfb26d;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      z-index: 100;
      transform: translate(-50%, -50%);
    }
    .modal-slider.loading .modal-slides {
      opacity: 0.3;
    }
    .modal-close, .modal-prev, .modal-next {
      transition: all 0.3s ease;
    }
    .modal-prev.disabled, .modal-next.disabled {
      opacity: 0.3;
      cursor: not-allowed;
      transform: scale(0.9);
    }
  `;
  document.head.appendChild(style);
});

console.log('Portfolio script loaded');




// ===== ОБНОВЛЕННЫЙ КОД ДЛЯ ПОРТФОЛИО =====

document.addEventListener('DOMContentLoaded', function() {
    initPortfolio();
});

function initPortfolio() {
    const modal = document.querySelector('.portfolio-modal');
    const modalSlides = document.querySelector('.modal-slides');
    const modalTitle = document.querySelector('.modal-title');
    const modalDescription = document.querySelector('.modal-description');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    const currentSlideSpan = document.querySelector('.current-slide');
    const totalSlidesSpan = document.querySelector('.total-slides');
    const projectsThumbnails = document.querySelector('.projects-thumbnails');
    const projectPrevBtn = document.querySelector('.project-prev');
    const projectNextBtn = document.querySelector('.project-next');
    
    let currentProject = null;
    let currentSlideIndex = 0;
    let projectImages = [];
    let allProjects = [];
    let currentProjectIndex = 0;
    
    // Собираем все проекты
    document.querySelectorAll('.portfolio-card').forEach((card, index) => {
        const projectId = card.getAttribute('data-project');
        const projectName = card.getAttribute('data-project-name') || 'Projekt';
        const projectDesc = card.getAttribute('data-project-desc') || '';
        const mainImage = card.querySelector('img')?.src || '';
        
        allProjects.push({
            id: projectId,
            name: projectName,
            desc: projectDesc,
            card: card,
            mainImage: mainImage,
            index: index
        });
    });
    
    // Открытие модального окна при клике на карточку
    document.querySelectorAll('.portfolio-card').forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            const projectIndex = allProjects.findIndex(p => p.id === projectId);
            if (projectIndex !== -1) {
                openProject(projectIndex);
            }
        });
    });
    
    // Функция открытия проекта
    function openProject(projectIndex) {
        currentProjectIndex = projectIndex;
        const project = allProjects[projectIndex];
        
        // Находим галерею для этого проекта
        const gallery = document.querySelector(`.gallery-images[data-project="${project.id}"]`);
        
        if (!gallery) return;
        
        // Собираем все изображения и видео
        projectImages = [];
        const items = gallery.children;
        
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.tagName === 'IMG') {
                projectImages.push({
                    type: 'image',
                    src: item.getAttribute('data-src') || item.src,
                    alt: item.alt
                });
            } else if (item.tagName === 'VIDEO') {
                projectImages.push({
                    type: 'video',
                    src: item.getAttribute('data-src'),
                    autoplay: item.getAttribute('data-autoplay') === 'true',
                    muted: item.getAttribute('data-muted') === 'true',
                    loop: item.getAttribute('data-loop') === 'true',
                    alt: item.alt
                });
            }
        }
        
        if (projectImages.length === 0) return;
        
        // Устанавливаем заголовок и описание
        modalTitle.textContent = project.name;
        modalDescription.textContent = project.desc;
        
        // Обновляем общее количество слайдов
        totalSlidesSpan.textContent = projectImages.length;
        
        // Открываем первый слайд
        currentSlideIndex = 0;
        renderCurrentSlide();
        
        // Обновляем миниатюры проектов
        updateProjectThumbnails();
        
        // Показываем модальное окно
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Отрисовка текущего слайда
    function renderCurrentSlide() {
        if (!projectImages.length) return;
        
        modalSlides.innerHTML = '';
        const slide = projectImages[currentSlideIndex];
        
        const slideDiv = document.createElement('div');
        slideDiv.className = 'modal-slide';
        
        if (slide.type === 'image') {
            const img = document.createElement('img');
            img.src = slide.src;
            img.alt = slide.alt || 'Projekt Bild';
            img.loading = 'lazy';
            img.onload = function() { this.classList.add('loaded'); };
            slideDiv.appendChild(img);
        } else if (slide.type === 'video') {
            const video = document.createElement('video');
            video.src = slide.src;
            video.controls = true;
            if (slide.autoplay) video.autoplay = true;
            if (slide.muted) video.muted = true;
            if (slide.loop) video.loop = true;
            video.alt = slide.alt || 'Projekt Video';
            slideDiv.appendChild(video);
        }
        
        modalSlides.appendChild(slideDiv);
        currentSlideSpan.textContent = currentSlideIndex + 1;
    }
    
    // Обновление миниатюр проектов
    function updateProjectThumbnails() {
        if (!projectsThumbnails) return;
        
        projectsThumbnails.innerHTML = '';
        
        allProjects.forEach((project, index) => {
            const thumb = document.createElement('div');
            thumb.className = 'thumbnail';
            if (index === currentProjectIndex) {
                thumb.classList.add('active');
            }
            
            const img = document.createElement('img');
            img.src = project.mainImage;
            img.alt = project.name;
            img.loading = 'lazy';
            
            thumb.appendChild(img);
            
            thumb.addEventListener('click', function() {
                if (index !== currentProjectIndex) {
                    openProject(index);
                }
            });
            
            projectsThumbnails.appendChild(thumb);
        });
    }
    
    // Навигация по слайдам
    if (modalPrev) {
        modalPrev.addEventListener('click', function() {
            if (projectImages.length > 0) {
                currentSlideIndex = (currentSlideIndex - 1 + projectImages.length) % projectImages.length;
                renderCurrentSlide();
            }
        });
    }
    
    if (modalNext) {
        modalNext.addEventListener('click', function() {
            if (projectImages.length > 0) {
                currentSlideIndex = (currentSlideIndex + 1) % projectImages.length;
                renderCurrentSlide();
            }
        });
    }
    
    // Навигация по проектам
    if (projectPrevBtn) {
        projectPrevBtn.addEventListener('click', function() {
            const newIndex = (currentProjectIndex - 1 + allProjects.length) % allProjects.length;
            openProject(newIndex);
        });
    }
    
    if (projectNextBtn) {
        projectNextBtn.addEventListener('click', function() {
            const newIndex = (currentProjectIndex + 1) % allProjects.length;
            openProject(newIndex);
        });
    }
    
    // Закрытие модального окна
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                if (e.ctrlKey || e.metaKey) {
                    // Ctrl+Left - предыдущий проект
                    if (projectPrevBtn) projectPrevBtn.click();
                } else {
                    // Left - предыдущий слайд
                    if (modalPrev) modalPrev.click();
                }
            } else if (e.key === 'ArrowRight') {
                if (e.ctrlKey || e.metaKey) {
                    // Ctrl+Right - следующий проект
                    if (projectNextBtn) projectNextBtn.click();
                } else {
                    // Right - следующий слайд
                    if (modalNext) modalNext.click();
                }
            }
        }
    });
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        // Останавливаем видео при закрытии
        const videos = modalSlides.querySelectorAll('video');
        videos.forEach(video => {
            video.pause();
        });
    }
}





