$(function(){
	$('.asy').click(function(e){
		var signinName = $('.signinName').val();
		var signinPassword = $('.signinPassword').val();
		$.ajax({
			type:'POST',
			url:'/user/signinajax',
			dataType:'json',
			data:{signinName:signinName,signinPassword:signinPassword},
		})
		.done(function(results){
			if(results.success===1){
				location.href='http://localhost:3000/';
			}
			if(results.success===0){
				$('.nameMsg').text('')
				$('.passMsg').text('')
				$('.nameMsg').text(results.msg)
			} else if (results.success===2){
				$('.nameMsg').text('')
				$('.passMsg').text('')
				$('.passMsg').text(results.msg)
			}
		})
	})
	$('.sinup').click(function(e){
		var signinName = $('.signinName').val().trim();
		if(signinName==""||signinName==null){
			$('.nameMsg').text('')
			$('.passMsg').text('')
			$('.nameMsg').text('账号不能为空')
			return;
		}
		var signinPassword = $('.signinPassword').val();
		$.ajax({
			type:'POST',
			url:'/user/signupajax',
			dataType:'json',
			data:{name:signinName,password:signinPassword},
		})
		.done(function(results){
			if(results.success===1){
				location.href='http://localhost:3000/';
			}
			if(results.success===0){
				$('.nameMsg').text('')
				$('.passMsg').text('')
				$('.nameMsg').text(results.msg)
			} 
		})
	})
})
