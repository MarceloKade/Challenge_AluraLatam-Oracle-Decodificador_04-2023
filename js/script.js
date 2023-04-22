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

function mensagemTemporaria(textoTemporario) {
    const mensagemTemporariaExistente = document.querySelector('.mensagem-temporaria');
    if (mensagemTemporariaExistente) {
        document.body.removeChild(mensagemTemporariaExistente);
    }

    const mensagemTemporaria = document.createElement('p');
    mensagemTemporaria.classList.add('mensagem-temporaria');
    mensagemTemporaria.textContent = textoTemporario;

    document.body.appendChild(mensagemTemporaria);

    setTimeout(() => {
        if (mensagemTemporaria.parentNode) {
            mensagemTemporaria.parentNode.removeChild(mensagemTemporaria);
        }
    }, 2000);
    return mensagemTemporaria;
}

function imagemVoltando() {
    const img = document.createElement('img');
    img.id = 'procurando';
    img.src = 'assets/img/procurando.svg';
    img.alt = 'Imagem de busca';
    mensagemLateral.appendChild(img);

    const div = document.createElement('div');
    div.classList.add('mensagem');
    mensagemLateral.appendChild(div);

    const h2 = document.createElement('h2');
    h2.id = 'sem-mensagem';
    div.appendChild(h2);
    h2.textContent = "Nenhuma mensagem encontrada";

    const p = document.createElement('p');
    p.id = 'texto-criptografado';
    div.appendChild(p);
    p.textContent = "Digite um texto que você deseja criptografar ou descriptografar";

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
            mensagemTemporaria("Texto copiado com sucesso")
        } else {
            mensagemTemporaria("Não conseguiu copiar o texto")
        }
        mensagemLateral.innerHTML = '';
        imagemVoltando()

        // remove a seleção de texto
        selection.removeAllRanges();
        document.getElementById('text-area').focus();
    });

}

criptografiaButton.addEventListener('click', function (event) {

    event.preventDefault();
    // Verifica se o campo de texto está vazio
    if (!textArea.value.trim()) {
        mensagemTemporaria('Campo de texto vazio');
        document.getElementById('text-area').focus();

        return;
    }

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
    mensagemTemporaria("Texto criptografado")
    document.getElementById('text-area').focus();

});

descriptografiaButton.addEventListener('click', function (event) {
    event.preventDefault();
    if (!textArea.value.trim()) {
        mensagemTemporaria('Campo de texto vazio');
        document.getElementById('text-area').focus();

        return;
    }

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
    mensagemTemporaria("Texto descriptografado")


    document.getElementById('text-area').focus();
});