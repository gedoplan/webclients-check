(function () {
    "use strict";
    var app = angular.module("GedoplanWebClients", ['GedoplanWebClients.home', 'GedoplanWebClients.order.list', 'GedoplanWebClients.customer.detail', 'GedoplanWebClients.customer.list', 'GedoplanWebClients.services.user', 'GedoplanWebClients.services.customer', 'ui.router', 'pascalprecht.translate', 'ngResource', 'ngCookies', 'valdr', 'angular-growl', 'GedoplanWebClients.directives.historyBack', 'GedoplanWebClients.services.interceptors', 'GedoplanWebClients.template', 'GedoplanWebClients.login'])
            .config(function ($stateProvider, $urlRouterProvider, $translateProvider, $httpProvider, valdrProvider, valdrMessageProvider, growlProvider) {
//Navigation Rules
                $stateProvider
                        .state('login', {
                            url: '/login',
                            templateUrl: 'components/login/login.html',
                            controller: 'login',
                            controllerAs: 'vm'
                        })
                        .state('app', {
                            url: '/app',
                            templateUrl: 'components/template/template.html',
                            controller: 'templateController',
                            controllerAs: 'vm'
                        })
                        .state('app.home', {
                            url: '/home',
                            templateUrl: 'components/home/home.html',
                            controller: 'home',
                            controllerAs: 'vm'
                        })
                        .state('app.customer-detail', {
                            url: '/customer/detail/{id}',
                            templateUrl: 'components/customer/detail/customer-detail.html',
                            controller: 'customer-detail',
                            controllerAs: 'vm'
                        })
                        .state('app.customer-list', {
                            url: '/customer',
                            templateUrl: 'components/customer/list/customer-list.html',
                            controller: 'customer-list',
                            controllerAs: 'vm'
                        })
                        .state('app.order-list', {
                            url: '/order',
                            templateUrl: 'components/order/list/order-list.html',
                            controller: 'order-list',
                            controllerAs: 'vm'
                        })
                        ;

                $urlRouterProvider.otherwise("login");

// i18n
                $translateProvider.useSanitizeValueStrategy('escape');
                $translateProvider.registerAvailableLanguageKeys(['de', 'en'], {
                    'en_*': 'en',
                    'de_*': 'de'
                });
                $translateProvider.determinePreferredLanguage();
                $translateProvider.fallbackLanguage('de');
                $translateProvider.useStaticFilesLoader({
                    prefix: 'assets/i18n/',
                    suffix: '.json'
                });

                $httpProvider.defaults.withCredentials = true;
                $httpProvider.interceptors.push("httpInterceptor");


// Bean Validation
                valdrProvider.setConstraintUrl('../bvrules');
                valdrMessageProvider.setTemplate('<span class="label label-danger valdrmsg">{{ violation.message | translate:violation }}</span>');

// Growl
                growlProvider.globalTimeToLive(5000);
            })

            .run(function ($window, $rootScope) {
                $rootScope.language = $window.navigator.language || $window.navigator.userLanguage;
            });


    app.constant("restbaseurl", "../webresources/");

})();




