var pool = require('./bd');

async function getDisponible(){
    var query = "select * from disponible order by id desc";
    var rows = await pool.query(query);
    return rows;
}

async function deleteDisponibleById(id){
    var query = "delete from disponible where id= ? ";
    var rows = await pool.query(query,[id]);
    return rows;
}

async function insertDisponible(obj){
    try{
        var query = "insert into disponible set ? ";
        var rows = await pool.query(query,[obj]);
        return rows;        
    }catch(error){
        console.log(error);
        throw error;
    }
}

async function getDisponibleById(id){
    var query = "Select * from disponible where id = ? ";
    var rows = await pool.query(query,[id]);
    return rows[0];
}

async function modificarDisponibleById(obj,id){
    try{
        var query = "update disponible set ? where id=?";
        var rows = await pool.query(query,[obj,id]);
        return rows;
    }catch(error){
        throw error;
    }
}

async function buscarDisponible(busqueda){
    var query = "select * from disponible where año like ? OR mes like ? OR fechas like ?"
    var rows = await pool.query(query,['%'+busqueda+'%','%'+busqueda+'%','%'+busqueda+'%']);
    return rows;
}

module.exports = {getDisponible,deleteDisponibleById,insertDisponible,getDisponibleById,modificarDisponibleById,buscarDisponible}