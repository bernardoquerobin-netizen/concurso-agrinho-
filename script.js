document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-agrinho");
    const campoResumo = document.getElementById("resumo");
    const contador = document.getElementById("contador-caracteres");
    const mensagemSucesso = document.getElementById("mensagem-sucesso");

    const limiteCaracteres = 300;

    // 1. Contador regressivo de caracteres para o resumo
    campoResumo.addEventListener("input", () => {
        const caracteresRestantes = limiteCaracteres - campoResumo.value.length;
        contador.textContent = `${caracteresRestantes} caracteres restantes`;
        
        if (caracteresRestantes <= 20) {
            contador.style.color = "red";
        } else {
            contador.style.color = "#666";
        }
    });

    // 2. Interceptação do envio do formulário
    form.addEventListener("submit", (evento) => {
        evento.preventDefault(); // Evita que a página recarregue

        // Captura os dados digitados pelo estudante
        const dadosInscricao = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            escola: document.getElementById("escola").value,
            categoria: document.getElementById("categoria").value,
            resumo: campoResumo.value
        };

        // Mostra no console do navegador os dados organizados
        console.log("Inscrição Recebida com Sucesso:", dadosInscricao);

        // Altera a interface para dar feedback visual ao usuário
        form.reset();
        contador.textContent = `${limiteCaracteres} caracteres restantes`;
        contador.style.color = "#666";
        
        mensagemSucesso.classList.remove("escondido");

        // Rola a página suavemente até a mensagem de sucesso
        mensagemSucesso.scrollIntoView({ behavior: "smooth" });

        // Esconde a mensagem após 7 segundos
        setTimeout(() => {
            mensagemSucesso.classList.add("escondido");
        }, 7000);
    });
});
