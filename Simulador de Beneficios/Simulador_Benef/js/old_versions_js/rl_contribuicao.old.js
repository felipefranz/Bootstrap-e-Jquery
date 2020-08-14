<!-- saved from url=(0016)http://localhost -->
var ContribCalc = [[],[],[],[],[]];                             //variável global do valor das contribuições calculadas 
var contribCfg = []; //array global de configuração das contribuições
var minCtr = 0;
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
    var fnc2 = '<select class="form-control input-sm" id="fnc2" size="1" style="width:80px"></select>';
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
    var fnc15 = '<span id="fnc15">Contribuição Extraordinária<span>';
    
    //config grupo contribuição 1
    var ctr1hd = new tbfld("", "1ª Faixa", "2ª Faixa", "Contrib. Simulada", "Última Contrib.");
    var ctr1fd = new tbfld("Contribuição Participante", fnc1, fnc2, fnc3, fnc4);

    //config grupo contribuição 2
    var ctr2hd = new tbfld("", "", "", "Contrib. Simulada", "Última Contrib.");
    var ctr2fd = new tbfld("Contribuição Patrocinadora", "", "", fnc10, fnc11);
    
    //config grupo contribuição 3
    var ctr3hd = new tbfld("", "Tipo", fnc13 + fnc14, "Periodicidade", "Contrib. Simulada");
    var ctr3fd = new tbfld(fnc15, fnc5, fnc6 + fnc9, fnc7, fnc8);

    
    //carregamento das contribuições no array de configuração
    contribCfg.push([ctr1hd, ctr1fd]);
    contribCfg.push([ctr2hd, ctr2fd]);
    contribCfg.push([ctr3hd, ctr3fd]);
    
    
    var i = contribCfg.length; //quantidade de iterações para criação dos forms de contribuição
    
    //console.log(contribCfg);
    var tableContrib = '<div class="row"><div class="table-responsive"><div class="col-xs-12 col-sm-12 col-md-12">';
    
    for (a = 1; a <= i; a++){  //quantidade de grupo de contribuições
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
    tableContrib += '<div class="row"><div class="col-xs-12 col-sm-12 col-md-12">' + fnc12 + '</div></div>'
    
    $("#gridContrib").html(tableContrib);
    
    Contrib_Control()
}

function Contrib_Control(){
    var x = 0;
    
    $('#fnc7').append('<option value="Unico">Único</option>');
    $('#fnc7').append('<option value="Mensal">Mensal</option>');
    $('#fnc7').append('<option value="Anual">Anual</option>');
    $('#fnc7').prop("selectedIndex", 0);
    $('#fnc5').append('<option value="Percentual">Percentual</option>');
    $('#fnc5').append('<option value="Valor">Valor</option>');    
    
    for (x = 1; x <= 3.1; x += 0.1){
      $('#fnc1').append('<option value=' + x / 100 + '>' + $.formatNumber(x, {format: "#,##0.0", locale: "br"}) + '%</option>');   
    };
    
    for (x = 0; x <= 8; x += 0.1){
      $('#fnc2').append('<option value=' + x / 100 + '>' + $.formatNumber(x, {format: "#,##0.0", locale: "br"}) + '%</option>');   
    };
    
    for (x = 1; x <= 30; x += 0.5){
      $('#fnc6').append('<option value=' + x / 100 + '>' + $.formatNumber(x, {format: "#,##0.0", locale: "br"}) + '%</option>');   
    };
                
    $('#fnc12').hide();
    $('#fnc9').hide();
    $('#fnc14').hide();

    if (Salario > 10 * URP){
      $('#fnc1').prop("selectedIndex", $('#fnc1 option').length - 1);
      $('#fnc1').attr("disabled", "disabled");    
    }else{
      $('#fnc2').attr("disabled", "disabled");    
    };
    
    $('#fnc6').val("");
        
    $('#fnc8').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
    ContribCalc[2][0] = 0; //valor da contribuição
    ContribCalc[2][1] = 0; //responsável pela contribuição - Patroc ou Partic
    ContribCalc[2][2] = 1; //Perfil da contribuição
    ContribCalc[2][3] = ($('#fnc7').val() == "Mensal") ? 0 : ($('#fnc7').val() == "Anual") ? 1 : 2; //Periodicidade da contribuição - 0: mensal, 1: anual, 2: único
    $('#fnc4').val("R$ " + $.formatNumber(UltContribPart, {format: "#,##0.00", locale: "br"})); //campo criado dinamicamente na função Monta_Contrib(); 
    $('#fnc11').val("R$ " + $.formatNumber(UltContribPatroc, {format: "#,##0.00", locale: "br"})); //campo criado dinamicamente na função Monta_Contrib();     
    $('#fnc3').val("R$ " + $.formatNumber((Salario - 10 * URP) * $('#fnc2').val() + (Salario >= (10 * URP) ? (10 * URP) : Salario) * $('#fnc1').val(), {format: "#,##0.00", locale: "br"}));
    ContribCalc[0][0] = (Salario - 10 * URP) * $('#fnc2').val() + (10 * URP) * $('#fnc1').val();
    ContribCalc[0][1] = 0;
    ContribCalc[0][2] = 1;
    ContribCalc[0][3] = 0;
    $('#fnc10').val($('#fnc3').val());
    ContribCalc[1][0] = ContribCalc[0][0];
    ContribCalc[1][1] = 1;
    ContribCalc[1][2] = 1;
    ContribCalc[1][3] = 0;
    
    $('#fnc2').change(function() {
      $('#fnc3').val("R$ " + $.formatNumber((Salario - 10 * URP) * $('#fnc2').val() + (10 * URP) * $('#fnc1').val(), {format: "#,##0.00", locale: "br"}));
      ContribCalc[0][0] = (Salario - 10 * URP) * $('#fnc2').val() + (10 * URP) * $('#fnc1').val();
      ContribCalc[0][1] = 0;
      ContribCalc[0][2] = 1;
      ContribCalc[0][3] = 0;
      
      $('#fnc10').val($('#fnc3').val());
      ContribCalc[1][0] = ContribCalc[0][0];
      ContribCalc[1][1] = 1;
      ContribCalc[1][2] = 1;
      ContribCalc[1][3] = 0;
    });
    
    $('#fnc1').change(function() {
      $('#fnc3').val("R$ " + $.formatNumber((Salario - 10 * URP) * $('#fnc2').val() + (Salario >= (10 * URP) ? (10 * URP) : Salario) * $('#fnc1').val(), {format: "#,##0.00", locale: "br"}));
      ContribCalc[0][0] = (Salario - 10 * URP) * $('#fnc2').val() + (Salario >= (10 * URP) ? (10 * URP) : Salario) * $('#fnc1').val();
      ContribCalc[0][1] = 0;
      ContribCalc[0][2] = 1;
      ContribCalc[0][3] = 0;
      $('#fnc10').val($('#fnc3').val())
      ContribCalc[1][0] = ContribCalc[0][0];
      ContribCalc[1][1] = 1;
      ContribCalc[1][2] = 1;
      ContribCalc[1][3] = 0;
    });    

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
      $('#fnc9').val($('#fnc9').val().replace(",","."));
      if (isNaN($('#fnc9').val())){
        $('#fnc12').html('<strong>Atenção!</strong> Digite apenas números. O valor mínimo é R$ ' + $.formatNumber(URP, {format: "#,##0.00", locale: "br"}) + '.')  
        $('#fnc12').fadeIn();
        $('#fnc9').val("");
        $('#fnc8').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));
        ContribCalc[2][0] = 0;
        ContribCalc[2][1] = 0;
        ContribCalc[2][2] = 1;
        setTimeout(function(){$('#fnc12').fadeOut();}, 4000);  
      }else{
        status == 9 ? minCtr = URP : minCtr = (Salario * 0.01); 
        if ($('#fnc9').val() < minCtr){
          $('#fnc9').val($.formatNumber($('#fnc9').val(), {format: "#,##0.00", locale: "br"}));
          $('#fnc12').html('<strong>Atenção!</strong> O valor mínimo é R$ ' + $.formatNumber(minCtr, {format: "#,##0.00", locale: "br"}) + '.')  
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

};