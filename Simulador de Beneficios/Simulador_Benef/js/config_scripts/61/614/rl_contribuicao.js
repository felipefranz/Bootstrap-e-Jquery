<!-- saved from url=(0016)http://localhost -->
var ContribCalc = [[],[],[],[],[]];                             //variável global do valor das contribuiç&otilde;es calculadas
var contribCfg = []; //array global de configuração das contribuiç&otilde;es
var Faixa1 = 0.014;
var Faixa2 = 0.019;
var Faixa3 = 0.07;
var SalPartic = 0;                                 //Salário de participação
var ContribJoia = 0;

//função para criar o form de contribuição dinamicamente
function Monta_Contrib(){
    //Salva historico_salarios na variável global objHistSalario
    objHistSalario = HistSalario;

    //objeto prototype contribuição
    var tbfld = function(cp1, cp2, cp3, cp4, cp5){
      this.fld1 = cp1;
      this.fld2 = cp2,
      this.fld3 = cp3,
      this.fld4 = cp4,
      this.fld5 = cp5
    };

    //campos criados dinamicamente na função Monta_Contrib();
    //criar funcionalidade com id unico para acoplar ao grupo de contribuição
    //Convenção ID funcionalidade: mesmo nome da variavel
    var fnc1 = '<input type="text" class="form-control input-sm" id="fnc1" style="width:80px;" readonly>';
    var fnc2 = '<input type="text" class="form-control input-sm" id="fnc2" style="width:80px;" readonly>';
    var fnc3 = '<input type="text" class="form-control input-sm" id="fnc3" style="width:80px;" readonly>';
    var fnc4 = '<input type="text" class="form-control input-sm" id="fnc4" style="width:100px;" readonly>';
    var fnc5 = '<span id="fnc5">1ª Faixa</span>';
    var fnc6 = '<span id="fnc6">2ª Faixa</span>';
    var fnc7 = '<span id="fnc7">3ª Faixa</span>';
    var fnc8 = '<input type="text" class="form-control input-sm" id="fnc8" style="width:100px;" readonly>';
    var fnc9 = '<input type="text" class="form-control input-sm" id="fnc9" style="width:105px;" readonly>';
    var fnc10 = '<select class="form-control input-sm" id="fnc10" style="width:105px"></select>';
    var fnc11 = '<input type="text" class="form-control input-sm" id="fnc11" style="width:110px;">';
    var fnc12 = '<select class="form-control input-sm" id="fnc12" style="width:90px"></select>';
    var fnc13 = '<input type="text" class="form-control input-sm" id="fnc13" style="width:100px;" readonly>';
    var fnc14 = '<span id="fnc14">%</span>';
    var fnc15 = '<span id="fnc15">Valor (R$)</span>';
    var fnc16 = '<select class="form-control input-sm" id="fnc16" size="1" style="width:85px"></select>';
    var fnc17 = '<div class="alert alert-danger" role="alert" id="fnc17"></div>';
    var fnc18 = '<div class="alert alert-danger" role="alert" id="fnc18"></div>';
    var fnc19 = '<input type="text" class="form-control input-sm" id="fnc19" style="width:80px;" readonly>';
    var fnc20 = '<span id="fnc20">Percentual</span>';
    var fnc21 = '<select class="form-control input-sm" id="fnc21" style="width:124px"></select>';
    var fnc22 = '<select class="form-control input-sm" id="fnc22" style="width:90px"></select>';
    var fnc23 = '<span id="fnc23">Periodicidade</span>';

    //config grupo contribuição 1
    var ctr1hd = new tbfld("", fnc5, fnc6, fnc7, "Contrib. Simulada");
    var ctr1fd = new tbfld("Contrib. Normal Participante", fnc1, fnc2, fnc3, fnc4);

    //config grupo contribuição 2
    var ctr2hd = new tbfld("", "", "", "", "Contrib. Simulada");
    var ctr2fd = new tbfld("Contrib. Normal Patrocinadora", "", "", "", fnc8);

    //config grupo contribuição 3
    var ctr3hd = new tbfld("", "Tipo", fnc14 + fnc15, "Periodicidade", "Contrib. Simulada");
    var ctr3fd = new tbfld("Voluntária Participante", fnc10, fnc16 + fnc11, fnc12, fnc13);

    //config grupo contribuição 4
    var ctr4hd = new tbfld("", "Opção", fnc20, fnc23, "Contrib. Simulada");
    var ctr4fd = new tbfld("Jóia Participante", fnc21, fnc19, fnc22, fnc9);

    //carregamento das contribuiç&otilde;es no array de configuração
    contribCfg.push([ctr1hd, ctr1fd]);
    contribCfg.push([ctr2hd, ctr2fd]);
    contribCfg.push([ctr3hd, ctr3fd]);
    contribCfg.push([ctr4hd, ctr4fd]);

    var i = contribCfg.length; //quantidade de iteraç&otilde;es para criação dos forms de contribuição

    //console.log(contribCfg);
    if (isMobile.phone || isMobile.tablet) {

      var tableContrib = '<div class="row"><div class="table-responsive"><div class="col-xs-12 col-sm-12 col-md-12"><br />';

      for (d = 1; d <= i; d++){  //quantidade de grupo de contribuiç&otilde;es
        tableContrib += '<table border="0" class="table table-condensed table-striped table-contrib" id="tblCtr' + d + '">';
        for(e = 1; e <= 5; e++){ //5 iterações: 1 para o título, outra para os campos dentro do grupo de contribuições
           if (contribCfg[d-1][1]["fld" + e] != "") {//verifica se ctrfd é vazio para não imprimir linha
              tableContrib += '<tr>';
          for (f = 1; f <= 2; f++){ //quantidade de colunas por grupo de contribuição
            if (e == 1){ //Somente se for o Título da conta
              if (f == 2) {
              tableContrib += '<th colspan="2">' + contribCfg[d-1][f-1]["fld" + e] + '</th>';
                }
            }else{
              if (e % 2 == 0){//Separação das cores de cada linha
                  if (f == 1){
                    tableContrib += '<td align="left" width="24%">' + contribCfg[d-1][f-1]["fld" + e] + '</td>';
                  }else{
                    tableContrib += '<td align="right" width="19%">' + contribCfg[d-1][f-1]["fld" + e] + '</td>';
                  }
               } else {
                  if (f == 1){
                    tableContrib += '<td class="success" align="left" width="24%">' + contribCfg[d-1][f-1]["fld" + e] + '</td>';
                  }else{
                    tableContrib += '<td class="success" align="right" width="19%">' + contribCfg[d-1][f-1]["fld" + e] + '</td>';
                  }
               }
             }
           }
           tableContrib += '</tr>';
          }
        }
        tableContrib += '</table>'
      }
      tableContrib += '</div></div></div>'

    } else {

       var tableContrib = '<div class="row"><div class="table-responsive"><div class="col-xs-12 col-sm-12 col-md-12">';

      for (a = 1; a <= i; a++){  //quantidade de grupo de contribuiç&otilde;es
        tableContrib += '<table border="0" class="table table-condensed" id="tblCtr' + a + '">';
        for(b = 1; b <= 2; b++){ //2 iterações: 1 para o título, outra para o campo dentro do grupo de contribuições
          tableContrib += '<tr>'
          for (c = 1; c <= 5; c++){ //quantidade de colunas por grupo de contribuição
            if (b == 1){
              tableContrib += '<th>' + contribCfg[a-1][b-1]["fld" + c] + '</th>';
            }else{
              if (c == 1){
                tableContrib += '<td class="success" align="left" width="24%">' + contribCfg[a-1][b-1]["fld" + c] + '</td>';
              }else{
                tableContrib += '<td class="success" align="center" width="19%">' + contribCfg[a-1][b-1]["fld" + c] + '</td>';
              }
            }
          }
          tableContrib += '</tr>'
        }
        tableContrib += '</table>'
      }
      tableContrib += '</div></div></div>'
    }

    tableContrib += '<div class="row"><div class="col-xs-12 col-sm-12 col-md-12">'+ fnc17 +''+ fnc18 +'</div></div>'

    $("#gridContrib").html(tableContrib);

    Contrib_Control()
}

function Contrib_Control(){
    SalPartic = Salario > MaxSalPart? MaxSalPart : Salario;  //Salário de participação

    var x = 0;

    $('#fnc12').append('<option value="Unico">Único</option>');
    $('#fnc12').append('<option value="Mensal">Mensal</option>');
    $('#fnc12').append('<option value="Anual">Anual</option>');
    $('#fnc12').prop("selectedIndex", 0);

    $('#fnc10').append('<option value="Percentual">Percentual</option>');
    $('#fnc10').append('<option value="Valor">Valor</option>');
    $('#fnc10').prop("selectedIndex", 1);
    $('#fnc10').attr("disabled", "disabled");

    $('#fnc21').append('<option value="NContribuir">Não Contribuir</option>');
    $('#fnc21').append('<option value="AVista">À Vista</option>');
    $('#fnc21').append('<option value="APrazo">A Prazo</option>');
    $('#fnc21').append('<option value="Averbacao">Averbação</option>');
    $('#fnc21').prop("selectedIndex", 2);

    $('#fnc22').append('<option value="Unico">Único</option>');
    $('#fnc22').append('<option value="Mensal">Mensal</option>');
    $('#fnc22').prop("selectedIndex", 0);
    $('#fnc22').attr("disabled", "disabled");

    // Inicializa percentuais de selects fnc

    $('#fnc1').val("" + $.formatNumber(Faixa1 * 100, {format: "#,##0.00", locale: "br"})+"%");
    $('#fnc2').val("" + $.formatNumber(Faixa2 * 100, {format: "#,##0.00", locale: "br"})+"%");
    $('#fnc3').val("" + $.formatNumber(Faixa3 * 100, {format: "#,##0.00", locale: "br"})+"%");

    for (x = 0; x <= 100; x += 1){
      $('#fnc16').append('<option value=' + x / 100 + '>' + $.formatNumber(x, {format: "#,##0.0", locale: "br"}) + '%</option>');
    };

    // Valores Iniciais FNC
    $('#fnc1').attr("disabled", "disabled");
    $('#fnc2').attr("disabled", "disabled");
    $('#fnc3').attr("disabled", "disabled");

    //Esconde mensagens
    $('#fnc17').hide();
    $('#fnc18').hide();

    //Esconde FNC
    $('#fnc14').hide();
    $('#fnc16').hide();

//----------------------------------------------------- Inicializa Contribuições ---------------------------------------------------------

    //Inicializa Contribuições

      //controlFaixaPart();

      //Checa direito a contribuição jóia
      pgtoJoia = (DataDif(Ncmto, DtAdesao, 0, 2) >= 36) ? true : false;

      if (pgtoJoia == true){
        if (Deslogado == false){  //Participante Logado
           ContribJoia = checkJoia()[0]; //Retorna valor de contribuição jóia caso exista
           typePgtoJoia = checkJoia()[1]; //Retorna Status Joia (0 = Não pagante, 1 = Mensal, 2 = Único )
           $('#fnc21').attr("disabled", "disabled"); //desabilita campo de opção
           if (typePgtoJoia == 1) {
              //Valor Percentual Jóia
              $('#fnc9').val("R$ " + $.formatNumber(ContribJoia, {format: "#,##0.00", locale: "br"}));
             if (CPF == '299.603.637-91' || CPF == '599.689.667-20') { //Joia de averbação
               $('#fnc19').val("" + $.formatNumber(((ContribJoia/calcContribPart()) * 100), {format: "#,##0.00", locale: "br"})+"%");
               $('#fnc21').prop("selectedIndex", 3);
               $('#fnc22').prop("selectedIndex", 1);
             } else {
               $('#fnc19').val("" + $.formatNumber(((ContribJoia/Salario) * 100), {format: "#,##0.00", locale: "br"})+"%");
               $('#fnc21').prop("selectedIndex", 2);
               $('#fnc22').prop("selectedIndex", 1);            
             }
	   } else if (typePgtoJoia == 2){
              $('#fnc9').val("R$ " + $.formatNumber(ContribJoia, {format: "#,##0.00", locale: "br"}));
              ContribJoia = 0;
              $('#fnc19').hide();
              $('#fnc20').hide();
              $('#fnc21').prop("selectedIndex", 1);
              $('#fnc22').prop("selectedIndex", 0);
           } else {
              ContribJoia = 0;
              $("#tblCtr4").hide();
           }
         } else { //Participante Deslogado
           ContribJoia = calcContribJoia(0); //Calcula valor de contribuição jóia, inicial 0 = mensal, 1 = a vista
           typePgtoJoia = 1; //Status inicial para deslogado será jóia mensal
           //Valor Percentual Jóia
           $('#fnc19').val("" + $.formatNumber(((ContribJoia/Salario) * 100), {format: "#,##0.00", locale: "br"})+"%");
           $('#fnc9').val("R$ " + $.formatNumber(ContribJoia, {format: "#,##0.00", locale: "br"}));
         }
      } else {
        $("#tblCtr4").hide();
      }

      //Participante
      ContribCalc[0][0] = calcContribPart();
      ContribCalc[0][1] = 0;
      ContribCalc[0][2] = 1;
      ContribCalc[0][3] = 0;
      $('#fnc4').val("R$ " + $.formatNumber(ContribCalc[0][0], {format: "#,##0.00", locale: "br"}));

      //Patrocinadora
      ContribCalc[1][0] = ContribCalc[0][0];
      ContribCalc[1][1] = 1;
      ContribCalc[1][2] = 1;
      ContribCalc[1][3] = 0;
      $('#fnc8').val("R$ " + $.formatNumber(ContribCalc[1][0], {format: "#,##0.00", locale: "br"}));

      //Voluntária
      $('#fnc11').val("");
      $('#fnc13').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
      ContribCalc[2][0] = 0; //valor da contribuição
      ContribCalc[2][1] = 0; //responsável pela contribuição - Patroc ou Partic
      ContribCalc[2][2] = 0; //Perfil da contribuição
      ContribCalc[2][3] = ContribCalc[2][3] = ($('#fnc12').val() == "Mensal") ? 0 : ($('#fnc12').val() == "Anual") ? 1 : 2; //Periodicidade da contribuição - 0: mensal, 1: anual, 2: único

      //Jóia
      ContribCalc[3][0] = ContribJoia;
      ContribCalc[3][1] = 0;
      ContribCalc[3][2] = 1;
      ContribCalc[3][3] = typePgtoJoia == 2 ? 2 : 0;//Periodicidade da contribuição - 0: mensal, 1: anual, 2: único

//------------------------------------------------------- Eventos Change ---------------------------------------------------------


    //Contribução Voluntária Participante
    $('#fnc12').change(function() {
       ContribCalc[2][3] = ($('#fnc12').val() == "Mensal") ? 0 : ($('#fnc12').val() == "Anual") ? 1 : 2;
       /*if (status == 9){
        BenefBar(BenefCheckOpt);
       }*/
    });

    $('#fnc10').change(function() {
      if ($('#fnc10').val() == "Percentual"){
        $('#fnc11').hide();
        $('#fnc16').fadeIn();
        $('#fnc16').prop("selectedIndex", 0);
        $('#fnc13').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
        ContribCalc[2][0] = 0;
        ContribCalc[2][1] = 0;
        ContribCalc[2][2] = 0;
        $('#fnc15').hide();
        $('#fnc14').fadeIn();
      }else{
        $('#fnc16').hide();
        $('#fnc16').prop("selectedIndex", 0);
        $('#fnc11').val("");
        $('#fnc11').fadeIn();
        $('#fnc13').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
        ContribCalc[2][0] = 0;
        ContribCalc[2][1] = 0;
        ContribCalc[2][2] = 0;
        $('#fnc14').hide();
        $('#fnc15').fadeIn();
      };
    });

    $('#fnc21').change(function() {
      if ($('#fnc21').val() == "AVista"){
        $('#fnc20').fadeOut();
        $('#fnc19').fadeOut();
        $('#fnc22').prop("selectedIndex", 0);
        $('#fnc22').fadeIn();
        $('#fnc23').fadeIn();
        ContribCalc[3][0] = calcContribJoia(1);
        ContribCalc[3][1] = 0;
        ContribCalc[3][2] = 1;
        ContribCalc[3][3] = ($('#fnc22').val() == "Mensal") ? 0 : ($('#fnc22').val() == "Anual") ? 1 : 2; //Periodicidade da contribuição - 0:
        $('#fnc9').val("R$ " + $.formatNumber(ContribCalc[3][0], {format: "#,##0.00", locale: "br"}));
      } else if ($('#fnc21').val() == "APrazo" || $('#fnc21').val() == "Averbacao") {
        $('#fnc20').fadeIn();
        $('#fnc19').fadeIn();
        $('#fnc22').prop("selectedIndex", 1);
        $('#fnc22').fadeIn();
        $('#fnc23').fadeIn();
        ContribCalc[3][0] = calcContribJoia(0);
        ContribCalc[3][1] = 0;
        ContribCalc[3][2] = 1;
        ContribCalc[3][3] = ($('#fnc22').val() == "Mensal") ? 0 : ($('#fnc22').val() == "Anual") ? 1 : 2; //Periodicidade da contribuição - 0:
        $('#fnc9').val("R$ " + $.formatNumber(ContribCalc[3][0], {format: "#,##0.00", locale: "br"}));
      } else {
        $('#fnc20').fadeOut();
        $('#fnc19').fadeOut();
        $('#fnc22').fadeOut();
        $('#fnc23').fadeOut();
        ContribCalc[3][0] = 0;
        ContribCalc[3][1] = 0;
        ContribCalc[3][2] = 1;
        $('#fnc9').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
      };
    });

    $('#fnc16').change(function() {
      $('#fnc13').val("R$ " + $.formatNumber((SalPartic - ContribCalc[0][0]) * $('#fnc16').val(), {format: "#,##0.00", locale: "br"}));
      ContribCalc[2][0] = (SalPartic - ContribCalc[0][0]) * $('#fnc16').val();
      ContribCalc[2][1] = 0;
      ContribCalc[2][2] = 0;
    });

    $('#fnc11').change(function () {
      $('#fnc11').val($('#fnc11').val().replace(",","."));
      if (isNaN($('#fnc11').val())){
        $('#fnc17').html('<strong>Atenção!</strong> Digite apenas números.');
        $('#fnc17').fadeIn();
        $('#fnc11').val("");
        $('#fnc13').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
        ContribCalc[2][0] = 0;
        ContribCalc[2][1] = 0;
        ContribCalc[2][2] = 0;
        setTimeout(function(){$('#fnc17').fadeOut();}, 4000);
      }else{
        ContribCalc[2][0] = $('#fnc11').val();
        ContribCalc[2][1] = 0;
        ContribCalc[2][2] = 0;
        $('#fnc11').val($.formatNumber($('#fnc11').val(), {format: "#,##0.00", locale: "br"}));
        $('#fnc13').val("R$ " + $('#fnc11').val());
      };
     });

};

function calcContribPart(){

  var partCtr1 = 0;
  var partCtr2 = 0;
  var partCtr3 = 0;
  var partCtrFaixaT = 0;

      //CALCULO DA CONTRIBUIÇÃO PARTICIPANTE FAIXA 1
      partCtr1 = SalPartic * Faixa1;

      //CALCULO DA CONTRIBUIÇÃO PARTICIPANTE FAIXA 2
      if (SalPartic - (TetoINSS/2) > 0){
           partCtr2 = (SalPartic - (TetoINSS/2)) * Faixa2;
      }
      //CALCULO DA CONTRIBUIÇÃO PARTICIPANTE FAIXA 3
      if (SalPartic - TetoINSS > 0){
           partCtr3 = (SalPartic - TetoINSS) * Faixa3;
      }

   partCtrFaixaT =  partCtr1 + partCtr2 + partCtr3;

   if (status == 3) {
      partCtrFaixaT = partCtrFaixaT + (partCtrFaixaT / Nper);
   }

   return partCtrFaixaT;
};


function controlFaixaPart(){

   if (SalPartic - (TetoINSS/2) <= 0){
        $('#fnc2').val(" - ");
        $('#fnc3').val(" - ");
     } //FIM FAIXA 2

     //CONTRIBUIÇÃO BÁSICA FAIXA 2
     if (SalPartic - TetoINSS <= 0){
        $('#fnc3').val(" - ");
     }  //FIM FAIXA 3

};

function checkJoia(){  //Retorna Status de pagamento Contrib Joia participante

  var contribJoia = 0;
  var ctrCatch = 0; //Controle para capturar apenas a última contribuição Jóia
  var contaJoia = 0; //Conta quantidade de contribuições Jóia participante
  var ctrJoia = 0; //0 = Não paga Joia, 1 = Paga Jóia Mensal, 2 = Jóia pagamento único
  var i = TextMovto.movimentacoes.length - 1;

  if(i > -1){

  do {
    var movto = TextMovto.movimentacoes[i];
    if ((movto.id_conta == 1205 || movto.id_conta == 1126) && movto.conta_resp == 0 && ctrCatch == 0){ //Pega a última Contrib Jóia
      contribJoia =  movto.ctr_rent;
      ctrCatch++;
    }
    if ((movto.id_conta == 1205 || movto.id_conta == 1126) && movto.conta_resp == 0){ //Se Conta Jóia e Responsável Participante = True
      contaJoia++;
    }
    i--;
  } while(i >= 0)

  if(contaJoia > 1){ //Jóia mensal
     ctrJoia =  1;
  } else if (contaJoia == 1) { //Jóia quitada
     ctrJoia = 2;
  }

  }

 return [contribJoia, ctrJoia];

}

function calcContribJoia(saida){ //Saida = 0 - Pagamento a prazo, Saida = 1 - Pagamento a vista

   var SalPartic = Salario > (3 * TetoINSS)? (3 * TetoINSS) : Salario;  //Salario do participante SalPartic;
   var idade = DataDif(Ncmto, DtAdesao, 0, 2); //Idade na data de adesão
   var JTetoINSS = TetoINSS;                    //Teto INSS Vigente
   var s1;                                     //S1 = Salário / TetoINSS
   var r1 = 0, r2 = 0;                                 //Indicador
   var f1 = 0, f2 = 0;                                 //Fator
   var nj = 0;
   var p = 0;    //Valor percentual da Jóia
   var j = 0;    //Valor de Fator Jóia
   var jp = 0;   //Valor de Jóia Percentual
   var jv = 0;   //Valor de Jóia a vista

   //limitador de idade
   idade = (idade > 50) ? 50 : idade ;  //Idade Participante SaldoDIB limitado a 50 anos

   //calc S1
   s1 = SalPartic / JTetoINSS;

   s1 = (s1 >= 3 ? 3 : s1);

   //calc r1, r2, f1, f2
   for(var i in TabuaJoia){
     var obj = TabuaJoia[i];
     var obj2 = TabuaJoia[parseInt(i)+1] == undefined ? TabuaJoia[i] : TabuaJoia[parseInt(i)+1] ;

     if((obj.indicador <= s1)&&(obj2.indicador >= s1) && obj.idade == idade && obj2.idade == idade){
         r1 += obj.indicador;
         r2 += obj2.indicador;

         f1 += obj.fator1;
         f2 += obj2.fator1;

         for(var j in FatorAtuarial){
           if(FatorAtuarial[j].idade == obj.idade){
              nj = FatorAtuarial[j].fator;
           }
         }

         p += obj2.fator2;

         break;
      }
   }

   //calc Jóia
   if (r1 > 0 && r2 > 0){
    j = f1 + (((s1 - r1).toFixed(4) * 1) / ((r2 - r1).toFixed(4) * 1)) * ((f2 - f1).toFixed(4) * 1);
    j = (j).toFixed(4) * 1;
   }

   //return deve ser o valor da contrib joia ja calculado
   if(saida == 1){
     //calc joia a vista
     jv = nj * j * JTetoINSS;
     return jv;
   } else {
     //calc joia percentual
     jp = nj * p;
     jp = (jp).toFixed(2) * 1;
     jp = Salario * (jp/100);
     jp = (jp).toFixed(2) * 1;
     return jp;
   }
}

function clearInput(el){
  el.value = '';
}

//Controle de Apropriação Monta Saldo
function SaldoParticipante1(JSONobj){
  if (JSONobj.conta_resp == 0 && JSONobj.perfil == NomePerfil1 && JSONobj.id_conta != 1245 && JSONobj.id_conta != 1246){
    return true;
  }else{
    return false;
  }
}

function SaldoParticipante2(JSONobj){
  if (JSONobj.conta_resp == 0 && JSONobj.perfil == NomePerfil2 && JSONobj.id_conta != 1245 && JSONobj.id_conta != 1246){ // && (JSONobj.id_conta == 1208 || JSONobj.nome_conta == "Voluntária Participante")
    return true;
  }else{
    return false;
  }
}

function SaldoPatrocinadora1(JSONobj){
  if (status == 3){ //Autopatrocinado
     var DtPatronal =  new Date("07/01/2010"); //Data inicial de saldo de direito parte patronal Resgate Autopatrocinado
     if(JSONobj.conta_resp == 1 && JSONobj.perfil == NomePerfil1 && JSONobj.id_conta != 1245 && JSONobj.id_conta != 1246 && DataDif(JSONobj.data_movto, DtPatronal, 0, 1) >= 0){
         return true;
     } else {
         return false;
     };
  } else { //Diferente de Autopatrocinado
    if(JSONobj.conta_resp == 1 && JSONobj.perfil == NomePerfil1 && JSONobj.id_conta != 1245 && JSONobj.id_conta != 1246){
      return true;
    }else{
      return false;
    };
  };
}

function SaldoPatrocinadora2(JSONobj){
  if (status == 3){ //Autopatrocinado
     var DtPatronal =  new Date("07/01/2010"); //Data inicial de saldo de direito parte patronal Resgate Autopatrocinado
     if(JSONobj.conta_resp == 1 && JSONobj.perfil == NomePerfil2 && JSONobj.id_conta != 1245 && JSONobj.id_conta != 1246 && DataDif(JSONobj.data_movto, DtPatronal, 0, 1) >= 0){
         return true;
     } else {
         return false;
     };
  } else { //Diferente de Autopatrocinado
    if(JSONobj.conta_resp == 1 && JSONobj.perfil == NomePerfil2 && JSONobj.id_conta != 1245 && JSONobj.id_conta != 1246){
      return true;
    }else{
      return false;
    };
  };
}

function SaldoPortabFechada1(JSONobj){
  if (JSONobj.perfil == NomePerfil1 && (JSONobj.id_conta == 1245 || JSONobj.id_conta == 1246)){
    return true;
  }else{
    return false;
  }
}

function SaldoPortabFechada2(JSONobj){
  if (JSONobj.perfil == NomePerfil2 && (JSONobj.id_conta == 1245 || JSONobj.id_conta == 1246)){
    return true;
  }else{
    return false;
  }
}

function SaldoAdicional_1(JSONobj){
 if (JSONobj.conta_resp == 0 && JSONobj.perfil == NomePerfil1 && (JSONobj.id_conta == 1245 || JSONobj.id_conta == 1246 || JSONobj.id_conta == 1285 || JSONobj.id_conta == 1286 || JSONobj.id_conta == 1208 || JSONobj.nome_conta == "Voluntária Participante")){
    return true;
  }else{
    return false;
  }
}

function SaldoAdicional_2(JSONobj){
 if (JSONobj.conta_resp == 0 && JSONobj.perfil == NomePerfil2 && (JSONobj.id_conta == 1245 || JSONobj.id_conta == 1246 || JSONobj.id_conta == 1285 || JSONobj.id_conta == 1286 || JSONobj.id_conta == 1208 || JSONobj.nome_conta == "Voluntária Participante")){
    return true;
  }else{
    return false;
  }
}

function SaldoExtra_1(JSONobj){
 return false;
}

function SaldoExtra_2(JSONobj){
 return false;
}
