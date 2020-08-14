<!-- saved from url=(0016)http://localhost -->

//REGRAS FOLHAPREV
function DireitoAposent(){
  
  //var dtIni = DtAdesao;

  var limiteTempo1 = 120; //tempo em meses
  var limiteIdade1 = 60;  //idade em anos  
  
  var limiteTempo2 = 60; //tempo em meses
  var limiteIdade2 = 55; //idade em anos  
 
  var dtIni = 0;

  if (DataDif(Ncmto, DtAdmissao, 1, 2) < 30) {//TSC só começa a contar a partir dos 30 anos
        var idade30 = new Date(Ncmto.getMonth() + 1 + "/" + Ncmto.getDate() + "/" + (Ncmto.getFullYear() + 30)); 
        dtIni = idade30;
      } else {
        dtIni = DtAdmissao;
      };

  var quinze1Mes = 1;   //1 = 15 dias = 1 mês; 0 = 15 dias != 1 mês

  if (status != 6 && status != 7){
    for (var i = 0; i <= 527; i++){
      if (DataDif(dtIni, ProxMes(DtSaldoDIB, i), quinze1Mes , 1) >= limiteTempo1 && DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), ProxMes(DtSaldoDIB, i), quinze1Mes , 2) >= limiteIdade1 ||  
      DataDif(dtIni, ProxMes(DtSaldoDIB, i), quinze1Mes , 1) >= limiteTempo2  && DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), ProxMes(DtSaldoDIB, i), quinze1Mes , 2) >= limiteIdade2){
          return ProxMes(DtSaldoDIB, i);
          break;
      }
    };
  }else{
    return ProxAno(DtSaldoDIB, 1000);  
  };
};