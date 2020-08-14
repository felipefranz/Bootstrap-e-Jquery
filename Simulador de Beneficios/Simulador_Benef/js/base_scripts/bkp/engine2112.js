﻿<!-- saved from url=(0016)http://localhost --> 
//Parâmetros oriundos do backoffice

var objMovtoOrig = TextMovto;
var objMovtoProj;
var SaldoIniTposSaque;                          //Saldo Total na DIB (Perfil 1 + Perfil 2) - Após o Saque
var SaldoIniT;                                 //Saldo Total na DIB (Perfil 1 + Perfil 2)
var SaldoIni1;                                 //Saldo na DIB Perfil 1;
var SaldoIni2;                                 //Saldo na DIB Perfil 2;
var SaldoPartT;                               //Saldo Participante Total (Perfil 1 + Perfil 2)
var SaldoPatrocT;                              //Saldo Patrocinadora Total (Perfil 1 + Perfil 2)
var SaldoPatrocResgT;                          //Saldo Patrocinadora Resgate Total (Perfil 1 + Perfil 2)
var SaldoPortabFechT;                         //Saldo Portabilidade Fechada Total (Perfil 1 + Perfil 2)
var SaldoPart1;                               //Saldo Participante Perfil 1
var SaldoPart2;                               //Saldo Participante Perfil 2
var SaldoPatroc1;                            //Saldo Patrocinadora Perfil 1
var SaldoPatroc2;                            //Saldo Patrocinadora Perfil 2
var SaldoPortabFech1;                         //Saldo Portabilidade Entidade Fechada Perfil 1
var SaldoPortabFech2;                         //Saldo Portabilidade Entidade Fechada Perfil 2
var IRResgT;                                  //IR Total sobre Saldo (Perfil 1 + Perfil 2)
var IRResg1;                                  //IR Total sobre Saldo Perfil 1
var IRResg2;                                  //IR Total sobre Saldo Perfil 2
var SaldoIniT10;                                 //Saldo da faixa aliquota 10% de IR REgressivo
var SaldoIniT15;                                 //Saldo da faixa aliquota 15% de IR REgressivo
var SaldoIniT20;                                 //Saldo da faixa aliquota 20% de IR REgressivo
var SaldoIniT25;                                 //Saldo da faixa aliquota 25% de IR REgressivo
var SaldoIniT30;                                 //Saldo da faixa aliquota 30% de IR REgressivo
var SaldoIniT35;                                 //Saldo da faixa aliquota 35% de IR REgressivo
var SaldoIniTProg;                               //Saldo carimbado com IR Progressivo
var SaldoIniTIsen;                               //Saldo carimbado com IR Isento
var SaldoIniTProgResg;                           //Saldo progressivo para resgate 
var IRRegBenefPosSaque = 0                       //Saldo de IR Regressivo pós saque
var SaldoIniT10PosSaque = 0;                     //Saldo após o saque da faixa aliquota 10% de IR REgressivo
var SaldoIniT15PosSaque = 0;                     //Saldo após o saque da faixa aliquota 15% de IR REgressivo
var SaldoIniT20PosSaque = 0;                     //Saldo após o saque da faixa aliquota 20% de IR REgressivo
var SaldoIniT25PosSaque = 0;                     //Saldo após o saque da faixa aliquota 25% de IR REgressivo
var SaldoIniT30PosSaque = 0;                     //Saldo após o saque da faixa aliquota 30% de IR REgressivo
var SaldoIniT35PosSaque = 0;                     //Saldo após o saque da faixa aliquota 35% de IR REgressivo
var SaldoIniTProgPosSaque = 0;                   //Saldo após saque carimbado com IR Progressivo
var SaldoIniTIsenPosSaque = 0;                   //Saldo após saque carimbado com IR Progressivo
var CrescSalam = Math.pow((1 + CrescSalaa), (1 / 12)) - 1;  //% crescimento salarial a.m.
var ROIam1 = Math.pow((1 + ROIaa1), (1 / 12)) - 1;  //Meta atuarial ao m&ecirc;s do Plano - Perfil 1
var PercIdealBenef = Math.floor(ROIam1 * 10000) / 10000;  //% ideal para recebimento de beneficio, onde o saldo não diminui
var ROIam2 = Math.pow((1 + ROIaa2), (1 / 12)) - 1;  //Meta atuarial ao m&ecirc;s do Plano - Perfil 2
var Benef;                                   //Valor do Benef&iacute;cio projetado
var BenefText;                               //Valor do Benef&iacute;cio projetado em formato Brasileiro
var NewBenef;                                //Valor do Benef&iacute;cio projetado m&ecirc;s a m&ecirc;s na grid de Evolução do Saldo
var DtSaldoDIB;                                   //Data do Saldo na DIB
var ContDtDIB;                                    //Guarda a última data DIB
var GridEvol;                                     //HTML da Grid de evolução do Saldo
var SlideVal;                                     //Resultado da nova forma de recebimento simulada no Slider
var SlideValIdade;                                //Resultado do slider de idade
var SlideValSaque;                                //Resultado do slider de % de saque
var BenefCheckOpt;                                //Opção da forma de recebimento 0 - Percentual, 1 - Prazo
var NewDateEvol;                                  //Atualização do m&ecirc;s na grid de Evolução do Saldo
var NewAgeEvol;                                   //Atualização da idade do Assistido na grid de Evolução do Saldo
var PgtoText;                                     //Texto da forma de recebimento do benef&iacute;cio
var vlQuota = [];                               //array para guardar quotas projetada
var vlSal = [];                              //array para guardar salário projetado
var BenMinListener = 0;                           //Verificar se o benef&iacute;cio m&iacute;nimo foi atingido [0 - Não, 1 - Sim]
var AgeLimit = 100;                               //Idade limite para projeção
var IndiceCrescSal = 1;                           //Indice para projeção do salário e da URP - Valor da quota do salário
var mBenefAno = 0;    //Maior Benefício no ano
var qtdMeses = 0;     //Quantidade de Meses para pagamento proporcional de 13º 


DtSaldoIni = new Date(DtSaldoIni);
DCB = new Date(DCB);
ContDtDIB = new Date(DtSaldoIni);
DtSaldoDIB = new Date(DtSaldoIni);
DtAdmissao = new Date(DtAdmissao);
DtAdesao = new Date(DtAdesao);
DtDeslig === null ? DtDeslig=DtDeslig : DtDeslig = new Date(DtDeslig);
Ncmto = new Date(Ncmto);                          //converter para objeto calendário do javascript
DTBenefIni = new Date(DTBenefIni);

nome_plano_abrev == null ?  nome_plano_abrev = nome_plano_abrev : nome_plano_abrev = nome_plano_abrev.toLowerCase(); //lowercase para o retorno do banco que vem todas maiúsculas

var MinIdade = DataDif(Ncmto, DtSaldoIni, 0, 2)   //Valor m&iacute;nimo de idade no slider
var IncIdade = 1;                                 //Incremento da idade no slider
var MaxIdade = 75;                                //Valor máximo para idade no slider
var ValIdade = DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), DireitoAposent(), 0, 2); //Valor inicial de idade no slider
var ctx;                                      //variável de contexto do canvas
var BenefGrafico;                             //variável de desennho do gráfico                      
var today = new Date();                       //variável da data atual da simulação

Chart.defaults.global = {
    // Boolean - Whether to animate the chart
    animation: true,

    // Number - Number of animation steps
    animationSteps: 60,

    // String - Animation easing effect
    // Possible effects are:
    // [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
    //  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
    //  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
    //  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
    //  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
    //  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
    //  easeOutElastic, easeInCubic]
    animationEasing: "easeOutQuart",

    // Boolean - If we should show the scale at all
    showScale: true,

    // Boolean - If we want to override with a hard coded scale
    scaleOverride: false,

    // ** Required if scaleOverride is true **
    // Number - The number of steps in a hard coded scale
    scaleSteps: null,
    // Number - The value jump in the hard coded scale
    scaleStepWidth: null,
    // Number - The scale starting value
    scaleStartValue: null,

    // String - Colour of the scale line
    scaleLineColor: "rgba(0,0,0,.1)",

    // Number - Pixel width of the scale line
    scaleLineWidth: 1,

    // Boolean - Whether to show labels on the scale
    scaleShowLabels: true,

    // Interpolated JS string - can access value
    scaleLabel: "<%= $.formatNumber(value/1000, {format: '#,##0.0', locale: 'br'})%>",

    // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
    scaleIntegersOnly: true,

    // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero: false,

    // String - Scale label font declaration for the scale label
    scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Scale label font size in pixels
    scaleFontSize: 12,

    // String - Scale label font weight style
    scaleFontStyle: "normal",

    // String - Scale label font colour
    scaleFontColor: "#666",

    // Boolean - whether or not the chart should be responsive and resize when the browser does.
    responsive: true,

    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
    maintainAspectRatio: true,

    // Boolean - Determines whether to draw tooltips on the canvas or not
    showTooltips: true,

    // Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
    customTooltips: false,

    // Array - Array of string names to attach tooltip events
    tooltipEvents: ["mousemove", "touchstart", "touchmove"],

    // String - Tooltip background colour
    tooltipFillColor: "rgba(63, 97, 191, 0.7)",

    // String - Tooltip label font declaration for the scale label
    tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip label font size in pixels
    tooltipFontSize: 14,

    // String - Tooltip font weight style
    tooltipFontStyle: "normal",

    // String - Tooltip label font colour
    tooltipFontColor: "#fff",

    // String - Tooltip title font declaration for the scale label
    tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip title font size in pixels
    tooltipTitleFontSize: 14,

    // String - Tooltip title font weight style
    tooltipTitleFontStyle: "bold",

    // String - Tooltip title font colour
    tooltipTitleFontColor: "#fff",

    // Number - pixel width of padding around tooltip text
    tooltipYPadding: 6,

    // Number - pixel width of padding around tooltip text
    tooltipXPadding: 6,

    // Number - Size of the caret on the tooltip
    tooltipCaretSize: 8,

    // Number - Pixel radius of the tooltip border
    tooltipCornerRadius: 6,

    // Number - Pixel offset from point x to tooltip edge
    tooltipXOffset: 10,

    // String - Template string for single tooltips
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= 'R$ ' + $.formatNumber(value, {format: '#,##0.00', locale: 'br'}) %>",   

    // String - Template string for multiple tooltips
    multiTooltipTemplate: "<%= 'R$ ' + $.formatNumber(value, {format: '#,##0.00', locale: 'br'}) %>",

    // Function - Will fire on animation progression.
    onAnimationProgress: function(){},

    // Function - Will fire on animation completion.
    onAnimationComplete: function(){}
} 

var options = {
    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - Whether the line is curved between points
    bezierCurve : true,

    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.4,

    //Boolean - Whether to show a dot for each point
    pointDot : true,

    //Number - Radius of each point dot in pixels
    pointDotRadius : 4,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,

    //String - A legend template
      legendTemplate : '<ul>'
                      +'<% for (var i=0; i<datasets.length; i++) { %>'
                      +'<li>'
                      +'<span style="font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 90%; font-style: normal; color: #666">'
                      +'<div style=\"background-color:<%=datasets[i].strokeColor%>\; width:20px; height:20px; border:1px; float: left;"></div>'
                      +'&nbsp<% if (datasets[i].label) { %><%= datasets[i].label %><% } %>'
                      +'</span>'
                      +'</li>'
                      +'<% } %>'
                      +'</ul>',
              
		drawScale: [0,1,2],
		
    drawScaleStroke: [0,2]
};

var data = {
    labels: [],
    datasets: [
        {
            axis: 0,
            label: "Saldo",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: []
        },
        {
            axis: 1,
            label: "Benef&iacute;cio",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: []
        }
    ]
};



//Popular os dados cadastrais iniciais para simulação da nova renda
function inicio(){ 
   

   //Chamada do logo
   $("#Home_Logo").html(home_logo); 
   
   //Chamada de termos
   $("#home_text").html('<a href="'+url_retorno+'" class="navbar-link">'+home_text+'</a>');
   $("#secPermission_acessoNegado").html('<div class="alert alert-warning" role="alert">'+secPermission_acessoNegado+'</div>');
   $("#secInfo_iPessoais").html(secInfo_iPessoais);
   $("#secInfo_name").html(secInfo_name);
   $("#secInfo_cpf").html(secInfo_cpf);
   $("#secInfo_birth").html(secInfo_birth);
   $("#secInfo_dtAdmission").html(secInfo_dtAdmission);
   $("#secInfo_dtAccess").html(secInfo_dtAccess);
   $("#secInfo_dtTermination").html(secInfo_dtTermination);
   $("#secInfo_fldStatus").html(secInfo_fldStatus);
   $("#secSaldo_sContas").html(secSaldo_sContas);
   $("#secSaldo_taxopt").html(secSaldo_taxopt);
   $("#secSaldo_dtbal").html(secSaldo_dtbal);
   $("#secSaldo_fldMyBalance").html(secSaldo_fldMyBalance);
   $("#secSaldo_fldCompanyBalance").html(secSaldo_fldCompanyBalance);
   $("#secSaldo_fldPortability").html(secSaldo_fldPortability);
   $("#secContrib_nomePlan").html(secContrib_nomePlan);
   $("#secContrib_cPlan").html(secContrib_cPlan);
   $("#secContrib_salary").html(secContrib_salary);
   $("#secContrib_urp").html(secContrib_urp);
   $("#secHipot_msg1").html(secHipot_msg1);
   $("#secHipot_simulation").html(secHipot_simulation);
   $("#secHipot_barra").html(secHipot_barra);
   $("#secHipot_age").html(secHipot_age);
   $("#msgBenefOK_text").html(msgBenefOK_text);
   $("#secHipot_meta").html(secHipot_meta);
   $("#secHipot_msg2").html(secHipot_msg2);
   $("#secCrescSal_salgrow").html(secCrescSal_salgrow);
   $("#secCrescSal_msg1").html(secCrescSal_msg1);
   $("#secBenefApos_benefApos").html(secBenefApos_benefApos);
   $("#secBenefAnterior_ultBenef").html(secBenefAnterior_ultBenef);
   $("#secBenefAnterior_recebAtual").html(secBenefAnterior_recebAtual);
   $("#secSaque_msg1").html(secSaque_msg1);
   $("#secSaque_fldMyBenBal").html(secSaque_fldMyBenBal);
   $("#secSaque_barra").html(secSaque_barra);
   $("#secSaque_percSaque").html(secSaque_percSaque);
   $("#secSaque_sBruto").html(secSaque_sBruto);
   $("#secSaque_irSaque").html(secSaque_irSaque);
   $("#secSaque_sLiquido").html(secSaque_sLiquido);
   $("#tamBeneBox_msg1").html(tamBeneBox_msg1);
   $("#tamBeneBox_remainBenBal").html(tamBeneBox_remainBenBal);
   $("#tamBeneBox_bMensal").html(tamBeneBox_bMensal);
   $("#tamBeneBox_perc").html(tamBeneBox_perc);
   $("#tamBeneBox_prazo").html(tamBeneBox_prazo);
   $("#tamBeneBox_renda").html(tamBeneBox_renda);
   $("#tamBeneBox_barra").html(tamBeneBox_barra);
   $("#tamBeneBox_pmt").html(tamBeneBox_pmt);
   $("#tamBeneBox_amount").html(tamBeneBox_amount);
   $("#tamBeneBox_benefIrValue").html(tamBeneBox_benefIrValue);
   $("#tamBeneBox_benefNet").html(tamBeneBox_benefNet);
   $("#secBeneApos_grafico").html(secBeneApos_grafico);
   $("#secBeneApos_evolution").html(secBeneApos_evolution);
   $("#Limit100Text").html(Limit100Text);
   $("#secResgate_rProjetado").html(secResgate_rProjetado);
   $("#secResgate_rescPartBal").html(secResgate_rescPartBal);
   $("#secResgate_direito").html(secResgate_direito);
   $("#secResgate_rescCpnyBal").html(secResgate_rescCpnyBal);
   $("#secResgate_rescTotBal").html(secResgate_rescTotBal);
   $("#secResgate_rescTax").html(secResgate_rescTax);
   $("#secResgate_rescNet").html(secResgate_rescNet);
   $("#secMsg_msg1").html(secMsg_msg1);
   $("#secMsg_dtSaldoFoot").html(secMsg_dtSaldoFoot);
   $("#secMsg_dtNowFoot").html(secMsg_dtNowFoot);
   $("#CopyrigtText").html(CopyrigtText);


  //$("#secPermission").hide(); //Acesso negado
  $("#secInfo").hide();       //Informações Pessoais
  $("#grpTermination").hide();  //Data de Desligamento
  $("#secSaldo").hide();      //Saldo de Contas
  $("#secContrib").hide();    //Contribuições ao Plano
  $("#secSalURP").hide();     //Salário e URP
  $("#secHipot").hide();      //Hipóteses Financeiras e Atuariais
  $("#secCrescSal").hide();   //Crescimento Salarial  
  $("#secSimulation").hide(); //Simulação
  $("#secResgate").hide();    //Resgate
  $("#secBenefAnterior").hide(); //Último Benef&iacute;cio
  $("#secBenefApos").hide();  //Direito Adquirido do Benef&iacute;cio de Aposentadoria
  $("#secSaque").hide();      //Saque
  $('#secSaque_msg2').hide();  //Mensagem de erro rl_contribuicao 
  $("#secMsg").hide();        //Disclaimer
  $("#secFoot").hide();       //Rodapé  
  $("#img30").hide();
  $("#img40").hide();
  $("#img54").hide();
  $("#img75").hide();
  $("#msgBenefOK").hide();

  Monta_Contrib();
  projQuota();
  //projSal();  //não temos utilidade
  MontaSaldo(objMovtoOrig.movimentacoes, DtSaldoIni, 1, 1, DireitoResgate() [1], 1);
  $("#name").val(Nome);                                  
  $("#cpf").val(CPF);                                                                                                            
  $("#birth").val($.formatNumber(Ncmto.getDate(), {format: "#,##00", locale: "br"}) + "/" + $.formatNumber(Ncmto.getMonth() + 1, {format: "#,##00", locale: "br"}) + "/" + Ncmto.getFullYear());
  $("#dtadmission").val($.formatNumber(DtAdmissao.getDate(), {format: "#,##00", locale: "br"}) + "/" +  $.formatNumber(DtAdmissao.getMonth() + 1, {format: "#,##00", locale: "br"}) + "/" + DtAdmissao.getFullYear());
  $("#dtaccess").val($.formatNumber(DtAdesao.getDate(), {format: "#,##00", locale: "br"}) + "/" + $.formatNumber(DtAdesao.getMonth() + 1, {format: "#,##00", locale: "br"}) + "/" + DtAdesao.getFullYear());
  $("#fldstatus").val(statustxt + " - " + motivo_statustxt);
  if(!(DtDeslig === null)){
  $("#dttermination").val($.formatNumber(DtDeslig.getDate(), {format: "#,##00", locale: "br"}) + "/" + $.formatNumber(DtDeslig.getMonth() + 1, {format: "#,##00", locale: "br"}) + "/" + DtDeslig.getFullYear());
  };
  $("#taxopt").val((OpcaoTribut == "S") ? "Regressivo" : "Progressivo");
  $("#salary").val("R$ " + $.formatNumber(Salario, {format: "#,##0.00", locale: "br"}));
  $("#urp").val("R$ " + $.formatNumber(URP, {format: "#,##0.00", locale: "br"}));
  $("#dtbal").val($.formatNumber(DtSaldoIni.getDate(), {format: "00", locale: "br"}) + "/" + $.formatNumber((DtSaldoIni.getMonth() + 1), {format: "00", locale: "br"}) + "/" + DtSaldoIni.getFullYear());
  //$("#meta").val($.formatNumber(ROIaa1 * 100, {format: "#,##0.00", locale: "br"}) + "% a.a.");
  for (x = 0; x <= (ROIaa1 * 1000); x += 1){
     if ((x % 10.00) == 0.00 || x == ROIaa1 * 1000) { 
      $("#meta").append('<option value=' + x / 1000 + '>' + $.formatNumber(x / 10, {format: "#,##0.0", locale: "br"}) + '%</option>');
     } 
  };
  $('#meta').prop("selectedIndex", $('#meta option').length - 1);
  $('#meta').attr("disabled", desabilitaMeta);
  //$("#salgrow").val($.formatNumber(CrescSalaa * 100, {format: "#,##0.00", locale: "br"}) + "% a.a.");
  
  for (x = 0; x <= (CrescSalaa * 1000); x += 1){
     if ((x % 10.00) == 0.00 || x == CrescSalaa * 1000) { 
      $("#salgrow").append('<option value=' + x / 1000 + '>' + $.formatNumber(x / 10, {format: "#,##0.0", locale: "br"}) + '%</option>');
     } 
  };
  $('#salgrow').prop("selectedIndex", $('#salgrow option').length - 1);
  $('#salgrow').attr("disabled", desabilitaSalGrow);
    
  $("#fldMyBalance").html("R$ " + $.formatNumber(SaldoPartT, {format: "#,##0.00", locale: "br"}));
  $("#fldPortability").html("R$ " + $.formatNumber(SaldoPortabFechT, {format: "#,##0.00", locale: "br"}));
  $("#fldCompanyBalance").html("R$ " + $.formatNumber(SaldoPatrocT, {format: "#,##0.00", locale: "br"}));
  $("#fldTotalBalance").html("R$ " + $.formatNumber(SaldoIniT, {format: "#,##0.00", locale: "br"}));
  $("#copyright").html(CopyrigtText);
  $("#nomePlan").html(nome_plano_abrev);
  $("#UltBenef").val("R$ " + $.formatNumber(BenefIni, {format: "#,##0.00", locale: "br"}) + " (" + $.formatNumber((DTBenefIni.getMonth() + 1), {format: "#,##00", locale: "br"}) + "/" + DTBenefIni.getFullYear() + ")");
  $("#RecebAtual").val(PMTIni);
  $("#dtNowFoot").html($.formatNumber(today.getDate(), {format: "00", locale: "br"}) + "/" + $.formatNumber((today.getMonth() + 1), {format: "00", locale: "br"}) + "/" + today.getFullYear() + " " + $.formatNumber(today.getHours(), {format: "00", locale: "br"}) + ":" + $.formatNumber(today.getMinutes(), {format: "00", locale: "br"}));
  $("#dtSaldoFoot").html($.formatNumber(DtSaldoIni.getDate(), {format: "00", locale: "br"}) + "/" + $.formatNumber((DtSaldoIni.getMonth() + 1), {format: "00", locale: "br"}) + "/" + DtSaldoIni.getFullYear());

  valida_permissao();         
  
  CrescSalaa > 0 ? $("#secCrescSal").show() : $("#secCrescSal").hide() ;
  
  if (pgtoPercHabilit) {
    $("#groupPerc").show();
  }else{
    $("#groupPerc").hide();
  };
  
  if (pgtoPrazoHabilit) {
    $("#groupPrazo").show() 
  }else{
    $("#groupPrazo").hide()
  }; 
  
  if (pgtoRendaHabilit) {
    $("#groupRenda").show();
  }else{
    $("#groupRenda").hide();
  }; 

  if (status != 9){
    IdadeBar();
  }else{
    ProjetaSaldo();
    //BenefCheck();   
  }
}

function MontaSaldo(jsonObj, dtsaldo, percDirPartic, percDirPatroc, percDirPatrocResg, percDirPortabFech){
  SaldoPart1 = 0;
  SaldoPart2 = 0;
  SaldoPartT = 0;
  SaldoPatroc1 = 0;
  SaldoPatroc2 = 0;
  SaldoPatrocT = 0; 
  SaldoPatrocResgT = 0;
  SaldoIni1 = 0;
  SaldoIni2 = 0;
  SaldoIniT = 0;
  IRResgPart1 = 0;
  IRResgPart2 = 0;
  IRResgPartT = 0;
  IRResgPatroc1 = 0;
  IRResgPatroc2 = 0;
  IRResgPatrocT = 0;
  IRResgT = 0;
  SaldoPortabFech1 = 0;
  SaldoPortabFech2 = 0;
  SaldoPortabFechT = 0;
  SaldoIniT10 = 0;
  SaldoIniT15 = 0;
  SaldoIniT20 = 0;
  SaldoIniT25 = 0;
  SaldoIniT30 = 0;
  SaldoIniT35 = 0;
  SaldoIniTProg = 0;
  SaldoIniTProgResg = 0;
  SaldoIniTIsen = 0;
  
  var qt1 = 0;
  var qt2 = 0;
  
  for (i in vlQuota){
    if (vlQuota[i][0].getMonth() + 1 == dtsaldo.getMonth() + 1 && vlQuota[i][0].getFullYear() == dtsaldo.getFullYear() && vlQuota[i][1] == 1){qt1 = vlQuota[i][2]}
    if (vlQuota[i][0].getMonth() + 1 == dtsaldo.getMonth() + 1 && vlQuota[i][0].getFullYear() == dtsaldo.getFullYear() && vlQuota[i][1] == 2){qt2 = vlQuota[i][2]}
  }
  
  for (i in jsonObj){
    var obj = jsonObj[i];
    if (obj.conta_resp == 0 && obj.perfil == NomePerfil1 && obj.id_conta != 1245 && obj.id_conta != 1246){
      SaldoPart1 += obj.ctr_quotas * qt1 * percDirPartic;
      switch (obj.tipo_tribut){
        case "r":
          IRResgPart1 += obj.ctr_quotas * qt1 * percDirPartic * obj.aliquota;
          switch (obj.aliquota){
            case 0.1:
              SaldoIniT10 += obj.ctr_quotas * qt1 * percDirPartic;
            break;
            case 0.15:
              SaldoIniT15 += obj.ctr_quotas * qt1 * percDirPartic;
            break;
            case 0.2:
              SaldoIniT20 += obj.ctr_quotas * qt1 * percDirPartic;
            break;
            case 0.25:
              SaldoIniT25 += obj.ctr_quotas * qt1 * percDirPartic; 
            break;
            case 0.3:
              SaldoIniT30 += obj.ctr_quotas * qt1 * percDirPartic;
            break;
            case 0.35:
              SaldoIniT35 += obj.ctr_quotas * qt1 * percDirPartic;
            break;
            default: 
              SaldoIniT35 += obj.ctr_quotas * qt1 * percDirPartic;
              Console.log("MontaSaldo Default - alíquota não encontrada");
          }          
        break;
        case "i":
          IRResgPart1 += obj.ctr_quotas * qt1 * percDirPartic * 0;
          SaldoIniTIsen += obj.ctr_quotas * qt1 * percDirPartic;
        break;
        case "p": 
          SaldoIniTProgResg += obj.ctr_quotas * qt1 * percDirPartic;                                
          SaldoIniTProg += obj.ctr_quotas * qt1 * percDirPartic;
        break;
      }
    };
    if (obj.conta_resp == 0 && obj.perfil == NomePerfil2 && obj.id_conta != 1245 && obj.id_conta != 1246){
      SaldoPart2 += obj.ctr_quotas * qt2 * percDirPartic;
      switch (obj.tipo_tribut){
        case "r":
          IRResgPart2 += obj.ctr_quotas * qt2 * percDirPartic * obj.aliquota;
          switch (obj.aliquota){
            case 0.1:
              SaldoIniT10 += obj.ctr_quotas * qt2 * percDirPartic;
            break;
            case 0.15:
              SaldoIniT15 += obj.ctr_quotas * qt2 * percDirPartic;
            break;
            case 0.2:
              SaldoIniT20 += obj.ctr_quotas * qt2 * percDirPartic;
            break;
            case 0.25:
              SaldoIniT25 += obj.ctr_quotas * qt2 * percDirPartic; 
            break;
            case 0.3:
              SaldoIniT30 += obj.ctr_quotas * qt2 * percDirPartic;
            break;
            case 0.35:
              SaldoIniT35 += obj.ctr_quotas * qt2 * percDirPartic;
            break;
            default: 
              SaldoIniT35 += obj.ctr_quotas * qt2 * percDirPartic;
              Console.log("MontaSaldo Default - alíquota não encontrada");
          }        
        break;
        case "i":
          IRResgPart2 += obj.ctr_quotas * qt2 * percDirPartic * 0;
          SaldoIniTIsen += obj.ctr_quotas * qt2 * percDirPartic;
        break;
        case "p":   
          SaldoIniTProgResg += obj.ctr_quotas * qt2 * percDirPartic;                                       
          SaldoIniTProg += obj.ctr_quotas * qt2 * percDirPartic; 
        break;
      }    
    };    
    if (obj.conta_resp == 1 && obj.perfil == NomePerfil1 && obj.id_conta != 1245 && obj.id_conta != 1246){
      SaldoPatroc1 += obj.ctr_quotas * qt1 * percDirPatroc;
      switch (obj.tipo_tribut){
        case "r":
          IRResgPatroc1 += obj.ctr_quotas * qt1 * percDirPatrocResg * obj.aliquota;
          switch (obj.aliquota){
            case 0.1:
              SaldoIniT10 += obj.ctr_quotas * qt1 * percDirPatroc;
            break;
            case 0.15:
              SaldoIniT15 += obj.ctr_quotas * qt1 * percDirPatroc;
            break;
            case 0.2:
              SaldoIniT20 += obj.ctr_quotas * qt1 * percDirPatroc;
            break;
            case 0.25:
              SaldoIniT25 += obj.ctr_quotas * qt1 * percDirPatroc; 
            break;
            case 0.3:
              SaldoIniT30 += obj.ctr_quotas * qt1 * percDirPatroc;
            break;
            case 0.35:
              SaldoIniT35 += obj.ctr_quotas * qt1 * percDirPatroc;
            break;
            default: 
              SaldoIniT35 += obj.ctr_quotas * qt1 * percDirPatroc;
              Console.log("MontaSaldo Default - alíquota não encontrada");
          }        
        break;
        case "i":
          IRResgPatroc1 += obj.ctr_quotas * qt1 * percDirPatrocResg * 0;
          SaldoIniTIsen += obj.ctr_quotas * qt1 * percDirPatroc;
        break;
        case "p": 
          SaldoIniTProgResg += obj.ctr_quotas * qt1 * percDirPatrocResg;                                                 
          SaldoIniTProg += obj.ctr_quotas * qt1 * percDirPatroc;
        break;
      }
    };
    if (obj.conta_resp == 1 && obj.perfil == NomePerfil2 && obj.id_conta != 1245 && obj.id_conta != 1246){
      SaldoPatroc2 += obj.ctr_quotas * qt2 * percDirPatroc;
      switch (obj.tipo_tribut){
        case "r":
          IRResgPatroc2 += obj.ctr_quotas * qt2 * percDirPatrocResg * obj.aliquota;
          switch (obj.aliquota){
            case 0.1:
              SaldoIniT10 += obj.ctr_quotas * qt2 * percDirPatroc;
            break;
            case 0.15:
              SaldoIniT15 += obj.ctr_quotas * qt2 * percDirPatroc;
            break;
            case 0.2:
              SaldoIniT20 += obj.ctr_quotas * qt2 * percDirPatroc;
            break;
            case 0.25:
              SaldoIniT25 += obj.ctr_quotas * qt2 * percDirPatroc; 
            break;
            case 0.3:
              SaldoIniT30 += obj.ctr_quotas * qt2 * percDirPatroc;
            break;
            case 0.35:
              SaldoIniT35 += obj.ctr_quotas * qt2 * percDirPatroc;
            break;
            default: 
              SaldoIniT35 += obj.ctr_quotas * qt2 * percDirPatroc;
              Console.log("MontaSaldo Default - alíquota não encontrada");
          }         
        break;
        case "i":        
          IRResgPatroc2 += obj.ctr_quotas * qt2 * percDirPatrocResg * 0;
          SaldoIniTIsen += obj.ctr_quotas * qt2 * percDirPatroc;
        break;
        case "p": 
          SaldoIniTProgResg += obj.ctr_quotas * qt2 * percDirPatrocResg;                
          SaldoIniTProg += obj.ctr_quotas * qt2 * percDirPatroc;
        break;
      }
    };    
    if (obj.perfil == NomePerfil1 && (obj.id_conta == 1245 || obj.id_conta == 1246)){  
      SaldoPortabFech1 += obj.ctr_quotas * qt1 * percDirPortabFech;
      switch (obj.tipo_tribut){
        case "r":
          switch (obj.aliquota){
            case 0.1:
              SaldoIniT10 += obj.ctr_quotas * qt1 * percDirPortabFech;
            break;
            case 0.15:
              SaldoIniT15 += obj.ctr_quotas * qt1 * percDirPortabFech;
            break;
            case 0.2:
              SaldoIniT20 += obj.ctr_quotas * qt1 * percDirPortabFech;
            break;
            case 0.25:
              SaldoIniT25 += obj.ctr_quotas * qt1 * percDirPortabFech; 
            break;
            case 0.3:
              SaldoIniT30 += obj.ctr_quotas * qt1 * percDirPortabFech;
            break;
            case 0.35:
              SaldoIniT35 += obj.ctr_quotas * qt1 * percDirPortabFech;
            break;
            default: 
              SaldoIniT35 += obj.ctr_quotas * qt1 * percDirPortabFech;
              Console.log("MontaSaldo Default - alíquota não encontrada");
          }           
        break;
        case "i":
          SaldoIniTIsen += obj.ctr_quotas * qt1 * percDirPortabFech;   
        break;
        case "p":
          SaldoIniTProg += obj.ctr_quotas * qt1 * percDirPortabFech;
        break;
      }    
    };
    if (obj.perfil == NomePerfil2 && (obj.id_conta == 1245 || obj.id_conta == 1246)){  
      SaldoPortabFech2 += obj.ctr_quotas * qt2 * percDirPortabFech;
      switch (obj.tipo_tribut){
        case "r":
          switch (obj.aliquota){
            case 0.1:
              SaldoIniT10 += obj.ctr_quotas * qt2 * percDirPortabFech;
            break;
            case 0.15:
              SaldoIniT15 += obj.ctr_quotas * qt2 * percDirPortabFech;
            break;
            case 0.2:
              SaldoIniT20 += obj.ctr_quotas * qt2 * percDirPortabFech;
            break;
            case 0.25:
              SaldoIniT25 += obj.ctr_quotas * qt2 * percDirPortabFech; 
            break;
            case 0.3:
              SaldoIniT30 += obj.ctr_quotas * qt2 * percDirPortabFech;
            break;
            case 0.35:
              SaldoIniT35 += obj.ctr_quotas * qt2 * percDirPortabFech;
            break;
            default: 
              SaldoIniT35 += obj.ctr_quotas * qt2 * percDirPortabFech;
              Console.log("MontaSaldo Default - alíquota não encontrada");
          }          
        break;
        case "i":
          SaldoIniTIsen += obj.ctr_quotas * qt2 * percDirPortabFech;  
        break;
        case "p":
          SaldoIniTProg += obj.ctr_quotas * qt2 * percDirPortabFech;  
        break;
      }    
    };    
  };

  //Conversão para 2 casas decimais
  SaldoPart1 = SaldoPart1.toFixed(2) * 1;
  SaldoPatroc1 = SaldoPatroc1.toFixed(2) * 1;
  SaldoPortabFech1 = SaldoPortabFech1.toFixed(2) * 1;
  SaldoPart2 = SaldoPart2.toFixed(2) * 1;
  SaldoPatroc2 = SaldoPatroc2.toFixed(2) * 1;
  SaldoPortabFech2 = SaldoPortabFech2.toFixed(2) * 1;
  IRResgPart1 = IRResgPart1.toFixed(2) * 1;
  IRResgPart2 = IRResgPart2.toFixed(2) * 1;
  IRResgPatroc1 = IRResgPatroc1.toFixed(2) * 1;
  IRResgPatroc2 = IRResgPatroc2.toFixed(2) * 1;
  SaldoIniTProg = SaldoIniTProg.toFixed(2) * 1;
  SaldoIniTProgResg = SaldoIniTProgResg.toFixed(2) * 1;
 
  //Saldo de contas
  SaldoPartT = SaldoPart1 + SaldoPart2;
  SaldoPatrocT = SaldoPatroc1 + SaldoPatroc2;
  SaldoPortabFechT = SaldoPortabFech1 + SaldoPortabFech2;  

  //Saldo inicial de benefício
  SaldoIni1 = SaldoPart1 + SaldoPatroc1 + SaldoPortabFech1;
  SaldoIni2 = SaldoPart2 + SaldoPatroc2 + SaldoPortabFech2;
  SaldoIniT = SaldoIni1 + SaldoIni2;
  
  //Saldo de resgate parte patrocinadora  
  SaldoPatrocResgT = (SaldoPatroc1 + SaldoPatroc2) * percDirPatrocResg;

  //IR Resgate
  IRResgPartT = IRResgPart1 + IRResgPart2;
  IRResgPatrocT = IRResgPatroc1 + IRResgPatroc2; 
  IRResgT = IRResgPartT + IRResgPatrocT + IRProgressivo(SaldoIniTProgResg);            
         
}

function BenefBar(opt){
  switch(opt){
    case 0:
      $("#slider").slider({
        value: ValPerc,
        min: MinPerc,
        max: MaxPerc,
        step: IncPerc,
        slide: function(event, ui) { 
        //Atualizar opção por nova forma de recebimento e valor do benef&iacute;cio ao movimentar o Slider - ui = user interface
          ValPerc = ui.value;          
          CalcSliderPerc(ValPerc);                        
          selectSlider(3); //switch case seletor de slider evento plano em rl_beneficio
        }
      });
      //Atualizar opção por nova forma de recebimento e valor do benef&iacute;cio ao checkar o radio "% sobre Saldo"
      ValPerc = $("#slider").slider("value");      
      CalcSliderPerc(ValPerc);            
      selectSlider(3); //switch case seletor de slider evento plano em rl_beneficio
      break;                
    case 1:
      $("#slider").slider({
        value: ValPrazo,
        min: MinPrazo,
        max: MaxPrazo,
        step: IncPrazo,
        slide: function(event, ui) {  
        //Atualizar opção por nova forma de recebimento e valor do benef&iacute;cio ao movimentar o Slider - ui = user interface
          ValPrazo = ui.value;          
          CalcSliderPrazo(ValPrazo);          
          selectSlider(2);  //switch case seletor de slider evento plano em rl_beneficio
        }
      });
      //Atualizar opção por nova forma de recebimento e valor do benef&iacute;cio ao checkar o radio "Prazo Determinado"
      ValPrazo = $("#slider").slider("value");
      CalcSliderPrazo(ValPrazo);
      selectSlider(2);  //switch case seletor de slider evento plano em rl_beneficio             
      break;           
   case 2:
     $("#slider").slider({
        value: (SaldoIniTposSaque * ValRenda), //Valor inicial da renda é estipulado atendendo o percentual min/max recebimento sobre o saldo disponível 
        min: (SaldoIniTposSaque * MinRenda),  //Renda mínima é estipulada pelo percentual mínimo de recebimento sobre o saldo disponível 
        max: (SaldoIniTposSaque * MaxRenda),  //Renda máxima é estipulada pelo percentual máximo de recebimento sobre o saldo disponível 
        step: IncRenda,
        slide: function(event, ui) { 
        //Atualizar opção por nova forma de recebimento e valor do benef&iacute;cio ao movimentar o Slider - ui = user interface
          ValRenda = ui.value;
          CalcSliderRenda(ValRenda);
          selectSlider(4);   //switch case seletor de slider evento plano em rl_beneficio
        }
      });
      //Atualizar opção por nova forma de recebimento e valor do benef&iacute;cio ao checkar o radio "% sobre Saldo"
      ValRenda = $("#slider").slider("value");
      CalcSliderRenda(ValRenda);
      selectSlider(4);   //switch case seletor de slider evento plano em rl_beneficio
      break;
  }
}    

//Ao alterar o check dos radios das formas de recebimento
function BenefCheck(){
  if (pgtoPercHabilit){
    $("#perc").prop("checked", true);
    BenefCheckOpt = 0;  
  } else if (pgtoPrazoHabilit){
    $("#prazo").prop("checked", true);
    BenefCheckOpt = 1;
  } else {
    $("#renda").prop("checked", true);
    BenefCheckOpt = 2;
  };
   
  $("#radio").change(function (){
      if ($("#perc").is(":checked")) { //Caso o radio "% sobre Saldo" estiver checked, faça...
        BenefCheckOpt = 0;
      }else if ($("#prazo").is(":checked")){  //Caso o radio "Prazo Determinado" estiver checked, faça...
        BenefCheckOpt = 1;
      } else {                           //Caso o radio "Renda Certa" estiver checked, faça...
        BenefCheckOpt = 2;
      }
      BenefBar(BenefCheckOpt);
  });
  BenefBar(BenefCheckOpt);  
};

function IdadeBar(){
  //Slider de idade para projeção de Saldo
  $("#sliderIdade").slider({
    value: ValIdade,
    min: MinIdade,
    max: MaxIdade,
    step: IncIdade,
    slide: function(event , ui) {
      //Listener para atualizar a idade na tela
      SlideValIdade = ui.value;
      $("#secSimulation").fadeOut(); 
      $("#age").val(SlideValIdade + " anos");
      if (ProxAno(Ncmto , SlideValIdade) >= DtSaldoIni){
        DtSaldoDIB = new Date(ProxAno(Ncmto , SlideValIdade));
      }else{
        DtSaldoDIB = new Date(ProxAno(DtSaldoIni , SlideValIdade - DataDif(Ncmto, DtSaldoIni, 0, 2)));
      }; 
      if (DtSaldoDIB >= DireitoAposent()){    
        $("#msgBenefOK2").show();
      }else{
        $("#msgBenefOK2").hide();
      };     
      $("#dtage").val("(Data Projetada: " + $.formatNumber(DtSaldoDIB.getMonth() + 1, {format: "00", locale: "br"}) + "/" + DtSaldoDIB.getFullYear() + ")");
      idadeImg();
    }
  });
  //Primeira atualização de idade do slider, quando a tela é carregado
  SlideValIdade = $("#sliderIdade").slider("value");
  $("#age").val(SlideValIdade + " anos");
  DtSaldoDIB = new DireitoAposent();
  if (DtSaldoDIB >= DireitoAposent()){    
        $("#msgBenefOK2").show();
      }else{
        $("#msgBenefOK2").hide();
      };
  $("#dtage").val("(Data Projetada: " + $.formatNumber(DtSaldoDIB.getMonth() + 1, {format: "00", locale: "br"}) + "/" + DtSaldoDIB.getFullYear() + ")");
  idadeImg();  
}

function idadeImg(){
  var idade = DataDif(Ncmto, DtSaldoDIB, 0, 2);

  switch (true){
    case (idade <= 28):
      $("#img40").hide();
      $("#img54").hide();
      $("#img75").hide();    
      $("#img30").show();
    break;
    case (idade > 28 && idade <= 38):
      $("#img54").hide();
      $("#img75").hide();    
      $("#img30").hide();
      $("#img40").show();    
    break;
    case (idade > 38 && idade <= 53):  
      $("#img75").hide();    
      $("#img30").hide();
      $("#img40").hide();
      $("#img54").show();        
    break;
    case (idade > 53):  
      $("#img30").hide();
      $("#img40").hide();
      $("#img54").hide(); 
      $("#img75").show();    
    break;    
  }
}

function SaqueBar(){
  //Slider de % de saque
  $("#sliderSaque").slider({
    value: 0,
    min: 0,
    max: 0.25,
    step: 0.01,
    slide: function(event , ui) {
      //Listener para atualizar 0 % saque na tela            
      CalcSliderSaque(ui.value);
      BenefBar(BenefCheckOpt);
      selectSlider(1);  //switch case seletor de slider evento plano em rl_beneficio
    }
  });
  //Primeira atualização de idade do slider, quando a tela é carregado  
  CalcSliderSaque($("#sliderSaque").slider("value"));
}

function CalcSliderSaque(percSaque){
      
      $("#wdwperc").val($.formatNumber(percSaque * 100, {format: "#,##0", locale: "br"}) + "%");                
      SlideValSaque = validaSaque(percSaque);        
      $("#wdwvalue").val("R$ " + $.formatNumber(SlideValSaque * SaldoIniT, {format: "#,##0.00", locale: "br"})); 
      SaldoIniTposSaque = SaldoIniT - SlideValSaque * SaldoIniT;
      $("#remainBenBal").val("R$ " + $.formatNumber(SaldoIniTposSaque, {format: "#,##0.00", locale: "br"}));      
      if (OpcaoTribut == "S"){
        var resultIRReg = IRRegBenef(SlideValSaque * SaldoIniT, SaldoIniT10, SaldoIniT15, SaldoIniT20, SaldoIniT25, SaldoIniT30, SaldoIniT35, SaldoIniTProg, SaldoIniTIsen); 
        //$("#wdwirvalue").val("R$ " + $.formatNumber(resultIRReg[0], {format: "#,##0.00", locale: "br"}));
        IRRegBenefPosSaque = resultIRReg[0];
        SaldoIniT10PosSaque = resultIRReg[1];
        SaldoIniT15PosSaque = resultIRReg[2];
        SaldoIniT20PosSaque = resultIRReg[3];
        SaldoIniT25PosSaque = resultIRReg[4];
        SaldoIniT30PosSaque = resultIRReg[5];
        SaldoIniT35PosSaque = resultIRReg[6];
        SaldoIniTProgPosSaque = resultIRReg[7];
        SaldoIniTIsenPosSaque = resultIRReg[8];
      }//else{
       // $("#wdwirvalue").val("R$ " + $.formatNumber(IRProgressivo(SlideValSaque * SaldoIniT), {format: "#,##0.00", locale: "br"}));  
      //}
      //$("#wdwnet").val("R$ " + $.formatNumber($("#wdwvalue").val().replace('R$ ','').replace('.','').replace(',','.') - $("#wdwirvalue").val().replace('R$ ','').replace('.','').replace(',','.'), {format: "#,##0.00", locale: "br"}));

}

function CalcSliderPerc(vPerc){
              
    SlideVal = vPerc;    
    CalcSliderSaque(($("#wdwperc").val().replace('%',''))/100);
    PgtoText = $.formatNumber(SlideVal, {format: "#,##0.00", locale: "br"}) + "%"; 
    $("#pmt").val(PgtoText);
    Benef = SaldoIniTposSaque * SlideVal / 100;
    BenefText = "R$ " + $.formatNumber(Benef, {format: "#,##0.00", locale: "br"});
    $("#amount").val(BenefText);          
    if (OpcaoTribut == "S"){
      var resultIRReg = IRRegBenef(Benef, SaldoIniT10PosSaque, SaldoIniT15PosSaque, SaldoIniT20PosSaque, SaldoIniT25PosSaque, SaldoIniT30PosSaque, SaldoIniT35PosSaque, SaldoIniTProgPosSaque, SaldoIniTIsenPosSaque);
      $("#benefirvalue").val("R$ " + $.formatNumber((resultIRReg[0] + IRRegBenefPosSaque), {format: "#,##0.00", locale: "br"}));
    }else{
      $("#benefirvalue").val("R$ " + $.formatNumber(IRProgressivo(Benef + (SlideValSaque * SaldoIniT)), {format: "#,##0.00", locale: "br"}));
    }
    //$("#benefnet").val("R$ " + $.formatNumber($("#amount").val().replace('R$ ','').replace('.','').replace(',','.') - $("#benefirvalue").val().replace('R$ ','').replace('.','').replace(',','.'), {format: "#,##0.00", locale: "br"}));
    EvolSaldo(SlideVal);
    
}

function CalcSliderPrazo(vPrazo){
          
    SlideVal = vPrazo;    
    CalcSliderSaque(($("#wdwperc").val().replace('%',''))/100);
    PgtoText = Math.floor(SlideVal) + " anos";
    if (Math.round((SlideVal - Math.floor(SlideVal)) * Nper) >= 2){PgtoText = PgtoText + " e " + Math.round((SlideVal - Math.floor(SlideVal)) * Nper) + " meses"} ;
    if (Math.round((SlideVal - Math.floor(SlideVal)) * Nper) < 2 && Math.round((SlideVal - Math.floor(SlideVal)) * Nper) >= 1){PgtoText = PgtoText + " e " + Math.round((SlideVal - Math.floor(SlideVal)) * Nper) + " m\u00EAs"};
    $("#pmt").val(PgtoText);
    Benef = SaldoIniTposSaque / (SlideVal * Nper);
    BenefText = "R$ " + $.formatNumber(Benef, {format: "#,##0.00", locale: "br"});
    $("#amount").val(BenefText);          
    if (OpcaoTribut == "S"){
      var resultIRReg = IRRegBenef(Benef, SaldoIniT10PosSaque, SaldoIniT15PosSaque, SaldoIniT20PosSaque, SaldoIniT25PosSaque, SaldoIniT30PosSaque, SaldoIniT35PosSaque, SaldoIniTProgPosSaque, SaldoIniTIsenPosSaque); 
      $("#benefirvalue").val("R$ " + $.formatNumber((resultIRReg[0] + IRRegBenefPosSaque), {format: "#,##0.00", locale: "br"}));
    }else{
      $("#benefirvalue").val("R$ " + $.formatNumber(IRProgressivo(Benef + (SlideValSaque * SaldoIniT)), {format: "#,##0.00", locale: "br"}));
    }
    //$("#benefnet").val("R$ " + $.formatNumber($("#amount").val().replace('R$ ','').replace('.','').replace(',','.') - $("#benefirvalue").val().replace('R$ ','').replace('.','').replace(',','.'), {format: "#,##0.00", locale: "br"}));
    EvolSaldo(SlideVal);
      
}

function CalcSliderRenda(vRenda){

    SlideVal = vRenda;    
    CalcSliderSaque(($("#wdwperc").val().replace('%',''))/100);
    PgtoText = "R$ " + $.formatNumber(SlideVal, {format: "#,##0.00", locale: "br"}); 
    $("#pmt").val(PgtoText);
    Benef = SlideVal;
    BenefText = "R$ " + $.formatNumber(Benef, {format: "#,##0.00", locale: "br"});
    $("#amount").val(BenefText);          
    if (OpcaoTribut == "S"){
      var resultIRReg = IRRegBenef(Benef, SaldoIniT10PosSaque, SaldoIniT15PosSaque, SaldoIniT20PosSaque, SaldoIniT25PosSaque, SaldoIniT30PosSaque, SaldoIniT35PosSaque, SaldoIniTProgPosSaque, SaldoIniTIsenPosSaque);
      $("#benefirvalue").val("R$ " + $.formatNumber((resultIRReg[0] + IRRegBenefPosSaque), {format: "#,##0.00", locale: "br"}));
    }else{
      $("#benefirvalue").val("R$ " + $.formatNumber(IRProgressivo(Benef + (SlideValSaque * SaldoIniT)), {format: "#,##0.00", locale: "br"}));
    }
    //$("#benefnet").val("R$ " + $.formatNumber($("#amount").val().replace('R$ ','').replace('.','').replace(',','.') - $("#benefirvalue").val().replace('R$ ','').replace('.','').replace(',','.'), {format: "#,##0.00", locale: "br"}));
    EvolSaldo(SlideVal);
    
}

//Projeção do Saldo de acordo com a data futura do slider
function ProjetaSaldo(){
  var dtcontrib;
  var qt1 = 0;
  var qt2 = 0;
  var qt3 = 0;
  var c = 0;
  
  objMovtoProj = $.extend(true, [], objMovtoOrig);
  
  //if (ContDtDIB > DtSaldoDIB){
  //  var a = DataDif(DtSaldoDIB, ContDtDIB, 0, 1);
  //  objMovtoProj.movimentacoes.splice(objMovtoProj.movimentacoes.length - a * contribCfg.length, a * contribCfg.length);
  //}else{
  for (var c = 0; c <= (contribCfg.length - 1); c ++){
  if (status != 9 && ContribCalc[c][3] == 2){
    objMovtoProj.movimentacoes.push({
        id_movto: 0,
        competencia: 0,
        data_movto: (ProxMes(DtSaldoIni, 1).getMonth() + 1 + "/01/" + ProxMes(DtSaldoIni, 1).getFullYear()),
        data_caixa: (ProxMes(DtSaldoIni, 1).getMonth() + 1 + "/01/" + ProxMes(DtSaldoIni, 1).getFullYear()),
        evento: "CTR",
        id_conta: 0,
        nome_conta: "CTR",
        conta_resp: ContribCalc[c][1],
        tipo_tribut: (OpcaoTribut == "S" ? "r" : "p"), 
        perfil: ((ContribCalc[c][2] == 1) ? NomePerfil1 : NomePerfil2),
        ctr_rent: 0,
        ctr_quotas:  ContribCalc[c][0] / ((ContribCalc[c][2] == 1) ? valorQuota1 : valorQuota2),
        idade_movto: 0,
        aliquota: 0.35
    });
          //var obj = objMovtoProj.movimentacoes[objMovtoProj.movimentacoes.length - 1] 
          //console.log("Dt. Movto: " + obj.data_movto, "Ctr R$: " + ContribCalc[2][0], "Ctr Quotas: " + obj.ctr_quotas, "Periodic.: " + ContribCalc[2][3]);   
    }
   }; 


    var a = DataDif(new Date(DtSaldoIni.getMonth() + 1 + "/01/" + DtSaldoIni.getFullYear()) , DtSaldoDIB, 0, Ncontrib);

    for (i = 1; i <= a; i++){
     dtcontrib = new Date(ProxMes(DtSaldoIni, i));     
      
     if (Ncontrib == 5 && (new Date(ProxMes(DtSaldoIni, i))).getMonth() == 11){//Controle contribuicao sobre o 13
         c = 2;
         a = a - 1;
      }else{ 
         c = 1;
      };
      
     for (j = 1; j <= c; j++){ 

      for (x in vlQuota){
        if (vlQuota[x][0].getMonth() + 1 == dtcontrib.getMonth() + 1 && vlQuota[x][0].getFullYear() == dtcontrib.getFullYear() && vlQuota[x][1] == 1){qt1 = vlQuota[x][2]}
        if (vlQuota[x][0].getMonth() + 1 == dtcontrib.getMonth() + 1 && vlQuota[x][0].getFullYear() == dtcontrib.getFullYear() && vlQuota[x][1] == 2){qt2 = vlQuota[x][2]}
        if (vlQuota[x][0].getMonth() + 1 == dtcontrib.getMonth() + 1 && vlQuota[x][0].getFullYear() == dtcontrib.getFullYear() && vlQuota[x][1] == 3){qt3 = vlQuota[x][2]}
      }
          for (var b = 0; b <= (contribCfg.length - 1); b ++){
            objMovtoProj.movimentacoes.push({
                id_movto: 0,
                competencia: 0,
                data_movto: (dtcontrib.getMonth() + 1 + "/01/" + dtcontrib.getFullYear()),
                data_caixa: (dtcontrib.getMonth() + 1 + "/01/" + dtcontrib.getFullYear()),
                evento: "CTR",
                id_conta: 0,
                nome_conta: "CTR",
                conta_resp: ContribCalc[b][1],
                tipo_tribut: (OpcaoTribut == "S" ? "r" : "p"), 
                perfil: ((ContribCalc[b][2] == 1) ? NomePerfil1 : NomePerfil2),
                ctr_rent: 0,
                ctr_quotas:  (ContribCalc[b][3] != 2) ? (((ContribCalc[b][0] * qt3) / ((ContribCalc[b][2] == 1) ? qt1 : qt2)) * ((ContribCalc[b][3] == 0 || dtcontrib.getMonth() + 1 == 1) ? 1 : 0)) : 0,
                idade_movto: 0,
                aliquota: 0.35
            });
          var obj = objMovtoProj.movimentacoes[objMovtoProj.movimentacoes.length - 1] 
          //console.log("#Nper: " + i,"#Ctr: " + b, "Dt. Movto: " + obj.data_movto, "Vl. quota1: " + qt1, "Index Sal: " + ((b == 2) ? 1 : qt3),"Ctr R$: " + ContribCalc[b][0] * ((b == 2) ? 1 : qt3), "Ctr Quotas: " + obj.ctr_quotas, "Periodic.: " + ContribCalc[b][3], "M&ecirc;s: " + (dtcontrib.getMonth() + 1));
          console.log("#Nper: " + i,"Conta Corresp.: " + obj.conta_resp, "Dt. Movto: " + ("01/" + (dtcontrib.getMonth() + 1) + "/" + dtcontrib.getFullYear()), "Ctr R$: " + ContribCalc[b][0] * ((b == 2) ? 1 : qt3), "Ctr Quotas: " + obj.ctr_quotas, "Vl. quota1: " + qt1, "Idade Movto: " + DataDif(obj.data_movto, DtSaldoDIB, 0, 4),"Aliquota: " + AliqRegressivo(DataDif(obj.data_movto, DtSaldoDIB, 0, 4)));
          };
    
      };
   };

  for (l in objMovtoProj.movimentacoes){
      var obj = objMovtoProj.movimentacoes[l];
      obj.idade_movto = DataDif(obj.data_movto, DtSaldoDIB, 0, 4);
      obj.aliquota = AliqRegressivo(obj.idade_movto);
                
  }; 

  MontaSaldo(objMovtoProj.movimentacoes, DtSaldoDIB, DireitoResgate() [0], 1, DireitoResgate() [1], 1); 
  if (DtSaldoDIB >= DireitoAposent()){ 
    SaqueBar();
    BenefCheck();
    $("#fldMyBenBal").val ("R$ " + $.formatNumber(SaldoIniTposSaque, {format: "#,##0.00", locale: "br"}));  
    $("#secBenefApos").show();
    
  }else{
    $("#secBenefApos").hide();
  }
     
  $("#RescPartBal").html ("R$ " + $.formatNumber(SaldoPartT, {format: "#,##0.00", locale: "br"}));      
  $("#RescCpnyBal").html ("R$ " + $.formatNumber(SaldoPatrocResgT, {format: "#,##0.00", locale: "br"}));  
  $("#RescTotBal").html ("R$ " + $.formatNumber(SaldoPartT + SaldoPatrocResgT, {format: "#,##0.00", locale: "br"})); 
  $("#RescTax").html ("R$ " + $.formatNumber(IRResgT, {format: "#,##0.00", locale: "br"}));  
  $("#RescNet").html ("R$ " + $.formatNumber(SaldoPartT + SaldoPatrocResgT - IRResgT, {format: "#,##0.00", locale: "br"}));   
  $("#lblPbarResgPartBal").html ($.formatNumber(DireitoResgate()[0] * 100, {format: "#,##0", locale: "br"}) + "%");  
  $("#lblPbarResgCompnyBal").html ($.formatNumber(DireitoResgate()[1] * 100, {format: "#,##0", locale: "br"}) + "%");
  $("#PbarResgPartBal").css("width", DireitoResgate()[0] * 100 + "%");//DireitoResgate()[0];  
  $("#PbarResgCompnyBal").css("width", DireitoResgate()[1] * 100 + "%");//DireitoResgate()[1]
   
  ContDtDIB = DtSaldoDIB;
  
  //var txtteste = "sld10: " + "R$ " + $.formatNumber(SaldoIniT10, {format: "#,##0.00", locale: "br"}) + "\n"  
  //txtteste +=  "sld15: " + "R$ " + $.formatNumber(SaldoIniT15, {format: "#,##0.00", locale: "br"}) + "\n"
  //txtteste +=  "sld20: " + "R$ " + $.formatNumber(SaldoIniT20, {format: "#,##0.00", locale: "br"}) + "\n"
  //txtteste +=  "sld25: " + "R$ " + $.formatNumber(SaldoIniT25, {format: "#,##0.00", locale: "br"}) + "\n"
  //txtteste +=  "sld30: " + "R$ " + $.formatNumber(SaldoIniT30, {format: "#,##0.00", locale: "br"}) + "\n"
  //txtteste +=  "sld35: " + "R$ " + $.formatNumber(SaldoIniT35, {format: "#,##0.00", locale: "br"}) + "\n"
  //txtteste +=  "sldProg: " + "R$ " + $.formatNumber(SaldoIniTProg, {format: "#,##0.00", locale: "br"}) + "\n"   
  //txtteste +=  "sldIsent: " + "R$ " + $.formatNumber(SaldoIniTIsen, {format: "#,##0.00", locale: "br"})
  //alert(txtteste);

  
  //alert("%Resg: " + DireitoResgate() + " DtDIB: " + DtSaldoDIB + " DtApos: " + DireitoAposent());
  //console.log(objMovtoProj.movimentacoes);

}

//Evolução do Saldo e Benef&iacute;cio na Grid
function EvolSaldo(opt){
    NewBenef = Benef;
    mBenefAno = NewBenef;  
    NewSaldo = SaldoIniTposSaque;
    NewDateEvol = ProxMes(DtSaldoDIB, 1);
    NewDateEvol.setDate(NewDateEvol.getDate() - 1);
    NewAgeEvol = 0;
    qtdMeses = 0;
    BenMinListener = 0;
    GridEvol = '<table id="GridEvol" class="table table-striped">';
    GridEvol = GridEvol + "<tr><th>Idade</th><th>Benef&iacute;cio Projetado</th><th>Saldo Remanescente</th></tr>";

    //*****************************************************************************************************
    //contribuição extraordinária de assistido 
    if (status == 9 && ContribCalc[2][3] == 2){
      NewSaldo += ContribCalc[2][0] * 1;
    }
    //*****************************************************************************************************
    
//Loop para atualização do novo benef&iacute;cio e do saldo remanescente m&ecirc;s a m&ecirc;s, enquanto Saldo > 0 ou Valor m&iacute;nimo do benef&iacute;cio não é atingido ou o Assistido não atingir 100 anos
do{

  if (mBenefAno < NewBenef && NewDateEvol.getMonth() != 0) {mBenefAno = NewBenef};

  if ($("#perc").is(":checked")) {
    if (v13pagto && NewDateEvol.getMonth() == 11){
        if (v13PropMBenefAno){
          qtdMeses++;
          NewBenef = (opt / 100 * NewSaldo) + (mBenefAno * (qtdMeses / 12));
          qtdMeses = 0; 
          mBenefAno = 0;  
        } else {
          NewBenef = (opt / 100 * NewSaldo) * 2;
        }
    }else{
      NewBenef = opt / 100 * NewSaldo;
      qtdMeses++;
    }
  } else if ($("#prazo").is(":checked")){
    //if (NewSaldo != SaldoIniTposSaque){
      if (v13pagto && NewDateEvol.getMonth() == 11){
        if (v13PropMBenefAno){
          qtdMeses++;
          NewBenef = (NewSaldo / (opt * Nper)) + (mBenefAno * (qtdMeses / 12));
          mBenefAno = 0;
          qtdMeses = 0;
          opt -= 1 / Nper; 
        } else {
        NewBenef = (NewSaldo / (opt * Nper)) * 2;
        opt -= 1 / Nper;       
        }
      }else{
        NewBenef = NewSaldo / (opt * Nper);
        opt -= 1 / Nper; 
        qtdMeses++;    
      }
        //console.log('data: ' + NewDateEvol + ' - benef: ' + Math.round(NewBenef * 100) / 100);
   // }    
  } else { 
      if (v13pagto && NewDateEvol.getMonth() == 11){
        NewBenef = opt * 2;            
      }else{
        NewBenef = opt;          
      }
  }

  
  //*****************************************************************************************************
  //contribuição extraordinária de assistido
  if (status == 9 && ContribCalc[2][3] != 2){
    NewSaldo += ContribCalc[2][0] * ((ContribCalc[2][3] == 0 || NewDateEvol.getMonth() + 1 == 1) ? 1 : 0);
  }
  //*****************************************************************************************************

  if (NewBenef < BenefMin || NewSaldo < SaldoMin){NewBenef = NewSaldo ; BenMinListener = 1};
  if (NewBenef > NewSaldo){NewBenef = NewSaldo};
  
  NewSaldo -= NewBenef;
  
  if (NewSaldo <= BenefMin){NewSaldo = 0}
  
  if (NewAgeEvol != DataDif(Ncmto, NewDateEvol, 0, 2) && DataDif(Ncmto, NewDateEvol, 0, 2) <= AgeLimit){
    GridEvol = GridEvol + "<tr><td>" + DataDif(Ncmto, NewDateEvol, 0, 2) + "</td><td>R$ " + $.formatNumber(NewBenef, {format:"#,##0.00", locale:"br"}) + "</td><td>R$ " + $.formatNumber(NewSaldo, {format:"#,##0.00", locale:"br"}) + "</td></tr>";
    data.labels.push(DataDif(Ncmto, NewDateEvol, 0, 2));
    data.datasets[0].data.push(NewSaldo);
    data.datasets[1].data.push(NewBenef);
  }
  if (BenMinListener == 1){
      GridEvol = GridEvol + '<tr><td colspan="4">' + BenMinText + '</td></tr>';
      NewSaldo = 0;
  }        
  if (DataDif(Ncmto, NewDateEvol, 0, 2) > AgeLimit){
      GridEvol = GridEvol + '<tr><td colspan="4">' + Limit100Text + '</td></tr>';
      NewSaldo = 0;
  }
  
  NewAgeEvol = DataDif(Ncmto, NewDateEvol, 0, 2);
  NewDateEvol = ProxMes(NewDateEvol, 2);
  NewDateEvol.setDate(NewDateEvol.getDate() - 1);
  NewSaldo *= (1 + ROIam1);
  
} while (NewSaldo > 0);

  GridEvol = GridEvol + "</table>";
  $("#evolution").html(GridEvol);
  
  if (Benef < BenefMin || SaldoIniTposSaque < BenefMin || SlideValIdade == NewAgeEvol) {BenMinListener = 0} else {BenMinListener = 1};
  if (BenMinListener == 1){
        $("#graSalProjeta").show();        
      }else{
        $("#graSalProjeta").hide();
      }
    
  ResetCanvas();  

}

function ResetCanvas(){
  $("#ChartBen").remove();
  $("#CharBenContainer").append('<canvas id="ChartBen" width="600" height="300"><canvas>');
  ctx = $("#ChartBen").get(0).getContext("2d");
  BenefGrafico = new Chart(ctx).MultiAxisLine(data, options);
  $("#legend").html(BenefGrafico.generateLegend());
  data.labels = [];
  data.datasets[0].data = [];
  data.datasets[1].data = [];
}

//Identifica o próximo m&ecirc;s na evolução da grid 
function ProxMes (actDate, nper){
  actDate = new Date(actDate.getMonth() + 1 + "/01/" + actDate.getFullYear());
  var nextDate = new Date(actDate.setMonth(actDate.getMonth() + nper)); 
  return nextDate;
}
//Identifica o próximo ano na evolução da grid 
function ProxAno (actDate, nper){
  actDate = new Date(actDate.getMonth() + 1 + "/01/" + actDate.getFullYear());
  var nextDate = new Date(actDate.setFullYear(actDate.getFullYear() + nper)); 
  return nextDate;
}


//Diferença de tempo entre 2 datas
function DataDif(dt1, dt2, dias15, ret){ //dt1: data inicio; dt2: data dim; dias15: 15 dias = 1 mês (0 - não, 1 sim) *fraçoes apenas; ret: tipo de retorno
  dt1 = new Date(dt1);
  dt2 = new Date(dt2);
    
  var anos = function(dt1, dt2){
      var years = (dt2.getFullYear() - dt1.getFullYear());
      if (dt2.getMonth() < dt1.getMonth() || dt2.getMonth() == dt1.getMonth() && dt2.getDate() < dt1.getDate()) {
          years--;
      }
      return years;  
  }

  var mesesTotal13 = function(dt1, dt2){
      var totalMeses13 = 0;
      var totalAnos = 0;
      
      totalAnos = (anos(dt1, dt2) + mesesDif(dt1, dt2) / 12 + ((dias15 == 0) ? diasDif(dt1, dt2) * 1 / 365.25 : ((diasDif(dt1, dt2) >= 15) ? 1/12 : diasDif(dt1, dt2)* 1 / 365.25)));

      totalMeses13 = mesesTotal(dt1, dt2) + anos(dt1, dt2); 
      
      if (anos(dt1, dt2) < totalAnos){
      
          var i = 0;
          var date1 = new Date(dt1);
          
          do {
              date1 = new Date(ProxMes(dt1, i));
              
              if(date1.getMonth() == 11 ){
                 totalMeses13 = totalMeses13 + 1;
              }
              
              i++;
          } while (date1.getMonth() != dt2.getMonth());                                 
        }
         
      return totalMeses13;
  }
  
  var mesesTotal = function(dt1, dt2){
      if (dt2.getMonth() >= dt1.getMonth()){
          var months = (dt2.getMonth() - dt1.getMonth());
      }else{
          var months = (12 - dt1.getMonth() + dt2.getMonth());
      }
       
      if (dt2.getDate() < dt1.getDate()) {
          months--;
      }
      return anos(dt1, dt2) * 12 + months;  
  }
  
  var diasTotal = function(dt1, dt2){
    var oneday = 1000 * 60 * 60 * 24;
    var days = Math.floor(dt2.getTime() - dt1.getTime());
    return days = Math.floor(days/oneday);
  }
  
  var mesesDif = function(dt1, dt2){
      if (dt2.getMonth() >= dt1.getMonth()){
          var months = (dt2.getMonth() - dt1.getMonth());
      }else{
          var months = (12 - dt1.getMonth() + dt2.getMonth());
      }
       
      if (dt2.getDate() < dt1.getDate()) {
          months--;
      }
      return months;    
  }
  
  var diasDif =  function(){
    var oneday = 1000 * 60 * 60 * 24;
    var futureDate = new Date(dt1.getFullYear() + anos(dt1, dt2), dt1.getMonth() + mesesDif(dt1,dt2), dt1.getDate());
    var days = Math.floor(dt2.getTime() - futureDate.getTime());
    return days = Math.floor(days/oneday);  
  }

  switch(ret){
    case 0: //diferença de datas em dias
      return diasTotal(dt1, dt2);
      break;
    case 1: //diferença de datas em meses
      return mesesTotal(dt1, dt2);
      break;
    case 2: //diferença de datas em anos
      return anos(dt1, dt2);
      break;
    case 3: //texto em extenso do tempo passado
      var dateExtens="";
      if (anos(dt1, dt2) == 0){
        dateExtens = dateExtens;   
      }else if (anos(dt1, dt2) > 1){
        dateExtens = anos(dt1, dt2) + " anos";
      }else{
        dateExtens = anos(dt1, dt2) + " ano";
      }
      if (mesesDif(dt1, dt2) == 0){
        dateExtens = dateExtens;
      }else if (mesesDif(dt1, dt2) > 1){
        dateExtens = dateExtens + ", " + mesesDif(dt1, dt2) + " meses";
      }else{
        dateExtens = dateExtens + ", " + mesesDif(dt1, dt2) + " m\u00EAs";
      }
      if (diasDif(dt1, dt2) == 0){
        dateExtens = dateExtens.replace(", "," e ");
      }else if (diasDif(dt1, dt2) > 1){
        dateExtens = dateExtens + " e " + diasDif(dt1, dt2) + " dias";
      }else{
        dateExtens = dateExtens + " e " + diasDif(dt1, dt2) + " dia";
      } 
      dateExtens = dateExtens + "." 
      return dateExtens
      break;
    case 4: //diferença de data em frações de anos (1/12) = 0,083333  
      return (anos(dt1, dt2) + mesesDif(dt1, dt2) / 12 + ((dias15 == 0) ? diasDif(dt1, dt2) * 1 / 365.25 : ((diasDif(dt1, dt2) >= 15) ? 1/12 : diasDif(dt1, dt2)* 1 / 365.25))).toFixed(4);
      break;
    case 5: //diferença de datas em meses contando 13º como mes  
      return mesesTotal13(dt1, dt2);
      break;  
    default: //diferença de data em frações de anos (1/12) = 0,083333
      return (anos(dt1, dt2) + mesesDif(dt1, dt2) / 12 + ((dias15 == 0) ? diasDif(dt1, dt2) * 1 / 365.25 : ((diasDif(dt1, dt2) >= 15) ? 1/12 : diasDif(dt1, dt2)* 1 / 365.25))).toFixed(4);  
      break;
  }
}

//Popular cotas projetadas
function projQuota(){
  vlQuota.push([DtSaldoIni, 1, valorQuota1])   
  vlQuota.push([DtSaldoIni, 2, valorQuota2])
  vlQuota.push([DtSaldoIni, 3, IndiceCrescSal])
  
  for (var i = 2; i <= 1200; i++){
    vlQuota.push([ProxMes(vlQuota[vlQuota.length - 3][0], 1), 1, vlQuota[vlQuota.length - 3][2] * (1 + ROIam1)])  
    vlQuota.push([ProxMes(vlQuota[vlQuota.length - 3][0], 1), 2, vlQuota[vlQuota.length - 3][2] * (1 + ROIam1)])
    vlQuota.push([ProxMes(vlQuota[vlQuota.length - 3][0], 1), 3, vlQuota[vlQuota.length - 3][2] * (1 + CrescSalam)])
  }     
}

//Popular cotas projetadas
function projSal(){
  vlSal.push([DtSaldoIni, Salario, URP])  
    
  for (var i = 2; i <= 1200; i++){
    vlSal.push([ProxMes(vlSal[vlSal.length - 1][0] , 1), vlSal[vlSal.length - 1][1] * (1 + CrescSalam), vlSal[vlSal.length - 1][2] * (1 + CrescURPam)])  
  }     
}

$('#meta').change(function() {
  ROIam1 = Math.pow((1 + ($('#meta').val() * 1)), (1 / 12)) - 1;
  $("#secSimulation").fadeOut(); 
});

$('#salgrow').change(function() {
  CrescSalam = Math.pow((1 + ($('#salgrow').val() * 1)), (1 / 12)) - 1;
  $("#secSimulation").fadeOut(); 
});

function AliqRegressivo(idade){
    var aliqIRReg = 0;
    
    switch (true){
      case (idade <= 2):
        aliqIRReg = 0.35;
        break;  
      case (idade > 2 && idade <= 4):
        aliqIRReg = 0.3;
        break;
      case (idade > 4 && idade <= 6):
        aliqIRReg = 0.25;      
        break;
      case (idade > 6 && idade <= 8):
        aliqIRReg = 0.2;
        break;
      case (idade > 8 && idade <= 10):
        aliqIRReg = 0.15;
        break;
      case (idade > 10):
        aliqIRReg = 0.1;
        break;
    }

  return aliqIRReg;
}

//Efeito botão para projetar benef&iacute;cio
$('#CalcBenef').on('click', function () {
  $("#secSimulation").hide();
  $('.collapse').collapse('hide');
  var target = $(this.hash);
  //if (ContDtDIB != DtSaldoDIB){    
      $("#CalcBenef").button("loading");
  
      setTimeout(function(){
        projQuota();
        MontaSaldo(objMovtoOrig.movimentacoes, DtSaldoIni, 1, 1, DireitoResgate() [1], 1);
        ProjetaSaldo();
        $("#CalcBenef").button("complete");
        setTimeout(function(){$("#CalcBenef").button("reset");},2000);
        $("#secSimulation").fadeIn();
        //movimentar suavemente para a seção de simulação
        target = target.length ? target : $('[name=' + target.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 2000);
          return false;
        }
      },75);
      setTimeout(function(){BenefCheck();},100);
  //}else{
    //movimentar suavemente para a seção de simulação
  //  target = target.length ? target : $('[name=' + target.slice(1) +']');
  //  if (target.length) {
  //    $('html,body').animate({
  //      scrollTop: target.offset().top
  //    }, 2000);
  //    return false;
  //  }  
 // }      
});

//tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})


//Ao terminar de carregar a página, chama a função "in&iacute;cio" 
$(document).ready(inicio);


