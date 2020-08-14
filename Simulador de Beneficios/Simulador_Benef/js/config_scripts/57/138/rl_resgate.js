function DireitoResgate(){
  var percPartic = 1;
  var percPatroc = 0;
  var TSC = DtDeslig === null ? DataDif(DtAdmissao, DtSaldoDIB, 0 , 4) : DataDif(DtAdmissao, DtDeslig, 0 , 4);
  
  if (DtSaldoDIB >= DireitoAposent() && motivo_status != 49){ //49 - Ativo - Falecido
    percPatroc = 1;    
  }else{
    switch (true){
      case (TSC <= 3):
        percPatroc = 0;
        break;  
      case (TSC > 3 && TSC <= 5):
        percPatroc = 0.15;
        break;
      case (TSC > 5 && TSC <= 9):
        percPatroc = 0.25;      
        break;
      case (TSC > 9 && TSC <= 12):
        percPatroc = 0.35;
        break;
      case (TSC > 12 && TSC <= 15):
        percPatroc = 0.45;
        break;
      case (TSC > 15 && TSC <= 20):
        percPatroc = 0.65;
        break;
      case (TSC > 20):
        percPatroc = 0.75;                        
        break;
    }
  }
  return [percPartic, percPatroc];
}