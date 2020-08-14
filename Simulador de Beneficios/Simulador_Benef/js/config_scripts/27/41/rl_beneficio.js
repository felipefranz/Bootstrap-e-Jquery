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
            $('#secBenefApos_info').hide();
            $('#amount').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));            
         } else {             
    	      $('#secSaque_msg2').hide();            
    	      $('#secEvolSaque').show();
    	      $('#secResgate').show();
            $('#tamBeneBox_benefIrValue').show(); 
            $('#benefirvalue').show(); 
            $('#secBenefApos_info').show();
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
            $('#secBenefApos_info').hide();
            $('#amount').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));            
         } else {             
    	      $('#secSaque_msg2').hide();            
    	      $('#secEvolSaque').show();
    	      $('#secResgate').show();
            $('#tamBeneBox_benefIrValue').show(); 
            $('#benefirvalue').show(); 
            $('#secBenefApos_info').show();
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
            $('#secBenefApos_info').hide();
            $('#amount').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));            
         } else {             
    	      $('#secSaque_msg2').hide();            
    	      $('#secEvolSaque').show();
    	      $('#secResgate').show();
            $('#tamBeneBox_benefIrValue').show(); 
            $('#benefirvalue').show(); 
            $('#secBenefApos_info').show();
         }
     }else{
    $('#secResgate').show();
   }
}

function validaRendaCerta(){

  var _valRenda = ValRenda; //valor de renda salvo

  //imprime mensagem de limite de beneficio
  $('#textPmtVlRenda').html(`<p id="textPmtVlRenda" style="margin: 5px 0 0px;font-size: 11px;"><b>O valor deve estar dentro do limite de R$${$.formatNumber((SaldoIniTposSaque * (MinRenda/100)), {format: "#,##0.00", locale: "br"})} até R$${$.formatNumber((SaldoIniTposSaque * (MaxRenda/100)), {format: "#,##0.00", locale: "br"})}.</b></p>`);      

  //Arredondamento de percentual máximo se valor de beneficio for igual ao valor de benefício máximo
  if ((SaldoIniTposSaque * percRendaCerta).toFixed(2) * 1 == (SaldoIniTposSaque * (MaxRenda/100)).toFixed(2) * 1){
    percRendaCerta = (MaxRenda/100);
  }

  //valida se valor escolhido respeita o limite de opção do participante
  if (percRendaCerta < (MinRenda/100) || percRendaCerta > (MaxRenda/100)){
    _valRenda = 0;
    percRendaCerta = 0;
    $('#secTamBeneBox_msg1').html('<strong>Atenção!</strong> Valor escolhido fora do limite de opção, digite um novo valor.');  
    $('#secTamBeneBox_msg1').fadeIn();
    $('#pmtVlRenda').select(); 
    setTimeout(function(){$('#secTamBeneBox_msg1').fadeOut();}, 6000);   
  } else {
    _valRenda = percRendaCerta;
  }

  return _valRenda;
}

function validaSaque(PercSaque){

  var SP = SaldoIniT;     //Saldo Projetado - SP
  var PS = PercSaque;  //Percentual de Saque - PS
  
  if ($("#perc").is(":checked")) { //Percentual - P                
       (SP - (SP * PS)) * (ValPerc/100) <= (URP * 0.5) ? PS = 0 : PS = PS;
            
  }  else if ($("#prazo").is(":checked")){ //Prazo Certo - PC            
       (SP - (SP * PS)) / (ValPrazo * Nper) <= (URP * 0.5) ? PS = 0 : PS = PS;   
                    
  }  else { //Renda Certa - RC                        
       (SP - (SP * PS)) * ValRenda <= (URP * 0.5) ? PS = 0 : PS = PS;                    
  } 
  
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
                
                Saldo = SaldoPart + SaldoPatrocT
                
            if (Saldo < Benefmin) {  //Compara Benef Minimo ao Saldo do participante
                 SaldoIniTposSaque = SaldoPortabFechT + SaldoPartT + Benefmin;
                 isBM = true;
                 ctlDireito = true;        
                 $("#perc").prop("checked", true);
                 BenefCheckOpt = 0;                 
                 EvolSaldo(100);
                 //Eventos de tela
                 $("#secBenefApos").show();
                 isMobileApp() ?  $("#secEvolSaque").removeClass("hide") : "";
                 $("#secSaque").hide();
                 $("#tamBeneBox").hide();
                 $("#secResgate").hide();
                 $('#secBenefApos_info').hide();
                 $('#secHipotBenef').hide();	 
                 $('#SelecionaBeneficio').prop("selectedIndex", 0);	 
                 $("#secRendaVitalicia").hide();
                 $("#secRendaFinanceira").show();
            } else {
                 isMobileApp() ?  $("#secEvolSaque").addClass("hide") : "";                                  
                 //$("#secRendaVitalicia").show();
		             $("#secSaque").show();
                 $("#tamBeneBox").show();
                 $("#secResgate").show();
                 $('#secBenefApos_info').show();
                 $('#secHipotBenef').show();	 
                 isBM = false;
            }        
          break;  
      case 1:
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
                 $('#secBenefApos_info').hide();	 
                 $('#secHipotBenef').hide();	 
                 $('#SelecionaBeneficio').prop("selectedIndex", 0);                 
                 $("#secRendaVitalicia").hide();
                 $("#secRendaFinanceira").show();
            } else {
                 isMobileApp() ?  $("#secEvolSaque").addClass("hide") : "";                                  
		             $("#secSaque").show();
                 $("#tamBeneBox").show();
                 $("#secResgate").show();
                 $('#secBenefApos_info').show();
                 $('#secHipotBenef').show();	 
                 isBM = false;                 
            }    
          break;   
   }
   return isBM;
}

function CalcBenefMin(){  
  var Benefmin = 0;  
  var TSC = DtDeslig === null ? Math.min(DataDif(DtAdmissao, DtSaldoDIB, 1 , 4), 30) : (DtSaldoDIB >= DireitoAposent()) ? Math.min(DataDif(DtAdmissao, DtDeslig, 1 , 4), 30) : Math.min(DataDif(DtAdmissao, DtSaldoDIB, 1 , 4), 30);
  var Fator = 0; 
  var idadeSaldoDib = DtDeslig === null ? SlideValIdade : (DtSaldoDIB >= DireitoAposent()) ? DataDif(Ncmto, DtDeslig, 0, 2) : SlideValIdade;
  //var TSC = DtDeslig === null ? Math.min(DataDif(DtAdmissao, DtSaldoDIB, 1 , 4), 30) : Math.min(DataDif(DtAdmissao, DtDeslig, 1 , 4), 30);
  //var idadeSaldoDib = SlideValIdade; 

  //cálculo do benefício mínimo
  if (status == 2) { //Apenas para BPD

    switch(true) {   //Calc Fator Benef Proporcional
      case (idadeSaldoDib < 65):
          Fator = CalcFator().toFixed(4) * 1;
          break;
      case (idadeSaldoDib >= 65):
          Fator = 1;
          break;    
      };
    
    Benefmin = (3 * Salario) * (TSC / 30) * Fator;

  } else {
      if (!(DtSaldoDIB >= DireitoAposent())){ //Resgate
        Fator = CalcFator().toFixed(4) * 1;
        Benefmin = (3 * Salario) * (TSC / 30) * Fator;
      } else {  //Elegível
        Benefmin = (3 * Salario) * (TSC / 30);
      }
  }

 return Benefmin;
}

function CalcFator(){
    var fator = 0;
    var idadeSaldoDib = DtDeslig === null ? DataDif(Ncmto, DtSaldoDIB, 0, 4) : (DtSaldoDIB >= DireitoAposent()) ? DataDif(Ncmto, DtDeslig, 0, 4) : DataDif(Ncmto, DtSaldoDIB, 0, 4);
    var QtdMeses65Anos = Math.min(idadeSaldoDib, 65) * 12;     
    var TSC = DtDeslig === null ? Math.min(DataDif(DtAdmissao, DtSaldoDIB, 1 , 4), 30) : (DtSaldoDIB >= DireitoAposent()) ? Math.min(DataDif(DtAdmissao, DtDeslig, 1 , 4), 30) : Math.min(DataDif(DtAdmissao, DtSaldoDIB, 1 , 4), 30);
    var QtdMeses5TSC = Math.min(TSC, 5) * 12; 
    var ROIam1 = Math.pow((1 + ($('#meta').val() * 1)), (1 / 12));  //Meta atuarial ao mês do Plano - Perfil 1
    //var TSC = DtDeslig === null ? Math.min(DataDif(DtAdmissao, DtSaldoDIB, 1 , 4), 30) : Math.min(DataDif(DtAdmissao, DtDeslig, 1 , 4), 30);
    
    ROIam1 = 1 / ROIam1; //Equivalência Juros 0% a.m.

    if (ROIam1 != 0){
      QtdMeses65Anos = 780 - QtdMeses65Anos;  //780 = 65 anos    
      QtdMeses5TSC = 60 - QtdMeses5TSC  //60 = 5 anos
      fator = QtdMeses65Anos < QtdMeses5TSC ? Math.pow(ROIam1,QtdMeses5TSC) : Math.pow(ROIam1,QtdMeses65Anos);  //fator = 1 / ROIam1; //(Math.pow((1 + ROIaa1),(1/12)))
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
        
  do { 
    movto = jsonObj[i];
    //Contrib Participante
    if (movto.id_conta == 1202 || ((status != 3) ? (movto.id_conta == 0) : false)) { //Contrib de autopatroc não devem ser somadas ao total 
      SaldoPart = SaldoPart + movto.ctr_rent;
      console.log(movto.id_conta);
    } 
    //Contrib Patroc
    /*
    if (conta_resp = 1 || id_conta = 3) {
      SaldoPatroc = SaldoPatroc + movto.ctr_rent;
    }
    */
     i--;                                      
  } while(i != -1) 

  SaldoTotal = SaldoPart.toFixed(2) * 1;

  return SaldoTotal;
}

function calcBenef(){ //Benefício de aposentadoria Case 1
  
  var Benef = 0;
  var Fator = 0;  
  var idade = $("#sliderIdade").slider("value") >= 70 ? 70 : $("#sliderIdade").slider("value"); // idadeSaldoDib apos 70 o fator é o mesmo para idade superiores (Homologado em 16.11.17)

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
          break;  
          case 1:
                //Regras Aposentadoria Case 2  
                //BenefCalc = calcBenefIdade();       
          break;   
        }
   

  return BenefCalc;  
}

function CalcDescontoFolha(benefBruto){

  var benefTributavel = benefBruto;

  return benefTributavel;
}


