// Eventos Slider
function selectSlider(slider){
  switch(slider){
     case 1:  //evento slider Saque
            rl_sliderSaque();
       break;
     case 2: //evento slider Prazo
            rl_sliderPrazo();
       break;
     case 3: //evento slider Perc
            rl_sliderPerc();
       break;
     case 4: //evento slider Renda
            rl_sliderRenda();
       break;
     default:
       return
       break;
  }
}

function rl_sliderSaque(){
}

function rl_sliderPerc(){
}

function rl_sliderPrazo(){
}

function rl_sliderRenda(){
}

function validaSaque(PercSaque){

  var SP = SaldoIniT;  //Saldo Projetado - SP
  var PS = PercSaque;  //Percentual de Saque - PS
  /*
  if ($("#perc").is(":checked")) { //Percentual - P
       (SP - (SP * PS)) * (ValPerc/100) <= (URP * 0.5) ? PS = 0 : PS = PS;

  }  else if ($("#prazo").is(":checked")){ //Prazo Certo - PC
       (SP - (SP * PS)) / (ValPrazo * Nper) <= (URP * 0.5) ? PS = 0 : PS = PS;

  }  else { //Renda Certa - RC
       (SP - (SP * PS)) * ValRenda <= (URP * 0.5) ? PS = 0 : PS = PS;
  }
  */
  return PS;
}

function CalcBenefVital(typeBenefVital) {
  var Benefvital = 0;

//  var checkCrescSalam = Math.pow((1 + ($('#salgrow').val() * 1)), (1 / 12)) - 1;

//  if(CrescSalam != checkCrescSalam) { //Projeta Array INPC, caso participante tenha mudado o Crescimento Salarial
      projINPC();
//

   switch (typeBenefVital){
          case 0:
                 //Regras Aposentadoria por Tempo de Contribuição
                 Benefvital = calcBenefTC();
          break;
          case 1:
                //Regras Aposentadoria por idade
                Benefvital = calcBenefIdade();
          break;
        }


  return Benefvital;
}

function calcBenefTC(){ //Benefício de aposentadoria por tempo de contribuição

 var SRB = 0;
 var SRBMedia = 0;
 var TetoSalPart = 0;
 var Teto_INSS = TetoINSS;
 var INSSCorrigido = 0;
 var BenefAdicional = 0;
 var TetoAdicional = 0;
 var FatCorrecaoTVP = 0;
 var FatCorrecaoIdade = 0;
 var Benef = 0;
 var SalarioZero = false; //flag de salario igual a 0 no histórico
 //var PBC = ProxMes(DtSaldoDIB, -1); Considera SRB projetado
 var PBC = ProxMes(DtSaldoIni, -1);  //Considera SRB no mes anterior a data base
 var FatAcumulado = 0;
 var i = 36;
 var QtdSalario = 0;     //Quantidade de salário a considerar para cálculo
 var ContSalZero = 0; //Contador de Salários Iguais a 0
 var GridSRB = "";
 var TabelSRB = "";
 var VariaveisDesc = "";
 var DemonstraCalc = "";

 $("#secValidacao_msg1").html("");

  GridSRB = '<div class="table-responsive" id="divSRB"><table id="GridSRB" class="table table-striped table-condensed">';

  if (isMobileApp()){
     GridSRB = GridSRB + '<tr><th></th><th align="center">Sal. Corrigido</th><th>INSS Corrigido</th></tr>';
  } else {
     GridSRB = GridSRB + '<tr><th></th><th align="center">Salário</th><th>Teto INSS</th><th>Fator</th><th>Sal. Corrigido</th><th>INSS Corrigido</th></tr>';   
  }

  for(var l in vlSal){
     if (DataDif(vlSal[l][0], PBC, 0, 1) == 0 || HistSalario.length == 0){   //Encontra valores projetados até a data da aposentadoria
        //HistSalario.leght == undefined || HistSalario.leght == 0 ? l = 0 :
        //QtdSalario = (l * 1) + 1, aplicado este tratamento para contagem correta dos salários a serem considerados quando quantidade menor que 36 
        l < 36 ? (l == 0 ? QtdSalario = 1 : QtdSalario = (l * 1) + 1) : QtdSalario = 36; //Limitador de salários a considerar
        i = QtdSalario;
        for( var j = l; j > (l-QtdSalario); j--){//Soma 36 Salarios para cálculo do SRB
         var Teto = 4 * (vlSal[j][3] != 0 ? vlSal[j][3] : Teto_INSS);
         FatAcumulado = acumula_indicador(vlINPC, vlINPC[j][0], vlINPC[l][0]);
         SRB = vlSal[j][1] == 0 ? SRB : SRB + FatAcumulado * (vlSal[j][1] > Teto ? Teto : vlSal[j][1]);
         INSSCorrigido = vlSal[j][1] == 0 ? INSSCorrigido : INSSCorrigido + FatAcumulado * vlSal[j][3];
         //console.log("Cont:"+ i--,"Data: " + ("01/"+ (vlSal[j][0].getMonth() + 1) + "/" + vlSal[j][0].getFullYear()),"teto: " + (vlSal[j][1] > Teto ? Teto : vlSal[j][1]), "Sal Bruto: " + vlSal[j][1], "Teto_INSS: " + vlSal[j][3]);
         vlSal[j][1] == 0 ? ContSalZero++ : "" ;  //Contador de Salários iguais a 0 
         vlSal[j][1] == 0 ? SalarioZero = true : ""; // flag de existência de Salario igual a 0
         
           if (isMobileApp()){
                TabelSRB = "<tr><td>" + i-- + "</td><td>R$ " + $.formatNumber(((FatAcumulado * (vlSal[j][1] > Teto ? Teto : vlSal[j][1])).toFixed(2) * 1), {format:"#,##0.00", locale:"br"}) + "</td><td>R$ " + $.formatNumber(((FatAcumulado * vlSal[j][3]).toFixed(2) * 1), {format:"#,##0.00", locale:"br"}) + "</td></tr>" + TabelSRB;
           } else {
                TabelSRB = "<tr><td>" + i-- + "</td><td>R$ " + $.formatNumber((vlSal[j][1] > Teto ? Teto : vlSal[j][1]), {format:"#,##0.00", locale:"br"}) + "</td><td>R$ " + $.formatNumber(vlSal[j][3], {format:"#,##0.00", locale:"br"}) + "</td><td>" + FatAcumulado + "</td><td>R$ " + $.formatNumber(((FatAcumulado * (vlSal[j][1] > Teto ? Teto : vlSal[j][1])).toFixed(2) * 1), {format:"#,##0.00", locale:"br"}) + "</td><td>R$ " + $.formatNumber(((FatAcumulado * vlSal[j][3]).toFixed(2) * 1), {format:"#,##0.00", locale:"br"}) + "</td></tr>" + TabelSRB;
           }                   
        }
        Teto_INSS = vlSal[l][3] != 0 ? vlSal[l][3] : Teto_INSS; //Teto INSS Projetado na data da aposentadoria
        TetoAdicional = 0.25 * Teto_INSS;
        TetoSalPart = 4 * Teto_INSS;
        QtdSalario = QtdSalario - ContSalZero;
        break;
     }
  }

  if (isMobileApp()){
      TabelSRB = TabelSRB + "<tr><td><strong>Total</strong></td><td>R$ " + $.formatNumber((SRB.toFixed(2) * 1), {format:"#,##0.00", locale:"br"}) + "</td><td>R$ " + $.formatNumber((INSSCorrigido.toFixed(2) * 1), {format:"#,##0.00", locale:"br"}) + "</td></tr>";
    } else {
      TabelSRB = TabelSRB + "<tr><td></td><td></td><td></td><td><strong>Total</strong></td><td>R$ " + $.formatNumber((SRB.toFixed(2) * 1), {format:"#,##0.00", locale:"br"}) + "</td><td>R$ " + $.formatNumber((INSSCorrigido.toFixed(2) * 1), {format:"#,##0.00", locale:"br"}) + "</td></tr>";
    }
  
  GridSRB = GridSRB + TabelSRB + "</table></div>";

  $("#secValidacao_msg1").html("<strong>Salários Considerados para Efeito de Cálculo do SRB</strong><br/><br/>" + GridSRB);

  SRBMedia = SRB/QtdSalario;
  INSSCorrigido = INSSCorrigido/QtdSalario;

  SRBMedia = SRBMedia > TetoSalPart ? TetoSalPart : SRBMedia;

  //Alert de Histórico de Salário igual a 0
  if (SalarioZero &&  $("#secVitalicio").html().indexOf("secValidacao_alertMsg1")<0) {
     $("#secVitalicio").html('<div class="alert alert-danger"><span id="secValidacao_alertMsg1"><strong>ATENÇÃO!</strong> Em seu histórico de salários existem registros com valor igual a R$0,00.<br /> Por gentileza entre em contato com a FIPECq, para maiores esclarecimentos.</span></div>' + $("#secVitalicio").html());
  }

  //Monta Div's com ID
  $("#secValidacao_msg1").html($("#secValidacao_msg1").html() + '<div id="secVariaveisDesc"></div><div id="secDemonstraCalc"></div>');

  FatCorrecaoTVP = retornaFator()[0];

  SRB = SRBMedia * FatCorrecaoTVP; //Correção do SRB somente para benefício por tempo de contribuição

  DemonstraCalc = DemonstraCalc + '<p align="left">SRB X Fator Tempo Contrib. = ' + $.formatNumber((SRB.toFixed(2) * 1), {format:"#,##0.00", locale:"br"}) +' (SRB Corrigido)</p>';

  BenefAdicional = SRB * 0.20;

  BenefAdicional = BenefAdicional > TetoAdicional ? TetoAdicional : BenefAdicional;

  //Alimentação inicial variáveis descrição
  VariaveisDesc = '<p align="center"><strong>Valores comparativos para cálculo da complementação PPC</strong></p><br/><div class="row" align="left"><div class="col-md-4 col-sm-4">' + secValidacaoINSS + '<strong> INSS: </strong>R$ '+ $.formatNumber((INSSCorrigido.toFixed(2) * 1) , {format:"#,##0.00", locale:"br"}) + ' </div> <div class="col-md-4 col-sm-4">' + secValidacaoSRB + '<strong> SRB: </strong>R$ ' +  $.formatNumber((SRBMedia.toFixed(2) * 1) , {format:"#,##0.00", locale:"br"})  +' </div> <div class="col-md-4 col-sm-4"> ' + secValidacaoBenefAdicional + ' <strong> Adic. Aposentadoria: </strong>R$ ' + $.formatNumber((BenefAdicional.toFixed(2) * 1) , {format:"#,##0.00", locale:"br"}) + '</div> <div class="col-md-4 col-sm-4">' + secValidacaoFTContrib + '<strong> Fator Tempo Contrib.: </strong>' + (FatCorrecaoTVP) + '</div>';

  Benef = (SRB + BenefAdicional) - INSSCorrigido;

  DemonstraCalc = DemonstraCalc + '<p align="left">(SRB Corrigido + Adic. Aposentadoria) - INSS = ' + $.formatNumber((Benef.toFixed(2) * 1) <= 0 ? 0 : (Benef.toFixed(2) * 1), {format:"#,##0.00", locale:"br"}) +' (Total)</p>';

  FatCorrecaoIdade = retornaFator()[1];

  Benef = Benef * FatCorrecaoIdade;

  VariaveisDesc =  VariaveisDesc + '<div class="col-md-4 col-sm-4"> ' + secValidacaoFIdade + ' <strong> Fator Idade: </strong>' + (FatCorrecaoIdade * 100)+'%</div>';
  DemonstraCalc = DemonstraCalc + '<p align="left">Total X Fator Idade = ' + $.formatNumber((Benef.toFixed(2) * 1) <= 0 ? 0 : (Benef.toFixed(2) * 1), {format:"#,##0.00", locale:"br"}) +' (Complementação PPC)</p>';

  Benef = deducaoJoia(Benef);

  if (Benef != (((SRB + BenefAdicional) - INSSCorrigido) * FatCorrecaoIdade)){
      VariaveisDesc =  VariaveisDesc + '<div class="col-md-4 col-sm-4"> ' + secValidacaoFJoia + '<strong> Fator Jóia: </strong>R$ ' + $.formatNumber((((((SRB + BenefAdicional) - INSSCorrigido) * FatCorrecaoIdade) - Benef).toFixed(2) * 1) , {format:"#,##0.00", locale:"br"}) +'</div>';
      DemonstraCalc = DemonstraCalc + '<p align="left">Complementação PPC - Fator Jóia = ' + $.formatNumber((Benef.toFixed(2) * 1) <= 0 ? 0 : (Benef.toFixed(2) * 1), {format:"#,##0.00", locale:"br"}) +'</p>';
  }

  if (Benef != (((SRB + BenefAdicional) - INSSCorrigido)* FatCorrecaoIdade) || FatCorrecaoIdade != 1){
    if (Benef >= (SRB * 0.20)){
       DemonstraCalc = DemonstraCalc + '<br/><p align="left"><strong>Benefício Bruto Calculado</strong></p><br /><p align="left"> Complementação PPC: <span class="valReceita">R$ ' + $.formatNumber((Benef.toFixed(2) * 1) <= 0 ? 0 : (Benef.toFixed(2) * 1), {format:"#,##0.00", locale:"br"}) +'</span></p>';
     }
  } else {
    if (Benef >= (SRB * 0.20)){
      DemonstraCalc = DemonstraCalc + '<br/><p align="left"><strong>Benefício Bruto Calculado</strong></p><br /><p align="left"> Complementação PPC: <span class="valReceita">R$ ' + $.formatNumber(((((SRB + BenefAdicional) - INSSCorrigido).toFixed(2) * 1) <= 0 ? 0 : (Benef.toFixed(2) * 1)), {format:"#,##0.00", locale:"br"}) +'</span></p>';
    }
  }

  if (Benef >= (SRB * 0.20)){
     Benef = Benef;
  } else {
     Benef = SRB * 0.20;
     DemonstraCalc = DemonstraCalc + '<br/><p align="left"><strong>Benefício Bruto Calculado</strong></p><br /><p align="left"> Complementação PPC Teto: <span class="valReceita">R$ ' + $.formatNumber((Benef.toFixed(2) * 1) , {format:"#,##0.00", locale:"br"}) +'</span></p>';
  }

  if (Benef <= 0) { //Alerta benefício negativo
    console.log('Benefício negativo ' + Benef);
    Benef = 0;
  }

  //Fecha conteúdo variáveis descritivo
  VariaveisDesc = VariaveisDesc + '</div><br />';

  //Fecha conteúdo demonstrativo de cálculo
  DemonstraCalc = '<p align="left"><strong>Fórmulas de Cálculo</strong></p><br/>' + DemonstraCalc + '</p>';

  //if(!isMobileApp()) {
    //Imprime o HTML das DIVs
    $("#secVariaveisDesc").html(VariaveisDesc);
    $("#secDemonstraCalc").html(DemonstraCalc);
  //}

  //Ativa Tooltip
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  return Benef;
}

function calcBenefIdade(){ //Benefício de aposentadoria por Idade

 var SRB = 0;
 var SRBMedia = 0;
 var Teto_INSS = TetoINSS;
 var INSSCorrigido = 0;
 var TetoSalPart = 0;
 var BenefAdicional = 0;
 var TetoAdicional = 0;
 var FatCorrecao = 0;
 var Benef = 0;
 var SalarioZero = false; //flag de salario igual a 0 no histórico
//var PBC = ProxMes(DtSaldoDIB, -1); Considera SRB projetado
 var PBC = ProxMes(DtSaldoIni, -1);  //Considera SRB no mes anterior a data base
 var FatAcumulado = 0;
 var i = 36;
 var GridSRB = "";
 var TabelSRB = "";
 var QtdSalario = 0;  //Quantidade de salário a considerar para cálculo
 var ContSalZero = 0; //Contador de Salários Iguais a 0
 var SalarioZero; //flag de salario igual a 0 no histórico
 var VariaveisDesc = "";
 var DemonstraCalc = "";

 $("#secValidacao_msg1").html("");

  GridSRB = '<div class="table-responsive" id="divSRB"><table id="GridSRB" class="table table-striped table-condensed">';
  
  if (isMobileApp()){
      GridSRB = GridSRB + '<tr><th></th><th align="center">Sal. Corrigido</th><th>INSS Corrigido</th></tr>';
  } else {
      GridSRB = GridSRB + '<tr><th></th><th align="center">Salário</th><th>Teto INSS</th><th>Fator</th><th>Sal. Corrigido</th><th>INSS Corrigido</th></tr>';   
  }

  for(var l in vlSal){
     if (DataDif(vlSal[l][0], PBC, 0, 1) == 0 || HistSalario.length == 0){   //Encontra valores projetados até a data da aposentadoria
        //QtdSalario = (l * 1) + 1, aplicado este tratamento para contagem correta dos salários a serem considerados quando quantidade menor que 36 
         l < 36 ? (l == 0 ? QtdSalario = 1 : QtdSalario = (l * 1) + 1) : QtdSalario = 36; //Limitador de salários a considerar
         i = QtdSalario;
        for( var j = l; j > (l-QtdSalario); j--){//Soma 36 Salarios para cálculo do SRB
         var Teto = 4 * (vlSal[j][3] != 0 ? vlSal[j][3] : Teto_INSS);
         FatAcumulado = acumula_indicador(vlINPC, vlINPC[j][0], vlINPC[l][0]);
         SRB = vlSal[j][1] == 0 ? SRB : SRB + FatAcumulado * (vlSal[j][1] > Teto ? Teto : vlSal[j][1]);
         INSSCorrigido = vlSal[j][1] == 0 ? INSSCorrigido : INSSCorrigido + FatAcumulado * vlSal[j][3];
         //console.log("Cont:"+ i--,"Data: " + ("01/"+ (vlSal[j][0].getMonth() + 1) + "/" + vlSal[j][0].getFullYear()),"teto: " + (vlSal[j][1] > Teto ? Teto : vlSal[j][1]), "Sal Bruto: " + vlSal[j][1], "Teto_INSS: " + vlSal[j][3]);
         vlSal[j][1] == 0 ? ContSalZero++ : "" ;  //Contador de Salários iguais a 0 
         vlSal[j][1] == 0 ? SalarioZero = true : ""; // flag de existência de Salario igual a 0
           
           if (isMobileApp()){
                TabelSRB = "<tr><td>" + i-- + "</td><td>R$ " + $.formatNumber(((FatAcumulado * (vlSal[j][1] > Teto ? Teto : vlSal[j][1])).toFixed(2) * 1), {format:"#,##0.00", locale:"br"}) + "</td><td>R$ " + $.formatNumber(((FatAcumulado * vlSal[j][3]).toFixed(2) * 1), {format:"#,##0.00", locale:"br"}) + "</td></tr>" + TabelSRB;
           } else {
                TabelSRB = "<tr><td>" + i-- + "</td><td>R$ " + $.formatNumber((vlSal[j][1] > Teto ? Teto : vlSal[j][1]), {format:"#,##0.00", locale:"br"}) + "</td><td>R$ " + $.formatNumber(vlSal[j][3], {format:"#,##0.00", locale:"br"}) + "</td><td>" + FatAcumulado + "</td><td>R$ " + $.formatNumber(((FatAcumulado * (vlSal[j][1] > Teto ? Teto : vlSal[j][1])).toFixed(2) * 1), {format:"#,##0.00", locale:"br"}) + "</td><td>R$ " + $.formatNumber(((FatAcumulado * vlSal[j][3]).toFixed(2) * 1), {format:"#,##0.00", locale:"br"}) + "</td></tr>" + TabelSRB;
           }

        }
        Teto_INSS = vlSal[l][3] != 0 ? vlSal[l][3] : Teto_INSS; //Teto INSS Projetado na data da aposentadoria
        TetoAdicional = 0.25 * Teto_INSS;
        TetoSalPart = 4 * Teto_INSS;
        QtdSalario = QtdSalario - ContSalZero;
        break;
     }
  }

  if (isMobileApp()){
     TabelSRB = TabelSRB + "<tr><td><strong>Total</strong></td><td>R$ " + $.formatNumber((SRB.toFixed(2) * 1), {format:"#,##0.00", locale:"br"}) + "</td><td>R$ " + $.formatNumber((INSSCorrigido.toFixed(2) * 1), {format:"#,##0.00", locale:"br"}) + "</td></tr>";
  } else {
     TabelSRB = TabelSRB + "<tr><td></td><td></td><td></td><td><strong>Total</strong></td><td>R$ " + $.formatNumber((SRB.toFixed(2) * 1), {format:"#,##0.00", locale:"br"}) + "</td><td>R$ " + $.formatNumber((INSSCorrigido.toFixed(2) * 1), {format:"#,##0.00", locale:"br"}) + "</td></tr>";
  }

  GridSRB = GridSRB + TabelSRB + "</table></div>";

  $("#secValidacao_msg1").html("<strong>Salários Considerados para Efeito de Cálculo do SRB</strong><br/><br/>" + GridSRB);

  SRBMedia = SRB/QtdSalario;
  INSSCorrigido = INSSCorrigido/QtdSalario;

  SRB = SRBMedia > TetoSalPart ? TetoSalPart : SRBMedia;

  //Alert de Histórico de Salário igual a 0
  if (SalarioZero &&  $("#secVitalicio").html().indexOf("secValidacao_alertMsg1")<0) {
     $("#secVitalicio").html('<div class="alert alert-danger"><span id="secValidacao_alertMsg1"><strong>ATENÇÃO!</strong> Em seu histórico de salários existem registros com valor igual a R$0,00.<br /> Por gentileza entre em contato com a FIPECq, para maiores esclarecimentos.</span></div>' + $("#secVitalicio").html());
  }

  //Monta Div's com ID
  $("#secValidacao_msg1").html($("#secValidacao_msg1").html() + '<div id="secVariaveisDesc"></div><div id="secDemonstraCalc"></div>');

  BenefAdicional = SRB * 0.20;

  BenefAdicional = BenefAdicional > TetoAdicional ? TetoAdicional : BenefAdicional;

  //Alimentação inicial variáveis descrição
  VariaveisDesc = '<p align="center"><strong>Valores comparativos para cálculo da complementação PPC</strong></p><br/><div class="row" align="left"><div class="col-md-4 col-sm-4">' + secValidacaoINSS + '<strong> INSS: </strong>R$ '+ $.formatNumber((INSSCorrigido.toFixed(2) * 1) , {format:"#,##0.00", locale:"br"}) + ' </div> <div class="col-md-4 col-sm-4">' + secValidacaoSRB + '<strong> SRB: </strong>R$ ' +  $.formatNumber((SRBMedia.toFixed(2) * 1) , {format:"#,##0.00", locale:"br"})  +' </div> <div class="col-md-4 col-sm-4"> ' + secValidacaoBenefAdicional + ' <strong> Adic. Aposentadoria: </strong>R$ ' + $.formatNumber((BenefAdicional.toFixed(2) * 1) , {format:"#,##0.00", locale:"br"}) + '</div>';  

  Benef = (SRB + BenefAdicional) - INSSCorrigido;

  DemonstraCalc = DemonstraCalc + '<p align="left">(SRB + Adic. Aposentadoria) - INSS = ' + $.formatNumber((Benef.toFixed(2) * 1) <= 0 ? 0 : (Benef.toFixed(2) * 1), {format:"#,##0.00", locale:"br"}) +' (Total)</p>';

  Benef = deducaoJoia(Benef);

  if (Benef != ((SRB + BenefAdicional) - INSSCorrigido)) {
     VariaveisDesc =  VariaveisDesc + ' <div class="col-md-4 col-sm-4"> ' + secValidacaoFJoia + '<strong> Fator Jóia: </strong>R$ ' + $.formatNumber(((((SRB + BenefAdicional) - INSSCorrigido) - Benef).toFixed(2) * 1) , {format:"#,##0.00", locale:"br"}) +'</div>';     
     DemonstraCalc = DemonstraCalc + '<p align="left">Total - Fator Jóia = ' + $.formatNumber((Benef.toFixed(2) * 1) <= 0 ? 0 : (Benef.toFixed(2) * 1), {format:"#,##0.00", locale:"br"}) +' (Complementação PPC Deduzida)</p>';
    if (Benef >= (SRB * 0.20)) {
       DemonstraCalc = DemonstraCalc + '<br/><p align="left"><strong>Benefício Bruto Calculado</strong></p><br /><p align="left">Complementação PPC: <span class="valReceita">R$ ' + $.formatNumber((Benef.toFixed(2) * 1) <= 0 ? 0 : (Benef.toFixed(2) * 1), {format:"#,##0.00", locale:"br"}) +'</span></p>';
     }
  } else {
    if (Benef >= (SRB * 0.20)) {
      DemonstraCalc = DemonstraCalc + '<br/><p align="left"><strong>Benefício Bruto Calculado</strong></p><br /><p align="left">Complementação PPC: <span class="valReceita">R$ ' + $.formatNumber(((Benef.toFixed(2) * 1) <= 0 ? 0 : (Benef.toFixed(2) * 1)), {format:"#,##0.00", locale:"br"}) +'</span></p>';
    }
  }

  if (Benef >= (SRB * 0.20)){
     Benef = Benef;
  } else {
     Benef = SRB * 0.20;
     DemonstraCalc = DemonstraCalc + '<br/><p align="left"><strong>Benefício Bruto Calculado</strong></p><br /><p align="left">Complementação PPC Teto: <span class="valReceita">R$ ' + $.formatNumber((Benef.toFixed(2) * 1) , {format:"#,##0.00", locale:"br"}) +'</span></p>';
  }

  if (Benef <= 0) { //Alerta benefício negativo
    console.log('Benefício negativo ' + Benef);
    Benef = 0;
  }

  //Fecha conteúdo variáveis descritivo
  VariaveisDesc = VariaveisDesc + '</div><br />';

  //Fecha conteúdo demonstrativo de cálculo
  DemonstraCalc = '<p align="left"><strong>Fórmulas de Cálculo</strong></p><br/>' + DemonstraCalc + '</p>';

  //if(!isMobileApp()) {
     //Imprime o HTML das DIVs
     $("#secVariaveisDesc").html(VariaveisDesc);
     $("#secDemonstraCalc").html(DemonstraCalc);
  //}

  //Ativa Tooltip
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  return Benef;
}

function deducaoJoia(Benef){  //Dedução para participante que aderiu ao PPC em o pagamento de joia

  var Benefi = Benef;
  var idadeJoia = DataDif(Ncmto, DtAdesao, 0, 4); //Idade na data de adesão
  var TVP = DtDeslig === null ? DataDif(DtAdesao, DtSaldoDIB, 1 , 2) : DataDif(DtAdesao, DtDeslig, 1 , 2);

  TVP = TVP > 30 ? 30 : TVP;

  if (typePgtoJoia == 0 && idadeJoia >= 36 && TVP != 30) { //Se idadeJoia >= 36 anos e não contribui com jóia vai ter redutor
    Benefi = Benefi / 30 * TVP;
  }

  return Benefi;
}

function retornaFator(){  //Retorna Fator de dedução pro tempo de contribuição e idade

  var FatCorrecaoTSC = 1;
  var FatCorrecaoIdade = 1;
  var idade = $("#sliderIdade").slider("value"); // idadeSaldoDib
  var TS_INSS = $('#tsinss').val() == "" ? 0 : $('#tsinss').val();
  var TSC = DtDeslig === null ? DataDif(DtAdmissao, DtSaldoDIB, 1 , 4) : DataDif(DtAdmissao, DtDeslig, 1 , 4);

  TSC = TSC + ((TS_INSS * 1) * 12);

  //Fator de Correção por tempo de contribuição
  if (Sexo == '01'){ 
    switch (true){  //Sexo masculino
            case (TSC < 31):
              FatCorrecaoTSC = 0.8;
              break;
            case (TSC >= 31 && TSC < 32):
              FatCorrecaoTSC = 0.84;
              break;
            case (TSC >= 32 && TSC < 33):
              FatCorrecaoTSC = 0.88;
              break;
            case (TSC >= 33 && TSC < 34):
              FatCorrecaoTSC = 0.92;
              break;
            case (TSC >= 34 && TSC < 35):
              FatCorrecaoTSC = 0.96;
              break;
            case (TSC >= 35):
              FatCorrecaoTSC = 1;
              break;
           }
  } else { //Sexo feminino
     switch (true){
            case (TSC < 26):
              FatCorrecaoTSC = 0.8;
              break;
            case (TSC >= 26 && TSC < 27):
              FatCorrecaoTSC = 0.84;
              break;
            case (TSC >= 27 && TSC < 28):
              FatCorrecaoTSC = 0.88;
              break;
            case (TSC >= 28 && TSC < 29):
              FatCorrecaoTSC = 0.92;
              break;
            case (TSC >= 29 && TSC < 30):
              FatCorrecaoTSC = 0.96;
              break;
            case (TSC >= 30):
              FatCorrecaoTSC = 1;
              break;
          }
  }

  //Fator de Correção por Idade
  switch (true){
            case (idade < 56):
              FatCorrecaoIdade = 0.7;
              break;
            case (idade >= 56 && idade < 57):
              FatCorrecaoIdade = 0.8;
              break;
            case (idade >= 57 && idade < 58):
              FatCorrecaoIdade = 0.9;
              break;
            case (idade >= 58):
              FatCorrecaoIdade = 1;
              break;
          }

  return [FatCorrecaoTSC, FatCorrecaoIdade];

}


function projINPC(){ //Projeta INPC

  vlINPC = [];

  var objINPC = DadosPlano.historico_salario;

  // Calcula CrescSalam conforme da tela
  //CrescSalam = Math.pow((1 + ($('#salgrow').val() * 1)), (1 / 12)) - 1;

  if(objINPC != null){
    for (var l in objINPC){
        var obj = objINPC[l];
        vlINPC.push([new Date(obj.anomes.substring(4, 6) + "/01/" + obj.anomes.substring(0, 4)), obj.INPC]);
    };
  } else {
    vlINPC.push([DtSaldoIni, CrescSalam]);
  }

  for (var i = 2; i <= 1200; i++){
    vlINPC.push([ProxMes(vlINPC[vlINPC.length - 1][0] , 1), CrescSalam]);
  }
}

function calcContribBenef(ContribBenef){

  var partCtr1 = 0;
  var partCtr2 = 0;
  var partCtr3 = 0;
  var partCtrFaixaT = 0;

      //CALCULO DA CONTRIBUIÇÃO PARTICIPANTE FAIXA 1
      partCtr1 = ContribBenef * Faixa1;

      //CALCULO DA CONTRIBUIÇÃO PARTICIPANTE FAIXA 2
      if (ContribBenef - (TetoINSS/2) > 0){
           partCtr2 = (ContribBenef - (TetoINSS/2)) * Faixa2;
      }
      //CALCULO DA CONTRIBUIÇÃO PARTICIPANTE FAIXA 3
      if (ContribBenef - TetoINSS > 0){
           partCtr3 = (ContribBenef - TetoINSS) * Faixa3;
      }

   partCtrFaixaT =  partCtr1 + partCtr2 + partCtr3;

   return partCtrFaixaT;
};

function CalcDescontoFolha(benefBruto){

  var DescontoContrib = 0;
  var benefTributalvel = 0;
  var impressaoFolha = "";
  var conteudoFolha = "";

  //Desconto de contribuição
  DescontoContrib = calcContribBenef(benefBruto);
  benefTributalvel = benefBruto - DescontoContrib;

  //Impressões
  if(isMobileApp()){
  //Conteúdo fixo da index.html
  impressaoFolha = '<div class="col-xs-0 col-sm-2 col-md-2"></div><div class="col-xs-12 col-sm-9 col-md-9 text-left"><div class="col-xs-0 col-sm-0 col-md-1"></div><div class="col-xs-12 col-sm-6 col-md-5 padding-right-none"><label for="vitalprov" style="margin-right: 5px;"><span id="secVitalicio_Provento">(+) Complementação PPC: </span></label><!--</div><div class="col-xs-12 col-sm-5 col-md-5">--><input type="text" id="vitalprov" class="valReceita" readonly=""></div><div class="col-xs-0 col-sm-1 col-md-1"></div></div><div class="col-xs-0 col-sm-1 col-md-1"></div>';

  //Conteúdo adicional para simulação de folha de pagamento
  impressaoFolha = impressaoFolha + '<div class="col-xs-0 col-sm-2 col-md-2"></div><div class="col-xs-12 col-sm-9 col-md-9 text-left"><div class="col-xs-0 col-sm-0 col-md-1"></div><div class="col-xs-12 col-sm-6 col-md-5 padding-right-none"><label for="descContribPPC" style="margin-right: 5px;">(-) Contribuição PPC: </label><!--</div><div class="col-xs-12 col-sm-5 col-md-5">--><input type="text" id="descContribPPC" class="valDesconto" value="R$ ' + $.formatNumber((DescontoContrib.toFixed(2) * 1) , {format:"#,##0.00", locale:"br"}) +'" readonly=""></div><div class="col-xs-0 col-sm-1 col-md-1"></div></div><div class="col-xs-0 col-sm-1 col-md-1"></div>';

  } else {

  //Conteúdo fixo da index.html
  impressaoFolha = '<div class="col-xs-0 col-sm-2 col-md-2"></div><div class="col-xs-12 col-sm-9 col-md-9 text-left"><div class="col-xs-0 col-sm-0 col-md-1"></div><div class="col-xs-12 col-sm-6 col-md-5 padding-right-none"><label for="vitalprov"><span id="secVitalicio_Provento">(+) Complementação PPC:</span></label></div><div class="col-xs-12 col-sm-5 col-md-5"><input type="text" id="vitalprov" class="valReceita" readonly=""></div><div class="col-xs-0 col-sm-1 col-md-1"></div></div><div class="col-xs-0 col-sm-1 col-md-1"></div>';

  //Conteúdo adicional para simulação de folha de pagamento
  impressaoFolha = impressaoFolha + '<div class="col-xs-0 col-sm-2 col-md-2"></div><div class="col-xs-12 col-sm-9 col-md-9 text-left"><div class="col-xs-0 col-sm-0 col-md-1"></div><div class="col-xs-12 col-sm-6 col-md-5 padding-right-none"><label for="descContribPPC">(-) Contribuição PPC:</label></div><div class="col-xs-12 col-sm-5 col-md-5"><input type="text" id="descContribPPC" class="valDesconto" value="R$ ' + $.formatNumber((DescontoContrib.toFixed(2) * 1) , {format:"#,##0.00", locale:"br"}) +'" readonly=""></div><div class="col-xs-0 col-sm-1 col-md-1"></div></div><div class="col-xs-0 col-sm-1 col-md-1"></div>';

  }

  $("#secVitalicio_divProvento").html(impressaoFolha);

  $("#vitalprov").val("R$ " + $.formatNumber((benefBruto.toFixed(2) * 1) , {format:"#,##0.00", locale:"br"}));

  return benefTributalvel;
}

function rl_BenefMin(typeBenef){
   var isBM = false;

   /*
   switch (typeBenef){
      case 0:
          //Regras benefício mínimo aposentadoria resgate
          break;
      case 1:
          //Regras benefício mínimo resgate
          break;
   }
   */
   return isBM;
}


function CalcBenefMin(){
  /*
  var Benefmin = 0;
  var TSC = DtDeslig === null ? DataDif(DtAdmissao, DtSaldoDIB, 1 , 4) : DataDif(DtAdmissao, DtDeslig, 1 , 4);
  var Fator = 0;
  var idadeSaldoDib = $("#sliderIdade").slider("value");

  //cálculo do benefício mínimo
  if (status == 2){
    switch(true) {   //Calc Fator Benef Proporcional
      case (idadeSaldoDib < 60):
          Fator = CalcFator().toFixed(4) * 1;
          break;
      case (idadeSaldoDib >= 60):
          Fator = 1;
          break;
      };
    Benefmin = (3 * Salario) * (TSC / 30) * Fator;
  } else {
    Benefmin = (3 * Salario) * (TSC / 30);
  }

 return Benefmin;
  */
}
