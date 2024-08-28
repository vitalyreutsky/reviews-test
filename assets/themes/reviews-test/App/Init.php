<?php


/**
 * Init theme class
 */

namespace App;


final class init
{
	/**
	 * Store all the classes inside an array
	 * @return array Full list of classes
	 */
	private static function get_services(): array
	{
		// Array of classes needed to init
		return array(
			Admin\Init::class,
			Base\Bootstrap::class,
			Base\DisableXmlRPC::class,
			Base\Enqueue::class,
			Base\SvgSupport::class,
			Base\Deregister::class,
			Base\ChangeEditor::class,
			Acf\Blocks\Init::class,
			CustomPostType\RegisterCustomPostType::class,
			Reviews\Init::class,
			Helpers\Init::class,
		);
	}

	/**
	 * Loop through the classes, initialize them,
	 * and call the register() method if it exists
	 */
	public static function register_services()
	{
		// Init theme classes
		foreach (self::get_services() as $class) {
			new $class;
		}
	}
}
