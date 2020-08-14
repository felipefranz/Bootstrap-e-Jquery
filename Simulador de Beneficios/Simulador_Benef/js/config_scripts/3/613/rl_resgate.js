function DireitoResgate(){
  var percPartic = 1;
  var percPatroc = 0;
  var TSC = DtDeslig === null ? DataDif(DtAdmissao, DtSaldoDIB, 1 , 4) : DataDif(DtAdmissao, DtDeslig, 1 , 4);
  
if (DtSaldoDIB >= DireitoAposent()){
    percPatroc = 0;    
  }else{
    percPatroc = 0;
   switch (true){
      case (TSC >= 4):
        percPatroc = 0.125;
        break;  
      case (TSC >= 4 && TSC < 5):
        percPatroc = 0.15;
        break;
      case (TSC >= 5 && TSC < 6):
        percPatroc = 0.175;      
        break;
      case (TSC >= 6 && TSC < 7):
        percPatroc = 0.20;
        break;
      case (TSC >= 7 && TSC < 8):
        percPatroc = 0.225;
        break;
      case (TSC >= 8 && TSC < 9):
        percPatroc = 0.25;
        break;
      case (TSC >= 9 && TSC < 10):
        percPatroc = 0.275;
        break;  
      case (TSC >= 10 && TSC < 11):
        percPatroc = 0.30;
        break;  
      case (TSC >= 11 && TSC < 12):
        percPatroc = 0.325;
        break;  
      case (TSC >= 12 && TSC < 13):
        percPatroc = 0.35;
        break;    
      case (TSC >= 13):
        percPatroc = 0.375;
        break;      
    } 
  }

  return [percPartic, percPatroc];
}