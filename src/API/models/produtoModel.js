const db = require('../databases/connection');


const produtoModel = {

create:(produto, callback)=>{
    const {nome, preco, descricao, id_restaurante, ativo, foto_produto} = produto;

if (!nome || !preco || !descricao || !id_restaurante || ativo === undefined || foto_produto === undefined) {
    return callback(new Error('Todos os campos são obrigatórios'));
}

db.run(
    `INSERT INTO produto (nome, preco, descricao, id_restaurante, ativo, foto_produto) VALUES (?, ?, ?, ?, ?, ?)`,
    [nome, preco, descricao, id_restaurante, ativo, foto_produto],
    function (err) {
        if (err) return callback(err);
        callback(null, { id: this.lastID });
    });
},

buscarProdutosPorID:(id, callback)=>{
    db.get(`SELECT * FROM produto WHERE id = ?`, [id], (err , row )=>{
        if (err) return callback(err);
            callback(null, row);
    })
},

edit:(id, produto, callback) => {
    const { nome, preco, descricao, id_restaurante, ativo, foto_produto } = produto;

    db.run(
        `UPDATE produto SET nome=?, preco=?, descricao=?, id_restaurante=?, ativo=?, foto_produto=? WHERE id=?`,
        [nome, preco, descricao, id_restaurante, ativo, foto_produto, id],
        function (err) {
            if (err) return callback(err);
            callback(null, { changes: this.changes });
        }
    );

},

delete:(id, callback)=>{
    db.run(
        `DELETE FROM produto WHERE id=?`,
        [id],
        function (err) {
            if (err) return callback(err);
            callback(null, { changes: this.changes });
        }
    );

},

list:(callback) => {
    db.all(
        `SELECT produto.id, produto.nome, produto.preco, produto.descricao, 
                produto.ativo, produto.foto_produto, restaurante.nome AS restaurante_nome 
         FROM produto 
         JOIN restaurante ON produto.id_restaurante = restaurante.id`,
        [],
        (err, rows) => {
            if (err) return callback(err);
            callback(null, rows);
        }
    );

},

}


module.exports = produtoModel;

