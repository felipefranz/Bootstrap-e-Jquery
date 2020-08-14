var dataValue;
var dataValueGuest;
var arrModulos;
var tela = '';
var simSliderIdadeHtml = '';
var simSliderSaqueHtml = '';
var simSliderHtml = '';
var simAcesNegHtml = '';

function preloadModulos() {
    $('#dvErro').hide();
    if ($('#hdnModulos').val() == '1') {
        $.ajax({
            type: "POST",
            url: "Guest.aspx/LoadModulos",
            data: dataValueGuest,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: loadModulos,
            error: function (err) {
                Error('#dvInicio', err);
            }
        });
    }
}

function loadModulos(info)
{

    arrModulos = info.d.toString().substring(0, info.d.toString().length-1).split(';');

    var strMenusIDs = "";
    var totalLinkMenuPorRow = 3;
    var totalLinkMenuModulo = 5;
    var divMenu = "<div class='row'>";
    var divMenuModulos = "<div class='navbar-header'><ul class='nav navbar-nav' style='float:left; display:inline; margin-left:15px;width:95%'>";
    var dvModuloWrapper = new Array();
    var idEnt = $('#hdnEnt').val();

    //Desabilitar o Menu Para Guest, retirar este codigo caso queira habilita-lo novamente
    $('#header').hide();
    $('#dvContainerMenu .swiper-container').css('padding-top', '0px');
    //fim desabilitar
    //$('.swiper-slide').hide();
    for (i = 0; i < arrModulos.length; i++)
    {
        strMenusIDs = strMenusIDs + '#img' + arrModulos[i] + 'Menu ,';
        //Adicionar Menu Principal

        if (i == totalLinkMenuPorRow || i == (totalLinkMenuPorRow *2) )
        {
            divMenu = divMenu + "</div><div class='row'>";
        }
        divMenu = divMenu + "<div class='col-xs-4 item-menu'>"+
            "<a onclick=\"mostrarDv('#dv" + arrModulos[i] + "', '#img" + arrModulos[i] + "','s')\">"+
        "<img src='img/" + idEnt +"/" + arrModulos[i] + ".png'  alt='v' title='Cadastro' id='img" + arrModulos[i] + "Menu'><div class='text-menu'>" +
            "<h6>" + arrModulos[i] + "</h6>" +
            "</div>"+
            "</a>"+
            "</div>";

        //Adicionar MenuModulos
        if (i < totalLinkMenuModulo) {
            divMenuModulos = divMenuModulos + "<li>" +
                        "<a onclick=\"mostrarDv('#dv" + arrModulos[i] + "', '#img" + arrModulos[i] + "','s')\" >" +
                        "<img src='img/" + idEnt + "/" + arrModulos[i] + ".png' style='width:40px' id='img" + arrModulos[i] + "' />" +
                        "</a>" +
                        "</li>";


            //adiciona fechamento do MenuModulo
            if(arrModulos.length == i)
            {
                divMenuModulos = divMenuModulos + "</ul></div>";
            }
            
        } else if (i >= totalLinkMenuModulo) {
            if(i == totalLinkMenuModulo)
            {
                divMenuModulos = divMenuModulos + "</ul></div>"+
                                "<button id='icoPlusMinus' type='button' class='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse' style='position:absolute; margin:0 auto;padding:0;left:91%;top:23px;background:transparent'>"+
                                "<span  class='glyphicon  glyphicon-menu-down' style='color:#fff;font-size:20px'></span>" +
                                "<!--glyphicon-chevron-down  glyphicon-plus-->"+
                                "<span class='sr-only'></span>"+
                                "</button>";

                divMenuModulos = divMenuModulos + "<div class='navbar-collapse navbar-right navbar-responsive collapse' aria-expanded='false' style='height: auto;'>"+
                                "<ul class='nav navbar-nav'>";
            }
                divMenuModulos = divMenuModulos + "<li>" +

                        "<a  onclick=\"mostrarDv('#dv" + arrModulos[i] + "','#img" + arrModulos[i] + "','s')\" class='submenu-hide' data-toggle='collapse' data-target='.navbar-collapse' >" +
                        "<img src='img/" + idEnt + "/" + arrModulos[i] + ".png' style='width:40px' id='img" + arrModulos[i] + "'/>" +
                        "</a>" +
                        "</li>";

                //adiciona fechamento do subMenuModulo
                if (arrModulos.length == i) {
                    divMenuModulos = divMenuModulos + "</ul></div>";
                }
        }

        
        dvModuloWrapper.push("dv" + arrModulos[i] + "Wrapper");

    }

    var arrSwiper = new Array();
    $('.swiper-slide').each(function (i, item) {
        
        var result = false;
        for (var j = 0; j < dvModuloWrapper.length; j++) {
            if (dvModuloWrapper[j] == item.id)
                result = true;
        }
        if (!result) arrSwiper.push('#'+item.id);

    });

    for (var i = 0; i < arrSwiper.length; i++) {
        $(arrSwiper[i]).remove();
    }

    
    divMenu = divMenu + "<\div>";
    var divContent = '<div class="panel-heading" style="background-color:#fff"><strong>Menu </strong><br /><small></small></div><div class="panel-body panel-body-menu">'
    $('#dvMenu').append(divMenu);

    //adiciona fechamento do MenuModulo
    if(arrModulos.length < totalLinkMenuModulo)
    {
        divMenuModulos = divMenuModulos + "</ul></div>";
    }

    $('#dvMenuModulos').append(divMenuModulos);

    strMenusIDs = strMenusIDs.substring(0, strMenusIDs.length - 1);
    $(strMenusIDs).click(function () {
        
        $(this).animate({ width: '60%', opacity: '0.5' }, "fast");
        $(this).parent().parent().animate({ top: '-200px', opacity: '0.1' }, "slow");

        setTimeout(function () { $('#dvInicio').animate({ top: '-300px', opacity: '0.5' }, "slow"); }, 500);
        setTimeout(function () { $('#dvInicio').hide(); }, 1000);
    });


    $('#icoPlusMinus, .submenu-hide').click(function () {

        var b = $('#icoPlusMinus').find('.glyphicon-menu-down');
        if (b.length > 0) {
            b.addClass('glyphicon-menu-up').removeClass('glyphicon-menu-down');
        }
        else {
            $('#icoPlusMinus').find('.glyphicon-menu-up').addClass('glyphicon-menu-down').removeClass('glyphicon-menu-up');
        }
    });

    var mySwiper = new Swiper('.swiper-container');

    //mySwiper.on('slideChangeEnd', function () {
    mySwiper.on('TransitionEnd', function () {

        var d = $('.swiper-wrapper').find('.swiper-slide-active');
        var dvId = d[0].firstElementChild.id;

        $('img').removeClass('menu-active');
        switch (dvId) {
            
            case 'dvRentabilidade': mostrarDv('#dvRentabilidade', '#imgRentabilidade'); preloadRentab(); break;
            case 'dvFaleConosco': mostrarDv('#dvFaleConosco', '#imgFaleConosco'); $('#dvErro').hide(); break;
            case 'dvSimulador': mostrarDv('#dvSimulador', '#imgSimulador'); preloadSimulador(); break;
            case 'dvAlterarSenha': mostrarDv('#dvAlterarSenha', '#imgAlterarSenha'); $('#dvErro').hide(); break;
            
        }
        setHeight();
    });

    $('#sliderIdade, #sliderSaque, #slider, #tamBeneBox, #secHipot, #secSaque').bind('touchstart touchend touchup', function (event) {
        event.stopPropagation();
    });

    $('#sliderIdade, #sliderSaque, #slider, #tamBeneBox, #secHipot, #secSaque').bind('swipeLeft swipeRight', function (event) {
        event.stopPropagation();
    });

    Number.prototype.formatMoney = function (c, d, t) {
        var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };

    if (idEnt == 61) { $('.rentab-bold').attr('style', 'font-weight:bold'); }

    
    //Rentab
    $('#imgRentabilidade , #imgRentabilidadeMenu').click(function () {
        preloadRentab();
    });

    //FaleConosco
    $('#btnFaleConosco').click(function () {
        sendFaleConosco()
    });

    //Simulador
    $('#imgSimulador , #imgSimuladorMenu').click(function () {
        preloadSimulador();
    });

    //Alterar Senha
    $('#btnAltSenha').click(function () {
        if (idEnt == '57')
        {
            changeSenha();
        }
        else {
            sendSenha();
        }
    });

     
    //if (idEnt == 61 || idEnt == 57 ) {
        $('#dvInicio').hide();
        $('#dvInicio').animate({ top: '-300px', opacity: '0.5' }, "slow");
        var paramTela = getParameterByName('t').toLowerCase();
        switch (paramTela)
        {
            case 'presimbenef':
                mostrarDv('#dvSimulador', '#imgSimulador', 's');
                preloadSimulador('s'); break;
            case 'rentab': mostrarDv('#dvRentabilidade', '#imgRentabilidade', 's');
                preloadRentab(); break;
            case 'altsenha': mostrarDv('#dvAlterarSenha', '#imgAlterarSenha', 's');
                break;
            case 'faleconosco': mostrarDv('#dvFaleConosco', '#imgFaleConosco', 's');
                break;
        }


    //}
    //else {
    //    inicioMobile();
    //}
	
}

function sendSenha() {
    //Senha
    var pattNumber = new RegExp(/^[0-9]+$/i);
    $('#msgReturn').empty();
    if (pattNumber.test($('#txtAltSenhaCpf').val())) {
    //if (true) {
        if ($('#txtAltSenhaCpf').val() != '') {
            var param = ((getParameterByName('e') != null) ? getParameterByName('e') : getParameterByName('E'));
            var AltSenhaValue = "{e: '" + param + "', cpf: '" + $('#txtAltSenhaCpf').val() + "'}";
            $.ajax({
                type: "POST",
                url: "Guest.aspx/AltSenha",
                data: AltSenhaValue,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: loadAltSenha,
                error: function (err) {
                    //$('#msgReturn').html('Ocorreu um erro ao alterar a senha. Error : ', err.toString());
                    $('#msgReturn').append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:26px;"></span><br>Ocorreu um erro ao alterar a senha. Error :'+ err.toString());
                }
            });
        } else {
            $('#msgReturn').append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:26px;"></span><br>O campo deve ser preenchido.');
            //$('#msgReturn').text('O campo deve ser preenchido.');
            
        }

    } else {
        $('#msgReturn').append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:26px;"></span><br>CPF inválido, digite apenas números.');
        //$('#msgReturn').text('CPF inválido.');
        
    }
}
function changeSenha() {
    //Senha
    var pattNumber = new RegExp(/^[0-9]+$/i);
    $('#msgReturn').empty();
    if (pattNumber.test($('#txtAltSenhaCpf').val())) {
    //if (true) {
        if ($('#txtAltSenhaCpf').val() != '') {
            var param = ((getParameterByName('e') != null) ? getParameterByName('e') : getParameterByName('E'));
            var AltSenhaValue = "{e: '" + param + "', cpf: '" + $('#txtAltSenhaCpf').val() + "' , isResposta: 'no' , r : '', s : ''}";
            $.ajax({
                type: "POST",
                url: "Guest.aspx/AltSenhaComPergunta",
                data: AltSenhaValue,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: loadAltSenhaComPergunta,
                error: function (err) {
                    //$('#msgReturn').html('Ocorreu um erro ao alterar a senha. Error : ', err.toString());
                    $('#msgReturn').append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:26px;"></span><br>Ocorreu um erro ao alterar a senha. Error :' + err.toString());
                }
            });
        } else {
            $('#msgReturn').append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:26px;"></span><br>O campo deve ser preenchido.');
            //$('#msgReturn').text('O campo deve ser preenchido.');

        }

    } else {
        $('#msgReturn').append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:26px;"></span><br>CPF inválido, digite apenas números.');
        //$('#msgReturn').text('CPF inválido.');

    }
}

function loadAltSenha(msgReturn) {
    $('#dvErro').hide();
    try {
        $('#msgReturn').html(msgReturn.d.toString());
        
    }
    catch (err) {
        $('#msgReturn').html(err.toString());
        $('#msgReturn').append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:20px;"></span>');
    }
}

function loadAltSenhaComPergunta(msgReturn)
{
    try {
        var retorno = msgReturn.d.toString();
        //$('#perguntaSecreta').empty();
        if (retorno.indexOf('pergunta;') >= 0) {
            $('#contentAltSenhaPergunta').show();
            $('#contentAltSenha , contentNovaSenha').hide();
            $('#perguntaSecreta').empty();
            $('#perguntaSecreta').text(retorno.substring(retorno.indexOf(';')+1, retorno.length));
        }
        else if (retorno.indexOf('onresposta;') >= 0) {
            $('#contentAltSenha , #contentAltSenhaPergunta').hide();
            $('#contentNovaSenha').show();
        } else if (retorno.indexOf('offresposta;') >= 0)
        {
            $('#msgReturn').append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:26px;"></span><br>Sua respota está incorreta, tente novamente.');
        }
        else if (retorno.indexOf('onSenha;') >= 0) {
            $('#msgReturn').append('<span class="glyphicon glyphicon-ok" style="color:green;font-size:26px;"></span><br>Sua senha foi alterada com sucesso.').css('margin-top', '50px');
            $('#contentNovaSenha').hide();
        }
        else { $('#msgReturn').append(retorno); }

    }
    catch (err) {
    $('#msgReturn').html(err.toString());
    $('#msgReturn').append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:20px;"></span>');
    }
}
function ValidaResposta() {
    try {
        
        var patt = new RegExp(/^[a-z0-9]+$/i);
        $('#msgReturn').empty();
        if (patt.test($('#txtAltSenhaReposta').val())) {
            if ($('#txtAltSenhaReposta').val() != '' && $('#txtAltSenhaReposta').val() == $('#txtAltSenhaConfirma').val()) {
                var param = ((getParameterByName('e') != null) ? getParameterByName('e') : getParameterByName('E'));
                var AltSenhaValue = "{e: '" + param + "', cpf: '" + $('#txtAltSenhaCpf').val() + "' , isResposta: 'yes', r: '" + $('#txtAltSenhaReposta').val() + "', s : ''}";
                $.ajax({
                    type: "POST",
                    url: "Guest.aspx/AltSenhaComPergunta",
                    data: AltSenhaValue,
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    success: loadAltSenhaComPergunta,
                    error: function (err) {

                        $('#msgReturn').append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:26px;"></span><br>Ocorreu um erro ao verficiar a resposta. Error :' + err.toString());
                    }
                });
            } else {
                $('#msgReturn').append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:26px;"></span><br>A confirmação da resposta está diferente da resposta. Digite novamente ambos campos.');
            }
        } else { $('#msgReturn').append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:26px;"></span><br>Utilize apenas alfanuméricos.'); }
    }
    catch (err) {
    $('#msgReturn').html(err.toString());
    $('#msgReturn').append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:20px;"></span>');
}
}
function SendSenhaNova()
{
    try {

        //var patt = new RegExp(/[0-9a-zA-Z]$/);
        var patt = new RegExp(/^[a-z0-9]+$/i);
        $('#msgReturn').empty();
        if (patt.test($('#txtNovaSenha').val())) {
            if ($('#txtNovaSenha').val() != '' && $('#txtNovaSenha').val() == $('#txtNovaSenhaConfirma').val()) {
                var param = ((getParameterByName('e') != null) ? getParameterByName('e') : getParameterByName('E'));
                var AltSenhaValue = "{e: '" + param + "', cpf: '" + $('#txtAltSenhaCpf').val() + "' , isResposta: 'yes', r : '" + $('#txtAltSenhaReposta').val() + "', s : '" + $('#txtNovaSenha').val() + "'}";
                $.ajax({
                    type: "POST",
                    url: "Guest.aspx/AltSenhaComPergunta",
                    data: AltSenhaValue,
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    success: loadAltSenhaComPergunta,
                    error: function (err) {

                        $('#msgReturn').append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:26px;"></span><br>Ocorreu um erro ao verficiar a resposta. Error :' + err.toString());
                    }
                });
            } else {
                $('#msgReturn').append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:26px;"></span><br>A confirmação da resposta está diferente da resposta. Digite novamente ambos campos.');
            }
        } else { $('#msgReturn').append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:26px;"></span><br>Utilize apenas alfanuméricos.'); }
    }
    catch (err) {
        $('#msgReturn').html(err.toString());
        $('#msgReturn').append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:20px;"></span>');
    }
}

function preloadRentab() {
    var param = ((getParameterByName('e') != null) ? getParameterByName('e') : getParameterByName('E'));
    if ($('#hdnRentab').val() == '1'){
        if( param == '61') {
            $('#dvRentabHeader').hide();
            $('#dvRentabItem').hide();
            $('#formOpcoesRentab').show();
        }
        else {
            $('#formOpcoesRentab').hide();
            $('#dvRentabHeader div a').hide();
            $('#dvRentabHeader div').text('Rentabilidade por Perfil de Investimento');
            preloadRentabJSON(param)

        }
    }
}

function preloadRentabJSON(p) {
    $('#dvErro').hide();
    if ($('#hdnRentab').val() == '1') {
        var param = ((getParameterByName('e') != null) ? getParameterByName('e') : getParameterByName('E'));
        var dataValueRentab = '';
        var urlajx = '';
        if (param == '61') {
            urlajx = "Guest.aspx/LoadRentabEvolucao";
            dataValueRentab = "{ quota: '" + p + "'}";
            if (p == 616) { dataValueRentab = "{ quota: '" + 852 + "'}"; }
            if (p == 614) { dataValueRentab = "{ quota: '" + 857 + "'}"; }
        } else {
            urlajx = "Guest.aspx/LoadRentab";
            dataValueRentab = "{ id: '" + param + "'}";
        }

        $.ajax({
            type: "POST",
            url: urlajx,
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

    $('#formOpcoesRentab').hide();
    $('#dvRentabHeader').show();
    $('#dvRentabItem').show();
    try {
        if (rentab.d.length > 0) {
            var ano = re.exec(rentab.d[0].DataPerfil);
            //var dateAno = new Date(parseInt(ano[0])).getFullYear();
            var dateAno = new Date().getFullYear();
            countMonth = (new Date(parseInt(ano[0])).getMonth() % 2);
            tmpDate = re.exec(rentab.d[0].DataPerfil);
            $('.pRentab').empty();
            $('.pRentab').append(rentab.d[0].HtmlValorAcumulado);

            if ($('#hdnEnt').val() == 18)
                $('.pRentab').hide();

        }

        $(rentab.d).each(function (i, item) {
            if (item.NomePerfil.indexOf('CONSERVADOR - (BRAD. ALM)') > 0 || item.NomePerfil.indexOf('PREVMON-(BRAD.OUTROS)') > 0) {
            } else {
                var m = re.exec(item.DataPerfil);
                if (tmpDate.toString() == m.toString()) {
                    rowspan = rowspan + 1;
                }
            }
        });

        $(rentab.d).each(function (i, item) {

            var m = re.exec(item.DataPerfil);
            var d = new Date(parseInt(m[0]));
            d.setHours(d.getHours() + 4);
            var date = MonthYearFormat(d);
            var month = d.getMonth();

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
                '<td>' + item.NomePerfil + '</td>' +
                ((item.VariaPerfil_fmt.indexOf('-') !== -1) ?
                '<td style="font-size:14px;font-weight:bold;color:red">' + item.VariaPerfil_fmt + '</td>' : '<td style="font-size:14px;font-weight:bold;">' + item.VariaPerfil_fmt + '</td>') +
                '</tr>'
                );
            }
        });

        $('#hdnRentab').val('0');
    } catch (err) {
        Error('#dvRentabilidade', 'Ops! Erro ao tentar carregar os dados.');
    }
}
function goBackRentab()
{
    $('#formOpcoesRentab').show();
    $('#dvRentabHeader').hide();
    $('#dvRentabItem').hide();
    $('#hdnRentab').val('1');
    $('#grdRentab tbody tr').remove();
    setHeight();
}

function sendFaleConosco() {
    //Fale Conosco
    var pattEmail = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/);
    //var pattTel = new RegExp(/^\(?0?[1-9]{2}\)?\-? ?[2-9][0-9]{3,4}\-? ?[0-9]{4}$/);
    var pattNumber = new RegExp(/^[0-9]+$/i);
    $('#msgFlReturn').empty();
    //var tel = $('#txtFlTel').val().replace(/[a-zA-Z]|\\/g, '');

    if (pattEmail.test($('#txtFlEmail').val()) && pattNumber.test($('#txtFlCpf').val()) ) {
        //if (pattTel.test(tel)) {
        if ($('#txtFlEmail').val() != '' && $('#txtFlTel').val() != '' && $('#txtFlMsg').val() != '' && $('#txtFlNome').val() != '') {
            var param = ((getParameterByName('e') != null) ? getParameterByName('e') : getParameterByName('E'));
            var FaleConoscoValue = "{id: '" + param + "', nome: '" + $('#txtFlNome').val() + "', cpf: '" + $('#txtFlCpf').val() + "', email: '" + $('#txtFlEmail').val() + "', tel: '" + $('#txtFlTel').val() + "', msg: '" + $('#txtFlMsg').val() + "'}";
            $.ajax({
                type: "POST",
                url: "Guest.aspx/SendFaleConosco",
                data: FaleConoscoValue,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: loadFaleConosco,
                error: function (err) {
                    $('#msgFlReturn').text('Ocorreu um erro no envio da mensagem. Error : ', err.toString());
                    $('#msgFlReturn').append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:20px;"></span>');
                }
            });
        } else {
            $('#msgFlReturn').text('Todos os campos devem ser preenchidos.');
            $('#msgFlReturn').append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:20px;"></span>');
        }
        //        }else
        //        {
        //            $('#msgReturn').text('Telefone inválido. Ex. válido: 00 00000-0000');
        //            $('#msgReturn').append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:20px;"></span>');
        //        }
    } else {
        $('#msgFlReturn').text('Email inválido.');
        $('#msgFlReturn').append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:20px;"></span>');
    }
}

function loadFaleConosco(msgReturn) {
    $('#dvErro').hide();
    try {
        $('#msgFlReturn').text(msgReturn.d.toString());
        $('#msgFlReturn').append('<span class="glyphicon glyphicon-ok" style="color:green;font-size:20px;"></span>');
    }
    catch (err) {
        $('#msgFlReturn').text(err.toString());
        $('#msgFlReturn').append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:20px;"></span>');
    }
}


function setHeight() {
    var d = $('.swiper-wrapper').find('.swiper-slide-active');
    var dvId = d[0].firstElementChild.id;
    var dvHeight = d[0].firstElementChild.offsetHeight;
    var minHeight = 550;
    //$('.swiper-wrapper').style.height = dvHeight + 'px';
    if (dvHeight < minHeight)
    {
        document.getElementById('sw').style.height = minHeight + 'px';
    }
    else {
        document.getElementById('sw').style.height = dvHeight + 'px';
    }
}

function Error(dvErro, error) {
    $(dvErro).hide();
    var hdn = '#hdn'+dvErro.replace(/#dv/g,'');
    $(hdn).val('1');
    $('#dvErro').show();
    $('#lblMsgErro').text(error.toString());
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
function MonthYearFormat(data) {
    var mes = data.getMonth();
    var arrayMonth = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    var ano = data.getFullYear();
    return arrayMonth[mes] + "/" + ano;
}
function dateFormat(data) {
    var dia = data.getDate();
    if (dia.toString().length == 1)
        dia = "0" + dia;
    var mes = data.getMonth() + 1;
    if (mes.toString().length == 1)
        mes = "0" + mes;
    var ano = data.getFullYear();
    return dia + "/" + mes + "/" + ano;
}
function filtraCampo(campo) {
    var s = "";
    var cp = "";
    vr = campo.value;
    tam = vr.length;
    for (i = 0; i < tam; i++) {
        if (vr.substring(i, i + 1) != "/"
            && vr.substring(i, i + 1) != "-"
            && vr.substring(i, i + 1) != "."
            && vr.substring(i, i + 1) != "("
            && vr.substring(i, i + 1) != ")"
            && vr.substring(i, i + 1) != ":"
            && vr.substring(i, i + 1) != ",") {
            s = s + vr.substring(i, i + 1);
        }
    }
    return s;// >   %  /  \  =  ;   '   "   <
}
function limite_textarea(valor) {
    quant = 300;
    total = valor.length;
    if (total <= quant) {
        resto = quant - total;
        document.getElementById('cont').innerHTML = resto;
    } else {
        document.getElementById('txtFlMsg').value = valor.substr(0, quant);
    }
}

function toggleGlyphicon(idSpan)
{
    //var b = $(idSpan).find('.glyphicon-menu-down');
    var b = $(idSpan).attr('class');
    if (b.toString().indexOf('down') > -1) {
        $(idSpan).addClass('glyphicon-menu-up').removeClass('glyphicon-menu-down');
    }
    else {
        $(idSpan).addClass('glyphicon-menu-down').removeClass('glyphicon-menu-up');
    }
    
}

/*Pre load Simulador*/
var typeSim = '';

function validaValor(strToReplace) {
    var strSChar = "áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ";
    var strNoSChars = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC";
    var newStr = "";
    for (var i = 0; i < strToReplace.length; i++) {
        if (strSChar.indexOf(strToReplace.charAt(i)) != -1) {
            newStr += strNoSChars.substr(strSChar.search(strToReplace.substr(i, 1)), 1);
        } else {
            newStr += strToReplace.substr(i, 1);
        }
    }

    //return newStr.replace(/[^a-zA-Z 0-9]/g, '');
    return newStr;
}

function ContrutorForm() {
    /*simType: PPC   ou   FIPECQPREV */
     

    if (validaCampos()) { //Verifica se todos os campos foram preenchidos
        //Campos Inválidos
        return;
    }
	
	//$("#button").button("loading");
	
    //Captura do HTML Parâmetros iniciais da div
	simSliderIdadeHtml == '' ? simSliderIdadeHtml = $("#divSliderIdade").html() : '';			
	simSliderSaqueHtml == '' ? simSliderSaqueHtml = $("#divSliderSaque").html() : '';			
	simSliderHtml == '' ? simSliderHtml = $("#divSlider").html() : '';	
	simAcesNegHtml == '' ? simAcesNegHtml = $("#secPermission_acessoNegado_m").html() : '';	
	
	//Salva no HTML Parâmetros iniciais do Slider
	$( "#divSliderIdade").html(simSliderIdadeHtml);
	$( "#divSliderSaque").html(simSliderSaqueHtml);
	$( "#divSlider").html(simSliderHtml);
	$( "#secPermission_acessoNegado_m").html(simAcesNegHtml);
	
	$('#meta').empty();
	$('#meta2').empty();
	
	$( "#config_scripts" ).html("");

	$( "#button" ).removeClass( "btn-warning" );
	$( "#button" ).addClass( "btn-primary" );
	$("#modalBack").css("display", "block");
    $("#wait").css("display", "block");	
    $('html, body').animate({ scrollTop: 0 }, 'slow');
	setTimeout(function(){
	      $("#modalBack").css("display", "none");
          $("#wait").css("display", "none");	
	    },2500);	
	
    var nome = validaValor($('#nome').val());
    var cpf = $('#cpfPre').val();
    var email = $('#email').val();      //Utilizado apenas para envio no E-mail
    var telefone = $('#telefone').val(); //Utilizado apenas para envio no E-mail
    var ncmto = validaValor(formatDate($('#dtncmto').val()).toString());    
	var DtAdmissao = $('#dtadmissao').val() == "" ? validaValor(new Date().toString()) : validaValor(formatDate($('#dtadmissao').val()).toString());
    var DtAdesao = validaValor(new Date().toString());
    var QntDep = $('#qntdep').val() == "" ? 0 : $('#qntdep').val();
    var IdadeAposentadoria = $('#idadeAposentadoria').val() == "" ? 0 : $('#idadeAposentadoria').val() > 100 ? 100 : $('#idadeAposentadoria').val();
    if (IdadeAposentadoria == 100) { $('#idadeAposentadoria').val(100) };
    var Salario = parseFloat($("#salario").val().replace(",", "."));  //dar replace $().val();
    var opcao = $('#opcao').val();
    var sexo = $("#sexoM").is(":checked") ? '01' : '02';
    var Url_retorno = "" + window.location.href;
    var Username = '';
    var JsonDeslogado = '';

    if (typeSim == 'fipecqPrev') {
        Username = '0061616ativo.simbenef';
        JsonDeslogado = '{"TextMovto":{"movimentacoes" : []},"Nome":"' + nome + '","CPF":"' + cpf + '","Email":"' + email + '","Telefone":"' + telefone + '","DtAdmissao":"' + DtAdmissao + '","DtAdesao":"' + DtAdesao + '", "Ncmto":"' + ncmto + '","QntDep":' + QntDep + ',"Salario":' + Salario + ',"OpcaoTribut":"' + opcao + '", "Sexo":"' + sexo + '", "IdadeAposentadoria":' + IdadeAposentadoria + ', "status":"01","statustxt":"ATIVO","motivo_status":20,"motivo_statustxt":"ATIVO-CONTRIBUINTE","NomePerfil1":"Quota1","valorQuota1":1.00,"NomePerfil2":"Quota2","valorQuota2":1.00}';
    } else if (typeSim == 'ppc') {
        Username = '0061614ativo.simbenef';
        JsonDeslogado = '{"TextMovto":{"movimentacoes" : []},"Nome":"' + nome + '","CPF":"' + cpf + '","Email":"' + email + '","Telefone":"' + telefone + '","DtAdmissao":"' + DtAdmissao + '","DtAdesao":"' + DtAdesao + '", "Ncmto":"' + ncmto + '","QntDep":' + QntDep + ',"Salario":' + Salario + ',"OpcaoTribut":"' + opcao + '", "Sexo":"' + sexo + '", "status":"01","statustxt":"ATIVO","motivo_status":20,"motivo_statustxt":"ATIVO-CONTRIBUINTE","NomePerfil1":"Quota1","valorQuota1":1.00,"NomePerfil2":"Quota2","valorQuota2":1.00}';
    }

    var button = $("#button").attr("class"); //Valida se o form esta OK

    //codifica para base 64 - btoa() - codifica,  atob() - decodifica
    Username = window.btoa(Username);
    JsonDeslogado = window.btoa(JsonDeslogado);
    Url_retorno = window.btoa(Url_retorno);

    $('#n').val("" + Username);
    $('#g').val("" + JsonDeslogado);
    $('#r').val("" + Url_retorno);

    //var json = "{n:'" + Username + "'}"
    //var strJson = JSON.stringify({ "d": Username })

    var strJson = {
        d: Username,
        g: JsonDeslogado,
        r: ''
    };

    $('#dvRowSimulador').show();
    $('#dvRowPreSimulador').hide();
    //$('#hdnSimulador').val('0');
	$('html, body').animate({ scrollTop: 0 }, 'slow');
    LoadSimulador(strJson);

    //document.forms["frm_simulador_deslogado"].submit();

}

function validaCampos() {// Verifica se todos os campos obrigatórios foram preenchidos, se sim imprime um novo botão sem o atributo submit para envio do formulário frm_simulador_deslogado

    //Verificação de Campos Obrigatórios
    var strMsg = '';

    if ($('#nome').val() == "") {
        strMsg += '<p>Preencha o campo Nome Completo</p>';
    }
    if ($('#cpfPre').val() == "") {
        strMsg += '<p>Preencha o campo CPF</p>';
    }
	if ($('#cpfPre').val() != "" && $('#cpfPre').val().length < 11) {
        strMsg += '<p>Preencha o campo CPF com os 11 dígitos.</p>';
    }
    if ($('#email').val() == "") {
        strMsg += '<p>Preencha o campo Email</p>';
    }
    if ($('#telefone').val() == "") {
        strMsg += '<p>Preencha o campo Telefone</p>';
    }
	if ($('#dtncmto').val() == "") {
        strMsg += '<p>Preencha o campo Data de Nascimento</p>';
    }
    if  ($('#dtncmto').val().substring(0, 4) <= 1900 && $('#dtncmto').val() != "" && $('#dtncmto').val().substring(0, 4) > 3000) {
        strMsg += '<p>Data de Nascimento inválida</p>';        
    }
    if ($('#dtadmissao').val() == "" && typeSim == "ppc") {
        strMsg += '<p>Preencha o campo Data de Admissão</p>';
    }
    if  ($('#dtadmissao').val().substring(0, 4) <= 1900 && $('#dtadmissao').val() != "" && $('#dtadmissao').val().substring(0, 4) > 3000) {
        strMsg += '<p>Data de Admissão inválida</p>';        
    }
    if ($('#qntdep').val() == "" && typeSim == "ppc") {
        strMsg += '<p>Preencha o campo Quantidade de Dependentes</p>';
    }
    if ($('#idadeAposentadoria').val() == "" && typeSim == "fipecqPrev") {
        strMsg += '<p>Preencha o campo Idade de Aposentadoria</p>';
    }
    if ($('#salario').val() == "") {
        strMsg += '<p>Preencha o campo Salário</p>';
    }

    if (strMsg == '') {
        $('#alert').hide();

        return false;

    } else {

        $('#alert').show().html(strMsg);
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        setHeight();
        return true;
    }

}

function formatDate(String_date) {// Formata data

    var S = String_date;

    S = S.substring(5, 7) + "/" + S.substring(8, 10) + "/" + S.substring(0, 4) + "";

    return new Date(S);
}

function goBack() {
	    
    var intervaloForm = setInterval(setHeight_S, 100);  
	
	$('html, body').animate({ scrollTop: 0 }, 'fast');
    $('#formSim').hide();
	$('#dvRowSimulador').hide();
	$('#dvRowPreSimulador').show();
    $("#titleSimulador").html('<strong>Simulador de Benefício de Aposentadoria</strong>');
    $('#formOpcoes').show();
    $('#TituloSimula').show();    
    $('#alert').hide();
	$( "#button" ).removeClass( "btn-primary" ).addClass( "btn-warning" );

    setTimeout(function() {
      clearInterval(intervaloForm);
    }, 400);
}

function Load(type) {
	
	var intervaloForm = setInterval(setHeight_S, 100);  
	
    typeSim = type;
	$('html, body').animate({ scrollTop: 0 }, 'fast');
    $('#frm_simulador_group input').val("");
    $("#titleSimulador").html('<a onclick="goBack()" style="color:#fff;font-size:15px;" ><span class="glyphicon glyphicon-chevron-left"></span> Simulador de Benefício de Aposentadoria</a>');
    $('#formSim').show();
    $('#formOpcoes').hide();
    $('#TituloSimula').hide();    
    if (typeSim == "ppc") {
        $('#dvIdadeAposent').hide();
		$('#dvDtAdmissao').show();
		$('#dvQtdDependentes').show();
        $("#opcao").attr("disabled", "disabled");
        $('#opcao').val('N');
    } else {
        $('#dvIdadeAposent').show();
		$('#dvDtAdmissao').hide();
		$('#dvQtdDependentes').hide();
        $("#opcao").removeAttr("disabled", "disabled");
    }

    setTimeout(function() {
      clearInterval(intervaloForm);
    }, 400);	
}