    app.service('registroService', function ($http) {
    
    var url = 'http://localhost:9090/registro';

    return {
        obterRegistros: obterRegistros,
        buscarNumeroVeiculoClonados: buscarNumeroVeiculoClonados,
        buscarRegistrosVeiculosPorHorario:  buscarRegistrosVeiculosPorHorario,
        buscarVeiculosSuspeitosClonagem: buscarVeiculosSuspeitosClonagem
    }

    function obterRegistros() {
        return $http.get(url);
    }

    function buscarRegistrosVeiculosPorHorario(model) {
        return $http.post(url + '/obter/veiculosporhorario', model);
    }

    function buscarNumeroVeiculoClonados(){
        return $http.get(url + '/obter/numeroveiculossuspeitos');
    }

    function buscarVeiculosSuspeitosClonagem(){
        return $http.get(url + '/obter/veiculossuspeitos');
    }
});