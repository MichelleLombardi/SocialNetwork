var app = angular.module("my-social-network", ["ui.router"]);

app.config(["$stateProvider", "$urlRouterProvider",

    function ($state, $url) {
        $url.otherwise("/login");
        $url.when("/home", "/home/index");

        $state
            .state("login", {
                "url": "/login",
                "templateUrl": "views/login.html",
                "controller": "LoginCtrl"
            })
            .state("home", {
                "url": "/home",
                "templateUrl": "views/home.html",
                "controller": "HomeCtrl"
            })
            .state("home.index", {
                "url": "/index",
                "templateUrl": "views/index.html",
                "controller": "IndexCtrl"
            })
            .state("home.search", {
                "url": "/search",
                "templateUrl": "views/search.html",
                "controller": "SearchCtrl"
            })
            .state("home.takePicture", {
                "url": "/take-picture",
                "templateUrl": "views/take-picture.html",
                "controller": "TakePictureCtrl"
            })
            .state("home.upload", {
                "url": "/upload",
                "templateUrl": "views/upload.html",
                "controller": "UploadCtrl"
            })
            .state("register", {
                "url": "/register",
                "templateUrl": "views/register.html",
                "controller": "RegisterCtrl"
            })
            .state("home.profile", {
                "url": "/profile",
                "templateUrl": "views/profile.html",
                "controller": "ProfileCtrl"
            });

    }
]);


app.controller("SearchCtrl", ["$scope", "$http", "$state", "$sce",

    function ($scope, $http, $state, $sce) {
        $scope.publish = [];
        $scope.signout = function () {
            window.localStorage.removeItem("token");
            $state.go('login');
        }

        $scope.searchf = function () {
             $http({
            method: "POST",
            url: "http://localhost:8080/Instagram_server/get_publishes",
            data: "type=" + "2"+"&se="+document.getElementById("inp-search").value,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            console.log(data);
            alert();
            $scope.publish = data.publishes.map(function (el) {
                if (el.media_type_publish === "image") {

                    el.media_publish = $sce.trustAsResourceUrl("http://localhost:8080/Instagram_server/get-file?path=" + el.media_publish + "&nm=" + el.title_publishs);
                } else {
                    el.media_publish = $sce.trustAsResourceUrl("http://localhost:8080/Instagram_server/get-video?path=" + el.media_publish);
                }

                return el;
            });
            console.log($scope.publish);
        });
        }
       
    }

]);


app.controller("ProfileCtrl", ["$scope", "$http", "$state",

    function ($scope, $http, $state) {
        $scope.signout = function () {
            window.localStorage.removeItem("token");
            $state.go('login');
        }

    }

]);

app.controller("RegisterCtrl", ["$scope", "$http", "$state",

    function ($scope, $http, $state) {

        if (window.localStorage.getItem("token")) {
            $state.go('home.index');
        }
        $scope.register = function () {

            $.ajax({
                url: "http://localhost:8080/Instagram_server/Signup",
                type: "POST",
                data: {
                    firstName: document.getElementById('inputn').value, // input  firt name del modal2
                    lastName: document.getElementById('inputln').value, // input last name del modal2
                    nickname: document.getElementById('inputnn').value, // input  birthday del modal2
                    email: document.getElementById('inpute').value, // input email del modal2
                    pass: document.getElementById('inputp').value // input password del modal2
                },
                success: function (data) {
                    console.log(data);
                    data = JSON.parse(data);
                    // Si no hay error
                    if (!data.error) { // si el email no existe
                        $state.go('login');
                        document.getElementById('inputn').value = "";
                        document.getElementById('inputln').value = "";
                        document.getElementById('inputnn').value = "";
                        document.getElementById('inpute').value = "";
                        document.getElementById('inputp').value = "";
                    } else {
                        var error = data.error;
                        document.getElementById("register_alert2").style.display = "block";
                        document.getElementById("register_alert2").innerHTML = error;
                        document.getElementById('inputn').value = "";
                        document.getElementById('inputln').value = "";
                        document.getElementById('inputnn').value = "";
                        document.getElementById('inpute').value = "";
                        document.getElementById('inputp').value = "";
                        console.log(error);
                    }
                },
                error: function (err) {

                    document.getElementById('inputn').value = "";
                    document.getElementById('inputln').value = "";
                    document.getElementById('inputnn').value = "";
                    document.getElementById('inpute').value = "";
                    document.getElementById('inputp').value = "";

                }
            });
        }

    }

]);

app.controller("LoginCtrl", ["$scope", "$http", "$state",

    function ($scope, $http, $state) {
        //        $state.go('home.index');
        if (window.localStorage.getItem("token")) {
            $state.go('home.index');
        }
        $scope.login = function () {
            $.ajax({
                url: "http://localhost:8080/Instagram_server/Login",
                type: "POST",
                data: {
                    nickname: document.getElementById('inputnnlogin').value, // input  birthday del modal2
                    password: document.getElementById('inputplogin').value // input password del modal2
                },
                success: function (data) {
                    console.log(data);
                    data = JSON.parse(data);
                    // Si no hay error
                    if (!data.error) { // si el email no existe
                        window.localStorage.removeItem("token");
                        if (CryptoJS.MD5(document.getElementById('inputnnlogin').value).toString() == data.token) {
                            window.localStorage.setItem("token", data.token);
                            window.localStorage.setItem("id", data.id);
                            window.localStorage.setItem("nick", data.nick);
                            $state.go('home.index');
                        }
                        document.getElementById('inputnnlogin').value = "";
                        document.getElementById('inputplogin').value = "";
                    } else {
                        var error = data.error;
                        document.getElementById("register_alert2").style.display = "block";
                        document.getElementById("register_alert2").innerHTML = error;
                        document.getElementById('inputnnlogin').value = "";
                        document.getElementById('inputplogin').value = "";
                        console.log(error);
                    }
                },
                error: function (err) {
                    document.getElementById('inputnnlogin').value = "";
                    document.getElementById('inputplogin').value = "";

                }
            });
        }
    }

]);



app.controller("HomeCtrl", ["$scope", "$http", "$state",
    function ($scope, $http, $state) {
        if (!window.localStorage.getItem("token")) {
            $state.go('login');
        }

        function onSuccess(imageData) {
            img.src = "data:image/jpeg;base64," + imageData;
        }


        function onFail(message) {
            alert('Failed because: ' + message);
        }

        $scope.takePicture = function () {
            navigator.camera.getPicture(onSuccess, onFail, {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL
            });
        }
    }
]);

app.config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
   // Allow same origin resource loads.
   'self',
   // Allow loading from our assets domain.  Notice the difference between * and **.
   'http://localhost:8080/Instagram_server/**']);
});

app.controller("IndexCtrl", ["$scope", "$http", "$state", "$sce",
    function ($scope, $http, $state, $sce) {
        if (!window.localStorage.getItem("token")) {
            $state.go('login');
        }

        var formData = new FormData();
        formData.append("type", "1");

        $http({
            method: "POST",
            url: "http://localhost:8080/Instagram_server/get_publishes",
            data: "type=" + "1",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }

        }).success(function (data) {
            console.log(data);
            $scope.publish = data.publishes.map(function (el) {
                if (el.media_type_publish === "image") {

                    el.media_publish = $sce.trustAsResourceUrl("http://localhost:8080/Instagram_server/get-file?path=" + el.media_publish + "&nm=" + el.title_publishs);
                } else {
                    el.media_publish = $sce.trustAsResourceUrl("http://localhost:8080/Instagram_server/get-video?path=" + el.media_publish);
                }

                return el;
            });
            console.log(data.publishes);
        });



                }
                ]);

app.controller("TakePictureCtrl", ["$scope", "$http",
    function ($scope, $http) {
        var img = document.getElementById('img');
    }
]);

app.controller("UploadCtrl", ["$scope", "$http",
    function ($scope, $http) {
        var label = document.getElementById("labelup");
        var vid = document.getElementById("vid");
        var img = document.getElementById('img');
        label.style.display = "block";
        vid.style.display = "none";
        img.style.display = "none";
        var filebtn = document.getElementById("myFile");
        filebtn.addEventListener("change", capturePhoto);

        function capturePhoto() {
            readURL(this);
        }

        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    var file = filebtn.files[0].type;
                    file = file.split("/");
                    file = file[0];
                    if (file == "image") {
                        label.style.display = "none";
                        img.style.display = "block";
                        $('#img').attr('src', e.target.result);
                    }
                    if (file == "audio") {
                        label.style.display = "none";
                        vid.style.display = "block";
                        $('#vid').attr('src', e.target.result);
                    }
                    if (file == "video") {
                        label.style.display = "none";
                        vid.style.display = "block";
                        $('#vid').attr('src', e.target.result);
                    }
                }

                reader.readAsDataURL(input.files[0]);
            }
        }

        $scope.upload = function () {

            var options = {
                enableHighAccuracy: true,
                maximumAge: 3600000
            }
            var locat = "";

            var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

            function onSuccess(position) {
                var geocoder;
                geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                geocoder.geocode({
                        'latLng': latlng
                    },
                    function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                                var add = results[0].formatted_address;
                                var value = add.split(",");

                                count = value.length;
                                country = value[count - 1];
                                state = value[count - 2];
                                city = value[count - 3];
                                locat = city + "," + state;
                                send();
                            } else {
                                alert("address not found");
                            }
                        } else {
                            alert("Geocoder failed due to: " + status);
                        }
                    }
                );
            };

            function onError(error) {
                alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
            }


            function send() {
                var type = filebtn.files[0].type;
                type = type.split('/');
                type = type[0];
                var formData = new FormData();
                formData.append("file", filebtn.files[0]);
                formData.append("nick", window.localStorage.getItem("nick"));
                formData.append("id", window.localStorage.getItem("id"));
                formData.append("type", type);
                formData.append("tags", "");
                formData.append("desc", document.getElementById(desc).value);
                formData.append("locat", locat);

                $http({
                    method: "POST",
                    url: "http://localhost:8080/Instagram_server/upload",
                    data: formData,
                    headers: {
                        "Content-Type": undefined
                    }

                }).success(function (data) {
                    console.log(data);
                });
            }
        }
    }
]);