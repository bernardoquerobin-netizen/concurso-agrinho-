window.onload = function() {
    const form = document.getElementById("form-agrinho");
    const campoResumo = document.getElementById("resumo");
    const contador = document.getElementById("contador-caracteres");
    const mensagemSucesso = document.getElementById("mensagem-sucesso");

    if(campoResumo && contador) {
        campoResumo.oninput = function() {
            let restantes = 300 - campoResumo.value.length;
            contador.textContent = restantes + " caracteres restantes";
            contador.style.color = restantes <= 20 ? "red" : "#666";
        };
    }

    if(form) {
        form.onsubmit = function(evento) {
            evento.preventDefault();
            
            if(mensagemSucesso) {
                mensagemSucesso.classList.remove("escondido");
                form.reset();
                contador.textContent = "300 caracteres restantes";
                mensagemSucesso.scrollIntoView({ behavior: "smooth" });
                
                setTimeout(function() {
                    mensagemSucesso.classList.add("escondido");
                }, 5000);
            }
        };
    }
};
