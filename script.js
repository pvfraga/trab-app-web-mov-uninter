// Aguarda o carregamento completo antes de executar qualquer script
document.addEventListener('DOMContentLoaded', () => {

    // 1. ALTERNÂNCIA DE TEMA CLARO / ESCURO
    const btn = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');
    const body = document.body;

    // Ao clicar no botão, troca o atributo data-theme no <body>.
    // O CSS usa esse atributo para aplicar as variáveis de cor corretas.
    btn.addEventListener('click', () => {
        const isDark = body.getAttribute('data-theme') === 'dark';

        if (isDark) {
            body.setAttribute('data-theme', 'light');
            icon.innerText = '🌙'; // Ícone indica que clicar volta ao escuro
        } else {
            body.setAttribute('data-theme', 'dark');
            icon.innerText = '☀️'; // Ícone indica que clicar volta ao claro
        }
    });

    // 2. EFEITO DE DIGITAÇÃO NO TÍTULO
    const h1 = document.querySelector('h1');
    const txt = h1.innerText; // Salva o texto original
    h1.innerText = '';        // Limpa o h1 para simular a digitação
    let i = 0;

    // Adiciona um caractere por vez a cada 50ms
    function type() {
        if (i < txt.length) {
            h1.innerHTML += txt.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    type();

    // 3. VALIDAÇÃO E SIMULAÇÃO DE ENVIO DO FORMULÁRIO
    const form = document.getElementById('form-contato');
    const feedback = document.getElementById('feedback-form');

    // Regex para verificar se o e-mail possui formato válido (ex: usuario@dominio.com)
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener('submit', (event) => {
        // Impede o comportamento padrão de recarregar a página ao enviar o formulário
        event.preventDefault();

        // Lê os valores dos campos, removendo espaços em branco nas extremidades
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        // --- Validação dos campos ---

        if (nome === '') {
            exibirErro('Por favor, preencha o campo Nome.');
            return;
        }

        if (email === '') {
            exibirErro('Por favor, preencha o campo E-mail.');
            return;
        }

        if (!regexEmail.test(email)) {
            exibirErro('Informe um e-mail válido (ex: usuario@dominio.com).');
            return;
        }

        if (mensagem === '') {
            exibirErro('Por favor, preencha o campo Mensagem.');
            return;
        }

        // --- Simulação de envio bem-sucedido ---
        // Limpa todos os campos do formulário
        form.reset();

        // Exibe mensagem de confirmação ao usuário
        feedback.textContent = 'Mensagem enviada com sucesso! Entrarei em contato em breve.';
        feedback.className = 'sucesso';

        // Remove a mensagem de confirmação após 5 segundos
        setTimeout(() => {
            feedback.textContent = '';
            feedback.className = '';
        }, 5000);
    });

    // Função auxiliar para exibir mensagem de erro no formulário
    function exibirErro(mensagemErro) {
        feedback.textContent = mensagemErro;
        feedback.className = 'erro';
    }

});
