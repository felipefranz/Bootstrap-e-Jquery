<!-- saved from url=(0016)http://localhost -->
var ContribCalc = [[],[],[],[],[]];                             //variável global do valor das contribui&ccedil;&otilde;es calculadas 
var contribCfg = []; //array global de configura&ccedil;&atilde;o das contribui&ccedil;&otilde;es

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
    var fnc2 = '<select class="form-control input-sm" id="fnc2" size="1" style="width:95px"></select>';
    var fnc3 = '<input type="text" class="form-control input-sm" id="fnc3" style="width:100px;" readonly>';
    var fnc4 = '<input type="text" class="form-control input-sm" id="fnc4" style="width:100px;" readonly>';
    var fnc5 = '<select class="form-control input-sm" id="fnc5" style="width:105px"></select>';
    var fnc6 = '<select class="form-control input-sm" id="fnc6" size="1" style="width:85px"></select>';
    var fnc7 = '<select class="form-control input-sm" id="fnc7" style="width:90px"></select>';
    var fnc8 = '<input type="text" class="form-control input-sm" id="fnc8" style="width:110px;" readonly>';
    var fnc9 = '<input type="text" class="form-control input-sm" id="fnc9" style="width:110px;" onclick="clearInput(this)">';
    var fnc10 = '<input type="text" class="form-control input-sm" id="fnc10" style="width:100px;" readonly>';
    var fnc11 = '<input type="text" class="form-control input-sm" id="fnc11" style="width:100px;" readonly>';
    var fnc12 = '<div class="alert alert-danger" role="alert" id="fnc12"></div>';
    var fnc13 = '<span id="fnc13">%</span>';
    var fnc14 = '<span id="fnc14">Valor (R$)</span>';
    var fnc15 = '<span id="fnc15">Voluntária Participante<span>';  
    var fnc16 = '<textarea>Enter text here...</textarea>'
    var fnc17 = '<span id="fnc17">Normal Patrocinadora<span>';
    var fnc18 = '<input type="text" class="form-control input-sm" id="fnc18" style="width:100px;" readonly>';
    var fnc19 = '<input type="text" class="form-control input-sm" id="fnc19" style="width:100px;" readonly>';
    var fnc20 = '<span id="fnc20">Adicional Participante<span>';    
    var fnc21 = '<input type="text" class="form-control input-sm" id="fnc21" style="width:80px;" readonly>';        
    
    //config grupo contribuição 1
    var ctr1hd = new tbfld("", "", "Percentual Contrib.", "", "Contrib. Simulada");
    var ctr1fd = new tbfld("Básica Participante", "", fnc1, "", fnc3);

    //config grupo contribuição 3
    var ctr2hd = new tbfld("", "", "Percentual Contrib.", "", "Contrib. Simulada");
    var ctr2fd = new tbfld(fnc20, "", fnc2, "", fnc19);
    
    //config grupo contribuição 2        fnc5+ fnc13 +fnc6 + 
    var ctr3hd = new tbfld("", "",  "Periodicidade", "", fnc14);
    var ctr3fd = new tbfld(fnc15, "", fnc7, "", fnc9);        

    //config grupo contribuição 4
    var ctr4hd = new tbfld("", "", "Percentual Contrib.", "", "Contrib. Simulada");
    var ctr4fd = new tbfld(fnc17, "", fnc21, "", fnc10);
                
    //carregamento das contribui&ccedil;&otilde;es no array de configura&ccedil;&atilde;o
    contribCfg.push([ctr1hd, ctr1fd]);
    contribCfg.push([ctr2hd, ctr2fd]);
    contribCfg.push([ctr3hd, ctr3fd]);
    contribCfg.push([ctr4hd, ctr4fd]);    
    
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
    
    tableContrib += '<div class="row"><div class="col-xs-12 col-sm-12 col-md-12">'+ fnc12 +'</div></div>'
    
    $("#gridContrib").html(tableContrib);
    
    Contrib_Control()
}

function Contrib_Control(){
    var x = 0;    
    var contrib_patroc = 0;
    
    $('#fnc7').append('<option value="Unico">Único</option>');
    $('#fnc7').append('<option value="Mensal">Mensal</option>');
    $('#fnc7').append('<option value="Anual">Anual</option>');
    $('#fnc7').prop("selectedIndex", 0);
  /*  
    $('#fnc5').append('<option value="Valor">Valor</option>');
    $('#fnc5').append('<option value="Percentual">Percentual</option>');
        
    $('#fnc5').prop("selectedIndex", 0);
    $('#fnc5').attr("disabled", "disabled");
  */  
    // Inicializa percentuais de selects fnc
    for (x = 0; x <= 5; x += 1){ //0, 1 2 3 4 5 5,5   
      $('#fnc1').append('<option value=' + x / 100 + '>' + $.formatNumber(x, {format: "#,##0.0", locale: "br"}) + '%</option>');   
    };
      $('#fnc1').append('<option value=' + 5.5 / 100 + '>'+ $.formatNumber(5.5, {format: "#,##0.0", locale: "br"}) + '% </option>');      
      
    for (x = 0; x <= 50; x += 1){
      $('#fnc2').append('<option value=' + x / 100 + '>' + $.formatNumber(x, {format: "#,##0.00", locale: "br"}) + '%</option>');
    };  
    
    for (x = 1; x <= 30; x += 0.5){
      $('#fnc6').append('<option value=' + x / 100 + '>' + $.formatNumber(x, {format: "#,##0.0", locale: "br"}) + '%</option>');   
    };
    
    // Valores Iniciais FNC
    if (Salario >= 15 * URP){
      $('#fnc1').prop("selectedIndex", $('#fnc1 option').length - 1);
      $('#fnc1').attr("enable", "enable");       
      contrib_patroc = percPatrocinadora();   
    }else{
      $('#fnc1').prop("selectedIndex", 0);
      $('#fnc1').attr("disabled", "disabled"); 
      contrib_patroc = 0; 
    };
    
    $('#fnc2').prop("selectedIndex", 0)  
    
    //Esconde 
    $('#fnc6').hide();              
    $('#fnc12').hide();
    $('#fnc13').hide();
    //$('#fnc9').hide();
    //$('#fnc14').hide();
        
//----------------------------------------------------- Inicializa Contribuições ---------------------------------------------------------              
            
    $('#fnc3').val("R$ " + $.formatNumber((Salario - 9 * URP) * $('#fnc1').val(), {format: "#,##0.00", locale: "br"}));
    ContribCalc[0][0] = (Salario - 9 * URP) * $('#fnc1').val();
    ContribCalc[0][1] = 0;
    ContribCalc[0][2] = 1;
    ContribCalc[0][3] = 0;           
    
    $('#fnc21').val("" + $.formatNumber(contrib_patroc * 100, {format: "#,##0.00", locale: "br"})+"%");
    $('#fnc10').val("R$ " + $.formatNumber(ContribCalc[0][0] * contrib_patroc, {format: "#,##0.00", locale: "br"}));
    ContribCalc[3][0] = ContribCalc[0][0] * contrib_patroc;
    ContribCalc[3][1] = 1;
    ContribCalc[3][2] = 1;
    ContribCalc[3][3] = 0;
    
    $('#fnc19').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
    ContribCalc[1][0] = Salario * $('#fnc2').val(); 
    ContribCalc[1][1] = 0;  
    ContribCalc[1][2] = 1; 
    ContribCalc[1][3] = 0;
    
    //$('#fnc8').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
    $('#fnc9').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
    ContribCalc[2][0] = 0; //valor da contribuição
    ContribCalc[2][1] = 0; //responsável pela contribuição - 0: Partic ou 1: Patroc
    ContribCalc[2][2] = 1; //Perfil da contribuição
    ContribCalc[2][3] = ($('#fnc7').val() == "Mensal") ? 0 : ($('#fnc7').val() == "Anual") ? 1 : 2; //Periodicidade da contribuição - 0: mensal, 1: anual, 2: único
        
    //$('#fnc4').val("R$ " + $.formatNumber(UltContribPart, {format: "#,##0.00", locale: "br"})); //campo criado dinamicamente na fun&ccedil;&atilde;o Monta_Contrib(); 
    //$('#fnc11').val("R$ " + $.formatNumber(UltContribPatroc, {format: "#,##0.00", locale: "br"})); //campo criado dinamicamente na fun&ccedil;&atilde;o Monta_Contrib();     
    
//------------------------------------------------------- Eventos Change ---------------------------------------------------------           
    
    $('#fnc1').change(function() {
    
      $('#fnc3').val("R$ " + $.formatNumber((Salario - 9 * URP) * $('#fnc1').val(), {format: "#,##0.00", locale: "br"}));
      ContribCalc[0][0] = (Salario - 9 * URP) * $('#fnc1').val();
      ContribCalc[0][1] = 0;
      ContribCalc[0][2] = 1;
      ContribCalc[0][3] = 0;
      
      if (status != 3){
        $('#fnc21').val("" + $.formatNumber(contrib_patroc * 100, {format: "#,##0.00", locale: "br"})+"%");
        $('#fnc10').val("R$ " + $.formatNumber(ContribCalc[0][0] * contrib_patroc, {format: "#,##0.00", locale: "br"}));
        ContribCalc[3][0] = ContribCalc[0][0] * contrib_patroc;
        ContribCalc[3][1] = 1;
        ContribCalc[3][2] = 1;
        ContribCalc[3][3] = 0;
       }  
    });           
    
    $('#fnc2').change(function() {
      $('#fnc19').val("R$ " + $.formatNumber(Salario * $('#fnc2').val(), {format: "#,##0.00", locale: "br"}));
      ContribCalc[1][0] = Salario * $('#fnc2').val();
      ContribCalc[1][1] = 0;
      ContribCalc[1][2] = 1;
      ContribCalc[1][3] = 0;
    });    

    $('#fnc7').change(function() {
       ContribCalc[2][3] = ($('#fnc7').val() == "Mensal") ? 0 : ($('#fnc7').val() == "Anual") ? 1 : 2;
       /*
       if (status == 9){
        BenefBar(BenefCheckOpt);
       } 
       */ 
    });
    /*
    $('#fnc5').change(function() {
      if ($('#fnc5').val() == "Percentual"){
        $('#fnc9').hide();
        $('#fnc6').fadeIn();
        $('#fnc6').val(""); 
        //$('#fnc8').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));            
        ContribCalc[2][0] = 0;
        ContribCalc[2][1] = 0;
        ContribCalc[2][2] = 1;
        $('#fnc14').hide();
        $('#fnc13').fadeIn();
      }else{
        $('#fnc6').hide();
        $('#fnc6').prop("selectedIndex", 0);
        //$('#fnc9').val("");
        $('#fnc9').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
        $('#fnc9').fadeIn();
        //$('#fnc8').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
        ContribCalc[2][0] = 0;
        ContribCalc[2][1] = 0;
        ContribCalc[2][2] = 1;
        $('#fnc13').hide();
        $('#fnc14').fadeIn();        
      };      
    });
    */
    
    $('#fnc6').change(function() {
      //$('#fnc8').val("R$ " + $.formatNumber(Salario * $('#fnc6').val(), {format: "#,##0.00", locale: "br"}));
      ContribCalc[2][0] = Salario * $('#fnc6').val();
      ContribCalc[2][1] = 0;
      ContribCalc[2][2] = 1;
    });
    
    $('#fnc9').change(function () {
      
      $('#fnc9').val($('#fnc9').val().replace(",","."));
      $('#fnc9').val($('#fnc9').val().replace("%",""));
      $('#fnc9').val($('#fnc9').val().replace("R$ ",""));
       
      if (isNaN($('#fnc9').val())){
        $('#fnc12').html('<strong>Atenção!</strong> Digite apenas números.');  
        $('#fnc12').fadeIn();
        //$('#fnc9').val("");
        $('#fnc9').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
        //$('#fnc8').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
        ContribCalc[2][0] = 0;
        ContribCalc[2][1] = 0;
        ContribCalc[2][2] = 1;
        setTimeout(function(){$('#fnc12').fadeOut();}, 4000); 
      }else{
          ContribCalc[2][0] = $('#fnc9').val();
          ContribCalc[2][1] = 0;
          ContribCalc[2][2] = 1;
          $('#fnc9').val("R$ " + $.formatNumber($('#fnc9').val(), {format: "#,##0.00", locale: "br"}));
          //$('#fnc8').val("R$ " + $('#fnc9').val());
          
      }; 
      /*     
      if (status == 9){
        BenefBar(BenefCheckOpt);
      } 
      */    
    });
        
};

function percPatrocinadora(){ //Descobre o percentual de contrib da patrocinadora

   var contribPart = 0;
   var contribPatroc = 0;  
   var percePatroc = 0;       
   var i = TextMovto.movimentacoes.length - 1;
   var DtCompPart = "a";
   var DtCompPatroc = "b";        
   
   if(i > -1){  
    
     do { //Contribuições precisam ser da mesma competência
      var movto = TextMovto.movimentacoes[i];

      if (movto.id_conta == 1202 && movto.conta_resp == 0){
        DtCompPart = movto.competencia;
        contribPart =  movto.ctr_rent;         
      }
      if (movto.id_conta == 1301 && movto.conta_resp == 1){
        DtCompPatroc = movto.competencia;
        contribPatroc = movto.ctr_rent;          
      }
      i--;                                      
    } while(DtCompPart != DtCompPatroc && i >= 0) 
     
    if(contribPatroc != 0 && contribPart != 0) {
      percePatroc = (contribPatroc / contribPart).toFixed(4) * 1;     
    }
  }   

 return  percePatroc;

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
 if (JSONobj.conta_resp == 0 && JSONobj.perfil == NomePerfil1 && (JSONobj.id_conta == 1245 || JSONobj.id_conta == 1246 || JSONobj.id_conta == 1285 || JSONobj.id_conta == 1286 || JSONobj.id_conta == 1230 || JSONobj.nome_conta == "Aporte Específico")){
    return true;
  }else{
    return false;
  }
}

function SaldoAdicional_2(JSONobj){
 if (JSONobj.conta_resp == 0 && JSONobj.perfil == NomePerfil2 && (JSONobj.id_conta == 1245 || JSONobj.id_conta == 1246 || JSONobj.id_conta == 1285 || JSONobj.id_conta == 1286 || JSONobj.id_conta == 1230 || JSONobj.nome_conta == "Aporte Específico")){
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

