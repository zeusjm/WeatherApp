<%@ Page Language="C#" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<WebPartPages:AllowFraming ID="AllowFraming" runat="server" />

<html>
<head>
    <title></title>

    <script type="text/javascript" src="/_layouts/15/MicrosoftAjax.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <script type="text/javascript" src="../Scripts/angular.min.js"></script>
    <script type="text/javascript" src="../Scripts/app/app.js"></script>
    <script type="text/javascript" src="../Scripts/app/weatherService.js"></script>
    <script type="text/javascript" src="../Scripts/app/weatherController.js"></script>

    <script type="text/javascript">
        // Set the style of the client web part page to be consistent with the host web.
        (function () {
            'use strict';

            var hostUrl = '';
            if (document.URL.indexOf('?') != -1) {
                var params = document.URL.split('?')[1].split('&');
                for (var i = 0; i < params.length; i++) {
                    var p = decodeURIComponent(params[i]);
                    if (/^SPHostUrl=/i.test(p)) {
                        hostUrl = p.split('=')[1];
                        document.write('<link rel="stylesheet" href="' + hostUrl + '/_layouts/15/defaultcss.ashx" />');
                        break;
                    }
                }
            }
            if (hostUrl == '') {
                document.write('<link rel="stylesheet" href="/_layouts/15/1033/styles/themable/corev15.css" />');
            }
        })();
    </script>
</head>
<body>
    <div ng-app="weather">
        <div ng-controller="WeatherCtrl">
            <div ng-hide="!enabled">
                <div class="col-xs-2 col-sm-1">
                    <img src="{{icon.src}}" class="img-responsive" />
                </div>
                <div class="col-xs-10 col-sm-11">
                    <h3>{{location}}</h3>
                    <p>{{condition}} High: {{high}}ºC  Low: {{low}}ºC</p>
                    <a href="#" ng-click="hide = !hide">See more..</a>
                    <div ng-hide="hide">
                        <p>Humidity: {{humidity}}</p>
                        <p>Pressure: {{pressure}}</p>
                        <p>Rising: {{humidity}}</p>
                        <p>Visibility: {{visibility}}</p>
                    </div>
                </div>
            </div>
            <p ng-hide="enabled">
                Geolocation not enabledkfkfkfkf
            </p>
        </div>
    </div>
</body>
</html>
