'use strict';

angular.module('umdApp', ['ui.bootstrap','ui.router','firebase','ngResource','ngFileUpload'])
	   .constant('FIREBASE_URL','https://umd-product.firebaseio.com/')
	   .config(function($stateProvider, $urlRouterProvider) { 
  			$stateProvider
             // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html'
                    },
                    'content': {
                        templateUrl : 'views/home.html'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }
            })
            
            // route for the insert page
            .state('app.insert', {
                url:'insert',
                views: {
                    'content@': {
                        templateUrl: 'views/insert.html',
                        controller  : 'productController'
                   }
                }
            })
            .state('app.browse', {
                url:'browse',
                views: {
                    'content@': {
                        templateUrl: 'views/browse.html',
                        controller  : 'productController'
                   }
                }
            })
            .state('app.search', {
                url:'search',
                views: {
                    'content@': {
                        templateUrl: 'views/search.html',
                        controller  : 'productController'
                   }
                }
            })
            .state('app.delete', {
                url:'delete',
                views: {
                    'content@': {
                        templateUrl: 'views/delete.html',
                        controller  : 'productController'
                   }
                }
            })
            .state('app.update', {
                url:'update',
                views: {
                    'content@': {
                        templateUrl: 'views/update.html',
                        controller  : 'productController'
                   }
                }
            })
            .state('app.overview', {
                url:'overview',
                views: {
                    'content@': {
                        templateUrl: 'views/overview.html',
                   }
                }
            })
            .state('app.updateproduct', {
                url:'delete/:id',
                views: {
                    'content@': {
                        templateUrl: 'views/updateproduct.html',
                        controller  : 'updateController'
                   }
                }
            })
            .state('app.updateimage', {
                url:'browse/:id',
                views: {
                    'content@': {
                        templateUrl: 'views/updateimage.html',
                        controller  : 'updateImageController'
                   }
                }
            })
            
            $urlRouterProvider.otherwise('/');
    })
