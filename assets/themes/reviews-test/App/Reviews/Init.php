<?php

namespace App\Reviews;

class Init
{
   public function __construct()
   {
      add_action('wp_ajax_set_reviews', [self::class, 'set_reviews']);
      add_action('wp_ajax_nopriv_set_reviews', [self::class, 'set_reviews']);

      add_action('wp_ajax_sort_reviews', [self::class, 'sort_reviews']);
      add_action('wp_ajax_nopriv_sort_reviews', [self::class, 'sort_reviews']);
   }

   public static function set_reviews()
   {
      $data = json_decode(stripslashes($_POST['data']));

      if (
         !isset($data->name, $data->message, $data->review_post_id) ||
         empty($data->name) ||
         empty($data->message)
      ) {
         wp_send_json_error('Недостаточно данных или пустые поля', 400);
         return;
      }

      $data_name = sanitize_text_field($data->name);
      $data_message = sanitize_textarea_field($data->message);
      $review_post_id = intval($data->review_post_id);

      $post_data = array(
         "post_author"   => 1,
         "post_status"   => "publish",
         "post_type"     => "reviews",
         "post_title"    => $data_name,
         "post_content"  => $data_message,
      );

      $post_id = wp_insert_post($post_data);

      if (is_wp_error($post_id)) {
         wp_send_json_error('Ошибка при добавлении отзыва', 500);
         return;
      }

      add_post_meta($post_id, 'review_post_id', $review_post_id);

      ob_start();
      get_template_part('templates/cards/review-card', null, array('review_id' => $post_id));
      $result = ob_get_clean();

      $return = [
         'result' => $result,
         'data_name' => $data_name,
         'post_id' => $post_id,
         'moderation_text' => esc_html($data_name) . ' Ваш отзыв на модерации',
      ];

      wp_send_json($return);
   }

   public static function sort_reviews()
   {
      $date = esc_attr($_POST['date']);
      $post_id = isset($_POST['post_id']) ? intval($_POST['post_id']) : 0;

      $args = array(
         'post_type' => 'reviews',
         'post_status' => 'publish',
         "posts_per_page" => -1,
         'orderby' => 'date',
         'order'          => $date === 'old' ? 'ASC' : 'DESC',
         'meta_query' => [
            [
               'key' => 'review_post_id',
               'value' => $post_id,
            ]
         ]
      );

      $posts = get_posts($args);

      ob_start();

      foreach ($posts as $post) {
         if ($post) {
            get_template_part('templates/cards/review-card', null, array('review_id' => $post->ID));
         }
      }

      $posts = ob_get_clean();

      $return = ['result' => $posts];
      wp_send_json($return);
   }
}
