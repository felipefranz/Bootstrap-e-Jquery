function loadBeneficiario(control) {
    $('#dvErro').hide();
    var param = ((getParameterByName('id') != null) ? getParameterByName('id') : getParameterByName('Id'));
    control = "#" + control;
    var idBenef = $(control).val();
    var SimEmprestValue = "{id: '" + param + "', bID: '" + idBenef + "'}";

    $("#dvEmprestimoBeneficiario").hide();

    $.ajax({
        type: "POST",
        url: "ProfileWeb.aspx/LoadEmprestimoParticipant",
        data: SimEmprestValue,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: loadEmprestimo,
        error: function (err) {
            Error('#dvEmprestimo', err);
        }
    });
    setHeight();
}
function preloadEmprestimo() {
    $('#dvErro').hide();
    if ($('#hdnEmprestimo').val() == '1') {
        waitMeShow('#dvEmprestimo');
        $('#dvEtapaIIEmprestimo').hide();
        $('#dvEtapaIIIEmprestimo').hide();
        if ($('#hdnEnt').val() == 999) {
            $('#dvEtapaIEmprestimo > div').remove();
            $('#dvEtapaIEmprestimo').attr('style', 'height:500px');
            $('#dvEtapaIEmprestimo').append(
                '<div class="alert alert-warning" style="background-color: #faebcc!important;margin: 10px;" >Simulação de Empréstimo estará disponível a partir de 03 de janeiro de 2019. Boas Festas! </div>'
                );
            setHeight();
            waitMeHide('#dvEmprestimo');
        } else {

            $.ajax({
                type: "POST",
                url: "ProfileWeb.aspx/LoadEmprestimo",
                data: dataValue,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: loadEmprestimo,
                error: function (err) {
                    Error('#dvEmprestimo', err);
                }
            });
            setHeight();
            $('#hdnEmprestimo').val('0');
        }
    }
}
function loadEmprestimo(info) {
    try {
        if (info.d.toString() == "") {
            Error('#dvEmprestimo', 'Ops! Erro ao tentar carregar os dados.');
        }
        else {
            $(info.d).each(function (i, item) {
                $('#dvEtapaIEmprestimo').append(
                    item.outerHTML
                    );
            });
            setHeight();
            waitMeHide('#dvEmprestimo');
            registrarAcessoGoogleAnalytics($("#hdnEnt").val(), 'Empréstimo');
        }

    } catch (err) {
        Error('#dvEmprestimo', 'Ops! Erro ao tentar carregar os dados.');
    }
}

function preValidacaoSolicitacaoEmprestimo() {
    $("input[name=opcaoSuspencaoEmprestimo][value='false']").prop("checked", true);
    $('#modalSuspensaoEmprestimo').modal({ show: 'true' });
}

function salvarOpcaoSuspensaoEmprestimo() {
    const suspenderEmprestimo = $("input[name='opcaoSuspencaoEmprestimo']:checked").val();
    $("#hdnSuspenderEmprestimo").val(suspenderEmprestimo);
    preloadEmprestimoSimulacao("no");
}


function preloadEmprestimoSimulacao(isSimulation) {
    waitMeShow('#dvEmprestimo');
    $('#btnSimularEmprestimo , #btnEmprestimoSolicitar ').hide();
    $('#btnHideLoan').show();

    setHeight();
    $('#dvEmprestimoError').hide();
    $('#dvLoanErro').remove()
    var resultIsValid = IsValidEmprestimo();
    if (resultIsValid) {
        var participantId = $('#hdnParticipantID').val();
        var beneficiaryID = $('#hdnBeneficiaryID').val();
        var loanPlanID = $('#hdnLoanPlanID').val();
        var firstInsDueDate = $('#hdnFirstInsDueDate').val();
        var credit = $('#hdnCredit').val();
        var bank = $('#hdnBank').val();
        var agency = $('#hdnAgency').val();
        var account = $('#hdnAccount').val();
        var txtVlMargin = ($("#txtVlMargin").val() != undefined ? $("#txtVlMargin").val().replace('.', '') : null);
        var txtVlSalary = ($("#txtVlSalary").val() != undefined ? $("#txtVlSalary").val().replace('.', '') : null);
        var amortizationType = $('#hdnAmortizationType').val();
        var amortizationTypeSAC = null;
        if (amortizationType == "3") {
            var selectedTypeSac = $('input[id=rdoAmortizationSAC]:checked').val();
            amortizationTypeSAC = selectedTypeSac == "on" ? true : false;
        }

        var selectedValueType = $('input[id=rdoValueTypeTotal]:checked').val();
        var valueType = selectedValueType == "on" ? "1" : "0";
        var txtVlLoanBay = null;
        var txtVlInsBay = null;
        var holerite = null;
        var selectedLoanBay = $('input[id=chkLoanBay]:checked').val();
        if (selectedLoanBay == "on") {

            var txtVlLoanBay = ($("#txtVlLoanBay").val() != undefined ? $("#txtVlLoanBay").val().replace('.', '') : null);
            var txtVlInsBay = ($("#txtVlInsBay").val() != undefined ? $("#txtVlInsBay").val().replace('.', '') : null);

        }
       
        var installmentQuantity = $('#ddlCustomPayment :selected').val();
        var loanAmount = $('#txtCustomLoan').val().replace('.', '');
        var strChkLoanActive = "";
        $('#tbLoanActive>tbody>tr>td:first-child').each(function (i, item) {

            var idchkLoanActive = '#chkLoanActive' + i;
            var isLoanActive = $(idchkLoanActive).attr('data-existe');
            if (isLoanActive == "on") {
                var isVisibleLoanActive = ($(idchkLoanActive).attr('data-visible') == "True" ? true : false);
                var contractLoanActive = $(idchkLoanActive).attr('data-contract');
                var isLoanActiveChecked = $('input[id=' + idchkLoanActive.substring(1) + ']:checked').val() == "on" ? true : false;
                if (loanPlanID === "YjvSUIuo4/LmnPA39V1oBw==" && $('#holerite').length > 0) {
                    document.getElementById("holerite").addEventListener("change", readFile);
                }
                if (isLoanActiveChecked && isVisibleLoanActive)
                    strChkLoanActive = strChkLoanActive + "" + contractLoanActive + ",true;"
                else
                    strChkLoanActive = strChkLoanActive + "" + contractLoanActive + ",false;"
            }
        });
        var ipAddress = "";

        var suspenderEmprestimo = $("#hdnSuspenderEmprestimo").val() === "true" ? true : false;

        try {
            $.getJSON("https://jsonip.com?callback=?", function (data) {
                ipAddress = data.ip;

                var param = ((getParameterByName('id') != null) ? getParameterByName('id') : getParameterByName('Id'));
                var dataEmprestimoSimulacaoValue = "{id: '" + param
                    + "', _loanAmount: '" + loanAmount + "' , _installmentQuantity: '" + installmentQuantity
                    + "' , _firstDueDate: '" + firstInsDueDate
                    + "' , _participantId: '" + participantId
                    + "' , _beneficiaryID: '" + beneficiaryID
                    + "' , _valueType: '" + valueType
                    + "' , _planLoanID: '" + loanPlanID
                    + "' , txtVlMargin: " + (txtVlMargin != null ? "'" + txtVlMargin + "'" : txtVlMargin)
                    + " , txtSalary: " + (txtVlSalary != null ? "'" + txtVlSalary + "'" : txtVlSalary)
                    + " , _amortizationType: '" + amortizationType
                    + "' , rdoAmortizationSac: " + (amortizationTypeSAC != null ? "'" + amortizationTypeSAC + "'" : amortizationTypeSAC)
                    + " , txtVlLoanBay: " + (txtVlLoanBay != null ? "'" + txtVlLoanBay + "'" : txtVlLoanBay)
                    + " , txtVlInsBay: " + (txtVlInsBay != null ? "'" + txtVlInsBay + "'" : txtVlInsBay)
                    + " , _credit : '" + credit + "', strChkLoanActive : '" + strChkLoanActive + "' , isSimulation : '" + isSimulation
                    + "', _bank : '" + bank
                    + "', _agency :'" + agency
                    + "', _account : '" + account
                    + "', _ip : '" + ipAddress
                    + "', suspenderEmprestimo : '" + suspenderEmprestimo
                    + "', holerite : '" + holerite + "' }";
                $.ajax({
                    type: "POST",
                    url: "ProfileWeb.aspx/LoadEmprestimoSimulacao",
                    data: dataEmprestimoSimulacaoValue,
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    success: (isSimulation == "on" ? loadEmprestimoSimulacao : loadEmprestimoResultado),
                    error: function (err) {
                        Error('#dvEmprestimo', err);
                    }
                });
                setHeight();
            });
        } catch (e) {
            console.log(e.toString);
        }
    }
    else {
        $('#btnSimularEmprestimo , #btnEmprestimoSolicitar ').show();
        setHeight();
        waitMeHide('#dvEmprestimo');
    }
}

function preloadEmprestimoSimulacao62(isSimulation) {
    waitMeShow('#dvEmprestimo');
    $('#btnSimularEmprestimo , #btnEmprestimoSolicitar ').hide();
    $('#btnHideLoan').show();

    setHeight();

    $('#dvEmprestimoError').hide();
    $('#dvLoanErro').remove()
    var resultIsValid = IsValidEmprestimo62();

    if (resultIsValid) {
        var participantId = $('#hdnParticipantID').val();
        var beneficiaryID = $('#hdnBeneficiaryID').val();
        var loanPlanID = $('#hdnLoanPlanID').val();
        var firstInsDueDate = $('#hdnFirstInsDueDate').val();
        var credit = $('#hdnCredit').val();
        var btyeHolerite = $('#imgholeriteb64').val();
        var bank = $('#hdnBank').val();
        var agency = $('#hdnAgency').val();
        var account = $('#hdnAccount').val();
        var txtVlMargin = ($("#txtVlMargin").val() != undefined ? $("#txtVlMargin").val().replace('.', '') : null);
        var txtVlSalary = ($("#txtVlSalary").val() != undefined ? $("#txtVlSalary").val().replace('.', '') : null)
        var amortizationType = $('#hdnAmortizationType').val();
        var amortizationTypeSAC = null;
        if (amortizationType == "3") {
            var selectedTypeSac = $('input[id=rdoAmortizationSAC]:checked').val();
            amortizationTypeSAC = selectedTypeSac == "on" ? true : false;
        }
        var selectedValueType = $('input[id=rdoValueTypeTotal]:checked').val();
        var valueType = selectedValueType == "on" ? "1" : "0";
        var txtVlLoanBay = null;
        var txtVlInsBay = null;
        var selectedLoanBay = $('input[id=chkLoanBay]:checked').val();
        if (selectedLoanBay == "on") {
            var txtVlLoanBay = ($("#txtVlLoanBay").val() != undefined ? $("#txtVlLoanBay").val().replace('.', '') : null);
            var txtVlInsBay = ($("#txtVlInsBay").val() != undefined ? $("#txtVlInsBay").val().replace('.', '') : null);
        }
        var installmentQuantity = $('#ddlCustomPayment :selected').val();
        var loanAmount = $('#txtCustomLoan').val().replace('.', '');
        var strChkLoanActive = "";
        $('#tbLoanActive>tbody>tr>td:first-child').each(function (i, item) {

            var idchkLoanActive = '#chkLoanActive' + i;
            var isLoanActive = $(idchkLoanActive).attr('data-existe');
            if (isLoanActive == "on") {
                var isVisibleLoanActive = ($(idchkLoanActive).attr('data-visible') == "True" ? true : false);
                var contractLoanActive = $(idchkLoanActive).attr('data-contract');
                var isLoanActiveChecked = $('input[id=' + idchkLoanActive.substring(1) + ']:checked').val() == "on" ? true : false;

                if (isLoanActiveChecked && isVisibleLoanActive)
                    strChkLoanActive = strChkLoanActive + "" + contractLoanActive + ",true;"
                else
                    strChkLoanActive = strChkLoanActive + "" + contractLoanActive + ",false;"
            }
        });
        var ipAddress = "";
        var delay = 2000;
        try {
            $.getJSON("https://jsonip.com?callback=?", function (data) {
                ipAddress = data.ip;
                var param = ((getParameterByName('id') != null) ? getParameterByName('id') : getParameterByName('Id'));              
                let formData = new FormData();
                formData.append("EmprestimoSimulacaoComHoleriteAnexado", true);
                formData.append("id", param);
                formData.append("_loanAmount", loanAmount);
                formData.append("_installmentQuantity", installmentQuantity);
                formData.append("_firstDueDate", firstInsDueDate);
                formData.append("_participantId", participantId);
                formData.append("_beneficiaryID", beneficiaryID);
                formData.append("_valueType", valueType);
                formData.append("_planLoanID", loanPlanID);
                formData.append("txtVlMargin", txtVlMargin);
                formData.append("txtSalary", txtVlSalary);
                formData.append("_amortizationType", amortizationType);
                formData.append("rdoAmortizationSac", amortizationTypeSAC);
                formData.append("txtVlLoanBay", txtVlLoanBay);
                formData.append("txtVlInsBay", txtVlInsBay);
                formData.append("_credit", credit);
                formData.append("strChkLoanActive", strChkLoanActive);
                formData.append("isSimulation", isSimulation);
                formData.append("_bank", bank);
                formData.append("_agency", agency);
                formData.append("_account", account);
                formData.append("_ip", ipAddress);
                formData.append("holerite", btyeHolerite);
                const urlRequisicao = window.location.pathname;
                $.ajax({
                    type: "POST",
                    contentType: false,
                    url: urlRequisicao,
                    processData: false,
                    data: formData,
                    success: function (htmlRetorno) {
                        const objInfo = {};
                        objInfo.d = htmlRetorno;
                        if(isSimulation === "on")
                            loadEmprestimoSimulacao(objInfo)
                        else
                            loadEmprestimoResultado(objInfo)
                    },                    
                    error: function (xhr, ajaxOptions, thrownError) {
                        Error('#dvEmprestimo', thrownError);
                    }
                }).delay

                setHeight();
            });
        } catch (e) {
            console.log(e.toString);
        }
    }
    else {
        $('#btnSimularEmprestimo , #btnEmprestimoSolicitar ').show();
        setHeight();
        waitMeHide('#dvEmprestimo');
    }
}

function IsValidEmprestimo62() {
    var result = true;
    var erros = "<div id='dvLoanErro'>";
    var isVlMargin = $("#txtVlMargin").attr('data-existe');
    if (isVlMargin == "on" && $("#txtVlMargin").val() == "") {
        result = false;
        erros = erros + "<p>Digite o valor da margem consignável<p>"
    }
    var isVlSalary = $("#txtVlSalary").attr('data-existe');
    if (isVlSalary == "on" && $("#txtVlSalary").val() == "") {
        result = false;
        erros = erros + "<p>Digite o valor do salário<p>"
    }

    var isLoanBay = $("#chkLoanBay").attr('data-existe');
    if (isLoanBay == "on") {
        var selectedLoanBay = $('input[id=chkLoanBay]:checked').val();
        if (selectedLoanBay == "on") {

            var isVlLoanBay = $("#txtVlLoanBay").attr('data-existe');
            if (isVlLoanBay == "on" && $("#txtVlLoanBay").val() == "") {
                result = false;
                erros = erros + "<p>Digite o valor da transferência de dívida<p>"
            }
            var isVlInsBay = $("#txtVlInsBay").attr('data-existe');
            if (isVlInsBay == "on" && $("#txtVlInsBay").val() == "") {
                result = false;
                erros = erros + "<p>Digite o valor da parcela do empréstimo da transferência de dívida<p>"
            }

        }
    }
    var isCustomLoan = $("#txtCustomLoan").attr('data-existe');
    if (isCustomLoan == "on" && $("#txtCustomLoan").val() == "") {
        result = false;
        erros = erros + "<p>Digite o valor do empréstimo desejado.<p>"
    }

    if ($("#holerite").val() == "") {
        result = false;
        erros = erros + "<p>Faça o upload do holerite.<p>"
    }

    if ($("#holerite").val() !== "") {
        const limiteArquivoMB = 4;
        if (document.getElementById("holerite").files[0].size > (limiteArquivoMB * 1024 * 1024)) {
            result = false;
            erros = erros + "<p>Arquivo com tamanho superior a " + limiteArquivoMB + " mega.</p>";
        }
    }

    if ($("#holerite").val() !== "") {
        let extensaoValida = false;
        const nomeArquivo = document.getElementById("holerite").files[0].name;
        const extensao = /[^.]+$/.exec(nomeArquivo)[0];
        const strExtensoesValidas = "pdf, jpeg, jpg, png, doc, docx";        
        strExtensoesValidas.split(',').forEach(function (item) {            
            if (extensao.trim() === item.trim())            
             extensaoValida = true;            
        });
        if (!extensaoValida) {
            result = false;
            erros = erros + "<p>A extensão do arquivo não é válida. Adicione um arquivo com uma das seguintes extensões:" + strExtensoesValidas + ".</p>";
        }        
    }

    if ($('#ddlCustomPayment :selected').val() == "0") {
        result = false;
        erros = erros + "<p>Selecione o número de prestações.<p>"
    }

    erros = erros + "</div>";
    if (result == false) {
        $('#dvEmprestimoError').show();
        $('#dvEmprestimoError').append(erros);       
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        setHeight();
    }
    return result;
}

function IsValidEmprestimo() {
    var result = true;
    var erros = "<div id='dvLoanErro'>";
    var isVlMargin = $("#txtVlMargin").attr('data-existe');
    if (isVlMargin == "on" && $("#txtVlMargin").val() == "") {
        result = false;
        erros = erros + "<p>Digite o valor da margem consignável<p>"
    }
    var isVlSalary = $("#txtVlSalary").attr('data-existe');
    if (isVlSalary == "on" && $("#txtVlSalary").val() == "") {
        result = false;
        erros = erros + "<p>Digite o valor do salário<p>"
    }

    var isLoanBay = $("#chkLoanBay").attr('data-existe');
    if (isLoanBay == "on") {
        var selectedLoanBay = $('input[id=chkLoanBay]:checked').val();
        if (selectedLoanBay == "on") {

            var isVlLoanBay = $("#txtVlLoanBay").attr('data-existe');
            if (isVlLoanBay == "on" && $("#txtVlLoanBay").val() == "") {
                result = false;
                erros = erros + "<p>Digite o valor da transferência de dívida<p>"
            }
            var isVlInsBay = $("#txtVlInsBay").attr('data-existe');
            if (isVlInsBay == "on" && $("#txtVlInsBay").val() == "") {
                result = false;
                erros = erros + "<p>Digite o valor da parcela do empréstimo da transferência de dívida<p>"
            }

        }
    }
    var isCustomLoan = $("#txtCustomLoan").attr('data-existe');
    if (isCustomLoan == "on" && $("#txtCustomLoan").val() == "") {
        result = false;
        erros = erros + "<p>Digite o valor do empréstimo desejado.<p>"
    }

    if (isCustomLoan == "on" && $("#txtCustomLoan").val() != "") {
        if (parseInt($("#txtCustomLoan").val()) === 0) {
            result = false;
            erros = erros + "<p>Valor de empréstimo inválido.<p>"
        }
    }

    var isHoleriteLoan = $("#holerite").attr('data-existe');
    if (isHoleriteLoan == "on" && $("#holerite").files.length === 0) {
        result = false;
        erros = erros + "<p>Faça o upload do holerite.<p>"
    }

    if ($('#ddlCustomPayment :selected').val() == "0") {
        result = false;
        erros = erros + "<p>Selecione o número de prestações.<p>"
    }

    erros = erros + "</div>";
    if (result == false) {
        $('#dvEmprestimoError').show();
        $('#dvEmprestimoError').append(erros);
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        setHeight();
    }
    return result;
}

function loadEmprestimoSimulacao(info) {

    try {

        if (info.d.toString() == "") {
            Error('#dvEmprestimo', 'Ops! Erro ao tentar carregar os dados.');
        }
        else {
            $('#dvEtapaIEmprestimo').hide();
            $('#dvEtapaIIEmprestimo').show();
            $(info.d).each(function (i, item) {
                $('#dvEtapaIIEmprestimo').append(
                    item.outerHTML
                    );
            });            
            setHeight();
            waitMeHide('#dvEmprestimo');
            registrarAcessoGoogleAnalytics($("#hdnEnt").val(), 'Empréstimo Simulação');
            if ($('#holerite').length > 0)
            document.getElementById("holerite").addEventListener("change", readFile);
        }

    } catch (err) {
        Error('#dvEmprestimo', 'Ops! Erro ao tentar carregar os dados.');
    }   
}

function loadEmprestimoResultado(info) {
    try {

        if (info.d.toString() == "") {
            Error('#dvEmprestimo', 'Ops! Erro ao tentar carregar os dados.');
        }
        else {
            $('#dvEtapaIEmprestimo').hide();
            $('#dvEtapaIIEmprestimo').hide();
            $('#dvEtapaIIIEmprestimo').show();
            $('#dvEtapaIIEmprestimoContent').remove();
            $(info.d).each(function (i, item) {
                $('#dvEtapaIIIEmprestimo').append(
                    item.outerHTML
                    );
            });            
            setHeight();
            waitMeHide('#dvEmprestimo');
            registrarAcessoGoogleAnalytics($("#hdnEnt").val(), 'Empréstimo Resultado');
        }

    } catch (err) {
        Error('#dvEmprestimo', 'Ops! Erro ao tentar carregar os dados.');
    }
}

function preloadContratoEmprestimo(contract, id) {
    waitMeShow('#dvEmprestimo');
    $('#dvErro').hide();
    $('#dvLoanErro').remove();
    $('#dvEmprestimoError').hide();
    var dataContratoEmprestimoValue = "{ contractNumber : " + contract + " , id: '" + id + "', isNewContract : false}";
    $.ajax({
        type: "POST",
        url: "ProfileWeb.aspx/LoadContratoEmprestimo",
        data: dataContratoEmprestimoValue,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: loadEmprestimoResultado,
        error: function (err) {
            Error('#dvEmprestimo', err);
            waitMeShow('#dvEmprestimo');
        }
    });
    setHeight();
    //$('#hdnEmprestimo').val('0');
}

function checkLoanBay() {
    var selectedLoanBay = $('input[id=chkLoanBay]:checked').val();
    if (selectedLoanBay == "on") {
        $('#trVlLoanBay , #trVlInsBay').show();
        $('#spnLoanBay').addClass('glyphicon-menu-up').removeClass('glyphicon-menu-down');
    }
    else {
        $('#trVlLoanBay , #trVlInsBay').hide();
        $('#spnLoanBay').addClass('glyphicon-menu-down').removeClass('glyphicon-menu-up');
    }
    setHeight();
}

function VoltarEmprestimoEtapaI(etapa, reload) {

    if (etapa == 'I') {
        $('#dvEtapaIIEmprestimoContent').remove();
        $('#dvEtapaIIEmprestimo').hide();
        $('#dvEtapaIEmprestimo').show();
        $('#btnSimularEmprestimo').show();

    } else if (etapa == 'III') {

        $('#dvEtapaIIEmprestimoContent').remove();
        $('#dvEtapaIIEmprestimo').hide();
        $('#dvEtapaIIIEmprestimoContent').remove();
        $('#dvEtapaIIIEmprestimo').hide();

        if (reload == "on") {
            $('#hdnEmprestimo').val('1');
            $("#dvEtapaIEmprestimoContent").remove();
            $("#dvEmprestimoBeneficiario").remove();
            preloadEmprestimo();
        }
        $('#dvEtapaIEmprestimo').show();
    }
    else if (etapa == "0") {
        $("#dvEmprestimoBeneficiario").show();
        $("#dvEtapaIEmprestimoContent").remove();
        $('#dvLoanErro').remove();
        $('#dvEmprestimoError').hide();
    }
    setHeight();
}

function readFile() {
    if (this.files && this.files[0]) {
        var FR = new FileReader();
        FR.addEventListener("load", function (e) {
            document.getElementById("imgholerite").src = "";
            const nomeArquivo = document.getElementById("holerite").files[0].name;
            const extensao = /[^.]+$/.exec(nomeArquivo)[0];
            const strExtensoesValidas = "pdf,jpeg,jpg,png,doc,docx";
            if (strExtensoesValidas.split(',').indexOf(extensao) !== -1)
            {
                let imgRepresentacaoAanexo = "";
                if (extensao === "pdf")
                    imgRepresentacaoAanexo = "data:image/png;base64,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";
                else if (extensao === "docx")
                    imgRepresentacaoAanexo = "data:image/png;base64,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";
                else
                    imgRepresentacaoAanexo = e.target.result;
                document.getElementById("imgholerite").src = imgRepresentacaoAanexo;
            }            
            document.querySelector("[name='imgholeriteb64']").value = e.target.result;
        });
        FR.readAsDataURL(this.files[0]);
    }
}
