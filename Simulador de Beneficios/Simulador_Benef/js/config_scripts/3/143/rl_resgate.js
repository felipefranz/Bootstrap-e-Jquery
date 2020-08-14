<!-- saved from url=(0016)http://localhost -->

function DireitoResgate(){
  var percPartic = 1;
  var percPatroc = 0;
  var TSC = DtDeslig === null ? DataDif(DtAdmissao, DtSaldoDIB, 1 , 1) : DataDif(DtAdmissao, DtDeslig, 1 , 1);    // TSC em meses
  
if (DtSaldoDIB >= DireitoAposent()){
     percPatroc = 1;   
    }else{    
    switch (true){
      case (TSC <= 60):
        percPatroc = 0;
        break;  
      case (TSC > 60 && TSC <= 120):
        percPatroc = 0.2;
        break; 
      case (TSC > 120 && TSC <= 180):
        percPatroc = 0.4;
        break; 
      case (TSC > 180 && TSC <= 240):
        percPatroc = 0.6;
        break;
      case (TSC > 240  && TSC <= 300):
        percPatroc = 0.8;
        break;
      case (TSC > 300):
        percPatroc = 1;
        break;      
     }
   }

  return [percPartic, percPatroc];
}