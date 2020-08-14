<!-- saved from url=(0016)http://localhost -->



function DireitoAposent(){

  if (DataDif(new Date(DtEfetPlano), DtAdesao, 0, 0) <= 90){   //Participante Fundador é aquele que seja efetivo no até 90 dias contados a partir de 04/10/1999 (data efetiva do plano) 
      PartFund = 1;  //Participante fundador
   } else {
      PartFund = 0;  //Participante não fundador
   }
  
  if (status != 6 && status != 7){
     if (PartFund == 1){
          for (var i = 0; i <= 527; i++){
            if (DataDif(DtAdesao, ProxMes(DtSaldoDIB, i), 1 , 1) >= 60 && DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), ProxMes(DtSaldoDIB, i), 1 , 2) >= 60){
                return ProxMes(DtSaldoDIB, i);
                break;
            }
          }
        } else {
          for (var i = 0; i <= 527; i++){
            if (DataDif(DtAdesao, ProxMes(DtSaldoDIB, i), 1 , 1) >= 120 && DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), ProxMes(DtSaldoDIB, i), 1 , 2) >= 60){
                return ProxMes(DtSaldoDIB, i);
                break;
            }
          }
        }  
  }else{
    return ProxAno(DtSaldoDIB, 1000);  
  }
}