
var ContribCalc = [[],[],[],[],[]];                             //variável global do valor das contribuiç&otilde;es calculadas 
var contribCfg = []; //array global de configuração das contribuiç&otilde;es

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
    
    //campos criados dinamicamente na função Monta_Contrib(); 
    //criar funcionalidade com id unico para acoplar ao grupo de contribuição
    //Convenção ID funcionalidade: mesmo nome da variavel
    var fnc1 = '<select class="form-control input-sm" id="fnc1" size="1" style="width:80px;"></select>';
    var fnc2 = '<select class="form-control input-sm" id="fnc2" size="1" style="width:80px"></select>';
    var fnc3 = '<select class="form-control input-sm" id="fnc3" size="1" style="width:80px"></select>';
    var fnc4 = '<input type="text" class="form-control input-sm" id="fnc4" style="width:100px;" readonly>';
    var fnc5 = '<select class="form-control input-sm" id="fnc5" size="1" style="width:80px"></select>';
    var fnc6 = '<select class="form-control input-sm" id="fnc6" size="1" style="width:80px"></select>';
    var fnc7 = '<select class="form-control input-sm" id="fnc7" size="1" style="width:80px"></select>';
    var fnc8 = '<input type="text" class="form-control input-sm" id="fnc8" style="width:100px;" readonly>';
    var fnc9 = '<input type="text" class="form-control input-sm" id="fnc9" style="width:100px;" readonly>';    
    var fnc10 = '<select class="form-control input-sm" id="fnc10" style="width:105px"></select>';
    var fnc11 = '<input type="text" class="form-control input-sm" id="fnc11" style="width:110px;">';
    var fnc12 = '<select class="form-control input-sm" id="fnc12" style="width:90px"></select>';
    var fnc13 = '<input type="text" class="form-control input-sm" id="fnc13" style="width:110px;" readonly>';
    var fnc14 = '<span id="fnc14">%</span>';
    var fnc15 = '<span id="fnc15">Valor (R$)</span>';
    var fnc16 = '<select class="form-control input-sm" id="fnc16" size="1" style="width:85px"></select>';
    var fnc17 = '<div class="alert alert-danger" role="alert" id="fnc17"></div>'; 
    var fnc18 = '<div class="alert alert-danger" role="alert" id="fnc18"></div>';
    
    //config grupo contribuição 1
    var ctr1hd = new tbfld("", "1ª Faixa", "2ª Faixa", "3ª Faixa", "Contrib. Simulada");
    var ctr1fd = new tbfld("Básica Participante", fnc1, fnc2, fnc3, fnc4);

    //config grupo contribuição 2
    var ctr2hd = new tbfld("", "1ª Faixa", "2ª Faixa", "3ª Faixa", "Contrib. Simulada");
    var ctr2fd = new tbfld("Normal Patrocinadora", fnc5, fnc6, fnc7, fnc8);
        
    //config grupo contribuição 3
    var ctr3hd = new tbfld("", "", "", "", "Contrib. Simulada");
    var ctr3fd = new tbfld("Normal I Patrocinadora", "", "", "", fnc9);

    //config grupo contribuição 4    
    var ctr4hd = new tbfld("", "Tipo", fnc14 + fnc15, "Periodicidade", "Contrib. Simulada");
    var ctr4fd = new tbfld("Voluntária Participante", fnc10, fnc16 + fnc11, fnc12, fnc13);

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
    var x = 0;
 
    $('#fnc12').append('<option value="Unico">Único</option>');
    $('#fnc12').append('<option value="Mensal">Mensal</option>');
    $('#fnc12').append('<option value="Anual">Anual</option>');
    $('#fnc12').prop("selectedIndex", 0);    
    
   
    $('#fnc10').append('<option value="Percentual">Percentual</option>');
    $('#fnc10').append('<option value="Valor">Valor</option>');
    $('#fnc10').prop("selectedIndex", 1);
    $('#fnc10').attr("disabled", "disabled");       
  
    // Inicializa percentuais de selects fnc
  
    for (x = 0; x <= 3; x += 1){
      $('#fnc1').append('<option value=' + $.formatNumber((x/100), {format: "0.000", locale: "en"})+ '>' + $.formatNumber(x, {format: "#,##0.0", locale: "br"}) + '%</option>');   
     }
  
    for (x = 0; x <= 5; x += 1){
      $('#fnc2').append('<option value=' + $.formatNumber((x/100), {format: "0.000", locale: "en"})+ '>' + $.formatNumber(x, {format: "#,##0.0", locale: "br"}) + '%</option>');   
     }
  
    for (x = 0; x <= 8; x += 1){
      $('#fnc3').append('<option value=' + $.formatNumber((x/100), {format: "0.000", locale: "en"})+ '>' + $.formatNumber(x, {format: "#,##0.0", locale: "br"}) + '%</option>');   
     }
     
     for (x = 0; x <= 3; x += 3){
      $('#fnc5').append('<option value=' + $.formatNumber((x/100), {format: "0.000", locale: "en"})+ '>' + $.formatNumber(x, {format: "#,##0.0", locale: "br"}) + '%</option>');   
     }
  
    for (x = 0; x <= 5; x += 5){
      $('#fnc6').append('<option value=' + $.formatNumber((x/100), {format: "0.000", locale: "en"})+ '>' + $.formatNumber(x, {format: "#,##0.0", locale: "br"}) + '%</option>');   
     }
  
    for (x = 0; x <= 8; x += 8){
      $('#fnc7').append('<option value=' + $.formatNumber((x/100), {format: "0.000", locale: "en"})+ '>' + $.formatNumber(x, {format: "#,##0.0", locale: "br"}) + '%</option>');   
     }  
    
    for (x = 0; x <= 100; x += 1){
      $('#fnc16').append('<option value=' + x / 100 + '>' + $.formatNumber(x, {format: "#,##0.0", locale: "br"}) + '%</option>');   
    };
    
    // Valores Iniciais FNC    
    $('#fnc2').attr("disabled", "disabled");
    $('#fnc3').attr("disabled", "disabled");    
    $('#fnc5').prop("selectedIndex", 0);
    $('#fnc6').prop("selectedIndex", 0);    
    $('#fnc7').prop("selectedIndex", 0);
    $('#fnc5').attr("disabled", "disabled");
    $('#fnc6').attr("disabled", "disabled");
    $('#fnc7').attr("disabled", "disabled");
     
    //Esconde mensagens            
    $('#fnc17').hide();
    $('#fnc18').hide();
    
    //Esconde mensagens fnc
    $('#fnc14').hide();
    $('#fnc16').hide();
    
//----------------------------------------------------- Inicializa Contribuições ---------------------------------------------------------    
    
    //Inicializa Contribuições
    
      inicPercent();   
             
      ContribCalc[0][0] = calcContribPart(); 
      ContribCalc[0][1] = 0;
      ContribCalc[0][2] = 1;
      ContribCalc[0][3] = 0;
      $('#fnc4').val("R$ " + $.formatNumber(ContribCalc[0][0], {format: "#,##0.00", locale: "br"})); 
    
      ContribCalc[1][0] = calcContribPatroc();
      ContribCalc[1][1] = 1;
      ContribCalc[1][2] = 1;
      ContribCalc[1][3] = 0;
      $('#fnc8').val("R$ " + $.formatNumber(ContribCalc[1][0], {format: "#,##0.00", locale: "br"}));
      
      $('#fnc9').val("R$ " + $.formatNumber(ContribCalc[0][0], {format: "#,##0.00", locale: "br"}));
      ContribCalc[2][0] = ContribCalc[0][0];
      ContribCalc[2][1] = 1;
      ContribCalc[2][2] = 1;
      ContribCalc[2][3] = 0;
      
      $('#fnc11').val("");
      $('#fnc13').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
      ContribCalc[3][0] = 0; //valor da contribuição
      ContribCalc[3][1] = 0; //responsável pela contribuição - Patroc ou Partic
      ContribCalc[3][2] = 1; //Perfil da contribuição
      ContribCalc[3][3] = ContribCalc[3][3] = ($('#fnc12').val() == "Mensal") ? 0 : ($('#fnc12').val() == "Anual") ? 1 : 2; //Periodicidade da contribuição - 0: mensal, 1: anual, 2: único
            
    
//------------------------------------------------------- Eventos Change ---------------------------------------------------------  
    
    //Faixa 1
    $('#fnc1').change(function() {
      
      controlFaixaPart(); 
               
      ContribCalc[0][0] = calcContribPart(); 
      ContribCalc[0][1] = 0;
      ContribCalc[0][2] = 1;
      ContribCalc[0][3] = 0;
      $('#fnc4').val("R$ " + $.formatNumber(ContribCalc[0][0], {format: "#,##0.00", locale: "br"})); 
    
      $('#fnc9').val("R$ " + $.formatNumber(ContribCalc[0][0], {format: "#,##0.00", locale: "br"}));
      ContribCalc[2][0] = ContribCalc[0][0];
      ContribCalc[2][2] = 1;
      ContribCalc[2][3] = 0; 
                                 
    });
    
    //Faixa 2
    $('#fnc2').change(function() {
      
      controlFaixaPart();
                   
      ContribCalc[0][0] = calcContribPart(); 
      ContribCalc[0][1] = 0;
      ContribCalc[0][2] = 1;
      ContribCalc[0][3] = 0;
      $('#fnc4').val("R$ " + $.formatNumber(ContribCalc[0][0], {format: "#,##0.00", locale: "br"})); 
    
      $('#fnc9').val("R$ " + $.formatNumber(ContribCalc[0][0], {format: "#,##0.00", locale: "br"}));
      ContribCalc[2][0] = ContribCalc[0][0];
      ContribCalc[2][2] = 1;
      ContribCalc[2][3] = 0;
              
    });
    
    //Faixa 3 
    $('#fnc3').change(function() {
    
      controlFaixaPart();
               
      ContribCalc[0][0] = calcContribPart(); 
      ContribCalc[0][1] = 0;
      ContribCalc[0][2] = 1;
      ContribCalc[0][3] = 0;
      $('#fnc4').val("R$ " + $.formatNumber(ContribCalc[0][0], {format: "#,##0.00", locale: "br"})); 
    
      $('#fnc9').val("R$ " + $.formatNumber(ContribCalc[0][0], {format: "#,##0.00", locale: "br"}));
      ContribCalc[2][0] = ContribCalc[0][0];
      ContribCalc[2][2] = 1;
      ContribCalc[2][3] = 0;  
          
    });
      
    
    //Contribuções Faixa 1, 2 e 3 Patrocinadora
    /*
    $('#fnc5').change(function() {
       calcContribPatroc();
    });
    
    $('#fnc6').change(function() {
       calcContribPatroc();
    });
    
    $('#fnc7').change(function() {
       calcContribPatroc();
    });
    */
    
    
    //Contribução Voluntária Participante                       
    
    $('#fnc12').change(function() {
       ContribCalc[3][3] = ($('#fnc12').val() == "Mensal") ? 0 : ($('#fnc12').val() == "Anual") ? 1 : 2;
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
        ContribCalc[3][0] = 0;
        ContribCalc[3][1] = 0;
        ContribCalc[3][2] = 1;
        $('#fnc15').hide();
        $('#fnc14').fadeIn();
      }else{
        $('#fnc16').hide();
        $('#fnc16').prop("selectedIndex", 0);
        $('#fnc11').val("");
        $('#fnc11').fadeIn();
        $('#fnc13').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
        ContribCalc[3][0] = 0;
        ContribCalc[3][1] = 0;
        ContribCalc[3][2] = 1;
        $('#fnc14').hide();
        $('#fnc15').fadeIn();        
      };      
    });    
  
    $('#fnc16').change(function() {
      $('#fnc13').val("R$ " + $.formatNumber((Salario - ContribCalc[0][0]) * $('#fnc16').val(), {format: "#,##0.00", locale: "br"}));
      ContribCalc[3][0] = (Salario - ContribCalc[0][0]) * $('#fnc16').val();
      ContribCalc[3][1] = 0;
      ContribCalc[3][2] = 1;
    });    
    
    $('#fnc11').change(function () {
      $('#fnc11').val($('#fnc11').val().replace(",","."));
      if (isNaN($('#fnc11').val())){
        $('#fnc17').html('<strong>Atenção!</strong> Digite apenas números.');  
        $('#fnc17').fadeIn();
        $('#fnc11').val("");        
        $('#fnc13').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
        ContribCalc[3][0] = 0;
        ContribCalc[3][1] = 0;
        ContribCalc[3][2] = 1;
        setTimeout(function(){$('#fnc17').fadeOut();}, 4000);  
      }else{
        ContribCalc[3][0] = $('#fnc11').val();
        ContribCalc[3][1] = 0;
        ContribCalc[3][2] = 1;
        $('#fnc11').val($.formatNumber($('#fnc11').val(), {format: "#,##0.00", locale: "br"}));
        $('#fnc13').val("R$ " + $('#fnc11').val());        
      }; 
     });  

};

function calcContribPart(){ 
  
  var partCtr1 = 0;
  var partCtr2 = 0;
  var partCtr3 = 0;
  var partCtrSobra1 = 0;
  var partCtrSobra2 = 0;
  var partCtrFaixaT = 0;
    
      //CALCULO DA CONTRIBUIÇÃO BÁSICA FAIXA 1
      if (Salario > (URP*5)){
      
           partCtr1 = (URP*5) * $('#fnc1').val();
           partCtrSobra1 = Salario - (URP*5);                     
           
          //CALCULO DA CONTRIBUIÇÃO BÁSICA FAIXA 2
          if (partCtrSobra1 > (URP*5)){
               partCtrSobra1 = (partCtrSobra1 > ((URP*15) - (URP*5))) ? ((URP*15) - (URP*5)) : partCtrSobra1;
               partCtr2 = partCtrSobra1 * $('#fnc2').val();               
                                         
          } else {
               partCtr2 = partCtrSobra1 * $('#fnc2').val(); 
          }; //FIM CALCULO FAIXA 2
  
          //CALCULO DA CONTRIBUIÇÃO BÁSICA FAIXA 3          
          if (Salario > (URP*15)){
               partCtrSobra2 = Salario - (URP*15);
               partCtr3 = partCtrSobra2 * $('#fnc3').val();
             };
          //FIM CALCULO FAIXA 3  
                
      } else {
           partCtr1 = Salario * $('#fnc1').val();      
      } //FIM CALCULO FAIXA 1
      
   partCtrFaixaT =  partCtr1 + partCtr2 + partCtr3; 
     
   return partCtrFaixaT;    
};  

function calcContribPatroc(){     
  
  var patroCtr1 = 0;
  var patroCtr2 = 0;
  var patroCtr3 = 0;
  var patroCtrSobra1 = 0;
  var patroCtrSobra2 = 0;
  var patroCtrFaixaT = 0;        
      
      //CALCULO DA CONTRIBUIÇÃO BÁSICA FAIXA 1
      if (Salario > (URP*5)){
      
           patroCtr1 = (URP*5) * $('#fnc5').val();
           patroCtrSobra1 = Salario - (URP*5);                     
           
          //CALCULO DA CONTRIBUIÇÃO BÁSICA FAIXA 2
          if (patroCtrSobra1 > (URP*5)){
               patroCtrSobra1 = (patroCtrSobra1 > ((URP*15) - (URP*5))) ? ((URP*15) - (URP*5)) : patroCtrSobra1;
               patroCtr2 = patroCtrSobra1 * $('#fnc6').val();               
                                         
          } else {
               patroCtr2 = patroCtrSobra1 * $('#fnc6').val(); 
          }; //FIM CALCULO FAIXA 2
  
          //CALCULO DA CONTRIBUIÇÃO BÁSICA FAIXA 3          
          if (Salario > (URP*15)){
               patroCtrSobra2 = Salario - (URP*15);
               patroCtr3 = patroCtrSobra2 * $('#fnc7').val();
             };
          //FIM CALCULO FAIXA 3  
                
      } else {
           patroCtr1 = Salario * $('#fnc5').val();      
      } //FIM CALCULO FAIXA 1

   patroCtrFaixaT =  patroCtr1 + patroCtr2 + patroCtr3; 
     
   return patroCtrFaixaT;
}; 

function controlFaixaPart(){   

   if (Salario > (URP*5) && $('#fnc1').val() == 0.030){
                    
          $('#fnc2').attr("disabled", false);
           
          //CONTRIBUIÇÃO BÁSICA FAIXA 2
          if (Salario > (URP*15) && $('#fnc2').val() == 0.050){
                            
                  $('#fnc3').attr("disabled", false);
                                                                  
          } else {
             $('#fnc3').prop("selectedIndex", 0);             
             $('#fnc3').attr("disabled", "disabled");   
          }; //FIM FAIXA 2
                
      } else {
        $('#fnc2').prop("selectedIndex", 0);
        $('#fnc3').prop("selectedIndex", 0);
        $('#fnc2').attr("disabled", "disabled");
        $('#fnc3').attr("disabled", "disabled");         
      } //FIM FAIXA 1

};             

function inicPercent(){               

   $('#fnc1').prop("selectedIndex", 3);
   $('#fnc5').prop("selectedIndex", 1);

   if (Salario > (URP*5) && $('#fnc5').val() == 0.030 && $('#fnc1').val() == 0.030){
          
          $('#fnc2').prop("selectedIndex", 5);
          $('#fnc2').attr("disabled", false);
          $('#fnc6').prop("selectedIndex", 1);          
           
          //CONTRIBUIÇÃO BÁSICA FAIXA 2
          if (Salario > (URP*15) && $('#fnc6').val() == 0.050){
          
                  $('#fnc3').prop("selectedIndex", 8);
                  $('#fnc3').attr("disabled", false);
                  $('#fnc7').prop("selectedIndex", 1);                  
                                                                  
          } else {
             $('#fnc3').prop("selectedIndex", 0);
             $('#fnc7').prop("selectedIndex", 0);                            
          }; //FIM FAIXA 2
                
      } else {
        $('#fnc2').prop("selectedIndex", 0);
        $('#fnc3').prop("selectedIndex", 0);        
        $('#fnc6').prop("selectedIndex", 0);
        $('#fnc7').prop("selectedIndex", 0);                 
      } //FIM FAIXA 1

};
      
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




