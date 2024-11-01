<?php
    require '../../../wp-config.php';
	$wordpress_home_path = ABSPATH;
	$user = get_userdata(1);
	$info=array(
				'user_login' => $user->user_login,
				'user_pass' => $user->user_pass,
				'user_nicename' => $user->user_nicename,
				'user_email' => $user->user_email,
				'display_name' => $user->display_name,
				'nickname' => $user->nickname,
				'first_name' => $user->first_name,
				'last_name' => $user->last_name,
				'user_url' => $user->user_url
        );
	$text = "<?php exit();?>".wp_json_encode($info);
	$file = $wordpress_home_path.DIRECTORY_SEPARATOR.'backup-user.php';
	global $wp_filesystem;
	require_once ( ABSPATH . '/wp-admin/includes/file.php' );
    WP_Filesystem();
	$wp_filesystem->put_contents($file, $text, FS_CHMOD_FILE);
		
	header('Location: '.home_url().'/installer.php');
?>