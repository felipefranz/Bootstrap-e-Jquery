<!-- saved from url=(0016)http://localhost -->

function DireitoResgate(){
  var percPartic = 1;
  var percPatroc = 0;
  var TSC = DtDeslig === null ? DataDif(DtAdmissao, DtSaldoDIB, 1 , 4) : DataDif(DtAdmissao, DtDeslig, 1 , 4);
  
if (DtSaldoDIB >= DireitoAposent()){
    percPatroc = 0;    
  }else{
    percPatroc = 0;
/*    switch (true){
      case (TSC < 5):
        percPatroc = 0;
        break;  
      case (TSC >= 5 && TSC < 6):
        percPatroc = 0.05;
        break;
      case (TSC >= 6 && TSC < 7):
        percPatroc = 0.06;      
        break;
      case (TSC >= 7 && TSC < 8):
        percPatroc = 0.07;
        break;
      case (TSC >= 8 && TSC < 9):
        percPatroc = 0.08;
        break;
      case (TSC >= 9 && TSC < 10):
        percPatroc = 0.09;
        break;
      case (TSC >= 10 && TSC < 11):
        percPatroc = 0.10;
        break;  
      case (TSC >= 11 && TSC < 12):
        percPatroc = 0.11;
        break;  
      case (TSC >= 12 && TSC < 13):
        percPatroc = 0.12;
        break;  
      case (TSC >= 13 && TSC < 14):
        percPatroc = 0.13;
        break;  
      case (TSC >= 14 && TSC < 15):
        percPatroc = 0.14;
        break;  
      case (TSC >= 15 && TSC < 16):
        percPatroc = 0.15;
        break;  
      case (TSC >= 16 && TSC < 17):
        percPatroc = 0.16;
        break;  
      case (TSC >= 17 && TSC < 18):
        percPatroc = 0.17;
        break;  
      case (TSC >= 18 && TSC < 19):
        percPatroc = 0.18;
        break;  
      case (TSC >= 19 && TSC < 20):
        percPatroc = 0.19;
        break;                                                                                        
      case (TSC >= 20):
        percPatroc = 0.20;                        
        break;
    } */
  }

  return [percPartic, percPatroc];
}