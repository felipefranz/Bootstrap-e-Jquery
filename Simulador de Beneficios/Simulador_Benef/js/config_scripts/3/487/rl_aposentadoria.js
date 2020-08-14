function DireitoAposent(){
  if (status != 6 && status != 7){
    for (var i = 0; i <= 527; i++){
      if (DataDif(DtAdmissao, ProxMes(DtSaldoDIB, i), 1 , 1) >= 120 && DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), ProxMes(DtSaldoDIB, i), 1 , 2) >= 55){                     
          return ProxMes(DtSaldoDIB, i);
          break;
      }
    }
  }else{
    return ProxAno(DtSaldoDIB, 1000);  
  }
}