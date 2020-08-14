function sendFaleConosco() {
    //Fale Conosco    
    waitMeShow('#dvFaleConosco');
    $('#btnFaleConosco').hide();
    $('#btnHideFaleConosco').show();
    var pattEmail = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/);
    //var pattTel = new RegExp(/^\(?0?[1-9]{2}\)?\-? ?[2-9][0-9]{3,4}\-? ?[0-9]{4}$/);
    var assunto = '';


    if ($("#hdnEnt").val() == 62) {
        assunto = $('#ddlAssunto option:selected').val();
        if (assunto == 'Assunto') {
            $('#msgReturn').text('Selecione o assunto. ');
            $('#msgReturn').append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:20px;"></span>');
            $('#btnHideFaleConosco').hide();
            $('#btnFaleConosco').show();
            waitMeHide('#dvFaleConosco');
            return;
        }

    }

    //var tel = $('#txtFlTel').val().replace(/[a-zA-Z]|\\/g, '');

    if (pattEmail.test($('#txtFlEmail').val())) {
        //if (pattTel.test(tel)) {
        if ($('#txtFlEmail').val() != '' && $('#txtFlTel').val() != '' && $('#txtFlMsg').val() != '') {
            var param = ((getParameterByName('id') != null) ? getParameterByName('id') : getParameterByName('Id'));
            var FaleConoscoValue = "{id: '" + param + "', email: '" + $('#txtFlEmail').val() + "', tel: '" + $('#txtFlTel').val() + "', msg: '" + $('#txtFlMsg').val() + "', assunto: '" + assunto + "'}";
            $.ajax({
                type: "POST",
                url: "ProfileWeb.aspx/SendFaleConosco",
                data: FaleConoscoValue,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: loadFaleConosco,
                error: function (err) {
                    $('#btnHideFaleConosco').hide();
                    $('#btnFaleConosco').show();
                    $('#msgReturn').text('Ocorreu um erro no envio da mensagem. Error : ', err.toString());
                    $('#msgReturn').append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:20px;"></span>');
                    waitMeHide('#dvFaleConosco');
                }
            });
        } else {
            $('#msgReturn').text('Todos os campos devem ser preenchidos.');
            $('#msgReturn').append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:20px;"></span>');
            $('#btnHideFaleConosco').hide();
            $('#btnFaleConosco').show();
            waitMeHide('#dvFaleConosco');
        }
        //        }else
        //        {
        //            $('#msgReturn').text('Telefone inválido. Ex. válido: 00 00000-0000');
        //            $('#msgReturn').append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:20px;"></span>');
        //        }
    } else {
        $('#msgReturn').text('Email inválido.');
        $('#msgReturn').append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:20px;"></span>');
        $('#btnHideFaleConosco').hide();
        $('#btnFaleConosco').show();
        waitMeHide('#dvFaleConosco');
    }

}

function loadFaleConosco(msgReturn) {
    $('#dvErro').hide();

    try {
        $('#btnHideFaleConosco').hide();
        $('#btnFaleConosco').show();
        $('#msgReturn').text(msgReturn.d.toString());
        $('#msgReturn').append('<span class="glyphicon glyphicon-ok" style="color:green;font-size:20px;"></span>');
        waitMeHide('#dvFaleConosco');
        registrarAcessoGoogleAnalytics($("#hdnEnt").val(), 'Fale Conosco');
    }
    catch (err) {
        $('#msgReturn').text(err.toString());
        $('#msgReturn').append('<span class="glyphicon glyphicon-remove-sign" style="color:red;font-size:20px;"></span>');
        waitMeHide('#dvFaleConosco');
    }
}