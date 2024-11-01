<?php
/*
Plugin Name: Ultimate Site Builder by PNX Uin88 for Woocommerce
Description: Build your Woocommerce like a master with fancy templates
Version: 2.0.1
Author URI:  https://www.uin88.com/
Author: PNX Software Co., Ltd.
Text Domain: ultimate-site-builder-by-pnx-uin88-for-woocommerce
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit;
} // Exit if accessed directly

if ( !defined('ULTIMATE_SITE_BUILDER_BY_PNX_UIN88_FOR_WOOCOMMERCE_PLUGIN_ID') ) {
   define("ULTIMATE_SITE_BUILDER_BY_PNX_UIN88_FOR_WOOCOMMERCE_PLUGIN_ID", "ultimate-site-builder-by-pnx-uin88-for-woocommerce");//Plugin ID
}
if (!defined('ULTIMATE_SITE_BUILDER_BY_PNX_UIN88_FOR_WOOCOMMERCE_ROOT_DIR')) {//ROOT DIR
   define('ULTIMATE_SITE_BUILDER_BY_PNX_UIN88_FOR_WOOCOMMERCE_ROOT_DIR', __DIR__);
}
if ( !defined('ULTIMATE_SITE_BUILDER_BY_PNX_UIN88_FOR_WOOCOMMERCE_PLUGIN_URL') ) {
   define("ULTIMATE_SITE_BUILDER_BY_PNX_UIN88_FOR_WOOCOMMERCE_PLUGIN_URL", plugins_url( '/', __FILE__ ));// PLUGIN_URL
}
if (!defined('ULTIMATE_SITE_BUILDER_BY_PNX_UIN88_FOR_WOOCOMMERCE_BACKUPS')) {
   define('ULTIMATE_SITE_BUILDER_BY_PNX_UIN88_FOR_WOOCOMMERCE_BACKUPS', WP_CONTENT_DIR . DIRECTORY_SEPARATOR . 'ultimate-site-builder-by-pnx-uin88-for-woocommerce' . DIRECTORY_SEPARATOR . 'backups');
}

// Load plugin after all
add_action('plugins_loaded', function () {
	//include class
	require_once ULTIMATE_SITE_BUILDER_BY_PNX_UIN88_FOR_WOOCOMMERCE_ROOT_DIR . DIRECTORY_SEPARATOR . 'includes/class-ultimate-site-builder-by-pnx-uin88-for-woocommerce-ajax.php';
});

// Actions
add_action('admin_menu', 'submenu');

/**
* plugin setting links
*/
add_filter( 'plugin_action_links_'.plugin_basename(__FILE__), 'ultimate_site_builder_by_pnx_uin88_for_woocommerce_action_links' );
function ultimate_site_builder_by_pnx_uin88_for_woocommerce_action_links( $links ) {
	$plugin_links = array();
	$plugin_links[] = '<a href="'.admin_url('admin.php?page=ultimate-site-builder-by-pnx-uin88-for-woocommerce').'">'.esc_html__('Settings', 'ultimate-site-builder-by-pnx-uin88-for-woocommerce').'</a>';
	return array_merge( $plugin_links, $links );
}

/**
* settings page
*/
function settings_page() {
	// Require The settings
	require_once ULTIMATE_SITE_BUILDER_BY_PNX_UIN88_FOR_WOOCOMMERCE_ROOT_DIR . DIRECTORY_SEPARATOR . 'includes/class-ultimate-site-builder-by-pnx-uin88-for-woocommerce-settings.php';
	wp_enqueue_script( 'ultimate-site-builder-by-pnx-uin88-for-woocommerce-js', ULTIMATE_SITE_BUILDER_BY_PNX_UIN88_FOR_WOOCOMMERCE_PLUGIN_URL.'assets/js/admin/ultimate-site-builder-by-pnx-uin88-for-woocommerce-admin.js', array('jquery'), '1.0', true );
	wp_enqueue_style( 'ultimate-site-builder-by-pnx-uin88-for-woocommerce-css', ULTIMATE_SITE_BUILDER_BY_PNX_UIN88_FOR_WOOCOMMERCE_PLUGIN_URL.'assets/css/admin/ultimate-site-builder-by-pnx-uin88-for-woocommerce-admin.css' );
	// Require The session start
	session_start();
	
	$token='';
	if(!empty($_GET['token'])){
		$token=$_GET['token'];
		update_option( 'ultimate_site_builder_by_pnx_uin88_for_woocommerce_template_token' , $token );
		$_SESSION['ultimate_site_builder_by_pnx_uin88_for_woocommerce_template_token']=$token;
	}else{
		if($_SESSION['ultimate_site_builder_by_pnx_uin88_for_woocommerce_template_token']==null){
			$token=get_option( 'ultimate_site_builder_by_pnx_uin88_for_woocommerce_template_token' );
		}else{
			$token=$_SESSION['ultimate_site_builder_by_pnx_uin88_for_woocommerce_template_token'];
		}
	}
	$key='pnxcool2003';
	$timestamp=time();
	$sign=md5($token.$key.$timestamp);
	
	$array = array(
		'download_nonce' => wp_create_nonce( '_ultimate_site_builder_by_pnx_uin88_for_woocommerce_download_nonce' ),
		'logout_nonce' => wp_create_nonce( '_ultimate_site_builder_by_pnx_uin88_for_woocommerce_logout_nonce' ),
		'ajaxurl'        => admin_url( 'admin-ajax.php' ),
		'token' => $token,
		'timestamp' => $timestamp,
		'sign' => $sign,
		'website' => home_url(),
		'login_url' => 'https://www.uin88.com/my-account/member-login/?redirect_to=https://www.uin88.com/my-account/plugin-thankyou/%3Fmember-url=',
		'user_api' => 'https://www.uin88.com/wp-json/api/getUser',
		'template_api' => 'https://www.uin88.com/wp-json/api/getTemplate',
		'install_url' => WP_PLUGIN_URL.'/ultimate-site-builder-by-pnx-uin88-for-woocommerce/installer.php',
		'basic_user_logo_src' => WP_PLUGIN_URL.'/ultimate-site-builder-by-pnx-uin88-for-woocommerce/assets/images/basic_user_logo.png',
		'pro_user_logo_src' => WP_PLUGIN_URL.'/ultimate-site-builder-by-pnx-uin88-for-woocommerce/assets/images/pro_user_logo.png',
		'adv_user_logo_src' => WP_PLUGIN_URL.'/ultimate-site-builder-by-pnx-uin88-for-woocommerce/assets/images/adv_user_logo.png',
		'no_order_user_logo_src' => WP_PLUGIN_URL.'/ultimate-site-builder-by-pnx-uin88-for-woocommerce/assets/images/no_order_user_logo.png',
		'download_ok_icon_src' => WP_PLUGIN_URL.'/ultimate-site-builder-by-pnx-uin88-for-woocommerce/assets/images/icon_log.png',
		'red_warm_icon_src' => WP_PLUGIN_URL.'/ultimate-site-builder-by-pnx-uin88-for-woocommerce/assets/images/red_warm.png',
	);
	wp_localize_script( 'ultimate-site-builder-by-pnx-uin88-for-woocommerce-js', 'ultimate_site_builder_by_pnx_uin88_for_woocommerce_context', $array );
	
}

/**
* add menu page
*/
function submenu() {
	// Menu icon
	$icon_url = '';
	// Main menu slug
	$parentSlug = 'ultimate-site-builder-by-pnx-uin88-for-woocommerce';
	// Content
	$content = 'settings_page';
	// Main menu hook
	add_menu_page('Ultimate Site Builder by PNX Uin88 for Woocommerce', '<span id="ultimate-site-builder-by-pnx-uin88-for-woocommerce-menu">Ultimate Site Builder by PNX Uin88 for Woocommerce</span>', 'read', $parentSlug, $content, $icon_url, $position = 98);
	// Remove default submenu by menu
	remove_submenu_page($parentSlug, $parentSlug);
}
