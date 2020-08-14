function DireitoResgate(){
  var percPartic = 1;
  var percPatroc = 0;
  var TSC = DtDeslig === null ? DataDif(DtAdmissao, DtSaldoDIB, 1 , 4) : DataDif(DtAdmissao, DtDeslig, 1 , 4);
 
/*
if (DtSaldoDIB >= DireitoAposent()){
    percPatroc = 0;    
  }else{    
*/    
    switch (true){
      case (TSC < 1):
        percPatroc = 0;
        break; 
      case (TSC >= 1 && TSC < 2):
        percPatroc = 0.05;
        break; 
      case (TSC >= 2 && TSC < 3):
        percPatroc = 0.10;
        break;
      case (TSC >= 3 && TSC < 4):
        percPatroc = 0.15;      
        break;
      case (TSC >= 4 && TSC < 5):
        percPatroc = 0.2;
        break;
      case (TSC >= 5 && TSC < 6):
        percPatroc = 0.25;
        break;
      case (TSC >= 6 && TSC < 7):
        percPatroc = 0.3;
        break;
      case (TSC >= 7 && TSC < 8):
        percPatroc = 0.35;
        break;  
      case (TSC >= 8 && TSC < 9):
        percPatroc = 0.4;
        break;  
      case (TSC >= 9 && TSC < 10):
        percPatroc = 0.45;
        break;  
      case (TSC >= 10 && TSC < 11):
        percPatroc = 0.5;
        break;  
      case (TSC >= 11 && TSC < 12):
        percPatroc = 0.55;
        break;  
      case (TSC >= 12 && TSC < 13):
        percPatroc = 0.6;
        break;  
      case (TSC >= 13 && TSC < 14):
        percPatroc = 0.65;
        break;  
      case (TSC >= 14):
        percPatroc = 0.7;
        break;  
    }
  //}

  return [percPartic, percPatroc];
}