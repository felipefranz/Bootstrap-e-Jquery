//Vari�veis ainda n�o alimentadas pelo banco
var Nper = status == 3 ? 12 : 13;                  //Quantidade de pagamentos no ano configurado para o Plano
var Ncontrib = status == 3 ? 1 : 5;                 //N�mero de contribui��es no ano usar case 1 = 12 meses ou case 5 = 13 meses
var v13pagto = true;                              //Plano paga d�cimo terceiro? true ou false
var v13PropMBenefAno = false;                     //Plano paga d�cimo terceiro sobre maior benef�cio no ano && abono � proporcional a (quantidade de meses / 12)? true ou false
var CrescSalaa = 0.00;                            //% crescimento salarial a.a.
var ROIaa1 = 0.00;                                //Meta atuarial ao ano do Plano - Perfil 1
var ROIaa2 = 0.06;                                //Meta atuarial ao ano do Plano - Perfil 2
var ValPerc = 1;                               //Valor inicial da forma de pagamento Percentual
var MinPerc = 1;                               //Valor m�nimo da forma de pagamento Percentual
var MaxPerc = 1;                                  //Valor m�ximo da forma de pagamento Percentual
var IncPerc = 0;                               //Incremento da forma de pagamento Percentual
var IncPrazo = 0;                                 //Incremento da forma de pagamento Prazo
var ValPrazo = 0;                                 //Valor inicial da forma de pagamento Prazo
var MinPrazo = 0;                                 //Valor m�nimo da forma de pagamento Prazo
var MaxPrazo = 0;                                //Valor m�ximo da forma de pagamento Prazo
var ValRenda = 0;                              //Valor percentual inicial da forma de pagamento onde, Renda Certa Inicial = Saldo de benef�cio dispon�vel * ValRenda
var MinRenda = 0;                             //Valor percentual m�nimo da forma de pagamento onde, Renda Certa Min = Saldo de benef�cio dispon�vel * MinRenda
var MaxRenda = 0;                               //Valor percentual m�ximo da forma de pagamento onde, Renda Certa Max = Saldo de benef�cio dispon�vel * MaxRenda
var IncRenda = 0;                               //Incremento da forma de pagamento Renda Certa em R$
var vlINPC = [];                                   //Array de �ndice INPC
var FatorAtuarial = [];                            //Array de Fatores Atuariais - contribui��o J�ia
var TabuaJoia = [];                                    //Array Tabua Atuarial - contribui��o J�ia
var TabuaBPDMasc = [];                              //Array Tabua BPD Masculino
var TabuaBPDFem = [];                              //Array Tabua BPD Feminino
var MaxSalPart = TetoINSS * 4;
var MinBenef = TetoINSS * 0.05;                    //Valor m�nimo para pagamento do benef�cio mensal
var TSINSS = (Deslogado == false) ? DadosPlano.TSINSS : 0;                    //Tempo de inss anterior a ades�o ao plano
var pgtoJoia;                                     //Flag de direito a contribui��o j�ia
var SaldoMin = 0;                      		  //Valor do saldo m�nimo para pagamento �nico
var typePgtoJoia;                                     //Flag contribui��o j�ia, 0 = N�o paga Joia, 1 = Paga J�ia Mensal, 2 = J�ia pagamento �nico, Atribui��o do Valor na Monta_Contrib()
var HistSalario = (Deslogado == false) ? DadosPlano.historico_salario : [];   //Array de Hist�rico de Sal�rios, se deslogado inicia com null
var pgtoPercHabilit = true;
var pgtoPrazoHabilit = false;
var pgtoRendaHabilit = false;
var pgtoRendaHabilitaSlider = false; //flag de controle para habilitar funcionamento de simula��o de renda certa pelo componente slider, default false componente input
var HabilitaMultiBeneficio = (url_retorno.indexOf("PesquisaParticipante") >= 0) ? true : false;              //Habilita Select de escolha de simula��o
var pgtoRendaFinanceira = false;
var pgtoRendaVitalicia = true;
var pgtoRendaTemporaria = true;
var desabilitaMeta = true;
var desabilitaMeta2 = false;
var desabilitaSalGrow = false;
var url_Home = '/portal/site/FIPECq/';

//Variaveis JsonDeslogado
var guestEmail = "";
var guestTelefone = "";

if (Deslogado) {
  CPF = CPF.length == 14 ? CPF : CPF.substring(0,3) + '.' + CPF.substring(3,6) + '.' + CPF.substring(6,9) + '-' + CPF.substring(9,11);
  guestEmail = JsonDeslogado.Email;
  guestTelefone = JsonDeslogado.Telefone;
}

//Dicion�rio de termos
var home_logo = '<a class="navbar-brand" href="'+url_Home+'"><img src="res/img/logo_'+Id_entidade+'_'+Id_plano+'.png" class="img-responsive" style="height:38px; margin-top:-10px;"></a>';
var home_text =	'<a href="'+url_Home+'" class="navbar-link">Voltar</a>';  	            //Link Home
var secPermission_acessoNegado = '<div class="alert alert-warning" role="alert"><strong>Ops!</strong> Acesso Negado. <a href="'+url_Home+'">Clique aqui</a> para voltar � p�gina inicial.</div>';  	            //Mensagem Acesso negado e impress�o de link home
var secInfo_iPessoais = "Informa��es Pessoais";  	          //Texto T�tulo div secInfo, Informa��es Pessoais
var secInfo_name = "Nome Completo";  	                      //Texto Nome Completo
var secInfo_cpf = "CPF";                        	          //Texto CPF
var secInfo_birth = "Data de Nascimento";        	          //Texto Data de Nascimento
var secInfo_dtAdmission = "Data de Admiss�o";  	            //Texto Data de Admiss�o
var secInfo_dtAccess = "Data de Ades�o";            	      //Texto Data de Ades�o
var secInfo_dtTermination = "Data de Desligamento";  	      //Texto Data de Desligamento
var secInfo_fldStatus = "Situa��o Atual";  	                //Texto Situa��o Atual
var secSaldo_sContas = "Reserva de Poupan�a e Recursos Portados";  	          //Texto T�tulo div secSaldo, Saldo de Contas
var secSaldo_taxopt	= "Regime de Tributa��o:";  	          //Texto Regime de Tributa��o
var secSaldo_dtbal = "Data do Saldo:";               	      //Texto Data do Saldo
var secSaldo_fldMyBalance	= "Valor da Reserva de Poupan�a";  	                //Texto Meu Saldo
var secSaldo_fldCompanyBalance = "Saldo da Empresa";  	    //Texto Saldo da Empresa
var secSaldo_fldPortability = "Saldo de Recursos Portados";      //Texto Portabilidade Fechada
var secContrib_nomePlan	=	'Simule abaixo as contribui��es futuras ao Plano '+nome_plano_abrev.toUpperCase()+' para composi��o do benef�cio de aposentadoria.';  //Texto Campo Mensagem para simula��o
var secContrib_cPlan = "Contribui��es ao Plano";  	   //Texto T�tulo div secContrib, Contribui��es ao Plano
var secContrib_salary	= "�ltimo Sal�rio:";  	           //Texto �ltimo Sal�rio
var secContrib_urp = "URP:";  	                         //Texto URP
var secHipotBenef_Select = 'Selecione o tipo de simula��o:';     //Texto div select beneficio
var secHipotRendaFinanceira = 'Renda Financeira';        //Texto Select Benef�cio Renda Financeira
var secHipotRendaVitalicia = 'Renda Vital�cia';          //Texto Select Benef�cio Renda Vitalicia
var secHipotRendaTemporaria1 = 'Aux�lio Doen�a';         //Texto Select Benef�cio Renda Temporaria 
var secHipot_msg1 = "Selecione abaixo a data futura de sua simula��o.";  	//Texto, Campo Mensagem para sele��o de data
var secHipot_simulation	= "Simula��o";  	                 //Texto T�tulo div secHipot, Simula��o
var secHipot_barra = "Utilize a barra abaixo para projetar seu saldo na data de sua simula��o";  	//Texto para utiliza��o da barra slider
var secHipot_age = "Idade:";  	                          //Texto Idade
var secHipot_meta	= "Expectativa de Rentabilidade Futura (a.a.):";  	//Texto para sele��o de combo-box
var secHipot_meta2	= "Expectativa de Rentabilidade Futura (a.a.):";  	//Texto para sele��o de combo-box
var secHipot_msg2	= '<p align="justify">A expectativa de rentabilidade real selecionada acima n�o representa garantia de rentabilidade futura, n�o podendo ser considerada para qualquer outro fim sen�o mera simula��o.</p><p align="justify">A rentabilidade do Plano depender� das varia��es do mercado financeiro, das regras previstas no regulamento em cada momento, al�m de outros fatores externos de ordem econ�mica, administrativa ou atuarial que possam influenciar no resultado final.</p>';  	//Texto Campo Mensagem para Expectativa de Rentabilidade Real
var secCrescSal_salgrow	= "Expectativa de Crescimento Salarial Real (a.a.):";  	//Texto para sele��o de combo-box
var secCrescSal_msg1 = "A expectativa de crescimento salarial real n�o � garantida, podendo variar para mais ou para menos de acordo com sua evolu��o profissional.";  	//Texto Campo Mensagem para Expectativa de Crescimento Salarial Real
var secMsgBenefOK = 'Voc� adquiriu direito ao Benef�cio de Aposentadoria, <a href="#secSimulation" class="alert-link">clique aqui</a> e confira!';  //Texto  comunica direito ao benef�cio
var secBenefApos_Temporaria = "Benef�cio";                                //Texto T�tulo div secBenefApos_Vitalicia, Aposentadoria 
var secBenefApos_Vitalicia = "Benef�cio em Renda Vital�cia";                                //Texto T�tulo div secBenefApos_Vitalicia, Aposentadoria
var secBenefApos_benefApos = "Benef�cio em Renda Financeira";                               //Texto T�tulo div secBenefApos_benefApos, Aposentadoria
var secBenefAnterior_ultBenef	= "Valor do �ltimo Benef�cio:";      //Texto Valor do �ltimo Benef�cio
var secBenefAnterior_recebAtual	= "Forma de Recebimento Atual:";   //Texto Forma de Recebimento Atual
var secSaque_msg1	= 'Selecione abaixo o % para saque de seu saldo futuro, no momento da sua aposentadoria. <p>Quanto maior o saque, menor ser� o benef�cio mensal de aposentadoria.</p>';  	//Texto Campo Mensagem orienta��o % para saque
var secSaque_fldMyBenBal = "Saldo Futuro de Aposentadoria:";  	  //Texto Saldo Futuro de Aposentadoria
var secSaque_barra = "Utilize a barra abaixo para simular o valor de seu saque";  	//Texto para utiliza��o da barra slider
var secSaque_percSaque = "% de Saque:";                          	//Texto Percentual de Saque
var secSaque_sBruto	= "Saque Bruto:";  	                          //Texto Saque Bruto
var secSaque_irSaque = "IR do Saque:";  	                        //Texto IR do Saque
var secSaque_sLiquido	=	"Saque L�quido:";                         	//Texto Saque L�quido
var tamBeneBox_msg1	=	"Selecione abaixo a forma de recebimento e o n�vel de benef�cio futuro de aposentadoria.";  	//Texto Campo Mensagem orienta��o sele��o de benef�cio futuro
var tamBeneBox_remainBenBal	=	"Saldo Remanescente de Aposentadoria:";	//Texto Saldo Remanescente de Aposentadoria
var tamBeneBox_bMensal	=	"Selecione abaixo a forma de recebimento de seu benef�cio mensal";  	//Texto Mensagem orienta��o sele��o de forma de recebimento
var tamBeneBox_perc	=	"Percentual do Saldo";                                                 	//Texto Percentual do Saldo
var tamBeneBox_prazo	=	"Prazo Determinado";  	                                               //Texto Prazo Determinado
var tamBeneBox_renda	=	"Renda Certa";                                                         //Texto Renda Certa
var tamBeneBox_barra	=	"Utilize a barra abaixo para simular o valor de seu benef�cio mensal";  	//Texto para utiliza��o da barra slider
var tamBeneBox_pmt	=	"Forma de Recebimento:";  	                                         //Texto Forma de Recebimento
var tamBeneBox_input = "Digite no campo abaixo o valor que deseja receber no seu benef�cio mensal";  	//Texto para digita��o do benef�cio no campo input
var tamBeneBox_amount	=	"Benef�cio Inicial Bruto:";  	                                     //Texto Benef�cio Inicial Bruto
var tamBeneBox_benefIrValue	=	"IR Benef�cio Inicial:";  	                                //Texto IR Benef�cio Inicial
var tamBeneBox_benefNet	=	"Benef�cio Inicial L�quido:";                                    //Texto Benef�cio Inicial L�quido
var secBeneApos_grafico	=	"Gr�fico do Saldo Projetado";                                   //Texto T�tulo div secBeneApos, Gr�fico
var secBeneApos_evolution	=	"Evolu��o de seu benef�cio adicional";  	//Texto Mensagem orienta��o para visualiza��o da evolu��o do benef�cio
var Limit100Text = "Proje��o limitada a 100 anos de idade.";                              //Texto de idade limite na proje��o
var secResgate_rProjetado	=	"Reserva de Poupan�a Projetada";  	                             //Texto T�tulo div secResgate, Saldo do Resgate Projetado
var secResgate_rescPartBal	=	"Meu Saldo";  	                                       //Texto Meu Saldo (a)
var secResgate_direito	=	"% Direito";  	                                               //Texto % Direito
var secResgate_rescCpnyBal	=	"Saldo da Empresa";  	                                  //Texto Saldo da Empresa (b)
var secResgate_rescTotBal	=	"Resgate Bruto (a)";                                      	//Texto Resgate Bruto (a+b)
var secResgate_rescTax	=	"Imposto de Renda (b)";                                       	//Texto Imposto de Renda (c)
var secResgate_rescNet	=	"Resgate L�quido (a-b)";  	                                //Texto Resgate L�quido (a+b)-(c)
var secMsg_msg1	=	'<p align="justify">Os valores apresentados s�o meramente ilustrativos, n�o gerando qualquer expectativa direito de recebimento do resultado final do simulador.</p><p align="justify">A simula��o foi realizada de acordo com os dados cadastrais atuais do Participante, assim como com base no Regulamento do Plano vigente no momento da simula��o, podendo sofrer altera��es at� a data efetiva do recebimento do benef�cio. As informa��es apresentadas ser�o reavaliadas no momento do pedido de concess�o de benef�cio, realizado de acordo com o regulamento vigente naquele momento, com base na documenta��o ent�o apresentada na data da elegibilidade ao benef�cio de aposentadoria.</p>';  	//Texto Mensagem orienta��o sobre os valores apresentados no simulador
var secMsg_dtSaldoFoot	=	"Data do Saldo de Contas Atual: ";  	                               //Texto Data do Saldo de Contas
var secMsg_dtSaldoProjFoot	=	"Data do Saldo Projetado: ";  	        //Texto Data do Saldo Projetado
var secMsg_dtNowFoot	=	"Data e Hora da Simula��o: ";   	                                  //Texto Data e Hora da Simula��o
var CopyrigtText	=	"&copy; "+text_Ano+" "+nome_entidade_abrev+". Todos os direitos reservados.";	        //Texto rodap� concatenado com o nome da entidade abreviado
var MinBenText = "Valor m�nimo de benef�cio atingido. Benef�cio transformado em pagamento �nico.";    //Texto pagamento �nico
var BenMinText = "Eleg�vel ao Benef�cio M�nimo.";    //Texto benef�cio m�nimo
var SaldoMinText = "Valor m�nimo de saldo atingido. Benef�cio transformado em pagamento �nico.";    //Texto pagamento �nico por saldo m�nimo
var msgBenefOK_text = "Eleg�vel a aposentadoria.";    //Texto slide idade aposentadoria
var msgBenefTempOK_text = "Eleg�vel ao benef�cio.";    //Texto slide idade benef�cio tempor�rio
var secValidacaoINSS = '<i class="fa fa-question-circle-o fa-2" style="font-size:15px;" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="Benef�cio Previdencial de Aposentadoria calculado conforme Regulmento do PPC, na forma disposta no artigo 16 e seus par�grafos."></i>';
var secValidacaoSRB = '<i class="fa fa-question-circle-o fa-2" style="font-size:15px;" aria-hidden="true" data-toggle="tooltip" data-placement="bottom"  title="Sal�rio Real de Benef�cio calculado na forma do no � 1� do artigo 15 do Regulamento do PPC."></i>';
var secValidacaoBenefAdicional = '<i class="fa fa-question-circle-o fa-2" style="font-size:15px;" aria-hidden="true" data-toggle="tooltip" data-placement="bottom"  title="Adicional de Aposentadoria � igual a 20% (vinte por cento) do respectivo Sal�rio Real de Benef�cio limitado a 25% (vinte e cinco por cento) do teto do sal�rio de contribui��o para Previd�ncia Social, vigente na data da concess�o, conforme o disposto no caput e � 1� do artigo 22 do Regulamento do PPC."></i>';
var secValidacaoFTContrib = '<i class="fa fa-question-circle-o fa-2" style="font-size:15px;" aria-hidden="true" data-toggle="tooltip" data-placement="bottom"  title="Fator apurado conforme o disposto nos par�grafos 2� e 3� do artigo 22 do Regulamento do PPC."></i>';      
var secValidacaoFIdade = '<i class="fa fa-question-circle-o fa-2" style="font-size:15px;" aria-hidden="true" data-toggle="tooltip" data-placement="bottom"  title="Fator apurado conforme o disposto no par�grafo 4� do artigo 22 do Regulamento do PPC."></i>';
var secValidacaoFJoia = '<i class="fa fa-question-circle-o fa-2" style="font-size:15px;" aria-hidden="true" data-toggle="tooltip" data-placement="bottom"  title="Valor deduzido do benef�cio decorrente da op��o pelo n�o pagamento de j�ia pelo participante, conforme o disposto na al�nea b do artigo 52 do Regulamento do PPC."></i>';

//Termos Beneficio Vital�cio
var secVitalicio_msg1 = "Complementa��o de Aposentadoria.";                                 //Texto alert mensagem 1 Aposentadoria Vital�cia
var secVitalicio_barra = "Veja abaixo o valor de seu benef�cio complementar futuro";        //Texto descritivo sobre o saldo de beneficio vital�cio
var secVitalicio_Provento = "(+) Complementa��o PPC:";                                                    //Texto valor de provento
var secVitalicio_Desconto = "(-) Imposto de Renda:";                                                    //Texto valor de desconto
var secVitalicio_Liquido = "(=) Benef�cio L�quido:";                                                      //Texto valor de liquido
var secVitalicio_fldMyBenAdic = "Saldo de Benef�cio Adicional:";                  //Texto aviso de saldo adicional dispon�vel
var secVitalicio_msg2 = "O saldo de benef�cio adicional ser� pago ao participante conforme op��o de recebimento em forma de renda financeira ou como renda vital�cia, com revers�o em pens�o.";                                             //Texto alert mensagem 2 Saldo Adicional

//Termos Beneficio Temporario
var secTemporario_msg1 = "Benef�cio de Complementa��o.";                                 //Texto alert mensagem 1 Beneficio Temporario
var secTemporario_barra = "Veja abaixo o valor de seu benef�cio complementar futuro";        //Texto descritivo sobre o saldo de beneficio temporario
var secTemporario_Provento = "(+) Benef�cio Complementar:";                                                    //Texto valor de provento
var secTemporario_Desconto = "(-) Imposto de Renda:";                                                    //Texto valor de desconto
var secTemporario_Liquido = "(=) Benef�cio L�quido:";                                                      //Texto valor de liquido
var secTemporario_fldMyBenAdic = "Saldo de Benef�cio Adicional:";                  //Texto aviso de saldo adicional dispon�vel
var secTemporario_msg2 = "O saldo de benef�cio adicional ser� pago ao participante conforme op��o de recebimento em forma de renda financeira ou como renda vital�cia, com revers�o em pens�o.";                                             //Texto alert mensagem 2 Saldo Adicional

//Termos Simula��o Tempor�rio
var secHipotRendaTemp_ctrl1 = '';                  //Texto legenda do Controle 1
var secRtCtrl1_msg1 = '' ;                         //Texto explicativo do Controle 1
var secHipotRendaTemp_ctrl2 = '';                  //Texto legenda do Controle 2
var secRtCtrl2_msg1 = '';                          //Texto explicativo do Controle 2

//Termos Mobile App
var secMsg_msg2	=	'<p align="justify">Os valores apresentados s�o apenas ilustrativos. Os valores reais depender�o do retorno de investimentos e do n�vel de contribui��es efetuadas para o Plano.</p><p align="justify">A simula��o ser� realizada conforme dados cadastrais do Participante e o regulamento do Plano, podendo o mesmo sofrer altera��es. Essas informa��es ser�o reavaliadas com base na documenta��o apresentada na data da elegibilidade ao benef�cio de aposentadoria.</p>';  	//Texto Mensagem orienta��o sobre os valores apresentados no simulador
var secSaldo_info_m = "Veja abaixo seu saldo acumulado at� o momento.";          //Texto Mensagem informa��es de saldo
var secContrib_info_m = "Simule abaixo suas contribui��es futuras ao plano.";    //Texto Mensagem informa��es de constribui��o
var secResgate_info_m = "Veja abaixo o saldo de reserva projetado.";             //Texto Mensagem informa��es de resgate
var secPermission_acessoNegado_m = '<div class="alert alert-warning" role="alert"><strong>Ops!</strong> Voc� n�o possui acesso ao simulador de benef�cios.</div>';  	   //Mensagem Acesso negado
var secResgate_direito_a = "% Direito";    //Texto % Direito participante
var secResgate_direito_b = "% Direito";    //Texto % Direito patrocinadora

//  ---  Alimenta��o de Arrays tabuas Atuariais  ---

//Alimenta��o e convers�o parseInt e parseFloat de valores de array no simulador
for (var l in DadosPlano.TabuaJoia){
        var obj = DadosPlano.TabuaJoia[l];
        TabuaJoia.push({ idade: parseInt(obj.Idade), indicador: parseFloat(obj.Indicador), fator1: parseFloat(obj.Fator1), fator2: parseFloat(obj.Fator2)});
    };


for (var l in DadosPlano.FatorAtuarial){
        var obj = DadosPlano.FatorAtuarial[l];
        FatorAtuarial.push({ idade: parseInt(obj.Idade), fator: parseFloat(obj.Fator) });
    };


if(status == '2'&& DtDeslig != null){ //Se for BPD

for (var l in DadosPlano.TabuaBPDMasc){
        var obj = DadosPlano.TabuaBPDMasc[l];
        TabuaBPDMasc.push({ x: parseInt(obj.x), ax12: parseFloat(obj.ax12), axh12: parseFloat(obj.axh12), dxaa: parseFloat(obj.Dxaa), nxai12: parseFloat(obj.Nxai12), nxaih12: parseFloat(obj.Nxaih12), nxah12: parseFloat(obj.Nxah12)});
    };


for (var l in DadosPlano.TabuaBPDFem){
        var obj = DadosPlano.TabuaBPDFem[l];
        TabuaBPDFem.push({ x: parseInt(obj.x), ax12: parseFloat(obj.ax12), axh12: parseFloat(obj.axh12), dxaa: parseFloat(obj.Dxaa), nxai12: parseFloat(obj.Nxai12), nxaih12: parseFloat(obj.Nxaih12), nxah12: parseFloat(obj.Nxah12)});
    };

}

// ----------------------------  Functions  -------------------------

//Alimenta��o Select Beneficio
function iniciaSelectBeneficio(){   
    
    var selectText = '';

    //Limpa totalmente o select 
    $('#SelecionaBeneficio').find('option').remove().end();

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

function sendEmailAdesao(idDiv){ //Envio de E-Mail Adesao

   var objeto = {};
   var recipients = "felipe.dutra@conduent.com;";
   var copyRecipients = "alex.santana2@conduent.com; arthur.silva3@conduent.com;";
   var subject = "Simulador de Benef�cios PPC - Solicita��o de Ades�o";
   var bodyEmail = "";
   var objEmail = '{"NomeItem":[ "Nome Completo:"' 
                            + ',"CPF:"' 
                            + ',"Sexo:"' 
                            + ',"E-mail:"' 
                            + ',"Telefone:"' 
                            + ',"Data de Nascimento:"' 
                            + ',"Data de Admiss�o:"' 
                            + ',"Quantidade dependentes:"' 
                            + ',"Sal�rio:"' 
                            + ',"Regime de Tributa��o:"' 
                            +'],' 
                + '"ValorItem":[ "' + Nome + '"'
                            + ',"' + CPF + '"' //formata
                            + ',"' + (Sexo == '01' ? 'Masculino' : 'Feminino') + '"' //formata
                            + ',"' + guestEmail + '"' //formata
                            + ',"' + guestTelefone + '"' //formata
                            + ',"' + $("#birth").val() + '"' //formata
                            + ',"' + $("#dtadmission").val() + '"' //formata
                            + ',"' + QntDep + '"'
                            + ',"' + $("#salary").val() + '"' //formata
                            + ',"' + $("#taxopt").val() + '"' //formata
                            + ']' 
                + '}'; 

    objEmail = JSON.parse(objEmail);

    //Inicio E-mail                 
    bodyEmail = "<html><body><table align='center'  border='0' width='100%' style='font-size:15pt' cellpadding='0' cellspacing='1'>";
    
    //Constroi corpo E-mail
    for (var i = 0; i <= (objEmail.NomeItem.length - 1); i++){
      bodyEmail += '<tr><td><strong>' + objEmail.NomeItem[i] + '</strong> ' + objEmail.ValorItem[i]  + '</td></tr>';
    };

    //Fim E-mail
    bodyEmail += '</table></body></html>';
   
    objeto = '{"recipients":"' + recipients + '"'
             +',"copyRecipients":"' + copyRecipients + '"' 
             +',"body":"' + bodyEmail + '"' 
             +',"subject":"' + subject + '"' 
             +'}';

   objeto = JSON.parse(objeto);   
   objeto.body = objeto.body.split("'").join("\"");

   sendEmailDefault(objeto, idDiv);                    
}

function adesaoPrintBtn(){ //Imprime bot�o envio de e-mail

    var divAdesaoMsg = '<div class="row step" id="divAdesaoMsg"> <div id="btn-adesao-msg-div" class="col-xs-12 col-sm-12 col-md-12"> <a id="btn-adesao-msg" type="button" class="btn btn-primary col-xs-12 col-sm-12 col-md-12" role="button" onclick="sendEmailAdesao(\'#msgReturnAdesao\');"> Quero aderir ao Plano</a> </div><br/><p id="msgReturnAdesao" style="font-size: 12px"></p> </div>';
    var bodyOld = $("#secResgate").html();

    if(bodyOld.indexOf("divAdesaoMsg")<0){
      $('#secResgate').append(divAdesaoMsg); 
    }
}


function loadEmailDefault(msgReturn, idDiv) {
    
    switch(true){
        case (idDiv == "#msgReturnAdesao"): //E-mail Adesao
            if (msgReturn.d == "Mensagem Enviada com Sucesso.") {
                $('' + idDiv).text('Seus dados foram encaminhados a FIPECq ');
                $('' + idDiv).append('<span class="glyphicon glyphicon-ok" style="color:green;font-size:20px;"></span>');
                $('' + idDiv).fadeIn();
            } else {
                $('' + idDiv).text(msgReturn.d.toString());
                $('' + idDiv).append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:20px;"></span>');
                $('' + idDiv).fadeIn();
            };
            $('' + idDiv).fadeOut(4500);      
        break;
        default: 
            try  {
                $('' + idDiv).text('Seus dados foram encaminhados a FIPECq ');
                $('' + idDiv).append('<span class="glyphicon glyphicon-ok" style="color:green;font-size:20px;"></span>');
                $('' + idDiv).fadeIn();
            }
            catch (err) {
                $('' + idDiv).text(err.toString());
                $('' + idDiv).append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:20px;"></span>');
                $('' + idDiv).fadeIn();
            };   
            $('' + idDiv).fadeOut(4500);
        break;
    }

}
