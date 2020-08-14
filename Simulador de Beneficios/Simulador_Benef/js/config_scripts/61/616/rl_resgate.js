function DireitoResgate(){
  var TVP = DataDif(DtAdesao, DtSaldoDIB, 1 , 1) >= 36 ? true : false;
  var percPartic = TVP ? 1 : 0;  
  var percPatroc = 0;
  //var TSC = DtDeslig === null ? DataDif(DtAdmissao, DtSaldoDIB, 1 , 4) : DataDif(DtAdmissao, DtDeslig, 1 , 4);
  
  if (DtSaldoDIB >= DireitoAposent()){
    percPartic = 1;
    percPatroc = 0;    
  }else{
    percPatroc = 0;
 /* switch (true){
          case (TSC < 5):
            percPatroc = 0;
            break; 
          case (TSC >= 5 && TSC < 6):
            percPatroc = 0.20;
            break;  
          case (TSC >= 6 && TSC < 7):
            percPatroc = 0.24;
            break;
          case (TSC >= 7 && TSC < 8):
            percPatroc = 0.28;      
            break;
          case (TSC >= 8 && TSC < 9):
            percPatroc = 0.32;
            break;
          case (TSC >= 9 && TSC < 10):
            percPatroc = 0.36;
            break;
          case (TSC >= 10 && TSC < 11):
            percPatroc = 0.40;
            break;
          case (TSC >= 11 && TSC < 12):
            percPatroc = 0.44;
            break;   
          case (TSC >= 12 && TSC < 13):
            percPatroc = 0.48;
            break;   
          case (TSC >= 13 && TSC < 14):
            percPatroc = 0.52;
            break;   
          case (TSC >= 14 && TSC < 15):
            percPatroc = 0.56;
            break;   
          case (TSC >= 15 && TSC < 16):
            percPatroc = 0.60;
            break;
          case (TSC >= 16 && TSC < 17):
            percPatroc = 0.64;
            break;   
          case (TSC >= 17 && TSC < 18):
            percPatroc = 0.68;
            break;
          case (TSC >= 18 && TSC < 19):
            percPatroc = 0.72;
            break;  
          case (TSC >= 19 && TSC < 20):
            percPatroc = 0.76;
            break;  
          case (TSC >= 20 && TSC < 21):
            percPatroc = 0.80;
            break;  
          case (TSC >= 21 && TSC < 22):
            percPatroc = 0.84;
            break;  
          case (TSC >= 22 && TSC < 23):
            percPatroc = 0.88;
            break;  
          case (TSC >= 23 && TSC < 24):
            percPatroc = 0.92;
            break;  
          case (TSC >= 24 && TSC < 25):
            percPatroc = 0.96;
            break;                                                      
          case (TSC >= 25):
            percPatroc = 1;                        
            break;
    } */
  }
  return [percPartic, percPatroc];
}