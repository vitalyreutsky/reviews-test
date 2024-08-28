<?php
$review_id = isset($args['review_id']) ? intval($args['review_id']) : 0;

if ($review_id > 0) {
   $review_status = get_field('review_status', $review_id);
   if ($review_status) {
      $review_title = get_the_title($review_id);
      $review_excerpt = get_the_excerpt($review_id);

      if (!empty($review_title) || !empty($review_excerpt)) : ?>
         <div class="review-card">
            <div class="review-card__wrapper">
               <h2 class="review-card__title"><?php echo esc_html($review_title); ?></h2>
               <p class="review-card__text"><?php echo esc_html($review_excerpt); ?></p>
            </div>
         </div>
<?php endif;
   }
} ?>