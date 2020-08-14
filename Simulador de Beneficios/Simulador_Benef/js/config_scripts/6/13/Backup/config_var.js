//Vari�veis ainda n�o alimentadas pelo banco
var Nper = 13;                                  //Quantidade de pagamentos no ano configurado para o Plano
var IncPrazo = 5;                               //Incremento da forma de pagamento Prazo
var Ncontrib = 1;                               //N�mero de contribui��es no ano usar case 1 = 12 meses ou case 5 = 13 meses
var v13pagto = true;                            //Plano paga d�cimo terceiro? true ou false
var v13PropMBenefAno = false;                   //Plano paga d�cimo terceiro sobre maior benef�cio no ano && abono � proporcional a (quantidade de meses / 12)? true ou false
var CrescSalaa = 0.03;                          //% crescimento salarial a.a.
var ROIaa1 = 0.07;                              //Meta atuarial ao ano do Plano - Perfil 1
var ROIaa2 = 0.00;                              //Meta atuarial ao ano do Plano - Perfil 2
var ValPerc = 0.1;                              //Valor inicial da forma de pagamento Percentual
var MinPerc = 0;                                //Valor m�nimo da forma de pagamento Percentual
var MaxPerc = 2.5;                              //Valor m�ximo da forma de pagamento Percentual
var IncPerc = 0.1;                              //Incremento da forma de pagamento Percentual
var ValPrazo = 5;                               //Valor inicial da forma de pagamento Prazo
var MinPrazo = 5;                               //Valor m�nimo da forma de pagamento Prazo
var MaxPrazo = 20;                              //Valor m�ximo da forma de pagamento Prazo
var ValRenda = 0.001;                           //Valor percentual inicial da forma de pagamento onde, Renda Certa Inicial = Saldo de benef�cio dispon�vel * ValRenda
var MinRenda = 0.00;                            //Valor percentual m�nimo da forma de pagamento onde, Renda Certa Min = Saldo de benef�cio dispon�vel * MinRenda
var MaxRenda = 0.025;                           //Valor percentual m�ximo da forma de pagamento onde, Renda Certa Max = Saldo de benef�cio dispon�vel * MaxRenda
var IncRenda = 0.001;                            //Incremento da forma de pagamento Renda Certa em R$
var MinBenef = URP;                             //Valor m�nimo para pagamento do benef�cio mensal
var SaldoMin = 0;                      		      //Valor do saldo m�nimo para pagamento �nico
var UltContribAdic = null;                      //Valor da �ltima contribui��o de adicional
var TipoParticipante = DadosPlano.TipoParticipante;   //Tipo Participante = 9 (participante Syngenta A)
var CampAlterBeneficio = new Date() >= new Date(2019, 04, 27, 7) && new Date() <= new Date(2019, 05, 9, 23) ? true : false;                    //Flag de ativa��o de campanha de altera��o de benef�cios (campo m�s � um array, iniciado com 0)
var DtInicialPlano = new Date("03/09/2006");          //Data Comparativa para aposentadoria antecipada
var pgtoPercHabilit = true;
var pgtoPrazoHabilit = true;
var pgtoRendaHabilit = true;
var pgtoRendaFinanceira = true;
var pgtoRendaVitalicia = false;
var pgtoRendaTemporaria = false;                       //Pagamento Renda Tempor�ria 
var HabilitaMultiBeneficio = false;                    //Habilita Select de escolha de simula��o
var desabilitaMeta = false;
var desabilitaMeta2 = true;
var desabilitaSalGrow = false;
var url_Home = 'https://dinheiroefuturo.com.br/syngentaprevi/';
    url_retorno = url_retorno.replace("http://www.portal-hro.com.br:84/portal", "https://www.portal-hro.com.br/portal");

//Dicion�rio de termos
var home_logo = '<a class="navbar-brand" href="'+url_Home+'"><img src="res/img/logo_'+Id_entidade+'_'+Id_plano+'.png" class="img-responsive" style="height:38px; margin-top:-10px;"></a>';
var home_text =	'<a href="'+url_retorno+'" class="navbar-link">Voltar</a>';  	            //Link Home
var secPermission_acessoNegado = '<div class="alert alert-warning" role="alert"><strong>Ops!</strong> Acesso Negado. <a href="'+url_Home+'">Clique aqui</a> para voltar � p�gina inicial.</div>';  	            //Mensagem Acesso negado e impress�o de link home
var secInfo_iPessoais = "Informa��es Pessoais";  	          //Texto T�tulo div secInfo, Informa��es Pessoais
var secInfo_name = "Nome Completo";  	                      //Texto Nome Completo
var secInfo_cpf = "CPF";                        	          //Texto CPF
var secInfo_birth = "Data de Nascimento";        	          //Texto Data de Nascimento
var secInfo_dtAdmission = "Data de Admiss�o";  	            //Texto Data de Admiss�o
var secInfo_dtAccess = "Data de Ades�o";            	      //Texto Data de Ades�o
var secInfo_dtTermination = "Data de Desligamento";  	      //Texto Data de Desligamento
var secInfo_fldStatus = "Situa��o Atual";  	                //Texto Situa��o Atual
var secSaldo_sContas = "Saldo de Contas Atual";  	          //Texto T�tulo div secSaldo, Saldo de Contas
var secSaldo_taxopt	= "Regime de Tributa��o:";  	          //Texto Regime de Tributa��o
var secSaldo_dtbal = "Data do Saldo:";               	      //Texto Data do Saldo
var secSaldo_fldMyBalance	= "Meu Saldo";  	                //Texto Meu Saldo
var secSaldo_fldCompanyBalance = "Saldo da Empresa";  	    //Texto Saldo da Empresa
var secSaldo_fldPortability = "Portabilidade Fechada";      //Texto Portabilidade Fechada
var secContrib_nomePlan	=	'Simule abaixo as contribui��es futuras ao Plano '+nome_plano_abrev.toUpperCase()+' para composi��o do benef�cio de aposentadoria, a partir de seu saldo atual.';  //Texto Campo Mensagem para simula��o
var secContrib_cPlan = "Contribui��es ao Plano";  	   //Texto T�tulo div secContrib, Contribui��es ao Plano
var secContrib_salary	= "�ltimo Sal�rio:";  	           //Texto �ltimo Sal�rio
var secContrib_urp = "URS:";  	                         //Texto URP
var secHipotBenef_Select = 'Selecione o tipo de simula��o:';     //Texto div select beneficio
var secHipotRendaFinanceira = 'Renda Financeira';        //Texto Select Benef�cio Renda Financeira
var secHipotRendaVitalicia = 'Renda Vital�cia';          //Texto Select Benef�cio Renda Vitalicia
var secHipotRendaTemporaria1 = 'Aux�lio Doen�a';         //Texto Select Benef�cio Renda Temporaria 
var secHipot_msg1 = "Selecione abaixo a data futura de sua simula��o.";  	//Texto, Campo Mensagem para sele��o de data
var secHipot_simulation	= "Simula��o";  	                 //Texto T�tulo div secHipot, Simula��o
var secHipot_barra = "Utilize a barra abaixo para projetar seu saldo na data de sua simula��o";  	//Texto para utiliza��o da barra slider
var secHipot_age = "Idade:";  	                          //Texto Idade
var secHipot_meta	= "Expectativa de Rentabilidade Real (a.a.):";  	//Texto para sele��o de combo-box
var secHipot_meta2	= "Expectativa de Rentabilidade Real (a.a.):";  	//Texto para sele��o de combo-box
var secHipot_msg2	= "A expectativa de rentabilidade real n�o representa garantia de rentabilidade futura. A rentabilidade do Plano depender� das varia��es do mercado financeiro.";  	//Texto Campo Mensagem para Expectativa de Rentabilidade Real
var secCrescSal_salgrow	= "Expectativa de Crescimento Salarial Real (a.a.):";  	//Texto para sele��o de combo-box
var secCrescSal_msg1 = "A expectativa de crescimento salarial real n�o � garantida, podendo variar para mais ou para menos de acordo com sua evolu��o profissional.";  	//Texto Campo Mensagem para Expectativa de Crescimento Salarial Real
var secMsgBenefOK = 'Voc� adquiriu direito ao Benef�cio de Aposentadoria, <a href="#secSimulation" class="alert-link">clique aqui</a> e confira!';  //Texto  comunica direito ao benef�cio
var secBenefApos_benefApos = "Benef�cio de Aposentadoria";      	//Texto T�tulo div secBenefApos, Aposentadoria
var secBenefApos_Temporaria = "Benef�cio Tempor�rio";    //Texto T�tulo div secBenefApos_Temporaria
var secBenefAnterior_ultBenef	= "Valor do �ltimo Benef�cio:";      //Texto Valor do �ltimo Benef�cio
var secBenefAnterior_recebAtual	= "Forma de Recebimento Atual:";   //Texto Forma de Recebimento Atual
var secSaque_msg1	= 'Caso seja sua op��o, selecione abaixo o % para saque de seu saldo futuro, no momento da sua aposentadoria. <p>Quanto maior o saque, menor ser� o benef�cio de aposentadoria.</p>';  	//Texto Campo Mensagem orienta��o % para saque
var secSaque_fldMyBenBal = "Saldo Futuro de Aposentadoria:";  	  //Texto Saldo Futuro de Aposentadoria
var secSaque_barra = "Utilize a barra abaixo para simular o valor de seu saque";  	//Texto para utiliza��o da barra slider
var secSaque_percSaque = "% de Saque:";                          	//Texto Percentual de Saque
var secSaque_sBruto	= "Saque Bruto:";  	                          //Texto Saque Bruto
var secSaque_irSaque = "IR do Saque:";  	                        //Texto IR do Saque
var secSaque_sLiquido	=	"Saque L�quido:";                         	//Texto Saque L�quido
var tamBeneBox_msg1	=	"Selecione abaixo a forma de recebimento de seu benef�cio futuro de aposentadoria.";  	//Texto Campo Mensagem orienta��o sele��o de benef�cio futuro
var tamBeneBox_remainBenBal	=	"Saldo Remanescente de Aposentadoria:";	//Texto Saldo Remanescente de Aposentadoria
var tamBeneBox_bMensal	=	"Selecione abaixo a forma de recebimento de seu benef�cio mensal";  	//Texto Mensagem orienta��o sele��o de forma de recebimento
var tamBeneBox_perc	=	"Percentual do Saldo";                                                 	//Texto Percentual do Saldo
var tamBeneBox_prazo	=	"Prazo Determinado";  	                                               //Texto Prazo Determinado
var tamBeneBox_renda	=	"Renda Certa";                                                         //Texto Renda Certa
var tamBeneBox_barra	=	"Utilize a barra abaixo para simular o valor de seu benef�cio mensal";  	//Texto para utiliza��o da barra slider
var tamBeneBox_pmt	=	"Forma de Recebimento:";  	                                         //Texto Forma de Recebimento
var tamBeneBox_amount	=	"Benef�cio Inicial Bruto:";  	                                     //Texto Benef�cio Inicial Bruto
var tamBeneBox_benefIrValue	=	"IR Benef�cio Inicial:";  	                                //Texto IR Benef�cio Inicial
var tamBeneBox_benefNet	=	"Benef�cio Inicial L�quido:";                                    //Texto Benef�cio Inicial L�quido
var secBeneApos_grafico	=	"Gr�fico do Saldo Projetado";                                   //Texto T�tulo div secBeneApos, Gr�fico
var secBeneApos_evolution	=	"Evolu��o de seu benef�cio/saldo";  	//Texto Mensagem orienta��o para visualiza��o da evolu��o do benef�cio
var Limit100Text = "Proje��o limitada a 100 anos de idade.";                              //Texto de idade limite na proje��o
var secResgate_rProjetado	=	"Saldo do Resgate Projetado";  	                             //Texto T�tulo div secResgate, Saldo do Resgate Projetado
var secResgate_rescPartBal	=	"Meu Saldo (a)";  	                                       //Texto Meu Saldo (a)
var secResgate_direito	=	"% Direito";  	                                               //Texto % Direito
var secResgate_rescCpnyBal	=	"Saldo da Empresa (b)";  	                                  //Texto Saldo da Empresa (b)
var secResgate_rescTotBal	=	"Resgate Bruto (a+b)";                                      	//Texto Resgate Bruto (a+b)
var secResgate_rescTax	=	"Imposto de Renda (c)";                                       	//Texto Imposto de Renda (c)
var secResgate_rescNet	=	"Resgate L�quido (a+b)-(c)";  	                                //Texto Resgate L�quido (a+b)-(c)
var secMsg_msg1	=	'<p align="justify">Os valores apresentados s�o apenas ilustrativos. Os valores reais depender�o do retorno de investimentos e do n�vel de contribui��es efetuadas para o Plano.</p><p align="justify">A simula��o foi realizada conforme dados cadastrais do Participante e o regulamento do Plano, podendo o mesmo sofrer altera��es. Essas informa��es ser�o reavaliadas com base na documenta��o apresentada na data da elegibilidade ao benef�cio de aposentadoria.</p>';  	//Texto Mensagem orienta��o sobre os valores apresentados no simulador
var secMsg_dtSaldoFoot	=	"Data do Saldo de Contas Atual: ";  	                               //Texto Data do Saldo de Contas
var secMsg_dtSaldoProjFoot	=	"Data do Saldo Projetado: ";  	        //Texto Data do Saldo Projetado
var secMsg_dtNowFoot	=	"Data e Hora da Simula��o: ";   	                                  //Texto Data e Hora da Simula��o
var CopyrigtText	=	"&copy; "+text_Ano+" "+nome_entidade_abrev+". Todos os direitos reservados.";	        //Texto rodap� concatenado com o nome da entidade abreviado
var MinBenText = "Valor m�nimo de benef�cio atingido. Benef�cio transformado em pagamento �nico.";    //Texto pagamento �nico
var BenMinText = "Eleg�vel ao Benef�cio M�nimo.";    //Texto benef�cio m�nimo
var SaldoMinText = "Valor m�nimo de saldo atingido. Benef�cio transformado em pagamento �nico.";    //Texto pagamento �nico por saldo m�nimo
var msgBenefOK_text = "Eleg�vel a aposentadoria.";    //Texto slide idade aposentadoria
var msgBenefTempOK_text = "Eleg�vel ao benef�cio.";    //Texto slide idade benef�cio temporario

//Formularios
var frmESP = '<form id="frmParametros" method="post" action="https://www.portal-hro.com.br/cadastro/LoginForm.aspx" target="_blank"> <!-- generico para esportal --> <input type="hidden" name="userName"       value="' + Username.trim() + '"> <input type="hidden" name="passWord"       value="null"> <input type="hidden" name="urlGo"          value=""/> <input type="hidden" name="menuOff"        value="True"> <input type="hidden" name="showBackButton" value="False"> <input type="hidden" name="idParticipante" value="null"></form>';
var secAltBenef = '<div id="secAltBenef" class="panel panel-default hidden-xs"><div class="panel-body"><span id="secAltBenef_msg1"><!--<p align="justify"></p><p>Para formalizar a altera��o, imprima o formul�rio "Termo de Op��o de Altera��o da Forma de Recebimento de Benef�cio de Aposentadoria e N�mero de Presta��es de Benef�cio de Renda Mensal", assine, reconhe�a firma e entregue em uma de nossas unidades de atendimento.</p>--><p align="center" style="margin-top: 20px;"><a type="button" id="btnCampAlterBeneficio" href="javascript:void(0)" onclick="GerarForm(1)" target="_blank" class="btn btn-primary">Salvar</a></p></span></div></div>';
var secDecTerceiro = '<div id="secDecTerceiro"><div class="alert alert-info"><span id="tamBeneBox_decTerceiro_msg1"> Selecione abaixo sua op��o pelo recebimento do seu abono anual.</span></div>' +
                      '<div class="panel panel-default">' +
                      '    <div class="panel-body">' +
                      '        <div class="row">' +
                      '            <div class="col-xs-12 col-sm-12 col-md-12"><input id="tamBeneBox_checkDecTerceiro" type="checkbox" name="tamBeneBox_checkDecTerceiro"><span id="tamBeneBox_decTerceiro"> Solicito receber o abono anual (equivalente ao 13�) neste ano de '+text_Ano+'.</span></div>' +
                      '        </div>' +
                      '    </div>' +
                      '</div></div>';

//var secCampEmprestimo_msg1 = '<div class="alert alert-danger" role="alert" id="secCampEmprestimo_msg1" style="display: none;"></div>';

//Termos Mobile App
var secMsg_msg2	=	'<p align="justify">Os valores apresentados s�o apenas ilustrativos. Os valores reais depender�o do retorno de investimentos e do n�vel de contribui��es efetuadas para o Plano.</p><p align="justify">A simula��o ser� realizada conforme dados cadastrais do Participante e o regulamento do Plano, podendo o mesmo sofrer altera��es. Essas informa��es ser�o reavaliadas com base na documenta��o apresentada na data da elegibilidade ao benef�cio de aposentadoria.</p>';  	//Texto Mensagem orienta��o sobre os valores apresentados no simulador
var secSaldo_info_m = "Veja abaixo seu saldo acumulado at� o momento.";          //Texto Mensagem informa��es de saldo
var secContrib_info_m = "Simule abaixo suas contribui��es futuras ao plano.";    //Texto Mensagem informa��es de constribui��o
var secResgate_info_m = "Veja abaixo o saldo de resgate projetado.";             //Texto Mensagem informa��es de resgate
var secPermission_acessoNegado_m = '<div class="alert alert-warning" role="alert"><strong>Ops!</strong> Voc� n�o possui acesso ao simulador de benef�cios.</div>';  	   //Mensagem Acesso negado
var secResgate_direito_a = "% Direito";    //Texto % Direito participante
var secResgate_direito_b = "% Direito";    //Texto % Direito patrocinadora

//  ------------------------------------------------------------  Functions  ---------------------------------------------------------

//Alimenta��o Select Beneficio
function iniciaSelectBeneficio(){   
    
    var selectText = '';

    if (pgtoRendaFinanceira) {
       $('#SelecionaBeneficio').append('<option value="RendaFinanceira">' + secHipotRendaFinanceira + '</option>');    
    }
    if (pgtoRendaVitalicia) {
       $('#SelecionaBeneficio').append('<option value="RendaVitalicia">' + secHipotRendaVitalicia + '</option>');
    }   
    if (pgtoRendaTemporaria) {
       $('#SelecionaBeneficio').append('<option value="RendaTemporaria1">' + secHipotRendaTemporaria1 + '</option>');
    }

    //Inicia o simulador na primeira op��o de simula��o
    $('#SelecionaBeneficio').prop("selectedIndex", 0);

    selectText = $('#SelecionaBeneficio').val();

    //Apresentacao
    switch (true){
          case (selectText == 'RendaFinanceira'):
            $("#secRendaFinanceira").show();
            $("#secRendaVitalicia").hide();
            $("#secRendaTemporaria").hide(); 
            break; 
          case (selectText == 'RendaVitalicia'):
            $("#secRendaFinanceira").hide();
            $("#secRendaVitalicia").show();
            $("#secRendaTemporaria").hide(); 
            break;  
          case (selectText.indexOf('RendaTemporaria') > -1):
            $("#secRendaFinanceira").hide();
            $("#secRendaVitalicia").hide();
            $("#secRendaTemporaria").show(); 

            $("#secBenefApos_Temporaria").html('Benef�cio de ' + $("#SelecionaBeneficio :selected").text());
            $("#msgBenefOK_text").html(msgBenefTempOK_text);
            break;
    }
}  

function GerarForm(idGerarForm) 
{

  var numContrib = 0;
  var resultNumExtenso = '';
  var form = '';
  var tipoPagamento = 0;
  var valorNovo = 0;
  var FlagBonus = DecimoTerceiro;

  switch (true){
      case (idGerarForm == 1):
        //Par�metros de envio
        if (BenefCheckOpt == 0) { //Percentual          
          valorNovo = ValPerc.toString().replace(',',',');          
          tipoPagamento = 3;
        } else if (BenefCheckOpt == 1) { //Prazo em meses
      	  valorNovo = (Math.floor(ValPrazo) * Nper) + Math.round((ValPrazo - Math.floor(ValPrazo)) * Nper);
          tipoPagamento = 2;
        } else {  //Renda Certa          
          valorNovo = $("#pmt").val().replace('R$ ','').replace('.','').replace(',','.');
          tipoPagamento = 7;
        }   
        
        //Decimo Terceiro
        FlagBonus = $('#tamBeneBox_checkDecTerceiro').is(":checked") ? true : false;

        window.open('https://www.portal-hro.com.br/portal/site/SyngentaPrevi2/Action/CampaignBenefitChange.aspx?planId='+Id_plano+'&newPaymentTypeId='+tipoPagamento+'&newValue='+valorNovo+'&newFlagBonus='+FlagBonus, '_blank');

        break;  
  }   

}


