/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

/*function addToList(){
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var lastname = document.getElementById("lastname").value;
    
    var info={
        id: id,
        name: name,
        lastname: lastname
    };
    
    var list = localStorage.getItem("list")  ? JSON.parse(localStorage.getItem("list")):[]; 
    list.push(info);
    
    localStorage.setItem("list", JSON.stringify(list));
    
    alert("se ha ingresado un valor");
}

document.getElementById("registerButton").addEventListener("click", addToList,false); //el false solo acepta un click

function showList(){
    var list = localStorage.getItem("list")  ? localStorage.getItem("list"):[]; 
    alert(list);   
}

document.getElementById("showButton").addEventListener("click", showList,false); //el false solo acepta un click

function clearStorage(){
    localStorage.removeItem("list");
}

document.getElementById("clearButton").addEventListener("click", clearStorage,false); //el false solo acepta un click

*/

function getUsers(){
    var xhr= new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.status=== 200 && xhr.readyState ===4){
            alert(xhr.responseText);
        }
    };
    
    xhr.open("GET","http://localhost:10000/user",true);
    xhr.send();
};
document.getElementById("butt").addEventListener("click", getUsers,false);