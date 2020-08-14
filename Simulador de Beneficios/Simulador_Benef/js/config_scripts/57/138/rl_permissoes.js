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
          $('#fnc5').prop("selectedIndex", 1); //configurado em rl_contribuicao.js
          $('#fnc5').attr("disabled", "disabled"); //configurado em rl_contribuicao.js
          $('#fnc6').hide(); //configurado em rl_contribuicao.js
          $('#fnc9').show(); //configurado em rl_contribuicao.js
          $('#fnc13').hide(); //configurado em rl_contribuicao.js
          $('#fnc14').show(); //configurado em rl_contribuicao.js
          $('#meta').attr("disabled", "disabled");
          $("#secMeta2").hide();
          $("#secHipot").show();
          $("#secResgate").show();
          $("#secSaque").show();
          $("#secBenefApos_info").addClass('hide');                          
          $("#secSaque_rowIrSaque").removeClass('hide');          
          $("#secSaque_rowSLiquido").removeClass('hide');          
          $("#tamBeneBox_rowBenefIrValue").removeClass('hide');          
          $("#tamBeneBox_rowBenefLiquido").removeClass('hide');            
          $("#secMsg").show();
          $("#secFoot").show();
          if(isMobileApp()){
            $("#secSaque_msg1_alert").addClass('hide');
            $("#tamBeneBox_msg1_alert").addClass('hide');
            $("#msgBenefOK2").addClass('hide');
            $("#urp").hide();
            $("#secContrib_urp").hide();
            $("label[for='urp']").hide();
            $("#secMsg_dtSaldoFoot").hide();
            $("#dtSaldoFoot").hide();
            $("#secMsg_dtNowFoot").hide();
            $("#dtNowFoot").hide();
            $("#secSaldo_info").hide();
            $("#secHipot_info").hide();
            $("#stepOne-btn-down").html('<b>Concordo</b>');
            MinIdade = DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), DireitoAposent(), 0, 2);
            $("#stepFive-btn-down-div").addClass("hide");
            $("#stepFive-btn-up-div").removeClass("col-xs-6 col-sm-6 col-md-6").addClass("col-xs-12 col-sm-12 col-md-12");
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
          $('#meta').attr("disabled", "disabled");
          $("#secMeta2").hide();
          $("#secHipot").show();
          $("#secResgate").show();
          $("#secSaque").show();
          $("#secBenefApos_info").addClass('hide');                          
          $("#secSaque_rowIrSaque").removeClass('hide');          
          $("#secSaque_rowSLiquido").removeClass('hide');          
          $("#tamBeneBox_rowBenefIrValue").removeClass('hide');          
          $("#tamBeneBox_rowBenefLiquido").removeClass('hide');             
          $("#secMsg").show();
          $("#secFoot").show();
          if(isMobileApp()){
            $("#secSaque_msg1_alert").addClass('hide');
            $("#tamBeneBox_msg1_alert").addClass('hide');
            $("#msgBenefOK2").addClass('hide');
            $("#urp").hide();
            $("#secContrib_urp").hide();
            $("label[for='urp']").hide();
            $("#secMsg_dtSaldoFoot").hide();
            $("#dtSaldoFoot").hide();
            $("#secMsg_dtNowFoot").hide();
            $("#dtNowFoot").hide();
            $("#secSaldo_info").hide();
            $("#secHipot_info").hide();
            $("#stepOne-btn-down").html('<b>Concordo</b>');
            MinIdade = DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), DireitoAposent(), 0, 2);
            $("#stepFive-btn-down-div").addClass("hide");
            $("#stepFive-btn-up-div").removeClass("col-xs-6 col-sm-6 col-md-6").addClass("col-xs-12 col-sm-12 col-md-12");
          }
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
          $('#fnc5').prop("selectedIndex", 1); //configurado em rl_contribuicao.js
          $('#fnc5').attr("disabled", "disabled"); //configurado em rl_contribuicao.js
          $('#fnc6').hide(); //configurado em rl_contribuicao.js
          $('#fnc9').show(); //configurado em rl_contribuicao.js
          $('#fnc13').hide(); //configurado em rl_contribuicao.js
          $('#fnc14').show(); //configurado em rl_contribuicao.js
          $('#meta').attr("disabled", "disabled");
          $("#secMeta2").hide();
          $("#secHipot").show();
          $("#secResgate").show();
          $("#secSaque").show();
          $("#secBenefApos_info").addClass('hide');                         
          $("#secSaque_rowIrSaque").removeClass('hide');          
          $("#secSaque_rowSLiquido").removeClass('hide');          
          $("#tamBeneBox_rowBenefIrValue").removeClass('hide');          
          $("#tamBeneBox_rowBenefLiquido").removeClass('hide');        
          $("#secMsg").show();
          $("#secFoot").show();
          if(isMobileApp()){
            $("#secSaque_msg1_alert").addClass('hide');
            $("#tamBeneBox_msg1_alert").addClass('hide');
            $("#msgBenefOK2").addClass('hide');
            $("#urp").hide();
            $("#secContrib_urp").hide();
            $("label[for='urp']").hide();
            $("#secMsg_dtSaldoFoot").hide();
            $("#dtSaldoFoot").hide();
            $("#secMsg_dtNowFoot").hide();
            $("#dtNowFoot").hide();
            $("#secSaldo_info").hide();
            $("#secHipot_info").hide();
            $("#stepOne-btn-down").html('<b>Concordo</b>');
            MinIdade = DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), DireitoAposent(), 0, 2);
            $("#stepFive-btn-down-div").addClass("hide");
            $("#stepFive-btn-up-div").removeClass("col-xs-6 col-sm-6 col-md-6").addClass("col-xs-12 col-sm-12 col-md-12");
          }
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
          $('#fnc5').prop("selectedIndex", 1); //configurado em rl_contribuicao.js
          $('#fnc5').attr("disabled", "disabled"); //configurado em rl_contribuicao.js
          $('#fnc6').hide(); //configurado em rl_contribuicao.js
          $('#fnc9').show(); //configurado em rl_contribuicao.js
          $('#fnc13').hide(); //configurado em rl_contribuicao.js
          $('#fnc14').show(); //configurado em rl_contribuicao.js
          $('#meta').attr("disabled", "disabled");
          $("#secMeta2").hide();
          $("#secHipot").show();
          $("#secResgate").show();
          $("#secSaque").show();
          $("#secBenefApos_info").addClass('hide');                         
          $("#secSaque_rowIrSaque").removeClass('hide');          
          $("#secSaque_rowSLiquido").removeClass('hide');          
          $("#tamBeneBox_rowBenefIrValue").removeClass('hide');          
          $("#tamBeneBox_rowBenefLiquido").removeClass('hide');           
          $("#secMsg").show();
          $("#secFoot").show();
          if(isMobileApp()){
            $("#secSaque_msg1_alert").addClass('hide');
            $("#tamBeneBox_msg1_alert").addClass('hide');
            $("#msgBenefOK2").addClass('hide');
            $("#urp").hide();
            $("#secContrib_urp").hide();
            $("label[for='urp']").hide();
            $("#secMsg_dtSaldoFoot").hide();
            $("#dtSaldoFoot").hide();
            $("#secMsg_dtNowFoot").hide();
            $("#dtNowFoot").hide();
            $("#secSaldo_info").hide();
            $("#secHipot_info").hide();
            $("#stepOne-btn-down").html('<b>Concordo</b>');
            MinIdade = DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), DireitoAposent(), 0, 2);
            $("#stepFive-btn-down-div").addClass("hide");
            $("#stepFive-btn-up-div").removeClass("col-xs-6 col-sm-6 col-md-6").addClass("col-xs-12 col-sm-12 col-md-12");
          }
        break;
      };
    break;
    case "5": //empregado não Participante do Plano
      switch (motivo_status){
        case "":

        break;
        default:
           $("#secPermission").show();
        break;
      };
    break;
    case "6": //desligado
      switch (motivo_status){
        case 49: //49 - Ativo - Falecido
            $("#secPermission").hide();
            $("#secInfo").show();
            $("#secSaldo").show();
            $("#secContrib").hide();
            $("#secSalURP").show();
            ContribCalc[0][0] = 0; //configurado em rl_contribuicao.js
            ContribCalc[1][0] = 0; //configurado em rl_contribuicao.js
            ContribCalc[2][0] = 0; //configurado em rl_contribuicao.js
            $('#fnc5').prop("selectedIndex", 1); //configurado em rl_contribuicao.js
            $('#fnc5').attr("disabled", "disabled"); //configurado em rl_contribuicao.js
            $('#fnc6').hide(); //configurado em rl_contribuicao.js
            $('#fnc9').show(); //configurado em rl_contribuicao.js
            $('#fnc13').hide(); //configurado em rl_contribuicao.js
            $('#fnc14').show(); //configurado em rl_contribuicao.js
            $('#meta').attr("disabled", "disabled");
            $("#secMeta2").hide();
            $("#secHipot").show();
            $("#secResgate").show();
            $("#secSaque").show();
            $("#secBenefApos_info").addClass('hide');                          
            $("#secSaque_rowIrSaque").removeClass('hide');          
            $("#secSaque_rowSLiquido").removeClass('hide');          
            $("#tamBeneBox_rowBenefIrValue").removeClass('hide');          
            $("#tamBeneBox_rowBenefLiquido").removeClass('hide');            
            $("#secMsg").show();
            $("#secFoot").show();
            if(isMobileApp()){
              $("#secSaque_msg1_alert").addClass('hide');
              $("#tamBeneBox_msg1_alert").addClass('hide');
              $("#msgBenefOK2").addClass('hide');
              $("#urp").hide();
              $("#secContrib_urp").hide();
              $("label[for='urp']").hide();
              $("#secMsg_dtSaldoFoot").hide();
              $("#dtSaldoFoot").hide();
              $("#secMsg_dtNowFoot").hide();
              $("#dtNowFoot").hide();
              $("#secSaldo_info").hide();
              $("#secHipot_info").hide();
              $("#stepOne-btn-down").html('<b>Concordo</b>');
              MinIdade = DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), DireitoAposent(), 0, 2);
              $("#stepFive-btn-down-div").addClass("hide");
              $("#stepFive-btn-up-div").removeClass("col-xs-6 col-sm-6 col-md-6").addClass("col-xs-12 col-sm-12 col-md-12");
            }
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
          $('#meta').attr("disabled", "disabled");
          $("#secMeta2").hide();
          $("#secHipot").show();
          $("#secResgate").show();
          $("#secSaque").show();
          $("#secBenefApos_info").addClass('hide');                          
          $("#secSaque_rowIrSaque").removeClass('hide');          
          $("#secSaque_rowSLiquido").removeClass('hide');          
          $("#tamBeneBox_rowBenefIrValue").removeClass('hide');          
          $("#tamBeneBox_rowBenefLiquido").removeClass('hide');            
          $("#secMsg").show();
          $("#secFoot").show();
          if(isMobileApp()){
            $("#secSaque_msg1_alert").addClass('hide');
            $("#tamBeneBox_msg1_alert").addClass('hide');
            $("#msgBenefOK2").addClass('hide');
            $("#urp").hide();
            $("#secContrib_urp").hide();
            $("label[for='urp']").hide();
            $("#secMsg_dtSaldoFoot").hide();
            $("#dtSaldoFoot").hide();
            $("#secMsg_dtNowFoot").hide();
            $("#dtNowFoot").hide();
            $("#secSaldo_info").hide();
            $("#secHipot_info").hide();
            $("#stepOne-btn-down").html('<b>Concordo</b>');
            MinIdade = DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), DireitoAposent(), 0, 2);
            $("#stepFive-btn-down-div").addClass("hide");
            $("#stepFive-btn-up-div").removeClass("col-xs-6 col-sm-6 col-md-6").addClass("col-xs-12 col-sm-12 col-md-12");
          }
          */
          $("#secPermission").show();
        break;
      };
    break;
    case "7": //excluído do plano
      switch (motivo_status){
        case "":

        break;
        default:
          $("#secPermission").hide();
          $("#secInfo").show();
          $("#secSaldo").show();
          ContribCalc[0][0] = 0; //configurado em rl_contribuicao.js
          ContribCalc[1][0] = 0; //configurado em rl_contribuicao.js
          ContribCalc[2][0] = 0; //configurado em rl_contribuicao.js
          //$("#tblCtr1").hide();  //configurado em rl_contribuicao.js
          //$("#tblCtr2").hide();  //configurado em rl_contribuicao.js
          //$("#tblCtr3").hide();  //configurado em rl_contribuicao.js
          $('#meta').attr("disabled", "disabled");
          $("#secMeta2").hide();
          $("#secHipot").show();
          $("#secBenefApos_info").addClass('hide');                         
          $("#secSaque_rowIrSaque").removeClass('hide');          
          $("#secSaque_rowSLiquido").removeClass('hide');          
          $("#tamBeneBox_rowBenefIrValue").removeClass('hide');          
          $("#tamBeneBox_rowBenefLiquido").removeClass('hide');            
          $("#secResgate").show();
          $("#secMsg").show();
          $("#secFoot").show();
          if(isMobileApp()){
            $("#secSaque_msg1_alert").addClass('hide');
            $("#tamBeneBox_msg1_alert").addClass('hide');
            $("#msgBenefOK2").addClass('hide');
            $("#urp").hide();
            $("#secContrib_urp").hide();
            $("label[for='urp']").hide();
            $("#secMsg_dtSaldoFoot").hide();
            $("#dtSaldoFoot").hide();
            $("#secMsg_dtNowFoot").hide();
            $("#dtNowFoot").hide();
            $("#secSaldo_info").hide();
            $("#secHipot_info").hide();
            $("#stepOne-btn-down").html('<b>Concordo</b>');
            MinIdade = DataDif(new Date(Ncmto.getMonth() + 1 + "/01/" + Ncmto.getFullYear()), DireitoAposent(), 0, 2);
            $("#stepFive-btn-down-div").addClass("hide");
            $("#stepFive-btn-up-div").removeClass("col-xs-6 col-sm-6 col-md-6").addClass("col-xs-12 col-sm-12 col-md-12");
          }
        break;
      };
    break;
    case "9": //assistido
      switch (motivo_status){
        case "":
        break;
        default:
        if ((motivo_status != 58 && motivo_status != 82) || (isAdmin)){ //só exibe simulação de falecido se for admin, participante falecido bloqueia
          $("#secPermission").hide();
          $("#secInfo").show();
          $("#fnc15").html("Contribui&ccedil;&atilde;o de Assistido");
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
          (motivo_status != 58 && motivo_status != 82) ? $("#secContrib").show() : $("#secContrib").hide();
          $("#tamBeneBox").switchClass("col-xs-12 col-sm-6 col-md-6", "col-xs-12 col-sm-12 col-md-12");
          if(CampAlterBeneficio && (motivo_status != 58 && motivo_status != 82)) { //Ativador no config_var.js
            $('#tamBeneBox').append(secCampEmprestimoValida_msg1); 
            $('#secCampEmprestimoValida').hide(); 
            $('#tamBeneBox').append(secAltBenef);
            $('#secAltBenef').show(); //Exibe div alteracao de beneficio             
            if(isMobileApp()){
               $('#secAltBenef').addClass("hide");
            }                      
          }
          $("#secBenefAnterior").show();
          $('#meta').attr("disabled", "disabled");
          $("#secMeta2").hide();
          $("#secSimulation").show();
          $("#secBenefApos_info").addClass('hide');                      
          $("#secSaque_rowIrSaque").removeClass('hide');          
          $("#secSaque_rowSLiquido").removeClass('hide');          
          $("#tamBeneBox_rowBenefIrValue").removeClass('hide');          
          $("#tamBeneBox_rowBenefLiquido").removeClass('hide');    
          $("#secMsg").show();
          $("#secFoot").show();
          if (motivo_status == 57 || motivo_status == 61) {
            ValPerc = 0.5;       //setar os valores iniciais
            ValPrazo = 20;       //setar os valores iniciais
            $("#slider").slider({ disabled: true });   //bloquear barra de benefício 
          }
          if(isMobileApp()){
            $("#secSaque_msg1_alert").addClass('hide');
            $("#tamBeneBox_msg1_alert").addClass('hide');
            $("#urp").hide();
            $("#secContrib_urp").hide();
            $("#secMsg_dtSaldoFoot").hide();
            $("#dtSaldoFoot").hide();
            $("#secMsg_dtNowFoot").hide();
            $("#dtNowFoot").hide();
            $("#secSaldo_info").hide();
            $("#secHipot_info").hide();
            $("#stepOne-btn-down").html('<b>Concordo</b>');
          }
        }
        break;
      };
    break;
    default:

    break;
  };
}
