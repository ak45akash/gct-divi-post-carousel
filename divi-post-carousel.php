<?php
/**
 * Plugin Name: Divi Post Carousel Module
 * Plugin URI: 
 * Description: A custom Divi module that displays a carousel of blog posts with category filtering
 * Version: 1.0.0
 * Author: Akash
 * Author URI: iakash.dev
 * License: GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: divi-post-carousel
 * Domain Path: /languages
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Main Divi Post Carousel Class
 */
class DiviPostCarousel {
    /**
     * Instance of the class
     *
     * @var DiviPostCarousel
     */
    private static $instance;

    /**
     * Get the instance of the class
     *
     * @return DiviPostCarousel
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Constructor
     */
    public function __construct() {
        $this->define_constants();
        $this->includes();
        $this->init_hooks();
    }

    /**
     * Define plugin constants
     */
    private function define_constants() {
        define('DIVI_POST_CAROUSEL_VERSION', '1.0.0');
        define('DIVI_POST_CAROUSEL_FILE', __FILE__);
        define('DIVI_POST_CAROUSEL_PATH', plugin_dir_path(__FILE__));
        define('DIVI_POST_CAROUSEL_URL', plugin_dir_url(__FILE__));
    }

    /**
     * Include required files
     */
    private function includes() {
        // Load the module class when Divi Builder is ready
        add_action('et_builder_ready', array($this, 'load_module'));
    }

    /**
     * Initialize hooks
     */
    private function init_hooks() {
        // Register scripts and styles
        add_action('wp_enqueue_scripts', array($this, 'register_scripts'));
    }

    /**
     * Load the module class
     */
    public function load_module() {
        if (class_exists('ET_Builder_Module')) {
            require_once DIVI_POST_CAROUSEL_PATH . 'includes/PostCarouselModule.php';
            new PostCarouselModule();
        }
    }

    /**
     * Register scripts and styles
     */
    public function register_scripts() {
        // Generate cache busting version string
        $cache_bust = DIVI_POST_CAROUSEL_VERSION . '.' . time();
        
        // Swiper CSS
        wp_register_style(
            'swiper-css',
            'https://unpkg.com/swiper@8/swiper-bundle.min.css',
            array(),
            '8.0.0'
        );

        // Swiper JS
        wp_register_script(
            'swiper-js',
            'https://unpkg.com/swiper@8/swiper-bundle.min.js',
            array(),
            '8.0.0',
            true
        );

        // Module CSS
        wp_register_style(
            'divi-post-carousel-css',
            DIVI_POST_CAROUSEL_URL . 'assets/css/post-carousel.css',
            array('swiper-css'),
            $cache_bust
        );

        // Module JS
        wp_register_script(
            'divi-post-carousel-js',
            DIVI_POST_CAROUSEL_URL . 'assets/js/post-carousel.js',
            array('jquery', 'swiper-js'),
            $cache_bust,
            true
        );
    }
}

// Initialize the plugin
DiviPostCarousel::get_instance(); 