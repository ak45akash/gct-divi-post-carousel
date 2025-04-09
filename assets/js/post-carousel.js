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
                    // Mobile
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    // Tablet
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    // Desktop
                    981: {
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
                    }
                }
            });
            
            // Mark active slide with a class
            function markActiveSlide(swiper) {
                const $slides = $carouselWrapper.find('.dpc-slide');
                $slides.removeClass('dpc-slide-active');
                
                // If loop mode is enabled, we need to find the real slides (not clones)
                const activeIndex = swiper.realIndex !== undefined ? swiper.realIndex : swiper.activeIndex;
                
                $slides.eq(activeIndex).addClass('dpc-slide-active');
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
                        <a href="${postData.link}" class="dpc-featured-link">Read More &rarr;</a>
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
                const slideIndex = $slide.index();
                
                swiper.slideTo(slideIndex);
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
    
})(jQuery); 