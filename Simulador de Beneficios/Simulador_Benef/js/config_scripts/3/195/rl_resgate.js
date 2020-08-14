<!-- saved from url=(0016)http://localhost -->

//REGRAS LUBRIZOL
function DireitoResgate(){
  var percPartic = 1;
  var percPatroc = 0;
  var quinze1Mes = 1;   //1 = 15 dias = 1 mês; 0 = 15 dias != 1 mês
  var TSC = DtDeslig === null ? DataDif(DtAdmissao, DtSaldoDIB, quinze1Mes , 4) : DataDif(DtAdmissao, DtDeslig, quinze1Mes , 4);
  
  if (DtSaldoDIB >= DireitoAposent()){
    percPatroc = 0;    
  }else{
    switch (true){
      case (TSC < 5):
        percPatroc = 0;
        break;  
      case (TSC >= 5 && TSC < 6):
        percPatroc = 0;
        break;
      case (TSC >= 6 && TSC < 7):
        percPatroc = 0;      
        break;
      case (TSC >= 7 && TSC < 8):
        percPatroc = 0;
        break;
      case (TSC >= 8 && TSC < 9):
        percPatroc = 0;
        break;
      case (TSC >= 9 && TSC < 10):
        percPatroc = 0;
        break;
      case (TSC >= 10):
        percPatroc = 0;                        
        break;
    };
  };
  return [percPartic, percPatroc];
};