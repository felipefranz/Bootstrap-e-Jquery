function preloadRentab() {
    $('#dvErro').hide();    
    if ($('#hdnRentab').val() == '1') {
        waitMeShow('#dvRentabilidade');
        var urlajx = "ProfileWeb.aspx/LoadRentab";
        var dataValueRentab = dataValue;
        if ($('#hdnEnt').val() == 61) {
            urlajx = "ProfileWeb.aspx/LoadRentabEvolucao";
            if ($('#hdnPlano').val() == 616) { dataValueRentab = "{id: '" + param + "', quota: '" + 852 + "'}"; }
            if ($('#hdnPlano').val() == 614) { dataValueRentab = "{id: '" + param + "', quota: '" + 857 + "'}"; }
        }

        $.ajax({
            type: "POST",
            url: urlajx,
            /*url: "ProfileWeb.aspx/LoadRentab",*/
            data: dataValueRentab,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: loadRentab,
            error: function (err) {
                Error('#dvRentabilidade', err);
            }
        });
    }

}
function loadRentab(rentab) {


    var re = /-?\d+/;
    var countMonth = 0;
    var rowspan = 0;
    var tmpMonth;
    var rentabAcumulada;


    try {
        if (rentab.d.length > 0) {
            var ano = re.exec(rentab.d[0].DataPerfil);
            //var dateAno = new Date(parseInt(ano[0])).getFullYear();
            var dateAno = new Date().getFullYear();
            var cMonth = new Date(parseInt(ano[0]));
            cMonth.setHours(cMonth.getHours() + 4);
            countMonth = (cMonth.getMonth() % 2);
            tmpDate = re.exec(rentab.d[0].DataPerfil);

            $('.pRentab').append(rentab.d[0].HtmlValorAcumulado);

            if ($('#hdnEnt').val() == 18) {
                //$("#dvRentabAcum12 div:first-child").hide();
                //$("#dvRentabAcum12:parent").append("<br><p style='font-size:12px;'>O Perfil Super Conservador está disponível a partir de Abril/2018</p>");
                //$("#dvRentabAcum12:parent").append("<br><p style='font-size:12px;'>O Perfil Super Conservador não apresenta valor acumulado por ter iniciado a partir de Abril/2018</p>");
            }
            else if ($('#hdnEnt').val() == 33) {

                $('#dvRentabAcumAno>div:last>p>strong>span').text('Últimos 24 Meses');


            }

        }

        $(rentab.d).each(function (i, item) {
            if (item.NomePerfil.indexOf('CONSERVADOR - (BRAD. ALM)') > 0 || item.NomePerfil.indexOf('PREVMON-(BRAD.OUTROS)') > 0) {
            } else {
                var m = re.exec(item.DataPerfil);
                if (tmpDate.toString() == m.toString()) {
                    rowspan = rowspan + 1;
                    //    templateRentabAcumAno += '<div class="col-xs-4" style="border-right: 1px dashed #fff">'+
                    //    '<p><strong>' + item.NomePerfil + '</strong></p>' +
                    //    '<p style="font-size: 26px">#' + item.NomePerfil + '</p>' +
                    //'</div>'

                }


            }


        });

        $(rentab.d).each(function (i, item) {

            var m = re.exec(item.DataPerfil);
            var d = new Date(parseInt(m[0]));
            d.setHours(d.getHours() + 4);
            var date = MonthYearFormat(d);
            var month = d.getMonth();
            var rowspan = item.rowspan;



            if (item.NomePerfil.indexOf('CONSERVADOR - (BRAD. ALM)') > 0 || item.NomePerfil.indexOf('PREVMON-(BRAD.OUTROS)') > 0) {

            } else {
                var r = (month % 2);
                if (countMonth == r) {
                    var td = '<td rowspan="' + rowspan + '" style="vertical-align: middle;font-weight: bold;font-size: 13px;">' + date + '</td>';
                    countMonth = (r == 0) ? 1 : 0;
                }
                else {
                    var td = '';
                }

                $('#grdRentab tbody').append
                (

                ((r == 1) ? '<tr>' : '<tr class="rowRentab" >') +
                //'<td rowspan="3" >' + date + '</td>' +
                td +
                //'<td>' + item.NomePerfil + '</td>' +
                ($('#hdnEnt').val() != "33" ? '<td>' + item.NomePerfil + '</td>' : '<td></td>') +
                ((item.VariaPerfil_fmt.indexOf('-') !== -1 && item.VariaPerfil_fmt.length > 1 && $('#hdnEnt').val() != "63") ?
                '<td style="font-size:14px;font-weight:bold;color:#00b7d3">' + item.VariaPerfil_fmt + '</td>' : '<td style="font-size:14px;font-weight:bold;">' + item.VariaPerfil_fmt + '</td>') +
                '</tr>'
                );
            }
        });

        $('#hdnRentab').val('0');
        waitMeHide('#dvRentabilidade');
        setHeight();
        registrarAcessoGoogleAnalytics($("#hdnEnt").val(), 'Rentabilidade');
    } catch (err) {
        Error('#dvRentabilidade', 'Ops! Erro ao tentar carregar os dados.');
    }
}