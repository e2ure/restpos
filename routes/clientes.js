/*
 * GET clientes listing.
 */
exports.list = function(req, res){
  req.getConnection(function(err,connection){
       
     connection.query('SELECT nombre,apellido1, saldo_cashback FROM clientes',function(err,rows)     {
            
        if(err)
           console.log("Error Selecting : %s ",err );
     
            res.json(rows);
                           
         });
       
    });
  
};
exports.add = function(req, res){
  res.render('add_clientes',{page_title:"Add Clientes-Node.js"});
};
exports.edit = function(req, res){
    
  var id = req.params.id;
    
  req.getConnection(function(err,connection){
       
     connection.query('SELECT nombre,apellido1, saldo_cashback FROM clientes WHERE idcliente = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.json(rows);
                           
         });
                 
    }); 
};
/*Save the clientes*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            name    : input.name,
            address : input.address,
            email   : input.email,
            phone   : input.phone 
        
        };
        
        var query = connection.query("INSERT INTO clientes set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/clientes');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};/*Save edited clientes*/
exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            name    : input.name,
            address : input.address,
            email   : input.email,
            phone   : input.phone 
        
        };
        
        connection.query("UPDATE clientes set ? WHERE idcliente = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/clientes');
          
        });
    
    });
};

exports.delete_clientes = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM clientes  WHERE idcliente = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/clientes');
             
        });
        
     });
};