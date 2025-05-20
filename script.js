// إعداد القائمة المنسدلة للأجهزة المحمولة
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('nav-list');

hamburger.addEventListener('click', () => {
    navList.classList.toggle('show');
});

// إعداد تأثيرات الظهور عند التمرير
const sections = document.querySelectorAll('.animate-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => {
    observer.observe(section);
});

// إعداد Lightbox لمعرض الأعمال
lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true,
    'fadeDuration': 600,
    'imageFadeDuration': 600
});