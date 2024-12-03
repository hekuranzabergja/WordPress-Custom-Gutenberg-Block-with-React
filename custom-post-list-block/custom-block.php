<?php
/**
 * Plugin Name: Custom Post List Block
 * Description: A Gutenberg block that displays posts filtered by category.
 * Version: 1.0.0
 * Author: Hekuran Zabërgja
 */

 function custom_post_list_block_register() {
    wp_register_script(
        'custom-post-list-block',
        plugin_dir_url(__FILE__) . 'build/index.js',
        [ 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-data' ],
        filemtime(plugin_dir_path(__FILE__) . 'build/index.js' )
    );

    wp_register_style(
        'custom-post-list-block-editor',
        plugin_dir_url(__FILE__) . 'editor.css',
        [],
        filemtime(plugin_dir_path(__FILE__) . 'editor.css' )
    );

    wp_register_style(
        'custom-post-list-block-style',
        plugin_dir_url(__FILE__) . 'style.css',
        [],
        filemtime(plugin_dir_path(__FILE__) . 'style.css' )
    );

    // Register block
    register_block_type('custom/post-list', [
        'editor_script' => 'custom-post-list-block',
        'editor_style' => 'custom-post-list-block-editor',
        'style' => 'custom-post-list-block-style',
        'render_callback' => 'custom_post_list_render_callback',
    ]);
}
add_action('init', 'custom_post_list_block_register');

function custom_post_list_render_callback($attributes) {
    $category = $attributes['category'] ?? '';
    $heading = $attributes['heading'] ?? '';
    $category_name = $attributes['categoryName'] ?? '';

    $category = empty($category) ? '0' : $category;

    error_log('Category ID: ' . $category);

    $args = [
        'post_type' => 'post',
        'cat' => $category,  // Using the category value here
        'posts_per_page' => 5,
    ];
    $query = new WP_Query($args);

    ob_start();
    ?>
    <div class="custom-post-list-block">
        <?php if ($heading): ?>
            <h2><?php echo esc_html($heading); ?></h2>
        <?php endif; ?>
        <?php if ($category_name): ?>
            <p>Posts for category: <?php echo esc_html($category_name); ?></p>
        <?php endif; ?>
        <ul>
            <?php if ($query->have_posts()): ?>
                <?php while ($query->have_posts()): $query->the_post(); ?>
                    <li>
                        <h3><?php the_title(); ?></h3>
                        <div><?php the_excerpt(); ?></div>
                        <a href="<?php the_permalink(); ?>" target="_blank" rel="noopener noreferrer">Read More</a>
                    </li>
                <?php endwhile; ?>
                <?php wp_reset_postdata(); ?>
            <?php else: ?>
                <li>No posts available.</li>
            <?php endif; ?>
        </ul>
    </div>
    <?php
    return ob_get_clean();
}


