document.addEventListener('DOMContentLoaded', () => {

    /* =====================
       Loader
    ===================== */
    const loader = document.querySelector('.loader');

    window.addEventListener('load', () => {
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 600);
        }
    });

    /* =====================
       Navbar Scroll Effect
    ===================== */
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scrollTop');

    const handleScroll = () => {
        const scrollY = window.scrollY;

        navbar?.classList.toggle('scrolled', scrollY > 100);
        scrollTopBtn?.classList.toggle('show', scrollY > 500);

        setActiveSection();
    };

    window.addEventListener('scroll', handleScroll);

    /* =====================
       Mobile Menu
    ===================== */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    /* =====================
       Active Section Highlight
    ===================== */
    const sections = document.querySelectorAll('section[id]');

    function setActiveSection() {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle(
                'active',
                link.getAttribute('href') === `#${currentSection}`
            );
        });

    }

    /* =====================
       Reveal Animations (IntersectionObserver)
    ===================== */
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    /* =====================
       Skills Progress Animation
    ===================== */
    const progressBars = document.querySelectorAll('.progress');

    const progressObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = bar.dataset.width || '0%';
                progressObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => progressObserver.observe(bar));

    /* =====================
       Scroll To Top
    ===================== */
    scrollTopBtn?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* =====================
       Smooth Anchor Scroll
    ===================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});

 /* =====================
       Contact Form (UI Only)
    ===================== */
    document.addEventListener("DOMContentLoaded", () => {
        const form = document.querySelector("#contact-form");
        if (!form) return;

        const button = form.querySelector(".contact-btn");
        const btnText = button.querySelector(".btn-text");

        form.addEventListener("submit", async function (e) {
            e.preventDefault(); // ⛔ يمنع redirect 100%

            // ✅ HTML5 validation
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            button.disabled = true;
            btnText.textContent = "Sending...";

            try {
                const response = await fetch(form.action, {
                    method: "POST",
                    body: new FormData(form),
                    headers: {
                        "Accept": "application/json"
                    }
                });

                if (response.ok) {
                    btnText.textContent = "Message Sent ✔";
                    form.reset(); // ✅ يمسح الفورم
                } else {
                    btnText.textContent = "Failed ❌";
                }

            } catch (error) {
                btnText.textContent = "Network Error ⚠";
            }

            setTimeout(() => {
                button.disabled = false;
                btnText.textContent = "Send Message";
            }, 2500);
        });
    });

document.addEventListener('DOMContentLoaded', () => {
    const aboutDesc = document.querySelector('.about-desc');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(aboutDesc);
});

/* =====================
   End Of File
===================== */
