function DireitoResgate(){
  var percPartic = 1;
  var percPatroc = 0;
  var TSC = DtDeslig === null ? DataDif(DtAdmissao, DtSaldoDIB, 1 , 1) : DataDif(DtAdmissao, DtDeslig, 1 , 1);    // TSC em meses
  
if (DtSaldoDIB >= DireitoAposent()){
    percPatroc = 1;    
  }else{    
    switch (true){
      case (TSC < 36):
        percPatroc = 0;
        break;
      case (TSC >= 36 && TSC < 48):
        percPatroc = 0.3;
        break;  
      case (TSC >= 48 && TSC < 60):
        percPatroc = 0.4;
        break;  
      case (TSC >= 60 && TSC < 72):
        percPatroc = 0.5;
        break;  
      case (TSC >= 72 && TSC < 84):
        percPatroc = 0.6;
        break;  
      case (TSC >= 84 && TSC < 96):
        percPatroc = 0.7;
        break;  
      case (TSC >= 96 && TSC <= 108):
        percPatroc = 0.8;
        break;              
      case (TSC > 108):
        percPatroc = 0.9;
        break;      
    }
  }

  return [percPartic, percPatroc];
}