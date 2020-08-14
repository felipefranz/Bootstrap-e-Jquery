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
          ContribCalc[1][1] = 0; //configurado em rl_contribuicao.js          
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

           $("#secPermission").hide();
          $("#secInfo").show();
          $("#secSaldo").show();
          $("#secContrib").show();
          $("#secSalURP").show();  
          /*
          ContribCalc[0][0] = 0; //configurado em rl_contribuicao.js
          ContribCalc[1][0] = 0; //configurado em rl_contribuicao.js
          ContribCalc[2][0] = 0; //configurado em rl_contribuicao.js
          ContribCalc[3][0] = 0; //configurado em rl_contribuicao.js
          $("#tblCtr1").hide();  //configurado em rl_contribuicao.js
          $("#tblCtr2").hide();  //configurado em rl_contribuicao.js
          $("#tblCtr3").hide();  //configurado em rl_contribuicao.js        
          $("#tblCtr4").hide();  //configurado em rl_contribuicao.js        
          */          
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
          
          $("#secPermission").hide();
          $("#secInfo").show();
          ContribCalc[0][0] = 0; //configurado em rl_contribuicao.js
          ContribCalc[1][0] = 0; //configurado em rl_contribuicao.js          
          $("#tamBeneBox").switchClass("col-xs-12 col-sm-6 col-md-6", "col-xs-12 col-sm-12 col-md-12");
          //$('#tamBeneBox').append(secAltBenef);
          $('#secAltBenef').hide(); //Exibe div alteracao de beneficio           
          $("#secBenefApos_info").hide();                                    
          $("#tamBeneBox_rowBenefIrValue").removeClass('hide');          
          $('#tamBeneBox_rowBenefIrValue').hide();
          $('#secBenefApos_divProvento_Saque').hide();
          $("#secBenefAnterior").show();
          $('#meta').attr("disabled", "disabled");
          $("#secMeta2").hide();
          $("#secSimulation").show();
          $("#secMsg").show();
          $("#secFoot").show();
          $('#secContrib').hide();
          $('#secMsg_dtSaldoProjFoot').hide();
          
          if (alterBeneficio){
            //Inclusão de informações adicionais assistido
            $("#secBenefAnterior").find(".panel-body").append(divDtAlteracaoFormaRecebimento);
            $("#secBenefAnterior").find(".panel-body").append(divQtdSaque);
            //$("#secBenefAnterior").find(".panel-body").append(divValSaque);
            $("#secBenefAnterior").find(".panel-body").append(divPercentSaque);
            //$("#secBenefAnterior").find(".panel-body").append(divPercentSaldoRemanescente);         
            $("#secBenefAnterior_dtAltFormRecebimento").html(secBenefAnterior_dtAltFormRecebimento);
            $("#secBenefAnterior_qtdSaque").html(secBenefAnterior_qtdSaque);
            //$("#secBenefAnterior_valSaque").html(secBenefAnterior_valSaque);
            $("#secBenefAnterior_percentSaque").html(secBenefAnterior_percentSaque);
            //$("#secBenefAnterior_percentSaldoRemanescente").html(secBenefAnterior_percentSaldoRemanescente);         
            $('#DtAltFormRecebimento').val(' ' + dtAlteracaoFormaRecebimentoBenef);
            $('#QtdSaque').val(' ' + InfoSaqueBenefAssistido.QtdSaque + ' (Limite de ' + limiteQtdeSaque + ' saques)');
            $('#PercentSaque').val(' ' + InfoSaqueBenefAssistido.PerctSaque.toString().replace('.',',') + '%' + ' (Limite de 25%)');
            MaxSaque = InfoSaqueBenefAssistido.PercentRemanescente;
            $('#secBenefApos_divProvento_Saque').show();
            $("#secSaque").find(".panel-body").append(secSaque_DocSaque);

            if(InfoSaqueBenefAssistido.PercentRemanescente != 0 && InfoSaqueBenefAssistido.QtdSaque < 5){
              $('#secSaque').switchClass("col-xs-12 col-sm-6 col-md-6", "col-sm-12 col-md-12");
              $('#secSaque_msg1').html("Selecione abaixo o % para saque de seu saldo, os saques podem ser efetuados em até 5 parcelas, desde que elas totalizem o máximo de 25%.<br/> Quanto maior o saque, menor será o benefício mensal de aposentadoria.");
              $('#secSaque_fldMyBenBal').html("Saldo de Aposentadoria:");
              $('#secSaque').show();  
              //IncSaque = 0.1  //Habilitar Percentual de saque com incremente de 0,1 em 0,1 para assistidos; 
              //InfoSaqueBenefAssistido.PerctSaque > InfoSaqueBenefAssistido.PerctSaque.toFixed(0) * 1 ? IncSaque = 0.1 : ""; // Percentual de saque com incremente de 0,1 em 0,1;
            } else {
              $("#secBenefAnterior").find(".panel-body").append('<div class="col-xs-12 col-sm-12 col-md-12 alert alert-danger" style="margin-top:20px; margin-bottom:10px;" role="alert" id="secSaque_msg2" style="display: block;">Saque não disponível pois o participante atingiu o limite de ' + (InfoSaqueBenefAssistido.QtdSaque >= 5 ? '5 saques.': '25%.') +'</span></p></div>');
            }
            //$('#ValSaque').val(" R$ " + $.formatNumber(InfoSaqueBenefAssistido.ValorSaque, {format: "#,##0.00", locale: "br"}));		  
            //$('#PercentSaldoRemanescente').val(' '+InfoSaqueBenefAssistido.PercentRemanescente.toString().replace('.',',')+' %');
          }
          if(alterBeneficio) { //Ativador no config_var.js         
            $('#tamBeneBox').append(secAltBenef);           
            $('#secAltBenef').show(); //Exibe div alteracao de beneficio   
            //DecimoTerceiro ? $('#tamBeneBox_checkDecTerceiro').prop( "checked", true ) : $('#tamBeneBox_checkDecTerceiro').prop( "checked", false );                                                       
          }
          /*
          if(CampAlterBeneficio) { //Ativador no config_var.js
            $('#tamBeneBox').append(frmESP); 
            $('#tamBeneBox').append(secDecTerceiro); 
            $('#tamBeneBox').append(secAltBenef);           
            DecimoTerceiro ? $('#tamBeneBox_checkDecTerceiro').prop( "checked", true ) : $('#tamBeneBox_checkDecTerceiro').prop( "checked", false );            
            $('#secAltBenef').show(); //Exibe div alteracao de beneficio                         
            //$("#graSalProjeta").addClass("hide");          
            //$("#secEvolSaque").addClass("hide");                       
          }
          */
          
          if (PMTIni != null){
            /*
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
            } else if (PMTIni.indexOf("Renda Mensal em Reais") >= 0) {             
              $("#prazo").prop('disabled', true);
              $("#perc").prop('disabled', true);              
              pgtoPercHabilit = false;
              pgtoPrazoHabilit = false;
              $('#groupPrazo').hide();              
              $('#groupPerc').hide();
              BenefCheck();              
            }
            */
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
