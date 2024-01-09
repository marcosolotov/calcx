function calcular(){

    let taxaJuros;
    let juros;
    let capital;
    let tempo;
    let montante;
    let aporte;
    let i = 1;
    let valorInvestido;
    let unidadePeriodo;
    let select;
    let tempoJuros;
    let unidadeTempo = ' Mês';
    let conteudo = [];
    
    /*capturando dados*/
    capital = parseFloat(document.getElementById('valor-inicial').value);
    aporte = parseFloat(document.getElementById('valor-mensal').value);
    taxaJuros = parseFloat(document.getElementById('taxa-juros').value);
    tempo = parseFloat(document.getElementById('periodo').value);
    select = document.getElementById('unidade-periodo');
    unidadePeriodo = select.options[select.selectedIndex].value;
    select = document.getElementById('tempo-juros');
    tempoJuros = select.options[select.selectedIndex].value;

    if(unidadePeriodo == 1){
        tempo = tempo * 12;
        unidadeTempo = ' Ano';
        document.getElementById('periodo-res').innerHTML = (tempo / 12) + unidadeTempo;
    } else {
        document.getElementById('periodo-res').innerHTML = (tempo) + unidadeTempo;
    }
    if(tempoJuros == 1){
        taxaJuros = taxaJuros / 1200;
        document.getElementById('taxa-juros-res').innerHTML = (taxaJuros*100*12).toFixed(2) + ' % ao ano';
        conteudo.push(['Tempo (Mês)', 'Montante (R$)', 'Juros (R$)']);
    } else {
        taxaJuros = taxaJuros / 100;
        document.getElementById('taxa-juros-res').innerHTML = (taxaJuros*100).toFixed(2) + ' % ao mês';
        conteudo.push(['Tempo (Ano)', 'Montante (R$)', 'Juros (R$)']);
    }

    /*devolvendo dados*/
    document.getElementById('valor-inicial-res').innerHTML = capital.toLocaleString("pt", {style: "currency", currency: "BRL"});
    document.getElementById('valor-mensal-res').innerHTML = aporte.toLocaleString("pt", {style: "currency", currency: "BRL"});

    montante = ( capital + aporte ) * ( taxaJuros + 1 );
    valorInvestido = capital + aporte;
    
    conteudo.push([i, montante.toFixed(2), 0]);

    for(i = 2; i <= tempo; i++){
        montante = ( montante + aporte ) * ( taxaJuros + 1 );
        valorInvestido += aporte;
        juros = montante - valorInvestido;
        conteudo.push([
            i, 
            montante.toFixed(2), 
            juros.toFixed(2)
        ])
    }
    juros = montante - valorInvestido;

    //cria tabela
    document.getElementById("tabela").appendChild(criarTabela(conteudo));

    document.getElementById('valor-total-final').innerHTML = montante.toLocaleString("pt", {style: "currency", currency: "BRL"});
    document.getElementById('valor-total-investido').innerHTML = valorInvestido.toLocaleString("pt", {style: "currency", currency: "BRL"});
    document.getElementById('total-juros').innerHTML = juros.toLocaleString("pt", {style: "currency", currency: "BRL"});

}

function scrollToBottom() {
    window.scrollTo(0,720);
}

function scrollToTop() {
    window.scrollTo(0,document.body.scrollTop);
}

function clearForm() {
    document.getElementById('myform').reset();
}

function clearTable() {
    let remove = document.getElementById('tabela-feita');
    remove.remove();
}

function criarTabela(conteudo) {
    let tabela = document.createElement("table");
    tabela.id = 'tabela-feita';
    let thead = document.createElement("thead");
    let tbody=document.createElement("tbody");
    let thd=function(i){return (i==0)?"th":"td";};
    for (var i=0;i<conteudo.length;i++) {
      let tr = document.createElement("tr");
      for(var o=0;o<conteudo[i].length;o++){
        let t = document.createElement(thd(i));
        let texto=document.createTextNode(conteudo[i][o]);
        t.appendChild(texto);
        tr.appendChild(t);
      }
      (i==0)?thead.appendChild(tr):tbody.appendChild(tr);
    }
    tabela.appendChild(thead);
    tabela.appendChild(tbody);
    return tabela;
  }