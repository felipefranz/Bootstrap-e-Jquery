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
    if (SlideValSaque != 0 && $("#wdwperc").val().replace('%','') != 0){
        //Apresenta mensagem   alert-warning   
        $('#secSaque_msg2').removeClass('alert-danger');   
        $('#secSaque_msg2').addClass('alert-warning');              
        $('#secSaque_msg2').html('<strong>(*)</strong> O c�lculo de IRPF de saque e benef�cio inicial est�o apresentados separadamente apenas para efeito de simula��o.'); //(1 UPN)
        $('#secSaque_msg2').fadeIn();    
        isMobileApp() ? setHeight_S() : "";                                   
    } else {
        //Apresenta mensagem      
        $('#secSaque_msg2').hide(); 
        isMobileApp() ? setHeight_S() : "";
    }
}

function rl_sliderPerc(){     
    validaEmprestimo(0);
}

function rl_sliderPrazo(){
    validaEmprestimo(1);
}

function rl_sliderRenda(){
    validaEmprestimo(2);
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
       (SP - (SP * PS)) * ValRenda <= URP ? PS = 0 : PS = PS; 
  } */
  
  return PS;  
}

function rl_BenefMin(typeBenef){
   var isBM = false;

   /*
   switch (typeBenef){
      case 0: 
          //Regras benef�cio m�nimo aposentadoria resgate
          break;  
      case 1:
          //Regras benef�cio m�nimo resgate           
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

  //c�lculo do benef�cio m�nimo
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



function validaEmprestimo(typeBenef){ //Function valida se valor de beneficio esta dentro da margem de emprestimo

   var arrayEmprestimo = DadosEmprestimo;   
   var margemConsignavel = 0.2;   
   var limitePrazo = 0.7;   
   var vllimiteBenef = 0;
   var vllimiteqtdMesesPerc = 0;
   var qtdmeses = 0;
   var Benef = 0;
   var BenefBruto = 0;
   var vlIR = 0;
   var saldoAtual = 0;
   
   if(status.toString() == "9" && CampAlterBeneficio){ //Valida��o de empr�stimo somente para assistido
    if(arrayEmprestimo != "") {
       for (var l in arrayEmprestimo){
          var obj = arrayEmprestimo[l];          
          vllimiteBenef = parseFloat(arrayEmprestimo[0].InstallmentValue) * (1/margemConsignavel);
          BenefBruto = parseFloat($("#amount").val().replace('R$ ','').replace('.','').replace(',','.'));
          Benef = parseFloat($("#benefnet").val().replace('R$ ','').replace('.','').replace(',','.'));
          saldoAtual = parseFloat($("#remainBenBal").val().replace('R$ ','').replace('.','').replace(',','.'));
          //vlIR = (saldoAtual * vllimiteqtdMesesPerc).toFixed(2) * 1  parseFloat($("#benefirvalue").val().replace('R$ ','').replace('.','').replace(',','.'));
          vllimiteqtdMesesPerc = limitePrazo / parseInt(arrayEmprestimo[0].QuantityInstallmentUnpaid);

          switch (typeBenef){
              case 0: //Percentual
                  qtdmeses = (saldoAtual / BenefBruto) * limitePrazo ;

                  if ((Benef * margemConsignavel) <= parseFloat(arrayEmprestimo[0].InstallmentValue)){                    
                    //$('#secCampEmprestimo_msg1').html('<strong>Aten��o!</strong> O valor de <strong>Benef�cio Inicial</strong> simulado deve ser superior a R$'+$.formatNumber(vllimiteBenef,{format: "#,##0.00", locale: "br"})+' , por conta de seu empr�stimo pessoal contratado com a EMBRAER PREV.'); 
                    //$('#secCampEmprestimoValida_msg1').html('<strong>Aten��o!</strong> O valor de <strong>Benef�cio Inicial</strong> simulado deve ser superior a o valor escolhido, por conta de seu empr�stimo pessoal contratado com a EMBRAER PREV.'); 
                    $('#secCampEmprestimoValida_msg1').html('<strong>Importante!</strong> Devido ao seu contrato de empr�stimo pessoal, o valor simulado de benef�cio n�o foi suficiente para o pagamento da parcela de empr�stimo mensal consignado. Simule outros valores e/ou Fale Conosco (<a href="mailto:atendimento@embraerprev.com.br" target="_top">atendimento@embraerprev.com.br</a>).');  
                    $('#secCampEmprestimoValida').fadeIn();  
                    $('#btnCampAlterBeneficio').addClass("disabled");                    
                  } else if (qtdmeses < parseInt(arrayEmprestimo[0].QuantityInstallmentUnpaid)) {                    
                    //$('#secCampEmprestimo_msg1').html('<strong>Aten��o!</strong> O valor de <strong>Benef�cio Inicial</strong> simulado deve ser inferior a R$'+ $.formatNumber((saldoAtual * vllimiteqtdMesesPerc).toFixed(2) * 1,{format: "#,##0.00", locale: "br"})+', por conta de seu empr�stimo pessoal contratado com a EMBRAER PREV.');  
                    //$('#secCampEmprestimoValida_msg1').html('<strong>Aten��o!</strong> O valor de <strong>Benef�cio Inicial</strong> simulado deve ser inferior a o valor escolhido, por conta de seu empr�stimo pessoal contratado com a EMBRAER PREV.');  
                    $('#secCampEmprestimoValida_msg1').html('<strong>Importante!</strong> Devido ao seu contrato de empr�stimo pessoal, o valor simulado de benef�cio n�o foi suficiente para o pagamento da parcela de empr�stimo mensal consignado. Simule outros valores e/ou Fale Conosco (<a href="mailto:atendimento@embraerprev.com.br" target="_top">atendimento@embraerprev.com.br</a>).');  
                    $('#secCampEmprestimoValida').fadeIn();  
                    $('#btnCampAlterBeneficio').addClass("disabled");                    
                  } else {                    
                    $('#secCampEmprestimoValida').hide();  
                    $('#btnCampAlterBeneficio').removeClass("disabled");                    
                  }  
                  break;  
            case 1: //Prazo
                  qtdmeses = ((Math.floor(ValPrazo) * Nper) + Math.round((ValPrazo - Math.floor(ValPrazo)) * Nper)) * limitePrazo;
              
                  if ((Benef * margemConsignavel) <= parseFloat(arrayEmprestimo[0].InstallmentValue)){                    
                    //$('#secCampEmprestimo_msg1').html('<strong>Aten��o!</strong> O valor de <strong>Benef�cio Inicial</strong> simulado deve ser superior a R$'+$.formatNumber(vllimiteBenef,{format: "#,##0.00", locale: "br"})+' , por conta de seu empr�stimo pessoal contratado com a EMBRAER PREV.');                      
                    //$('#secCampEmprestimoValida_msg1').html('<strong>Aten��o!</strong> O valor de <strong>Benef�cio Inicial</strong> simulado deve ser superior a o valor escolhido, por conta de seu empr�stimo pessoal contratado com a EMBRAER PREV.'); 
                    $('#secCampEmprestimoValida_msg1').html('<strong>Importante!</strong> Devido ao seu contrato de empr�stimo pessoal, o valor simulado de benef�cio n�o foi suficiente para o pagamento da parcela de empr�stimo mensal consignado. Simule outros valores e/ou Fale Conosco (<a href="mailto:atendimento@embraerprev.com.br" target="_top">atendimento@embraerprev.com.br</a>).');  
                    $('#secCampEmprestimoValida').fadeIn();  
                    $('#btnCampAlterBeneficio').addClass("disabled");                    
                  } else if (qtdmeses < parseInt(arrayEmprestimo[0].QuantityInstallmentUnpaid)) {                                                            
                    //$('#secCampEmprestimo_msg1').html('<strong>Aten��o!</strong> O valor de <strong>Benef�cio Inicial</strong> simulado deve ser inferior a R$'+ $.formatNumber(((saldoAtual / parseInt((arrayEmprestimo[0].QuantityInstallmentUnpaid / 0.7))).toFixed(2) * 1)  + 0.01,{format: "#,##0.00", locale: "br"}) +', por conta de seu empr�stimo pessoal contratado com a EMBRAER PREV.');  
                    //$('#secCampEmprestimoValida_msg1').html('<strong>Aten��o!</strong> O valor de <strong>Benef�cio Inicial</strong> simulado deve ser inferior a o valor escolhido, por conta de seu empr�stimo pessoal contratado com a EMBRAER PREV.');  
                    $('#secCampEmprestimoValida_msg1').html('<strong>Importante!</strong> Devido ao seu contrato de empr�stimo pessoal, o valor simulado de benef�cio n�o foi suficiente para o pagamento da parcela de empr�stimo mensal consignado. Simule outros valores e/ou Fale Conosco (<a href="mailto:atendimento@embraerprev.com.br" target="_top">atendimento@embraerprev.com.br</a>).');  
                    $('#secCampEmprestimoValida').fadeIn();  
                    $('#btnCampAlterBeneficio').addClass("disabled");                    
                  } else {
                    $('#secCampEmprestimoValida').hide(); 
                    $('#btnCampAlterBeneficio').removeClass("disabled");                    
                  }
                  break;   
          }
        }
      }
   } 
}


    
