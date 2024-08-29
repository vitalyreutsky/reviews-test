<?php
$post_id = get_the_id();

$args = [
   "post_type"      => "reviews",
   "post_status"    => "publish",
   "posts_per_page" => -1,
   'orderby'          => 'date',
   'meta_query' => [
      'relation' => 'AND',
      [
         'key' => 'review_post_id',
         'value' => $post_id,
      ],
      [
         'key'     => 'review_status',
         'value'   => '1',
         'compare' => '='
      ]
   ]
];

$reviews = get_posts($args);
?>

<section class="reviews">
   <div class="container reviews__container">
      <h1 class="reviews__title main-title"><?php echo esc_html('Оставь свой отзыв'); ?></h1>

      <div class="reviews__form">
         <form class="form">
            <input class="field hide-field" type="hidden" value="<?php echo esc_attr($post_id); ?>" name="review_post_id">

            <div class="form__fields">
               <div class="form__field form__field--name">
                  <input type="text" name="name" placeholder="Ваше имя" class="field form__field-input input-name input-reset">
               </div>

               <div class="form__field form__field--message">
                  <textarea name="message" placeholder="Ваше сообщение" class="field form__field-input input-reset"></textarea>
               </div>
            </div>

            <button class="form__btn btn btn-reset">
               <?php echo esc_html('Send'); ?>
            </button>
         </form>

         <div class="form__result is-hidden">
            <p class="form__result-text"></p>
         </div>
      </div>

      <div class="reviews__items <?php echo empty($reviews) ? esc_attr('is-hidden') : null; ?>">
         <div class="reviews__filter <?php echo count($reviews) <= 1 ? esc_attr('is-hidden') : null; ?>">
            <button class="reviews__btn sort-btn sort-btn--new btn-reset" value="new"><?php echo esc_html('New Reviews'); ?></button>
            <button class="reviews__btn sort-btn sort-btn--old btn-reset" value="old"><?php echo esc_html('Old Reviews'); ?></button>
         </div>

         <div class="reviews__cards">
            <?php
            foreach ($reviews as $key => $review) {
               if (isset($review->ID)) {
                  get_template_part('templates/cards/review-card', null, array('review_id' => $review->ID));
               }
            }
            ?>
         </div>
      </div>
   </div>
</section>