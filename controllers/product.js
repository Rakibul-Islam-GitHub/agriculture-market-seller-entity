const express       	= require('express');
const multer            = require('multer');
const path              = require('path');
const productModel		= require.main.require('./models/productModel');
const { check, validationResult } = require('express-validator');


const app=express();
const router 	= express.Router();




router.get('/:id', function(req,res){
    let id= req.params.id;
    productModel.getByProductId(id, function(results){

        if(results.length >0){
        var title = results[0].title;
		var price = results[0].price;
        var description = results[0].description;
        var image = results[0].image;
          
		res.render('landingpage/postdetails', {title: title, price: price, description : description,image: image});
		

        }
		
	});


});


var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, 'assets/image/')
	},
	filename: function (req, file, cb) {
	  cb(null, Date.now() + path.extname(file.originalname)) 
	}
  });
  var upload = multer({ storage: storage });


router.get('/additem', function(req, res){

	
	res.render('seller/additems', {success: ''});

});

router.post('/additem', upload.single('pic'), [
    check('title').not().isEmpty().withMessage('Please enter a product title'),
	check('price', 'Price should be numeric').isNumeric(),
	check('description', 'Enter a product description').not().isEmpty()
	
    
  ], function(req, res){

	const errors = validationResult(req);
	console.log(errors);
	let success =0;
	
	

    if (!errors.isEmpty()) {
		alerts = errors.array();
		res.render('seller/additems', {alerts, success: ''});
      
    } else{
		let item={
			sellerid : req.cookies['uname'],	
			title : req.body.title,
			price : req.body.price,
			description: req.body.description,
			image: req.file.filename
			
	
		};
		sellerModel.insert(item, function(status){

			if(status){
				
				
				res.render('seller/additems', {success : 'Item addedd successfully'});
			}else{
				//res.redirect('/');
	
			}
	
		});



		
		

		
		

	}

});

router.get('/manageitem', function(req, res){

	sellerModel.getAll(function(results){

        if(results.length >0){
          
		res.render('seller/manageitem', {items: results});
		

        }
		
	});

	
	

});

router.get('/manageitem/delete/:id', function(req, res){
	
	//console.log(req.body.itemid);
	let id= req.params.id;
	sellerModel.getByProductId(id, function(results){
		
		var title = results[0].title;
		var price = results[0].price;
		var description = results[0].description;
		
		res.render('seller/deleteitem', {title: title, price: price,  description: description});

		
	});

	
 });

 router.post('/manageitem/delete/:id', function(req, res){

	let id= req.params.id;
	sellerModel.delete(id, function(status){
        if(status){
			console.log('item deleted');
			
			res.redirect('/seller/manageitem');
        }else{
			// res.send('<h1>Something wrong! Try again </h1>');
			console.log('error to delete itam');
        }

        
        
	});

 });



router.get('/manageitem/edit/:id', function(req, res){
	let id= req.params.id;

	   sellerModel.getByProductId(id, function(results){
		
		var title = results[0].title;
		var price = results[0].price;
		var description = results[0].description;
		
		


		res.render('seller/edititem', {title: title, price: price,  description: description});

		
	});
	 
	 
 
 });


router.post('/profile', [
    check('name').not().isEmpty().withMessage('Name can not be empty'),
	check('address', 'Please fill the address').not().isEmpty(),
	check('phone', 'Enter a product description').isNumeric().isLength({min:11, max:11}).withMessage('Phone number should have 11 digits'),
	check('email', 'Invalid email address').isEmail(),
    
  ], function(req, res){
	const errors = validationResult(req);
	console.log(errors);
	

    if (!errors.isEmpty()) {
		profilealerts = errors.array();
		sellerModel.getprofile(req.session.userid, function(results){
		
			var name = results[0].name;
			var address = results[0].address;
			var phone = results[0].phone;
			var image = results[0].image;
			var email = results[0].email;
			
			res.render('seller/profile', {profilealerts, name: name, address: address,  phone: phone, image: image, email: email});
			//res.render('seller/profile', {alerts});
			
		});
		
      
    } else{
		let id= req.session.userid;
	let details={
		id: req.session.userid,
        name : req.body.name,
        address : req.body.address,
		phone: req.body.phone,
		email: req.body.email
    };
    

        sellerModel.profileUpdate(details, function(status){
        if(status){
            console.log('profile details updated');
			res.redirect('/seller/profile');
        }else{

        }

    });
	

	}
	
});



module.exports = router;
