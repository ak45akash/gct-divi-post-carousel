# Divi Post Carousel Module

A custom Divi module that displays a carousel of blog posts with category filtering.

## Features

- Display posts in a carousel format with a featured section
- Category/Service type filtering
- Fully responsive (3 posts on desktop, 2 on tablet, 1 on mobile)
- Customizable settings via Divi Builder interface
- Interactive carousel with dot navigation
- Featured content section that updates when a post is selected

## Installation

1. Download or clone this repository
2. Upload the entire folder to your WordPress site's `/wp-content/plugins/` directory
3. Activate the plugin through the 'Plugins' menu in WordPress

## Usage

### Adding the Module to a Page

1. Edit a page with Divi Builder
2. Click the "+" button to add a new module
3. Search for "Post Carousel" and select it
4. Configure the module settings

### Module Settings

#### Content Tab

- **Post Type**: Select the post type to display (default: Posts)
- **Service/Category Type**: Select the category to display
- **Posts Number**: Number of posts to display in the carousel
- **Show Title**: Enable/disable post titles
- **Show Excerpt**: Enable/disable post excerpts
- **Show Meta**: Enable/disable post meta (category and date)
- **Show Featured Image**: Enable/disable featured images
- **Excerpt Length**: Number of characters to display in excerpts

#### Advanced Tab

- **Carousel Settings**:
  - **Autoplay**: Enable/disable automatic slide transition
  - **Autoplay Speed**: Time between transitions (in milliseconds)
  - **Loop**: Enable/disable infinite loop mode

## Preview

The plugin includes a `preview.html` file that demonstrates the module's output using dummy data. You can open this file in a browser to see how the module will look without installing it in WordPress.

## Customization

### CSS

To customize the appearance of the carousel, you can add custom CSS to your Divi theme options or use the custom CSS option in the module settings.

### Template Customization

If you need to modify the HTML output of the module:

1. Make a copy of the `render()` method in `includes/PostCarouselModule.php`
2. Create a child theme if you don't already have one
3. Create a file in your child theme to override the module's output

## Browser Compatibility

The module is compatible with all modern browsers:

- Chrome
- Firefox
- Safari
- Edge

## Requirements

- WordPress 5.0 or higher
- Divi Theme 4.0 or higher
- PHP 7.0 or higher

## Troubleshooting

If the carousel doesn't appear or work properly:

1. Make sure jQuery and Swiper are properly loaded
2. Check browser console for any JavaScript errors
3. Verify that your posts have the required content (featured images, categories, etc.)

## License

This plugin is licensed under the GPL v2 or later.

## Credits

- Swiper.js - https://swiperjs.com/
- jQuery - https://jquery.com/ 