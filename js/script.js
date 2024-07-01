var listaPalavras = [];
var listaPalavrasValidadas = [];

document.addEventListener("DOMContentLoaded", function() {
  var input = document.getElementById("palavraInput");
  input.addEventListener("keyup", function(event) {
      if (event.key === "Enter") {
        adicionarPalavra();
      }
  });

  var validaPalavrainput = document.getElementById("validaPalavraInput");
  validaPalavrainput.addEventListener("keyup", function(event) {
      if (event.key === "Enter" || event.key === " ") {
        validaPalavra();
      }
  });
});

function exibePalavraNaTela(palavra){
  listaPalavras.push(palavra);
  var inputPalavra = document.getElementById("palavraInput").value;
  var divExibePalavras = document.getElementById("exibePalavras");
  var novoElemento = document.createElement("p");
  novoElemento.className = "palavras";
  novoElemento.innerText = inputPalavra;
  
  var novoBotao = document.createElement("button");
  novoBotao.className = "remover fa fa-trash";
  novoBotao.onclick = function() {
    removePalavra(this, palavra);
  };
  
  var novoDiv = document.createElement("div");
  novoDiv.className = "fundoBotao";
  novoDiv.appendChild(novoBotao);
  
  divExibePalavras.appendChild(novoElemento);
  divExibePalavras.appendChild(novoDiv);
}

function adicionarPalavra() {
  var palavra = document
    .getElementById("palavraInput")
    .value.trim()
    .toUpperCase();
  
  if (palavra === "") {
    exibirAviso("Por favor, insira uma palavra." ,false);
    return false;
  }

  const regex = /^[a-zA-Z]+$/;
  if (!regex.test(palavra)) {
    exibirAviso("Por favor, insira apenas uma palavra, sem letras, números e espaços." ,false);
    return false;
  }

  if ( listaPalavras.includes(palavra) ) {
    exibirAviso("Esta palavra já foi informada." ,false);
    return;
  }
  
  exibePalavraNaTela(palavra);

  preencheTabela(palavra);
}

function preencheTabela(palavra) {
  var corpoTabela = document.getElementById("corpoTabela");

  var letras = palavra.split("");
  
  for (var j = 0; j < letras.length; j++) {
    var ultimaLetra = letras.length - 1 === j;
    var linhaJaExistente = document.getElementById("linha" + j);
    var novaLinha = criaNovaLinhaOuAtualiza(j, false, letras);

    if (!linhaJaExistente) {
      corpoTabela.appendChild(novaLinha);
    }

    if (ultimaLetra) {
      var posicaoFinal = j + 1;
      var linhaFinalJaExistente = document.getElementById("linha" + posicaoFinal);
      var linhaFinal = criaNovaLinhaOuAtualiza(posicaoFinal, true, letras);

      if (!linhaFinalJaExistente) {
        corpoTabela.appendChild(linhaFinal);
      }
    }
  }

  document.getElementById("palavraInput").value = "";
}

function criaNovaLinhaOuAtualiza(j, ultimaLetra, letras) {
  var linha = document.getElementById('linha' + j);
  if (!linha) {
    linha = document.createElement('tr');
    linha.id = 'linha' + j;
  }

  var primeiraColuna = document.getElementById('linha' + j + 'coluna0');
  if (!primeiraColuna) {
    primeiraColuna = document.createElement('td');
    primeiraColuna.id = 'linha' + j + 'coluna0';
    primeiraColuna.className = 'colunaLateral';
    linha.appendChild(primeiraColuna);
    primeiraColuna.textContent = 'q' + j + (ultimaLetra ? '*' : '');
  }

  if (ultimaLetra && !primeiraColuna.innerHTML.includes('*')) {
    primeiraColuna.innerHTML += '*';
  }

  //65 = A na tabela ascii, 90 = Z
  for (var i = 65; i <= 90; i++) {
    var letra = String.fromCharCode(i);
    var posicaoLetra = letras[j] === letra;
    var proximaSentenca = j + 1;
    var colunaId = 'coluna' + i + 'linha' + j;
    var coluna = document.getElementById(colunaId);

    if (!coluna) {
      coluna = document.createElement('td');
      coluna.id = colunaId;
      coluna.className = 'coluna';
      linha.appendChild(coluna);
    }

    if (posicaoLetra && !ultimaLetra && coluna.innerHTML === '') {
      coluna.textContent = 'q' + proximaSentenca;
    } else if (coluna.innerHTML === '') {
      coluna.innerHTML = '';
    }
  }

  return linha;
}

function removePalavra(botao, palavra){
  var divPai = botao.closest(".fundoBotao").parentNode;
  var indice = listaPalavras.indexOf(palavra);

  if (indice !== -1) {
    divPai.removeChild(botao.closest(".fundoBotao").previousElementSibling);
    divPai.removeChild(botao.closest(".fundoBotao"));
    listaPalavras.splice(indice, 1);

    document.getElementById("corpoTabela").innerHTML = '';

    listaPalavras.forEach(palavra => {
      preencheTabela(palavra);
    });
  }
}

function resetarCores() {
  var cells = document.querySelectorAll(".coluna");
  cells.forEach(function(cell) {
      cell.style.backgroundColor = "black";
  });
  var cells = document.querySelectorAll(".colunaLateral");
  cells.forEach(function(cell) {
      cell.style.backgroundColor = "#3d0f63";
  });
}

function validaUltimaLetraPalavra() {
  resetarCores();
  
  var inputPalavra = document.getElementById("validaPalavraInput").value;
  
  if (inputPalavra.length === 0) {
    return null;
  }

  var ultimoIndice = inputPalavra.length - 1;
  var ultimaLetra = inputPalavra.charAt(ultimoIndice);
  validaLetraPalavra(ultimaLetra, ultimoIndice);
}

function validaLetraPalavra(letra, indice) {
  var charCodeLetra = letra.toUpperCase().charCodeAt(0);
  var colunaId = "coluna" + charCodeLetra + "linha" + indice;
  var coluna = document.getElementById(colunaId);

  if (coluna == null) {
    return null;
  }

  if (coluna.innerHTML !== "") {
    coluna.style.backgroundColor = "green";
    return true;
  } else {
    coluna.style.backgroundColor = "red";
    return false;
  }
}

function validaPalavra() {
  var inputPalavra = document.getElementById("validaPalavraInput").value;
  inputPalavra = inputPalavra.trim();
  if (inputPalavra === "") {
    exibirAviso("Por favor, insira uma palavra." ,false);
    return false;
  }

  var letras = inputPalavra.split('');
  var isPalavraValida = true;

  letras.forEach(function(letra, indice) {
      if ( !validaLetraPalavra( letra, indice ) ) {
        isPalavraValida = false;
        return;
      }
  });

  var ultimoIndice = inputPalavra.length;
  var linhaFinal = document.getElementById("linha" + ultimoIndice + "coluna0");
  var isCorreta = false;
  if (linhaFinal && linhaFinal.innerHTML.includes("*") && isPalavraValida) {
    exibirAviso("Palavra válida", true);
    isCorreta = true;
  } else {
    exibirAviso("Palavra inválida", false);
  }
  document.getElementById('validaPalavraInput').value = "";
  listaPalavrasValidadas.push(inputPalavra);
  exibePalavraValidadaNaTela(inputPalavra, isCorreta);
}

function exibePalavraValidadaNaTela(palavra, isCorreta) {
  listaPalavras.push(palavra);
  
  var divExibePalavras = document.getElementById("exibePalavrasValidadas");
  var novoElemento = document.createElement("p");
  novoElemento.textContent = palavra;

  if (isCorreta) {
    novoElemento.classList.add("palavrasCorretas");
  } else {
    novoElemento.classList.add("palavrasIncorretas");
  }

  divExibePalavras.appendChild(novoElemento);
}

function exibirAviso(mensagem, isSucesso) {
  var warningContainer = document.getElementById("warningContainer");
  var warningDiv = document.createElement("div");
  warningDiv.classList.add("warning");
  if (isSucesso) {
      warningDiv.classList.add("success");
  } else {
      warningDiv.classList.add("error");
  }
  warningDiv.innerText = mensagem;
  warningContainer.appendChild(warningDiv);

  setTimeout(function() {
      warningDiv.remove();
  }, 5000);
}

