<!-- saved from url=(0016)http://localhost -->

//REGRAS FOLHAPREV
function DireitoResgate(){
  var percPartic = 1;
  var percPatroc = 0;
  var quinze1Mes = 1;   //1 = 15 dias = 1 mês; 0 = 15 dias != 1 mês
  var TSC = 0;
	  
	if (DataDif(Ncmto, DtAdmissao, 1, 2) < 30) {//TSC só começa a contar a partir dos 30 anos
        var idade30 = new Date(Ncmto.getMonth() + 1 + "/" + Ncmto.getDate() + "/" + (Ncmto.getFullYear() + 30)); 
        TSC = DtDeslig === null ? DataDif(idade30, DtSaldoIni, quinze1Mes , 4) : DataDif(idade30, DtDeslig, quinze1Mes , 4);
      } else {
        TSC = DtDeslig === null ? DataDif(DtAdmissao, DtSaldoIni, quinze1Mes , 4) : DataDif(DtAdmissao, DtDeslig, quinze1Mes , 4);
      };
          
  if (DtSaldoDIB >= DireitoAposent()){
    percPatroc = 1;    
  }else{
    switch (true){
      case (TSC < 5):
        percPatroc = 0;
        break;  
      case (TSC >= 5 && TSC < 6):
        percPatroc = 0;
        break;
      case (TSC >= 6 && TSC < 7):
        percPatroc = 0;      
        break;
      case (TSC >= 7 && TSC < 8):
        percPatroc = 0;
        break;
      case (TSC >= 8 && TSC < 9):
        percPatroc = 0;
        break;
      case (TSC >= 9 && TSC < 10):
        percPatroc = 0;
        break;
      case (TSC >= 10):
        percPatroc = 0;                        
        break;
    };
  };
  return [percPartic, percPatroc];
};
