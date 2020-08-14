//Eventos Mobile

function removeHide() {
  switch (status.toString()){
    case "1": //ativo
      switch (motivo_status){
        case "":
        
        break;
        default:
          $("#secMsg").removeClass("hide");
          $("#secSaldo").removeClass("hide");
          $("#secContrib").removeClass("hide");
          $("#secHipot").removeClass("hide");
          $("#secSimulation").removeClass("hide");
          $("#secResgate").removeClass("hide");
          $("secFoot").removeClass("hide");      
      
          $("#secMsg").show();
          $("#secSaldo").hide();
          $("#secContrib").hide();
          $("#secHipot").hide();
          $("#secSimulation").hide();
          $("#secResgate").hide();
          $("#secFoot").hide();     
        break;
      };  
    break;  
    case "2": //aguardando benefício diferido
      switch (motivo_status){
        case "":
        
        break;
        default:
          $("#secMsg").removeClass("hide");
          $("#secSaldo").removeClass("hide");
          $("#secContrib").removeClass("hide");
          $("#secHipot").removeClass("hide");
          $("#secSimulation").removeClass("hide");
          $("#secResgate").removeClass("hide");
          $("#secFoot").removeClass("hide");      
      
          $("#secMsg").show();
          $("#secSaldo").hide();
          $("#secContrib").hide();
          $("#secHipot").hide();
          $("#secSimulation").hide();
          $("#secResgate").hide();
          $("#secFoot").hide();      
        break;
      };  
    break;  
    case "3": //autopatrocinado
      switch (motivo_status){
        case "":
        
        break;
        default:
          $("#secMsg").removeClass("hide");
          $("#secSaldo").removeClass("hide");
          $("#secContrib").removeClass("hide");
          $("#secHipot").removeClass("hide");
          $("#secSimulation").removeClass("hide");
          $("#secResgate").removeClass("hide");
          $("#secFoot").removeClass("hide");      
      
          $("#secMsg").show();
          $("#secSaldo").hide();
          $("#secContrib").hide();
          $("#secHipot").hide();
          $("#secSimulation").hide();
          $("#secResgate").hide();
          $("#secFoot").hide();       
        break;
      };  
    break;  
    case "4": //desligado aguardando
      switch (motivo_status){
        case "":
        
        break;
        default:
          $("#secMsg").removeClass("hide");
          $("#secSaldo").removeClass("hide");
          $("#secContrib").removeClass("hide");
          $("#secHipot").removeClass("hide");
          $("#secSimulation").removeClass("hide");
          $("#secResgate").removeClass("hide");
          $("#secFoot").removeClass("hide");      
      
          $("#secMsg").show();
          $("#secSaldo").hide();
          $("#secContrib").hide();
          $("#secHipot").hide();
          $("#secSimulation").hide();
          $("#secResgate").hide();
          $("#secFoot").hide();      
        break;
      };  
    break;  
    case "5": //empregado não Participante do Plano
      switch (motivo_status){
        case "":
        
        break;
        default:
           //Código aqui
        break;
      };  
    break;  
    case "6": //desligado
      switch (motivo_status){
        case "":
           
        break;
        default:
          //Código aqui
        break;
      };  
    break;  
    case "7": //excluído do plano
      switch (motivo_status){
        case "":
        
        break;
        default:
          $("#secMsg").removeClass("hide");
          $("#secSaldo").removeClass("hide");
          $("#secContrib").removeClass("hide");
          $("#secHipot").removeClass("hide");
          $("#secSimulation").removeClass("hide");
          $("#secResgate").removeClass("hide");
          $("#secFoot").removeClass("hide");      
      
          $("#secMsg").show();
          $("#secSaldo").hide();
          $("#secContrib").hide();
          $("#secHipot").hide();
          $("#secSimulation").hide();
          $("#secResgate").hide();
          $("#secFoot").hide();
                             
        break;
      };  
    break;
    case "9": //assistido
      switch (motivo_status){
        case "":
        
        break;
        default:
          $("#secMsg").removeClass("hide");
          $("#secSaldo").removeClass("hide");
          $("#secContrib").removeClass("hide");    
          $("#secSimulation").removeClass("hide");
          //$("#secEvolSaque").removeClass("hide");    
          $("#secFoot").removeClass("hide");                         
               
          $("#secMsg").show();
          $("#secSaldo").hide();
          $("#secContrib").hide();    
          $("#secSimulation").hide();         
          $("#secFoot").hide();    
          
          //Esconde botões de benefícios 
          $("#stepFive-assistido-btn-up").removeClass("hide");
          $("#stepFive-btn-down").addClass("hide");                   
          $("#stepFive-btn-up").addClass("hide");
           
        break;
      };  
    break;  
    default:

    break;
  };
  
  setHeight_S();
  
}

//redimensiona tamanho de altura do simulador de beneficios
function exibeSimulacao() {
 if (ctlDireito){
    $("#secHipot").hide();
    $("#secResgate").hide();
    backToTop();  
    setHeight_S();    
 } else {
    $("#secHipot").hide();
    $("#secResgate").show();
    backToTop();
    setHeight_S();
 }    
     
}

//movimento suave topo
function backToTop() {
    /*
    $('html,body').animate({
        scrollTop: 50
    }, 70);
    */    
    $('html,body').animate({
        scrollTop: $("#dvContainerMenu").offset().top
    },70);
}


$('#stepOne-btn-down').on('click', function () { //Botão down Mensagem, Mostra Tela de Saldo
    backToTop();

    $("#secMsg").hide();
    $("#secSaldo").fadeIn(100);
    $("#secContrib").hide();
    $("#secHipot").hide();
    $("#secSimulation").hide();
    $("#secResgate").hide();     

    var intervalo_1 = setInterval(setHeight_S, 100); 

    setTimeout(function() {
      clearInterval(intervalo_1);
    }, 300);
        

});

$('#stepTwo-btn-up').on('click', function () {  //Botão up Saldo, Mostra Tela Mensagem 
    backToTop();

    $("#secMsg").fadeIn(100);
    $("#secSaldo").hide();
    $("#secContrib").hide();
    $("#secHipot").hide();
    $("#secSimulation").hide();
    $("#secResgate").hide();
    
    var intervalo_2 = setInterval(setHeight_S, 100); 

    setTimeout(function() {
      clearInterval(intervalo_2);
    }, 300);
    
});

$('#stepTwo-btn-down').on('click', function () {  //Botão down Saldo, Mostra Tela de Contribuição
    backToTop();

    $("#secMsg").hide();
    $("#secSaldo").hide();
    $("#secContrib").fadeIn(100);         
    $("#secHipot").hide();
    $("#secSimulation").hide();
    $("#secResgate").hide();
    
    var intervalo_3 = setInterval(setHeight_S, 100);  
    
    setTimeout(function() {
      clearInterval(intervalo_3);
    }, 300);    

});

$('#stepThree-btn-up').on('click', function () {  //Botão up Contrib, Mostra Tela Saldo
    backToTop();

    $("#secMsg").hide();
    $("#secSaldo").fadeIn(100);
    $("#secContrib").hide();
    $("#secHipot").hide();
    $("#secSimulation").hide();
    $("#secResgate").hide();

    var intervalo_4 = setInterval(setHeight_S, 100); 

    setTimeout(function() {
      clearInterval(intervalo_4);
    }, 300);

});

     
$('#stepThree-btn-down').on('click', function () {  //Botão down Contrib
    if(status.toString() == "9"){ //Mostra Tela de Benefício se for assistido
    
    backToTop();

    $("#secMsg").hide();
    $("#secSaldo").hide();
    $("#secContrib").hide();
    $("#secSimulation").fadeIn(100);
    $("#secResgate").hide();
   
    } else {   //Mostra Tela Simular
    
    backToTop();

    $("#secMsg").hide();
    $("#secSaldo").hide();
    $("#secContrib").hide();
    $("#secHipot").fadeIn(100);
    $("#secSimulation").hide();
    $("#secResgate").hide();

    }    

    var intervalo_5 = setInterval(setHeight_S, 100); 

    setTimeout(function() {
      clearInterval(intervalo_5);
    }, 300);

});


$('#stepFour-btn-up').on('click', function () {  //Botão up Simular, Mostra Tela de Contribuição
    backToTop();

    $("#secMsg").hide();
    $("#secSaldo").hide();
    $("#secContrib").fadeIn(100);
    $("#secHipot").hide();
    $("#secSimulation").hide();
    $("#secResgate").hide();

    var intervalo_6 = setInterval(setHeight_S, 100); 

    setTimeout(function() {
      clearInterval(intervalo_6);
    }, 300);
 
});

$('#stepFive-btn-up').on('click', function () {  //Botão up Benefício, Mostra Tela Simular
    backToTop();

    $("#secMsg").hide();
    $("#secSaldo").hide();
    $("#secContrib").hide();
    $("#secHipot").fadeIn(100);
    $("#secSimulation").hide();
    $("#secBenefApos").hide();
    $("#secResgate").hide();

    var intervalo_7 = setInterval(setHeight_S, 100); 

    setTimeout(function() {
      clearInterval(intervalo_7);
    }, 300);
 
});

$('#stepFive-btn-down').on('click', function () { //Botão down Benefício, Mostra Tela de Resgate
    backToTop();

    $("#secMsg").hide();
    $("#secSaldo").hide();
    $("#secContrib").hide();
    $("#secHipot").hide();
    $("#secSimulation").fadeIn(100);
    $("#secBenefApos").hide();
    $("#secResgate").show();

    var intervalo_8 = setInterval(setHeight_S, 100); 

    setTimeout(function() {
      clearInterval(intervalo_8);
    }, 300);
 
});

$('#stepFive-assistido-btn-up').on('click', function () { //Botão up Benefício Assistido, Mostra Tela de Contribuição
    backToTop();

    $("#secMsg").hide();
    $("#secSaldo").hide();
    $("#secContrib").fadeIn(100);
    $("#secHipot").hide();
    $("#secSimulation").hide();
    $("#secResgate").hide();

    var intervalo_9 = setInterval(setHeight_S, 100);  

    setTimeout(function() {
      clearInterval(intervalo_9);
    }, 300);

});

$('#secDemonsCalcBtn').on('click', function () { //Botão Demonstrativo de calculo

    var intervalo_DemonsCalc = setInterval(setHeight_S, 100); 

    setTimeout(function() {
      clearInterval(intervalo_DemonsCalc);
    }, 500);

});

$('#stepSix-btn-up').on('click', function () {  //Botão up Resgate
    backToTop();

    if (ctlDireito) { //Se tiver direito botão retorna para beneficio
        $("#secMsg").hide();
        $("#secSaldo").hide();
        $("#secContrib").hide();
        $("#secHipot").hide();
        $("#secSimulation").fadeIn(100);
        $("#secBenefApos").show();
        $("#secResgate").hide();
    } else {         //Se não tiver direito botão retorna para simular
        $("#secMsg").hide();
        $("#secSaldo").hide();
        $("#secContrib").hide();
        $("#secHipot").fadeIn(100);
        $("#secSimulation").hide();
        $("#secBenefApos").hide();
        $("#secResgate").hide();
    }
    
    var intervalo_10 = setInterval(setHeight_S, 100); 

    setTimeout(function() {
      clearInterval(intervalo_10);
    }, 300);

});

function setHeight_S() {
    var dvId = "dvSimulador";
    var dvHeight = $('#'+dvId).height();
    
    //document.getElementById('sw').style.height = dvHeight + 'px';
    $('#sw').height(dvHeight);

}
