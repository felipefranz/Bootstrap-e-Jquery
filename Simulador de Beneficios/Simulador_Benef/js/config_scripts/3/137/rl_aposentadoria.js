<!-- saved from url=(0016)http://localhost -->


function DireitoAposent(){                     

  if (DataDif(new Date(DtEfetPlano), DtAdesao, 0, 0) <= 60 && DtAdmissao < DtPartFundador){   //Participante Fundador � aquele que tenha sido admitido antes de 30/03/1997 e seja efetivo no plano at� 60 dias contados a partir de 01/10/1997 (data efetiva do plano) 
      PartFund = 1;  //Participante fundador
   } else {
      PartFund = 0;  //Participante n�o fundador
   }
  
  if (status != 6 && status != 7){
     if (PartFund == 1){
          for (var i = 0; i <= 527; i++){
            if (DataDif(DtAdesao, ProxMes(DtSaldoDIB, i), 0, 1) >= 60 && DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), ProxMes(DtSaldoDIB, i), 1 , 2) >= 55){
                return ProxMes(DtSaldoDIB, i);
                break;
            }
          }
        } else {
          for (var i = 0; i <= 527; i++){
            if (DataDif(DtAdesao, ProxMes(DtSaldoDIB, i), 0, 1) >= 120 && DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), ProxMes(DtSaldoDIB, i), 1 , 2) >= 55){
                return ProxMes(DtSaldoDIB, i);
                break;
            }
          }
        }  
  }else{
    return ProxAno(DtSaldoDIB, 1000);  
  }
}