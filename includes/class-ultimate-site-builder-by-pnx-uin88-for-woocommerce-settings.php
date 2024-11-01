<?php

?>
<div id="manage_content" style="display:none;">
   <h3 class="welcome_title">盛翔Woocommerce终极建站 (UIN88)</h3>
   <h5 class="welcome_sub_title">Ultimate Site Builder by PNX Uin88 for Woocommerce</h5>
   <div id="login_box">
		<button type="button" id="login">登录</button>
		<div class="tips">
			还没有账号？<a href="javascript:void(0);" id="register" title="立即注册">立即注册</a>
		</div>
	</div>
	<div id="welcome_div">
		<div id="current_user_logo_div" ><img id="current_user_logo" src="" /></div>
		<span>欢迎您，<c id="current_user_info"></c></span>
		<span>开始日期：<c id="begin_date"></c></span>
		<span>到期日期：<c id="end_date"></c><a target="_blank" href="" id="account_renew">续费</a></span>
		<span>会员类型：<c id="order_name"></c><a href="javascript:void(0);" id="account_new">购买会员</a><a href="javascript:void(0);" id="account_logout">退出</a></span>
		<span>最大可下载模板数：<c id="max_template"></c>，已下载模板数：<c id="used_template"></c></span>
		<span>最大可部署网站数：<c id="max_website"></c>，已部署网站数：<c id="used_website"></c></span>
	</div>
	<div id="template_div">
		<div id="template_category_selector">
			<div id="template_category_div"><span class="title">分类：</span><div id="template_category"></div></div>
			<div id="template_sub_category_div"><span class="title">子分类：</span><div id="template_sub_category"></div></div>
		</div>
		<div id="templatelist" class="et_pb_row et_pb_row_3"></div>
		<div id="template_paging"></div>
	</div>
</div>
<div id="restore_popup" style="display:none;">
	<div id="restore_progress">
		<div id="progress_cls_btn" class="close_window">X</div>
		<div class="confirm_restore_title">下载过程中请不要关闭浏览器和窗口！</div>
		<button type="button" class="start_restore" data-template-id="">
              <div class="for-img">
                   <span>开始</span>
              </div>
         </button>
		<div class="g-container">
			<div class="g-progress"></div>
		</div>
	</div>
	<div id="restore_success" style="display:none;">
		<div id="success_cls_btn" class="close_window">X</div>
		<div class="restore_success_title"><img src="" id="download_ok_icon" alt="ok">下载成功！</div>
		<div id="red_warm_div"><img src="" id="red_warm_icon" alt=""><span>请注意，如点击开始安装，您的Wordpress和Woocommerce将被整体替换，包括所有数据和文件。</span></div>
		<div id="install_file_div"><label id="install_filename"></label><span id="copy_filename">复制文件名</span></div>
		<button type="button" id="install_now">
              <div class="for-img">
                   <span>立即安装</span>
              </div>
         </button>
		 <button type="button" id="finish_install">
              <div class="for-img">
                   <span>已安装完成</span>
              </div>
         </button>
	</div>
</div>
<div id="iframe_login_popup">
	<div id="iframe_login_div">
		<span id="iframe_login_div_close" title="close">X</span>
		<iframe src="" id="iframe_login" frameborder="0" scrolling="auto"></iframe>
	</div>
</div>