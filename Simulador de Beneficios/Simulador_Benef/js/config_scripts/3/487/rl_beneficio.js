

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

  var vlBenef = (1 * $("#amount").val().replace('R$ ','').replace('.','').replace('.','').replace(',','.')); //Valor do Benefício simulado
  var GridEvolBenef = '<table id="GridEvol" class="table table-striped"><tbody><tr><th>Idade</th><th>Benef&iacute;cio Projetado</th><th>Saldo Remanescente</th></tr><tr><td>' + SlideValIdade + '</td><td> R$ ' + $.formatNumber(SaldoIniTposSaque,{format: "#,##0.00", locale: "br"}) + '</td><td>R$ 0,00</td></tr><tr><td colspan="4">' + MinBenText + '</td></tr></tbody></table>';

   if (DtSaldoDIB >= DireitoAposent()){        
        if (($("#perc").is(":checked") && ValPerc == MaxPerc) && vlBenef < 2 * URP){
            //Apresenta mensagem
            MinBenef = 2 * URP;
            $('#evolution').html(GridEvolBenef);            
            $('#GridEvolBenef').fadeIn();        
            $('#GridEvol tr').length <= 3 ? $("#collapseEvolSaque").addClass("in") : "";
            $('#graSalProjeta').hide();                        
         } else {                         
    	      $('#secEvolSaque').show();
    	      $('#secResgate').show();
         }
     }else{
    $('#secResgate').show();
   }  
}

function rl_sliderPrazo(){
  
  var vlBenef = (1 * $("#amount").val().replace('R$ ','').replace('.','').replace('.','').replace(',','.')); //Valor do Benefício simulado
  var GridEvolBenef = '<table id="GridEvol" class="table table-striped"><tbody><tr><th>Idade</th><th>Benef&iacute;cio Projetado</th><th>Saldo Remanescente</th></tr><tr><td>' + SlideValIdade + '</td><td> R$ ' + $.formatNumber(SaldoIniTposSaque,{format: "#,##0.00", locale: "br"}) + '</td><td>R$ 0,00</td></tr><tr><td colspan="4">' + MinBenText + '</td></tr></tbody></table>';

   if (DtSaldoDIB >= DireitoAposent()){        
        if (($("#prazo").is(":checked") && ValPrazo == MinPrazo) && vlBenef < 2 * URP){
            //Apresenta mensagem
            MinBenef = 2 * URP;
            $('#evolution').html(GridEvolBenef);            
            $('#GridEvolBenef').fadeIn();        
            $('#GridEvol tr').length <= 3 ? $("#collapseEvolSaque").addClass("in") : "";
            $('#graSalProjeta').hide();                        
         } else {              
    	      $('#secEvolSaque').show();
    	      $('#secResgate').show();
         }
     }else{
    $('#secResgate').show();
   }
}

function rl_sliderRenda(){
    
  var vlBenef = (1 * $("#amount").val().replace('R$ ','').replace('.','').replace('.','').replace(',','.')); //Valor do Benefício simulado
  var GridEvolBenef = '<table id="GridEvol" class="table table-striped"><tbody><tr><th>Idade</th><th>Benef&iacute;cio Projetado</th><th>Saldo Remanescente</th></tr><tr><td>' + SlideValIdade + '</td><td> R$ ' + $.formatNumber(SaldoIniTposSaque,{format: "#,##0.00", locale: "br"}) + '</td><td>R$ 0,00</td></tr><tr><td colspan="4">' + MinBenText + '</td></tr></tbody></table>';

   if (DtSaldoDIB >= DireitoAposent()){        
        if (($("#perc").is(":checked") && ValPerc == MaxPerc || $("#prazo").is(":checked") && ValPrazo == MinPrazo) && vlBenef < 2 * URP){
            //Apresenta mensagem
            MinBenef = 2 * URP;
            $('#evolution').html(GridEvolBenef);            
            $('#GridEvolBenef').fadeIn();        
            $('#GridEvol tr').length <= 3 ? $("#collapseEvolSaque").addClass("in") : "";
            $('#graSalProjeta').hide();                        
         } else {                                     
    	      $('#secEvolSaque').show();
    	      $('#secResgate').show();
         }
     }else{
    $('#secResgate').show();
   }
}

function validaSaque(PercSaque){

  var SP = SaldoIniT;     //Saldo Projetado - SP
  var PS = PercSaque;  //Percentual de Saque - PS
   
  //Considera as duas modalidades
  //MinBenef = (SP - (SP * PS)) * (MaxPerc/100) < (2 * URP) || (SP - (SP * PS)) / (MinPrazo * Nper) < (2 * URP) ? 2 * URP : 0;
    if ($("#perc").is(":checked")) { //Percentual - P                
        MinBenef = (SP - (SP * PS)) * (MaxPerc/100) < (2 * URP) ? 2 * URP : 0;   
    }  else if ($("#prazo").is(":checked")){ //Prazo Certo - PC            
        MinBenef = (SP - (SP * PS)) / (MinPrazo * Nper) < (2 * URP) ? 2 * URP : 0;   
    }
  //}
  
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
