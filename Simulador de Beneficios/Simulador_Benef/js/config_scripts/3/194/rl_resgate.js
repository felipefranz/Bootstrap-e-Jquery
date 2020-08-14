<!-- saved from url=(0016)http://localhost -->

//REGRAS BROOKFIELD
function DireitoResgate(){
  var percPartic = 1;
  var percPatroc = 0;
  var quinze1Mes = 1;   //1 = 15 dias = 1 mês; 0 = 15 dias != 1 mês
  var TSC = DtDeslig === null ? DataDif(DtAdmissao, DtSaldoDIB, quinze1Mes , 4) : DataDif(DtAdmissao, DtDeslig, quinze1Mes , 4);
  
  if (DtSaldoDIB >= DireitoAposent()){
    percPatroc = 1;    
  }else{
    switch (true){
      case (TSC < 3):
        percPatroc = 0;
        break;  
      case (TSC >= 3 && TSC < 4):
        percPatroc = 0.3;
        break;
      case (TSC >= 4 && TSC < 5):
        percPatroc = 0.4;      
        break;
      case (TSC >= 5 && TSC < 6):
        percPatroc = 0.5;
        break;
      case (TSC >= 6 && TSC < 7):
        percPatroc = 0.6;
        break;
      case (TSC >= 7 && TSC < 8):
        percPatroc = 0.7;
        break;
      case (TSC >= 8 && TSC < 9):
        percPatroc = 0.8;
        break;
      case (TSC >= 9 && TSC < 10):
        percPatroc = 0.9;
        break;
      case (TSC >= 10):
        percPatroc = 1;                        
        break;
    };
  };
  return [percPartic, percPatroc];
};