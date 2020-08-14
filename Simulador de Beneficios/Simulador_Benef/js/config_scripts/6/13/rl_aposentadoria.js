function DireitoAposent(){
  if (status != 6 && status != 7){
    if (TipoParticipante == 9 && DtAdesao <= DtInicialPlano){
      for (var i = 0; i <= 527; i++){      
        if ((DataDif(DtAdmissao, ProxMes(DtSaldoDIB, i), 1 , 1) >= 300 && DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), ProxMes(DtSaldoDIB, i), 1 , 2) >= 50 && DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), ProxMes(DtSaldoDIB, i), 1 , 2) < 55) || 
            (DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), ProxMes(DtSaldoDIB, i), 1 , 2) >= 55)){
          return ProxMes(DtSaldoDIB, i);
          break;
        }
      }
    } else {
      for (var i = 0; i <= 527; i++){      
        if (DataDif(DtAdmissao, ProxMes(DtSaldoDIB, i), 1 , 1) >= 12 && DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), ProxMes(DtSaldoDIB, i), 1 , 2) >= 55){
          return ProxMes(DtSaldoDIB, i);
          break;
        }
      }
    }
  }else{
    return ProxAno(DtSaldoDIB, 1000);  
  }
}