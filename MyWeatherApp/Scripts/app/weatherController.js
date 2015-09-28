App.controller('WeatherCtrl', ['$scope', '$http', '$weatherService', '$filter', function ($scope, $http, $weatherService, $filter) {
    $scope.location = "Barcelona";
    $scope.enabled = false;
    $scope.condition = "";
    $scope.high = "";
    $scope.low = "";
    $scope.humidity = "";
    $scope.visibility = "";
    $scope.pressure = "";
    $scope.rising = "";
    $scope.hide = true;
    $scope.lat = 0;
    $scope.lng = 0;
    $scope.icon = {};

    navigator.geolocation.getCurrentPosition(showPosition);

    function showPosition(position) {
        $scope.lat = position.coords.latitude;
        $scope.lng = position.coords.longitude;

        var req = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.placefinder%20where%20text%3D%22" + $scope.lat
                + "%2C" + $scope.lng + "%22%20and%20gflags%3D%22R%22)%20and%20u%3D%22c%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";

        $http.get(req).success(function (response) {
            console.log(response);
            $scope.enabled = true;
            $scope.location = response.query.results.channel.location.city;
            $scope.condition = response.query.results.channel.item.forecast[0].text;
            $scope.high = response.query.results.channel.item.forecast[0].high;
            $scope.low = response.query.results.channel.item.forecast[0].low;

            $scope.humidity = response.query.results.channel.atmosphere.humidity;
            $scope.visibility = response.query.results.channel.atmosphere.visibility;
            $scope.pressure = response.query.results.channel.atmosphere.pressure;
            $scope.rising = response.query.results.channel.atmosphere.rising;

            $scope.code = response.query.results.channel.item.forecast[0].code;

            load();
        });
    }

    function load(condition) {
        var promiseGet = $weatherService.getIcons(condition);
        promiseGet.then(function (response) {
            console.log(response);
            $scope.icon = $filter('filter')(response, { title: $scope.code })[0];
        }, function (error) {
            $scope.Message = "Error " + error.status;
        });
    }
}]);