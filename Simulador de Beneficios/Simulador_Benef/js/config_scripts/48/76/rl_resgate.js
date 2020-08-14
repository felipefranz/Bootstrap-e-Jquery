<!-- saved from url=(0016)http://localhost -->

function DireitoResgate(){
  var percPartic = 0;
  var percPatroc = 0;     
  var TVP = (DtDeslig === null || status == 3) ? Math.min(DataDif(DtInicialTVP, DtSaldoDIB, 1 , 4), 30) : Math.min(DataDif(DtInicialTVP, DtDeslig, 1 , 4), 30);
  
  if (DtSaldoDIB >= DireitoAposent()){
    percPartic = 1;
    percPatroc = 0;    
  }else{
    if (TVP >= 3){
      percPartic = 1;
      percPatroc = 0;
    }
    /*switch (true){
          case (TVP >= 5):
            percPatroc = 0.20;
            break;  
          case (TVP >= 6 && TVP < 7):
            percPatroc = 0.24;
            break;
          case (TVP >= 7 && TVP < 8):
            percPatroc = 0.28;      
            break;
          case (TVP >= 8 && TVP < 9):
            percPatroc = 0.32;
            break;
          case (TVP >= 9 && TVP < 10):
            percPatroc = 0.36;
            break;
          case (TVP >= 10 && TVP < 11):
            percPatroc = 0.40;
            break;
          case (TVP >= 11 && TVP < 12):
            percPatroc = 0.44;
            break;   
          case (TVP >= 12 && TVP < 13):
            percPatroc = 0.48;
            break;   
          case (TVP >= 13 && TVP < 14):
            percPatroc = 0.52;
            break;   
          case (TVP >= 14 && TVP < 15):
            percPatroc = 0.56;
            break;   
          case (TVP >= 15 && TVP < 16):
            percPatroc = 0.60;
            break;
          case (TVP >= 16 && TVP < 17):
            percPatroc = 0.64;
            break;   
          case (TVP >= 17 && TVP < 18):
            percPatroc = 0.68;
            break;
          case (TVP >= 18 && TVP < 19):
            percPatroc = 0.72;
            break;  
          case (TVP >= 19 && TVP < 20):
            percPatroc = 0.76;
            break;  
          case (TVP >= 20 && TVP < 21):
            percPatroc = 0.80;
            break;  
          case (TVP >= 21 && TVP < 22):
            percPatroc = 0.84;
            break;  
          case (TVP >= 22 && TVP < 23):
            percPatroc = 0.88;
            break;  
          case (TVP >= 23 && TVP < 24):
            percPatroc = 0.92;
            break;  
          case (TVP >= 24 && TVP < 25):
            percPatroc = 0.96;
            break;                                                      
          case (TVP >= 25):
            percPatroc = 1;                        
            break;
    } */
  }
  return [percPartic, percPatroc];
}