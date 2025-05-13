let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let lastId = parseInt(localStorage.getItem('lastId')) || 0;

console.log(usuarios);

const formCdastro = document.getElementById('formCadastro')
if(formCdastro){
formCdastro.addEventListener('submit', function(e){
    e.preventDefault();
  console.log('entrei aqui');
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmSenha = document.getElementById('senhaConfirm').value;


    const e_Existente = usuarios.find(u => u.email === email);
    const nomeV = validarCampoSemNumeros(nome);

    if(nomeV == false ){
        alert("Nome invalido")
    }else if(senha !== confirmSenha){
        alert("As senhas não coencidem")
    }else  if (e_Existente) {
    alert("Email já cadastrado!");
  } else{
    const novoUsuario = {
    id: ++ lastId,
    nome,
    email,
    senha

  }
    usuarios.push(novoUsuario);
     localStorage.setItem('usuarios', JSON.stringify(usuarios));
     localStorage.setItem('lastId', lastId.toString());
     alert(`Usuário cadastrado, Bem vindo! ${novoUsuario.nome}`);
     window.location.href= 'login.html';
    this.reset();
  }

  
});
}



const formLogin = document.getElementById('formLogin');
if(formLogin){

    formLogin.addEventListener('submit' , function(e){
        e.preventDefault();
    
        const u_Email = document.getElementById('email').value;
        const u_Senha = document.getElementById('senha').value;
        const usuarioLogado = usuarios.find(u=> u.email === u_Email && u.senha === u_Senha);
        if(!usuarioLogado){
            alert("Email ou senha incorretos!")
        }else {
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
            window.location.href = 'homePage.html';
        }
    });
}

function validarCampoSemNumeros(campo) {
     const regex = /^[a-zA-Z\s]+$/; // Regex para verificar se o campo contém apenas letras e espaços
     return regex.test(campo); // Retorna true se a string corresponder à expressão regular
   };

  