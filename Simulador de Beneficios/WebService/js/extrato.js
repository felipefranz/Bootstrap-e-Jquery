function preloadExtrato() {
    $('#dvErro').hide();    
    if ($('#hdnExtrato').val() == '1') {
        waitMeShow('#dvExtrato');
        $.ajax({
            type: "POST",
            url: "ProfileWeb.aspx/LoadExtrato",
            data: dataValue,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: loadExtrato,
            error: function (err) {
                Error('#dvExtrato', err);
            }
        });
    }

}
function loadExtrato(extrato) {
    try {
        $('#dvErro').hide();

        if ($('#hdnEnt').val() == "33") {
            //var rowspanmax = 0;
            if (extrato.d.length > 0) {
                //var tmpDate = extrato.d[0].DataCompet;
                //$(extrato.d).each(function (i, item) {
                //    if (tmpDate.toString() == item.DataCompet.toString()) {
                //        rowspanmax = rowspanmax + 1;
                //    }
                //});
                //var row = 1;
                $(extrato.d).each(function (i, item) {

                    $('#grdExtrato tbody').append
                            (
                            '<tr>' +
                            //((row == 1) ? '<td rowspan="' + rowspanmax + '" style="vertical-align: middle;font-weight: bold;font-size: 13px;">' + item.DataCompet + '</td>' : '') +
                            '<td style="font-weight:bold;">' + item.DataCompet + '</td>' +
                            '<td>' + item.NomeConta + '</td>' +
                            '<td></td>' +
                            '<td style="font-size:14px;font-weight:bold;">' + new Number(item.ValorMoeda.toFixed(2)).formatMoney(2, ',', '.') + '</td>' +
                            '</tr>'
                            );


                    //if (row == rowspanmax) row = 1; else row = row + 1;

                });
            }
        }
        else {
            $(extrato.d).each(function (i, item) {

                $('#grdExtrato tbody').append
                        (
                        '<tr>' +
                        '<td>' + item.DataCompet + '</td>' +
                        '<td>' + (($('#hdnPlano').val() == "616") ? item.NomeConta.replace(' PATROCINADORA', ' INSTITUIDORA').replace(' PATROC', ' INSTITU') : item.NomeConta) + '</td>' +
                        '<td>' + item.NomePerfil + '</td>' +
                        '<td style="font-size:14px;font-weight:bold;">' + new Number(item.ValorMoeda.toFixed(2)).formatMoney(2, ',', '.') + '</td>' +
                        '</tr>'
                        );

            });
        }

        $('#hdnExtrato').val('0');
        waitMeHide('#dvExtrato');
        setHeight();
        registrarAcessoGoogleAnalytics($("#hdnEnt").val(), 'Extrato');
    }
    catch (err) {
        Error('#dvExtrato', 'Ops! Erro ao tentar carregar os dados.');
    }
}