function DireitoAposent(){  
  if (status != 6 && status != 7){

    for (var i = 0; i <= 527; i++) {
      if (DataDif(DtAdesao, ProxMes(DtSaldoDIB, i), 1 , 1) >= 12 && $('#SelecionaBeneficio').val() == 'RendaTemporaria1') {
          //flag de tipo de benefício
          typeBenefCalc = 2;
          return ProxMes(DtSaldoDIB, i);
          break;
      }
    }

    for (var i = 0; i <= 527; i++){
      if ((DataDif(DtAdesao, ProxMes(DtSaldoDIB, i), 1 , 1) >= 120 && DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), ProxMes(DtSaldoDIB, i), 1 , 2) >= 55 && DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), ProxMes(DtSaldoDIB, i), 1 , 2) < (Sexo == 01 ? 65 : 60))){
          //flag de tipo de benefício
          typeBenefCalc = 0;
          return ProxMes(DtSaldoDIB, i);
          break;
      }
    }
    
    for (var i = 0; i <= 527; i++){
      if ((DataDif(DtAdesao, ProxMes(DtSaldoDIB, i), 1 , 1) >= 120 && DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), ProxMes(DtSaldoDIB, i), 1 , 2) >= (Sexo == 01 ? 65 : 60))){
          //flag de tipo de benefício 
          typeBenefCalc = 1;
          return ProxMes(DtSaldoDIB, i);
          break;
      }
    }
  }else{
    return ProxAno(DtSaldoDIB, 1000);  
  }
}