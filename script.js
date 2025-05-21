// إضافة تأثيرات بصرية متقدمة وتحسين تجربة المستخدم
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة AOS للتحريك
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        disable: 'mobile'
    });

    // تهيئة القائمة المتنقلة
    initMobileNav();
    
    // تهيئة الهيدر اللزج
    initStickyHeader();
    
    // تهيئة الأسئلة الشائعة
    initFAQ();
    
    // تهيئة عداد الإحصائيات
    initStatsCounter();
    
    // تهيئة سلايدر الشهادات
    initTestimonialsSlider();
    
    // تهيئة نموذج الاتصال
    initContactForm();
    
    // تهيئة الشات بوت
    initChatBot();
    
    // تهيئة لايت بوكس للصور
    initLightbox();
    
    // تهيئة البوب أب للتدوينات
    initBlogPopup();
    
    // تهيئة تأثيرات التمرير
    initScrollEffects();
    
    // تهيئة تأثيرات الخلفية المتحركة
    initParticlesBackground();
    
    // تهيئة تأثيرات الزر
    initButtonEffects();
    
    // تهيئة تأثيرات الصور
    initImageEffects();
    
    // تهيئة تأثيرات النص
    initTextEffects();
    
    // تهيئة تأثيرات الألوان
    initColorEffects();
    
    // تهيئة تأثيرات الخدمات
    initServicesEffects();
    
    // تهيئة تأثيرات الفريق
    initTeamEffects();
    
    // تهيئة تأثيرات الباقات
    initPackagesEffects();
    
    // تهيئة تأثيرات الاتصال
    initContactEffects();
    
    // تهيئة تأثيرات الفوتر
    initFooterEffects();
});

// تهيئة القائمة المتنقلة
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // إضافة تأثير حركي للقائمة
            if (navMenu.classList.contains('active')) {
                const navLinks = document.querySelectorAll('.nav-menu li');
                navLinks.forEach((link, index) => {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                    link.style.opacity = '1';
                });
            } else {
                const navLinks = document.querySelectorAll('.nav-menu li');
                navLinks.forEach(link => {
                    link.style.animation = '';
                    link.style.opacity = '0';
                });
            }
        });
    }
    
    // إغلاق القائمة عند النقر على الروابط
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // إضافة تأثير التمرير السلس للروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// تهيئة الهيدر اللزج
function initStickyHeader() {
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('sticky');
                
                // إضافة تأثير ظهور تدريجي للهيدر
                if (!header.classList.contains('animated')) {
                    header.style.transform = 'translateY(-100%)';
                    setTimeout(() => {
                        header.style.transition = 'transform 0.3s ease-in-out';
                        header.style.transform = 'translateY(0)';
                        header.classList.add('animated');
                    }, 50);
                }
            } else {
                header.classList.remove('sticky');
                header.classList.remove('animated');
                header.style.transition = '';
                header.style.transform = '';
            }
            
            // تحديث القائمة النشطة أثناء التمرير
            updateActiveNavOnScroll();
        });
    }
}

// تحديث القائمة النشطة أثناء التمرير
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// تهيئة الأسئلة الشائعة
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // تعيين الارتفاع الأصلي للإجابة
        if (answer) {
            answer.style.maxHeight = '0px';
        }
        
        question.addEventListener('click', function() {
            // إغلاق جميع الأسئلة المفتوحة
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0px';
                    }
                }
            });
            
            // تبديل حالة السؤال الحالي
            item.classList.toggle('active');
            
            // تحريك الإجابة
            if (answer) {
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = '0px';
                }
            }
        });
    });
}

// تهيئة عداد الإحصائيات
function initStatsCounter() {
    const statsSection = document.querySelector('.stats-section');
    const statsNumbers = document.querySelectorAll('.stats-number');
    
    if (statsSection && statsNumbers.length) {
        let counted = false;
        
        function startCounting() {
            if (isInViewport(statsSection) && !counted) {
                counted = true;
                
                statsNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    const duration = 2000; // مدة العد بالمللي ثانية
                    const increment = target / (duration / 16); // 60 إطار في الثانية
                    
                    let current = 0;
                    const counter = setInterval(function() {
                        current += increment;
                        stat.textContent = Math.floor(current);
                        
                        if (current >= target) {
                            stat.textContent = target;
                            clearInterval(counter);
                            
                            // إضافة تأثير نبض بعد انتهاء العد
                            stat.classList.add('pulse-animation');
                        }
                    }, 16);
                });
            }
        }
        
        // بدء العد عند التمرير
        window.addEventListener('scroll', startCounting);
        
        // التحقق عند تحميل الصفحة
        startCounting();
    }
}

// تهيئة سلايدر الشهادات
function initTestimonialsSlider() {
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    
    if (testimonialsSlider) {
        $(testimonialsSlider).slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: true,
            rtl: true,
            adaptiveHeight: true,
            prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-right"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-left"></i></button>',
            customPaging: function(slider, i) {
                return '<button class="slick-dot"></button>';
            },
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false
                    }
                }
            ]
        });
        
        // إضافة تأثير تلاشي عند تغيير الشريحة
        $(testimonialsSlider).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            $(slick.$slides[currentSlide]).addClass('fade-out');
            setTimeout(() => {
                $(slick.$slides[currentSlide]).removeClass('fade-out');
            }, 500);
        });
    }
}

// تهيئة نموذج الاتصال
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        // إضافة تأثيرات للحقول عند التركيز
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (this.value === '') {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // تحقق إذا كان الحقل يحتوي على قيمة عند التحميل
            if (input.value !== '') {
                input.parentElement.classList.add('focused');
            }
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // التحقق من صحة النموذج
            if (!validateForm(contactForm)) {
                return;
            }
            
            // إظهار رسالة التحميل
            formMessage.innerHTML = '<div class="alert alert-info">جاري إرسال رسالتك... <i class="fas fa-spinner fa-spin"></i></div>';
            
            // جمع بيانات النموذج
            const formData = new FormData(contactForm);
            
            // إضافة تأثير تعطيل النموذج أثناء الإرسال
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
            
            // إرسال البيانات باستخدام Fetch API
            fetch(contactForm.getAttribute('action'), {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    // إظهار رسالة النجاح
                    formMessage.innerHTML = `<div class="alert alert-success"><i class="fas fa-check-circle"></i> ${data.message}</div>`;
                    contactForm.reset();
                    
                    // إعادة تعيين حالة الحقول
                    formInputs.forEach(input => {
                        input.parentElement.classList.remove('focused');
                    });
                    
                    // إظهار إشعار النجاح
                    showNotification('تم الإرسال بنجاح', 'تم إرسال رسالتك بنجاح وسنتواصل معك قريباً.', 'success');
                    
                    // إضافة تأثير نجاح للنموذج
                    contactForm.classList.add('form-success');
                    setTimeout(() => {
                        contactForm.classList.remove('form-success');
                    }, 3000);
                } else {
                    // إظهار رسالة الخطأ
                    formMessage.innerHTML = `<div class="alert alert-danger"><i class="fas fa-exclamation-circle"></i> ${data.message}</div>`;
                    
                    // إظهار إشعار الخطأ
                    showNotification('خطأ في الإرسال', data.message, 'error');
                    
                    // إضافة تأثير خطأ للنموذج
                    contactForm.classList.add('form-error');
                    setTimeout(() => {
                        contactForm.classList.remove('form-error');
                    }, 3000);
                }
                
                // إعادة تفعيل زر الإرسال
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            })
            .catch(error => {
                // إظهار رسالة خطأ الاتصال
                formMessage.innerHTML = '<div class="alert alert-danger"><i class="fas fa-exclamation-triangle"></i> حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة مرة أخرى.</div>';
                
                // إظهار إشعار الخطأ
                showNotification('خطأ في الاتصال', 'حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة مرة أخرى.', 'error');
                
                // إعادة تفعيل زر الإرسال
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            });
        });
    }
}

// التحقق من صحة النموذج
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            isValid = false;
            showInputError(input, 'هذا الحقل مطلوب');
        } else if (input.type === 'email' && !validateEmail(input.value)) {
            isValid = false;
            showInputError(input, 'يرجى إدخال بريد إلكتروني صحيح');
        } else {
            removeInputError(input);
        }
    });
    
    return isValid;
}

// إظهار خطأ في حقل الإدخال
function showInputError(input, message) {
    const formGroup = input.parentElement;
    formGroup.classList.add('has-error');
    
    // إزالة رسالة الخطأ السابقة إن وجدت
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // إضافة رسالة الخطأ الجديدة
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    formGroup.appendChild(errorMessage);
    
    // إضافة تأثير اهتزاز للحقل
    input.classList.add('shake-animation');
    setTimeout(() => {
        input.classList.remove('shake-animation');
    }, 500);
}

// إزالة خطأ من حقل الإدخال
function removeInputError(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('has-error');
    
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

// التحقق من صحة البريد الإلكتروني
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// تهيئة الشات بوت
function initChatBot() {
    const chatBotToggle = document.querySelector('.chat-bot-toggle');
    const chatBotClose = document.querySelector('.chat-bot-close');
    const chatBot = document.querySelector('.chat-bot');
    const chatMessages = document.querySelector('.chat-bot-messages');
    const chatInput = document.querySelector('.chat-bot-input input');
    const chatSendButton = document.querySelector('.chat-bot-input button');
    
    // قائمة الردود التلقائية
    const autoResponses = {
        'مرحبا': 'مرحباً بك! كيف يمكنني مساعدتك اليوم؟',
        'السلام عليكم': 'وعليكم السلام ورحمة الله وبركاته! كيف يمكنني مساعدتك؟',
        'الخدمات': 'نقدم مجموعة متنوعة من خدمات التسويق الرقمي تشمل إدارة وسائل التواصل الاجتماعي، تصميم الهويات البصرية، حملات جوجل الإعلانية، تصميم وتطوير المواقع، تحسين محركات البحث (SEO)، وإنتاج المحتوى المرئي.',
        'الأسعار': 'تبدأ أسعارنا من 500 شيكل شهرياً. يمكنك الاطلاع على قسم الباقات للمزيد من التفاصيل أو التواصل معنا للحصول على عرض سعر مخصص.',
        'العنوان': 'يقع مقرنا في نابلس، فلسطين. يمكنك زيارتنا أو التواصل معنا عبر الهاتف أو البريد الإلكتروني.',
        'ساعات العمل': 'نعمل من الأحد إلى الخميس من الساعة 9 صباحاً حتى 5 مساءً.',
        'شكرا': 'شكراً لك! نحن سعداء بمساعدتك. هل هناك أي شيء آخر يمكنني مساعدتك به؟',
        'تواصل': 'يمكنك التواصل معنا عبر الهاتف على الرقم +970 XXX XXXXXX أو عبر البريد الإلكتروني info@adnova.ps',
        'مع السلامة': 'شكراً لتواصلك معنا! نتمنى لك يوماً سعيداً.'
    };
    
    // فتح وإغلاق الشات بوت
    if (chatBotToggle && chatBotClose && chatBot) {
        // إضافة تأثير نبض للزر
        setInterval(() => {
            chatBotToggle.classList.add('pulse');
            setTimeout(() => {
                chatBotToggle.classList.remove('pulse');
            }, 1000);
        }, 5000);
        
        chatBotToggle.addEventListener('click', function() {
            chatBot.classList.toggle('active');
            
            // إضافة تأثير ظهور للشات
            if (chatBot.classList.contains('active')) {
                chatBotToggle.innerHTML = '<i class="fas fa-times"></i>';
                chatBotToggle.classList.add('active');
                
                // تمرير الشات لأسفل
                if (chatMessages) {
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }
                
                // تركيز على حقل الإدخال
                if (chatInput) {
                    setTimeout(() => {
                        chatInput.focus();
                    }, 300);
                }
            } else {
                chatBotToggle.innerHTML = '<i class="fas fa-comments"></i>';
                chatBotToggle.classList.remove('active');
            }
        });
        
        chatBotClose.addEventListener('click', function() {
            chatBot.classList.remove('active');
            chatBotToggle.innerHTML = '<i class="fas fa-comments"></i>';
            chatBotToggle.classList.remove('active');
        });
    }
    
    // إرسال الرسائل
    if (chatInput && chatSendButton && chatMessages) {
        // إرسال الرسالة عند النقر على زر الإرسال
        chatSendButton.addEventListener('click', sendMessage);
        
        // إرسال الرسالة عند الضغط على Enter
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        // وظيفة إرسال الرسالة
        function sendMessage() {
            const message = chatInput.value.trim();
            
            if (message) {
                // إضافة رسالة المستخدم
                addMessage(message, 'user');
                
                // مسح حقل الإدخال
                chatInput.value = '';
                
                // معالجة الرسالة وإرسالها للخادم
                processMessage(message);
            }
        }
        
        // وظيفة إضافة رسالة للشات
        function addMessage(message, sender) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('chat-message', sender);
            
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            messageElement.innerHTML = `
                <div class="chat-message-content">${message}</div>
                <div class="chat-time">${time}</div>
            `;
            
            // إضافة تأثير ظهور للرسالة
            messageElement.style.opacity = '0';
            messageElement.style.transform = 'translateY(20px)';
            
            chatMessages.appendChild(messageElement);
            
            // تمرير الشات لأسفل
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // تطبيق تأثير الظهور
            setTimeout(() => {
                messageElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                messageElement.style.opacity = '1';
                messageElement.style.transform = 'translateY(0)';
            }, 10);
        }
        
        // وظيفة معالجة الرسالة
        function processMessage(message) {
            // إظهار مؤشر الكتابة
            const typingIndicator = document.createElement('div');
            typingIndicator.classList.add('chat-message', 'bot', 'typing-indicator');
            typingIndicator.innerHTML = `
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            `;
            
            chatMessages.appendChild(typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // تأخير قصير لمحاكاة المعالجة
            setTimeout(() => {
                // إزالة مؤشر الكتابة
                typingIndicator.remove();
                
                // البحث عن رد تلقائي
                let response = findAutoResponse(message);
                
                // إذا لم يتم العثور على رد تلقائي، استخدم الرد الافتراضي
                if (!response) {
                    response = "شكراً لرسالتك! سيتم الرد عليك من قبل أحد ممثلي خدمة العملاء في أقرب وقت ممكن. يمكنك أيضاً التواصل معنا مباشرة عبر الهاتف أو البريد الإلكتروني.";
                }
                
                // إضافة رد البوت
                addMessage(response, 'bot');
                
                // إرسال الرسالة للخادم لتخزينها
                saveChatMessage(message, response);
            }, 1500);
        }
        
        // وظيفة البحث عن رد تلقائي
        function findAutoResponse(message) {
            // تحويل الرسالة إلى أحرف صغيرة للمقارنة
            const lowerMessage = message.toLowerCase();
            
            // البحث في قائمة الردود التلقائية
            for (const key in autoResponses) {
                if (lowerMessage.includes(key.toLowerCase())) {
                    return autoResponses[key];
                }
            }
            
            return null;
        }
        
        // وظيفة حفظ رسالة الشات
        function saveChatMessage(userMessage, botResponse) {
            // إنشاء كائن البيانات
            const data = {
                user_message: userMessage,
                bot_response: botResponse,
                timestamp: new Date().toISOString()
            };
            
            // إرسال البيانات للخادم
            fetch('chat_api.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .catch(error => {
                console.error('Error saving chat message:', error);
            });
        }
    }
}

// تهيئة لايت بوكس للصور
function initLightbox() {
    // استخدام مكتبة Lightbox2 الجاهزة
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'albumLabel': "صورة %1 من %2",
        'fadeDuration': 300,
        'imageFadeDuration': 300,
        'alwaysShowNavOnTouchDevices': true
    });
    
    // إضافة تأثيرات إضافية للصور
    const portfolioImages = document.querySelectorAll('.portfolio-item');
    portfolioImages.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.portfolio-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.portfolio-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });
}

// تهيئة البوب أب للتدوينات
function initBlogPopup() {
    // سيتم تنفيذه لاحقاً عند إضافة قسم المدونة
    const blogItems = document.querySelectorAll('.blog-item');
    const blogPopup = document.querySelector('.blog-popup');
    
    if (blogItems.length && blogPopup) {
        blogItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // تحميل محتوى المدونة
                const title = this.getAttribute('data-title');
                const date = this.getAttribute('data-date');
                const author = this.getAttribute('data-author');
                const image = this.getAttribute('data-image');
                const content = this.getAttribute('data-content');
                
                // تحديث محتوى البوب أب
                const popupTitle = blogPopup.querySelector('.blog-popup-title');
                const popupDate = blogPopup.querySelector('.blog-popup-date');
                const popupAuthor = blogPopup.querySelector('.blog-popup-author');
                const popupImage = blogPopup.querySelector('.blog-popup-image');
                const popupContent = blogPopup.querySelector('.blog-popup-content');
                
                if (popupTitle) popupTitle.textContent = title;
                if (popupDate) popupDate.textContent = date;
                if (popupAuthor) popupAuthor.textContent = author;
                if (popupImage) popupImage.src = image;
                if (popupContent) popupContent.innerHTML = content;
                
                // إظهار البوب أب
                blogPopup.classList.add('active');
                
                // منع التمرير في الخلفية
                document.body.style.overflow = 'hidden';
            });
        });
        
        // إغلاق البوب أب
        const closeButton = blogPopup.querySelector('.blog-popup-close');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                blogPopup.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // إغلاق البوب أب عند النقر خارجه
        blogPopup.addEventListener('click', function(e) {
            if (e.target === blogPopup) {
                blogPopup.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// تهيئة تأثيرات التمرير
function initScrollEffects() {
    // تأثير ظهور العناصر عند التمرير
    const fadeElements = document.querySelectorAll('.fade-in-element');
    
    function checkFadeElements() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkFadeElements);
    checkFadeElements();
    
    // تأثير التمرير المتوازي
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    function updateParallax() {
        parallaxElements.forEach(element => {
            const scrollPosition = window.scrollY;
            const speed = element.getAttribute('data-speed') || 0.5;
            
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    }
    
    window.addEventListener('scroll', updateParallax);
}

// تهيئة تأثيرات الخلفية المتحركة
function initParticlesBackground() {
    // إضافة خلفية متحركة للقسم الرئيسي
    const introSection = document.getElementById('intro');
    
    if (introSection && typeof particlesJS !== 'undefined') {
        particlesJS('intro', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
}

// تهيئة تأثيرات الزر
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // إضافة تأثير تموج عند النقر
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // إضافة تأثير تحويم
        button.addEventListener('mouseenter', function() {
            button.classList.add('hover-effect');
        });
        
        button.addEventListener('mouseleave', function() {
            button.classList.remove('hover-effect');
        });
    });
}

// تهيئة تأثيرات الصور
function initImageEffects() {
    // تأثير تكبير الصور عند التحويم
    const zoomImages = document.querySelectorAll('.zoom-effect');
    
    zoomImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // تأثير تدوير الصور
    const rotateImages = document.querySelectorAll('.rotate-effect');
    
    rotateImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(5deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0)';
        });
    });
}

// تهيئة تأثيرات النص
function initTextEffects() {
    // تأثير تلوين النص عند التحويم
    const colorTexts = document.querySelectorAll('.color-effect');
    
    colorTexts.forEach(text => {
        text.addEventListener('mouseenter', function() {
            this.style.color = 'var(--secondary-color)';
            this.style.transition = 'color 0.3s ease';
        });
        
        text.addEventListener('mouseleave', function() {
            this.style.color = '';
        });
    });
    
    // تأثير تسطير النص
    const underlineTexts = document.querySelectorAll('.underline-effect');
    
    underlineTexts.forEach(text => {
        text.addEventListener('mouseenter', function() {
            this.style.textDecoration = 'underline';
            this.style.transition = 'text-decoration 0.3s ease';
        });
        
        text.addEventListener('mouseleave', function() {
            this.style.textDecoration = 'none';
        });
    });
}

// تهيئة تأثيرات الألوان
function initColorEffects() {
    // تأثير تغيير لون الخلفية عند التمرير
    const colorSections = document.querySelectorAll('.color-change-section');
    
    function updateColors() {
        colorSections.forEach(section => {
            const scrollPosition = window.scrollY;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition > sectionTop - window.innerHeight / 2 && scrollPosition < sectionTop + sectionHeight) {
                const targetColor = section.getAttribute('data-color');
                if (targetColor) {
                    document.documentElement.style.setProperty('--dynamic-color', targetColor);
                }
            }
        });
    }
    
    window.addEventListener('scroll', updateColors);
    updateColors();
}

// تهيئة تأثيرات الخدمات
function initServicesEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // تأثير ارتفاع البطاقة
            this.style.transform = 'translateY(-10px)';
            
            // تأثير تدوير الأيقونة
            const iconWrapper = this.querySelector('.service-icon-wrapper');
            if (iconWrapper) {
                iconWrapper.style.transform = 'rotateY(180deg)';
            }
            
            // تأثير تغيير لون العنوان
            const title = this.querySelector('h3');
            if (title) {
                title.style.color = 'var(--secondary-color)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            
            const iconWrapper = this.querySelector('.service-icon-wrapper');
            if (iconWrapper) {
                iconWrapper.style.transform = '';
            }
            
            const title = this.querySelector('h3');
            if (title) {
                title.style.color = '';
            }
        });
    });
}

// تهيئة تأثيرات الفريق
function initTeamEffects() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            // تأثير ارتفاع العنصر
            this.style.transform = 'translateY(-10px)';
            
            // تأثير تكبير الصورة
            const image = this.querySelector('.team-image');
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
            
            // تأثير ظهور وسائل التواصل الاجتماعي
            const socialIcons = this.querySelectorAll('.team-social a');
            socialIcons.forEach((icon, index) => {
                icon.style.transform = 'translateY(0)';
                icon.style.opacity = '1';
                icon.style.transitionDelay = `${index * 0.1}s`;
            });
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = '';
            
            const image = this.querySelector('.team-image');
            if (image) {
                image.style.transform = '';
            }
            
            const socialIcons = this.querySelectorAll('.team-social a');
            socialIcons.forEach(icon => {
                icon.style.transform = 'translateY(20px)';
                icon.style.opacity = '0';
                icon.style.transitionDelay = '0s';
            });
        });
    });
}

// تهيئة تأثيرات الباقات
function initPackagesEffects() {
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // تأثير ارتفاع البطاقة
            if (!this.classList.contains('vip')) {
                this.style.transform = 'translateY(-10px) scale(1.03)';
            } else {
                this.style.transform = 'scale(1.08) translateY(-10px)';
            }
            
            // تأثير تغيير لون الزر
            const button = this.querySelector('.btn');
            if (button && button.classList.contains('btn-outline')) {
                button.classList.remove('btn-outline');
                button.classList.add('btn-primary');
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('vip')) {
                this.style.transform = '';
            } else {
                this.style.transform = 'scale(1.05)';
            }
            
            // إعادة تعيين لون الزر
            const button = this.querySelector('.btn');
            if (button && !this.classList.contains('vip') && button.classList.contains('btn-primary') && !button.classList.contains('btn-outline')) {
                button.classList.remove('btn-primary');
                button.classList.add('btn-outline');
            }
        });
    });
}

// تهيئة تأثيرات الاتصال
function initContactEffects() {
    const contactDetails = document.querySelectorAll('.contact-detail');
    
    contactDetails.forEach(detail => {
        detail.addEventListener('mouseenter', function() {
            // تأثير ارتفاع العنصر
            this.style.transform = 'translateY(-5px)';
            
            // تأثير تغيير لون الأيقونة
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.backgroundColor = 'var(--secondary-color)';
                icon.style.color = 'var(--light-color)';
            }
        });
        
        detail.addEventListener('mouseleave', function() {
            this.style.transform = '';
            
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.backgroundColor = '';
                icon.style.color = '';
            }
        });
    });
    
    // تأثير تحريك الحقول عند التركيز
    const formInputs = document.querySelectorAll('.form-control');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('input-focused');
            }
        });
    });
}

// تهيئة تأثيرات الفوتر
function initFooterEffects() {
    const footerLinks = document.querySelectorAll('.footer-section ul li a');
    
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            // تأثير إزاحة الرابط
            this.style.paddingRight = '10px';
            this.style.color = 'var(--secondary-color)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.paddingRight = '';
            this.style.color = '';
        });
    });
    
    // تأثير نبض الشعار
    const footerLogo = document.querySelector('.footer-logo img');
    
    if (footerLogo) {
        footerLogo.addEventListener('mouseenter', function() {
            this.classList.add('pulse-animation');
        });
        
        footerLogo.addEventListener('mouseleave', function() {
            this.classList.remove('pulse-animation');
        });
    }
}

// وظيفة التحقق مما إذا كان العنصر مرئياً في نافذة العرض
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// وظيفة إظهار الإشعارات
function showNotification(title, message, type = 'info') {
    const notificationSystem = document.getElementById('notification-system');
    
    if (notificationSystem) {
        const notification = document.createElement('div');
        notification.classList.add('notification', `notification-${type}`);
        
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">${title}</div>
                <div class="notification-message">${message}</div>
            </div>
            <button class="notification-close" aria-label="إغلاق الإشعار">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        notificationSystem.appendChild(notification);
        
        // إظهار الإشعار بعد إضافته
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // إخفاء الإشعار بعد 5 ثوانٍ
        setTimeout(() => {
            notification.classList.remove('show');
            
            // إزالة الإشعار من DOM بعد انتهاء التأثير
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
        
        // إغلاق الإشعار عند النقر على زر الإغلاق
        const closeButton = notification.querySelector('.notification-close');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                notification.classList.remove('show');
                
                // إزالة الإشعار من DOM بعد انتهاء التأثير
                setTimeout(() => {
                    notification.remove();
                }, 300);
            });
        }
    }
}
