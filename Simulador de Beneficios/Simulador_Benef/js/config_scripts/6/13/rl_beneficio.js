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

function validaRendaCerta(){

  var _valRenda = ValRenda; //valor de renda salvo

  //imprime mensagem de limite de beneficio
  $('#textPmtVlRenda').html(`<p style="margin: 5px 0 0px;font-size: 11px;"><b>O valor deve estar dentro do limite de R$${$.formatNumber((SaldoIniTposSaque * (MinRenda/100)), {format: "#,##0.00", locale: "br"})} até R$${$.formatNumber((SaldoIniTposSaque * (MaxRenda/100)), {format: "#,##0.00", locale: "br"})}.</b></p>`);      

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


function InitBenefInputPerc(){ //função de inicialização do campo select somente para assistido

  var atualPercOption = 0;
  //html da div e do input na tela 
  var selectPmtVlPerc = ` </div>
                          <div id="divTamBeneBox_input_perc">
                              <div class="row">
                                  <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                  <div class="col-xs-12 col-sm-10 col-md-10"><span id="tamBeneBox_input_perc">Escolha no campo abaixo o valor que deseja receber no seu benefício mensal</span></div>
                                  <div class="col-xs-0 col-sm-1 col-md-1"></div>
                              </div>
                              <div class="row">&nbsp;</div>
                              <div class="row">
                                  <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                  <div class="col-xs-10 col-sm-10 col-md-10">
                                      <select class="form-control input-sm" id="pmtVlPerc" size="1" style="width:80px"></select>
                                      <span id="textPmtVlPerc"></span>
                                  </div>
                                  <div class="col-xs-1 col-sm-1 col-md-1"></div>
                              </div>
                              <div class="row">&nbsp;</div>
                          `;
                      
  if (BenefCheckOpt == 0 || PMTIni.indexOf("Percentual do Saldo") >= 0) { //Percentual
      $(selectPmtVlPerc).insertAfter( $( "#divTamBeneBox_input" ) ); //adiciona o html após o elemento

      // Inicializa percentuais de selects fnc
      for (x = MinPerc; (x.toFixed(2) * 1) <= MaxPerc; x += IncPerc){
          $('#pmtVlPerc').append('<option value=' + $.formatNumber(x.toFixed(2) * 1, {format: "0.00", locale: "en"})+ '>' + $.formatNumber(x, {format: "#,##0.00", locale: "br"}) + '%</option>');   
          }
      
      try { //captura valor percentual do ultimo beneficio, através da string
          atualPercOption = PMTIni.match(/\d/g).join("") * 1 / 100;
      }
      catch(err) {
          console.log(err.message);
      }

      //carrega ultima opção do participante
      $('#pmtVlPerc').find('option[value="' + $.formatNumber(atualPercOption, {format: "0.00", locale: "en"}) + '"]').attr("selected", "selected");
      ValPerc = $('#pmtVlPerc').val();

      //esconde slider
      $("#divTamBeneBox_slider").addClass('hide');
      $("#divTamBeneBox_input_perc").show();
      
      //Listener input percentual benef
      $('#pmtVlPerc').change(function() {
          //mexe o slider
          $("#slider").slider("option", "value", $('#pmtVlPerc').val());
          //muda o valor do slider
          ValPerc = $('#pmtVlPerc').val();
          //chama a rotina de calculo
          setTimeout(function(){!isBM ? BenefCheck(0) : "" ;},5);
      });
  }
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


