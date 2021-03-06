app.config(function($routeProvider){

    $routeProvider
        .when('/home', {
            controller: 'homeController',
            templateUrl: 'VIEW/home.html'
        })
         .when('/login', {
            controller: 'loginController',
            templateUrl: 'VIEW/login.html'
        })
         .when('/cadastro', {
            controller: 'cadastroController',
            templateUrl: 'VIEW/cadastro.html'
        })
        .when('/cadastroCamera', {
            controller: 'adminController',
            templateUrl: 'VIEW/cadastroCamera.html',
            resolve: {
                autenticado: function (authService) {
                    return authService.isAutenticadoPromise();
                }
            }
        })
        .when('/analiserota', {
            controller: 'analiseRotaController',
            templateUrl: 'VIEW/analiseRota.html',
            resolve: {
                autenticado: function (authService) {
                    return authService.isAutenticadoPromise();
                }
            }
        })
        .when('/veiculo', {
            templateUrl: 'VIEW/veiculo.html',
            controller: 'veiculoController',
            resolve: {
                autenticado: function (authService) {
                    return authService.isAutenticadoPromise();
                }
            }
        })
        .when('/cadastroOcorrencia', {
            templateUrl: 'VIEW/cadastroOcorrencia.html',
            controller: 'ocorrenciaController',
            resolve: {
                autenticado: function (authService) {
                    return authService.isAutenticadoPromise();
                }
            }
        })
        .when('/consultaOcorrencia', {
            templateUrl: 'VIEW/consultaOcorrencia.html',
            controller: 'ocorrenciaController',
            resolve: {
                autenticado: function (authService) {
                    return authService.isAutenticadoPromise();
                }
            }
        })
        .when('/estatistica', {
            templateUrl: 'VIEW/estatistica.html',
            controller: 'estatisticaController',
            resolve: {
                autenticado: function (authService) {
                    return authService.isAutenticadoPromise();
                }
            }
        })
        .when('/clonagem', {
            templateUrl: 'VIEW/consultaClonagem.html',
            controller: 'clonadosController',
            resolve: {
                autenticado: function (authService) {
                    return authService.isAutenticadoPromise();
                }
            }
        })
        .when('/consultacamera', {
            templateUrl: 'VIEW/consultaCamera.html',
            controller: 'cameraController',
            resolve: {
                autenticado: function (authService) {
                    return authService.isAutenticadoPromise();
                }
            }
        })
        .when('/logout', {
            templateUrl: 'VIEW/logout.html',
            controller: 'logoutController',
            resolve: {
                autenticado: function (authService) {
                    return authService.isAutenticadoPromise();
                }
            }
        })
        .otherwise({redirectTo: '/home'});
});