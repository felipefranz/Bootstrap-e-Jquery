<!-- saved from url=(0016)http://localhost -->

function DireitoResgate(){
  var percPartic = 1;
  var percPatroc = 0;
  var TVP = DtDeslig === null ? DataDif(DtAdmissao, DtSaldoDIB, 0 , 4) : DataDif(DtAdmissao, DtDeslig, 0 , 4);
  var indiceResg = 1/180;
  
  TVP = TVP * 12; //Transformando em número de meses
    
  //Percentual Patrocinadora = TVP * indiceResg 
  (TVP * indiceResg > 1) ? percPatroc = 1 : percPatroc = TVP * indiceResg;         
  
  return [percPartic, percPatroc];
}