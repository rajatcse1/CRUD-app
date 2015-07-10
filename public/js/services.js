/**
 * Created by Sandeep on 01/06/14.
 */

angular.module('app.services', []).factory('Resource', function($resource, appConstants) {
    return $resource(appConstants.url + '/:id', {
        id: '@_id'
    }, {
        update: {
            method: 'PUT'
        },
        get: {
            method: 'GET'
        },
        save: {
            method: 'POST'
        },
        query: {
            method: 'GET',
            isArray: true
        },
        remove: {
            method: 'DELETE'
        },
        delete: {
            method: 'DELETE'
        }
    });
}).service('popupService', function($window) {
    this.showPopup = function(message) {
        return $window.confirm(message);
    }
});
