'use strict';

(function () {

    

    var app = {
        data: {},
        user: {},
        version: "v0.0.1a",
        test: true,
        baseService: "ecomm",
        servicename: "",
        localhost: "http://192.168.0.105:8081",
        baseUrl: "/",
        logoutUrl: "/",
        backslash: "/",
        api: {
            pincode: "https://api.data.gov.in/resource/04cbe4b1-2f2b-4c39-a1d5-1c2e28bc0e32?api-key=579b464db66ec23bdd00000143142bff734c48bd5244b6e4538d322c&format=json&filters[pincode]=",
            login: "/login",

        },
        data: "data",
        marker: null,
        phonepattern: /^\d{10}$/,
        htmlCnt: '<br /><img src="/img/scanner.png" style="width:50%">',
        scanner: null,
        localization: {
            defaultCulture: localStorage.getItem("culture") ? localStorage.getItem("culture") : "en",
            cultures: [{
                name: "English",
                code: "en"
            },
            {
                name: "Tamil",
                code: "ta"
            }]
        }
    };

    
    

    var bootstrap = function () {
        $(function () {
            /* if ('serviceWorker' in navigator) {
                navigator.serviceWorker
                    .register('/service-worker.js')
                    .then(function (registration) {
                        console.log(
                            'Service Worker registration successful with scope: ',
                            registration.scope
                        );
                    })
                    .catch(function (err) {
                        console.log('Service Worker registration failed: ', err);
                    });
            } */

            

            app.mobileApp = new kendo.mobile.Application(document.body, {
                name: "LMS App",
                transition: 'fade',
                skin: 'nova',
                initial: 'lms/',
                useNativeScrolling: true,
            });


        });
    };

   

    

    $(document).ready(function () {




        mdc.autoInit();
        var activatedClass = "bn-item--activated";


        $(".bn-item").bind("click", function (e) {
            let val = $(e.target).attr("data-value");
            var activatedItem = $('.' + activatedClass);
            if (activatedItem) {
                activatedItem.removeClass(activatedClass);
            }

            e.target.classList.add(activatedClass);

            if (val == 110)
                app.mobileApp.navigate("view/search.html");
            else if (val == 111)
                app.mobileApp.navigate("view/profile.html");
            else if (val == 100)
                app.mobileApp.navigate("view/dashboard.html");
            else if (val == 112)
                app.mobileApp.navigate("view/notification.html");
            else if (val == 113)
                app.mobileApp.navigate("support")

        });

    });

    app.createUrl = (type, endpoint) => {

        let url = app.baseUrl;
        if (app.test) {
            url = app.localhost;
            app.baseUrl = url;
        }
        var arr = [app.servicename, app.baseService, type, "api", endpoint];

        return arr.join(app.backslash);
    }

    app.getProductsListing = (callback) => {
        app.mobileApp.showLoading();
        app.asyncget(app.createUrl(app.gl().url.product, app.gl().url.listing), [], callback);

    }

    app.getProductCategory = (callback) => {
        app.asyncget(app.createUrl(app.gl().url.product, app.gl().url.productcategory), [], callback);
    }

    app.getProductsByCategory = (callback) => {
        app.asyncget(app.createUrl(app.gl().url.product, app.gl().url.productsByCategory), [], callback);
    }

    app.getProductById = (id, callback) => {
        app.asyncget(app.createUrl(app.gl().url.product, app.gl().url.productById), [id], callback);
    }

    app.getOtp = function (phone, callback) {
        $.cookie('phone', app.utils.encode(phone), { expires: 1, path: '/' });
        this.asyncget(app.createUrl(app.gl().url.login, app.gl().url.otp), [app.utils.encode(phone)], callback)
    }

    app.verifyUser = function (phone, callback) {
        $.cookie('phone', app.utils.encode(phone), { expires: 1, path: '/' });
        this.asyncget(app.createUrl(app.gl().url.login, app.gl().url.verifyUser), [app.utils.encode(phone)], callback)
    }

    app.verify = function (secret, callback) {
        let encryptedSecret = app.utils.encode(secret);
        let phone = $.cookie("phone");
        this.asyncget(app.createUrl(app.gl().url.login, app.gl().url.verify), [phone, encryptedSecret], callback);
    }

    app.registerUser = function (data, callback, errcallback) {
        this.asyncpost(app.createUrl(app.gl().url.cust, app.gl().url.register) + "/" + $.cookie("sid"), data, callback, errcallback);
    }

    app.placeOrder = function (data, callback, errcallback) {
        this.asyncpost(app.createUrl(app.gl().url.order, app.gl().url.placeorder) + "/" + $.cookie("sid"), data, callback, errcallback);
    }

    app.trackSingleOrder = function (data, callback, errcallback) {
        this.asyncpost(app.createUrl(app.gl().url.order, app.gl().url.trackOrder) + "/" + $.cookie("sid"), data, callback, errcallback);
    }


    app.trackOrder = function (phone,callback) {
        this.asyncget(app.createUrl(app.gl().url.order, app.gl().url.trackOrder), [ app.utils.encode(phone)], callback);
    }

    app.showOrders = function (status,callback) {
        this.asyncget(app.createUrl(app.gl().url.order, app.gl().url.myorders), [ $.cookie("sid"), status], callback);
    }

    app.getPendingOrders = function (callback) {
        this.asyncget(app.createUrl(app.gl().url.admin, app.gl().url.getPendingOrders), [ $.cookie("sid")], callback);
    }

    app.getAllOrders = function (callback) {
        this.asyncget(app.createUrl(app.gl().url.admin, app.gl().url.getAllOrders), [ $.cookie("sid")], callback);
    }

    app.getCustAddress = function (custId,callback) {
        this.asyncget(app.createUrl(app.gl().url.admin, app.gl().url.getCustAddress), [ $.cookie("sid"),custId], callback);
    }

    app.getOrderById = function (oid,callback) {
        this.asyncget(app.createUrl(app.gl().url.admin, app.gl().url.getOrderById), [ $.cookie("sid"),oid], callback);
    }

    app.getUser = function (callback) {
        let sid = $.cookie("sid");
        if (sid != undefined)
            this.asyncget(app.createUrl(app.gl().url.cust, app.gl().url.getUser), [sid], callback);
    }

    app.updateAddress = function (data, callback, errcallback) {
        this.asyncpost(app.createUrl(app.gl().url.cust, app.gl().url.updateAddress) + "/" + $.cookie("sid"), data, callback, errcallback);
    }

    app.logout = function () {
        var culture = localStorage.getItem("culture");
        localStorage.clear();
        $.removeCookie('uid', { expires: -1, path: '/' });
        $.removeCookie('sid', { expires: -1, path: '/' });
        $.removeCookie('_cust', { expires: -1, path: '/' });
        $.removeCookie('phone', { expires: -1, path: '/' });
        $.removeCookie('ssup', { expires: -1, path: '/' });
        if(!culture || culture == null){
            culture ="en";
        }
        localStorage.setItem("culture", culture);
        app.utils.getCart();
        app.navigation.home();
    };

    app.gl = function () {
        return app.localization.get('strings')[app.localization.currentCulture];
    }



    app.listViewClick = function _listViewClick(item) {
        var tabstrip = app.mobileApp.view().footer.find('.km-tabstrip').data('kendoMobileTabStrip');
        tabstrip.clear();
    };

    app.redirect = function (type) {
        app.redirect(type, null);
    }

    app.chunk = (arr, size) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
        );

    app.redirect = function (type, params) {
        let queryParam = "?";
        if (params) {
            queryParam += $.param(params);
        }
        app.mobileApp.navigate("view/" + type + ".html" + queryParam);
    }







    app.upload = function (formElement, success, failure, progress) {
        // You can directly create form data from the form element
        // (Or you could get the files from input element and append them to FormData as we did in vanilla javascript)
        var formData = new FormData(formElement);

        $.ajax({
            xhr: function () {
                var xhr = new window.XMLHttpRequest();

                xhr.upload.addEventListener("progress", progress, false);

                return xhr;
            },
            type: "POST",
            enctype: 'multipart/form-data',
            url: this.baseUrl + app.api.uploadFile + "/" + $.cookie('phone'),
            data: formData,
            processData: false,
            contentType: false,
            success: success,
            error: failure

        });
    }

    app.onspotDonation = function (formElement, desc, success, failure, progress) {
        // You can directly create form data from the form element
        // (Or you could get the files from input element and append them to FormData as we did in vanilla javascript)
        var formData = new FormData(formElement);

        $.ajax({
            xhr: function () {
                var xhr = new window.XMLHttpRequest();

                xhr.upload.addEventListener("progress", progress, false);

                return xhr;
            },
            type: "POST",
            enctype: 'multipart/form-data',
            url: this.baseUrl + app.api.onspotdonation + "/" + app.decode($.cookie('phone')) + "/" + desc + "/" + $.cookie('pincode'),
            data: formData,
            processData: false,
            contentType: false,
            success: success,
            error: failure

        });
    }

    app.capDonation = function (formElement, id, fileName, success, failure, progress) {
        // You can directly create form data from the form element
        // (Or you could get the files from input element and append them to FormData as we did in vanilla javascript)
        var formData = new FormData(formElement);

        $.ajax({
            xhr: function () {
                var xhr = new window.XMLHttpRequest();

                xhr.upload.addEventListener("progress", progress, false);

                return xhr;
            },
            type: "POST",
            enctype: 'multipart/form-data',
            url: this.baseUrl + app.api.captureDonation + "/" + id + "/" + fileName,
            data: formData,
            processData: false,
            contentType: false,
            success: success,
            error: failure

        });
    }

    app.capWish = function (formElement, id, fileName, success, failure, progress) {
        // You can directly create form data from the form element
        // (Or you could get the files from input element and append them to FormData as we did in vanilla javascript)
        var formData = new FormData(formElement);

        $.ajax({
            xhr: function () {
                var xhr = new window.XMLHttpRequest();

                xhr.upload.addEventListener("progress", progress, false);

                return xhr;
            },
            type: "POST",
            enctype: 'multipart/form-data',
            url: this.baseUrl + app.api.captureRequest + "/" + id + "/" + fileName,
            data: formData,
            processData: false,
            contentType: false,
            success: success,
            error: failure

        });
    }

    app.postData = function (url, data) {
        var result = {};
        $.ajax({
            async: false,
            type: "POST",
            url: this.baseUrl + url,
            data: JSON.stringify(data),
            contentType: 'application/json',
            complete: function (jqxhr, txt_status) {
                if (result != null && result != "" && result != undefined) {
                    try {
                        result = jqxhr.responseText;
                        console.log(result);
                        result = typeof result != "object" ? JSON.parse(result) : result;
                    } catch (e) {
                        result = { "message": app.gl().error.E01 }
                    }
                }
            }
        });
        return result;
    }



    app.asyncpost = function (url, data, callback, errcallback) {
        $.ajax({
            type: "POST",
            url: this.baseUrl + url,
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: callback,
            error: errcallback
        });
    }



    app.getJqxhr = function (jqxhr) {
        let data = {};

        if (jqxhr != null && jqxhr != "" && jqxhr != undefined) {
            try {
                let result = jqxhr.responseText;
                data = typeof result != "object" ? JSON.parse(result) : result;
            } catch (e) {
                console.log(e);
            }
        }
        return data;
    }

    app.getPinlist = function (pin, callback) {
        $.ajax({

            url: this.api.pincode + pin,
            data: {},
            type: 'GET',
            crossDomain: true,
            dataType: 'json',
            complete: callback
        });
    }

    app.asyncget = function (url, params, callback) {
        if (params) {
            params.forEach(element => {
                if (element != "")
                    url += "/" + element;
            });
        }
        $.get(this.baseUrl + url, {}, callback).fail(function () {
            app.utils.alert(app.gl().message.techincalerror);
        });;
    }

    app.getData = function (url) {
        var result = {};
        $.ajax({
            async: false,
            type: "GET",
            url: this.baseUrl + url,
            complete: function (jqxhr, txt_status) {
                if (jqxhr != null && jqxhr != "" && jqxhr != undefined) {
                    try {
                        result = jqxhr.responseText;
                        console.log(result);
                        result = typeof result != "object" ? JSON.parse(result) : result;
                    } catch (e) {
                        console.log(e);
                        result = { "message": app.gl().error.E01 }
                    }
                }
            }
        });
        return result;
    }

    app.getUserPref = function (callback) {
        let phone = $.cookie('phone');
        let sid = $.cookie('sid');
        if (sid != undefined)
            this.asyncget(this.api.userpref, [sid], callback);
        else {
            app.utils.alert(app.gl().message.sessioninvalid);
            setTimeout(() => {
                app.logout();
            }, 2000);
        }
    }

    app.donations = function (callback) {
        let phone = $.cookie('phone');
        let sid = $.cookie('sid');
        this.asyncget(this.api.donations, [sid], callback);
    }

    app.getWishes = function (callback) {
        let phone = $.cookie('phone');
        let sid = $.cookie('sid');
        this.asyncget(this.api.getWishes, [app.decode(sid)], callback);
    }



    app.donateItem = function (data, callback, errcallback) {
        this.asyncpost(this.api.donate, data, callback, errcallback);
    }

    app.saveDonate = function (data, callback, errcallback) {
        this.asyncpost(this.api.saveDonate, data, callback, errcallback);
    }

    app.saveWish = function (data, callback, errcallback) {
        this.asyncpost(this.api.saveWishlist, data, callback, errcallback);
    }

    app.requestItem = function (data, callback, errcallback) {
        this.asyncpost(this.api.reqeustItem, data, callback, errcallback);
    }

    


    app.fallbackCopyTextToClipboard = function (text, message) {
        var textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            var successful = document.execCommand('copy');
            var msg = successful ? message : 'Copy failed';
            app.utils.alert(msg);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }

        document.body.removeChild(textArea);
    }

    app.copyText = function (text, msg) {
        if (!navigator.clipboard) {
            app.fallbackCopyTextToClipboard(text, msg);
            return;
        }
        navigator.clipboard.writeText(text).then(function () {
            app.utils.alert(msg)
        }, function (err) {
            console.error('Async: Could not copy text: ', err);
        });
    }


    app.getUrl = function (url, callback) {
        let linkRequest = {
            destination: url
        }

        let requestHeaders = {
            "Content-Type": "application/json",
            "apikey": "ad1039f2501c4e5187ba014edf8d20cf"
        }

        $.ajax({
            url: "https://api.rebrandly.com/v1/links",
            type: "post",
            data: JSON.stringify(linkRequest),
            headers: requestHeaders,
            dataType: "json",
            success: callback
        });
    }

    if (window.cordova) {
        document.addEventListener('deviceready', function () {
            if (navigator && navigator.splashscreen) {
                navigator.splashscreen.hide();
            }
            bootstrap();
        }, false);
    } else {
        bootstrap();
    }



    app.keepActiveState = function _keepActiveState(item) {
        var currentItem = item;
        $('#navigation-container li.active').removeClass('active');
        currentItem.addClass('active');
    };

    window.app = app;

    app.isOnline = function () {
        if (!navigator || !navigator.connection) {
            return true;
        } else {
            return navigator.connection.type !== 'none';
        }
    };

    app.openLink = function (url) {
        if (url.substring(0, 4) === 'geo:' && device.platform === 'iOS') {
            url = 'http://maps.apple.com/?ll=' + url.substring(4, url.length);
        }

        window.open(url, '_system');
        if (window.event) {
            window.event.preventDefault && window.event.preventDefault();
            window.event.returnValue = false;
        }
    };

    app.showPosition = function (position) {
        console.log(position);
        app.utils.alert("Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude);
    }

    app.showError = function (error) {
        localStorage.removeItem("latitude");
        localStorage.removeItem("longitude");
        switch (error.code) {
            case error.PERMISSION_DENIED:
                app.utils.alert("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                app.utils.alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                app.utils.alert("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                app.utils.alert("An unknown error occurred.");
                break;
        }
    }

    app.getGeolocation = function (callback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(callback, this.showError);
        } else {
            app.utils.alert("Geolocation is not supported by this browser.");
            return null;
        }
    }

    app.searchbyaddress = function (ele, query) {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZGhhbmFzZWthcjAxIiwiYSI6ImNrOG1tZXJtODBkZWIzbm5zeWdvcHA2aWgifQ.zRQHk7hqLH_g3iVXRMxvnw';
        var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
        mapboxClient.geocoding
            .forwardGeocode({
                query: query,
                autocomplete: false,
                limit: 1
            })
            .send()
            .then(function (response) {
                if (
                    response &&
                    response.body &&
                    response.body.features &&
                    response.body.features.length
                ) {
                    var feature = response.body.features[0];

                    var map = new mapboxgl.Map({
                        container: ele,
                        style: 'mapbox://styles/mapbox/streets-v11',
                        center: feature.center,
                        zoom: 14
                    });
                    map.addControl(new mapboxgl.NavigationControl());

                    app.marker = new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
                    var lngLat = app.marker.getLngLat();
                    localStorage.setItem("latitude", lngLat.lat)
                    localStorage.setItem("longitude", lngLat.lng)

                    map.on('click', (e) => {
                        console.log(e);
                        var coords = `lat: ${e.lngLat.lat} <br> lng: ${e.lngLat.lng}`;
                        if (app.marker)
                            app.marker.remove();
                        // create the popup
                        var popup = new mapboxgl.Popup().setText(coords);

                        // create the marker
                        app.marker = new mapboxgl.Marker()
                            .setLngLat(e.lngLat)
                            .setPopup(popup)
                            .addTo(map);
                        var lngLat = app.marker.getLngLat();
                        localStorage.setItem("latitude", lngLat.lat)
                        localStorage.setItem("longitude", lngLat.lng)
                    });


                }
            });

        $(".mapboxgl-ctrl-geocoder--icon-search").attr("style", "position: absolute;top: 13px;right: 12px;width: 23px;height: 23px;");
    }

    app.searchMap = function (ele, result) {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZGhhbmFzZWthcjAxIiwiYSI6ImNrOG1tZXJtODBkZWIzbm5zeWdvcHA2aWgifQ.zRQHk7hqLH_g3iVXRMxvnw';

        var map = new mapboxgl.Map({
            container: ele,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [80.27, 13.09],
            zoom: 13
        });
        var geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            localGeocoder: app.coordinatesGeocoder,
            zoom: 4,
            placeholder: 'Search your Nearest Location',
            mapboxgl: mapboxgl
        })

        map.addControl(geocoder);
        map.addControl(new mapboxgl.NavigationControl());
        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            })
        );


        map.on('load', function () {
            geocoder.on('result', function (ev) {
                var styleSpec = ev.result;
                var styleSpecText = JSON.stringify(styleSpec, null, 2);

                localStorage.setItem("map", styleSpec.place_name);
                localStorage.setItem("placeType", styleSpec.place_type[0]);
                localStorage.setItem("landmark", styleSpec.center);

                app.marker = new mapboxgl.Marker()
                    .setLngLat(styleSpec.center)
                    .addTo(map)
                var lngLat = app.marker.getLngLat();
                localStorage.setItem("latitude", lngLat.lat)
                localStorage.setItem("longitude", lngLat.lng)


            });
        });

        map.on('click', (e) => {
            console.log(e);
            var coords = `lat: ${e.lngLat.lat} <br> lng: ${e.lngLat.lng}`;
            if (app.marker)
                app.marker.remove();
            // create the popup
            var popup = new mapboxgl.Popup().setText(coords);

            // create the marker
            app.marker = new mapboxgl.Marker()
                .setLngLat(e.lngLat)
                .setPopup(popup)
                .addTo(map);
            var lngLat = app.marker.getLngLat();
            localStorage.setItem("latitude", lngLat.lat)
            localStorage.setItem("longitude", lngLat.lng)
        });
        $(".mapboxgl-ctrl-geocoder--icon-search").attr("style", "position: absolute;top: 13px;right: 12px;width: 23px;height: 23px;");
    }

    app.coordinatesGeocoder = function (query) {

        // match anything which looks like a decimal degrees coordinate pair
        var matches = query.match(/^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i);
        if (!matches) {
            return null;
        }

        function coordinateFeature(lng, lat) {
            return {
                center: [lng, lat],
                geometry: {
                    type: 'Point',
                    coordinates: [lng, lat]
                },
                place_name: 'Lat: ' + lat + ' Lng: ' + lng,
                place_type: ['coordinate'],
                properties: {},
                type: 'Feature'
            };
        }

        var coord1 = Number(matches[1]);
        var coord2 = Number(matches[2]);
        var geocodes = [];

        if (coord1 < -90 || coord1 > 90) {
            // must be lng, lat
            geocodes.push(coordinateFeature(coord1, coord2));
        }

        if (coord2 < -90 || coord2 > 90) {
            // must be lat, lng
            geocodes.push(coordinateFeature(coord2, coord1));
        }

        if (geocodes.length === 0) {
            // else could be either lng, lat or lat, lng
            geocodes.push(coordinateFeature(coord1, coord2));
            geocodes.push(coordinateFeature(coord2, coord1));
        }

        console.log(geocodes);

        return geocodes;
    };

    /// start appjs functions
    /// end appjs functions
    app.showFileUploadName = function (itemViewName) {
        $('.' + itemViewName).off('change', 'input[type=\'file\']').on('change', 'input[type=\'file\']', function (event) {
            var target = $(event.target),
                inputValue = target.val(),
                fileName = inputValue.substring(inputValue.lastIndexOf('\\') + 1, inputValue.length);

            $('#' + target.attr('id') + 'Name').text(fileName);
        });

    };

    app.clearFormDomData = function (formType) {
        $.each($('.' + formType).find('input:not([data-bind]), textarea:not([data-bind])'), function (key, value) {
            var domEl = $(value),
                inputType = domEl.attr('type');

            if (domEl.val().length) {

                if (inputType === 'file') {
                    $('#' + domEl.attr('id') + 'Name').text('');
                }

                domEl.val('');
            }
        });
    };




    /// start kendo binders
    kendo.data.binders.widget.buttonText = kendo.data.Binder.extend({
        init: function (widget, bindings, options) {
            kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
        },
        refresh: function () {
            var that = this,
                value = that.bindings["buttonText"].get();

            $(that.element).text(value);
        }
    });
    /// end kendo binders
}());









