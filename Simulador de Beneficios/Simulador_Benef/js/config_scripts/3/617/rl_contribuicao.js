var ContribCalc = [[],[],[],[],[]];                             //variável global do valor das contribuiç&otilde;es calculadas 
var contribCfg = []; //array global de configuração das contribuiç&otilde;es
var contrib_patroc = 0; //percentual de contribuição patrocinadora


//função para criar o form de contribuição dinamicamente
function Monta_Contrib(){
    //objeto prototype contribuição
    var tbfld = function(cp1, cp2, cp3, cp4, cp5){
      this.fld1 = cp1; 
      this.fld2 = cp2, 
      this.fld3 = cp3, 
      this.fld4 = cp4, 
      this.fld5 = cp5
    };
    
    //criar funcionalidade com id unico para acoplar ao grupo de contribuição
    //Convenção ID funcionalidade: mesmo nome da variavel
    var fnc1 = '<select class="form-control input-sm" id="fnc1" size="1" style="width:80px;"></select>';
    var fnc2 = '<select class="form-control input-sm" id="fnc2" size="1" style="width:80px;"></select>';
    var fnc3 = '<input type="text" class="form-control input-sm" id="fnc3" style="width:100px;" readonly>';
    var fnc4 = '<input type="text" class="form-control input-sm" id="fnc4" style="width:100px;" readonly>';
    var fnc5 = '<select class="form-control input-sm" id="fnc5" style="width:105px"></select>';
    var fnc6 = '<select class="form-control input-sm" id="fnc6" size="1" style="width:85px"></select>';
    var fnc7 = '<select class="form-control input-sm" id="fnc7" style="width:90px"></select>';
    var fnc8 = '<input type="text" class="form-control input-sm" id="fnc8" style="width:110px;" readonly>';
    var fnc9 = '<input type="text" class="form-control input-sm" id="fnc9" style="width:80px;" onclick="clearInput(this)">';
    var fnc10 = '<input type="text" class="form-control input-sm" id="fnc10" style="width:100px;" readonly>';
    var fnc11 = '<input type="text" class="form-control input-sm" id="fnc11" style="width:100px;" readonly>';
    var fnc12 = '<div class="alert alert-warning" role="alert" id="fnc12"></div>';
    var fnc13 = '<span id="fnc13">%</span>';
    var fnc14 = '<span id="fnc14">Valor (R$)</span>';
    var fnc15 = '<span id="fnc15">Voluntária Participante<span>';
    var fnc16 = '<textarea>Enter text here...</textarea>'
    var fnc17 = '<span id="fnc17">2ª Faixa (%)<span>';
    //var fnc18 = '<input type="text" class="form-control input-sm" id="fnc18" style="width:110px;" readonly>';
    //var fnc19 = '<span id="fnc19">Suplementar Participante<span>';
    //var fnc20 = '<select class="form-control input-sm" id="fnc20" style="width:105px"></select>';
    //var fnc21 = '<input type="text" class="form-control input-sm" id="fnc21" style="width:110px;">';
    //var fnc22 = '<select class="form-control input-sm" id="fnc22" style="width:90px"></select>';
    //var fnc23 = '<input type="text" class="form-control input-sm" id="fnc23" style="width:110px;" readonly>';
    var fnc24 = '<span id="fnc24">%</span>';
    var fnc25 = '<span id="fnc25">Valor (R$)</span>';
    //var fnc26 = '<select class="form-control input-sm" id="fnc26" size="1" style="width:85px"></select>';
    var fnc27 = '<div class="alert alert-danger" role="alert" id="fnc27"></div>'; 
    
    //config grupo contribuição 1
    var ctr1hd = new tbfld("", "1ª Faixa (%)", fnc17,"", "Contrib. Simulada");
    var ctr1fd = new tbfld("Básica Participante", fnc1, fnc2, "", fnc3);

    //config grupo contribuição 2
    var ctr2hd = new tbfld("", "", "", "", "Contrib. Simulada");
    var ctr2fd = new tbfld("Normal Patrocinadora", "", "", "", fnc10);     
    
    //config grupo contribuição 3
    var ctr3hd = new tbfld("", "Tipo", fnc13 + fnc14, "Periodicidade", "Contrib. Simulada");
    var ctr3fd = new tbfld(fnc15, fnc5, fnc6 + fnc9, fnc7, fnc8);
    
    //carregamento das contribuiç&otilde;es no array de configuração
    contribCfg.push([ctr1hd, ctr1fd]);
    contribCfg.push([ctr2hd, ctr2fd]);
    contribCfg.push([ctr3hd, ctr3fd]);    

      
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
    
    tableContrib += '<div class="row"><div class="col-xs-12 col-sm-12 col-md-12">' + fnc27 +''+ fnc12 +'</div></div>'
    
    $("#gridContrib").html(tableContrib);
    
    Contrib_Control()
}

function Contrib_Control(){    
    
    $('#fnc7').append('<option value="Unico">Único</option>');
    $('#fnc7').append('<option value="Mensal">Mensal</option>');
    $('#fnc7').append('<option value="Anual">Anual</option>');
    $('#fnc7').prop("selectedIndex", 1);
    $('#fnc7').attr("disabled", "disabled");        
    
    $('#fnc5').append('<option value="Valor">Valor</option>');    
    $('#fnc5').append('<option value="Percentual">Percentual</option>');    
    $('#fnc5').prop("selectedIndex", 0);
    $('#fnc5').attr("disabled", "disabled");
    
    // Inicializa percentuais de selects fnc
    for (x = 0; x <= 3; x += 1){     
        $('#fnc1').append('<option value=' + x / 100 + '>' + $.formatNumber(x, {format: "#,##0.0", locale: "br"}) + '%</option>');   
    };       
      
    for (x = 0; x <= 100; x += 1){
      $('#fnc6').append('<option value=' + x / 100 + '>' + $.formatNumber(x, {format: "#,##0.0", locale: "br"}) + '%</option>');   
    };
          
    if (Salario > 10 * URP){ 
      for (x = 0; x <= 7; x += 1){     
        $('#fnc2').append('<option value=' + x / 100 + '>' + $.formatNumber(x, {format: "#,##0.0", locale: "br"}) + '%</option>');   
      };       
    } else {
      for (x = 0; x <= 0; x += 0){     
        $('#fnc2').append('<option value=' + x / 100 + '>' + $.formatNumber(x, {format: "#,##0.0", locale: "br"}) + '%</option>');   
      };       
    }

    // Valores Iniciais FNC       
    if (Salario > 10 * URP){  
      $('#fnc1').prop("selectedIndex", 3);                    
      $('#fnc2').prop("selectedIndex", 7);                    
    }else{    
      $('#fnc1').prop("selectedIndex", 3); 
      $('#fnc2').prop("selectedIndex", 0);
      $('#fnc2').attr("disabled", "disabled");
      $('#fnc2').hide();  
      $('#fnc17').hide();                       
    };
        
    // Valores Iniciais FNC  
    $('#fnc6').val($.formatNumber(0/100, {format: "#,##0.00", locale: "br"})+"%");
    
    //Esconde                   
    $('#fnc12').hide();
    $('#fnc27').hide();
    $('#fnc6').hide();    
    $('#fnc14').hide();    
    //$('#fnc13').hide();
    
    contrib_patroc = percPatrocinadora();         

//----------------------------------------------------- Inicializa Contribuições ---------------------------------------------------------  
    
    //Inicializa Contribuições    
      
      $('#fnc9').val($('#fnc9').val().replace(",","."));
	    $('#fnc9').val($('#fnc9').val().replace("%",""));
      
      if (Salario <= (10 * URP)) {
                                   
        $('#fnc3').val("R$ " + $.formatNumber(Salario * $('#fnc1').val(), {format: "#,##0.00", locale: "br"})); 
        ContribCalc[0][0] = Salario * $('#fnc1').val();
        ContribCalc[0][1] = 0;
        ContribCalc[0][2] = 1;
        ContribCalc[0][3] = 0;
         
        $('#fnc10').val("R$ " + $.formatNumber(ContribCalc[0][0] * contrib_patroc, {format: "#,##0.00", locale: "br"}));
        ContribCalc[1][0] = ContribCalc[0][0] * contrib_patroc;
        ContribCalc[1][1] = 1;
        ContribCalc[1][2] = 1;
        ContribCalc[1][3] = 0;                

      } else if (Salario > (10 * URP)){
      
        $('#fnc17').show();
        $('#fnc2').show();        
                                
        $('#fnc3').val("R$ " + $.formatNumber(((10 * URP) * $('#fnc1').val()) + ((Salario - (10 * URP)) * $('#fnc2').val()), {format: "#,##0.00", locale: "br"}));
        ContribCalc[0][0] = ((10 * URP) * $('#fnc1').val()) + ((Salario - (10 * URP)) * $('#fnc2').val()) ;
        ContribCalc[0][1] = 0;
        ContribCalc[0][2] = 1;
        ContribCalc[0][3] = 0;
         
        $('#fnc10').val("R$ " + $.formatNumber(ContribCalc[0][0] * contrib_patroc, {format: "#,##0.00", locale: "br"}));
        ContribCalc[1][0] = ContribCalc[0][0] * contrib_patroc;
        ContribCalc[1][1] = 1;
        ContribCalc[1][2] = 1;
        ContribCalc[1][3] = 0;                
      } 
      
      $('#fnc9').val($.formatNumber(0/100, {format: "#,##0.00", locale: "br"})+'%');
      $('#fnc8').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
      ContribCalc[2][0] = 0; //valor da contribuição
      ContribCalc[2][1] = 0; //responsável pela contribuição - Patroc ou Partic
      ContribCalc[2][2] = 1; //Perfil da contribuição
      ContribCalc[2][3] = ContribCalc[2][3] = ($('#fnc7').val() == "Mensal") ? 0 : ($('#fnc7').val() == "Anual") ? 1 : 2; //Periodicidade da contribuição - 0: mensal, 1: anual, 2: único        
      
      //Última contribuição patrocinadora e participante  
      //$('#fnc4').val("R$ " + $.formatNumber(UltContribPart, {format: "#,##0.00", locale: "br"})); //campo criado dinamicamente na função Monta_Contrib(); 
      //$('#fnc11').val("R$ " + $.formatNumber(UltContribPatroc, {format: "#,##0.00", locale: "br"})); //campo criado dinamicamente na função Monta_Contrib();         
    
//------------------------------------------------------- Eventos Change --------------------------------------------------------- 
  
    //1ªFaixa
    $('#fnc1').change(function() {    
      
      $('#fnc3').val("R$ " + $.formatNumber(((10 * URP) * $('#fnc1').val()) + ((Salario - (10 * URP)) * $('#fnc2').val()), {format: "#,##0.00", locale: "br"}));
      ContribCalc[0][0] = ((10 * URP) * $('#fnc1').val()) + ((Salario - (10 * URP)) * $('#fnc2').val()) ;
      ContribCalc[0][1] = 0;
      ContribCalc[0][2] = 1;
      ContribCalc[0][3] = 0;
      
      $('#fnc10').val("R$ " + $.formatNumber(ContribCalc[0][0] * contrib_patroc, {format: "#,##0.00", locale: "br"}));
      ContribCalc[1][0] = ContribCalc[0][0] * contrib_patroc;
      ContribCalc[1][1] = 1;
      ContribCalc[1][2] = 1;
      ContribCalc[1][3] = 0;

      $('#fnc9').val($.formatNumber(0/100, {format: "#,##0.00", locale: "br"})+'%');
      $('#fnc8').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
      ContribCalc[2][0] = 0;
      ContribCalc[2][1] = 0;
      ContribCalc[2][2] = 1;
            
    
    });
    
    //2ªFaixa     
    $('#fnc2').change(function() {          
    
       $('#fnc3').val("R$ " + $.formatNumber(((10 * URP) * $('#fnc1').val()) + ((Salario - (10 * URP)) * $('#fnc2').val()), {format: "#,##0.00", locale: "br"}));
      ContribCalc[0][0] = ((10 * URP) * $('#fnc1').val()) + ((Salario - (10 * URP)) * $('#fnc2').val()) ;
      ContribCalc[0][1] = 0;
      ContribCalc[0][2] = 1;
      ContribCalc[0][3] = 0;
      
      $('#fnc10').val("R$ " + $.formatNumber(ContribCalc[0][0] * contrib_patroc, {format: "#,##0.00", locale: "br"}));
      ContribCalc[1][0] = ContribCalc[0][0] * contrib_patroc;
      ContribCalc[1][1] = 1;
      ContribCalc[1][2] = 1;
      ContribCalc[1][3] = 0;

      $('#fnc9').val($.formatNumber(0/100, {format: "#,##0.00", locale: "br"})+'%');
      $('#fnc8').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
      ContribCalc[2][0] = 0;
      ContribCalc[2][1] = 0;
      ContribCalc[2][2] = 1;

     }); 
    
    //Periodicidade Voluntária	             
    $('#fnc7').change(function() {
       ContribCalc[2][3] = ($('#fnc7').val() == "Mensal") ? 0 : ($('#fnc7').val() == "Anual") ? 1 : 2;
       /*if (status == 9){
        BenefBar(BenefCheckOpt);
       }*/  
    });

    //Tipo Voluntária 
    /*   
    $('#fnc5').change(function() {
      if ($('#fnc5').val() == "Percentual"){
        $('#fnc9').hide();
        $('#fnc6').fadeIn();
        $('#fnc6').prop("selectedIndex", 0);
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
    */
    
    //Percentual Voluntária
    $('#fnc6').change(function() {
      $('#fnc8').val("R$ " + $.formatNumber(Salario * $('#fnc6').val(), {format: "#,##0.00", locale: "br"}));
      ContribCalc[2][0] = Salario * $('#fnc6').val();
      ContribCalc[2][1] = 0;
      ContribCalc[2][2] = 1;
    });
     
    // 
    $('#fnc9').change(function () {
    
       $('#fnc9').val($('#fnc9').val().replace(",","."));
       $('#fnc9').val($('#fnc9').val().replace("%",""));
    
      if (isNaN($('#fnc9').val())){
        $('#fnc27').html('<strong>Atenção!</strong> Digite apenas números.');  
        $('#fnc27').fadeIn();
        $('#fnc9').val("");        
        $('#fnc8').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
        ContribCalc[2][0] = 0;
        ContribCalc[2][1] = 0;
        ContribCalc[2][2] = 1;
        setTimeout(function(){$('#fnc27').fadeOut();}, 4000);  
      } else if (((ContribCalc[0][0] * ($('#fnc9').val()/100))+ ContribCalc[0][0]) > (Salario * 0.3)) {                  
        $('#fnc27').html('<strong>Atenção!</strong> Valor de contribuição voluntária acima do permitido, digite um novo percentual.');
        $('#fnc12').html('A Contribuição Voluntária Participante está sujeita à avaliação de margem salarial disponível.');          
        $('#fnc27').fadeIn();
        $('#fnc12').fadeIn();
        $('#fnc9').val("");
        $('#fnc9').focus();                          
        $('#fnc8').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
        ContribCalc[2][0] = 0;
        ContribCalc[2][1] = 0;
        ContribCalc[2][2] = 1;
        setTimeout(function(){$('#fnc27').fadeOut();}, 8500);
        setTimeout(function(){$('#fnc12').fadeOut();}, 8500);        
      } else {
        ContribCalc[2][0] = ContribCalc[0][0] * ($('#fnc9').val()/100);
        ContribCalc[2][1] = 0;
        ContribCalc[2][2] = 1;
        $('#fnc8').val("R$ "+$.formatNumber(ContribCalc[2][0], {format: "#,##0.00", locale: "br"}));
        $('#fnc9').val($.formatNumber($('#fnc9').val(), {format: "#,##0.00", locale: "br"})+'%');
      };     
    });

};

function percPatrocinadora (){
   
   var percePatroc = 0;   
   //var tvp = DtDeslig === null ? DataDif(DtAdesao, DtSaldoDIB, 0 , 4) : DataDif(DtAdesao, DtDeslig, 0 , 4); // Tempo de serviço em fração de anos
   
   percePatroc = 1.5;
   
   /*
   switch (true){   //Percentual de contribuição patrocinadora
        case (tvp <= 3):
          percePatroc = 0.25;
          break;
        case (tvp > 3 && tvp <= 5):
          percePatroc = 0.5;
          break;    
        case (tvp > 5 && tvp <= 8):
          percePatroc = 0.75;
          break;   
        case (tvp > 8 && tvp <= 10):
          percePatroc = 1;
          break;   
        case (tvp > 10):
          percePatroc = 1.25;
          break;   
    }
    */

  return  percePatroc;
}


function clearInput(el){
  el.value = '';
}
/*
function novoRegulamento() {
        
    if (DtAdesao <= new Date(DtEfetPlano)){   //Participante inscrito no plano até a data de aprovação do novo regulamento 10/12/2009 (data efetiva do novo regulamento) 
          NovoRegulamento = 0;  //Participante inscrito no plano até a data de aprovação do novo regulamento 10/12/2009
   } else {
      NovoRegulamento = 1;  //Participante inscrito no plano depois da data de aprovação do novo regulamento 10/12/2009
   }
      
  return  NovoRegulamento;
}
*/

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

