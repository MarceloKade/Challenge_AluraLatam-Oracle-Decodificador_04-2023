const textArea = document.getElementById('text-area');
document.getElementById('text-area').focus();

const criptografiaButton = document.getElementById('criptografar');
const descriptografiaButton = document.getElementById('descriptografar');
const mensagemLateral = document.querySelector('.mensagem-criptografada');
let textoGlobal;

const palavraParaLetra = {
    'enter': 'e',
    'imes': 'i',
    'ai': 'a',
    'ober': 'o',
    'ufat': 'u'
};

function criarParagrafo() {
    const textoCriptografado = document.createElement('p');
    textoCriptografado.classList.add('mensagem-p');
    document.body.appendChild(textoCriptografado);

    return textoCriptografado;
}

function copy() {

    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copiar';
    copyButton.setAttribute('id', 'copy-button');

    mensagemLateral.appendChild(copyButton);

    copyButton.addEventListener('click', function (event) {
        event.preventDefault();
        const p = document.querySelector('.mensagem-p');

        // cria uma seleção de texto a partir do elemento <p>
        const range = document.createRange();
        range.selectNodeContents(p);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        // copia o conteúdo selecionado para a área de transferência
        const success = document.execCommand('copy');

        if (success) {
            console.log('Texto copiado com sucesso!');
        } else {
            console.error('Não foi possível copiar o texto.');
        }

        // remove a seleção de texto
        selection.removeAllRanges();
        document.getElementById('text-area').focus();
    });

}

criptografiaButton.addEventListener('click', function (event) {

    event.preventDefault();
    const textoDigitado = textArea.value;
    textArea.value = '';
    mensagemLateral.innerHTML = '';
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

    const textoCriptografado = criarParagrafo();
    textoCriptografado.textContent = textoGlobal;
    mensagemLateral.appendChild(textoCriptografado);
    textoCriptografado.addEventListener('input', () => {
        if (textoCriptografado.scrollHeight > textoCriptografado.offsetHeight) {
            textoCriptografado.style.height = `${textoCriptografado.scrollHeight}px`;
        }
    });

    copy()

    document.getElementById('text-area').focus();
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

    mensagemLateral.innerHTML = '';
    const textoDescriptografado = criarParagrafo();
    textoDescriptografado.textContent = textoGlobal;
    mensagemLateral.appendChild(textoDescriptografado);
    textoDescriptografado.addEventListener('input', () => {
        if (textoDescriptografado.scrollHeight > textoDescriptografado.offsetHeight) {
            textoDescriptografado.style.height = `${textoDescriptografado.scrollHeight}px`;
        }
    });

    copy()

    document.getElementById('text-area').focus();
});