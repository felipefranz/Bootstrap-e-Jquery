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
            $('#secSaque_msg2').html('<strong>Aten„„o!</strong> A op„„o pelo saque de at„ 25% „ vista, somente ser„ v„lida quando o valor de <strong>Benef„cio Inicial Bruto</strong> for superior a R$'+$.formatNumber((URP * 2),{format: "#,##0.00", locale: "br"})+'.'); //(2 UP)
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
            $('#secSaque_msg2').html('<strong>Aten„„o!</strong> A op„„o pelo saque de at„ 25% „ vista, somente ser„ v„lida quando o valor de <strong>Benef„cio Inicial Bruto</strong> for superior a R$'+$.formatNumber((URP * 2),{format: "#,##0.00", locale: "br"})+'.'); //(1 UP)
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
       (SP - (SP * PS)) <= (URP * 2) ? PS = 0 : PS = PS;
            
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
   
   switch (typeBenef){
      case 0:   
                //SaldoPart = MontaSaldoPart();
                try { 
                      Benefmin =  this.CalcBenefMin();
                    } catch (e) {
                        if (e instanceof TypeError) {
                            printError(e, true);
                        } else {
                            printError(e, false);
                        }
                    }
                
                Saldo = SaldoPatrocT
                
            if (Saldo < Benefmin) {  //Compara Benef Minimo ao Saldo da patrocinadora
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
                 $("#secBenefApos_info").hide();
            } else {
                 isMobileApp() ?  $("#secEvolSaque").addClass("hide") : "";                                  
                 $("#secSaque").show();
                 $("#tamBeneBox").show();
                 $("#secResgate").show();
                 $("#secBenefApos_info").show();
                 isBM = false;
            }       
          break;  
      case 1:  
              isMobileApp() ?  $("#secEvolSaque").addClass("hide") : "";                                  
              $("#secSaque").show();
              $("#tamBeneBox").show();
              $("#secResgate").show();
              $("#secBenefApos_info").show();
              isBM = false;
          break;
             /*
                 SaldoPart = MontaSaldoPart();
                 try { 
                        Benefmin =  this.CalcBenefMin();
                      } catch (e) {
                          if (e instanceof TypeError) {
                              printError(e, true);
                          } else {
                              printError(e, false);
                          }
                      }
                 
                 Saldo = SaldoPatrocResgT;
                
            if (Saldo < Benefmin) {  //Compara Benef Minimo ao Saldo do participante                 
                 SaldoIniTposSaque = SaldoPartT + Benefmin;
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
                 $("#secBenefApos_info").hide();	 
            } else {
                 isMobileApp() ?  $("#secEvolSaque").addClass("hide") : "";                                  
		             $("#secSaque").show();
                 $("#tamBeneBox").show();
                 $("#secResgate").show();
                 $("#secBenefApos_info").show();
                 isBM = false;
            }    
          break;   
          */
   }
   return isBM;
}

function CalcBenefMin(){ 
  var TSC = DtDeslig === null ? Math.max(Math.min(DataDif(DtAdmissao, DtSaldoDIB, 0 , 4), 30),0) : Math.max(Math.min(DataDif(DtAdmissao, DtDeslig, 0 , 4), 30),0);  
  var Benefmin = 0;    
  var Fator = 0; 
  //var DtLimitAdesaoBM = DtLimitAdesao;
  //var DtLimiteTSC = new Date("03/17/2005");         //Data limite para contagem de tempo
  //var DtElegNormal = dataElegNormal(); //Data de elegibilidade a Aposentadoria normal
  //var idadeSaldoDib = $("#sliderIdade").slider("value") >= 55 ? 55 : $("#sliderIdade").slider("value"); // idadeSaldoDib apos 62 o fator „ o mesmo para idade superiores
  //var Salario_1 = (status == 3 || status == 2) ? (Salario1_BM != 0 ? Salario1_BM : SalarioDesligado) : (Salario1_BM != 0 ? Salario1_BM : Salario);    

  //c„lculo do benef„cio m„nimo
  if (status == 2) { //Apenas para BPD, parametrizado mas n„o sera utilizado
    /* -- Isto n„o foi parametrizado      
    //Encontra Fator correspondente a idade do participante, parametrizado mas n„o sera utilizado
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
   */
   /* -- Isto n„o foi parametrizado      
    switch(true) {   //Calc Fator Benef Proporcional
      case (idadeSaldoDib < 60):
          Fator = CalcFator().toFixed(4) * 1;
          break;
      case (idadeSaldoDib >= 60):
          Fator = 1;
          break;    
      };
    */

     //Benefmin = ((Salario_1 * 3) * (TSC_1 / 30.0) + (3 * Salario_2) * (TSCLimitado_2 / 30)) * ((TSCatual / TSCtotal) * Fator);       
    
  } else {
    
    Benefmin = ((Salario * 3) * (TSC / 30.0));  

  }

 return Benefmin;
}

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
      if (movto.id_conta == 1202 || ((status != 3) ? (movto.id_conta == 0) : false)) { //Contrib de autopatroc n„o devem ser somadas ao total 
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

function calcBenef(){ //Benef„cio de aposentadoria Case 1
  /*
  var Benef = 0;
  var Fator = 0;  
  var idade = $("#sliderIdade").slider("value") >= 70 ? 70 : $("#sliderIdade").slider("value"); // idadeSaldoDib apos 70 o fator „ o mesmo para idade superiores (Homologado em 16.11.17)

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
  
  //C„lculo de Renda sem revers„o
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

/* -- Isto n„o foi parametrizado 
function CalcDescontoFolha(benefBruto){
  
  var benefTributavel = benefBruto;
  return benefTributavel;
  
}
*/

/* -- Isto n„o foi parametrizado 
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
*/

/* -- Isto n„o foi parametrizado 
function CalcFator(){
    var fator = 0;
    var idadeSaldoDib = DtDeslig === null ? DataDif(Ncmto, DtSaldoDIB, 0, 4) : (DtSaldoDIB >= DireitoAposent()) ? DataDif(Ncmto, DtDeslig, 0, 4) : DataDif(Ncmto, DtSaldoDIB, 0, 4);
    var QtdMeses60Anos = Math.min(idadeSaldoDib, 60) * 12;     
    var TSC = DtDeslig === null ? Math.min(DataDif(DtAdmissao, DtSaldoDIB, 1 , 4), 30) : (DtSaldoDIB >= DireitoAposent()) ? Math.min(DataDif(DtAdmissao, DtDeslig, 1 , 4), 30) : Math.min(DataDif(DtAdmissao, DtSaldoDIB, 1 , 4), 30);
    var QtdMeses5TSC = Math.min(TSC, 5) * 12; 
    var ROIam1 = Math.pow((1 + ($('#meta').val() * 1)), (1 / 12));  //Meta atuarial ao m„s do Plano - Perfil 1
    //var TSC = DtDeslig === null ? Math.min(DataDif(DtAdmissao, DtSaldoDIB, 1 , 4), 30) : Math.min(DataDif(DtAdmissao, DtDeslig, 1 , 4), 30);
    
    ROIam1 = 1 / ROIam1; //Equival„ncia Juros 0% a.m.

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

