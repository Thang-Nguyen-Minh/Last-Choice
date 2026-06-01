document.addEventListener('DOMContentLoaded', () => {

    // --- 1. NAVBAR: thêm class .scrolled khi cuộn ---
    const navbar = document.getElementById('mainNav');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // --- 2. SCROLL TO TOP BUTTON ---
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scrollTop';
    scrollTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    scrollTopBtn.setAttribute('aria-label', 'Về đầu trang');
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('show', window.scrollY > 400);
    });
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- 3. CONTACT FORM VALIDATION & SUBMIT ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();

            contactForm.classList.add('was-validated');

            if (contactForm.checkValidity()) {
                const btn = document.getElementById('submitBtn');
                const successAlert = document.getElementById('formSuccess');

                // Simulate loading state
                btn.disabled = true;
                btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Đang gửi...';

                setTimeout(() => {
                    // Reset form
                    contactForm.reset();
                    contactForm.classList.remove('was-validated');

                    // Show success message
                    if (successAlert) {
                        successAlert.classList.remove('d-none');
                        successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }

                    // Restore button
                    btn.disabled = false;
                    btn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Gửi Tin Nhắn';

                    // Auto-hide alert after 6 seconds
                    setTimeout(() => successAlert?.classList.add('d-none'), 6000);
                }, 1500);
            }
        });
    }

    // --- 4. SMOOTH SCROLL cho anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- 5. ANIMATION: Fade-in khi scroll vào viewport ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card, .class-card, .trainer-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

});