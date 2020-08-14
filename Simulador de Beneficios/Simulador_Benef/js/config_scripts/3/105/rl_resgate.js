<!-- saved from url=(0016)http://localhost -->

function DireitoResgate(){
  var percPartic = 1;
  var percPatroc = 0;
  var TVP = DtDeslig === null ? DataDif(DtAdesao, DtSaldoDIB, 0 , 1) : DataDif(DtAdesao, DtDeslig, 0 , 1);    // TVP em meses
  var qtdAnos = TVP / 12;
  var NovoRegulamentoResg = null;
  
  NovoRegulamentoResg = novoRegulamentoResg();
  
if (DtSaldoDIB >= DireitoAposent()){
    percPatroc = 1;    
  }else{ 
    if (NovoRegulamentoResg == 0){ //Participante vinculado ao plano at� a data do novo regulamento? 
      for (var i = 1; i <= qtdAnos; i++){  //Soma 2% a cada ano de vincula��o ao plano at� a data de desligamento (qtdAnos)
          if (percPatroc != 0.5){   //Limita percPatroc at� 50% valor m�ximo de recebimento para este tipo de participante 
              percPatroc += 0.02;
           } else {
              percPatroc = 0.5;
           }                                       
        }
    } else { 
      switch (true){
        case (TVP <= 36):
          percPatroc = 0;
          break;
        case (TVP > 36 && TVP <= 120):
          percPatroc = 0.5;
          break;    
        case (TVP > 120):
          percPatroc = 0.75;
          break;      
      }
    } 
  }

  return [percPartic, percPatroc];
}

function novoRegulamentoResg() {
  
    var tempo_serv = DtDeslig === null ? DataDif(DtAdesao, DtSaldoDIB, 0 , 1) : DataDif(DtAdesao, DtDeslig, 0 , 1); // TVP em meses
  
    if (DtAdesao <= new Date(DtEfetPlano) && tempo_serv <= 36){   //Participante inscrito no plano at� a data de aprova��o do novo regulamento 10/12/2009 (data efetiva do novo regulamento) e com at� 3 anos de vincula��o ao plano
      NovoRegulamentoResg = 0;  //Participante inscrito no plano at� a data de aprova��o do novo regulamento 10/12/2009
   } else {
      NovoRegulamentoResg = 1;  //Participante inscrito no plano depois da data de aprova��o do novo regulamento 10/12/2009
   }
      
  return  NovoRegulamentoResg;
}