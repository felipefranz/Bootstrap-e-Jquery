//Boleto
function preloadBoleto() {
    $('#dvErro').hide();    
    if ($('#hdnBoleto').val() == '1') {
        waitMeShow('#dvBoleto');
        $.ajax({
            type: "POST",
            url: "ProfileWeb.aspx/LoadBoleto",
            data: dataValue,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: loadBoleto,
            error: function (err) {
                Error('#dvBoleto', err);
            }
        });

    }
    else { $('#dvBoleto').waitMe('hide'); }
    setHeight();
}
function loadBoleto(info) {

    try {
        var contador = 0;
        $(info.d).each(function (i, item) {
            contador = contador + 1;

            $('#accordionBoleto').append(
                 '<div class="panel-heading panel-boleto" >' +
                '<a data-toggle="collapse" data-parent"#accordionBoleto" aria-expanded="false" style="text-decoration:none;display:block" href="#boleto' + contador + '" onclick=\'toggleGlyphicon(\"#spnBoleto' + i + '\")\'>' +
                //'<span id="lblDescricao">' + (item.TipoBoleto.indexOf("Empréstimo") == 0 ? "Parcela de Empréstimo Pessoal" : "Contribuição de Autopatrocínio") + '</span>' +
                '<span id="lblDescricao">' + (item.TipoBoleto.indexOf("Empréstimo") == 0 ? item.TipoBoleto : "Contribuição de Autopatrocínio") + '</span>' +
                '</a>' +
                '</div>' +
                '<div class="boleto-expand">' +
                '<a data-toggle="collapse" data-parent"#accordionBoleto" aria-expanded="false" style="text-decoration:none;display:block" href="#boleto' + contador + '" onclick=\'toggleGlyphicon(\"#spnBoleto' + i + '\")\'>' +
                '<span id="spnBoleto' + i + '" class="glyphicon glyphicon-menu-down" style="font-size:18px" /></a>' +
                '</div>' +
                '<div id="boleto' + contador + '" class="panel-collapse collapse" aria-expanded="false" >' +

                '<div class="panel-heading data-boleto">' +
                'Data de Vencimento: ' +
                '<span id="lblVencto">' + item.Vencto + '</span>' +
                '</div>' +
                '<div class="panel-heading data-valor">' +
                '<span id="lblValorDoc" >Valor R$ ' + new Number(item.Valor_doc.toFixed(2)).formatMoney(2, ',', '.') + '</span>' +
                '</div>' +
                '<div class="panel-body code-boleto" style="border-top: 0">' +
                '<small style="font-size:14px">Utilize o número do código de barras abaixo para pagamento de seu boleto no aplicativo, telefone ou internet banking do seu Banco </small><br /><br />' +
                '<span id="lblCod' + contador + '" >' + item.Cod_digitavel + '</span>' +
                '</div>' +
                '<div class="btn-boleto">' +
                '<span style="padding:10px 0;font-size:14px">Copie o número do seu código de barras</span><br /><br />' +
                '<a class="btn btn-primary"  onclick="CopyText(this,\'lblCod' + contador + '\')">  Copiar Código </a>' +
                '</div>' +
                '</div>'
                );
        });

        if (contador == 0) {
            $('#accordionBoleto').append(
                '<div class="aviso">' +
                '<p>Não existem boletos pendentes para pagamento.</p>' +
                '</div>'
                );
        }
        $('#hdnBoleto').val('0');
        waitMeHide('#dvBoleto');
        setHeight();
        registrarAcessoGoogleAnalytics($("#hdnEnt").val(), 'Boleto');
    } catch (err) {
        Error('#dvBoleto', 'Ops! Erro ao tentar carregar os dados.');
    }
}