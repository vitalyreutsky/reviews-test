<?php

namespace App\CustomPostType;

class RegisterCustomPostType
{
    public function __construct()
    {
        add_action('init', [self::class, 'registerReviewsType']);
    }

    public static function registerReviewsType(): void
    {
        register_post_type('reviews', array(
            'labels' => array(
                'name' => 'Reviews',
                'singular_name' => 'Review',
                'add_new' => 'Add new',
                'add_new_item' => 'Add new Review',
                'edit_item' => 'Edit Review',
                'new_item' => 'New Review',
                'view_item' => 'View Review',
                'search_items' => 'Search Review',
                'not_found' => 'Review not found',
                'not_found_in_trash' => 'Not found Review in trash',
                'parent_item_colon' => '',
                'menu_name' => 'Reviews'
            ),
            'public' => false,
            'publicly_queryable' => false,
            'show_ui' => true,
            'show_in_menu' => true,
            'query_var' => true,
            'rewrite' => true,
            'capability_type' => 'post',
            'has_archive' => false,
            'hierarchical' => false,
            'menu_position' => null,
            'show_in_rest' => false,
            'menu_icon' => 'data:image/svg+xml;base64,' . base64_encode('<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15 14.25C13.3431 14.25 12 15.5931 12 17.25C12 18.9069 13.3431 20.25 15 20.25C16.6569 20.25 18 18.9069 18 17.25C18 15.5931 16.6569 14.25 15 14.25ZM10.5 17.25C10.5 14.7647 12.5147 12.75 15 12.75C17.4853 12.75 19.5 14.7647 19.5 17.25C19.5 19.7353 17.4853 21.75 15 21.75C12.5147 21.75 10.5 19.7353 10.5 17.25Z" fill="#080341"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.75 8.25H8.25V6.75H15.75V8.25Z" fill="#080341"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.75 11.25H8.25V9.75H15.75V11.25Z" fill="#080341"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.25 3H16.0607L18.75 5.68934V12H17.25V6.31066L15.4393 4.5H6.75V19.5H9.75V21H5.25V3Z" fill="#080341"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.75 14.25H8.25V12.75H9.75V14.25Z" fill="#080341"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5791 16.0854L14.9207 15.4146L15.4634 16.5H16.4999V18H14.5364L13.5791 16.0854Z" fill="#080341"/>
            </svg>'),
            'supports' => array('title', 'thumbnail', 'editor', 'author')
        ));
    }
}
