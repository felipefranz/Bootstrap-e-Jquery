var dedDep = 189.59;                              //Tabela IR Progressivo 2015 - Dedução por dependente
var dedIdade =  1903.98;                          //Tabela IR Progressivo/Regressivo - Dedução por idade
var dedAliq0 = 0;                                 //Tabela IR Progressivo 2015 - Dedução aliq 0%                                                     
var dedAliq75 = 142.8;                            //Tabela IR Progressivo 2015 - Dedução aliq 7,5%
var dedAliq15 = 354.8;                            //Tabela IR Progressivo 2015 - Dedução aliq 15%
var dedAliq225 = 636.13;                          //Tabela IR Progressivo 2015 - Dedução aliq 22,5%
var dedAliq275 = 869.36;                          //Tabela IR Progressivo 2015 - Dedução aliq 27,5%
var faixaAliq0 = 1903.98;                         //Tabela IR Progressivo 2015 - Faixa limite aliq 0%
var faixaAliq75 = 2826.65;                        //Tabela IR Progressivo 2015 - Faixa limite aliq 7,5%
var faixaAliq15 = 3751.05;                        //Tabela IR Progressivo 2015 - Faixa limite aliq 15%
var faixaAliq225 = 4664.68;                       //Tabela IR Progressivo 2015 - Faixa limite aliq 22,5%


function IRProgressivo(vlbenef, tipoBenef){  
    var irProg = 0;  

    if(tipoBenef === undefined) { //Tratamento de parâmetro Default IE
      tipoBenef = 0;
    }
    
    if (tipoBenef != 1) { //Se benefício diferente de resgate efetua deduções
       vlbenef -= QntDep * dedDep;
       if (DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), DireitoAposent(), 0, 2) >= 65) {vlbenef -= dedIdade};  
    }           

    switch (true){
      case (vlbenef <= faixaAliq0):
        irProg = vlbenef * 0 - dedAliq0;
        break;  
      case (vlbenef > faixaAliq0 && vlbenef <= faixaAliq75):
        irProg = vlbenef * 0.075 - dedAliq75;
        break;
      case (vlbenef > faixaAliq75 && vlbenef <= faixaAliq15):
        irProg = vlbenef * 0.15 - dedAliq15;      
        break;
      case (vlbenef > faixaAliq15 && vlbenef <= faixaAliq225):
        irProg = vlbenef * 0.225 - dedAliq225;
        break;
      case (vlbenef > faixaAliq225):
        irProg = vlbenef * 0.275 - dedAliq275;
        break;
    }

    if (tipoBenef == 1 && flagIRResgateProg == 1) { //Se benefício de resgate e flagIRResgateProg ativa 
      //flagIRResgateProg Flag de controle para calculo de IR do resgate progressivo, 0 = IR Tab Progressiva (Default) / 1 = IR 15% config_var
      irProg = vlbenef * 0.15;
    }

  if (irProg < 10){irProg = 0};
  return irProg;    
}