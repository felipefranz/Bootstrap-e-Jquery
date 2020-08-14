function preLoadCampanha() {
    try {

        var hdnIdPlano = $('#hdnPlano').val();
        var callSuccess = loadCampanha;
        if (hdnIdPlano == 622 || hdnIdPlano == 624) {
            callSuccess = loadCampanhaGebsa;
        }

        $('#dvErro').hide();        
        if ($('#hdnCampanha').val() == '1') {
            waitMeShow('#dvCampanha');
            $.ajax({
                type: "POST",
                url: "ProfileWeb.aspx/LoadCampanha",
                data: dataValue,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: callSuccess,
                error: function (err) {
                    Error('#dvCampanha', err);
                    waitMeHide('#dvCampanha');
                }
            });
            setHeight();

        }


    } catch (err) {
        Error('#dvCampanha', 'Ops! Erro ao gravar os dados.');
        waitMeHide('#dvCampanha');
    }
}

function loadCampanha(info) {
    try {
        if (submodulo != '') {
            if (JSON.parse(submodulo).percentual) {

                $('#dvCampanhaContrib').show();
                var contaBasica = JSON.stringify(eval("(" + info.d.Basica + ")"));
                var contaAdicional = JSON.stringify(eval("(" + info.d.Adicional + ")"));
                var infoPercHtml = JSON.stringify(eval("(" + info.d.Info + ")"));
                var percentualPraticado = '';
                var resultPercentualPraticado = false;
                if (info.d.PercentualPraticado.length > 0) {
                    percentualPraticado = JSON.stringify(eval("(" + info.d.PercentualPraticado + ")"));
                    percentualPraticado = JSON.parse(percentualPraticado);
                    resultPercentualPraticado = true;
                }

                contaBasica = JSON.parse(contaBasica);
                contaAdicional = JSON.parse(contaAdicional);
                infoPercHtml = JSON.parse(infoPercHtml);


                if (contaBasica.max > 0) {
                    for (var i = contaBasica.min; i <= contaBasica.max; i += contaAdicional.incremento) {
                        $('#ddlPerc1202').append($('<option>', {
                            value: i,
                            text: (i + " %").replace('.', ',')
                        }));

                        //'hdnBasicaAtual''
                        //'hdnExcedenteAtual''
                    }
                }
                else $('#ddlPerc1202').parent().hide();

                if (contaAdicional.max > 0) {
                    for (var i = contaAdicional.min; i <= contaAdicional.max; i += contaAdicional.incremento) {
                        $('#ddlPerc1204').append($('<option>', {
                            value: i,
                            text: (i + " %").replace('.', ',')
                        }));
                    }
                }
                else $('#ddlPerc1204').parent().hide();

                //if (percentualPraticado.percentualPraticado.length > 0) {
                if (resultPercentualPraticado == true) {

                    var percentualPraticadoBasica = percentualPraticado.percentualPraticado[0];
                    var percentualPraticadoAdicional = percentualPraticado.percentualPraticado[1];

                    if (contaBasica.max > 0)
                        $('#ddlPerc1202').val(percentualPraticadoBasica);


                    if (contaAdicional.max > 0)
                        $('#ddlPerc1204').val(percentualPraticadoAdicional);

                }

                if (infoPercHtml.html.length > 0 && $('#hdnEnt').val() == 57) {
                    $('#dvPercContribInfo').append(infoPercHtml.html).show();

                    $('#ddlPerc1202').prev().text('Contribuição Mensal (até 10 URPs)');
                    $('#ddlPerc1204').prev().text('Contribuição Mensal (acima de 10 URPs)');
                    //$('#collapsePercContrib:first').append(infoHtml.html)                   


                    var excedente = $('#hdnIsExcedente').val();
                    var hdnBasicaAtual = $('#hdnBasicaAtual').val();

                    //setar valor atual de contribuição
                    //$('#ddlPerc1202').val(hdnBasicaAtual);


                    if (excedente == '1') {
                        var hdnExcedenteAtual = $('#hdnExcedenteAtual').val();

                        $('#ddlPerc1202').attr('disabled', 'disabled');
                        //setar valor atual de contribuição
                        $('#ddlPerc1202').val('3');
                        //$('#ddlPerc1204').val(hdnExcedenteAtual);

                        $('#ddlPerc1204').on('change', function (e) {
                            var percValueBasica = $('#ddlPerc1202  option:selected').val();
                            var percValueExcedente = $('#ddlPerc1204  option:selected').val();
                            var salarioComparacao = $('#hdnSalarioComparacao').val();
                            var salarioAtual = $('#hdnSalarioAtual').val();


                            var vlFaixa1 = (salarioComparacao * percValueBasica) / 100;
                            var vlFaixa2 = ((salarioAtual - salarioComparacao) * percValueExcedente) / 100;
                            var valorContribuicao = vlFaixa1 + vlFaixa2;

                            console.log(percValueBasica);
                            console.log(percValueExcedente);
                            console.log(vlFaixa1);
                            console.log(vlFaixa2);
                            console.log(valorContribuicao);
                            $('#dvPercContribSimuladorContent').remove();
                            $('#dvPercContribSimulador').append(
                                "<div id='dvPercContribSimuladorContent' class='alert alert-info' style='color: #fff;'>" +
                                "<strong>Simulação de contribuição</strong>" +
                                "<p>(A)Faixa até 10 URPs (R$): " + new Number(vlFaixa1.toFixed(2)).formatMoney(2, ',', '.') + "</p>" +
                                "<p>(B)Faixa acima de 10 URPs (R$): " + new Number(vlFaixa2.toFixed(2)).formatMoney(2, ',', '.') + "</p>" +
                                "<p>(A + B) Novo Valor Participante (R$):  <span id='lblNovaContrib'>" + new Number(valorContribuicao.toFixed(2)).formatMoney(2, ',', '.') + "</span></p>" +
                                "<p>(A + B) Novo Valor Partocinadora (R$):  <span id='lblContribAB'>" + new Number(valorContribuicao.toFixed(2)).formatMoney(2, ',', '.') + "</span></p>" +
                                "<p>Total (Participante + Patrocinadora) (R$): <span>" + new Number((valorContribuicao * 2).toFixed(2)).formatMoney(2, ',', '.') + "</span></p>" +
                                "</div>"
                                ).show();

                            //valorContribuicao.toFixed(2).toString().replace('.', ',')


                        });
                    }
                    else {

                        $('#ddlPerc1204').parent().hide();
                        $('#ddlPerc1202').on('change', function (e) {

                            var percValue = $('#ddlPerc1202  option:selected').val();
                            var salarioComparacao = $('#hdnSalarioComparacao').val();
                            var salarioAtual = $('#hdnSalarioAtual').val();

                            var valorContribuicao = (salarioAtual * percValue) / 100;
                            var vlFaixa1 = valorContribuicao;

                            console.log(percValue);
                            console.log(vlFaixa1);
                            console.log(valorContribuicao);

                            $('#dvPercContribSimuladorContent').remove();
                            $('#dvPercContribSimulador').append(
                                "<div id='dvPercContribSimuladorContent' class='alert alert-info' style='color: #fff;'>" +
                                "<strong>Simulação de contribuição</strong>" +
                                "<p>Faixa até 10 URPs (R$): " + vlFaixa1.toFixed(2).toString().replace('.', ',') + "</p>" +
                                "<p>Novo Valor Participante (R$): <span id='lblNovaContrib'>" + valorContribuicao.toFixed(2).toString().replace('.', ',') + "</span></p>" +
                                "<p>Novo Valor Partocinadora (R$): <span id='lblContribAB'>" + valorContribuicao.toFixed(2).toString().replace('.', ',') + "</span></p>" +
                                "<p>Total (Participante + Patrocinadora) (R$): " + (valorContribuicao * 2).toFixed(2).toString().replace('.', ',') + "</p>" +
                                "</div>"
                                ).show();


                        });
                    }

                    //fim embraer

                }

                if (infoPercHtml.html.length > 0 && $('#hdnEnt').val() == 33) {
                    $('#dvPercContribInfo').append(infoPercHtml.html).show();
                    //$('#collapsePercContrib:first').append(infoHtml.html)

                    $('#ddlPerc1202').prev().text('Contribuição Suplementar');
                    $('#ddlPerc1204').prev().text('Contribuição Adicional');
                    var excedente = $('#hdnIsExcedente').val();
                    var hdnBasicaAtual = $('#hdnBasicaAtual').val();

                    //setar valor atual de contribuição
                    //$('#ddlPerc1202').val(hdnBasicaAtual);


                    if (excedente == '1') {
                        $('#ddlPerc1204').on('change', function (e) {
                            totalCalcPrevpepsico();
                        });

                        $('#ddlPerc1202').on('change', function (e) {
                            totalCalcPrevpepsico();
                        });
                    }
                    else {
                        //suplementar
                        $('#ddlPerc1202').attr('disabled', 'disabled');

                        //adicional
                        $('#ddlPerc1204').on('change', function (e) {
                            totalCalcPrevpepsico();
                        });
                    }
                }

                //if (percentualPraticado.percentualPraticado.length > 0) {
                if (resultPercentualPraticado == true) {

                    var percentualPraticado1202 = percentualPraticado.percentualPraticado[0];
                    var percentualPraticado1204 = percentualPraticado.percentualPraticado[1];

                    //$('#ddlInfoPais').val(info.d.Pais);

                }

            }

            if (JSON.parse(submodulo).perfil) {

                var perfisHtml = JSON.stringify(eval("(" + info.d.Perfil + ")"));
                var perfisHtmlInfo = JSON.stringify(eval("(" + info.d.PerfilInfo + ")"));

                perfisHtml = JSON.parse(perfisHtml);
                perfisHtmlInfo = JSON.parse(perfisHtmlInfo);

                $('#dvCampanhaPerfil').show();

                $('#ddlPerfil').append(perfisHtml.perfis);
                if (perfisHtmlInfo.html.length > 0) {

                    $('#campanhaPerfilInfo').append(perfisHtmlInfo.html).show();

                    var pf = $('#ddlPerfil  option:selected').val();
                    $('.dvCampanhaPerfil').hide();
                    $('#dvCampanhaPerfil' + pf).show();

                    $('#ddlPerfil').on('change', function () {

                        var pfsel = $('#ddlPerfil  option:selected').val();
                        $('.dvCampanhaPerfil').hide();
                        $('#dvCampanhaPerfil' + pfsel).show();

                    });


                    if ($('#hdnPerfilPraticado').val() != undefined) {
                        $('#ddlPerfil').parent().prepend('<div class="alert alert-warning"><p><b>Perfil Atual</b>: ' + $('#hdnPerfilPraticado').val() + '</p></div>');
                    }

                }
                else {
                    var pf = $('#ddlPerfil  option:selected').text();
                    if (pf.indexOf("Selecione") < 0) {
                        $('#dvPerfilPraticado').remove();
                        $('#collapsePerfil').prepend('<div id="dvPerfilPraticado" class="form-group">Perfil atualmente praticado: <strong>' + pf + '</strong> </div>')
                    }
                }


                //criar if para embraer


            }


            $('.btnHideContrib').hide();
            $('.btnHidePerfil').hide();
            $('#btnPercContrib').click(function () {
                sendPercentualContrib();
            });

            $('#btnPerfil').click(function () {
                sendPerfil();
            });
            $('#hdnCampanha').val('0');
        }
        waitMeHide('#dvCampanha');
        setHeight();
        registrarAcessoGoogleAnalytics($("#hdnEnt").val(), 'Camapanha');
    } catch (err) {
        Error('#dvCampanha', 'Ops! Erro ao gravar os dados.');
    }
}

function loadCampanhaGebsa(info) {
    //console.log('Campanha Gebsa');

    try {

        if (submodulo != '') {
            if (JSON.parse(submodulo).percentual) {

                $('#dvCampanhaContrib').show();
                var contaBasica = JSON.stringify(eval("(" + info.d.Basica + ")"));
                //var contaAdicional = JSON.stringify(eval("(" + info.d.Adicional + ")"));
                var infoPercHtml = JSON.stringify(eval("(" + info.d.Info + ")"));
                var percentualPraticado = '';
                var resultPercentualPraticado = false;
                if (info.d.PercentualPraticado.length > 0) {
                    percentualPraticado = JSON.stringify(eval("(" + info.d.PercentualPraticado + ")"));
                    percentualPraticado = JSON.parse(percentualPraticado);
                    resultPercentualPraticado = true;
                }

                contaBasica = JSON.parse(contaBasica);
                //contaAdicional = JSON.parse(contaAdicional);
                infoPercHtml = JSON.parse(infoPercHtml);

                $('#ddlPerc1202').prev().text('Contribuição Básica');

                if (contaBasica.max > 0) {
                    $('#ddlPerc1202').children().remove();
                    for (var i = contaBasica.min; i <= contaBasica.max; i += contaBasica.incremento) {
                        $('#ddlPerc1202').append($('<option>', {
                            value: parseFloat(i).toFixed(2),
                            text: (i + " %").replace('.', ',')
                        }));
                    }
                    //if (percentualPraticado.percentualPraticado.length > 0) {
                    if (resultPercentualPraticado == true) {

                        var percentualPraticadoBasica = parseFloat(percentualPraticado.percentualPraticado[0].replace(',', '.')).toFixed(2);
                        //var percentualPraticadoAdicional = percentualPraticado.percentualPraticado[1];
                        $('#ddlPerc1202').val(percentualPraticadoBasica);

                    }

                }
                else $('#ddlPerc1202').parent().hide();

                $('#ddlPerc1204').parent().hide();

                if (infoPercHtml.html.length > 0) {
                    $('#dvPercContribInfo').children().remove();



                    $('#dvPercContribInfo').append(infoPercHtml.html).show();

                    var regra = $('#hdnHabilitaCampanha').val();
                    if (regra == 0) {
                        $('#ddlPerc1202').parent().hide();
                        $('#btnPercContrib').parent().hide();

                    }

                }

                $('#collapsePercContrib').collapse('show');
                $('.btnHideContrib').hide();
                //$('.btnHidePerfil').hide();
                $('#btnPercContrib').click(function () {
                    var basica = $('#ddlPerc1202  option:selected').val();
                    if (basica == undefined) {
                        $.notify.addStyle('notifyPercNot', {
                            html: "<div><span data-notify-html><span></div>"
                        });

                        $.notify("<div class='alert alert-info notify-color' style='word-break: break-word;font-size: 14px;' role='alert'>Selecione o percentual</div>", {
                            style: 'notifyPercNot',
                            autoHide: true, autoHideDelay: 10000, position: 'bottom left'
                        });

                        return;
                    }
                    sendPercentualContrib();
                });
            }

            if (JSON.parse(submodulo).perfil) {

                var perfisHtml = JSON.stringify(eval("(" + info.d.Perfil + ")"));
                var perfisHtmlInfo = JSON.stringify(eval("(" + info.d.PerfilInfo + ")"));

                perfisHtml = JSON.parse(perfisHtml);
                perfisHtmlInfo = JSON.parse(perfisHtmlInfo);

                $('#dvCampanhaPerfil').show();

                $('#ddlPerfil').append(perfisHtml.perfis);
                if (perfisHtmlInfo.html.length > 0) {

                    $('#campanhaPerfilInfo').append(perfisHtmlInfo.html).show();

                    var pf = $('#ddlPerfil  option:selected').val();
                    $('.dvCampanhaPerfil').hide();
                    $('#dvCampanhaPerfil' + pf).show();

                    $('#ddlPerfil').on('change', function () {

                        var pfsel = $('#ddlPerfil  option:selected').val();
                        $('.dvCampanhaPerfil').hide();
                        $('#dvCampanhaPerfil' + pfsel).show();

                    });


                    if ($('#hdnPerfilPraticado').val() != undefined) {
                        $('#ddlPerfil').parent().prepend('<div class="alert alert-warning"><p><b>Perfil Atual</b>: ' + $('#hdnPerfilPraticado').val() + '</p></div>');
                    }

                }
                else {
                    var pf = $('#ddlPerfil  option:selected').text();
                    if (pf.indexOf("Selecione") < 0) {
                        $('#dvPerfilPraticado').remove();
                        $('#collapsePerfil').prepend('<div id="dvPerfilPraticado" class="form-group">Perfil atualmente praticado: <strong>' + pf + '</strong> </div>')
                    }
                }

            }

            var regra = $('#hdnHabilitaCampanhaPerfil').val();
            if (regra == 0) {
                $('#ddlPerfil').parent().hide();
                $('#dvAlertWarning').hide();
                $('#btnPerfil').parent().hide();

            }

            $('#hdnCampanha').val('0');


            $('.btnHideContrib').hide();
            $('.btnHidePerfil').hide();

            $('#btnPerfil').click(function () {
                sendPerfil();
            });
        }
        waitMeHide('#dvCampanha');
        registrarAcessoGoogleAnalytics($("#hdnEnt").val(), 'Camapanha');
    } catch (err) {
        Error('#dvCampanha', 'Ops! Erro ao carregar os dados.');
        waitMeHide('#dvCampanha');
    }
}

function totalCalcPrevpepsico() {
    var percValueSuplementar = Number($('#ddlPerc1202  option:selected').val());
    var percValueAdicional = Number($('#ddlPerc1204  option:selected').val());
    var salarioComparacao = Number($('#hdnSalarioComparacao').val());
    var salarioAtual = Number($('#hdnSalarioAtual').val());

    var parcela1207 = (salarioAtual > salarioComparacao) ? ((salarioAtual - salarioComparacao) * percValueSuplementar) / 100 : 0;
    var parcela1204 = (salarioAtual * percValueAdicional) / 100;
    var parcelaPatroc = ((salarioAtual - salarioComparacao) * 5) / 100;

    var totalParticipante = parcela1207 + parcela1204;
    var totalPatrocinadora = (salarioAtual > salarioComparacao) ? parcelaPatroc + parcela1207 : 0;

    console.log(percValueSuplementar);
    console.log(percValueAdicional);
    console.log(parcela1207);
    console.log(parcela1204);
    console.log(totalParticipante);
    console.log(totalPatrocinadora);

    $('#dvPercContribSimuladorContent').remove();
    $('#dvPercContribSimulador').append(
        "<div id='dvPercContribSimuladorContent' class='alert alert-success' >" +
        "<strong>Simulação de contribuição (R$) </strong>" +
        "<p>Contribuição Suplementar: " + parcela1207.toFixed(2).toString().replace('.', ',') + "</p>" +
        "<p>Contribuição Adicional: <span id='lblNovaContrib'>" + parcela1204.toFixed(2).toString().replace('.', ',') + "</span></p>" +
        "<p>Total Participante: <span id='lblContribAB'>" + totalParticipante.toFixed(2).toString().replace('.', ',') + "</span></p>" +
        "<p>Total Patrocinadora: " + totalPatrocinadora.toFixed(2).toString().replace('.', ',') + "</p>" +
        "</div>"
        ).show();

    setHeight();
}

function sendPercentualContrib() {
    try {
        $('#dvErro').hide();
        waitMeShow('#dvCampanha');

        var basica = $('#ddlPerc1202  option:selected').val();
        var adicional = $('#ddlPerc1204 option:selected').val() == undefined ? "0" : $('#ddlPerc1204 option:selected').val();


        var basicaAtual = $('#hdnBasicaAtual').val() == undefined ? "" : $('#hdnBasicaAtual').val();
        var adicionalAtual = $('#hdnExcedenteAtual').val() == undefined ? "" : $('#hdnBasicaAtual').val();
        var vlContribAtual = $('#hdnContribAtual').val() == undefined ? "" : $('#hdnContribAtual').val();
        var vlNovaContrib = $('#lblNovaContrib').text();
        var vlContribAB = $('#lblContribAB').text();

        var excedente = $('#hdnIsExcedente').val() == undefined ? "" : $('#hdnIsExcedente').val();

        if (excedente == '0') {
            adicional = '0';
        }

        var sendObj = {
            "id": param,
            "basica": basica,
            "basicaAtual": basicaAtual,
            "adicional": adicional,
            "adicionalAtual": adicionalAtual,
            "isExcedente": excedente,
            "vlContribAtual": vlContribAtual,
            "vlNovaContrib": vlNovaContrib,
            "vlContribAB": vlContribAB
        };
        var paramValues = JSON.stringify(sendObj);

        $.ajax({
            type: "POST",
            url: "ProfileWeb.aspx/SendPercentualContrib",
            data: paramValues,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (msgReturn) {
                $('.btnHideContrib').hide();
                $('input[data-btn="campanha"]').show();


                //$('#msgReturnPercContrib').html(msgReturn.d);
                //if (msgReturn.d.indexOf('-ok') > -1) $('#msgReturnPercContrib').parent().addClass('alert-success');
                //$('#msgReturnPercContrib').parent().show();


                $.notify.addStyle('notifyPerc', {
                    html: "<div><span data-notify-html><span></div>"
                });

                $.notify("<div class='alert alert-info notify-color' style='word-break: break-word;font-size: 14px;' role='alert'>" + msgReturn.d + "</div>", {
                    style: 'notifyPerc',
                    autoHide: true, autoHideDelay: 30000, position: 'bottom left'
                });

                waitMeHide('#dvCampanha');
                setHeight();
            },
            error: function (err) {
                $('.btnHideContrib').hide();
                $('input[data-btn="campanha"]').show();
                Error('#dvCampanha', err);
                waitMeHide('#dvCampanha');
            }
        });
        setHeight();
    }
    catch (err) {
        Error('#dvCampanha', 'Ops! Erro ao gravar os dados.');
        waitMeHide('#dvCampanha');
    }
}

function sendPerfil() {
    try {
        $('#dvErro').hide();
        waitMeShow('#dvCampanha');

        var perfil = $('#ddlPerfil  option:selected').val();
        $.notify.addStyle('notifyPerfil', {
            html: "<div><span data-notify-html><span></div>"
        });

        if ($('#hdnEnt').val() == 57) {
            var declaracaoEmbraer = $('input[name=termos]:checked').val();
            var hasDeclaracaoEmbraer = declaracaoEmbraer !== undefined ? true : false;

            if (!hasDeclaracaoEmbraer) {
                waitMeHide('#dvCampanha');
                $.notify("<div class='alert alert-info' style='text-align: center; word-break: break-word;font-size: 14px; color: #fff;' role='alert'>Favor confirmar a leitura e entendimento da Política de Investimento e o Manual de Operacionalização dos Perfis de Investimento EMBRAER PREV</div>", {
                    style: 'notifyPerfil',
                    autoHide: true, autoHideDelay: 10000, position: 'bottom left'
                });

                return;
            }
        }

        if (perfil == '0') {

            waitMeHide('#dvCampanha');
            $.notify("<div class='alert alert-info' style='word-break: break-word;font-size: 14px; color: #fff;' role='alert'>Nenhum perfil foi selecionado!</div>", {
                style: 'notifyPerfil',
                autoHide: true, autoHideDelay: 10000, position: 'bottom left'
            });



        } else {
            var sendObj = {
                "id": param,
                "perfil": perfil
            };
            var paramValues = JSON.stringify(sendObj);

            $.ajax({
                type: "POST",
                url: "ProfileWeb.aspx/SendPerfil",
                data: paramValues,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (msgReturn) {
                    $('.btnHidePerfil').hide();
                    $('input[data-btn="campanha"]').show();
                    //$('#msgReturnPerfil').html(msgReturn.d);
                    //if (msgReturn.d.indexOf('-ok') > -1) $('#msgReturnPerfil').parent().addClass('alert-success');
                    //$('#msgReturnPerfil').parent().show();


                    //$.notify("<div class='alert " + (msgReturn.d.indexOf('-ok') > -1 ? "alert-success" : "alert-info") + "' style='word-break: break-word;font-size: 14px; color: #fff;' role='alert'>" + msgReturn.d + "</div>", {
                    $.notify("<div class='alert alert-info' style='word-break: break-word;font-size: 14px; color: #fff;' role='alert'>" + msgReturn.d + "</div>", {
                        style: 'notifyPerfil',
                        autoHide: true, autoHideDelay: 10000, position: 'bottom left'
                    });

                    waitMeHide('#dvCampanha');
                    setHeight();
                },
                error: function (err) {
                    $('.btnHidePerfil').hide();
                    $('input[data-btn="campanha"]').show();
                    Error('#dvCampanha', err);
                    waitMeHide('#dvCampanha');
                }
            });
            setHeight();
        }


    }
    catch (err) {
        Error('#dvCampanha', 'Ops! Erro ao gravar os dados.');
        waitMeHide('#dvCampanha');
    }
}