var dataValue;
var param = ((getParameterByName('id') != null) ? getParameterByName('id') : getParameterByName('Id'));
if (param != null && param != undefined) {
    dataValue = "{id: '" + param + "'}";
}
else
{
    var paramEntid = ((getParameterByName('e') != null) ? getParameterByName('e') : getParameterByName('E'));
    if (paramEntid != null && paramEntid != undefined) {
        dataValueGuest = "{id: '" + paramEntid + "'}";
        dataValue = "{id: '0'}";
        tela = "Guest.aspx";
    }
}
   
//Função LoadSimulador está no arquivo:
//https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/js/base_scripts/view-model.js
function preloadSimulador() {

        $('#dvErro').hide();
        if ($('#hdnSimulador').val() == '1' && (paramEntid == null || paramEntid == undefined)) {
            waitMeShow('#dvSimulador');
            $.ajax({
                type: "POST",
                url: "ProfileWeb.aspx/PesqUserName",
                data: dataValue,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: LoadSimulador,
                error: function (err) {
                    Error('#dvSimulador', err);
                }
            });
            $('#hdnSimulador').val('0');
            //waitMeHide('#dvSimulador');
        }
        else {
            
                $('#dvRowSimulador').hide();
                $('#dvRowPreSimulador').show();
                setHeight();
            
        }
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

    

