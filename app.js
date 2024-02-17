function calcular(){

    let taxaJuros;
    let totalJuros;
    let capital;
    let tempo;
    let montante;
    let aporte;
    let juros;
    let i = 0;
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

    if(capital == ""){
        capital = 0
    }
    if(aporte == ""){
        aporte = 0;
    }
    if(taxaJuros == ""){
        taxaJuros = 0;
    }
    if(tempo == ""){
        tempo = 0;
    }

    if(unidadePeriodo == 1){
        tempo = tempo * 12;
        unidadeTempo = ' Ano';
        document.getElementById('periodo-res').innerHTML = (tempo / 12) + unidadeTempo;
    } else {
        document.getElementById('periodo-res').innerHTML = (tempo) + unidadeTempo;
    }
    if(tempoJuros == 1){
        taxaJuros = (Math.pow((1 + taxaJuros/100), (1/12)) - 1);
        document.getElementById('taxa-juros-res').innerHTML = (100*(Math.pow((taxaJuros + 1), 12) - 1)).toFixed(2) + ' % ao ano';
        conteudo.push(['Tempo (Mês)', 'Juros (R$)', 'Total Investido (R$)', 'Total Juros (R$)', 'Total acumulado (R$)']);
    } else {
        taxaJuros = taxaJuros / 100;
        document.getElementById('taxa-juros-res').innerHTML = (taxaJuros*100).toFixed(2) + ' % ao mês';
        conteudo.push(['Tempo (Mês)', 'Juros (R$)', 'Total Investido (R$)', 'Total Juros (R$)', 'Total acumulado (R$)']);
    }

    /*devolvendo dados*/
    document.getElementById('valor-inicial-res').innerHTML = capital.toLocaleString("pt", {style: "currency", currency: "BRL"});
    document.getElementById('valor-mensal-res').innerHTML = aporte.toLocaleString("pt", {style: "currency", currency: "BRL"});

    montante = capital;
    totalJuros = 0;
    juros = 0;
    valorInvestido = capital;
    conteudo.push([i, juros.toFixed(2), valorInvestido.toFixed(2), totalJuros.toFixed(2), montante.toFixed(2)]);

    let conta = 1
    i++;
    montante = capital * ( taxaJuros + 1 );
    montante += aporte;
    valorInvestido = capital + aporte;
    totalJuros = capital * taxaJuros;
    juros = capital * taxaJuros;
    conteudo.push([i, juros.toFixed(2), valorInvestido.toFixed(2), totalJuros.toFixed(2), montante.toFixed(2)]);

    for(i = 2; i <= tempo; i++){
        montante = montante * ( taxaJuros + 1 );
        juros = montante * taxaJuros;
        montante += aporte;
        valorInvestido += aporte;
        totalJuros = montante - valorInvestido;
        conteudo.push([i, juros.toFixed(2), valorInvestido.toFixed(2), totalJuros.toFixed(2), montante.toFixed(2)]);
        if(conta == 12){
            aporte = aporte*1.05;
            conta = 0
        }
        conta++
    }
    totalJuros = montante - valorInvestido;

    document.getElementById('valor-total-final').innerHTML = montante.toLocaleString("pt", {style: "currency", currency: "BRL"});
    document.getElementById('valor-total-investido').innerHTML = valorInvestido.toLocaleString("pt", {style: "currency", currency: "BRL"});
    document.getElementById('total-juros').innerHTML = totalJuros.toLocaleString("pt", {style: "currency", currency: "BRL"});

    let div = document.createElement('div');
    div.id = 'tabela-corpo';
    tabela = document.getElementsByClassName("tabela")[0];
    tabela.prepend(div);
    //cria tabela
    document.getElementById("tabela-corpo").appendChild(criarTabela(conteudo));
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
    let remove;

    if (document.getElementById('tabela-feita') !== null) {
        remove = document.getElementById('tabela-corpo');
        remove.remove();
      }
    
}

function criarTabela(conteudo) {
    let tabela = document.createElement("table");
    tabela.id = 'tabela-feita';
    tabela.classList.add("table");
    tabela.classList.add("table-striped");
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
