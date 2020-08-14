<!-- saved from url=(0016)http://localhost -->

//Excluir depois este código
isMobileApp() ? "" : $("#secValidacao").removeClass("hide");

//Variáveis ainda não alimentadas pelo banco
var Nper = 13;                                    //Quantidade de pagamentos no ano configurado para o Plano 
var Ncontrib = 1;                                 //Número de contribuições no ano usar case 1 = 12 meses ou case 5 = 13 meses 
var v13pagto = true;                              //Plano paga décimo terceiro? true ou false
var v13PropMBenefAno = false;                     //Plano paga décimo terceiro sobre maior benefício no ano && abono é proporcional a (quantidade de meses / 12)? true ou false
var CrescSalaa = 0.00;                            //% crescimento salarial a.a.
var ROIaa1 = 0.06;                                //Meta atuarial ao ano do Plano - Perfil 1
var ROIaa2 = 0.06;                                //Meta atuarial ao ano do Plano - Perfil 2
var ValPerc = 1;                               //Valor inicial da forma de pagamento Percentual
var MinPerc = 1;                               //Valor mínimo da forma de pagamento Percentual
var MaxPerc = 1;                                  //Valor máximo da forma de pagamento Percentual
var IncPerc = 0;                               //Incremento da forma de pagamento Percentual
var IncPrazo = 0;                                 //Incremento da forma de pagamento Prazo
var ValPrazo = 0;                                 //Valor inicial da forma de pagamento Prazo
var MinPrazo = 0;                                 //Valor mínimo da forma de pagamento Prazo
var MaxPrazo = 0;                                //Valor máximo da forma de pagamento Prazo
var ValRenda = 0;                              //Valor percentual inicial da forma de pagamento onde, Renda Certa Inicial = Saldo de benefício disponível * ValRenda
var MinRenda = 0;                             //Valor percentual mínimo da forma de pagamento onde, Renda Certa Min = Saldo de benefício disponível * MinRenda
var MaxRenda = 0;                               //Valor percentual máximo da forma de pagamento onde, Renda Certa Max = Saldo de benefício disponível * MaxRenda
var IncRenda = 0;                               //Incremento da forma de pagamento Renda Certa em R$
var vlINPC = [];                                   //Array de índice INPC
var FatorAtuarial = [];                            //Array de Fatores Atuariais - contribuição Jóia
var Tabua = [];                                    //Array Tabua Atuarial - contribuição Jóia
var MaxSalPart = TetoINSS * 4;
var MinBenef = TetoINSS * 0.05;                    //Valor mínimo para pagamento do benefício mensal
var pgtoJoia;                                     //Flag de direito a contribuição jóia
var SaldoMin = 0;                      		  //Valor do saldo mínimo para pagamento único
var typePgtoJoia;                                     //Flag contribuição jóia, 0 = Não paga Joia, 1 = Paga Jóia Mensal, 2 = Jóia pagamento único, Atribuição do Valor na Monta_Contrib()
var HistSalario = (Deslogado == false) ? DadosPlano.historico_salario : [];   //Array de Histórico de Salários, se deslogado inicia com null
var pgtoPercHabilit = true;
var pgtoPrazoHabilit = false;
var pgtoRendaHabilit = false;
var pgtoRendaVitalicia = true;
var pgtoRendaFinanceira = false;
var desabilitaMeta = false;
var desabilitaSalGrow = false;
var url_Home = '/portal/site/FIPECq/';
      
//Dicionário de termos
var home_logo = '<a class="navbar-brand" href="'+url_Home+'"><img src="res/img/logo_'+Id_entidade+'_'+Id_plano+'.png" class="img-responsive" style="height:38px; margin-top:-10px;"></a>';
var home_text =	'<a href="'+url_Home+'" class="navbar-link">Voltar</a>';  	            //Link Home
var secPermission_acessoNegado = '<div class="alert alert-warning" role="alert"><strong>Ops!</strong> Acesso Negado. <a href="'+url_Home+'">Clique aqui</a> para voltar à página inicial.</div>';  	            //Mensagem Acesso negado e impressão de link home
var secInfo_iPessoais = "Informações Pessoais";  	          //Texto Título div secInfo, Informações Pessoais
var secInfo_name = "Nome Completo";  	                      //Texto Nome Completo
var secInfo_cpf = "CPF";                        	          //Texto CPF
var secInfo_birth = "Data de Nascimento";        	          //Texto Data de Nascimento
var secInfo_dtAdmission = "Data de Admissão";  	            //Texto Data de Admissão
var secInfo_dtAccess = "Data de Adesão";            	      //Texto Data de Adesão
var secInfo_dtTermination = "Data de Desligamento";  	      //Texto Data de Desligamento
var secInfo_fldStatus = "Situação Atual";  	                //Texto Situação Atual
var secSaldo_sContas = "Reserva de Poupança Atual";  	          //Texto Título div secSaldo, Saldo de Contas
var secSaldo_taxopt	= "Regime de Tributação:";  	          //Texto Regime de Tributação
var secSaldo_dtbal = "Data do Saldo:";               	      //Texto Data do Saldo
var secSaldo_fldMyBalance	= "Reserva";  	                //Texto Meu Saldo
var secSaldo_fldCompanyBalance = "Saldo da Empresa";  	    //Texto Saldo da Empresa
var secSaldo_fldPortability = "Portabilidade Fechada";      //Texto Portabilidade Fechada
var secContrib_nomePlan	=	'Simule abaixo as contribuições futuras ao Plano '+nome_plano_abrev.toUpperCase()+' para composição do benefício de aposentadoria.';  //Texto Campo Mensagem para simulação
var secContrib_cPlan = "Contribuições ao Plano";  	   //Texto Título div secContrib, Contribuições ao Plano
var secContrib_salary	= "Último Salário:";  	           //Texto Último Salário
var secContrib_urp = "URP:";  	                         //Texto URP
var secHipot_msg1 = "Selecione abaixo a data futura de sua simulação.";  	//Texto, Campo Mensagem para seleção de data
var secHipot_simulation	= "Simulação";  	                 //Texto Título div secHipot, Simulação
var secHipot_barra = "Utilize a barra abaixo para projetar seu saldo na data de sua simulação";  	//Texto para utilização da barra slider
var secHipot_age = "Idade:";  	                          //Texto Idade
var secHipot_meta	= "Expectativa de Rentabilidade Real (a.a.):";  	//Texto para seleção de combo-box
var secHipot_msg2	= "A expectativa de rentabilidade real não representa garantia de rentabilidade futura. A rentabilidade do Plano dependerá das variações do mercado financeiro.";  	//Texto Campo Mensagem para Expectativa de Rentabilidade Real 
var secCrescSal_salgrow	= "Expectativa de Crescimento Salarial Real (a.a.):";  	//Texto para seleção de combo-box
var secCrescSal_msg1 = "A expectativa de crescimento salarial real não é garantida, podendo variar para mais ou para menos de acordo com sua evolução profissional.";  	//Texto Campo Mensagem para Expectativa de Crescimento Salarial Real
var secMsgBenefOK = 'Você adquiriu direito ao Benefício de Aposentadoria, <a href="#secSimulation" class="alert-link">clique aqui</a> e confira!';  //Texto  comunica direito ao benefício
var secBenefAnterior_ultBenef	= "Valor do Último Benefício:";      //Texto Valor do Último Benefício
var secBenefAnterior_recebAtual	= "Forma de Recebimento Atual:";   //Texto Forma de Recebimento Atual
var secSaque_msg1	= 'Selecione abaixo o % para saque de seu saldo futuro, no momento da sua aposentadoria. <p>Quanto maior o saque, menor será o benefício mensal de aposentadoria.</p>';  	//Texto Campo Mensagem orientação % para saque
var secSaque_fldMyBenBal = "Saldo Futuro de Aposentadoria:";  	  //Texto Saldo Futuro de Aposentadoria
var secSaque_barra = "Utilize a barra abaixo para simular o valor de seu saque";  	//Texto para utilização da barra slider
var secSaque_percSaque = "% de Saque:";                          	//Texto Percentual de Saque
var secSaque_sBruto	= "Saque Bruto:";  	                          //Texto Saque Bruto
var secSaque_irSaque = "IR do Saque:";  	                        //Texto IR do Saque
var secSaque_sLiquido	=	"Saque Líquido:";                         	//Texto Saque Líquido
var tamBeneBox_msg1	=	"Selecione abaixo a forma de recebimento e o nível de benefício futuro de aposentadoria.";  	//Texto Campo Mensagem orientação seleção de benefício futuro
var tamBeneBox_remainBenBal	=	"Saldo Remanescente de Aposentadoria:";	//Texto Saldo Remanescente de Aposentadoria
var tamBeneBox_bMensal	=	"Selecione abaixo a forma de recebimento de seu benefício mensal";  	//Texto Mensagem orientação seleção de forma de recebimento
var tamBeneBox_perc	=	"Percentual do Saldo";                                                 	//Texto Percentual do Saldo
var tamBeneBox_prazo	=	"Prazo Determinado";  	                                               //Texto Prazo Determinado
var tamBeneBox_renda	=	"Renda Certa";                                                         //Texto Renda Certa
var tamBeneBox_barra	=	"Utilize a barra abaixo para simular o valor de seu benefício mensal";  	//Texto para utilização da barra slider
var tamBeneBox_pmt	=	"Forma de Recebimento:";  	                                         //Texto Forma de Recebimento
var tamBeneBox_amount	=	"Benefício Inicial Bruto:";  	                                     //Texto Benefício Inicial Bruto
var tamBeneBox_benefIrValue	=	"IR Benefício Inicial:";  	                                //Texto IR Benefício Inicial
var tamBeneBox_benefNet	=	"Benefício Inicial Líquido:";                                    //Texto Benefício Inicial Líquido
var secBeneApos_grafico	=	"Gráfico do Saldo Projetado";                                   //Texto Título div secBeneApos, Gráfico
var secBeneApos_evolution	=	"Evolução de seu benefício adicional";  	//Texto Mensagem orientação para visualização da evolução do benefício
var Limit100Text = "Projeção limitada a 100 anos de idade.";                              //Texto de idade limite na projeção
var secResgate_rProjetado	=	"Saldo do Resgate Projetado";  	                             //Texto Título div secResgate, Saldo do Resgate Projetado
var secResgate_rescPartBal	=	"Meu Saldo";  	                                       //Texto Meu Saldo (a)
var secResgate_direito	=	"% Direito";  	                                               //Texto % Direito
var secResgate_rescCpnyBal	=	"Saldo da Empresa";  	                                  //Texto Saldo da Empresa (b)
var secResgate_rescTotBal	=	"Resgate Bruto (a)";                                      	//Texto Resgate Bruto (a+b)
var secResgate_rescTax	=	"Imposto de Renda (b)";                                       	//Texto Imposto de Renda (c)
var secResgate_rescNet	=	"Resgate Líquido (a-b)";  	                                //Texto Resgate Líquido (a+b)-(c)
var secMsg_msg1	=	'<p align="justify">Os valores apresentados são apenas ilustrativos. Os valores reais dependerão do retorno de investimentos e do nível de contribuições efetuadas para o Plano.</p><p align="justify">A simulação foi realizada conforme dados cadastrais do Participante e o regulamento do Plano, podendo o mesmo sofrer alterações. Essas informações serão reavaliadas com base na documentação apresentada na data da elegibilidade ao benefício de aposentadoria.</p>';  	//Texto Mensagem orientação sobre os valores apresentados no simulador
var secMsg_dtSaldoFoot	=	"Data do Saldo de Contas Atual: ";  	                               //Texto Data do Saldo de Contas 
var secMsg_dtNowFoot	=	"Data e Hora da Simulação: ";   	                                  //Texto Data e Hora da Simulação
var CopyrigtText	=	"&copy; "+text_Ano+" "+nome_entidade_abrev+". Todos os direitos reservados.";	        //Texto rodapé concatenado com o nome da entidade abreviado
var MinBenText = "Valor mínimo de benefício atingido. Benefício transformado em pagamento único.";    //Texto pagamento único
var BenMinText = "Elegível ao Benefício Mínimo.";    //Texto benefício mínimo
var SaldoMinText = "Valor mínimo de saldo atingido. Benefício transformado em pagamento único.";    //Texto pagamento único por saldo mínimo      
var msgBenefOK_text = "Elegível a aposentadoria.";    //Texto slide idade aposentadoria

var secBenefApos_Vitalicia = "Benefício em Renda Vitalícia";                                //Texto Título div secBenefApos_Vitalicia, Aposentadoria
var secBenefApos_benefApos = "Benefício em Renda Financeira";                               //Texto Título div secBenefApos_benefApos, Aposentadoria
var secVitalicio_msg1 = "Complementação de Aposentadoria.";                                 //Texto alert mensagem 1 Aposentadoria Vitalícia
var secVitalicio_barra = "Veja abaixo o valor de seu benefício complementar futuro";        //Texto descritivo sobre o saldo de beneficio vitalício  
var secVitalicio_Provento = "(+) Complementação PPC:";                                                    //Texto valor de provento
var secVitalicio_Desconto = "(-) Imposto de Renda:";                                                    //Texto valor de desconto
var secVitalicio_Liquido = "(=) Benefício Líquido:";                                                      //Texto valor de liquido
var secVitalicio_fldMyBenAdic = "Saldo de Benefício Adicional:";                  //Texto aviso de saldo adicional disponível
var secVitalicio_msg2 = "O saldo de benefício adicional será pago ao participante conforme opção de recebimento em forma de renda financeira ou como renda vitalícia, com reversão em pensão.";                                             //Texto alert mensagem 2 Saldo Adicional 

//Termos Mobile App
var secMsg_msg2	=	'<p align="justify">Os valores apresentados são apenas ilustrativos. Os valores reais dependerão do retorno de investimentos e do nível de contribuições efetuadas para o Plano.</p><p align="justify">A simulação será realizada conforme dados cadastrais do Participante e o regulamento do Plano, podendo o mesmo sofrer alterações. Essas informações serão reavaliadas com base na documentação apresentada na data da elegibilidade ao benefício de aposentadoria.</p>';  	//Texto Mensagem orientação sobre os valores apresentados no simulador
var secSaldo_info_m = "Veja abaixo seu saldo acumulado até o momento.";          //Texto Mensagem informações de saldo
var secContrib_info_m = "Simule abaixo suas contribuições futuras ao plano.";    //Texto Mensagem informações de constribuição
var secResgate_info_m = "Veja abaixo o saldo de resgate projetado.";             //Texto Mensagem informações de resgate
var secPermission_acessoNegado_m = '<div class="alert alert-warning" role="alert"><strong>Ops!</strong> Você não possui acesso ao simulador de benefícios.</div>';  	   //Mensagem Acesso negado 
var secResgate_direito_a = "% Direito";    //Texto % Direito participante
var secResgate_direito_b = "% Direito";    //Texto % Direito patrocinadora  

//  ---  Alimentação de Arrays tabuas Atuariais  ---




//Alimentação do array dos fatores atuariais do plano [Idade, Fator]
FatorAtuarial.push({ idade:36, fator:0.03});
FatorAtuarial.push({ idade:37, fator:0.05});
FatorAtuarial.push({ idade:38, fator:0.09});
FatorAtuarial.push({ idade:39, fator:0.14});
FatorAtuarial.push({ idade:40, fator:0.2});
FatorAtuarial.push({ idade:41, fator:0.27});
FatorAtuarial.push({ idade:42, fator:0.36});
FatorAtuarial.push({ idade:43, fator:0.46});
FatorAtuarial.push({ idade:44, fator:0.57});
FatorAtuarial.push({ idade:45, fator:0.7});
FatorAtuarial.push({ idade:46, fator:0.83});
FatorAtuarial.push({ idade:47, fator:0.98});
FatorAtuarial.push({ idade:48, fator:1.15});
FatorAtuarial.push({ idade:49, fator:1.15});
FatorAtuarial.push({ idade:50, fator:1.15});


//Alimentação do array de tabua atuarial do plano [Idade, Indicador, Fator1, Fator2]
Tabua.push({ idade:36, indicador:0.1037, fator1:0.2798, fator2:0.88});
Tabua.push({ idade:36, indicador:0.5183, fator1:1.4482, fator2:0.91});
Tabua.push({ idade:36, indicador:0.5701, fator1:1.728, fator2:0.99});
Tabua.push({ idade:36, indicador:0.622, fator1:2.0077, fator2:1.06});
Tabua.push({ idade:36, indicador:0.6738, fator1:2.2875, fator2:1.11});
Tabua.push({ idade:36, indicador:0.7256, fator1:2.5672, fator2:1.16});
Tabua.push({ idade:36, indicador:0.7775, fator1:2.847, fator2:1.2});
Tabua.push({ idade:36, indicador:0.8293, fator1:3.1268, fator2:1.23});
Tabua.push({ idade:36, indicador:0.8811, fator1:3.4065, fator2:1.26});
Tabua.push({ idade:36, indicador:0.933, fator1:3.6863, fator2:1.29});
Tabua.push({ idade:36, indicador:0.9848, fator1:3.966, fator2:1.32});
Tabua.push({ idade:36, indicador:1.0366, fator1:4.6412, fator2:1.46});
Tabua.push({ idade:36, indicador:1.1403, fator1:6.3197, fator2:1.81});
Tabua.push({ idade:36, indicador:1.244, fator1:7.9983, fator2:2.1});
Tabua.push({ idade:36, indicador:1.3476, fator1:9.4134, fator2:2.28});
Tabua.push({ idade:36, indicador:1.4513, fator1:10.8122, fator2:2.44});
Tabua.push({ idade:36, indicador:1.5549, fator1:12.211, fator2:2.57});
Tabua.push({ idade:36, indicador:1.6586, fator1:13.6098, fator2:2.68});
Tabua.push({ idade:36, indicador:1.7623, fator1:15.0084, fator2:2.78});
Tabua.push({ idade:36, indicador:1.8659, fator1:16.4073, fator2:2.87});
Tabua.push({ idade:36, indicador:1.9696, fator1:17.806, fator2:2.96});
Tabua.push({ idade:36, indicador:2.0733, fator1:19.2049, fator2:3.03});
Tabua.push({ idade:36, indicador:2.246, fator1:21.5362, fator2:3.13});
Tabua.push({ idade:36, indicador:2.4188, fator1:23.8676, fator2:3.23});
Tabua.push({ idade:36, indicador:2.5916, fator1:26.1989, fator2:3.3});
Tabua.push({ idade:36, indicador:2.7643, fator1:28.5303, fator2:3.37});
Tabua.push({ idade:36, indicador:2.9371, fator1:30.8614, fator2:3.43});
Tabua.push({ idade:36, indicador:3, fator1:31.7104, fator2:3.46});
Tabua.push({ idade:37, indicador:0.1037, fator1:0.3305, fator2:1.08});
Tabua.push({ idade:37, indicador:0.5183, fator1:1.711, fator2:1.12});
Tabua.push({ idade:37, indicador:0.5701, fator1:2.0416, fator2:1.22});
Tabua.push({ idade:37, indicador:0.622, fator1:2.3721, fator2:1.3});
Tabua.push({ idade:37, indicador:0.6738, fator1:2.7026, fator2:1.36});
Tabua.push({ idade:37, indicador:0.7256, fator1:3.0331, fator2:1.42});
Tabua.push({ idade:37, indicador:0.7775, fator1:3.3637, fator2:1.47});
Tabua.push({ idade:37, indicador:0.8293, fator1:3.6942, fator2:1.51});
Tabua.push({ idade:37, indicador:0.8811, fator1:4.0247, fator2:1.55});
Tabua.push({ idade:37, indicador:0.933, fator1:4.3553, fator2:1.59});
Tabua.push({ idade:37, indicador:0.9848, fator1:4.6858, fator2:1.62});
Tabua.push({ idade:37, indicador:1.0366, fator1:5.4834, fator2:1.8});
Tabua.push({ idade:37, indicador:1.1403, fator1:7.4666, fator2:2.22});
Tabua.push({ idade:37, indicador:1.244, fator1:9.4497, fator2:2.58});
Tabua.push({ idade:37, indicador:1.3476, fator1:11.1217, fator2:2.8});
Tabua.push({ idade:37, indicador:1.4513, fator1:12.7743, fator2:2.99});
Tabua.push({ idade:37, indicador:1.5549, fator1:14.427, fator2:3.15});
Tabua.push({ idade:37, indicador:1.6586, fator1:16.0795, fator2:3.29});
Tabua.push({ idade:37, indicador:1.7623, fator1:17.7319, fator2:3.42});
Tabua.push({ idade:37, indicador:1.8659, fator1:19.3848, fator2:3.53});
Tabua.push({ idade:37, indicador:1.9696, fator1:21.0374, fator2:3.63});
Tabua.push({ idade:37, indicador:2.0733, fator1:22.69, fator2:3.72});
Tabua.push({ idade:37, indicador:2.246, fator1:25.4445, fator2:3.85});
Tabua.push({ idade:37, indicador:2.4188, fator1:28.199, fator2:3.96});
Tabua.push({ idade:37, indicador:2.5916, fator1:30.9531, fator2:4.06});
Tabua.push({ idade:37, indicador:2.7643, fator1:33.7075, fator2:4.14});
Tabua.push({ idade:37, indicador:2.9371, fator1:36.462, fator2:4.22});
Tabua.push({ idade:37, indicador:3, fator1:37.4651, fator2:4.25});
Tabua.push({ idade:38, indicador:0.1037, fator1:0.3856, fator2:1.32});
Tabua.push({ idade:38, indicador:0.5183, fator1:1.9959, fator2:1.36});
Tabua.push({ idade:38, indicador:0.5701, fator1:2.3814, fator2:1.48});
Tabua.push({ idade:38, indicador:0.622, fator1:2.7669, fator2:1.57});
Tabua.push({ idade:38, indicador:0.6738, fator1:3.1525, fator2:1.65});
Tabua.push({ idade:38, indicador:0.7256, fator1:3.538, fator2:1.72});
Tabua.push({ idade:38, indicador:0.7775, fator1:3.9236, fator2:1.78});
Tabua.push({ idade:38, indicador:0.8293, fator1:4.3091, fator2:1.84});
Tabua.push({ idade:38, indicador:0.8811, fator1:4.6884, fator2:1.88});
Tabua.push({ idade:38, indicador:0.933, fator1:5.0802, fator2:1.93});
Tabua.push({ idade:38, indicador:0.9848, fator1:5.4658, fator2:1.96});
Tabua.push({ idade:38, indicador:1.0366, fator1:6.3962, fator2:2.18});
Tabua.push({ idade:38, indicador:1.1403, fator1:8.7095, fator2:2.7});
Tabua.push({ idade:38, indicador:1.244, fator1:11.0228, fator2:3.13});
Tabua.push({ idade:38, indicador:1.3476, fator1:12.973, fator2:3.4});
Tabua.push({ idade:38, indicador:1.4513, fator1:14.9008, fator2:3.63});
Tabua.push({ idade:38, indicador:1.5549, fator1:16.8284, fator2:3.83});
Tabua.push({ idade:38, indicador:1.6586, fator1:18.7561, fator2:4});
Tabua.push({ idade:38, indicador:1.7623, fator1:20.6839, fator2:4.15});
Tabua.push({ idade:38, indicador:1.8659, fator1:22.6116, fator2:4.29});
Tabua.push({ idade:38, indicador:1.9696, fator1:24.5394, fator2:4.41});
Tabua.push({ idade:38, indicador:2.0733, fator1:26.4671, fator2:4.51});
Tabua.push({ idade:38, indicador:2.246, fator1:29.68, fator2:4.67});
Tabua.push({ idade:38, indicador:2.4188, fator1:32.8929, fator2:4.81});
Tabua.push({ idade:38, indicador:2.5916, fator1:36.1058, fator2:4.93});
Tabua.push({ idade:38, indicador:2.7643, fator1:39.3187, fator2:5.03});
Tabua.push({ idade:38, indicador:2.9371, fator1:42.5314, fator2:5.12});
Tabua.push({ idade:38, indicador:3, fator1:43.7011, fator2:5.15});
Tabua.push({ idade:39, indicador:0.1037, fator1:0.4451, fator2:1.58});
Tabua.push({ idade:39, indicador:0.5183, fator1:2.3039, fator2:1.64});
Tabua.push({ idade:39, indicador:0.5701, fator1:2.7489, fator2:1.78});
Tabua.push({ idade:39, indicador:0.622, fator1:3.194, fator2:1.89});
Tabua.push({ idade:39, indicador:0.6738, fator1:3.5699, fator2:1.99});
Tabua.push({ idade:39, indicador:0.7256, fator1:4.0841, fator2:2.08});
Tabua.push({ idade:39, indicador:0.7775, fator1:4.5291, fator2:2.15});
Tabua.push({ idade:39, indicador:0.8293, fator1:4.9742, fator2:2.21});
Tabua.push({ idade:39, indicador:0.8811, fator1:5.4192, fator2:2.27});
Tabua.push({ idade:39, indicador:0.933, fator1:5.8643, fator2:2.32});
Tabua.push({ idade:39, indicador:0.9848, fator1:6.3093, fator2:2.36});
Tabua.push({ idade:39, indicador:1.0366, fator1:7.3834, fator2:2.63});
Tabua.push({ idade:39, indicador:1.1403, fator1:10.0537, fator2:3.25});
Tabua.push({ idade:39, indicador:1.244, fator1:12.7239, fator2:3.77});
Tabua.push({ idade:39, indicador:1.3476, fator1:14.9752, fator2:4.1});
Tabua.push({ idade:39, indicador:1.4513, fator1:17.2004, fator2:4.37});
Tabua.push({ idade:39, indicador:1.5549, fator1:19.4256, fator2:4.61});
Tabua.push({ idade:39, indicador:1.6586, fator1:21.6509, fator2:4.82});
Tabua.push({ idade:39, indicador:1.7623, fator1:23.8762, fator2:5});
Tabua.push({ idade:39, indicador:1.8659, fator1:26.1358, fator2:5.16});
Tabua.push({ idade:39, indicador:1.9696, fator1:28.3266, fator2:5.31});
Tabua.push({ idade:39, indicador:2.0733, fator1:30.5519, fator2:5.44});
Tabua.push({ idade:39, indicador:2.246, fator1:34.2606, fator2:5.63});
Tabua.push({ idade:39, indicador:2.4188, fator1:37.9694, fator2:5.79});
Tabua.push({ idade:39, indicador:2.5916, fator1:41.6781, fator2:5.93});
Tabua.push({ idade:39, indicador:2.7643, fator1:45.3866, fator2:6.06});
Tabua.push({ idade:39, indicador:2.9371, fator1:49.0955, fator2:6.17});
Tabua.push({ idade:39, indicador:3, fator1:50.4458, fator2:6.21});
Tabua.push({ idade:40, indicador:0.1037, fator1:0.5095, fator2:1.89});
Tabua.push({ idade:40, indicador:0.5183, fator1:2.6374, fator2:1.96});
Tabua.push({ idade:40, indicador:0.5701, fator1:3.1469, fator2:2.13});
Tabua.push({ idade:40, indicador:0.622, fator1:3.6564, fator2:2.27});
Tabua.push({ idade:40, indicador:0.6738, fator1:4.1658, fator2:2.38});
Tabua.push({ idade:40, indicador:0.7256, fator1:4.6753, fator2:2.48});
Tabua.push({ idade:40, indicador:0.7775, fator1:5.1848, fator2:2.57});
Tabua.push({ idade:40, indicador:0.8293, fator1:5.6943, fator2:2.65});
Tabua.push({ idade:40, indicador:0.8811, fator1:6.2035, fator2:2.71});
Tabua.push({ idade:40, indicador:0.933, fator1:6.7132, fator2:2.77});
Tabua.push({ idade:40, indicador:0.9848, fator1:7.2227, fator2:2.83});
Tabua.push({ idade:40, indicador:1.0366, fator1:8.4522, fator2:3.14});
Tabua.push({ idade:40, indicador:1.1403, fator1:11.5092, fator2:3.89});
Tabua.push({ idade:40, indicador:1.244, fator1:14.566, fator2:4.51});
Tabua.push({ idade:40, indicador:1.3476, fator1:17.1432, fator2:4.9});
Tabua.push({ idade:40, indicador:1.4513, fator1:19.6905, fator2:5.23});
Tabua.push({ idade:40, indicador:1.5549, fator1:22.2378, fator2:5.51});
Tabua.push({ idade:40, indicador:1.6586, fator1:24.7853, fator2:5.76});
Tabua.push({ idade:40, indicador:1.7623, fator1:27.3327, fator2:5.98});
Tabua.push({ idade:40, indicador:1.8659, fator1:29.8801, fator2:6.17});
Tabua.push({ idade:40, indicador:1.9696, fator1:32.4275, fator2:6.35});
Tabua.push({ idade:40, indicador:2.0733, fator1:34.9749, fator2:6.5});
Tabua.push({ idade:40, indicador:2.246, fator1:39.2204, fator2:6.73});
Tabua.push({ idade:40, indicador:2.4188, fator1:43.466, fator2:6.93});
Tabua.push({ idade:40, indicador:2.5916, fator1:47.7115, fator2:7.1});
Tabua.push({ idade:40, indicador:2.7643, fator1:51.9575, fator2:7.25});
Tabua.push({ idade:40, indicador:2.9371, fator1:56.2026, fator2:7.38});
Tabua.push({ idade:40, indicador:3, fator1:57.7483, fator2:7.42});
Tabua.push({ idade:41, indicador:0.1037, fator1:0.5795, fator2:2.26});
Tabua.push({ idade:41, indicador:0.5183, fator1:2.9999, fator2:2.34});
Tabua.push({ idade:41, indicador:0.5701, fator1:3.5794, fator2:2.53});
Tabua.push({ idade:41, indicador:0.622, fator1:4.1589, fator2:2.7});
Tabua.push({ idade:41, indicador:0.6738, fator1:4.7384, fator2:2.84});
Tabua.push({ idade:41, indicador:0.7256, fator1:5.3179, fator2:2.96});
Tabua.push({ idade:41, indicador:0.7775, fator1:5.8974, fator2:3.06});
Tabua.push({ idade:41, indicador:0.8293, fator1:6.4768, fator2:3.15});
Tabua.push({ idade:41, indicador:0.8811, fator1:7.0564, fator2:3.23});
Tabua.push({ idade:41, indicador:0.933, fator1:7.6359, fator2:3.3});
Tabua.push({ idade:41, indicador:0.9848, fator1:8.2154, fator2:3.37});
Tabua.push({ idade:41, indicador:1.0366, fator1:9.6139, fator2:3.74});
Tabua.push({ idade:41, indicador:1.1403, fator1:13.0909, fator2:4.64});
Tabua.push({ idade:41, indicador:1.244, fator1:16.5679, fator2:5.38});
Tabua.push({ idade:41, indicador:1.3476, fator1:19.4993, fator2:5.84});
Tabua.push({ idade:41, indicador:1.4513, fator1:22.3966, fator2:6.23});
Tabua.push({ idade:41, indicador:1.5549, fator1:24.9831, fator2:6.57});
Tabua.push({ idade:41, indicador:1.6586, fator1:28.1918, fator2:6.86});
Tabua.push({ idade:41, indicador:1.7623, fator1:31.0893, fator2:7.12});
Tabua.push({ idade:41, indicador:1.8659, fator1:33.9867, fator2:7.35});
Tabua.push({ idade:41, indicador:1.9696, fator1:36.8842, fator2:7.56});
Tabua.push({ idade:41, indicador:2.0733, fator1:39.7819, fator2:7.75});
Tabua.push({ idade:41, indicador:2.246, fator1:44.611, fator2:8.02});
Tabua.push({ idade:41, indicador:2.4188, fator1:49.4399, fator2:8.25});
Tabua.push({ idade:41, indicador:2.5916, fator1:54.2694, fator2:8.46});
Tabua.push({ idade:41, indicador:2.7643, fator1:59.0983, fator2:8.63});
Tabua.push({ idade:41, indicador:2.9371, fator1:63.9273, fator2:8.79});
Tabua.push({ idade:41, indicador:3, fator1:65.6854, fator2:8.84});
Tabua.push({ idade:42, indicador:0.1037, fator1:0.656, fator2:2.68});
Tabua.push({ idade:42, indicador:0.5183, fator1:3.396, fator2:2.78});
Tabua.push({ idade:42, indicador:0.5701, fator1:4.052, fator2:3.01});
Tabua.push({ idade:42, indicador:0.622, fator1:4.708, fator2:3.21});
Tabua.push({ idade:42, indicador:0.6738, fator1:5.364, fator2:3.38});
Tabua.push({ idade:42, indicador:0.7256, fator1:6.0201, fator2:3.52});
Tabua.push({ idade:42, indicador:0.7775, fator1:6.6761, fator2:3.64});
Tabua.push({ idade:42, indicador:0.8293, fator1:7.3321, fator2:3.75});
Tabua.push({ idade:42, indicador:0.8811, fator1:7.9881, fator2:3.84});
Tabua.push({ idade:42, indicador:0.933, fator1:8.6441, fator2:3.93});
Tabua.push({ idade:42, indicador:0.9848, fator1:9.3002, fator2:4});
Tabua.push({ idade:42, indicador:1.0366, fator1:10.8834, fator2:4.45});
Tabua.push({ idade:42, indicador:1.1403, fator1:14.8195, fator2:5.51});
Tabua.push({ idade:42, indicador:1.244, fator1:18.7556, fator2:6.39});
Tabua.push({ idade:42, indicador:1.3476, fator1:22.0739, fator2:6.94});
Tabua.push({ idade:42, indicador:1.4513, fator1:25.3541, fator2:7.41});
Tabua.push({ idade:42, indicador:1.5549, fator1:28.634, fator2:7.81});
Tabua.push({ idade:42, indicador:1.6586, fator1:31.9142, fator2:8.16});
Tabua.push({ idade:42, indicador:1.7623, fator1:35.1943, fator2:8.47});
Tabua.push({ idade:42, indicador:1.8659, fator1:38.4745, fator2:8.74});
Tabua.push({ idade:42, indicador:1.9696, fator1:41.7545, fator2:8.99});
Tabua.push({ idade:42, indicador:2.0733, fator1:45.0346, fator2:9.21});
Tabua.push({ idade:42, indicador:2.246, fator1:50.501, fator2:9.53});
Tabua.push({ idade:42, indicador:2.4188, fator1:55.9678, fator2:9.81});
Tabua.push({ idade:42, indicador:2.5916, fator1:61.435, fator2:10.09});
Tabua.push({ idade:42, indicador:2.7643, fator1:66.9019, fator2:10.26});
Tabua.push({ idade:42, indicador:2.9371, fator1:72.3687, fator2:10.45});
Tabua.push({ idade:42, indicador:3, fator1:74.359, fator2:10.51});
Tabua.push({ idade:43, indicador:0.1037, fator1:0.7403, fator2:3.19});
Tabua.push({ idade:43, indicador:0.5183, fator1:3.832, fator2:3.3});
Tabua.push({ idade:43, indicador:0.5701, fator1:4.5722, fator2:3.58});
Tabua.push({ idade:43, indicador:0.622, fator1:5.3124, fator2:3.81});
Tabua.push({ idade:43, indicador:0.6738, fator1:6.0527, fator2:4.01});
Tabua.push({ idade:43, indicador:0.7256, fator1:6.7929, fator2:4.18});
Tabua.push({ idade:43, indicador:0.7775, fator1:7.5332, fator2:4.33});
Tabua.push({ idade:43, indicador:0.8293, fator1:8.2735, fator2:4.45});
Tabua.push({ idade:43, indicador:0.8811, fator1:9.0137, fator2:4.87});
Tabua.push({ idade:43, indicador:0.933, fator1:9.7539, fator2:4.67});
Tabua.push({ idade:43, indicador:0.9848, fator1:10.4942, fator2:4.76});
Tabua.push({ idade:43, indicador:1.0366, fator1:12.2806, fator2:5.29});
Tabua.push({ idade:43, indicador:1.1403, fator1:16.7221, fator2:6.55});
Tabua.push({ idade:43, indicador:1.244, fator1:21.1635, fator2:7.59});
Tabua.push({ idade:43, indicador:1.3476, fator1:24.9078, fator2:8.25});
Tabua.push({ idade:43, indicador:1.4513, fator1:28.6091, fator2:8.8});
Tabua.push({ idade:43, indicador:1.5549, fator1:32.3104, fator2:9.28});
Tabua.push({ idade:43, indicador:1.6586, fator1:36.0117, fator2:9.69});
Tabua.push({ idade:43, indicador:1.7623, fator1:39.7128, fator2:10.06});
Tabua.push({ idade:43, indicador:1.8659, fator1:43.4137, fator2:10.39});
Tabua.push({ idade:43, indicador:1.9696, fator1:47.115, fator2:10.68});
Tabua.push({ idade:43, indicador:2.0733, fator1:50.8159, fator2:10.94});
Tabua.push({ idade:43, indicador:2.246, fator1:56.9846, fator2:11.33});
Tabua.push({ idade:43, indicador:2.4188, fator1:63.1534, fator2:11.65});
Tabua.push({ idade:43, indicador:2.5916, fator1:69.3225, fator2:11.94});
Tabua.push({ idade:43, indicador:2.7643, fator1:75.4912, fator2:12.19});
Tabua.push({ idade:43, indicador:2.9371, fator1:81.6599, fator2:12.41});
Tabua.push({ idade:43, indicador:3, fator1:83.906, fator2:12.48});
Tabua.push({ idade:44, indicador:0.1037, fator1:0.833, fator2:3.59});
Tabua.push({ idade:44, indicador:0.5183, fator1:4.3137, fator2:3.92});
Tabua.push({ idade:44, indicador:0.5701, fator1:5.1454, fator2:4.25});
Tabua.push({ idade:44, indicador:0.622, fator1:5.9785, fator2:4.53});
Tabua.push({ idade:44, indicador:0.6738, fator1:6.8115, fator2:4.77});
Tabua.push({ idade:44, indicador:0.7256, fator1:7.6446, fator2:4.97});
Tabua.push({ idade:44, indicador:0.7775, fator1:8.4676, fator2:5.14});
Tabua.push({ idade:44, indicador:0.8293, fator1:9.3106, fator2:5.29});
Tabua.push({ idade:44, indicador:0.8811, fator1:10.1437, fator2:5.43});
Tabua.push({ idade:44, indicador:0.933, fator1:10.9767, fator2:5.55});
Tabua.push({ idade:44, indicador:0.9848, fator1:11.8097, fator2:5.65});
Tabua.push({ idade:44, indicador:1.0366, fator1:13.8202, fator2:6.28});
Tabua.push({ idade:44, indicador:1.1403, fator1:18.8185, fator2:7.78});
Tabua.push({ idade:44, indicador:1.244, fator1:23.8168, fator2:9.03});
Tabua.push({ idade:44, indicador:1.3476, fator1:28.0305, fator2:9.81});
Tabua.push({ idade:44, indicador:1.4513, fator1:32.1958, fator2:10.46});
Tabua.push({ idade:44, indicador:1.5549, fator1:36.361, fator2:11.02});
Tabua.push({ idade:44, indicador:1.6586, fator1:40.5263, fator2:11.52});
Tabua.push({ idade:44, indicador:1.7623, fator1:44.6915, fator2:11.96});
Tabua.push({ idade:44, indicador:1.8659, fator1:48.8565, fator2:12.34});
Tabua.push({ idade:44, indicador:1.9696, fator1:53.0215, fator2:12.69});
Tabua.push({ idade:44, indicador:2.0733, fator1:57.187, fator2:13});
Tabua.push({ idade:44, indicador:2.246, fator1:64.1293, fator2:13.46});
Tabua.push({ idade:44, indicador:2.4188, fator1:71.0707, fator2:13.85});
Tabua.push({ idade:44, indicador:2.5916, fator1:78.013, fator2:14.19});
Tabua.push({ idade:44, indicador:2.7643, fator1:84.9553, fator2:14.49});
Tabua.push({ idade:44, indicador:2.9371, fator1:91.8971, fator2:14.75});
Tabua.push({ idade:44, indicador:3, fator1:94.4248, fator2:14.83});
Tabua.push({ idade:45, indicador:0.1037, fator1:0.9352, fator2:4.51});
Tabua.push({ idade:45, indicador:0.5183, fator1:4.8431, fator2:4.67});
Tabua.push({ idade:45, indicador:0.5701, fator1:5.7765, fator2:5.06});
Tabua.push({ idade:45, indicador:0.622, fator1:6.7117, fator2:5.39});
Tabua.push({ idade:45, indicador:0.6738, fator1:7.6469, fator2:5.67});
Tabua.push({ idade:45, indicador:0.7256, fator1:8.5821, fator2:5.91});
Tabua.push({ idade:45, indicador:0.7775, fator1:9.5174, fator2:6.12});
Tabua.push({ idade:45, indicador:0.8293, fator1:10.4526, fator2:6.3});
Tabua.push({ idade:45, indicador:0.8811, fator1:11.3877, fator2:6.46});
Tabua.push({ idade:45, indicador:0.933, fator1:12.723, fator2:6.6});
Tabua.push({ idade:45, indicador:0.9848, fator1:13.2582, fator2:6.73});
Tabua.push({ idade:45, indicador:1.0366, fator1:15.5152, fator2:7.48});
Tabua.push({ idade:45, indicador:1.1403, fator1:21.1264, fator2:9.26});
Tabua.push({ idade:45, indicador:1.244, fator1:26.7376, fator2:10.74});
Tabua.push({ idade:45, indicador:1.3476, fator1:31.4682, fator2:11.67});
Tabua.push({ idade:45, indicador:1.4513, fator1:36.1443, fator2:12.44});
Tabua.push({ idade:45, indicador:1.5549, fator1:40.8204, fator2:13.11});
Tabua.push({ idade:45, indicador:1.6586, fator1:45.4962, fator2:13.7});
Tabua.push({ idade:45, indicador:1.7623, fator1:50.1726, fator2:14.22});
Tabua.push({ idade:45, indicador:1.8659, fator1:54.8486, fator2:14.68});
Tabua.push({ idade:45, indicador:1.9696, fator1:59.5245, fator2:15.1});
Tabua.push({ idade:45, indicador:2.0733, fator1:64.1828, fator2:15.47});
Tabua.push({ idade:45, indicador:2.246, fator1:71.9939, fator2:16.01});
Tabua.push({ idade:45, indicador:2.4188, fator1:79.7877, fator2:16.58});
Tabua.push({ idade:45, indicador:2.5916, fator1:87.5808, fator2:16.88});
Tabua.push({ idade:45, indicador:2.7643, fator1:95.3746, fator2:17.24});
Tabua.push({ idade:45, indicador:2.9371, fator1:103.1676, fator2:17.65});
Tabua.push({ idade:45, indicador:3, fator1:106.0052, fator2:17.75});
Tabua.push({ idade:46, indicador:0.1037, fator1:1.0478, fator2:5.37});
Tabua.push({ idade:46, indicador:0.5183, fator1:5.4241, fator2:5.56});
Tabua.push({ idade:46, indicador:0.5701, fator1:6.4719, fator2:6.03});
Tabua.push({ idade:46, indicador:0.622, fator1:7.5197, fator2:6.43});
Tabua.push({ idade:46, indicador:0.6738, fator1:8.5675, fator2:6.76});
Tabua.push({ idade:46, indicador:0.7256, fator1:9.6153, fator2:7.04});
Tabua.push({ idade:46, indicador:0.7775, fator1:10.6632, fator2:7.29});
Tabua.push({ idade:46, indicador:0.8293, fator1:11.711, fator2:7.51});
Tabua.push({ idade:46, indicador:0.8811, fator1:12.7588, fator2:7.7});
Tabua.push({ idade:46, indicador:0.933, fator1:13.8066, fator2:7.87});
Tabua.push({ idade:46, indicador:0.9848, fator1:14.8544, fator2:8.02});
Tabua.push({ idade:46, indicador:1.0366, fator1:17.3831, fator2:8.91});
Tabua.push({ idade:46, indicador:1.1403, fator1:23.6699, fator2:11.03});
Tabua.push({ idade:46, indicador:1.244, fator1:29.9567, fator2:12.8});
Tabua.push({ idade:46, indicador:1.3476, fator1:35.2569, fator2:13.91});
Tabua.push({ idade:46, indicador:1.4513, fator1:40.4958, fator2:14.83});
Tabua.push({ idade:46, indicador:1.5549, fator1:45.7348, fator2:15.63});
Tabua.push({ idade:46, indicador:1.6586, fator1:50.9736, fator2:16.34});
Tabua.push({ idade:46, indicador:1.7623, fator1:56.2128, fator2:16.95});
Tabua.push({ idade:46, indicador:1.8659, fator1:61.4515, fator2:17.51});
Tabua.push({ idade:46, indicador:1.9696, fator1:66.6907, fator2:18});
Tabua.push({ idade:46, indicador:2.0733, fator1:71.9298, fator2:18.44});
Tabua.push({ idade:46, indicador:2.246, fator1:80.6612, fator2:19.09});
Tabua.push({ idade:46, indicador:2.4188, fator1:89.393, fator2:19.64});
Tabua.push({ idade:46, indicador:2.5916, fator1:98.1253, fator2:20.13});
Tabua.push({ idade:46, indicador:2.7643, fator1:105.8567, fator2:20.55});
Tabua.push({ idade:46, indicador:2.9371, fator1:115.5885, fator2:20.92});
Tabua.push({ idade:46, indicador:3, fator1:118.7679, fator2:21.05});
Tabua.push({ idade:47, indicador:0.1037, fator1:1.1718, fator2:6.42});
Tabua.push({ idade:47, indicador:0.5183, fator1:6.0661, fator2:6.65});
Tabua.push({ idade:47, indicador:0.5701, fator1:7.238, fator2:7.21});
Tabua.push({ idade:47, indicador:0.622, fator1:8.4097, fator2:7.68});
Tabua.push({ idade:47, indicador:0.6738, fator1:9.5816, fator2:8.08});
Tabua.push({ idade:47, indicador:0.7256, fator1:10.7535, fator2:8.42});
Tabua.push({ idade:47, indicador:0.7775, fator1:11.9252, fator2:8.71});
Tabua.push({ idade:47, indicador:0.8293, fator1:13.0971, fator2:8.97});
Tabua.push({ idade:47, indicador:0.8811, fator1:14.2689, fator2:9.2});
Tabua.push({ idade:47, indicador:0.933, fator1:15.4408, fator2:9.4});
Tabua.push({ idade:47, indicador:0.9848, fator1:16.6125, fator2:9.58});
Tabua.push({ idade:47, indicador:1.0366, fator1:19.4406, fator2:10.65});
Tabua.push({ idade:47, indicador:1.1403, fator1:26.5407, fator2:13.19});
Tabua.push({ idade:47, indicador:1.244, fator1:33.5025, fator2:15.3});
Tabua.push({ idade:47, indicador:1.3476, fator1:39.43, fator2:16.62});
Tabua.push({ idade:47, indicador:1.4513, fator1:45.2883, fator2:17.73});
Tabua.push({ idade:47, indicador:1.5549, fator1:51.1481, fator2:18.69});
Tabua.push({ idade:47, indicador:1.6586, fator1:57.007, fator2:19.53});
Tabua.push({ idade:47, indicador:1.7623, fator1:62.8658, fator2:20.27});
Tabua.push({ idade:47, indicador:1.8659, fator1:68.7255, fator2:20.93});
Tabua.push({ idade:47, indicador:1.9696, fator1:74.5844, fator2:21.51});
Tabua.push({ idade:47, indicador:2.0733, fator1:80.4437, fator2:22.04});
Tabua.push({ idade:47, indicador:2.246, fator1:90.2087, fator2:22.82});
Tabua.push({ idade:47, indicador:2.4188, fator1:99.9738, fator2:23.48});
Tabua.push({ idade:47, indicador:2.5916, fator1:109.7393, fator2:24.06});
Tabua.push({ idade:47, indicador:2.7643, fator1:119.5048, fator2:24.56});
Tabua.push({ idade:47, indicador:2.9371, fator1:129.2698, fator2:25});
Tabua.push({ idade:47, indicador:3, fator1:132.8243, fator2:25.15});
Tabua.push({ idade:48, indicador:0.1037, fator1:1.3085, fator2:7.71});
Tabua.push({ idade:48, indicador:0.5183, fator1:6.7739, fator2:7.93});
Tabua.push({ idade:48, indicador:0.5701, fator1:8.0825, fator2:8.66});
Tabua.push({ idade:48, indicador:0.622, fator1:9.391, fator2:9.22});
Tabua.push({ idade:48, indicador:0.6738, fator1:10.6996, fator2:9.69});
Tabua.push({ idade:48, indicador:0.7256, fator1:12.0082, fator2:10.1});
Tabua.push({ idade:48, indicador:0.7775, fator1:13.3157, fator2:10.46});
Tabua.push({ idade:48, indicador:0.8293, fator1:14.6253, fator2:10.77});
Tabua.push({ idade:48, indicador:0.8811, fator1:15.9338, fator2:11.04});
Tabua.push({ idade:48, indicador:0.933, fator1:17.2424, fator2:11.2});
Tabua.push({ idade:48, indicador:0.9848, fator1:18.5509, fator2:11.5});
Tabua.push({ idade:48, indicador:1.0366, fator1:21.7089, fator2:12.79});
Tabua.push({ idade:48, indicador:1.1403, fator1:29.5602, fator2:15.83});
Tabua.push({ idade:48, indicador:1.244, fator1:37.4116, fator2:18.36});
Tabua.push({ idade:48, indicador:1.3476, fator1:44.0304, fator2:19.95});
Tabua.push({ idade:48, indicador:1.4513, fator1:50.5731, fator2:21.28});
Tabua.push({ idade:48, indicador:1.5549, fator1:57.1161, fator2:22.43});
Tabua.push({ idade:48, indicador:1.6586, fator1:63.6583, fator2:23.43});
Tabua.push({ idade:48, indicador:1.7623, fator1:70.2014, fator2:24.32});
Tabua.push({ idade:48, indicador:1.8659, fator1:76.7441, fator2:25.11});
Tabua.push({ idade:48, indicador:1.9696, fator1:83.2867, fator2:25.32});
Tabua.push({ idade:48, indicador:2.0733, fator1:89.8302, fator2:26.45});
Tabua.push({ idade:48, indicador:2.246, fator1:100.7343, fator2:27.38});
Tabua.push({ idade:48, indicador:2.4188, fator1:111.6393, fator2:28.18});
Tabua.push({ idade:48, indicador:2.5916, fator1:122.5438, fator2:28.87});
Tabua.push({ idade:48, indicador:2.7643, fator1:133.4488, fator2:29.47});
Tabua.push({ idade:48, indicador:2.9371, fator1:144.3564, fator2:30.01});
Tabua.push({ idade:48, indicador:3, fator1:148.3283, fator2:30.19});
Tabua.push({ idade:49, indicador:0.1037, fator1:1.459, fator2:9.29});
Tabua.push({ idade:49, indicador:0.5183, fator1:7.5528, fator2:9.62});
Tabua.push({ idade:49, indicador:0.5701, fator1:9.0119, fator2:10.44});
Tabua.push({ idade:49, indicador:0.622, fator1:10.4709, fator2:11.12});
Tabua.push({ idade:49, indicador:0.6738, fator1:11.9299, fator2:11.69});
Tabua.push({ idade:49, indicador:0.7256, fator1:13.3889, fator2:12.13});
Tabua.push({ idade:49, indicador:0.7775, fator1:14.8479, fator2:12.61});
Tabua.push({ idade:49, indicador:0.8293, fator1:16.3069, fator2:12.99});
Tabua.push({ idade:49, indicador:0.8811, fator1:17.766, fator2:13.31});
Tabua.push({ idade:49, indicador:0.933, fator1:19.225, fator2:13.61});
Tabua.push({ idade:49, indicador:0.9848, fator1:20.684, fator2:13.87});
Tabua.push({ idade:49, indicador:1.0366, fator1:24.2051, fator2:15.42});
Tabua.push({ idade:49, indicador:1.1403, fator1:32.9592, fator2:19.09});
Tabua.push({ idade:49, indicador:1.244, fator1:41.7133, fator2:22.14});
Tabua.push({ idade:49, indicador:1.3476, fator1:49.0934, fator2:24.05});
Tabua.push({ idade:49, indicador:1.4513, fator1:56.3885, fator2:25.66});
Tabua.push({ idade:49, indicador:1.5549, fator1:63.6837, fator2:27.05});
Tabua.push({ idade:49, indicador:1.6586, fator1:70.9788, fator2:28.26});
Tabua.push({ idade:49, indicador:1.7623, fator1:78.2739, fator2:29.33});
Tabua.push({ idade:49, indicador:1.8659, fator1:85.569, fator2:30.23});
Tabua.push({ idade:49, indicador:1.9696, fator1:92.8642, fator2:31.14});
Tabua.push({ idade:49, indicador:2.0733, fator1:100.1593, fator2:31.9});
Tabua.push({ idade:49, indicador:2.246, fator1:112.3171, fator2:33.01});
Tabua.push({ idade:49, indicador:2.4188, fator1:124.4758, fator2:33.98});
Tabua.push({ idade:49, indicador:2.5916, fator1:136.6345, fator2:34.82});
Tabua.push({ idade:49, indicador:2.7643, fator1:148.8208, fator2:35.55});
Tabua.push({ idade:49, indicador:2.9371, fator1:160.9515, fator2:36.14});
Tabua.push({ idade:49, indicador:3, fator1:165.3778, fator2:36.35});
Tabua.push({ idade:50, indicador:0.1037, fator1:1.622, fator2:11.26});
Tabua.push({ idade:50, indicador:0.5183, fator1:8.3963, fator2:11.65});
Tabua.push({ idade:50, indicador:0.5701, fator1:10.0183, fator2:12.65});
Tabua.push({ idade:50, indicador:0.622, fator1:11.6403, fator2:13.47});
Tabua.push({ idade:50, indicador:0.6738, fator1:13.2622, fator2:14.17});
Tabua.push({ idade:50, indicador:0.7256, fator1:14.8842, fator2:14.77});
Tabua.push({ idade:50, indicador:0.7775, fator1:16.5062, fator2:15.28});
Tabua.push({ idade:50, indicador:0.8293, fator1:18.1282, fator2:15.74});
Tabua.push({ idade:50, indicador:0.8811, fator1:19.7501, fator2:16.14});
Tabua.push({ idade:50, indicador:0.933, fator1:21.372, fator2:16.49});
Tabua.push({ idade:50, indicador:0.9848, fator1:22.9941, fator2:16.51});
Tabua.push({ idade:50, indicador:1.0366, fator1:26.9084, fator2:18.69});
Tabua.push({ idade:50, indicador:1.1403, fator1:36.6401, fator2:23.13});
Tabua.push({ idade:50, indicador:1.244, fator1:46.3718, fator2:28.34});
Tabua.push({ idade:50, indicador:1.3476, fator1:54.5762, fator2:29.15});
Tabua.push({ idade:50, indicador:1.4513, fator1:62.6858, fator2:31.09});
Tabua.push({ idade:50, indicador:1.5549, fator1:70.7958, fator2:32.78});
Tabua.push({ idade:50, indicador:1.6586, fator1:78.9054, fator2:34.25});
Tabua.push({ idade:50, indicador:1.7623, fator1:87.0154, fator2:35.55});
Tabua.push({ idade:50, indicador:1.8659, fator1:95.1249, fator2:36.7});
Tabua.push({ idade:50, indicador:1.9696, fator1:103.2346, fator2:37.73});
Tabua.push({ idade:50, indicador:2.0733, fator1:111.345, fator2:38.66});
Tabua.push({ idade:50, indicador:2.246, fator1:124.8616, fator2:40.12});
Tabua.push({ idade:50, indicador:2.4188, fator1:138.3777, fator2:41.18});
Tabua.push({ idade:50, indicador:2.5916, fator1:151.8942, fator2:42.19});
Tabua.push({ idade:50, indicador:2.7643, fator1:164.3741, fator2:43.38});
Tabua.push({ idade:50, indicador:2.9371, fator1:178.9269, fator2:43.56});
Tabua.push({ idade:50, indicador:3, fator1:183.8461, fator2:43.83});
