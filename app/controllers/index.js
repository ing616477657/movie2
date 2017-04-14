var Movie = require('../models/movie');
// index page
exports.index=function(req,res){
	// console.log('user in session:')
	// console.log(req.session.user)
	
	Movie.fetch(function(err,movies){
		if(err){
			return console.log(err);
		}
		res.render('index',{title:'movie 首页',movies:movies})
	})
}