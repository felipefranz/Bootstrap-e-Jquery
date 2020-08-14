<!-- saved from url=(0016)http://localhost -->

function DireitoResgate(){
  var percPartic = 1;
  var percPatroc = 0;
  var TSC = DtDeslig === null ? DataDif(DtAdmissao, DtSaldoDIB, 1 , 4) : DataDif(DtAdmissao, DtDeslig, 1 , 4);    // TSC em frações de anos
  
if (DtSaldoDIB >= DireitoAposent()){
    percPatroc = 1;    
  }else{    
    switch (true){
      case (TSC < 10):
        percPatroc = 0;
        break;
      case (TSC >= 10 && TSC < 15):
        percPatroc = 0.25;
        break;
      case (TSC >= 15 && TSC < 20):
        percPatroc = 0.5;
        break;  
      case (TSC >= 20):
        percPatroc = 1;
        break;      
    }
  }

  return [percPartic, percPatroc];
}