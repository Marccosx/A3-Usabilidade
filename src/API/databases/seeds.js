const db = require('./connection');

db.serialize(() => {

  
    const grupos = [
        { id: 1, nome: 'super admin' },
        { id: 2, nome: 'dono de restaurante' },
        { id: 3, nome: 'cliente' }
    ];
    grupos.forEach(grupo=>{
      db.run(`INSERT INTO grupo (id, nome) VALUES (?,?)`, [grupo.id, grupo.nome]);
    })

  const formas_pagamento = [
        { id: 1, descricao: 'Cartão de Crédito' },
        { id: 2, descricao: 'Cartão de Débito' },
        { id: 3, descricao: 'Dinheiro' },
        { id: 4, descricao: 'Pix' }];
  formas_pagamento.forEach(forma => {
    db.run(`INSERT INTO forma_pagamento (id, descricao) VALUES (?,?)` , [forma.id, forma.descricao]);
  })

   const estados = [
    { id: 1, nome: 'Acre', sigla: 'AC' },
    { id: 2, nome: 'Alagoas', sigla: 'AL' },
    { id: 3, nome: 'Amapá', sigla: 'AP' },
    { id: 4, nome: 'Amazonas', sigla: 'AM' },
    { id: 5, nome: 'Bahia', sigla: 'BA' },
    { id: 6, nome: 'Ceará', sigla: 'CE' },
    { id: 7, nome: 'Distrito Federal', sigla: 'DF' },
    { id: 8, nome: 'Espírito Santo', sigla: 'ES' },
    { id: 9, nome: 'Goiás', sigla: 'GO' },
    { id: 10, nome: 'Maranhão', sigla: 'MA' },
    { id: 11, nome: 'Mato Grosso', sigla: 'MT' },
    { id: 12, nome: 'Mato Grosso do Sul', sigla: 'MS' },
    { id: 13, nome: 'Minas Gerais', sigla: 'MG' },
    { id: 14, nome: 'Pará', sigla: 'PA' },
    { id: 15, nome: 'Paraíba', sigla: 'PB' },
    { id: 16, nome: 'Paraná', sigla: 'PR' },
    { id: 17, nome: 'Pernambuco', sigla: 'PE' },
    { id: 18, nome: 'Piauí', sigla: 'PI' },
    { id: 19, nome: 'Rio de Janeiro', sigla: 'RJ' },
    { id: 20, nome: 'Rio Grande do Norte', sigla: 'RN' },
    { id: 21, nome: 'Rio Grande do Sul', sigla: 'RS' },
    { id: 22, nome: 'Rondônia', sigla: 'RO' },
    { id: 23, nome: 'Roraima', sigla: 'RR' },
    { id: 24, nome: 'Santa Catarina', sigla: 'SC' },
    { id: 25, nome: 'São Paulo', sigla: 'SP' },
    { id: 26, nome: 'Sergipe', sigla: 'SE' },
    { id: 27, nome: 'Tocantins', sigla: 'TO' }
  ];

  estados.forEach(estado => {
    db.run(`INSERT INTO estado (id, nome, sigla) VALUES (?, ?, ?)`, [estado.id, estado.nome, estado.sigla]);
  });
  

  const perimssoes = [
  { id: 1, nome: 'cadastrar restaurante' },
  { id: 2, nome: 'editar restaurante' },
  { id: 3, nome: 'deletar restaurante' },
  { id: 4, nome: 'visualizar restaurante' },
  { id: 5, nome: 'cadastrar forma de pagamento' },
  { id: 6, nome: 'editar forma de pagamento' },     
  { id: 7, nome: 'deletar forma de pagamento' }, 
  { id: 8, nome: 'visualizar forma de pagamento' },
  { id: 9, nome: 'cadastrar endereço' },
  { id: 10, nome: 'editar endereço' },
  { id: 11, nome: 'deletar endereço' },
  { id: 12, nome: 'visualizar endereço' },
  {id: 13, nome: 'cadastrar pedido'},
  { id: 14, nome: 'editar pedido' },
  { id: 15, nome: 'deletar pedido' },
  { id: 16, nome: 'visualizar pedido' },
  { id: 17, nome: 'cadastrar usuário' },
  { id: 18, nome: 'editar usuário' },
  { id: 19, nome: 'deletar usuário' },
  { id: 20, nome: 'visualizar usuário' },
];
perimssoes.forEach(permissao => {
  db.run(`INSERT INTO permissao (id, nome) VALUES (?, ?)`, [permissao.id, permissao.nome]);
});
 
const grupos_permissoes = [ 
  {    id_grupo: 1,
    id_permissao: 1
  },
  {
    id_grupo: 1,
    id_permissao: 2
  },
  {
    id_grupo: 1,
    id_permissao: 3
  },
  {
    id_grupo: 1,
    id_permissao: 4
  },
  {
    id_grupo: 1,
    id_permissao: 5
  },
  {
    id_grupo: 1,
    id_permissao: 6
  },
  {
    id_grupo: 1,
    id_permissao: 7
  },
  {
    id_grupo: 1,
    id_permissao: 8
  },
  {
    id_grupo: 1,
    id_permissao: 9
  },
  {
    id_grupo: 1,
    id_permissao: 10
  },
  {
    id_grupo: 1,
    id_permissao: 11
  },
  {
    id_grupo: 1,
    id_permissao: 12
  },
  {
    id_grupo: 1,
    id_permissao: 13
  },
  {
    id_grupo: 1,
    id_permissao: 14
  },
  {
    id_grupo: 1,
    id_permissao: 15
  },
  {
    id_grupo: 1,
    id_permissao: 16
  },
  {
    id_grupo: 1,
    id_permissao: 17
  },
  {
    id_grupo: 1,
    id_permissao: 18
  },
  {
    id_grupo: 1,
    id_permissao: 19
  },
  {
    id_grupo: 1,
    id_permissao: 20
  },
  {
    id_grupo: 3,
    id_permissao: 13
  },
  {
    id_grupo: 3,
    id_permissao: 14
  },
  {
    id_grupo: 3,
    id_permissao: 15
  },
  {
    id_grupo: 3,
    id_permissao: 4
  },
  { id_grupo: 3,
    id_permissao: 8
  },
  {
    id_grupo:2,
    id_permissao: 1
  },
  { 
    id_grupo: 2,
    id_permissao: 2
  },
  {
    id_grupo: 2,
    id_permissao: 3
  },
  {
    id_grupo: 2,
    id_permissao: 4
  },
  {
    id_grupo: 2,
    id_permissao: 5
  },
  {
    id_grupo: 2,
    id_permissao: 8
  },
  {
    id_grupo: 2,
    id_permissao: 9
  },
  {
    id_grupo: 2,
    id_permissao: 10
  },
  {
    id_grupo: 2,
    id_permissao: 11
  },
  {
    id_grupo: 2,
    id_permissao: 12
  },
  {
    id_grupo: 2,
    id_permissao: 13
  },
  {
    id_grupo: 2,
    id_permissao: 14
  },
  {
    id_grupo: 2,
    id_permissao: 15
  },
  {
    id_grupo: 2,
    id_permissao: 16
  }
 
];

grupos_permissoes.forEach(grupo_permissao => {
  db.run(
    `INSERT OR IGNORE INTO grupo_permissao (id_grupo, id_permissao) VALUES (?, ?)`,
    [grupo_permissao.id_grupo, grupo_permissao.id_permissao]
  );
});

  const status_pedido = [
    { id: 1, nome: 'Pendente' },
    { id: 2, nome: 'Em Preparação' },
    { id: 3, nome: 'Cancelado' },
    { id: 4, nome: 'Pronto para retirada' },
  ];
  status_pedido.forEach(status => {
    db.run(`INSERT INTO status_pedido (id, nome) VALUES (?, ?)`, [status.id, status.nome]);
  });
console.log('Dados inseridos ao banco com sucesso!');
});
db.close();