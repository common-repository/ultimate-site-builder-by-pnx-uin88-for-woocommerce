jQuery(function(){
	jQuery("#download_ok_icon").attr("src",ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.download_ok_icon_src);
	jQuery("#red_warm_icon").attr("src",ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.red_warm_icon_src);
	
	jQuery("#manage_content").show();
	
	var current_template_category='';
	var current_template_sub_category='';
	
	if(ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.token!="" && ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.token!=null){
		jsonPForGetuserinfo({
			url: ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.user_api,
			params: {
				token: ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.token,
				timestamp: ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.timestamp,
				sign: ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.sign,
				website: ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.website
			},
			callbackfun: 'user_callback'
		}).then((res) => {
			if(res.code==0){
				jQuery("#welcome_div").html(res.data).css("display","inline-block");
			}else if(res.code==2){
				alert(res.msg);
			}else{
				jQuery("#login_box").show();
			}
		});
	}else{
		jQuery("#login_box").show();
	}
		   
	jQuery("#register").click(function(){
		jQuery("#login").click();
	});
	
	jQuery("#login").click(function(){
		var currentLocation=window.location.href.split("&token=")[0].replace("?","%3F");
		window.location.href=ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.login_url+currentLocation;
	});
	
	 if (document.getElementById("iframe_login").attachEvent) {
        document.getElementById("iframe_login").attachEvent("onload", function () {
            jQuery("#iframe_login_popup").show();
        });
    } else {
        document.getElementById("iframe_login").onload = function () {
            jQuery("#iframe_login_popup").show();
        };
    }
	
	jQuery("#iframe_login_div_close").click(function(){
		jQuery("#iframe_login_popup").hide();
	});
	
	jQuery("#template_category_selector").on('click', '#template_category span', function(){
		jQuery("#template_category span").removeClass("cur");
		jQuery(this).addClass("cur");
		current_template_category=jQuery(this).html();
		if(current_template_category=='全部'){
			showTemplatelist(null, null, 0);                
			jQuery("#template_sub_category").html('');
			jQuery("#template_sub_category_div").hide();
		}else{
			html_template_sub_category='';
			for(var i=0;i<template_sub_category_dic[current_template_category].length;i++){
				html_template_sub_category+='<span class="'+template_sub_category_dic[current_template_category][i]+'">'+template_sub_category_dic[current_template_category][i]+'</span>';
			}            
			jQuery("#template_sub_category").html(html_template_sub_category);
			showTemplatelist(current_template_category, null, 0); 
			jQuery("#template_sub_category_div").show();
		}
	});
	
	jQuery("#template_category_selector").on('click', '#template_sub_category span', function(){
		jQuery("#template_sub_category span").removeClass("cur");
		jQuery(this).addClass("cur");
		current_template_sub_category=jQuery(this).html();
		showTemplatelist(current_template_category, current_template_sub_category, 0);
	});
	
	function showTemplatelist(current_template_category, current_template_sub_category, page_index, new_paging){
		var current_template_data=[];
		for(var i=0;i<template_data.length;i++){
			if((current_template_category==null || current_template_category==template_data[i].category) && (current_template_sub_category==null || current_template_sub_category==template_data[i].sub_category)){
				current_template_data.push(template_data[i]);
			}
		}
		var html_template='<div class="et_pb_column et_pb_column_4_4 et_pb_column_4  et_pb_css_mix_blend_mode_passthrough et-last-child"><div class="et_pb_module et_pb_code et_pb_code_0"><div class="et_pb_code_inner"><div class="frm_grid_container with_frm_style frm-grid-view frm_no_grid_750" style="--v-tl-grid-column:span 4/span 4;grid-gap: 10px 1%;">'
		var final_count=(page_index+1)*page_template_count;
		if(current_template_data.length<(page_index+1)*page_template_count){final_count=current_template_data.length}
		for(var i=page_index*page_template_count;i<final_count;i++){
			html_template+='<div class="template_entity" data-category="'+current_template_data[i].category+'" data-sub_category="'+current_template_data[i].sub_category+'"><div class="frm_grid_container"><div class="frm12"><div class="pro-img"><a href="'+current_template_data[i].url+'" target="_blank"><img decoding="async" src="'+current_template_data[i].image_url+'" style="top: 0px;"></a><p></p><div class="template-content"><a href="'+current_template_data[i].url+'" class="select" target="_blank"><span class="new_anim"></span><span>演示</span></a><a href="javascript:void(0);" class="select template_download" data-template-id="'+current_template_data[i].id+'" rel="nofollow" class="show"><span class="new_anim"></span><span>下载</span></a></div><p></p></div></div></div></div>';
		}
		html_template+='</div></div></div></div></div></div>';
		jQuery("#templatelist").html(html_template);
		if(new_paging!='no'){
			var page_count=Math.ceil(current_template_data.length/page_template_count);
			current_page_count=page_count;
			showPaging(page_count);
		}
	}
	
	jQuery("#template_paging").on('click', 'span', function(){
		var new_page_index=0;
		if(jQuery(this).data("pageindex")=="prev"){
			new_page_index=parseInt(jQuery("#template_paging .cur").prev().data("pageindex"))-1;
			var cur_index=jQuery("#template_paging .cur").prev().index();
			jQuery("#template_paging span").removeClass("cur");
			jQuery("#template_paging span").eq(cur_index).addClass("cur");
		}else if(jQuery(this).data("pageindex")=="next"){
			new_page_index=parseInt(jQuery("#template_paging .cur").next().data("pageindex"))-1;
			var cur_index=jQuery("#template_paging .cur").next().index();
			jQuery("#template_paging span").removeClass("cur");
			jQuery("#template_paging span").eq(cur_index).addClass("cur");
		}
		else{
			jQuery("#template_paging span").removeClass("cur");
			jQuery(this).addClass("cur");
			new_page_index=parseInt(jQuery(this).data("pageindex"))-1;
		}
		var current_template_category=null;
		var current_template_sub_category=null;
		if(jQuery("#template_category .cur").html()!="全部"){current_template_category=jQuery("#template_category .cur").html()}
		if(jQuery("#template_sub_category .cur").html()!=undefined){current_template_category=jQuery("#template_sub_category .cur").html()}
		showTemplatelist(current_template_category, current_template_sub_category, new_page_index, 'no');
		showPaging(current_page_count,new_page_index+1);
	});
	
	jQuery("#templatelist").on('click', '.template_download', function(){
		jQuery("#restore_popup .start_restore").data("template-id",jQuery(this).data("template-id"));
		jQuery("#restore_popup").show();
		jQuery("#restore_popup #restore_progress").show();
		jQuery(".confirm_restore_title").html("下载过程中请不要关闭浏览器和窗口");
		jQuery(".start_restore").show();
		jQuery("#restore_popup .g-progress").css("width","0%");
		jQuery(".g-container").hide();
		jQuery("#install_now").css("margin","25px auto 20px").css("display","block").css("border","0").css("background","#679aee").css("color","white");
		jQuery("#install_now").find("span").html("立即安装");
		jQuery("#finish_install").hide();
	});
	
	jQuery("#restore_popup .start_restore").click(function(){
		var template_id=jQuery(this).data("template-id");
		jsonPForTemplatedownload({
			url: ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.template_api,
			params: {
				flag: "download",
				token: ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.token,
				timestamp: ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.timestamp,
				sign: ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.sign,
				template_id: template_id
			},
			callbackfun: 'templatedownload_callback'
		}).then((res) => {
			if(res.code==0){
				templateDownloadStep1(res.data);
				jQuery(".confirm_restore_title").html("正在下载中，请不要关闭浏览器和窗口！");
				jQuery(".start_restore").hide();
				jQuery("#restore_popup .g-progress").css("width","0%");
				jQuery(".g-container").show();
			}else if(res.code==1){
				alert("token过期，需要重新登录！");
				jQuery("#login_box").show();
			}else{
				alert(res.msg);
			}
		});
	});
	
	function templateDownloadStep1(data){
		var url1=data[0].url1;
		var url2=data[0].url2;
		var param = {"action": "ultimate_site_builder_by_pnx_uin88_for_woocommerce_download", "url": url1, "download_nonce": ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.download_nonce, "step": "step1"};
		jQuery.ajax({
			url: ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.ajaxurl,
			type: "POST",
			data: param,
			dataType:"json",
			success: function (data) {
				if(data.success==true){
					templateDownloadStep2(url2);
					var interval_id = window.setInterval(function() {
					    var param = {"action": "ultimate_site_builder_by_pnx_uin88_for_woocommerce_download", "url": url2, "download_nonce": ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.download_nonce, "step": "progress"};
						jQuery.ajax({
							url: ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.ajaxurl,
							type: "POST",
							data: param,
							dataType:"json",
							success: function (res) {
								if(res.success&&res.data!=null){
									if (res.data.downloaded >= res.data.downloadSize) {
										clearInterval(interval_id);
									} else {
										var progress=parseInt(res.data.downloaded/res.data.downloadSize*100);
										var setDownloadProgress = jQuery("#restore_popup .g-progress").css("width",progress+"%");
									}
								}
							},
							error: function (XMLHttpRequest, textStatus, errorThrown) {
							    console.log("err");
							}
						});
					}, 500);					
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				console.log("err");
			}
		});
	}
	
	function templateDownloadStep2(url2){
		var param = {"action": "ultimate_site_builder_by_pnx_uin88_for_woocommerce_download", "url": url2, "download_nonce": ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.download_nonce, "step": "step2"};
		jQuery.ajax({
			url: ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.ajaxurl,
			type: "POST",
			data: param,
			dataType:"json",
			success: function (data) {
				if(data.success==true){
					jQuery("#restore_popup .g-progress").css("width","100%");
					jQuery("#install_filename").html(data.install_filename);
					setTimeout(function(){ jQuery("#restore_popup").show();jQuery("#restore_popup #restore_progress").hide();jQuery("#restore_popup #restore_success").show(); }, 1500);
					finishTemplateDownload();
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				console.log("err");
			}
		});
	}
	
	function finishTemplateDownload(){
		jsonPForTemplateback({
			url: ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.template_api,
			params: {
				flag: "back",
				token: ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.token,
				timestamp: ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.timestamp,
				sign: ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.sign,
				template_id: jQuery("#restore_popup .start_restore").data("template-id"),
				website: ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.website
			},
			callbackfun: 'templateback_callback'
		}).then((res) => {
			console.log(res);
		});
	}
	
	function installTemplate(){
		jsonPForTemplateinstall({
			url: ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.template_api,
			params: {
				flag: "install",
				token: ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.token,
				timestamp: ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.timestamp,
				sign: ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.sign,
				template_id: jQuery("#restore_popup .start_restore").data("template-id"),
				website: ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.website
			},
			callbackfun: 'templateinstall_callback'
		}).then((res) => {
			console.log(res);
		});
	}
	
	jQuery("#copy_filename").click(function(){
		var text = jQuery("#install_filename").html();
        var temp_input = jQuery('<input>').val(text).appendTo('body').select();
        document.execCommand('copy');
        temp_input.remove();
		alert("复制成功！");
	});
	
	jQuery("#install_now").click(function(){
		window.open(ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.install_url);
		installTemplate();
		jQuery("#install_now").css("margin","0 0 20px 80px").css("display","inline-block").css("border","3px solid black").css("background","white").css("color","black");
		jQuery("#install_now").find("span").html("重新安装");
		jQuery("#finish_install").css("margin","0 0 20px 80px").css("display","inline-block").css("border","3px solid black").css("background","white").css("color","black").show();
	});
	
	jQuery("#finish_install").click(function(){
		window.location=ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.website;
	});
	
	jQuery("#progress_cls_btn").click(function(){
		jQuery("#restore_popup #restore_progress").hide();
		jQuery("#restore_popup").hide();
	});
	
	jQuery("#success_cls_btn").click(function(){
		jQuery("#restore_popup #restore_success").hide();
		jQuery("#restore_popup").hide();
	});
	
	if(ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.token!="" && ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.token!=null){
		getTemplateList();
	}
	
	jQuery("#welcome_div").on('click', '#account_logout', function(){
		var param = {"action": "ultimate_site_builder_by_pnx_uin88_for_woocommerce_logout", "logout_nonce": ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.logout_nonce};
		jQuery.ajax({
			url: ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.ajaxurl,
			type: "POST",
			data: param,
			dataType:"json",
			success: function (data) {
				if(data.success==true){
					window.location.href=window.location.href.split("&token=")[0];
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				console.log("err");
			}
		});
	});
});
var template_data;
var template_category_arr=[];
var template_sub_category_dic = new Array();
var page_template_count=9;
var current_page_count=0;


function getTemplateList(){
	jsonPForTemplatelist({
		url: ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.template_api,
		params: {
			flag: "list",
			token: ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.token,
			timestamp: ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.timestamp,
			sign: ultimate_site_builder_by_pnx_uin88_for_woocommerce_context.sign
		},
		callbackfun: 'templatelist_callback'
	}).then((res) => {
		var html_template='';
		if(res.code==0){
			html_template='<div class="et_pb_column et_pb_column_4_4 et_pb_column_4  et_pb_css_mix_blend_mode_passthrough et-last-child"><div class="et_pb_module et_pb_code et_pb_code_0"><div class="et_pb_code_inner"><div class="frm_grid_container with_frm_style frm-grid-view frm_no_grid_750" style="--v-tl-grid-column:span 4/span 4;grid-gap: 10px 1%;">';
			template_data=res.data;
			for(var i=0;i<res.data.length;i++){
				if(template_category_arr.indexOf(res.data[i].category)==-1){
					template_category_arr.push(res.data[i].category);
					template_sub_category_dic[res.data[i].category]=[res.data[i].sub_category];
				}else{
					if(template_sub_category_dic[res.data[i].category].indexOf(res.data[i].sub_category)==-1){
						template_sub_category_dic[res.data[i].category].push(res.data[i].sub_category);
					}
				}
			}
			var current_template_count=page_template_count;
			if(res.data.length<page_template_count){
				current_template_count=res.data.length;
			}
			for(var i=0;i<current_template_count;i++){
				html_template+='<div class="template_entity" data-category="'+res.data[i].category+'" data-sub_category="'+res.data[i].sub_category+'"><div class="frm_grid_container"><div class="frm12"><div class="pro-img"><a href="'+res.data[i].url+'" target="_blank"><img decoding="async" src="'+res.data[i].image_url+'" style="top: 0px;"></a><p></p><div class="template-content"><a href="'+res.data[i].url+'" class="select" target="_blank"><span class="new_anim"></span><span>演示</span></a><a href="javascript:void(0);" class="select template_download" data-template-id="'+res.data[i].id+'" rel="nofollow" class="show"><span class="new_anim"></span><span>下载</span></a></div><p></p></div></div></div></div>';
			}
			var page_count=Math.ceil(res.data.length/page_template_count);
			current_page_count=page_count;
			showPaging(page_count);
			
			html_template+='</div></div></div></div></div></div>';
			jQuery("#templatelist").html(html_template);
			html_template_category='<span class="cur" title="全部">全部</span>';
			for(var i=0;i<template_category_arr.length;i++){
				html_template_category+='<span title="'+template_category_arr[i]+'">'+template_category_arr[i]+'</span>';
			}
			jQuery("#template_category").html(html_template_category);
			jQuery("#template_div").show();
		}else if(res.code==1){
			alert("token过期，需要重新登录！");
			jQuery("#login_box").show();
		}else{
			alert(res.msg);
		}
	});
}

function jsonPForGetuserinfo({url, params, callbackfun}) {
	return new Promise((resolve, reject) => {
		window.user_callback = function(data) {
			resolve(data);
			document.body.removeChild(script);
		}
		const arrs = [];
		for (let key in params) {
			arrs.push(`${key}=${params[key]}`);
		}
		let script = document.createElement('script');
		script.src = `${url}?${arrs.join('&')}&callback=`+callbackfun;
		document.body.appendChild(script);
	});
}

function jsonPForTemplatelist({url, params, callbackfun}) {
	return new Promise((resolve, reject) => {
		window.templatelist_callback = function(data) {
			resolve(data);
			document.body.removeChild(script);
		}
		const arrs = [];
		for (let key in params) {
			arrs.push(`${key}=${params[key]}`);
		}
		let script = document.createElement('script');
		script.src = `${url}?${arrs.join('&')}&callback=`+callbackfun;
		document.body.appendChild(script);
	});
}

function jsonPForTemplatedownload({url, params, callbackfun}) {
	return new Promise((resolve, reject) => {
		window.templatedownload_callback = function(data) {
			resolve(data);
			document.body.removeChild(script);
		}
		const arrs = [];
		for (let key in params) {
			arrs.push(`${key}=${params[key]}`);
		}
		let script = document.createElement('script');
		script.src = `${url}?${arrs.join('&')}&callback=`+callbackfun;
		document.body.appendChild(script);
	});
}

function jsonPForTemplateback({url, params, callbackfun}) {
	return new Promise((resolve, reject) => {
		window.templateback_callback = function(data) {
			resolve(data);
			document.body.removeChild(script);
		}
		const arrs = [];
		for (let key in params) {
			arrs.push(`${key}=${params[key]}`);
		}
		let script = document.createElement('script');
		script.src = `${url}?${arrs.join('&')}&callback=`+callbackfun;
		document.body.appendChild(script);
	});
}

function jsonPForTemplateinstall({url, params, callbackfun}) {
	return new Promise((resolve, reject) => {
		window.templateinstall_callback = function(data) {
			resolve(data);
			document.body.removeChild(script);
		}
		const arrs = [];
		for (let key in params) {
			arrs.push(`${key}=${params[key]}`);
		}
		let script = document.createElement('script');
		script.src = `${url}?${arrs.join('&')}&callback=`+callbackfun;
		document.body.appendChild(script);
	});
}

function showPaging(page_count, current_pageindex){
	if(page_count>1){
		var html_paging='';
		if(current_pageindex>1){
			html_paging+='<span data-pageindex="1">首页</span>';
			html_paging+='<span data-pageindex="prev">&lt; 上一页</span>';
		}
		if(current_pageindex==1 || current_pageindex==undefined){
			html_paging+='<span class="cur" data-pageindex="1">1</span>';
		}else{
			html_paging+='<span data-pageindex="1">1</span>';
		}
		for(var i=1;i<page_count;i++){
			if(i+1==current_pageindex){
				html_paging+='<span class="cur" data-pageindex="'+(i+1)+'">'+(i+1)+'</span>';
			}else{
				html_paging+='<span data-pageindex="'+(i+1)+'">'+(i+1)+'</span>';
			}
		}
		if(current_pageindex==undefined || current_pageindex < page_count){
			html_paging+='<span data-pageindex="next">下一页 &gt;</span>';
			html_paging+='<span data-pageindex="'+page_count+'">尾页</span>';
		}
		jQuery("#template_paging").html(html_paging);
	}else{
		jQuery("#template_paging").html('');
	}
}

function getUrlParam(name) {	 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");	 
	var r = window.location.search.substr(1).match(reg);	 
	if (r != null) return unescape(r[2]);
	return null;	 
}

jQuery(document).ready(function ($) {
	$("#templatelist").on('mouseenter', '.frm_no_grid_750>div', function(){
		var img_height=$(this).find(".pro-img img").height();
		var div_height=$(this).height();
		img_height=img_height-div_height
		$(this).find(".pro-img img").css({"top": -img_height+"px"});
	})
	
	$("#templatelist").on('mouseleave', '.frm_no_grid_750>div', function(){
		$(this).find(".pro-img img").css({"top": "0px"});
	})
})