<!-- saved from url=(0016)http://localhost -->

function DireitoResgate(){
  var percPartic = 1;
  var percPatroc = 0;
  //var TSC = DtDeslig === null ? DataDif(DtAdmissao, DtSaldoDIB, 1 , 4) : DataDif(DtAdmissao, DtDeslig, 1 , 4);
  

  if (status == 3){ //Autopatrocinado
     percPatroc = 0.77;
  }

  return [percPartic, percPatroc];
}