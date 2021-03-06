const db = require('./db');

module.exports= {

	validate: function(user, callback){
		//var sql = `select * from user where username="${user.username}" and password="${user.password}"`;
		let sql= 'select * from users where username="'+user.username+'" and password="'+user.password+'" ';
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	
	getById: function(id, callback){
		var sql = 'select * from items where sellerid = "'+id+'" ';
		db.getResults(sql, function(results){
			callback(results);
		});

	}, 
	getByProductId: function(id, callback){
		var sql = 'select * from items where id = "'+id+'" ';
		db.getResults(sql, function(results){
			callback(results);
		});

	}, 
	getorderlist: function(id, callback){
		var sql = 'select * from orders where sellerid= "'+id+'" ';
		db.getResults(sql, function(results){
			callback(results);
		});
	},

	getcompleteorder: function(id, callback){
		var sql = 'select * from orders where sellerid= "'+id+'" and status="complete" ';
		db.getResults(sql, function(results){
			callback(results);
		});
	},

	getAll: function(callback){
		var sql = "select * from items";
		db.getResults(sql, function(results){
			callback(results);
		});
	},

	getprofile: function(id, callback){
		var sql = 'select * from sellers where s_id = "'+id+'" ';
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert: function(item, callback){

		let sql= 'insert into items (sellerid, title, price, description, image) values ("'+item.sellerid+'","'+item.title+'", "'+item.price+'", "'+item.description+'", "'+item.image+'")';
		db.execute(sql, function(status){

			if(status){
				callback(true);

			}else{
				callback(false);
			}

		});

	},
	update:function(item, callback){

		let sql= 'update items set title= "'+item.title+'", price= "'+item.price+'", description= "'+item.description+'", image="'+item.image+'" where id= "'+item.id+'"';
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});

	},

	orderConfirm: function(id, callback){

		let sql= 'update orders set status="complete" where orderid= "'+id+'"';
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});

	},

	profileUpdate:function(item, callback){

		if(item.image!=undefined){
			let sql= 'update sellers set image= "'+item.image+'" where s_id= "'+item.id+'"';
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});

		} else{
			let sql= 'update sellers set name= "'+item.name+'", address= "'+item.address+'", phone= "'+item.phone+'", email="'+item.email+'" where s_id= "'+item.id+'"';
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});

		}

		

	},
	getcommentBysellerId : function(id, callback){
		var sql = 'SELECT * from comments where sellerid = "'+id+'"';
		db.getResults(sql, function(results){
			callback(results);
		});

	},

	search: function(content, callback){
		var sql = 'SELECT name from items where title like "%'+content+'%"';
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	delete: function(id, callback){
		let sql= 'delete from items where id= "'+id+'" ';
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});

	}
}