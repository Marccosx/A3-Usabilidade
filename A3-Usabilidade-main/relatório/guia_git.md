
# 📘 Passo a passo: Clonar e Atualizar o Projeto Git

## 🔹 Primeira vez usando o repositório

Se você ainda **não tem o repositório clonado na sua máquina**, siga os passos abaixo:

1. **Escolha a pasta onde deseja clonar o projeto**.
2. **Abra essa pasta no VS Code**.
3. No menu superior do VS Code, clique em `Terminal` > `Novo Terminal`.
4. Execute o comando:

   ```bash
   git clone https://github.com/Marccosx/A3-Usabilidade
   ```

5. Após o clone, o VS Code exibirá a pasta `A3-Usabilidade` no painel lateral.
6. Acesse a pasta pelo terminal com:

   ```bash
   cd A3-Usabilidade
   ```

7. (Opcional, e geralmente desnecessário após um clone) Se necessário, inicialize o repositório com:

   ```bash
   git init
   ```

---

## 📁 Estrutura do Projeto

Ao abrir a pasta `A3-Usabilidade`, você encontrará a seguinte estrutura:

- **`relatorio/`** – Contém a documentação e relatórios do projeto.
- **`src/`** – Diretório principal do projeto, que inclui:
  - **`css/`** – Arquivos de estilos (CSS).
  - **`script/`** – Arquivos JavaScript.
  - **`assets/`** – Imagens e outros recursos estáticos.
- Arquivos `.html` soltos na raiz do projeto.

---

## 📝 Após editar arquivos

Sempre que fizer alterações, os arquivos modificados aparecerão destacados no VS Code e também na aba de Git (ícone de ramificação na lateral esquerda). Isso indica que o projeto está sendo **versionado**.

---

## 🚀 Como enviar suas alterações para o GitHub

Antes de fazer o push, **verifique se outra pessoa está usando ou alterando os mesmos arquivos** para evitar conflitos.

### Primeira vez usando Git na máquina:

Se for sua **primeira vez contribuindo**, configure seu nome e email com:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

Depois, execute:

```bash
git checkout -m main
git pull
```

### Etapas padrão para subir alterações:

1. Verifique os arquivos modificados:

   ```bash
   git status
   ```

2. Adicione todos os arquivos:

   ```bash
   git add .
   ```

   Ou adicione apenas um arquivo específico:

   ```bash
   git add nome-do-arquivo.html
   ```

3. Crie um commit com uma mensagem descritiva:

   ```bash
   git commit -m "Descreva aqui o que foi alterado, ex: ajusta estilos da home page"
   ```

4. Envie para o GitHub:

   ```bash
   git push
   ```

---

## ✅ Dicas finais

- Use **mensagens de commit claras e objetivas**.
- Verifique a aba de Git no VS Code para visualizar diferenças entre versões e arquivos alterados.
- Sempre execute `git pull` antes de começar alterações para garantir que está com a versão mais recente do projeto.
