// Recupera o usuário logado do localStorage
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
const nome = usuarioLogado?.nome || "Visitante";

// Exibe o nome do usuário na página
document.getElementById("nomeUsuario").textContent = nome;

// Em caso de logout
document.querySelectorAll('.logout-link')?.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "login.html";
  });
});
