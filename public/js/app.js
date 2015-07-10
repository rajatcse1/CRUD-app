/**
 * Created by Sandeep on 01/06/14.
 */

angular.module('app', ['ui.router', 'ngResource', 'app.controllers', 'app.services']);

angular.module('app').constant('appConstants', {
    resourceName: '/movies',
    url: "./api/v1/movies"
}).filter('onlySchemas', function() {
    return function(item) {
        var filtered = {};
        angular.forEach(item, function(value, key) {
            if(key.substring(0,1) !== "_"){
                filtered[key] = value;
            }
            
        });
        /*for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (/_/i.test(item.key.substring(0, 1))) {
                filtered.push(item);
            }
        }*/
        return filtered;
    };
}).config(function($stateProvider, $httpProvider, appConstants) {
    $stateProvider.state('resources', {
        url: appConstants.resourceName,
        templateUrl: 'partials/resources.html',
        controller: 'ResourceListController'
    }).state('viewResource', {
        url: appConstants.resourceName + '/:id/view',
        templateUrl: 'partials/resource-view.html',
        controller: 'ResourceViewController'
    }).state('newResource', {
        url: appConstants.resourceName + '/new',
        templateUrl: 'partials/resource-add.html',
        controller: 'ResourceCreateController'
    }).state('editResource', {
        url: appConstants.resourceName + '/:id/edit',
        templateUrl: 'partials/resource-edit.html',
        controller: 'ResourceEditController'
    });
}).run(function($state) {
    $state.go('resources');
});
