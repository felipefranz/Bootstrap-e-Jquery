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
  if (DtSaldoDIB >= DireitoAposent()) {        
        if (SlideValSaque == 0 && $("#wdwperc").val().replace('%','') != 0){
            //Apresenta mensagem
            $('#secSaque_msg2').html('<strong>Atenção!</strong> A opção pelo saque de até 100%, somente será válida quando o valor de <strong>Benefício Inicial Bruto</strong> for superior a R$'+$.formatNumber(URP-0.01,{format: "#,##0.00", locale: "br"})+'.'); //(1 UPN)
            $('#secSaque_msg2').fadeIn();  
            if(isMobileApp()) {
                $('#secResgate').hide();               
                setHeight_S();
            }          
            $('#tamBeneBox_benefIrValue').hide(); 
            $('#benefirvalue').hide();             
            $('#graSalProjeta').hide();
            $('#secEvolSaque').hide();
            $('#secBenefApos_info').hide();
            $('#amount').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));                       
         } else if (SlideValSaque == 0 && ((SaldoIniTposSaque * MinPerc/100) > URP) && $("#amount").val().replace('R$ ','').replace(',','.') < URP) {
            //Apresenta mensagem saque
            $('#secSaque_msg2').html('<strong>Atenção!</strong> O recebimento de benefício, somente será válido quando o valor de <strong>Benefício Inicial Bruto</strong> for superior a R$'+$.formatNumber(URP-0.01,{format: "#,##0.00", locale: "br"})+'.'); //(1 UPN)          
            $('#secSaque_msg2').fadeIn();
            if(isMobileApp()) {
                $('#secResgate').hide();               
                setHeight_S();
            }
            $('#tamBeneBox_benefIrValue').hide(); 
            $('#benefirvalue').hide();             
            $('#graSalProjeta').hide();
            $('#secEvolSaque').hide();
            $('#secBenefApos_info').hide();
            $('#amount').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));                            
         } else {             
    	      $('#secSaque_msg2').hide(); 
            $('#tamBeneBox_benefIrValue').show(); 
            $('#benefirvalue').show(); 
            if(isMobileApp()) {
	            $('#secResgate').hide();               
              setHeight_S();
            }                     
    	    $('#secEvolSaque').show();
    	    $('#secResgate').show();
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
            $('#secSaque_msg2').html('<strong>Atenção!</strong> A opção pelo saque de até 100%, somente será válida quando o valor de <strong>Benefício Inicial Bruto</strong> for superior a R$'+$.formatNumber(URP-0.01,{format: "#,##0.00", locale: "br"})+'.'); //(1 UPN)
            $('#secSaque_msg2').fadeIn();
            if(isMobileApp()) {
	            $('#secResgate').hide();               
              setHeight_S();
            }          
            $('#tamBeneBox_benefIrValue').hide(); 
            $('#benefirvalue').hide();             
            $('#graSalProjeta').hide();
            $('#secEvolSaque').hide();
            $('#secBenefApos_info').hide(); 
            $('#amount').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));            
         } else if (SlideValSaque == 0 && SaldoIniTposSaque > URP && $("#amount").val().replace('R$ ','').replace(',','.') < URP) {
            //Apresenta mensagem saque
            $('#secSaque_msg2').html('<strong>Atenção!</strong> O recebimento de benefício, somente será válido quando o valor de <strong>Benefício Inicial Bruto</strong> for superior a R$'+$.formatNumber(URP-0.01,{format: "#,##0.00", locale: "br"})+'.'); //(1 UPN)          
            $('#secSaque_msg2').fadeIn();
            if(isMobileApp()) {
	            $('#secResgate').hide();               
              setHeight_S();
            }          
            $('#tamBeneBox_benefIrValue').hide(); 
            $('#benefirvalue').hide();             
            $('#graSalProjeta').hide();
            $('#secEvolSaque').hide();
            $('#secBenefApos_info').hide(); 
            $('#amount').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));                            
         } else {             
    	    $('#secSaque_msg2').hide();  
            $('#tamBeneBox_benefIrValue').show(); 
            $('#benefirvalue').show(); 
            if(isMobileApp()) {
	            $('#secResgate').hide();               
              setHeight_S();
            }                    
    	    $('#secEvolSaque').show();
          $('#secResgate').show();   
          $('#secBenefApos_info').show();          
         }
     }else{
    $('#secResgate').show();
   }
}

function rl_sliderRenda(){
   if (DtSaldoDIB >= DireitoAposent()){        
        if (SlideValSaque == 0 && $("#wdwperc").val().replace('%','') != 0){                                    
            //Apresenta mensagem saque
            $('#secSaque_msg2').html('<strong>Atenção!</strong> A opção pelo saque de até 100%, somente será válida quando o valor de <strong>Benefício Inicial Bruto</strong> for superior a R$'+$.formatNumber(URP-0.01,{format: "#,##0.00", locale: "br"})+'.'); //(1 UPN)          
            $('#secSaque_msg2').fadeIn();
            if(isMobileApp()) {
	            $('#secResgate').hide();               
              setHeight_S();
            }           
            $('#tamBeneBox_benefIrValue').hide(); 
            $('#benefirvalue').hide();             
            $('#graSalProjeta').hide();
            $('#secEvolSaque').hide();
            $('#secBenefApos_info').hide(); 
            $('#amount').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));          
         } else if (SlideValSaque == 0 && SaldoIniTposSaque > URP && $("#amount").val().replace('R$ ','').replace(',','.') < URP) {
            //Apresenta mensagem saque
            $('#secSaque_msg2').html('<strong>Atenção!</strong> O recebimento de benefício, somente será válido quando o valor de <strong>Benefício Inicial Bruto</strong> for superior a R$'+$.formatNumber(URP-0.01,{format: "#,##0.00", locale: "br"})+'.'); //(1 UPN)          
            $('#secSaque_msg2').fadeIn();
            if(isMobileApp()) {
	            $('#secResgate').hide();               
              setHeight_S();
            }           
            $('#tamBeneBox_benefIrValue').hide(); 
            $('#benefirvalue').hide();             
            $('#graSalProjeta').hide();
            $('#secEvolSaque').hide();
            $('#secBenefApos_info').hide(); 
            $('#amount').val("R$ " + $.formatNumber(0, {format: "#,##0.00", locale: "br"}));                
         } else {             
    	    $('#secSaque_msg2').hide();
            $('#tamBeneBox_benefIrValue').show(); 
            $('#benefirvalue').show(); 
            if(isMobileApp()) {
	            $('#secResgate').hide();               
              setHeight_S();
            }                       
    	    $('#secEvolSaque').show();
          $('#secResgate').show();
          $('#secBenefApos_info').show(); 
         }
     }else{
    $('#secResgate').show();
   }
}

function validaSaque(PercSaque){

  var SP = SaldoIniT;     //Saldo Projetado - SP
  var PS = PercSaque;  //Percentual de Saque - PS
  
  if ($("#perc").is(":checked")) { //Percentual - P                
       (SP - (SP * PS)) * (ValPerc/100) <  URP ? PS = 0 : PS = PS;
            
  }  else if ($("#prazo").is(":checked")){ //Prazo Certo - PC            
       (SP - (SP * PS)) / (ValPrazo * Nper) < URP ? PS = 0 : PS = PS;   
                    
  }  else { //Renda Certa - RC                        
       (SP - (SP * PS)) * ValRenda < URP ? PS = 0 : PS = PS;                    
  } 
  
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

