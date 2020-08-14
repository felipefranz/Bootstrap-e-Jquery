function valida_permissao(){
  switch (status.toString()){
    case "1": //ativo
      switch (motivo_status){
        case "":

        break;
        default:
          $("#secPermission").hide();
          $("#secInfo").show();
          $("#secSaldo").show();
          $("#secContrib").show();
          $("#secSalURP").show();
          //$('#salgrow').prop("selectedIndex", 0);
          $('#fnc1').val() == 0 ? $('#SelecionaBeneficio').prop("selectedIndex", 0) : $('#SelecionaBeneficio').prop("selectedIndex", 1); //Se não for contribuinte funciona como renda financeira
          $("#secMeta2").hide();
          $("#secHipot").show();
          $("#secResgate").show();
          $("#secSaque").show();
          $("#secMsg").show();
          $("#secFoot").show();
        break;
      };
    break;
    case "2": //aguardando benefício diferido
      switch (motivo_status){
        case "":

        break;
        default:
          $("#secPermission").hide();
          $("#secInfo").show();
          $("#grpTermination").show();
          $("#secSaldo").show();
          $("#secContrib").show();
          $("#secSalURP").show();
          //$('#salgrow').prop("selectedIndex", 0);
          //$("#fnc15").html("Aporte Específico");
          ContribCalc[0][0] = 0; //configurado em rl_contribuicao.js          
          $("#tblCtr1").hide();  //configurado em rl_contribuicao.js          
          $('#fnc1').val() == 0 ? $('#SelecionaBeneficio').prop("selectedIndex", 0) : $('#SelecionaBeneficio').prop("selectedIndex", 1); //Se não tiver direito a contribuir funciona como renda financeira
          $("#secMeta2").hide();
          $("#secHipot").show();
          $("#secResgate").show();
          $("#secSaque").show();
          $("#secMsg").show();
          $("#secFoot").show();
        break;
      };
    break;
    case "3": //autopatrocinado
      switch (motivo_status){
        case "":

        break;
        default:
          $("#secPermission").hide();
          $("#secInfo").show();
          $("#grpTermination").show();
          $("#secSaldo").show();
          $("#secContrib").show();
          $("#secSalURP").show();
          $("#fnc17").html("Normal Autopatrocinado");
          //$('#salgrow').prop("selectedIndex", 0);
          ContribCalc[0][1] = 0; //configurado em rl_contribuicao.js          
          $('#fnc1').val() == 0 ? $('#SelecionaBeneficio').prop("selectedIndex", 0) : $('#SelecionaBeneficio').prop("selectedIndex", 1); //Se não for contribuinte funciona como renda financeira
          $("#secMeta2").hide();
          $("#secHipot").show();
          $("#secResgate").show();
          $("#secSaque").show();
          $("#secMsg").show();
          $("#secFoot").show();
        break;
      };
    break;
    case "4": //desligado aguardando
      switch (motivo_status){
        case "":

        break;
        default:
          $("#secPermission").hide();
          $("#secInfo").show();
          $("#secSaldo").show();
          $("#secContrib").show();
          $("#secSalURP").show();
          $("#grpTermination").show();
          //$('#salgrow').prop("selectedIndex", 0);
          $("#secContrib").hide();
          ContribCalc[0][1] = 0; //configurado em rl_contribuicao.js  
          $('#fnc1').val() == 0 ? $('#SelecionaBeneficio').prop("selectedIndex", 0) : $('#SelecionaBeneficio').prop("selectedIndex", 1); //Se não for contribuinte funciona como renda financeira
          $("#secMeta2").hide();
          $("#secHipot").show();
          $("#secResgate").show();
          $("#secSaque").show();
          $("#secMsg").show();
          $("#secFoot").show();
        break;
      };
    break;
    case "5": //empregado não Participante do Plano
      switch (motivo_status){
        case "":

        break;
        default:
          $("#secMeta2").hide();
          //$('#salgrow').prop("selectedIndex", 0);
        break;
      };
    break;
    case "6": //desligado
      switch (motivo_status){
        case "":

        break;
        default:
          $("#secMeta2").hide();
          //$('#salgrow').prop("selectedIndex", 0);
        break;
      };
    break;
    case "7": //excluído do plano
      switch (motivo_status){
        case "":

        break;
        default:
          $("#secMeta2").hide();
          //$('#salgrow').prop("selectedIndex", 0);
        break;
      };
    break;
    case "9": //assistido
      switch (motivo_status){
        case "":

        break;
        default:
          $("#secMeta2").hide();
          //$('#salgrow').prop("selectedIndex", 0);
        break;
      };
    break;
    default:

    break;
  };
}
