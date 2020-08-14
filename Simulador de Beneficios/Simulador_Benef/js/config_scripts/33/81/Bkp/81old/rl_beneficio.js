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
            $('#secSaque_msg2').html('<strong>Atenção!</strong> A opção pelo saque de até 25% à vista, somente será válida quando o valor de <strong>Benefício Inicial Bruto</strong> for superior a R$'+$.formatNumber((URP * 2),{format: "#,##0.00", locale: "br"})+'.'); //(1 UPN)
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
          /*if(SlideValSaque > 0) {
              $('#tamBeneBox_benefIrValue').html('IR Benefício + IR Saque:'); 
            } else {
              $('#tamBeneBox_benefIrValue').html('IR Benefício:'); 
            } */              
         }
     }else{
    $('#secResgate').show();
   }    
}

function rl_sliderPrazo(){
   if (DtSaldoDIB >= DireitoAposent()){        
        if (SlideValSaque == 0 && $("#wdwperc").val().replace('%','') != 0){
            //Apresenta mensagem
            $('#secSaque_msg2').html('<strong>Atenção!</strong> A opção pelo saque de até 25% à vista, somente será válida quando o valor de <strong>Benefício Inicial Bruto</strong> for superior a R$'+$.formatNumber((URP * 2),{format: "#,##0.00", locale: "br"})+'.'); //(1 UPN)
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
          /*if(SlideValSaque > 0) {
              $('#tamBeneBox_benefIrValue').html('IR Benefício + IR Saque:'); 
            } else {
              $('#tamBeneBox_benefIrValue').html('IR Benefício:'); 
            } */
         }
     }else{
    $('#secResgate').show();
   }
}

function rl_sliderRenda(){
   if (DtSaldoDIB >= DireitoAposent()){        
        if (SlideValSaque == 0 && $("#wdwperc").val().replace('%','') != 0){
            //Apresenta mensagem
            $('#secSaque_msg2').html('<strong>Atenção!</strong> A opção pelo saque de até 25% à vista, somente será válida quando o valor de <strong>Benefício Inicial Bruto</strong> for superior a R$'+$.formatNumber((URP * 2),{format: "#,##0.00", locale: "br"})+'.'); //(1 UPN)
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
          /*if(SlideValSaque > 0) {
              $('#tamBeneBox_benefIrValue').html('IR Benefício + IR Saque:'); 
            } else {
              $('#tamBeneBox_benefIrValue').html('IR Benefício:'); 
            } */
         }
     }else{
    $('#secResgate').show();
   }
}

function validaSaque(PercSaque){

  var SP = SaldoIniT;     //Saldo Projetado - SP
  var PS = PercSaque;  //Percentual de Saque - PS
  
  if ($("#perc").is(":checked")) { //Percentual - P                
       (SP - (SP * PS)) * (ValPerc/100) <= (URP * 2) ? PS = 0 : PS = PS;
            
  }  else if ($("#prazo").is(":checked")){ //Prazo Certo - PC            
       (SP - (SP * PS)) / (ValPrazo * Nper) <= (URP * 2) ? PS = 0 : PS = PS;   
                    
  }  else { //Renda Certa - RC                        
       (SP - (SP * PS)) * ValRenda <= (URP * 2) ? PS = 0 : PS = PS;                    
  } 
  
  return PS;  
}

function CalcBenefMin(){    
  var Benefmin = 0;  
  var TVP = (DtDeslig === null || status == 3) ? Math.min(DataDif(DtAdesao, DtSaldoDIB, 1 , 4), 30) : Math.min(DataDif(DtAdesao, DtDeslig, 1 , 4), 30);
  var Fator = 0; 
  var idadeSaldoDib = SlideValIdade;
  var quota = 0; 
  var jsonObj;

  //Cálculo do benefício mínimo
  if (!(DtSaldoDIB >= DireitoAposent())){ //Resgate
    Fator = CalcFator().toFixed(4) * 1;
    /*                                                                                                             
    if (TVP < 3 || Contribuinte == 1) { //Condições para não recebimento do BenefMin
        Fator = 0;
      }                
    */
    Benefmin = (3 * Salario) * (TVP / 30) * Fator;     
  } else { //Aposentadoria                   
    Benefmin = (3 * Salario) * (TVP / 30);
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

function rl_BenefMin(typeBenef){    //pendente
   var Benefmin = 0;
   var Saldo = 0;
   var SaldoPart = 0;

   isBM = false;
   
   switch (typeBenef){
      case 0:   
                SaldoPart = MontaSaldoPart();
                //try { 
                      Benefmin =  this.CalcBenefMin();
                /*    } catch (e) {
                        if (e instanceof TypeError) {
                            printError(e, true);
                        } else {
                            printError(e, false);
                        }
                    }
                */      
                
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
                 SaldoPart = MontaSaldoPart();
                 //try { 
                        Benefmin =  this.CalcBenefMin();
                 /*     } catch (e) {
                          if (e instanceof TypeError) {
                              printError(e, true);
                          } else {
                              printError(e, false);
                          }
                      }
                */       
                 
                 Saldo = SaldoPart + SaldoPatrocResgT;
                
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
   }
   return isBM;
}

function CalcFator(){
    var fator = 0;
    var idadeSaldoDib = SlideValIdade; 
    var DtTVE = (DtDeslig === null || status == 3) ? DtSaldoDIB : DtDeslig;   

    //Retorna fator de array global TabuaAtuarial conforme sexo e idade na data da aposentadoria
       /*
    if(TabuaAtuarial != null){  
       for (var l in TabuaAtuarial){
           var obj = TabuaAtuarial[l];
          
           if(obj.Idade == idadeSaldoDib && DtTVE.getFullYear() >= obj.Ano){            
               fator = (Sexo == '01' )? obj.Masculino : obj.Feminino;                         
            }
           
           if(DtTVE.getFullYear() < 2005){ //Se DtTVE for anterior a 2005 (31/08/2005 início última tábua) considerar fator = 1
               fator = 1
           }                             
        }  
    } */
      
    return fator; 
}

function MontaSaldoPart(){ 

  var jsonObj = objMovtoProj.movimentacoes;
  var movto = 0;
  var SaldoPart = 0;
  var SaldoTotal = 0;

  var i = (jsonObj.length - 1);
  
  if(i > -1){ //Se Objeto não for nulo
    do { 
      movto = jsonObj[i];
      //Contrib Participante
      if (movto.id_conta == 1202 || ((status != 3) ? (movto.id_conta == 0) : false)) { //Contrib de autopatroc não devem ser somadas ao total 
        SaldoPart = SaldoPart + movto.ctr_rent;
        console.log(movto.id_conta);
      }
      /* Contas a excluir
      1245 1246 1208 1221 1285 1286 1305 1312 
      */        
       i--;                                      
    } while(i != -1) 
  }
  
  SaldoTotal = SaldoPart.toFixed(2) * 1;

  return SaldoTotal;
}

function CalcBenefVital(typeBenefVital) {
  var Benefvital = 0; 

   switch (typeBenefVital){
          case 0: 
                 //Regras Aposentadoria por Tempo de Contribuição
                 //Benefvital = calcBenefTC();
          break;  
          case 1:
                //Regras Aposentadoria por idade  
                //Benefvital = calcBenefIdade();       
          break;   
        }
   

  return Benefvital;  
}
