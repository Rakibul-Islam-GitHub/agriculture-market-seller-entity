const express 	= require('express');
const router 	= express.Router();

router.get('/', (req, res)=>{

	//req.session.uname = "";
	//res.cookie('uname', '');
	
	res.clearCookie('uname');
	req.session.userid="";
	//res.redirect('/');
	res.send('logout');
	
});


module.exports = router;



