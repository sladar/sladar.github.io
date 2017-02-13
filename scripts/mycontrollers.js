'use strict';

    var app = angular.module('umdApp');

    app.controller('productController', ['$scope','$rootScope','$firebase','$firebaseArray','$firebaseObject','$stateParams','FIREBASE_URL',function($scope,$rootScope,$firebase,$firebaseArray,$firebaseObject,$stateParams,FIREBASE_URL) {
        $scope.brand = [{value:"cardgate", label:"cardgate"}, 
                        {value:"advantech",label:"advantech"},
                        {value:"bluecats",label:"bluecats"},
                        {value:"cherry keyboard",label:"cherry keyboard"},
                        {value:"casio",label:"casio"},
                        {value:"citizen",label:"citizen"},
                        {value:"csl",label:"csl"},
                        {value:"denso",label:"denso"},
                        {value:"one epson",label:"one-epson"},
                        {value:"honeywell",label:"honeywell"},
                        {value:"senor",label:"senor"},
                        {value:"times-7",label:"times-7"},
                        {value:"mazda",label:"mazda"},
                        {value:"zebra",label:"zebra"}];

        $scope.fields = [{value:"productbrand", label:"productbrand"}, 
                        {value:"productcontract",label:"productcontract"},
                        {value:"productmodel",label:"productmodel"},
                        {value:"productowner",label:"productowner"},
                        {value:"productpurchaser",label:"productpurchaser"},
                        {value:"productserial",label:"productserial"},
                        {value:"productrefno",label:"productrefno"},
                        {value:"productpart",label:"productpart"},
                        {value:"contractbegindate",label:"contractbegindate"},
                        {value:"contractenddate",label:"contractenddate"},
                        {value:"productdescription",label:"productdescription"}];

        var productRef = new Firebase(FIREBASE_URL + 'product');

        var productsInfo = $firebaseArray(productRef);

        var productsList =  $firebaseObject(productRef);

        $scope.products = productsInfo;

        console.log($scope.products);

        $rootScope.insertStatus = false;
        $rootScope.insertMessage = "";


        productsInfo.$loaded().then(function(data){
            $scope.productNumber = productsInfo.length;
        });

        productsInfo.$watch(function(data){
            $scope.productNumber = productsInfo.length;
        });

        $scope.InsertProduct = function(){
            
            productsInfo.$add({
                productmodel:$scope.productModel,
                productbrand:$scope.productBrand,
                productpurchaser:$scope.productPurchaser,
                productowner:$scope.productOwner,
                productserial:$scope.productSerial,     
                productcontract:$scope.productContract,
                productrefno:$scope.productReferenceNo,
                contractbegindate:$scope.contractbegin,
                contractenddate:$scope.contractend,
                productpart:$scope.productPartNo,
                productdescription:$scope.productDescription,
                date:Firebase.ServerValue.TIMESTAMP
            }).then(function(){
                $scope.productForm.$setPristine();
                $scope.productModel = "";
                $scope.productBrand = "";
                $scope.productPurchaser="";
                $scope.productOwner="";
                $scope.productSerial="";
                $scope.productContract="";
                $scope.productReferenceNo="";
                $scope.contractbegin="";
                $scope.contractend="";
                $scope.productPartNo="";
                $scope.productDescription="";
                $rootScope.insertStatus = true;
                $rootScope.insertMessage = "Product Information has been successfully added";
                console.log($scope.insertStatus);
                console.log($scope.insertMessage);
                console.log("sent!");
            });
        };
        
        $scope.deleteProduct = function(key){
            console.log(key);
            productsInfo.$remove(key);
        };
        //update product 
        $scope.update = $stateParams.id;

        $scope.groupUpdate = function(){
            console.log($scope.contractupdate);
            console.log($scope.fieldupdate);
            console.log($scope.valueupdate);


            for(var i = 0; i< productsInfo.length;i++){

                if(productsInfo[i].productcontract == $scope.contractupdate){
                    
                    var prop = $scope.fieldupdate;

                    productsInfo[i].prop = $scope.valueupdate;
                    
                    console.log(productsInfo[i].prop);

                    productsInfo.$save(i).then(function(productRef) {
                      console.log("group update success");
                    }, function(error) {
                      console.log("Error:", error);
                    });
                }
                /*if(i.productcontract == $scope.contractupdate){
                    
                    var field = $scope.fieldupdate;

                    console.log(productsInfo[i].field);

                    productsList[i].field == $scope.valueupdate;

                    productsList.$save().then(function(productRef){
                        console.log("group updated success");
                        ref.key === obj.$id; // true
                        }, function(error) {
                        console.log("Error:", error);
                    });
                }*/
            };

        };
        
        
    }])
    .controller('updateController', ['$scope','$rootScope','$firebase','$firebaseArray','$firebaseObject','$stateParams','FIREBASE_URL',function($scope,$rootScope,$firebase,$firebaseArray,$firebaseObject,$stateParams,FIREBASE_URL) {

        $scope.productupdate = {productmodelupdate:"",productbrandupdate:"",productpurchaserupdate:"",productownerupdate:"",productserialupdate:"",productrefupdate:"",productcontractupdate:"",productbegindateupdate:"",productenddateupdate:"",productpartupdate:"",productdescriptionupdate:""};
        //upload images
        $scope.whichproduct = $stateParams.id;

        console.log($scope.whichproduct);

        var productRef = new Firebase(FIREBASE_URL + 'product/' + $scope.whichproduct);

        var productInfo = $firebaseObject(productRef);

        $scope.product = productInfo;

        console.log(productInfo);

        $rootScope.updateStatus = false;
        $rootScope.updateMessage = "";

        $scope.updateProduct = function(){

        productInfo.productmodel = $scope.productupdate.productmodelupdate;
        productInfo.productbrand = $scope.productupdate.productbrandupdate;
        productInfo.productpurchaser = $scope.productupdate.productpurchaserupdate;
        productInfo.productowner = $scope.productupdate.productownerupdate;
        productInfo.productserial = $scope.productupdate.productserialupdate;
        productInfo.productrefno = $scope.productupdate.productrefupdate;
        productInfo.productcontract = $scope.productupdate.productcontractupdate;
        productInfo.contractbegindate = $scope.productupdate.productbegindateupdate;
        productInfo.contractenddate = $scope.productupdate.productenddateupdate;
        productInfo.productpart = $scope.productupdate.productpartupdate;
        productInfo.productdescription = $scope.productupdate.productdescriptionupdate;

        productInfo.$save().then(function(){

        $scope.productUpdateForm.$setPristine();
        $rootScope.updateStatus = true;
        $rootScope.updateMessage = "product information has been updated";
        $scope.productupdate.productmodelupdate = "";
        $scope.productupdate.productbrandupdate = "";
        $scope.productupdate.productpurchaserupdate = "";
        $scope.productupdate.productownerupdate = "";
        $scope.productupdate.productserialupdate = "";
        $scope.productupdate.productrefupdate = "";
        $scope.productupdate.productcontractupdate = "";
        $scope.productupdate.productbegindateupdate = "";
        $scope.productupdate.productenddateupdate = "";
        $scope.productupdate.productpartupdate = "";
        $scope.productupdate.productdescriptionupdate = "";
        });

        console.log($scope.productupdate);
        console.log("update function finishes");

    };

        



        
        
    }])
    .controller('updateImageController', ['$scope','$rootScope','Upload','$firebase','$firebaseArray','$firebaseObject','$stateParams','FIREBASE_URL',function($scope,$rootScope,Upload,$firebase,$firebaseArray,$firebaseObject,$stateParams,FIREBASE_URL) {

        //upload images
        $scope.whichproduct = $stateParams.id;

        $rootScope.insertImageStatus = false;
        $rootScope.insertImageMessage = "";

        console.log($scope.whichproduct);

        var productImageRef = new Firebase(FIREBASE_URL + 'product/' + $scope.whichproduct+'/images');


         $scope.submitImage = function() {
              if ($scope.formImage.file.$valid && $scope.file) {

                var images = $scope.file;

                $scope.upload($scope.file);

                $scope.formImage.$setPristine();

              }
            };

            $scope.upload = function (files) {
                Upload.base64DataUrl(files).then(function(base64Urls){
                    productImageRef.push({
                        imageUrl:base64Urls
                    },function(error){
                        if(error){
                           console.log("Error:",error);
                        }
                        else{
                            console.log("Post set successfully!");
                            console.log($scope.file);
                            $rootScope.insertImageStatus = true;
                            $rootScope.insertImageMessage = "image has been added";
                        }
                    })
                });
            };

        
        
    }]);
        /*.controller('IndexController', ['$scope','customerService',function($scope,customerService) {
            
            

            $scope.header = [];
            $scope.rows = [];

            $scope.getData = function(){
                customerService.getData().then(function(data){
                    result = IndustryService.parseData();
                    $scope.header = result.header;
                    $scope.rows = result.rows;
                });
            };
            console.log($scope.header);
            
            

            

            /*$scope.numPages = function(){
                return Math.ceil($scope.properties.length/$scope.numPerPage);
            };

             $scope.$watch('currentPage + numPerPage', function() {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage);
                var end = begin + $scope.numPerPage;
                
                $scope.filteredproperties = $scope.properties.slice(begin, end);
                console.log($scope.properties);
                console.log($scope.filteredproperties);
            });

            $scope.residential = propertyFactory.getAllResidentials().query(
                function(response){
                    $scope.residential = response;
                    $scope.showProperties = true;
                },
                function(response){
                    $scope.message = "Error: " + response.status + " " + response.statusText;
            });

            $scope.commercial = propertyFactory.getAllCommercials().query(
                function(response){
                    $scope.commercial = response;
                    $scope.showProperties = true;
                },
                function(response){
                    $scope.message = "Error: " + response.status + " " + response.statusText;
            });

            $scope.openinspection = propertyFactory.getAllOpeninspections().query(
                function(response){
                    $scope.openinspection = response;
                    $scope.showProperties = true;
                },
                function(response){
                    $scope.message = "Error: " + response.status + " " + response.statusText;
            });

            $scope.auction = propertyFactory.getAllAuctions().query(
                function(response){
                    $scope.auctions = response;
                    $scope.showProperties = true;
                },
                function(response){
                    $scope.message = "Error: " + response.status + " " + response.statusText;
            });

            $scope.houses = propertyFactory.getAllHouses().query(
                function(response){
                    $scope.houses = response;
                    $scope.showProperties = true;
                },
                function(response){
                    $scope.message = "Error: " + response.status + " " + response.statusText;
            });

            $scope.apartments = propertyFactory.getAllApartments().query(
                function(response){
                    $scope.apartments = response;
                    $scope.showProperties = true;
                },
                function(response){
                    $scope.message = "Error: " + response.status + " " + response.statusText;
            });

        }])*/
        

        