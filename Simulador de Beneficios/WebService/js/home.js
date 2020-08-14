function preloadHome() {
    $('#dvErro').hide();    
    if ($('#hdnHome').val() == '1') {
        if ($("#hdnEnt").val() == 61) {
            //var linkEleicao = "https://www.rzc-rotinas.com.br/fipecq2018/https/votacao.cfm#vot";
            //var linkEleicaoReset = "https://www.rzc-rotinas.com.br/fipecq2018/https/esp01.cfm?cod=" + $('#hdnEleicao').val();
            //var linkEleicaoResultado = "https://www.rzc-rotinas.com.br/fipecq2018/https/votacao.cfm";

            //var object = {
            //    //"d":
            //    //{ 
            //    //    "Titulo": "", "HtmlContent": "<img src='https://www.portal-hro.com.br/ws/img/61/appHome.jpg' usemap='#votacaomap' style='width:100%' /><map name='votacaomap'>  <area shape='rect' coords='0,0,391,180' href='"+linkEleicaoReset +"'><area shape='rect' coords='0,204,391,465' href='"+linkEleicao +"'></map>" }
            //    //}

            //    "d":
            //     { "Titulo": "", "HtmlContent": "<a href='" + linkEleicaoResultado + "'><img src='https://www.portal-hro.com.br/ws/img/61/Banner_resultado.jpg' style='width:100%' /></a>" }
            //}
            //$('#dvHomeContent').removeClass('panel-body').attr('style', 'min-height:620px');
            //loadHome(object);
            setHeight();
        }
        else {
            waitMeShow('#dvHome');
            $.ajax({
                type: "POST",
                url: "ProfileWeb.aspx/LoadHome",
                data: dataValue,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: loadHome,
                error: function (err) {
                    Error('#dvHome', err);
                }
            });
        }
        setHeight();
    }
}

function loadHome(info) {
    try {

        $('#spnHomeTitulo').append(info.d.Titulo);
        $('#dvHomeContent').append(info.d.HtmlContent);
        $('#hdnHome').val('0');
        waitMeHide('#dvHome');
        setHeight();
        registrarAcessoGoogleAnalytics($("#hdnEnt").val(), 'Home');
    } catch (err) {
        Error('#dvHome', 'Ops! Erro ao tentar carregar os dados.');
    }
}