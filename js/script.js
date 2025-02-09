document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const nav = document.querySelector('.nav');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.close-btn');
    let lastScroll = 0;

    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMobileMenu);
    closeBtn.addEventListener('click', toggleMobileMenu);

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.classList.add('hidden');
        } else {
            nav.classList.remove('hidden');
        }
        lastScroll = currentScroll;
    });

    // Close mobile menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
            toggleMobileMenu();
        }
    });

    // Prevent scrolling when mobile menu is open
    mobileMenu.addEventListener('wheel', (e) => {
        if (mobileMenu.classList.contains('active')) {
            e.preventDefault();
        }
    });

    // Add smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                lenis.scrollTo(targetElement);
                if (mobileMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const scrollWrapper = document.getElementById('scroll-wrapper');
    const scrollLeft = document.getElementById('scroll-left');
    const scrollRight = document.getElementById('scroll-right');
    
    // Calculate scroll amount based on container width
    const getScrollAmount = () => {
      return scrollWrapper.clientWidth * 0.8;
    };

    // Scroll left button click handler
    scrollLeft.addEventListener('click', () => {
      scrollWrapper.scrollBy({
        left: -getScrollAmount(),
        behavior: 'smooth'
      });
    });

    // Scroll right button click handler
    scrollRight.addEventListener('click', () => {
      scrollWrapper.scrollBy({
        left: getScrollAmount(),
        behavior: 'smooth'
      });
    });

    // Check scroll position to show/hide buttons
    const updateButtonVisibility = () => {
      const maxScroll = scrollWrapper.scrollWidth - scrollWrapper.clientWidth;
      scrollLeft.style.opacity = scrollWrapper.scrollLeft <= 0 ? '0' : '1';
      scrollRight.style.opacity = scrollWrapper.scrollLeft >= maxScroll ? '0' : '1';
    };

    // Add scroll event listener
    scrollWrapper.addEventListener('scroll', updateButtonVisibility);
    
    // Initial button visibility check
    updateButtonVisibility();

    // Animate items on load
    const items = document.querySelectorAll('.item');
    items.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
    });
  });

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Landing animations
    document.addEventListener('DOMContentLoaded', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1 } });

        tl.to('.banner-left', {
            opacity: 1,
            y: 0,
            duration: 1
        })
        .to('.banner-right', {
            opacity: 1,
            y: 0,
            duration: 1
        }, '-=0.5');

        // Button hover animation
        const button = document.querySelector('.start-button');
        
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3
            });
        });
    });

    gsap.utils.toArray('.course-card').forEach((card, i) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            }
        });
    });


     // Function to open the modal with topics and details
     function openModal(moduleCard) {
        const modal = document.getElementById('topics-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalDuration = document.getElementById('modal-duration');
        const modalTopicsList = document.getElementById('modal-topics-list');
  
        // Get data attributes from the module card
        const title = moduleCard.getAttribute('data-title');
        const duration = moduleCard.getAttribute('data-duration');
        const topics = moduleCard.getAttribute('data-topics').split(',');
  
        // Update modal content
        modalTitle.textContent = title;
        modalDuration.textContent = duration;
        modalTopicsList.innerHTML = topics.map(topic => `<li>${topic.trim()}</li>`).join('');
  
        // Display modal
        modal.classList.add('active');
      }
  
      // Function to close the modal
      function closeModal() {
        const modal = document.getElementById('topics-modal');
        modal.classList.remove('active');
      }
  
      // Add click events for module cards
      const moduleCards = document.querySelectorAll('.curriculum-module-card');
      moduleCards.forEach(card => {
        card.addEventListener('click', () => {
          moduleCards.forEach(c => c.classList.remove('active'));
          card.classList.add('active');
          openModal(card);
        });
      });
  
      // Close modal on clicking the close button
      document.getElementById('modal-close-btn').addEventListener('click', closeModal);
  
      // Close modal when clicking outside the modal content
      window.addEventListener('click', (event) => {
        const modal = document.getElementById('topics-modal');
        if (event.target === modal) {
          closeModal();
        }
      });
  
      // Tab Switching Functionality
      const ctabs = document.querySelectorAll('.curriculum-tab');
      ctabs.forEach(ctab => {
        ctab.addEventListener('click', () => {
          ctabs.forEach(t => t.classList.remove('active'));
          ctab.classList.add('active');
          const level = ctab.getAttribute('data-level');
  
          // Hide all modules
          moduleCards.forEach(card => card.style.display = 'none');
  
          // Display modules for the selected level
          const levelModules = document.querySelectorAll(`.curriculum-module-card[data-level="${level}"]`);
          levelModules.forEach(card => card.style.display = 'block');
        });
      });
  
      // Initialize display with beginner modules
      document.querySelector('.curriculum-tab[data-level="beginner"]').click();

      document.querySelector('.button').addEventListener('click', () => {
        console.log('Navigate to all instructors page');
    });

    function loadImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.complete) {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
            }
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        });
    }

    window.addEventListener('load', loadImages);

        // Toggle tabs visibility on mobile
        function toggleTabs() {
            const tabs = document.querySelector('.tabs');
            tabs.classList.toggle('active');
        }

        // Filter courses based on category
        const ftabs = document.querySelectorAll('.tab');
        const fcourseCards = document.querySelectorAll('.course-card');

        ftabs.forEach(ftab => {
            ftab.addEventListener('click', () => {
                // Remove active class from all tabs
                ftabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                ftab.classList.add('active');

                // Get the selected category
                const category = ftab.getAttribute('data-category');

                // Filter and display courses
                fcourseCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'block'; /* Use flex to maintain layout */
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Generate rating stars dynamically
        const fratings = document.querySelectorAll('.rating');
        fratings.forEach(frating => {
            const card = frating.closest('.course-card');
            const ratingValue = parseFloat(card.getAttribute('data-rating'));
            let stars = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= ratingValue) {
                    stars += '★';
                } else {
                    stars += '☆';
                }
            }
            frating.innerHTML = stars;
        });