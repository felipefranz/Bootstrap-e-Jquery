var EmbraerChatDisplays = $("#hdnEmbraerChatDisplays").val();
var IdEntity = $('#hdnEnt').val();

if (IdEntity == 57) {
    if (EmbraerChatDisplays == 1) {

        var chatbot = "<button type='button' class='chat-btn' data-toggle='modal' data-target='#cModal'>";
        chatbot += "<img src='https://www.embraerprev.com.br/images/_icones_home/chat_rigth.png'></button>";
        chatbot += "<div id='cModal' class='modal fade chat-modal' role='dialog'>";
        chatbot += "<div class='modal-dialog'>";
        chatbot += "<div class='modal-content'>";
        chatbot += "<div class='modal-header'>";
        chatbot += "<button type='button' class='close' data-dismiss='modal'>&times;</button>";
        chatbot += "<div class='chat-logo'></div>";
        chatbot += "</div>";
        chatbot += "<div class='modal-body'>";
        chatbot += "</div>";
        chatbot += "</div>";
        chatbot += "</div>";
        chatbot += "</div>";
                            
        $("#dvChatBot").append(chatbot); 

        $("#dvChatBot").show();
        //Exibe o modal do chatbot após 45 segundo da inicialização do app  
        setTimeout(function () { $('#cModal').modal('show'); }, 45000);

        //Exibe o conteudo do chatbot
        var $hasOpen = false;

        $('#cModal').on('shown.bs.modal', function (e) {
            var sWidth = $('.modal-body').css('width');

            if (sWidth == '318px')
                var iframeElement = '<iframe id="control-ext" src="https://www.treetools.com.br/chat3_conduent/chat/chat.zul?context=1&lang=pt_BR&w=318&h=450&logo=false&email=teste@conduent.com" width="318" height="450" scrolling="no" frameborder="0" allowtransparency="true"></iframe>';
            else
                var iframeElement = '<iframe id="control-ext" src="https://www.treetools.com.br/chat3_conduent/chat/chat.zul?context=1&lang=pt_BR&w=350&h=450&logo=false&email=teste@conduent.com" width="350" height="450" scrolling="no" frameborder="0" allowtransparency="true"></iframe>';

            $(this).find('iframe').remove();
            $(this).find('.modal-body').append(iframeElement);

        })
    }
    else {
        $("#dvChatBot").hide();
    }
}
else
{
    $("#dvChatBot").hide();
}



        
   