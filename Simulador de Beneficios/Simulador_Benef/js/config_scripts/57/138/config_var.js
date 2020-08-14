//Variáveis ainda não alimentadas pelo banco

//Apagar quando o processo virar
//URP = 349.89; 
//DTBenefIni = "04/30/2020";

var Nper = 12;                                    //Quantidade de pagamentos no ano configurado para o Plano
var IncPrazo = 1 / Nper;                       //Incremento da forma de pagamento Prazo
var Ncontrib = 1;                                   //Número de contribuições no ano usar case 1 = 12 meses ou case 5 = 13 meses
var v13pagto = false;                               //Plano paga décimo terceiro? true ou false
var v13PropMBenefAno = false;                   //Plano paga décimo terceiro sobre maior benefício no ano && abono é proporcional a (quantidade de meses / 12)? true ou false
var CrescSalaa  = 0.0;                                  //% crescimento salarial a.a.
var ROIaa1      = 0.045;                                //Meta atuarial ao ano do Plano - Perfil 1
var ROIaa2      = 0.000;                                //Meta atuarial ao ano do Plano - Perfil 2
var ValPerc     = 0.5;                                  //Valor inicial da forma de pagamento Percentual
var MinPerc     = 0.0;                                  //Valor m&iacute;nimo da forma de pagamento Percentual
var MaxPerc     = 2.0;                                  //Valor m&aacute;ximo da forma de pagamento Percentual
var IncPerc     = 0.01;                                 //Incremento da forma de pagamento Percentual
var ValPrazo    = 30;                                    //Valor inicial da forma de pagamento Prazo
var MinPrazo    = 5;                                    //Valor m&iacute;nimo da forma de pagamento Prazo
var MaxPrazo    = 30;                                   //Valor m&aacute;ximo da forma de pagamento Prazo
var MinBenef    = 0.0;                                  //Valor m&iacute;nimo para pagamento do benef&iacute;cio mensal
var ValRenda = 0;                                 //Valor inicial da forma de pagamento Renda
var MinRenda = 0;                                 //Valor mínimo da forma de pagamento Renda
var MaxRenda = 0;                                 //Valor percentual máximo da forma de pagamento onde Renda Certa Max = Saldo de benefício disponível * MaxRenda
var IncRenda = 0;                                 //Incremento da forma de pagamento Renda
var SaldoMin = 0;                      //Valor do saldo mínimo para pagamento único
//var FlagInvalido = (DadosPlano.FlagInvalido != null) ? DadosPlano.FlagInvalido : 0; //Flag de participante recebendo benefício de invalidez
var DadosEmprestimo = DadosAssistido != "" ? DadosAssistido.Emprestimo : "";    //Dados Emprestimo
var isAdmin = ((Username.indexOf("0057adm.") > -1) || (Username.indexOf("0057ua.") > -1)) ? true : false; // 
var CampAlterBeneficio = new Date() >= new Date(2020, 4, 4, 8) && new Date() <= new Date(2020, 4, 29, 17) && !isAdmin ? true : false;                    //Flag de ativação de campanha de alteração de benefícios
var UltContribAdic = null;                    //Valor da última contribuição de adicional
var pgtoPercHabilit = true;
var pgtoPrazoHabilit = true;
var pgtoRendaHabilit = false;
var pgtoRendaHabilitaSlider = false; //flag de controle para habilitar funcionamento de simulação de renda certa pelo componente slider, default false componente input
var pgtoRendaFinanceira = true;
var pgtoRendaVitalicia = false;
var pgtoRendaTemporaria = false;                       //Pagamento Renda Temporária 
var HabilitaMultiBeneficio = false;                    //Habilita Select de escolha de simulação
var desabilitaMeta = false;
var desabilitaMeta2 = true;
var desabilitaSalGrow = true;
var url_Home = '/portal/site/Embraerprev';

//Tratamento url_retorno
url_retorno = url_retorno.indexOf("SimuladorBenefAposent.aspx") > -1 ? "https://www.embraerprev.com.br/Action/EmbraerPrevSimuladoresAction.aspx" : url_retorno;
url_retorno = url_retorno.replace("http://www.embraerprev.com.br", "https://www.embraerprev.com.br");


//Dicionário de termos
var home_logo = '<a class="navbar-brand" href="'+url_Home+'"><img src="res/img/logo_'+Id_entidade+'_'+Id_plano+'.png" class="img-responsive" style="height:38px; margin-top:-10px;"></a>';
var home_text =	'<a href="'+url_retorno+'" class="navbar-link">Voltar</a>';  	            //Link Home
var secPermission_acessoNegado = '<div class="alert alert-warning" role="alert"><strong>Ops!</strong> Acesso Negado. <a href="'+url_Home+'">Clique aqui</a> para voltar à página inicial.</div>';  	            //Mensagem Acesso negado e impressão de link home
var secInfo_iPessoais = "Informações Pessoais";  	          //Texto Título div secInfo, Informações Pessoais
var secInfo_name = "Nome";  	                      //Texto Nome Completo
var secInfo_cpf = "CPF";                        	          //Texto CPF
var secInfo_birth = "Nascimento";        	          //Texto Data de Nascimento
var secInfo_dtAdmission = "Admissão";  	            //Texto Data de Admissão
var secInfo_dtAccess = "Adesão";            	      //Texto Data de Adesão
var secInfo_dtTermination = "Desligamento";  	      //Texto Data de Desligamento
var secInfo_fldStatus = "Situação";  	                //Texto Situação Atual
var secSaldo_sContas = "Saldo de Contas Atual";  	          //Texto Título div secSaldo, Saldo de Contas
var secSaldo_taxopt	= "Regime de Tributação:";  	          //Texto Regime de Tributação
var secSaldo_dtbal = "Data do Saldo:";               	      //Texto Data do Saldo
var secSaldo_fldMyBalance	= "Meu Saldo";  	                //Texto Meu Saldo
var secSaldo_fldCompanyBalance = "Saldo da Empresa";  	    //Texto Saldo da Empresa
var secSaldo_fldPortability = "Portabilidade Fechada";      //Texto Portabilidade Fechada
var secContrib_nomePlan	=	'Simule abaixo as contribuições futuras ao Plano '+nome_plano_abrev.toUpperCase()+' para composição do benefício de aposentadoria, a partir de seu saldo atual.';  //Texto Campo Mensagem para simulação
var secContrib_cPlan = "Contribuições ao Plano";  	   //Texto Título div secContrib, Contribuições ao Plano
var secContrib_salary	= "Último Salário:";  	           //Texto Último Salário
var secContrib_urp = "URP:";  	                         //Texto URP
var secHipotBenef_Select = 'Selecione o tipo de simulação:';     //Texto div select beneficio
var secHipotRendaFinanceira = 'Renda Financeira';        //Texto Select Benefício Renda Financeira
var secHipotRendaVitalicia = 'Renda Vitalícia';          //Texto Select Benefício Renda Vitalicia
var secHipotRendaTemporaria1 = 'Auxílio Doença';         //Texto Select Benefício Renda Temporaria 
var secHipot_msg1 = "Selecione abaixo a data futura de sua simulação.";  	//Texto, Campo Mensagem para seleção de data
var secHipot_simulation	= "Simulação";  	                 //Texto Título div secHipot, Simulação
var secHipot_barra = "Utilize a barra abaixo para projetar seu saldo na data de sua simulação";  	//Texto para utilização da barra slider
var secHipot_age = "Idade:";  	                          //Texto Idade
var secHipot_meta	= "Projeção de Rentabilidade Real (*):";  	//Texto para seleção de combo-box
var secHipot_meta2	= "Projeção de Rentabilidade Real (*):";  	//Texto para seleção de combo-box
var secHipot_msg2	= '<p align="justify">(*) Projeção de Rentabilidade Real dos Investimentos, sem considerar a inflação.</p><p class="hidden-xs" align="justify"><a href="https://www.portal-hro.com.br/portal/Downloads/Embraerprev/Relatorios/RelatorioResultados/EMBRAERPREV-Relatorio_Historico_de_Rentabilidade-1999a2016.pdf" target="_blank"><b>Clique aqui</b></a> para conhecer a Rentabilidade Histórica dos Perfis dos Investimentos da EMBRAER PREV.</p>';  	//Texto Campo Mensagem para Expectativa de Rentabilidade Real
var secCrescSal_salgrow	= "Expectativa de Crescimento Salarial Real (a.a.):";  	//Texto para seleção de combo-box
var secCrescSal_msg1 = "A expectativa de crescimento salarial real não é garantida, podendo variar para mais ou para menos de acordo com sua evolução profissional.";  	//Texto Campo Mensagem para Expectativa de Crescimento Salarial Real
var secMsgBenefOK = 'Você adquiriu direito ao Benefício de Aposentadoria, <a href="#secSimulation" class="alert-link">clique aqui</a> e confira!';  //Texto  comunica direito ao benefício
var secBenefApos_benefApos = "Benefício de Aposentadoria";      	//Texto Título div secBenefApos, Aposentadoria
var secBenefApos_Temporaria = "Benefício Temporário";    //Texto Título div secBenefApos_Temporaria
var secBenefAnterior_ultBenef	= "Valor do Último Benefício:";      //Texto Valor do Último Benefício
var secBenefAnterior_recebAtual	= "Forma de Recebimento Atual:";   //Texto Forma de Recebimento Atual
var secSaque_msg1	= 'Caso seja sua opção, selecione abaixo o % para saque de seu saldo futuro, no momento da sua aposentadoria. <p>Quanto maior o saque, menor será o benefício de aposentadoria.</p>';  	//Texto Campo Mensagem orientação % para saque
var secSaque_fldMyBenBal = "Saldo Futuro de Aposentadoria:";  	  //Texto Saldo Futuro de Aposentadoria
var secSaque_barra = "Utilize a barra abaixo para simular o valor de seu saque";  	//Texto para utilização da barra slider
var secSaque_percSaque = "% de Saque:";                          	//Texto Percentual de Saque
var secSaque_sBruto	= "Saque Bruto:";  	                          //Texto Saque Bruto
var secSaque_irSaque = "IR (*) do Saque:";  	                        //Texto IR do Saque
var secSaque_sLiquido	=	"Saque Líquido:";                         	//Texto Saque Líquido
var tamBeneBox_msg1	=	"Selecione abaixo a forma de recebimento de seu benefício futuro de aposentadoria.";  	//Texto Campo Mensagem orientação seleção de benefício futuro
var tamBeneBox_remainBenBal	=	"Saldo de Aposentadoria:";	//Texto Saldo Remanescente de Aposentadoria
var tamBeneBox_bMensal	=	"Selecione abaixo a forma de recebimento de seu benefício mensal";  	//Texto Mensagem orientação seleção de forma de recebimento
var tamBeneBox_perc	=	"Percentual do Saldo";                                                 	//Texto Percentual do Saldo
var tamBeneBox_prazo	=	"Prazo Determinado";  	                                               //Texto Prazo Determinado
var tamBeneBox_renda	=	"Renda Certa";                                                         //Texto Renda Certa
var tamBeneBox_barra	=	"Utilize a barra abaixo para simular o valor de seu benefício mensal";  	//Texto para utilização da barra slider
var tamBeneBox_pmt	=	"Forma de Recebimento:";  	                                         //Texto Forma de Recebimento
var tamBeneBox_input = "Digite no campo abaixo o valor que deseja receber no seu benefício mensal";  	//Texto para digitação do benefício no campo input
var tamBeneBox_amount	=	"Benefício Inicial:";  	                                     //Texto Benefício Inicial Bruto
var tamBeneBox_benefIrValue	=	"IR (*) Benefício Inicial:";  	                                //Texto IR Benefício Inicial
var tamBeneBox_benefNet	=	"Benefício Líquido:";                                    //Texto Benefício Inicial Líquido
var secBeneApos_grafico	=	"Gráfico do Saldo Projetado";                                   //Texto Título div secBeneApos, Gráfico
var secBeneApos_evolution	=	"Evolução de seu benefício/saldo";  	//Texto Mensagem orientação para visualização da evolução do benefício
var Limit100Text = "Projeção limitada a 100 anos de idade.";                              //Texto de idade limite na projeção
var secResgate_rProjetado	=	"Saldo do Instituto do Resgate Projetado";  	                             //Texto Título div secResgate, Saldo do Resgate Projetado
var secResgate_rescPartBal	=	"Meu Saldo (a)";  	                                       //Texto Meu Saldo (a)
var secResgate_direito	=	"% Direito";  	                                               //Texto % Direito
var secResgate_rescCpnyBal	=	"Saldo da Empresa (b)";  	                                  //Texto Saldo da Empresa (b)
var secResgate_rescTotBal	=	"Resgate Bruto (a+b)";                                      	//Texto Resgate Bruto (a+b)
var secResgate_rescTax	=	"Imposto de Renda (c)";                                       	//Texto Imposto de Renda (c)
var secResgate_rescNet	=	"Resgate Líquido (a+b)-(c)";  	                                //Texto Resgate Líquido (a+b)-(c)
var secMsg_msg1	=	'<p align="justify">As informações aqui apresentadas tratam-se de meras simulações de aposentadoria, de acordo com as condições estabelecidas no Regulamento do Plano de Benefícios, disponível no Portal, bem como as condições estabelecidas na legislação previdenciária e tributária em vigor, não servindo as mesmas para construção ou modificação de direitos e obrigações.</p>';  	//Texto Mensagem orientação sobre os valores apresentados no simulador
var secMsg_dtSaldoFoot	=	"Data do Saldo de Contas: ";  	                               //Texto Data do Saldo de Contas
var secMsg_dtSaldoProjFoot	=	"Data do Saldo Projetado: ";  	        //Texto Data do Saldo Projetado
var secMsg_dtNowFoot	=	"Data e Hora da Simulação: ";   	                                  //Texto Data e Hora da Simulação
var CopyrigtText	=	"&copy; "+text_Ano+" "+nome_entidade_abrev+". Todos os direitos reservados.";	        //Texto rodapé concatenado com o nome da entidade abreviado
var MinBenText = "Valor mínimo de benefício atingido. Benefício transformado em pagamento único.";    //Texto pagamento único
var BenMinText = "Elegível ao Benefício Mínimo.";    //Texto benefício mínimo
var SaldoMinText = "Valor mínimo de saldo atingido. Benefício transformado em pagamento único.";    //Texto pagamento único por saldo mínimo
var msgBenefOK_text = "Elegível a aposentadoria.";    //Texto slide idade aposentadoria
var msgBenefTempOK_text = "Elegível ao benefício.";    //Texto slide idade benefício temporario

//Formularios
var frmContribExtra = '<form id="frmParametros" method="post" action="https://www.portal-hro.com.br/cadastro/LoginForm.aspx" target="_blank"> <!-- generico para esportal --> <input type="hidden" name="userName"       value="' + Username.trim() + '"> <input type="hidden" name="passWord"       value="null"> <input type="hidden" name="urlGo"          value=""/> <input type="hidden" name="menuOff"        value="True"> <input type="hidden" name="showBackButton" value="False"> <input type="hidden" name="idParticipante" value="null"></form>';
var secAltBenef = '<div id="secAltBenef" class="panel panel-bg panel-default panel-default-bg"><div class="panel-body panel-body-bg"><span id="secAltBenef_msg1"><p align="center">Você poderá simular e registrar quantas vezes desejar até o final da campanha, sendo que valerá a última opção confirmada.</p><p align="center" style="margin-top: 20px;"><a type="button" id="btnCampAlterBeneficio" href="javascript:void(0)" onclick="GerarForm(2)" target="_blank" class="btn btn-primary">Salvar</a></p></span></div></div>';
var secCampEmprestimoValida_msg1 = '<div class="panel panel-bg panel-default panel-default-bg" id="secCampEmprestimoValida"><div class="panel-body panel-body-bg"><div class="row"><div class="col-xs-12 col-sm-12 col-md-12" id="secCampEmprestimoValida_msg1"></div></div></div>'

//Termos Mobile App
var secMsg_msg2	=	'<p align="justify">Declaro que as informações a seguir apresentadas tratam-se de meras simulações de aposentadoria, de acordo com as condições estabelecidas no Regulamento do Plano Embraer Prev, não servindo as mesmas para construção ou modificação de direitos e obrigações.</p>';  	//Texto Mensagem orientação sobre os valores apresentados no simulador
var secSaldo_info_m = "Veja abaixo seu saldo acumulado até o momento.";          //Texto Mensagem informações de saldo
var secContrib_info_m = "Simule abaixo suas contribuições futuras ao Plano.";    //Texto Mensagem informações de constribuição
var secResgate_info_m = "Veja abaixo o saldo de resgate projetado.";             //Texto Mensagem informações de resgate
var secPermission_acessoNegado_m = '<div class="alert alert-warning" role="alert"><strong>Ops!</strong> Você não possui acesso ao simulador de benefícios.</div>';  	   //Mensagem Acesso negado
var secResgate_direito_a = "% Direito";    //Texto % Direito participante
var secResgate_direito_b = "% Direito";    //Texto % Direito patrocinadora

//Excluidos
//var secHipot_meta	= "Expectativa de Rentabilidade Real (a.a.):";  	//Texto para seleção de combo-box
//var secHipot_msg2	= "A expectativa de rentabilidade real não representa garantia de rentabilidade futura. A rentabilidade do Plano dependerá das variações do mercado financeiro.";  	//Texto Campo Mensagem para Expectativa de Rentabilidade Real
//var secAltBenef = '<div id="secAltBenef" class="panel panel-default hidden-xs"><div class="panel-body"><span id="secAltBenef_msg1"><p align="justify"></p><p>Para alterar sua forma de recebimento do benefício de aponsetadoria pelo valor simulado. <a href="javascript:void(0)" onclick="GerarForm(2)" target="_blank"><b>Clique aqui</b></a> e acesse o formulário de requerimento de alteração. Basta assinar e enviar ou entregar na EMBRAER PREV no endereço que consta no próprio documento.</p></span></div></div>';

//  ------------------------------------------------------------  Functions  ---------------------------------------------------------

//Alimentação Select Beneficio
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

    //Inicia o simulador na primeira opção de simulação
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

            $("#secBenefApos_Temporaria").html('Benefício de ' + $("#SelecionaBeneficio :selected").text());
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

  switch (true){
      case (idGerarForm == 1):
        //Parâmetros de envio
        numContrib = $('#fnc9').val();
        resultNumExtenso = numContrib + " ("+new String(numContrib).extenso(true)+"),";
        resultNumExtenso = resultNumExtenso.replace('R$','');
        form = document.getElementById('frmParametros');  
        form.urlGo.value = 'https://www.portal-hro.com.br/cadastro/Private/ClientModule/Reports/pdfCreator.aspx?rptCod=24&contrib='+resultNumExtenso;
        form.setAttribute("target", "_blank");
        form.submit();
        break;  
      case (idGerarForm == 2):        
        //Parâmetros de envio                
        if (BenefCheckOpt == 0) { //Percentual          
          valorNovo = ValPerc.toString().replace('.',',');          
          tipoPagamento = 3;
        } else if (BenefCheckOpt == 1) { //Prazo em meses
      	  valorNovo = (Math.floor(ValPrazo) * Nper) + Math.round((ValPrazo - Math.floor(ValPrazo)) * Nper);
          tipoPagamento = 2;
        } else {  //Renda Certa
          valorNovo = ValRenda.toString().replace('.',',');
          tipoPagamento = 7;
        }
  
        form = document.getElementById('frmParametros');
        form.urlGo.value = 'https://www.portal-hro.com.br/cadastro/Private/ClientModule/Reports/pdfCreator.aspx?rptCod=25&tipoPg='+tipoPagamento+'&vNovo='+valorNovo;         
        form.setAttribute("target", "_blank");
        form.submit();
        break;
  }   

}

