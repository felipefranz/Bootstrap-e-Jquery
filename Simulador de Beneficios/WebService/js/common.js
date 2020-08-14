
function setHeight() {
    var d = $('.swiper-wrapper').find('.swiper-slide-active');
    var dvId = d[0].firstElementChild.id;
    var dvHeight = d[0].firstElementChild.offsetHeight;
    var minHeight = 550;
    //$('.swiper-wrapper').style.height = dvHeight + 'px';
    if (dvHeight < minHeight) {
        document.getElementById('sw').style.height = minHeight + 'px';
    }
    else {
        document.getElementById('sw').style.height = dvHeight + 'px';
    }
}
function CopyText(control, idCod) {

    var divACopiar = document.querySelector("#" + idCod);

    var range = document.createRange();
    range.selectNode(divACopiar);
    window.getSelection().addRange(range);
    document.execCommand("copy");

    $(control).addClass("btn-success");
    setTimeout(function () { $(control).removeClass("btn-success").text('Copiado'); }, 1000);


}
function Error(dvErro, error) {
    $(dvErro).waitMe('hide');
    $(dvErro).hide();
    var hdn = '#hdn' + dvErro.replace(/#dv/g, '');
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
    var arrayMonth = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
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
function toggleGlyphicon(idSpan) {
    //var b = $(idSpan).find('.glyphicon-menu-down');
    var b = $(idSpan).attr('class');
    if (b.toString().indexOf('down') > -1) {
        $(idSpan).addClass('glyphicon-menu-up').removeClass('glyphicon-menu-down');
    }
    else {
        $(idSpan).addClass('glyphicon-menu-down').removeClass('glyphicon-menu-up');
    }

}
function waitMeShow(dv) {
    $(dv).waitMe({

        effect: 'bounce',
        text: '',
        bg: 'rgba(0,0,0,0.7)',
        color: '#FFF'

    });
}
function waitMeHide(dv) {
    $(dv).waitMe('hide');
}