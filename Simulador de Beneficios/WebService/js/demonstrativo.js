function preloadDemonstrativo() {
    $('#dvErro').hide();        
    if ($('#hdnDemonstrativo').val() == '1') {
        waitMeShow('#dvDemonstrativo');
        $.ajax({
            type: "POST",
            url: "ProfileWeb.aspx/LoadDemonstrativo",
            data: dataValue,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: loadDemonstrativo,
            error: function (err) {
                Error('#dvDemonstrativo', err);
            }
        });
    }
}
function loadDemonstrativo(demonstrativo) {
    var saldoPartic = 0;
    var saldoPatroc = 0;
    var saldoTotal = 0;

    try {
        $('#dvErro').hide();
        if (demonstrativo.d != null) {

            var ultIndice = demonstrativo.d.length - 1;
        }
        var contador = -1;
        var tipoPagto;
        var divRowAccordion = '';
        var divContentAccordion = '';
        var divContentItemAccordion = '';
        var divTotalPagmento = '';
        var divMsg = '';
        var nmParticBenefit = '';
        var escondeSaldo = $('#hdnEscondeSaldo').val();

        $(demonstrativo.d).each(function (i, item) {
            contador = i;
            if ((tipoPagto != item.Benefit && i > 0) || (nmParticBenefit != item.Participant && i > 0)) {
                divContentAccordion = divContentAccordion + divContentItemAccordion + '</tbody></table>';
                divRowAccordion = divRowAccordion + divContentAccordion + divTotalPagmento + divMsg + '</div>';
                $('#accordionDemo').append(divRowAccordion);
            }
            if (tipoPagto != item.Benefit || nmParticBenefit != item.Participant) {

                var re = /-?\d+/;
                var m = re.exec(item.PaymentDate);
                var d = new Date(parseInt(m[0]));
                var paymentDate = dateFormat(d);
                var paymentDateFmt = MonthYearFormat(d);


                divRowAccordion = '<div class="row panel-demonstrativo">' +
                               '<a data-toggle="collapse" data-parent"#accordionDemo" aria-expanded="true" href="#demo' + i + '" onclick=\'toggleGlyphicon(\"#spnDemo' + i + '\")\'>' +
                               '<div class="col-sm-12 col-sx-12 header-demonstrativo" style="padding-left: 10px;">' +
                                item.Participant +
                            '</div>' +

                            '<div class="col-sm-12 col-sx-12 header-demonstrativo" style="padding-left: 10px;">' +
                            '<table style="border:0">' +
                            '<tr><td style="width:28%;font-weight:bold">Benefício: </td><td>' + item.Benefit + '</td></tr>' +
                            '<tr><td style="width:28%;font-weight:bold">Pagamento: </td><td>' + item.Payment + '</td></tr>' +
                            '<tr><td style="width:28%;font-weight:bold">Perfil:</td><td class="profile-demo">' + item.Profile + '</td></tr>' +
                            '</table>' +

                            '</div>' +

                           '</a>' +
                               '</div>' +
                               '<div class="row demo-expand">' +
                               '<a data-toggle="collapse" data-parent"#accordionDemo" aria-expanded="true" href="#demo' + i + '" onclick=\'toggleGlyphicon("#spnDemo' + i + '")\'>' +
                               '<span id="spnDemo' + i + '" class="glyphicon glyphicon-menu-up" style="font-size:18px"></span></a></div>';

                divContentAccordion = '<div id="demo' + i + '" class="panel-collapse collapse in" aria-expanded="true" >' +
                                        '<div class="panel-heading panel-demo-dependente"><div class="row"><div class="col-xs-4 col-sm-4">Dep. IR  <span class="badge">' + item.DependentIT + '</span></div><div class="col-xs-8 col-sm-8">Data do Crédito: <strong>' +
                                        '<span ID="lblDtCredito' + i + '" class="center">' + paymentDate + '</span></strong></div></div></div>' +
                                       '<table class="table table-bordered"  cellspacing="0" rules="all"  border="1" id="grdDemonstrativo' + i + '" style="border-collapse:collapse;margin:0;">' +
                                           '<tbody>' +
                                               '<tr >' +
                                                   '<th scope="col" style="font-size:14px;width: 37%;">Descrição</th>' +
                                                   '<th scope="col" style="font-size:14px;width:25%;">Valor (R$)</th>' +
                                           '</tr>';

                divTotalPagmento = '<div class="content" id="dvTotalDemonstrativo' + i + '">' +
                                        '<div class="content" id="dvContent' + i + '">' +
                                            '<div class="detail">' +
                                                '<h6>Valor Liquído</h6>' +
                                                '<p id="lblDemonstrativoPartic' + i + '"><strong> R$ ' + new Number((item.IncomeProvent - item.IncomeDiscount).toFixed(2)).formatMoney(2, ',', '.') + '</strong></p>' +
                                            '</div>' + (escondeSaldo != 'S' ?
                                            '<div class="detail">' +
                                                '<h6>Saldo Remanescente em : ' + paymentDateFmt + '</h6>' +
                                                '<p id="lblDemonstrativoPatroc' + i + '"><strong> R$ ' + new Number((item.BalanceEnd * item.QuoteValue).toFixed(2)).formatMoney(2, ',', '.') + '</strong></p>' +
                                            '</div>' : "") +

                                        '</div>' +
                                     '</div>';
                divMsg = '<div class="row" style="padding:10px 10px 0;font-size:14px" >' +
                            '<p>' +
                            item.EntityMessage +
                            '</p>' +
                            '</div>';

                divContentItemAccordion = '';
            }
            else { }


            divContentItemAccordion = divContentItemAccordion + '<tr class="trDemoDescricao">' +
                                                   '<td style="font-size:14px;">' + item.Item + '</td>' +
                                                   (item.ItemProcess == 'D' ? '<td class="trDemoVlNegativo"> -' + new Number(item.ItemIncome.toFixed(2)).formatMoney(2, ',', '.') + '</td>' : '<td style="font-weight:bold!important;font-size:14px;">' + new Number(item.ItemIncome.toFixed(2)).formatMoney(2, ',', '.') + '</td>') +
                                                 '</tr>';





            if ((tipoPagto == item.Benefit && ultIndice == i) || (nmParticBenefit == item.Participant && ultIndice == i)) {
                divContentAccordion = divContentAccordion + divContentItemAccordion + '</tbody></table>';
                divRowAccordion = divRowAccordion + divContentAccordion + divTotalPagmento + divMsg + '</div>';
                $('#accordionDemo').append(divRowAccordion);
            }

            tipoPagto = item.Benefit;
            nmParticBenefit = item.Participant;
        });

        if (contador == -1) {
            $('#accordionDemo').append(
                '<div class="aviso">' +
                '<p>Não foi encontrado ou ainda não está disponível o demonstrativo de pagamento de benefícios.</p>' +
                '</div>'
                );
        } else if (contador == 0 && ultIndice == 0) {
            divContentAccordion = divContentAccordion + divContentItemAccordion + '</tbody></table>';
            divRowAccordion = divRowAccordion + divContentAccordion + divTotalPagmento + divMsg + '</div>';
            $('#accordionDemo').append(divRowAccordion);
        }

        $('#hdnDemonstrativo').val('0');
        $('#dvDemonstrativo').waitMe('hide');
        registrarAcessoGoogleAnalytics($("#hdnEnt").val(), 'Demonstrativo');
    }
    catch (err) {
        Error('#dvDemonstrativo', 'Ops! Erro ao tentar carregar os dados.');
    }

}