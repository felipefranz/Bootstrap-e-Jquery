var ContribCalc = [[],[],[],[],[],[],[]];                             //variável global do valor das contribuiç&otilde;es calculadas 
var contribCfg = []; //array global de configuração das contribuiç&otilde;es
var SalLimitContrib = Salario > 120 * URP ? 120 * URP : Salario;
var SalLimitBasica = Salario > 80 * URP ? 80 * URP : Salario; 
var maxCtr = 0;
var partCtr = 0;
var faixaCtr = 0;

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
    //var fnc2 = '<select class="form-control input-sm" id="fnc2" size="1" style="width:80px"></select>';
    var fnc3 = '<input type="text" class="form-control input-sm" id="fnc3" style="width:100px;" readonly>';
    var fnc4 = '<select class="form-control input-sm" id="fnc4" style="width:80px;"></select>';
    var fnc5 = '<select class="form-control input-sm" id="fnc5" style="width:105px"></select>';
    var fnc6 = '<select class="form-control input-sm" id="fnc6" style="width:85px"></select>';
    var fnc7 = '<select class="form-control input-sm" id="fnc7" style="width:90px"></select>';
    var fnc8 = '<input type="text" class="form-control input-sm" id="fnc8" style="width:110px;" readonly>';
    var fnc9 = '<input type="text" class="form-control input-sm" id="fnc9" style="width:110px;">';
    var fnc10 = '<input type="text" class="form-control input-sm" id="fnc10" style="width:100px;" readonly>';
    var fnc11 = '<select class="form-control input-sm" id="fnc11" style="width:80px;"></select>';
    var fnc12 = '<div class="alert alert-warning" role="alert" id="fnc12"></div>';
    var fnc13 = '<span id="fnc13">%</span>';
    var fnc14 = '<span id="fnc14">Valor (R$)</span>';
    var fnc15 = '<span id="fnc15">Voluntária Participante<span>';
    var fnc16 = '<textarea>Enter text here...</textarea>'
    var fnc17 = '<span id="fnc17">Geral Participante<span>';
    var fnc18 = '<input type="text" class="form-control input-sm" id="fnc18" style="width:110px;" readonly>';
    var fnc19 = '<span id="fnc19">Geral Patrocinadora<span>';
    var fnc20 = '<select class="form-control input-sm" id="fnc20" style="width:80px"></select>';
    var fnc21 = '<input type="text" class="form-control input-sm" id="fnc21" style="width:100px;" readonly>';
    var fnc22 = '<span id="fnc22">Adicional Participante<span>';    
    var fnc23 = '<select class="form-control input-sm" id="fnc23" style="width:90px"></select>';    
    var fnc24 = '<input type="text" class="form-control input-sm" id="fnc24" style="width:110px;" readonly>';
    var fnc25 = '<span id="fnc25">Adicional Patrocinadora</span>';
    var fnc26 = '<select class="form-control input-sm" id="fnc26" style="width:90px"></select>';
    var fnc27 = '<div class="alert alert-danger" role="alert" id="fnc27"></div>'; 
    var fnc28 = '<input type="text" class="form-control input-sm" id="fnc28" style="width:110px;" readonly>';
    
    //config grupo contribuição 1 - Basica Participante
    var ctr1hd = new tbfld("", "Percentual Contrib.", "", "", "Contrib. Simulada");
    var ctr1fd = new tbfld("Básica Participante", fnc1, "", "", fnc3);

    //config grupo contribuição 2 - Normal Patrocinadora
    var ctr2hd = new tbfld("", "Percentual Contrib.", "", "", "Contrib. Simulada");
    var ctr2fd = new tbfld("Normal Patrocinadora", fnc4, "", "", fnc10);
    
    //config grupo contribuição 3 - Geral Participante
    var ctr3hd = new tbfld("", "Percentual Contrib.", "", "", "Contrib. Simulada");
    var ctr3fd = new tbfld(fnc17, fnc11, "", "", fnc18);        
    
    //config grupo contribuição 4 - Geral Patrocinadora
    var ctr4hd = new tbfld("", "Percentual Contrib.", "", "", "Contrib. Simulada");
    var ctr4fd = new tbfld(fnc19, fnc20, "", "", fnc21);

    //config grupo contribuição 5 - Adicional Participante    
    var ctr5hd = new tbfld("", "Percentual Contrib.", "", "", "Contrib. Simulada");
    var ctr5fd = new tbfld(fnc22, fnc23, "", "", fnc24);

    //config grupo contribuição 6 - Adicional Patrocinadora    
    var ctr6hd = new tbfld("", "Percentual Contrib.", "", "", "Contrib. Simulada");
    var ctr6fd = new tbfld(fnc25, fnc26, "", "", fnc28);

    //config grupo contribuição 7 - Voluntária Participante  
    var ctr7hd = new tbfld("", "Tipo", fnc13 + fnc14, "Periodicidade", "Contrib. Simulada");
    var ctr7fd = new tbfld(fnc15, fnc5, fnc6 + fnc9, fnc7, fnc8);
    
    //carregamento das contribuiç&otilde;es no array de configuração
    contribCfg.push([ctr1hd, ctr1fd]);
    contribCfg.push([ctr2hd, ctr2fd]);
    contribCfg.push([ctr3hd, ctr3fd]);
    contribCfg.push([ctr4hd, ctr4fd]);
    contribCfg.push([ctr5hd, ctr5fd]);
    contribCfg.push([ctr6hd, ctr6fd]);
    contribCfg.push([ctr7hd, ctr7fd]);      
  
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
    
    tableContrib += '<div class="row"><div class="col-xs-12 col-sm-12 col-md-12">' + fnc12 +''+ fnc27 +'</div></div>'
    
    $("#gridContrib").html(tableContrib);
    
    Contrib_Control()
}

function Contrib_Control(){
    var x = 0;
    
    $('#fnc7').append('<option value="Unico">Único</option>');
    $('#fnc7').append('<option value="Mensal">Mensal</option>');
    $('#fnc7').append('<option value="Anual">Anual</option>');
    $('#fnc7').prop("selectedIndex", 1);
    $('#fnc7').attr("disabled", "disabled");  
    
    $('#fnc5').append('<option value="Valor">Valor</option>');    
    $('#fnc5').append('<option value="Percentual">Percentual</option>');    
    $('#fnc5').prop("selectedIndex", 1);
    $('#fnc5').attr("disabled", "disabled");
    
    for (x = 0; x <= 7; x += 7){
      $('#fnc1').append('<option value=' + x / 100 + '>' + $.formatNumber(x, {format: "#,##0.0", locale: "br"}) + '%</option>');   
    };

    for (x = 0; x <= 75; x += 25){
      $('#fnc4').append('<option value=' + x / 100 + '>' + $.formatNumber(x, {format: "#,##0.0", locale: "br"}) + '%</option>');   
    };
    
    for (x = 0; x <= 5; x += 1){
      $('#fnc11').append('<option value=' + x / 100 + '>' + $.formatNumber(x, {format: "#,##0.0", locale: "br"}) + '%</option>');   
    };

    for (x = 0; x <= 50; x += 25){
      $('#fnc20').append('<option value=' + x / 100 + '>' + $.formatNumber(x, {format: "#,##0.0", locale: "br"}) + '%</option>');   
    };

    for (x = 0; x <= 7; x += 1){
      $('#fnc23').append('<option value=' + x / 100 + '>' + $.formatNumber(x, {format: "#,##0.0", locale: "br"}) + '%</option>');   
    };
    
    for (x = 0; x <= 37.5; x += 12.5){
      $('#fnc26').append('<option value=' + x / 100 + '>' + $.formatNumber(x, {format: "#,##0.0", locale: "br"}) + '%</option>');   
    };
    
    for (x = 0; x <= 5; x += 1){
      $('#fnc6').append('<option value=' + x / 100 + '>' + $.formatNumber(x, {format: "#,##0.0", locale: "br"}) + '%</option>');   
    };
    
    //Inicialização dos parâmetro iniciais    
    $('#fnc1').prop("selectedIndex", 0);              
    $('#fnc4').prop("selectedIndex", 0);     
    $('#fnc11').prop("selectedIndex", 0); 
    $('#fnc20').prop("selectedIndex", 0);
    $('#fnc23').prop("selectedIndex", 0); 
    $('#fnc26').prop("selectedIndex", 0);     
    $('#fnc6').prop("selectedIndex", 0);     
    $('#fnc12').hide(); //Mensagem de erro
    $('#fnc27').hide(); //Mensagem de erro
    $('#fnc9').hide();
    $('#fnc14').hide();  

    //Desabilita Select's de Contribuicoes de Patrocinadora
    $('#fnc4').attr("disabled", "disabled");   
    $('#fnc20').attr("disabled", "disabled");  
    $('#fnc26').attr("disabled", "disabled");  
    
    $('#tblCtr1').hide();
    $('#tblCtr2').hide();
    $('#tblCtr3').hide();
    $('#tblCtr4').hide();
    $('#tblCtr5').hide();
    $('#tblCtr6').hide(); 
    $('#tblCtr7').hide();

//----------------------------------------------------- Inicializa Contribuições ---------------------------------------------------------        

    //Valores iniciais dos selects 
    inicPercent();
    
    if (Salario > 20 * URP && Salario < 80 * URP){ //Só pode contribuir em Basica, Normal Patroc e Voluntaria 

      $('#fnc11').val(consultaContribPart()[0]); //Inicializa Geral
      $('#fnc6').val(consultaContribPart()[2]);  //Inicializa Voluntaria
      $('#fnc1').prop("selectedIndex", 1); //Inicializa Basica

      $('#fnc3').val("R$ " + $.formatNumber((SalLimitBasica - 15 * URP) * $('#fnc1').val(), {format: "#,##0.00", locale: "br"})); 
      ContribCalc[0][0] = (SalLimitBasica - 15 * URP) * $('#fnc1').val();

      $('#fnc10').val("R$ " + $.formatNumber(ContribCalc[0][0] * $('#fnc4').val(), {format: "#,##0.00", locale: "br"}));
      ContribCalc[1][0] = ContribCalc[0][0] * $('#fnc4').val();

      $('#fnc18').val("R$ " + $.formatNumber(SalLimitContrib * $('#fnc11').val(), {format: "#,##0.00", locale: "br"}));
      ContribCalc[2][0] = SalLimitContrib * $('#fnc11').val();

      $('#fnc21').val("R$ " + $.formatNumber(ContribCalc[2][0] * $('#fnc20').val(), {format: "#,##0.00", locale: "br"}));
      ContribCalc[3][0] = ContribCalc[2][0] * $('#fnc20').val();      

      $('#fnc8').val("R$ " + $.formatNumber(Salario * $('#fnc6').val(), {format: "#,##0.00", locale: "br"}));
      ContribCalc[6][0] = Salario * $('#fnc6').val();

      $('#tblCtr1').show();
      $('#tblCtr2').show(); 
      $('#tblCtr3').show();
      $('#tblCtr4').show();       
      $('#tblCtr7').show();      
      
    } else if (Salario >= 80 * URP){ //Pode contribuir em todas

      $('#fnc1').prop("selectedIndex", 1); //Inicializa Basica       
      $('#fnc11').val(consultaContribPart()[0]); //Inicializa Geral
      $('#fnc23').val(consultaContribPart()[1]); //Inicializa Adicional 
      $('#fnc6').val(consultaContribPart()[2]);  //Inicializa Voluntaria  

      $('#fnc3').val("R$ " + $.formatNumber((SalLimitBasica - 15 * URP) * $('#fnc1').val(), {format: "#,##0.00", locale: "br"})); 
      ContribCalc[0][0] = (SalLimitBasica - 15 * URP) * $('#fnc1').val();
       
      $('#fnc10').val("R$ " + $.formatNumber(ContribCalc[0][0] * $('#fnc4').val(), {format: "#,##0.00", locale: "br"}));
      ContribCalc[1][0] = ContribCalc[0][0] * $('#fnc4').val();
          
      $('#fnc18').val("R$ " + $.formatNumber(SalLimitContrib * $('#fnc11').val(), {format: "#,##0.00", locale: "br"}));
      ContribCalc[2][0] = SalLimitContrib * $('#fnc11').val();

      $('#fnc21').val("R$ " + $.formatNumber(ContribCalc[2][0] * $('#fnc20').val(), {format: "#,##0.00", locale: "br"}));
      ContribCalc[3][0] = ContribCalc[2][0] * $('#fnc20').val();

      $('#fnc24').val("R$ " + $.formatNumber((SalLimitContrib - 80 * URP) * $('#fnc23').val(), {format: "#,##0.00", locale: "br"}));
      ContribCalc[4][0] = (SalLimitContrib - 80 * URP) * $('#fnc23').val();

      $('#fnc28').val("R$ " + $.formatNumber(ContribCalc[4][0] * $('#fnc26').val(), {format: "#,##0.00", locale: "br"}));
      ContribCalc[5][0] = ContribCalc[4][0] * $('#fnc26').val();

      $('#fnc8').val("R$ " + $.formatNumber(Salario * $('#fnc6').val(), {format: "#,##0.00", locale: "br"}));
      ContribCalc[6][0] = Salario * $('#fnc6').val();
      
      $('#tblCtr1').show();
      $('#tblCtr2').show(); 

      if ((SalLimitContrib - 80 * URP) * 0.05 >= 0.1 * URP) { //Valida se pode contribuir na geral
        $('#tblCtr3').show();
        $('#tblCtr4').show(); 
      };

      $('#tblCtr5').show();
      $('#tblCtr6').show(); 

      if (SalLimitContrib * 0.05 >= 0.1 * URP) { //Valida se pode contribuir na voluntária
        $('#tblCtr7').show();
      };
      
    } else if (Salario * 0.05 >= 0.1 * URP) { //Só pode contribuir na voluntária e geral

      $('#fnc11').val(consultaContribPart()[0]); //Inicializa geral     
      $('#fnc6').val(consultaContribPart()[2]);  //Inicializa Voluntaria
      
      $('#fnc18').val("R$ " + $.formatNumber(SalLimitContrib * $('#fnc11').val(), {format: "#,##0.00", locale: "br"}));
      ContribCalc[2][0] = SalLimitContrib * $('#fnc11').val();

      $('#fnc21').val("R$ " + $.formatNumber(ContribCalc[2][0] * $('#fnc20').val(), {format: "#,##0.00", locale: "br"}));
      ContribCalc[3][0] = ContribCalc[2][0] * $('#fnc20').val();

      $('#fnc8').val("R$ " + $.formatNumber(Salario * $('#fnc6').val(), {format: "#,##0.00", locale: "br"}));
      ContribCalc[6][0] = Salario * $('#fnc6').val();

      $('#tblCtr1').show();
      $('#tblCtr2').show();   
      $('#tblCtr3').show();
      $('#tblCtr4').show();      
      $('#tblCtr7').show(); 
      
      $('#fnc1').attr("disabled", "disabled");                      
      
    } else { //Não pode contribuir em nenhuma contribuição
          
      $('#tblCtr1').show();
      $('#tblCtr2').show();      
      $('#tblCtr7').show(); 

      $('#fnc1').attr("disabled", "disabled");                  
      $('#fnc6').attr("disabled", "disabled");   

    };      

//------------------------------------------------------- Eventos Change ---------------------------------------------------------  
  
  $('#fnc1').change(function() { 
    $('#fnc3').val("R$ " + $.formatNumber((SalLimitBasica - 15 * URP) * $('#fnc1').val(), {format: "#,##0.00", locale: "br"})); 
    ContribCalc[0][0] = (SalLimitBasica - 15 * URP) * $('#fnc1').val();    
      
    $('#fnc10').val("R$ " + $.formatNumber(ContribCalc[0][0] * $('#fnc4').val(), {format: "#,##0.00", locale: "br"}));
    ContribCalc[1][0] = ContribCalc[0][0] * $('#fnc4').val();                   
  });

  $('#fnc11').change(function() { 

    if ((SalLimitContrib * $('#fnc11').val() < 0.1 * URP) && $('#fnc11').val() != 0){        
      $('#fnc12').html('<strong>Atenção!</strong> O valor mínimo de contribuição geral é de R$ ' + $.formatNumber(0.1 * URP, {format: "#,##0.00", locale: "br"}) + '.');             
      $('#fnc12').fadeIn();
      //$('#fnc11').prop("selectedIndex", 0);
      $('#fnc18').val("R$ " + $.formatNumber(0.1 * URP, {format: "#,##0.00", locale: "br"}));
      ContribCalc[2][0] = 0.1 * URP;
      setTimeout(function(){$('#fnc12').fadeOut();}, 4000);  
    } else {                       
      $('#fnc18').val("R$ " + $.formatNumber(SalLimitContrib * $('#fnc11').val(), {format: "#,##0.00", locale: "br"}));
      ContribCalc[2][0] = SalLimitContrib * $('#fnc11').val();      
    }; 

    $('#fnc21').val("R$ " + $.formatNumber(ContribCalc[2][0] * $('#fnc20').val(), {format: "#,##0.00", locale: "br"}));
    ContribCalc[3][0] = ContribCalc[2][0] * $('#fnc20').val();  
               
  });

  $('#fnc23').change(function() {
      $('#fnc24').val("R$ " + $.formatNumber((SalLimitContrib - 80 * URP) * $('#fnc23').val(), {format: "#,##0.00", locale: "br"}));
      ContribCalc[4][0] = (SalLimitContrib - 80 * URP) * $('#fnc23').val();

      $('#fnc28').val("R$ " + $.formatNumber(ContribCalc[4][0] * $('#fnc26').val(), {format: "#,##0.00", locale: "br"}));
      ContribCalc[5][0] = ContribCalc[4][0] * $('#fnc26').val();                 
  });

  $('#fnc6').change(function() {

    if ((Salario * $('#fnc6').val() < 0.1 * URP) && $('#fnc6').val() != 0) {        
      $('#fnc12').html('<strong>Atenção!</strong> O valor mínimo de contribuição voluntária é de R$ ' + $.formatNumber(0.1 * URP, {format: "#,##0.00", locale: "br"}) + '.');             
      $('#fnc12').fadeIn();
      //$('#fnc6').prop("selectedIndex", 0);
      $('#fnc8').val("R$ " + $.formatNumber(0.1 * URP, {format: "#,##0.00", locale: "br"}));
      ContribCalc[6][0] = 0.1 * URP;
      setTimeout(function(){$('#fnc12').fadeOut();}, 4000);  
    } else {                       
      $('#fnc8').val("R$ " + $.formatNumber(Salario * $('#fnc6').val(), {format: "#,##0.00", locale: "br"}));
      ContribCalc[6][0] = Salario * $('#fnc6').val();
    };    
      
  });  
    	             
  $('#fnc7').change(function() {
      ContribCalc[6][3] = ($('#fnc7').val() == "Mensal") ? 0 : ($('#fnc7').val() == "Anual") ? 1 : 2;
      /*if (status == 9){
      BenefBar(BenefCheckOpt);
      }*/  
  });

  $('#fnc5').change(function() {
    if ($('#fnc5').val() == "Percentual"){
      $('#fnc9').hide();
      $('#fnc6').fadeIn();
      $('#fnc6').prop("selectedIndex", 0);
      $('#fnc8').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
      ContribCalc[6][0] = 0;
      $('#fnc14').hide();
      $('#fnc13').fadeIn();
    } else {
      $('#fnc6').hide();
      $('#fnc6').prop("selectedIndex", 0);
      $('#fnc9').val("");
      $('#fnc9').fadeIn();
      $('#fnc8').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
      ContribCalc[6][0] = 0;
      $('#fnc13').hide();
      $('#fnc14').fadeIn();        
    };      
  });
    
};

function consultaContribPart(){  //Retorna valores de Contrib Geral, Contrib Adicional e Contrib Voluntaria

  var countGeral = 0; //Conta quantidade de contribuições Jóia participante
  var contribGeral = 0;
  var contribAdicional = 0;
  var contribVoluntaria = 0;
  var percGeral = 0;
  var percAdicional = 0;
  var percVoluntaria = 0;
  var ctrCatchGeral = 0; //Controle para capturar apenas a última contribuição Geral  
  var ctrCatchAdicional = 0; //Controle para capturar apenas a última contribuição Adicional
  var ctrCatchVoluntaria = 0; //Controle para capturar apenas a última contribuição Voluntaria
  var i = TextMovto.movimentacoes.length - 1;

  if(i > -1){

    do {
      var movto = TextMovto.movimentacoes[i];
      if (movto.id_conta == 1273 && movto.conta_resp == 0){ //Pega a última Contrib Geral
        ctrCatchGeral == 0 ? contribGeral = movto.ctr_rent : "";
        ctrCatchGeral++;
        countGeral++; //Qtd de Contribuições Geral Participante 
      }
      if (movto.id_conta == 1224 && movto.conta_resp == 0){  //Pega a última Contrib Adicional      
        ctrCatchAdicional == 0 ? contribAdicional =  movto.ctr_rent : "";
        ctrCatchAdicional++;
      }
      if (movto.id_conta == 1208 && movto.conta_resp == 0){  //Pega a última Contrib Voluntaria       
        ctrCatchVoluntaria == 0 ? contribVoluntaria =  movto.ctr_rent : "";
        ctrCatchVoluntaria ++;
      }
      i--;
    } while(i >= 0)

  }

  percGeral = (contribGeral / SalLimitContrib).toFixed(2) * 1;
  percAdicional = (contribAdicional / (Salario >= 80 * URP ? (SalLimitContrib - 80 * URP) : 1)).toFixed(2) * 1; //Somente acima de 80 UP contribui na adicional
  percVoluntaria = (contribVoluntaria / Salario).toFixed(2) * 1;

  //Valida os percentuais cálculados
  percGeral = $('#fnc11 option:last').val() >= percGeral && (SalLimitContrib * percGeral > 0.1 * URP) ? percGeral : 0;
  percAdicional = $('#fnc23 option:last').val() >= percAdicional ? percAdicional : 0;
  percVoluntaria = $('#fnc6 option:last').val() >= percVoluntaria && (Salario * percVoluntaria > 0.1 * URP) ? percVoluntaria : 0;

 return [percGeral, percAdicional, percVoluntaria, countGeral];

}

function inicPercent(){  //Pegar pelas ultimas contribuições chamar função que inicializa os percentuais

    var idadePart = DataDif(Ncmto, DtSaldoIni, 0, 2);
    var qtdMesesGeral = consultaContribPart()[3]; 
    
    if (Salario > 20 * URP) {
      //Normal Patrocinadora
      switch (true){
        case (idadePart < 40):
          $('#fnc4').prop("selectedIndex", 1);
          break;  
        case (idadePart >= 40 && idadePart < 50):
          $('#fnc4').prop("selectedIndex", 2);
          break;
        case (idadePart >= 50):
          $('#fnc4').prop("selectedIndex", 3);    
          break;     
        } 
    } else {
      $('#fnc4').prop("selectedIndex", 0);
    }
        
    if (Salario * 0.05 >= 0.1 * URP) {
      //Geral Patrocinadora
      switch (true){
        case (qtdMesesGeral < 37):
          $('#fnc20').prop("selectedIndex", 1);
          break;  
        case (qtdMesesGeral >= 37):
          $('#fnc20').prop("selectedIndex", 2);
          break;  
      } 
    } else {
      $('#fnc20').prop("selectedIndex", 0);
    }    

    if (Salario >= 80 * URP) {
      //Adicional Patrocinadora
      switch (true){
        case (idadePart < 40):
          $('#fnc26').prop("selectedIndex", 1);
          break;  
        case (idadePart >= 40 && idadePart < 50):
          $('#fnc26').prop("selectedIndex", 2);
          break;
        case (idadePart >= 50):
          $('#fnc26').prop("selectedIndex", 3);    
          break;     
      }
    } else {
      $('#fnc26').prop("selectedIndex", 0);
    }

    //Inicializa Array de contribuições
    $('#fnc3').val("R$ " + $.formatNumber((SalLimitBasica - 15 * URP) * $('#fnc1').val(), {format: "#,##0.00", locale: "br"})); 
    ContribCalc[0][0] = (SalLimitBasica - 15 * URP) * $('#fnc1').val();
    ContribCalc[0][1] = 0;
    ContribCalc[0][2] = 1;
    ContribCalc[0][3] = 0;
      
    $('#fnc10').val("R$ " + $.formatNumber(ContribCalc[0][0] * $('#fnc4').val(), {format: "#,##0.00", locale: "br"}));
    ContribCalc[1][0] = ContribCalc[0][0] * $('#fnc4').val();
    ContribCalc[1][1] = 1;
    ContribCalc[1][2] = 1;
    ContribCalc[1][3] = 0;
        
    $('#fnc18').val("R$ " + $.formatNumber(SalLimitContrib * $('#fnc11').val(), {format: "#,##0.00", locale: "br"}));
    ContribCalc[2][0] = SalLimitContrib * $('#fnc11').val();
    ContribCalc[2][1] = 0;
    ContribCalc[2][2] = 1;
    ContribCalc[2][3] = 0;

    $('#fnc21').val("R$ " + $.formatNumber(ContribCalc[2][0] * $('#fnc20').val(), {format: "#,##0.00", locale: "br"}));
    ContribCalc[3][0] = ContribCalc[2][0] * $('#fnc20').val();
    ContribCalc[3][1] = 1;
    ContribCalc[3][2] = 1;
    ContribCalc[3][3] = 0;

    $('#fnc24').val("R$ " + $.formatNumber((SalLimitContrib - 80 * URP) * $('#fnc23').val(), {format: "#,##0.00", locale: "br"}));
    ContribCalc[4][0] = (SalLimitContrib - 80 * URP) * $('#fnc23').val();
    ContribCalc[4][1] = 0;
    ContribCalc[4][2] = 1;
    ContribCalc[4][3] = 0;

    $('#fnc28').val("R$ " + $.formatNumber(ContribCalc[4][0] * $('#fnc26').val(), {format: "#,##0.00", locale: "br"}));
    ContribCalc[5][0] = ContribCalc[4][0] * $('#fnc26').val();
    ContribCalc[5][1] = 1;
    ContribCalc[5][2] = 1;
    ContribCalc[5][3] = 0;

    $('#fnc8').val("R$ " + $.formatNumber(Salario * $('#fnc6').val(), {format: "#,##0.00", locale: "br"}));
    ContribCalc[6][0] = Salario * $('#fnc6').val();
    ContribCalc[6][1] = 0;
    ContribCalc[6][2] = 1;
    ContribCalc[6][3] = ($('#fnc7').val() == "Mensal") ? 0 : ($('#fnc7').val() == "Anual") ? 1 : 2; //Periodicidade da contribuição - 0: mensal, 1: anual, 2: único

    //ContribCalc[4][0] = 0; //valor da contribuição
    //ContribCalc[4][1] = 0; //responsável pela contribuição - Patroc ou Partic
    //ContribCalc[4][2] = 1; //Perfil da contribuição
    //ContribCalc[4][3] = ContribCalc[4][3] = ($('#fnc7').val() == "Mensal") ? 0 : ($('#fnc7').val() == "Anual") ? 1 : 2; //Periodicidade da contribuição - 0: mensal, 1: anual, 2: único
        
    //$('#fnc4').val("R$ " + $.formatNumber(UltContribPart, {format: "#,##0.00", locale: "br"})); //campo criado dinamicamente na função Monta_Contrib(); 
    //$('#fnc11').val("R$ " + $.formatNumber(UltContribPatroc-ContribCalc[2][0], {format: "#,##0.00", locale: "br"})); //campo criado dinamicamente na função Monta_Contrib();             
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


