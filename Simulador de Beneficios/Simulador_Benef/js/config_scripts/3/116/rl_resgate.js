<!-- saved from url=(0016)http://localhost -->

function DireitoResgate(){
  var percPartic = 1;
  var percPatroc = 0;
  var TVP = DtDeslig === null ? DataDif(DtAdesao, DtSaldoDIB, 1 , 1) : DataDif(DtAdesao, DtDeslig, 1 , 1);    // TVP em meses
  
//if (DtSaldoDIB >= DireitoAposent()){
 //   percPatroc = 1;    
 // }else{    
    switch (true){
      case (TVP <= 60):
        percPatroc = 0.3;
        break;  
      case (TVP > 60 && TVP <= 120):
        percPatroc = 0.5;
        break; 
      case (TVP > 120):
        percPatroc = 1;
        break;      
    }
 // }

  return [percPartic, percPatroc];
}