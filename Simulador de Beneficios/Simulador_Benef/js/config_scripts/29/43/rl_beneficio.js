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
  if (DtSaldoDIB >= DireitoAposent()){        
        if (SlideValSaque == 0 && $("#wdwperc").val().replace('%','') != 0){
            //Apresenta mensagem
            $('#secSaque_msg2').html('<strong>Atenção!</strong> A opção pelo saque de até 25% à vista, somente será válida quando o valor de <strong>Benefício Inicial Bruto</strong> for superior a R$'+$.formatNumber((URP * 0.5),{format: "#,##0.00", locale: "br"})+'.'); //(1 UPN)
            $('#secSaque_msg2').fadeIn();
            $('#tamBeneBox_benefIrValue').hide(); 
            $('#benefirvalue').hide();             
            $('#graSalProjeta').hide();
            $('#secEvolSaque').hide();
            $("#secBenefApos_info").hide();
            $('#amount').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));            
         } else {             
    	      $('#secSaque_msg2').hide();            
    	      $('#secEvolSaque').show();
    	      $('#secResgate').show();
            $('#tamBeneBox_benefIrValue').show(); 
            $('#benefirvalue').show(); 
            $("#secBenefApos_info").show();
         }
     }else{
    $('#secResgate').show();
   }    
}

function rl_sliderPrazo(){
   if (DtSaldoDIB >= DireitoAposent()){        
        if (SlideValSaque == 0 && $("#wdwperc").val().replace('%','') != 0){
            //Apresenta mensagem
            $('#secSaque_msg2').html('<strong>Atenção!</strong> A opção pelo saque de até 25% à vista, somente será válida quando o valor de <strong>Benefício Inicial Bruto</strong> for superior a R$'+$.formatNumber((URP * 0.5),{format: "#,##0.00", locale: "br"})+'.'); //(1 UPN)
            $('#secSaque_msg2').fadeIn();
            $('#tamBeneBox_benefIrValue').hide(); 
            $('#benefirvalue').hide();             
            $('#graSalProjeta').hide();
            $('#secEvolSaque').hide();
            $("#secBenefApos_info").hide();
            $('#amount').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));            
         } else {             
    	      $('#secSaque_msg2').hide();            
    	      $('#secEvolSaque').show();
    	      $('#secResgate').show();
            $('#tamBeneBox_benefIrValue').show(); 
            $('#benefirvalue').show(); 
            $("#secBenefApos_info").show();
         }
     }else{
    $('#secResgate').show();
   }
}

function rl_sliderRenda(){
   if (DtSaldoDIB >= DireitoAposent()){        
        if (SlideValSaque == 0 && $("#wdwperc").val().replace('%','') != 0){
            //Apresenta mensagem
            $('#secSaque_msg2').html('<strong>Atenção!</strong> A opção pelo saque de até 25% à vista, somente será válida quando o valor de <strong>Benefício Inicial Bruto</strong> for superior a R$'+$.formatNumber((URP * 0.5),{format: "#,##0.00", locale: "br"})+'.'); //(1 UPN)
            $('#secSaque_msg2').fadeIn();
            $('#tamBeneBox_benefIrValue').hide(); 
            $('#benefirvalue').hide();             
            $('#graSalProjeta').hide();
            $('#secEvolSaque').hide();
            $("#secBenefApos_info").hide();
            $('#amount').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));            
         } else {             
    	      $('#secSaque_msg2').hide();            
    	      $('#secEvolSaque').show();
    	      $('#secResgate').show();
            $('#tamBeneBox_benefIrValue').show(); 
            $('#benefirvalue').show(); 
            $("#secBenefApos_info").show();
         }
     }else{
    $('#secResgate').show();
   }
}

function validaSaque(PercSaque){

  var SP = SaldoIniT;     //Saldo Projetado - SP
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

function rl_BenefMin(typeBenef){  
   var Benefmin = 0;
   var Saldo = 0;
   var SaldoPart = 0;

   
   isBM = false;
   
   switch (typeBenef){
      case 0:   
                SaldoPart = MontaSaldoPartPatroc();
                Benefmin = CalcBenefMin();
                
                Saldo = SaldoPatrocT
                
            if (Saldo <= Benefmin) {  //Compara Benef Minimo ao Saldo do participante
                 SaldoIniTposSaque = SaldoPortabFechT + SaldoPartT + Benefmin;
                 isBM = true;
                 ctlDireito = true;        
                 $("#perc").prop("checked", true);
                 BenefCheckOpt = 0;                 
                 EvolSaldo(100);
                 //Eventos de tela
                 $("#secRendaFinanceira").show();
                 $("#secBenefApos").show();
                 isMobileApp() ?  $("#secEvolSaque").removeClass("hide") : "";
                 $("#secSaque").hide();
                 $("#tamBeneBox").hide();
                 $("#secResgate").hide();
                 $("#secRendaVitalicia").hide();
                 $("#secBenefApos_info").hide();
            } else {
                 isMobileApp() ?  $("#secEvolSaque").addClass("hide") : "";                                  
                 $("#secRendaVitalicia").show();
                 $("#secRendaFinanceira").hide();
		             $("#secSaque").show();
                 $("#tamBeneBox").show();
                 $("#secResgate").show();
                 $("#secBenefApos_info").show();
                 isBM = false;
            }        
          break;  
      case 1:/*
                 SaldoPart = MontaSaldoPartPatroc();
                 Benefmin = CalcBenefMin();
                 
                 Saldo = SaldoPart + SaldoPatrocResgT;
                
            if (Saldo < Benefmin) {  //Compara Benef Minimo ao Saldo do participante                 
                 SaldoIniTposSaque = SaldoPartT + (Benefmin * DireitoResgate()[1]);
                 isBM = true;
                 ctlDireito = false;  
                 $("#perc").prop("checked", true);
                 BenefCheckOpt = 0;
                 EvolSaldo(100);      		 
                 //Eventos de tela
                 $("#secBenefApos").show();
                 isMobileApp() ?  $("#secEvolSaque").removeClass("hide") : "";                 
                 $("#secSaque").hide();
                 $("#tamBeneBox").hide();
                 $("#secResgate").hide();		 
            } else {
                 isMobileApp() ?  $("#secEvolSaque").addClass("hide") : "";                                  
		             $("#secSaque").show();
                 $("#tamBeneBox").show();
                 $("#secResgate").show();
                 isBM = false;
            }    
          break; */  
   }
  
   return isBM;
}

function CalcBenefMin(){  
  var Benefmin = 0;  
  var TSC = DtDeslig === null  || status == 3 ? Math.min(DataDif(DtAdmissao, DtSaldoDIB, 1 , 4), 35) : Math.min(DataDif(DtAdmissao, DtDeslig, 1 , 4), 35);
  var Fator = 0; 
  var idadeSaldoDib = DtDeslig === null ? SlideValIdade : DataDif(Ncmto, DtDeslig, 0 , 4);  
  var quota = 0; 
  var dt_eleg = DtSaldoDIB; //Considera o salário no mes anterior a data base. Codigo para considerar no mes anterior ProxMes(DtSaldoDIB, -1);
  var salarioCalc = Salario;                    //Salário considerado para base de cálculo  

  for(var l in vlSal){
      if (DataDif(vlSal[l][0], dt_eleg, 0, 1) == 0){   //Encontra o salário projetado até a data da aposentadoria
          salarioCalc = vlSal[l][1];
          break;
      }
  }  

  //cálculo do benefício mínimo
  if (status == 2){

    switch(true) {
      case (idadeSaldoDib < 60):
          Fator = CalcFator().toFixed(4) * 1;
          break;
      case (idadeSaldoDib >= 60):
          Fator = 1;
          break;    
      };  
        
    Benefmin = (3 * SalarioDesligado) * (TSC / 35) * Fator;
  } else {                    
    Benefmin = (3 * salarioCalc) * (TSC / 35);
  }

  if (status == 2) { //Valorização do BM para BPD      
    if(QuotaDesligado != null){  
     for (var l in QuotaDesligado){
         var jsonObj = QuotaDesligado[l];
     
         if(jsonObj.NomePerfil == NomePerfil1){ //Quota participante 1
              quota = jsonObj.valorQuota;          
              quota = (valorQuota1 / quota).toFixed(6) * 1; 
              Benefmin = Benefmin * quota;                        
           }
        }
     }                                 
  }

 return Benefmin;
}

function CalcFator(){
    var fator = 0;
    var QtdMeses60Anos = Math.min((DtDeslig === null ? SlideValIdade : DataDif(Ncmto, DtDeslig, 0 , 4)), 60) * 12; 
    var ROIam1 = Math.pow((1 + ($('#meta').val() * 1)), (1 / 12));  //Meta atuarial ao mês do Plano - Perfil 1
    
    ROIam1 = 1 / ROIam1; //Equivalência Juros 0% a.m.

    if (ROIam1 != 0){
      QtdMeses60Anos = 720 - QtdMeses60Anos;  //720 = 60 anos    
      fator = Math.pow(ROIam1,QtdMeses60Anos);  //fator = 1 / ROIam1; //(Math.pow((1 + ROIaa1),(1/12)))
    } else {
      fator = 1;
    }

    return fator; 
}

function MontaSaldoPartPatroc(){

  var jsonObj = objMovtoProj.movimentacoes;
  var movto = 0;
  var SaldoPart = 0;
  //var SaldoPatroc = 0;
  var SaldoTotal = 0;

  var i = (jsonObj.length - 1);
  
  if(i > -1){ //Se Objeto não for nulo
    do { 
      movto = jsonObj[i];
      //Contrib Participante
      if (movto.id_conta == 1501 || movto.id_conta == 0) { //Contrib de autopatroc não devem ser somadas ao total 
        SaldoPart = SaldoPart + movto.ctr_rent;
        //console.log(movto.id_conta);
      }
      //Contrib Participante
      //if (movto.id_conta == 1204 || movto.id_conta == 1220 || ((status != 3) ? (movto.id_conta == 0) : false)) { //Contrib de autopatroc não devem ser somadas ao total 
        //SaldoPartBM = SaldoPartBM + movto.ctr_rent;
        //console.log(movto.id_conta);
      //}
      /* Contas a excluir
      1245 1246 1208 1221 1285 1286 1305 1312 
      */        
       i--;                                      
    } while(i != -1) 
  }

  SaldoTotal = 0;   

  return SaldoTotal;
}

function calcBenef(){ //Benefício de aposentadoria Case 1
  
  var Benef = 0;
  var Fator = 0;  
  var idade = $("#sliderIdade").slider("value"); // idadeSaldoDib

  //Encontra Fator correspondente a idade do participante
  for(var i in Tabua){
     var obj = Tabua[i];     

     if(obj.idade == idade){       
       if(Sexo == '01'){
         Fator = obj.fator_masc;
       } else {
         Fator = obj.fator_fem;
       }
      break;       
     }     
   }
  
  //Cálculo de Renda sem reversão
  Benef = (SaldoIniT - SaldoAdicionalT) / Fator;

  return Benef; 
}

function typeCalcBenef(typeBenef) {
  var BenefCalc = 0; 

   switch (typeBenef){
          case 0:  
                 //Regras Aposentadoria Case 1
                 BenefCalc = calcBenef();
                 if(status == 1) {
                    BenefCalc = calcBonus(BenefCalc) + BenefCalc;
                 }

          break;  
          case 1:
                //Regras Aposentadoria Case 2  
                //BenefCalc = calcBenefIdade();       
          break;   
        }
   

  return BenefCalc;  
}

function calcBonus(benefBruto){

  var benefBonus = 0;
  var dt_eleg = DtSaldoDIB; //Considera o salário no mes anterior a data base. Codigo para considerar no mes anterior ProxMes(DtSaldoDIB, -1);
  var salarioCalc = Salario;                    //Salário considerado para base de cálculo  

  for(var l in vlSal){
      if (DataDif(vlSal[l][0], dt_eleg, 0, 1) == 0){   //Encontra o salário projetado até a data da aposentadoria
          salarioCalc = vlSal[l][1];
          break;
      }
  }  

  benefBonus =   Math.max(((0.4 * salarioCalc) - (TetoINSS + benefBruto)), 0);  

  return benefBonus;
}

function CalcDescontoFolha(benefBruto){

  var DescontoContrib = 0;
  var benefTributavel = benefBruto;
  var impressaoFolha = "";
  var conteudoFolha = "";
  var BenefCalc = 0;
  var BenefCalcBonus = 0;

  //Desconto de contribuição
  BenefCalc = calcBenef();
  BenefCalcBonus = calcBonus(BenefCalc);   

  //Impressões
  if(isMobileApp()){
  //Conteúdo fixo da index.html
  impressaoFolha = '<div class="col-xs-0 col-sm-2 col-md-2"></div><div class="col-xs-12 col-sm-9 col-md-9 text-left"><div class="col-xs-0 col-sm-0 col-md-1"></div><div class="col-xs-12 col-sm-6 col-md-5 padding-right-none"><label for="vitalprov" style="margin-right: 5px;"><span id="secVitalicio_Provento">(+) Provento: </span></label><!--</div><div class="col-xs-12 col-sm-5 col-md-5">--><input type="text" id="vitalprov" class="valReceita" readonly=""></div><div class="col-xs-0 col-sm-1 col-md-1"></div></div><div class="col-xs-0 col-sm-1 col-md-1"></div>';
  
    if(status == 1) {
      //Conteúdo adicional para simulação de folha de pagamento
      impressaoFolha = impressaoFolha + '<div class="col-xs-0 col-sm-2 col-md-2"></div><div class="col-xs-12 col-sm-9 col-md-9 text-left"><div class="col-xs-0 col-sm-0 col-md-1"></div><div class="col-xs-12 col-sm-6 col-md-5 padding-right-none"><label for="descContribPPC" style="margin-right: 5px;">(+) Bônus: </label><!--</div><div class="col-xs-12 col-sm-5 col-md-5">--><input type="text" id="benefBonus" class="valReceita" value="R$ ' + $.formatNumber((BenefCalcBonus.toFixed(2) * 1) , {format:"#,##0.00", locale:"br"}) +'" readonly=""></div><div class="col-xs-0 col-sm-1 col-md-1"></div></div><div class="col-xs-0 col-sm-1 col-md-1"></div>';
    }

  } else {

  //Conteúdo fixo da index.html
  impressaoFolha = '<div class="col-xs-0 col-sm-2 col-md-2"></div><div class="col-xs-12 col-sm-9 col-md-9 text-left"><div class="col-xs-0 col-sm-0 col-md-1"></div><div class="col-xs-12 col-sm-6 col-md-5 padding-right-none"><label for="vitalprov"><span id="secVitalicio_Provento">(+) Provento:</span></label></div><div class="col-xs-12 col-sm-5 col-md-5"><input type="text" id="vitalprov" class="valReceita" readonly=""></div><div class="col-xs-0 col-sm-1 col-md-1"></div></div><div class="col-xs-0 col-sm-1 col-md-1"></div>';

    if(status == 1) {
      //Conteúdo adicional para simulação de folha de pagamento
      impressaoFolha = impressaoFolha + '<div class="col-xs-0 col-sm-2 col-md-2"></div><div class="col-xs-12 col-sm-9 col-md-9 text-left"><div class="col-xs-0 col-sm-0 col-md-1"></div><div class="col-xs-12 col-sm-6 col-md-5 padding-right-none"><label for="descContribPPC">(+) Bônus:</label></div><div class="col-xs-12 col-sm-5 col-md-5"><input type="text" id="benefBonus" class="valReceita" value="R$ ' + $.formatNumber((BenefCalcBonus.toFixed(2) * 1) , {format:"#,##0.00", locale:"br"}) +'" readonly=""></div><div class="col-xs-0 col-sm-1 col-md-1"></div></div><div class="col-xs-0 col-sm-1 col-md-1"></div>';
    }
  }
    
  $("#secVitalicio_divProvento").html(impressaoFolha);
  $("#vitalprov").val("R$ " + $.formatNumber((BenefCalc.toFixed(2) * 1) , {format:"#,##0.00", locale:"br"}));

  return benefTributavel;
}
