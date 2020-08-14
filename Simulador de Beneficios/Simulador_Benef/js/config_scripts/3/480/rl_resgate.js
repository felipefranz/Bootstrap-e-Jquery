<!-- saved from url=(0016)http://localhost -->

function DireitoResgate(){
  var percPartic = 1;
  var percPatroc = 0;
  var TSC = DtDeslig === null ? DataDif(DtAdmissao, DtSaldoDIB, 1 , 1) : DataDif(DtAdmissao, DtDeslig, 1 , 1);    // TSC em meses
  
//if (DtSaldoDIB >= DireitoAposent()){
   
    switch (true){
      case (TSC <= 60):
        percPatroc = 0.3;
        break;  
      case (TSC > 60 && TSC <= 144):
        percPatroc = 0.5;
        break;
      case (TSC > 144):
        percPatroc = 1;
        break;                             
    }
//  }

  return [percPartic, percPatroc];
}