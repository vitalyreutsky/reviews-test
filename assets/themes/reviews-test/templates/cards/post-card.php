<?php
$post_id = isset($args['post_id']) ? intval($args['post_id']) : 0;

if ($post_id) {
   $content_post = get_post($post_id);

   if ($content_post) {
      $post_content_without_shortcodes = preg_replace(array(
         '/<p>\[reviews(.*?)\]<\/p>/',
         '/\[reviews(.*?)\]/'
      ), '', $content_post->post_content);

      $content = apply_filters('the_content', $post_content_without_shortcodes);

      $content = wp_kses_post($content);
      $permalink = esc_url(get_permalink($post_id));
?>

      <div class="post-card">
         <div class="post-card__wrapper">
            <div class="post-card__content">
               <?php echo $content; ?>
            </div>
            <a href="<?php echo $permalink; ?>" class="post-card__link btn"><?php echo esc_html('Read More'); ?></a>
         </div>
      </div>
<?php
   }
}
