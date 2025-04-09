/**
 * Divi Post Carousel Module JavaScript
 */
(function($) {
    'use strict';

    // Initialize all carousels on the page
    function initPostCarousels() {
        // Handle broken images throughout the carousel
        $('.dpc-card-image img').on('error', function() {
            const $this = $(this);
            const $parent = $this.parent();
            $parent.addClass('dpc-broken-image');
            $this.attr('src', 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%3Crect%20fill%3D%22%23f8f8f8%22%20width%3D%22100%25%22%20height%3D%22100%25%22%2F%3E%3Ctext%20fill%3D%22%23999%22%20font-family%3D%22sans-serif%22%20font-size%3D%2214px%22%20text-anchor%3D%22middle%22%20x%3D%2250%25%22%20y%3D%2250%25%22%3EImage%20not%20available%3C%2Ftext%3E%3C%2Fsvg%3E');
        });

        $('.dpc-carousel-wrapper').each(function() {
            const $carouselWrapper = $(this);
            const $container = $carouselWrapper.closest('.dpc-container');
            
            // Get data attributes
            const loop = $carouselWrapper.data('loop') === true;
            const carouselId = $carouselWrapper.data('id');
            
            // Get post data from localized script
            const postsData = window['dpc_data_' + carouselId]?.posts || [];
            
            // Initialize Swiper
            const swiper = new Swiper($carouselWrapper.find('.swiper-container')[0], {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: loop,
                autoplay: false, // Disable autoplay
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