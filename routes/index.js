/*
 * GET clientes listing.
 */
exports.index = function(req, res){
  req.getConnection(function(err,connection){
       
     connection.query('SELECT nombre,apellido1, saldo_cashback FROM clientes',function(err,rows)     {
            
        if(err)
           console.log("Error Selecting : %s ",err );
     
            res.json(rows);
                           
         });
       
    });
  
};