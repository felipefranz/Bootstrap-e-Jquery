//Corrigir retorno e Excluir hardcode
MaxSaque = 100;

//Sobrescrita de dado
URP = DadosPlano.URP;                          //Sobrescreve 1º retorno pois este plano não retorna salario de participante

//Variáveis ainda não alimentadas pelo banco
var Nper = 13;                                    //Quantidade de pagamentos no ano configurado para o Plano
var Ncontrib = 1;                                 //Número de contribuições no ano usar case 1 = 12 meses ou case 5 = 13 meses
var v13pagto = true;                              //Plano paga décimo terceiro? true ou false
var v13PropMBenefAno = false;                     //Plano paga décimo terceiro sobre maior benefício no ano && abono é proporcional a (quantidade de meses / 12)? true ou false
var CrescSalaa = 0.00;                            //% crescimento salarial a.a.
var ROIaa1 = 0.05;                                //Meta atuarial ao ano do Plano - Perfil 1
var ROIaa2 = 0.000;                                //Meta atuarial ao ano do Plano - Perfil 2
var ValPerc = 0.5;                               //Valor inicial da forma de pagamento Percentual
var MinPerc = 0.5;                               //Valor mínimo da forma de pagamento Percentual
var MaxPerc = 3;                                  //Valor máximo da forma de pagamento Percentual
var IncPerc = 0.5;                               //Incremento da forma de pagamento Percentual
var ValPrazo = 1;                                 //Valor inicial da forma de pagamento Prazo
var MinPrazo = 1/Nper;                                 //Valor mínimo da forma de pagamento Prazo
var MaxPrazo = 20;                                //Valor máximo da forma de pagamento Prazo
var IncPrazo = 1/Nper;                                 //Incremento da forma de pagamento Prazo
var ValRenda = 0.0005;                            //Valor percentual inicial da forma de pagamento onde, Renda Certa Inicial = Saldo de benefício disponível * ValRenda
var MinRenda = 0.0005;                            //Valor percentual mínimo da forma de pagamento onde, Renda Certa Min = Saldo de benefício disponível * MinRenda
var MaxRenda = 0.03;                              //Valor percentual máximo da forma de pagamento onde, Renda Certa Max = Saldo de benefício disponível * MaxRenda
var IncRenda = 0.0001;                            //Incremento da forma de pagamento Renda Certa em R$
var MinBenef = URP;                         //Valor mínimo para pagamento do benefício mensal
var SaldoMin = URP;                      		        //Valor do saldo mínimo para pagamento único
var IdadeAposentadoria = (Deslogado) ? JsonDeslogado.IdadeAposentadoria : DadosPlano.IdadeAposentadoria;    //Idade de Aposentadoria Participante, l_n = Username
var pgtoPercHabilit = true;
var pgtoPrazoHabilit = true;
var pgtoRendaHabilit = false;
var pgtoRendaHabilitaSlider = false; //flag de controle para habilitar funcionamento de simulação de renda certa pelo componente slider, default false componente input
var pgtoRendaFinanceira = true;
var pgtoRendaVitalicia = false;
var pgtoRendaTemporaria = false;                       //Pagamento Renda Temporária 
var HabilitaMultiBeneficio = false;                    //Habilita Select 
var desabilitaMeta = false;
var desabilitaMeta2 = true;
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
var secSaldo_sContas = "Saldo de Contas Atual";  	          //Texto Título div secSaldo, Saldo de Contas
var secSaldo_taxopt	= "Regime de Tributação:";  	          //Texto Regime de Tributação
var secSaldo_dtbal = "Data do Saldo:";               	      //Texto Data do Saldo
var secSaldo_fldMyBalance	= "Meu Saldo";  	                //Texto Meu Saldo
var secSaldo_fldCompanyBalance = "Saldo de Terceiros";  	    //Texto Saldo de Terceiros
var secSaldo_fldPortability = "Portabilidade Fechada";      //Texto Portabilidade Fechada
var secContrib_nomePlan	=	'Simule abaixo as contribuições futuras ao Plano '+nome_plano_abrev.toUpperCase()+' para composição do benefício de aposentadoria, a partir de seu saldo atual.';  //Texto Campo Mensagem para simulação
var secContrib_cPlan = "Contribuições ao Plano";  	   //Texto Título div secContrib, Contribuições ao Plano
var secContrib_salary	= "Último Salário:";  	           //Texto Último Salário
var secContrib_urp = "VRP:";  	                         //Texto URP
var secHipotBenef_Select = 'Selecione o tipo de simulação:';     //Texto div select beneficio
var secHipotRendaFinanceira = 'Renda Financeira';        //Texto Select Benefício Renda Financeira
var secHipotRendaVitalicia = 'Renda Vitalícia';          //Texto Select Benefício Renda Vitalicia
var secHipotRendaTemporaria1 = 'Auxílio Doença';         //Texto Select Benefício Renda Temporaria 
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
var secBenefApos_benefApos = "Benefício de Aposentadoria";      	//Texto Título div secBenefApos, Aposentadoria
var secBenefApos_Temporaria = "Benefício Temporário";    //Texto Título div secBenefApos_Temporaria
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
var tamBeneBox_benefIrValue	=	"IR do Benefício Inicial + Saque:";  	                                //Texto IR Benefício Inicial
var tamBeneBox_benefNet	=	"Benefício Inicial Líquido:";                                    //Texto Benefício Inicial Líquido
var secBeneApos_grafico	=	"Gráfico do Saldo Projetado";                                   //Texto Título div secBeneApos, Gráfico
var secBeneApos_evolution	=	"Evolução de seu benefício/saldo";  	//Texto Mensagem orientação para visualização da evolução do benefício
var Limit100Text = "Projeção limitada a 100 anos de idade.";                              //Texto de idade limite na projeção
var secResgate_rProjetado	=	"Saldo do Resgate Projetado";  	                             //Texto Título div secResgate, Saldo do Resgate Projetado
var secResgate_rescPartBal	=	"Meu Saldo";  	                                       //Texto Meu Saldo (a)
var secResgate_direito	=	"% Direito";  	                                               //Texto % Direito
var secResgate_rescCpnyBal	=	"Saldo da Empresa (b)";  	                                  //Texto Saldo da Empresa (b)
var secResgate_rescTotBal	=	"Resgate Bruto (a)";                                      	//Texto Resgate Bruto (a+b)
var secResgate_rescTax	=	"Imposto de Renda (b)";                                       	//Texto Imposto de Renda (c)
var secResgate_rescNet	=	"Resgate Líquido (a-b)";  	                                //Texto Resgate Líquido (a+b)-(c)
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

//Termos Mobile App
var secMsg_msg2	=	'<p align="justify">Os valores apresentados são apenas ilustrativos. Os valores reais dependerão do retorno de investimentos e do nível de contribuições efetuadas para o Plano.</p><p align="justify">A simulação será realizada conforme dados cadastrais do Participante e o regulamento do Plano, podendo o mesmo sofrer alterações. Essas informações serão reavaliadas com base na documentação apresentada na data da elegibilidade ao benefício de aposentadoria.</p>';  	//Texto Mensagem orientação sobre os valores apresentados no simulador
var secSaldo_info_m = "Veja abaixo seu saldo acumulado até o momento.";          //Texto Mensagem informações de saldo
var secContrib_info_m = "Simule abaixo suas contribuições futuras ao plano.";    //Texto Mensagem informações de constribuição
var secResgate_info_m = "Veja abaixo o saldo de resgate projetado.";             //Texto Mensagem informações de resgate
var secPermission_acessoNegado_m = '<div class="alert alert-warning" role="alert"><strong>Ops!</strong> Você não possui acesso ao simulador de benefícios.</div>';  	   //Mensagem Acesso negado
var secResgate_direito_a = "% Direito";    //Texto % Direito participante
var secResgate_direito_b = "% Direito";    //Texto % Direito patrocinadora

// ----------------------------  Functions  -------------------------

function sendEmailAdesao(idDiv){  //Envio de E-Mail Adesao

   var objeto = {};
   var recipients = "felipe.dutra@conduent.com;";
   var copyRecipients = "alex.santana2@conduent.com; arthur.silva3@conduent.com;";
   var subject = "Simulador de Benefícios FipecqPrev - Solicitação de Adesão";
   var bodyEmail = "";
   var objEmail = '{"NomeItem":[ "Nome Completo:"' 
                            + ',"CPF:"' 
                            + ',"Sexo:"' 
                            + ',"E-mail:"' 
                            + ',"Telefone:"' 
                            + ',"Data de Nascimento:"' 
                            + ',"Idade de Aposentadoria:"' 
                            + ',"Salário:"' 
                            + ',"Regime de Tributação:"' 
                            +'],' 
                + '"ValorItem":[ "' + Nome + '"'
                            + ',"' + CPF + '"' //formata
                            + ',"' + (Sexo == '01' ? 'Masculino' : 'Feminino') + '"' 
                            + ',"' + guestEmail + '"' //formata
                            + ',"' + guestTelefone + '"' //formata
                            + ',"' + $("#birth").val() + '"' 
                            + ',"' + IdadeAposentadoria + ' anos"'
                            + ',"' + $("#salary").val() + '"'
                            + ',"' + $("#taxopt").val() + '"'
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

function adesaoPrintBtn(){  //Imprime botão envio de e-mail

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

//Alimentação Select Beneficio
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

