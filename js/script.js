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

function criarTextoarea() {
    const textoCriptografado = document.createElement('textarea');
    textoCriptografado.classList.add('mensagem-textarea');
    document.body.appendChild(textoCriptografado);

    return textoCriptografado;
}

function definirAltura() {
    const width = window.innerWidth;

    if (width >= 375 && width < 768) {
        mensagemLateral.style.height = '595px';
    } else if (width >= 768 && width < 1440) {
        mensagemLateral.style.height = '343px';
    } else {
        mensagemLateral.style.height = '944px';
    }
}

function copy() {

    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copiar';
    copyButton.setAttribute('id', 'copy-button');

    definirAltura();

    mensagemLateral.appendChild(copyButton);

    copyButton.addEventListener('click', function (event) {

        event.preventDefault();
        const textarea = document.querySelector('.mensagem-textarea');

        let textoCopiado = '';
        for (let i = 0; i < textoGlobal.length; i++) {
            const letra = textoGlobal.charAt(i);
            textoCopiado += letra;
        }

        textarea.value = textoCopiado;
        textarea.setAttribute('wrap', 'off');
        textarea.select();
        const success = document.execCommand('copy');

        if (success) {
            console.log('Texto copiado com sucesso!');
        } else {
            console.error('Não foi possível copiar o texto.');
        }

        window.getSelection().removeAllRanges();

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

    const textoCriptografado = criarTextoarea();
    textoCriptografado.textContent = textoGlobal;
    mensagemLateral.appendChild(textoCriptografado);

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
    const textoDescriptografado = criarTextoarea();
    textoDescriptografado.textContent = textoGlobal;
    mensagemLateral.appendChild(textoDescriptografado);

    copy()

    document.getElementById('text-area').focus();
});
window.addEventListener('resize', definirAltura);