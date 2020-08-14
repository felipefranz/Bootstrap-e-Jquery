
    var dados_simulador;
    
    var TextMovto;                   //JSON resultado das movimentações no private
    var DadosPlano;                  //JSON dados do plano
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
    
    var l_n, JsonDeslogado, l_r;     //Parâmetros Get Não Logado
    var n, g, r;                     //Parâmetros Get Logado

  //Função Ajax síncrona retorna JSON com os dados do JSP
//function loadJson(f_n, f_g, f_r, url) {
//  try{
//    var xmlhttp = new XMLHttpRequest();
//    var Json;
//    xmlhttp.open("POST", url, false);  
//    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//      //xmlhttp.send("n="+f_n+"&g="+f_g+"&r="+f_r+"");     
//    xmlhttp.send("paStrUsername=0999cac.ativo");
//    //Retorno String JSP
//    Json = JSON.parse(xmlhttp.responseText);
//    } catch(err){}     
//    return Json;  
//  } 
    function loadJson(username){
    var dataValue = "{paStrUsername: '" + username + "', url_ret: 'www.meudominio.com.br'}";
    $.ajax({
        type: "POST",
        url: "SimuladorBeneficios.aspx/SimuladorBeneficiosDadosBasicosJson",
        data: dataValue,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: LoadDados,
        error: function (err) {
            Error(alert( err));
        }
    });
}

//function LoadSimulador(info_n){
//    n = info_n.d;    
//    r = g = "";    
//    var url = 'https://www.portal-hro.com.br/portal/jslib/SimuladorBeneficios/Simulador_Benef/view-model.jsp';
//    dados_simulador = loadJson(n, g, r, url);
//    //Tratamento dos dados para participante não logado
//    dados_simulador = dados_nao_logado(n, g, r);


//    LoadDados();
//    //downloadJSAtOnload();
//    //Atraso para carregamento após arquivos de confirgurações
//    setTimeout(function(){ downloadJSAtOnload(); }, 1000);    
//}


function LoadSimulador(info_n) {
    var dataValue = "{paStrUsername: '0999cac.ativo'}";
    $.ajax({
        type: "POST",
        url: "Action/ServiceAction.svc/SimuladorBeneficiosDadosBasicosJson",
        data: dataValue,
        contentType: 'application/json; charset=utf-8',
        
        dataType: 'json',
        success: LoadDados,
        error: function (err) {
            Error('#dvInicio', err);
        }
    });

}



  if(!isMobileApp()){

    //var parameters = location.search.substring(1).split("&");

    //var temp = parameters[0].split("=");
    //n = unescape(temp[1]);
    //temp = parameters[1].split("=");
    //g = unescape(temp[1]);
    //temp = parameters[2].split("=");
    //r = unescape(temp[1]);
    
    //Retorno String JSP ja convetido para o formato JSON
      //dados_simulador = loadJson(n, g, r, 'view-model.jsp');
      loadJson('0999cac.ativo');
    
    //Tratamento dos dados para participante não logado
    //dados_simulador = dados_nao_logado(n, g, r);
      //LoadDados();


    //Atraso para carregamento após arquivos de confirgurações
    if (window.addEventListener) {
      window.addEventListener("load", downloadJSAtOnload, false);
     } else if (window.attachEvent) {
      window.attachEvent("onload", downloadJSAtOnload);
     } else { 
      window.onload = downloadJSAtOnload;
    }
  }


// Função para chamar o engine somente quando os arquivos a cima tiverem sido carrregados
function downloadJSAtOnload() {
var imported_9 = document.createElement("script");
imported_9.src ='https://www.portal-hro.com.br/portal/jslib/SimuladorBeneficios/Simulador_Benef/js/base_scripts/engine.js';
imported_9.charset ="ISO-8859-1"; 
document.getElementById("config_scripts").appendChild(imported_9);
}


//identifica se é simulador mobile ou desktop
function isMobileApp(){ 
    var title = $('title').text();

    (title.indexOf("Simulador de Beneficios Mobile") >= 0) ? title = true : title = false;

    return title;
}

function LoadDados2(dados)
{
    
    alert(dados.d);
    alert(dados.TextMovto);
    alert(dados.d.TextMovto);
    alert(dados.d[0].TextMovto);

    $(dados.d).each(function (i, item) {
        alert(item);
    });
    //

    TextMovto = dados_simulador[0].TextMovto;
}

function LoadDados(dados) { //Carregamento dos dados de simulação

    try {
        dados_simulador = JSON.parse(dados.d);
        //dados_simulador = dados[0];
  TextMovto = dados_simulador.TextMovto;       
  DadosPlano = dados_simulador.DadosPlano;     
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
  valorQuota1 =  dados_simulador.valorQuota1;  
  NomePerfil2 = dados_simulador.NomePerfil2;   
  valorQuota2 = dados_simulador.valorQuota2;   
  PMTIni = dados_simulador.PMTIni;             
  QntDep = dados_simulador.QntDep;             
  DCB = dados_simulador.DCB;                  
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
  url_retorno = dados_simulador.url_retorno;                    
  text_Date = new Date();
  text_Ano = text_Date.getFullYear();                           
  Qtd_contrib = dados_simulador.Qtd_contrib;                    
  tLimitePart = dados_simulador.tLimitePart;                    
  tLimitePatroc = dados_simulador.tLimitePatroc;                
  vLimitePart = dados_simulador.vLimitePart;                    
  vLimitePatroc = dados_simulador.vLimitePatroc; 
  Sexo = dados_simulador.Sexo; 
  TetoINSS = dados_simulador.TetoINSS; 
  ValSaque = 0;                    
  MinSaque = 0;                   
  MaxSaque = 25;                   
  IncSaque = 1;


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
  } catch(err){} 

 //Importação de Arquivos js. 
var imported_1 = document.createElement('script'); 
imported_1.src ='https://www.portal-hro.com.br/portal/jslib/SimuladorBeneficios/Simulador_Benef/js/config_scripts/'+Id_entidade+'/'+Id_plano+'/config_var.js'; 
imported_1.charset ="ISO-8859-1"; 
document.getElementById("config_scripts").appendChild(imported_1);

var imported_2 = document.createElement('script'); 
imported_2.src ='https://www.portal-hro.com.br/portal/jslib/SimuladorBeneficios/Simulador_Benef/js/config_scripts/'+Id_entidade+'/'+Id_plano+'/rl_aposentadoria.js'; 
imported_2.charset ="ISO-8859-1"; 
document.getElementById("config_scripts").appendChild(imported_2);

var imported_3 = document.createElement('script'); 
imported_3.src ='https://www.portal-hro.com.br/portal/jslib/SimuladorBeneficios/Simulador_Benef/js/config_scripts/'+Id_entidade+'/'+Id_plano+'/rl_resgate.js'; 
imported_3.charset ="ISO-8859-1"; 
document.getElementById("config_scripts").appendChild(imported_3);

var imported_4 = document.createElement('script'); 
imported_4.src ='https://www.portal-hro.com.br/portal/jslib/SimuladorBeneficios/Simulador_Benef/js/config_scripts/'+Id_entidade+'/'+Id_plano+'/rl_contribuicao.js'; 
imported_4.charset ="ISO-8859-1"; 
document.getElementById("config_scripts").appendChild(imported_4);

var imported_5 = document.createElement('script'); 
imported_5.src ='https://www.portal-hro.com.br/portal/jslib/SimuladorBeneficios/Simulador_Benef/js/config_scripts/'+Id_entidade+'/'+Id_plano+'/rl_beneficio.js'; 
imported_5.charset ="ISO-8859-1"; 
document.getElementById("config_scripts").appendChild(imported_5);

var imported_6 = document.createElement('script'); 
imported_6.src ='https://www.portal-hro.com.br/portal/jslib/SimuladorBeneficios/Simulador_Benef/js/config_scripts/'+Id_entidade+'/'+Id_plano+'/rl_permissoes.js'; 
imported_6.charset ="ISO-8859-1"; 
document.getElementById("config_scripts").appendChild(imported_6);

var imported_7 = document.createElement('script'); 
imported_7.src ='https://www.portal-hro.com.br/portal/jslib/SimuladorBeneficios/Simulador_Benef/js/base_scripts/rl_ir_progressivo.js'; 
imported_7.charset ="ISO-8859-1"; 
document.getElementById("config_scripts").appendChild(imported_7);

var imported_8 = document.createElement('script'); 
imported_8.src ='https://www.portal-hro.com.br/portal/jslib/SimuladorBeneficios/Simulador_Benef/js/base_scripts/rl_ir_regressivo.js'; 
imported_8.charset ="ISO-8859-1"; 
document.getElementById("config_scripts").appendChild(imported_8);



}

function dados_nao_logado(l_n, l_g, l_r){

      l_n = atob(l_n);
      JsonDeslogado = atob(l_g);
      l_r = atob(l_r);
   
   if (l_n.indexOf("simbenef")>0 ){  //Salva valores aqui                   
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
      dados_simulador.DtAdmissao = JsonDeslogado.DtAdmissao;      
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
      dados_simulador.Ncmto = JsonDeslogado.Ncmto;                        
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

      //Eventos de Tela
      $("#secInfo_fldStatus").addClass('hide');          
      $("#fldstatus").addClass('hide');  
      $("#secSaldo").addClass('hide');  
      $("#secMsg_dtSaldoFoot").addClass('hide');  
      $("#dtSaldoFoot").addClass('hide');
      $("#dtbal").addClass('hide');
      $("#secSaldo_dtbal").addClass('hide');   
   } else {
     Deslogado = false;
   }

   return dados_simulador;
   
}


/*
//Backup evento de carregamento
if (window.addEventListener) {
window.addEventListener("load", downloadJSAtOnload, false);
} else if (window.attachEvent) {
window.attachEvent("onload", downloadJSAtOnload);
} else { 
window.onload = downloadJSAtOnload;
}
*/
