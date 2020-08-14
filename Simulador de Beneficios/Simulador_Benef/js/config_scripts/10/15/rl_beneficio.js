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
}

function rl_sliderPrazo(){
}

function rl_sliderRenda(){
}

function validaSaque(PercSaque){

  var SP = SaldoIniT;     //Saldo Projetado - SP
  var PS = PercSaque;  //Percentual de Saque - PS
  /*
  if ($("#perc").is(":checked")) { //Percentual - P                
       (SP - (SP * PS)) * (ValPerc/100) <= URP ? PS = 0 : PS = PS;
            
  }  else if ($("#prazo").is(":checked")){ //Prazo Certo - PC            
       (SP - (SP * PS)) / (ValPrazo * Nper) <= URP ? PS = 0 : PS = PS;   
                    
  }  else { //Renda Certa - RC                        
            ValRenda <= URP ? PS = 0 : PS = PS;                       
  } */
  
  return PS;  
}

function rl_BenefMin(typeBenef){    //pendente
   var Benefmin = 0;
   var Saldo = 0;
   var SaldoPart = 0;

   isBM = false;
   
   switch (typeBenef){
      case 0:   
                //SaldoPart = MontaSaldoPart();
                Benefmin = CalcBenefMin() ;
                
                Saldo = SaldoPatrocT;
                
            if (Saldo < Benefmin) {  //Compara Benef Minimo ao Saldo Comparativo
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
            } else {
                 isMobileApp() ?  $("#secEvolSaque").addClass("hide") : "";                                  
		             $("#secSaque").show();
                 $("#tamBeneBox").show();
                 $("#secResgate").show();
                 $('#secBenefApos_info').show();
                 isBM = false;
            }       
          break;  
      case 1:
                 SaldoPart = MontaSaldoPart();
                 Benefmin = CalcBenefMin() ;
                 
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
                 $('#secBenefApos_info').hide();		 
            } else {
                 isMobileApp() ?  $("#secEvolSaque").addClass("hide") : "";                                  
		             $("#secSaque").show();
                 $("#tamBeneBox").show();
                 $("#secResgate").show();
                 $('#secBenefApos_info').show();
                 isBM = false;
            }    
          break;   
   }
   return isBM;
}

function MontaSaldoPart(){ 

  var jsonObj = objMovtoProj.movimentacoes;
  var movto = 0;
  var SaldoPart = 0;
  var SaldoTotal = 0;

  var i = (jsonObj.length - 1);
  
  if(i > -1){ //Se Objeto nao for nulo
    do { 
      movto = jsonObj[i];
      //Contrib Participante
      if (movto.id_conta == 1202 || ((status != 3) ? (movto.id_conta == 0) : false)) { //Contrib de autopatroc nao devem ser somadas ao total 
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


function CalcFator(){
    var fator = 0;
    var idadeSaldoDib = SlideValIdade; 
    var DtTVE = (DtDeslig === null && status != 3) ? DtSaldoDIB : DtDeslig;   

    //Retorna fator de array global TabuaAtuarial conforme sexo e idade na data da aposentadoria
    if(TabuaAtuarial != null){  
       for (var l in TabuaAtuarial){
           var obj = TabuaAtuarial[l];
          
           //if(obj.Idade == idadeSaldoDib && DtTVE.getFullYear() >= obj.Ano){            
	    if(obj.Idade == idadeSaldoDib){            
               fator = (Sexo == '01' )? obj.Masculino : obj.Feminino;                         
            }
           
           //if(DtTVE.getFullYear() < 2005){ //Se DtTVE for anterior a 2005 (31/08/2005 inicio ultima tabua) considerar fator = 1
           //    fator = 1
           //}                             
        }  
     }
      
    return fator; 
}

function CalcBenefMin(){    
  var Benefmin = 0;  
  var TVP = (DtDeslig === null) ? Math.min(DataDif(DtAdmissao, DtSaldoDIB, 1 , 4), 30) : Math.min(DataDif(DtAdmissao, DtDeslig, 1 , 4), 30);
  var Fator = 0;
  var quota = 0; 
  var jsonObj;

  //Calculo do beneficio minimo  
  if (!(DtSaldoDIB >= DireitoAposent())){ //Resgate
    Fator = CalcFator().toFixed(6) * 1;
                                                                                                                 
    if (TVP < 3 || Contribuinte == 1) { //Condicao para nao recebimento do BenefMin
        Fator = 0;
    }                
   
    Benefmin = (3 * Salario) * (TVP / 30) * Fator;     
  } else { //Aposentadoria                   
    Benefmin = (3 * Salario) * (TVP / 30);
  }
  
  if (status == 2) { //Valorizacao do BM para BPD      
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
