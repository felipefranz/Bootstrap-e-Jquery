

$(document).ready(function () {

    var submodulo = "";
    $(document).on('keyup keypress', 'form input[type="text"]', function (e) {
        if (e.which == 13) {
            e.preventDefault();
            return false;
        }
    });

    //$(document).ajaxStart(function () {
    //    $("#modalBack").css("display", "block");
    //    $("#wait").css("display", "block");
    //});
    //$(document).ajaxComplete(function () {
    //    $("#wait").css("display", "none");
    //    $("#modalBack").css("display", "none");
    //    setHeight();
    //});

    var param = ((getParameterByName('id') != null) ? getParameterByName('id') : getParameterByName('Id'));
    if (param != null && param != undefined) {
        dataValue = "{id: '" + param + "'}";
        preloadModulos();
    }
    else {
        //Ini novo codigo para usuario guest
        var paramEntid = ((getParameterByName('e') != null) ? getParameterByName('e') : getParameterByName('E'));
        if (paramEntid != null && paramEntid != undefined) {
            dataValueGuest = "{id: '" + paramEntid + "'}";
            //dataValue = "{id: '0'}";
            //tela = "Guest.aspx";
            $('#alert').hide();
            $('#formSim').hide();
            //$("#telefone").mask("(99) 9999?9-9999");
            //$("#cpfPre").mask("999.999.999-99");

            $("#telefone").on("blur", function () {
                var last = $(this).val().substr($(this).val().indexOf("-") + 1);

                if (last.length == 3) {
                    var move = $(this).val().substr($(this).val().indexOf("-") - 1, 1);
                    var lastfour = move + last;
                    var first = $(this).val().substr(0, 9);

                    $(this).val(first + '-' + lastfour);
                }
            });
            preloadModulos();
            //fim
        } else {
            Error('#dvContainerMenu', 'Usuário não logado');
        }
    }

    
    $("#fileupload").change(function () {
        
        $('#msgImgProfile').hide();
        var dataForm = new FormData();
        //var dataForm = new FormData($("#form1")[0]);
        var files = $("#fileupload").get(0).files;
        if (files.length > 0) {
            dataForm.append("uploadedFile", files[0]);
            if (files[0].size >= 2097152) { $('#msgImgProfile').text('Permitido apenas imagem com tamanho inferior a 2MB.'); $('#msgImgProfile').show(); return; }// 2MB 2097152
            if (files[0].type.indexOf('jpeg') == -1 && files[0].type.indexOf('png') == -1) { $('#msgImgProfile').text('Este formato de imagem não é aceito, os formatos permitidos são JPEG e PNG.'); $('#msgImgProfile').show(); return; }
            $.ajax({
                type: 'POST',
                url: 'Users.asmx/UploadFiles',
                data: dataForm,
                processData: false, // do not process data
                contentType: false, // do not force content type
                success: function (data) {
                    if (data.children[0].innerHTML == 'excedido') { $('#msgImgProfile').text('Permitido apenas imagem com tamanho inferior a 2MB.'); $('#msgImgProfile').show(); }
                    if (data.children[0].innerHTML == 'formato') { $('#msgImgProfile').text('Este formato de imagem não é aceito, os formatos permitidos são JPEG e PNG.'); $('#msgImgProfile').show(); }

                    var img = 'img/profile/' + data.children[0].innerHTML;
                    $('#dvUploadImg img').attr('src', img);
                    $('.btn-img-profile>span').text('alterar foto');

                },
                error: function (err) {
                    $('#msgImgProfile').text('Não foi possível adicionar a foto, entre em contato com o administrador.');
                    $('#msgImgProfile').show();
                }
            });
        }
        else {
            //não foi encontrado arquivo de imagem
            $('#msgImgProfile').text('Nenhuma imagem selecionada, tente novamente.'); $('#msgImgProfile').show();
        }
    });

    //inicio();

});

function inicioMobile() {
    $('#dvContainerMenu').hide();
    $('#dvInicio').show();
}

function mostrarDv(dv, img, c) {

    //$('#dvInicio').hide();
    $('#dvContainerMenu').show();

    $('img').removeClass('menu-active');
    $(img).addClass('menu-active');

    if (c != undefined) {
        var d = $('.swiper-wrapper').find('.swiper-slide-active');
        //var dvId = d[0].id;
        var tWidth = d[0].offsetWidth;  //d[0].style.width;
        //tWidth = tWidth.replace('px', '');

        //var dvCadastro = 0;
        //var dvSaldo = tWidth;
        //var dvExtrato = tWidth * 2;
        //var dvRentab = tWidth * 3;
        //var dvFaleConosco = tWidth * 4;
        //var dvSimulador = tWidth * 5;
        //var dvEmprestimo = tWidth * 6;


        $('.swiper-slide').removeClass('swiper-slide-active');
        $('.swiper-slide').removeClass('swiper-slide-prev');
        $('.swiper-slide').removeClass('swiper-slide-next');

        //testar
        //var arrSwiper = new Array('Cadastro','Saldo', 'Extrato', 'Rentab','FaleConosco','Simulador','Emprestimo');
        //var arrSwiper = new Array('Cadastro', 'Saldo', 'Extrato', 'Rentab', 'FaleConosco', 'Simulador');

        for (var i = 0; i < arrModulos.length; i++) {
            var imgArrID = '#img' + arrModulos[i];
            if (img == imgArrID) {
                var attrSwiper = (tWidth * i) == 1 ? 0 : (tWidth * i) + 'px, 0px, 0px);';
                attrSwiper = 'transition-duration: 0ms; transform: translate3d(-' + attrSwiper;
                $('.swiper-wrapper').attr('style', attrSwiper);
                var dvID = '#dv' + arrModulos[i] + 'Wrapper';
                $(dvID).addClass('swiper-slide-active');
                var dvIDprev = '';
                var dvIDNext = '';

                if (i == 0) {
                    //$('.swiper-wrapper').attr('style', 'transition-duration: 0ms; transform: translate3d(' + i + 'px, 0px, 0px);');

                    dvIDNext = '#dv' + arrModulos[i + 1] + 'Wrapper';
                    $(dvIDNext).addClass('swiper-slide-next');
                }
                else if (i == arrModulos.length - 1) {
                    dvIDprev = '#dv' + arrModulos[i - 1] + 'Wrapper';
                    $(dvIDprev).addClass('swiper-slide-prev');
                }
                else {
                    dvIDNext = '#dv' + arrModulos[i + 1] + 'Wrapper';
                    dvIDprev = '#dv' + arrModulos[i - 1] + 'Wrapper';

                    $(dvIDprev).addClass('swiper-slide-prev');
                    $(dvIDNext).addClass('swiper-slide-next');
                }

            }


        }
        
        setHeight();





    }


}
