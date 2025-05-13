// Simula pegar nome do usuário (pode ser expandido)
const nome = localStorage.getItem("usuarioNome") || "Visitante";
console.log("Usuário logado como:", nome);

// Em caso de logout
document.querySelectorAll('.logout-link')?.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "login.html";
  });
});
