var listaPalavras = [];

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
      alert("Por favor, insira uma palavra.");
      return;
    }
    const regex = /^[a-zA-Z]+$/;
    if (!regex.test(palavra)) {
      alert("Por favor, insira apenas uma palavra, sem letras, números e espaços.");
      return;
    }

    if ( listaPalavras.includes(palavra) ) {
      alert("Esta palavra já foi informada.");
      return;
    }
    
    exibePalavraNaTela(palavra);

    preencheTabela(palavra);
  }

  function preencheTabela (palavra) {
    var corpoTabela = document.getElementById("corpoTabela");
    var linhas = corpoTabela.getElementsByTagName("tr");
    for (var i = 0; i < linhas.length; i++) {
      if (linhas[i].cells[0].innerText === palavra) {
        alert("Esta palavra já foi adicionada.");
        return;
      }
    }

    var letras = palavra.split("");
    var novaLinhas = "";
    for (var j = 0; j < letras.length; j++) {
      var ultimaLetra = letras.length - 1 === j;
      var linhaJaExistente = document.getElementById("linha" + j);
      var novaLinha = "<tr id='linha" + j + "'><td id='linha" + j + "coluna0' class='colunaLateral'>q" + j + (ultimaLetra ? "*" : "") + "</td>";
      var primeiraColunaJaExistente = document.getElementById("linha" + j + "coluna0");
      if ( ultimaLetra && primeiraColunaJaExistente && !primeiraColunaJaExistente.innerHTML.includes("*") ) {
        primeiraColunaJaExistente.innerHTML += "*";
      }
          for (var i = 65; i <= 90; i++) {
            var letra = String.fromCharCode(i);
            var posicaoLetra = letras[j] === letra;
            var colunaJaExistente = document.getElementById("coluna" + i + "linha" + j);
            novaLinha += "<td id='coluna" + i + "linha" + j + "'>" + (!colunaJaExistente && posicaoLetra ? "q" + j : "") + "</td>";
            if ( colunaJaExistente && posicaoLetra && colunaJaExistente.innerHTML === "" ) {
              colunaJaExistente.innerHTML += "q" + j;
            }
      }
      novaLinha += "</tr>";
      if ( !linhaJaExistente ) {
        novaLinhas += novaLinha;
      }
    }
      corpoTabela.innerHTML += novaLinhas;

    document.getElementById("palavraInput").value = "";
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