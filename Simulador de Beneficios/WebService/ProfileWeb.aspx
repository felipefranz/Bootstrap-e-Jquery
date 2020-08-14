<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ProfileWeb.aspx.cs" Inherits="ProfileWeb" %>

<%@ Register Src="~/control/wcSimuladorBeneficio.ascx" TagPrefix="uc1" TagName="wcSimuladorBeneficio" %>

<!DOCTYPE html>
<html lang="pt-BR">
<head id="Head1" runat="server">
    <script src="js/google-analytics.js"></script>
    <!-- Google Analytics -->
    <script>
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date(); a = s.createElement(o),
            m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
        let ConfiguracaoAvonGA = buscarConfiguracaoGoogleAnalitycs('10');
        let ConfiguracaoPrevMonGA = buscarConfiguracaoGoogleAnalitycs('18');
        let ConfiguracaoRbsGA = buscarConfiguracaoGoogleAnalitycs('27');
        let ConfiguracaoCarrefourGA = buscarConfiguracaoGoogleAnalitycs('48');
        let ConfiguracaoEmbraerGA = buscarConfiguracaoGoogleAnalitycs('57');
        let ConfiguracaoFipecGA = buscarConfiguracaoGoogleAnalitycs('61');
        let ConfiguracaoGebsaGA = buscarConfiguracaoGoogleAnalitycs('62');
        ga('create', ConfiguracaoAvonGA.propriedadeId, 'auto', ConfiguracaoAvonGA.nomeRastreador);
        ga('create', ConfiguracaoPrevMonGA.propriedadeId, 'auto', ConfiguracaoPrevMonGA.nomeRastreador);
        ga('create', ConfiguracaoRbsGA.propriedadeId, 'auto', ConfiguracaoRbsGA.nomeRastreador);
        ga('create', ConfiguracaoCarrefourGA.propriedadeId, 'auto', ConfiguracaoCarrefourGA.nomeRastreador);
        ga('create', ConfiguracaoEmbraerGA.propriedadeId, 'auto', ConfiguracaoEmbraerGA.nomeRastreador);
        ga('create', ConfiguracaoFipecGA.propriedadeId, 'auto', ConfiguracaoFipecGA.nomeRastreador);
        ga('create', ConfiguracaoGebsaGA.propriedadeId, 'auto', ConfiguracaoGebsaGA.nomeRastreador);
    </script>
    <!-- End Google Analytics -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="img/favicon.ico">
    <title>Profile Web</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <%--<link href="css/jquery.fileupload.css" rel="stylesheet" />--%>
    <link href="css/swiper.min.css" rel="stylesheet">
    <link href="css/main.css" rel="stylesheet">
    <link href="css/waitme.css" rel="stylesheet">
</head>
<body>
    <form id="form1" runat="server">
        <input type="hidden" id="hdnSaldo" value="1" />
        <input type="hidden" id="hdnExtrato" value="1" />
        <input type="hidden" id="hdnRentab" value="1" />
        <input type="hidden" id="hdnHome" value="1" />
        <input type="hidden" id="hdnCadastro" value="1" />
        <input type="hidden" id="hdnDadosCadastrais" value="1" />
        <input type="hidden" id="hdnSimulador" value="1" />
        <input type="hidden" id="hdnModulos" value="1" />
        <input type="hidden" id="hdnBoleto" value="1" />
        <input type="hidden" id="hdnDemonstrativo" value="1" />
        <input type="hidden" id="hdnEmprestimo" value="1" />
        <input type="hidden" id="hdnCampanha" value="1" />
        <input type="hidden" id="hdnImagemPerfil" value="0" />
        <input type="hidden" id="hdnEnt" value="<%=IdEntidade %>" />
        <input type="hidden" id="hdnPlano" value="<%=IdPlano %>" />
        <input type="hidden" id="hdnEscondeSaldo" value="<%=EscondeSaldo %>" />
        <input type="hidden" id="hdnEleicao" value="" />
        <input type="hidden" id="hdnSuspenderEmprestimo" value="false"/>
        <input type="hidden" id="hdnEmbraerChatDisplays" value="<%=EmbraerChatDisplays%>" />
        <input type="hidden" id="hdnUltraBannerDisplays" value="<%=UltraBannerDisplays%>" />
        <input type="hidden" id="hdnUltraSplashDisplays" value="<%=UltraSplashDisplays%>" />

        <link href="css/<%=IdEntidade %>main.min.css" rel="stylesheet">

        <!--splashScreen, é construido pelo modulos.js-->
        <div id="dvSplashScreen" class="col-xs-12 spl-screen"></div>

        <div id="dvInicio" class="col-sm-12" style="z-index: 9999">
            <div class="panel panel-default">
                <div class="panel-heading">
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

                <!--Banner, que é construida pelo modulos.js-->
                <div id="sctBannerUltra"></div>
                
               
                <div class="swiper-wrapper" id="sw">
                    <!--Home-->
                    <div class="row  swiper-slide " id="dvHomeWrapper">
                        <div id="dvHome" class="col-sm-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <span id="spnHomeTitulo"></span>
                                </div>
                                <div id="dvHomeContent" class="panel-body">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!--Cadastro-->
                    <div class="row  swiper-slide " id="dvCadastroWrapper">
                        <div id="dvCadastro" class="col-sm-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    Informações Pessoais
                                </div>
                                <div class="panel-body">
                                    <!--Teste Upload Img-->
                                    <style>
                                        .fileinput-button {
                                            position: relative;
                                            overflow: hidden;
                                        }

                                            .fileinput-button input {
                                                position: absolute;
                                                top: 0;
                                                right: 0;
                                                margin: 0;
                                                opacity: 0;
                                                -ms-filter: 'alpha(opacity=0)';
                                                font-size: 200px;
                                                direction: ltr;
                                                cursor: pointer;
                                            }

                                        #dvUploadImg > img {
                                            width: 100px;
                                            height: 100px;
                                            border-radius: 50%;
                                        }

                                        .btn-img-profile {
                                            color: #4d4d4f;
                                            background-color: #fff;
                                            border-color: #fff;
                                        }

                                        .btn-img-profile.active, .btn-img-profile:active, .btn-img-profile:hover {
                                            color: #4d4d4f;
                                            background-color: #fff;
                                            border-color: #fff;
                                        }

                                        .btn-img-profile > span {
                                            color: #4d4d4f;
                                        }

                                        
                                    </style>
                                    <div id="dvUploadImg" class="center" style="display: none">
                                        <img src="img/profile/default.png" data-img="default" />
                                        <br />
                                        <span class="btn btn-img-profile fileinput-button">
                                            <%--<i class="glyphicon glyphicon-plus"></i>--%>
                                            <span>add foto</span>
                                            <input id="fileupload" type="file" accept="image/*">
                                        </span>


                                        <br />
                                        <label id="msgImgProfile" class="alert alert-danger" style="padding: 5px; font-size: 12px; display: none;"></label>

                                    </div>
                                    <!-- fim teste-->
                                    <div id="dvAcessos">
                                    </div>

                                   
                                    <%--<ul class="list-group">
                                        <li class="list-group-item"><strong style="padding-bottom: 5px;">Nome Completo: </strong>
                                            <br />
                                            <p id="lblNome" style="font-size: 13px" />
                                        </li>
                                        <li class="list-group-item"><strong>CPF: </strong>
                                            <span id="lblCpf"></span></li>
                                        <li class="list-group-item"><strong>Plano: </strong>
                                            <span id="lblPlano"></span></li>
                                        <li class="list-group-item"><strong>Patrocinadora: </strong>
                                            <span id="lblPatroci"></span></li>
                                        <li class="list-group-item"><strong>Perfil: </strong>
                                            <span id="lblPerfil"></span></li>
                                        <li class="list-group-item"><strong>Situação: </strong>
                                            <span id="lblSituacao"></span></li>
                                        <li class="list-group-item"><strong>Regime de Tributação: </strong>
                                            <span id="lblRegime"></span></li>
                                        <li class="list-group-item" style="margin-top: 10px"><strong>Data de Admissão: </strong>
                                            <span id="lblDtAdmissao" runat="server" /></li>
                                        <li class="list-group-item"><strong>Data de Adesão: </strong>
                                            <span id="lblDtAdesao"></span></li>
                                        <li class="list-group-item" style="margin-top: 10px">
                                            <div style="float: left; display: block; height: 30px; margin-right: 3px">
                                                <strong>Endereço: </strong>
                                            </div>
                                            <span id="lblEnd"></span></li>
                                        <li class="list-group-item" style="margin-top: 10px"></li>
                                        <li class="list-group-item"><strong>E-mail: </strong>
                                            <span id="lblEmail"></span></li>
                                        <li class="list-group-item"><strong>E-mail Comercial: </strong>
                                            <span id="lblEmailCom"></span></li>
                                        <li class="list-group-item"><strong>Telefone: </strong>
                                            <span id="lblFone"></span></li>
                                        <li class="list-group-item"><strong>Telefone Comercial: </strong>
                                            <span id="lblFoneCom"></span></li>
                                        <li class="list-group-item"><strong>Celular: </strong>
                                            <span id="lblcel"></span></li>
                                    </ul>--%>

                                    <%--<input type="email" id="txtEmailCom" class="hidden" /> <a onclick="editeInfo();" style="text-align:left">editar</a>--%>

                                    <div id="dvCadastroAlert"></div>
                                    <%--<script>
                                        function editeInfo()
                                        {
                                            $('#lblEmailCom').hide();
                                            $('#txtEmailCom').addClass('visible-xs');
                                        }

                                    </script>--%>

                                    <!--Dados Pessoais-->
                                    <div class="panel panel-default">
                                        <div class="panel-heading panel-cadastro"><div class="center">Dados Pessoais</div></div>
                                        <div class="panel-body panel-cadastro-body">
                                            <div class="row"> 
                                                <div class="col-sm-12">
                                                    <table  class="table table-condensed">
                                                        <tr>
                                                            <td class="bt-0" width="40%"><label><strong>Nome Completo:</strong></label></td>
                                                            <td class="bt-0"><span id="lblNome" ></span></td>
                                                        </tr>
                                                        <tr class="bt-0">
                                                            <td class="bt-0" width="40%"><label><strong>CPF:</strong></label></td>
                                                            <td class="bt-0"><span id="lblCpf"></span></td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--Dados do Plano-->
                                    <div class="panel panel-default mt-2">
                                        <div class="panel-heading panel-cadastro"><div class="center">Dados do Plano</div></div>
                                        <div class="panel-body panel-cadastro-body">
                                            <div class="row"> 
                                                <div class="col-sm-12">
                                                    <table class="table table-condensed ">
                                                        <tr>
                                                            <td class="bt-0" width="40%"><label><strong>Plano:</strong></label></td>
                                                            <td class="bt-0"><span id="lblPlano"></span></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="bt-0" width="40%"><label><strong>Data de Adesao:</strong></label></td>
                                                            <td class="bt-0"><span id="lblDtAdesao"></span></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="bt-0" width="40%"><label><strong>Data de Admissão:</strong></label></td>
                                                            <td class="bt-0"><span id="lblDtAdmissao"></span></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="bt-0" width="40%"><label><strong>Regime de Tributação:</strong></label></td>
                                                            <td class="bt-0"><span id="lblRegime"></span></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="bt-0" width="40%"><label><strong>Perfil Investimento:</strong></label></td>
                                                            <td class="bt-0"><span id="lblPerfil"></span></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="bt-0" width="40%"><label><strong>Patrocinadora:</strong></label></td>
                                                            <td class="bt-0"><span id="lblPatroci"></span></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="bt-0" width="40%"><label><strong>Situação:</strong></label></td>
                                                            <td class="bt-0"><span id="lblSituacao"></span></td>
                                                        </tr>
                                                    </table>                                                   
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--Dados Endereço-->
                                    <div class="panel panel-default mt-2">
                                        <div class="panel-heading panel-cadastro"><div class="center">Endereço</div></div>
                                        <div class="panel-body panel-cadastro-body">
                                            <div class="row"> 
                                                <div class="col-sm-12">
                                                    <div class="">
                                                        <table class="table table-responsive ">
                                                            <tr>
                                                                <td class="bt-0" width="40%"><label><strong>Logradouro:</strong></label></td>
                                                                <td class="bt-0"><span id="lblEnd"></span></td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                     <!--Dados Contato-->
                                    <div class="panel panel-default mt-2">
                                        <div class="panel-heading panel-cadastro"><div class="center">Contato</div></div>
                                        <div class="panel-body panel-cadastro-body">
                                            <div class="row"> 
                                                <div class="col-sm-12">
                                                    <div class="">
                                                        <table class="table table-responsive ">
                                                            <tr>
                                                                <td class="bt-0" width="40%"><label><strong>E-mail:</strong></label></td>
                                                                <td class="bt-0"><span id="lblEmail"></span></td>
                                                            </tr>
                                                            <tr>
                                                                <td class="bt-0"width="40%"><label><strong>E-mail Comercial:</strong></label></td>
                                                                <td class="bt-0"><span id="lblEmailCom"></span></td>
                                                            </tr>
                                                            <tr>
                                                                <td class="bt-0"width="40%"><label><strong>Telefone:</strong></label></td>
                                                                <td class="bt-0"><span id="lblFone"></span></td>
                                                            </tr>
                                                            <tr>
                                                                <td class="bt-0" width="40%"><label><strong>Telefone Comercial:</strong></label></td>
                                                                <td class="bt-0"><span id="lblFoneCom"></span></td>
                                                            </tr>
                                                            <tr>
                                                                <td class="bt-0" width="40%"><label><strong>Celular:</strong></label></td>
                                                                <td class="bt-0"><span id="lblFonecel"></span></td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--end Cadastro-->
                    <!-- Atualicacao Cadastral -->
                    <div class="row  swiper-slide " id="dvAtualizacaoCadastralWrapper">
                        <div id="dvAtualizacaoCadastral" class="col-sm-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    Atualização Cadastral
                                </div>
                                <div class="panel-body ">
                                    <div class="row">
                                        <div class="small-box bg-grey" style="margin-top: 0px;">
                                            <div class="inner">
                                                <h3>Meu Cadastro</h3>

                                                <p>Atualize aqui suas informações pessoais</p>
                                            </div>
                                            <div class="icon">
                                                <i class="glyphicon glyphicon-user" style="font-size: 80px;"></i>
                                            </div>
                                            <a data-toggle="collapse" href="#collapseInfoPessoais" class="small-box-footer">
                                                <i class="glyphicon glyphicon-menu-down"></i>
                                            </a>
                                        </div>
                                        <div id="collapseInfoPessoais" class="collapse padding-collapse border-grey background-light-grey">
                                            <div class="form-group">
                                                <label for="ddlInfoEstadoCivil">Estado Civil</label>
                                                <select name="ddlInfoEstadoCivil" id="ddlInfoEstadoCivil" class="form-control dropdown" style="width: 100%; min-width: 200px;" disabled>
                                                    <option value="01">SOLTEIRO</option>
                                                    <option value="02">CASADO</option>
                                                    <option value="03">VIUVO</option>
                                                    <option value="04">DIVORCIADO</option>
                                                    <option value="05">SEPARADO</option>
                                                    <option value="06">MARITAL</option>
                                                    <option value="07">OUTROS</option>

                                                </select>
                                            </div>

                                            <div class="form-group">
                                                <label for="txtInfoTipoDoc">Tipo de Documento</label>
                                                <select name="txt119" id="txtInfoTipoDoc" class="form-control" style="width: 100%; min-width: 200px;" disabled>
                                                    <option value="01">RG</option>
                                                    <option value="02">RE</option>
                                                    <option value="03">OUTROS</option>

                                                </select>
                                            </div>
                                            <div id="dv96" class="form-group">
                                                <label for="txtInfoDoc">Nº Documento</label>
                                                <input name="txtInfoDoc" type="text" maxlength="20" id="txtInfoDoc" class="form-control" style="width: 150px;" disabled>
                                            </div>
                                            <div class="form-group">
                                                <label for="txtInfoEmissor">Orgão Emissor</label>
                                                <input type="text" class="form-control" maxlength="10" name="txtInfoEmissor" id="txtInfoEmissor" placeholder="" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4" disabled>
                                            </div>
                                            <div class="form-group">
                                                <label for="txtInfoDtEmissao">Data de Emissão</label>
                                                <input type="date" class="form-control" maxlength="10" name="txtInfoDtEmissao" id="txtInfoDtEmissao" placeholder="dd/mm/aaaa" onkeyup="formataData(this, event);" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4" disabled>
                                            </div>
                                            <div class="form-group">
                                                <label for="txtInfoNaturalidade">Naturalidade</label>
                                                <input type="text" class="form-control" maxlength="20" name="txtInfoNaturalidade" id="txtInfoNaturalidade" placeholder="Cidade de Nascimento" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4" disabled>
                                            </div>
                                            <div class="form-group">
                                                <label for="txtInfoNacionalidade">Nacionalidade</label>
                                                <input type="text" class="form-control" maxlength="20" name="txtInfoNacionalidade" id="txtInfoNacionalidade" placeholder="País de Nascimento" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4" disabled>
                                            </div>
                                            <div class="form-group">
                                                <label for="txtInfoNomeMae">Nome da Mãe</label>
                                                <input type="text" class="form-control" maxlength="60" name="txtInfoNomeMae" id="txtInfoNomeMae" placeholder="" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4" disabled>
                                            </div>
                                            <div class="form-group">
                                                <label for="txtInfoNomePai">Nome do Pai</label>
                                                <input type="text" class="form-control" maxlength="60" name="txtInfoNomePai" id="txtInfoNomePai" placeholder="" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4" disabled>
                                            </div>
                                            <%--<div class="form-group">
                                                <input type="button" id="btnInfoPessoais" value="Salvar" class="btn btn-primary" data-btn="info"  style="margin: 15px 0;width: 200px;" />
                                                <a class='btn btn-warning btnHideLoan' style="margin: 15px 0;width: 200px;" ><span class='glyphicon glyphicon-refresh glyphicon-refresh-animate'></span> Aguarde...</a>
                                                <p id="msgReturnInfoPessoais" style="font-size: 12px;color:#fff;"></p>
                                            </div>--%>
                                        </div>
                                    </div>


                                    <div class="row">
                                        <div class="small-box bg-grey">
                                            <div class="inner">
                                                <h3>PPE - Pessoa Politicamente Exposta</h3>

                                                <p>
                                                    Indique aqui se você, familiares ou outras pessoas de seu relacionamento próximo desempenham ou desempenharam algum cargo ou emprego ou função pública relevante
                                                </p>
                                            </div>
                                            <div class="icon">
                                                <span style="font-size: 80px">PPE </span>
                                            </div>
                                            <a data-toggle="collapse" href="#collapsePPE" class="small-box-footer">
                                                <i class="glyphicon glyphicon-menu-down"></i>
                                            </a>
                                        </div>
                                        <div id="collapsePPE" class="collapse padding-collapse border-grey background-light-grey">
                                            <div class="form-group">
                                                <select name="ddlInfoPPE" id="ddlInfoPPE" class="form-control dropdown" style="width: 190px;">
                                                    <option value="S">Sim</option>
                                                    <option value="N">Não</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="txtInfoPPEDtExposicao">Data da Exposição</label>
                                                <input type="date" class="form-control" maxlength="10" name="txtInfoPPEDtExposicao" id="txtInfoPPEDtExposicao" placeholder="dd/mm/aaaa" onkeyup="formataData(this, event);" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4">
                                            </div>
                                            <div class="form-group">
                                                <label for="txtInfoPPECargo">Cargo ou Profissão (Politicamente exposto)</label>
                                                <input type="text" class="form-control" maxlength="60" name="txtInfoPPECargo" id="txtInfoPPECargo" placeholder="Cargo ou Profissão" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4">
                                            </div>
                                            <%--<div class="form-group">
                                                <input type="button" id="btnInfoPPE" value="Salvar" class="btn btn-primary" data-btn="info"  style="margin: 15px 0;width: 200px;" />
                                                <a class='btn btn-warning btnHideLoan' style="margin: 15px 0;width: 200px;" ><span class='glyphicon glyphicon-refresh glyphicon-refresh-animate'></span> Aguarde...</a>
                                                <p id="msgReturnInfoPPE" style="font-size: 12px;"></p>
                                            </div>--%>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="small-box bg-grey">
                                            <div class="inner">
                                                <h3>Endereço</h3>

                                                <p>Atualize aqui seu endereço</p>
                                            </div>
                                            <div class="icon">
                                                <i class="glyphicon glyphicon-home" style="font-size: 80px;"></i>
                                            </div>
                                            <a data-toggle="collapse" href="#collapseEndereco" class="small-box-footer">
                                                <i class="glyphicon glyphicon-menu-down"></i>
                                            </a>
                                        </div>
                                        <div id="collapseEndereco" class="collapse padding-collapse border-grey background-light-grey">
                                            <div class="form-group">
                                                <label for="ddlInfoPais">País</label>
                                                <select name="ddlInfoPais" id="ddlInfoPais" class="form-control" style="width: 100%; min-width: 200px;">
                                                    <option value="BRASIL">BRASIL</option>
                                                    <option value="OUTRO">OUTRO</option>
                                                </select>
                                                <input type="text" class="form-control" maxlength="100" name="txtInfoPais" id="txtInfoPais" placeholder="Digite o país" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4; display: none">
                                            </div>
                                            <div class="form-group">
                                                <label for="txtInfoLogradouro">Logradouro</label>
                                                <input type="text" class="form-control" maxlength="100" name="txtInfoLogradouro" id="txtInfoLogradouro" placeholder="" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4">
                                            </div>
                                            <div class="form-group">
                                                <label for="txtInfoNumero">Número</label>
                                                <input type="text" class="form-control" maxlength="5" name="txtInfoNumero" id="txtInfoNumero" placeholder="" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4">
                                            </div>
                                            <div class="form-group">
                                                <label for="txtInfoBairro">Bairro</label>
                                                <input type="text" class="form-control" maxlength="50" name="txtInfoBairro" id="txtInfoBairro" placeholder="" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4">
                                            </div>
                                            <div class="form-group">
                                                <label for="txtInfoCidade">Cidade</label>
                                                <input type="text" class="form-control" maxlength="50" name="txtInfoCidade" id="txtInfoCidade" placeholder="" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4">
                                            </div>
                                            <div class="form-group">
                                                <label for="ddlInfoEstado">Estado</label>
                                                <select name="ddlInfoEstado" id="ddlInfoEstado" class="form-control dropdown" style="width: 90px;">
                                                    <option value="AC">AC</option>
                                                    <option value="AL">AL</option>
                                                    <option value="AM">AM</option>
                                                    <option value="AP">AP</option>
                                                    <option value="BA">BA</option>
                                                    <option value="CE">CE</option>
                                                    <option value="DF">DF</option>
                                                    <option value="ES">ES</option>
                                                    <option value="GO">GO</option>
                                                    <option value="MA">MA</option>
                                                    <option value="MG">MG</option>
                                                    <option value="MS">MS</option>
                                                    <option value="MT">MT</option>
                                                    <option value="PA">PA</option>
                                                    <option value="PB">PB</option>
                                                    <option value="PE">PE</option>
                                                    <option value="PI">PI</option>
                                                    <option value="PR">PR</option>
                                                    <option value="RJ">RJ</option>
                                                    <option value="RN">RN</option>
                                                    <option value="RO">RO</option>
                                                    <option value="RR">RR</option>
                                                    <option value="RS">RS</option>
                                                    <option value="SC">SC</option>
                                                    <option value="SE">SE</option>
                                                    <option value="SP">SP</option>
                                                    <option value="TO">TO</option>

                                                </select>
                                                <input type="text" class="form-control" maxlength="100" name="txtInfoEstado" id="txtInfoEstado" placeholder="Digite a sigla do estado" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4; display: none">
                                            </div>
                                            <div class="form-group">
                                                <label for="txtInfoCep">CEP</label>
                                                <input type="text" class="form-control" name="txtInfoCep" id="txtInfoCep" maxlength="9" onkeyup="formataCEP(this, event);" onkeypress="return isNumber(event);" placeholder="_____-___" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4">
                                            </div>
                                            <%--<div class="form-group">
                                                <input type="button" id="btnInfoEndereco" value="Salvar" class="btn btn-primary" data-btn="info"  style="margin: 15px 0;width: 200px;" />
                                                <a class='btn btn-warning btnHideLoan' style="margin: 15px 0;width: 200px;" ><span class='glyphicon glyphicon-refresh glyphicon-refresh-animate'></span> Aguarde...</a>
                                                <p id="msgReturnInfoEndereco" style="font-size: 12px;"></p>
                                            </div>--%>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="small-box bg-grey">
                                            <div class="inner">
                                                <h3>Contatos</h3>

                                                <p>Atualize aqui seus contatos de e-mails e telefones</p>
                                            </div>
                                            <div class="icon">
                                                <i class="glyphicon glyphicon-phone-alt" style="font-size: 80px;"></i>
                                            </div>
                                            <a data-toggle="collapse" href="#collapseContato" class="small-box-footer">
                                                <i class="glyphicon glyphicon-menu-down"></i>
                                            </a>
                                        </div>
                                        <div id="collapseContato" class="collapse padding-collapse border-grey background-light-grey">
                                            <div class="form-group">
                                                <label for="txtInfoTelRes">Telefone Residencial</label>
                                                <input type="text" class="form-control" name="txtInfoTelRes" id="txtInfoTelRes" maxlength="20" onkeyup="formataTelefone(this, event);" onkeypress="return isNumber(event);" placeholder="(__) ____-____" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4">
                                            </div>
                                            <div class="form-group">
                                                <label for="txtInfoTelCom">Telefone Comercial</label>
                                                <input type="text" class="form-control" name="txtInfoTelCom" id="txtInfoTelCom" maxlength="20" onkeyup="formataTelefone(this, event);" onkeypress="return isNumber(event);" placeholder="(__) ____-____" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4">
                                            </div>
                                            <div class="form-group">
                                                <label for="txtInfoTelCel">Telefone Celular</label>
                                                <input type="text" maxlength="20" id="txtInfoTelCel" name="txtInfoTelCel" class="form-control" onkeypress="return isNumber(event);" placeholder="(__) _____-____" pattern="\([0-9]{2}\)[\s][0-9]{4}-[0-9]{4,5}" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4">
                                            </div>
                                            <div class="form-group">
                                                <label for="txtInfoEmail">E-mail Pessoal</label>
                                                <input type="email" class="form-control" name="txtInfoEmail" id="txtInfoEmail" placeholder="nome@dominio.com.br" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4">
                                            </div>
                                            <div class="form-group">
                                                <label for="txtInfoEmailCom">E-mail Comercial</label>
                                                <input type="email" class="form-control" name="txtInfoEmailCom" id="txtInfoEmailCom" placeholder="nome@dominio.com.br" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4">
                                            </div>
                                            <%--<div class="form-group">
                                                <input type="button" id="btnInfoContato" value="Salvar" class="btn btn-primary" data-btn="info" style="margin: 15px 0;width: 200px;" />
                                                <a class='btn btn-warning btnHideLoan' style="margin: 15px 0;width: 200px;" ><span class='glyphicon glyphicon-refresh glyphicon-refresh-animate'></span> Aguarde...</a>
                                                <p id="msgReturnInfoContato" style="font-size: 12px;"></p>
                                            </div>--%>
                                        </div>

                                    </div>
                                    <div class="row center">
                                        <div class="form-group">
                                            <input type="button" id="btnInfoCadastral" value="Salvar" class="btn btn-primary" data-btn="info" style="margin: 15px 0; width: 200px;" />
                                            <a class='btn btn-warning btnHideLoan' style="margin: 15px 0; width: 200px;"><span class='glyphicon glyphicon-refresh glyphicon-refresh-animate'></span>Aguarde...</a>
                                        </div>
                                        <div class="alert alert-info" style="display: none; word-break: break-word;" role="alert">
                                            <p id="msgReturnInfoCadastral" style="font-size: 14px; color: #fff"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--end Atualizacao Cadastral -->
                    <!-- Campanha -->
                    <div class="row  swiper-slide " id="dvCampanhaWrapper">
                        <div id="dvCampanha" class="col-sm-12">
                            <div class="panel panel-default">
                                <div class="panel-heading" id="title-campanha">
                                    Campanhas
                                </div>
                                <div class="panel-body ">
                                    <div class="row" id="dvCampanhaContrib" style="display: none">
                                        <div class="small-box bg-grey" style="margin-top: 0px;">
                                            <div class="inner">
                                                <h3>Alteração do Percentual de Contribuição</h3>

                                                <%--<p>Atualize seu percentual de contribuição</p>--%>
                                            </div>
                                            <div style="top: -35px;" class="icon">
                                                <span style="font-size: 40px"><b>%</b></span>
                                            </div>
                                            <a data-toggle="collapse" href="#collapsePercContrib" class="small-box-footer">
                                                <i class="glyphicon glyphicon-menu-down"></i>
                                            </a>
                                        </div>
                                        <div id="collapsePercContrib" class="collapse padding-collapse border-grey background-light-grey">
                                            <div class="form-group" id="dvPercContribInfo" style="display: none">
                                            </div>
                                            <div class="form-group">
                                                <label for="ddlPerc1202">Contribuição Básica de Participante</label>
                                                <select name="ddlPerc1202" id="ddlPerc1202" class="form-control" style="width: 100%; min-width: 200px;">
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="ddlPerc1204">Contribuição Adicional de Participante</label>
                                                <select name="ddlPerc1204" id="ddlPerc1204" class="form-control" style="width: 100%; min-width: 200px;">
                                                </select>
                                            </div>
                                            <div class="form-group" id="dvPercContribSimulador" style="display: none">
                                            </div>
                                            <center>
                                                <div class="form-group">
                                                    <input type="button" id="btnPercContrib" value="Salvar" class="btn btn-primary" data-btn="campanha" style="margin: 15px 0; width: 200px;" />
                                                    <a class='btn btn-warning btnHideContrib' style="margin: 15px 0; width: 200px;"><span class='glyphicon glyphicon-refresh glyphicon-refresh-animate'></span>Aguarde...</a>
                                                </div>
                                            </center>
                                            <div class="alert alert-info" style="display: none; word-break: break-word;" role="alert">
                                                <p id="msgReturnPercContrib" style="font-size: 14px; color: #fff"></p>
                                            </div>
                                        </div>
                                    </div>

                                    <hr />

                                    <div class="row" id="dvCampanhaPerfil" style="display: none">
                                        <div class="small-box bg-grey">
                                            <div class="inner">
                                                <h3>Alteração do Perfil de Investimento</h3>

                                                <%--<p>Atualize seu perfil de investimento</p>--%>
                                            </div>
                                            <div style="top: -35px;" class="icon">
                                                <i class="glyphicon glyphicon-menu-hamburger" style="font-size: 40px;"></i>
                                            </div>
                                            <a data-toggle="collapse" href="#collapsePerfil" class="small-box-footer">
                                                <i class="glyphicon glyphicon-menu-down"></i>
                                            </a>
                                        </div>
                                        <div id="collapsePerfil" class="collapse padding-collapse border-grey background-light-grey">
                                            <div class="form-group">

                                                <label for="txtPerc1202">Escolha seu Perfil:</label>
                                                <select name="ddlPerfil" id="ddlPerfil" class="form-control dropdown" style="width: 100%; min-width: 200px;">
                                                    <%--<option value="SC">SUPER CONSERVADOR</option>
                                                    <option value="CO">CONSERVADOR</option>
                                                    <option value="MO">MODERADO</option>
                                                    <option value="AG">AGRESSIVO</option>--%>
                                                </select>
                                            </div>
                                            <div class="form-group" id="campanhaPerfilInfo" style="display: none">
                                            </div>
                                            <center>
                                                <div class="form-group">
                                                    <input type="button" id="btnPerfil" value="Salvar" class="btn btn-primary" data-btn="campanha" style="margin: 15px 0; width: 200px;" />
                                                    <a class='btn btn-warning btnHidePerfil' style="margin: 15px 0; width: 200px;"><span class='glyphicon glyphicon-refresh glyphicon-refresh-animate'></span>Aguarde...</a>
                                                </div>
                                            </center>
                                            <div class="alert alert-info" style="display: none; word-break: break-word;" role="alert">
                                                <p id="msgReturnPerfil" style="font-size: 14px; color: #fff"></p>
                                            </div>

                                        </div>
                                    </div>

                                    <%--<div class="row center" >
                                        <div class="form-group">
                                            <input type="button" id="btnInfoCadastral" value="Salvar" class="btn btn-primary" data-btn="info" style="margin: 15px 0;width: 200px;" />
                                            <a class='btn btn-warning btnHideLoan' style="margin: 15px 0;width: 200px;" ><span class='glyphicon glyphicon-refresh glyphicon-refresh-animate'></span> Aguarde...</a>
                                        </div> 
                                        <div class="alert alert-info" style="display:none" role="alert">
                                            <p id="msgReturnInfoCadastral" style="font-size: 14px;color:#fff"></p>
                                        </div>
                                    </div>--%>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--fim Campanha-->
                    <!--Saldo-->
                    <div class="row  swiper-slide" id="dvSaldoWrapper">
                        <div id="dvSaldo" class="col-sm-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    Saldo do Meu Plano
                                </div>
                                <div class="panel-heading panel-saldo">
                                    <strong>
                                        <span id="lblDtBaseSaldo" class="center"></span></strong>
                                </div>
                                <div class="panel-body" style="padding: 25px 0px 0px 0px">
                                    <div class="table-responsive" style="font-size: 10px;">
                                        <div>
                                            <table class="table table-bordered" cellspacing="0" rules="all" border="1" id="grdSaldo" style="border-collapse: collapse;">
                                                <tbody>
                                                    <tr>
                                                        <th scope="col" style="font-size: 14px; min-width: 37%;">Conta</th>
                                                        <th scope="col" style="font-size: 14px;" data-hide="on">Perfil</th>
                                                        <th scope="col" style="font-size: 14px; width: 25%;">R$</th>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="content" id="dvTotalSaldo">
                                        <div class="content" id="dvContent">
                                            <div class="detail">
                                                <h6>Total Participante
                                                </h6>
                                                <p id="lblSaldoPartic"><strong></strong></p>
                                            </div>
                                            <div class="detail">
                                                <h6>Total Patrocinadora
                                                </h6>
                                                <p id="lblSaldoPatroc"><strong></strong></p>
                                            </div>
                                            <div class="detail">
                                                <h6>Total Geral
                                                </h6>
                                                <p id="lblSaldoTotal"><strong></strong></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--end Saldo -->
                    <!--Extrato -->
                    <div class="row  swiper-slide" id="dvExtratoWrapper">
                        <div id="dvExtrato" class="col-sm-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <strong>Extrato de Contribuições </strong>
                                    <br />
                                    <small>(Últimos 12 meses)</small>
                                </div>
                                <div class="panel-body">
                                    <div class="table-responsive" style="font-size: 9px;">
                                        <div>
                                            <table class="table table-bordered" cellspacing="0" rules="all" border="1" id="grdExtrato" style="border-collapse: collapse;">
                                                <tbody>
                                                    <tr>
                                                        <th scope="col" style="font-size: 14px;">Data</th>
                                                        <th scope="col" style="font-size: 14px;">Conta</th>
                                                        <th scope="col" style="font-size: 14px;" data-hide="on">Perfil</th>
                                                        <th scope="col" style="font-size: 14px; width: 25%;">R$</th>
                                                    </tr>
                                                    <tr>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end Extrato -->
                    <!--Demonstrativo Pagamento-->
                    <div class="row  swiper-slide" id="dvDemonstrativoWrapper">
                        <div id="dvDemonstrativo" class="col-sm-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    Demonstrativo de Pagamento de Benefícios
                                </div>
                                <div class="panel-body" style="padding: 0px 0px 0px 0px">
                                    <div style="font-size: 10px;">
                                        <div id="accordionDemo" class="panel-group" style="margin: 0;">
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <!--end Demonstrativo Pagamento -->
                    <!--Rentabilidade-->
                    <div class="row  swiper-slide" id="dvRentabilidadeWrapper">
                        <div id="dvRentabilidade" class="col-sm-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    Rentabilidade por Perfil de Investimento
                                </div>
                                <div class="panel-body pRentab">
                                </div>
                            </div>
                            <div style="clear: both;"><hr class="hrRentab"></div>
                            <div id="dvdetalhe12">
                                        <p style="margin: 10px; font-size: 15px; margin-top: 5px; text-align: center">
                                            <b>Rentabilidade Mensal nos Últimos 12 Meses</b>
                                        </p>
                            </div>
                            <div class="panel panel-default panel-info-bco">
                                <div class="panel-body panel-info-bco" style="padding-top: 15px">
<%--                                    <div id="dvdetalhe12">
                                        <p style="margin: 10px; font-size: 15px; margin-top: 5px; text-align: center">
                                            <b>Rentabilidade nos Últimos 12 Meses</b>
                                        </p>
                                    </div>--%>
                                    <div class="table-responsive" style="font-size: 10px;">
                                        <div>
                                            <table class="table table-bordered" cellspacing="0" rules="all" border="1" id="grdRentab" style="border-collapse: collapse;">
                                                <tbody>
                                                    <tr>
                                                        <th scope="col" style="font-size: 14px; min-width: 35%;">Data</th>
                                                        <th scope="col" style="font-size: 14px;" data-hide="on">Perfil</th>
                                                        <th scope="col" style="font-size: 14px; width: 25%;">%</th>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end Rentabilidade-->
                    <!--Simulador De Empréstimo-->
                    <div class="row  swiper-slide" id="dvEmprestimoWrapper">
                        <div id="dvEmprestimo" class="col-sm-12">
                            <div class="panel panel-default" style="box-shadow: none;">
                                <div class="panel-heading">
                                    <strong>Simulador de Empréstimo</strong>
                                </div>
                                <div class="panel-body" style="background: #fff; padding: 0">
                                    <div class="row">
                                        <!--<div class="col-xs-12" style="margin:0px;padding:0px;overflow:hidden;" >-->
                                        <div class="panel-body" style="padding: 25px 0px 0px 0px">

                                            <div id="dvEmprestimoError" class="aviso" style="display: none">
                                            </div>
                                            <div id="dvEtapaIEmprestimo">
                                            </div>

                                            <div id="dvEtapaIIEmprestimo">
                                            </div>
                                            <div id="dvEtapaIIIEmprestimo">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <!--end Simulador De Empréstimo-->
                    <!--Boleto-->
                    <div class="row  swiper-slide" id="dvBoletoWrapper">
                        <div id="dvBoleto" class="col-sm-12">
                            <div class="panel panel-default" style="box-shadow: none;">
                                <div class="panel-heading">
                                    <strong>Boleto</strong>
                                </div>
                                <div id="accordionBoleto" class="panel-group">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--end Boleto-->
                    <!--Simulador De Beneficios-->
                    <div class="row  swiper-slide" id="dvSimuladorWrapper">
                        <div id="dvSimulador" class="col-sm-12">
                            <div class="panel panel-default" style="box-shadow: none;">
                                <div class="panel-heading">
                                    <strong>Simulador de Benefício de Aposentadoria</strong>
                                </div>
                                <div class="panel-body" style="background: #fff; padding: 8px 5px 0px;">
                                    <div class="row">
                                        <div class="col-xs-12" style="margin: 0px; padding: 0px; overflow: hidden;">
                                            <uc1:wcSimuladorBeneficio ID="ucSimulador" runat="server" />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--end Simulador De Beneficios-->
                    <!--Fale Conosco-->
                    <div class="row  swiper-slide" id="dvFaleConoscoWrapper">
                        <div id="dvFaleConosco" class="col-sm-12">
                            <div class="panel panel-default" style="box-shadow: none;">
                                <div class="panel-heading">
                                    <strong>Fale Conosco</strong>
                                </div>
                                <div class="panel-body" style="background: #fff;">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <span id="spError"></span>
                                            <div class="form-group">
                                                <label for="txtFlEmail">E-mail</label>
                                                <input type="email" class="form-control" id="txtFlEmail" placeholder="Informe seu e-mail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4" maxlength="40" required>
                                            </div>
                                            <div class="form-group">
                                                <label for="txtFlTel">Telefone de Contato</label>
                                                <input type="text" class="form-control" name="txtFlTel" id="txtFlTel" placeholder="Ex: xx xxxxx-xxxx" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4" maxlength="20">
                                            </div>
                                            <div class="form-group" id="flAssunto" style="display: none">
                                                <label for="txtFlTel">Assunto</label>
                                                <select id="ddlAssunto" class="form-control" style="width: 100%; min-width: 200px; border: solid 1px #c4c4c4">
                                                    <option value="Assunto" disabled selected>Assunto</option>
                                                    <option value="Dúvidas">Dúvidas</option>
                                                    <option value="Sugestões ou Reclamações">Sugestões ou Reclamações</option>
                                                    <option value="Senha">Senha</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="txtFlMsg">Mensagem</label>
                                                <textarea onkeyup="limite_textarea(this.value)" class="form-control" rows="4" cols="50" maxlength="300" name="txtFlMsg" id="txtFlMsg" style="width: 100%; height: 111px; min-width: 100%; border: solid 1px #c4c4c4"></textarea>
                                                <p>Restam: <span id="cont">300</span> caracteres</p>

                                                <input type="button" id="btnFaleConosco" value="Enviar" class="btn btn-primary" style="margin: 0px 260px;">
                                                <a class='btn btn-warning btnHideFaleConosco' style="margin: 15px 0; width: 200px; display: none"><span class='glyphicon glyphicon-refresh glyphicon-refresh-animate'></span>Aguarde...</a>
                                                <p id="msgReturn" style="font-size: 12px"></p>
                                                <span></span>
                                            </div>
                                        </div>
                                        <div class="row" id="dvwhatsApp" runat="server">
                                            <strong>Ou entre em contato pelo WhatsApp</strong>                                        
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="whats">  <img src="img/whats.png" data-img="default" />5546-6635</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row" id="dvFaleConoscoAlert"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end Fale Conosco-->

                </div>
            </div>
        </div>


         <!--ChatBot, sua estrutura é construida pelo chatbot.js -->
        <div id="dvChatBot" runat="server"></div> 


        <div id="modalBack" class="modalbackground"></div>
        <div id="wait">

            <div class="container">
                <button class="btn btn-lg btn-warning btn-center"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>Carregando...</button>

            </div>


        </div>

        <!-- Modal -->
        <div class="modal fade" id="modalSuspensaoEmprestimo" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">                       
                        <h4 class="modal-title">Suspenção de Parceria</h4>
                    </div>
                    <div class="modal-body">
                        <p>Você deseja a suspenção das cobranças das parcelas de maio e junho de 2020 do seu contrato de empréstimo</p>
                        <input type="radio" id="suspencaoEmprestimoSim" name="opcaoSuspencaoEmprestimo" value="true"><strong>SIM </strong> desejo e autorizo a suspenção<br/>
                        <input type="radio" id="suspencaoEmprestimoNao" name="opcaoSuspencaoEmprestimo" value="false" checked="checked"><strong>NÃO </strong> desejo e não autorizo a suspenção
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onclick="salvarOpcaoSuspensaoEmprestimo()" data-dismiss="modal">Confirmar</button>
                    </div>
                </div>
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

   
    <%-- <script src="https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/js/ext_libs/jquery-1.10.2.min.js"></script> --%>
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

    <script src="js/home.js"></script>
    <script src="js/cadastro.js"></script>
    <script src="js/faleconosco.js"></script>
    <script src="js/saldo.js"></script>
    <script src="js/extrato.js"></script>
    <script src="js/rentabilidade.js"></script>
    <script src="js/demonstrativo.js"></script>
    <script src="js/boleto.js"></script>
    <script src="js/campanha.js"></script>
    <script src="js/emprestimo.js"></script>
    <script src="js/profile.js"></script>

    <script src="js/common.js"></script>
    <script src="js/modulos.js"></script>
    <script src="js/chatbot.js"></script>

    <script src="js/index.js"></script>
    <script src="js/mask.js"></script>
    <script src="js/waitMe.js" type="text/javascript"> </script>
    <script src="js/notify.min.js"></script>

    <%--<script src="js/jquery.fileupload.js"></script>--%>

</body>
</html>
