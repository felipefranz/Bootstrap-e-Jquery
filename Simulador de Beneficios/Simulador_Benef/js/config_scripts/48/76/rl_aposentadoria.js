<!-- saved from url=(0016)http://localhost -->

function DireitoAposent(){
  //if (status != 6 && status != 7){
    for (var i = 0; i <= 527; i++){
      if ((DataDif(DtAdesao, ProxMes(DtSaldoDIB, i), 1 , 1) >= 60 && DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), ProxMes(DtSaldoDIB, i), 1 , 2) >= 50 && DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), ProxMes(DtSaldoDIB, i), 1 , 2) < 60) || 
          (DataDif(DtAdesao, ProxMes(DtSaldoDIB, i), 1 , 1) >= 60 && DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), ProxMes(DtSaldoDIB, i), 1 , 2) >= 60)){
          return ProxMes(DtSaldoDIB, i);
          break;
      }
    }
  //}else{
    //return ProxAno(DtSaldoDIB, 1000);  
  //}
}