using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using System.Web.Script.Serialization; 
//using EDS.EHRO.WebModule.IN26;
using Xerox.EHROBR.WebModule.IN26;
using EDS.SpecialAccounts.FrameWork.Data;
using EDS.SpecialAccounts.FrameWork.Data.Common;
using System.Web.Services.Protocols;
using System.ServiceModel.Web;


/// <summary>
/// Summary description for SOA
/// </summary>
[WebService(Namespace = "https://www.portal-hro.com.br/ws/Users")]
//[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[WebServiceBinding(Name = "UsersSoap", Location = "https://www.portal-hro.com.br/ws/Users.asmx")]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
public class Users : System.Web.Services.WebService
{
    internal const string salt = "joi561FDSA-G8GE8-859FsfDB984FHV";
    private static System.Collections.Specialized.NameValueCollection appSettings = System.Web.Configuration.WebConfigurationManager.AppSettings;
    public Users()
    {
        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    
    
    
    //[WebMethod]
    //public Xerox.EHROBR.WebModule.Security.Users UsersList(long userId)
    //{
    //    return new Xerox.EHROBR.WebModule.Security.Users(userId);
    //}

    //[WebMethod]
    //public Xerox.EHROBR.WebModule.IN26.Participante ParticipanteList(int idParticipante)
    //{
    //    return new Xerox.EHROBR.WebModule.IN26.Participante(idParticipante);
    //}

    [WebMethod]
    //[SoapDocumentMethod(Binding = "UsersSoap")]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)] 
    public void LoginJSON(string UserName, string Password)
    {
        Dictionary<string, string> d = new Dictionary<string, string>();
        Context.Response.Clear();
        Context.Response.ContentType = "application/json";
        try
        {
            if (!String.IsNullOrEmpty(UserName) && !String.IsNullOrEmpty(Password) )
            {
               // if (UserName.Length <= 40 && (Password.Length >= 6 && Password.Length <= 40))
                if (UserName.Length <= 40 && Password.Length <= 40)
                {
                SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();
                Xerox.EHROBR.WebModule.Security.UsersWebService uService = Xerox.EHROBR.WebModule.Security.UsersWebService.GetIdParticipanteByUserName(UserName);

                uService.UserName = UserName;
                string pswReturn = uService.Password;

                    if (uService.passwordEqual(Password, pswReturn))
                    {
                        string encrypt = rijndae.EncryptRijndael(uService.Id.ToString(), salt);
                        string decrypt = rijndae.DecryptRijndael(encrypt, salt);
                        d.Add("status", "true");
                        d.Add("mensagem", "ok");
                        d.Add("id", encrypt);
                        d.Add("cpf", uService.CPF);
                        d.Add("situacao", uService.Situacao);
                        d.Add("motivo", uService.Motivo);
                    }
                    else
                    {
                        d.Add("status", "false");
                        d.Add("mensagem", "Usuário ou senha incorreta");
                        d.Add("id", "");
                        d.Add("cpf", "");
                        d.Add("situacao", "");
                        d.Add("motivo","");

                    }
                }
                else
                {
                    d.Add("status", "false");
                    d.Add("mensagem", "Usuário ou senha incorreta");
                    d.Add("id", "");
                    d.Add("cpf", "");
                    d.Add("situacao", "");
                    d.Add("motivo", "");

                }
                //{"status": "true", "mensagem":"", "id":"F87SF8S7F9D8F7SDF"}
                //{"status": "false", "mensagem":"Usuário ou senha incorreta", "id":""}
            }
            else
            {
                d.Add("status", "false");
                d.Add("mensagem", "Usuário ou senha incorreta");
                d.Add("id", "");
                d.Add("cpf", "");
                d.Add("situacao", "");
                d.Add("motivo", "");
            }
            
        }
        catch (Exception ex)
        {
            d.Add("status", "false");
            d.Add("mensagem", "Usuário ou senha incorreta");
            d.Add("id", "");
            d.Add("cpf", "");
            d.Add("situacao", "");
            d.Add("motivo", "");
        }
        //return new JavaScriptSerializer().Serialize(d);        

        JavaScriptSerializer jss = new JavaScriptSerializer();

        Context.Response.Write(jss.Serialize(d));
    }

    [WebMethod]
    public string UploadFiles()
    {
        try
        {
            string name = "";
            var httpPostedFile = HttpContext.Current.Request.Files["UploadedFile"];
            string id = "";
            if(HttpContext.Current.Request.UrlReferrer.Query.Contains("?id="))
            {
                SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption rijndae = new SpecialAccounts.Application.Cryptographic.RijndaelManagedEncryption();
                id = HttpContext.Current.Request.UrlReferrer.Query.Replace("?id=","");

                string decryptParticip = rijndae.DecryptRijndael(id, salt);

                foreach (string file in HttpContext.Current.Request.Files)
                {
                    HttpPostedFile hpf = HttpContext.Current.Request.Files[file] as HttpPostedFile;
                    if (hpf.ContentLength == 0)
                        continue;
                    if (hpf.ContentLength > 2097152) // 2MB
                    { 
                        return "excedido";//excedido o tamanho do arquivo
                    }

                    string typeMIME = hpf.ContentType;
                    if (!typeMIME.Contains("jpeg") && !typeMIME.Contains("png")) // 2MB
                    {
                        return "formato";//formato de arquivo não aceito
                    }

                    name = hpf.FileName;
                    string type = name.Substring(name.IndexOf('.'));

                    string savedFileName = String.Concat(GetAppSetting("ImgProfile"),decryptParticip, type);
                    string savedFileNameBkp = String.Concat(GetAppSetting("ImgProfileBKP"), decryptParticip, type);
                    name = String.Concat(decryptParticip, type);

                    int idParticipante = Convert.ToInt32(decryptParticip);
                    short tipo = 1;// tipo de imagem Mobile = 1
                    Xerox.EHROBR.WebModule.IN26.Imagem save = new Xerox.EHROBR.WebModule.IN26.Imagem()
                    {
                        IdParticipante = idParticipante,
                        Tipo = tipo,
                        NomeImagem = name
                    };

                    save.Add();

                    name = name + "?" + DateTime.Now.Ticks;
                    try
                    {
                        hpf.SaveAs(savedFileName);
                        hpf.SaveAs(savedFileNameBkp);
                    }
                    catch
                    {
                        if (System.IO.File.Exists(savedFileName))
                            System.IO.File.Delete(savedFileName);

                        hpf.SaveAs(savedFileName);
                    }
                }
                
            }
            return name;
        }
        catch (Exception)
        {

            return "";
        }
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
    //[WebMethod]
    //public Xerox.EHROBR.WebModule.Security.UsersWebService LoginXML(string UserName, string Password)
    //{
        //Xerox.EHROBR.WebModule.Security.UsersWebService uService = Xerox.EHROBR.WebModule.Security.UsersWebService.GetIdParticipanteByUserName(UserName);
        
        ////Xerox.EHROBR.WebModule.Security.Users u = new Xerox.EHROBR.WebModule.Security.Users();
        //uService.UserName = UserName.Trim();
        //string pswReturn = uService.Password;
        //Dictionary<string, string> d = new Dictionary<string, string>();
        //if (uService.passwordEqual(Password, pswReturn))
    //    {
    //        uService.Status = true;
    //        uService.Mensagem = "";
    //        uService.Id = u.IdParticipante + "";
    //    }
    //    else
    //    {
    //        uService.Mensagem = "Usuário ou senha incorreta";
    //        uService.Status = false;
    //        uService.Id = "";
    //    }
    //    //{"status": "true", "mensagem":"", "id":"F87SF8S7F9D8F7SDF"}

    //    //{"status": "false", "mensagem":"Usuário ou senha incorreta", "id":""}

    //    return uService;
    //    // return new Xerox.EHROBR.WebModule.Security.Users(userId);
    //}
}

