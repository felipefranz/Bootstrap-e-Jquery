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
          $("#secSalURP_salary").hide();
          $("#GridResg_line3").hide();
          $("#secMeta1").show();
          //$('#meta').prop("selectedIndex", 5);
          $("#secMeta2").hide();
          //$("#secSaldo_divCompanyBalance").hide();
          //$("#secSaldo_divMyBalance").removeClass("col-sm-4 col-md-4").addClass("col-sm-6 col-md-6");
          //$("#secSaldo_divPortability").removeClass("col-sm-4 col-md-4").addClass("col-sm-6 col-md-6");
          //$('#fnc5').prop("selectedIndex", 1); //configurado em rl_contribuicao.js
          //$('#fnc5').attr("disabled", "disabled"); //configurado em rl_contribuicao.js
          //$('#fnc6').hide(); //configurado em rl_contribuicao.js
          //$('#fnc9').show(); //configurado em rl_contribuicao.js
          //$('#fnc14').hide(); //configurado em rl_contribuicao.js
          //$('#fnc14').show(); //configurado em rl_contribuicao.js
          $("#secHipot").show();
          $("#secResgate").show();
          $("#secSaque").show();
          $("#secMsg").show();
          $("#secFoot").show();
          if(isMobileApp()){
            $("#GridResg_line3_1").hide();
            $("#secTSINSS").hide();             
          }
          if(Deslogado == true){
             //Eventos de Tela
             $("#secInfo_fldStatus").addClass('hide');          
             $("#fldstatus").addClass('hide');  
             $("#grpStatus").addClass('hide');  
             $("#grpAdmission").addClass('hide');  
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
        default:
          $("#secPermission").hide();
          $("#secInfo").show();
          //$("#grpTermination").show();
          $("#secSaldo").show();
          $("#secContrib").hide();
          $("#secSalURP").show();
          $("#secSalURP_salary").hide();
          $("#GridResg_line3").hide();
          $("#secMeta1").show();
          //$('#meta').prop("selectedIndex", 5);
          $("#secMeta2").hide();
          if(isMobileApp()){
            $("#GridResg_line3_1").hide();
            $("#secTSINSS").hide();   
          }
          //$("#secSaldo_divCompanyBalance").hide();
          //$("#secSaldo_divMyBalance").removeClass("col-sm-4 col-md-4").addClass("col-sm-6 col-md-6");
          //$("#secSaldo_divPortability").removeClass("col-sm-4 col-md-4").addClass("col-sm-6 col-md-6");
          ContribCalc[0][0] = 0; //configurado em rl_contribuicao.js
          ContribCalc[1][0] = 0; //configurado em rl_contribuicao.js
          //ContribCalc[3][0] = 0; //configurado em rl_contribuicao.js
          //$("#tblCtr1").hide();  //configurado em rl_contribuicao.js
          //$("#tblCtr2").hide();  //configurado em rl_contribuicao.js
          //$("#tblCtr4").hide();  //configurado em rl_contribuicao.js
          //$('#fnc5').prop("selectedIndex", 1); //configurado em rl_contribuicao.js
          //$('#fnc5').attr("disabled", "disabled"); //configurado em rl_contribuicao.js
          //$('#fnc6').hide(); //configurado em rl_contribuicao.js
          //$('#fnc9').show(); //configurado em rl_contribuicao.js
          //$('#fnc14').hide(); //configurado em rl_contribuicao.js
          //$('#fnc14').show(); //configurado em rl_contribuicao.js
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
          //$("#grpTermination").show();
          $("#secSaldo").show();
          $("#secContrib").show();
          $("#secSalURP").show();
          $("#secSalURP_salary").hide();
          $("#GridResg_line3").hide();
          $("#secMeta1").show();
          //$('#meta').prop("selectedIndex", 5);
          $("#secMeta2").hide();
          if(isMobileApp()){
            $("#GridResg_line3_1").hide();
            $("#secTSINSS").hide();   
          }
          //$("#secSaldo_divCompanyBalance").hide();
          //$("#secSaldo_divMyBalance").removeClass("col-sm-4 col-md-4").addClass("col-sm-6 col-md-6");
          //$("#secSaldo_divPortability").removeClass("col-sm-4 col-md-4").addClass("col-sm-6 col-md-6");
          //ContribCalc[3][0] = 0; //configurado em rl_contribuicao.js
          //$("#tblCtr4").hide();  //configurado em rl_contribuicao.js
          //$('#fnc5').prop("selectedIndex", 1); //configurado em rl_contribuicao.js
          //$('#fnc5').attr("disabled", "disabled"); //configurado em rl_contribuicao.js
          //$('#fnc6').hide(); //configurado em rl_contribuicao.js
          //$('#fnc9').show(); //configurado em rl_contribuicao.js
          //$('#fnc14').hide(); //configurado em rl_contribuicao.js
          //$('#fnc14').show(); //configurado em rl_contribuicao.js
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
          $("#secSalURP_salary").hide();
          $("#GridResg_line3").hide();
          $("#secMeta1").show();
          //$('#meta').prop("selectedIndex", 5);
          $("#secMeta2").hide();
          if(isMobileApp()){
            $("#GridResg_line3_1").hide();
            $("#secTSINSS").hide();   
          }
          $("#secSaldo_divCompanyBalance").hide();
          $("#secSaldo_divMyBalance").removeClass("col-sm-4 col-md-4").addClass("col-sm-6 col-md-6");
          $("#secSaldo_divPortability").removeClass("col-sm-4 col-md-4").addClass("col-sm-6 col-md-6");
        break;
      };
    break;
    case "5": //empregado não Participante do Plano
      switch (motivo_status){
        case "":

        break;
        default:
          $("#secSalURP_salary").hide();
          $("#GridResg_line3").hide();
          $("#secMeta1").show();
          //$('#meta').prop("selectedIndex", 5);
          $("#secMeta2").hide();
          if(isMobileApp()){
            $("#GridResg_line3_1").hide();
            $("#secTSINSS").hide();   
          }
          $("#secSaldo_divCompanyBalance").hide();
          $("#secSaldo_divMyBalance").removeClass("col-sm-4 col-md-4").addClass("col-sm-6 col-md-6");
          $("#secSaldo_divPortability").removeClass("col-sm-4 col-md-4").addClass("col-sm-6 col-md-6");
        break;
      };
    break;
    case "6": //desligado
      switch (motivo_status){
        case "":

        break;
        default:
          $("#secSalURP_salary").hide();
          $("#GridResg_line3").hide();
          $("#secMeta1").show();
          //$('#meta').prop("selectedIndex", 5);
          $("#secMeta2").hide();
          if(isMobileApp()){
            $("#GridResg_line3_1").hide();
            $("#secTSINSS").hide();   
          }
          $("#secSaldo_divCompanyBalance").hide();
          $("#secSaldo_divMyBalance").removeClass("col-sm-4 col-md-4").addClass("col-sm-6 col-md-6");
          $("#secSaldo_divPortability").removeClass("col-sm-4 col-md-4").addClass("col-sm-6 col-md-6");
        break;
      };
    break;
    case "7": //excluído do plano
      switch (motivo_status){
        case "":

        break;
        default:
          $("#secMeta1").show();
          //$('#meta').prop("selectedIndex", 5);
          $("#secMeta2").hide();
          $("#secSaldo_divCompanyBalance").hide();
          $("#secSaldo_divMyBalance").removeClass("col-sm-4 col-md-4").addClass("col-sm-6 col-md-6");
          $("#secSaldo_divPortability").removeClass("col-sm-4 col-md-4").addClass("col-sm-6 col-md-6");
        break;
      };
    break;
    case "9": //assistido
      switch (motivo_status){
        case "":

        break;
        default:
          $("#secMeta1").show();
          //$('#meta').prop("selectedIndex", 5);
          $("#secMeta2").hide();
          $("#secSaldo_divCompanyBalance").hide();
          $("#secSaldo_divMyBalance").removeClass("col-sm-4 col-md-4").addClass("col-sm-6 col-md-6");
          $("#secSaldo_divPortability").removeClass("col-sm-4 col-md-4").addClass("col-sm-6 col-md-6");
        break;
      };
    break;
    default:

    break;
  };
}
