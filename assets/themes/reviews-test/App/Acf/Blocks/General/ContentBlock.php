<?php

namespace App\Acf\Blocks\General;

use App\Acf\Blocks\Helpers\Block;
use App\Acf\Blocks\RegisterBlock;

final class ContentBlock implements \App\Acf\Blocks\Helpers\BlockItem
{

    public static function setBlockParams(): void
    {
        RegisterBlock::addBlock(
            new Block(
                'content_block',
                'Content Block',
                'Content Block',
                'templates/blocks/content_block.php',
                '',
                '',
                array(
                    'align' => false,
                    'mode'  => false,
                    'jsx'   => true,
                    'anchor' => true,
                ),
                array(
                    'title' => "Content Block",
                    'description' => "Content Block"
                ),
                'block-default',
                'review-test',
                'preview'
            )
        );
    }
}
