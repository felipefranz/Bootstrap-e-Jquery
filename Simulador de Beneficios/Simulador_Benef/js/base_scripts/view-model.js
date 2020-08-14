var dados_simulador;
var dataValueParam;
var TextMovto;                   //JSON resultado das movimentações no private
var DadosPlano;                  //JSON dados do plano
var DadosAssistido;              //JSON dados assistido
var Id_entidade;                 //Id da Entidade
var Id_plano;                    //Id do Plano
var URP;                         //Valor da URP                        
var Nome;                        //Nome completo
var CPF;                         //CPF
var BenefIni;                    //Valor do último benefício do Assistido
var DTBenefIni;                  //Data do último benefício do Assistido
var DtAdmissao;                  //Data de admissão na empresa
var DtAdesao;                    //Data de adesão ao Plano
var DtDeslig;                    //Data de desligamento da empresa
var DtSaldoIni;                  //Data do Saldo 
var NomePerfil1;                 //Alias Perfil 1
var valorQuota1;                 //Valor Quota Perfil 1
var NomePerfil2;                 //Alias Perfil 2
var valorQuota2;                 //Valor Quota Perfil 2
var PMTIni;                      //Forma de pagamento atual do Assistido
var QntDep;                      //Quantidade Dependentes de IR
var DCB;                         //Data de Cessação do Benefício do Assistido - Caso não exista, retornar hífen "-"
var DecimoTerceiro;              //Atual opcao pelo recebimento do decimo terceiro do participante
var Salario;                     //Salário do Participante
var OpcaoTribut;                 //Opção tributação N - Progressivo, S - Regressivo
var UltContribPart;              //Valor da última contribuição de Participante
var UltContribPatroc;            //Valor da última contribuição de Patrocinadora
var status;                      //status no private
var statustxt;                   //descrição do status
var motivo_status;               //motivo do status no private
var motivo_statustxt;            //descrição do motivo
var nome_plano_abrev;            //Nome abreviado do Plano
var nome_entidade_abrev;         //Nome abreviado da Entidade
var Ncmto;                       //Data de Nascimento do Assistido MM/DD/AAAA
var url_retorno;                 //URl Retorno
var text_Date;
var text_Ano;                    //Ano Vigente
var Qtd_contrib;                 //Quantidade de contribuições ao plano
var tLimitePart;                 //Tipo de limite de contribuição de participante
var tLimitePatroc;               //Tipo de limite de contribuição de patrocinadora
var vLimitePart;                 //Valor de limite de contribuição de participante
var vLimitePatroc;               //Valor de limite de contribuição de patrocinadora
var ValSaque;                    //Valor inicial de saque à vista
var MinSaque;                    //Valor mínimo de saque à vista
var MaxSaque;                    //Valor máximo de saque à vista
var IncSaque;                    //Incremento de saque à vista
var Sexo;                        //Sexo participante
var TetoINSS;                    //Teto de aposentadoria INSS
var Deslogado;                   //Controle Participante deslogado
var flagIRResgateProg;           //Flag de controle para calculo de IR do resgate progressivo, 0 = IR Tab Progressiva (Default) / 1 = IR 15%, configuracao no config_var do plano

var l_n, JsonDeslogado, l_r;     //Parâmetros Get Não Logado
var n, g, r, p;                  //Parâmetros Get Logado
var urlWebService ;              //Parâmetros link chamada Ajax loadJson

//identifica se é simulador mobile ou desktop
function isMobileApp() {
    var title = $('title').text();
	
    (title.indexOf("Simulador de Beneficios Mobile") >= 0) ? title = true : title = false;

    return title;
}

// ------------------------------------------------  Bloco de Tratamento New Date() para IE ------------------------

//Salva objeto Date original
var dateOriginal = Date;  

//Variaveis da sobrescrita do new Date
var ua = navigator.userAgent;  //Identifica o navegador
var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;  /* MSIE used to detect old browsers and Trident used to newer ones*/
var is_safari = ua.toLowerCase().indexOf("apple") > -1 || ua.toLowerCase().indexOf("safari/") > -1;  /* MSIE used to detect old browsers and Trident used to newer ones*/

var bind = Function.bind;       //Variaveis da sobrescrita do new Date
var unbind = bind.bind(bind);   //Variaveis da sobrescrita do new Date

//Valida se é IE
if(is_ie || is_safari){

    function instantiate(constructor, args) {
        return new (unbind(constructor, null).apply(null, args));
    }

    Date = function (Date) {
        return function () {
            var date = instantiate(Date, arguments);
            var args = arguments.length;
            var arg = arguments[0];                       

            if(is_ie){
                if (date.getHours() == 23 && date > Date.now()){
                    date.setHours(25);
                }
            }    
            
            if(is_safari){   
                              
                if(arg && !(arg == null || arg == 'Invalid Date' || arg == 'NaN')){ // Valida se arg é diferente de undefined e diferente 
                    arg = arg.toString();                                        
                                                     
                    if (arg.indexOf("/") >= 0) { //valida se a data inicializada na chamada esta no formato mm/dd/yyyy
                        if(arg.length == 9) { 
                            //Constroi new Date no formato (ano, mes, dia)
                            date = new Date(parseInt(arg.slice(5,9)), parseInt(arg.slice(0,1)) - 1, parseInt(arg.slice(2,4)));                            
                        } else {
                            //Constroi new Date no formato (ano, mes, dia)
                            date = new Date(parseInt(arg.slice(6,10)), parseInt(arg.slice(0,2) >= "10" ? arg.slice(0,2) : arg.slice(1,2)) - 1, parseInt(arg.slice(3,5)));
                        }
                    }
                }                
                                
                if (date.getHours() == 23 && date > Date.now()){
                    date.setHours(25);
                }
            }
            
            return date;
        }
    }(Date);

    //Recupera métodos após sobrescrita do construtor
    Date.UTC = dateOriginal.UTC;
    Date.now = dateOriginal.now;
    Date.parse = dateOriginal.parse;
} 

// ------------------------------------------------ Fim Bloco de Tratamento New Date() para IE ------------------------

if (!isMobileApp()) {
    //Username
    n = ((getParameterByName('n') != null) ? getParameterByName('n') : getParameterByName('N'));
    //UserGroup
    g = ((getParameterByName('g') != null) ? getParameterByName('g') : getParameterByName('G'));
    //UserId
    p = ((getParameterByName('p') != null) ? getParameterByName('p') : getParameterByName('P'));
    //URL 
    r = ((getParameterByName('r') != null) ? getParameterByName('r') : getParameterByName('R'));

    //Tratamento de erro para participante com múltiplo acesso    
    if (r != null && p == null && n != null){
      var str_r = atob(r);
      var str_n = atob(n);

      str_n = str_r.toLowerCase().indexOf("pesquisaparticipantemenu") > 0 ? str_n.substring(0,4)+'XXXXXXXXXXX' : str_n;
      
      n = btoa(str_n); 
    }
	
	//Link Ambiente Portal
	urlWebService = "../wsgeneric/GlobalServiceGeneric.asmx/SimuladorBeneficiosDadosBasicosJson";
    
	//Retorno String JSP ja convetido para o formato JSON
    loadJson(n, g, r, p);
	
}
else
{
	//Link Ambiente Mobile
    urlWebService = "https://www.portal-hro.com.br/portal/site/Generico/wsgeneric/GlobalServiceGeneric.asmx/SimuladorBeneficiosDadosBasicosJson";
    
    //Carregamento Mobile
    isMobileApp() ? showCarregamento(true): ""; 
}

function loadJson(f_n, f_g, f_r, f_p) {

    if (f_n != null && f_p != null && f_p != "") {
        dataValueParam = "{paStrUsername : '" + f_n + "', url_ret: '" + f_r + "', paIntUserId : " + atob(f_p) + "}";
    }

    else if (f_n != null && (f_p == null || f_p == "")) {
        dataValueParam = "{paStrUsername : '" + f_n + "', url_ret: '" + f_r + "', paIntUserId : 0}";
    }
	
	 $.ajax({
        type: "POST",
        //url: "../wsgeneric/GlobalServiceGeneric.asmx/SimuladorBeneficiosDadosBasicosJson",
		url: urlWebService,
        data: dataValueParam,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (dados) {
			
			console.log(dados);

            if (dados.d == "Erro") {
                message("Não foram encontrados dados para a simulação!", f_r);
            }
            else {                               
                dados_simulador = JSON.parse(dados.d);
                dados_nao_logado(f_n, f_g, f_r);
                LoadDados();
            }
        },
        error: function (err) {
            Error(alert(err));
        }
    });
}

function message(text, urlReturn) {
    setTimeout(function () {
        swal({
            title: "Opps!",
            text: text,
            type: "warning"
        }, function () {
            window.location.href = atob(urlReturn);
        });
    }, 1000);
}

// Função para chamar o engine somente quando os arquivos a cima tiverem sido carrregados
function LoadDados()
{ 
    try {        
        TextMovto = dados_simulador.TextMovto;
        DadosPlano = dados_simulador.DadosPlano !== null ? dados_simulador.DadosPlano : "";
        DadosAssistido = dados_simulador.DadosAssistido !== null ? dados_simulador.DadosAssistido : "";
        Id_entidade = dados_simulador.Id_entidade;
        Id_plano = dados_simulador.Id_plano;
        URP = dados_simulador.URP;
        Nome = dados_simulador.Nome;
        CPF = dados_simulador.CPF;
        BenefIni = dados_simulador.BenefIni;
        DTBenefIni = dados_simulador.DTBenefIni
        DtAdmissao = dados_simulador.DtAdmissao
        DtAdesao = dados_simulador.DtAdesao
        DtDeslig = dados_simulador.DtDeslig
        DtSaldoIni = dados_simulador.DtSaldoIni;
        NomePerfil1 = dados_simulador.NomePerfil1;
        valorQuota1 = dados_simulador.valorQuota1;
        NomePerfil2 = dados_simulador.NomePerfil2;
        valorQuota2 = dados_simulador.valorQuota2;
        PMTIni = dados_simulador.PMTIni;
        QntDep = dados_simulador.QntDep;
        DCB = dados_simulador.DCB;
        DecimoTerceiro = dados_simulador.DecimoTerceiro == "True" ? true : false;
        Salario = dados_simulador.Salario;
        OpcaoTribut = dados_simulador.OpcaoTribut;
        UltContribPart = dados_simulador.UltContribPart;
        UltContribPatroc = dados_simulador.UltContribPatroc;
        status = parseInt(dados_simulador.status);
        statustxt = dados_simulador.statustxt;
        motivo_status = dados_simulador.motivo_status;
        motivo_statustxt = dados_simulador.motivo_statustxt;
        nome_plano_abrev = dados_simulador.nome_plano_abrev;
        nome_entidade_abrev = dados_simulador.nome_entidade_abrev;
        Ncmto = dados_simulador.Ncmto;
        url_retorno = dados_simulador.url_retorno !== null ? dados_simulador.url_retorno : "";
        text_Date = new Date();
        text_Ano = text_Date.getFullYear();
        Qtd_contrib = dados_simulador.Qtd_contrib;
        tLimitePart = dados_simulador.tLimitePart;
        tLimitePatroc = dados_simulador.tLimitePatroc;
        vLimitePart = dados_simulador.vLimitePart;
        vLimitePatroc = dados_simulador.vLimitePatroc;
        Sexo = dados_simulador.Sexo;
        TetoINSS = dados_simulador.TetoINSS;
        Username = atob(n);
        ValSaque = 0;
        MinSaque = 0;
        MaxSaque = 25;
        IncSaque = 1;
        flagIRResgateProg = 0; 

        //Se pesquisa Json retorna vazia exibe mensagem de permissao
        var str = JSON.stringify(TextMovto);
        if (str == "" || str.indexOf(":[]}") > 0) {
            $("#Home_Logo").html('<p class="navbar-text navbar-left"><a href="' + url_retorno + '"class="navbar-link">Home</a></p>');
            $("#home_text").html('<a href="' + url_retorno + '"class="navbar-link">Voltar</a>');
            $("#secPermission_acessoNegado").html('<div class="alert alert-warning" role="alert"><strong>Ops!</strong> Acesso Negado. <a href="' + url_retorno + '">Clique aqui</a> para voltar à página inicial.</div>');
            $("#secPermission").show();
            $("#secInfo").hide();       //Informações Pessoais
            $("#grpTermination").hide();  //Data de Desligamento
            $("#secSaldo").hide();      //Saldo de Contas
            $("#secContrib").hide();    //Contribuições ao Plano
            $("#secSalURP").hide();     //Salário e URP
            $("#secHipot").hide();      //Hipóteses Financeiras e Atuariais
            $("#secCrescSal").hide();   //Crescimento Salarial  
            $("#secSimulation").hide(); //Simulação
            $("#secResgate").hide();    //Resgate
            $("#secBenefAnterior").hide(); //Último Benef&iacute;cio
            $("#secBenefApos").hide();  //Direito Adquirido do Benef&iacute;cio de Aposentadoria
            $("#secSaque").hide();      //Saque
            $("#secMsg").hide();        //Disclaimer
            $("#secFoot").hide();       //Rodapé  
            $("#img30").hide();
            $("#img40").hide();
            $("#img54").hide();
            $("#img75").hide();
            $("#msgBenefOK").hide();
            isMobileApp() ? showCarregamento(false): ""; //Carregamento Mobile
        }
    } catch (err) { }    

    loadScripts(Id_entidade, Id_plano);
    //loadScripts(Id_entidade, Id_plano, downloadJSAtOnload);
    //function loadScripts(Id_entidade, Id_plano, callback) {
}

function loadScripts(Id_entidade, Id_plano) {

    //Importação de Arquivos js. 
    var imported_1 = document.createElement('script');
    imported_1.src = 'https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/js/config_scripts/' + Id_entidade + '/' + Id_plano + '/config_var.js?' + (Deslogado ? "" : Date.now());
    imported_1.charset = "ISO-8859-1";
    document.getElementById("config_scripts").appendChild(imported_1);

    var imported_2 = document.createElement('script');
    imported_2.src = 'https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/js/config_scripts/' + Id_entidade + '/' + Id_plano + '/rl_aposentadoria.js?' + (Deslogado ? "" : Date.now());
    imported_2.charset = "ISO-8859-1";
    document.getElementById("config_scripts").appendChild(imported_2);

    var imported_3 = document.createElement('script');
    imported_3.src = 'https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/js/config_scripts/' + Id_entidade + '/' + Id_plano + '/rl_resgate.js?' + (Deslogado ? "" : Date.now());
    imported_3.charset = "ISO-8859-1";
    document.getElementById("config_scripts").appendChild(imported_3);

    var imported_4 = document.createElement('script');
    imported_4.src = 'https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/js/config_scripts/' + Id_entidade + '/' + Id_plano + '/rl_contribuicao.js?' + (Deslogado ? "" : Date.now());
    imported_4.charset = "ISO-8859-1";
    document.getElementById("config_scripts").appendChild(imported_4);

    var imported_5 = document.createElement('script');
    imported_5.src = 'https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/js/config_scripts/' + Id_entidade + '/' + Id_plano + '/rl_beneficio.js?' + (Deslogado ? "" : Date.now());
    imported_5.charset = "ISO-8859-1";
    document.getElementById("config_scripts").appendChild(imported_5);

    var imported_6 = document.createElement('script');
    imported_6.src = 'https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/js/config_scripts/' + Id_entidade + '/' + Id_plano + '/rl_permissoes.js?' + (Deslogado ? "" : Date.now());
    imported_6.charset = "ISO-8859-1";
    document.getElementById("config_scripts").appendChild(imported_6);

    var imported_7 = document.createElement('script');
    imported_7.src = 'https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/js/base_scripts/rl_ir_progressivo.js?' + (Deslogado ? "" : Date.now());
    imported_7.charset = "ISO-8859-1";
    document.getElementById("config_scripts").appendChild(imported_7);

    var imported_8 = document.createElement('script');
    imported_8.src = 'https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/js/base_scripts/rl_ir_regressivo.js?' + (Deslogado ? "" : Date.now());
    imported_8.charset = "ISO-8859-1";
    document.getElementById("config_scripts").appendChild(imported_8);

    //callback();
    
    setTimeout(function () {
        downloadJSAtOnload();
    }, 4500)
    
}

function downloadJSAtOnload() {
    var imported_9 = document.createElement("script");
    imported_9.src = 'https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/js/base_scripts/engine.js?' + (Deslogado ? "" : Date.now());
    imported_9.charset = "ISO-8859-1";
    document.getElementById("config_scripts").appendChild(imported_9);
}

function dados_nao_logado(l_n, l_g, l_r) {
    l_n = atob(l_n);
    JsonDeslogado = atob(l_g);
    l_r = atob(l_r);

    if (l_n.indexOf("simbenef") > 0){  //Salva valores aqui                   
        Deslogado = true;

        JsonDeslogado = JSON.parse(JsonDeslogado);

        dados_simulador.DadosPlano;
        dados_simulador.Id_entidade;
        dados_simulador.Id_plano;
        dados_simulador.URP;
        dados_simulador.tLimitePart;
        dados_simulador.tLimitePatroc;
        dados_simulador.vLimitePart;
        dados_simulador.vLimitePatroc;
        dados_simulador.DtDeslig;
        dados_simulador.DtSaldoIni;
        dados_simulador.nome_plano_abrev;
        dados_simulador.nome_entidade_abrev;
        dados_simulador.TetoINSS;
        dados_simulador.TextMovto = JsonDeslogado.TextMovto;
        dados_simulador.Nome = JsonDeslogado.Nome;
        dados_simulador.CPF = JsonDeslogado.CPF;
        dados_simulador.DtAdmissao = (JsonDeslogado.DtAdmissao != undefined) ? JsonDeslogado.DtAdmissao : JsonDeslogado._DtAdmissao;
        dados_simulador.DtAdesao = JsonDeslogado.DtAdesao;
        dados_simulador.NomePerfil1 = JsonDeslogado.NomePerfil1;
        dados_simulador.valorQuota1 = JsonDeslogado.valorQuota1;
        dados_simulador.NomePerfil2 = JsonDeslogado.NomePerfil2;
        dados_simulador.valorQuota2 = JsonDeslogado.valorQuota2;
        dados_simulador.QntDep = JsonDeslogado.QntDep;
        dados_simulador.Salario = JsonDeslogado.Salario;
        dados_simulador.OpcaoTribut = JsonDeslogado.OpcaoTribut;
        dados_simulador.status = parseInt(JsonDeslogado.status);
        dados_simulador.statustxt = JsonDeslogado.statustxt;
        dados_simulador.motivo_status = JsonDeslogado.motivo_status;
        dados_simulador.motivo_statustxt = JsonDeslogado.motivo_statustxt;
        dados_simulador.Ncmto = (JsonDeslogado.Ncmto != undefined) ? JsonDeslogado.Ncmto : JsonDeslogado._Ncmto;
        dados_simulador.url_retorno = l_r;
        dados_simulador.Sexo = JsonDeslogado.Sexo;
        dados_simulador.Qtd_contrib = 0;
        dados_simulador.UltContribPart = 0;
        dados_simulador.UltContribPatroc = 0;
        //Assistido
        dados_simulador.BenefIni;
        dados_simulador.DTBenefIni;
        dados_simulador.PMTIni;
        dados_simulador.DCB;
    } else {
        Deslogado = false;
    }
    return dados_simulador;
}


//Usado na chamada mobile
function LoadSimulador(info_n) {
    n =  info_n.d;
    r = (info_n.r != undefined) ? info_n.r : '';
    g = (info_n.g != undefined) ? info_n.g : '';
    p = (info_n.p != undefined) ? info_n.p : '';

    loadJson(n, g, r, p);
	
	try{
	waitMeHide('#dvSimulador');
	}catch(err){console.log(err);}
    //Tratamento dos dados para participante não logado
    //dados_simulador = dados_nao_logado(n, g, r);
    //LoadDados();
    //Atraso para carregamento após arquivos de confirgurações
    //setTimeout(function () { downloadJSAtOnload(); }, 1000);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//Controle de Exibição de divCarregamento        
function showCarregamento(exibir){

    if(exibir){
       $('#modalBack').addClass('hide');        
       $('#wait').addClass('hide');        
    } else {
       $('#modalBack').removeClass('hide');        
       $('#wait').removeClass('hide');               
    }
}  