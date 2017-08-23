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

exports.redimir = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = input.id;
    var puntos =input.puntos;
    console.log(req.body);
    req.getConnection(function (err, connection) {
        
        /*var data = {
            
            saldo_cashback : input.puntos
        
        };*/
        
        connection.query("UPDATE clientes set saldo_cashback = saldo_cashback - ? WHERE idcliente = ? ",[puntos,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/clientes');
          
        });
    
    });
};

exports.acumular = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = input.id;
    var puntos =input.puntos;
    console.log(req.body);
    req.getConnection(function (err, connection) {
        
        /*var data = {
            
            saldo_cashback : input.puntos
        
        };*/
        
        connection.query("UPDATE clientes set saldo_cashback = saldo_cashback + ? WHERE idcliente = ? ",[puntos,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/clientes');
          
        });
    
    });
};