/**
 * Created by Sandeep on 01/06/14.
 */
angular.module('app.controllers',[]).controller('ResourceListController',function($scope,$state,popupService,$window,Resource){

    $scope.resources=Resource.query();

    $scope.deleteResource=function(resource){
        if(popupService.showPopup('Really delete this?')){
            resource.$delete(function(){
                $window.location.href='';
            });
        }
    }

}).controller('ResourceViewController',function($scope,$stateParams,Resource){

    $scope.resource=Resource.get({id:$stateParams.id});

}).controller('ResourceCreateController',function($scope,$state,$stateParams,Resource){

    $scope.resource=new Resource();

    $scope.addResource=function(){
        $scope.resource.$save(function(){
            $state.go('resources');
        });
    }

}).controller('ResourceEditController',function($scope,$state,$stateParams,Resource){

    $scope.updateResource=function(){
        $scope.resource.$update(function(){
            $state.go('resources');
        });
    };

    $scope.loadResource=function(){
        $scope.resource=Resource.get({id:$stateParams.id});
    };

    $scope.loadResource();
});