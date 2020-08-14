<%@ Control Language="C#" AutoEventWireup="true" CodeFile="wcSimuladorBeneficio.ascx.cs" Inherits="control_wcSimuladorBeneficio" %>

      <link href="https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/res/css/jquery-ui-1.10.4.custom.min.css" rel="stylesheet">   
      <link href="https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/res/css/mobile/main.simulador.mobile.css" rel="stylesheet">
      <!--<link href="../css/main.simulador.mobile.css" rel="stylesheet" />     -->
      
    <title>Simulador de Beneficios Mobile</title>
     
       
    <div class="col-xs-12 col-sm-12 col-md-12" id="simulate-content">
      <div class="row" id="secPermission">
        <div class="col-xs-0 col-sm-0 col-md-0"></div>
        <div class="col-xs-12 col-sm-12 col-md-12">
	      <span class="hide" id="secPermission_acessoNegado">
       	     <h2 style="text-align: center; margin-bottom: 20px; margin-top: 0px;">Carregando <img src="https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/res/img/carregamento.gif" alt="loading"></h2>
          </span>
          <span id="secPermission_acessoNegado_m">       	     
          </span>
        </div>
        <div class="col-xs-0 col-sm-0 col-md-0"></div>
      </div> 
      <div class="row hide" id="secMsg">
            <div class="col-xs-0 col-sm-0 col-md-0"></div>
            <div class="col-xs-12 col-sm-12 col-md-12" align="center">          
                <div class="panel panel-bg panel-default panel-default-bg">
                <div class="panel-body panel-body-bg" id="secMsgPanelBody">
                    <span class="hide" id="secMsg_msg1"></span>
                    <span id="secMsg_msg2"></span>
                    <p align="right"><span id="secMsg_dtSaldoFoot"></span><span id="dtSaldoFoot"></span></p>
                    <p align="right"><span id="secMsg_dtNowFoot"></span><span id="dtNowFoot"></span></p>            
                </div>                          
                </div> 
                <div class="row step" id="stepOne">            
                    <div id="stepOne-btn-down-div" class="col-xs-12 col-sm-12 col-md-12">                    
                        <a id="stepOne-btn-down" type="button" class="btn btn-default btn-step col-xs-12 col-sm-12 col-md-12" role="button">
                        <span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span>
                        </a>
                    </div>                      
                 </div>        
            </div>        
            <div class="col-xs-0 col-sm-0 col-md-0"></div>         
      </div>
      <div class="row hide" id="secInfo">
        <div class="col-xs-0 col-sm-0 col-md-0"></div>
        <div class="col-xs-12 col-sm-12 col-md-12">
          <div class="panel panel-bg panel-primary">
            <div class="panel-heading panel-heading-bg"><h4><span id="secInfo_iPessoais"></span></h4></div>
            <div class="panel-body panel-body-bg">
              <div class="row">
                <div class="col-xs-0 col-sm-1 col-md-1"></div>
                <div class="col-xs-12 col-sm-10 col-md-10" align="left">
                  <form class="form-horizontal">
                    <div class="form-group" id="grpName" align="left">
                      <label for="name" class="col-xs-12 col-sm-3 col-md-3 control-label"><span id="secInfo_name"></span></label>
                      <div class="col-xs-12 col-sm-9 col-md-9"><input type="text" class="form-control" id="name" style="color:#000000;" readonly></div>
                    </div>
                    <div class="form-group" id="grpCPF">
                      <label for="cpf" class="col-xs-12 col-sm-3 col-md-3 control-label"><span id="secInfo_cpf"></span></label>
                      <div class="col-xs-12 col-sm-9 col-md-9"><input type="text" class="form-control" id="cpf" style="border:0; color:#000000;" readonly></div>
                    </div>
                    <div class="form-group" id="grpBirth">
                      <label for="birth" class="col-xs-12 col-sm-3 col-md-3 control-label"><span id="secInfo_birth"></span></label>
                      <div class="col-xs-12 col-sm-9 col-md-9"><input type="text" class="form-control" id="birth" style="border:0; color:#000000;" readonly></div>
                    </div>
                    <div class="form-group" id="grpAdmission">
                      <label for="dtadmission" class="col-xs-12 col-sm-3 col-md-3 control-label"><span id="secInfo_dtAdmission"></span></label>
                      <div class="col-xs-12 col-sm-9 col-md-9"><input type="text" class="form-control" id="dtadmission" style="border:0; color:#000000;" readonly></div>
                    </div>
                    <div class="form-group" id="grpAccess">
                      <label for="dtaccess" class="col-xs-12 col-sm-3 col-md-3 control-label"><span id="secInfo_dtAccess"></span></label>
                      <div class="col-xs-12 col-sm-9 col-md-9"><input type="text" class="form-control" id="dtaccess" style="border:0; color:#000000;" readonly></div>
                    </div>
                    <div class="form-group" id="grpTermination">
                      <label for="dttermination" class="col-xs-12 col-sm-3 col-md-3 control-label"><span id="secInfo_dtTermination"></span></label>
                      <div class="col-xs-12 col-sm-9 col-md-9"><input type="text" class="form-control" id="dttermination" style="border:0; color:#000000;" readonly></div>
                    </div>
                    <div class="form-group" id="grpStatus">
                      <label for="fldstatus" class="col-xs-12 col-sm-3 col-md-3 control-label"><span id="secInfo_fldStatus"></span></label>
                      <div class="col-xs-12 col-sm-9 col-md-9"><input type="text" class="form-control" id="fldstatus" style="border:0; color:#000000;" readonly></div>
                    </div>                                        
                  </form>
                </div>
                 <!--<div class="hide">
                  <div class="col-xs-0 col-sm-0 col-md-0">
                    <div class="row row-linha">&nbsp</div>
                    <div class="row row-linha">&nbsp</div>
                    <div class="row row-linha">&nbsp</div>
                    <img src="res/img/info.png" id="imginfo" style="width:180px;height:auto" class="img-circle">
                  </div>
                </div>-->
                <div class="col-xs-0 col-sm-1 col-md-1"></div>  
              </div>  
            </div>
          </div>
        </div>
        <div class="col-xs-0 col-sm-0 col-md-0"></div>
      </div> 
      <div class="row hide" id="secSaldo">        
        <div class="col-xs-0 col-sm-0 col-md-0"></div>
        <div class="col-xs-12 col-sm-12 col-md-12">
         <div class="alert alert-info-bg" id="secSaldo_info"><span id="secSaldo_info_m"></span></div>
          <div class="panel panel-bg panel-default">
    			    <div class="panel-heading panel-heading-bg"><h4><span id="secSaldo_sContas"></span></h4></div>
      				<div class="panel-body panel-body-bg">							
                  <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12" align=left>
                      <label for="taxopt"><span id="secSaldo_taxopt"></span></label>
                      <input type="text" id="taxopt" size="15" style="border:0;" readonly>                    
                    </div>                  
                    <div class="col-xs-12 col-sm-12 col-md-12" align=left>
                      <label for="dtbal"><span id="secSaldo_dtbal"></span></label>
                      <input type="text" id="dtbal" size="10" style="border:0;" readonly>                    
                    </div>
                  </div>      						
                  <div class="row">
          					<div id="secSaldo_divMyBalance" class="col-xs-12 col-sm-4 col-md-4">
          						<div class="panel panel-bg panel-default" style="background-color: #C1DBE8; margin: 8px 0px 8px 0px; padding: 2px 4px 2px 4px; ">
          							<div class="panel panel-body-bg" style="background-color: #C1DBE8;">  
          								<p align="center"><span id="secSaldo_fldMyBalance"></span></p>
          								<p align="center" id="fldMyBalance" style="font-weight:bold;"></p>
          							</div>
          						</div>
          					</div>
                    <div id="secSaldo_divCompanyBalance" class="col-xs-12 col-sm-4 col-md-4">
          						<div class="panel panel-bg panel-default" style="background-color: #C1DBE8; margin: 8px 0px 8px 0px; padding: 2px 4px 2px 4px; ">
          							<div class="panel panel-body-bg" style="background-color: #C1DBE8;">
          								<p align="center"><span id="secSaldo_fldCompanyBalance"></span></p>
          								<p align="center" id="fldCompanyBalance" style="font-weight:bold;"></p>
          							</div>
          						</div>
          					</div>                    
                    <div id="secSaldo_divPortability"  class="col-xs-12 col-sm-4 col-md-4">
          						<div class="panel panel-bg panel-default" style="background-color: #AAE6CD; margin: 8px 0px 8px 0px; padding: 2px 4px 2px 4px; ">
          							<div class="panel panel-body-bg" style="background-color: #AAE6CD;">
          								<p align="center"><span id="secSaldo_fldPortability"></span></p>
          								<p align="center" id="fldPortability" style="font-weight:bold;"></p>
          							</div>
          						</div>
          					</div>									
                  </div>	 
      			</div>	
    	     </div>              
            <div class="row step" id="stepTwo">            
            
            <div id="stepTwo-btn-up-div" class="col-xs-6 col-sm-6 col-md-6" style="padding: 0px 5px;">                    
                <a id="stepTwo-btn-up" type="button" class="btn btn-default btn-step col-xs-12 col-sm-12 col-md-12" role="button">
                <span class="glyphicon glyphicon-menu-up" aria-hidden="true"></span>
                </a>
            </div>
            
             <div id="stepTwo-btn-down-div" class="col-xs-6 col-sm-6 col-md-6" style="padding: 0px 5px;">                    
                <a id="stepTwo-btn-down" type="button" class="btn btn-default btn-step col-xs-12 col-sm-12 col-md-12" role="button">
                <span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span>
                </a>
            </div>
             
          </div>
        </div>
        <div class="col-xs-0 col-sm-0 col-md-0"></div>                
      </div>
      <div class="row hide" id="secContrib">
        <div class="col-xs-0 col-sm-0 col-md-0"></div>
        <div class="col-xs-12 col-sm-12 col-md-12">
          <div class="alert alert-info-bg" id="secContrib_info"><span class="hide" id="secContrib_nomePlan"></span><span id="secContrib_info_m"></span></div>          
          <div class="panel panel-bg panel-default">
      		  <div class="panel-heading panel-heading-bg"><h4><span id="secContrib_cPlan"></span></h4></div>
        		<div class="panel-body panel-body-bg">							
              <div class="row" id="secSalURP">
                <div id="secSalURP_salary" class="col-xs-12 col-sm-12 col-md-12" align=left>
                  <label for="salary"><span id="secContrib_salary"></span></label>
                  <input type="text" id="salary" size="15" style="border:0;" readonly>                    
                </div>                  
                <div id="secSalURP_urp" class="col-xs-12 col-sm-12 col-md-12" align=left>
                  <label for="urp"><span id="secContrib_urp"></span></label>
                  <input type="text" id="urp" size="10" style="border:0;" readonly>                    
                </div>
              </div>              
              <div id="gridContrib"></div>              
            </div>
          </div>
          <div class="row step" id="stepThree">            
            
            <div id="stepThree-btn-up-div" class="col-xs-6 col-sm-6 col-md-6" style="padding: 0px 5px;">                    
                <a id="stepThree-btn-up" type="button" class="btn btn-default btn-step col-xs-12 col-sm-12 col-md-12" role="button">
                <span class="glyphicon glyphicon-menu-up" aria-hidden="true"></span>
                </a>
            </div>
            
             <div id="stepThree-btn-down-div" class="col-xs-6 col-sm-6 col-md-6" style="padding: 0px 5px;">                    
                <a id="stepThree-btn-down" type="button" class="btn btn-default btn-step col-xs-12 col-sm-12 col-md-12" role="button">
                <span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span>
                </a>
            </div>
             
          </div>
        </div>
        <div class="col-xs-0 col-sm-0 col-md-0"></div>
       
      </div>
      <div class="row hide" id="secHipot">
        <div class="col-xs-0 col-sm-0 col-md-0"></div>
        <div class="col-xs-12 col-sm-12 col-md-12">
          <div class="alert alert-info-bg" id="secHipot_info"><span id="secHipot_msg1"></span></div>
          <div class="panel panel-bg panel-default">
      			   <div class="panel-heading panel-heading-bg"><h4><span id="secHipot_simulation"></span></h4></div>
        			 <div class="panel-body panel-body-bg">		
                  <div class="row" id="secHipotBenef">    
                      <div class="col-xs-0 col-sm-1 col-md-1"></div>
                          <div class="col-xs-12 col-sm-10 col-md-10">
                              <span id="secHipotBenef_Select"></span>            
                              <select class="input-sm" id="SelecionaBeneficio" style="width:200px; margin-left:5px;"></select>              
                              <div class="row row-linha">&nbsp;</div>
                          </div>            
                      <div class="col-xs-0 col-sm-1 col-md-1"></div>    
                  </div>
                  <div id="secHipotRendaTemp" class="hide">
                      <div class="row" id="secHipotRtCtrl1">
                          <div class="col-xs-2 col-sm-2 col-md-2"></div>
                          <div class="col-xs-10 col-sm-10 col-md-10">
                              <label for="rtctrl1"><span id="secHipotRendaTemp_ctrl1"></span></label>
                              <input type="number" class="form-control input-sm" id="RtCtrl1" aria-describedby="qtdRtCtrl1Help" placeholder="0" min="0" style="width:96px;">
                          </div>
                          <div class="col-xs-0 col-sm-0 col-md-0"></div>
                      </div>
                      <div class="row row-linha">&nbsp</div>
                      <div class="row ">
                          <div class="col-xs-2 col-sm-2 col-md-2"></div>
                          <div class="col-xs-8 col-sm-8 col-md-8">
                          <div class="panel panel-bg panel-default">
                              <div class="panel-body panel-body-bg">
                              <p align="justify"><span id="secRtCtrl1_msg1"></span></p>
                              </div>
                          </div>
                          </div>
                      </div>
                      <div class="row" id="secHipotRtCtrl2">
                          <div class="col-xs-2 col-sm-2 col-md-2"></div>
                          <div class="col-xs-10 col-sm-10 col-md-10">
                              <label for="rtctrl2"><span id="secHipotRendaTemp_ctrl2"></span></label>
                              <input type="number" class="form-control input-sm" id="RtCtrl2" aria-describedby="qtdRtCtrl2Help" placeholder="0" min="0" style="width:96px;">
                          </div>
                          <div class="col-xs-0 col-sm-0 col-md-0"></div>
                      </div>
                      <div class="row row-linha">&nbsp</div>
                      <div class="row ">
                          <div class="col-xs-2 col-sm-2 col-md-2"></div>
                          <div class="col-xs-8 col-sm-8 col-md-8">
                          <div class="panel panel-bg panel-default">
                              <div class="panel-body panel-body-bg">
                              <p align="justify"><span id="secRtCtrl2_msg1"></span></p>
                              </div>
                          </div>
                          </div>
                      </div>
                  </div>					
                  <div class="row">
                    <div class="col-xs-0 col-sm-1 col-md-1"></div>
                    <div class="col-xs-12 col-sm-10 col-md-10"><span id="secHipot_barra"></span></div>
                    <div class="col-xs-0 col-sm-1 col-md-1"></div>
                  </div>        					
                  <div class="row row-linha">&nbsp</div>
                  <div class="row">
                    <div class="col-xs-0 col-sm-1 col-md-1"></div>
                    <div class="col-xs-12 col-sm-12 col-md-7">
                      <div class="row" id="divSliderIdade">
                        <div class="col-xs-1 col-sm-2 col-md-2"></div>
                        <div class="col-xs-10 col-sm-8 col-md-8" id="sliderIdade"></div>
                        <div class="col-xs-1 col-sm-2 col-md-2"></div>
                      </div>
                      <div class="row row-linha">&nbsp</div>		                            		      
                      <div class="row">
                        <div class="col-xs-2 col-sm-2 col-md-2"></div>
                        <div class="col-xs-10 col-sm-10 col-md-10">
                          <label for="age"><span id="secHipot_age"></span></label>
                          <input type="text" id="age" size="6" style="border:0; color:#3399FF; font-weight:bold;" readonly> 
                          <input type="text" id="dtage" size="26" style="border:0; color:#000000;" readonly>
                        </div>
                        <div class="col-xs-0 col-sm-0 col-md-0"></div>
                      </div>      
                      <div class="row row-linha">&nbsp</div>
		              <div class="row">
			            <div class="col-xs-1 col-sm-2 col-md-2"></div>                       
			            <div class="col-xs-10 col-sm-8 col-md-8" align="center">
			                <div class="alert alert-success" role="alert" id="msgBenefOK2" style="padding: 6px">
		                            <span id="msgBenefOK_text"></span>                      
			                </div>
		                </div>
			            <div class="col-xs-1 col-sm-2 col-md-2"></div>
                      </div>
                      <div id="secMeta">            
                        <div id="secMeta1">
                            <div class="row">
                            <div class="col-xs-2 col-sm-2 col-md-2"></div>
                            <div class="col-xs-10 col-sm-10 col-md-10">
                                <label for="meta"><span id="secHipot_meta"></span></label>
                                <!--<input type="text" id="meta" size="8" style="border:0;" readonly>-->                    
                                <select class="form-control input-sm" id="meta" size="1" style="width:80px;"></select>
                            </div>
                            <div class="col-xs0 col-sm-0 col-md-0"></div>
                            </div>
                            <div class="row row-linha">&nbsp</div>
                        </div>
                        <div id="secMeta2">
                            <div class="row">
                            <div class="col-xs-2 col-sm-2 col-md-2"></div>
                            <div class="col-xs-10 col-sm-10 col-md-10">
                                <label for="meta2"><span id="secHipot_meta2"></span></label>
                                <!--<input type="text" id="meta2" size="8" style="border:0;" readonly>-->
                                <select class="form-control input-sm" id="meta2" size="1" style="width:80px;"></select>
                            </div>
                            <div class="col-xs0 col-sm-0 col-md-0"></div>
                            </div>
                            <div class="row row-linha">&nbsp</div>
                        </div>                      
                        <div class="row">
                            <div class="col-xs-2 col-sm-2 col-md-2"></div>
                            <div class="col-xs-8 col-sm-8 col-md-8">
                            <div class="panel panel-bg panel-default panel-default-bg">
                                <div class="panel-body panel-body-bg">
                                <p align="justify"><span id="secHipot_msg2"></span></p>
                                </div>
                            </div>
                            </div>                      
                        </div> 
                      </div>       
                      <div id="secCrescSal">
                          <div class="row">
                            <div class="col-xs-2 col-sm-2 col-md-2"></div>
                            <div class="col-xs-10 col-sm-10 col-md-10">
                              <label for="salgrow"><span id="secCrescSal_salgrow"></span></label>
                              <!--<input type="text" id="salgrow" size="8" style="border:0;" readonly>-->
                              <select class="form-control input-sm" id="salgrow" size="1" style="width:80px;"></select>
                            </div>
                            <div class="col-xs-0 col-sm-0 col-md-0"></div>
                          </div>      
                      
                          <div class="row row-linha">&nbsp</div>
                          <div class="row">
                            <div class="col-xs-2 col-sm-2 col-md-2"></div>
                            <div class="col-xs-8 col-sm-8 col-md-8">
                              <div class="panel panel-bg panel-default panel-default-bg">
                                <div class="panel-body panel-body-bg">
                                  <p align="justify"><span id="secCrescSal_msg1"></span></p>
                                </div>
                              </div>
                            </div>                      
                          </div>
                      </div>
                      <div id="secTSINSS" class="hide">
                         <div class="row">
                          <div class="col-xs-2 col-sm-2 col-md-2"></div>
                          <div class="col-xs-10 col-sm-10 col-md-10">
                            <label for="tsinss"><span id="secTSINSS_tsinss">Tempo de Contribuição ao INSS (meses):</span></label>
                            <input type="number" class="form-control input-sm" id="tsinss" aria-describedby="qtdTSINSSHelp" placeholder="0" min="0" style="width:96px;">
                          </div>
                          <div class="col-xs-0 col-sm-0 col-md-0"></div>
                        </div> 
                        <div class="row">&nbsp</div>
                        <div class="row ">
                          <div class="col-xs-2 col-sm-2 col-md-2"></div>
                          <div class="col-xs-8 col-sm-8 col-md-8">
                            <div class="panel panel-bg panel-default panel-default-bg">
                              <div class="panel-body panel-body-bg">
                                <p align="justify"><span id="secTSINSS_msg1">Preencher o campo com o número total de meses de contribuição ao INSS, anterior a data de admissão na patrocinadora do plano PPC.</span></p>
                              </div>
                            </div>
                          </div>                      
                        </div>                    
                      </div>
                    </div>
                    <div class="col-xs-12 col-sm-0 col-md-3">
                      <div class="row" id="secHipot_Avatar">  
                        <div class="col-xs-0 col-sm-0 col-md-0"></div>  
                        <div class="hide col-xs-0 col-sm-10 col-md-10">
                          <div class="visible-xs visible-md visible-lg"><img src="https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/res/img/30.png" id="img30" style="width:140px;height:auto" class="img-circle"></div>
                          <div class="visible-xs visible-md visible-lg"><img src="https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/res/img/40.png" id="img40" style="width:140px;height:auto" class="img-circle"></div>
                          <div class="visible-xs visible-md visible-lg"><img src="https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/res/img/54.png" id="img54" style="width:140px;height:auto" class="img-circle"></div>
                          <div class="visible-xs visible-md visible-lg"><img src="https://www.portal-hro.com.br/portal/site/Generico/Simulador_Benef/res/img/75.png" id="img75" style="width:140px;height:auto" class="img-circle"></div>
                        </div>
                        <div class="col-xs-0 col-sm-2 col-md-2"></div>
                      </div>
                    </div>
                    <div class="col-xs-0 col-sm-1 col-md-1"></div>
                  </div>
                  <div class="row row-linha">&nbsp</div>
                  <div class="row">
                    <div class="col-xs-0 col-sm-2 col-md-2"></div>
                    <div class="col-xs-12 col-sm-8 col-md-8" align=center>
                      <a type="button" id="CalcBenef" data-loading-text="Simulando..." data-complete-text="Pronto!" class="btn btn-primary" autocomplete="off">
                        Simular Benefício
                      </a>                   
                    </div>
                    <div class="col-xs-0 col-sm-2 col-md-2"></div>
                  </div>
                  <div class="row row-linha">&nbsp</div>
                  <div class="row">
                    <div class="col-xs-0 col-sm-2 col-md-2"></div>
                    <div class="col-xs-12 col-sm-8 col-md-8" align=center>
                      <div class="alert alert-info-bg" role="alert" id="msgBenefOK">
                         <span id="secMsgBenefOK"></span>                          
                      </div>
                    </div>
                  </div>         			 
               </div>	
      	  </div>
          <div class="row step" id="stepFour">            
                <div id="stepFour-btn-up-div" class="col-xs-12 col-sm-12 col-md-12">                    
                    <a id="stepFour-btn-up" type="button" class="btn btn-default btn-step col-xs-12 col-sm-12 col-md-12" role="button">
                    <span class="glyphicon glyphicon-menu-up" aria-hidden="true"></span>
                    </a>
                </div>                      
           </div>
        </div> 
        <div class="col-xs-0 col-sm-0 col-md-0"></div>
      </div>
      <div class="row hide" id="secSimulation">
        <div class="col-xs-0 col-sm-0 col-md-0"></div>
        <div class="col-xs-12 col-sm-12 col-md-12">
          <div>
               <div>							
                  <div id="secBenefApos">
                   <div id="secBenefPag">
                    <div class="col-xs-0 col-sm-0 col-md-0"></div>
                      <div class="col-xs-12 col-sm-12 col-md-12">
                        <div class="row" id="secRendaTemporaria">
                          <div class="panel panel-bg panel-default">
                              <div class="panel-heading panel-heading-bg"><h4><span id="secBenefApos_Temporaria"></span></h4></div>
                              <div class="panel-body panel-body-bg">                              
                              <div class="col-xs-12 col-sm-12 col-md-12 text-center" id="secTemporario">
                              <div class="alert alert-info-bg"><span id="secTemporario_msg1"></span></div>
                              <div id="secTemporario_info">
                                <div id="secTemporario_info_generico">
                                  <div class="panel panel-bg panel-default">
                                      <div class="panel-body panel-body-bg">
                                      <div class="row">
                                          <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                          <div class="col-xs-12 col-sm-10 col-md-10">
                                              <span id="secTemporario_barra"></span>
                                          </div>
                                          <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                      </div>
                                      <div class="row">&nbsp;</div>
                                      <div class="row" id="secTemporario_divProvento">
                                          <div class="col-xs-0 col-sm-2 col-md-2"></div>
                                          <div class="col-xs-12 col-sm-9 col-md-9 text-left">
                                          <div class="col-xs-0 col-sm-0 col-md-1"></div>
                                          <div class="col-xs-12 col-sm-6 col-md-5 padding-right-none">
                                              <label for="tempprov"><span id="secTemporario_Provento"></span></label>
                                           <!-- </div>
                                            <div class="col-xs-12 col-sm-5 col-md-5">   -->
                                              <input type="text" id="tempprov" class="valReceita" readonly="">
                                          </div>
                                          <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                          </div>
                                          <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                      </div>
                                      <div class="row">
                                          <div class="col-xs-0 col-sm-2 col-md-2"></div>
                                          <div class="col-xs-12 col-sm-9 col-md-9 text-left">
                                          <div class="col-xs-0 col-sm-0 col-md-1"></div>
                                          <div class="col-xs-12 col-sm-6 col-md-5 padding-right-none">
                                              <label for="tempirvalue"><span id="secTemporario_Desconto"></span></label>
                                           <!-- </div>
                                            <div class="col-xs-12 col-sm-5 col-md-5">   -->
                                              <input type="text" id="tempirvalue" class="valDesconto" readonly="">
                                          </div>
                                          <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                          </div>
                                          <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                      </div>
                                      <div class="row">
                                          <div class="col-xs-12 col-sm-12 col-md-12 center hidden-xs">
                                          <hr style="width:55%; margin-top:5px; margin-bottom: 5px; border-top: 2px solid #000;">
                                          </div>
                                      </div>
                                      <div class="row">
                                          <div class="col-xs-0 col-sm-2 col-md-2"></div>
                                          <div class="col-xs-12 col-sm-9 col-md-9 text-left">
                                          <div class="col-xs-0 col-sm-0 col-md-1"></div>
                                          <div class="col-xs-12 col-sm-6 col-md-5 padding-right-none">
                                              <label for="tempvalue"><span id="secTemporario_Liquido"></span></label>
                                           <!-- </div>
                                            <div class="col-xs-12 col-sm-5 col-md-5">   -->
                                              <input type="text" id="tempvalue" class="valLiquido" readonly="">
                                          </div>
                                          <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                          </div>
                                          <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                      </div>
                                      <div class="row hide" id="secTemporario_benefAdicional">
                                          <div class="row">&nbsp</div>
                                          <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                          <div class="col-xs-10 col-sm-10 col-md-10">
                                          <div class="alert alert-success text-justify" id="secTemporario_benefAd"><span id="secTemporario_msg2"></span></div>
                                          <div class="row">
                                              <div class="col-xs-12 col-sm-12 col-md-12 text-left" id="secTemporario_fldMyBenAdicDiv">
                                              <label for="fldMyBenAdic"><span id="secTemporario_fldMyBenAdic"></span></label>
                                              <input type="text" id="fldMyBenAdic" class="valReceita" readonly>
                                              </div>
                                          </div>
                                          <div class="row">&nbsp</div>
                                          </div>
                                          <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                      </div>
                                      </div>
                                     </div>
                                    </div>
                                    <div id="secTemporario_info_flex">
                                    </div>  
                                  </div> <!-- Fim secTemporario_info -->
                                  <div class="panel panel-bg panel-default hide" id="secValidacaoTemporario">
                                    <div class="panel-heading panel-heading-bg">
                                        <a data-toggle="collapse" href="#collapseValidacaoTemp" aria-expanded="false" aria-controls="collapse">
                                            <strong><span id="secBeneTemp_Memoria">Demonstrativo de Cálculo</span></strong> (Expandir)
                                        </a>
                                    </div>
                                    <div id="collapseValidacaoTemp" class="panel-collapse collapse">
                                        <div class="panel-body panel-body-bg">
                                        <span id="secValidacaoTemporario_msg1">
                                        </span></p>
                                        </div>
                                    </div>
                                  </div>
                              </div>
                              <div class="col-xs-0 col-sm-1 col-md-1"></div>
                              </div>
                              </div>
                        </div>
                        <div class="row" id="secRendaVitalicia">
                            <div class="panel panel-bg panel-default">
                             <div class="panel-heading panel-heading-bg"><h4><span id="secBenefApos_Vitalicia"></span></h4></div>
                             <div class="panel-body panel-body-bg">  
                              <div class="col-xs-12 col-sm-12 col-md-12 text-center" id="secVitalicio">  
                                <div class="alert alert-info-bg"><span id="secVitalicio_msg1"></span></div> 
                                <div id="secVitalicio_info"> 
                                  <div id="secVitalicio_info_generico">                            
                                    <div class="panel panel-bg panel-default">
                                        <div class="panel-body panel-body-bg">                           
                                          <div class="row">
                                            <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                            <div class="col-xs-12 col-sm-10 col-md-10">
                                                <span id="secVitalicio_barra"></span>
                                            </div>
                                            <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                          </div>
                                          <div class="row">&nbsp;</div>
                                          <div class="row" id="secVitalicio_divProvento">
                                            <div class="col-xs-0 col-sm-2 col-md-2"></div>
                                            <div class="col-xs-12 col-sm-9 col-md-9 text-left">
                                              <div class="col-xs-0 col-sm-0 col-md-1"></div>
                                              <div class="col-xs-12 col-sm-6 col-md-5 padding-right-none">
                                                <label for="vitalprov"><span id="secVitalicio_Provento"></span></label>
                                            <!--  </div>
                                              <div class="col-xs-12 col-sm-5 col-md-5">  -->
                                                <input type="text" id="vitalprov" class="valReceita" readonly="">
                                              </div>          
                                              <div class="col-xs-0 col-sm-1 col-md-1"></div>           
                                            </div>
                                            <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                          </div>                            
                                          <div class="row">
                                            <div class="col-xs-0 col-sm-2 col-md-2"></div>
                                            <div class="col-xs-12 col-sm-9 col-md-9 text-left">
                                              <div class="col-xs-0 col-sm-0 col-md-1"></div>
                                              <div class="col-xs-12 col-sm-6 col-md-5 padding-right-none">
                                                <label for="vitalirvalue"><span id="secVitalicio_Desconto"></span></label>
                                            <!-- </div>
                                              <div class="col-xs-12 col-sm-5 col-md-5">   -->
                                                <input type="text" id="vitalirvalue" class="valDesconto" readonly="">
                                              </div> 
                                              <div class="col-xs-0 col-sm-1 col-md-1"></div>                    
                                            </div>
                                            <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                          </div>
                                          <div class="row">                                        
                                            <div class="col-xs-12 col-sm-12 col-md-12">
                                              <hr style="width:80%; margin-top:5px; margin-bottom: 5px; border-top: 2px solid #000;" align="left">
                                            </div>                                          
                                          </div>
                                          <div class="row">
                                            <div class="col-xs-0 col-sm-2 col-md-2"></div>
                                            <div class="col-xs-12 col-sm-9 col-md-9 text-left">
                                              <div class="col-xs-0 col-sm-0 col-md-1"></div>
                                              <div class="col-xs-12 col-sm-6 col-md-5 padding-right-none">
                                                <label for="vitalvalue"><span id="secVitalicio_Liquido"></span></label>
                                              <!-- </div>
                                              <div class="col-xs-12 col-sm-5 col-md-5"> -->
                                                <input type="text" id="vitalvalue" class="valLiquido" readonly="">
                                              </div>
                                              <div class="col-xs-0 col-sm-1 col-md-1"></div>                    
                                            </div>
                                            <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                          </div> 
                                          <div class="row" id="secVitalicio_benefAdicional">
                                            <div class="row">&nbsp</div>  
                                            <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                            <div class="col-xs-10 col-sm-10 col-md-10">                                                                                                                    
                                              <div class="alert alert-success text-justify" id="secVitalicio_benefAd"><span id="secVitalicio_msg2"></span></div>
                                              <div class="row">                                        
                                                <div class="col-xs-12 col-sm-12 col-md-12 text-left" id="secVitalicio_fldMyBenAdicDiv">                                          
                                                  <label for="fldMyBenAdic"><span id="secVitalicio_fldMyBenAdic"></span></label>
                                                  <input type="text" id="fldMyBenAdic" class="valReceita" readonly>
                                                </div>
                                              </div>    
                                              <div class="row">&nbsp</div>                                                                                
                                            </div>                                                                              
                                            <div class="col-xs-1 col-sm-1 col-md-1"></div>                                      
                                          </div>                                                                                                                                
                                        </div>                                      
                                      </div>  
                                    </div>  
                                    <div id="secVitalicio_info_flex">
                                    </div>
                                  </div>                                            
                                  <div class="panel panel-bg panel-default panel-default-bg hide" id="secValidacao">
                                    <div class="panel-heading panel-heading-valida">
                                      <a id="secDemonsCalcBtn" data-toggle="collapse" href="#collapseValidacao" aria-expanded="false" aria-controls="collapse">
                                          <strong><span id="secBeneVital_Memoria">Demonstrativo de Cálculo</span></strong> (Expandir)
                                      </a>
                                    </div>
                                    <div id="collapseValidacao" class="panel-collapse collapse">
                                     <div class="panel-body panel-body-bg">
                                       <span id="secValidacao_msg1">
                                       </span></p>
                                     </div>
                                    </div>
                                  </div>                                           
                                </div>                                 
                                <div class="col-xs-0 col-sm-1 col-md-1"></div> 
                               </div>
                              </div>
                            </div>
                         <div class="row" id="secRendaFinanceira">
                           <div class="panel panel-bg panel-default">
                             <div class="panel-heading panel-heading-bg"><h4><span id="secBenefApos_benefApos"></span></h4></div>
                               <div class="panel-body panel-body-bg">
              					    <!--<div class="row">					
                              <div class="col-xs-0 col-sm-3 col-md-3"></div>
                              <div class="col-xs-12 col-sm-6 col-md-6">
          											<div class="panel panel-bg panel-default" style="background-color: #CCFFCC; margin: 8px 0px 8px 0px; padding: 2px 4px 2px 4px; ">
          												<div class="panel-body panel-body-bg">  
          													<p align="center">Meu Saldo de Aposentadoria Futuro</p>
          													<p align="center" id="fldMyBenBal" style="font-weight:bold;"></p>
          												</div>
          											</div>
        										  </div>              
                              <div class="col-xs-0 col-sm-3 col-md-3"></div>
                            </div>
                            <div class="row row-linha">&nbsp</div>-->                  
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12" id="secBenefAnterior">
          						         <div class="panel panel-bg panel-default">
          						            <div class="panel-body panel-body-bg">  
                                      <div class="col-xs-12 col-sm-12 col-md-12">
                                        <label for="UltBenef"><span id="secBenefAnterior_ultBenef"></span></label>
                                        <input type="text" id="UltBenef" class="valReceita" readonly>
                                      </div>
                                      <div class="col-xs-12 col-sm-12 col-md-12">
                                        <label for="RecebAtual"><span id="secBenefAnterior_recebAtual"></span></label>
                                          <input type="text" id="RecebAtual" style=" width:200px; border:0; color:#3399FF; font-weight:bold;" readonly />
          							            </div>
                                  </div>
          					        	</div>
          					         </div>
                            </div>              
                            <div class="col-xs-12 col-sm-12 col-md-12" id="secSaque">
                                <div class="alert alert-info-bg" id="secSaque_msg1_alert"><span id="secSaque_msg1"></span></div>
                                <div class="panel panel-bg panel-default panel-default-bg">
                                  <div class="panel-body panel-body-bg">
                                    <div class="row">
                                      <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                      <div class="col-xs-10 col-sm-10 col-md-10">
                                        <label for="fldMyBenBal"><span id="secSaque_fldMyBenBal"></span></label>
                                        <input type="text" id="fldMyBenBal" class="valReceita" readonly>                    
                                      </div>
                                      <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                    </div>                                  
                                    <div class="row row-linha">&nbsp</div>
                                    <div class="row">
                                      <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                      <div class="col-xs-12 col-sm-10 col-md-10"><span id="secSaque_barra"></span></div>
                                      <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                    </div> 
                                    <div class="row row-linha">&nbsp</div>
                                    <div class="row" id="divSliderSaque">
                                      <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                      <div class="col-xs-10 col-sm-10 col-md-10" id="sliderSaque"></div>
                                      <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                    </div>                            
                                    <div class="row row-linha">&nbsp</div>
                                    <div class="row">
                                      <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                      <!--<div class="col-xs-5 col-sm-5 col-md-10">--> <!-- Old-->
                                      <div class="col-xs-10 col-sm-10 col-md-10"> <!-- Novo-->
                                        <label for="wdwperc"><span id="secSaque_percSaque"></span></label>
                                        <input type="text" id="wdwperc" style="/*width: 80%;*/" class="valLiquido" readonly>                    
                                      </div>
                                      <div class="col-xs-1 col-sm-1 col-md-1"></div> <!-- Novo-->
                                    </div> <!-- Novo-->
                                    <div class="row"> <!-- Novo-->
                                      <div class="col-xs-1 col-sm-1 col-md-1"></div> <!-- Novo-->
                                      <!--<div class="col-xs-5 col-sm-5 col-md-10">--> <!-- Old-->
                                       <div class="col-xs-10 col-sm-10 col-md-10"> <!-- Novo-->
                                        <label for="wdwvalue"><span id="secSaque_sBruto"></span></label>
                                        <input type="text" id="wdwvalue" style="/*width: 125%;*/" class="valReceita" readonly>                    
                                      </div>
                                      <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                    </div>
                                    <div class="row hide" id="secSaque_rowIrSaque">
                                        <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                        <div class="col-xs-10 col-sm-10 col-md-10">
                                            <label for="wdwirvalue"><span id="secSaque_irSaque"></span></label>
                                            <input type="text" id="wdwirvalue" class="valDesconto" readonly="">
                                        </div>
                                        <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                    </div>
                                    <div class="row hide" id="secSaque_rowSLiquido">
                                        <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                        <div class="col-xs-10 col-sm-10 col-md-10">
                                            <label for="wdwnet"><span id="secSaque_sLiquido"></span></label>
                                            <input type="text" id="wdwnet" class="valLiquido" readonly="">
                                        </div>
                                        <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                    </div>                            
                                  </div>
                                </div>
				                      <div class="alert alert-danger" role="alert" id="secSaque_msg2"></div>
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12" id="tamBeneBox">
                                <div class="alert alert-info-bg" id="tamBeneBox_msg1_alert"><span id="tamBeneBox_msg1"></span></div>
                                <div class="panel panel-bg panel-default panel-default-bg">
                                  <div class="panel-body panel-body-bg">                            
                                    <div class="row">
                                      <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                      <div class="col-xs-10 col-sm-10 col-md-10">
                                        <label for="irvalue"><span id="tamBeneBox_remainBenBal"></span></label>
                                        <input type="text" id="remainBenBal" class="valReceita" readonly>                    
                                      </div>
                                      <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                    </div>                                  
                                    <div class="row row-linha">&nbsp</div>
                                    <div class="row">
                                      <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                      <div class="col-xs-12 col-sm-10 col-md-10"><span id="tamBeneBox_bMensal"></span></div>
                                      <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                    </div> 
                                    <div class="row row-linha">&nbsp</div>
                                    <div class="row">
                                      <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                         <div class="col-xs-10 col-sm-10 col-md-10">
                                          <div class="text" id="radio">    
                                            <div id="groupPerc" class="col-xs-12 col-sm-12 col-md-12">
                                              <input type="radio" id="perc" name="radio" checked="checked">
                                              <label for="perc"><span id="tamBeneBox_perc"></span></label>&nbsp;&nbsp;    
                                            </div>
                                            <div id="groupPrazo" class="col-xs-12 col-sm-12 col-md-12">
                                              <input type="radio" id="prazo" name="radio">
                                              <label for="prazo"><span id="tamBeneBox_prazo"></span></label>    
                                            </div>
                                            <div id="groupRenda" class="col-xs-12 col-sm-12 col-md-12">                                                                                   				
                                               <input type="radio" id="renda" name="radio">
                                               <label for="renda"><span id="tamBeneBox_renda"></span></label>
                                            </div>
                                          </div>                   
                                          </div>  
                                        <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                    </div>
                                    <div class="row row-linha">&nbsp</div>                  
                                    <div id="divTamBeneBox_input">
                                      <div class="row">
                                          <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                          <div class="col-xs-12 col-sm-10 col-md-10"><span id="tamBeneBox_input"></span></div>
                                          <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                      </div> 
                                      <div class="row row-linha">&nbsp</div>
                                      <div class="row" id="divSlider">
                                          <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                          <div class="col-xs-10 col-sm-10 col-md-10">
                                              <input type="number" class="form-control input-sm" id="pmtVlRenda" aria-describedby="pmtVlRendaHelp" placeholder="0,00" min="0" style="width:110px;"></input>
                                              <span id="textPmtVlRenda"></span>   
                                          </div>
                                          <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                      </div>
                                      <div class="row row-linha">&nbsp</div>
                                  </div>
                                  <div id="divTamBeneBox_slider">
                                      <div class="row">
                                          <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                          <div class="col-xs-12 col-sm-10 col-md-10"><span id="tamBeneBox_barra"></span></div>
                                          <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                      </div> 
                                      <div class="row row-linha">&nbsp</div>
                                      <div class="row" id="divSlider">
                                          <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                          <div class="col-xs-10 col-sm-10 col-md-10" id="slider"></div>
                                          <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                      </div>
                                      <div class="row row-linha">&nbsp</div>
                                  </div>
                                  <div class="alert alert-warning" role="alert" id="secTamBeneBox_msg1" style="display: none;"></div>
                                    <div class="row row-linha">&nbsp</div>
                                    <div class="row">
                                      <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                      <div class="col-xs-10 col-sm-10 col-md-10">
                                        <label for="pmt"><span id="tamBeneBox_pmt"></span></label>
                                        <input type="text" id="pmt" class="valLiquido" readonly>                    
                                      </div>
                                      <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                    </div>
                                    <div class="row">
                                      <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                      <div class="col-xs-10 col-sm-10 col-md-10">
                                        <label for="amount"><span id="tamBeneBox_amount"></span></label>
                                        <input type="text" id="amount" class="valReceita" readonly>                    
                                      </div>
                                      <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                    </div>
                                    <div class="row hide" id="tamBeneBox_rowBenefIrValue">
                                      <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                      <div class="col-xs-10 col-sm-10 col-md-10">
                                        <label for="irvalue"><span id="tamBeneBox_benefIrValue"></span></label>
                                        <input type="text" id="benefirvalue" class="valDesconto" readonly>                    
                                      </div>
                                      <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                    </div>
                                    <div class="row hide" id="tamBeneBox_rowBenefLiquido">
                                          <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                          <div class="col-xs-10 col-sm-10 col-md-10">
                                              <label for="benefnet"><span id="tamBeneBox_benefNet"></span></label>
                                              <input type="text" id="benefnet" class="valLiquido" readonly="">
                                          </div>
                                          <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                    </div>
                                  </div>                                    
                                </div>                                
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12" id="secBenefApos_info">
                                <div id="secBenefApos_info_generico">
                                    <div class="panel panel-bg panel-default">
                                    <div class="panel-body panel-body-bg">
                                        <div class="row">
                                            <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                            <div class="col-xs-12 col-sm-10 col-md-10" align="center">
                                                <span id="secBenefApos_barra">Veja abaixo o demonstrativo de cálculo de seu recebimento futuro</span>
                                            </div>
                                            <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                        </div>
                                        <div class="row">&nbsp;</div>
                                        <div id="secBenefApos_divProvento">
                                            <div  class="row" id="secBenefApos_divProvento_Benef">
                                            <div class="col-xs-0 col-sm-2 col-md-2"></div>
                                            <div class="col-xs-12 col-sm-9 col-md-9 text-left">
                                                <div class="col-xs-0 col-sm-0 col-md-1"></div>
                                                <div class="col-xs-12 col-sm-6 col-md-5 padding-right-none"><label for="benefprov"><span id="secBenefApos_Provento">(+) Benefício Inicial:</span></label>
                                                <!--</div>
                                                <div class="col-xs-12 col-sm-5 col-md-5">-->
                                                <input type="text" id="benefprov" class="valReceita" readonly=""></div>
                                                <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                            </div>
                                            <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                            </div>
                                            <div class="row" id="secBenefApos_divProvento_Saque">                                                
                                            <div class="col-xs-0 col-sm-2 col-md-2"></div>
                                            <div class="col-xs-12 col-sm-9 col-md-9 text-left">
                                                <div class="col-xs-0 col-sm-0 col-md-1"></div>
                                                <div class="col-xs-12 col-sm-6 col-md-5 padding-right-none"><label for="provSaque">(+) Saque Bruto:</label>
                                                <!--</div>
                                                <div class="col-xs-12 col-sm-5 col-md-5">-->
                                                <input type="text" id="provSaque" class="valReceita" readonly=""></div>
                                                <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                            </div>
                                            <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-0 col-sm-2 col-md-2"></div>
                                            <div class="col-xs-12 col-sm-9 col-md-9 text-left">
                                                <div class="col-xs-0 col-sm-0 col-md-1"></div>
                                                <div class="col-xs-12 col-sm-6 col-md-5">
                                                <label for="descirvalue"><span id="secBenefApos_Desconto">(-) Imposto de Renda:</span></label>
                                                <!--</div>
                                                <div class="col-xs-12 col-sm-5 col-md-5">-->
                                                <input type="text" id="descirvalue" class="valDesconto" readonly="">
                                                <a id="#secBenefApos_BtnDescIR" class="hide btn btn-xs fa fa-question-circle-o fa-2" data-toggle="collapse" data-target="#secBenefApos_DescIR" style="font-weight: 500;font-size:18px;color:black;"></a>
                                                </div>
                                                <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                            </div>
                                            <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                        </div>
                                        <div class="row collapse" style="font-size:12px;" id="secBenefApos_DescIR">
                                            <div class="col-xs-0 col-sm-2 col-md-2"></div>
                                            <div class="col-xs-12 col-sm-9 col-md-9 text-left">
                                                <div class="col-xs-2 col-sm-2 col-md-2 padding-right-none"></div>
                                                <div class="col-xs-10 col-sm-5 col-md-4 padding-left-none">
                                                <label for="descbenefirvalue"><span id="secBenefApos_DescIR_Benef">(-) IR Benefício:</span></label>
                                                </div>
                                                <div class="col-xs-12 col-sm-5 col-md-5" style="padding-left:40px;">
                                                <input type="text" id="descbenefirvalue" class="valDesconto" readonly="">                                                      
                                                </div>
                                                <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                            </div>
                                            <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                            <div class="col-xs-0 col-sm-2 col-md-2"></div>
                                            <div class="col-xs-12 col-sm-9 col-md-9 text-left">
                                                <div class="col-xs-2 col-sm-2 col-md-2 padding-right-none"></div>
                                                <div class="col-xs-10 col-sm-5 col-md-4 padding-left-none">
                                                <label for="descsaqueirvalue"><span id="secBenefApos_DescIR_Saque">(-) IR Saque:</span></label>
                                                </div>
                                                <div class="col-xs-12 col-sm-5 col-md-5" style="padding-left:40px;">
                                                <input type="text" id="descsaqueirvalue" class="valDesconto" readonly="">                                                     
                                                </div>
                                                <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                            </div>
                                            <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                        </div>
                                        <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                        <!--<div class="row">
                                            <div class="col-xs-12 col-sm-12 col-md-12 center">
                                                <hr style="width:55%; margin-top:5px; margin-bottom: 5px; border-top: 2px solid #000;">
                                            </div>
                                        </div>-->
                                        <div class="row">                                        
                                            <div class="col-xs-12 col-sm-12 col-md-12">
                                              <hr style="width:80%; margin-top:5px; margin-bottom: 5px; border-top: 2px solid #000;" align="left">
                                            </div>                                          
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-0 col-sm-2 col-md-2"></div>
                                            <div class="col-xs-12 col-sm-9 col-md-9 text-left">
                                                <div class="col-xs-0 col-sm-0 col-md-1"></div>
                                                <div class="col-xs-12 col-sm-6 col-md-5 padding-right-none">
                                                <label for="benefliquivalue"><span id="secBenefApos_Liquido">(=) Valor Líquido:</span></label>
                                                <!--</div>
                                                <div class="col-xs-12 col-sm-5 col-md-5">-->
                                                <input type="text" id="benefliquivalue" class="valLiquido" readonly="">
                                                </div>
                                                <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                            </div>
                                            <div class="col-xs-0 col-sm-1 col-md-1"></div>
                                        </div>
                                            <!--
                                        <div class="row" id="secBenefApos_benefAdicional" style="display: none;">
                                            <div class="row">&nbsp;</div>
                                            <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                            <div class="col-xs-10 col-sm-10 col-md-10">
                                                <div class="alert alert-success text-justify" id="secBenefApos_benefAd"><span id="secBenefApos_msg2">O saldo de benef\EDcio adicional ser\E1 pago ao participante conforme op\E7\E3o de recebimento em forma de renda financeira ou como renda vital\EDcia, com revers\E3o em pens\E3o.</span></div>
                                                <div class="row">
                                                <div class="col-xs-12 col-sm-12 col-md-12 text-left" id="secBenefApos_fldMyBenAdicDiv">
                                                    <label for="BenefAposfldMyBenAdic"><span id="secBenefApos_fldMyBenAdic">Saldo de Benef\EDcio Adicional:</span></label>
                                                    <input type="text" id="BenefAposfldMyBenAdic" class="valReceita" readonly="">
                                                </div>
                                                </div>
                                                <div class="row">&nbsp;</div>
                                            </div>
                                            <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                        </div> 
                                            -->
                                    </div>
                                  </div>
                                </div>
                               </div>
                              <div>
                                 <div class="col-xs-0 col-sm-0 col-md-0"></div>
                                 <div class="col-xs-12 col-sm-12 col-md-12">                         
          			                  <div id="graSalProjeta" class="hide">
                                    <div class="panel panel-bg panel-default">
                                      <div class="panel-heading panel-heading-bg">
                                        <a data-toggle="collapse" id="secBeneApos_grafico_load" href="#collapseGraSalProjeta" aria-expanded="false" aria-controls="collapse" class="collapsed">
                                          <strong><span id="secBeneApos_grafico"></span></strong> (Expandir)
                                        </a>
                                      </div>
                                      <div id="collapseGraSalProjeta" class="panel-collapse collapse" aria-expanded="false">
                                        <div class="panel-body panel-body-bg">
                                          <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                          <div class="col-xs-8 col-sm-8 col-md-8">
                                            <div class="col-xs-12 col-sm-12 col-md-12" align="left">
                                              <span style="font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif; font-size: 90%; font-style: normal; color: #666">R$ em milhares</span>
                                            </div>                                
                                            <div class="row" id="CharBenContainer">
                                              <canvas id="ChartBen"></canvas>
                                            </div>
                                            <div class="col-xs-12 col-sm-12 col-md-12" align="center">
                                              <span style="font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif; font-size: 90%; font-style: normal; color: #666">Idade em anos</span>
                                            </div>
                                          </div>
                                          <div class="col-xs-2 col-sm-2 col-md-2">
                                            <div id="legend"></div>
                                          </div>
                                          <div class="col-xs-1 col-sm-1 col-md-1"></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>			 
                                  <div class="panel panel-bg panel-default hide" id="secEvolSaque">
                                      <div class="panel-heading panel-heading-bg">
                                          <a data-toggle="collapse" href="#collapseEvolSaque" aria-expanded="false" aria-controls="collapse" class="collapsed">
                                            <strong><span id="secBeneApos_evolution"></span></strong> (Expandir)
                                          </a>  
                                      </div>
                                      <div id="collapseEvolSaque" class="panel-collapse collapse" aria-expanded="false">
                                        <div class="panel-body panel-body-bg">
                                            <div class="table-responsive" id="evolution"></div>
                                        </div>
                                      </div>  
                                  </div>
                                  </div>                                                      		                                                                             
                                <div class="col-xs-0 col-sm-0 col-md-0"></div>                       
                             </div> 
                            </div>
                           </div>  
                         </div>
                        </div>
                        <div class="col-xs-0 col-sm-0 col-md-0"></div>
                       </div>
                        <div>                      
                        <div class="row step" id="stepFive">            
                                        
                            <div id="stepFive-btn-up-div" class="col-xs-6 col-sm-6 col-md-6" style="padding: 0px 5px;">                    
                                <a id="stepFive-btn-up" type="button" class="btn btn-default btn-step col-xs-12 col-sm-12 col-md-12" role="button">
                                  <span class="glyphicon glyphicon-menu-up" aria-hidden="true"></span>
                                </a>
                            </div>
            
                             <div id="stepFive-btn-down-div" class="col-xs-6 col-sm-6 col-md-6" style="padding: 0px 5px;">                    
                                <a id="stepFive-btn-down" type="button" class="btn btn-default btn-step col-xs-12 col-sm-12 col-md-12" role="button">
                                  <span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span>
                                </a>
                            </div>

                            <!-- Btn Assistido -->
                            <div id="stepFive-assistido-btn-up-div" class="col-xs-12 col-sm-12 col-md-12" style="padding: 0px 5px;">                    
                                <a id="stepFive-assistido-btn-up" type="button" class="hide btn btn-default btn-step col-xs-12 col-sm-12 col-md-12" role="button">
                                  <span class="glyphicon glyphicon-menu-up" aria-hidden="true"></span>
                                </a>
                            </div>
             
                        </div>                                                     		                                                                                                                 
                   </div> 
                      </div>                                             
                   <div class="row hide" id="secResgate">
                        <div class="col-xs-0 col-sm-0 col-md-0"></div>
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <div class="alert alert-info-bg" id="secResgate_info"></span><span id="secResgate_info_m"></span></div>
                            <div class="panel panel-bg panel-default"> 
                            <div class="panel-heading panel-heading-bg">                              
                                <h4><span id="secResgate_rProjetado"></span></h4>                              
                            </div>
                                <div class="panel-body panel-body-bg">                                                         
                                <div class="table-responsive">
                                    <table id="GridResg" class="table table-condensed" border="0">    
                                    <tr id="GridResg_line2">
                                        <td align=right><span id="secResgate_rescPartBal"></span></td>
                                        <td align=left id="RescPartBal"></td> 
                                        <td></td>                                     
                                    </tr>
                                    <tr id="GridResg_line2_1">
                                        <td align=right><span id="secResgate_direito_a"></span></td>
                                        <td>
                                        <div class="progress" style="margin-bottom: 0px;">
                                            <div class="progress-bar progress-bar-success progress-bar-striped active" style="width:100%" id="PbarResgPartBal">
                                            <label id="lblPbarResgPartBal"></label>  
                                            </div>
                                        </div>
                                        </td>
                                        <td></td>                                      
                                    </tr>

                                    <tr id="GridResg_line3">
                                        <td align=right><span id="secResgate_rescCpnyBal"></span></td>
                                        <td align=left id="RescCpnyBal"></td>  
                                        <td></td>                                  
                                    </tr> 
                                    <tr id="GridResg_line3_1">
                                        <td align=right><span id="secResgate_direito_b"></span></td>
                                        <td>
                                        <div class="progress" style="margin-bottom: 0px;">
                                            <div class="progress-bar progress-bar-info progress-bar-striped active" style="width:15%" id="PbarResgCompnyBal">
                                            <label id="lblPbarResgCompnyBal"></label> 
                                            </div>
                                        </div>
                                        </td>
                                        <td></td>
                                    </tr>                                                   
                                    <tr id="GridResg_line4" class="active">
                                        <td align=right><strong><span id="secResgate_rescTotBal"></span></strong></td>
                                        <td align=left id="RescTotBal"><strong></strong></td>
                                        <td></td>
                                    </tr>                          
                                    <tr id="GridResg_line5" class="danger">
                                        <td align=right><strong><span id="secResgate_rescTax"></span></strong></td>
                                        <td align=left id="RescTax"><strong></strong></td>
                                        <td></td>
                                    </tr>
                                    <tr id="GridResg_line6" class="active">
                                        <td align=right><strong><span id="secResgate_rescNet"></span></strong></td>
                                        <td align=left id="RescNet"><strong></strong></td>
                                        <td></td>
                                    </tr>
                                    </table>
                                </div>  
                                </div>                                                              
                            </div>
                            <div class="row step" id="stepSix">            
                            <div id="stepSix-btn-up-div" class="col-xs-12 col-sm-12 col-md-12">                    
                                <a id="stepSix-btn-up" type="button" class="btn btn-default btn-step col-xs-12 col-sm-12 col-md-12" role="button">
                                <span class="glyphicon glyphicon-menu-up" aria-hidden="true"></span>
                                </a>
                            </div>                      
                            </div> 
                        </div>
                        <div class="col-xs-0 col-sm-0 col-md-0"></div>  
                    </div>                                                                         
               </div>                  
        	</div>             	
      	</div>
        <div class="col-xs-0 col-sm-0 col-md-0"></div>
      </div>       
      <div class="row hide" id="secFoot">
        <div class="col-xs-0 col-sm-0 col-md-0"></div>
        <div class="col-xs-12 col-sm-12 col-md-12">             
          <footer>
              <p style=""><span id="CopyrigtText"></span></p>
          </footer>      
        </div>
        <div class="col-xs-0 col-sm-0 col-md-0"></div>
      </div>

    </div>