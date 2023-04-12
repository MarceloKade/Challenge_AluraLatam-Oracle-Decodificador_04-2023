const textArea = document.getElementById('text-area');
const criptografiaButton = document.getElementById('criptografar');
const descriptografiaButton = document.getElementById('descriptografar');
const mensagemAside = document.querySelector('.mensagem-criptografada');
let textoGlobal;

const palavraParaLetra = {
    'enter': 'e',
    'imes': 'i',
    'ai': 'a',
    'ober': 'o',
    'ufat': 'u'
};

function criarTextoarea() {
    const textoCriptografado = document.createElement('textarea');
    textoCriptografado.classList.add('mensagem-textarea');
    document.body.appendChild(textoCriptografado);

    return textoCriptografado;
}

criptografiaButton.addEventListener('click', function (event) {

    event.preventDefault();
    const textoDigitado = textArea.value;
    textArea.value = '';
    mensagemAside.innerHTML = '';
    textoGlobal = '';

    for (let i = 0; i < textoDigitado.length; i++) {
        const letra = textoDigitado.charAt(i);
        switch (letra) {
            case 'e':
                textoGlobal += 'enter';
                break;
            case 'i':
                textoGlobal += 'imes';
                break;
            case 'a':
                textoGlobal += 'ai';
                break;
            case 'o':
                textoGlobal += 'ober';
                break;
            case 'u':
                textoGlobal += 'ufat';
                break;
            default:
                textoGlobal += letra;
                break;
        }
    }

    const textoCriptografado = criarTextoarea();
    textoCriptografado.textContent = textoGlobal;
    mensagemAside.appendChild(textoCriptografado);
});

descriptografiaButton.addEventListener('click', function (event) {
    event.preventDefault();
    const textoDigitado = textArea.value;
    textArea.value = '';
    textoGlobal = '';

    let i = 0;

    while (i < textoDigitado.length) {
        let palavraEncontrada = false;
        for (let palavra in palavraParaLetra) {
            if (textoDigitado.slice(i, i + palavra.length) === palavra) {
                textoGlobal += palavraParaLetra[palavra];
                i += palavra.length;
                palavraEncontrada = true;
                break;
            }
        }
        if (!palavraEncontrada) {
            textoGlobal += textoDigitado[i];
            i++;
        }
    }

    mensagemAside.innerHTML = '';
    const textoDescriptografado = criarTextoarea();

});