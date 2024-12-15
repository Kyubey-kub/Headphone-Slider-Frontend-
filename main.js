// Get all the background divs
var backgrounds = document.querySelectorAll('.background');
// Get the slider and the images
const slider = document.querySelector('.slider-images');
const images = Array.from(slider.children);

// Set the initial image index
let imageIndex = 0;

// Update the slider
function updateSlider() {
    // Remove all classes first
    images.forEach(image => {
        image.classList.remove('active', 'previous', 'next', 'inactive');
    });

    // Set active image
    images[imageIndex].classList.add('active');

    // Set previous image
    const prevIndex = (imageIndex - 1 + images.length) % images.length;
    images[prevIndex].classList.add('previous');

    // Set next image
    const nextIndex = (imageIndex + 1) % images.length;
    images[nextIndex].classList.add('next');

    // Set inactive for remaining images
    images.forEach((image, index) => {
        if (!image.classList.contains('active') && 
            !image.classList.contains('previous') && 
            !image.classList.contains('next')) {
            image.classList.add('inactive');
        }
    });

    // Update backgrounds
    backgrounds.forEach(bg => bg.style.opacity = 0);
    if (backgrounds[imageIndex]) {
        backgrounds[imageIndex].style.opacity = 1;
    }

    // Update text colors
    const mainContent = document.querySelector('.slider-main');
    // Remove all color classes first
    mainContent.classList.remove('green-theme', 'blue-theme', 'red-theme', 'gray-theme', 'black-theme');
    
    // Add appropriate color class based on current slide
    if (imageIndex === 0) {
        mainContent.classList.add('green-theme');
    } else if (imageIndex === 1) {
        mainContent.classList.add('blue-theme');
    } else if (imageIndex === 2) {
        mainContent.classList.add('red-theme');
    } else if (imageIndex === 3) {
        mainContent.classList.add('gray-theme');
    } else {
        mainContent.classList.add('black-theme');
    }
    
    imageIndex = (imageIndex + 1) % images.length;
}

// สร้างตัวแปรเก็บ timeout IDs
let homeAnimationTimeout;
let detailAnimationTimeout;

function animatePrice() {
    // เคลียร์ animation เก่า
    clearTimeout(homeAnimationTimeout);
    
    const priceElement = document.querySelector('.slider-main .price');
    const finalPrice = '799.99';
    let currentText = '';
    let isDeleting = false;

    function animate() {
        if (!isDeleting) {
            // Typing
            if (currentText.length < finalPrice.length) {
                currentText = finalPrice.slice(0, currentText.length + 1);
                priceElement.textContent = currentText;
                homeAnimationTimeout = setTimeout(animate, 150);
            } else {
                homeAnimationTimeout = setTimeout(() => {
                    isDeleting = true;
                    animate();
                }, 2000);
            }
        } else {
            // Deleting
            if (currentText.length > 0) {
                currentText = currentText.slice(0, -1);
                priceElement.textContent = currentText;
                homeAnimationTimeout = setTimeout(animate, 100);
            } else {
                // Reset and start again
                isDeleting = false;
                homeAnimationTimeout = setTimeout(animate, 500);
            }
        }
    }

    // Start the animation
    animate();
}

function animateDetailPrice() {
    // เคลียร์ animation เก่า
    clearTimeout(detailAnimationTimeout);
    
    const priceElement = document.querySelector('.detail-section .price');
    const finalPrice = '799.99';
    let currentText = '';
    let isDeleting = false;

    function animate() {
        if (!isDeleting) {
            // Typing
            if (currentText.length < finalPrice.length) {
                currentText = finalPrice.slice(0, currentText.length + 1);
                priceElement.textContent = currentText;
                detailAnimationTimeout = setTimeout(animate, 150);
            } else {
                detailAnimationTimeout = setTimeout(() => {
                    isDeleting = true;
                    animate();
                }, 2000);
            }
        } else {
            // Deleting
            if (currentText.length > 0) {
                currentText = currentText.slice(0, -1);
                priceElement.textContent = currentText;
                detailAnimationTimeout = setTimeout(animate, 100);
            } else {
                isDeleting = false;
                detailAnimationTimeout = setTimeout(animate, 500);
            }
        }
    }

    // Start the animation
    animate();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // เพิ่มโค้ดนี้ที่ต้นของ DOMContentLoaded
    // เลื่อนไปที่ home section เมื่อรีเฟรชหน้า
    window.onload = function() {
        window.scrollTo(0, 0);
        const homeSection = document.querySelector('#home');
        if (homeSection) {
            // รีเซ็ต slider
            imageIndex = 0;
            updateSlider();
            
            // รีเซ็ต price animation
            const priceElement = document.querySelector('.price');
            if (priceElement) {
                priceElement.classList.remove('animate');
                void priceElement.offsetWidth;
                priceElement.classList.add('animate');
            }
        }
    };
    
    // Scroll to top when page is loaded/refreshed
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Set initial slider state
    images[0].classList.add('active');
    images[1].classList.add('next');
    images[images.length - 1].classList.add('previous');
    
    // Start price animation
    animatePrice();
    
    // Start slider and update colors immediately
    updateSlider();
    setInterval(updateSlider, 3000);

    const detailSection = document.querySelector('.detail-section');
    
    // จัดการการคลิกเลือกสี
    const colorItems = document.querySelectorAll('.color-item');
    const selectedHeadphone = document.getElementById('selected-headphone');
    
    // สร้าง mapping ระหว่างสีกับ index ของรูปภาพ
    const colorMapping = {
        'green': 0,  // green.png
        'blue': 1,   // blue.png
        'red': 2,    // red.png
        'white': 3,  // white.png
        'black': 4   // black.png
    };

    colorItems.forEach(item => {
        item.addEventListener('click', function() {
            // ลบ class active จากทุก color item
            colorItems.forEach(item => item.classList.remove('active'));
            // เพิ่ม class active ให้กับสีที่เลือก
            this.classList.add('active');

            // ดึงรื่อสีที่เลือก
            const color = this.getAttribute('data-color');
            // ดึง index ที่ถูกต้องจาก mapping
            const imageIndex = colorMapping[color];

            // ดึงรูปภาพที่ตรงกับสีที่เลือกจาก slider
            const sliderImages = document.querySelectorAll('.slider-images .slider-image');
            if (sliderImages[imageIndex]) {
                selectedHeadphone.src = sliderImages[imageIndex].src;
            }

            // เปลี่ยนสีพื้นหลัง
            detailSection.classList.remove('green-bg', 'blue-bg', 'red-bg', 'white-bg', 'black-bg');
            detailSection.classList.add(`${color}-bg`);

            // ปรับสีข้อความถ้าพื้นหลังเป็นสีดำ
            if (color === 'black') {
                detailSection.querySelector('.headphone-details').style.color = '#ffffff';
            } else {
                detailSection.querySelector('.headphone-details').style.color = '#1d1d1f';
            }
        });
    });

    // ดึงรูปภาพแรกจาก slider มาแสงเมื่อโหลดหน้าเว็บ
    const firstSliderImage = document.querySelector('.slider-images .slider-image');
    if (firstSliderImage && selectedHeadphone) {
        selectedHeadphone.src = firstSliderImage.src;
    }

    // เลือกสีแรกเป็นค่าเริ่มต้น
    if (colorItems[0]) {
        colorItems[0].classList.add('active');
        detailSection.classList.add('green-bg'); // เริ่มต้นด้วยสีเขียว
    }

    // ฟังก์ชันสำหรับ smooth scroll
    function smoothScroll(target, duration) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Easing function
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // จัดการการคลิก nav links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            console.log('Clicked link with target:', targetId); // เพิ่ม debug log

            const targetSection = document.querySelector(targetId);
            console.log('Found target section:', targetSection); // เพิ่ม debug log
            
            if (targetSection) {
                // ใช้ scrollIntoView แทน smoothScroll ชั่วคราวเพื่อทดสอบ
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });

                if (targetId === '#home') {
                    setTimeout(() => {
                        imageIndex = 0;
                        updateSlider();
                        animatePrice();
                    }, 1000);
                } else if (targetId === '#detail') {
                    setTimeout(() => {
                        animateDetailPrice();
                        const firstColorItem = document.querySelector('.color-item');
                        if (firstColorItem) {
                            firstColorItem.click();
                        }
                    }, 1000);
                } else if (targetId === '#overview') {
                    setTimeout(() => {
                        rotationDegree = 0;
                        currentColorIndex = 0;
                        rotatingHeadphone.src = `https://www.yudiz.com/codepen/headphone-slider/${colors[currentColorIndex]}.png`;
                        overviewSection.style.background = backgroundGradients[currentColorIndex];
                    }, 1000);
                } else if (targetId === '#services') {
                    setTimeout(() => {
                        resetServiceTitleAnimation();
                    }, 1000);
                } else if (targetId === '#contact') {
                    const contactTitle = document.querySelector('.contact-title');
                    const subtitleLeft = document.querySelector('.subtitle-left');
                    const subtitleRight = document.querySelector('.subtitle-right');
                    
                    contactTitle.style.opacity = '0';
                    contactTitle.style.transform = 'translateY(-50px)';
                    subtitleLeft.style.opacity = '0';
                    subtitleLeft.style.transform = 'translateX(-50px)';
                    subtitleRight.style.opacity = '0';
                    subtitleRight.style.transform = 'translateX(50px)';
                    
                    setTimeout(() => {
                        contactTitle.classList.add('visible');
                        setTimeout(() => {
                            subtitleLeft.classList.add('visible');
                            subtitleRight.classList.add('visible');
                        }, 300);
                    }, 1000);
                }
            }
        });
    });

    // ตรจสอบการมองเห็น section เมื่อ scroll
    function checkVisibility() {
        const serviceSection = document.querySelector('.service-section');
        const sectionTitle = serviceSection.querySelector('.section-title');
        const rect = serviceSection.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            sectionTitle.classList.add('visible');
        } else {
            sectionTitle.classList.remove('visible');
        }
    }

    // เพิ่ม event listeners สำหรับ scroll และ load
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('load', checkVisibility);

    // Start both price animations
    animatePrice(); // สำหรับ home section
    animateDetailPrice(); // สำหรับ detail section

    // Overview Section Variables
    const rotatingHeadphone = document.getElementById('rotating-headphone');
    const leftArrow = document.querySelector('.arrow-nav.left');
    const rightArrow = document.querySelector('.arrow-nav.right');
    const overviewSection = document.querySelector('.overview-section');
    let rotationDegree = 0;
    let currentColorIndex = 0;
    const colors = ['green', 'blue', 'red', 'white', 'black'];
    const backgroundGradients = [
        'radial-gradient(50% 50% at 50% 50%, #C7F6D0 0%, #7CB686 92.19%)',
        'radial-gradient(50% 50% at 50% 50%, #D1E4F6 0%, #5F9CCF 100%)',
        'radial-gradient(50% 50% at 50% 50%, #FFB7B2 0%, #ED746E 100%)',
        'radial-gradient(50% 50% at 50% 50%, #D7D7D7 0%, #979797 100%)',
        'radial-gradient(50% 50% at 50% 50%, #6B6B6B 0%, #292929 100%)'
    ];

    // Auto Rotation
    function autoRotate() {
        rotationDegree += 1;
        rotatingHeadphone.style.transform = `translate(-50%, -50%) rotateY(${rotationDegree}deg)`;
        requestAnimationFrame(autoRotate);
    }
    autoRotate();

    // Color Change Functions
    function changeColor(direction) {
        if (direction === 'next') {
            currentColorIndex = (currentColorIndex + 1) % colors.length;
        } else {
            currentColorIndex = (currentColorIndex - 1 + colors.length) % colors.length;
        }
        
        // Update headphone image
        rotatingHeadphone.src = `https://www.yudiz.com/codepen/headphone-slider/${colors[currentColorIndex]}.png`;
        
        // Update background
        overviewSection.style.background = backgroundGradients[currentColorIndex];
    }

    // Arrow Click Events
    leftArrow.addEventListener('click', () => changeColor('prev'));
    rightArrow.addEventListener('click', () => changeColor('next'));

    // Auto Color Change
    setInterval(() => changeColor('next'), 5000);

    const serviceSection = document.querySelector('.service-section');
    const sectionTitle = serviceSection.querySelector('.section-title');

    function checkVisibility() {
        const rect = serviceSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            sectionTitle.classList.add('visible');
        }
    }

    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('load', checkVisibility);

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add animation to button
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.innerHTML = '<span>Sending...</span><i class="bx bx-loader-alt bx-spin"></i>';
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message Sent!</span><i class="bx bx-check"></i>';
                submitBtn.style.background = '#4CAF50';
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = '<span>Send Message</span><i class="bx bx-send"></i>';
                    submitBtn.style.background = '#1d1d1f';
                }, 2000);
            }, 1500);
        });
    }

    function checkContactVisibility() {
        const contactSection = document.querySelector('.contact-section');
        const contactTitle = contactSection.querySelector('.contact-title');
        const subtitleLeft = contactSection.querySelector('.subtitle-left');
        const subtitleRight = contactSection.querySelector('.subtitle-right');
        const rect = contactSection.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            contactTitle.classList.add('visible');
            setTimeout(() => {
                subtitleLeft.classList.add('visible');
                subtitleRight.classList.add('visible');
            }, 300);
        }
    }

    // เพิ่ม event listener สำหรับ scroll
    window.addEventListener('scroll', checkContactVisibility);
    window.addEventListener('load', checkContactVisibility);

    // แก้ไขส่วน nav click handler
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                smoothScroll(targetSection, 1500); // เพิ่มเวลาในการเลื่อนเป็น 1.5 วินาที

                if (targetId === '#contact') {
                    const contactTitle = document.querySelector('.contact-title');
                    const subtitleLeft = document.querySelector('.subtitle-left');
                    const subtitleRight = document.querySelector('.subtitle-right');
                    
                    // รีเซ็ต style โดยตรง
                    contactTitle.style.opacity = '0';
                    contactTitle.style.transform = 'translateY(-50px)';
                    subtitleLeft.style.opacity = '0';
                    subtitleLeft.style.transform = 'translateX(-50px)';
                    subtitleRight.style.opacity = '0';
                    subtitleRight.style.transform = 'translateX(50px)';
                    
                    // บังคับให้ browser รีเฟรช DOM
                    void contactTitle.offsetWidth;
                    void subtitleLeft.offsetWidth;
                    void subtitleRight.offsetWidth;
                    
                    // ลบ class visible
                    contactTitle.classList.remove('visible');
                    subtitleLeft.classList.remove('visible');
                    subtitleRight.classList.remove('visible');
                    
                    // เพิ่ม animations ใหม่
                    setTimeout(() => {
                        contactTitle.style.opacity = '';
                        contactTitle.style.transform = '';
                        contactTitle.classList.add('visible');
                        
                        setTimeout(() => {
                            subtitleLeft.style.opacity = '';
                            subtitleLeft.style.transform = '';
                            subtitleRight.style.opacity = '';
                            subtitleRight.style.transform = '';
                            subtitleLeft.classList.add('visible');
                            subtitleRight.classList.add('visible');
                        }, 300);
                    }, 1000); // เพิ่ม delay ให้เพียงพอสำหรับการเลื่อน
                }
            }
        });
    });

    // Scroll to top button
    const scrollTopButton = document.querySelector('.scroll-top');
    
    if (scrollTopButton) {
        scrollTopButton.addEventListener('click', function() {
            const homeSection = document.querySelector('#home');
            if (homeSection) {
                // ใช้ scrollIntoView แบบ smooth
                homeSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });

                // รีเซ็ต home section animations
                setTimeout(() => {
                    // รีเซ็ต slider
                    imageIndex = 0;
                    updateSlider();
                    animatePrice();
                }, 1000); // รอให้การเลื่อนเสร็จสิ้นก่อนเริ่ม animations
            }
        });
    }

    // ฟังก์ชันสำหรับรีเซ็ต service title animation
    function resetServiceTitleAnimation() {
        const sectionTitle = document.querySelector('.service-section .section-title');
        if (sectionTitle) {
            // รีเซ็ต style โดยตรง
            sectionTitle.style.opacity = '0';
            sectionTitle.style.transform = 'translateY(-50px)';
            
            // บังคับให้ browser รีเฟรช DOM
            void sectionTitle.offsetWidth;
            
            // ลบ class visible
            sectionTitle.classList.remove('visible');
            
            // เริ่ม animation ใหม่
            setTimeout(() => {
                sectionTitle.style.opacity = '';
                sectionTitle.style.transform = '';
                sectionTitle.classList.add('visible');
            }, 100);
        }
    }

    // เพิ่ม event listener สำหรับการรีเฟรชหน้า
    window.onload = function() {
        // บังคับให้เลื่อนไปที่จุดเริ่มต้นของหน้า
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto' // ใช้ 'auto' แทน 'smooth' เพื่อให้กลับไปทันที
        });

        // รีเซ็ต home section
        imageIndex = 0;
        updateSlider();
        animatePrice();
        
        // รีเซ็ต service title animation
        resetServiceTitleAnimation();
    };

    // จัดการการคลิก nav links
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

                if (targetId === '#home') {
                    setTimeout(() => {
                        imageIndex = 0;
                        updateSlider();
                        animatePrice();
                    }, 1000);
                } else if (targetId === '#detail') {
                    setTimeout(() => {
                        animateDetailPrice();
                        const firstColorItem = document.querySelector('.color-item');
                        if (firstColorItem) {
                            firstColorItem.click();
                        }
                    }, 1000);
                } else if (targetId === '#overview') {
                    setTimeout(() => {
                        rotationDegree = 0;
                        currentColorIndex = 0;
                        rotatingHeadphone.src = `https://www.yudiz.com/codepen/headphone-slider/${colors[currentColorIndex]}.png`;
                        overviewSection.style.background = backgroundGradients[currentColorIndex];
                    }, 1000);
                } else if (targetId === '#services') {
                    setTimeout(() => {
                        resetServiceTitleAnimation();
                    }, 1000);
                } else if (targetId === '#contact') {
                    const contactTitle = document.querySelector('.contact-title');
                    const subtitleLeft = document.querySelector('.subtitle-left');
                    const subtitleRight = document.querySelector('.subtitle-right');
                    
                    contactTitle.style.opacity = '0';
                    contactTitle.style.transform = 'translateY(-50px)';
                    subtitleLeft.style.opacity = '0';
                    subtitleLeft.style.transform = 'translateX(-50px)';
                    subtitleRight.style.opacity = '0';
                    subtitleRight.style.transform = 'translateX(50px)';
                    
                    setTimeout(() => {
                        contactTitle.classList.add('visible');
                        setTimeout(() => {
                            subtitleLeft.classList.add('visible');
                            subtitleRight.classList.add('visible');
                        }, 300);
                    }, 1000);
                }
            }
        });
    });

    // ... rest of your code ...
});

// เพิ่ม JavaScript สำหรับจัดการ quantity selector
document.addEventListener('DOMContentLoaded', function() {
    const quantityModal = document.getElementById('quantityModal');
    const quantityInput = document.querySelector('.quantity-input');
    const minusBtn = document.querySelector('.minus');
    const plusBtn = document.querySelector('.plus');
    const confirmBtn = document.querySelector('.confirm-btn');
    const cancelBtn = document.querySelector('.cancel-btn');
    const buyNowBtn = document.querySelector('.buy-now');
    const addToCartBtn = document.querySelector('.add-to-cart');

    function showQuantityModal() {
        quantityModal.style.display = 'flex';
        quantityInput.value = '1';
    }

    function hideQuantityModal() {
        quantityModal.style.display = 'none';
    }

    // Event listeners for buy now and add to cart buttons
    buyNowBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showQuantityModal();
    });

    addToCartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showQuantityModal();
    });

    // Quantity adjustment
    minusBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });

    plusBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        if (value < 99) {
            quantityInput.value = value + 1;
        }
    });

    // Input validation
    quantityInput.addEventListener('input', function() {
        let value = parseInt(this.value);
        if (isNaN(value) || value < 1) {
            this.value = 1;
        } else if (value > 99) {
            this.value = 99;
        }
    });

    // Modal buttons
    confirmBtn.addEventListener('click', function() {
        const quantity = parseInt(quantityInput.value);
        // ทำอะไรกับจำนวนสินค้าที่เลือก
        console.log('Selected quantity:', quantity);
        hideQuantityModal();
    });

    cancelBtn.addEventListener('click', hideQuantityModal);

    // Close modal when clicking outside
    quantityModal.addEventListener('click', function(e) {
        if (e.target === quantityModal) {
            hideQuantityModal();
        }
    });
});

// ... rest of your existing code ...