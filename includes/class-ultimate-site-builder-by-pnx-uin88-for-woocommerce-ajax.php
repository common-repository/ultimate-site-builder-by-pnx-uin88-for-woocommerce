<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
} // Exit if accessed directly

if ( ! class_exists( 'ULTIMATE_SITE_BUILDER_BY_PNX_UIN88_FOR_WOOCOMMERCE_AJAX' ) ) {
	
	/**
	 * PNX AJAX Class.
	 */
	class ULTIMATE_SITE_BUILDER_BY_PNX_UIN88_FOR_WOOCOMMERCE_AJAX {
		
		public $lastCurlCode='';
		
		/**
		 * constructor.
		 *
		 */
		public function __construct() {
			add_action('wp_ajax_ultimate_site_builder_by_pnx_uin88_for_woocommerce_download', array( $this, 'ultimate_site_builder_by_pnx_uin88_for_woocommerce_download' ) );
			
			//logout
			add_action('wp_ajax_ultimate_site_builder_by_pnx_uin88_for_woocommerce_logout', array( $this, 'ultimate_site_builder_by_pnx_uin88_for_woocommerce_logout' ) );
		}
		
		/**
		* download zip
		*/
		public function ultimate_site_builder_by_pnx_uin88_for_woocommerce_download() {
			if ( empty( sanitize_text_field($_POST['download_nonce'] )) || ! wp_verify_nonce( sanitize_text_field($_POST['download_nonce']), '_ultimate_site_builder_by_pnx_uin88_for_woocommerce_download_nonce' ) ) {
				echo json_encode( array( 
					'success' => false, 
					'message' => 'invalid request'
				) );
				wp_die();
			}
			$url=sanitize_text_field($_POST["url"]);
			$step=sanitize_text_field($_POST["step"]);
			
			if($step=='progress'){
				$file = plugin_dir_path(__DIR__).DIRECTORY_SEPARATOR .'download_log_'.get_current_user_id().'.log';
				if(file_exists($file)){
					$r = json_decode(file_get_contents($file));
					echo json_encode( array( 
						'success' => true,
						'data' => $r
					));
					wp_die();
				}
				echo json_encode( array( 
					'success' => false,
				));
				wp_die();
			}
			
			if( empty($url) ){
				wp_die( esc_html(__( 'error', 'ultimate-site-builder-by-pnx-uin88-for-woocommerce' )) );
			}
			
			$dir_path= get_home_path();
			if (!file_exists($dir_path)) {
				@mkdir($dir_path, 0755, true);
			}
			$tmp_name = '';
			if($step == 'step1'){
				$tmp_name = 'installer.php';
			}else if($step == 'step2'){
				$beginIdx=strripos($url, '/')+1;
				$endIdx=strripos($url, '.');
				$tmp_name = substr($url,$beginIdx,$endIdx-$beginIdx).'.daf';
				$install_filename = $tmp_name;
			}
			$dest = $dir_path . DIRECTORY_SEPARATOR . $tmp_name;
			
			$downstart = microtime(true);
			
		    if($step == 'step2'){
		        $fileError = $this->downloadFileProgress($url,$dest);
            }else{
		        $fileError = $this->downloadFile($url,$dest);
			}
			if ($fileError) {
				if (file_exists($dest)) @unlink($dest);
		
				echo json_encode( array( 
					'success' => false, 
					'log' => 'Download error.'
				) );
			}else{
				echo json_encode( array( 
					'success' => true,
					'zip' => $zip_file,
					'install_filename' => $install_filename,
					'log' => array("Download completed (took: ".(microtime(true) - $downstart)."s size: ".$this->humanSize(filesize($zip_file)).")")
				) );
			
				
				if($step == 'step2'){
					$this->update_installer();
				}
			}
			wp_die();
		}
		
		public function downloadFile($url, $dest) {
			$fp = fopen($dest, 'w+');
			
			$ch = curl_init(str_replace(' ', '%20', $url));
			curl_setopt($ch, CURLOPT_TIMEOUT, 0);

			curl_setopt($ch, CURLOPT_FILE, $fp);
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
			curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
			
			curl_exec($ch);
			$this->$lastCurlCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
			
			$error_msg = false;
			if (curl_errno($ch)) {
				$error_msg = curl_error($ch);
			}

			curl_close($ch);
			fclose($fp);

			return false;
		}
		
		public function downloadFileProgress($url, $dest) {
			$fp = fopen($dest, 'w+');
			
			$ch = curl_init(str_replace(' ', '%20', $url));
			curl_setopt($ch, CURLOPT_TIMEOUT, 0);

			curl_setopt($ch, CURLOPT_FILE, $fp);
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
			curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);

			curl_setopt($ch, CURLOPT_NOPROGRESS, false);
            curl_setopt($ch, CURLOPT_PROGRESSFUNCTION, 'pnx_download_callback_progress');

			curl_exec($ch);
			$this->$lastCurlCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
			
			$error_msg = false;
			if (curl_errno($ch)) {
				$error_msg = curl_error($ch);
			}

			curl_close($ch);
			fclose($fp);

			return false;
		}
		
		public function ultimate_site_builder_by_pnx_uin88_for_woocommerce_logout() {
			if ( empty( sanitize_text_field($_POST['logout_nonce'] )) || ! wp_verify_nonce( sanitize_text_field($_POST['logout_nonce']), '_ultimate_site_builder_by_pnx_uin88_for_woocommerce_logout_nonce' ) ) {
				echo wp_json_encode( array( 
					'success' => false, 
					'message' => 'invalid request'
				) );
				wp_die();
			}
			session_start();
			$_SESSION['ultimate_site_builder_by_pnx_uin88_for_woocommerce_template_token']='';
			update_option( 'ultimate_site_builder_by_pnx_uin88_for_woocommerce_template_token' , '' );
			echo wp_json_encode( array( 
					'success' => true, 
					'log' => 'logout success.'
				) );
			wp_die();
		}
		
		public function update_installer(){
			$file = get_home_path().'\\installer.php';
			if(file_exists($file)){
				$file_content = file_get_contents($file);
				$search_key='$bootloader_name        = basename(__FILE__);';
				if(strpos($file_content, $search_key)!==false){
					$text=substr($file_content,0,strpos($file_content, $search_key)-1);
					$text.='$file = dirname(__FILE__).\'\\dup-installer\\main.installer.php\';
							if(file_exists($file)){
								$file_content = file_get_contents($file);
								if(strpos($file_content,\'<script>\') == false){
									$text="?><script>$(\'#param_item_secure-archive\').val(\'".self::ARCHIVE_FILENAME."\');setTimeout(function(){
		$(\'#param_item_dbname\').val($(\'#param_item_dbname\').attr(\'placeholder\'));
		$(\'#param_item_dbuser\').val($(\'#param_item_dbuser\').attr(\'placeholder\'));
		$(\'#param_item_dbpass\').val($(\'#param_item_dbpass\').attr(\'placeholder\'));},1000);</script>";
									file_put_contents($file, $text, FILE_APPEND);
								}
							}
							';
					$text.=	substr($file_content,strpos($file_content, $search_key));
					file_put_contents($file, $text);
				}
			}
		}
		
		public function humanSize($bytes) {
		  if (is_int($bytes)) {
			$label = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
			for ($i = 0; $bytes >= 1024 && $i < (count($label) - 1); $bytes /= 1024, $i++);

			return (round($bytes, 2) . " " . $label[$i]);
		  } else return $bytes;
		}
	}
	new ULTIMATE_SITE_BUILDER_BY_PNX_UIN88_FOR_WOOCOMMERCE_AJAX();
}

function pnx_download_callback_progress($resource, $downloadSize = 0, $downloaded = 0, $uploadSize = 0, $uploaded = 0)
{
    $info = array(
       'downloadSize'=> $downloadSize,
       'downloaded'=> $downloaded
    );
	$file = plugin_dir_path(__DIR__).DIRECTORY_SEPARATOR.'download_log_'.get_current_user_id().'.log';
    global $wp_filesystem;
	require_once ( ABSPATH . '/wp-admin/includes/file.php' );
    WP_Filesystem();
	$wp_filesystem->put_contents($file, wp_json_encode($info), FS_CHMOD_FILE);
}