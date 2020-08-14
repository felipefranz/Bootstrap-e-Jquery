
function preloadSaldo() {
    $('#dvErro').hide();    
    if ($('#hdnSaldo').val() == '1') {
        waitMeShow('#dvSaldo')
        $.ajax({
            type: "POST",
            url: "ProfileWeb.aspx/LoadSaldo",
            data: dataValue,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: loadSaldo,
            error: function (err) {
                Error('#dvSaldo', err);
            }
        });
    }
}
function loadSaldo(saldo) {
    var saldoPartic = 0;
    var saldoPatroc = 0;
    var saldoTotal = 0;

    try {
        $('#dvErro').hide();
        if (saldo.d != null) {
            //        var re = /-?\d+/;
            //        var m = re.exec(saldo.d[0].Data_Base);
            //        var d = new Date(parseInt(m[0]));
            //        var date = dateFormat(d);
            $('#lblDtBaseSaldo').text('Data do Saldo: ' + saldo.d[0].Data_Base);
        }

        $(saldo.d).each(function (i, item) {

            $('#grdSaldo tbody').append
            (
            '<tr>' +
            '<td>' + item.NomeConta + '</td>' +
            ($('#hdnEnt').val() != "33" ? '<td>' + item.NomePerfil + '</td>' : '<td></td>') +
            '<td style="font-size:14px;font-weight:bold;">' + new Number(item.SaldoMoeda.toFixed(2)).formatMoney(2, ',', '.') + '</td>' +
            '</tr>'
            );


            saldoPartic += ((item.Responsavel == '01') ? parseFloat(item.SaldoMoeda) : 0);
            saldoPatroc += ((item.Responsavel == '02') ? parseFloat(item.SaldoMoeda) : 0);
            saldoTotal += item.SaldoMoeda;

        });

        if ($('#hdnEscondeSaldo').val() == 'S') {
            $('#dvTotalSaldo>#dvContent>.detail').hide();
            //$('#dvTotalSaldo>#dvContent>.detail:last-child').show();
            $('#grdSaldo>tbody>tr>th:first-child').text('Benefício');
        }

        $('#lblSaldoPartic strong').text(('R$ ' + new Number(saldoPartic.toFixed(2)).formatMoney(2, ',', '.')));
        $('#lblSaldoPatroc strong').text(('R$ ' + new Number(saldoPatroc.toFixed(2)).formatMoney(2, ',', '.')));
        $('#lblSaldoTotal strong').text(('R$ ' + new Number(saldoTotal.toFixed(2)).formatMoney(2, ',', '.')));

        $('#hdnSaldo').val('0');
        waitMeHide('#dvSaldo');
        setHeight();
        registrarAcessoGoogleAnalytics($("#hdnEnt").val(), 'Saldo');
    }
    catch (err) {
        Error('#dvSaldo', 'Ops! Erro ao tentar carregar os dados.');
    }

}
