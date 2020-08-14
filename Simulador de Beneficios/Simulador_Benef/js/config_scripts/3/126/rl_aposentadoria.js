<!-- saved from url=(0016)http://localhost -->

//REGRAS NOKIA
function DireitoAposent(){
  //var dtIni = DtAdmissao;
  var dtIni = DtAdesao;
  var quinze1Mes = 1;   //1 = 15 dias = 1 mês; 0 = 15 dias != 1 mês
  
  var limiteTempo1 = 36; //tempo em meses
  var limiteIdade1 = 55;  //idade em anos
  
  var limiteTempo2 = 60; //tempo em meses
  var limiteIdade2 = 60; //idade em anos 

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