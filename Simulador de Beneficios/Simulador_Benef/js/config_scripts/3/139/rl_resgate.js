<!-- saved from url=(0016)http://localhost -->

function DireitoResgate(){
  var percPartic = 1;
  var percPatroc = 0;
  var TSC = DtDeslig === null ? DataDif(DtAdmissao, DtSaldoDIB, 1 , 2) : DataDif(DtAdmissao, DtDeslig, 1 , 4);
  
if (DtSaldoDIB >= DireitoAposent()){
    percPatroc = 1;    
  }else{
  switch (true){
      case (TSC < 5):
        percPatroc = 0;
        break;  
      case (TSC >= 5 && TSC < 6):
        percPatroc = 0.25;
        break;
      case (TSC >= 6 && TSC < 7):
        percPatroc = 0.30;      
        break;
      case (TSC >= 7 && TSC < 8):
        percPatroc = 0.35;
        break;
      case (TSC >= 8 && TSC < 9):
        percPatroc = 0.40;
        break;
      case (TSC >= 9 && TSC < 10):
        percPatroc = 0.45;
        break;
      case (TSC >= 10):
        percPatroc = 1;
        break;
    } 
  }

  return [percPartic, percPatroc];
}