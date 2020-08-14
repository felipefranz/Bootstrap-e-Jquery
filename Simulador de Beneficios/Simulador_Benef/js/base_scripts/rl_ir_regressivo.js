<!-- saved from url=(0016)http://localhost -->

function IRRegBenef(incomevalue, sld10, sld15, sld20, sld25, sld30, sld35, sldProg, sldIsen){
  var irReg = 0;
  
  if (Id_entidade != 3 && Id_entidade != 57) { //Esta regra não se aplica para os planos do Bradesco
  	if (DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), DireitoAposent(), 0, 2) >= 65) {incomevalue -= dedIdade};
     }; 
 

  switch (true){
      case (incomevalue <= sld10):
        irReg = incomevalue * 0.1;
        sld10 -= incomevalue;
        break;  
      case (incomevalue > sld10 && incomevalue <= sld10 + sld15):
        irReg = sld10 * 0.1 + (incomevalue - sld10) * 0.15;
        sld15 -= incomevalue - sld10;
        sld10 = 0;
        break;
      case (incomevalue > sld10 + sld15 && incomevalue <= sld10 + sld15 + sld20):
        irReg = sld10 * 0.1 + sld15 * 0.15 + (incomevalue - sld10 - sld15) * 0.2;       
        sld20 -= incomevalue - sld10 - sld15;
        sld15 = 0;
        sld10 = 0;
        break;
      case (incomevalue > sld10 + sld15 + sld20 && incomevalue <= sld10 + sld15 + sld20 + sld25):
        irReg = sld10 * 0.1 + sld15 * 0.15 + sld20 * 0.2 + (incomevalue - sld10 - sld15 - sld20) * 0.25;
        sld25 -= incomevalue - sld10 - sld15 - sld20;
        sld20 = 0;
        sld15 = 0;
        sld10 = 0;        
        break;
      case (incomevalue > sld10 + sld15 + sld20 + sld25 && incomevalue <= sld10 + sld15 + sld20 + sld25 + sld30):
        irReg = sld10 * 0.1 + sld15 * 0.15 + sld20 * 0.2 + sld25 * 0.25 + (incomevalue - sld10 - sld15 - sld20 - sld25) * 0.3;
        sld30 -= incomevalue - sld10 - sld15 - sld20 - sld25;
        sld25 = 0;
        sld20 = 0;
        sld15 = 0;
        sld10 = 0;
        break;
      case (incomevalue > sld10 + sld15 + sld20 + sld25 + sld30 && incomevalue <= sld10 + sld15 + sld20 + sld25 + sld30 + sld35):
        irReg = sld10 * 0.1 + sld15 * 0.15 + sld20 * 0.2 + sld25 * 0.25 + sld30 * 0.3 + (incomevalue - sld10 - sld15 - sld20 - sld25 - sld30) * 0.35;
        sld35 -= incomevalue - sld10 - sld15 - sld20 - sld25 - sld30;
        sld30 = 0;
        sld25 = 0;
        sld20 = 0;
        sld15 = 0;
        sld10 = 0;
        break;  
      case (incomevalue > sld10 + sld15 + sld20 + sld25 + sld30 + sld35 && incomevalue <= sld10 + sld15 + sld20 + sld25 + sld30 + sld35 + sldProg):
        irReg = sld10 * 0.1 + sld15 * 0.15 + sld20 * 0.2 + sld25 * 0.25 + sld30 * 0.3 + sld35 * 0.35 + IRProgressivo(incomevalue - sld10 - sld15 - sld20 - sld25 - sld30 - sld35);
        sldProg -= incomevalue - sld10 - sld15 - sld20 - sld25 - sld30 - sld35;
        sld35 = 0;
        sld30 = 0;
        sld25 = 0;
        sld20 = 0;
        sld15 = 0;
        sld10 = 0;
        break;  
      case (incomevalue > sld10 + sld15 + sld20 + sld25 + sld30 + sld35 + sldProg && incomevalue <= sld10 + sld15 + sld20 + sld25 + sld30 + sld35 + sldProg + sldIsen):
        irReg = sld10 * 0.1 + sld15 * 0.15 + sld20 * 0.2 + sld25 * 0.25 + sld30 * 0.3 + sld35 * 0.35 + IRProgressivo(sldProg) ;
        sldIsen -= incomevalue - sld10 - sld15 - sld20 - sld25 - sld30 - sld35 - sldProg;
        sldProg = 0; 
        sld35 = 0;
        sld30 = 0;
        sld25 = 0;
        sld20 = 0;
        sld15 = 0;
        sld10 = 0;
        break;
  }  
  
  if (irReg < 0){irReg = 0};
  return [irReg, sld10, sld15, sld20, sld25, sld30, sld35, sldProg, sldIsen];  
}