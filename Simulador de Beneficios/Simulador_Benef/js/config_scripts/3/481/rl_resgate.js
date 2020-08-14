<!-- saved from url=(0016)http://localhost -->

function DireitoResgate(){
  var percPartic = 1;
  var percPatroc = 0;
  var TSC = DtDeslig === null ? DataDif(DtAdmissao, DtSaldoDIB, 1 , 4) : DataDif(DtAdmissao, DtDeslig, 1 , 4);


  if (DtSaldoDIB >= DireitoAposent()){
    percPatroc = 0;
  }else{
    percPatroc = 0;
    /*switch (true){
      case (TSC < 5):
        percPatroc = 0;
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
    }*/
  }
  return [percPartic, percPatroc];
}
