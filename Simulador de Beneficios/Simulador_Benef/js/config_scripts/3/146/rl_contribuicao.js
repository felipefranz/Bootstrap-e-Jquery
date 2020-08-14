<!-- saved from url=(0016)http://localhost -->
var ContribCalc = [[],[],[],[],[]];                             //variável global do valor das contribui&ccedil;&otilde;es calculadas
var contribCfg = []; //array global de configura&ccedil;&atilde;o das contribui&ccedil;&otilde;es
var minCtr = 0;
var contrib_patroc = 0; //percentual de contribuição patrocinadora

//fun&ccedil;&atilde;o para criar o form de contribui&ccedil;&atilde;o dinamicamente
function Monta_Contrib(){
    //objeto prototype contribui&ccedil;&atilde;o
    var tbfld = function(cp1, cp2, cp3, cp4, cp5){
      this.fld1 = cp1;
      this.fld2 = cp2,
      this.fld3 = cp3,
      this.fld4 = cp4,
      this.fld5 = cp5
    };

    //criar funcionalidade com id unico para acoplar ao grupo de contribui&ccedil;&atilde;o
    //Conven&ccedil;&atilde;o ID funcionalidade: mesmo nome da variavel
    var fnc1 = '<select class="form-control input-sm" id="fnc1" size="1" style="width:80px;"></select>';
    var fnc2 = '<input type="text" class="form-control input-sm" id="fnc2" style="width:80px;" readonly>';
    var fnc3 = '<input type="text" class="form-control input-sm" id="fnc3" style="width:100px;" readonly>';
    var fnc4 = '<input type="text" class="form-control input-sm" id="fnc4" style="width:100px;" readonly>';
    var fnc5 = '<select class="form-control input-sm" id="fnc5" style="width:105px"></select>';
    var fnc6 = '<select class="form-control input-sm" id="fnc6" size="1" style="width:85px"></select>';
    var fnc7 = '<select class="form-control input-sm" id="fnc7" style="width:90px"></select>';
    var fnc8 = '<input type="text" class="form-control input-sm" id="fnc8" style="width:110px;" readonly>';
    var fnc9 = '<input type="text" class="form-control input-sm" id="fnc9" style="width:110px;">';
    var fnc10 = '<input type="text" class="form-control input-sm" id="fnc10" style="width:100px;" readonly>';
    var fnc11 = '<input type="text" class="form-control input-sm" id="fnc11" style="width:100px;" readonly>';
    var fnc12 = '<div class="alert alert-danger" role="alert" id="fnc12"></div>';
    var fnc13 = '<span id="fnc13">%</span>';
    var fnc14 = '<span id="fnc14">Valor (R$)</span>';
    var fnc15 = '<span id="fnc15">Contribui&ccedil;&atilde;o Voluntária<span>';

    //config grupo contribui&ccedil;&atilde;o 1
    var ctr1hd = new tbfld("", "	Percentual Contrib.", "", "", "Contrib. Simulada");
    var ctr1fd = new tbfld("Contribui&ccedil;&atilde;o Participante", fnc1, "", "", fnc3);

    //config grupo contribui&ccedil;&atilde;o 2
    var ctr2hd = new tbfld("", "Percentual Contrib.", "", "", "Contrib. Simulada");
    var ctr2fd = new tbfld("Contribui&ccedil;&atilde;o Patrocinadora", fnc2, "", "", fnc10);

    //config grupo contribui&ccedil;&atilde;o 3
    var ctr3hd = new tbfld("", "Tipo", fnc13 + fnc14, "Periodicidade", "Contrib. Simulada");
    var ctr3fd = new tbfld(fnc15, fnc5, fnc6 + fnc9, fnc7, fnc8);


    //carregamento das contribui&ccedil;&otilde;es no array de configura&ccedil;&atilde;o
    contribCfg.push([ctr1hd, ctr1fd]);
    contribCfg.push([ctr2hd, ctr2fd]);
    contribCfg.push([ctr3hd, ctr3fd]);


    var i = contribCfg.length; //quantidade de itera&ccedil;&otilde;es para cria&ccedil;&atilde;o dos forms de contribui&ccedil;&atilde;o

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

    tableContrib += '<div class="row"><div class="col-xs-12 col-sm-12 col-md-12">' + fnc12 + '</div></div>'

    $("#gridContrib").html(tableContrib);

    Contrib_Control()
}

function Contrib_Control(){
    var x = 0;
    var maxPercentPart = percParticipante();

    $('#fnc7').append('<option value="Unico">Único</option>');
    $('#fnc7').append('<option value="Mensal">Mensal</option>');
    $('#fnc7').append('<option value="Anual">Anual</option>');
    $('#fnc7').prop("selectedIndex", 0);

    $('#fnc5').append('<option value="Percentual">Percentual</option>');
    $('#fnc5').append('<option value="Valor">Valor</option>');
    $('#fnc5').prop("selectedIndex", 0);
    $('#fnc5').attr("disabled", "disabled");

    // Valores Iniciais FNC
    for (x = 0.5; x <= maxPercentPart; x += 0.5){
      $('#fnc1').append('<option value=' + x / 100 + '>' + $.formatNumber(x, {format: "#,##0.0", locale: "br"}) + '%</option>');
    };

    for (x = 0; x <= 100; x += 1){
      $('#fnc6').append('<option value=' + x / 100 + '>' + $.formatNumber(x, {format: "#,##0.0", locale: "br"}) + '%</option>');
    };

    $('#fnc6').prop("selectedIndex", 0);

    //Esconde
    $('#fnc12').hide();
    $('#fnc9').hide();
    $('#fnc14').hide();

    $('#fnc1').prop("selectedIndex", $('#fnc1 option').length - 1);
    $('#fnc2').attr("disabled", "disabled");

    contrib_patroc = percPatrocinadora();

//----------------------------------------------------- Inicializa Contribuições ---------------------------------------------------------

    $('#fnc3').val("R$ " + $.formatNumber(Salario * $('#fnc1').val(), {format: "#,##0.00", locale: "br"}));
    ContribCalc[0][0] = Salario * $('#fnc1').val()
    ContribCalc[0][1] = 0;
    ContribCalc[0][2] = 1;
    ContribCalc[0][3] = 0;

    $('#fnc2').val("" + $.formatNumber(contrib_patroc * 100, {format: "#,##0.00", locale: "br"}) + "%");
    $('#fnc10').val("R$ " + $.formatNumber(ContribCalc[0][0] * contrib_patroc, {format: "#,##0.00", locale: "br"}));
    ContribCalc[1][0] = ContribCalc[0][0] * contrib_patroc;
    ContribCalc[1][1] = 1;
    ContribCalc[1][2] = 1;
    ContribCalc[1][3] = 0;

    $('#fnc8').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
    ContribCalc[2][0] = 0; //valor da contribui&ccedil;&atilde;o
    ContribCalc[2][1] = 0; //responsável pela contribui&ccedil;&atilde;o - Patroc ou Partic
    ContribCalc[2][2] = 1; //Perfil da contribui&ccedil;&atilde;o
    ContribCalc[2][3] = ContribCalc[2][3] = ($('#fnc7').val() == "Mensal") ? 0 : ($('#fnc7').val() == "Anual") ? 1 : 2; //Periodicidade da contribuição - 0: mensal, 1: anual, 2: único
    //$('#fnc4').val("R$ " + $.formatNumber(UltContribPart, {format: "#,##0.00", locale: "br"})); //campo criado dinamicamente na fun&ccedil;&atilde;o Monta_Contrib();
    //$('#fnc11').val("R$ " + $.formatNumber(UltContribPatroc, {format: "#,##0.00", locale: "br"})); //campo criado dinamicamente na fun&ccedil;&atilde;o Monta_Contrib();

//------------------------------------------------------- Eventos Change ---------------------------------------------------------

    $('#fnc1').change(function() {
      $('#fnc3').val("R$ " + $.formatNumber(Salario * $('#fnc1').val(), {format: "#,##0.00", locale: "br"}));
      ContribCalc[0][0] = Salario * $('#fnc1').val()
      ContribCalc[0][1] = 0;
      ContribCalc[0][2] = 1;
      ContribCalc[0][3] = 0;

      $('#fnc2').val("" + $.formatNumber(contrib_patroc * 100, {format: "#,##0.00", locale: "br"}) + "%");
      $('#fnc10').val("R$ " + $.formatNumber(ContribCalc[0][0] * contrib_patroc, {format: "#,##0.00", locale: "br"}));
      ContribCalc[1][0] = ContribCalc[0][0] * contrib_patroc;
      ContribCalc[1][1] = 1;
      ContribCalc[1][2] = 1;
      ContribCalc[1][3] = 0;
    });

    /*
    $('#fnc2').change(function() {
      $('#fnc3').val("R$ " + $.formatNumber((Salario - 10 * URP) * $('#fnc2').val() + (10 * URP) * $('#fnc1').val(), {format: "#,##0.00", locale: "br"}));
      ContribCalc[0][0] = (Salario - 10 * URP) * $('#fnc2').val() + (10 * URP) * $('#fnc1').val();
      ContribCalc[0][1] = 0;
      ContribCalc[0][2] = 1;
      ContribCalc[0][3] = 0;

      $('#fnc10').val("R$ " + $.formatNumber(ContribCalc[0][0] * contrib_patroc, {format: "#,##0.00", locale: "br"}));
      ContribCalc[1][0] = ContribCalc[0][0] * contrib_patroc;
      ContribCalc[1][1] = 1;
      ContribCalc[1][2] = 1;
      ContribCalc[1][3] = 0;
    });
    */

    $('#fnc7').change(function() {
       ContribCalc[2][3] = ($('#fnc7').val() == "Mensal") ? 0 : ($('#fnc7').val() == "Anual") ? 1 : 2;
       if (status == 9){
        BenefBar(BenefCheckOpt);
       }
    });

    $('#fnc5').change(function() {
      if ($('#fnc5').val() == "Percentual"){
        $('#fnc9').hide();
        $('#fnc6').fadeIn();
        $('#fnc6').val("");
        $('#fnc8').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
        ContribCalc[2][0] = 0;
        ContribCalc[2][1] = 0;
        ContribCalc[2][2] = 1;
        $('#fnc14').hide();
        $('#fnc13').fadeIn();
      }else{
        $('#fnc6').hide();
        $('#fnc6').prop("selectedIndex", 0);
        $('#fnc9').val("");
        $('#fnc9').fadeIn();
        $('#fnc8').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
        ContribCalc[2][0] = 0;
        ContribCalc[2][1] = 0;
        ContribCalc[2][2] = 1;
        $('#fnc13').hide();
        $('#fnc14').fadeIn();
      };
    });

    $('#fnc6').change(function() {
      $('#fnc8').val("R$ " + $.formatNumber(Salario * $('#fnc6').val(), {format: "#,##0.00", locale: "br"}));
      ContribCalc[2][0] = Salario * $('#fnc6').val();
      ContribCalc[2][1] = 0;
      ContribCalc[2][2] = 1;
    });

    $('#fnc9').change(function () {
      //status == 9 ? minCtr = URP : minCtr = (Salario * 0.01);
      $('#fnc9').val($('#fnc9').val().replace(",","."));
      if (isNaN($('#fnc9').val())){
        //$('#fnc12').html('<strong>Aten&ccedil;&atilde;o!</strong> Digite apenas n&uacute;meros. O valor m&iacute;nimo é R$ ' + $.formatNumber(minCtr, {format: "#,##0.00", locale: "br"}) + '.')
        $('#fnc12').fadeIn();
        $('#fnc9').val("");
        $('#fnc8').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
        ContribCalc[2][0] = 0;
        ContribCalc[2][1] = 0;
        ContribCalc[2][2] = 1;
        setTimeout(function(){$('#fnc12').fadeOut();}, 4000);
      } else {
        if ($('#fnc9').val() < minCtr){
          $('#fnc9').val($.formatNumber($('#fnc9').val(), {format: "#,##0.00", locale: "br"}));
          //$('#fnc12').html('<strong>Aten&ccedil;&atilde;o!</strong> O valor m&iacute;nimo é R$ ' + $.formatNumber(minCtr, {format: "#,##0.00", locale: "br"}) + '.')
          $('#fnc12').fadeIn();
          $('#fnc9').val("");
          $('#fnc8').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
          ContribCalc[2][0] = 0;
          ContribCalc[2][1] = 0;
          ContribCalc[2][2] = 1;
          setTimeout(function(){$('#fnc12').fadeOut();}, 4000);
        }else{
          ContribCalc[2][0] = $('#fnc9').val();
          ContribCalc[2][1] = 0;
          ContribCalc[2][2] = 1;
          $('#fnc9').val($.formatNumber($('#fnc9').val(), {format: "#,##0.00", locale: "br"}));
          $('#fnc8').val("R$ " + $('#fnc9').val());

        };
      };
      if (status == 9){
        BenefBar(BenefCheckOpt);
      }
    });

    $('#fnc9').change(function () {
     /*
     //recebimento voluntária apenas por percentual
      maxCtr = (Salario * 0.12) - (Salario * $('#fnc1').val()); //Parcela do salário aplicável disponível para contribuição voluntária
      faixaCtr = (Salario * 0.12);  //Faixa limite que compreende 12% do salário aplicável
     $('#fnc9').val($('#fnc9').val().replace(",","."));
      partCtr = parseFloat($('#fnc9').val()) + (Salario * $('#fnc1').val());  // Soma de Contrib. Partic. + Contrib. Voluntária
     //status == 9 ? maxCtr = URP : maxCtr = (Salario * 0.12);
     if (isNaN($('#fnc9').val())){
       $('#fnc12').html('<strong>Atenção!</strong> Digite apenas números. O valor de contribuição voluntária deve ser inferior a R$ ' + $.formatNumber(maxCtr, {format: "#,##0.00", locale: "br"}) + '.');
       $('#fnc12').fadeIn();
       $('#fnc9').val("");
       $('#fnc8').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
       ContribCalc[4][0] = 0;
       ContribCalc[4][1] = 0;
       ContribCalc[4][2] = 1;
       setTimeout(function(){$('#fnc12').fadeOut();}, 4000);
     }else{
       if (partCtr > faixaCtr){     //Se Contrib. Partic. maior que faixa limite
         $('#fnc9').val($.formatNumber($('#fnc9').val(), {format: "#,##0.00", locale: "br"}));
         $('#fnc12').html('<strong>Atenção!</strong> O valor de contribuição voluntária deve ser inferior a R$ ' + $.formatNumber(maxCtr, {format: "#,##0.00", locale: "br"}) + '.');
         $('#fnc12').fadeIn();
         $('#fnc9').val("");
         $('#fnc8').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
         ContribCalc[4][0] = 0;
         ContribCalc[4][1] = 0;
         ContribCalc[4][2] = 1;
         setTimeout(function(){$('#fnc12').fadeOut();}, 4000);
       }else{
         ContribCalc[4][0] = $('#fnc9').val();
         ContribCalc[4][1] = 0;
         ContribCalc[4][2] = 1;
         $('#fnc9').val($.formatNumber($('#fnc9').val(), {format: "#,##0.00", locale: "br"}));
         $('#fnc8').val("R$ " + $('#fnc9').val());

       };
     };
    /*if (status == 9){
       BenefBar(BenefCheckOpt);
     }*/
   });

};

function percParticipante () {
  var maxPart = 0;

    switch (true){
      case (Salario < (25 * URP)):
        maxPart = 0.5;
        break;
      case (Salario >= (25 * URP) && Salario < (35 * URP)):
        maxPart = 1;
        break;
      case (Salario >= (35 * URP) && Salario < (55 * URP)):
        maxPart = 2.5;
        break;
      case (Salario >= (55 * URP) && Salario < (65 * URP)):
        maxPart = 3.5;
        break;
      case (Salario >= 65):
        maxPart = 4.5;
        break;
    }

  return maxPart;
}


function percPatrocinadora (){

   var percePatroc = 0;
   var tempo_servi = DtDeslig === null ? DataDif(DtAdmissao, DtSaldoDIB, 1 , 4) : DataDif(DtAdmissao, DtDeslig, 1 , 4); // Tempo de serviço em fração de anos
   var idade = DataDif(Ncmto, DtSaldoDIB, 0, 4);
   var fator = 0;

   //maior valor entre tempo de serviço e (idade - 30)
   fator = (idade - 30) >= tempo_servi ? (idade - 30) : tempo_servi;

   switch (true){   //Percentual de contribuição patrocinadora
      case (fator < 5):
        percePatroc = 0.5;
        break;
      case (fator >= 5 && fator <= 10):
        percePatroc = 0.75;
        break;
      case (fator > 10):
        percePatroc = 1;
        break;
    }

  return  percePatroc;
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
  if (JSONobj.conta_resp == 0 && JSONobj.perfil == NomePerfil2 && JSONobj.id_conta != 1245 && JSONobj.id_conta != 1246){
    return true;
  }else{
    return false;
  }
}

function SaldoPatrocinadora1(JSONobj){
  if (JSONobj.conta_resp == 1 && JSONobj.perfil == NomePerfil1 && JSONobj.id_conta != 1245 && JSONobj.id_conta != 1246){
    return true;
  }else{
    return false;
  }
}

function SaldoPatrocinadora2(JSONobj){
  if (JSONobj.conta_resp == 1 && JSONobj.perfil == NomePerfil2 && JSONobj.id_conta != 1245 && JSONobj.id_conta != 1246){
    return true;
  }else{
    return false;
  }
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
 return false;
}

function SaldoAdicional_2(JSONobj){
 return false;
}

function SaldoExtra_1(JSONobj){
 return false;
}

function SaldoExtra_2(JSONobj){
 return false;
}
