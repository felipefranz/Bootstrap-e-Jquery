function preloadImagemPerfil() {
    $('#dvErro').hide();    
    if ($('#hdnImagemPerfil').val() == '1') {
        $.ajax({
            type: "POST",
            url: "ProfileWeb.aspx/LoadImagemPerfil",
            data: dataValue,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: loadImagemProfile,
            error: function (err) {
                Error('#dvErro', err);
            }
        });
    }
}

function loadImagemProfile(msgReturn) {

    var img = 'img/profile/' + msgReturn.d.toString();
    $('#dvUploadImg img').attr('src', img);

    if (img.indexOf('default') == -1) {
        $('.btn-img-profile>span').text('alterar foto');
    } else { $('.btn-img-profile>span').text('add foto'); }
    $('#hdnImagemPerfil').val('0');
    registrarAcessoGoogleAnalytics($("#hdnEnt").val(), 'Imagem Perfil');
}