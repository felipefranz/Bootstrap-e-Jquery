function DireitoResgate(){
  var percPartic = 1;
  var percPatroc = 0;
  var TSC = DtDeslig === null ? DataDif(DtAdmissao, DtSaldoDIB, 1 , 4) : DataDif(DtAdmissao, DtDeslig, 1 , 4);
  
  //if (DtSaldoDIB >= DireitoAposent()){
  //  percPatroc = 1;    
    
  //}else{

switch (true){
      case (TSC < 3):
        percPatroc = 0;
        break;  
      case (TSC >= 3 && TSC < 4):
        percPatroc = 0.10;
        break;
      case (TSC >= 4 && TSC < 5):
        percPatroc = 0.15;      
        break;
      case (TSC >= 5 && TSC < 6):
        percPatroc = 0.20;
        break;
      case (TSC >= 6 && TSC < 7):
        percPatroc = 0.28;
        break;
      case (TSC >= 7 && TSC < 8):
        percPatroc = 0.36;
        break;
      case (TSC >= 8 && TSC < 9):
        percPatroc = 0.44;
        break;   
      case (TSC >= 9 && TSC < 10):
        percPatroc = 0.52;
        break;   
      case (TSC >= 10 && TSC < 11):
        percPatroc = 0.60;
        break;   
      case (TSC >= 11 && TSC < 12):
        percPatroc = 0.68;
        break;   
      case (TSC >= 12 && TSC < 13):
        percPatroc = 0.76;
        break;
      case (TSC >= 13 && TSC < 14):
        percPatroc = 0.84;
        break;   
      case (TSC >= 14 && TSC < 15):
        percPatroc = 0.92;
        break;                                                        
      case (TSC >= 15):
        percPatroc = 1;                        
        break;
    }
  //}
  return [percPartic, percPatroc];
}