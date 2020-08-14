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
          $("#secHipot_Avatar").hide();
          //$('#salgrow').prop("selectedIndex", 0);
          //$("#secCrescSal").hide();
          //$('#meta').prop("selectedIndex", 4);
          //ROIam1 = Math.pow((1 + ($('#meta').val() * 1)), (1 / 12)) - 1;
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
          $("#secHipotBenef").hide();
          /*if (motivo_status == 10 ) {            
          //if (rl_BenefMin(0)) {  //verifica se é bm          
            $("#secHipotBenef").hide();   //Esconde opção pelo benefício vitalicio para não-contribuinte
          }*/
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
          $("#secHipot_Avatar").hide();
          //$('#salgrow').prop("selectedIndex", 0);
          //$("#secCrescSal").hide();
          //$('#meta').prop("selectedIndex", 4);
          //ROIam1 = Math.pow((1 + ($('#meta').val() * 1)), (1 / 12)) - 1;
          $("#fnc15").html("Aporte Específico");
          $('#fnc5').removeAttr("disabled");
          ContribCalc[0][0] = 0; //configurado em rl_contribuicao.js
          ContribCalc[1][0] = 0; //configurado em rl_contribuicao.js
          ContribCalc[2][0] = 0; //configurado em rl_contribuicao.js
          $("#tblCtr1").hide();  //configurado em rl_contribuicao.js
          $("#tblCtr2").hide();  //configurado em rl_contribuicao.js
          $("#tblCtr3").hide();  //configurado em rl_contribuicao.js
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
          $("#secHipot_Avatar").hide();
          //$('#salgrow').prop("selectedIndex", 0);
          //$("#secCrescSal").hide();
          //$('#meta').prop("selectedIndex", 4);
          //ROIam1 = Math.pow((1 + ($('#meta').val() * 1)), (1 / 12)) - 1;
          //ContribCalc[3][0] = 0; //configurado em rl_contribuicao.js
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
          $("#secMeta2").hide();
          $("#secHipot_Avatar").hide();
          //$('#salgrow').prop("selectedIndex", 0);
          $('#meta').prop("selectedIndex", 4);
          //$("#secCrescSal").hide();
        break;
      };
    break;
    case "5": //empregado não Participante do Plano
      switch (motivo_status){
        case "":

        break;
        default:
          $("#secMeta2").hide();
          $("#secHipot_Avatar").hide();
          //$('#salgrow').prop("selectedIndex", 0);
          $('#meta').prop("selectedIndex", 4);
          //$("#secCrescSal").hide();
        break;
      };
    break;
    case "6": //desligado
      switch (motivo_status){
        case "":

        break;
        default:
          $("#secMeta2").hide();
          $("#secHipot_Avatar").hide();
          //$('#salgrow').prop("selectedIndex", 0);
          $('#meta').prop("selectedIndex", 4);
          //$("#secCrescSal").hide();
        break;
      };
    break;
    case "7": //excluído do plano
      switch (motivo_status){
        case "":

        break;
        default:
          $("#secMeta2").hide();
          $("#secHipot_Avatar").hide();
          //$('#salgrow').prop("selectedIndex", 0);
          $('#meta').prop("selectedIndex", 4);
          //$("#secCrescSal").hide();
        break;
      };
    break;
    case "9": //assistido
      switch (motivo_status){
        case "":

        break;
        default:
          $("#secMeta2").hide();
          $("#secHipot_Avatar").hide();
          //$('#salgrow').prop("selectedIndex", 0);
          $('#meta').prop("selectedIndex", 4);
          //$("#secCrescSal").hide();
        break;
      };
    break;
    default:

    break;
  };
}
