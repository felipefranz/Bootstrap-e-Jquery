<!-- saved from url=(0016)http://localhost -->

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

function secMensagem2(){
    $('#secSaque_msg2').removeClass("alert-danger").addClass("alert-warning");    
    $('#secSaque_msg2').html('<strong>Atenção!</strong> Esta simulação não leva em consideração conta individual de risco.');  
    $('#secSaque_msg2').fadeIn();
};

function rl_BenefMin(typeBenef){
   var isBM = false;

   /*
   switch (typeBenef){
      case 0: 
          //Regras benefício mínimo aposentadoria resgate
          break;  
      case 1:
          //Regras benefício mínimo resgate           
          break;   
   }
   */
   return isBM;
}


function CalcBenefMin(){
  /*
  var Benefmin = 0;  
  var TSC = DtDeslig === null ? DataDif(DtAdmissao, DtSaldoDIB, 1 , 4) : DataDif(DtAdmissao, DtDeslig, 1 , 4);
  var Fator = 0; 
  var idadeSaldoDib = $("#sliderIdade").slider("value"); 

  //cálculo do benefício mínimo
  if (status == 2){              
    switch(true) {   //Calc Fator Benef Proporcional
      case (idadeSaldoDib < 60):
          Fator = CalcFator().toFixed(4) * 1;
          break;
      case (idadeSaldoDib >= 60):
          Fator = 1;
          break;    
      };  
    Benefmin = (3 * Salario) * (TSC / 30) * Fator;
  } else {                    
    Benefmin = (3 * Salario) * (TSC / 30);
  }

 return Benefmin;
  */
}


