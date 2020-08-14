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
          //$('#fnc5').prop("selectedIndex", 0); //configurado em rl_contribuicao.js
          //$('#fnc5').attr("disabled", "disabled"); //configurado em rl_contribuicao.js
          $("#secSaque").show();
          $("#secMeta2").hide();
          $("#secHipot").show();
          $("#secResgate").show();
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
        /*
          $("#secPermission").hide();
          $("#secInfo").show();
          $("#grpTermination").show();
          $("#secSaldo").show();
          $("#secContrib").show();
          ContribCalc[0][0] = 0; //configurado em rl_contribuicao.js
          ContribCalc[1][0] = 0; //configurado em rl_contribuicao.js
          $("#tblCtr1").hide();  //configurado em rl_contribuicao.js
          $("#tblCtr2").hide();  //configurado em rl_contribuicao.js
          $('#fnc5').prop("selectedIndex", 1); //configurado em rl_contribuicao.js
          $('#fnc5').attr("disabled", "disabled"); //configurado em rl_contribuicao.js
          $('#fnc6').hide(); //configurado em rl_contribuicao.js
          $('#fnc9').show(); //configurado em rl_contribuicao.js
          $('#fnc13').hide(); //configurado em rl_contribuicao.js
          $('#fnc14').show(); //configurado em rl_contribuicao.js
          $("#secSaque").show();
          $("#secMeta2").hide();
          $("#secHipot").show();
          $("#secResgate").show();
          $("#secSaque").show();
          $("#secMsg").show();
          $("#secFoot").show();
        */
        break;
      };
    break;
    case "3": //autopatrocinado
      switch (motivo_status){
        case "":

        break;
        default:
          /*
          $("#secPermission").hide();
          $("#secInfo").show();
          $("#grpTermination").show();
          $("#secSaldo").show();
          $("#secContrib").show();
          $("#secSalURP").show();
          $('#fnc5').prop("selectedIndex", 1); //configurado em rl_contribuicao.js
          $('#fnc5').attr("disabled", "disabled"); //configurado em rl_contribuicao.js
          $('#fnc6').hide(); //configurado em rl_contribuicao.js
          $('#fnc9').show(); //configurado em rl_contribuicao.js
          $('#fnc13').hide(); //configurado em rl_contribuicao.js
          $('#fnc14').show(); //configurado em rl_contribuicao.js
          $("#secSaque").show();
          $("#secMeta2").hide();
          $("#secHipot").show();
          $("#secResgate").show();

          $("#secMsg").show();
          $("#secFoot").show(); */
        break;
      };
    break;
    case "4": //desligado aguardando
      switch (motivo_status){
        case "":

        break;
        default:
        /*
	  $("#secPermission").hide();
          $("#secInfo").show();
          $("#secSaldo").show();
          $("#secContrib").show();
          $("#secSalURP").show();
          $('#fnc5').prop("selectedIndex", 1); //configurado em rl_contribuicao.js
          $('#fnc5').attr("disabled", "disabled"); //configurado em rl_contribuicao.js
          $('#fnc6').hide(); //configurado em rl_contribuicao.js
          $('#fnc9').show(); //configurado em rl_contribuicao.js
          $('#fnc13').hide(); //configurado em rl_contribuicao.js
          $('#fnc14').show(); //configurado em rl_contribuicao.js
          $("#secSaque").show();
          $("#secMeta2").hide();
          $("#secHipot").show();
          $("#secResgate").show();
          $("#secMsg").show();
          $("#secFoot").show();
        */
        break;
      };
    break;
    case "5": //empregado não Participante do Plano
      switch (motivo_status){
        case "":

        break;
        default:

        break;
      };
    break;
    case "6": //desligado
      switch (motivo_status){
        case "":

        break;
        default:

        break;
      };
    break;
    case "7": //excluído do plano
      switch (motivo_status){
        case "":

        break;
        default:

	/*
          $("#secPermission").hide();
          $("#secInfo").show();
          $("#secSaldo").show();
          ContribCalc[0][0] = 0; //configurado em rl_contribuicao.js
          ContribCalc[1][0] = 0; //configurado em rl_contribuicao.js
          ContribCalc[2][0] = 0; //configurado em rl_contribuicao.js
          //$("#tblCtr1").hide();  //configurado em rl_contribuicao.js
          //$("#tblCtr2").hide();  //configurado em rl_contribuicao.js
          //$("#tblCtr3").hide();  //configurado em rl_contribuicao.js
          $("#secSaque").show();
          $("#secMeta2").hide();
          $("#secHipot").show();
          $("#secResgate").show();
          $("#secMsg").show();
          $("#secFoot").show();
          */
        break;
      };
    break;
    case "9": //assistido
      switch (motivo_status){
        case "":

        break;
        default:
          /*
          $("#secPermission").hide();
          $("#secInfo").show();
          $("#fnc15").html("Contribuição de Assistido");
          ContribCalc[0][0] = 0; //configurado em rl_contribuicao.js
          ContribCalc[1][0] = 0; //configurado em rl_contribuicao.js
          $("#tblCtr1").hide();  //configurado em rl_contribuicao.js
          $("#tblCtr2").hide();  //configurado em rl_contribuicao.js
          $('#fnc5').prop("selectedIndex", 1); //configurado em rl_contribuicao.js
          $('#fnc5').attr("disabled", "disabled"); //configurado em rl_contribuicao.js
          $('#fnc6').hide(); //configurado em rl_contribuicao.js
          $('#fnc9').show(); //configurado em rl_contribuicao.js
          $('#fnc13').hide(); //configurado em rl_contribuicao.js
          $('#fnc14').show(); //configurado em rl_contribuicao.js
          $("#secContrib").show();
          $("#tamBeneBox").switchClass("col-xs-12 col-sm-6 col-md-6", "col-xs-12 col-sm-12 col-md-12");
          $("#secBenefAnterior").show();
          $("#secMeta2").hide();
          $("#secSaque").show();
          $("#secSimulation").show();
          $("#secMsg").show();
          $("#secFoot").show();
          */
        break;
      };
    break;
    default:

    break;
  };
}
