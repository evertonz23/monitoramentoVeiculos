app.controller('analiseRotaController', function ($scope, $routeParams, $location, authService, authConfig, toastr, AnaliseRotaService, registroService, cameraService) {

    $scope.selecionar_orientacao = true;
    $scope.dados_Rota = false;
    $scope.botoes_Mapa = false;

    $scope.buscarCamerasPorSentido = function (direcao) {
        $scope.pegardirecao = direcao;
        AnaliseRotaService.buscarCameraSentido(direcao).then(response => {
            $scope.camerasSentido = response.data;
            toastr.success("Cameras carregadas com sucesso!!");
            $scope.selecionar_orientacao = false;
            $scope.dados_Rota = true;
        }).catch(error => toastr.error('Selecione algum campo válido!'))
    }

    $scope.pegarCameras = function (RegistroCountModel) {

        RegistroCountModel.direcao = $scope.pegardirecao;
        $scope.modelEnergia = RegistroCountModel;

        AnaliseRotaService.listarPontosEspecificos(RegistroCountModel).then(response => {
            $scope.cameras = response.data;
            $scope.tamanho = $scope.cameras.length;
            $scope.camerasCalor = $scope.cameras;
            $scope.dados_Rota = false;
            $scope.botoes_Mapa = true;
        }).catch(error => toastr.error('Algum campo inválido, insira novamente!'));
    }

    //pontos de calor

    $scope.heatMapData = [];

    function criarMapaCalor(camerasCalor) {
        for (let i = 0; i < camerasCalor.length; i++) {
            $scope.heatMapData.push({ location: new google.maps.LatLng(camerasCalor[i].camera.latitude, camerasCalor[i].camera.longitude), weight: camerasCalor[i].fator });
        }
    }

    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    var NovoHamburgo = new google.maps.LatLng(-29.6918991, -51.1255697);
    var map;
    var heatmap;
    var marker;
    var LatLng;

    //funcao para mostrar o mapa com seus pontos de calor
    $scope.click = function () {
        map = new google.maps.Map(document.getElementById('map'), {
            center: NovoHamburgo,
            zoom: 10
        })
        criarMapaCalor($scope.camerasCalor);
        heatmap = new google.maps.visualization.HeatmapLayer({
            data: $scope.heatMapData,
            radius: 50
        });
        heatmap.setMap(map);
        directionsDisplay.setMap(map);
        for (let i = 0; i < $scope.cameras.length; i++) {
            var lat = $scope.cameras[i].camera.latitude;
            var long = $scope.cameras[i].camera.longitude;;
            LatLng = new google.maps.LatLng(lat, long);
            marker = new google.maps.Marker({
                position: LatLng,
                map: map,
                icon: 'https://png.icons8.com/maximum-speed/office/40',
                animation: google.maps.Animation.BOUNCE
            });
        }
    }

    $scope.tracarRota = function () {
        calculateAndDisplayRoute(directionsService, directionsDisplay, $scope.camerasCalor);
    }

    //funcao para calcular a rota
    function calculateAndDisplayRoute(directionsService, directionsDisplay, camerasCalor, modelEnergia) {

        var start = camerasCalor[0].camera.latitude + ',' + camerasCalor[0].camera.longitude;
        var end = camerasCalor[$scope.tamanho - 1].camera.latitude + ',' + camerasCalor[$scope.tamanho - 1].camera.longitude;

        $scope.distanciaEntrePontos = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(camerasCalor[0].camera.latitude, camerasCalor[0].camera.longitude), new google.maps.LatLng(camerasCalor[$scope.tamanho - 1].camera.latitude, camerasCalor[$scope.tamanho - 1].camera.longitude));
        $scope.modelEnergia.metros = $scope.distanciaEntrePontos;

        var model = new Object;
        model.data = $scope.modelEnergia.data;

        calculoEnergia($scope.modelEnergia);
        buscarRegistroVeiculosPorData(model);
        buscarRegistroVeiculosPorHorario(model);

        directionsService.route({
            origin: start,
            destination: end,
            travelMode: 'DRIVING'
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                toastr.error('Tente novamente!' + status);
            }
        });
    }

    function calculoEnergia(modelEnergia) {
        AnaliseRotaService.buscarCalculoEnergia(modelEnergia).then(response => {
            $scope.energia = response.data;
        }).catch(error => toastr.error('Algum erro ocorrido! Contate o administrador!'))
    }

    function buscarRegistroVeiculosPorHorario(data) {
        registroService.buscarRegistrosVeiculosPorHorario(data).then(response => {
            let dataResponse = [];
            response.data.forEach(element => {
                dataResponse.push({ label: element.horario, value: element.contagem });
            });
            $scope.veiculoPorHorario.data = dataResponse;
        }).catch(error => toastr.error('Algum erro ocorrido! Contate o administrador!'))
    }

    function buscarRegistroVeiculosPorData(data) {
        cameraService.buscarRegistroVeiculosPorData(data).then(response => {
            let dataResponse = [];
            response.data.forEach(element => {
                dataResponse.push({ label: element.dia, value: element.contagem });
            });
            $scope.veiculoPorDia.data = dataResponse;
        }).catch(error => toastr.error('Algum erro ocorrido! Contate o administrador!'))
    }

    $scope.veiculoPorHorario = {
        chart: {
            caption: "HORARIO X VEICULOS",
            subCaption: "Fluxo de veiculos por horário",
            theme: "zune"
        },
    };

    $scope.veiculoPorDia = {
        chart: {
            caption: "DIAS SEMANA X VEICULOS",
            subCaption: "Fluxo de veiculos por dias da semana",
            theme: "zune"
        },
    };
})