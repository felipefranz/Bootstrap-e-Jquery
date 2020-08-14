function DireitoAposent(){

  //Atualiza idade limite participante
  MaxIdade = IdadeAposentadoria > MaxIdade ? IdadeAposentadoria : MaxIdade ; //Valor máximo para idade no slider   

  if (status != 6 && status != 7){
    for (var i = 0; i <= 1000; i++){
      //if ((DataDif(DtAdesao, ProxMes(DtSaldoDIB, i), 1 , 1) > 12 && DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), ProxMes(DtSaldoDIB, i), 1 , 2) >= IdadeAposentadoria)){      
          return ProxMes(DtSaldoDIB, i);
          break;
      //}
    }
  }else{
    return ProxAno(DtSaldoDIB, 1000);  
  }
}