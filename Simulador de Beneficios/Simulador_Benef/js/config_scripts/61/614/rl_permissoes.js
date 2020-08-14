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
          $("#secTSINSS").removeClass("hide");
          $("#GridResg_line3").hide();
	  ValIdade < 58 ? ValIdade = 58 : ValIdade; //inicia o slider em 58 anos
          $('#tsinss').val(TSINSS);
          $("#secValidacao").removeClass("hide");
          $("#secValidacaoTemporario").removeClass("hide");
          $('#secSalURP_urp').hide();
          $('#tblCtr3').hide(); 
          $("#secSaldo_divCompanyBalance").hide();
          $("#secSaldo_divMyBalance").removeClass("col-sm-4 col-md-4").addClass("col-sm-6 col-md-6");
          $("#secSaldo_divPortability").removeClass("col-sm-4 col-md-4").addClass("col-sm-6 col-md-6");
          $("#secMeta1").hide();
          $("#secMeta2").show();
          $('#meta2').prop("selectedIndex", 0);
          $("#secMeta").hide();
          $("#secHipot").show();
          $("#secResgate").show();
          $("#secSaque").show();
          $("#secMsg").show();
          $("#secFoot").show();
          if ($('#tsinss').val() != "" && $('#tsinss').val() != 0) {
              $('#tsinss').attr('disabled', true);
              $("#secTSINSS_msg1").html('Número total de meses de contribuição ao INSS, anterior a data de admissão na patrocinadora do plano PPC.');
          }
          if(isMobileApp()){
            $("#GridResg_line3_1").hide();
            $("#secTSINSS").show();   
          }
          if(Deslogado == true){
             //Eventos de Tela
             $("#secInfo_fldStatus").addClass('hide');          
             $("#fldstatus").addClass('hide');  
             $("#grpStatus").addClass('hide');  
             $("#secSaldo").addClass('hide');  
             $("#secMsg_dtSaldoFoot").addClass('hide');   
             $("#dtSaldoFoot").addClass('hide');
             $("#dtbal").addClass('hide');
             $("#secSaldo_dtbal").addClass('hide');  
             if(isMobileApp()){ 
               adesaoPrintBtn();
             }
          }           
        break;
      };
    break;
    case "2": //aguardando benefício diferido
      switch (motivo_status){
        case "":

        break;
        default:  /*
          $("#secPermission").hide();
          $("#secInfo").show();
          $("#grpTermination").show();
          $("#secSaldo").show();
          $("#secContrib").show();
          $("#secSalURP").show();
          $("#secTSINSS").removeClass("hide");
          $('#gridContrib').hide();
          $('#secSalURP_urp').hide();
          $('#tblCtr3').hide();
          $("#secValidacao").removeClass("hide");
          $("#secValidacaoTemporario").removeClass("hide");
          ContribCalc[0][0] = 0; //configurado em rl_contribuicao.js
          ContribCalc[1][0] = 0; //configurado em rl_contribuicao.js
          ContribCalc[2][0] = 0; //configurado em rl_contribuicao.js
          ContribCalc[3][0] = 0; //configurado em rl_contribuicao.js
          $("#GridResg_line3").hide();
	  ValIdade < 58 ? ValIdade = 58 : ValIdade; //inicia o slider em 58 anos
          $('#tsinss').val(TSINSS);
          if ($('#tsinss').val() != "" && $('#tsinss').val() != 0) {
              $('#tsinss').attr('disabled', true);
              $("#secTSINSS_msg1").html('Número total de meses de contribuição ao INSS, anterior a data de admissão na patrocinadora do plano PPC.');
          }
          if(isMobileApp()){
            $("#GridResg_line3_1").hide();
            $("#secTSINSS").show();   
          }
          $("#secSaldo_divCompanyBalance").hide();
          $("#secSaldo_divMyBalance").removeClass("col-sm-4 col-md-4").addClass("col-sm-6 col-md-6");
          $("#secSaldo_divPortability").removeClass("col-sm-4 col-md-4").addClass("col-sm-6 col-md-6");
          $("#secMeta1").hide();
          $("#secMeta2").show();
          $('#meta2').prop("selectedIndex", 0);
          $("#secMeta").hide();
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
          $("#secPermission").hide();
          $("#secInfo").show();
          $("#grpTermination").show();
          $("#secSaldo").show();
          $("#secContrib").show();
          $("#secSalURP").show();
          $("#secTSINSS").removeClass("hide");
          $("#secValidacao").removeClass("hide");
          $("#secValidacaoTemporario").removeClass("hide");
          ContribCalc[1][1] = 0; //configurado em rl_contribuicao.js
          $('#tsinss').val(TSINSS);
          $('#secSalURP_urp').hide();
          $('#tblCtr3').hide();
          if ($('#tsinss').val() != "" && $('#tsinss').val() != 0) {
              $('#tsinss').attr('disabled', true);
              $("#secTSINSS_msg1").html('Número total de meses de contribuição ao INSS, anterior a data de admissão na patrocinadora do plano PPC.');
          }
          //$("#GridResg_line3").hide();
          $("#secTSINSS").show();   
	  ValIdade < 58 ? ValIdade = 58 : ValIdade; //inicia o slider em 58 anos
          $("#secSaldo_divCompanyBalance").hide();
          $("#secSaldo_divMyBalance").removeClass("col-sm-4 col-md-4").addClass("col-sm-6 col-md-6");
          $("#secSaldo_divPortability").removeClass("col-sm-4 col-md-4").addClass("col-sm-6 col-md-6");
          $("#secMeta1").hide();
          $("#secMeta2").show();
          $('#meta2').prop("selectedIndex", 0);
          $("#secMeta").hide();
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
        break;
      };
    break;
    case "9": //assistido
      switch (motivo_status){
        case "":

        break;
        default:
        break;
      };
    break;
    default:

    break;
  };
}
