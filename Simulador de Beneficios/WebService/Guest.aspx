<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Guest.aspx.cs" Inherits="Guest" %>
<%@ Register Src="~/control/wcSimuladorBeneficio.ascx" TagPrefix="uc1" TagName="wcSimuladorBeneficio" %>

<!DOCTYPE html>
<html lang="pt-BR">
<head id="Head1" runat="server">
    <meta charset="utf-8">

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="img/favicon.ico">
    <title>Guest Mobile</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/swiper.min.css" rel="stylesheet">
    <link href="css/main.css" rel="stylesheet">

</head>
<body>
    <form id="form1" runat="server">
        <input type="hidden" id="hdnExemplo" value="1" />
        <input type="hidden" id="hdnRentab" value="1" />
        <input type="hidden" id="hdnSimulador" value="1" />
        <input type="hidden" id="hdnModulos" value="1" />
        <input type="hidden" id="hdnEnt" value="<%=IdEntidade %>" />

        <link href="css/<%=IdEntidade %>main.min.css" rel="stylesheet">
        <div id="dvInicio" class="col-sm-12" style="z-index: 9999">
            <div class="panel panel-default">
                <div class="panel-heading" >
 
                </div>
                <div class="panel-body panel-body-menu" id="dvMenu">
                    <div class="row">
                        <div class="col-xs-4 item-menu">
                        </div>
                    </div>
                </div>
            </div>


        </div>
        <div id="dvContainerMenu" runat="server">

            <header id="header">

                <%--<nav class="navbar navbar-inverse navbar-fixed-top" role="banner">--%>
                <nav class="navbar navbar-inverse navbar-fixed-top" role="banner">
                    <div class="container" id="dvMenuModulos">
                    </div>
                    <!--/.container-->
                </nav>
                <!--/nav-->

            </header>
            <%--<div class="container" style="padding: 0; padding-top: 13%;">--%>

            <div class="container swiper-container" style="padding: 0; padding-top: 65px">
                <div class="swiper-wrapper" id="sw">
                    <!--Rentabilidade-->
                    <div class="row  swiper-slide" id="dvRentabilidadeWrapper">
                        <div id="dvRentabilidade" class="col-sm-12"> 
                            <div class="row" id="formOpcoesRentab">
                                <div class="panel panel-default">
                                <div class="panel-heading" style="padding:15px 10px;">
                                     Rentabilidade por Perfil de Investimento
                                </div>
                                    <br />
                                <div class="col-md-6 col-sm-6">
                                    <div class="jumbotron" style="padding: 30px 15px;"> 
                                    <h2>PPC</h2>
                                    <p style="font-size: 17px; min-height: 96px; text-align: justify;">Plano de Benefício Definido administrado pela FIPECq. Complementa os benefícios do INSS aos Participantes vinculados ao regime seletista das Patrocinadoras.
                                    </p>
                                    <center>
                                        <a class="btn btn-primary btn-lg" onclick='preloadRentabJSON(614)' role="button">Rentabilidade</a>
                                    </center>
                                    </div>
                                </div>

                                <div class="col-md-6 col-sm-6">
                                    <div class="jumbotron" style="padding: 30px 15px;">
                                    <h2>FIPECqPREV</h2>
                                    <p style="font-size: 17px; min-height: 96px; text-align: justify;">Plano de Contribuição Definida (CD) instituído pela Caixa de Assistência Social da FIPECq - FIPECqVida, destinado a todos os seus Associados.
                                    </p>
                                    <center>
                                        <a class="btn btn-primary btn-lg" onclick='preloadRentabJSON(616)' role="button">Rentabilidade</a>
                                    </center>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="panel panel-default" id="dvRentabHeader">
                                <div class="panel-heading" style="padding:15px 10px;">
                                     <a onclick="goBackRentab()" style="color:#fff;font-size:15px;" ><span class="glyphicon glyphicon-chevron-left"></span> Rentabilidade por Perfil de Investimento</a>
                                </div>
                                <div class="panel-body pRentab">
                                </div>
                            </div>
                            <div class="panel panel-default panel-info-bco" id="dvRentabItem">
                                <div class="panel-body panel-info-bco" style="padding-top: 15px">
                                    <p style="margin: 10px; font-size: 17px; margin-top: 5px; text-align: center">
                                        Rentabilidade nos Últimos 12 Meses
                                    </p>
                                    <div class="table-responsive" style="font-size: 10px;">
                                        <div>
                                            <table class="table table-bordered" cellspacing="0" rules="all" border="1" id="grdRentab" style="border-collapse: collapse;">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" style="font-size: 14px; width: 35%;">Data</th>
                                                        <th scope="col" style="font-size: 14px;">Perfil</th>
                                                        <th scope="col" style="font-size: 14px; width: 25%;">%</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Rentabilidade fim-->
                    <!-- Simulador de Beneficios-->
                    <div class="row  swiper-slide" id="dvSimuladorWrapper">
                        <div id="dvSimulador" class="col-sm-12">
                            <div class="panel panel-default" style="box-shadow: none;">
                                <div class="panel-heading">
                                    <div id="titleSimulador"><strong>Simulador de Benefício de Aposentadoria</strong></div>
                                </div>
                                <div class="panel-body" style="background: #fff; padding: 0px;">
                                    <div class="row" id="dvRowSimulador" style="padding: 8px 5px 0px;">
                                        <div class="col-xs-12" style="margin: 0px; padding: 0px; overflow: hidden;">
                                            <uc1:wcSimuladorBeneficio ID="ucSimulador" runat="server" />
                                        </div>

                                    </div>
                                    <div  class="row" id="dvRowPreSimulador" style="display:none;">
                                        <%--INICIAL teste--%>
                                        <style>
                                        .form-group .form-control {
                                            border-color: none;
                                            margin-left: 0px;
                                          }

                                          .form-control:focus {
                                            border-color: #66afe9;
                                            outline: 0;
                                            -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
                                            box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
                                          }
  
                                          .row {
                                            margin-right: 0px;
                                            margin-left: 0px;
                                          }
  
                                          .titulo {      
                                            margin-top: 35px!important;
                                            text-align: center;
                                          }

                                        </style>

                                        <div class="">
                                          <div class="row" id="formOpcoes">

                                            <div class="col-md-6 col-sm-6">
                                              <div class="jumbotron" style="padding: 30px 15px; margin-top: 20px;">
                                                <h2>PPC</h2>
                                                <p style="font-size: 17px; min-height: 96px; text-align: justify;">Plano de Benefício Definido administrado pela FIPECq. Complementa os benefícios do INSS aos Participantes vinculados ao regime seletista das Patrocinadoras.
                                                </p>
                                                <center>
                                                  <a class="btn btn-primary btn-lg" onclick='Load("ppc")' role="button">Simular</a>
                                                </center>
                                              </div>
                                            </div>

                                            <div class="col-md-6 col-sm-6">
                                              <div class="jumbotron" style="padding: 30px 15px;">
                                                <h2>FIPECqPREV</h2>
                                                <p style="font-size: 17px; min-height: 96px; text-align: justify;">Plano de Contribuição Definida (CD) instituído pela Caixa de Assistência Social da FIPECq - FIPECqVida, destinado a todos os seus Associados.
                                                </p>
                                                <center>
                                                  <a class="btn btn-primary btn-lg" onclick='Load("fipecqPrev")' role="button">Simular</a>
                                                </center>
                                              </div>
                                            </div>

                                          </div>
  
                                          <div class="row"  id='formSim' style="padding: 0px 15px;">
                                            <div class="page-header-right">
                                              <h1 class="titulo">Dados de Simulação</h1>
                                            </div>
  
                                            <br />
  
                                            <p style="text-align: justify">
                                             Acesse o nosso simulador de benefícios para planejar a sua aposentadoria. Preencha o formulário e clique em "Simular".
                                           </p>

                                           <div class="row">
                                              <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                              <div class="col-xs-12 col-sm-10 col-md-10 alert alert-danger" id="alert" ></div>
                                              <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                           </div>
                                 
                                         <div class="row">

                                          <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                          <div class="col-xs-12 col-sm-10 col-md-10">
                                            <div class="panel panel-primary">
                                              <!-- <div class="panel-heading"><h4><span>Dados de Simulação</span></h4></div> -->
                                              <div class="panel-body">
                                                <div class="row">
                                                  <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                                  <div class="col-xs-12 col-sm-10 col-md-10">
                                                   <%--<form class="form-horizontal" id="frm_simulador_group">--%>
                                                    <!-- <form class="form-horizontal" id="frm_simulador_group"> -->
                                                    <div class="form-group col-xs-12 col-sm-6 col-md-6">
                                                      <label for="nome" class="col-xs-12 col-sm-12 col-md-12">Nome Completo</label>
                                                      <div class="col-xs-12 col-sm-12 col-md-12">
                                                        <input type="text" class="form-control" id="nome" aria-describedby="nomeHelp" placeholder="Nome Completo" required>
                                                        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                                                      </div>
                                                    </div>
                                                    <div class="form-group col-xs-12 col-sm-6 col-md-6" style="margin-right:45px;">
                                                      <label for="cpf" class="col-xs-0 col-sm-0 col-md-0">CPF</label>
                                                      <div class="col-xs-0 col-sm-0 col-md-0"> 
													    <input type="text" class="form-control" id="cpfPre" aria-describedby="cpfHelp" placeHolder="___.___.___-__" maxlength="11" onkeypress="return isNumber(event);" required>
                                                        <!-- <input type="text" class="form-control" id="cpfPre" aria-describedby="cpfHelp" placeHolder="___.___.___-__" maxlength="14" onkeyup="formataCPF(this, event);" onkeypress="return isNumber(event);" required>-->
                                                        <!-- <small id="cpfHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                                                      </div>
                                                    </div>
                                                    <div class="form-group col-xs-12 col-sm-6 col-md-6" >
                                                      <label for="sexo" class="col-xs-0 col-sm-0 col-md-0">Sexo</label>
                                                      <div class="col-xs-0 col-sm-0 col-md-0" style="padding-top: 7px;">
                                                        <input id="sexoM" type="radio" aria-describedby="sexoHelp" name="sexo" value="01" checked> Masculino
                                                        <input id="sexoF" type="radio" aria-describedby="sexoHelp" name="sexo" value="02"> Feminino
                                                      </div>
                                                    </div>
                                                    <div class="form-group col-xs-12 col-sm-6 col-md-6" >
                                                      <label for="email" class="col-xs-12 col-sm-12 col-md-12">E-mail</label>
                                                      <div class="col-xs-12 col-sm-12 col-md-12">
                                                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="visitante@exemplo.com" required>
                                                        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                                                      </div>
                                                    </div>
                                                    <div class="form-group col-xs-12 col-sm-6 col-md-6" >
                                                      <label for="telefone" class="col-xs-12 col-sm-12 col-md-12">Telefone</label>
                                                      <div class="col-xs-12 col-sm-12 col-md-12">
													    <input type="text" class="form-control" id="telefone" aria-describedby="telefoneHelp" placeHolder="(__) _____-____" maxlength="20" required>
                                                        <!-- <input type="text" class="form-control" id="telefoneC" aria-describedby="telefoneHelp" placeHolder="(__) _____-____" maxlength="15" onkeyup="formataTelefone(this, event);" required> -->
                                                        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                                                      </div>
                                                    </div>
                                                    <div class="form-group col-xs-12 col-sm-6 col-md-6" >
                                                      <label for="dtncmto" class="col-xs-12 col-sm-12 col-md-12">Data de Nascimento</label>
                                                      <div class="col-xs-12 col-sm-12 col-md-12" style="padding-top: 7px;">
                                                        <input type="date" class="form-control" id="dtncmto" aria-describedby="dtncmtoHelp" placeholder="" max="9999-12-31" required>
                                                        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                                                      </div>
                                                    </div>
                                                    <div class="form-group col-xs-12 col-sm-6 col-md-6" id="dvDtAdmissao">
                                                      <label for="dtadmissao" class="col-xs-12 col-sm-12 col-md-12">Data de Admissão</label>
                                                      <div class="col-xs-12 col-sm-12 col-md-12" style="padding-top: 7px;">
                                                        <input type="date" class="form-control" id="dtadmissao" aria-describedby="dtadmissaoHelp" placeholder="" max="9999-12-31" required>
                                                        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                                                      </div>
                                                    </div>
                                                    <div class="form-group col-xs-12 col-sm-6 col-md-6" id="dvIdadeAposent">
                                                      <label for="idadeAposentadoria" class="col-xs-12 col-sm-12 col-md-12">Idade de Aposentadoria</label>
                                                      <div class="col-xs-12 col-sm-12 col-md-12">
                                                        <input type="number" class="form-control" id="idadeAposentadoria" aria-describedby="idadeAposentaHelp" placeholder="" min="0" max="100" required>
                                                        <small id="idadeAposentaHelp" class="form-text text-muted">Idade em anos.</small>
                                                      </div>
                                                    </div>
                                                    <div class="form-group col-xs-12 col-sm-6 col-md-6" id="dvQtdDependentes">
                                                      <label for="qtddependentes" class="col-xs-12 col-sm-12 col-md-12">Quantidade dependentes</label>
                                                      <div class="col-xs-12 col-sm-12 col-md-12" style="padding-top: 7px;">
                                                        <input type="number" class="form-control" id="qntdep" aria-describedby="qtddependentesHelp" placeholder="" min="0" max="99" required>
                                                        <small id="qtddependentes" class="form-text text-muted">Quantidade total de dependentes.</small>
                                                      </div>
                                                    </div>
                                                    <div class="form-group col-xs-12 col-sm-6 col-md-6">
                                                      <label for="salario" class="col-xs-12 col-sm-12 col-md-12">Salário</label>
                                                      <div class="col-xs-12 col-sm-12 col-md-12">
                                                        <input type="number" class="form-control" id="salario" aria-describedby="salarioHelp" placeholder="0.00" required>
                                                        <small id="salarioHelp" class="form-text text-muted">Preenchimento ex: 1000,00</small>
                                                      </div>
                                                    </div>
                                                    <div class="form-group col-xs-12 col-sm-6 col-md-6">
                                                      <label for="opcao" class="col-xs-12 col-sm-12 col-md-12">Regime de Tributação</label>
                                                      <div class="col-xs-12 col-sm-12 col-md-12">
                                                        <select class="form-control" id="opcao">
                                                          <option value = 'N'>Progressiva</option>
                                                          <option value = 'S'>Regressiva</option>
                                                        </select>
                                                      </div>
                                                    </div>
                                                    <p style="text-align: justify"><strong>(*) O preenchimento de todos os campos é obrigatório.</strong> </p>
                                                    <div class="row">
                                                      <div class = "col-xs-12 col-sm-2 col-md-2"></div>
                                                      <div class = "col-xs-12 col-sm-8 col-md-8 center" style="margin-bottom:10px;">                                                        
                                                        <!--SUBMIT-->               
                                                        <a id="button"  autocomplete="off" class="btn btn-warning" onclick="ContrutorForm();">Simular</a>
                                                      </div>
                                                      <div class = "col-xs-12 col-sm-2 col-md-2"></div>
                                                    </div>
                                                      <%--</form>--%>
                                                  </div>
                                                    <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                                </div>
                                                
                                                <br />
                                                </div>
                                                </div>

                                              </div>
                                             <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                            </div>
                                          </div>
                                        </div>
                                        <%--FINAL teste--%>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Simulador de Beneficios fim-->
                    
                     <!--Fale Conosco-->
                    <div class="row  swiper-slide" id="dvFaleConoscoWrapper">
                        <div id="dvFaleConosco" class="col-sm-12">
                            <div class="panel panel-default" style="box-shadow: none;">
                                <div class="panel-heading">
                                    <strong></strong>
                                </div>
                                <div class="panel-body" style="background: #fff;">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <span id="spError"></span>
                                            <div class="form-group">
                                                <label align="left" for="txtFlEmail">Nome</label>
                                                <input type="email" class="form-control" id="txtFlNome" placeholder="Informe seu Nome" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4" maxlength="40" required>
                                            </div>
                                            <div class="form-group">
                                                <label align="left" for="txtFlEmail">CPF</label>
                                                <input type="email" class="form-control" id="txtFlCpf" placeholder="Informe seu CPF" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4" maxlength="40" required>
                                            </div>
                                            <div class="form-group">
                                                <label align="left" for="txtFlEmail">E-mail</label>
                                                <input type="email" class="form-control" id="txtFlEmail" placeholder="Informe seu e-mail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4" maxlength="40" required>
                                            </div>
                                            <div class="form-group">
                                                <label align="left" for="txtFlTel">Telefone de Contato</label>
                                                <input type="text" class="form-control" name="txtFlTel" id="txtFlTel" placeholder="Ex: xx xxxxx-xxxx" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4" maxlength="20">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label align="left" for="txtFlMsg">Mensagem</label>
                                                <textarea onkeyup="limite_textarea(this.value)" class="form-control" rows="4" cols="50" maxlength="300" name="txtFlMsg" id="txtFlMsg" style="width: 100%; height: 111px; min-width: 100%; border: solid 1px #c4c4c4"></textarea>
                                                <p>Restam: <span id="cont">300</span> caracteres</p>

                                                <input type="button" id="btnFaleConosco" value="Enviar" class="btn btn-primary" style="margin: 15px 0;">
                                                <p id="msgFlReturn" style="font-size: 12px"></p>
                                                <span></span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end Fale Conosco-->

                    <!--Alterar Senha-->
                    <div class="row  swiper-slide" id="dvAlterarSenhaWrapper">
                        <div id="dvAlterarSenha" class="col-sm-12"> 
                            <div class="row">
                                <div class="panel panel-default center">
                                    <div class="panel-heading" style="padding:15px 10px;">
                                         Esqueceu Sua Senha
                                    </div>
                                    <div id="contentAltSenha" style="margin:25px">
                                        <div class="col-sm-12">Informe seu CPF abaixo, para receber uma nova senha por e-mail. </div>
                                        <div class="col-sm-12" style="margin-top:15px">
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="txtAltSenhaCpf" id="txtAltSenhaCpf" placeholder="Digite seu CPF" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4" maxlength="11">
                                            </div>
                                        </div>

                                        <div class="col-sm-12">
                                            <input type="button" id="btnAltSenha" value="Enviar" class="btn btn-primary" style="margin: 15px 0;">
                                        
                                        </div>
                                        
                                    </div>
                                    <div id="contentAltSenhaPergunta" style="margin:25px;display:none">
                                        <div class="col-sm-12">Esta é a pergunta que você selecionou previamente. Informe a resposta que você cadastrou para esta pergunta.</div>
                                        <div class="col-sm-12" id="perguntaSecreta" style="margin-top:15px;font-weight:bold;">
                                        </div>
                                        <div class="col-sm-12" style="margin-top:15px">
                                            <div class="form-group">
                                                <input type="password" class="form-control" name="txtAltSenhaReposta" id="txtAltSenhaReposta" placeholder="Digite a Resposta" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4" maxlength="20">
                                            </div>
                                        </div>
                                        <div class="col-sm-12" style="margin-top:15px">
                                            <div class="form-group">
                                                <input type="password" class="form-control" name="txtAltSenhaConfirma" id="txtAltSenhaConfirma" placeholder="Digite a Novamente" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4" maxlength="20">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <input type="button" id="btnRepostaSecreta" value="Enviar" onclick="ValidaResposta();" class="btn btn-primary" style="margin: 15px 0;">
                                        
                                        </div>
                                    </div>
                                    <div id="contentNovaSenha" style="margin:25px;display:none">

                                        <div class="col-sm-12" style="margin-top:15px">
                                            <div class="col-sm-12">Digite a nova senha</div>
                                            <div class="form-group" style="margin-top:15px">
                                                <input type="password" class="form-control" name="txtNovaSenha" id="txtNovaSenha" placeholder="Digite a Nova Senha" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4" maxlength="20">
                                            </div>
                                        </div>
                                        <div class="col-sm-12" style="margin-top:15px">
                                            <div class="form-group">
                                                <input type="password" class="form-control" name="txtNovaSenhaConfirma" id="txtNovaSenhaConfirma" placeholder="Digite a Senha Novamente" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4" maxlength="20">
                                            </div>
                                        </div>
                                        <div class="col-sm-12" style="margin-top:15px">Grave sua nova senha pois será utilizada em futuras consultas ao portal</div>
                                        <div class="col-sm-12" >
                                            <input type="button" id="btnNovaSenha" value="Enviar" onclick="SendSenhaNova();" class="btn btn-primary" style="margin: 15px 0;">
                                        
                                        </div>
                                    </div>

                                    <div class="col-sm-12">
                                            <p id="msgReturn" style="font-size: 13px"></p>
                                        </div>


                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Alterar Senha fim-->
                   

                </div>
            
                </div>
            
        </div>

        <div id="modalBack" class="modalbackground"></div>
        <div id="wait">

            <div class="container">
                <button class="btn btn-lg btn-warning btn-center"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Carregando...</button>
            </div>


        </div>
        </div>
        <div class="container" style="padding: 0; display: none" id="dvErro">
        <div class="row">
            <div class="col-sm-12">
                <div class="panel panel-default">
                    <div class="aviso" role="alert">
                        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span
                            class="sr-only">Error:</span> Ops! Ocorreu um erro inesperado.
                    </div>
                    <div class="panel-body" style="min-height: 500px; background: url('img/cog.png') repeat-x fixed center;">
                        <span text="" id="lblMsgErro" runat="server"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
            
    </form>
    <script src="js/jquery-2.1.4.min.js"></script>
    <script src="https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/js/ext_libs/jquery-ui-1.10.4.custom.min.js"></script>
    <script src="https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/js/ext_libs/jquery.ui.touch-punch.min.js"></script>
    <script src="https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/js/ext_libs/jshashset-3.0.min.js"></script>
    <script src="https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/js/ext_libs/jshashtable-3.0.min.js"></script>
    <script src="https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/js/ext_libs/jquery.numberformatter-1.2.4.min.js"></script>
    <script src="https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/js/ext_libs/jquery-ismobile.min.js"></script>
    <script src="https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/js/ext_libs/mobile/events-mobile.js"></script>
    <%--  <script src="https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/js/ext_libs/bootstrap.min.js"></script>   --%>
    <script src="https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/js/ext_libs/Chart.min.js"></script>
    <div id="config_scripts"></div>
    <%--<script src="js/view-model.js"></script>--%>

    <script src="https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/js/base_scripts/view-model.js"></script>
    <script src="js/pre-view-model.js"></script>

    <script src="js/bootstrap.min.js"></script>
    <script src="js/swiper.min.js"></script>
    <script src="js/commonGuest.js"></script>
    <script src="js/index.js"></script>
    <script src="js/mask.js"></script>
    <script src="https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/js/ext_libs/mobile/maskedinput.js"> </script>
</body>
</html>
