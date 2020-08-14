using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using Xerox.EHROBR.WebModule.IN26;
using Xerox.EHROBR.WebModule.Mobile;
using EDS.SpecialAccounts.FrameWork.Data;
using EDS.SpecialAccounts.FrameWork.Data.Common;
using Xerox.EHROBR.WebModule.Security;
using System.IO;
using System.Web.Services;
using System.Text;
using System.Web.Script.Serialization;
using Xerox.EHROBR.WebModule.Forms;
using System.Xml;
using Xerox.EHROBR.WebModule.Interface.ESolutions;
using Xerox.EHROBR.WebModule.Common;
using System.Net;
using System.Net.Sockets;
using System.Configuration;
using System.Text.RegularExpressions;

public partial class ProfileWeb : System.Web.UI.Page
{
    internal const string salt = "joi561FDSA-G8GE8-859FsfDB984FHV";
    public static int IdEntidade { get; set; }
    public static int IdPlano { get; set; }
    public string TokenEleicao { get; set; }
    public static string Plataforma { get; set; }
    public static string EscondeSaldo { get; set; }
    public static int EmbraerChatDisplays { get; set; }
    public static int UltraBannerDisplays { get; set; }
    public static int UltraSplashDisplays { get; set; }

    private static System.Collections.Specialized.NameValueCollection appSettings = System.Web.Configuration.WebConfigurationManager.AppSettings;

    const string PROCESSO_ALTERACAO_DE_PARTICIPANTES = "PROCESSO_ALTERACAO_DE_PARTICIPANTES";

    // responsável por interceptar solicitações feitas ao servidor
    public override void ProcessRequest(HttpContext context)
    {
        // Verifica se solicitação contém holerite anexado.
        // Implementação foi necessária pois o webMethod não suporta base64 muito extenso;
        if (!string.IsNullOrEmpty(context.Request.Form["EmprestimoSimulacaoComHoleriteAnexado"]))
        {
            if (bool.Parse(context.Request.Form["EmprestimoSimulacaoComHoleriteAnexado"]))
            {
                string id = string.Empty;
                string _loanAmount = string.Empty;
                string _installmentQuantity = string.Empty;
                string _firstDueDate = string.Empty;
                string _participantId = string.Empty;
                string _beneficiaryID = string.Empty;
                string _valueType = string.Empty;
                string _planLoanID = string.Empty;
                string txtVlMargin = string.Empty;
                string txtSalary = string.Empty;
                string _amortizationType = string.Empty;
                string rdoAmortizationSac = string.Empty;
                string txtVlLoanBay = string.Empty;
                string txtVlInsBay = string.Empty;
                string _credit = string.Empty;
                string strChkLoanActive = string.Empty;
                string isSimulation = string.Empty;
                string _bank = string.Empty;
                string _agency = string.Empty;
                string _account = string.Empty;
                string _ip = string.Empty;
                bool suspenderEmprestimo = false;
                string holerite = string.Empty;
                foreach (var keyitem in context.Request.Form.AllKeys)
                {
                    string nomeCampo = keyitem;
                    string valorCampo = context.Request.Form[keyitem];
                    switch (nomeCampo)
                    {
                        case "id":
                            id = valorCampo.Trim() != "null" ? valorCampo.Trim() : null;
                            break;
                        case "_loanAmount":
                            _loanAmount = valorCampo.Trim() != "null" ? valorCampo.Trim() : null;
                            break;
                        case "_installmentQuantity":
                            _installmentQuantity = valorCampo.Trim() != "null" ? valorCampo.Trim() : null;
                            break;
                        case "_firstDueDate":
                            _firstDueDate = valorCampo.Trim() != "null" ? valorCampo.Trim() : null;
                            break;
                        case "_participantId":
                            _participantId = valorCampo.Trim() != "null" ? valorCampo.Trim() : null;
                            break;
                        case "_beneficiaryID":
                            _beneficiaryID = valorCampo.Trim() != "null" ? valorCampo.Trim() : null;
                            break;
                        case "_valueType":
                            _valueType = valorCampo.Trim() != "null" ? valorCampo.Trim() : null;
                            break;
                        case "_planLoanID":
                            _planLoanID = valorCampo.Trim() != "null" ? valorCampo.Trim() : null;
                            break;
                        case "txtVlMargin":
                            txtVlMargin = valorCampo.Trim() != "null" ? valorCampo.Trim() : null;
                            break;
                        case "txtSalary":
                            txtSalary = valorCampo.Trim() != "null" ? valorCampo.Trim() : null;
                            break;
                        case "_amortizationType":
                            _amortizationType = valorCampo.Trim() != "null" ? valorCampo.Trim() : null;
                            break;
                        case "rdoAmortizationSac":
                            rdoAmortizationSac = valorCampo.Trim() != "null" ? valorCampo.Trim() : null;
                            break;
                        case "txtVlLoanBay":
                            txtVlLoanBay = valorCampo.Trim() != "null" ? valorCampo.Trim() : null;
                            break;
                        case "txtVlInsBay":
                            txtVlInsBay = valorCampo.Trim() != "null" ? valorCampo.Trim() : null;
                            break;
                        case "_credit":
                            _credit = valorCampo.Trim() != "null" ? valorCampo.Trim() : null;
                            break;
                        case "strChkLoanActive":
                            strChkLoanActive = valorCampo.Trim() != "null" ? valorCampo.Trim() : null;
                            break;
                        case "isSimulation":
                            isSimulation = valorCampo.Trim() != "null" ? valorCampo.Trim() : null;
                            break;
                        case "_bank":
                            _bank = valorCampo.Trim() != "null" ? valorCampo.Trim() : null;
                            break;
                        case "_agency":
                            _agency = valorCampo.Trim() != "null" ? valorCampo.Trim() : null;
                            break;
                        case "_account":
                            _account = valorCampo.Trim() != "null" ? valorCampo.Trim() : null;
                            break;
                        case "_ip":
                            _ip = valorCampo.Trim() != "null" ? valorCampo.Trim() : null;
                            break;
                        case "holerite":
                            holerite = valorCampo.Trim() != "null" ? valorCampo.Trim() : null;
                            break;
                    }
                }
                context.Response.Write(ProfileWeb.LoadEmprestimoSimulacao(id, _loanAmount, _installmentQuantity, _firstDueDate, _participantId, _beneficiaryID, _valueType, _planLoanID, txtVlMargin, txtSalary, _amortizationType, rdoAmortizationSac, txtVlLoanBay, txtVlInsBay, _credit, strChkLoanActive, isSimulation, _bank, _agency, _account, _ip, suspenderEmprestimo, holerite));
            }
        }
        else
            base.ProcessRequest(context);
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();
        DadosCadastraisParticipante p;

        //captura informação do web.config
        EmbraerChatDisplays = Convert.ToInt32(ConfigurationManager.AppSettings["EmbraerChatDisplays"]);
        UltraBannerDisplays = Convert.ToInt32(ConfigurationManager.AppSettings["UltraBannerDisplays"]);
        UltraSplashDisplays = Convert.ToInt32(ConfigurationManager.AppSettings["UltraSplashDisplays"]);

        if (!IsPostBack)
        {
            string idParticipante = string.Empty;

            try { idParticipante = Request["Id"].Replace(" ", "+"); }
            catch { }

            try
            {
                if (!String.IsNullOrEmpty(idParticipante))
                {

                    string decryptParticip = rijndae.DecryptRijndael(idParticipante, salt);

                    p = DadosCadastraisParticipante.List(Convert.ToInt32(decryptParticip))[0];

                    if (p != null)
                    {
                        IdEntidade = p.IdEntidade;
                        IdPlano = p.IdPlano;
                        //exibe o chatbot só para o cliente embraer.
                        if (IdEntidade == 57) dvChatBot.Visible = true; else dvChatBot.Visible = false;
                        if (IdEntidade == 10)
                        {
                            dvwhatsApp.Visible = true;
                        }
                        else
                        {
                            dvwhatsApp.Visible = false;
                        }
                        //if (IdEntidade == 61)
                        //{
                        //    try
                        //    {
                        //        if (ListaFipecqEleicao == null)
                        //            CarregarLista(@"D:\EhroIN26\WebService\PROD\csv\ListFipecq.csv");
                        //        //CarregarLista(@"C:\Users\alex.santana\Source\Repos\ESP\EHRO\WebService\csv\ListFipecq.csv");

                        //        TokenEleicao = GetFipecqEleicao(p.Cpf).CodigoSenha;
                        //    }
                        //    catch { }
                        //}
                        Participante op = new Participante(p.IdParticipante);
                        if (op.Situacao == "09")
                        {
                            string s = LoadMsgCustomizadas("EscondeSaldo", IdEntidade, "Permissao");
                            EscondeSaldo = string.IsNullOrEmpty(s) ? "N" : "S";
                        }
                        else EscondeSaldo = "N";


                        string device = Request.UserAgent.ToString().ToLower();

                        /*configuro no web.config a palavra(s) chave(s) para o user agent detectar o sistema Android, 
                         *caso futuramente a palavra chave do use agent mude, mudamos na config ao invés de parar a aplicação
                         */
                        string[] arrUserAgentAndroid = GetAppSetting("ArrUserAgentAndroid").Split(new char[] { ';' }, StringSplitOptions.RemoveEmptyEntries);
                        string[] arrUserAgentIphone = GetAppSetting("ArrUserAgentIphone").Split(new char[] { ';' }, StringSplitOptions.RemoveEmptyEntries);
                        bool userAgentResult = false;
                        for (int i = 0; i < arrUserAgentAndroid.Length; i++)
                        {
                            if (device.Contains(arrUserAgentAndroid[i]))
                            {
                                Plataforma = "android";
                                userAgentResult = true;
                                break;
                            }
                        }
                        if (userAgentResult == false)
                            for (int i = 0; i < arrUserAgentIphone.Length; i++)
                            {
                                if (device.Contains(arrUserAgentIphone[i]))
                                {
                                    Plataforma = "iphone";
                                    userAgentResult = true;
                                    break;
                                }
                            }

                        if (userAgentResult == false) Plataforma = "windows";


                    }
                }
            }
            catch { }
        }


    }


    /// <summary>
    /// Tela Inicial 
    /// </summary>
    /// <param name="id">Id do Participante</param>
    /// <returns></returns>
    [WebMethod]
    public static object LoadHome(string id)
    {
        SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();
        //DadosCadastraisParticipante p;
        //Participante oParticip = new Participante();

        string msgContent = "";
        string msgTitulo = "";
        string Notvalue = "-";
        StringBuilder sb = new StringBuilder();
        sb.Append("<div class='col-xs-12'>Rentabilidade do Plano</div><div class='col-xs-12 center'><div class='alert alert-info' >{0}</div></div>");//Rentablidade
        sb.Append("<div class='col-xs-12'>Impacto em seu patrimônio</div><div class='col-xs-12 center'><div class='alert alert-info' >{1}</div></div>");//Valor rentabilidade saldo
        sb.Append("<div class='col-xs-12'>Contribuição Suplementar</div><div class='col-xs-12 center'><div class='alert alert-info' >{2}</div></div>");//Percentual Contribuição Suplementar
        sb.Append("<div class='col-xs-12'>Contribuição Adicional</div><div class='col-xs-12 center'><div class='alert alert-info' >{3}</div></div>");//Percentual Contribuição Adicionale
        sb.Append("<div class='col-xs-12'>Contribuição realizada pelo Participante</div><div class='col-xs-12 center'><div class='alert alert-info' >{4}</div></div>");//Contribuição realizada pelo participante
        sb.Append("<div class='col-xs-12'>Contribuição realizada pela Patrocinadora</div><div class='col-xs-12 center'><div class='alert alert-info' >{5}</div></div>");//Contribuição realizada pela patrocinadora
        sb.Append("<div class='col-xs-12'>Saldo de Conta atualizado</div><div class='col-xs-12 center'><div class='alert alert-info' >{6}</div></div>");//Saldo

        msgContent = sb.ToString();


        string idParticipante = id.Replace(" ", "+");
        try
        {
            if (!String.IsNullOrEmpty(idParticipante))
            {

                string decryptParticip = rijndae.DecryptRijndael(idParticipante, salt);

                try
                {

                    int idPartic = Convert.ToInt32(decryptParticip);
                    decimal contribParticipante = 0M;
                    decimal contribPartrocinadora = 0M;
                    decimal saldo = 0M;
                    decimal saldoAnt = 0M;
                    string anomesIni = string.Empty;
                    string anomesFim = string.Empty;

                    int contaSuplementar_01 = 1207;
                    int contaAdicional_01 = 1204;
                    int contaSuplementar_03 = 1407;
                    int contaAdicional_03 = 1404;

                    string percentualPraticadoAdicional = "0%";
                    string percentualPraticadoSuplementar = "0%";

                    Participante p = new Participante(idPartic);


                    ParticipanteExtratoData dataMovto = ParticipanteExtratoData.GetDataMovto(idPartic);
                    Collection<ParticipanteRentabilidade> oResumoRentab = ParticipanteRentabilidade.List(idPartic);

                    DateTime dtFim = Convert.ToDateTime(dataMovto.MaxAnoMes.Insert(4, "/") + "/01");
                    DateTime dtIni = Convert.ToDateTime(dataMovto.MaxAnoMes.Insert(4, "/") + "/01");
                    dtFim = dtFim.AddMonths(1).AddDays(-1);

                    DateTime dtAnterior = dtIni.AddMonths(-1);
                    anomesIni = dtAnterior.ToString("yyyy") + "" + dtAnterior.ToString("MM");
                    anomesFim = anomesIni;

                    Collection<ParticipanteExtratoMovto> oExtrato = ParticipanteExtratoMovto.List(idPartic, dtIni, dtFim);

                    Collection<ParticipanteSaldoPorConta> saldoConta = ParticipanteSaldoPorConta.List(idPartic);
                    Collection<ParticipanteSaldoHistorico> saldoAnterior = ParticipanteSaldoHistorico.ListHistorico(idPartic, anomesIni, anomesFim);


                    saldo = saldoConta.Sum(x => x.SaldoMoeda);
                    saldoAnt = saldoAnterior.Sum(x => x.SaldoMoeda);

                    contribParticipante = oExtrato.Where(x => x.NomeConta.ToLower().Contains("participante") || x.NomeConta.ToUpper().Contains("AUTOPATROCINIO")).Sum(s => s.ValorMoeda);
                    contribPartrocinadora = oExtrato.Where(x => x.NomeConta.ToLower().Contains("patrocinadora") || x.NomeConta.ToUpper().Contains("AUTOPATROCINIO")).Sum(s => s.ValorMoeda);

                    foreach (PercentualSalario _getContrib in PercentualSalario.ListUltimoAnomes(idPartic, p.IdProduto))
                    {
                        if ((_getContrib.IdConta.Equals(contaSuplementar_01) || _getContrib.IdConta.Equals(contaSuplementar_03)) && _getContrib.IdFaixaPercent.Equals(1))
                        {
                            percentualPraticadoSuplementar = _getContrib.PercSalario.ToString("0.#") + "%";
                        }
                        else if ((_getContrib.IdConta.Equals(contaAdicional_01) || _getContrib.IdConta.Equals(contaAdicional_03)) && _getContrib.IdFaixaPercent.Equals(1))
                        {
                            percentualPraticadoAdicional = _getContrib.PercSalario.ToString("0.#") + "%";
                        }
                    }

                    msgTitulo = "Período: " + saldoConta[0].Data_Base;
                    msgContent = String.Format(msgContent, oResumoRentab[0].VariaPerfil_fmt + "%", (saldoAnt * oResumoRentab[0].VariaPerfil).ToString("C"), percentualPraticadoSuplementar, percentualPraticadoAdicional, contribParticipante.ToString("C"), contribPartrocinadora.ToString("C"), saldo.ToString("C"));



                    var result = new { Titulo = msgTitulo, HtmlContent = msgContent };

                    #region SaveLog

                    LogAcessoPortal log = new LogAcessoPortal() { IdProduto = p.IdProduto, IdPlano = p.IdPlano, IdSessao = Plataforma, UserName = p.Users_.UserName, DescAcesso = "Mobile - Home" };
                    LogAcessoPortal.Save(log);
                    #endregion

                    return result;

                }
                catch (Exception ex)
                {

                    msgTitulo = "Não foi possível carregar as informações!";
                    var result = new { Titulo = msgTitulo, HtmlContent = String.Format(msgContent, Notvalue, Notvalue, Notvalue, Notvalue, Notvalue, Notvalue, Notvalue) };
                    return result;
                }



            }
            var obj = new { Titulo = msgTitulo, HtmlContent = msgContent };
            return obj;

        }
        catch (Exception ex)
        {
            msgTitulo = "Não foi possível carregar as informações!";
            var result = new { Titulo = msgTitulo, HtmlContent = String.Format(msgContent, Notvalue, Notvalue, Notvalue, Notvalue, Notvalue, Notvalue, Notvalue) };
            return result;
        }
    }


    /// <summary>
    /// Imagem de Perfil do Participante
    /// </summary>
    /// <param name="id">Id do Participante Criptografado</param>
    /// <returns>O UserName do Participante Criptografado</returns>
    [WebMethod]
    public static string LoadImagemPerfil(string id)
    {
        SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();

        string idParticipante = id.Replace(" ", "+");
        try
        {
            if (!String.IsNullOrEmpty(idParticipante))
            {

                string decryptParticip = rijndae.DecryptRijndael(idParticipante, salt);

                try
                {
                    Collection<Xerox.EHROBR.WebModule.IN26.Imagem> imgList = Xerox.EHROBR.WebModule.IN26.Imagem.List(Convert.ToInt32(decryptParticip), 1);
                    string imgPerfil = "default.png";
                    if (imgList.Count > 0)
                    {
                        imgPerfil = imgList[0].NomeImagem;
                    }

                    return imgPerfil;
                }
                catch
                {
                    throw;
                }
            }

            return "default.png";
        }
        catch
        {
            return "default.png";
        }


    }

    [WebMethod]
    public static Dictionary<string, string> LoadInfo(string id)
    {
        SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();
        DadosCadastraisParticipante p;
        Participante oParticip = new Participante();
        Dictionary<string, string> result = new Dictionary<string, string>();

        string idParticipante = id.Replace(" ", "+");
        try
        {
            if (!String.IsNullOrEmpty(idParticipante))
            {

                string decryptParticip = rijndae.DecryptRijndael(idParticipante, salt);

                p = DadosCadastraisParticipante.List(Convert.ToInt32(decryptParticip))[0];

                if (p != null)
                {


                    IdEntidade = p.IdEntidade;
                    oParticip = new Participante(p.IdParticipante);
                    Banco bco = Banco.GetBanco(p.CodigoBanco);
                    result.Add("Nome", p.Nome);
                    result.Add("Cpf", p.Cpf.ToString());
                    result.Add("Plano", oParticip.NomePlano);
                    result.Add("Patroci", oParticip.NomePatrocina);
                    result.Add("Regime", (oParticip.Opcao == "N" ? "Progressivo" : oParticip.Opcao == "S" ? "Regressivo" : ""));
                    result.Add("Situacao", oParticip.NomeSituacao + " - " + oParticip.NomeMotivo);
                    result.Add("DtAdmissao", (p.Admissao.ToString("dd/MM/yyyy") == "01/01/0001" ? "" : p.Admissao.ToString("dd/MM/yyyy")));
                    result.Add("DtAdesao", (p.AdesaoPlano.ToString("dd/MM/yyyy") == "01/01/0001" ? "" : p.AdesaoPlano.ToString("dd/MM/yyyy")));
                    result.Add("Endereco", p.Rua + ", " + p.Cidade + ", " + p.Estado + " - " + p.Cep);
                    result.Add("EndEletronico", p.EnderecoEletronico);
                    result.Add("EndEletronicoCom", p.EnderecoEletronicoComl);
                    result.Add("Fone", p.Telefone);
                    result.Add("FoneCom", p.TelefoneComercial);
                    result.Add("Cel", p.TelefoneCelular);

                    string msgCadastroAlert = LoadMsgCustomizadas("MsgCadastro", p.IdEntidade, "Cadastro");
                    result.Add("MsgCadastroAlert", msgCadastroAlert);
                    string msgFaleConoscoAlert = LoadMsgCustomizadas("MsgFaleConosco", p.IdEntidade, "FaleConosco");
                    result.Add("MsgFaleConoscoAlert", msgFaleConoscoAlert);

                    //Perfil Participante 
                    string perfilParticipante = "";
                    var saldoConta = ParticipanteSaldoPorConta.List(oParticip.IdParticipante);
                    if (saldoConta.Count > 0)
                        perfilParticipante = saldoConta[0].NomePerfil;

                    result.Add("PerfilParticipante", perfilParticipante);


                    //Participante com mais de uma situação
                    var pAcesso = ParticipanteSituacaoAcesso.List(oParticip.Users_.UserName);
                    string participAcessos = "";

                    if (pAcesso.Count > 1)
                    {

                        participAcessos += "Navegar como: <select id='cbSelecaoAcesso' class='form-control dropdown' style='margin-bottom: 10px;'>";
                        for (int i = 0; i < pAcesso.Count; i++)
                        {

                            participAcessos += "<option value='" + rijndae.EncryptRijndael(pAcesso[i].IdParticipante + "", salt) + "' " + (pAcesso[i].IdParticipante == oParticip.IdParticipante ? " selected" : "") + ">" + pAcesso[i].NomeSituacao + " - " + pAcesso[i].NomePlano + "</option>";
                        }
                        participAcessos += "</select>";

                    }
                    result.Add("Acessos", participAcessos);

                    //Dados Bancários
                    //result.Add("Banco",  ((bco != null) ? bco.NomeBanco : "") );
                    //result.Add("Agencia",  p.NumeroAgencia.ToString() + ((String.IsNullOrEmpty(p.DigitoAgencia)) ? "" : "-" + p.DigitoAgencia) );
                    //result.Add("Conta",  p.NumeroContaCorrente.ToString() + ((String.IsNullOrEmpty(p.DigitoContaCorrente)) ? "" : "-" + p.DigitoContaCorrente));

                    #region SaveLog

                    LogAcessoPortal log = new LogAcessoPortal() { IdProduto = p.IdEntidade, IdPlano = p.IdPlano, IdSessao = Plataforma, UserName = oParticip.Users_.UserName, DescAcesso = "Mobile - Cadastro" };
                    LogAcessoPortal.Save(log);
                    #endregion
                }

                return result;
            }
            else
            {
                return result;
            }
        }
        catch (Exception ex)
        {
            return result;
        }

    }
    /// <summary>
    /// Carrega dados cadastrais do Participante
    /// </summary>
    /// <param name="id">Id do Participante Criptografado</param>
    /// <returns>Objecto com os dados cadastrais do Participante</returns>
    [WebMethod]
    public static object LoadDadosCadastrais(string id)
    {
        SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();
        DadosCadastraisParticipante p = null;
        Participante oParticip = new Participante();
        object result = null;
        string idParticipante = id.Replace(" ", "+");
        try
        {
            if (!String.IsNullOrEmpty(idParticipante))
            {

                string decryptParticip = rijndae.DecryptRijndael(idParticipante, salt);

                p = DadosCadastraisParticipante.List(Convert.ToInt32(decryptParticip))[0];

                int anoDataEmissao = p.DataEmissao != null ? int.Parse(p.DataEmissao.ToString("yyyy")) : 0;



                var dadosCadastrais = new
                {
                    EstadoCivil = p.EstadoCivil,
                    DataEmissao = anoDataEmissao > 1900 ? p.DataEmissao.ToString("yyyy-MM-dd") : "",
                    Naturalidade = p.Naturalidade,
                    Nacionalidade = p.Nacionalidade,
                    NomeMae = p.NomeMae,
                    NomePai = p.NomePai,
                    PoliticamenteExposta = p.PoliticamenteExposta.ToUpper(),
                    PPEDtExposicao = p.DtExposicaoPolitica != null ? p.DtExposicaoPolitica.ToString("yyyy-MM-dd") : "",
                    PPECargo = p.CargoPoliticamenteExposta,
                    Pais = p.Pais.ToUpper(),
                    Rua = p.Rua,
                    Bairro = p.Bairro,
                    Cidade = p.Cidade,
                    Estado = p.Estado.ToUpper(),
                    Cep = p.Cep,
                    Telefone = p.Telefone,
                    TelefoneCelular = p.TelefoneCelular,
                    TelefoneComercial = p.TelefoneComercial,
                    EnderecoEletronico = p.EnderecoEletronico,
                    EnderecoEletronicoComl = p.EnderecoEletronicoComl
                };
                result = dadosCadastrais;
                #region SaveLog

                LogAcessoPortal log = new LogAcessoPortal() { IdProduto = p.IdEntidade, IdPlano = p.IdPlano, IdSessao = Plataforma, UserName = oParticip.Users_.UserName, DescAcesso = "Mobile - Cadastro" };
                LogAcessoPortal.Save(log);
                #endregion
                //}

                return result;
            }
            else
            {
                return result;
            }
        }
        catch (Exception ex)
        {
            return result;
        }

    }

    /// <summary>
    /// Atualizacao Cadastral 
    /// </summary>
    /// <param name="id">id do Participante Criptografado</param>
    /// <param name="estadoCivil"></param>
    /// <param name="documentoIdentidade"></param>
    /// <param name="orgaoEmissor"></param>
    /// <param name="dataEmissao"></param>
    /// <param name="naturalidade"></param>
    /// <param name="nacionalidade"></param>
    /// <param name="nomeMae"></param>
    /// <param name="nomePai"></param>
    /// <param name="ppe"></param>
    /// <param name="pais"></param>
    /// <param name="rua"></param>
    /// <param name="numero"></param>
    /// <param name="bairro"></param>
    /// <param name="cidade"></param>
    /// <param name="estado"></param>
    /// <param name="cep"></param>
    /// <param name="telefone"></param>
    /// <param name="telefoneComercial"></param>
    /// <param name="telefoneCelular"></param>
    /// <param name="enderecoEletronico"></param>
    /// <param name="enderecoEletronicoComl"></param>
    /// <returns>Mensagem de status da alteracao</returns>
    [WebMethod]
    public static string SendDadosCadastrais(
        string id,
        //string estadoCivil,
        //string documentoIdentidade,
        //string orgaoEmissor,
        //string dataEmissao,
        //string naturalidade,
        //string nacionalidade,
        //string nomeMae,
        //string nomePai,
        string ppe,
        string ppeDtExposicao,
        string ppeCargo,
        string pais,
        string rua,
        string numero,
        string bairro,
        string cidade,
        string estado,
        string cep,
        string telefone,
        string telefoneComercial,
        string telefoneCelular,
        string enderecoEletronico,
        string enderecoEletronicoComl
        )
    {
        SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();
        DadosCadastraisParticipante p = null;
        Participante oParticip = new Participante();
        string msgReturn = "";
        string idParticipante = id.Replace(" ", "+");
        StringBuilder sTags = new StringBuilder();
        string email = string.Empty;
        string copyRecipients = string.Empty;
        try
        {
            if (!String.IsNullOrEmpty(idParticipante))
            {
                string decryptParticip = rijndae.DecryptRijndael(idParticipante, salt);

                p = DadosCadastraisParticipante.List(Convert.ToInt32(decryptParticip))[0];
                Dictionary<string, string> preGravacao = new Dictionary<string, string>();


                var adesao = Adesao.List(p.IdParticipante)[0];

                p.MesAtual = ((adesao.DiaFechaFolha != null) && (!adesao.DiaFechaFolha.Equals(string.Empty))) ? adesao.DiaFechaFolha : "N";
                p.AnoMes = (p.MesAtual.Equals("S")) ? DateTime.Now.ToString("yyyyMM") : DateTime.Now.AddDays(-30).ToString("yyyyMM");

                //p.EstadoCivil = estadoCivil;
                //if (!orgaoEmissor.Equals(p.OrgaoEmissor.Trim())) { p.OrgaoEmissor = orgaoEmissor; preGravacao.Add("Orgao Emissor", orgaoEmissor); }
                //if(!string.IsNullOrEmpty(dataEmissao)) p.DataEmissao = Convert.ToDateTime(dataEmissao);
                //if (!naturalidade.Equals(p.Naturalidade.Trim())) { p.Naturalidade = naturalidade; preGravacao.Add("Naturalidade", naturalidade); }
                //if (!nacionalidade.Equals(p.Nacionalidade.Trim())) { p.Nacionalidade = nacionalidade; preGravacao.Add("Nacionalidade", nacionalidade); }
                //if (!nomeMae.Equals(p.NomeMae.Trim())) { p.NomeMae = nomeMae; preGravacao.Add("Nome da Mãe", nomeMae); }
                //if (!nomePai.Equals(p.NomePai.Trim())) { p.NomePai = nomePai; preGravacao.Add("Nome do Pai", nomePai); }
                if (!ppe.Equals(p.PoliticamenteExposta.ToUpper()))
                {
                    p.PoliticamenteExposta = ppe; preGravacao.Add("Pessoa Politicamente Exposta", ppe);
                }
                if (ppe.Equals("S"))
                {
                    if (!string.IsNullOrEmpty(ppeDtExposicao))
                    {
                        p.DtExposicaoPolitica = Convert.ToDateTime(ppeDtExposicao);
                        preGravacao.Add("Data da Exposição", ppeDtExposicao);
                    }
                    if (!ppeCargo.Equals(p.CargoPoliticamenteExposta.Trim()))
                    {
                        p.CargoPoliticamenteExposta = ppeCargo;
                        preGravacao.Add("Cargo ou Profissão (Politicamente exposto)", ppeCargo);
                    }
                }

                if (!string.IsNullOrEmpty(pais) && !pais.Equals(p.Pais.ToUpper()))
                {
                    p.Pais = pais; preGravacao.Add("Pais", pais);
                }
                if (!rua.Equals(p.Rua.Trim())) { p.Rua = !String.IsNullOrEmpty(numero) ? String.Concat(rua, " , ", numero) : rua; preGravacao.Add("Logradouro", p.Rua); }

                if (!bairro.Equals(p.Bairro.Trim())) { p.Bairro = bairro; preGravacao.Add("Bairro", bairro); }
                if (!cidade.Equals(p.Cidade.Trim())) { p.Cidade = cidade; preGravacao.Add("Cidade", cidade); }
                if (!string.IsNullOrEmpty(estado) && !estado.Equals(p.Estado.ToUpper())) { p.Estado = estado; preGravacao.Add("Estado", estado); }
                if (!cep.Equals(p.Cep.Trim())) { p.Cep = cep; preGravacao.Add("Cep", cep); }
                if (!telefone.Equals(p.Telefone.Trim())) { p.Telefone = telefone; preGravacao.Add("Telefone", telefone); }
                if (!telefoneCelular.Equals(p.TelefoneCelular.Trim())) { p.TelefoneCelular = telefoneCelular; preGravacao.Add("Telefone Celular", telefoneCelular); }
                if (!telefoneComercial.Equals(p.TelefoneComercial.Trim())) { p.TelefoneComercial = telefoneComercial; preGravacao.Add("Telefone Comercial", telefoneComercial); }
                if (!enderecoEletronico.Equals(p.EnderecoEletronico.Trim())) { p.EnderecoEletronico = enderecoEletronico; preGravacao.Add("Endereco Eletronico", enderecoEletronico); }
                if (!enderecoEletronicoComl.Equals(p.EnderecoEletronicoComl.Trim())) { p.EnderecoEletronicoComl = enderecoEletronicoComl; preGravacao.Add("Endereco Eletronico Comercial", enderecoEletronicoComl); }
                p.EmailResetSenha = !String.IsNullOrEmpty(p.EnderecoEletronicoComl) ? p.EnderecoEletronicoComl : p.EnderecoEletronico;
                p.SolicitanteAdmin = "N";
                p.Solicitante = String.Concat(p.IdEntidade.ToString("0000"), p.Cpf);
                p.ProcessoEmLote = "N";
                p.Processado = "N";

                if (preGravacao.Count > 0)
                {
                    p.Sequencia = Convert.ToInt32(p.Add());
                    //Protocolo 
                    ProtocoloGenerico _ProtocoloDeAlteracao = new ProtocoloGenerico();
                    HistoricoAtualizacaoGenerico _HistoricoGravacao = new HistoricoAtualizacaoGenerico();

                    _ProtocoloDeAlteracao.DtAtualizacao = DateTime.Now;
                    _ProtocoloDeAlteracao.FlgAtivo = "S";
                    _ProtocoloDeAlteracao.IdParticipante = p.IdParticipante;
                    _ProtocoloDeAlteracao.IdProduto = p.IdEntidade;
                    _ProtocoloDeAlteracao.IdPlano = p.IdPlano;
                    _ProtocoloDeAlteracao.NumProtocolo = "";
                    _ProtocoloDeAlteracao.UserName = String.Concat(p.IdEntidade.ToString("0000"), p.Cpf);
                    _ProtocoloDeAlteracao.Processo = PROCESSO_ALTERACAO_DE_PARTICIPANTES;
                    _ProtocoloDeAlteracao.IdProtocolo = Convert.ToInt32(_ProtocoloDeAlteracao.Add());

                    var protocolos = ProtocoloGenerico.ListProtocolos(p.IdEntidade, p.IdPlano, p.IdParticipante, PROCESSO_ALTERACAO_DE_PARTICIPANTES);
                    if (protocolos.Count > 0)
                    {


                        #region Grava o Histórico da Atualização

                        string sHTML = System.IO.File.ReadAllText(GetAppSetting("templateEmailAC"));
                        string sEmails = string.Empty;

                        sTags.Append("<table id=\"_tbFollows\" border=\"0\" style=\"border-color: #ffffff;\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">");
                        foreach (var _Campos in preGravacao)
                        {
                            _HistoricoGravacao.IdParticipante = _ProtocoloDeAlteracao.IdParticipante;
                            _HistoricoGravacao.IdProtocolo = _ProtocoloDeAlteracao.IdProtocolo;
                            _HistoricoGravacao.NmCampo = _Campos.Key;
                            _HistoricoGravacao.VlCampo = _Campos.Value;
                            _HistoricoGravacao.Add();

                            sTags.Append("                  <tr valign=middle>");
                            sTags.Append("                      <td align=left width=\"40%\"><span style=\"font-family: Verdana; font-size: 9px; font-weight: normal;\">" + _Campos.Key + "&nbsp;:</span></td>");
                            sTags.Append("                      <td align=left width=\"30%\"><span style=\"font-family: Verdana; font-size: 9px; font-weight: normal;\">" + _Campos.Value + "</span></td>");
                            sTags.Append("                  </tr>");
                        }
                        sTags.Append("</table>");
                        #endregion

                        #region Preenche as Lacunas do Texto
                        sHTML = string.Format(
                                              sHTML
                                            , String.Concat(_ProtocoloDeAlteracao.IdProduto, ".png")
                                            , p.Nome
                                            , DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss")
                                            , protocolos[0].NumProtocolo
                                            , sTags
                                            , DateTime.Now.ToString("yyyy")
                                            , _ProtocoloDeAlteracao.UserName
                                            );
                        #endregion

                        copyRecipients = GetAppSetting("mailCopyRecipient");
                        email = !String.IsNullOrEmpty(p.EnderecoEletronico) ? p.EnderecoEletronico : p.EnderecoEletronicoComl;
                        //Se for teste envia para email interno
                        bool test = Convert.ToBoolean(GetAppSetting("isTest"));
                        if (test)
                        {
                            email = GetAppSetting("emailTeste");
                        }

                        if (FaleConosco.SendMail(GetAppSetting("Profile"), email, copyRecipients, sHTML, " Atualização Cadastral - Mobile : Relatório de Dados Alterados", 0, ""))
                        {
                            //msgReturn = "<strong> /*<span class='glyphicon glyphicon-ok-sign' style='font-size:34px'></span>*/ </strong><br>Seus dados alterados e protocolo foram salvos e enviados para o e-mail: <strong>" + (!String.IsNullOrEmpty(p.EmailResetSenha) ? p.EmailResetSenha : "(Email não cadastrado)") + "</strong>.<br>Seu protocolo de alteração é : <strong>" + protocolos[0].NumProtocolo + "</strong>";
                            msgReturn = "<strong> /*<span class='glyphicon glyphicon-ok-sign'></span>*/ </strong>Seu protocolo de alteração é : <strong>" + protocolos[0].NumProtocolo + "</strong>";
                        }
                        else
                        {
                            msgReturn = "<strong> /*<span class='glyphicon glyphicon-ok-sign'></span>*/ </strong>Seu protocolo de alteração é : <strong>" + protocolos[0].NumProtocolo + "</strong>";
                        }

                    }
                }
                else
                {
                    msgReturn = "<strong> <span class='glyphicon glyphicon-info-sign' style='font-size:34px'></span> </strong><br> Nenhum dado foi alterado!";
                }
            }
            return msgReturn;
        }
        catch (Exception ex)
        {
            return msgReturn;
        }

    }

    /// <summary>
    /// Carrega o Demonstrativo de Pagamento do Assistido, este lista é retornada do ESolutions Backoffice
    /// </summary>
    /// <param name="id">Id do Participante Criptografado</param>
    /// <returns>Lista de Demonstrativo de Pagamento</returns>
    [WebMethod]
    public static List<PayrollDemonstrative> LoadDemonstrativo(string id)
    {
        SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();
        //DadosCadastraisParticipante p;
        Participante oParticip;
        List<PayrollDemonstrative> result = new List<PayrollDemonstrative>();
        DateTime reference = Convert.ToDateTime(DateTime.Now.Year + "-" + (DateTime.Now.Month - 1) + "-01");
        string idParticipante = id.Replace(" ", "+");
        try
        {
            if (!String.IsNullOrEmpty(idParticipante))
            {

                string decryptParticip = rijndae.DecryptRijndael(idParticipante, salt);

                oParticip = new Participante(Convert.ToInt32(decryptParticip));
                if (oParticip != null)
                {
                    Collection<PerfisDoParticipante> profilePartile = PerfisDoParticipante.List(oParticip.IdProduto, oParticip.IdPlano, oParticip.IdParticipante);
                    Collection<PayrollDemonstrative> listDemo = null;
                    Collection<PayrollParticipantFinalized> listPayroll = PayrollParticipantFinalized.List((short)oParticip.IdProdutoES, oParticip.IdParticipanteES, reference);
                    if (listPayroll.Count > 0)
                    {
                        listDemo = PayrollDemonstrative.List((short)oParticip.IdProdutoES, oParticip.IdParticipanteES, listPayroll[0].PayrollID + "-", reference);

                    }
                    else
                    {
                        listPayroll = PayrollParticipantFinalized.List((short)oParticip.IdProdutoES, oParticip.IdParticipanteES, reference.AddMonths(-1));
                        listDemo = PayrollDemonstrative.List((short)oParticip.IdProdutoES, oParticip.IdParticipanteES, listPayroll[0].PayrollID + "-", reference.AddMonths(-1));
                    }

                    string profile = profilePartile.Count > 0 ? profilePartile[0].DscQuota.Replace("QUOTA DO PERFIL ", "").Replace("PERFIL ", "").ToLower() : "";
                    for (int i = 0; i < listDemo.Count; i++)
                    {
                        listDemo[i].Profile = profile;
                    }

                    result = listDemo != null ? listDemo.ToList() : null;

                    #region SaveLog
                    LogAcessoPortal log = new LogAcessoPortal() { IdProduto = oParticip.IdProduto, IdPlano = oParticip.IdPlano, IdSessao = Plataforma, UserName = oParticip.Users_.UserName, DescAcesso = "Mobile - Demonstrativo" };
                    LogAcessoPortal.Save(log);

                    #endregion
                }
            }

            return result;
        }
        catch
        {
            return result;
        }


    }
    /// <summary>
    /// Carrega o Saldo do Participante
    /// </summary>
    /// <param name="id">Id do Participante Criptografado</param>
    /// <returns>Lista de Saldo do Participante</returns>
    [WebMethod]
    public static List<ParticipanteSaldoPorConta> LoadSaldo(string id)
    {
        SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();
        //DadosCadastraisParticipante p;
        //Participante oParticip = new Participante();
        List<ParticipanteSaldoPorConta> result = new List<ParticipanteSaldoPorConta>();

        string idParticipante = id.Replace(" ", "+");
        try
        {
            if (!String.IsNullOrEmpty(idParticipante))
            {

                string decryptParticip = rijndae.DecryptRijndael(idParticipante, salt);

                Collection<ParticipanteSaldo> saldos = ParticipanteSaldo.List(Convert.ToInt32(decryptParticip));
                Collection<ParticipanteSaldoPorConta> saldoConta = ParticipanteSaldoPorConta.List(Convert.ToInt32(decryptParticip));

                for (int i = 0; i < saldoConta.Count; i++)
                {
                    saldoConta[i].NomePerfil = saldoConta[i].NomePerfil.Replace("QUOTA DO PERFIL ", "");
                }
                if (saldoConta.Count == 0)
                {
                    ParticipanteSaldoPorConta sc = new ParticipanteSaldoPorConta()
                    {
                        Data_Base = "",
                        AnoMes = "",
                        NomeConta = "",
                        NomePerfil = "",
                        Responsavel = "",
                        SaldoMoeda = 0,
                        SaldoQuota = 0,
                        ValorQuota = 0
                    };
                    result.Add(sc);
                    return result;
                }


                result = saldoConta.ToList();

                #region SaveLog
                Participante oParticip = new Participante(Convert.ToInt32(decryptParticip));
                LogAcessoPortal log = new LogAcessoPortal() { IdProduto = oParticip.IdProduto, IdPlano = oParticip.IdPlano, IdSessao = Plataforma, UserName = oParticip.Users_.UserName, DescAcesso = "Mobile - Saldo" };
                LogAcessoPortal.Save(log);

                #endregion
            }

            return result;
        }
        catch
        {
            return result;
        }


    }
    /// <summary>
    /// Carrega o Extrato do Participante
    /// </summary>
    /// <param name="id">Id do Participante Criptografado</param>
    /// <returns>Lista com ultimos 12 meses do Extrato do Participante</returns>
    [WebMethod]
    public static List<ParticipanteExtratoMovto> LoadExtrato(string id)
    {
        SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();
        //DadosCadastraisParticipante p;
        //Participante oParticip = new Participante();
        List<ParticipanteExtratoMovto> result = new List<ParticipanteExtratoMovto>();

        string idParticipante = id.Replace(" ", "+");
        try
        {
            if (!String.IsNullOrEmpty(idParticipante))
            {

                string decryptParticip = rijndae.DecryptRijndael(idParticipante, salt);

                //Extrato
                try
                {
                    ParticipanteExtratoData dataMovto = ParticipanteExtratoData.GetDataMovto(Convert.ToInt32(decryptParticip));

                    DateTime dtFim = Convert.ToDateTime(dataMovto.MaxAnoMes.Insert(4, "/") + "/01");
                    dtFim = dtFim.AddMonths(1).AddDays(-1);
                    DateTime dtIni = dtFim.AddMonths(-11);
                    Collection<ParticipanteExtratoMovto> oExtrato = ParticipanteExtratoMovto.List(Convert.ToInt32(decryptParticip), dtIni, dtFim);
                    for (int i = 0; i < oExtrato.Count; i++)
                    {
                        oExtrato[i].NomePerfil = oExtrato[i].NomePerfil.Replace("QUOTA DO PERFIL ", "");
                        int mes = Convert.ToInt32(oExtrato[i].DataCompet.Substring(0, 2));
                        string mesfmt = "";
                        string ano = oExtrato[i].DataCompet.Substring(2);
                        switch (mes)
                        {
                            case 1: mesfmt = "Jan"; break;
                            case 2: mesfmt = "Fev"; break;
                            case 3: mesfmt = "Mar"; break;
                            case 4: mesfmt = "Abr"; break;
                            case 5: mesfmt = "Mai"; break;
                            case 6: mesfmt = "Jun"; break;
                            case 7: mesfmt = "Jul"; break;
                            case 8: mesfmt = "Ago"; break;
                            case 9: mesfmt = "Set"; break;
                            case 10: mesfmt = "Out"; break;
                            case 11: mesfmt = "Nov"; break;
                            case 12: mesfmt = "Dez"; break;
                            default:
                                break;
                        }

                        oExtrato[i].DataCompet = mesfmt + ano;
                    }

                    result = oExtrato.ToList();

                    #region SaveLog
                    Participante oParticip = new Participante(Convert.ToInt32(decryptParticip));
                    LogAcessoPortal log = new LogAcessoPortal() { IdProduto = oParticip.IdProduto, IdPlano = oParticip.IdPlano, IdSessao = Plataforma, UserName = oParticip.Users_.UserName, DescAcesso = "Mobile - Extrato" };
                    LogAcessoPortal.Save(log);

                    #endregion

                }
                catch { }
            }

            return result;
        }
        catch
        {
            return result;
        }


    }
    /// <summary>
    /// Carrega as Rentabilidades dos ultimos 12 meses do Participante
    /// </summary>
    /// <param name="id">Id do Participante Criptografado</param>
    /// <returns>Lista com as Rentabilidades dos ultimos 12 meses</returns>
    [WebMethod]
    public static List<ParticipanteRentabilidade> LoadRentab(string id)
    {
        SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();
        //DadosCadastraisParticipante p;
        //Participante oParticip = new Participante();
        List<ParticipanteRentabilidade> result = new List<ParticipanteRentabilidade>();

        string idParticipante = id.Replace(" ", "+");
        try
        {
            if (!String.IsNullOrEmpty(idParticipante))
            {
                string decryptParticip = rijndae.DecryptRijndael(idParticipante, salt);

                Collection<ParticipanteRentabilidade> oResumoRentab = ParticipanteRentabilidade.List(Convert.ToInt32(decryptParticip));
                //for (int i = 0; i < oResumoRentab.Count; i++)
                //{
                //    oResumoRentab[i].NomePerfil = oResumoRentab[i].NomePerfil.Replace("QUOTA DO PERFIL ", "");
                //}
                //TESTE
                string anomes = oResumoRentab.Count > 0 ? oResumoRentab[0].AnoMes : "";
                int qtdePerfil = 0;
                int anoAtual = anomes.Substring(0, 4) == (DateTime.Now.Year - 1).ToString() ? DateTime.Now.Year - 1 : DateTime.Now.Year;

                List<string> perfis = new List<string>();

                for (int i = 0; i < oResumoRentab.Count; i++)
                {
                    oResumoRentab[i].NomePerfil = oResumoRentab[i].NomePerfil.Replace("QUOTA DO PERFIL ", "");
                    if (oResumoRentab[i].AnoMes == anomes)
                    {
                        qtdePerfil += 1;
                        perfis.Add(oResumoRentab[i].NomePerfil);
                    }

                }
                decimal[] valores = new decimal[qtdePerfil];
                decimal[] valoresAno = new decimal[qtdePerfil];
                for (int i = 0; i < valores.Length; i++)
                {
                    valores[i] = 1.0M;
                    valoresAno[i] = 1.0M;
                }

                for (int i = 0; i < oResumoRentab.Count; i++)
                {
                    int index = perfis.IndexOf(oResumoRentab[i].NomePerfil);
                    int ano = Convert.ToInt32(oResumoRentab[i].AnoMes.Substring(0, 4));
                    valores[index] *= (1.0M + oResumoRentab[i].VariaPerfil);

                    if (ano == anoAtual)
                        valoresAno[index] *= (1.0M + oResumoRentab[i].VariaPerfil);


                }
                string finalAcumulado12meses = "";
                string finalAcumuladoAno = "";
                string finalAcumuladoGeral = "";


                Participante oParticip = new Participante(Convert.ToInt32(decryptParticip));
                //Dictionary<string,string> valoresFinal
                for (int i = 0; i < perfis.Count; i++)
                {
                    decimal valor12mesesFinal = ((valores[i] - 1.0M) * 100.0M);
                    decimal valorAnoFinal = ((valoresAno[i] - 1.0M) * 100.0M);

                    if (oParticip.IdProduto != 62)
                    {
                        finalAcumulado12meses += "<div class='col-xs-6' style='border-right: 1px dashed #fff'>" +
                    "<p><strong style='text-transform: capitalize;'>" + perfis[i].ToString() + "</strong></p>" +
                     //"<p style='font-size: 26px'>" + string.Format("{0:0.00}", valor12mesesFinal) + "%</p>" +
                     "<p><font size='4'>" + string.Format("{0:0.00}", valor12mesesFinal) + "</font><font size='2'> %</font></p>" +
                   "</div>";

                        finalAcumuladoAno += "<div class='col-xs-6' style='border-right: 1px dashed #fff'>" +
                       "<p><strong style='text-transform: capitalize;'>" + perfis[i].ToString() + "</strong></p>" +
                       "<p><font size='4'>" + string.Format("{0:0.00}", valorAnoFinal) + "</font><font size='2'> %</font></p>" +
                       "</div>";

                        finalAcumuladoGeral = "<div class='col-xs-6' style='border-right: 1px dashed #fff'>" +
                   "<p><strong style='text-transform: capitalize;'>Acumulada <span class='rentab-bold'>no Ano</span></strong></p>" +
                   "<p><font size='4'>" + string.Format("{0:0.00}", valorAnoFinal) + "</font><font size='2'> %</font></p>" +
                   "</div><div class='col-xs-6' style='border-right: 1px dashed #fff'>" +
                    "<p><strong style='text-transform: capitalize;'>Acumulada <span class='rentab-bold'>Últimos 12 Meses</span></strong></p>" +
                    "<p><font size='4'>" + string.Format("{0:0.00}", valor12mesesFinal) + "</font><font size='2'> %</font></p>" +
                    "</div>";
                    }
                    else
                    {
                        finalAcumulado12meses += "<li class='list-group-item li-rentab'" + ((i % 2 == 0) ? "style='background: #f0f0f0;'" : "") + "><div class='row div-border'><div class='col-xs-9'><strong style='text-transform: capitalize;text-align: left;font-size: 14px;'>" + perfis[i].ToLower() +
                            "</strong></div><div class='col-xs-3'> <span style='font-size: 24px;text-align: right'>" + string.Format("{0:0.00}", valor12mesesFinal) +
                            "%</span></div></div></li>";

                        finalAcumuladoAno += "<li class='list-group-item li-rentab' " + ((i % 2 == 0) ? "style='background: #f0f0f0;'" : "") + " ><div class='row div-border'><div class='col-xs-9'><strong style='text-transform: capitalize;text-align: left;font-size: 14px;'>" + perfis[i].ToLower() +
                            "</strong></div><div class='col-xs-3'> <span style='font-size: 24px;text-align: right'>" + string.Format("{0:0.00}", valorAnoFinal) +
                            "%</span></div></div></li>";
                    }


                }


                if (oParticip.IdProduto != 18)//Retirar quando generico, quotas prevmon estão vindo da tabela dbo.TBTMP_RentabilidadePrevmon
                    switch (qtdePerfil)
                    {
                        case 1:
                            finalAcumuladoAno = "<div class='col-xs-4'></div>" + finalAcumuladoAno;
                            finalAcumulado12meses = "<div class='col-xs-4'></div>" + finalAcumulado12meses; break;
                        case 2:
                            finalAcumuladoAno = finalAcumuladoAno.Replace("col-xs-4", "col-xs-6");
                            finalAcumulado12meses = finalAcumulado12meses.Replace("col-xs-4", "col-xs-6");
                            break;
                        case 4:
                            finalAcumuladoAno = finalAcumuladoAno.Replace("col-xs-4", "col-xs-6");
                            finalAcumulado12meses = finalAcumulado12meses.Replace("col-xs-4", "col-xs-6");
                            break;
                    }
                if (oParticip.IdProduto == 62)
                {
                    finalAcumulado12meses = "<ul class='list-group' style='clear:both;text-align:left;'>" + finalAcumulado12meses + "</ ul >";
                    finalAcumuladoAno = "<ul class='list-group' style='clear:both;text-align:left;'>" + finalAcumuladoAno + "</ ul >";
                }

                finalAcumuladoAno = "<div id='dvAcumuloano' class='col-xs-12' ><p style='font-size: 15px; font-weight: bold'>Rentabilidade Líquida Acumulada <span class='rentab-bold'>no Ano</span></p>" +
                                    "</div><div class='row' id='dvRentabAcumAno' style='text-align: center'>" + finalAcumuladoAno + "</div>";
                finalAcumulado12meses = "<div style='clear: both;' ><hr class='hrRentab' /></div><div id='dvAcumulo12'class='col-xs-12'><p style='font-size: 15px; font-weight: bold'>Rentabilidade Líquida Acumulada <span class='rentab-bold'>nos Últimos 12 Meses</span></p>" +
                    "</div><div class='row' id='dvRentabAcum12' style='text-align: center'>" + finalAcumulado12meses + "</div>";

                finalAcumuladoGeral = "<div class='col-xs-12'><p style='font-size: 15px'></span></p>" +
                                    "</div><div class='row' id='dvRentabAcumAno' style='text-align: center'>" + finalAcumuladoGeral + "</div>";

                if (oParticip.IdProduto == 18)//Retirar quando generico, quotas prevmon estão vindo da tabela dbo.TBTMP_RentabilidadePrevmon
                    oResumoRentab[0].HtmlValorAcumulado = finalAcumulado12meses.Replace("<hr class='hrRentab' />", "");
                else if (oParticip.IdProduto == 27)
                {
                    string ultimaCompotencia = string.Concat("<div class='col-xs-12 center'><strong>Última competência: <span>", anomes.Substring(4), "/", anomes.Substring(0, 4), "</span></strong></div>");
                    oResumoRentab[0].HtmlValorAcumulado = ultimaCompotencia + finalAcumuladoAno + finalAcumulado12meses.Replace("nos Últimos 12 Meses", "nos Últimos 36 Meses");
                }
                else if (oParticip.IdProduto == 33)
                {
                    oResumoRentab[0].HtmlValorAcumulado = finalAcumuladoGeral;
                }
                else
                    oResumoRentab[0].HtmlValorAcumulado = finalAcumuladoAno + finalAcumulado12meses;

                result = oResumoRentab.ToList();

                #region SaveLog

                LogAcessoPortal log = new LogAcessoPortal() { IdProduto = oParticip.IdProduto, IdPlano = oParticip.IdPlano, IdSessao = Plataforma, UserName = oParticip.Users_.UserName, DescAcesso = "Mobile - Rentabilidade" };
                LogAcessoPortal.Save(log);

                #endregion


            }

            return result;
        }
        catch
        {
            return result;
        }


    }

    /// <summary>
    /// Carrega as Rentabilidades dos ultimos 12 meses do Participante
    /// </summary>
    /// <param name="id">Id do Participante Criptografado</param>
    /// <returns>Lista com as Rentabilidades dos ultimos 12 meses</returns>
    [WebMethod]
    public static List<EvolucaoRentabilidadeXIndices> LoadRentabEvolucao(string id, string quota)
    {
        SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();
        //DadosCadastraisParticipante p;
        //Participante oParticip = new Participante();
        List<EvolucaoRentabilidadeXIndices> result = new List<EvolucaoRentabilidadeXIndices>();

        string idParticipante = id.Replace(" ", "+");
        try
        {
            if (!String.IsNullOrEmpty(idParticipante))
            {
                string decryptParticip = rijndae.DecryptRijndael(idParticipante, salt);
                DateTime dtnow = DateTime.Now;
                string dtIni = String.Format("{0:0000}{1:00}01", (dtnow.Year - 1), dtnow.Month);
                string dtFim = String.Format("{0:0000}{1:00}01", dtnow.Year, dtnow.AddMonths(-1).Month);


                Collection<EvolucaoRentabilidadeXIndices> oResumoRentab = EvolucaoRentabilidadeXIndices.List(Convert.ToInt32(quota), dtIni, dtFim, 0);
                oResumoRentab.Reverse();
                string dtIniAcumulado = String.Format("{0:0000}{1:00}01", oResumoRentab[0].DataPerfil.Year, 2);
                string dtIniAcumulado0 = String.Format("{0:0000}{1:00}01", oResumoRentab[0].DataPerfil.Year, 1);
                var oResumoRentabAcumulado = EvolucaoRentabilidadeXIndices.List(Convert.ToInt32(quota), dtIniAcumulado, dtFim, 0);
                var oResumoRentabAcumulado0 = EvolucaoRentabilidadeXIndices.List(Convert.ToInt32(quota), dtIniAcumulado0, dtFim, 0);

                string anomes = oResumoRentab.Count > 0 ? oResumoRentab[0].AnoMes : "";

                int anoAtual = DateTime.Now.Year;

                for (int i = 0; i < oResumoRentab.Count; i++)
                {
                    oResumoRentab[i].NomePerfil = oResumoRentab[i].NomePerfil.Replace("QUOTA DO PERFIL ", "");
                }



                StringBuilder sbH = new StringBuilder();
                string textPlano = "";
                string textMeta = "";
                if (quota == "852")//FIPECq
                {
                    textPlano = "FIPECqPREV";
                    textMeta = "Meta de Rentabilidade (FIPECqPREV)";

                }
                else if (quota == "857")
                {
                    textPlano = "PPC";
                    textMeta = "Meta Atuarial (PPC)";
                }

                var resumo = oResumoRentab[0];
                decimal inpcMais5 = Convert.ToDecimal(resumo.VariaIndice0) + (Convert.ToDecimal(resumo.VariaIndice0) * 0.05M);
                string ano = anomes.Substring(0, 4);
                int mes = Convert.ToInt32(resumo.AnoMes.Substring(4, 2));
                string mesExtenso = "";

                switch (mes)
                {
                    case 1: mesExtenso = "Jan/"; break;
                    case 2: mesExtenso = "Fev/"; break;
                    case 3: mesExtenso = "Mar/"; break;
                    case 4: mesExtenso = "Abr/"; break;
                    case 5: mesExtenso = "Mai/"; break;
                    case 6: mesExtenso = "Jun/"; break;
                    case 7: mesExtenso = "Jul/"; break;
                    case 8: mesExtenso = "Ago/"; break;
                    case 9: mesExtenso = "Set/"; break;
                    case 10: mesExtenso = "Out/"; break;
                    case 11: mesExtenso = "Nov/"; break;
                    case 12: mesExtenso = "Dez/"; break;

                }

                //Valor inpc + 5 Janeiro
                decimal cincoPercMes = Convert.ToDecimal((Math.Pow((1 + 0.05), 1 / 12.0)) - 1) * 100;
                decimal inpc5 = 1 + ((Convert.ToDecimal(oResumoRentabAcumulado[0].VarPerIndice0) - Convert.ToDecimal(oResumoRentabAcumulado[0].VariaIndice0) + cincoPercMes) / 100);
                decimal inpc5Acumulado = inpc5;

                for (int i = 0; i < oResumoRentabAcumulado.Count; i++)
                {
                    inpc5 = 1 + ((Convert.ToDecimal(oResumoRentabAcumulado[i].VariaIndice0) + cincoPercMes) / 100);

                    //if (i == 0) inpc5Acumulado = inpc5;
                    //else 
                    inpc5Acumulado = inpc5 * inpc5Acumulado;
                }

                oResumoRentabAcumulado.Reverse();
                oResumoRentabAcumulado0.Reverse();

                sbH.Append("<section><style>.tbRentab,.tbRentab>thead>tr>td,.tbRentab>tbody>tr>td{text-align:center!important;}.tbRentab>thead>tr>td{font-weight:bold;}</style>");
                sbH.Append("<table class='tbRentab'><thead><tr><td></td><td>Rentab. <span>" + string.Concat(mesExtenso, ano) + " (%)</span></td><td>Rentab. Acumulada no ano (%)</td></tr></thead>");
                sbH.Append("<tbody><tr><td style='width: 25%;font-weight:bold'>" + textPlano + "</td><td style='width: 37%;'>" + resumo.VariaPerfil_fmt + "</td><td style='width: 37%;'>" + (oResumoRentabAcumulado0.Count > 0 ? oResumoRentabAcumulado0[0].VarPerPerfil : resumo.VariaPerfil_fmt) + "</td></tr></tbody></table>");
                sbH.Append("</section></div><hr><section><table class='tbRentab'><thead><tr><td></td><td>" + string.Concat(mesExtenso, ano) + " (%)</td><td>Acumulado no ano (%)</td></tr></thead>");
                sbH.Append("<tbody><tr><td style='font-weight:bold'>" + textMeta + "</td><td>" + string.Format("{0:0.00}", (inpc5 - 1) * 100) + "</td><td>" + string.Format("{0:0.00}", (inpc5Acumulado - 1) * 100) + "</td></tr>");
                //sbH.Append("<tr><td>INPC/IBGE</td><td>" + resumo.VariaIndice0 + "</td><td>" + string.Format("{0:0.00}", indice0) + "</td></tr>");
                sbH.Append("<tr><td>INPC/IBGE</td><td>" + resumo.VariaIndice0 + "</td><td>" + (oResumoRentabAcumulado.Count > 0 ? oResumoRentabAcumulado[0].VarPerIndice0 : resumo.VariaIndice0) + "</td></tr>");

                sbH.Append("<tr><td>CDI</td><td>" + resumo.VariaIndice3 + "</td><td>" + (oResumoRentabAcumulado.Count > 0 ? oResumoRentabAcumulado[0].VarPerIndice3 : resumo.VariaIndice3) + "</td></tr>");
                sbH.Append("<tr><td>Poupança</td><td>" + resumo.VariaIndice4 + "</td><td>" + (oResumoRentabAcumulado.Count > 0 ? oResumoRentabAcumulado[0].VarPerIndice4 : resumo.VariaIndice4) + "</td></tr>");
                sbH.Append("<tr><td>Ibovespa</td><td>" + resumo.VariaIndice1 + "</td><td>" + (oResumoRentabAcumulado.Count > 0 ? oResumoRentabAcumulado[0].VarPerIndice1 : resumo.VariaIndice1) + "</td></tr></tbody></table>");
                sbH.Append("</section>");

                oResumoRentab[0].HtmlValorAcumulado = sbH.ToString();



                result = oResumoRentab.ToList();

                #region SaveLog
                Participante oParticip = new Participante(Convert.ToInt32(decryptParticip));
                LogAcessoPortal log = new LogAcessoPortal() { IdProduto = oParticip.IdProduto, IdPlano = oParticip.IdPlano, IdSessao = Plataforma, UserName = oParticip.Users_.UserName, DescAcesso = "Mobile - Rentabilidade" };
                LogAcessoPortal.Save(log);

                #endregion
            }

            return result;
        }
        catch
        {
            return result;
        }


    }
    /// <summary>
    /// Carrega as Rentabilidades dos ultimos 12 meses do Participante (Deprecated)
    /// </summary>
    /// <param name="id">Id do Participante Criptografado</param>
    /// <returns>Lista com as Rentabilidades dos ultimos 12 meses</returns>
    //[WebMethod]
    public static List<EvolucaoRentabilidadeXIndices> LoadRentabEvolucaoOLD(string id, string quota)
    {
        SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();
        //DadosCadastraisParticipante p;
        //Participante oParticip = new Participante();
        List<EvolucaoRentabilidadeXIndices> result = new List<EvolucaoRentabilidadeXIndices>();

        string idParticipante = id.Replace(" ", "+");
        try
        {
            if (!String.IsNullOrEmpty(idParticipante))
            {
                string decryptParticip = rijndae.DecryptRijndael(idParticipante, salt);
                DateTime dtnow = DateTime.Now;
                string dtIni = String.Format("{0:0000}{1:00}01", (dtnow.Year - 1), dtnow.Month);
                string dtFim = String.Format("{0:0000}{1:00}01", dtnow.Year, dtnow.AddMonths(-1).Month);

                Collection<EvolucaoRentabilidadeXIndices> oResumoRentab = EvolucaoRentabilidadeXIndices.List(Convert.ToInt32(quota), dtIni, dtFim, 0);
                oResumoRentab.Reverse();
                string anomes = oResumoRentab.Count > 0 ? oResumoRentab[0].AnoMes : "";
                int qtdePerfil = 0;
                int anoAtual = DateTime.Now.Year;
                decimal indice = 0;
                decimal indice0 = 0;
                decimal indiceInpc5 = 0;
                decimal indice1 = 0;
                decimal indice2 = 0;
                decimal indice3 = 0;
                decimal indice4 = 0;
                decimal indice5 = 0;
                decimal indice6 = 0;
                decimal indice7 = 0;
                decimal indice8 = 0;
                decimal indice9 = 0;

                List<string> perfis = new List<string>();

                for (int i = 0; i < oResumoRentab.Count; i++)
                {
                    oResumoRentab[i].NomePerfil = oResumoRentab[i].NomePerfil.Replace("QUOTA DO PERFIL ", "");

                    if (oResumoRentab[i].AnoMes.Substring(0, 4).Contains("" + anoAtual))
                    {
                        if (oResumoRentab[i].NomePerfil != null)
                            indice += Convert.ToDecimal(oResumoRentab[i].VariaPerfil_fmt);
                        if (oResumoRentab[i].NomeIndice0 != null)
                            indice0 += Convert.ToDecimal(oResumoRentab[i].VariaIndice0);
                        if (oResumoRentab[i].NomeIndice0 != null && oResumoRentab[0].NomeIndice0.Contains("INPC"))
                            indiceInpc5 += (Convert.ToDecimal(oResumoRentab[i].VariaIndice0) + (Convert.ToDecimal(oResumoRentab[i].VariaIndice0) * 0.05M));
                        if (oResumoRentab[i].NomeIndice1 != null)
                            indice1 += Convert.ToDecimal(oResumoRentab[i].VariaIndice1);
                        if (oResumoRentab[i].NomeIndice2 != null)
                            indice2 += Convert.ToDecimal(oResumoRentab[i].VariaIndice2);
                        if (oResumoRentab[i].NomeIndice3 != null)
                            indice3 += Convert.ToDecimal(oResumoRentab[i].VariaIndice3);
                        if (oResumoRentab[i].NomeIndice4 != null)
                            indice4 += Convert.ToDecimal(oResumoRentab[i].VariaIndice4);
                        if (oResumoRentab[i].NomeIndice5 != null)
                            indice5 += Convert.ToDecimal(oResumoRentab[i].VariaIndice5);
                        if (oResumoRentab[i].NomeIndice6 != null)
                            indice6 += Convert.ToDecimal(oResumoRentab[i].VariaIndice6);
                        if (oResumoRentab[i].NomeIndice7 != null)
                            indice7 += Convert.ToDecimal(oResumoRentab[i].VariaIndice7);
                        if (oResumoRentab[i].NomeIndice8 != null)
                            indice8 += Convert.ToDecimal(oResumoRentab[i].VariaIndice8);
                        if (oResumoRentab[i].NomeIndice9 != null)
                            indice9 += Convert.ToDecimal(oResumoRentab[i].VariaIndice9);

                    }
                }



                string finalAcumulado12meses = "";
                string finalAcumuladoAno = "";

                if (oResumoRentab[0].NomePerfil != null)
                {
                    finalAcumuladoAno += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                   "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomePerfil + "</strong></p>" +
                   "<p style='font-size: 26px'>" + string.Format("{0:0.00}", indice) + "</p>%" +
                   "</div>";

                    finalAcumulado12meses += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                   "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomePerfil + "</strong></p>" +
                   "<p style='font-size: 26px'>" + string.Format("{0:0.00}", oResumoRentab[0].VarPerPerfil) + "%</p>" +
                   "</div>";
                }
                if (oResumoRentab[0].NomeIndice0 != null)
                {
                    finalAcumuladoAno += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                   "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice0 + "</strong></p>" +
                   "<p style='font-size: 26px'>" + string.Format("{0:0.00}", indice0) + "%</p>" +
                   "</div>";

                    finalAcumulado12meses += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                       "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice0 + "</strong></p>" +
                       "<p style='font-size: 26px'>" + string.Format("{0:0.00}", oResumoRentab[0].VarPerIndice0) + "%</p>" +
                       "</div>";
                }
                if (oResumoRentab[0].NomeIndice0 != null && oResumoRentab[0].NomeIndice0.Contains("INPC"))
                {
                    finalAcumuladoAno += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                   "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice0 + " + 5</strong></p>" +
                   "<p style='font-size: 26px'>" + string.Format("{0:0.00}", indiceInpc5) + "%</p>" +
                   "</div>";

                    finalAcumulado12meses += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                           "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice0 + " + 5</strong></p>" +
                           "<p style='font-size: 26px'>" + string.Format("{0:0.00}", (Convert.ToDecimal(oResumoRentab[0].VarPerIndice0) + (Convert.ToDecimal(oResumoRentab[0].VarPerIndice0) * 0.05M))) + "%</p>" +
                           "</div>";
                }
                if (oResumoRentab[0].NomeIndice1 != null)
                {
                    finalAcumuladoAno += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                  "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice1 + "</strong></p>" +
                  "<p style='font-size: 26px'>" + string.Format("{0:0.00}", indice1) + "%</p>" +
                  "</div>";

                    finalAcumulado12meses += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                       "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice1 + "</strong></p>" +
                       "<p style='font-size: 26px'>" + string.Format("{0:0.00}", oResumoRentab[0].VarPerIndice1) + "%</p>" +
                       "</div>";
                }
                if (oResumoRentab[0].NomeIndice2 != null)
                {
                    finalAcumuladoAno += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                  "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice2 + "</strong></p>" +
                  "<p style='font-size: 26px'>" + string.Format("{0:0.00}", indice2) + "%</p>" +
                  "</div>";

                    finalAcumulado12meses += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                           "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice2 + "</strong></p>" +
                           "<p style='font-size: 26px'>" + string.Format("{0:0.00}", oResumoRentab[0].VarPerIndice2) + "%</p>" +
                           "</div>";
                }
                if (oResumoRentab[0].NomeIndice3 != null)
                {
                    finalAcumuladoAno += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                  "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice3 + "</strong></p>" +
                  "<p style='font-size: 26px'>" + string.Format("{0:0.00}", indice3) + "%</p>" +
                  "</div>";

                    finalAcumulado12meses += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                           "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice3 + "</strong></p>" +
                           "<p style='font-size: 26px'>" + string.Format("{0:0.00}", oResumoRentab[0].VarPerIndice3) + "%</p>" +
                           "</div>";
                }
                if (oResumoRentab[0].NomeIndice4 != null)
                {
                    finalAcumuladoAno += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                  "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice4 + "</strong></p>" +
                  "<p style='font-size: 26px'>" + string.Format("{0:0.00}", indice4) + "%</p>" +
                  "</div>";

                    finalAcumulado12meses += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                           "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice4 + "</strong></p>" +
                           "<p style='font-size: 26px'>" + string.Format("{0:0.00}", oResumoRentab[0].VarPerIndice4) + "%</p>" +
                           "</div>";
                }
                if (oResumoRentab[0].NomeIndice5 != null)
                {
                    finalAcumuladoAno += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                  "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice5 + "</strong></p>" +
                  "<p style='font-size: 26px'>" + string.Format("{0:0.00}", indice5) + "%</p>" +
                  "</div>";

                    finalAcumulado12meses += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                               "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice5 + "</strong></p>" +
                               "<p style='font-size: 26px'>" + string.Format("{0:0.00}", oResumoRentab[0].VarPerIndice5) + "%</p>" +
                               "</div>";
                }
                if (oResumoRentab[0].NomeIndice6 != null)
                {
                    finalAcumuladoAno += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                  "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice6 + "</strong></p>" +
                  "<p style='font-size: 26px'>" + string.Format("{0:0.00}", indice6) + "%</p>" +
                  "</div>";

                    finalAcumulado12meses += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                               "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice6 + "</strong></p>" +
                               "<p style='font-size: 26px'>" + string.Format("{0:0.00}", oResumoRentab[0].VarPerIndice6) + "%</p>" +
                               "</div>";
                }
                if (oResumoRentab[0].NomeIndice7 != null)
                {
                    finalAcumuladoAno += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                  "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice7 + "</strong></p>" +
                  "<p style='font-size: 26px'>" + string.Format("{0:0.00}", indice7) + "%</p>" +
                  "</div>";

                    finalAcumulado12meses += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                               "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice7 + "</strong></p>" +
                               "<p style='font-size: 26px'>" + string.Format("{0:0.00}", oResumoRentab[0].VarPerIndice7) + "%</p>" +
                               "</div>";
                }
                if (oResumoRentab[0].NomeIndice8 != null)
                {
                    finalAcumuladoAno += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                  "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice8 + "</strong></p>" +
                  "<p style='font-size: 26px'>" + string.Format("{0:0.00}", indice8) + "%</p>" +
                  "</div>";

                    finalAcumulado12meses += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                               "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice8 + "</strong></p>" +
                               "<p style='font-size: 26px'>" + string.Format("{0:0.00}", oResumoRentab[0].VarPerIndice8) + "%</p>" +
                               "</div>";
                }
                if (oResumoRentab[0].NomeIndice9 != null)
                {
                    finalAcumuladoAno += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                  "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice9 + "</strong></p>" +
                  "<p style='font-size: 26px'>" + string.Format("{0:0.00}", indice9) + "%</p>" +
                  "</div>";

                    finalAcumulado12meses += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                               "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice9 + "</strong></p>" +
                               "<p style='font-size: 26px'>" + string.Format("{0:0.00}", oResumoRentab[0].VarPerIndice9) + "%</p>" +
                               "</div>";
                }

                finalAcumuladoAno = "<div class='col-xs-12'><p style='font-size: 15px'>Rentabilidade Líquida Acumulada <span class='rentab-bold'>no Ano</span></p>" +
                                    "</div><div class='row' id='dvRentabAcumAno' style='text-align: center'>" + finalAcumuladoAno + "</div>";
                finalAcumulado12meses = "<div style='clear: both;'><hr class='hrRentab' /></div><div class='col-xs-12'><p style='font-size: 15px'>Rentabilidade Líquida Acumulada <span class='rentab-bold'>nos Últimos 12 Meses</span></p>" +
                    "<div class='row' id='dvRentabAcum12' style='text-align: center'>" + finalAcumulado12meses + "</div>";

                oResumoRentab[0].HtmlValorAcumulado = finalAcumuladoAno + finalAcumulado12meses;

                result = oResumoRentab.ToList();

                #region SaveLog
                Participante oParticip = new Participante(Convert.ToInt32(decryptParticip));
                LogAcessoPortal log = new LogAcessoPortal() { IdProduto = oParticip.IdProduto, IdPlano = oParticip.IdPlano, IdSessao = Plataforma, UserName = oParticip.Users_.UserName, DescAcesso = "Mobile - Rentabilidade" };
                LogAcessoPortal.Save(log);

                #endregion
            }

            return result;
        }
        catch
        {
            return result;
        }


    }
    [WebMethod]
    public static string LoadRentabAcumulada(string id)
    {
        SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();
        //DadosCadastraisParticipante p;
        //Participante oParticip = new Participante();
        string result = "";

        string idParticipante = id.Replace(" ", "+");
        try
        {
            if (!String.IsNullOrEmpty(idParticipante))
            {
                string decryptParticip = rijndae.DecryptRijndael(idParticipante, salt);

                Collection<ParticipanteRentabilidade> oResumoRentab = ParticipanteRentabilidade.List(Convert.ToInt32(decryptParticip));

                string anomes = oResumoRentab.Count > 0 ? oResumoRentab[0].AnoMes : "";
                int qtdePerfil = 0;
                int anoAtual = DateTime.Now.Year;

                List<string> perfis = new List<string>();

                for (int i = 0; i < oResumoRentab.Count; i++)
                {
                    oResumoRentab[i].NomePerfil = oResumoRentab[i].NomePerfil.Replace("QUOTA DO PERFIL ", "");
                    if (oResumoRentab[i].AnoMes == anomes)
                    {
                        qtdePerfil += 1;
                        perfis.Add(oResumoRentab[i].NomePerfil);
                    }
                    else
                    { break; }
                }
                decimal[] valores = new decimal[qtdePerfil];
                decimal[] valoresAno = new decimal[qtdePerfil];
                for (int i = 0; i < valores.Length; i++)
                {
                    valores[i] = 1.0M;
                    valoresAno[i] = 1.0M;
                }

                for (int i = 0; i < oResumoRentab.Count; i++)
                {
                    int index = perfis.IndexOf(oResumoRentab[i].NomePerfil);
                    int ano = Convert.ToInt32(oResumoRentab[i].AnoMes.Substring(0, 4));
                    valores[index] *= (1.0M + oResumoRentab[i].VariaPerfil);

                    if (ano == anoAtual)
                        valoresAno[index] *= (1.0M + oResumoRentab[i].VariaPerfil);


                }
                string finalAcumulado12meses = "";
                string finalAcumuladoAno = "";

                //Dictionary<string,string> valoresFinal
                for (int i = 0; i < perfis.Count; i++)
                {
                    decimal valor12mesesFinal = ((valores[i] - 1.0M) * 100.0M);
                    decimal valorAnoFinal = ((valoresAno[i] - 1.0M) * 100.0M);


                    finalAcumulado12meses += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                    "<p><strong style='text-transform: capitalize;'>" + perfis[i].ToLower() + "</strong></p>" +
                    "<p style='font-size: 26px'>" + string.Format("{0:0.00}", valor12mesesFinal) + "%</p>" +
                    "</div>";

                    finalAcumuladoAno += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                   "<p><strong style='text-transform: capitalize;'>" + perfis[i].ToLower() + "</strong></p>" +
                   "<p style='font-size: 26px'>" + string.Format("{0:0.00}", valorAnoFinal) + "%</p>" +
                   "</div>";
                }
                finalAcumuladoAno = "<div class='col-xs-12'><p style='font-size: 18px'>Rentabilidade Acumulada <span class='rentab-bold'>no Ano</span></p>" +
                                    "</div><div class='row' id='dvRentabAcumAno' style='text-align: center'>" + finalAcumuladoAno + "</div>";
                finalAcumulado12meses = "<div style='clear: both;'><hr class='hrRentab' /></div><div class='col-xs-12'><p style='font-size: 18px'>Rentabilidade Acumulada <span class='rentab-bold'>nos Últimos 12 Meses</span></p>" +
                    "<div class='row' id='dvRentabAcum12' style='text-align: center'>" + finalAcumulado12meses + "</div>";


                result = finalAcumuladoAno + finalAcumulado12meses;

                #region SaveLog
                Participante oParticip = new Participante(Convert.ToInt32(decryptParticip));
                LogAcessoPortal log = new LogAcessoPortal() { IdProduto = oParticip.IdProduto, IdPlano = oParticip.IdPlano, IdSessao = Plataforma, UserName = oParticip.Users_.UserName, DescAcesso = "Mobile - Rentabilidade" };
                LogAcessoPortal.Save(log);

                #endregion
            }

            return result;
        }
        catch
        {
            return result;
        }


    }
    /// <summary>
    /// 
    /// </summary>
    /// <param name="id">Id do Participante Criptografado</param>
    /// <param name="email">Email para contato</param>
    /// <param name="tel">Telefone para contato</param>
    /// <param name="msg">Mensagem do cliente</param>
    /// <returns>Retorna mensagem se o contato foi efetuado com sucesso ou nao</returns>
    [WebMethod]
    public static string SendFaleConosco(string id, string email, string tel, string msg, string assunto)
    {
        SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();
        DadosCadastraisParticipante p;
        Participante oParticip = new Participante();

        string idParticipante = id.Replace(" ", "+");
        string msgReturn = "Ocorreu um erro. Mensagem não enviada";
        try
        {
            if (!String.IsNullOrEmpty(idParticipante))
            {

                string decryptParticip = rijndae.DecryptRijndael(idParticipante, salt);

                p = DadosCadastraisParticipante.List(Convert.ToInt32(decryptParticip))[0];

                if (p != null)
                {
                    oParticip = new Participante(p.IdParticipante);
                    StringBuilder sb = new StringBuilder();

                    string subject = "Fale Conosco - Mobile - " + oParticip.NomePlano;
                    sb.Append("<strong>Email Enviado pelo Fale Conosco - Mobile - " + oParticip.NomePlano + " </strong><br>");
                    sb.Append("<span>Nome: <strong>" + p.Nome + "</strong></span><br>");
                    sb.Append("<span>CPF: <strong>" + p.Cpf + "</strong></span><br>");
                    sb.Append("<span>EMAIL: <strong>" + email + "</strong></span><br>");
                    sb.Append("<span>Fone: <strong>" + tel + "</strong></span><br>");
                    if (!String.IsNullOrEmpty(assunto)) { sb.Append("<span>Assuntoone: <strong>" + assunto + "</strong></span><br>"); }

                    sb.Append("<span>MSG: <strong>" + msg + "</strong></span><br>");

                    var result = FaleConosco.ListEmails(p.IdEntidade);
                    string copyRecipients = "";
                    string recipients = "";
                    for (int i = 0; i < result.Count; i++)
                    {
                        if (result[i].CampoEmail == "TO")
                        {
                            recipients += result[i].Email + ";";
                        }
                        else
                            if (result[i].CampoEmail == "BCC")
                        {
                            copyRecipients += result[i].Email + ";";
                        }
                    }
                    //recipients = "alex.santana2@conduent.com";
                    //copyRecipients = "";

                    //Se for teste envia para email interno
                    bool test = Convert.ToBoolean(GetAppSetting("isTest"));
                    if (test)
                    {
                        recipients = GetAppSetting("emailTeste");
                        copyRecipients = "";
                    }

                    if (FaleConosco.SendMail(GetAppSetting("Profile"), recipients, copyRecipients, sb.ToString(), subject, 0, ""))
                    {
                        if (FaleConosco.SaveMsgSend("", p.IdEntidade, p.IdParticipante, subject, sb.ToString(), "N", p.Nome, DateTime.Now, "L", email, p.Cpf))
                        {
                            msgReturn = "Mensagem Enviada com Sucesso.";
                        }
                        else
                        {
                            msgReturn = "Ocorreu um erro. Mensagem não enviada";
                        }
                    }
                    else
                    {
                        msgReturn = "Ocorreu um erro. Mensagem não enviada";
                    }


                    #region SaveLog
                    LogAcessoPortal log = new LogAcessoPortal() { IdProduto = oParticip.IdProduto, IdPlano = oParticip.IdPlano, IdSessao = Plataforma, UserName = oParticip.Users_.UserName, DescAcesso = "Mobile - Fale Conosco" };
                    LogAcessoPortal.Save(log);

                    #endregion
                }
            }
            return msgReturn;
        }
        catch
        {
            return msgReturn;
        }


    }
    /// <summary>
    /// Username do Participante Criptografado
    /// </summary>
    /// <param name="id">Id do Participante Criptografado</param>
    /// <returns>O UserName do Participante Criptografado</returns>
    [WebMethod]
    public static string PesqUserName(string id)
    {
        SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();
        Participante oParticip;
        //string userName = "";

        string idParticipante = id.Replace(" ", "+");
        try
        {
            if (!String.IsNullOrEmpty(idParticipante))
            {

                string decryptParticip = rijndae.DecryptRijndael(idParticipante, salt);
                oParticip = new Participante(Convert.ToInt32(decryptParticip));

                if (oParticip != null)
                {

                    #region SaveLog
                    LogAcessoPortal log = new LogAcessoPortal() { IdProduto = oParticip.IdProduto, IdPlano = oParticip.IdPlano, IdSessao = Plataforma, UserName = oParticip.Users_.UserName, DescAcesso = "Mobile - Simulador de Benefícios" };
                    LogAcessoPortal.Save(log);

                    #endregion

                    Byte[] array = System.Text.UTF8Encoding.UTF8.GetBytes(oParticip.Users_.UserName);
                    return Convert.ToBase64String(array);
                }
            }

            return "";
        }
        catch
        {
            return "";
        }


    }
    /// <summary>
    /// Lista o valor, o codigo de barra e a data de vencimento do boleto 
    /// </summary>
    /// <param name="id">Id do Participante Criptografado</param>
    /// <returns>Lista de Boletos</returns>
    [WebMethod]
    public static List<InfBoletoBase> LoadBoleto(string id)
    {
        SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();

        List<InfBoletoBase> result = new List<InfBoletoBase>();

        string idParticipante = id.Replace(" ", "+");
        try
        {
            if (!String.IsNullOrEmpty(idParticipante))
            {

                string decryptParticip = rijndae.DecryptRijndael(idParticipante, salt);

                var boleto = InfBoletoBase.List(Convert.ToInt32(decryptParticip));

                if (boleto.Count > 0)
                {
                    result = boleto.ToList();
                }
                else
                {

                }

                #region SaveLog
                Participante oParticip = new Participante(Convert.ToInt32(decryptParticip));
                LogAcessoPortal log = new LogAcessoPortal() { IdProduto = oParticip.IdProduto, IdPlano = oParticip.IdPlano, IdSessao = Plataforma, UserName = oParticip.Users_.UserName, DescAcesso = "Mobile - Boleto" };
                LogAcessoPortal.Save(log);

                #endregion

                return result;
            }
            else
            {
                return result;
            }
        }
        catch (Exception ex)
        {
            return result;
        }

    }
    /// <summary>
    /// Carrega a tela inicial de Emprestimo do Participante ou Grid de beneficiarios
    /// </summary>
    /// <param name="id">Id do Participante Criptografado</param>
    /// <returns>JSON de Tela inicial de emprestimo do participante ou Grid de beneficiarios</returns>
    [WebMethod]
    public static string LoadEmprestimo(string id)
    {
        SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();
        string result = "";
        StringBuilder sb = new StringBuilder();

        string idParticipante = id.Replace(" ", "+");
        try
        {
            if (!String.IsNullOrEmpty(idParticipante))
            {
                string decryptParticip = rijndae.DecryptRijndael(idParticipante, salt);

                var beneficiaryList = LoanParticipantBeneficiaryList.List(Convert.ToInt32(decryptParticip));
                if (beneficiaryList.Count > 0)
                {
                    result = LoadEmprestimoBeneficiario(beneficiaryList);
                }
                else
                {
                    result = LoadEmprestimoParticipant(id, rijndae.EncryptRijndael("0", salt));
                }
            }
            else
            {
                return "";
            }
        }
        catch
        {
            return "";
        }

        return result;

    }
    /// <summary>
    /// Carrega Grid de Beneficiarios
    /// </summary>
    /// <param name="beneficiaryList">lista de beneficiarios do participante</param>
    /// <returns>JSON de grid de Beneficiarios</returns>
    [WebMethod]
    public static string LoadEmprestimoBeneficiario(Collection<LoanParticipantBeneficiaryList> beneficiaryList)
    {
        SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();

        string result = "";
        StringBuilder sb = new StringBuilder();


        try
        {
            sb.Append("<div id='dvEmprestimoBeneficiario'>");

            sb.Append("<div class='panel-heading'>Escolha um beneficiário para simulação: </div>");
            sb.Append("<table class=\"table table-bordered\" style=\"border-collapse:collapse;\">");
            sb.Append("<thead style='font-weigth:bold'>");
            sb.Append("<tr>");
            sb.Append("<td style='width:35%'>CPF</td><td style='width:45%'>Beneficiário</td><td style='width:20%'>Percentual</td>");
            sb.Append("</tr>");
            sb.Append("</thead>");
            sb.Append("<tbody>");
            for (int i = 0; i < beneficiaryList.Count; i++)
            {
                sb.Append("<tr onclick=\"loadBeneficiario('hdnBeneficiaryID" + i + "')\" >");
                sb.Append("<td>" + beneficiaryList[i].CPF + "</td><td>" + beneficiaryList[i].Beneficiary + " <input type='hidden' id='hdnBeneficiaryID" + i + "'  value=" + (rijndae.EncryptRijndael(beneficiaryList[i].BeneficiaryID.ToString(), salt)) + " /></td><td>" + beneficiaryList[i].Percentage.ToString("0.00") + "</td>");
                sb.Append("</tr>");
            }
            sb.Append("</tbody>");
            sb.Append("</table>");
            sb.Append("</div>");

            result = sb.ToString();
        }
        catch
        {
            return "";
        }
        return result;
    }
    /// <summary>
    /// Carrega tela inicial de emprestimos do Participante
    /// </summary>
    /// <param name="beneficiaryList">Id do participante criptografado</param>
    /// <returns>JSON com tela inicial de emprestimo</returns>
    [WebMethod]
    public static string LoadEmprestimoParticipant(string id, string bID)
    {
        SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();
        Participante oParticip;
        int idProdutoMsg = 0;
        string result = "";
        StringBuilder sb = new StringBuilder();

        string idParticipante = id.Replace(" ", "+");
        bID = bID.Replace(" ", "+");

        try
        {
            if (!String.IsNullOrEmpty(idParticipante))
            {

                string decryptParticip = rijndae.DecryptRijndael(idParticipante, salt);
                string decryptBeneficiario = rijndae.DecryptRijndael(bID, salt);

                int? beneficiaryID = (decryptBeneficiario != "0" ? Convert.ToInt32(decryptBeneficiario) : (int?)null);
                oParticip = new Participante(Convert.ToInt32(decryptParticip));
                idProdutoMsg = oParticip.IdProduto;


                if (!PermitirEmprestimo(oParticip.IdProduto, oParticip.IdPlano, oParticip.CodPatrocinadora, oParticip.TipoParticipante))
                {
                    string conteudoAvisoPermissaoModuloEmprestimoNegado = "<div class='alert alert-warning' style='background-color: #faebcc!important;margin: 10px;' >Você não possui permissão para solicitar empréstimo.</div>";
                    return conteudoAvisoPermissaoModuloEmprestimoNegado;
                }




                var participLoan = LoanParticipant.List((oParticip.IdProdutoES > 0 ? (short)oParticip.IdProdutoES : (short?)null), null, null, null, null, oParticip.IdParticipante, null, null);

                Collection<LoanParticipantDetail> participantDetail = new Collection<LoanParticipantDetail>();

                Collection<LoanContractList> contractList = new Collection<LoanContractList>();
                if (participLoan.Count > 0)

                    participantDetail = LoanParticipantDetail.List(participLoan[0].ParticipantID, participLoan[0].LoanPlanID, participLoan[0].PrivateID, beneficiaryID);

                contractList = LoanContractList.List(null, null, null, null, participLoan[0].LoanPlanID, participLoan[0].ParticipantID, null, participLoan[0].PrivateID);



                if (participantDetail.Count > 0)
                {
                    Collection<DischargeSimulationList> dischargeSimulationResult = DischargeSimulationList.List(participantDetail[0].Credit != null ? participantDetail[0].Credit : (DateTime?)null, participLoan[0].ParticipantID, participLoan[0].PrivateID, beneficiaryID);
                    bool resultDischargeSimulation = true;
                    StringBuilder contracts = new StringBuilder();
                    StringBuilder header = new StringBuilder();
                    bool showValueTypeLiquid = true;

                    header.Append("<div id='dvEtapaIEmprestimoContent'>");
                    if (oParticip.IdProduto == 62)
                    {
                        header.Append("<div class='alert alert-warning' style='background-color: #faebcc!important;margin: 10px; color: #333' >Para realizar a simulação de empréstimo, é necessário ter o holerite em mãos.</div>");
                    }
                    if (participantDetail[0].Beneficiary != null)
                    {
                        header.Append("<a onclick=\"VoltarEmprestimoEtapaI('0')\"><span class='glyphicon glyphicon-chevron-left' ></span><p class='nmPartic' >" + participantDetail[0].Beneficiary + "</p></a>");
                        header.Append("<p class='nmPartic' >" + participantDetail[0].CPF.ToString(@"000\.000\.000\-00") + "</p>");
                    }
                    else
                    {
                        header.Append("<p class='nmPartic'> " + participantDetail[0].Participant + "</p>");
                        header.Append("<p class='nmPartic'>" + participantDetail[0].CPF.ToString(@"000\.000\.000\-00") + "</p>");
                    }

                    sb.Append(header.ToString());
                    if (contractList.Count > 0)
                    {
                        int contadorDivsAnexadas =0; 
                        bool resultContract = false;
                        contracts.Append("<div class='alert alert-contrato'>");
                        contracts.Append("<p style='margin:0;text-align:center;font-weight:bold'>Contratos</p>");
                        contracts.Append("<div class='row'>");
                        for (int i = 0; i < contractList.Count; i++)
                        {
                            var searchContract = LoanContractDetailByContractNumber.List(contractList[i].ContractID);


                            if ((!String.IsNullOrEmpty(participantDetail[0].Beneficiary) && searchContract[0].Participant == participantDetail[0].Beneficiary) || participantDetail[0].Beneficiary == null)
                            {
                                if (contadorDivsAnexadas == 3 && oParticip.IdProduto == 62)
                                    break;                                
                                contracts.Append("<div class='col-xs-12'>");
                                contracts.Append("<div class='btn-group' style='display:block; margin-top:5px'>");
                                contracts.Append("<a class='btn btn-success'  style='width:80%;text-align:left' onclick=\"preloadContratoEmprestimo(" + contractList[i].ContractID + " , '" + id + "')\">");
                                contracts.Append(contractList[i].ContractID + " - " + contractList[i].Status);
                                contracts.Append("</a>");
                                contracts.Append("<a type='button' class='btn btn-success' style='width:20%'  onclick=\"preloadContratoEmprestimo(" + contractList[i].ContractID + " , '" + id + "')\" >");
                                contracts.Append("<span class='glyphicon glyphicon-search'></span>");
                                contracts.Append("</a>");
                                contracts.Append("</div>");
                                contracts.Append("</div>");
                                resultContract = true;
                                contadorDivsAnexadas++;
                            }
                        }
                        contracts.Append("</div>");
                        contracts.Append("</div>");

                        if (resultContract)
                            sb.Append(contracts.ToString());
                    }

                    if (dischargeSimulationResult.Count > 0)
                    {


                        sb.Append("<div id='dvContratoAtivo'>");
                        sb.Append("<p>Empréstimos em Andamento</p>");
                        sb.Append("<table id='tbLoanActive' class=\"table table-bordered\" style=\"border-collapse:collapse;padding-bottom:10px\">");
                        sb.Append("<thead>");
                        sb.Append("<tr>");
                        sb.Append("<td>Quitar?</td>");
                        sb.Append("<td>Número Contrato</td>");
                        sb.Append("<td>Parcelas Restantes</td>");
                        sb.Append("<td>Saldo Quitação</td>");
                        sb.Append("<td>Saldo Pendência</td>");
                        //sb.Append("<td>Quitação Prevista</td>");
                        sb.Append("</tr>");
                        sb.Append("</thead>");
                        sb.Append("<tbody>");
                        for (int i = 0; i < dischargeSimulationResult.Count; i++)
                        {
                            bool chkLoanActiveChecked = false;
                            bool chkLoanActiveVisible = true;
                            bool chkLoanActiveEnabled = false;

                            if (dischargeSimulationResult[i].AllowDischarge.Trim() == "1")
                            {
                                chkLoanActiveChecked = true;
                                //img.Visible = false;
                            }
                            else
                            {
                                chkLoanActiveChecked = false;
                                chkLoanActiveVisible = false;
                                //img.Visible = true;
                                //img.ToolTip = Resources.EHROMessage.ResourceManager.GetString(e.Row.Cells[8].Text.Substring(5, 4));
                            }
                            if (dischargeSimulationResult[i].AllowConcurrentLoan == false)
                            {
                                chkLoanActiveEnabled = dischargeSimulationResult[i].AllowConcurrentLoan;
                                if (dischargeSimulationResult[i].AllowDischarge.Trim() == "1") chkLoanActiveChecked = true;  //somente ativo o check se o contrato permitir quitacao
                            }
                            else
                                chkLoanActiveEnabled = dischargeSimulationResult[i].AllowConcurrentLoan;


                            if (chkLoanActiveChecked && chkLoanActiveVisible)
                            {
                                showValueTypeLiquid = false;
                            }

                            sb.Append("<tr>");
                            sb.Append("<td><input type='checkbox' data-contract='" + dischargeSimulationResult[i].ContractNumber + "' data-visible='" + chkLoanActiveVisible + "'  data-existe='on' id='chkLoanActive" + i + "' " + (chkLoanActiveChecked == true ? "checked" : "") + " " + (chkLoanActiveEnabled == false ? " disabled" : "") + " style='display:" + (chkLoanActiveVisible == false ? "none" : "block") + "' />");//
                            sb.Append("<td>" + dischargeSimulationResult[i].ContractNumber + "</td>");
                            sb.Append("<td>" + dischargeSimulationResult[i].QuantityInstallmentUnpaid + "</td>");//Parcelas Restantes
                            sb.Append("<td>" + String.Format("{0:N}", dischargeSimulationResult[i].BalanceUnpaid) + "</td>");//Saldo Quitacao
                            sb.Append("<td>" + String.Format("{0:N}", dischargeSimulationResult[i].BalanceUnpaidOverDue) + "</td>");
                            //sb.Append("<td>" + (dischargeSimulationResult[i].DischargeDate != null ? ((DateTime)dischargeSimulationResult[i].DischargeDate).ToShortDateString(): "") + "</td>");

                            sb.Append("</tr>");
                        }

                        sb.Append("</table>");
                        sb.Append("</tbody>");
                        sb.Append("</div>");
                    }
                    if (dischargeSimulationResult.Count > 0 && dischargeSimulationResult[0].AllowDischarge.Trim() != "1" && dischargeSimulationResult[0].AllowConcurrentLoan == false)
                    {
                        resultDischargeSimulation = false;
                    }
                    else if (dischargeSimulationResult.Count > 0 && (dischargeSimulationResult[0].AllowDischarge.Trim() == "1" || dischargeSimulationResult[0].AllowConcurrentLoan == true))
                    {
                        resultDischargeSimulation = true;
                    }
                    if (participantDetail[0].IsElegible == false || resultDischargeSimulation == false)
                    {
                        /* Participante não é elegivel ao emprestimo
                         * Exibe uma mensagem para o Participante baseado no padrao de
                         * Mensagem do Esolutions Backoffice que está no arquivo EHROMessage.resx
                         */

                        StringBuilder resultMessages = new StringBuilder();

                        string[] errorMessages = participantDetail[0].RefusedElegibilityReason.Split(new char[] { '|' });
                        //resultMessages.Append("<h4> Você não está apto a um novo empréstimo.</H4>");

                        foreach (string msg in errorMessages)
                        {
                            //Traduz a mensagem e depois exibe para o participante
                            string idModulo = "EHRO-MESSAGE";
                            string erroMsg = LoadMsgCustomizadas(msg, oParticip.IdProduto, idModulo);
                            resultMessages.Append("<p> " + (!string.IsNullOrEmpty(erroMsg) ? erroMsg : "Erro não identificado, código: " + msg) + "</p>");

                        }

                        result = header.ToString();
                        result = result + contracts.ToString();
                        result = result + "<div class='aviso'>";
                        result = result + resultMessages.ToString();
                        result = result + "</div></div>";


                        return result;

                    }
                    else
                    {
                        string agencyID = string.Concat((participantDetail[0].AgencyID != null ? participantDetail[0].AgencyID.ToString() + " - " : ""), participantDetail[0].Agency);
                        string bankID = string.Concat((participantDetail[0].BankID != null ? participantDetail[0].BankID.ToString() + " - " : ""), participantDetail[0].Bank);

                        if (String.IsNullOrEmpty(agencyID) || String.IsNullOrEmpty(bankID) || String.IsNullOrEmpty(participantDetail[0].Account))
                        {
                            result = header.ToString();
                            result = result + "<div class='aviso'>";
                            result = result + "<p>As informações bancárias do participante não estão cadastradas corretamente.</p>";
                            result = result + "</div></div>";


                            return result;
                        }

                        sb.Append("<input type='hidden' id='hdnBeneficiaryID' value=" + rijndae.EncryptRijndael((beneficiaryID != null ? beneficiaryID : 0).ToString(), salt) + ">");
                        sb.Append("<input type='hidden' id='hdnLoanPlanID' value=" + rijndae.EncryptRijndael(participLoan[0].LoanPlanID.ToString(), salt) + ">");
                        sb.Append("<input type='hidden' id='hdnParticipantID' value=" + rijndae.EncryptRijndael(participLoan[0].ParticipantID.ToString(), salt) + ">");
                        sb.Append("<input type='hidden' id='hdnFirstInsDueDate' value=" + rijndae.EncryptRijndael(participantDetail[0].DateFirstInsDueDate.ToString(), salt) + ">");
                        sb.Append("<input type='hidden' id='hdnAmortizationType' value=" + participantDetail[0].AmortizationType.ToString() + ">");
                        sb.Append("<input type='hidden' id='hdnBank' value=" + rijndae.EncryptRijndael(bankID, salt) + ">");
                        sb.Append("<input type='hidden' id='hdnAgency' value=" + rijndae.EncryptRijndael(agencyID, salt) + ">");
                        sb.Append("<input type='hidden' id='hdnAccount' value=" + rijndae.EncryptRijndael(participantDetail[0].Account.ToString(), salt) + ">");

                        string credit = participantDetail[0].Credit == null ? "" : ((DateTime)participantDetail[0].Credit).ToString("dd/MM/yyyy");
                        sb.Append("<input type='hidden' id='hdnCredit' value=" + rijndae.EncryptRijndael(credit, salt) + ">");


                        sb.Append("<table class=\"table table-bordered\" style=\"border-collapse:collapse;\">");
                        sb.Append("<tbody>");

                        if (participantDetail[0].HasGracePeriodFirstInstallment == true)
                        {
                            sb.Append("<tr>");
                            sb.Append("<td  style=\"font-size:14px;width: 50%;\">Competência vencimento</td>");
                            sb.Append("<td  style=\"font-size:14px;\"><input type=\"text\" data-existe='on' maxlength=\"10\" id=\"txtFirstDueDate\"  class=\"form-control\" /></td>");
                            sb.Append("</tr>");
                        }
                        else
                        {

                            sb.Append("<tr>");
                            sb.Append("<td  style=\"font-size:14px;width: 50%;\">Competência vencimento</td>");
                            sb.Append("<td  style=\"font-size:14px;\"><input  type=\"text\" data-existe='on' maxlength=\"10\"  value=" + (participantDetail[0].DateFirstInsDueDate == null ? string.Empty : ((DateTime)participantDetail[0].DateFirstInsDueDate).ToString("MM/yyy")) + " id=\"txtFirstDueDate\"  class=\"form-control\" readonly=\"readonly\" /></td>");
                            sb.Append("</tr>");
                        }

                        if (participantDetail[0].HasMargin == true)
                        {
                            sb.Append("<tr>");
                            sb.Append("<td  style=\"font-size:14px;width: 50%;\">Informe o valor de sua margem consignável</td>");
                            sb.Append("<td  style=\"font-size:14px;\"><input type=\"text\" onkeyup='formataValor(this,event);' data-existe='on' maxlength=\"9\" id=\"txtVlMargin\"  class=\"form-control\" /></td>");
                            sb.Append("</tr>");
                        }

                        if (participantDetail[0].HasSalary == true && participantDetail[0].Status != "CONCEDIDO" && participantDetail[0].Status != "ASSISTIDO")
                        {
                            sb.Append("<tr>");
                            sb.Append("<td  style=\"font-size:14px;width: 50%;\">Salário Líquido</td>");
                            sb.Append("<td  style=\"font-size:14px;\"><input type=\"text\" data-existe='on' onkeyup='formataValor(this,event);' maxlength=\"9\" id=\"txtVlSalary\"  class=\"form-control\" /></td>");
                            sb.Append("</tr>");
                        }


                        if (participantDetail[0].AmortizationType == 3)
                        {
                            sb.Append("<tr id=\"trAmortizationType\">");
                            sb.Append("<td  style=\"font-size:14px;width: 50%;\">Tabela</td>");
                            sb.Append("<td  style=\"font-size:14px;\">");
                            sb.Append("<label for=\"rdoAmortizationSAC\" class=\"btn btn-default\"  style=\"font-size:10px;\">");
                            sb.Append("<input type=\"radio\" name=\"rdoAmortization\" data-existe='on' id=\"rdoAmortizationSAC\" checked> SAC");
                            sb.Append("</label>");

                            //Desabilita para Assistido                         
                            if (oParticip.Situacao != "09" || oParticip.IdProduto != 57)
                            {
                                sb.Append("<label for=\"rdoAmortizationPrice\" class=\"btn btn-default\"  style=\"font-size:10px;\">");
                                sb.Append("<input type=\"radio\" name=\"rdoAmortization\" data-existe='on' id=\"rdoAmortizationPrice\"> Price");
                                sb.Append("</label>");
                            }


                            sb.Append("</td>");
                            sb.Append("</tr>");
                        }

                        sb.Append("<tr id=\"trValueType\">");

                        sb.Append("<td colspan=\"2\" style=\"font-size:14px;width: 50%;\">");


                        sb.Append("<div class='row'>");
                        sb.Append("<div class='col-md-2 col-xs-2' style='padding-left: 0;'>");
                        //sb.Append("<span style=\"text-align:center;\">Valor</span><br />");
                        sb.Append("Valor<br />");
                        sb.Append("</div>");
                        sb.Append("<div class='col-md-5 col-xs-6'>");
                        sb.Append("<label for='rdoValueTypeTotal' class=\"btn btn-default \" style='font-size:10px' >");
                        sb.Append("<input type=\"radio\" name=\"rdoValueType\" id=\"rdoValueTypeTotal\" checked > Bruto");
                        sb.Append("</label>");
                        if (showValueTypeLiquid)
                        {
                            sb.Append("<label for='rdoValueTypeLiquid' class=\"btn btn-default\" style='font-size:10px' >");
                            sb.Append("<input type=\"radio\" name=\"rdoValueType\" id=\"rdoValueTypeLiquid\"  > Líquido ");
                            sb.Append("</label>");
                        }
                        sb.Append("</div>");
                        sb.Append("<div class='col-md-5 col-xs-4'>");
                        sb.Append("<input type=\"text\" maxlength=\"11\" data-existe='on' placeholder='R$' class=\"form-control\" onkeyup='formataValor(this,event);' id=\"txtCustomLoan\" />");
                        sb.Append("</div>");
                        sb.Append("</td>");
                        sb.Append("</tr>");
                        sb.Append("<tr>");
                        sb.Append("<td  style=\"font-size:14px;width: 50%;border:0\">Parcelas </td>");


                        sb.Append("<td  style=\"font-size:14px;border:0\"><select name=\"ddlCustomPayment\" id=\"ddlCustomPayment\" class=\"form-control dropdown\" style=\"width:90%\" ><option selected=\"selected\" value=\"0\">Selecionar</option>");
                        if (participLoan[0].LoanPlanID == 3 || participLoan[0].LoanPlanID == 4)
                        {
                            int count = 1;
                            for (int i = participantDetail[0].QuantityMinimumInstallment; i <= participantDetail[0].QuantityMaximumInstallment; i = count * participantDetail[0].QuantityInstallmentIncrease)
                            {
                                if (i != 30)
                                    sb.Append("<option value=" + i + " > " + i + "</option>");
                                count++;
                            }
                        }
                        else
                        {
                            for (int i = participantDetail[0].QuantityMinimumInstallment; i <= participantDetail[0].QuantityMaximumInstallment; i = i + participantDetail[0].QuantityInstallmentIncrease)
                            {
                                sb.Append("<option value=" + i + " > " + i + "</option>");
                            }
                        }

                        sb.Append("</select></td>");
                        sb.Append("</tr>");

                        sb.Append("</tbody>");

                        sb.Append("</table>");

                        if (Convert.ToBoolean(participantDetail[0].HasBay))
                        {
                            sb.Append("<div class=\"content\" style=\"font-size:14px;padding-bottom: 10px;\">");
                            sb.Append("<table class=\"table table-bordered\" id=\"tblLoanBay\" style=\"border-collapse:collapse;margin:0;padding-bottom:20px;\">");
                            sb.Append("<tbody>");
                            sb.Append("<tr>");
                            sb.Append("<td colspan=\"2\" style=\"font-size:16px;font-weight:bold;text-align:center;border:0;padding-bottom:20px\">");
                            sb.Append("<div class='checkbox'>");
                            sb.Append("<label for='chkLoanBay' class=\"btn btn-default\" >");
                            sb.Append("<input type='checkbox'  data-existe='on' id='chkLoanBay'  onchange='checkLoanBay()' />Transferência de Dívidas <span id='spnLoanBay' class='glyphicon glyphicon-menu-down' style='font-size:16px'></span> ");
                            sb.Append("</label>");
                            sb.Append("</div>");
                            sb.Append("</td>");
                            sb.Append("</tr>");
                            sb.Append("<tr id='trVlLoanBay' style='display:none'>");
                            sb.Append("<td  style=\"font-size:14px;width: 50%;border:0\">Saldo devedor</td>");
                            sb.Append("<td  style=\"font-size:14px;border:0\"><input type=\"text\" placeholder='R$' data-existe='on' onkeyup='formataValor(this,event);' class=\"form-control\" id=\"txtVlLoanBay\"/></td>");
                            sb.Append("</tr>");
                            sb.Append("<tr id='trVlInsBay' style='display:none'>");
                            sb.Append("<td  style=\"font-size:14px;width: 50%;border:0\">Valor parcela</td>");
                            sb.Append("<td  style=\"font-size:14px;border:0\"><input type=\"text\" placeholder='R$' data-existe='on' onkeyup='formataValor(this,event);' class=\"form-control\" id=\"txtVlInsBay\"/></td>");
                            sb.Append("</tr>");
                            sb.Append("</tbody>");
                            sb.Append("</table>");
                            sb.Append("</div>");
                        }

                        sb.Append("<div class=\"center dvSimuladorBtn\" >");
                        sb.Append("<a class=\"btn btn-primary\" id='btnSimularEmprestimo' onclick='preloadEmprestimoSimulacao(\"on\")' style=\"width:100px;\">Simular</a>");
                        sb.Append("</div>");
                        sb.Append("</div>");
                    }//fim else IsElegible
                    sb.Append("</div>");
                }//fim If         


                #region SaveLog

                LogAcessoPortal log = new LogAcessoPortal() { IdProduto = oParticip.IdProduto, IdPlano = oParticip.IdPlano, IdSessao = Plataforma, UserName = (oParticip.Users_ != null) ? oParticip.Users_.UserName : "", DescAcesso = "Mobile - Simulador Emprestimo" };
                LogAcessoPortal.Save(log);

                #endregion

                result = sb.ToString();
                return result;
            }
            else
            {
                return result;
            }
        }
        catch (Exception ex)
        {
            StringBuilder erros = new StringBuilder();
            erros.Append("<div id='dvContratoEmprestimoContent'>");
            erros.Append("<div class='aviso'>");
            erros.Append("<h4 style=';text-align:center'>A tela de Simulação de Empréstimo não pode ser exibida</h4>");

            //erros.Append("<div class=\"center dvSimuladorBtn\" >");
            //erros.Append("<a class=\"btn btn-primary\" style=\"margin-right:25px;width:100px;\" onclick=\"VoltarEmprestimoEtapaI('III','on')\">Voltar</a>");
            //erros.Append("</div>");

            if (ex.Message.Contains("EHRO-M"))
            {
                string idModulo = "EHRO-MESSAGE";
                string erroMsg = LoadMsgCustomizadas(ex.Message, idProdutoMsg, idModulo);
                erros.Append("<p style='text-align:center'>" + (!String.IsNullOrEmpty(erroMsg) ? erroMsg : "Ocorreu um erro ao simular o empréstimo.") + "</p>");

            }
            else
            {
                erros.Append("<p>Entre em contato com o administrador através do Fale Conosco.</p>");
            }

            erros.Append("</div>");

            result = erros.ToString();
            return result;
        }

    }

    /// <summary>
    /// Faz simulacao de emprestimo ou concecao de emprestimo
    /// </summary>
    /// <param name="id">Id do Participante criptografado</param>
    /// <param name="_loanAmount"></param>
    /// <param name="_installmentQuantity"></param>
    /// <param name="_firstDueDate"></param>
    /// <param name="_participantId">id do Participante no Esolution Backoffice</param>
    /// <param name="_beneficiaryID">id do Beneficiario no Esolution Backoffice</param>
    /// <param name="_valueType"></param>
    /// <param name="_planLoanID"></param>
    /// <param name="txtVlMargin"></param>
    /// <param name="txtSalary"></param>
    /// <param name="_amortizationType"></param>
    /// <param name="rdoAmortizationSac"></param>
    /// <param name="txtVlLoanBay"></param>
    /// <param name="txtVlInsBay"></param>
    /// <param name="_credit"></param>
    /// <param name="strChkLoanActive"></param>
    /// <param name="isSimulation">simulacao ou concecao</param>
    /// <param name="_bank"></param>
    /// <param name="_agency"></param>
    /// <param name="_account"></param>
    /// <param name="_ip">endereco ip do usuario</param>
    /// <returns>JSON da simulacao ou da concecao</returns>
    [WebMethod]
    public static string LoadEmprestimoSimulacao(string id, string _loanAmount, string _installmentQuantity, string _firstDueDate,
        string _participantId, string _beneficiaryID, string _valueType, string _planLoanID,
        string txtVlMargin, string txtSalary, string _amortizationType, string rdoAmortizationSac
        , string txtVlLoanBay, string txtVlInsBay, string _credit, string strChkLoanActive, string isSimulation, string _bank, string _agency, string _account, string _ip, bool suspenderEmprestimo, string holerite)
    {        
        SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();
        string result = "";
        int idProdutoMsg = 0;
        StringBuilder sb = new StringBuilder();

        string idParticipante = id.Replace(" ", "+");
        _participantId = _participantId.Replace(" ", "+");
        _beneficiaryID = _beneficiaryID.Replace(" ", "+");
        _firstDueDate = _firstDueDate.Replace(" ", "+");
        _planLoanID = _planLoanID.Replace(" ", "+");
        _bank = _bank.Replace(" ", "+");
        _agency = _agency.Replace(" ", "+");
        _account = _account.Replace(" ", "+");       
        try
        {
            if (!String.IsNullOrEmpty(_participantId))
            {
                #region Seta Parametro Emprestimo
                string decryptParticipantPvtID = rijndae.DecryptRijndael(idParticipante, salt);
                string decryptParticipantID = rijndae.DecryptRijndael(_participantId, salt);
                string decryptBeneficiaryID = rijndae.DecryptRijndael(_beneficiaryID, salt);
                string decryptFirstDueDate = rijndae.DecryptRijndael(_firstDueDate, salt);
                string decryptPlanLoanID = rijndae.DecryptRijndael(_planLoanID, salt);
                string decryptCredit = rijndae.DecryptRijndael(_credit, salt);

                string decryptBank = rijndae.DecryptRijndael(_bank, salt);
                string decryptAgency = rijndae.DecryptRijndael(_agency, salt);
                string decryptAccount = rijndae.DecryptRijndael(_account, salt);


                DateTime? firstDueDate = null;
                if (!String.IsNullOrEmpty(decryptFirstDueDate))
                    firstDueDate = Convert.ToDateTime(decryptFirstDueDate);//hdnFirstDueDate
                int participantPrivateID = Convert.ToInt32(decryptParticipantPvtID);
                int? participantID = null;
                if (decryptParticipantID != "0")
                    participantID = Convert.ToInt32(decryptParticipantID);

                int? beneficiaryID = null;
                if (decryptBeneficiaryID != "0")
                    beneficiaryID = Convert.ToInt32(decryptBeneficiaryID);
                int planLoanID = Convert.ToInt32(decryptPlanLoanID);

                decimal? loanAmount = Convert.ToDecimal(_loanAmount);
                bool? IsGrossAmount = Convert.ToBoolean(Int32.Parse(_valueType));
                int? installmentQuantity = Convert.ToInt32(_installmentQuantity);
                string externalVariable = "";
                if (!String.IsNullOrEmpty(txtVlMargin))
                    externalVariable = string.Concat("49=", Decimal.Parse(txtVlMargin));

                if (!String.IsNullOrEmpty(txtSalary))
                    externalVariable = string.Concat("49=", Decimal.Parse(txtSalary));

                if (externalVariable != string.Empty)
                    externalVariable = externalVariable.Replace(",", ".");

                short amortizationType = 0;
                if (Convert.ToInt16(_amortizationType) == 3)
                {
                    if (Convert.ToBoolean(rdoAmortizationSac) == true)
                    {
                        amortizationType = 2;
                    }
                    else
                    {
                        amortizationType = 1;
                    }
                }
                else
                {
                    amortizationType = Convert.ToInt16(_amortizationType);
                }
                #endregion
                
                //Se existir contratos ativos envia as informações para a simulação
                #region Busca Contrato Ativo
                StringBuilder LoanActive = new StringBuilder();
                string consolContractNumbers = string.Empty;

                Collection<DischargeSimulationList> dischargeSimulationResult = DischargeSimulationList.List(DateTime.ParseExact(decryptCredit, "dd/MM/yyyy", null), (participantID != null ? (int)participantID : 0), participantPrivateID, beneficiaryID);

                if (dischargeSimulationResult.Count > 0)
                {
                    strChkLoanActive = strChkLoanActive.Substring(0, strChkLoanActive.Length - 1);
                    string[] arrChkLoanActive = strChkLoanActive.Split(';');
                    Dictionary<string, string> dicLoanActive = new Dictionary<string, string>();
                    for (int i = 0; i < arrChkLoanActive.Length; i++)
                    {
                        string[] arr = arrChkLoanActive[i].Split(',');
                        dicLoanActive.Add(arr[0], arr[1]);
                    }
                    for (int i = 0; i < dischargeSimulationResult.Count; i++)
                    {
                        LoanActive.Append(dischargeSimulationResult[i].ContractNumber); LoanActive.Append(";");
                        LoanActive.Append(dischargeSimulationResult[i].BalanceUnpaid.ToString()); LoanActive.Append(";");
                        LoanActive.Append(dischargeSimulationResult[i].BalanceUnpaidOverDue.ToString()); LoanActive.Append(";");
                        LoanActive.Append(dischargeSimulationResult[i].QuantityInstallmentUnpaid); LoanActive.Append(";0;");            
                        string valueCk = dicLoanActive.Where(x => x.Key == dischargeSimulationResult[i].ContractNumber.ToString()).FirstOrDefault().Value;

                        bool ck = Convert.ToBoolean(valueCk);
                        LoanActive.Append(Convert.ToByte(ck)); LoanActive.Append("|");
                    }
                    consolContractNumbers = LoanActive.ToString();
                    consolContractNumbers = consolContractNumbers.Replace(",", ".");
                }
                #endregion

                if (!String.IsNullOrEmpty(txtVlLoanBay))
                {
                    LoanActive.Append("-1"); LoanActive.Append(";");
                    LoanActive.Append(Decimal.Parse(txtVlLoanBay).ToString()); LoanActive.Append(";");
                    LoanActive.Append("0"); LoanActive.Append(";");
                    LoanActive.Append("0"); LoanActive.Append(";");
                    LoanActive.Append(Decimal.Parse(txtVlInsBay).ToString()); LoanActive.Append(";");
                    LoanActive.Append("-1"); LoanActive.Append("|");
                    consolContractNumbers = LoanActive.ToString();
                    consolContractNumbers = consolContractNumbers.Replace(",", ".");
                }
                var searchResult = LoanSimulationDetail.List(consolContractNumbers, firstDueDate, installmentQuantity, IsGrossAmount, loanAmount, participantID, participantPrivateID, planLoanID, externalVariable, amortizationType, beneficiaryID);

                if (searchResult.Count > 0)
                {
                    if (isSimulation == "on")
                    {
                        #region Tela Simulacao Emprestimo
                        if (searchResult[0].IsReproved)
                        {
                            sb.Append("<div id='dvEtapaIIEmprestimoContent'>");                            
                            sb.Append("<div class='panel-heading '>");
                            sb.Append("Simulação acima dos limites permitidos");
                            sb.Append("</div>");
                            sb.Append("<table class=\"table table-bordered\" style=\"border-collapse:collapse;\">");
                            sb.Append("<tbody>");
                            sb.Append("<tr >");
                            sb.Append("<td  style=\"font-size:14px;width: 50%;\">Parcelas</td>");
                            sb.Append("<td  style=\"font-size:14px;\">");
                            sb.Append(searchResult[0].InstallmentQuantity);
                            sb.Append("</td>");
                            sb.Append("</tr>");
                            sb.Append("<tr >");
                            sb.Append("<td  style=\"font-size:14px;width: 50%;\">Valor Bruto</td>");
                            sb.Append("<td  style=\"font-size:14px;\">");
                            sb.Append(String.Format("{0:C}", searchResult[0].GrossAmount));
                            sb.Append("</td>");
                            sb.Append("</tr>");
                            sb.Append("<tr>");
                            sb.Append("<tr>");

                            sb.Append("<td  style=\"font-size:14px;width: 50%;\">Motivo</td>");
                            sb.Append("<td  class='texto-motivo' style=\"font-size:14px;font-weigth:bold\">");
                            sb.Append(searchResult[0].ReprovedReason);
                            sb.Append("</td>");
                            sb.Append("</tr>");

                            sb.Append("<td  style=\"font-size:14px;width: 50%;\">Limite de Crédito </td>");
                            sb.Append("<td  style=\"font-size:14px;font-weigth:bold\">");
                            sb.Append(String.Format("{0:C}", searchResult[0].LoanMax));
                            sb.Append("</td>");
                            sb.Append("</tr>");

                            sb.Append("<td  style=\"font-size:14px;width: 50%;\">Limite Máximo de Parcela </td>");
                            sb.Append("<td  style=\"font-size:14px;font-weigth:bold\">");
                            sb.Append(String.Format("{0:C}", searchResult[0].InstallmentMax));
                            sb.Append("</td>");
                            sb.Append("</tr>");

                            sb.Append("</tbody>");
                            sb.Append("</table>");

                            sb.Append("<div class=\"center dvSimuladorBtn\" >");
                            sb.Append("<a class=\"btn btn-primary\" style=\"width:100px;\" onclick=\"VoltarEmprestimoEtapaI('I')\">Voltar</a>");
                            sb.Append("</div>");
                            
                            //SUGESTAO DE EMPRESTIMO
                            #region segestao
                            /*var searchResultNew = LoanSimulationDetail.List(consolContractNumbers, firstDueDate, null, null, null, participantID, participantPrivateID, planLoanID, externalVariable, amortizationType, beneficiaryID);

                            sb.Append("<div id='dvContratoAtivo' style='border: none;'>");
                            sb.Append("<p>Sugestões para Simulação de Empréstimos</p>");
                            sb.Append("<table id='tbLoanActive' class='table table-bordered' style='border-collapse:collapse;padding-bottom:10px'>");
                            sb.Append("<thead><tr>");
                            sb.Append("<td>Prestações</td>");
                            sb.Append("<td>Valor Bruto</td>");
                            sb.Append("<td>Valor Líquido</td>");
                            
                            if (amortizationType == 2)
                            {
                                sb.Append("<td>Primeira Parcela</td>");
                                sb.Append("<td>Última Parcela</td>");
                            }
                            else
                            {
                                sb.Append("<td>Valor Parcela</td>");
                            }
                            sb.Append("</tr></thead>");
                            sb.Append("<tbody>");

                            bool resultApproved = false;
                            for (int i = 0; i < searchResultNew.Count; i++)
                            {
                                if (searchResultNew[i].IsReproved == false)
                                {
                                    resultApproved = true;
                                    sb.Append("<tr>");
                                    sb.Append("<td>"+searchResultNew[i].InstallmentQuantity+"</td>");
                                    sb.Append("<td>"+String.Format("{0:C}" ,searchResultNew[i].GrossAmount)+"</td>");
                                    sb.Append("<td>"+String.Format("{0:C}" ,searchResultNew[i].NetAmount)+"</td>");
                                    sb.Append("<td>" + String.Format("{0:C}" ,searchResultNew[i].InstallmentValue )+ "</td>");
                                    if (amortizationType == 2)
                                    {
                                        sb.Append("<td>" +String.Format("{0:C}" , searchResultNew[i].InstallmentLastValue )+ "</td>");
                                    }
                                    sb.Append("</tr>");
                                }
                            }
                            if (resultApproved == false)
                            {
                                sb.Append("</tr><td colspan='4'>Não foram encontradas sugestões de empréstimos.</td></tr>");
                            }

                            sb.Append("</tbody>");
                            sb.Append("</table>");
                            sb.Append("</div>");

                            if (resultApproved)
                            {
                                sb.Append("<div class=\"center dvSimuladorBtn\" >");
                                sb.Append("<a class=\"btn btn-primary\" style=\"margin-right:25px;width:100px;\" onclick=\"VoltarEmprestimoEtapaI('I')\">Voltar</a>");
                                sb.Append("</div>");

                            } */
                            #endregion

                            //FIM SUGESTAO
                            sb.Append("</div>");
                            result = sb.ToString();
                        }
                        else
                        {
                            sb.Append("<div id='dvEtapaIIEmprestimoContent'>");
                            sb.Append("<table class=\"table table-bordered\" style=\"border-collapse:collapse;margin-bottom: 0;\">");
                            sb.Append("<tbody>");
                            sb.Append("<tr><td style =\"padding-right:115px;\"></td><td></td></tr>");                            
                            sb.Append("<tr>");
                            sb.Append("<td  style=\"font-size:14px\">Data Crédito</td>");
                            sb.Append("<td  style=\"font-size:14px\">");
                            sb.Append(decryptCredit);
                            sb.Append("</td>");
                            sb.Append("</tr>");
                            sb.Append("<tr >");
                            sb.Append("<td  style=\"font-size:14px\">Valor Bruto</td>");
                            sb.Append("<td  style=\"font-size:14px\">");
                            sb.Append(String.Format("{0:C}", searchResult[0].GrossAmount));
                            sb.Append("</td>");
                            sb.Append("</tr>");
                            sb.Append("<tr >");                            
                            sb.Append("<td  style=\"font-size:14px\">Valor Taxa adm.</td>");
                            sb.Append("<td  style=\"font-size:14px\">");
                            sb.Append(String.Format("{0:C}", searchResult[0].RateValue));
                            sb.Append("</td>");
                            sb.Append("</tr>");
                            sb.Append("<tr >");
                            sb.Append("<td  style=\"font-size:14px\">Valor IOF</td>");
                            sb.Append("<td  style=\"font-size:14px\">");
                            sb.Append(String.Format("{0:C}", searchResult[0].IOF));
                            sb.Append("</td>");
                            sb.Append("</tr>");                          
                            sb.Append("<tr >");
                            sb.Append("<td  style=\"font-size:14px\">Valor Líquido</td>");
                            sb.Append("<td  style=\"font-size:14px\">");
                            sb.Append(String.Format("{0:C}", searchResult[0].NetAmount));
                            sb.Append("</td>");
                            sb.Append("</tr>");
                            sb.Append("<tr >");
                            sb.Append("<td  style=\"font-size:14px\">Qtde. Parcelas</td>");
                            sb.Append("<td  style=\"font-size:14px\">");
                            sb.Append(searchResult[0].InstallmentQuantity);
                            sb.Append("</td>");
                            sb.Append("</tr>");
                            sb.Append("<tr >");
                            sb.Append("<td  style=\"font-size:14px\">" + (amortizationType == 2 ? "Primeira Parcela" : "Valor Parcela") + "</td>");
                            sb.Append("<td  style=\"font-size:14px\">");
                            sb.Append(String.Format("{0:C}", searchResult[0].InstallmentValue));
                            sb.Append("</td>");
                            sb.Append("</tr>");
                            if (amortizationType == 2)
                            {
                                sb.Append("<tr >");
                                sb.Append("<td  style=\"font-size:14px\">Última Parcela</td>");
                                sb.Append("<td  style=\"font-size:14px\">");
                                sb.Append(String.Format("{0:C}", searchResult[0].InstallmentLastValue));
                                sb.Append("</td>");
                                sb.Append("</tr>");
                            }
                            
                            if (searchResult[0].RateDeathPercent > 0)
                            {
                                sb.Append("<tr >");
                                sb.Append("<td  style=\"font-size:14px\">Taxa de QQI/QQM</td>");
                                sb.Append("<td  style=\"font-size:14px\">");
                                sb.Append(searchResult[0].RateDeathPercent + "% (a.m.)");
                                sb.Append("</td>");
                                sb.Append("</tr>");
                            }

                            if (IdEntidade == 61)
                            {
                                if (searchResult[0].InterestYearOnly)
                                {
                                    sb.Append("<tr >");
                                    sb.Append("<td  style=\"font-size:14px\">Taxa de Juros</td>");
                                    sb.Append("<td  style=\"font-size:14px\">");
                                    sb.Append(searchResult[0].InterestYear + "% (a.a.)");
                                    sb.Append("</td>");
                                    sb.Append("</tr>");
                                    if (searchResult[0].MonetaryCorrectionYear > 0)
                                    {
                                        sb.Append("<tr >");
                                        sb.Append("<td  style=\"font-size:14px\">Índice Correção</td>");
                                        sb.Append("<td  style=\"font-size:14px\">");
                                        sb.Append(searchResult[0].MonetaryCorrectionYear.ToString("0.00") + "% (a.a.)");
                                        sb.Append("</td>");
                                        sb.Append("</tr>");
                                    }
                                }
                                else
                                {
                                    sb.Append("<tr >");
                                    sb.Append("<td  style=\"font-size:14px\">Taxa de Juros</td>");
                                    sb.Append("<td  style=\"font-size:14px\">");
                                    sb.Append(searchResult[0].InterestMonth + "% (a.m.)<br />" + searchResult[0].InterestYear + "%(a.a.)");
                                    sb.Append("</td>");
                                    sb.Append("</tr>");
                                    if (searchResult[0].MonetaryCorrection > 0)
                                    {
                                        sb.Append("<tr >");
                                        sb.Append("<td  style=\"font-size:14px\">Índice Correção</td>");
                                        sb.Append("<td  style=\"font-size:14px\">");
                                        sb.Append(searchResult[0].MonetaryCorrection + "% (a.m.)<br />" + searchResult[0].MonetaryCorrectionYear + "%(a.a.)");
                                        sb.Append("</td>");
                                        sb.Append("</tr>");
                                    }
                                }
                            }
                            else
                            {
                                sb.Append("<tr >");
                                sb.Append("<td  style=\"font-size:14px\">Taxa de Juros</td>");
                                sb.Append("<td  style=\"font-size:14px\">");
                                sb.Append(searchResult[0].InterestMonth + "% (a.m.)");
                                sb.Append("</td>");
                                sb.Append("</tr>");
                                if (IdEntidade == 62)
                                {
                                    sb.Append("<tr >");
                                    sb.Append("<td  style=\"font-size:14px\">Taxa Seguro</td>");
                                    sb.Append("<td  style=\"font-size:14px\">");
                                    sb.Append(String.Format("{0:C}", searchResult[0].RateConcessionInsuranceValue));
                                    sb.Append("</td>");
                                    sb.Append("</tr>");
                                }
                            }
                            if (IdEntidade == 62)
                            {
                                sb.Append("<tr >");
                                sb.Append("<td  style=\"font-size:14px\">Holerite</td>");
                                sb.Append("<td  style=\"font-size:14px\">");
                                sb.Append("<input type='file' required name=\"holerite\" id=\"holerite\" accept=\".pdf,.jpeg,.jpg,.png,.doc, .docx\" />");
                                sb.Append("</td>");
                                sb.Append("</tr>");
                                sb.Append("<tr >");                                
                                sb.Append("<td  style=\"font-size:14px\" colspan=\"2\">");
                                sb.Append("<img id='imgholerite' height='150'>");
                                sb.Append("<input type='hidden' name='imgholeriteb64' id='imgholeriteb64' />");
                                sb.Append("</td>");
                                sb.Append("</tr>");
                            }
                            else
                            {
                                sb.Append("<input type='file' style='display: none' required name=\"holerite\" id=\"holerite\" accept=\".pdf,.jpeg,.jpg,.png,.doc, .docx\" />");
                            }
                            
                            string idModulo = "Emprestimo";
                            Participante oParticip = new Participante(Convert.ToInt32(decryptParticipantPvtID));
                            string exibeContrato = LoadMsgCustomizadas("ExibeContrato", oParticip.IdProduto, idModulo);                  
                            if (exibeContrato == "S")
                            {
                                string contrato = LoadMsgCustomizadas("Contrato", oParticip.IdProduto, idModulo);
                                string msgAceiteContrato = LoadMsgCustomizadas("MsgAceitaContrato", oParticip.IdProduto, idModulo);
                                string msgConfirmarDadosBancarios = LoadMsgCustomizadas("MsgEmprestimoConfirmarDadosBancarios", oParticip.IdProduto, idModulo);

                                /*
                                Novo recurso adiciondo para confirmação de dados bancários
                                */
                                sb.Append("<tr >");
                                sb.Append("<td colspan='2' class='tdContratoBco' style='text-align:center'>");
                                sb.Append("Dados Bancários");
                                sb.Append("</td>");
                                sb.Append("</tr>");
                                if (IdEntidade == 62)
                                {
                                    sb.Append("<tr >");
                                    sb.Append("<td class='tdContratoBcoimpar' colspan='2' style=\"font-size:14px;\">");
                                    sb.Append("<img id='myImg' src='#' alt='Holerite' height=200 width=100>");
                                    sb.Append("</td>");
                                    sb.Append("</tr>");
                                }
                                sb.Append("<tr >");
                                sb.Append("<td class='tdContratoBcoimpar' colspan='2' style=\"font-size:14px;\">");
                                sb.Append("<small>" + msgConfirmarDadosBancarios + "<small>");
                                sb.Append("</td>");
                                sb.Append("</tr>");                              
                                sb.Append("<tr >");
                                sb.Append("<td class='tdContratoBco' style=\"font-size:14px\"> Banco </td>");
                                sb.Append("<td class='tdContratoBco' style=\"font-size:14px\">");
                                sb.Append(decryptBank);
                                sb.Append("</td>");
                                sb.Append("</tr>");
                                sb.Append("<tr>");
                                sb.Append("<td class='tdContratoBcoimpar' style=\"font-size:14px\">Agência</td>");
                                sb.Append("<td class='tdContratoBcoimpar' style=\"font-size:14px\">");
                                sb.Append(decryptAgency);
                                sb.Append("</td>");
                                sb.Append("</tr>");
                                sb.Append("<tr >");
                                sb.Append("<td class='tdContratoBco' style=\"font-size:14px\">Conta</td>");
                                sb.Append("<td class='tdContratoBco' style=\"font-size:14px\">");
                                sb.Append(decryptAccount);
                                sb.Append("</td>");
                                sb.Append("</tr>");
                                sb.Append("</tbody>");
                                sb.Append("</table>");
                                sb.Append("<div class=\"center dvSimuladorBtn\" style=\"background:#fff;padding-top:25px;padding-bottom:15px;\">");
                                sb.Append("<div id='dvContratoConfirmacao' style='display:none;overflow:scroll;margin-bottom:15px;height:350px;margin:15px;text-align:justify;'>");

                                #region CONTRATO EMPRESTIMO EM HTML
                                sb.Append("<h1 style='background-color:#e3e3e3;display:block;text-align:center;font-size:18px'>Termos do Contrato de Empréstimo</h1>");
                                sb.Append(contrato);
                                #endregion

                                sb.Append("</div>");

                                sb.Append("<div id='dvBtns'>");
                                sb.Append("<a class=\"btn btn-primary\" style=\"margin-right:25px;width:140px;\" onclick=\"document.getElementById('dvContratoConfirmacao').style.display = 'block';document.getElementById('dvBtns').style.display = 'none';document.getElementById('dvBtnsAceite').style.display = 'block';setHeight();\">Confirmar Dados</a>");
                                sb.Append("<a class=\"btn btn-default\" style=\"width:140px;\" onclick=\"VoltarEmprestimoEtapaI('I')\">Cancelar</a>");
                                sb.Append("</div>");
                                sb.Append("<div id='dvBtnsAceite' class='center' style='display:none'>");
                                if (!String.IsNullOrEmpty(msgAceiteContrato))
                                    sb.Append("<br><p style='background-color:#e3e3e3;display:block;padding:5px;border-radius: 10px;margin-bottom:30px'>" + msgAceiteContrato + "</p>");
                                sb.Append("<button id='btnHideLoan' class='btn btn-warning' style=\"margin-right:25px;width:140px;display:none;\"><span class='glyphicon glyphicon-refresh glyphicon-refresh-animate'></span> Carregando...</button>");
                                sb.Append("<a class=\"btn btn-primary\" id='btnEmprestimoSolicitar' style=\"margin-right:25px;width:140px;\" onclick='preloadEmprestimoSimulacao(\"no\")' style=\"width:100px\">Aceitar Contrato</a>");
                                sb.Append("<a class=\"btn btn-default\" style=\"width:140px;\" onclick=\"VoltarEmprestimoEtapaI('I')\">Cancelar</a>");
                                sb.Append("</div>");
                                sb.Append("</div>");
                            }
                            else
                            {
                                if (IdEntidade == 62)
                                {
                                    sb.Append("</tbody>");
                                    sb.Append("</table>");
                                    sb.Append("<div class=\"center dvSimuladorBtn\" style=\"background:#fff;padding-top:25px;padding-bottom:15px;\">");
                                    sb.Append("<a class=\"btn btn-primary\" style=\"margin-right:25px;width:100px;\" onclick=\"VoltarEmprestimoEtapaI('I')\">Voltar</a>");
                                    sb.Append("<a class=\"btn btn-primary\" id='btnEmprestimoSolicitar' onclick='preloadEmprestimoSimulacao62(\"no\")' style=\"width:100px\">Solicitar</a>");
                                    sb.Append("</div>");
                                }

                                if (IdEntidade != 62)
                                {
                                    sb.Append("</tbody>");
                                    sb.Append("</table>");
                                    sb.Append("<div class=\"center dvSimuladorBtn\" style=\"background:#fff;padding-top:25px;padding-bottom:15px;\">");
                                    sb.Append("<a class=\"btn btn-primary\" style=\"margin-right:25px;width:100px;\" onclick=\"VoltarEmprestimoEtapaI('I')\">Voltar</a>");

                                    if (IdEntidade == 61)// Condição paleativa para validar opção de suspensão de empréstimo para Fipeqc 
                                        sb.Append("<a class=\"btn btn-primary\" id='btnEmprestimoSolicitar' onclick='preValidacaoSolicitacaoEmprestimo()' style=\"width:100px\">Solicitar</a>");
                                    else
                                        sb.Append("<a class=\"btn btn-primary\" id='btnEmprestimoSolicitar' onclick='preloadEmprestimoSimulacao(\"no\")' style=\"width:100px\">Solicitar</a>");
                                    sb.Append("</div>");
                                }
                            }
                            sb.Append("</div");

                            result = sb.ToString();
                        }
                        #endregion
                    }//fim IF isSimulation
                    else if (isSimulation == "no")
                    {
                        //Salva contrato de Emprestimo
                        #region Solicita Emprestimo
                        int processID = 57;
                        int operationConcede = 111;
                        int operationConsolidation = 163;
                        int UserIDEsolutions = 164;//User AppMobile para registrar log
                        string ContractNumberCNS = "";
                        int ParticipantId = 0;
                        int SponsorId = 0;
                        int PlanId = 0;
                        int idLog = 0;
                        Log saveLog = null;

                        //Migra Participante do Private
                        ParticipantImport import = ParticipantImport.ParticipantImportGet(participantPrivateID, ParticipantId, PlanId, SponsorId);
                        LoanContract loanContractToSave = new LoanContract();
                        loanContractToSave.PlanLoanID = planLoanID;
                        loanContractToSave.Credit = DateTime.ParseExact(decryptCredit, "dd/MM/yyyy", null);
                        loanContractToSave.InstallmentFirstDue = firstDueDate;
                        loanContractToSave.RateConcession = searchResult[0].RateConcessionYear;
                        loanContractToSave.RateConcessionInsurance = searchResult[0].RateConcessionInsurance;
                        loanContractToSave.Rate = searchResult[0].RateMonth;
                        loanContractToSave.Request = DateTime.Now.Date;
                        loanContractToSave.UserID = UserIDEsolutions;                        
                        loanContractToSave.ParticipantID = import.ParticipantID;
                        loanContractToSave.BeneficiaryID = beneficiaryID != null ? beneficiaryID : 0;

                        if (loanContractToSave.RateConcession > 0) { loanContractToSave.RateConcessionValue = searchResult[0].RateValue; }
                        if (loanContractToSave.RateConcessionInsurance > 0) { loanContractToSave.RateConcessionInsuranceValue = searchResult[0].RateConcessionInsuranceValue; }

                        //Recupera valores da simulação selecionada
                        loanContractToSave.GrossAmount = searchResult[0].GrossAmount;
                        loanContractToSave.NetAmount = searchResult[0].NetAmount;
                        loanContractToSave.InstallmentQuantity = searchResult[0].InstallmentQuantity;
                        loanContractToSave.InstallmentValue = searchResult[0].InstallmentValue;
                        loanContractToSave.IOF = searchResult[0].IOF;
                        loanContractToSave.Interest = searchResult[0].InterestMonth;

                        if (!String.IsNullOrEmpty(txtVlLoanBay))
                            loanContractToSave.LoanBay = Convert.ToDecimal(txtVlLoanBay);

                        loanContractToSave.AmortizationType = amortizationType;

                        int contractNumberNew = LoanContract.Save(loanContractToSave);

                        if (contractNumberNew == 0)
                        {
                            var contractList = LoanContractList.List(null, null, null, null, loanContractToSave.PlanLoanID, loanContractToSave.ParticipantID, null, participantPrivateID);
                            for (int i = 0; i < contractList.Count; i++)
                            {
                                if (contractList[i].Status.ToLower() == "pendente aprovação")
                                {
                                    contractNumberNew = contractList[i].ContractID;
                                    break;
                                }
                            }
                        }

                        //registrar o aceite de contrato de empréstimo
                        LoanContract.SaveContractAccept(contractNumberNew, UserIDEsolutions, _ip);

                        // Condição paleativa para validar opção de suspensão de empréstimo para Fipeqc
                        if (IdEntidade == 61 && suspenderEmprestimo == true)
                        {
                            LoanContract.LoanContractSuspend(contractNumberNew);
                            saveLog = new Log();
                            saveLog.ProcessID = processID;
                            saveLog.OperationID = operationConsolidation;
                            saveLog.KeyID = contractNumberNew;
                            saveLog.Description = String.Format("<LoanContractSuspend NR_CTT=\"{0}\"   />", contractNumberNew);
                            saveLog.IsError = false;
                            saveLog.UserID = UserIDEsolutions;
                            idLog = Log.Save(saveLog);
                        }

                        //Registrar holerite 
                        if (holerite != null && contractNumberNew != 0 && IdEntidade == 62)
                        {
                            //Declaração de variaveis
                            string pastaSelecionada;
                            string base64String;
                            string base64CabecalhoString;
                            string nomeFile;
                            string extensaoFile;
                            int numeroVersao;
                            byte[] fileBytes;
                            string decryptParticip = rijndae.DecryptRijndael(idParticipante, salt);
                            DadosCadastraisParticipante dadosCadastraisParticipante = DadosCadastraisParticipante.List(Convert.ToInt32(decryptParticip))[0];
                            Participante participante = new Participante(dadosCadastraisParticipante.IdParticipante);

                            //Determina diretório
                            string dirPastaArquivosGebsa = new AppSettingsReader().GetValue("RootPhysicalPathFilesGebsa", typeof(string)).ToString();
                            string idCexGebsa = new AppSettingsReader().GetValue("IdCexGebsa", typeof(string)).ToString();
                            string nomePatrocinadora = participante.NomePatrocina;
                            pastaSelecionada = string.Format("{0}\\{1}\\{2}", dirPastaArquivosGebsa, idCexGebsa, nomePatrocinadora);

                            //Cria diretório caso não exista
                            if (!Directory.Exists(pastaSelecionada))
                                Directory.CreateDirectory(pastaSelecionada);

                            //Converte string base 64 em array de bytes.
                            base64String = holerite;
                            base64CabecalhoString = Regex.Match(base64String, "^data:[^/]+/([^;]+);base64,").Value;
                            nomeFile = String.Concat(dadosCadastraisParticipante.Nome, "_", dadosCadastraisParticipante.Cpf);
                            extensaoFile = base64CabecalhoString.Split('/')[1].Split(';')[0];
                            fileBytes = Convert.FromBase64String(base64String.Replace(base64CabecalhoString, string.Empty));

                            //Determina número de versão do arquivo.                      
                            DirectoryInfo dirInfo = new DirectoryInfo(pastaSelecionada);
                            FileInfo[] listaArquivo = dirInfo.GetFiles("*" + nomeFile + "*.*");
                            if (listaArquivo.Length > 0)
                            {
                                string nomeArquivoUltimaVersao = listaArquivo.OrderByDescending(a => a.LastWriteTime).First().Name;
                                numeroVersao = Int32.Parse(nomeArquivoUltimaVersao.Split('_')[2].ToString().Replace(Path.GetExtension(nomeArquivoUltimaVersao), "")) + 1;
                            }
                            else
                                numeroVersao = 1;
                            File.WriteAllBytes(string.Format(@"{0}\\{1}_{2}.{3}", pastaSelecionada, nomeFile, numeroVersao, extensaoFile), fileBytes);
                        }

                        if (dischargeSimulationResult.Count > 0)
                        {
                            string[] arrChkLoanActive = strChkLoanActive.Split(';');
                            Dictionary<string, string> dicLoanActive = new Dictionary<string, string>();
                            for (int i = 0; i < arrChkLoanActive.Length; i++)
                            {
                                string[] arr = arrChkLoanActive[i].Split(',');
                                dicLoanActive.Add(arr[0], arr[1]);
                            }
                            for (int i = 0; i < dischargeSimulationResult.Count; i++)
                            {
                                string valueCk = dicLoanActive.Where(x => x.Key == dischargeSimulationResult[i].ContractNumber.ToString()).FirstOrDefault().Value;
                                bool ck = Convert.ToBoolean(valueCk);

                                if (ck == true)//conferir ck em common.js
                                {
                                    LoanContractConsolidation loanContractConsolidationToSave = new LoanContractConsolidation();
                                    loanContractConsolidationToSave.ContractNumberConsolidation = dischargeSimulationResult[i].ContractNumber;
                                    loanContractConsolidationToSave.ContractNumber = contractNumberNew;
                                    //Salva Consolidação de contrato
                                    LoanContractConsolidation.Save(loanContractConsolidationToSave);

                                    //Lança item de quitação no contrato ativo
                                    decimal _UnpaidBalance = dischargeSimulationResult[i].BalanceUnpaid + dischargeSimulationResult[i].BalanceUnpaidOverDue;
                                    int _ContractQuit = dischargeSimulationResult[i].ContractNumber;
                                    DateTime _DischargeDate = (DateTime)dischargeSimulationResult[i].DischargeDate;
                                    decimal _MonetaryCorrection = dischargeSimulationResult[i].MonetaryCorrection;
                                    var dischargeResult = DischargeSimulationListByContractNumber.ListByContractNumberSearch(_ContractQuit, _DischargeDate, false);
                                    #region Salva log ESoltuions Backoffice
                                    saveLog = new Log();
                                    saveLog.ProcessID = processID;
                                    saveLog.OperationID = operationConsolidation;
                                    saveLog.KeyID = _ContractQuit;
                                    saveLog.Description = String.Format("<LoanContract NR_CTT=\"{0}\" DT_ITM=\"{1}\" TP_ITM=\"{2}\" NR_CTT_NEW=\"{3}\"/>", _ContractQuit, _DischargeDate, "Q", contractNumberNew);
                                    saveLog.IsError = false;
                                    saveLog.UserID = UserIDEsolutions;
                                    idLog = Log.Save(saveLog);
                                    #endregion

                                    ContractNumberCNS += string.Concat(_ContractQuit.ToString(), ",");
                                }

                            }
                        }
                        #region Salva log ESoltuions Backoffice
                        saveLog = new Log();
                        saveLog.ProcessID = processID;
                        saveLog.OperationID = operationConcede;
                        saveLog.KeyID = contractNumberNew;
                        saveLog.Description = String.Format("<LoanContract NR_CTT=\"{0}\" VL_GRS_AMN=\"{1}\" VL_RTE_CSS=\"{2}\" VL_IOF=\"{3}\" VL_NET_AMN=\"{4}\" QT_INS=\"{5}\" VL_INS=\"{6}\" DT_CRD=\"{7}\" PC_ITT=\"{8}\" NR_CTT_CNS=\"{9}\" ID_BNK=\"{10}\" ID_AGC=\"{11}\" NR_ACT=\"{12}\"  />", contractNumberNew, loanContractToSave.GrossAmount, loanContractToSave.RateConcession, loanContractToSave.IOF, loanContractToSave.NetAmount, loanContractToSave.InstallmentQuantity, loanContractToSave.InstallmentValue, loanContractToSave.Credit, loanContractToSave.Interest, ContractNumberCNS, decryptBank, decryptAgency, decryptAccount);
                        saveLog.IsError = false;
                        saveLog.UserID = UserIDEsolutions;
                        saveLog.Date = DateTime.Now;
                        idLog = Log.Save(saveLog);
                        #endregion
                        bool isNewContract = true;
                        result = LoadContratoEmprestimo(contractNumberNew, id, isNewContract);
                        #endregion
                    }
                }

                return result;
            }
            else
            {
                return result;
            }
        }
        catch (Exception ex)
        {
            #region Div Erro
            StringBuilder erros = new StringBuilder();
            erros.Append("<div id='dvEtapaIIEmprestimoContent'>");
            erros.Append("<div class='aviso'>");
            if (ex.Message.Contains("EHRO-M"))
            {
                string idModulo = "EHRO-MESSAGE";
                int decryptParticipantPvtID = Convert.ToInt32(rijndae.DecryptRijndael(idParticipante, salt));
                Participante oParticip = new Participante(decryptParticipantPvtID);
                string erroMsg = LoadMsgCustomizadas(ex.Message, oParticip.IdProduto, idModulo);
                erros.Append("<h4 style='text-align:center'>" + (!String.IsNullOrEmpty(erroMsg) ? erroMsg : "Ocorreu um erro ao simular o empréstimo.") + "</h4>");
            }
            else
            {
                erros.Append("<h4 style='text-align:center'>Ocorreu um erro ao simular o empréstimo.</h4>");
                erros.Append("<p>Por favor, clique em voltar e tente novamente ou entre em contato com o administrador.</p>");
            }
            erros.Append("</div>");
            if (isSimulation == "on")
            {
                erros.Append("<div class=\"center dvSimuladorBtn\" >");
                erros.Append("<a class=\"btn btn-primary\" style=\"margin-right:25px;width:100px;\" onclick=\"VoltarEmprestimoEtapaI('III','on')\">Voltar</a>");
                erros.Append("</div>");
            }
            result = erros.ToString();
            #endregion
            return result;
        }
    }

    /// <summary>
    /// Carrega contrato de emprestimo novo ou ja existente do participante 
    /// </summary>
    /// <param name="contractNumber">Numero do contrato</param>
    /// <param name="id">Id do participante criptografado</param>
    /// <param name="isNewContract">novo contrato ou contrato ja existente</param>
    /// <returns></returns>
    [WebMethod]
    public static string LoadContratoEmprestimo(int contractNumber, string id, bool isNewContract)
    {
        SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();
        string result = "";
        Participante oParticip = null;
        StringBuilder sb = new StringBuilder();
        Collection<LoanContractDetailByContractNumber> searchContract = new Collection<LoanContractDetailByContractNumber>();

        try
        {

            string idParticipante = id.Replace(" ", "+");
            string decryptParticip = rijndae.DecryptRijndael(idParticipante, salt);

            if (contractNumber > 0)
            {
                searchContract = LoanContractDetailByContractNumber.List(contractNumber);
                oParticip = new Participante(Convert.ToInt32(decryptParticip));
            }
            else
            {
                oParticip = new Participante(Convert.ToInt32(decryptParticip));
            }

            if (searchContract.Count > 0)
            {
                string idModulo = "Emprestimo";
                sb.Append("<div id='dvEtapaIIEmprestimoContent'>");
                sb.Append("<div class='panel-heading '>");
                sb.Append("Detalhamento do Contrato");
                sb.Append("</div>");
                sb.Append("<table class=\"table table-bordered\" style=\"border-collapse:collapse;margin-bottom:0px;\">");
                sb.Append("<tbody>");
                sb.Append("<td  style=\"font-size:14px;width: 50%;\">Número do Contrato</td>");
                sb.Append("<td  style=\"font-size:14px;\">");
                sb.Append(searchContract[0].ContractNumber);
                sb.Append("</td>");
                sb.Append("</tr>");
                sb.Append("<tr >");
                sb.Append("<td  style=\"font-size:14px;width: 50%;\">Situação</td>");
                sb.Append("<td  style=\"font-size:14px;\">");
                sb.Append(searchContract[0].ContractStatus);
                sb.Append("</td>");
                sb.Append("</tr>");
                sb.Append("<tr >");
                sb.Append("<td  style=\"font-size:14px;width: 50%;\">Data Solicitação</td>");
                sb.Append("<td  style=\"font-size:14px;\">");
                sb.Append(searchContract[0].Request.ToString("dd/MM/yyyy"));
                sb.Append("</td>");
                sb.Append("</tr>");

                sb.Append("<tr >");
                sb.Append("<td  style=\"font-size:14px;width: 50%;\">Valor Bruto</td>");
                sb.Append("<td  style=\"font-size:14px;\">");
                sb.Append(String.Format("{0:C}", searchContract[0].GrossValue));
                sb.Append("</td>");
                sb.Append("</tr>");

                sb.Append("<tr >");
                sb.Append("<td  style=\"font-size:14px;width: 50%;\">Valor Líquido</td>");
                sb.Append("<td  style=\"font-size:14px;\">");
                sb.Append(String.Format("{0:C}", searchContract[0].NetValue));
                sb.Append("</td>");
                sb.Append("</tr>");

                sb.Append("<tr >");
                sb.Append("<td  style=\"font-size:14px;width: 50%;\">Valor Parcela</td>");
                sb.Append("<td  style=\"font-size:14px;\">");
                sb.Append(String.Format("{0:C}", searchContract[0].InstallmentValue));
                sb.Append("</td>");
                sb.Append("</tr>");

                sb.Append("<tr >");
                sb.Append("<td  style=\"font-size:14px;width: 50%;\">Total Parcelas</td>");
                sb.Append("<td  style=\"font-size:14px;\">");
                sb.Append(searchContract[0].InstallmentQuantity);
                sb.Append("</td>");
                sb.Append("</tr>");

                sb.Append("<tr >");
                sb.Append("<td  style=\"font-size:14px;width: 50%;\">Saldo Quitação</td>");
                sb.Append("<td  style=\"font-size:14px;\">");
                sb.Append(String.Format("{0:C}", searchContract[0].UnpaidBalance));
                sb.Append("</td>");
                sb.Append("</tr>");




                if (searchContract[0].LoanBay > 0)
                {
                    sb.Append("<tr >");
                    sb.Append("<td  style=\"font-size:14px;width: 50%;\">Transferência de Dívida Consignada</td>");
                    sb.Append("<td  style=\"font-size:14px;\">");
                    sb.Append(String.Format("{0:C}", searchContract[0].LoanBay));
                    sb.Append("</td>");
                    sb.Append("</tr>");
                }
                if (searchContract[0].ContractPreviousValue > 0)
                {
                    sb.Append("<tr >");
                    sb.Append("<td  style=\"font-size:14px;width: 50%;\">Contrato Anterior</td>");
                    sb.Append("<td  style=\"font-size:14px;\">");
                    sb.Append(String.Format("{0:C}", searchContract[0].ContractPreviousValue));
                    sb.Append("</td>");
                    sb.Append("</tr>");
                }

                if (IdEntidade == 61)
                {
                    sb.Append("<tr >");
                    //sb.Append("<td  style=\"font-size:14px;width: 50%;\">Taxa Administrativa</td>");
                    sb.Append("<td  style=\"font-size:14px;width: 50%;\">Taxa Crédito</td>");
                    sb.Append("<td  style=\"font-size:14px;\">");
                    sb.Append(searchContract[0].PercentRateConcession + "%");
                    sb.Append("</td>");
                    sb.Append("</tr>");

                    //if (searchContract[0].InterestYearOnly)
                    //{

                    //    sb.Append("<tr >");
                    //    sb.Append("<td  style=\"font-size:14px;width: 50%;\">Taxa de Juros</td>");
                    //    sb.Append("<td  style=\"font-size:14px;\">");
                    //    sb.Append(searchContract[0].PercentInterestYear + "% (a.a.)");
                    //    sb.Append("</td>");
                    //    sb.Append("</tr>");

                    //    if (searchContract[0].MonetaryCorrectionYear > 0)
                    //    {
                    //        sb.Append("<tr >");
                    //        sb.Append("<td  style=\"font-size:14px;width: 50%;\">Correção Monetária</td>");
                    //        sb.Append("<td  style=\"font-size:14px;\">");
                    //        sb.Append(searchContract[0].MonetaryCorrectionYear.ToString("0.00") + "% (a.a.)");
                    //        sb.Append("</td>");
                    //        sb.Append("</tr>");
                    //    }

                    //}
                    //else
                    //{

                    sb.Append("<tr >");
                    sb.Append("<td  style=\"font-size:14px;width: 50%;\">Taxa de Juros</td>");
                    sb.Append("<td  style=\"font-size:14px;\">");
                    sb.Append(searchContract[0].PercentInterest + "% (a.m.)<br />" + searchContract[0].PercentInterestYear + "%(a.a.)");
                    sb.Append("</td>");
                    sb.Append("</tr>");

                    if (searchContract[0].MonetaryCorrection > 0)
                    {
                        sb.Append("<tr >");
                        sb.Append("<td  style=\"font-size:14px;width: 50%;\">Correção Monetária</td>");
                        sb.Append("<td  style=\"font-size:14px;\">");
                        sb.Append(searchContract[0].MonetaryCorrection + "% (a.m.)<br />" + searchContract[0].MonetaryCorrectionYear + "%(a.a.)");
                        sb.Append("</td>");
                        sb.Append("</tr>");
                    }
                    //}

                    if (searchContract[0].RateDeathPercent > 0)
                    {
                        sb.Append("<tr >");
                        sb.Append("<td  style=\"font-size:14px;width: 50%;\">Taxa de QQI/QQM</td>");
                        sb.Append("<td  style=\"font-size:14px;\">");
                        sb.Append(searchContract[0].RateDeathPercent + "% (a.m.)");
                        sb.Append("</td>");
                        sb.Append("</tr>");
                    }

                }
                else if (IdEntidade == 62)
                {
                    sb.Append("<tr >");
                    sb.Append("<td  style=\"font-size:14px;width: 50%;\">Taxa Seguro</td>");
                    sb.Append("<td  style=\"font-size:14px;\">");
                    sb.Append(searchContract[0].RateConcessionInsurance + "%");
                    sb.Append("</td>");
                    sb.Append("</tr>");

                    sb.Append("<tr >");
                    sb.Append("<td  style=\"font-size:14px;width: 50%;\">Taxa de Juros</td>");
                    sb.Append("<td  style=\"font-size:14px;\">");
                    sb.Append(searchContract[0].PercentInterest + "% (a.m.)<br />" + searchContract[0].PercentInterestYear + "%(a.a.)");
                    sb.Append("</td>");
                    sb.Append("</tr>");

                    sb.Append("<tr >");
                    sb.Append("<td  style=\"font-size:14px;width: 50%;\">Taxa Administrativa</td>");
                    sb.Append("<td  style=\"font-size:14px;\">");
                    sb.Append(searchContract[0].PercentRateConcession + "%");
                    sb.Append("</td>");
                    sb.Append("</tr>");

                    sb.Append("<tr >");
                    sb.Append("<td  style=\"font-size:14px;width: 50%;\">Custo Efetivo Total</td>");
                    sb.Append("<td  style=\"font-size:14px;\">");
                    sb.Append(searchContract[0].CET + "% (a.m.)<br />" + searchContract[0].CETYearly + "%(a.a.)");
                    sb.Append("</td>");
                    sb.Append("</tr>");

                }
                else
                {
                    sb.Append("<tr >");
                    sb.Append("<td  style=\"font-size:14px;width: 50%;\">Taxa de Juros</td>");
                    sb.Append("<td  style=\"font-size:14px;\">");
                    sb.Append(searchContract[0].PercentInterest + "% (a.m.)");
                    sb.Append("</td>");
                    sb.Append("</tr>");

                    sb.Append("<tr >");
                    //sb.Append("<td  style=\"font-size:14px;width: 50%;\">Taxa Administrativa</td>");
                    sb.Append("<td  style=\"font-size:14px;width: 50%;\">Taxa adm.</td>");
                    sb.Append("<td  style=\"font-size:14px;\">");
                    sb.Append(searchContract[0].PercentRateConcession + "%");
                    sb.Append("</td>");
                    sb.Append("</tr>");

                }



                sb.Append("<tr >");
                sb.Append("<td  style=\"font-size:14px;width: 50%;\">Sistema de Amortização</td>");
                sb.Append("<td  style=\"font-size:14px;\">");
                sb.Append(searchContract[0].AmortizationType);
                sb.Append("</td>");
                sb.Append("</tr>");

                string msgEmprestimoDadosBancarios = LoadMsgCustomizadas("MsgEmprestimoDadosBancarios", oParticip.IdProduto, idModulo); ;

                sb.Append("<tr >");
                sb.Append("<td colspan='2' class='tdContratoBco' style='text-align:center'>");
                sb.Append("Dados Bancários");
                sb.Append("</td>");
                sb.Append("</tr>");

                if (!String.IsNullOrEmpty(msgEmprestimoDadosBancarios))
                {
                    sb.Append("<tr >");
                    sb.Append("<td class='tdContratoBcoimpar' colspan='2' style=\"font-size:14px;\">");
                    sb.Append("<small>" + msgEmprestimoDadosBancarios + "<small>");
                    sb.Append("</td>");
                    sb.Append("</tr>");
                }


                sb.Append("<tr >");
                sb.Append("<td class='tdContratoBco' style=\"font-size:14px;width: 50%;\"> Banco </td>");
                sb.Append("<td class='tdContratoBco' style=\"font-size:14px;\">");
                sb.Append(searchContract[0].Bank);
                sb.Append("</td>");
                sb.Append("</tr>");

                sb.Append("<tr>");
                sb.Append("<td class='tdContratoBcoimpar' style=\"font-size:14px;width: 50%;\">Agência</td>");
                sb.Append("<td class='tdContratoBcoimpar' style=\"font-size:14px;\">");
                sb.Append(searchContract[0].Agency);
                sb.Append("</td>");
                sb.Append("</tr>");

                sb.Append("<tr >");
                sb.Append("<td class='tdContratoBco' style=\"font-size:14px;width: 50%;\">Conta</td>");
                sb.Append("<td class='tdContratoBco' style=\"font-size:14px;\">");
                sb.Append(searchContract[0].Account);
                sb.Append("</td>");
                sb.Append("</tr>");

                if (isNewContract)
                {
                    string idMsg = "MsgEmprestimoFinalNormal";
                    string msgEmprestimoFinal = LoadMsgCustomizadas(idMsg, oParticip.IdProduto, idModulo);

                    if (searchContract[0].LoanBay > 0)
                    {
                        //transferencia de divida carrega outra msg
                        idMsg = "MsgEmprestimoFinalTransDivida";
                        msgEmprestimoFinal = LoadMsgCustomizadas(idMsg, oParticip.IdProduto, idModulo);
                    }

                    idMsg = "MsgEmprestimoFinalSucesso";
                    string msgEmprestimoFinalSucesso = LoadMsgCustomizadas(idMsg, oParticip.IdProduto, idModulo);

                    if (!String.IsNullOrEmpty(msgEmprestimoFinal))
                    {
                        sb.Append("<tr >");
                        sb.Append("<td colspan='2' style=\"font-size:14px;\">");
                        sb.Append("Importante!<br>");
                        sb.Append(msgEmprestimoFinal);
                        sb.Append("</td>");
                        sb.Append("</tr>");
                    }
                    if (!String.IsNullOrEmpty(msgEmprestimoFinalSucesso))
                    {
                        sb.Append("<tr >");
                        sb.Append("<td colspan='2' style=\"font-size:14px;\">");
                        sb.Append(msgEmprestimoFinalSucesso);
                        sb.Append("</td>");
                        sb.Append("</tr>");
                    }
                }


                sb.Append("</tbody>");
                sb.Append("</table>");
                sb.Append("<div class=\"center dvSimuladorBtn\" >");
                sb.Append("<a class=\"btn btn-primary\" style=\"width:100px;\" onclick=\"VoltarEmprestimoEtapaI('III', " + (isNewContract == true ? "'on'" : "'no'") + ")\"> " + (isNewContract == true ? "Finalizar" : "Voltar") + "</a>");
                sb.Append("</div>");
                sb.Append("</div>");

                result = sb.ToString();
            }
            else
            {
                StringBuilder erros = new StringBuilder();
                erros.Append("<div id='dvContratoEmprestimoContent'>");
                erros.Append("<div class='aviso'>");
                erros.Append("<h4 style=';text-align:center'>Contrato não encontrado</h4>");
                erros.Append("<p>Não foi encontrado nenhum contrato de empréstimo.</p>");
                sb.Append("<div class=\"center dvSimuladorBtn\" >");
                sb.Append("<a class=\"btn btn-primary\" style=\"width:100px\" onclick=\"VoltarEmprestimoEtapaI('III', 'on')\">Voltar</a>");
                sb.Append("</div>");
                erros.Append("</div>");

                result = erros.ToString();
            }


            return result;
        }
        catch (Exception ex)
        {

            StringBuilder erros = new StringBuilder();
            erros.Append("<div id='dvContratoEmprestimoContent'>");
            erros.Append("<div class='aviso'>");
            erros.Append("<h4 style=';text-align:center'>Ocorreu um erro ao carregar os dados.</h4>");
            erros.Append("<p>Por favor, tente novamente ou entre em contato com o administrador.</p>");
            erros.Append("<div class=\"center dvSimuladorBtn\" >");
            erros.Append("<a class=\"btn btn-primary\" style=\"width:100px;\" onclick=\"VoltarEmprestimoEtapaI('III','on')\">Voltar</a>");
            erros.Append("</div>");
            erros.Append("</div>");

            result = erros.ToString();
            return result;
        }
    }


    [WebMethod]
    public static object LoadCampanha(string id)
    {
        SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();
        //DadosCadastraisParticipante p = null;
        Participante oParticip = null;
        Collection<ValorUr> oURP = null;

        Conta contaBasica = null;
        Conta contaAdicional = null;
        object result = null;
        string idParticipante = id.Replace(" ", "+");
        string basica = "";
        string adicional = "";
        string perfis = "";
        string percentualPraticado = "";
        int contaBasica_01 = 1202;
        int contaAdicional_01 = 1204;
        int contaBasica_03 = 1402;
        int contaAdicional_03 = 1404;
        decimal salarioComparacao = 0;
        decimal salarioAux = 0;
        decimal vlSalarioAtual;
        decimal valorAtualBasica = 0;
        decimal valorAtualSuplementar = 0;
        decimal vlContribAtual = 0;
        decimal vlContribOutro = 0;
        decimal vlContribAtualMoeda = 0;
        StringBuilder sb = new StringBuilder();
        StringBuilder sbPerfil = new StringBuilder();
        System.Globalization.NumberFormatInfo brazilFormatter = System.Globalization.CultureInfo.CreateSpecificCulture("pt-BR").NumberFormat;

        //<contasContrib>1204;1207</contasContrib>
        //<contasContribAuto>1404;1407;1505;1515</contasContribAuto>


        try
        {
            if (!String.IsNullOrEmpty(idParticipante))
            {

                string decryptParticip = rijndae.DecryptRijndael(idParticipante, salt);

                //p = DadosCadastraisParticipante.List(Convert.ToInt32(decryptParticip))[0];
                oParticip = new Participante(Convert.ToInt32(decryptParticip));

                if (oParticip.IdProduto == 57)
                {
                    contaBasica_01 = 1215;
                    contaAdicional_01 = 1220;
                    contaBasica_03 = 1415;
                    contaAdicional_03 = 1420;

                    oURP = ValorUr.ListUltimoValorUr(oParticip.IdProduto, oParticip.IdPlano);
                    salarioComparacao = decimal.Parse((oURP[0].ValorUr_ * 10).ToString());
                    var objPercentualSalario = oParticip.UltimoPercentualSalario;
                    var objHistoricoSalario = oParticip.HistoricoUltimoSalario;
                    vlSalarioAtual = objHistoricoSalario.SalarioContribuicao;

                    foreach (PercentualSalario tempPercentualSalario in objPercentualSalario)
                    {
                        if ((tempPercentualSalario.IdConta == contaBasica_01) || (tempPercentualSalario.IdConta == contaBasica_03))
                        {
                            if (tempPercentualSalario.IdFaixaPercent == 1)
                            {
                                //((Label)page.FindControl(contentName + "lblPercContrBasicaAtual")).Text = tempPercentualSalario.PercSalario.ToString("#0.00");
                                valorAtualBasica = tempPercentualSalario.PercSalario;
                                vlContribAtual = tempPercentualSalario.PercSalario;
                                //possuiContrBasic = true;
                            }
                            else if (tempPercentualSalario.IdFaixaPercent == 2)
                            {
                                //((Label)page.FindControl(contentName + "lblPercContribExcedente")).Text = tempPercentualSalario.PercSalario.ToString("#0.00");
                                vlContribOutro = tempPercentualSalario.PercSalario;
                                adicional = "{min:0,incremento:0.5,max:8}";

                            }
                        }
                        else if ((tempPercentualSalario.IdConta == contaAdicional_01) || (tempPercentualSalario.IdConta == contaAdicional_03))
                        {
                            //((Label)page.FindControl(contentName + "lblPercContrSuplAtual")).Text = tempPercentualSalario.PercSalario.ToString("#0.00");
                            valorAtualSuplementar = tempPercentualSalario.PercSalario;
                        }
                    }

                    #region SalarioBase > (valorUR * 10)
                    if (objHistoricoSalario == null)
                    {
                        //((Label)page.FindControl(contentName + "txtErro")).Text = "Participantes sem histório de salário não podem efetuar alteração no ajuste de contribução.</br>Favor entrar em contato com equipe de suporte!";
                        //Erro
                    }
                    else
                    {
                        decimal valorUR = oURP[0].ValorUr_;
                        Collection<ContribuicaoVoluntariaEmbraer> oContrib = ContribuicaoVoluntariaEmbraer.List(oParticip.IdProduto, oParticip.IdParticipante.ToString());
                        //salarioComparacao = decimal.Parse((oURP[0].ValorUr_ * 10).ToString());

                        if (vlSalarioAtual > salarioComparacao)
                        {
                            //info: Devemos bloqueiar a primeira faixa com percentual maximo  e habilitar o combo de percentual execendente

                            vlContribAtualMoeda = (((salarioComparacao * vlContribAtual) / 100)) + (((vlSalarioAtual - salarioComparacao) * vlContribOutro) / 100);
                        }
                        else
                        {
                            //Não exibe Excedente = 0
                            vlContribAtualMoeda = ((vlSalarioAtual * vlContribAtual) / 100);
                        }

                    }

                    sb.Append("<div class='alert alert-warning'>");
                    sb.Append("<p><strong>Contribuição atual</strong></p>");
                    sb.Append("<input type='hidden' id='hdnSalarioAtual' value='" + vlSalarioAtual.ToString().Replace(",", ".") + "' />");
                    sb.Append("<input type='hidden' id='hdnSalarioComparacao' value='" + salarioComparacao.ToString().Replace(",", ".") + "' />");
                    sb.Append("<input type='hidden' id='hdnIsExcedente' value='" + ((vlSalarioAtual > salarioComparacao) ? "1" : "0") + "' />");
                    sb.Append("<input type='hidden' id='hdnBasicaAtual' value='" + valorAtualBasica.ToString().Replace(",", ".") + "' />");
                    sb.Append("<input type='hidden' id='hdnContribAtual' value='" + vlContribAtualMoeda.ToString().Replace(",", ".") + "' />");
                    sb.Append("<input type='hidden' id='hdnExcedenteAtual' value='" + vlContribOutro.ToString().Replace(",", ".") + "' />");
                    sb.Append("<p>Sálario: <strong>" + vlSalarioAtual.ToString("C", brazilFormatter) + "</strong> </p>");
                    sb.Append("<p>Percentual (até 10 URPs): <strong>" + string.Format("{0:0.00}", valorAtualBasica) + "</strong> </p>");
                    sb.Append("<p>Percentual (acima de 10 URPs): <strong>" + string.Format("{0:0.00}", vlContribOutro) + "</strong> </p>");
                    sb.Append("<p>Contribuição <strong>" + vlContribAtualMoeda.ToString("C", brazilFormatter) + "</strong> </p>");
                    sb.Append("</div>");

                    if (oParticip.Situacao == "03")
                    {
                        sb.Append("<div class='alert alert-info' style='color: #fff;'><strong>IMPORTANTE: </strong><p>Considerando a situação de autopatrocínio, o Participante contribuirá também com o valor de contribuição mensal da Patrocinadora.</p></div>");
                    }

                    //Perfil Embraer
                    Collection<TermoPerfilDeInvestimento> Perfil = TermoPerfilDeInvestimento.List(oParticip.IdParticipante);


                    if (Perfil.Count > 0)
                    {
                        //rbConservador.Checked = (Perfil[0].TipoOpcao == "C");
                        //rbConvencional.Checked = (Perfil[0].TipoOpcao == "E");
                        //rbArrojado.Checked = (Perfil[0].TipoOpcao == "A");
                        string perfil = "";

                        switch (Perfil[0].TipoOpcao.Trim())
                        {
                            case "C": perfil = "CONSERVADOR"; break;
                            case "E": perfil = "CONVENCIONAL"; break;
                            case "A": perfil = "ARROJADO"; break;
                        }
                        if (!String.IsNullOrEmpty(perfil))
                            sbPerfil.Append("<input type='hidden' id='hdnPerfilPraticado' value='" + perfil + "' />");
                    }

                    sbPerfil.Append("<div id='dvCampanhaPerfilC' class='dvCampanhaPerfil' >");
                    sbPerfil.Append("<div class='progress' >");
                    sbPerfil.Append("<div class='progress-bar progress-bar-success' style='width: 100%;background: #00a19c;'>");
                    sbPerfil.Append("<span>100% RF</span> </div></div>");
                    sbPerfil.Append("</div>");
                    sbPerfil.Append("<div id='dvCampanhaPerfilE' class='dvCampanhaPerfil' >");
                    sbPerfil.Append("<div class='progress' >");
                    sbPerfil.Append("<div class='progress-bar progress-bar-success' style='width:  80%;background: #00a19c;'>");
                    sbPerfil.Append("<span>80% RF</span> </div>");
                    sbPerfil.Append("<div class='progress-bar progress-bar-danger' style='width: 20%;background: #a7574a;'>");
                    sbPerfil.Append("<span>20% RV</span></div> </div></div>");
                    sbPerfil.Append("</div>");
                    sbPerfil.Append("<div id='dvCampanhaPerfilA' class='dvCampanhaPerfil'>");
                    sbPerfil.Append("<div class='progress'>");
                    sbPerfil.Append("<div class='progress-bar progress-bar-success' style='width: 60%;background: #00a19c;'>");
                    sbPerfil.Append("<span>60% RF</span> </div>");
                    sbPerfil.Append("<div class='progress-bar progress-bar-danger' style='width: 40%;background: #a7574a;'>");
                    sbPerfil.Append("<span>40% RV</span></div> </div></div>");
                    sbPerfil.Append("</div>");

                    sbPerfil.Append("<div class='alert alert-warning'>");
                    sbPerfil.Append("<p>• A opção por um novo Perfil de Investimento não alterará o valor em reais (R$) do saldo de conta do Participante ou da Conta Identificada de Benefício do Assistido. Entretanto, devido às diferenças de valor entre as cotas de cada Perfil de Investimento, o saldo em cotas poderá sofrer alteração.<br /><br />• Conforme consta na Política de Investimento da EMBRAER PREV, a alocação dos recursos nos perfis CONVENCIONAL e ARROJADO poderá variar para mais ou para menos, dependendo da estratégia de investimento, adotada pela EMBRAER PREV.<br /><br /><input type='checkbox' name='termos' value='Accept' style='transform: scale(1.7);margin: 5px;'> Declaro ter lido e entendido a <b><u><a href='https://www.embraerprev.com.br/portal/Downloads/Embraerprev/PoliticaInvestimento/EMBRAERPREV-Politica_de_Investimento-2019_a_2023.pdf' target='_blank'>Política de Investimento da EMBRAER PREV</a></u></b> e o <b><u><a href='https://www.embraerprev.com.br/portal/Downloads/Embraerprev/Manual/ManualOperacional.pdf' target='_blank'>Manual de Operacionalização dos Perfis de Investimento EMBRAER PREV</a></u></b> e estou de acordo com as observações acima.</p>");
                    sbPerfil.Append("</div>");



                    //Corrigir código conta excedente
                    switch (oParticip.Situacao)
                    {
                        case "01":
                            contaBasica = Conta.Get(contaBasica_01, oParticip.IdParticipante, oParticip.IdPlano, oParticip.IdProduto, Convert.ToByte(false));
                            basica = "{min:" + contaBasica.PercMin.ToString("#0") + ",incremento:" + contaBasica.Incremento.ToString("#0") + ",max:" + contaBasica.PercMax.ToString("#0") + "}";
                            perfis = "{perfis:\"<option value='0'>Selecione</option><option value='C'>CONSERVADOR</option><option value='E'>CONVENCIONAL</option><option value='A'>ARROJADO</option>\"}";

                            break;
                        case "03":
                            contaBasica = Conta.Get(contaBasica_03, oParticip.IdParticipante, oParticip.IdPlano, oParticip.IdProduto, Convert.ToByte(true));
                            basica = "{min:" + contaBasica.PercMin.ToString("#0") + ",incremento:" + contaBasica.Incremento.ToString("#0") + ",max:" + contaBasica.PercMax.ToString("#0") + "}";
                            perfis = "{perfis:\"<option value='0'>Selecione</option><option value='C'>CONSERVADOR</option><option value='E'>CONVENCIONAL</option><option value='A'>ARROJADO</option>\"}";

                            break;
                        case "09":
                            perfis = "{perfis:\"<option value='0'>Selecione</option><option value='C'>CONSERVADOR</option><option value='E'>CONVENCIONAL</option>\"}";
                            break;
                        default:
                            perfis = "{perfis:\"<option value='0'>Selecione</option><option value='C'>CONSERVADOR</option><option value='E'>CONVENCIONAL</option><option value='A'>ARROJADO</option>\"}";
                            break;
                    }
                    #endregion
                }
                else if (oParticip.IdProduto == 33)
                {
                    contaBasica_01 = 1207;
                    contaAdicional_01 = 1204;
                    contaBasica_03 = 1407;
                    contaAdicional_03 = 1404;
                    decimal fixoContribPatroc = 5.0M;
                    int quantityURs = 7;

                    var contrib = ContribuicaoVoluntaria.ListParticipante(oParticip.IdParticipante);
                    string percentualPraticado1204 = "0";
                    string percentualPraticado1207 = "0";
                    if (contrib.Count > 0)
                    {
                        foreach (ContribuicaoVoluntaria _getContrib in contrib)
                        {
                            if (_getContrib.IdConta.Equals(contaBasica_01) || _getContrib.IdConta.Equals(contaBasica_03))
                            {
                                percentualPraticado1207 = _getContrib.Percentual.ToString("#0");

                            }
                            else if (_getContrib.IdConta.Equals(contaAdicional_01) || _getContrib.IdConta.Equals(contaAdicional_03))
                            {
                                percentualPraticado1204 = _getContrib.Percentual.ToString("#0");
                            }
                        }
                    }
                    else
                    {

                        foreach (PercentualSalario _getContrib in PercentualSalario.ListUltimoAnomes(oParticip.IdParticipante, oParticip.IdProduto))
                        {
                            if ((_getContrib.IdConta.Equals(contaBasica_01) || _getContrib.IdConta.Equals(contaBasica_03)) && _getContrib.IdFaixaPercent.Equals(1))
                            {
                                percentualPraticado1207 = _getContrib.PercSalario.ToString("#0");
                            }
                            else if ((_getContrib.IdConta.Equals(contaAdicional_01) || _getContrib.IdConta.Equals(contaAdicional_03)) && _getContrib.IdFaixaPercent.Equals(1))
                            {
                                percentualPraticado1204 = _getContrib.PercSalario.ToString("#0");
                            }
                        }
                    }

                    oURP = ValorUr.ListUltimoValorUr(oParticip.IdProduto, oParticip.IdPlano);
                    salarioComparacao = decimal.Parse((oURP[0].ValorUr_ * quantityURs).ToString());
                    var objPercentualSalario = oParticip.UltimoPercentualSalario;
                    var objHistoricoSalario = oParticip.HistoricoUltimoSalario;
                    vlSalarioAtual = objHistoricoSalario.SalarioContribuicao;
                    decimal parcela1207 = (vlSalarioAtual > salarioComparacao) ? ((vlSalarioAtual - salarioComparacao) * Convert.ToDecimal(percentualPraticado1207)) / 100 : 0.0M;
                    decimal parcela1204 = (vlSalarioAtual * Convert.ToDecimal(percentualPraticado1204)) / 100;
                    decimal parcelaPatroc = ((vlSalarioAtual - salarioComparacao) * fixoContribPatroc) / 100;

                    decimal totalParticipante = parcela1207 + parcela1204;
                    decimal totalPatrocinadora = (vlSalarioAtual > salarioComparacao) ? parcelaPatroc + parcela1207 : 0.0M;

                    decimal valorUrp = oURP[0].ValorUr_;

                    sb.Append("<div class='alert alert-info'>");
                    sb.Append("<p><strong>Atualmente praticado</strong></p>");
                    sb.Append("<input type='hidden' id='hdnURP' value='" + valorUrp.ToString().Replace(",", ".") + "' />");
                    sb.Append("<input type='hidden' id='hdnSalarioComparacao' value='" + salarioComparacao.ToString().Replace(",", ".") + "' />");
                    sb.Append("<input type='hidden' id='hdnSalarioAtual' value='" + vlSalarioAtual.ToString().Replace(",", ".") + "' />");
                    sb.Append("<input type='hidden' id='hdnIsExcedente' value='" + ((vlSalarioAtual > salarioComparacao) ? "1" : "0") + "' />");
                    sb.Append("<p>Contribuição Suplementar: <strong>" + string.Format("{0:0.00}", parcela1207) + "</strong> </p>");
                    sb.Append("<p>Contribuição Adicional: <strong>" + string.Format("{0:0.00}", parcela1204) + "</strong> </p>");
                    sb.Append("<p>Total Participante: <strong>" + string.Format("{0:0.00}", totalParticipante) + "</strong> </p>");
                    sb.Append("<p>Total Patrocinadora: <strong>" + string.Format("{0:0.00}", totalPatrocinadora) + "</strong> </p>");
                    sb.Append("</div>");

                    switch (oParticip.Situacao)
                    {
                        case "01":
                            basica = "{min:0,incremento:0.5,max:5}";
                            adicional = "{min:0,incremento:0.5,max:20}";
                            //perfis = "{perfis:\"" + cbPerfisDisponiveis + "\"}";
                            percentualPraticado = "{percentualPraticado:[\"" + percentualPraticado1207 + "\", \"" + percentualPraticado1204 + "\"]}";
                            break;
                        case "03":
                            basica = "{min:0,incremento:0.5,max:5}";
                            adicional = "{min:0,incremento:0.5,max:20}";
                            //perfis = "{perfis:\"" + cbPerfisDisponiveis + "\"}";
                            percentualPraticado = "{percentualPraticado:[\"" + percentualPraticado1207 + "\", \"" + percentualPraticado1204 + "\"]}";
                            break;
                        default:
                            //perfis = "{perfis:\"" + cbPerfisDisponiveis + "\"}";
                            break;
                    }
                }
                else if (oParticip.IdProduto == 62)
                {
                    //string percentualPraticado
                    //Carregar informaçoes de contribuição 
                    var list = DadosParticipanteCampanha.List(oParticip.IdParticipante);
                    string cbPerfisDisponiveis = "<option value='0'>Selecione</option><option value='SC'>Superconservador</option><option value='CO'>Conservador</option><option value='MO'>Moderado</option><option value='AG'>Agressivo</option><option value='SA'>Superagressivo</option><option value='CV'>Ciclo de Vida</option>";
                    adicional = "{min:0,incremento:0,max:0}";
                    perfis = "{perfis:\"" + cbPerfisDisponiveis + "\"}";

                    decimal percentualcontrib = 0;
                    string alertMsg = "";


                    sb.Append("<div class='alert alert-info'>");
                    sb.Append("<p><strong>Atualmente praticado</strong></p>");

                    if (oParticip.IdPlano == 622)
                    {
                        bool basicaGebsaRegra = list[0].Classificacao == "NORMAL" ? true : false;
                        alertMsg = basicaGebsaRegra ? "" : "Você não é elegível a alteração do percentual de contribuição básica. Em caso de dúvidas contate a equipe de atendimento através do e-mail: <b>gebsaprev@ge.com</b>.";
                        //sb.Append("<input type='hidden' id='hdnClassificacao' value='" + list[0].Classificacao + "' />");
                        percentualcontrib = list[0].PercentCtr0Fx1;
                        basica = "{min:1,incremento:1,max:5}";
                        //adicional = "{min:0,incremento:0.5,max:20}";
                        //perfis = "{perfis:\"" + cbPerfisDisponiveis + "\"}";
                        percentualPraticado = "{percentualPraticado:[\"" + percentualcontrib.ToString() + "\", \"" + 0 + "\"]}";
                    }
                    else if (oParticip.IdPlano == 624)
                    {
                        bool basicaAlstomRegra = Convert.ToDecimal(list[0].Salario) > (Convert.ToDecimal(list[0].ValorUR) * 35.0M);
                        alertMsg = basicaAlstomRegra ? "" : "Você não é elegível a alteração do percentual de contribuição básica. Em caso de dúvidas contate a equipe de atendimento através do e-mail: <b>gebsaprev@ge.com</b>.";
                        //sb.Append("<input type='hidden' id='hdnRegraAlstom' value='" + basicaAlstomRegra + "' />");
                        percentualcontrib = list[0].PercentCtr0Fx3;
                        basica = "{min:5,incremento:0.5,max:7.5}";
                        //adicional = "{min:0,incremento:0.5,max:20}";
                        //perfis = "{perfis:\"" + cbPerfisDisponiveis + "\"}";
                        percentualPraticado = "{percentualPraticado:[\"" + percentualcontrib.ToString() + "\", \"" + 0 + "\"]}";
                    }

                    sb.Append("<p>Contribuição Básica: <strong>" + string.Format("{0:0.00}", percentualcontrib) + "</strong> </p>");

                    sb.Append("</div>");
                    if (!String.IsNullOrEmpty(alertMsg))
                    {
                        sb.Append("<input type='hidden' id='hdnHabilitaCampanha' value='0' />");
                        sb.Append("<div class='alert alert-danger' style='color: #a94442;background-color: #f2dede;border-color: #ebccd1;'>");
                        sb.Append("<p>" + alertMsg + "</p>");
                        sb.Append("</div>");
                    }

                    Collection<TermoPerfilDeInvestimento> Perfil = TermoPerfilDeInvestimento.List(oParticip.IdParticipante);


                    if (Perfil.Count > 0 && Perfil != null)
                    {

                        string _dtAlteracao = string.Empty;
                        string _dtPeriodoIni = string.Empty;
                        string _dtPeriodofin = string.Empty;
                        string _perfilTipoOpcao = string.Empty;
                        string _perfilParticipante = string.Empty;
                        string perfil = string.Empty;

                        switch (Perfil[0].TipoOpcao.Trim())
                        {
                            case "SC": perfil = "Superconservador"; break;
                            case "CO": perfil = "Conservador"; break;
                            case "MO": perfil = "Moderado"; break;
                            case "AG": perfil = "Agressivo"; break;
                            case "SA": perfil = "Superagressivo"; break;
                            case "CV": perfil = "Ciclo de Vida"; break;
                        }
                        if (!String.IsNullOrEmpty(perfil))
                            sbPerfil.Append("<input type='hidden' id='hdnPerfilPraticado' value='" + perfil + "' />");

                        //Valida se participou da campanha
                        _dtAlteracao = Perfil[0].DtAlteracao.ToString("dd/MM/yyyy");
                        _perfilTipoOpcao = Perfil[0].TipoOpcao.ToString();
                        _dtPeriodoIni = "01/09/2019";
                        _dtPeriodofin = "27/02/2020";

                        string AlertMsgPerfil = Convert.ToDateTime(_dtAlteracao) >= Convert.ToDateTime(_dtPeriodoIni) && Convert.ToDateTime(_dtAlteracao) <= Convert.ToDateTime(_dtPeriodofin) ? "Prezado participante, identificamos que você realizou a alteração do seu perfil de investimento em Janeiro/2020, desta forma não é possível seguir com a sua solicitação. Em caso de dúvidas contate a equipe de atendimento da GEBSAPrev." : "";

                        if (!String.IsNullOrEmpty(AlertMsgPerfil))
                        {
                            sbPerfil.Append("<input type='hidden' id='hdnHabilitaCampanhaPerfil' value='0' />");
                            sbPerfil.Append("<div class='alert alert-danger' style='color: #a94442;background-color: #f2dede;border-color: #ebccd1;'>");
                            sbPerfil.Append("<p>" + AlertMsgPerfil + "</p>");
                            sbPerfil.Append("</div>");
                        }

                        Collection<ParticipanteSaldoHistorico> PerfilParticipante = ParticipanteSaldoHistorico.ListHistorico(oParticip.IdParticipante, "202003", "202003");


                        if (PerfilParticipante != null && PerfilParticipante.Count > 0)
                        {
                            _perfilParticipante = PerfilParticipante[0].SiglaQuota.ToString();
                            _dtPeriodoIni = "02/03/2020";
                            _dtPeriodofin = "31/03/2020";

                            if (Convert.ToDateTime(_dtAlteracao) >= Convert.ToDateTime(_dtPeriodoIni) && Convert.ToDateTime(_dtAlteracao) <= Convert.ToDateTime(_dtPeriodofin))
                            {
                                string AlertMsgPerfilParticipante = _perfilParticipante != _perfilTipoOpcao ? "Prezado participante, identificamos que você realizou a alteração do seu perfil de investimento em Março/2020, desta forma não é possível seguir com a sua solicitação. Em caso de dúvidas contate a equipe de atendimento da GEBSAPrev." : "";

                                if (!String.IsNullOrEmpty(AlertMsgPerfilParticipante))
                                {
                                    sbPerfil.Append("<input type='hidden' id='hdnHabilitaCampanhaPerfil' value='0' />");
                                    sbPerfil.Append("<div class='alert alert-danger' style='color: #a94442;background-color: #f2dede;border-color: #ebccd1;'>");
                                    sbPerfil.Append("<p>" + AlertMsgPerfilParticipante + "</p>");
                                    sbPerfil.Append("</div>");
                                }
                            }
                        }

                    }


                    sbPerfil.Append("<div id='dvCampanhaPerfilCV' class='dvCampanhaPerfil' >");
                    sbPerfil.Append("<div class='alert alert-warning'>");
                    sbPerfil.Append("<p>Perfil Ciclo de Vida: Participantes que efetuarem a opção pelo Perfil Ciclo de Vida serão alocados nos respectivos perfis de acordo com sua idade. Veja tabela abaixo:</p>");

                    sbPerfil.Append("<table class='table table-bordered table-personal text-center'><tr><th class='text-center'>Faixa etária(anos)</th><th class='text-center'>Perfil de Investimento</th></tr><tr><td>A partir de 62 anos</td><td>Superconservador</td></tr><tr><td>57 a 61</td><td>Conservador</td></tr><tr><td>50 a 56</td><td>Moderado</td></tr><tr><td>40 a 49</td><td>Agressivo</td></tr><tr><td>Abaixo de 39</td><td>Superagressivo</td></tr></table>");

                    sbPerfil.Append("</div>");
                    sbPerfil.Append("</div>");

                    sbPerfil.Append("<div class='alert alert-warning' id='dvAlertWarning'>");
                    sbPerfil.Append("<p>O Novo Perfil de Investimento passa a valer a partir de Abril/2020. Clique em Gravar para efetivar a sua alteração.</p>");
                    sbPerfil.Append("</div>");

                }
                else
                {
                    string cbPerfisDisponiveis = "<option value='0'>Selecione</option><option value='SC'>SUPER CONSERVADOR</option><option value='CO'>CONSERVADOR</option><option value='MO'>MODERADO</option><option value='AG'>AGRESSIVO</option>";
                    TermoPerfilDeInvestimento perfilAtual = TermoPerfilDeInvestimento.Get(oParticip.IdParticipante);
                    try
                    {
                        cbPerfisDisponiveis = cbPerfisDisponiveis.Contains(perfilAtual.TipoOpcao) ? cbPerfisDisponiveis.Replace(perfilAtual.TipoOpcao + "'", perfilAtual.TipoOpcao + "' selected ") : cbPerfisDisponiveis;
                    }
                    catch { }

                    #region Bind as Contribuições
                    var contrib = ContribuicaoVoluntaria.ListParticipante(oParticip.IdParticipante);
                    string percentualPraticado1202 = "0";
                    string percentualPraticado1204 = "0";

                    if (contrib.Count > 0)
                    {
                        foreach (ContribuicaoVoluntaria _getContrib in contrib)
                        {
                            if (_getContrib.IdConta.Equals(1202) || _getContrib.IdConta.Equals(1402))
                            {
                                percentualPraticado1202 = _getContrib.Percentual.ToString("#0");

                            }
                            else if (_getContrib.IdConta.Equals(1204) || _getContrib.IdConta.Equals(1404))
                            {
                                percentualPraticado1204 = _getContrib.Percentual.ToString("#0");
                            }
                        }
                    }
                    else
                    {

                        foreach (PercentualSalario _getContrib in PercentualSalario.ListUltimoAnomes(oParticip.IdParticipante, oParticip.IdProduto))
                        {
                            if ((_getContrib.IdConta.Equals(1202) || _getContrib.IdConta.Equals(1402)) && _getContrib.IdFaixaPercent.Equals(1))
                            {
                                percentualPraticado1202 = _getContrib.PercSalario.ToString("#0");
                            }
                            else if ((_getContrib.IdConta.Equals(1204) || _getContrib.IdConta.Equals(1404)) && _getContrib.IdFaixaPercent.Equals(1))
                            {
                                percentualPraticado1204 = _getContrib.PercSalario.ToString("#0");
                            }
                        }
                    }
                    #endregion



                    switch (oParticip.Situacao)
                    {

                        case "01":
                            contaBasica = Conta.Get(contaBasica_01, oParticip.IdParticipante, oParticip.IdPlano, oParticip.IdProduto, Convert.ToByte(false));
                            contaAdicional = Conta.Get(contaAdicional_01, oParticip.IdParticipante, oParticip.IdPlano, oParticip.IdProduto, Convert.ToByte(false));
                            basica = "{min:" + contaBasica.PercMin.ToString("#0") + ",incremento:" + contaBasica.Incremento.ToString("#0") + ",max:" + contaBasica.PercMax.ToString("#0") + "}";
                            adicional = "{min:" + contaAdicional.PercMin.ToString("#0") + ",incremento:" + contaAdicional.Incremento.ToString("#0") + ",max:" + contaAdicional.PercMax.ToString("#0") + "}";
                            perfis = "{perfis:\"" + cbPerfisDisponiveis + "\"}";
                            percentualPraticado = "{percentualPraticado:[\"" + percentualPraticado1202 + "\", \"" + percentualPraticado1204 + "\"]}";
                            break;
                        case "03":
                            contaBasica = Conta.Get(contaBasica_03, oParticip.IdParticipante, oParticip.IdPlano, oParticip.IdProduto, Convert.ToByte(true));
                            contaAdicional = Conta.Get(contaAdicional_03, oParticip.IdParticipante, oParticip.IdPlano, oParticip.IdProduto, Convert.ToByte(true));
                            basica = "{min:" + contaBasica.PercMin.ToString("#0") + ",incremento:" + contaBasica.Incremento.ToString("#0") + ",max:" + contaBasica.PercMax.ToString("#0") + "}";
                            adicional = "{min:" + contaAdicional.PercMin.ToString("#0") + ",incremento:" + contaAdicional.Incremento.ToString("#0") + ",max:" + contaAdicional.PercMax.ToString("#0") + "}";
                            perfis = "{perfis:\"" + cbPerfisDisponiveis + "\"}";
                            percentualPraticado = "{percentualPraticado:[\"" + percentualPraticado1202 + "\", \"" + percentualPraticado1204 + "\"]}";
                            break;
                        default:
                            perfis = "{perfis:\"" + cbPerfisDisponiveis + "\"}";
                            break;
                    }
                }


                //carregar fonte de dados para os perfis
                //perfis = "{}";
                if ((!string.IsNullOrEmpty(basica) && !string.IsNullOrEmpty(adicional)) || !string.IsNullOrEmpty(perfis))
                    result = new { Basica = basica, Adicional = adicional, Info = "{html:\"" + sb.ToString() + "\"}", Perfil = perfis, PerfilInfo = "{html:\"" + sbPerfil.ToString() + "\"}", PercentualPraticado = percentualPraticado };


                #region SaveLog

                LogAcessoPortal log = new LogAcessoPortal() { IdProduto = oParticip.IdProduto, IdPlano = oParticip.IdPlano, IdSessao = Plataforma, UserName = oParticip.Users_.UserName, DescAcesso = "Mobile - Campanha" };
                LogAcessoPortal.Save(log);
                #endregion

            }

            return result;
        }
        catch (Exception)
        {

            return result;
        }
    }

    [WebMethod]
    public static string SendPercentualContrib(string id, string basica, string basicaAtual, string adicional, string adicionalAtual, string isExcedente, string vlContribAtual, string vlNovaContrib, string vlContribAB)
    {

        SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();
        DadosCadastraisParticipante p = null;
        ContribuicaoVoluntaria oCtrParticipante = null;
        Participante oParticip = null;
        string msgReturn = "";
        string idParticipante = id.Replace(" ", "+");
        StringBuilder sTags = new StringBuilder();
        string email = string.Empty;
        string copyRecipients = string.Empty;
        try
        {
            if (!String.IsNullOrEmpty(idParticipante))
            {
                string decryptParticip = rijndae.DecryptRijndael(idParticipante, salt);


                p = DadosCadastraisParticipante.List(Convert.ToInt32(decryptParticip))[0];

                oParticip = new Participante(Convert.ToInt32(decryptParticip));

                int contaBasica_01 = 1202;
                int contaAdicional_01 = 1204;
                int contaBasica_03 = 1402;
                int contaAdicional_03 = 1404;

                //string vlContribAtual = string.Empty;
                //string vlNovaContrib = string.Empty;
                //string vlContribAB = string.Empty;
                //string ctrBasicaAtual = string.Empty;
                string txtPercEscolhidoBasica = "Percentual escolhido na Básica:";
                string txtPercEscolhidoAdicional = "Percentual escolhido na Adicional:";

                if (oParticip.IdProduto == 57)
                {
                    contaBasica_01 = 1215;
                    contaAdicional_01 = 1220;
                    contaBasica_03 = 1415;
                    contaAdicional_03 = 1420;
                    basica = basica.Replace('.', ',');
                    adicional = adicional.Replace('.', ',');
                    txtPercEscolhidoBasica = "Percentual de Contribuição Mensal (até 10 URPs):";
                    txtPercEscolhidoAdicional = "Percentual de Contribuição Mensal (acima de 10 URPs):";

                    decimal contribuicaoExcedente = Convert.ToDecimal(adicional);
                    decimal contribuicaoExcedenteOriginal = Convert.ToDecimal(adicionalAtual.Replace('.', ','));
                    decimal contribBasicaAtual = Convert.ToDecimal(basicaAtual.Replace('.', ','));
                    vlContribAtual = vlContribAtual.Replace('.', ',');



                    oCtrParticipante = new ContribuicaoVoluntaria()
                    {
                        IdEntidade = oParticip.IdProduto,
                        IdParticipante = oParticip.IdParticipante,
                        IdConta = oParticip.Situacao.Equals("01") ? contaBasica_01 : contaBasica_03,
                        NomeParticipante = oParticip.NomeParticip.ToUpper(),
                        Percentual = decimal.Parse(basica),
                        SolicitanteAdmin = "N",
                        Solicitante = String.Concat(oParticip.IdProduto.ToString("0000"), oParticip.Cpf),
                        PercentualOriginal = contribBasicaAtual,//decimal.Parse(hfPercConta1202.Value),//analisar
                        PercentualExcedenteOriginal = contribuicaoExcedenteOriginal,
                        PercentualExcedente = contribuicaoExcedente,
                        Percentual3Original = 0.00M,
                        Percentual3 = 0.00M,
                        VlContribAB = vlContribAB,
                        VlContribAtual = vlContribAtual,
                        VlNovaContrib = vlNovaContrib


                    };
                    oCtrParticipante.Sequencia = Convert.ToInt32(oCtrParticipante.Add());
                }
                else if (oParticip.IdProduto == 33)
                {
                    contaBasica_01 = 1207;
                    contaAdicional_01 = 1204;
                    contaBasica_03 = 1407;
                    contaAdicional_03 = 1404;

                    txtPercEscolhidoBasica = "Percentual escolhido na Suplementar:";
                    txtPercEscolhidoAdicional = "Percentual escolhido na Adicional:";
                    basica = basica.Replace('.', ',');
                    adicional = adicional.Replace('.', ',');

                    decimal contribuicaoSuplementar = Convert.ToDecimal(basica);
                    decimal contribuicaoAdicional = Convert.ToDecimal(adicional);


                    var contrib = ContribuicaoVoluntaria.ListParticipante(oParticip.IdParticipante);
                    string percentualPraticado1204 = "0";
                    string percentualPraticado1207 = "0";
                    if (contrib.Count > 0)
                    {
                        foreach (ContribuicaoVoluntaria _getContrib in contrib)
                        {
                            if (_getContrib.IdConta.Equals(contaBasica_01) || _getContrib.IdConta.Equals(contaBasica_03))
                            {
                                percentualPraticado1207 = _getContrib.Percentual.ToString("#0");

                            }
                            else if (_getContrib.IdConta.Equals(contaAdicional_01) || _getContrib.IdConta.Equals(contaAdicional_03))
                            {
                                percentualPraticado1204 = _getContrib.Percentual.ToString("#0");
                            }
                        }
                    }
                    else
                    {

                        foreach (PercentualSalario _getContrib in PercentualSalario.ListUltimoAnomes(oParticip.IdParticipante, oParticip.IdProduto))
                        {
                            if ((_getContrib.IdConta.Equals(contaBasica_01) || _getContrib.IdConta.Equals(contaBasica_03)) && _getContrib.IdFaixaPercent.Equals(1))
                            {
                                percentualPraticado1207 = _getContrib.PercSalario.ToString("#0");
                            }
                            else if ((_getContrib.IdConta.Equals(contaAdicional_01) || _getContrib.IdConta.Equals(contaAdicional_03)) && _getContrib.IdFaixaPercent.Equals(1))
                            {
                                percentualPraticado1204 = _getContrib.PercSalario.ToString("#0");
                            }
                        }
                    }
                    //Suplementar
                    oCtrParticipante = new ContribuicaoVoluntaria()
                    {
                        IdEntidade = oParticip.IdProduto,
                        IdParticipante = oParticip.IdParticipante,
                        IdConta = oParticip.Situacao.Equals("01") ? contaBasica_01 : contaBasica_03,
                        NomeParticipante = oParticip.NomeParticip.ToUpper(),
                        Percentual = contribuicaoSuplementar,
                        SolicitanteAdmin = "N",
                        Solicitante = String.Concat(oParticip.IdProduto.ToString("0000"), oParticip.Cpf),
                        PercentualOriginal = decimal.Parse(percentualPraticado1207),
                        PercentualExcedenteOriginal = 0.00M,
                        PercentualExcedente = 0.00M,
                        Percentual3Original = 0.00M,
                        Percentual3 = 0.00M

                    };
                    oCtrParticipante.Sequencia = Convert.ToInt32(oCtrParticipante.Add());

                    //Adicional 1204
                    oCtrParticipante = new ContribuicaoVoluntaria()
                    {
                        IdEntidade = oParticip.IdProduto,
                        IdParticipante = oParticip.IdParticipante,
                        IdConta = oParticip.Situacao.Equals("01") ? contaAdicional_01 : contaAdicional_03,
                        NomeParticipante = oParticip.NomeParticip.ToUpper(),
                        Percentual = contribuicaoAdicional,
                        SolicitanteAdmin = "N",
                        Solicitante = String.Concat(oParticip.IdProduto.ToString("0000"), oParticip.Cpf),
                        PercentualOriginal = decimal.Parse(percentualPraticado1204),
                        PercentualExcedenteOriginal = 0.00M,
                        PercentualExcedente = 0.00M,
                        Percentual3Original = 0.00M,
                        Percentual3 = 0.00M
                    };

                    oCtrParticipante.Sequencia = Convert.ToInt32(oCtrParticipante.Add());

                }
                else if (oParticip.IdProduto == 62)
                {
                    #region Atualiza as Contribuições
                    var list = DadosParticipanteCampanha.List(oParticip.IdParticipante);
                    contaBasica_01 = 1202;
                    contaBasica_03 = 1402;

                    //Basica
                    bool isPlanoGebsa = oParticip.IdPlano == 622;
                    basica = basica.Replace('.', ',');

                    oCtrParticipante = new ContribuicaoVoluntaria();
                    oCtrParticipante.IdEntidade = oParticip.IdProduto;
                    oCtrParticipante.IdParticipante = oParticip.IdParticipante;
                    oCtrParticipante.IdConta = oParticip.Situacao.Equals("01") ? contaBasica_01 : contaBasica_03;
                    oCtrParticipante.NomeParticipante = oParticip.NomeParticip.ToUpper();
                    oCtrParticipante.Percentual = (isPlanoGebsa) ? decimal.Parse(basica) : list[0].PercentCtr0Fx1;
                    oCtrParticipante.SolicitanteAdmin = "N";
                    oCtrParticipante.Solicitante = String.Concat(oParticip.IdProduto.ToString("0000"), oParticip.Cpf);
                    oCtrParticipante.PercentualOriginal = list[0].PercentCtr0Fx1;
                    oCtrParticipante.PercentualExcedenteOriginal = 0.00M;
                    oCtrParticipante.PercentualExcedente = 0.00M;
                    oCtrParticipante.Percentual3Original = list[0].PercentCtr0Fx3;
                    oCtrParticipante.Percentual3 = (isPlanoGebsa) ? list[0].PercentCtr0Fx3 : decimal.Parse(basica);

                    oCtrParticipante.Sequencia = Convert.ToInt32(oCtrParticipante.Add());
                    #endregion
                }
                else
                {
                    #region Atualiza as Contribuições
                    var contrib = ContribuicaoVoluntaria.ListParticipante(oParticip.IdParticipante);
                    string percentualPraticado1202 = "0";
                    string percentualPraticado1204 = "0";

                    if (contrib.Count > 0)
                    {
                        foreach (ContribuicaoVoluntaria _getContrib in contrib)
                        {
                            if (_getContrib.IdConta.Equals(1202) || _getContrib.IdConta.Equals(1402))
                            {
                                percentualPraticado1202 = _getContrib.Percentual.ToString("#0");


                            }
                            else if (_getContrib.IdConta.Equals(1204) || _getContrib.IdConta.Equals(1404))
                            {
                                percentualPraticado1204 = _getContrib.Percentual.ToString("#0");
                            }
                        }
                    }
                    else
                    {

                        foreach (PercentualSalario _getContrib in PercentualSalario.ListUltimoAnomes(oParticip.IdParticipante, oParticip.IdProduto))
                        {
                            if ((_getContrib.IdConta.Equals(1202) || _getContrib.IdConta.Equals(1402)) && _getContrib.IdFaixaPercent.Equals(1))
                            {
                                percentualPraticado1202 = _getContrib.PercSalario.ToString("#0");
                            }
                            else if ((_getContrib.IdConta.Equals(1204) || _getContrib.IdConta.Equals(1404)) && _getContrib.IdFaixaPercent.Equals(1))
                            {
                                percentualPraticado1204 = _getContrib.PercSalario.ToString("#0");
                            }
                        }
                    }
                    //Basica
                    oCtrParticipante = new ContribuicaoVoluntaria()
                    {
                        IdEntidade = oParticip.IdProduto,
                        IdParticipante = oParticip.IdParticipante,
                        IdConta = oParticip.Situacao.Equals("01") ? contaBasica_01 : contaBasica_03,
                        NomeParticipante = oParticip.NomeParticip.ToUpper(),
                        Percentual = decimal.Parse(basica),
                        SolicitanteAdmin = "N",
                        Solicitante = String.Concat(oParticip.IdProduto.ToString("0000"), oParticip.Cpf),
                        PercentualOriginal = decimal.Parse(percentualPraticado1202),
                        PercentualExcedenteOriginal = 0.00M,
                        PercentualExcedente = 0.00M,
                        Percentual3Original = 0.00M,
                        Percentual3 = 0.00M

                    };
                    oCtrParticipante.Sequencia = Convert.ToInt32(oCtrParticipante.Add());

                    //Adicional 1204
                    oCtrParticipante = new ContribuicaoVoluntaria()
                    {
                        IdEntidade = oParticip.IdProduto,
                        IdParticipante = oParticip.IdParticipante,
                        IdConta = oParticip.Situacao.Equals("01") ? contaAdicional_01 : contaAdicional_03,
                        NomeParticipante = oParticip.NomeParticip.ToUpper(),
                        Percentual = decimal.Parse(adicional),
                        SolicitanteAdmin = "N",
                        Solicitante = String.Concat(oParticip.IdProduto.ToString("0000"), oParticip.Cpf),
                        PercentualOriginal = decimal.Parse(percentualPraticado1204),
                        PercentualExcedenteOriginal = 0.00M,
                        PercentualExcedente = 0.00M,
                        Percentual3Original = 0.00M,
                        Percentual3 = 0.00M
                    };

                    oCtrParticipante.Sequencia = Convert.ToInt32(oCtrParticipante.Add());



                    #endregion
                }

                #region SaveLog

                LogAcessoPortal log = new LogAcessoPortal() { IdProduto = oParticip.IdProduto, IdPlano = oParticip.IdPlano, IdSessao = Plataforma, UserName = oParticip.Users_.UserName, DescAcesso = "Mobile - Alterou Percentual" };
                LogAcessoPortal.Save(log);
                #endregion



                //sendEmail();
                // Retorna os protocolos de Alteração de Contribuição //
                var protocolos = Protocolo.ListAlteracaoContribuicao(oParticip.IdParticipante, 25);

                email = !String.IsNullOrEmpty(p.EnderecoEletronicoComl) ? p.EnderecoEletronicoComl : p.EnderecoEletronico;
                copyRecipients = GetAppSetting("mailCopyRecipient");
                copyRecipients += GetAppSetting("mailCopyRecipientEntity" + oParticip.IdProduto);

                //Se for teste envia para email interno
                bool test = Convert.ToBoolean(GetAppSetting("isTest"));
                if (test)
                {
                    email = GetAppSetting("emailTeste");
                }
                //msgReturn = "<strong> <span class='glyphicon glyphicon-ok-sign' style='font-size:34px'></span> </strong><br>Seus dados alterados e protocolo foram salvos e enviados para o e-mail: <strong>" + (!String.IsNullOrEmpty(email) ? email : "(Email não cadastrado)") + "</strong>.<br>Seu protocolo de alteração é : <strong>" + protocolos[protocolos.Count - 1].Protocolo_ + "</strong>";

                string subject = "Formulário de Alteração do Percentual de Contribuição - " + oParticip.NomeParticip;
                string body = "";
                string msgReturnDefaultEmail = "";
                string msgReturnDefaultSemEmail = "";
                if (oParticip.IdProduto == 62)
                {
                    string emailTemplateHtml = System.IO.File.ReadAllText(GetAppSetting("pathEmailTemplateHtml"));
                    int horaDiferencaBrasil = -3;
                    emailTemplateHtml = emailTemplateHtml.Replace("#NOME#", oParticip.NomeParticip);
                    emailTemplateHtml = emailTemplateHtml.Replace("#CPF#", oParticip.Cpf);
                    //emailTemplateHtml = emailTemplateHtml.Replace("#MATRICULA#", matricula);
                    emailTemplateHtml = emailTemplateHtml.Replace("#PROTOCOLO#", protocolos[protocolos.Count - 1].Protocolo_);
                    emailTemplateHtml = emailTemplateHtml.Replace("#PERCENTUAL_ESCOLHIDO_TXT#", string.Concat(basica, "%"));
                    emailTemplateHtml = emailTemplateHtml.Replace("#DATA#", DateTime.Now.ToUniversalTime().AddHours(horaDiferencaBrasil).ToString("dd/MM/yyyy"));
                    body = emailTemplateHtml.ToString();

                    msgReturnDefaultEmail = "<strong><span class='glyphicon glyphicon-ok-sign' style='font-size:34px'></span> </strong><br> Sua solicitação de alteração do percentual de contribuição básica foi recebida com sucesso.<br>Você receberá um e-mail em <strong>" + email + "</strong>, mantenha este documento arquivado até a data da alteração no cadastro da GEBSAPrev.";
                    msgReturnDefaultSemEmail = "<strong> <span class='glyphicon glyphicon-ok-sign'></span> </strong><br>Sua solicitação de alteração do percentual de contribuição básica foi recebida com sucesso.<br>Seu protocolo de alteração é : <strong>" + protocolos[protocolos.Count - 1].Protocolo_ + "</strong>";
                }
                else
                {
                    body = "<html>" +
                                  "     <head>" +
                                  "         <title>Alteração de Percentual de Contribuição</title>" +
                                  "          <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />" +
                                  "          <meta http-equiv=\"X-UA-Compatible\" content=\"IE=Edge\" />        " +
                                  "          <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">" +
                                  "          <link href=\"https://www.portal-hro.com.br/cadastro/CSS/bootstrap.min.css\" rel=\"stylesheet\" />" +
                                  "     </head>" +
                                  "     <body bgcolor=\"#ffffff\" style=\"left: 10px; top: 10px;\"><center>" +
                                  "         <div class=\"row\" id=\"dvMain\" runat=\"server\" style=\"width: 900px;\">" +
                                  "             <div class=\"panel panel-primary\">" +
                                  "                 <div class=\"panel-body\">" +
                                  "                     <div class=\"panel panel-default\">" +
                                  "                             <div class=\"panel-heading\"><h2>Alteração de Contribuição</h2></div>" +
                                  "                     </div>" +
                                  "                     <div class=\"panel panel-default\">" +
                                  "                         <div class=\"panel-body\">" +
                                  "                             <table border=0 cellspacing=2 cellpadding=1 width=80% bordercolor=#F8F8FF>" +
                                  "                                 <tr><td colspan='2'>&nbsp;</td></tr>" +
                                  "                                 <tr><td colspan='2' align='right'><img id='logo' src='https://www.portal-hro.com.br/ws/img/logo/" + oParticip.IdProduto + ".png' /></td></tr>" +
                                  "                                 <tr><td colspan='2'>&nbsp;</td></tr>" +
                                  "                                 <tr valign=middle><td colspan=2>&nbsp;</td></tr>" +
                                  "                                 <tr valign=middle>" +
                                  "                                     <td align=left width=30%><span class=\"control-label\">Protocolo:</span></td>" +
                                  "                                     <td align=left width=50%><span class=\"control-label\">" + protocolos[protocolos.Count - 1].Protocolo_ + "</span></td>" +
                                  "                                 </tr>" +
                                  "                                 <tr valign=middle>" +
                                  "                                     <td align=left width=30%><span class=\"control-label\">Participante:</span></td>" +
                                  "                                     <td align=left width=50%><span class=\"control-label\">" + oParticip.NomeParticip + "</span></td>" +
                                  "                                 </tr>" +
                                  "                                 <tr valign=middle>" +
                                  "                                     <td align=left width=30%><span class=\"control-label\">Alterado em:</span></td>" +
                                  "                                     <td align=left width=50%><span class=\"control-label\">" + DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss") + "</span></td>" +
                                  "                                 </tr>" +
                                  "                                 <tr valign=middle>" +
                                  "                                     <td align=left width=30%><span class=\"control-label\">" + txtPercEscolhidoBasica + "</span></td>" +
                                  "                                     <td align=left width=50%><span class=\"control-label\">" + basica + " % </span></td>" +
                                  "                                 </tr>" +
                                  ((isExcedente == "0") ? "" :
                                  "                                 <tr valign=middle>" +
                                  "                                     <td align=left width=30%><span class=\"control-label\">" + txtPercEscolhidoAdicional + "</span></td>" +
                                  "                                     <td align=left width=50%><span class=\"control-label\">" + adicional + " %</span></td>" +
                                  "                                 </tr>") +
                                  "                             </table>" +
                                  "                         </div>" +
                                  "                     </div>" +
                                  "                 </div>" +
                                  "             </div>" +
                                  "         </div></center>" +
                                  "     </body>" +
                                  "</html>";

                    //msgReturnDefaultEmail = "<strong> /*<span class='glyphicon glyphicon-ok-sign' style='font-size:34px'></span>*/ </strong>Seus dados alterados e protocolo foram salvos e enviados para o e-mail: <strong>" + (!String.IsNullOrEmpty(email) ? email : "(Email não cadastrado)") + "</strong>.<br>Seu protocolo de alteração é : <strong>" + protocolos[protocolos.Count - 1].Protocolo_ + "</strong>";
                    msgReturnDefaultEmail = "<strong>Seu protocolo de alteração é : <strong>" + protocolos[protocolos.Count - 1].Protocolo_ + "</strong>";
                    msgReturnDefaultSemEmail = "<strong> /*<span class='glyphicon glyphicon-ok-sign'></span>*/ </strong>Seu protocolo de alteração é : <strong>" + protocolos[protocolos.Count - 1].Protocolo_ + "</strong>";
                }


                if (FaleConosco.SendMail(GetAppSetting("Profile"), email, copyRecipients, body, subject, 0, ""))
                {
                    msgReturn = msgReturnDefaultEmail;
                }
                else
                {
                    msgReturn = msgReturnDefaultSemEmail;
                }


            }
            return msgReturn;
        }
        catch (Exception ex)
        {

            return msgReturn;
        }
    }

    [WebMethod]
    public static string SendPerfil(string id, string perfil)
    {
        SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();
        DadosCadastraisParticipante p = null;
        Participante oParticip = new Participante();
        string msgReturn = "";
        string idParticipante = id.Replace(" ", "+");
        StringBuilder sTags = new StringBuilder();
        string email = string.Empty;
        string copyRecipients = string.Empty;
        try
        {
            if (!String.IsNullOrEmpty(idParticipante))
            {
                string decryptParticip = rijndae.DecryptRijndael(idParticipante, salt);

                p = DadosCadastraisParticipante.List(Convert.ToInt32(decryptParticip))[0];

                #region Atualiza os Perfis
                if (!perfil.Equals(""))
                {
                    TermoPerfilDeInvestimento oNovoPerfil = new TermoPerfilDeInvestimento()
                    {
                        IdParticipante = p.IdParticipante,
                        CPF = p.Cpf,
                        DtAlteracao = System.DateTime.Now,
                        IdPlano = p.IdPlano,
                        IdProduto = p.IdEntidade,
                        IdProtocolo = string.Empty,
                        Email = string.Empty,
                        Matricula = p.Matricula.ToString(),
                        NmParticipante = p.Nome,
                        Status = "P",
                        Telefone = "",
                        TipoOpcao = perfil,
                        Usuario = String.Concat(p.IdEntidade.ToString("0000"), p.Cpf)
                    };
                    oNovoPerfil.sequencia = Convert.ToInt32(oNovoPerfil.Add());

                    #region SaveLog

                    LogAcessoPortal log = new LogAcessoPortal() { IdProduto = oParticip.IdProduto, IdPlano = oParticip.IdPlano, IdSessao = Plataforma, UserName = oParticip.Users_.UserName, DescAcesso = "Mobile - Alterou Perfil" };
                    LogAcessoPortal.Save(log);
                    #endregion


                    if (oNovoPerfil.sequencia > 0)
                    {
                        string nomePerfil = "";
                        switch (perfil)
                        {
                            case "A": nomePerfil = "Arrojado"; break;
                            case "E": nomePerfil = "Convencional"; break;
                            case "C": nomePerfil = "Conservador"; break;
                            case "SC": nomePerfil = "SUPER CONSERVADOR"; break;
                            case "CO": nomePerfil = "CONSERVADOR"; break;
                            case "MO": nomePerfil = "MODERADO"; break;
                            case "AG": nomePerfil = "AGRESSIVO"; break;
                        }

                        // Retorna os protocolos de Alteração de Contribuição //
                        var protocolos = Protocolo.ListAlteracaoContribuicao(p.IdParticipante, 59);
                        email = !String.IsNullOrEmpty(p.EnderecoEletronicoComl) ? p.EnderecoEletronicoComl : p.EnderecoEletronico;
                        copyRecipients = GetAppSetting("mailCopyRecipient");
                        copyRecipients += GetAppSetting("mailCopyRecipientEntity" + oParticip.IdProduto);

                        //Se for teste envia para email interno
                        bool test = Convert.ToBoolean(GetAppSetting("isTest"));
                        if (test)
                        {
                            email = GetAppSetting("emailTeste");
                        }
                        //msgReturn = "<strong> <span class='glyphicon glyphicon-ok-sign' style='font-size:34px'></span> </strong><br>Seus dados alterados e protocolo foram salvos e enviados para o e-mail: <strong>" + (!String.IsNullOrEmpty(email) ? email : "(Email não cadastrado)") + "</strong>.<br>Seu protocolo de alteração é : <strong>" + protocolos[protocolos.Count - 1].Protocolo_ + "</strong>";
                        //msgReturn = "<strong> <span class='glyphicon glyphicon-ok-sign' style='font-size:34px'></span> </strong><br>Seus dados alterados e protocolo foram salvos e enviados para o e-mail: <strong>(Email não cadastrado)</strong>.<br>Seu protocolo de alteração é : <strong>MOO20180563055FD5D5S</strong>";
                        string subject = "Alteração de Perfil - Mobile";
                        string body = "<html>" +
                                      "     <head>" +
                                      "         <title>Alteração de Perfil - Mobile</title>" +
                                      "          <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />" +
                                      "          <meta http-equiv=\"X-UA-Compatible\" content=\"IE=Edge\" />        " +
                                      "          <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">" +
                                      "          <link href=\"https://www.portal-hro.com.br/cadastro/CSS/bootstrap.min.css\" rel=\"stylesheet\" />" +
                                      "     </head>" +
                                      "     <body bgcolor=\"#ffffff\" style=\"left: 10px; top: 10px;\"><center>" +
                                      "         <div class=\"row\" id=\"dvMain\" runat=\"server\" style=\"width: 900px;\">" +
                                      "             <div class=\"panel panel-primary\">" +
                                      "                 <div class=\"panel-body\">" +
                                      "                     <div class=\"panel panel-default\">" +
                                      "                             <div class=\"panel-heading\"><h2>Alteração de Perfil</h2></div>" +
                                      "                     </div>" +
                                      "                     <div class=\"panel panel-default\">" +
                                      "                         <div class=\"panel-body\">" +
                                      "                             <table border=0 cellspacing=2 cellpadding=1 width=80% bordercolor=#F8F8FF>" +
                                      "                                 <tr><td colspan='2'>&nbsp;</td></tr>" +
                                      "                                 <tr><td colspan='2' align='right'><img id='logo' src='https://www.portal-hro.com.br/ws/img/logo/" + p.IdEntidade + ".png' /></td></tr>" +
                                      "                                 <tr><td colspan='2'>&nbsp;</td></tr>" +
                                      "                                 <tr valign=middle><td colspan=2>&nbsp;</td></tr>" +
                                      "                                 <tr valign=middle>" +
                                      "                                     <td align=left width=30%><span class=\"control-label\">Protocolo:</span></td>" +
                                      "                                     <td align=left width=50%><span class=\"control-label\">" + protocolos[protocolos.Count - 1].Protocolo_ + "</span></td>" +
                                      "                                 </tr>" +
                                      "                                 <tr valign=middle>" +
                                      "                                     <td align=left width=30%><span class=\"control-label\">Participante:</span></td>" +
                                      "                                     <td align=left width=50%><span class=\"control-label\">" + p.Nome + "</span></td>" +
                                      "                                 </tr>" +
                                      "                                 <tr valign=middle>" +
                                      "                                     <td align=left width=30%><span class=\"control-label\">Alterado em:</span></td>" +
                                      "                                     <td align=left width=50%><span class=\"control-label\">" + DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss") + "</span></td>" +
                                      "                                 </tr>" +
                                        "                                 <tr valign=middle>" +
                                        "                                     <td align=left width=30%><span class=\"control-label\">Perfil/Gestor escolhido:</span></td>" +
                                        "                                     <td align=left width=50%><span class=\"control-label\">" + nomePerfil + "</span></td>" +
                                        "                                 </tr>" +
                                      "                             </table>" +
                                      "                         </div>" +
                                      "                     </div>" +
                                      "                 </div>" +
                                      "             </div>" +
                                      "         </div></center>" +
                                      "     </body>" +
                                      "</html>";



                        if (FaleConosco.SendMail(GetAppSetting("Profile"), email, copyRecipients, body, subject, 0, ""))
                        {
                            //msgReturn = "<strong> <span class='glyphicon glyphicon-ok-sign' style='font-size:34px'></span> </strong><br>Seus dados alterados e protocolo foram salvos e enviados para o e-mail: <strong>" + (!String.IsNullOrEmpty(email) ? email : "(Email não cadastrado)") + "</strong>.<br>Seu protocolo de alteração é : <strong>" + protocolos[protocolos.Count - 1].Protocolo_ + "</strong>";
                            msgReturn = "<strong>Seu protocolo de alteração é : <strong>" + protocolos[protocolos.Count - 1].Protocolo_ + "</strong>";
                        }
                        else
                        {
                            msgReturn = "<strong>Seu protocolo de alteração é : <strong>" + protocolos[protocolos.Count - 1].Protocolo_ + "</strong>";
                        }
                    }
                }
                #endregion


            }


            return msgReturn;
        }
        catch (Exception ex)
        {

            return msgReturn;
        }
    }

    [WebMethod]
    public static string GetToken(string id)
    {
        SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();

        try
        {
            if (!String.IsNullOrEmpty(id))
            {
                string encryptParticip = rijndae.EncryptRijndael(id, salt);
                return encryptParticip;
            }

            return "";
        }
        catch
        {
            return "";
        }
    }

    /// <summary>
    /// Carrega os modulos de acordo com as permissoes de cada entidade e o status de cada participante.
    /// Modulos sao as funcionalidades, ex. Extrato, Saldo , Boleto e etc.
    /// </summary>
    /// <param name="id">Id do participante criptografado</param>
    /// <returns>Modulos com as permissoes do participante </returns>
    [WebMethod]
    public static object LoadModulosOld(string id)
    {
        SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();
        Participante oPartic;
        string result = "";
        string pathFile = "";

        string idParticipante = id.Replace(" ", "+");
        try
        {
            if (!String.IsNullOrEmpty(idParticipante))
            {

                string decryptParticip = rijndae.DecryptRijndael(idParticipante, salt);
                oPartic = new Participante(Convert.ToInt32(decryptParticip));

                if (oPartic != null)
                {
                    pathFile = XmlModulosMobile;
                    bool permissao;
                    XmlDocument fileXML = new XmlDocument();
                    try
                    {
                        fileXML.Load(pathFile);

                        string isNovo = "";
                        string submodulo = "";

                        //dnpImaSave.TIndice = xmlNodeTotal[j].Attributes["T_Indice"].InnerText;
                        //XmlNode xmlNodeTotais = xmlNodeFamilia[i].FirstChild;
                        //XmlNodeList xmlNodeTotal = xmlNodeTotais.ChildNodes;

                        XmlNodeList listProdutos = fileXML.SelectNodes("/mobile/produtos/produto");
                        for (int i = 0; i < listProdutos.Count; i++)
                        {
                            string idEntidade = listProdutos[i].Attributes["id"].InnerText;
                            XmlNodeList listModulos = listProdutos[i].FirstChild.ChildNodes;//Modulo

                            if (idEntidade == oPartic.IdProduto.ToString())
                            {

                                for (int m = 0; m < listModulos.Count; m++)
                                {
                                    string modulo = listModulos[m].Attributes["id"].InnerText;
                                    bool novo = false;

                                    try
                                    {
                                        novo = listModulos[m].Attributes["novo"].InnerText == "true" ? true : false;
                                    }
                                    catch
                                    {
                                        novo = false;
                                    }
                                    XmlNodeList listStatus = listModulos[m].FirstChild.ChildNodes;//StatusID

                                    for (int s = 0; s < listStatus.Count; s++)
                                    {
                                        string statusID = listStatus[s].Attributes["id"].InnerText;
                                        permissao = Convert.ToBoolean(listStatus[s].FirstChild.InnerText);//Permissao

                                        if (statusID == oPartic.Situacao && permissao)
                                        {
                                            result += modulo + ";";
                                            if (novo)
                                                isNovo += modulo + ":" + novo + ";";

                                            if (listStatus[s].ChildNodes.Count > 1)
                                            {

                                                XmlNodeList listSubModulos = listStatus[s].ChildNodes[1].ChildNodes;//subModulos

                                                for (int v = 0; v < listSubModulos.Count; v++)
                                                {
                                                    string itens = String.Concat(listSubModulos[v].Attributes["id"].InnerText, ":", listSubModulos[v].InnerText, ",");
                                                    submodulo += itens;
                                                }

                                            }

                                        }

                                    }
                                }
                            }
                        }

                        var obj = new { Modulos = result, Novo = isNovo, SubModulo = !String.IsNullOrEmpty(submodulo) ? "{" + submodulo.Substring(0, submodulo.Length - 1).ToLower() + "}" : "" };
                        return obj;

                    }
                    catch (Exception ex)
                    {
                        return result;
                    }

                }
                return result;
            }
            else
            {
                return result;
            }
        }
        catch (Exception ex)
        {
            return result;
        }

    }

    /// <summary>
    /// Carrega os modulos de acordo com as permissoes de cada entidade e o status de cada participante.
    /// Modulos sao as funcionalidades, ex. Extrato, Saldo , Boleto e etc.
    /// </summary>
    /// <param name="id">Id do participante criptografado</param>
    /// <returns>Modulos com as permissoes do participante </returns>
    [WebMethod]
    public static object LoadModulos(string id)
    {
        SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();
        Participante oPartic;
        string result = "";

        string idParticipante = id.Replace(" ", "+");
        try
        {
            if (!String.IsNullOrEmpty(idParticipante))
            {

                string decryptParticip = rijndae.DecryptRijndael(idParticipante, salt);
                oPartic = new Participante(Convert.ToInt32(decryptParticip));

                if (oPartic != null)
                {
                    bool permissao;
                    try
                    {
                        string isNovo = "";
                        string submodulo = "";

                        var permissoes = ModuloPermissao.List(oPartic.IdProduto, oPartic.Situacao);
                        for (int i = 0; i < permissoes.Count; i++)
                        {
                            if (!permissoes[i].IsSubmodulo)
                            {
                                result += String.Concat(permissoes[i].Nome, ";");
                            }
                            else
                            {
                                submodulo += String.Concat(permissoes[i].Nome, ":", permissoes[i].IsAtivo, ",");
                            }

                            if (permissoes[i].IsNovo)
                            {
                                isNovo += String.Concat(permissoes[i].Nome, ":", permissoes[i].IsNovo, ";");
                            }
                        }

                        var obj = new { Modulos = result, Novo = isNovo, SubModulo = !String.IsNullOrEmpty(submodulo) ? "{" + submodulo.Substring(0, submodulo.Length - 1).ToLower() + "}" : "" };
                        return obj;

                    }
                    catch (Exception ex)
                    {
                        return result;
                    }

                }
                return result;
            }
            else
            {
                return result;
            }
        }
        catch (Exception ex)
        {
            return result;
        }

    }
    /// <summary>
    /// Requisita mensagens configuradas no arquivo xml MsgMobile
    /// </summary>
    /// <param name="idMsg"></param>
    /// <param name="idProduto"></param>
    /// <param name="idModulo"></param>
    /// <returns>Mensagem configurada no XML</returns>
    public static string LoadMsgCustomizadas(string idMsg, int idProduto, string idModulo)
    {
        string pathFile = "";
        string result = "";
        try
        {
            if (!String.IsNullOrEmpty(idMsg))
            {
                pathFile = XmlMsgMobile;

                XmlDocument fileXML = new XmlDocument();
                try
                {
                    fileXML.Load(pathFile);

                    XmlNodeList listProdutos = fileXML.SelectNodes("/mobile/produtos/produto");
                    for (int i = 0; i < listProdutos.Count; i++)
                    {
                        string idEntidade = listProdutos[i].Attributes["id"].InnerText;
                        XmlNodeList listModulos = listProdutos[i].FirstChild.ChildNodes;//Modulo

                        if (idEntidade == idProduto.ToString())
                        {

                            for (int m = 0; m < listModulos.Count; m++)
                            {
                                string modulo = listModulos[m].Attributes["id"].InnerText;
                                XmlNodeList listStatus = listModulos[m].FirstChild.ChildNodes;//mensagens

                                for (int s = 0; s < listStatus.Count; s++)
                                {
                                    if (modulo == idModulo)
                                    {
                                        string idMensagem = listStatus[s].Attributes["id"].InnerText;

                                        if (idMensagem == idMsg)
                                        {
                                            result = listStatus[s].FirstChild.InnerText;//Texto
                                            return result;
                                        }
                                    }

                                }
                            }
                        }
                    }

                }
                catch (Exception ex)
                {
                    return result;
                }
                return result;
            }
            else
            {
                return result;
            }
        }
        catch (Exception ex)
        {
            return result;
        }

    }

    /// <summary>
    /// Salva os logs de acessos 
    /// </summary>
    /// <param name="log">Objeto com as informacoes do log de acesso</param>
    private void SaveLog(LogAcessoPortal log)
    {
        LogAcessoPortal.Save(log);
    }
    /// <summary>
    /// 
    /// </summary>
    /// <param name="key"></param>
    /// <returns></returns>
    private static string GetAppSetting(string key)
    {
        if (appSettings.HasKeys() == false || appSettings[key] == null)
        {
            // the <appSettings/> section wasn't found, or it has no values, or it doesn't have the specified key.
            return string.Empty;
        }
        else
        {
            return appSettings[key];
        }
    }
    public static string XmlModulosMobile
    {
        get
        {
            return GetAppSetting("XmlModulosMobile").ToString();
        }
    }
    public static string XmlMsgMobile
    {
        get
        {
            return GetAppSetting("XmlMsgMobile").ToString();
        }
    }
    /* protected static string GetIPAddress()
     {
         System.Web.HttpContext context = System.Web.HttpContext.Current;
         string ipAddress = context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

         if (!string.IsNullOrEmpty(ipAddress))
         {
             string[] addresses = ipAddress.Split(',');
             if (addresses.Length != 0)
             {
                 return addresses[0];
             }
         }

         return context.Request.ServerVariables["REMOTE_ADDR"];
     }*/
    /// <summary>
    /// Salva os logs de solicitacao de emprestimo
    /// </summary>
    /// <param name="process">Id do Processo</param>
    /// <param name="operationID">Id da Operacao</param>
    /// <param name="keyID">Id do Contrato</param>
    /// <param name="message">Descricao do log</param>
    /// <param name="error"> True para erro</param>
    /// <param name="userID">Id do Usuario</param>
    /// <returns>Id do log salvo</returns>
    /// 

    public static string GetLocalIPAddress()
    {
        var host = Dns.GetHostEntry(Dns.GetHostName());
        foreach (var ip in host.AddressList)
        {
            if (ip.AddressFamily == AddressFamily.InterNetwork)
            {
                return ip.ToString();
            }
        }
        throw new Exception("No network adapters with an IPv4 address in the system!");
    }
    private int SaveLogESBO(int process, int? operationID, int? keyID, string message, bool error, int userID)
    {
        Log saveLog = new Log();
        saveLog.ProcessID = process;
        saveLog.OperationID = operationID;
        saveLog.KeyID = keyID;
        saveLog.Description = message;
        saveLog.IsError = error;
        saveLog.UserID = userID;
        return Log.Save(saveLog);
    }


    private static List<FipecqEleicaoModelo> ListaFipecqEleicao { get; set; }


    public static FipecqEleicaoModelo GetFipecqEleicao(string cpf)
    {
        return ListaFipecqEleicao.FirstOrDefault(x => x.CPF == cpf);
    }

    private static bool PermitirEmprestimo(int idProduto, int idPlano, int codPatrocinadora, int tipoParticipante)
    {
        const int tipo_participante_CGPC_12 = 41;
        const int tipo_participante_CGPC_12_ATA_53 = 42;
        const int planoGebsaprev = 622;
        const int idProdutoGebsa = 62;
        const int codPatrocinaSuezGebsa = 51;
        if (idProduto == idProdutoGebsa)
        {
            if (idPlano != planoGebsaprev) return false;
            if (tipoParticipante == tipo_participante_CGPC_12 || tipoParticipante == tipo_participante_CGPC_12_ATA_53) return false;
            if (codPatrocinadora == codPatrocinaSuezGebsa) return false;

            return true;
        }
        else
        {
            return true;
        }


    }

    private static void CarregarLista(string path)
    {
        //string fileName = "ListFipecq.csv";
        //string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "App_Data",fileName);

        ListaFipecqEleicao = (from row in File.ReadAllLines(path)
                          .Where(arg => !string.IsNullOrEmpty(arg) && arg.Length > 0).AsEnumerable()
                              let column = row.Split(';')
                              select new FipecqEleicaoModelo
                              {
                                  Matricula = column[0],
                                  CPF = column[1],
                                  Nome = column[2],
                                  CodigoSenha = column[3]
                              }).ToList();
    }
}


public class FipecqEleicaoModelo
{
    public string Matricula { get; set; }
    public string CPF { get; set; }
    public string Nome { get; set; }
    public string CodigoSenha { get; set; }
}


//public enum Status
//{

//    ATIVO = "ATIVO",                                
//    BPD = "AGUARDANDO BENEFICIO DIFERIDO",
//    AUTOPATROCINADO = "",                      
//    DESLIGADO_AGUARDANDO= "DESLIGADO AGUARDANDO",                
//     EMPREGADO_NAO_PARTICIPANTE_DO_PLANO= "EMPREGADO NÃO PARTICIPANTE DO PLANO", 
//    DESLIGADO= "DESLIGADO",                            
//    EXCLUIDO_DO_PLANO= "EXCLUIDO DO PLANO",
//    ASSISTIDO= "ASSISTIDO"     
//}

