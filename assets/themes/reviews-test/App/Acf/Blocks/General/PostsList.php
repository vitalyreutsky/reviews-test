<?php

namespace App\Acf\Blocks\General;

use App\Acf\Blocks\Helpers\Block;
use App\Acf\Blocks\RegisterBlock;

final class PostsList implements \App\Acf\Blocks\Helpers\BlockItem
{

   public static function setBlockParams(): void
   {
      RegisterBlock::addBlock(
         new Block(
            'Posts-list',
            'Posts List',
            'Posts List block',
            'templates/blocks/posts-list.php',
            '',
            '',
            array(
               'align' => false,
               'mode'  => false,
               'jsx'   => true,
               'anchor' => true,
            ),
            array(
               'title'       => "Posts List block",
               'description' => "Posts List block"
            ),
            'block-default',
            'reviews-test'
         )
      );
   }
}
