<!-- saved from url=(0016)http://localhost -->

function DireitoResgate(){
  var percPartic = 1;
  var percPatroc = 0;
  var TSC = DtDeslig === null ? DataDif(DtAdesao, DtSaldoDIB, 0 , 4) : DataDif(DtAdesao, DtDeslig, 0 , 4);
  
  
  if (DtSaldoDIB >= DireitoAposent()){
    percPatroc = 1;    
  }else{
    switch (true){
      case (TSC < 1):
        percPatroc = 0;
        break;  
      case (TSC >= 1 && TSC < 2):
        percPatroc = 0.05;
        break;
      case (TSC >= 2 && TSC < 5):
        percPatroc = 0.1;      
        break;
      case (TSC >= 5 && TSC < 8):
        percPatroc = 0.4;
        break;
      case (TSC >= 8 && TSC < 10):
        percPatroc = 0.6;
        break;
      case (TSC >= 10 && TSC < 12):
        percPatroc = 0.8;
        break;
      case (TSC >= 12):
        percPatroc = 1;                        
        break;
    }
  }
  return [percPartic, percPatroc];
}