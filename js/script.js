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