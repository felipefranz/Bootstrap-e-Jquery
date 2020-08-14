<!-- saved from url=(0016)http://localhost -->

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
          $('#salgrow').prop("selectedIndex", 0);
          //$('#fnc5').prop("selectedIndex", 1); //configurado em rl_contribuicao.js
          //$('#fnc5').attr("disabled", "disabled"); //configurado em rl_contribuicao.js
          //$('#fnc6').hide(); //configurado em rl_contribuicao.js
          //$('#fnc9').show(); //configurado em rl_contribuicao.js
          //$('#fnc14').hide(); //configurado em rl_contribuicao.js
          //$('#fnc14').show(); //configurado em rl_contribuicao.js
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
          $('#salgrow').prop("selectedIndex", 0);
          ContribCalc[0][0] = 0; //configurado em rl_contribuicao.js
          ContribCalc[1][0] = 0; //configurado em rl_contribuicao.js
          ContribCalc[2][0] = 0; //configurado em rl_contribuicao.js
          ContribCalc[3][0] = 0; //configurado em rl_contribuicao.js
          $("#tblCtr1").hide();  //configurado em rl_contribuicao.js
          $("#tblCtr2").hide();  //configurado em rl_contribuicao.js
          $("#tblCtr3").hide();  //configurado em rl_contribuicao.js
          $("#tblCtr4").hide();  //configurado em rl_contribuicao.js
          //$('#fnc5').prop("selectedIndex", 1); //configurado em rl_contribuicao.js
          //$('#fnc5').attr("disabled", "disabled"); //configurado em rl_contribuicao.js
          //$('#fnc6').hide(); //configurado em rl_contribuicao.js
          //$('#fnc9').show(); //configurado em rl_contribuicao.js
          //$('#fnc14').hide(); //configurado em rl_contribuicao.js
          //$('#fnc14').show(); //configurado em rl_contribuicao.js
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
          $('#salgrow').prop("selectedIndex", 0);
          ContribCalc[1][1] = 0; //configurado em rl_contribuicao.js
          //$("#tblCtr4").hide();  //configurado em rl_contribuicao.js
          //$('#fnc5').prop("selectedIndex", 1); //configurado em rl_contribuicao.js
          //$('#fnc5').attr("disabled", "disabled"); //configurado em rl_contribuicao.js
          //$('#fnc6').hide(); //configurado em rl_contribuicao.js
          //$('#fnc9').show(); //configurado em rl_contribuicao.js
          //$('#fnc14').hide(); //configurado em rl_contribuicao.js
          //$('#fnc14').show(); //configurado em rl_contribuicao.js
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
          $("#secContrib").hide();
          $("#secSalURP").show();
          $('#salgrow').prop("selectedIndex", 0);
          ContribCalc[0][0] = 0; //configurado em rl_contribuicao.js
          ContribCalc[1][0] = 0; //configurado em rl_contribuicao.js
          ContribCalc[2][0] = 0; //configurado em rl_contribuicao.js
          ContribCalc[3][0] = 0; //configurado em rl_contribuicao.js
          //$('#fnc5').prop("selectedIndex", 1); //configurado em rl_contribuicao.js
          //$('#fnc5').attr("disabled", "disabled"); //configurado em rl_contribuicao.js
          //$('#fnc6').hide(); //configurado em rl_contribuicao.js
          //$('#fnc9').show(); //configurado em rl_contribuicao.js
          //$('#fnc14').hide(); //configurado em rl_contribuicao.js
          //$('#fnc14').show(); //configurado em rl_contribuicao.js
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
          $('#salgrow').prop("selectedIndex", 0);
        break;
      };
    break;
    case "6": //desligado
      switch (motivo_status){
        case 47:
          $("#secPermission").hide();
          $("#secInfo").show();
          $("#secSaldo").show();
          $("#secContrib").hide();
          $("#secSalURP").show();
          $('#salgrow').prop("selectedIndex", 0);
          ContribCalc[0][0] = 0; //configurado em rl_contribuicao.js
          ContribCalc[1][0] = 0; //configurado em rl_contribuicao.js
          ContribCalc[2][0] = 0; //configurado em rl_contribuicao.js
          ContribCalc[3][0] = 0; //configurado em rl_contribuicao.js
          //$('#fnc5').prop("selectedIndex", 1); //configurado em rl_contribuicao.js
          //$('#fnc5').attr("disabled", "disabled"); //configurado em rl_contribuicao.js
          //$('#fnc6').hide(); //configurado em rl_contribuicao.js
          //$('#fnc9').show(); //configurado em rl_contribuicao.js
          //$('#fnc14').hide(); //configurado em rl_contribuicao.js
          //$('#fnc14').show(); //configurado em rl_contribuicao.js
          $("#secMeta2").hide();
          $("#secHipot").show();
          $("#secResgate").show();
          $("#secSaque").show();
          $("#secMsg").show();
          $("#secFoot").show();
        break;
        default:
          $("#secMeta2").hide();
          $('#salgrow').prop("selectedIndex", 0);
        break;
      };
    break;
    case "7": //excluído do plano
      switch (motivo_status){
        case "":

        break;
        default:
          $("#secMeta2").hide();
          $('#salgrow').prop("selectedIndex", 0);
        break;
      };
    break;
    case "9": //assistido
      switch (motivo_status){
        case "":

        break;
        default:
          $("#secMeta2").hide();
          $('#salgrow').prop("selectedIndex", 0);
        break;
      };
    break;
    default:

    break;
  };
}
