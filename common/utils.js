(function () {
    app.utils = app.utils || {};

    app.utils={
        mycart :{
            cartCount: 0,
            totalPrice: 0.0,
            cart: [],
            isCartAvailable:false
        },
        queryParam : (params) => {
            return params ? "?"+ $.param(params) : "";
        },
        changeLocalization: (lang) => {
            localStorage.setItem("culture",lang);
            app.localization.set('currentCulture',lang);
        },
        en : () => {
           app.utils.changeLocalization("en")
        },
        ta :() => {
            app.utils.changeLocalization("ta")
        },
        getCart:()=> {
            $(".checkoutbtn").attr("disabled","disabled");
            app.utils.setloggedInUser();

            var cartItem = localStorage.getItem("cartItem");
            var totalPrice = localStorage.getItem("totalPrice");

            if(cartItem){
                var cart= JSON.parse(cartItem)
                let resp = {
                    cartCount: cart.length,
                    totalPrice: totalPrice,
                    cart: cart,
                    isCartAvailable: cart.length > 0
                }
                app.utils.loadCart(resp);
                return  resp;
            }else{
                $(".shopping-cart-items").empty();
                $(".totalPrice").empty();
                $(".cartCount").empty();
            }
            return app.utils.mycart;
        }
    }

    app.utils.loadCart = function(resp){
        var template = kendo.template($("#cartTemplate").html());
        $(".shopping-cart-items").html(template(resp.cart));
        $(".totalPrice").html(resp.totalPrice);
        $(".cartCount").html(resp.cartCount);

        if(Number(resp.cartCount) > 0){
            $(".checkoutbtn").removeAttr("disabled");
        }else{
            $(".checkoutbtn").attr("disabled","disabled");
        }
    }

   app.utils.getPDF = function(selector) {
        kendo.drawing.drawDOM($(selector)).then(function (group) {
            kendo.drawing.pdf.saveAs(group, "Invoice.pdf");
        });
    }

    app.utils.getFormattedDate = function(input) {
        console.log(input)
        var pattern = /(.*?)-(.*?)-(.*?)$/;
        var result = input.replace(pattern,function(match,yyyy,mm,dd){

            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

            return (dd<10?"0"+dd:dd) + " " + months[(mm-1)] + " " + yyyy;
        });

        return result;
    }


    app.utils.generateCaptchaId = function (id) {
        document.getElementById(id).innerHTML = "";
        var charsArray =
            "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var lengthOtp = 6;
        var captcha = [];
        for (var i = 0; i < lengthOtp; i++) {
            var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
            if (captcha.indexOf(charsArray[index]) == -1)
                captcha.push(charsArray[index]);
            else i--;
        }

        var canv = document.createElement("canvas");
        canv.id = id;
        canv.width = 100;
        canv.height = 50;
        var ctx = canv.getContext("2d");
        ctx.font = "25px Open Sans";
        ctx.strokeText(captcha.join(""), 0, 30);
        code = captcha.join("");
        document.getElementById(id).appendChild(canv);
        return code; // adds the canvas to the body element
    }


    app.utils.generateCaptcha = function () {
        return app.utils.generateCaptchaId("captcha")
    }

    app.utils.validateCaptcha = function(code){
        event.preventDefault();
        return document.getElementById("cpatchaTextBox").value === code ;
    }

    app.utils.loading = function (load) {
        if (load) {
            return kendo.mobile.application.showLoading();
        }

        return kendo.mobile.application.hideLoading();
    };

    app.utils.openCart= function () {
        $(".shopping-cart").fadeToggle("fast");
    }

    app.utils.encode = function (str) {
        return $.base64.btoa(str);
    }

    app.utils.decode = function (str) {
        return $.base64.atob(str, true);
    }

    app.utils.isOwner = function (dataItem) {
        return app.user.Id === dataItem.CreatedBy;
    };

    app.utils.alert = function (message) {
        const snackbar = new SnackBar;

        snackbar.make("message", [
            message,
            null,
            "bottom",
            "center"
        ], 3000);

    };

    app.utils.setloggedInUser = function(){

        $(".loginLink").removeClass("hide");
        $(".loginLink").html("Login");
        $(".loggedLink").addClass("hide");
        localStorage.removeItem("loginaction");

        if($.cookie("sid") != null){
            app.getUser(function(data){
                if(data && data.message == "customerfound"){
                    
                    $.cookie('_cust',true);
                }
                
                if($.cookie("ssup") || $.cookie("_cust")){
                    $(".loginLink").addClass("hide");
                    $(".loggedLink").removeClass("hide");
                    localStorage.setItem("loginaction","complete");
                    return true;
                }else{
                    $(".loginLink").removeClass("hide");
                    localStorage.setItem("loginaction","pending");
                    $(".loginLink").html("Complete Signup");
                }
            })
        }
        return false;
    }

    app.utils.addScript = (filename) => {
        var body = document.getElementsByTagName('body')[0];

        var script = document.createElement('script');
        script.src = filename;
        script.type = 'text/javascript';

        body.append(script);
    }

    app.utils.imageUploader = function (chooseFileSelector, formSelector, fileInputSelector) {
        var that = this;

        var fileInputChangeSelector = fileInputSelector + ':file';
        var provider = app.data.defaultProvider;

        that.callback = function(){};
        that.uri = '';
        that.file = null;

        this._chooseFileClickCordova = function () {
            var destinationType;
            var callback = that.callback;
            if (app.utils.isInSimulator()) {
                destinationType = Camera.DestinationType.DATA_URL;
                callback = function (uri) {
                    if (uri.length > app.constants.simulatorFileSizeLimit) {
                        return app.notify.info('Please select smaller image, up to 2.5MB.');
                    }

                    uri = 'data:image/jpeg;base64,' + uri;
                    that.callback(uri);
                };
            } else {
                destinationType = Camera.DestinationType.FILE_URI;
                callback = function (uri) {
                    window.resolveLocalFileSystemURL(uri, function (fileEntry) {
                        fileEntry.file(function (file) {
                            if (file.size > app.constants.deviceFileSizeLimit) {
                                return app.notify.info('The upload file limit is 10mb, try taking a picture with the front camera.');
                            }

                            return that.callback(uri);
                        }, app.notify.error);
                    }, app.notify.error);
                }
            }

            navigator.camera.getPicture(callback, app.notify.error, {
                quality: 50,
                destinationType: destinationType,
                sourceType: navigator.camera.PictureSourceType.CAMERA
            });
        };

        this._chooseFileClickDesktop = function () {
            if (app.utils.isInSimulator()) {
                return app.notify.info('Activity photos can only be uploaded from a device or a browser supporting FileReader');
            }

            $(fileInputSelector).click();
        };

        this._formSubmit = function () {
            return false;
        };

        this._fileChange = function () {
            var files = $(fileInputSelector)[0].files;
            if (!files.length) {
                return;
            }

            var file = files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                var base64 = e.target.result;
                if (base64) {
                    that.callback(base64, file);
                }
            };
        };

        this.detach = function () {
            $(formSelector).off('submit', that._formSubmit);

            if (window.cordova) {
                $(chooseFileSelector).off('click', that._chooseFileClickCordova);
            } else {
                $(chooseFileSelector).off('click', that._chooseFileClickDesktop);
                $(fileInputChangeSelector).off('change', that._fileChange);
            }
        };

        this.onImage = function (cb) {
            that.callback = function (uri, file) {
                that.uri = uri;
                that.file = file;
                return cb(uri, file);
            };
        };

        this.upload = function () {
            var picture = that.uri;
            var uploadImagePromise;

            if (!picture) {
                return Everlive._utils.successfulPromise();
            }

            var filename = app.user.Id + '_' + new Date().valueOf();
            if (window.cordova && !app.utils.isInSimulator()) {
                uploadImagePromise = provider.files.upload(picture, {
                    fileName: filename,
                    mimeType: 'image/jpeg'
                });
            } else {
                var file = that.file || {
                        type: 'image/jpeg'
                    };

                var cleanBase64 = picture.split(',')[1];
                uploadImagePromise = provider.files.applyOffline(false).create({
                    Filename: filename,
                    ContentType: file.type,
                    base64: cleanBase64
                });
            }

            return uploadImagePromise.then(function (res) {
                    var id;
                    if (res.response) {
                        var responseObject = JSON.parse(res.response);
                        id = responseObject.Result[0].Id
                    } else {
                        id = res.result.Id;
                    }

                    return id;
                })
                .catch(app.notify.error);
        };

        $(formSelector).submit(that._formSubmit);
        if (window.cordova) {
            $(chooseFileSelector).click(that._chooseFileClickCordova);
        } else {
            $(chooseFileSelector).click(that._chooseFileClickDesktop);
            $(document).on('change', fileInputChangeSelector, that._fileChange);
        }
    };

    app.utils.autoSizeTextarea = function (element) {
        element.css({
            height: element[0].scrollHeight
        });
    };

    var processedElements = [];
    app.utils.processElement = function (el) {
        setTimeout(function () {
            el.each(function (index, image) {
                if (!image.dataset.src && image.src) {
                    return app.data.defaultProvider.helpers.html.process(image).catch(app.notify.error);
                }

                //when the image is local, e.g. the default image we do not need to optimize it
                if (image.dataset.src.indexOf('default.jpg') === -1) {
                    app.data.defaultProvider.helpers.html.process(image).catch(app.notify.error);
                    if (processedElements.indexOf(image) === -1) {
                        processedElements.push(image);
                    }
                } else {
                    image.src = image.dataset.src;
                }
            });
        }); //wait for the listview element to be rendered
    };

    $(window).resize(function () {
        processedElements.forEach(function (el) {
            app.utils.processElement($(el));
        });
    });

    app.utils.processImage = function (id) {
        setTimeout(function () {
            var img = $('img[data-id="' + id + '"]');
            if (!img || !img.length) {
                return console.warn('No image to optimize with id found: ', id);
            }

            app.utils.processElement(img);
        });
    }




}());