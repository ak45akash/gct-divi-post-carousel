/**
 * Divi Post Carousel Module JavaScript
 */
(function($) {
    'use strict';

    // Initialize all carousels on the page
    function initPostCarousels() {
        $('.dpc-carousel-wrapper').each(function() {
            const $carouselWrapper = $(this);
            const $container = $carouselWrapper.closest('.dpc-container');
            const $featuredContent = $container.find('.dpc-featured-content');
            
            // Get data attributes
            const autoplay = $carouselWrapper.data('autoplay') === true;
            const autoplaySpeed = parseInt($carouselWrapper.data('autoplay-speed'), 10) || 5000;
            const loop = $carouselWrapper.data('loop') === true;
            const carouselId = $carouselWrapper.data('id');
            
            // Get post data from localized script
            const postsData = window['dpc_data_' + carouselId]?.posts || [];
            
            // Initialize Swiper
            const swiper = new Swiper($carouselWrapper.find('.swiper-container')[0], {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: loop,
                autoplay: autoplay ? {
                    delay: autoplaySpeed,
                    disableOnInteraction: false
                } : false,
                pagination: {
                    el: $carouselWrapper.find('.swiper-pagination')[0],
                    clickable: true
                },
                breakpoints: {
                    // Mobile (small)
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    // Mobile (medium)
                    480: {
                        slidesPerView: 1,
                        spaceBetween: 15
                    },
                    // Tablet (small)
                    668: {
                        slidesPerView: 2,
                        spaceBetween: 15
                    },
                    // Tablet (medium)
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    // Tablet (large) / Desktop (small)
                    981: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    // Desktop (medium)
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    }
                },
                on: {
                    init: function() {
                        markActiveSlide(this);
                    },
                    slideChange: function() {
                        markActiveSlide(this);
                        updateFeaturedContent(this);
                    },
                    resize: function() {
                        // Ensure proper layout on window resize
                        this.update();
                    }
                },
                keyboard: {
                    enabled: true,
                    onlyInViewport: true,
                },
                a11y: {
                    enabled: true,
                    prevSlideMessage: 'Previous slide',
                    nextSlideMessage: 'Next slide',
                    firstSlideMessage: 'This is the first slide',
                    lastSlideMessage: 'This is the last slide',
                    paginationBulletMessage: 'Go to slide {{index}}'
                },
                // Use free mode for smoother touch experience on mobile
                freeMode: {
                    enabled: window.innerWidth < 768,
                    sticky: true,
                    momentumRatio: 0.5
                },
                // Enable grabbing cursor for better UX
                grabCursor: true,
                // Add threshold to prevent accidental swipes
                threshold: 10
            });
            
            // Mark active slide with a class
            function markActiveSlide(swiper) {
                const $slides = $carouselWrapper.find('.dpc-slide');
                $slides.removeClass('dpc-slide-active');
                
                // If loop mode is enabled, we need to find the real slides (not clones)
                const activeIndex = swiper.realIndex !== undefined ? swiper.realIndex : swiper.activeIndex;
                
                // Find the real slide (not a clone in loop mode)
                const $realSlides = $slides.not('.swiper-slide-duplicate');
                $realSlides.eq(activeIndex).addClass('dpc-slide-active');
                
                // Also mark the clone if in loop mode
                if (loop) {
                    const $cloneSlides = $slides.filter('.swiper-slide-duplicate');
                    $cloneSlides.each(function() {
                        if ($(this).data('swiper-slide-index') === activeIndex) {
                            $(this).addClass('dpc-slide-active');
                        }
                    });
                }
            }
            
            // Update featured content when slide changes
            function updateFeaturedContent(swiper) {
                const activeIndex = swiper.realIndex !== undefined ? swiper.realIndex : swiper.activeIndex;
                const postData = postsData[activeIndex];
                
                if (!postData) return;
                
                // Create featured content
                let featuredImageHTML = '';
                if (postData.image) {
                    featuredImageHTML = `
                        <div class="dpc-featured-image">
                            <img src="${postData.image}" alt="${postData.title}">
                        </div>
                    `;
                }
                
                let categoryHTML = '';
                if (postData.category) {
                    categoryHTML = `<span class="dpc-featured-category">${postData.category}</span>`;
                }
                
                const featuredHTML = `
                    ${featuredImageHTML}
                    <div class="dpc-featured-text">
                        <div class="dpc-featured-meta">
                            ${categoryHTML}
                            <span class="dpc-featured-date">${postData.date}</span>
                        </div>
                        <h2 class="dpc-featured-title">${postData.title}</h2>
                        <div class="dpc-featured-excerpt">${postData.excerpt}</div>
                        <a href="${postData.link}" class="dpc-featured-link">Read More</a>
                    </div>
                `;
                
                // Animate the transition
                $featuredContent.fadeOut(200, function() {
                    $featuredContent.html(featuredHTML).fadeIn(200);
                });
            }
            
            // Handle click on carousel slides
            $carouselWrapper.on('click', '.dpc-slide', function() {
                const $slide = $(this);
                const slideIndex = $slide.attr('data-swiper-slide-index') || $slide.index();
                
                // If we're in loop mode, use realIndex to properly navigate
                if (loop) {
                    swiper.slideToLoop(parseInt(slideIndex, 10));
                } else {
                    swiper.slideTo(parseInt(slideIndex, 10));
                }
            });
            
            // Handle window resize
            $(window).on('resize', function() {
                // Delay to ensure DOM has settled
                setTimeout(function() {
                    swiper.update();
                }, 100);
            });
            
            // Handle orientation change specifically for mobile
            $(window).on('orientationchange', function() {
                // Delay update to ensure orientation has completed
                setTimeout(function() {
                    swiper.update();
                }, 300);
            });
        });
    }
    
    // Initialize when DOM is ready
    $(document).ready(function() {
        // Check if Swiper is loaded
        if (typeof Swiper !== 'undefined') {
            initPostCarousels();
        } else {
            // If Swiper is not loaded yet, wait for it
            const checkInterval = setInterval(function() {
                if (typeof Swiper !== 'undefined') {
                    clearInterval(checkInterval);
                    initPostCarousels();
                }
            }, 100);
            
            // Fallback in case Swiper never loads
            setTimeout(function() {
                clearInterval(checkInterval);
                if (typeof Swiper === 'undefined') {
                    console.error('Swiper library is not loaded. Post carousel cannot be initialized.');
                }
            }, 10000);
        }
    });
    
    // Re-init on Divi Builder changes
    $(window).on('et_builder_api_ready', function() {
        initPostCarousels();
    });
    
    // Re-init when Divi section becomes visible (for tabs/accordion)
    $(document).on('et_pb_section_visibility_change', function() {
        setTimeout(function() {
            initPostCarousels();
        }, 200);
    });
    
})(jQuery); 