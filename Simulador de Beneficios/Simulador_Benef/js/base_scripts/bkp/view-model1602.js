<!-- saved from url=(0016)http://localhost --> 

    var dados_simulador;    

    var n, g, r;

    var parameters = location.search.substring(1).split("&");

    var temp = parameters[0].split("=");
    n = unescape(temp[1]);
    temp = parameters[1].split("=");
    g = unescape(temp[1]);
    temp = parameters[2].split("=");
    r = unescape(temp[1]);

  //Função Ajax síncrona retorna JSON com os dados do JSP
function loadJson(f_n, f_g, f_r) {
  var xmlhttp = new XMLHttpRequest();
  var url = "view-model.jsp"; 
  var Json;
  xmlhttp.open("POST", url, false);  
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("n="+f_n+"&g="+f_g+"&r="+f_r+"");
  //Retorno String JSP
  Json = JSON.parse(xmlhttp.responseText);
  return Json;
  }  


  //Retorno String JSP ja convetido para o formato JSON
  dados_simulador = loadJson(n, g, r);


var TextMovto = dados_simulador.TextMovto;       //JSON resultado das movimentações no private
var DadosPlano = dados_simulador.DadosPlano;     //JSON dados do plano
var Id_entidade = dados_simulador.Id_entidade;   // Id da Entidade
var Id_plano = dados_simulador.Id_plano;         // Id do Plano
var URP = dados_simulador.URP;                                 //Valor da URP                        
var Nome = dados_simulador.Nome;           //Nome completo
var CPF = dados_simulador.CPF;                       //CPF
var BenefIni = dados_simulador.BenefIni;                            //Valor do último benefício do Assistido
var DTBenefIni = dados_simulador.DTBenefIni                     //Data do último benefício do Assistido
var DtAdmissao = dados_simulador.DtAdmissao                     //Data de admissão na empresa
var DtAdesao = dados_simulador.DtAdesao                       //Data de adesão ao Plano
var DtDeslig = dados_simulador.DtDeslig                       //Data de desligamento da empresa
var DtSaldoIni = dados_simulador.DtSaldoIni;                    //Data do Saldo 
var NomePerfil1 = dados_simulador.NomePerfil1;                           //Alias Perfil 1
var valorQuota1 =  dados_simulador.valorQuota1;                 //Valor Quota Perfil 1
var NomePerfil2 = dados_simulador.NomePerfil2;                          //Alias Perfil 2
var valorQuota2 = dados_simulador.valorQuota2;                              //Valor Quota Perfil 2
var PMTIni = dados_simulador.PMTIni;               //Forma de pagamento atual do Assistido
var QntDep = dados_simulador.QntDep;                                  //Quantidade Dependentes de IR
var DCB = dados_simulador.DCB;                           //Data de Cessação do Benefício do Assistido - Caso não exista, retornar hífen "-"
var Salario = dados_simulador.Salario;                            //Salário do Participante
var OpcaoTribut = dados_simulador.OpcaoTribut;                            //Opção tributação N - Progressivo, S - Regressivo
var UltContribPart = dados_simulador.UltContribPart;                      //Valor da última contribuição de Participante
var UltContribPatroc = dados_simulador.UltContribPatroc;                    //Valor da última contribuição de Patrocinadora
var status = parseInt(dados_simulador.status);                                   //status no private
var statustxt = dados_simulador.statustxt;                          //descrição do status
var motivo_status = dados_simulador.motivo_status;                           //motivo do status no private
var motivo_statustxt = dados_simulador.motivo_statustxt;            //descrição do motivo
var nome_plano_abrev = dados_simulador.nome_plano_abrev;                //Nome abreviado do Plano
var nome_entidade_abrev = dados_simulador.nome_entidade_abrev;          //Nome abreviado da Entidade
var Ncmto = dados_simulador.Ncmto;                          //Data de Nascimento do Assistido MM/DD/AAAA
var url_retorno = dados_simulador.url_retorno;                          //URl Retorno
var text_Date = new Date();
var text_Ano = text_Date.getFullYear();                           //Ano Vigente
var Qtd_contrib = dados_simulador.Qtd_contrib;                    //Quantidade de contribuições ao plano
var tLimitePart = dados_simulador.tLimitePart;                    //Tipo de limite de contribuição de participante
var tLimitePatroc = dados_simulador.tLimitePatroc;                //Tipo de limite de contribuição de patrocinadora
var vLimitePart = dados_simulador.vLimitePart;                    //Valor de limite de contribuição de participante
var vLimitePatroc = dados_simulador.vLimitePatroc;                //Valor de limite de contribuição de patrocinadora

//Se pesquisa Json retorna vazia exibe mensagem de permissao
 var str= JSON.stringify(TextMovto);
  if ( str=="" || str.indexOf(":[]}")>0 ){
    $("#Home_Logo").html('<p class="navbar-text navbar-left"><a href="'+url_retorno+'"class="navbar-link">Home</a></p>');  
    $("#home_text").html('<a href="'+url_retorno+'"class="navbar-link">Voltar</a>');      
    $("#secPermission_acessoNegado").html('<div class="alert alert-warning" role="alert"><strong>Ops!</strong> Acesso Negado. <a href="'+url_retorno+'">Clique aqui</a> para voltar à página inicial.</div>');
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
  } 


//Importação de Arquivos js. 

var imported_1 = document.createElement('script'); 
imported_1.src ='js/config_scripts/'+Id_entidade+'/'+Id_plano+'/config_var.js'; 
imported_1.charset ="ISO-8859-1"; 
document.getElementById("config_scripts").appendChild(imported_1);

var imported_2 = document.createElement('script'); 
imported_2.src ='js/config_scripts/'+Id_entidade+'/'+Id_plano+'/rl_aposentadoria.js'; 
imported_2.charset ="ISO-8859-1"; 
document.getElementById("config_scripts").appendChild(imported_2);

var imported_3 = document.createElement('script'); 
imported_3.src ='js/config_scripts/'+Id_entidade+'/'+Id_plano+'/rl_resgate.js'; 
imported_3.charset ="ISO-8859-1"; 
document.getElementById("config_scripts").appendChild(imported_3);

var imported_4 = document.createElement('script'); 
imported_4.src ='js/config_scripts/'+Id_entidade+'/'+Id_plano+'/rl_contribuicao.js'; 
imported_4.charset ="ISO-8859-1"; 
document.getElementById("config_scripts").appendChild(imported_4);

var imported_5 = document.createElement('script'); 
imported_5.src ='js/config_scripts/'+Id_entidade+'/'+Id_plano+'/rl_beneficio.js'; 
imported_5.charset ="ISO-8859-1"; 
document.getElementById("config_scripts").appendChild(imported_5);

var imported_6 = document.createElement('script'); 
imported_6.src ='js/config_scripts/'+Id_entidade+'/'+Id_plano+'/rl_permissoes.js'; 
imported_6.charset ="ISO-8859-1"; 
document.getElementById("config_scripts").appendChild(imported_6);

var imported_7 = document.createElement('script'); 
imported_7.src ='js/base_scripts/rl_ir_progressivo.js'; 
imported_7.charset ="ISO-8859-1"; 
document.getElementById("config_scripts").appendChild(imported_7);

var imported_8 = document.createElement('script'); 
imported_8.src ='js/base_scripts/rl_ir_regressivo.js'; 
imported_8.charset ="ISO-8859-1"; 
document.getElementById("config_scripts").appendChild(imported_8);


// Função para chamar o engine somente quando os arquivos a cima tiverem sido carrregados
function downloadJSAtOnload() {
var imported_9 = document.createElement("script");
imported_9.src ='js/base_scripts/engine.js';
imported_9.charset ="ISO-8859-1"; 
document.getElementById("config_scripts").appendChild(imported_9);
}

if (window.addEventListener){
window.addEventListener("load", downloadJSAtOnload, false);
} else if (window.attachEvent) {
window.attachEvent("onload", downloadJSAtOnload);
} else { 
window.onload = downloadJSAtOnload;
}

//identifica se é simulador mobile ou desktop
function isMobileApp(){ 
    var title = $('title').text();

    (title.indexOf("Simulador de Beneficios Mobile") >= 0) ? title = true : title = false;

    return title;
}