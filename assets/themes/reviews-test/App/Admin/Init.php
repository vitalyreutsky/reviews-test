<?php

namespace App\Admin;

class Init
{
   public function __construct()
   {
      add_action('after_setup_theme', [self::class, 'remove_admin_bar']);
   }

   public static function remove_admin_bar()
   {

      show_admin_bar(false);
   }
}
