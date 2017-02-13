'use strict';

angular.module('umdApp')
	/*.filter('searchFilter',[function(){

        return function(data,model,serial,brand){
            
            var output = [];

            if(!!model && !!serial && !!brand){
                //if three parameter are present
                model = model.toLowerCase();
                serial = serial.toLowerCase();
                brand = brand.toLowerCase();

                 //loop over the original array
                for(var i = 0;i<data.length; i++){
                    // check if any result matching the search request
                    if(data[i].model.toLowerCase().indexOf(model) !== -1 && 
                        data[i].serial.toLowerCase().indexOf(serial) !== -1 && data[i].brand.toLowerCase().indexOf(brand) !== -1){
                        //push data into results array
                        output.push(data[i]);
                    }
                }

            }
            else if(!!model){

                for(var i = 0;i<data.length; i++){
                    if(data[i].model.toLowerCase().indexOf(model) !== -1){
                        output.push(data[i]);
                    }
                }
            }
            else if(!!serial){

                for(var i = 0;i<data.length; i++){
                    if(data[i].serial.indexOf(serial) !== -1){
                        output.push(data[i]);
                    }
                }
            }
            else if(!!brand){

                for(var i = 0;i<data.length; i++){
                    if(data[i].brand.indexOf(brand) !== -1){
                        output.push(data[i]);
                    }
                }
            }
            else{
                //when no input parameter
                output = data;
            }

            return output;
        }
    }]);*/
