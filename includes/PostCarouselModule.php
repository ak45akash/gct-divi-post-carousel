<?php
/**
 * Post Carousel Module for Divi
 *
 * @package DiviPostCarousel
 */

class PostCarouselModule extends ET_Builder_Module {
    /**
     * Module slug
     *
     * @var string
     */
    public $slug = 'et_pb_post_carousel';

    /**
     * VB support
     *
     * @var string
     */
    public $vb_support = 'on';

    /**
     * Module init
     */
    public function init() {
        $this->name = esc_html__('Post Carousel', 'divi-post-carousel');
        $this->icon = 'l';
        $this->main_css_element = '%%order_class%%.et_pb_post_carousel';
        
        $this->settings_modal_toggles = array(
            'general' => array(
                'toggles' => array(
                    'main_content' => esc_html__('Content', 'divi-post-carousel'),
                    'elements' => esc_html__('Elements', 'divi-post-carousel'),
                ),
            ),
            'advanced' => array(
                'toggles' => array(
                    'layout' => esc_html__('Layout', 'divi-post-carousel'),
                    'carousel' => esc_html__('Carousel Settings', 'divi-post-carousel'),
                    'featured_image' => esc_html__('Featured Image', 'divi-post-carousel'),
                    'text' => array(
                        'title' => esc_html__('Text', 'divi-post-carousel'),
                        'priority' => 49,
                    ),
                ),
            ),
        );
    }

    /**
     * Get the module fields
     *
     * @return array
     */
    public function get_fields() {
        return array(
            'post_type' => array(
                'label' => esc_html__('Post Type', 'divi-post-carousel'),
                'type' => 'select',
                'option_category' => 'configuration',
                'options' => $this->get_post_types(),
                'default' => 'post',
                'description' => esc_html__('Select the post type to display in the carousel.', 'divi-post-carousel'),
                'toggle_slug' => 'main_content',
            ),
            'heading' => array(
                'label' => esc_html__('Heading', 'divi-post-carousel'),
                'type' => 'text',
                'option_category' => 'basic_option',
                'description' => esc_html__('Enter a heading to display above the carousel.', 'divi-post-carousel'),
                'toggle_slug' => 'main_content',
            ),
            'category' => array(
                'label' => esc_html__('Service/Category Type', 'divi-post-carousel'),
                'type' => 'select',
                'option_category' => 'configuration',
                'options' => $this->get_categories(),
                'description' => esc_html__('Select the category/service type to display.', 'divi-post-carousel'),
                'toggle_slug' => 'main_content',
                'show_if' => array(
                    'post_type' => 'post',
                ),
            ),
            'posts_number' => array(
                'label' => esc_html__('Posts Number', 'divi-post-carousel'),
                'type' => 'text',
                'option_category' => 'configuration',
                'description' => esc_html__('How many posts would you like to display in the carousel?', 'divi-post-carousel'),
                'toggle_slug' => 'main_content',
                'default' => 9,
            ),
            'show_title' => array(
                'label' => esc_html__('Show Title', 'divi-post-carousel'),
                'type' => 'yes_no_button',
                'option_category' => 'configuration',
                'options' => array(
                    'on' => esc_html__('Yes', 'divi-post-carousel'),
                    'off' => esc_html__('No', 'divi-post-carousel'),
                ),
                'default' => 'on',
                'toggle_slug' => 'elements',
            ),
            'show_excerpt' => array(
                'label' => esc_html__('Show Excerpt', 'divi-post-carousel'),
                'type' => 'yes_no_button',
                'option_category' => 'configuration',
                'options' => array(
                    'on' => esc_html__('Yes', 'divi-post-carousel'),
                    'off' => esc_html__('No', 'divi-post-carousel'),
                ),
                'default' => 'on',
                'toggle_slug' => 'elements',
            ),
            'show_image' => array(
                'label' => esc_html__('Show Featured Image', 'divi-post-carousel'),
                'type' => 'yes_no_button',
                'option_category' => 'configuration',
                'options' => array(
                    'on' => esc_html__('Yes', 'divi-post-carousel'),
                    'off' => esc_html__('No', 'divi-post-carousel'),
                ),
                'default' => 'on',
                'toggle_slug' => 'elements',
            ),
            'show_button' => array(
                'label' => esc_html__('Show Learn More Button', 'divi-post-carousel'),
                'type' => 'yes_no_button',
                'option_category' => 'configuration',
                'options' => array(
                    'on' => esc_html__('Yes', 'divi-post-carousel'),
                    'off' => esc_html__('No', 'divi-post-carousel'),
                ),
                'default' => 'on',
                'toggle_slug' => 'elements',
            ),
            'button_text' => array(
                'label' => esc_html__('Button Text', 'divi-post-carousel'),
                'type' => 'text',
                'option_category' => 'configuration',
                'description' => esc_html__('Text to display on the button.', 'divi-post-carousel'),
                'default' => 'Learn More',
                'toggle_slug' => 'elements',
                'show_if' => array(
                    'show_button' => 'on',
                ),
            ),
            'excerpt_length' => array(
                'label' => esc_html__('Excerpt Length', 'divi-post-carousel'),
                'type' => 'text',
                'option_category' => 'configuration',
                'description' => esc_html__('How many characters of the excerpt would you like to display?', 'divi-post-carousel'),
                'toggle_slug' => 'elements',
                'default' => '150',
                'show_if' => array(
                    'show_excerpt' => 'on',
                ),
            ),
            'loop' => array(
                'label' => esc_html__('Loop', 'divi-post-carousel'),
                'type' => 'yes_no_button',
                'option_category' => 'configuration',
                'options' => array(
                    'on' => esc_html__('Yes', 'divi-post-carousel'),
                    'off' => esc_html__('No', 'divi-post-carousel'),
                ),
                'default' => 'on',
                'toggle_slug' => 'carousel',
                'tab_slug' => 'advanced',
            ),
        );
    }

    /**
     * Get post types
     *
     * @return array
     */
    private function get_post_types() {
        $post_types = array(
            'post' => esc_html__('Post', 'divi-post-carousel'),
        );

        // Get custom post types
        $custom_post_types = get_post_types(
            array(
                'public'   => true,
                '_builtin' => false,
            ),
            'objects'
        );

        foreach ($custom_post_types as $custom_post_type) {
            $post_types[$custom_post_type->name] = $custom_post_type->label;
        }

        return $post_types;
    }

    /**
     * Get categories
     *
     * @return array
     */
    private function get_categories() {
        $categories = array(
            'all' => esc_html__('All Categories', 'divi-post-carousel'),
        );

        $terms = get_terms(array(
            'taxonomy' => 'category',
            'hide_empty' => false,
        ));

        if (!empty($terms) && !is_wp_error($terms)) {
            foreach ($terms as $term) {
                $categories[$term->term_id] = $term->name;
            }
        }

        return $categories;
    }

    /**
     * Render the module
     *
     * @param array $attrs
     * @param string $content
     * @param string $render_slug
     * @return string
     */
    public function render($attrs, $content = null, $render_slug) {
        wp_enqueue_style('swiper-css');
        wp_enqueue_style('divi-post-carousel-css');
        wp_enqueue_script('swiper-js');
        wp_enqueue_script('divi-post-carousel-js');

        // Get module attributes
        $post_type = $this->props['post_type'];
        $category = isset($this->props['category']) ? $this->props['category'] : 'all';
        $posts_number = $this->props['posts_number'];
        $show_title = $this->props['show_title'];
        $show_excerpt = $this->props['show_excerpt'];
        $show_image = $this->props['show_image'];
        $show_button = $this->props['show_button'];
        $button_text = $this->props['button_text'];
        $excerpt_length = $this->props['excerpt_length'];
        $loop = $this->props['loop'];
        $heading = isset($this->props['heading']) ? $this->props['heading'] : '';

        // Query arguments
        $args = array(
            'post_type' => $post_type,
            'posts_per_page' => $posts_number,
            'post_status' => 'publish',
        );

        // Add category if selected
        if ('post' === $post_type && 'all' !== $category) {
            $args['tax_query'] = array(
                array(
                    'taxonomy' => 'category',
                    'field' => 'term_id',
                    'terms' => $category,
                ),
            );
        }

        // Run the query
        $query = new WP_Query($args);

        // Generate output
        $output = '';
        
        if ($query->have_posts()) {
            // Generate unique ID for this carousel
            $carousel_id = 'dpc_' . $this->render_count();
            
            // Set carousel data attributes for JavaScript
            $data_attrs = sprintf(
                'data-loop="%1$s" data-id="%2$s"',
                $loop === 'on' ? 'true' : 'false',
                esc_attr($carousel_id)
            );

            // Start container
            $output .= '<div class="dpc-container" id="' . esc_attr($carousel_id) . '">';
            
            // Add heading if it exists
            if (!empty($heading)) {
                $output .= '<h2 class="dpc-heading">' . esc_html($heading) . '</h2>';
            }
            
            // Carousel section
            $output .= '<div class="dpc-carousel-wrapper" ' . $data_attrs . '>';
            $output .= '<div class="swiper-container">';
            $output .= '<div class="swiper-wrapper">';
            
            // Loop through posts
            while ($query->have_posts()) {
                $query->the_post();
                $post_id = get_the_ID();
                
                $output .= '<div class="swiper-slide dpc-slide" data-post-id="' . esc_attr($post_id) . '">';
                $output .= '<div class="dpc-card">';
                
                // Card Image
                if ('on' === $show_image && has_post_thumbnail()) {
                    $output .= '<div class="dpc-card-image">';
                    $output .= get_the_post_thumbnail($post_id, 'medium');
                    $output .= '</div>';
                }
                
                // Card Content
                $output .= '<div class="dpc-card-content">';
                
                // Title
                if ('on' === $show_title) {
                    $output .= '<h3 class="dpc-card-title">' . get_the_title() . '</h3>';
                }
                
                // Excerpt
                if ('on' === $show_excerpt) {
                    $excerpt = get_the_excerpt();
                    $excerpt = wp_trim_words($excerpt, $excerpt_length / 2, '...');
                    $output .= '<div class="dpc-card-excerpt">' . $excerpt . '</div>';
                }
                
                // Learn More Button
                if ('on' === $show_button) {
                    $output .= '<a href="' . get_permalink() . '" class="dpc-card-button">' . esc_html($button_text) . '</a>';
                }
                
                $output .= '</div>'; // .dpc-card-content
                $output .= '</div>'; // .dpc-card
                $output .= '</div>'; // .swiper-slide
            }
            
            $output .= '</div>'; // .swiper-wrapper
            
            // Add navigation arrows
            $output .= '<div class="swiper-button-next"></div>';
            $output .= '<div class="swiper-button-prev"></div>';
            
            // Add pagination (dots)
            $output .= '<div class="swiper-pagination"></div>';
            
            $output .= '</div>'; // .swiper-container
            $output .= '</div>'; // .dpc-carousel-wrapper
            $output .= '</div>'; // .dpc-container

            // Store post data for JavaScript
            $posts_data = array();
            $query->rewind_posts();
            
            while ($query->have_posts()) {
                $query->the_post();
                $post_id = get_the_ID();
                
                $post_data = array(
                    'id' => $post_id,
                    'title' => get_the_title(),
                    'excerpt' => wp_trim_words(get_the_excerpt(), $excerpt_length, '...'),
                    'link' => get_permalink(),
                );
                
                if (has_post_thumbnail()) {
                    $post_data['image'] = get_the_post_thumbnail_url($post_id, 'large');
                }
                
                $post_categories = get_the_category();
                if (!empty($post_categories)) {
                    $post_data['category'] = $post_categories[0]->name;
                }
                
                $posts_data[] = $post_data;
            }
            
            // Add inline script with post data
            wp_localize_script('divi-post-carousel-js', 'dpc_data_' . $carousel_id, array(
                'posts' => $posts_data,
            ));
            
            // Reset post data
            wp_reset_postdata();
        } else {
            $output = '<p>' . esc_html__('No posts found.', 'divi-post-carousel') . '</p>';
        }
        
        return $output;
    }
}

// Register the module
new PostCarouselModule(); 