(function($){
    
    $('.paroller').paroller() //intancia da função do evento parallax
    var contentWaypoint = function(){  
        $('.element-animate').waypoint( function( direction ){ //waypoint captura a position do scroll
            console.log(direction)
            console.log(this)
            console.log(this.element)
            
            const $element = $(this.element);
            let effect = $element.data('animate-effect') || 'fadeInUp'; //effect recebe $element.data('animate-effect') ou 'fadeInUp'
                        
            if(direction === 'down' && !$element.hasClass('element-animated')){ //se direction for down e elemento não tiver com a classe element-animated (flag de animada)
                $element.removeClass('element-animate').addClass('element-animated ' + effect) //remove classe element-animate e adiciona efeito de animação
            }
        }, {
            offset: '90%' //Ajuste para efeito ocorrer em posições mais adequadas ao scroll, Acrescenta a distancia do objeto em relação as margens do DOM
        })
    }
    
    contentWaypoint()
})(jQuery)