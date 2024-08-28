<?php

namespace App\Helpers;

class Init
{
    public function __construct()
    {
        add_filter('body_class', [self::class, 'add_class_for_body']);

        add_shortcode('reviews', [self::class, 'render_reviews']);
    }

    public static function add_class_for_body($classes)
    {
        $classes[] = 'page';

        return $classes;
    }

    public static function render_reviews()
    {
        static $already_run = false;
        ob_start();

        if ($already_run !== true) {
            get_template_part('templates/blocks/reviews');
        }

        $content = ob_get_clean();
        $already_run = true;

        return $content;
    }
}
