
// Массив фоновых изображений для героя
const backgroundImages = [
    'dos.png',
    'newirl.jpg',
    'newIrland.jpg'
];

let currentBgIndex = 0;
let bgChangeInterval;

// Функция для предзагрузки изображений
function preloadImages() {
    console.log('Предзагрузка фоновых изображений...');
    backgroundImages.forEach((src, index) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            console.log(`✅ Изображение ${index + 1} (${src}) загружено`);
        };
        img.onerror = () => {
            console.error(`❌ Ошибка загрузки ${src} - проверьте путь к файлу`);
        };
    });
}


function changeBackgroundImage() {
    const heroSection = document.querySelector('.hero');
    
    if (!heroSection) {
        console.error('❌ Секция hero не найдена!');
        return;
    }
    
    // Увеличиваем индекс
    currentBgIndex = (currentBgIndex + 1) % backgroundImages.length;
    const newImage = backgroundImages[currentBgIndex];
    
    console.log(`🔄 Смена фона на: ${newImage}`);
    
    heroSection.style.backgroundImage = `url('${newImage}')`;
    
    heroSection.style.backgroundSize = 'cover';
    heroSection.style.backgroundPosition = 'center';
    heroSection.style.backgroundRepeat = 'no-repeat';
}

function startBackgroundSlideshow() {
    console.log('Запуск слайд-шоу...');
    stopBackgroundSlideshow(); 
    
    // Меняем фон каждые 5 секунд
    bgChangeInterval = setInterval(changeBackgroundImage, 5000);
}

function stopBackgroundSlideshow() {
    if (bgChangeInterval) {
        clearInterval(bgChangeInterval);
        console.log('⏹️ Слайд-шоу остановлено');
    }
}
function initVideoPlayer() {
    const fullscreenVideo = document.getElementById('fullscreenVideo');
    const videoFrame = document.getElementById('videoFrame');
    const closeVideoBtn = document.getElementById('closeVideoBtn');
    const videoReportBtn = document.getElementById('videoReportBtn');
    
    if (videoReportBtn && fullscreenVideo && videoFrame) {
        videoReportBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('▶️ Открытие видео');
            // Замените на ваш реальный YouTube видео ID
            videoFrame.src = 'https://rutube.ru/video/ac75b2ad20d4ca2a6f69a2738af3ad52/?r=plwd';
            fullscreenVideo.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            stopBackgroundSlideshow();
        });
    }
    
    if (closeVideoBtn && fullscreenVideo) {
        closeVideoBtn.addEventListener('click', function() {
            console.log('⏹️ Закрытие видео');
            const iframe = fullscreenVideo.querySelector('iframe');
            if (iframe) iframe.src = '';
            fullscreenVideo.style.display = 'none';
            document.body.style.overflow = 'auto';
            startBackgroundSlideshow();
        });
        
        fullscreenVideo.addEventListener('click', function(e) {
            if (e.target === fullscreenVideo) {
                const iframe = fullscreenVideo.querySelector('iframe');
                if (iframe) iframe.src = '';
                fullscreenVideo.style.display = 'none';
                document.body.style.overflow = 'auto';
                startBackgroundSlideshow();
            }
        });
    }
}


function initForm() {
    const form = document.getElementById('consultationForm');
    const applicationBtn = document.getElementById('applicationBtn');
    
    if (applicationBtn) {
        applicationBtn.addEventListener('click', function() {
            const contactsSection = document.getElementById('contacts');
            if (contactsSection) {
                contactsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const phone = document.getElementById('phone');
            
            if (name && phone) {
                if (!name.value.trim() || !phone.value.trim()) {
                    alert('Пожалуйста, заполните все поля');
                    return;
                }
                
                alert(`Спасибо, ${name.value}! Мы свяжемся с вами в ближайшее время.`);
                name.value = '';
                phone.value = '';
            }
        });
    }
}

// Плавная прокрутка
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

window.addEventListener('load', function() {
    console.log('🚀 Страница загружена, инициализация...');
    
    preloadImages();
    
    // Устанавливаем первое фоновое изображение
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        // Удаляем background-attachment если он есть
        const currentBg = window.getComputedStyle(heroSection).backgroundImage;
        console.log('Текущий фон:', currentBg);
        
        heroSection.style.backgroundImage = `url('${backgroundImages[0]}')`;
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'center';
        heroSection.style.backgroundRepeat = 'no-repeat';
        heroSection.style.transition = 'background-image 0.8s ease-in-out';
        
        console.log(`✅ Установлен начальный фон: ${backgroundImages[0]}`);
        
        setTimeout(() => {
            console.log('🔄 Первая смена фона через 2 секунды');
            changeBackgroundImage();
        }, 2000);
        
        setTimeout(() => {
            startBackgroundSlideshow();
        }, 3000);
        
        window.testBackground = testBackgroundChange;
        console.log('💡 Для ручной смены фона введите в консоль: testBackground()');
        
    } else {
        console.error('❌ Секция hero не найдена при загрузке!');
    }
    
    // Инициализируем все функции
    initVideoPlayer();
    initPhoneMask();
    initForm();
    initSmoothScroll();
    initBurgerMenu();
    
    
});

window.addEventListener('beforeunload', function() {
    stopBackgroundSlideshow();
});