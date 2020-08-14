function preloadCadastro() {
    $('#dvErro').hide();    
    if ($('#hdnCadastro').val() == '1') {
        waitMeShow('#dvCadastro');
        $.ajax({
            type: "POST",
            url: "ProfileWeb.aspx/LoadInfo",
            data: dataValue,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: loadCadastro,
            error: function (err) {
                Error('#dvCadastro', err);
            }
        });
        setHeight();
    }

}
function loadCadastro(info) {

    try {
        $(info.d).each(function (i, item) {
            $('#lblNome').text(item.Nome);
            $('#lblCpf').text(item.Cpf);
            $('#lblPlano').text(item.Plano);
            $('#lblPatroci').text(item.Patroci);
            $('#lblRegime').text(item.Regime);
            $('#lblSituacao').text(item.Situacao);
            $('#lblDtAdmissao').text(item.DtAdmissao);
            $('#lblDtAdesao').text(item.DtAdesao);
            $('#lblEnd').text(item.Endereco);


            $('#lblEmail').text(item.EndEletronico);
            $('#lblEmailCom').text(item.EndEletronicoCom);
            $('#lblFone').text(item.Fone);
            $('#lblFoneCom').text(item.FoneCom);
            $('#lblcel').text(item.Cel);
            $('#lblPerfil').parent().show();
            $('#lblPerfil').text(item.PerfilParticipante);

            if ($('#hdnEnt').val() == 27) {
                if (item.EndEletronico == '') $('#lblEmail').parent().hide();
                if (item.EndEletronicoCom == '') $('#lblEmailCom').parent().hide();
                if (item.Fone == '') $('#lblFone').parent().hide();
                if (item.FoneCom == '') $('#lblFoneCom').parent().hide();
                if (item.Cel == '') $('#lblcel').parent().hide();
            }

            if ($('#hdnEnt').val() == 62) {
                //$('li[data-tipo="perfil"]').show();
                $('#lblPerfil').parent().show();
                $('#lblPerfil').text(item.PerfilParticipante);

                $('#flAssunto').show();
            }
            //$('#lblBanco').text(item.Banco);
            //$('#lblAgencia').text(item.Agencia);
            //$('#lblConta').text(item.Conta);

            $('#txtFlEmail').val(item.EndEletronico);

            var tel = item.Fone.replace(/[a-zA-Z]|\\/g, '');
            $('#txtFlTel').val(tel);

            $('#dvAcessos').append(item.Acessos);

            //Situacao Participante
            $('#cbSelecaoAcesso').change(function () {
                var str = '';
                $("#cbSelecaoAcesso option:selected").each(function () {
                    str += $(this).val() + " ";
                });
                var url = window.location.pathname + "?id=" + str;

                window.location.href = url;
            });

            $('#dvCadastroAlert').append(item.MsgCadastroAlert);
            $('#dvFaleConoscoAlert').append(item.MsgFaleConoscoAlert)

        });
        $('#hdnCadastro').val('0');

        waitMeHide('#dvCadastro');
        setHeight();
        registrarAcessoGoogleAnalytics($("#hdnEnt").val(), 'Cadstro');
    } catch (err) {
        Error('#dvCadastro', 'Ops! Erro ao tentar carregar os dados.');

    }
}
function preloadDadosCadastrais() {
    $('#dvErro').hide();    
    if ($('#hdnDadosCadastrais').val() == '1') {
        waitMeShow('#dvAtualizacaoCadastral');
        $.ajax({
            type: "POST",
            url: "ProfileWeb.aspx/LoadDadosCadastrais",
            data: dataValue,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: loadDadosCadastrais,
            error: function (err) {
                Error('#dvAtualizacaoCadastral', err);
            }
        });
        setHeight();
    }
}
function loadDadosCadastrais(info) {

    try {

        $('.btnHideLoan').hide();
        $('input[data-btn="info"]').click(function () {
            $(this).hide();
            $(this).next().show();

        });

        $('#ddlInfoEstadoCivil').val(info.d.EstadoCivil);
        $('#txtInfoDoc').val(info.d.DocumentoIdentidade);
        $('#txtInfoEmissor').val(info.d.OrgaoEmissor);
        $('#txtInfoDtEmissao').val(info.d.DataEmissao);
        $('#txtInfoNaturalidade').val(info.d.Naturalidade);
        $('#txtInfoNacionalidade').val(info.d.Nacionalidade);
        $('#txtInfoNomeMae').val(info.d.NomeMae);
        $('#txtInfoNomePai').val(info.d.NomePai);
        //PPE
        $('#ddlInfoPPE').val(info.d.PoliticamenteExposta == "" ? "N" : info.d.PoliticamenteExposta);
        if (info.d.PoliticamenteExposta == 'S') {
            $('#txtInfoPPEDtExposicao').parent().show();
            $('#txtInfoPPECargo').parent().show();

            $('#txtInfoPPEDtExposicao').val(info.d.PPEDtExposicao);
            $('#txtInfoPPECargo').val(info.d.PPECargo);
            setHeight();

        } else {
            $('#txtInfoPPEDtExposicao').parent().hide();
            $('#txtInfoPPECargo').parent().hide();
        }

        $('#ddlInfoPPE').on('change', function (e) {
            var ppe = $('#ddlInfoPPE  option:selected').val();

            if (ppe == 'S') {
                $('#txtInfoPPEDtExposicao').parent().show();
                $('#txtInfoPPECargo').parent().show();
            } else {
                $('#txtInfoPPEDtExposicao').parent().hide();
                $('#txtInfoPPECargo').parent().hide();
            }
            setHeight();
        });



        //PAIS
        $('#ddlInfoPais').on('change', function (e) {
            var pais = $('#ddlInfoPais  option:selected').val();

            if (pais !== "BRASIL") {
                $('#txtInfoPais').show();
                $('#ddlInfoEstado').hide();
                $('#txtInfoEstado').show();
            }
            else {
                $('#txtInfoPais').hide();
                $('#ddlInfoEstado').show();
                $('#txtInfoEstado').hide();
            }
        });
        if (info.d.Pais !== "BRASIL") {
            $('#ddlInfoPais').val("OUTRO");
            $('#txtInfoPais').show();
            $('#ddlInfoEstado').hide();
            $('#txtInfoEstado').show();
        }
        else {
            $('#ddlInfoPais').val(info.d.Pais);
        }

        $('#txtInfoLogradouro').val(info.d.Rua);
        //$('#txtInfoNumero').val(info.d.)
        $('#txtInfoBairro').val(info.d.Bairro);
        $('#txtInfoCidade').val(info.d.Cidade);
        //ESTADO
        $('#ddlInfoEstado').val(info.d.Estado);
        $('#txtInfoCep').val(info.d.Cep);

        $('#txtInfoTelRes').val(info.d.Telefone);
        $('#txtInfoTelCom').val(info.d.TelefoneComercial);
        $('#txtInfoTelCel').val(info.d.TelefoneCelular);
        $('#txtInfoEmail').val(info.d.EnderecoEletronico);
        $('#txtInfoEmailCom').val(info.d.EnderecoEletronicoComl);

        //$('#btnInfoPessoais').click(function () {
        //    console.log('Pessoais');
        //});
        //$('#btnInfoPPE').click(function () {
        //    console.log('PPE');
        //});
        //$('#btnInfoEndereco').click(function () {
        //    console.log('Endereco');
        //});
        //$('#btnInfoContato').click(function () {
        //    console.log('Contato');
        //});

        $('#btnInfoCadastral').click(function () {
            //console.log('full');
            sendDadosCadastrais();

        });

        $('.small-box-footer').click(function () {
            setTimeout(function () { setHeight() }, 500);
        });
        $('#hdnDadosCadastrais').val('0');
        waitMeHide('#dvAtualizacaoCadastral');
        setHeight();
        registrarAcessoGoogleAnalytics($("#hdnEnt").val(), 'Atualização Cadstral');
    } catch (err) {
        Error('#dvCadastro', 'Ops! Erro ao tentar carregar os dados.');
    }
}
function sendDadosCadastrais() {
    try {
        $('#dvErro').hide();
        waitMeShow('#dvDadosCadastrais');

        var estadoCivil = $('#ddlInfoEstadoCivil  option:selected').val();
        var documentoIdentidade = $('#txtInfoDoc').val();
        var orgaoEmissor = $('#txtInfoEmissor').val();
        var dataEmissao = $('#txtInfoDtEmissao').val();
        var naturalidade = $('#txtInfoNaturalidade').val();
        var nacionalidade = $('#txtInfoNacionalidade').val();
        var nomeMae = $('#txtInfoNomeMae').val();
        var nomePai = $('#txtInfoNomePai').val();
        //PPE
        var ppe = $('#ddlInfoPPE  option:selected').val();
        var ppeDtExposicao = "";
        var ppeCargo = "";

        if (ppe == 'S') {
            ppeDtExposicao = $('#txtInfoPPEDtExposicao').val();
            ppeCargo = $('#txtInfoPPECargo').val();
        }
        else {
            ppeDtExposicao = '';
            ppeCargo = '';
        }
        //PAIS
        var pais = $('#ddlInfoPais  option:selected').val();
        //ESTADO
        var estado = ""

        if (pais !== "BRASIL") {
            pais = $('#txtInfoPais').val().toUpperCase();
            estado = $('#txtInfoEstado').val().toUpperCase();
        }
        else {
            estado = $('#ddlInfoEstado option:selected').val();
        }

        var rua = $('#txtInfoLogradouro').val();
        var numero = $('#txtInfoNumero').val();
        var bairro = $('#txtInfoBairro').val();
        var cidade = $('#txtInfoCidade').val();

        var cep = $('#txtInfoCep').val();

        var telefone = $('#txtInfoTelRes').val();
        var telefoneComercial = $('#txtInfoTelCom').val();
        var telefoneCelular = $('#txtInfoTelCel').val();
        var enderecoEletronico = $('#txtInfoEmail').val();
        var enderecoEletronicoComl = $('#txtInfoEmailCom').val();

        var sendObj = {
            "id": param,
            //"estadoCivil": estadoCivil,
            //"documentoIdentidade": documentoIdentidade,
            //"orgaoEmissor": orgaoEmissor,
            //"dataEmissao": dataEmissao,
            //"naturalidade": naturalidade,
            //"nacionalidade": nacionalidade,
            //"nomeMae": nomeMae,
            //"nomePai": nomePai,
            "ppe": ppe,
            "ppeDtExposicao": ppeDtExposicao,
            "ppeCargo": ppeCargo,
            "pais": pais,
            "rua": rua,
            "numero": numero,
            "bairro": bairro,
            "cidade": cidade,
            "estado": estado,
            "cep": cep,
            "telefone": telefone,
            "telefoneComercial": telefoneComercial,
            "telefoneCelular": telefoneCelular,
            "enderecoEletronico": enderecoEletronico,
            "enderecoEletronicoComl": enderecoEletronicoComl
        };
        var paramValues = JSON.stringify(sendObj);

        $.ajax({
            type: "POST",
            url: "ProfileWeb.aspx/SendDadosCadastrais",
            data: paramValues,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (msgReturn) {

                $('.btnHideLoan').hide();
                $('input[data-btn="info"]').show();
                //$('#msgReturnInfoCadastral').html(msgReturn.d);
                //if (msgReturn.d.indexOf('-ok') > -1) $('#msgReturnInfoCadastral').parent().addClass('alert-success');
                //$('#msgReturnInfoCadastral').parent().show();

                waitMeHide('#dvAtualizacaoCadastral');
                setHeight();

                $.notify.addStyle('notifyInfoCadastrais', {
                    html: "<div><span data-notify-html><span></div>"
                });

                $.notify("<div class='alert " + (msgReturn.d.indexOf('-ok') > -1 ? "alert-success" : "alert-info") + "' style='word-break: break-word;font-size: 14px; color: #fff;' role='alert'>" + msgReturn.d + "</div>", {
                    style: 'notifyInfoCadastrais',
                    autoHide: true, autoHideDelay: 10000, position: 'bottom left'
                });

            },
            error: function (err) {
                $('.btnHideLoan').hide();
                $('input[data-btn="info"]').show();
                Error('#dvAtualizacaoCadastral', err);
            }
        });
        setHeight();
    }
    catch (err) {
        Error('#dvAtualizacaoCadastral', 'Ops! Erro ao tentar gravar os dados.');
    }
}
