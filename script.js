const textArea = document.getElementById('text-area');
const criptografiaButton = document.getElementById('criptografar');
const descriptografiaButton = document.getElementById('descriptografar');
const mensagemAside = document.querySelector('.mensagem-criptografada');

function criarTextoarea() {
    const textoCriptografado = document.createElement('textarea');
    textoCriptografado.classList.add('mensagem-textarea');
    document.body.appendChild(textoCriptografado);

    return textoCriptografado;
}

criptografiaButton.addEventListener('click', function (event) {

    event.preventDefault();
    const textoDigitado = textArea.value;

});