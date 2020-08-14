var arrayConfiguracaoGA = [];
arrayConfiguracaoGA.push({ propriedadeId: 'UA-150835829-1', idEntidade: '10', nomeEntidade: 'Avon Prev', nomeRastreador: 'TrackerAvonPrev' });
arrayConfiguracaoGA.push({ propriedadeId: 'UA-150817269-1', idEntidade: '18', nomeEntidade: 'PrevMon', nomeRastreador: 'TrackerPrevMonPrev' });
arrayConfiguracaoGA.push({ propriedadeId: 'UA-150817370-1', idEntidade: '27', nomeEntidade: 'RBS Prev', nomeRastreador: 'TrackerRbsPrev' });
arrayConfiguracaoGA.push({ propriedadeId: 'UA-150824417-1', idEntidade: '48', nomeEntidade: 'Carrefour Prev', nomeRastreador: 'TrackerCarrefourPrev' });
arrayConfiguracaoGA.push({ propriedadeId: 'UA-86545178-1', idEntidade: '57', nomeEntidade: 'Embraer Prev', nomeRastreador: 'TrackerEmbraerPrev' });
arrayConfiguracaoGA.push({ propriedadeId: 'UA-150857799-1', idEntidade: '61', nomeEntidade: 'Fipec', nomeRastreador: 'TrackerFipecPrev' });
arrayConfiguracaoGA.push({ propriedadeId: 'UA-149236499-1', idEntidade: '62', nomeEntidade: 'Gebsa Prev', nomeRastreador: 'TrackerGebsaPrev' });

function buscarConfiguracaoGoogleAnalitycs(idEntidade) {
    var retornoConfiguracaoGA = null;
    for (var i = 0; i < arrayConfiguracaoGA.length; i++) {
        if (arrayConfiguracaoGA[i].idEntidade == idEntidade) {
            retornoConfiguracaoGA = arrayConfiguracaoGA[i];
            break;
        }
    }
    return retornoConfiguracaoGA;
}

function registrarAcessoGoogleAnalytics(idEntidade, pagina) {
    try {
        let configuracaoGA = buscarConfiguracaoGoogleAnalitycs(idEntidade);        
        if (configuracaoGA != null && pagina != "" && location.hostname != 'localhost') {
            let nomeRastreador = configuracaoGA.nomeRastreador;
            let urlPage = location.pathname;
            let tituloPagina = configuracaoGA.nomeEntidade + ' | ' + pagina;
            ga(nomeRastreador + '.send', 'pageview', {
                'page': urlPage,
                'title': tituloPagina
            });
        }
    }
    catch (err) {
    }
}