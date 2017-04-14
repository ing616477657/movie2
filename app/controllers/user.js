var User = require('../models/user');
//signup
exports.signup = function(req,res){
	var _user = req.body.user;
	User.findOne({name:_user.name},function(err,user){
		if(err) {
			return console.log(err);
		}
		if(user){
			return res.redirect('/signin')
		}else{
			var user = new User(_user);
			user.save(function(err,user){
				if(err){
					return	console.log(err.errors.name.message);
				}
				req.session.user = user
				res.redirect('/')
			})
		}
	})
}
exports.signupShow = function(req,res){
	res.render('signup',{title:'用户注册'})
}

// signin
exports.signin = function(req,res){
	var _user = req.body.user;
	var name=_user.name;
	var password=_user.password;
	User.findOne({name:name},function(err,user){
		if(err) {return console.log(err)}
		if(!user){
			return res.redirect('/signup')
		}
		user.comparePassword(password,function(err,isMatch){
			if(err){return console.log(err)}
			if(isMatch){
				req.session.user = user
				return res.redirect('/')
			}else {
				res.redirect('/signin')
				console.log('Password is not matched')
			}
		})
	}) 
}
exports.signinShow = function(req,res){
	res.render('signin',{title:'用户登录'})
}
// logout
exports.logout = function(req,res){
	delete req.session.user
	// delete app.locals.user
	res.redirect('/');
}
// userlist page
exports.list  = function(req,res){
	User.fetch(function(err,users){
		if(err){
			console.log(err);
		}
		res.render('userlist',{title:'movie 用户列表页面',users:users})
	})
}

// ajax signin 
exports.ajaxSignin = function(req,res){
	var name=req.body.signinName
	var password=req.body.signinPassword
	User.findOne({name:name},function(err,user){
		if(err) {return console.log(err)}
		if(!user){
			return res.json({success:0,msg:'用户名不存在'})
		}
		user.comparePassword(password,function(err,isMatch){
			if(err){return console.log(err)}
			if(isMatch){
				req.session.user = user
				res.json({success:1})
			}else {
				res.json({success:2,msg:'密码错误'})
			}
		})
	}) 
}
exports.ajaxSignup = function(req,res){
	var _user = req.body;
	User.findOne({name:_user.name},function(err,user){
		if(err) {
			return console.log(err);
		}
		if(user){
			res.json({success:0,msg:'账号已存在'})
		}else{
			var user = new User(_user);
			user.save(function(err,user){
				if(err){
					// res.json({success:0,msg:err.errors.name.message})
					return console.log(err)
				}
				req.session.user = user
				res.json({success:1})
			})
		}
	})
}