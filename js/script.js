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
