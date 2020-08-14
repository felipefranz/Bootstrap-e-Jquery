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
    /*
  if (DtSaldoDIB >= DireitoAposent()){        
        if (SlideValSaque == 0 && $("#wdwperc").val().replace('%','') != 0){
            //Apresenta mensagem
            $('#secSaque_msg2').html('<strong>Atenção!</strong> A opção pelo saque de até 25% à vista, somente será válida quando o valor de <strong>Benefício Inicial Bruto</strong> for superior a R$'+$.formatNumber((URP * 2),{format: "#,##0.00", locale: "br"})+'.'); //(2 UP)
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
            (MinBenListener == 1 || SaldoMinListener == 1) ? $('#secBenefApos_info').show() : "";
         }
     }else{
    $('#secResgate').show();
   }   
    */   
}

function rl_sliderPrazo(){
     /*
   if (DtSaldoDIB >= DireitoAposent()){        
        if (SlideValSaque == 0 && $("#wdwperc").val().replace('%','') != 0){
            //Apresenta mensagem
            $('#secSaque_msg2').html('<strong>Atenção!</strong> A opção pelo saque de até 25% à vista, somente será válida quando o valor de <strong>Benefício Inicial Bruto</strong> for superior a R$'+$.formatNumber((URP * 2),{format: "#,##0.00", locale: "br"})+'.'); //(1 UP)
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
            (MinBenListener == 1 || SaldoMinListener == 1) ? $('#secBenefApos_info').show() : "";
         }
     }else{
    $('#secResgate').show();
   }
  */
}

function rl_sliderRenda(){
}

function validaSaque(PercSaque){

  var SP = SaldoIniT;     //Saldo Projetado - SP
  var PS = PercSaque;  //Percentual de Saque - PS
    /*
  if ($("#perc").is(":checked")) { //Percentual - P                
       (SP - (SP * PS)) * (ValPerc/100) <= (URP * 2) ? PS = 0 : PS = PS;
            
  }  else if ($("#prazo").is(":checked")){ //Prazo Certo - PC            
       (SP - (SP * PS)) / (ValPrazo * Nper) <= (URP * 2) ? PS = 0 : PS = PS;   
                    
  }  else { //Renda Certa - RC                        
      // (SP - (SP * PS)) * ValRenda <= (URP * 0.5) ? PS = 0 : PS = PS;                    
  } 
    */
  return PS;  
}

function rl_BenefMin(typeBenef){  
   var Benefmin = 0;
   var Saldo = 0;
   var SaldoPart = 0;

   isBM = false;
   
   if(ElegBM){ //Flag que valida se participante tem direito a verificação de saldo BM
          switch (typeBenef){
              case 0:   
                        SaldoPart = MontaSaldoPartPatroc();
                        Benefmin = CalcBenefMin();
                        
                        Saldo = SaldoPart + SaldoPatrocT
                        
                    if (Saldo == 0 && Saldo < Benefmin) {  //Compara Benef Minimo ao Saldo do participante
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
                        //$('#secHipotBenef').hide();	 
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
                        //$('#secHipotBenef').show();	 
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
                        //$('#secHipotBenef').hide();	 
                        $('#SelecionaBeneficio').prop("selectedIndex", 0);                 
                        $("#secRendaVitalicia").hide();
                        $("#secRendaFinanceira").show();
                    } else {
                        isMobileApp() ?  $("#secEvolSaque").addClass("hide") : "";                                  
                        $("#secSaque").show();
                        $("#tamBeneBox").show();
                        $("#secResgate").show();
                        $('#secBenefApos_info').show();
                        //$('#secHipotBenef').show();	 
                        isBM = false;                 
                    }    
                  break;   
          }    
    }

   return isBM;
}

function CalcBenefMin(){ 
  var DtLimitAdesaoBM = DtLimitAdesao;
  var DtLimiteTSC = new Date("03/17/2005");         //Data limite para contagem de tempo
  var DtElegNormal = dataElegNormal(); //Data de elegibilidade a Aposentadoria normal
  var idadeSaldoDib = $("#sliderIdade").slider("value") >= 62 ? 62 : $("#sliderIdade").slider("value"); // idadeSaldoDib apos 62 o fator é o mesmo para idade superiores
  var Salario_1 = (status == 3 || status == 2) ? (Salario1_BM != 0 ? Salario1_BM : SalarioDesligado) : (Salario1_BM != 0 ? Salario1_BM : Salario);  
  var Salario_2 = (status == 3 || status == 2) ? Math.min(SalarioDesligado,(20 * URP)) : Math.min(Salario,(20 * URP));
  var TSC_1 = Math.max(Math.min(DataDif(DtAdmissao, DtLimiteTSC, 1 , 4), 30),0);
  var TSC_2 = Math.max(Math.min(TSC_1 <= 0 ? DataDif(DtAdmissao, DtElegNormal, 1 , 4) : DataDif(DtLimiteTSC, DtElegNormal, 1 , 4), 30), 0);
  var TSCLimitado_2 = (TSC_2 + TSC_1) > 30 ? 30 - TSC_1 : TSC_2; 
  var TSCatual = DtDeslig === null ? Math.max(Math.min(DataDif(DtAdmissao, DtSaldoDIB, 1 , 4), 30),0) : (DtSaldoDIB >= DireitoAposent()) ? Math.max(Math.min(DataDif(DtAdmissao, DtDeslig, 1 , 4), 30), 0) : Math.max(Math.min(DataDif(DtAdmissao, DtSaldoDIB, 1 , 4), 30),0); //Pendente validar
  var TSCtotal = Math.max(Math.min(DataDif(DtAdmissao, DtElegNormal, 1 , 4), 30), 0) ; // Tempo de serviço creditado futuro contado até a data de elegibilidade normal
  var Benefmin = 0;    
  var Fator = 0; 

  //cálculo do benefício mínimo
  if (status == 2) { //Apenas para BPD, parametrizado mas não sera utilizado

    //Encontra Fator correspondente a idade do participante, parametrizado mas não sera utilizado
    for(var i in TabuaBmBpd){
      var obj = TabuaBmBpd[i];     

      if(obj.idade == idadeSaldoDib){       
        if(Sexo == '01'){
          Fator = obj.fator_masc;
        } else {
          Fator = obj.fator_fem;
        }
        break;       
      }     
    }

   /* -- Isto não foi parametrizado      
    switch(true) {   //Calc Fator Benef Proporcional
      case (idadeSaldoDib < 60):
          Fator = CalcFator().toFixed(4) * 1;
          break;
      case (idadeSaldoDib >= 60):
          Fator = 1;
          break;    
      };
    */

    /*
     Benefmin = ((Salario_1 * 3) * (TSC_1 / 30.0) + (3 * Salario_2) * (TSCLimitado_2 / 30)) * ((TSCatual / TSCtotal) * Fator);       
     console.log('Salario_1: ' + Salario_1);
     console.log('TSC_1: ' + TSC_1);
     console.log('Salario_2: ' + Salario_2);
     console.log('TSCLimitado_2: ' + TSCLimitado_2);
     console.log('TSCatual: ' + TSCatual);
     console.log('TSCtotal: ' + TSCtotal);
     console.log('Fator: ' +Fator);
    */ 
    
  } else {
    
    Benefmin = ((Salario_1 * 3) * (TSC_1 / 30.0)) + ((3 * Salario_2) * (TSCLimitado_2 / 30));  

  }

 return Benefmin;
}

function dataElegNormal() {
  
  if (status != 6 && status != 7){
    for (var i = 0; i <= 527; i++){
      if ((DataDif(DtAdesao, ProxMes(DtSaldoDIB, i), 1 , 1) >= 24 && DataDif(DtAdmissao, ProxMes(DtSaldoDIB, i), 1 , 1) >= 60 && DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), ProxMes(DtSaldoDIB, i), 1 , 2) >= 62)){
          
          return ProxMes(DtSaldoDIB, i);
          break;
      }
    }
  }else{
    return ProxAno(DtSaldoDIB, 1000);  
  }

}

/* -- Isto não foi parametrizado 
function CalcFator(){
    var fator = 0;
    var idadeSaldoDib = DtDeslig === null ? DataDif(Ncmto, DtSaldoDIB, 0, 4) : (DtSaldoDIB >= DireitoAposent()) ? DataDif(Ncmto, DtDeslig, 0, 4) : DataDif(Ncmto, DtSaldoDIB, 0, 4);
    var QtdMeses60Anos = Math.min(idadeSaldoDib, 60) * 12;     
    var TSC = DtDeslig === null ? Math.min(DataDif(DtAdmissao, DtSaldoDIB, 1 , 4), 30) : (DtSaldoDIB >= DireitoAposent()) ? Math.min(DataDif(DtAdmissao, DtDeslig, 1 , 4), 30) : Math.min(DataDif(DtAdmissao, DtSaldoDIB, 1 , 4), 30);
    var QtdMeses5TSC = Math.min(TSC, 5) * 12; 
    var ROIam1 = Math.pow((1 + ($('#meta').val() * 1)), (1 / 12));  //Meta atuarial ao mês do Plano - Perfil 1
    //var TSC = DtDeslig === null ? Math.min(DataDif(DtAdmissao, DtSaldoDIB, 1 , 4), 30) : Math.min(DataDif(DtAdmissao, DtDeslig, 1 , 4), 30);
    
    ROIam1 = 1 / ROIam1; //Equivalência Juros 0% a.m.

    if (ROIam1 != 0){
      QtdMeses60Anos = 720 - QtdMeses60Anos;  //720 = 60 anos    
      QtdMeses5TSC = 60 - QtdMeses5TSC  //60 = 5 anos
      fator = QtdMeses60Anos < QtdMeses5TSC ? Math.pow(ROIam1,QtdMeses5TSC) : Math.pow(ROIam1,QtdMeses60Anos);  //fator = 1 / ROIam1; //(Math.pow((1 + ROIaa1),(1/12)))
    } else {
      fator = 1;
    }

    return fator; 
}
*/

function MontaSaldoPartPatroc(){

  var jsonObj = objMovtoProj.movimentacoes;
  var movto = 0;
  var SaldoPart = 0;
  //var SaldoPatroc = 0;
  var SaldoTotal = 0;

  SaldoPart = SaldoIniT; //Olha se tem algum saldo de direito

  /*
    var i = (jsonObj.length - 1);
          
    do { 
      movto = jsonObj[i];
      //Contrib Participante
      if (movto.id_conta == 1202 || ((status != 3) ? (movto.id_conta == 0) : false)) { //Contrib de autopatroc não devem ser somadas ao total 
        SaldoPart = SaldoPart + movto.ctr_rent;
        //console.log(movto.id_conta);
      } 
      //Contrib Patroc
      
      //if (conta_resp = 1 || id_conta = 3) {
        //SaldoPatroc = SaldoPatroc + movto.ctr_rent;
      //}
      
      i--;                                      
    } while(i != -1) 
  */

  SaldoTotal = SaldoPart.toFixed(2) * 1;

  return SaldoTotal;
}

function calcBenef(){ //Benefício de aposentadoria Case 1
  /*
  var Benef = 0;
  var Fator = 0;  
  var idade = $("#sliderIdade").slider("value") >= 70 ? 70 : $("#sliderIdade").slider("value"); // idadeSaldoDib apos 70 o fator é o mesmo para idade superiores (Homologado em 16.11.17)

  //Encontra Fator correspondente a idade do participante
  for(var i in TabuaBmBpd){
     var obj = TabuaBmBpd[i];     

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
  */
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


