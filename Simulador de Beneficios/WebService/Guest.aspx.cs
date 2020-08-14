using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using Xerox.EHROBR.WebModule.IN26;
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

public partial class Guest : System.Web.UI.Page
{
    public static int IdEntidade { get; set; }
    public static string Plataforma { get; set; }
    private static System.Collections.Specialized.NameValueCollection appSettings = System.Web.Configuration.WebConfigurationManager.AppSettings;

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {


            try { IdEntidade = Convert.ToInt32(Request["e"].ToString()); }
            catch { }
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

        try
        {
            if (!String.IsNullOrEmpty(id))
            {
                IList<Plano> oPlano = Plano.List(Convert.ToInt32(id));
                if (oPlano.Count > 0)
                {
                    Collection<ParticipanteRentabilidade> oResumoRentab = ParticipanteRentabilidade.ListGuest(oPlano[0].IdProduto, oPlano[0].IdPlano);
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
                    switch (qtdePerfil)
                    {
                        case 1: finalAcumuladoAno = "<div class='col-xs-4'></div>" + finalAcumuladoAno;
                            finalAcumulado12meses = "<div class='col-xs-4'></div>" + finalAcumulado12meses; break;
                        case 2: finalAcumuladoAno = finalAcumuladoAno.Replace("col-xs-4", "col-xs-6");
                            finalAcumulado12meses = finalAcumulado12meses.Replace("col-xs-4", "col-xs-6");
                            break;
                        case 4: finalAcumuladoAno = finalAcumuladoAno.Replace("col-xs-4", "col-xs-6");
                            finalAcumulado12meses = finalAcumulado12meses.Replace("col-xs-4", "col-xs-6");
                            break;
                    }

                    finalAcumuladoAno = "<div class='col-xs-12'><p style='font-size: 15px'>Rentabilidade Líquida Acumulada <span class='rentab-bold'>no Ano</span></p>" +
                                        "</div><div class='row' id='dvRentabAcumAno' style='text-align: center'>" + finalAcumuladoAno + "</div>";
                    finalAcumulado12meses = "<div style='clear: both;'><hr class='hrRentab' /></div><div class='col-xs-12'><p style='font-size: 15px'>Rentabilidade Líquida Acumulada <span class='rentab-bold'>nos Últimos 12 Meses</span></p>" +
                        "<div class='row' id='dvRentabAcum12' style='text-align: center'>" + finalAcumulado12meses + "</div>";

                    oResumoRentab[0].HtmlValorAcumulado = finalAcumuladoAno + finalAcumulado12meses;

                    result = oResumoRentab.ToList();
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
    /// Carrega as Rentabilidades dos ultimos 12 meses 
    /// </summary>
    /// <param name="id">Id da Quota</param>
    /// <returns>Lista com as Rentabilidades dos ultimos 12 meses</returns>
    [WebMethod]
    public static List<EvolucaoRentabilidadeXIndices> LoadRentabEvolucao(string quota)
    {
        List<EvolucaoRentabilidadeXIndices> result = new List<EvolucaoRentabilidadeXIndices>();

        try
        {
            if (!String.IsNullOrEmpty(quota))
            {
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
                int qtdePerfil = 0;
                int anoAtual = DateTime.Now.Year;
               

                List<string> perfis = new List<string>();

                for (int i = 0; i < oResumoRentab.Count; i++)
                {
                    oResumoRentab[i].NomePerfil = oResumoRentab[i].NomePerfil.Replace("QUOTA DO PERFIL ", "");
                }



                //string finalAcumulado12meses = "";
                //string finalAcumuladoAno = "";

                //if (oResumoRentab[0].NomePerfil != null)
                //{
                //    finalAcumuladoAno += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                //   "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomePerfil + "</strong></p>" +
                //   "<p style='font-size: 26px'>" + string.Format("{0:0.00}", indice) + "%</p>" +
                //   "</div>";

                //    finalAcumulado12meses += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                //   "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomePerfil + "</strong></p>" +
                //   "<p style='font-size: 26px'>" + string.Format("{0:0.00}", oResumoRentab[0].VarPerPerfil) + "%</p>" +
                //   "</div>";
                //}
                //if (oResumoRentab[0].NomeIndice0 != null)
                //{
                //    finalAcumuladoAno += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                //   "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice0 + "</strong></p>" +
                //   "<p style='font-size: 26px'>" + string.Format("{0:0.00}", indice0) + "%</p>" +
                //   "</div>";

                //    finalAcumulado12meses += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                //       "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice0 + "</strong></p>" +
                //       "<p style='font-size: 26px'>" + string.Format("{0:0.00}", oResumoRentab[0].VarPerIndice0) + "%</p>" +
                //       "</div>";
                //}
                //if (oResumoRentab[0].NomeIndice0 != null && oResumoRentab[0].NomeIndice0.Contains("INPC"))
                //{
                //    finalAcumuladoAno += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                //   "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice0 + " + 5</strong></p>" +
                //   "<p style='font-size: 26px'>" + string.Format("{0:0.00}", indiceInpc5) + "%</p>" +
                //   "</div>";

                //    finalAcumulado12meses += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                //           "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice0 + " + 5</strong></p>" +
                //           "<p style='font-size: 26px'>" + string.Format("{0:0.00}", (Convert.ToDecimal(oResumoRentab[0].VarPerIndice0) + (Convert.ToDecimal(oResumoRentab[0].VarPerIndice0) * 0.05M))) + "%</p>" +
                //           "</div>";
                //}
                //if (oResumoRentab[0].NomeIndice1 != null)
                //{
                //    finalAcumuladoAno += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                //  "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice1 + "</strong></p>" +
                //  "<p style='font-size: 26px'>" + string.Format("{0:0.00}", indice1) + "%</p>" +
                //  "</div>";

                //    finalAcumulado12meses += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                //       "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice1 + "</strong></p>" +
                //       "<p style='font-size: 26px'>" + string.Format("{0:0.00}", oResumoRentab[0].VarPerIndice1) + "%</p>" +
                //       "</div>";
                //}
                //if (oResumoRentab[0].NomeIndice2 != null)
                //{
                //    finalAcumuladoAno += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                //  "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice2 + "</strong></p>" +
                //  "<p style='font-size: 26px'>" + string.Format("{0:0.00}", indice2) + "%</p>" +
                //  "</div>";

                //    finalAcumulado12meses += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                //           "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice2 + "</strong></p>" +
                //           "<p style='font-size: 26px'>" + string.Format("{0:0.00}", oResumoRentab[0].VarPerIndice2) + "%</p>" +
                //           "</div>";
                //}
                //if (oResumoRentab[0].NomeIndice3 != null)
                //{
                //    finalAcumuladoAno += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                //  "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice3 + "</strong></p>" +
                //  "<p style='font-size: 26px'>" + string.Format("{0:0.00}", indice3) + "%</p>" +
                //  "</div>";

                //    finalAcumulado12meses += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                //           "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice3 + "</strong></p>" +
                //           "<p style='font-size: 26px'>" + string.Format("{0:0.00}", oResumoRentab[0].VarPerIndice3) + "%</p>" +
                //           "</div>";
                //}
                //if (oResumoRentab[0].NomeIndice4 != null)
                //{
                //    finalAcumuladoAno += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                //  "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice4 + "</strong></p>" +
                //  "<p style='font-size: 26px'>" + string.Format("{0:0.00}", indice4) + "%</p>" +
                //  "</div>";

                //    finalAcumulado12meses += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                //           "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice4 + "</strong></p>" +
                //           "<p style='font-size: 26px'>" + string.Format("{0:0.00}", oResumoRentab[0].VarPerIndice4) + "%</p>" +
                //           "</div>";
                //}
                //if (oResumoRentab[0].NomeIndice5 != null)
                //{
                //    finalAcumuladoAno += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                //  "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice5 + "</strong></p>" +
                //  "<p style='font-size: 26px'>" + string.Format("{0:0.00}", indice5) + "%</p>" +
                //  "</div>";

                //    finalAcumulado12meses += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                //               "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice5 + "</strong></p>" +
                //               "<p style='font-size: 26px'>" + string.Format("{0:0.00}", oResumoRentab[0].VarPerIndice5) + "%</p>" +
                //               "</div>";
                //}
                //if (oResumoRentab[0].NomeIndice6 != null)
                //{
                //    finalAcumuladoAno += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                //  "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice6 + "</strong></p>" +
                //  "<p style='font-size: 26px'>" + string.Format("{0:0.00}", indice6) + "%</p>" +
                //  "</div>";

                //    finalAcumulado12meses += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                //               "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice6 + "</strong></p>" +
                //               "<p style='font-size: 26px'>" + string.Format("{0:0.00}", oResumoRentab[0].VarPerIndice6) + "%</p>" +
                //               "</div>";
                //}
                //if (oResumoRentab[0].NomeIndice7 != null)
                //{
                //    finalAcumuladoAno += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                //  "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice7 + "</strong></p>" +
                //  "<p style='font-size: 26px'>" + string.Format("{0:0.00}", indice7) + "%</p>" +
                //  "</div>";

                //    finalAcumulado12meses += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                //               "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice7 + "</strong></p>" +
                //               "<p style='font-size: 26px'>" + string.Format("{0:0.00}", oResumoRentab[0].VarPerIndice7) + "%</p>" +
                //               "</div>";
                //}
                //if (oResumoRentab[0].NomeIndice8 != null)
                //{
                //    finalAcumuladoAno += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                //  "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice8 + "</strong></p>" +
                //  "<p style='font-size: 26px'>" + string.Format("{0:0.00}", indice8) + "%</p>" +
                //  "</div>";

                //    finalAcumulado12meses += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                //               "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice8 + "</strong></p>" +
                //               "<p style='font-size: 26px'>" + string.Format("{0:0.00}", oResumoRentab[0].VarPerIndice8) + "%</p>" +
                //               "</div>";
                //}
                //if (oResumoRentab[0].NomeIndice9 != null)
                //{
                //    finalAcumuladoAno += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                //  "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice9 + "</strong></p>" +
                //  "<p style='font-size: 26px'>" + string.Format("{0:0.00}", indice9) + "%</p>" +
                //  "</div>";

                //    finalAcumulado12meses += "<div class='col-xs-4' style='border-right: 1px dashed #fff'>" +
                //               "<p><strong style='text-transform: capitalize;'>" + oResumoRentab[0].NomeIndice9 + "</strong></p>" +
                //               "<p style='font-size: 26px'>" + string.Format("{0:0.00}", oResumoRentab[0].VarPerIndice9) + "%</p>" +
                //               "</div>";
                //}

                //finalAcumuladoAno = "<div class='col-xs-12'><p style='font-size: 15px'>Rentabilidade Líquida Acumulada <span class='rentab-bold'>no Ano</span></p>" +
                //                    "</div><div class='row' id='dvRentabAcumAno' style='text-align: center'>" + finalAcumuladoAno + "</div>";
                //finalAcumulado12meses = "<div style='clear: both;'><hr class='hrRentab' /></div><div class='col-xs-12'><p style='font-size: 15px'>Rentabilidade Líquida Acumulada <span class='rentab-bold'>nos Últimos 12 Meses</span></p>" +
                //    "<div class='row' id='dvRentabAcum12' style='text-align: center'>" + finalAcumulado12meses + "</div>";

                //oResumoRentab[0].HtmlValorAcumulado = finalAcumuladoAno + finalAcumulado12meses;
                StringBuilder sbH = new StringBuilder();
                string textPlano = "Índice";
                string textMeta = "Meta de Rentabilidade";
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
                //var resumo = oResumoRentab.Where(x => x.AnoMes == "201804").FirstOrDefault();
                var resumo = oResumoRentab[0];
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
    public static string SendFaleConosco(string id, string nome, string cpf, string email, string tel, string msg)
    {
        //SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();
        //DadosCadastraisParticipante p;
        //Participante oParticip = new Participante();

        string msgReturn = "Ocorreu um erro. Mensagem não enviada";
        try
        {
            int idEntidade = Convert.ToInt32(id);
            StringBuilder sb = new StringBuilder();
            Produto p = new Produto(idEntidade);
            string nomeEntidade = "";

            string subject = "Fale Conosco - Mobile -" + p.Nome ;
            sb.Append("<strong>Email Enviado pelo Fale Conosco Mobile</strong><br>");

            sb.Append("<span>Nome: <strong>" + nome + "</strong></span><br>");
            sb.Append("<span>CPF: <strong>" + cpf + "</strong></span><br>");
            sb.Append("<span>EMAIL: <strong>" + email + "</strong></span><br>");
            sb.Append("<span>Fone: <strong>" + tel + "</strong></span><br>");
            sb.Append("<span>MSG: <strong>" + msg + "</strong></span><br>");
            sb.Append("<br>");
            sb.Append("<span>Obs: <strong>Usuário Não Logado</strong></span><br>");

            var result = FaleConosco.ListEmails(idEntidade);
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

            recipients = "alex.santana2@conduent.com;leonardo.saturnino@conduent.com;Arthur.Silva3@conduent.com";
            copyRecipients = "";
            if (FaleConosco.SendMail(GetAppSetting("Profile"), recipients, copyRecipients, sb.ToString(), subject, 0, ""))
            {
                if (FaleConosco.SaveMsgSend("", idEntidade, 0, subject, sb.ToString(), "N", nome, DateTime.Now, "L", email, cpf))
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
            //LogAcessoPortal log = new LogAcessoPortal() { IdProduto = oParticip.IdProduto, IdPlano = oParticip.IdPlano, IdSessao = Plataforma, UserName = oParticip.Users_.UserName, DescAcesso = "Mobile - Fale Conosco" };
            //LogAcessoPortal.Save(log);

            #endregion

            return msgReturn;
        }
        catch
        {
            return msgReturn;
        }


    }

    /// <summary>
    /// Carrega os modulos de acordo com as permissoes de cada entidade e o status de cada participante.
    /// Modulos sao as funcionalidades, ex. Extrato, Saldo , Boleto e etc.
    /// </summary>
    /// <param name="id">Id do participante criptografado</param>
    /// <returns>Modulos com as permissoes do participante </returns>
    [WebMethod]
    public static string LoadModulos(string id)
    {
        //SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();
        //Participante oPartic;
        string result = "";
        string pathFile = "";

        try
        {
            if (!String.IsNullOrEmpty(id))
            {
                pathFile = XmlModulosMobile;
                bool permissao;
                XmlDocument fileXML = new XmlDocument();
                try
                {
                    fileXML.Load(pathFile);

                    XmlNodeList listProdutos = fileXML.SelectNodes("/mobile/produtos/produto");
                    for (int i = 0; i < listProdutos.Count; i++)
                    {
                        string idEntidade = listProdutos[i].Attributes["id"].InnerText;
                        XmlNodeList listModulos = listProdutos[i].FirstChild.ChildNodes;//Modulo

                        if (idEntidade == id)
                        {

                            for (int m = 0; m < listModulos.Count; m++)
                            {
                                string modulo = listModulos[m].Attributes["id"].InnerText;
                                XmlNodeList listStatus = listModulos[m].FirstChild.ChildNodes;//StatusID

                                for (int s = 0; s < listStatus.Count; s++)
                                {
                                    string statusID = listStatus[s].Attributes["id"].InnerText;
                                    permissao = Convert.ToBoolean(listStatus[s].FirstChild.InnerText);//Permissao
                                    if (statusID == "00" && permissao)
                                        result += modulo + ";";

                                }
                            }
                        }
                    }

                }
                catch (Exception ex)
                {
                    return result;
                }

            }
            return result;
        }
        catch (Exception ex)
        {
            return result;
        }

    }

    [WebMethod]
    public static string AltSenha(string e, string cpf)
    {
        string msgReturn = "Ocorreu um erro! Alteração de senha não concluida.";
        string idEntidade = e.PadLeft(4, '0');
        string userId = string.Concat(idEntidade, cpf);

        try
        {
            System.Web.Security.MembershipUser user = System.Web.Security.Membership.GetUser(userId);

            if (user != null)
            {

                if (!user.Email.Trim().Equals("") && user.Email.IndexOf('@') > 0)
                {
                    Plano p = new Plano(Xerox.EHROBR.WebModule.Security.Users.Get(userId).IdPlano);
                    StringBuilder sb = new StringBuilder();

                    string strNewPassword = user.ResetPassword();

                    string email = user.Email.Trim();
                    int index = email.IndexOf('@');
                    string msgEmail = email.Substring(0, 4) + "...." + email.Substring(index);

                    string subject = "Solicitação de nova senha - Mobile";
                    subject += p != null ? "- " + p.Nome : "";

                    sb.Append("<strong>Nova Senha:</strong>: " + strNewPassword + " <br>");

                    //string urlTemplate = String.Format(GetAppSetting("templateEmail"), e);
                    string urlTemplate = GetAppSetting("templateEmail");
                    StreamReader streamReader = new StreamReader(urlTemplate);
                    string body = streamReader.ReadToEnd();
                    streamReader.Close();

                    body = body.Replace("#titulo#", subject);
                    body = body.Replace("#conteudo#", sb.ToString());
                    body = body.Replace("#barra#", e);
                    body = body.Replace("#header#", e);
                    body = body.Replace("#footer#", e);

                    string recipients = email;

                    if (FaleConosco.SendMail(GetAppSetting("Profile"), recipients, "", body, subject, 0, ""))
                    {
                        msgReturn = "<span class='glyphicon glyphicon-ok' style='color:green;font-size:26px;'></span><br />";
                        msgReturn += "A nova senha foi enviada para o e-mail <strong>" + msgEmail + "</strong> .<br />Caso não receba a nova senha por email, verifique as configurações de anti-spam da caixa postal, assim como a pasta de lixo eletrônico";
                    }
                    else
                    {
                        msgReturn = "<span class='glyphicon glyphicon-remove-sign' style='color:red;font-size:26px;'></span><br />";
                        msgReturn += "Ocorreu um erro! Alteração de senha não concluida.";
                    }
                }
                else
                {
                    msgReturn = "<span class='glyphicon glyphicon-remove-sign' style='color:red;font-size:26px;'></span><br />";
                    msgReturn += "Ocorreu um erro! Alteração de senha não concluida.";
                }
            }
            else
            {
                msgReturn = "<span class='glyphicon glyphicon-remove-sign' style='color:red;font-size:26px;'></span><br />";
                msgReturn += "Usuário não encontrado, verifique o CPF e tente novamente.";
            }
            return msgReturn;
        }
        catch
        {
            return msgReturn;
        }
    }

    [WebMethod]
    public static string AltSenhaComPergunta(string e, string cpf, string isResposta, string r, string s)
    {
        string msgReturn = "Ocorreu um erro! Alteração de senha não concluida.";
        string idEntidade = e.PadLeft(4, '0');
        string userId = string.Concat(idEntidade, cpf);

        try
        {
            System.Web.Security.MembershipUser user = System.Web.Security.Membership.GetUser(userId);

            if (user != null)
            {

                if (isResposta == "no")
                {
                    //Busca a Pergunta secreta do Participante
                    string question = Xerox.EHROBR.WebModule.Security.Users.GetQuestion(userId);
                    return string.IsNullOrEmpty(question) ? "<span class='glyphicon glyphicon-remove-sign' style='color:red;font-size:26px;'></span><br />Você não possui pergunta cadastrada." : "pergunta;" + question;

                }
                else if (isResposta == "yes" && !String.IsNullOrEmpty(r))
                {
                    //Valida a Reposta do Usuário
                    string answer = Xerox.EHROBR.WebModule.Security.Users.GetAnswer(userId);
                    if (answer.Trim().ToUpper() == r.Trim().ToUpper())
                    {

                        if (!string.IsNullOrEmpty(s))
                        {
                            Xerox.EHROBR.WebModule.Security.Users u = Xerox.EHROBR.WebModule.Security.Users.Get(userId);
                            u.Password = s;
                            return "onSenha;";
                        }
                        else
                        {
                            return "onresposta;";
                        }
                    }
                    else
                    {

                        return "offresposta;";
                    }
                }
            }
            else
            {
                msgReturn = "<span class='glyphicon glyphicon-remove-sign' style='color:red;font-size:26px;'></span><br />";
                msgReturn += "Usuário não encontrado, verifique o CPF e tente novamente.";
            }
            return msgReturn;
        }
        catch
        {
            return msgReturn;
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
}