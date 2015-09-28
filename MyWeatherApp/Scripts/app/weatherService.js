App.service('$weatherService', function ($q, $http) {
    function manageQueryStringParameter(paramToRetrieve) {
        var params =
        document.URL.split("?")[1].split("&");
        var strParams = "";
        for (var i = 0; i < params.length; i = i + 1) {
            var singleParam = params[i].split("=");
            if (singleParam[0] == paramToRetrieve) {
                return decodeURIComponent(singleParam[1]);
            }
        }
    }

    var hostWebUrl = manageQueryStringParameter('SPHostUrl');
    var appWebUrl = manageQueryStringParameter('SPAppWebUrl');

    this.getIcons = function (condition) {
        var deferred = $q.defer();
        var ctx = new SP.ClientContext.get_current();
        var appCtxSite = new SP.AppContextSite(ctx, hostWebUrl);
        var web = appCtxSite.get_web();

        var list = web.get_lists().getByTitle("WeatherIcons");
        var items = list.getItems(new SP.CamlQuery());
        ctx.load(list);
        ctx.load(items);

        ctx.executeQueryAsync(
    Function.createDelegate(this, function () {
        console.log("executing");
        var enumerator = items.getEnumerator();
        var Array = [];
        while (enumerator.moveNext()) {
            var currentItem = enumerator.get_current();
            var filename = currentItem.get_item('FileLeafRef');
            filename = hostWebUrl + '/WeatherIcons/' + filename;
            Array.push({
                id: currentItem.get_item('ID'),
                title: currentItem.get_item('Title'),
                src: filename
            });
        }
        deferred.resolve(Array);
    }),
    Function.createDelegate(this, function (sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
        deferred.reject('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    })
);

        return deferred.promise;
    }

});