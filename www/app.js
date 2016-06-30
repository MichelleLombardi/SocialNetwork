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
                url: "http://192.168.2.7:8080/Instagram_server/Signup",
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
                url: "http://192.168.2.7:8080/Instagram_server/Login",
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

app.controller("IndexCtrl", ["$scope", "$http", "$state",
    function ($scope, $http, $state) {
        if (!window.localStorage.getItem("token")) {
            $state.go('login');
        }
    }
]);

app.controller("TakePictureCtrl", ["$scope", "$http",
    function ($scope, $http) {
        var img = document.getElementById('img');
    }
]);

app.controller("UploadCtrl", ["$scope", "$http",
    function ($scope, $http) {
        var img = document.getElementById('img');
        var filebtn = document.getElementById("myFile");
        filebtn.addEventListener("change", capturePhoto);

        function capturePhoto() {
            readURL(this);
        }

        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#img').attr('src', e.target.result);
                }

                reader.readAsDataURL(input.files[0]);
            }
        }


    }
]);