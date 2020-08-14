var dataValue;
var arrModulos;

function preloadModulos() {
    $('#dvErro').hide();
    if ($('#hdnModulos').val() == '1') {
        waitMeShow('#dvInicio')
        $.ajax({
            type: "POST",
            url: "ProfileWeb.aspx/LoadModulos",
            data: dataValue,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: loadModulos,
            error: function (err) {
                Error('#dvInicio', err);
            }
        });
    }
}
function loadModulos(info) {
    //var resultModulos = info.d.toString();
    var resultModulos = info.d.Modulos.toString();
    var isNovo = info.d.Novo.toString();
    //console.log(info.d.Novo.toString());

    var hdnIdPlano = $('#hdnPlano').val();
    if (hdnIdPlano == 615 || hdnIdPlano == 616) resultModulos = resultModulos.replace(';Emprestimo', '');

    //arrModulos = info.d.toString().substring(0, info.d.toString().length - 1).split(';');
    arrModulos = resultModulos.substring(0, resultModulos.length - 1).split(';');
    isNovo = isNovo.substring(0, isNovo.length - 1).split(';');


    var strMenusIDs = "";
    var totalLinkMenuPorRow = 3;
    var totalLinkMenuModulo = 5;
    var divMenu = "<div class='row'>";
    var divMenuModulos = "<div class='navbar-header'><ul class='nav navbar-nav' style='float:left; display:inline; margin-left:15px;width:95%'>";
    var dvModuloWrapper = new Array();
    var idEnt = $('#hdnEnt').val();
    //$('.swiper-slide').hide();
    for (i = 0; i < arrModulos.length; i++) {
        strMenusIDs = strMenusIDs + '#img' + arrModulos[i] + 'Menu ,';
        //Adicionar Menu Principal
        var resultIsNovo = false;
        for (var n = 0; n < isNovo.length; n++) {
            var novo = isNovo[n].split(':');
            if (arrModulos[i] == novo[0])
                resultIsNovo = novo[1];
        }

        if (i == totalLinkMenuPorRow || i == (totalLinkMenuPorRow * 2)) {
            divMenu = divMenu + "</div><div class='row'>";
        }
        divMenu = divMenu + "<div class='col-xs-4 item-menu'>" +
            "<a onclick=\"mostrarDv('#dv" + arrModulos[i] + "', '#img" + arrModulos[i] + "','s')\" data-waitme='button'>" +
        "<img src='img/" + idEnt + "/" + arrModulos[i] + ".png'  alt='v' title='Cadastro' id='img" + arrModulos[i] + "Menu'>" +
        (resultIsNovo == "True" ? "<span class='badge'>novo</span>" : "") +
        "<div class='text-menu'>" +

            "<h6>" + ((arrModulos[i] == "Emprestimo") ? "Empréstimo" : arrModulos[i]) + "</h6>" +
            "</div>" +
            "</a>" +
            "</div>";

        //Adicionar MenuModulos
        if (i < totalLinkMenuModulo) {
            divMenuModulos = divMenuModulos + "<li>" +
                        "<a onclick=\"mostrarDv('#dv" + arrModulos[i] + "', '#img" + arrModulos[i] + "','s')\" data-waitme='button' >" +
                        "<img src='img/" + idEnt + "/" + arrModulos[i] + ".png' style='width:40px' id='img" + arrModulos[i] + "' />" +
                        (resultIsNovo == "True" ? "<span class='badge'>novo</span>" : "") +
                        "</a>" +
                        "</li>";


            //adiciona fechamento do MenuModulo
            if (arrModulos.length == i) {
                divMenuModulos = divMenuModulos + "</ul></div>";
            }

        } else if (i >= totalLinkMenuModulo) {
            if (i == totalLinkMenuModulo) {
                divMenuModulos = divMenuModulos + "</ul></div>" +
                                "<button id='icoPlusMinus' type='button' class='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse' style='position:absolute; margin:0 auto;padding:0;left:91%;top:23px;background:transparent'>" +
                                "<span  class='glyphicon  glyphicon-menu-down' style='color:#fff;font-size:20px'></span>" +
                                "<!--glyphicon-chevron-down  glyphicon-plus-->" +
                                "<span class='sr-only'></span>" +
                                "</button>";

                divMenuModulos = divMenuModulos + "<div class='navbar-collapse navbar-right navbar-responsive collapse' aria-expanded='false' style='height: auto;'>" +
                                "<ul class='nav navbar-nav'>";
            }
            divMenuModulos = divMenuModulos + "<li>" +

                    "<a  onclick=\"mostrarDv('#dv" + arrModulos[i] + "','#img" + arrModulos[i] + "','s')\" class='submenu-hide' data-toggle='collapse' data-target='.navbar-collapse' >" +
                    "<img src='img/" + idEnt + "/" + arrModulos[i] + ".png' style='width:40px' id='img" + arrModulos[i] + "'/>" +
                    (resultIsNovo == "True" ? "<span class='badge'>novo</span>" : "") +
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
        if (!result) arrSwiper.push('#' + item.id);

    });

    for (var i = 0; i < arrSwiper.length; i++) {
        $(arrSwiper[i]).remove();
    }


    divMenu = divMenu + "<\div>";
    var divContent = '<div class="panel-heading" style="background-color:#fff"><strong>Menu </strong><br /><small></small></div><div class="panel-body panel-body-menu">'
    $('#dvMenu').append(divMenu);

    //adiciona fechamento do MenuModulo
    if (arrModulos.length < totalLinkMenuModulo) {
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
            case 'dvHome': mostrarDv('#dvHome', '#imgHome'); preloadHome(); break;
            case 'dvCadastro': mostrarDv('#dvCadastro', '#imgCadastro'); preloadCadastro(); break;
            case 'dvAtualizacaoCadastral': mostrarDv('#dvAtualizacaoCadastral', '#imgAtualizacaoCadastral'); preloadDadosCadastrais(); break;
            case 'dvCampanha': mostrarDv('#dvCampanha', '#imgCampanha'); preLoadCampanha(); break;
            case 'dvSaldo': mostrarDv('#dvSaldo', '#imgSaldo'); preloadSaldo(); break;
            case 'dvDemonstrativo': mostrarDv('#dvDemonstrativo', '#imgDemonstrativo'); preloadDemonstrativo(); break;
            case 'dvExtrato': mostrarDv('#dvExtrato', '#imgExtrato'); preloadExtrato(); break;
            case 'dvRentabilidade': mostrarDv('#dvRentabilidade', '#imgRentabilidade'); preloadRentab(); break;
            case 'dvFaleConosco': mostrarDv('#dvFaleConosco', '#imgFaleConosco'); $('#dvErro').hide(); break;
            case 'dvSimulador': mostrarDv('#dvSimulador', '#imgSimulador'); preloadSimulador(); break;
            case 'dvEmprestimo': mostrarDv('#dvEmprestimo', '#imgEmprestimo'); preloadEmprestimo(); break;
            case 'dvBoleto': mostrarDv('#dvBoleto', '#imgBoleto'); preloadBoleto(); break;
        }
        setHeight();
    });

    $('#sliderIdade, #sliderSaque, #slider, #tamBeneBox, #secHipot, #secSaque').bind('touchstart touchend touchup', function (event) {
        event.stopPropagation();
    });

    $('#sliderIdade, #sliderSaque, #slider, #tamBeneBox, #secHipot, #secSaque').bind('swipeLeft swipeRight', function (event) {
        event.stopPropagation();
    });

    //$('#CalcBenef').mouseup(function () {
    //    setInterval(setHeight, 3000);

    //});

    //SubModulos


    if (info.d.SubModulo != '') submodulo = JSON.stringify(eval("(" + info.d.SubModulo + ")"));


    Number.prototype.formatMoney = function (c, d, t) {
        var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };

    if (idEnt == 61) {
        $('#dvUploadImg').hide(); $('#hdnImagemPerfil').val('0');
        $('.rentab-bold').attr('style', 'font-weight:bold');
        $('.list-group-item:nth-child(10) > strong').text('Email Pessoal: ');
        if (hdnIdPlano == 616) {
            $('.list-group-item:nth-child(4) > strong').text('Instituidora: ');
            $('#dvTotalSaldo .content div:first-child + div > h6').text('Total Instituidora');
        }
    }

    $('#lblPerfil').parent().hide();
    //preloadImagemPerfil();

    //Home
    $('#imgHome , #imgHomeMenu').click(function () {
        preloadHome();
    });
    //Cadastro
    $('#imgCadastro , #imgCadastroMenu').click(function () {
        preloadCadastro();
    });
    //Saldo
    $('#imgSaldo , #imgSaldoMenu').click(function () {
        preloadSaldo();
    });

    //Demonstrativo
    $('#imgDemonstrativo , #imgDemonstrativoMenu').click(function () {
        preloadDemonstrativo();
    });


    //Extrato
    $('#imgExtrato , #imgExtratoMenu').click(function () {
        preloadExtrato();
    });

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

    //Emprestimo
    $('#imgEmprestimo , #imgEmprestimoMenu').click(function () {
        preloadEmprestimo();
    });

    //Boleto
    $('#imgBoleto, #imgBoletoMenu').click(function () {
        preloadBoleto();
    });

    $('#imgAtualizacaoCadastral, #imgAtualizacaoCadastralMenu').click(function () {
        preloadDadosCadastrais();
    });

    $('#imgCampanha, #imgCampanhaMenu').click(function () {
        preLoadCampanha();
    });


    if (idEnt == 33) {
        $('th[data-hide="on"]').text('');
        $('#dvRentabilidade>.panel-default>.panel-heading').text('Rentabilidade');
        //$('#dvRentabAcumAno>div:last>p>strong>span').text('Últimos 24 Meses');
        $('#dvRentabilidade>.panel-info-bco>.panel-body>p').text('Rentabilidade nos Últimos 24 Meses');
    }

    if (idEnt != 999) {
        $('#dvInicio').hide();
        $('#dvInicio').animate({ top: '-300px', opacity: '0.5' }, "slow");
        //if (idEnt == 33 || idEnt == 61) {
        if (idEnt == 33) {
            mostrarDv('#dvHome', '#imgHome', 's');
            preloadHome();
        }
        else {

            mostrarDv('#dvCadastro', '#imgCadastro', 's');
            preloadCadastro();
        }
    }
    else {
        inicioMobile();
    }

    //exibe o banner e o splashscreen no app
    if (idEnt == 63)
    {
        var UltraBannerDisplays = $("#hdnUltraBannerDisplays").val();
        var UltraSplashDisplays = $("#hdnUltraSplashDisplays").val();

        if (UltraSplashDisplays == 1)
        {
            var splashScreen = "<div class='row'>";
            splashScreen += "<div class='col-xs-12'>";
            splashScreen += "<section class='banner-home'></section>";    
            splashScreen += "</div>";
            splashScreen += "</div>";      
            
            splashScreen += "<div class='row'>";
            splashScreen += "<div class='col-xs-12 text-center pt-2'>";
            splashScreen += "<img src='https://portal-hro.com.br/ws/img/63/logoultraprev4.png' alt='logo' />";
            splashScreen += "</div>"; 
            splashScreen += "</div>";       

            splashScreen += "<div class='row'>";
            splashScreen += "<div class='col-xs-12 text-center pt-2'>";
            splashScreen += "<p>O aplicativo da Ultraprev conta com mais funcionalidades de navegação.Você pode acessar suas informações cadastrais, saldo, extrato, rentabilidade, entre outras coisas e tudo em um formato mais ágil e amigável.</p>";
            splashScreen += "</div>"; 
            splashScreen += "</div>";       
               
            $("#dvSplashScreen").append(splashScreen); 

            $("#dvContainerMenu").hide();
            $("#dvSplashScreen").show();

            setTimeout(function () { $("#dvSplashScreen").hide(); $("#dvContainerMenu").show(); }, 5000);
        }
        else
        {
            $("#dvSplashScreen").hide();
        }
        

        if (UltraBannerDisplays == 1)
        {
            var banner = "<section class='banner-page'></section>";

            $("#sctBannerUltra").append(banner);


            $("#sctBannerUltra").show();
        }  
        else
            $("#sctBannerUltra").hide();
       
    }
    else
    {
        $("#dvSplashScreen").hide();
    }
    waitMeHide('#dvInicio');

}