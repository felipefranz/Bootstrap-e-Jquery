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
          ContribCalc[0][0] = 0; //configurado em rl_contribuicao.js
          ContribCalc[1][0] = 0; //configurado em rl_contribuicao.js
          ContribCalc[2][0] = 0; //configurado em rl_contribuicao.js
          //ContribCalc[3][0] = 0; //configurado em rl_contribuicao.js
          $("#tblCtr1").hide();  //configurado em rl_contribuicao.js
          $("#tblCtr2").hide();  //configurado em rl_contribuicao.js
          $("#tblCtr3").hide();  //configurado em rl_contribuicao.js
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
    case "3": //autopatrocinado
      switch (motivo_status){
        case "":

        break;
        default:
          $("#secPermission").hide();
          $("#secInfo").show();
          $("#secSaldo").show();
          $("#secContrib").show();
          $("#secSalURP").show();
          ContribCalc[1][1] = 0; //configurado em rl_contribuicao.js
          ContribCalc[2][1] = 0; //configurado em rl_contribuicao.js
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
          $("#secContrib").show();
          $("#secSalURP").show();
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
          $("#secContrib").show();
          $("#tamBeneBox").switchClass("col-xs-12 col-sm-6 col-md-6", "col-xs-12 col-sm-12 col-md-12");
          //$('#tamBeneBox').append(secAltBenef);
          $('#secAltBenef').hide(); //Exibe div alteracao de beneficio           
          $("#secBenefApos_info").hide();                                    
          $("#tamBeneBox_rowBenefIrValue").removeClass('hide');          
          $("#secBenefAnterior").show();
          $('#meta').attr("disabled", "disabled");
          $("#secMeta2").hide();
          $("#secSimulation").show();
          $("#secMsg").show();
          $("#secFoot").show();
          $('#secContrib').hide();
          $('#secMsg_dtSaldoProjFoot').hide();
          $('#tamBeneBox_rowBenefIrValue').hide();
          if(CampAlterBeneficio) { //Ativador no config_var.js
            $('#tamBeneBox').append(frmESP); 
            $('#tamBeneBox').append(secDecTerceiro); 
            $('#tamBeneBox').append(secAltBenef);           
            DecimoTerceiro ? $('#tamBeneBox_checkDecTerceiro').prop( "checked", true ) : $('#tamBeneBox_checkDecTerceiro').prop( "checked", false );            
            $('#secAltBenef').show(); //Exibe div alteracao de beneficio
            $("#secDecTerceiro").addClass("hide");                           
            //$("#graSalProjeta").addClass("hide");          
            //$("#secEvolSaque").addClass("hide");                       
          }
          if (PMTIni != null){
            if (PMTIni.indexOf("Prazo Determinado") >= 0){             
              $('#tamBeneBox').hide();      
              $('#graSalProjeta').hide();
              $('#secEvolSaque').hide();
              $('#groupPrazo').hide();
              $('#groupRenda').hide();
              $('#groupPerc').hide();
            } else if (PMTIni.indexOf("Percentual do Saldo") >= 0) {             
              $("#prazo").prop('disabled', true);
              $("#renda").prop('disabled', true);   
              $('#groupPrazo').hide();
              $('#groupRenda').hide();     
              InitBenefInputPerc(); //funcao esta no rl_beneficio, inicializa campo select          
            } else if (PMTIni.indexOf("Renda Mensal em Reais") >= 0) {             
              $("#prazo").prop('disabled', true);
              $("#perc").prop('disabled', true);  
              $('#pmtVlRenda').val($.formatNumber((BenefIni != null ? BenefIni: 0), {format: "#,##0.00", locale: "br"}));           
              pgtoPercHabilit = false;
              pgtoPrazoHabilit = false;
              $('#groupPrazo').hide();              
              $('#groupPerc').hide();
              BenefCheck();              
            }
          } else {            
            $('#tamBeneBox').hide();      
            $('#graSalProjeta').hide();
            $('#secEvolSaque').hide();
            $('#groupPrazo').hide();
            $('#groupRenda').hide();
            $('#groupPerc').hide();            
            $('#secSimulation').hide();                        
            $('#secInfo').hide();
            $('#secMsg').hide();
            $('#secFoot').hide();
            $('#secPermission').show();
          }

          /*
          if (motivo_status == 57 || motivo_status == 61) {
            ValPerc = 0.5;       //setar os valores iniciais
            ValPrazo = 20;       //setar os valores iniciais
            $("#slider").slider({ disabled: true });   //bloquear barra de benefício 
          }
          */
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
        break;
      };
    break;
    default:

    break;
  };
}
