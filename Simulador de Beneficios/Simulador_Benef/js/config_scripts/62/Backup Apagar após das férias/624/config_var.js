//Variáveis ainda não alimentadas pelo banco
var Nper = 13;                                    //Quantidade de pagamentos no ano configurado para o Plano
var IncPrazo = 1;                                 //Incremento da forma de pagamento Prazo
var Ncontrib = 5;                                 //Número de contribuições no ano usar case 1 = 12 meses ou case 5 = 13 meses
var v13pagto = true;                              //Plano paga décimo terceiro? true ou false
var v13PropMBenefAno = false;                     //Plano paga décimo terceiro sobre maior benefício no ano && abono é proporcional a (quantidade de meses / 12)? true ou false
var CrescSalaa = 0.03;                            //% crescimento salarial a.a.
var ROIaa1 = 0.055;                                //Meta atuarial ao ano do Plano - Perfil 1
var ROIaa2 = 0.00;                                //Meta atuarial ao ano do Plano - Perfil 2
var ValPerc = 0.8;                               //Valor inicial da forma de pagamento Percentual
var MinPerc = 0.8;                               //Valor mínimo da forma de pagamento Percentual
var MaxPerc = 1.6;                                  //Valor máximo da forma de pagamento Percentual
var IncPerc = 0.1;                               //Incremento da forma de pagamento Percentual
var ValPrazo = 5;                                 //Valor inicial da forma de pagamento Prazo
var MinPrazo = 5;                                 //Valor mínimo da forma de pagamento Prazo
var MaxPrazo = 20;                                //Valor máximo da forma de pagamento Prazo
var ValRenda = 0.0005;                            //Valor percentual inicial da forma de pagamento onde, Renda Certa Inicial = Saldo de benefício disponível * ValRenda
var MinRenda = 0.0005;                            //Valor percentual mínimo da forma de pagamento onde, Renda Certa Min = Saldo de benefício disponível * MinRenda
var MaxRenda = 0.03;                              //Valor percentual máximo da forma de pagamento onde, Renda Certa Max = Saldo de benefício disponível * MaxRenda
var IncRenda = 0.0001;                            //Incremento da forma de pagamento Renda Certa em R$
var MinBenef = URP * 2;                           //Valor mínimo para pagamento do benefício mensal
var Tabua = [];                                   //Array Tabua Atuarial - contribuição Jóia
//var CalcBenefMin = 0;                           //Valor de benefício mínimo calculado na engine
var SaldoMin = URP;                      		        //Valor do saldo mínimo para pagamento único
var TSAnterior = (Deslogado == false) ? DadosPlano.TSAnterior : DataDif(DtAdmissao, DtAdesao, 1 , 1);  //Tempo de servico anterior a adesão ao plano
var partIncorporado = DadosPlano.TipoParticipante == '43' ? true : false;
var SaldosComparativo = (Deslogado == false) ? DadosPlano.SaldosComparativo : [];   //Saldos Comparativos, se deslogado inicia com null
var pgtoPercHabilit = true;
var pgtoPrazoHabilit = true;
var pgtoRendaHabilit = false;
var pgtoRendaHabilitaSlider = false; //flag de controle para habilitar funcionamento de simulação de renda certa pelo componente slider, default false componente input
var pgtoRendaFinanceira = true;
var pgtoRendaVitalicia = false;
var pgtoRendaTemporaria = false;
var HabilitaMultiBeneficio = false;
var desabilitaMeta = false;
var desabilitaMeta2 = true;
var desabilitaSalGrow = false;
var url_Home = 'https://www.gebsaprev.org.br/';


/*var limitaContrib = true;
//Limita Contribuições
tLimitePart = limitaContrib ? 'N' : tLimitePart;
tLimitePatroc = limitaContrib ? 'N' : tLimitePatroc;
*/

//Dicionário de termos
var home_logo = '<a class="navbar-brand" href="'+url_Home+'"><img src="res/img/logo_'+Id_entidade+'_'+Id_plano+'.png" class="img-responsive" style="height:38px; margin-top:-10px;"></a>';
var home_text =	'<a href="https://www.gebsaprev.org.br/Action/MinhaConta" class="navbar-link">Voltar</a>';  	            //Link Home
var secPermission_acessoNegado = '<div class="alert alert-warning" role="alert"><strong>Ops!</strong> Acesso Negado. <a href="'+url_Home+'">Clique aqui</a> para voltar à página inicial.</div>';  	            //Mensagem Acesso negado e impressão de link home
var secInfo_iPessoais = "Informações Pessoais";  	          //Texto Título div secInfo, Informações Pessoais
var secInfo_name = "Nome Completo";  	                      //Texto Nome Completo
var secInfo_cpf = "CPF";                        	          //Texto CPF
var secInfo_birth = "Data de Nascimento";        	          //Texto Data de Nascimento
var secInfo_dtAdmission = "Data de Admissão";  	            //Texto Data de Admissão
var secInfo_dtAccess = "Data de Adesão";            	      //Texto Data de Adesão
var secInfo_dtTermination = "Data de Desligamento";  	      //Texto Data de Desligamento
var secInfo_fldStatus = "Situação Atual";  	                //Texto Situação Atual
var secSaldo_sContas = "Saldo de Contas Atual";  	          //Texto Título div secSaldo, Saldo de Contas
var secSaldo_taxopt	= "Regime de Tributação:";  	          //Texto Regime de Tributação
var secSaldo_dtbal = "Data do Saldo:";               	      //Texto Data do Saldo
var secSaldo_fldMyBalance	= "Meu Saldo";  	                //Texto Meu Saldo
var secSaldo_fldCompanyBalance = "Saldo da Empresa";  	    //Texto Saldo da Empresa
var secSaldo_fldPortability = "Portabilidade Fechada";      //Texto Portabilidade Fechada
var secContrib_nomePlan	=	'Simule abaixo as contribuições futuras ao Plano '+nome_plano_abrev.toUpperCase()+' para composição do benefício de aposentadoria, a partir de seu saldo atual.';  //Texto Campo Mensagem para simulação
var secContrib_cPlan = "Contribuições ao Plano";  	   //Texto Título div secContrib, Contribuições ao Plano
var secContrib_salary	= "Último Salário:";  	           //Texto Último Salário
var secContrib_urp = "UP:";  	                         //Texto URP
var secHipot_msg1 = "Selecione abaixo a data futura de sua simulação.";  	//Texto, Campo Mensagem para seleção de data
var secHipot_simulation	= "Simulação";  	                 //Texto Título div secHipot, Simulação
var secHipot_barra = "Utilize a barra abaixo para projetar seu saldo na data de sua simulação";  	//Texto para utilização da barra slider
var secHipot_age = "Idade:";  	                          //Texto Idade
var secHipot_meta	= "Expectativa de Rentabilidade Real (a.a.):";  	//Texto para seleção de combo-box
var secHipot_meta2	= "Expectativa de Rentabilidade Real (a.a.):";  	//Texto para seleção de combo-box
var secHipot_msg2	= "A expectativa de rentabilidade real não representa garantia de rentabilidade futura. A rentabilidade do Plano dependerá das variações do mercado financeiro.";  	//Texto Campo Mensagem para Expectativa de Rentabilidade Real
var secCrescSal_salgrow	= "Expectativa de Crescimento Salarial Real (a.a.):";  	//Texto para seleção de combo-box
var secCrescSal_msg1 = "A expectativa de crescimento salarial real não é garantida, podendo variar para mais ou para menos de acordo com sua evolução profissional.";  	//Texto Campo Mensagem para Expectativa de Crescimento Salarial Real
var secMsgBenefOK = 'Você adquiriu direito ao Benefício de Aposentadoria, <a href="#secSimulation" class="alert-link">clique aqui</a> e confira!';  //Texto  comunica direito ao benefício
var secBenefApos_benefApos = "Benefício em Renda Financeira";      	//Texto Título div secBenefApos, Aposentadoria
var secBenefApos_Temporaria = "Benefício Temporario";                                //Texto Título div secBenefApos_Temporaria
var secBenefApos_Vitalicia = "Benefício em Renda Vitalícia";                                //Texto Título div secBenefApos_Vitalicia, Aposentadoria
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
var tamBeneBox_input = "Digite no campo abaixo o valor que deseja receber no seu benefício mensal";  	//Texto para digitação do benefício no campo input
var tamBeneBox_amount	=	"Benefício Inicial Bruto:";  	                                     //Texto Benefício Inicial Bruto
var tamBeneBox_benefIrValue	=	"IR Benefício Inicial:";  	                                //Texto IR Benefício Inicial
var tamBeneBox_benefNet	=	"Benefício Inicial Líquido:";                                    //Texto Benefício Inicial Líquido
var secBeneApos_grafico	=	"Gráfico do Saldo Projetado";                                   //Texto Título div secBeneApos, Gráfico
var secBeneApos_evolution	=	"Evolução de seu benefício/saldo";  	//Texto Mensagem orientação para visualização da evolução do benefício
var Limit100Text = "Projeção limitada a 100 anos de idade.";                              //Texto de idade limite na projeção
var secResgate_rProjetado	=	"Saldo do Resgate Projetado";  	                             //Texto Título div secResgate, Saldo do Resgate Projetado
var secResgate_rescPartBal	=	"Meu Saldo (a)";  	                                       //Texto Meu Saldo (a)
var secResgate_direito	=	"% Direito";  	                                               //Texto % Direito
var secResgate_rescCpnyBal	=	"Saldo da Empresa (b)";  	                                  //Texto Saldo da Empresa (b)
var secResgate_rescTotBal	=	"Resgate Bruto (a+b)";                                      	//Texto Resgate Bruto (a+b)
var secResgate_rescTax	=	"Imposto de Renda (c)";                                       	//Texto Imposto de Renda (c)
var secResgate_rescNet	=	"Resgate Líquido (a+b)-(c)";  	                                //Texto Resgate Líquido (a+b)-(c)
var secMsg_msg1	=	'<p align="justify">Os valores apresentados são apenas ilustrativos. Os valores reais dependerão do retorno de investimentos e do nível de contribuições efetuadas para o Plano.</p><p align="justify">A simulação foi realizada conforme dados cadastrais do Participante e o regulamento do Plano, podendo o mesmo sofrer alterações. Essas informações serão reavaliadas com base na documentação apresentada na data da elegibilidade ao benefício de aposentadoria.</p>';  	//Texto Mensagem orientação sobre os valores apresentados no simulador
var secMsg_dtSaldoFoot	=	"Data do Saldo de Contas Atual: ";  	                               //Texto Data do Saldo de Contas
var secMsg_dtSaldoProjFoot	=	"Data do Saldo Projetado: ";  	        //Texto Data do Saldo Projetado
var secMsg_dtNowFoot	=	"Data e Hora da Simulação: ";   	                                  //Texto Data e Hora da Simulação
var CopyrigtText	=	"&copy; "+text_Ano+" "+nome_entidade_abrev+". Todos os direitos reservados.";	        //Texto rodapé concatenado com o nome da entidade abreviado
var MinBenText = "Valor mínimo de benefício atingido. Benefício transformado em pagamento único.";    //Texto pagamento único
var BenMinText = "Elegível ao Benefício Mínimo.";    //Texto benefício mínimo
var SaldoMinText = "Valor mínimo de saldo atingido. Benefício transformado em pagamento único.";    //Texto pagamento único por saldo mínimo
var msgBenefOK_text = "Elegível a aposentadoria.";    //Texto slide idade aposentadoria
var msgBenefTempOK_text = "Elegível ao benefício.";    //Texto slide idade benefício temporario

var secVitalicio_msg1 = "Complementação de Aposentadoria.";                                 //Texto alert mensagem 1 Aposentadoria Vitalícia
var secVitalicio_barra = "Veja abaixo o valor de seu benefício complementar futuro";        //Texto descritivo sobre o saldo de beneficio vitalício
var secVitalicio_Provento = "(+) Provento:";                                                    //Texto valor de provento
var secVitalicio_Desconto = "(-) Imposto de Renda:";                                                    //Texto valor de desconto
var secVitalicio_Liquido = "(=) Benefício Líquido:";                                                      //Texto valor de liquido
var secVitalicio_fldMyBenAdic = "Saldo de Benefício Adicional:";                  //Texto aviso de saldo adicional disponível
var secVitalicio_msg2 = "O saldo de benefício adicional será pago ao participante conforme opção de recebimento em forma de renda financeira.";                                             //Texto alert mensagem 2 Saldo Adicional

var secHipotBenef_Select = 'Selecione o tipo de simulação:';     //Texto div select beneficio
var secHipotRendaFinanceira = 'Renda Financeira';        //Texto Select Benefício Renda Financeira
var secHipotRendaVitalicia = 'Renda Vitalícia';          //Texto Select Benefício Renda Vitalicia
var secHipotRendaTemporaria1 = 'Auxílio Doença';         //Texto Select Benefício Renda Temporaria 

//Termos Mobile App
var secMsg_msg2	=	'<p align="justify">Os valores apresentados são apenas ilustrativos. Os valores reais dependerão do retorno de investimentos e do nível de contribuições efetuadas para o Plano.</p><p align="justify">A simulação será realizada conforme dados cadastrais do Participante e o regulamento do Plano, podendo o mesmo sofrer alterações. Essas informações serão reavaliadas com base na documentação apresentada na data da elegibilidade ao benefício de aposentadoria.</p>';  	//Texto Mensagem orientação sobre os valores apresentados no simulador
var secSaldo_info_m = "Veja abaixo seu saldo acumulado até o momento.";          //Texto Mensagem informações de saldo
var secContrib_info_m = "Simule abaixo suas contribuições futuras ao plano.";    //Texto Mensagem informações de constribuição
var secResgate_info_m = "Veja abaixo o saldo de resgate projetado.";             //Texto Mensagem informações de resgate
var secPermission_acessoNegado_m = '<div class="alert alert-warning" role="alert"><strong>Ops!</strong> Você não possui acesso ao simulador de benefícios.</div>';  	   //Mensagem Acesso negado
var secResgate_direito_a = "% Direito";    //Texto % Direito participante
var secResgate_direito_b = "% Direito";    //Texto % Direito patrocinadora

//  ---  Alimentação de Arrays tabuas Atuariais  ---

//Alimentação e conversão parseInt e parseFloat de valores de array no simulador
/*
for (var l in DadosPlano.Tabua){
        var obj = DadosPlano.Tabua[l];
        Tabua.push({ idade: parseInt(obj.idade), fator_fem: parseFloat(obj.fator_fem), fator_masc: parseFloat(obj.fator_masc)});
    };
*/      

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