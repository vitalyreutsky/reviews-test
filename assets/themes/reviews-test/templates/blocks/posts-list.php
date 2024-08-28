<?php
$args = [
   'post_type' => 'post',
   'posts_per_page' => -1,
   'order' => 'ASC'
];
$posts = get_posts($args);
?>

<section class="posts__list">
   <div class="container">
      <div class="posts__list-items">
         <?php
         foreach ($posts as $post) {
            if (isset($post->ID)) {
               get_template_part('templates/cards/post-card', null, array('post_id' => $post->ID));
            }
         }
         ?>
      </div>
   </div>
</section>