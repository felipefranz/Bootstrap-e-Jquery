function DireitoAposent(){
  if ((status != 6 || motivo_status == 47) && status != 7){
    for (var i = 0; i <= 527; i++){
      if (DtDeslig === null) {
        if (DataDif(DtAdesao, ProxMes(DtSaldoDIB, i), 1 , 1) >= 60 && DataDif(DtAdmissao, ProxMes(DtSaldoDIB, i), 1 , 1) >= 60 && DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), ProxMes(DtSaldoDIB, i), 1 , 2) >= 55 ||  
            DataDif(DtAdesao, ProxMes(DtSaldoDIB, i), 1 , 1) >= 60 && DataDif(DtAdmissao, ProxMes(DtSaldoDIB, i), 1 , 1) >= 60 && DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), ProxMes(DtSaldoDIB, i), 1 , 2) >= 60) {
            return ProxMes(DtSaldoDIB, i);
            break;
        }
      } else {
        if (DataDif(DtAdesao, ProxMes(DtSaldoDIB, i), 1 , 1) >= 60 && DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), ProxMes(DtSaldoDIB, i), 1 , 2) >= 55 ||  
          DataDif(DtAdesao, ProxMes(DtSaldoDIB, i), 1 , 1) >= 60 && DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), ProxMes(DtSaldoDIB, i), 1 , 2) >= 60) {
          return ProxMes(DtSaldoDIB, i);
          break;
        }
      }
    }
  }else{
    return ProxAno(DtSaldoDIB, 1000);  
  }
}
