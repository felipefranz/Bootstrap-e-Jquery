function DireitoResgate(){
  var percPartic = 1;
  var percPatroc = 0;
  var TVP = DtDeslig === null ? DataDif(DtAdesao, DtSaldoDIB, 0 , 4) : DataDif(DtAdesao, DtDeslig, 0 , 4);
  
  if (checkBasica() == 0){ //Retorna Qtd de contribuições Básicas Participante
    percPatroc = 0;    
  } else {
    switch (true){
      case (TVP < 5):
        percPatroc = 0;
        break;  
      case (TVP >= 5 && TVP < 6):
        percPatroc = 0.25;
        break;
      case (TVP >= 6 && TVP < 7):
        percPatroc = 0.30;      
        break;
      case (TVP >= 7 && TVP < 8):
        percPatroc = 0.35;
        break;
      case (TVP >= 8 && TVP < 9):
        percPatroc = 0.40;
        break;
      case (TVP >= 9 && TVP < 10):
        percPatroc = 0.45;
        break;
      case (TVP >= 10):
        percPatroc = 0.50;
        break;  
    }
  }
  return [percPartic, percPatroc];
}