(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{qh0f:function(e,t,i){"use strict";i.r(t);var n=i("CcnG"),a=function(){return function(){}}(),r=i("pMnS"),o=i("mrSG"),s=function(){function e(e,t,i){this._mimeType=null,this._imageAsBase64=null,this._imageAsDataUrl=null,this._imageData=null,this._mimeType=t,this._imageAsDataUrl=e,this._imageData=i}return e.getDataFromDataUrl=function(e,t){return e.replace("data:"+t+";base64,","")},Object.defineProperty(e.prototype,"imageAsBase64",{get:function(){return this._imageAsBase64?this._imageAsBase64:this._imageAsBase64=e.getDataFromDataUrl(this._imageAsDataUrl,this._mimeType)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"imageAsDataUrl",{get:function(){return this._imageAsDataUrl},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"imageData",{get:function(){return this._imageData},enumerable:!0,configurable:!0}),e}(),c=function(){function e(){}return e.getAvailableVideoInputs=function(){return navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices?new Promise((function(e,t){navigator.mediaDevices.enumerateDevices().then((function(t){e(t.filter((function(e){return"videoinput"===e.kind})))})).catch((function(e){t(e.message||e)}))})):Promise.reject("enumerateDevices() not supported.")},e}(),u=function(){function e(){this.width=640,this.height=480,this.videoOptions=t.DEFAULT_VIDEO_OPTIONS,this.allowCameraSwitch=!0,this.captureImageData=!1,this.imageType=t.DEFAULT_IMAGE_TYPE,this.imageQuality=t.DEFAULT_IMAGE_QUALITY,this.imageCapture=new n.m,this.initError=new n.m,this.imageClick=new n.m,this.cameraSwitched=new n.m,this.availableVideoInputs=[],this.videoInitialized=!1,this.activeVideoInputIndex=-1,this.mediaStream=null,this.activeVideoSettings=null}var t;return t=e,Object.defineProperty(e.prototype,"trigger",{set:function(e){var t=this;this.triggerSubscription&&this.triggerSubscription.unsubscribe(),this.triggerSubscription=e.subscribe((function(){t.takeSnapshot()}))},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"switchCamera",{set:function(e){var t=this;this.switchCameraSubscription&&this.switchCameraSubscription.unsubscribe(),this.switchCameraSubscription=e.subscribe((function(e){"string"==typeof e?t.switchToVideoInput(e):t.rotateVideoInput(!1!==e)}))},enumerable:!0,configurable:!0}),e.getMediaConstraintsForDevice=function(e,t){var i=t||this.DEFAULT_VIDEO_OPTIONS;return e&&(i.deviceId={exact:e}),i},e.getDeviceIdFromMediaStreamTrack=function(e){if(e.getSettings&&e.getSettings()&&e.getSettings().deviceId)return e.getSettings().deviceId;if(e.getConstraints&&e.getConstraints()&&e.getConstraints().deviceId){var i=e.getConstraints().deviceId;return t.getValueFromConstrainDOMString(i)}},e.getFacingModeFromMediaStreamTrack=function(e){if(e){if(e.getSettings&&e.getSettings()&&e.getSettings().facingMode)return e.getSettings().facingMode;if(e.getConstraints&&e.getConstraints()&&e.getConstraints().facingMode){var i=e.getConstraints().facingMode;return t.getValueFromConstrainDOMString(i)}}},e.isUserFacing=function(e){var i=t.getFacingModeFromMediaStreamTrack(e);return!!i&&"user"===i.toLowerCase()},e.getValueFromConstrainDOMString=function(e){if(e){if(e instanceof String)return String(e);if(Array.isArray(e)&&Array(e).length>0)return String(e[0]);if("object"==typeof e){if(e.exact)return String(e.exact);if(e.ideal)return String(e.ideal)}}return null},e.prototype.ngAfterViewInit=function(){var e=this;this.detectAvailableDevices().then((function(){e.switchToVideoInput(null)})).catch((function(t){e.initError.next({message:t}),e.switchToVideoInput(null)}))},e.prototype.ngOnDestroy=function(){this.stopMediaTracks(),this.unsubscribeFromSubscriptions()},e.prototype.takeSnapshot=function(){var e=this.nativeVideoElement,i={width:this.width,height:this.height};e.videoWidth&&(i.width=e.videoWidth,i.height=e.videoHeight);var n=this.canvas.nativeElement;n.width=i.width,n.height=i.height;var a=n.getContext("2d");a.drawImage(e,0,0);var r=this.imageType?this.imageType:t.DEFAULT_IMAGE_TYPE,o=n.toDataURL(r,this.imageQuality?this.imageQuality:t.DEFAULT_IMAGE_QUALITY),c=null;this.captureImageData&&(c=a.getImageData(0,0,n.width,n.height)),this.imageCapture.next(new s(o,r,c))},e.prototype.rotateVideoInput=function(e){this.availableVideoInputs&&this.availableVideoInputs.length>1&&this.switchToVideoInput(this.availableVideoInputs[(this.activeVideoInputIndex+(e?1:this.availableVideoInputs.length-1))%this.availableVideoInputs.length].deviceId)},e.prototype.switchToVideoInput=function(e){this.videoInitialized=!1,this.stopMediaTracks(),this.initWebcam(e,this.videoOptions)},e.prototype.videoResize=function(){},Object.defineProperty(e.prototype,"videoWidth",{get:function(){var e=this.getVideoAspectRatio();return Math.min(this.width,this.height*e)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"videoHeight",{get:function(){var e=this.getVideoAspectRatio();return Math.min(this.height,this.width/e)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"videoStyleClasses",{get:function(){var e="";return this.isMirrorImage()&&(e+="mirrored "),e.trim()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"nativeVideoElement",{get:function(){return this.video.nativeElement},enumerable:!0,configurable:!0}),e.prototype.getVideoAspectRatio=function(){var e=this.nativeVideoElement;return e.videoWidth&&e.videoWidth>0&&e.videoHeight&&e.videoHeight>0?e.videoWidth/e.videoHeight:this.width/this.height},e.prototype.initWebcam=function(e,i){var n=this,a=this.nativeVideoElement;if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){var r=t.getMediaConstraintsForDevice(e,i);navigator.mediaDevices.getUserMedia({video:r}).then((function(e){n.mediaStream=e,a.srcObject=e,a.play(),n.activeVideoSettings=e.getVideoTracks()[0].getSettings();var i=t.getDeviceIdFromMediaStreamTrack(e.getVideoTracks()[0]);n.cameraSwitched.next(i),n.detectAvailableDevices().then((function(){n.activeVideoInputIndex=i?n.availableVideoInputs.findIndex((function(e){return e.deviceId===i})):-1,n.videoInitialized=!0})).catch((function(){n.activeVideoInputIndex=-1,n.videoInitialized=!0}))})).catch((function(e){n.initError.next({message:e.message,mediaStreamError:e})}))}else this.initError.next({message:"Cannot read UserMedia from MediaDevices."})},e.prototype.getActiveVideoTrack=function(){return this.mediaStream?this.mediaStream.getVideoTracks()[0]:null},e.prototype.isMirrorImage=function(){if(!this.getActiveVideoTrack())return!1;var e="auto";switch(this.mirrorImage&&("string"==typeof this.mirrorImage?e=String(this.mirrorImage).toLowerCase():this.mirrorImage.x&&(e=this.mirrorImage.x.toLowerCase())),e){case"always":return!0;case"never":return!1}return t.isUserFacing(this.getActiveVideoTrack())},e.prototype.stopMediaTracks=function(){this.mediaStream&&this.mediaStream.getTracks&&this.mediaStream.getTracks().forEach((function(e){return e.stop()}))},e.prototype.unsubscribeFromSubscriptions=function(){this.triggerSubscription&&this.triggerSubscription.unsubscribe(),this.switchCameraSubscription&&this.switchCameraSubscription.unsubscribe()},e.prototype.detectAvailableDevices=function(){var e=this;return new Promise((function(t,i){c.getAvailableVideoInputs().then((function(i){e.availableVideoInputs=i,t(i)})).catch((function(t){e.availableVideoInputs=[],i(t)}))}))},e.DEFAULT_VIDEO_OPTIONS={facingMode:"environment"},e.DEFAULT_IMAGE_TYPE="image/jpeg",e.DEFAULT_IMAGE_QUALITY=.92,e}(),l=function(){return function(){}}(),g=i("Ip0R"),h=n.rb({encapsulation:0,styles:[".webcam-wrapper[_ngcontent-%COMP%]{display:inline-block;position:relative;line-height:0}.webcam-wrapper[_ngcontent-%COMP%]   video.mirrored[_ngcontent-%COMP%]{transform:scale(-1,1)}.webcam-wrapper[_ngcontent-%COMP%]   canvas[_ngcontent-%COMP%]{display:none}.webcam-wrapper[_ngcontent-%COMP%]   .camera-switch[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.1);background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAE9UlEQVR42u2aT2hdRRTGf+cRQqghSqihdBFDkRISK2KDfzDWxHaRQHEhaINKqa1gKQhd6EZLN+IidCH+Q0oWIkVRC21BQxXRitVaSbKoJSGtYGoK2tQ/tU1jY5v0c5F54Xl7b/KSO/PyEt+3e5f75p7zzZwzZ74zUEIJJfyfYaEGllQGVAGZlENdBy6Z2cSiYFTSKkkfS/pH/nBF0kFJdUW9AiRVASeAukD8DgNrzOySrwEzng18KaDzALXuG8W3AiStAvqBisBRNg40mtlPxbYCOgvgPO4bncWW+JpVeDQXRQhIygDfA00F5r0XuNfMrgclQFI98DDQCNQA5ZFXqoCWBVp8XwHRHeEqcN7loy/NbHBesyqpQ1KfFj/6nC+ZvFaApFrgPaCZpYVvgCfNbDiRAElNwGFg+RIt/X8H2s2s9wYCJDUAR4HqJX7++RN40MwGpgmQVAH0AQ2BPz4AHHPl8nBOAqtyFWQjsA6oL4Ada81sPDv7uwImod8kvSJp9RyS8O2SXnb/DYVd2Y9VSroQ4ANXJO2WVJmixqh0kzMWwL4LkiqRtDnA4D1zmfE8j9g9AezcnAHaPcfXdbfdnPZ2Yps6+DwAvO/Z1naTdApY7Xng48BDZnY1MpMVQBuw3iXc5Tnb0wBwBPjUzP6eoezuArZ6svM0geJLkvZEYnl3nkntoqROSbckSW2Suj3ZOIangc7GPJuUtNGdFIfmMeavktoSSKiW9LMPw30Q8JqkekmjCbOZRhuclLQjgYSNxUBAj6RyZ9ATgUJpUtJTCSR8vpAEXHAyWK5BXYFIGHOlepSAloUk4NEYgyoknQhEwhFJ0e8h6VSaQeerCb5uZgdi9utxYBNwOUD93hIVXswM4INCi6K9wAszFC2DwLOBDjHbYp59karIUnRdzYy/3ClqVklaUhfwTICj7K25OqA7a4wWagVsm4Me/xzwg2cCqqONFzO7DPxSCAJi436GUBgHHguQD2oTlJ55oSzP9ybccsttSJw1szdjFOSnI/8dTCGZHwcORp4Nx7y3B1iZ8/sm4MW8/Euxg5wIsS/HaAp3zeP4/G7obRDXI4jiTIA22H7Xdc7X+S3A5lC7QBQ357aq3VAjCeSkwUfAJrfvz+R8A9ADLAtZB+TinpjC5JMA+//jwPZZnF8G7J+L8z4IWB/zbG+gIujVWfLBW/NStVMmqaG4POJRsIjix7h8IGnLQuoBbQki5sVAJHyYm7YkNaRRtXwQ8G1cHpX0iKRrgUjYno17Sf0LrQhJUkdCeHWkVITGJI0k1QeS3ikGSUzOyJUJJNznYneuOCnpTldcxa2kP3xJYqOeSDjqZG8ShJLnE8TTuMS6Iyu1BW7djZqkfo9N0QOuYJmYQddfB7RG+gLTNzqAY9FrL+5/nwEbvDdJJe3zzOrhNP3AWRqmk55t3ZcBuj3b2gb0Sbrbo/NNzk7fFzu7s/E5EiC+rrmeQU0Kx2skvRFoOx2ZzlmSdgbsw49JetvtBpk8nM64d/cGbNtJ0s7cGyJlwHeEv+t3nqnLSgPAUOSGyG3AHUxdzqoJbEcvcL+ZTeTeEapzJKxgaeOcc/7Mf06D7kFrguS0VDAMtGadv+E47DT9tcChJej8ISfpD+abgTe45uOkFi8mnQ+JBVQ+d4VXuOptjavcyot8pq86mfwk8LWZnaOEEkoooYQSSojDv8AhQNeGfe0jAAAAAElFTkSuQmCC);background-repeat:no-repeat;border-radius:5px;position:absolute;right:13px;top:10px;height:48px;width:48px;background-size:80%;cursor:pointer;background-position:center;transition:background-color .2s}.webcam-wrapper[_ngcontent-%COMP%]   .camera-switch[_ngcontent-%COMP%]:hover{background-color:rgba(0,0,0,.18)}"],data:{}});function d(e){return n.Pb(0,[(e()(),n.tb(0,0,null,null,0,"div",[["class","camera-switch"]],null,[[null,"click"]],(function(e,t,i){var n=!0;return"click"===t&&(n=!1!==e.component.rotateVideoInput(!0)&&n),n}),null,null))],null,null)}function p(e){return n.Pb(0,[n.Lb(402653184,1,{video:0}),n.Lb(402653184,2,{canvas:0}),(e()(),n.tb(2,0,null,null,4,"div",[["class","webcam-wrapper"]],null,[[null,"click"]],(function(e,t,i){var n=!0;return"click"===t&&(n=!1!==e.component.imageClick.next()&&n),n}),null,null)),(e()(),n.tb(3,0,[[1,0],["video",1]],null,0,"video",[["autoplay",""],["muted",""],["playsinline",""]],[[8,"width",0],[8,"height",0],[8,"className",0]],[[null,"resize"]],(function(e,t,i){var n=!0;return"resize"===t&&(n=!1!==e.component.videoResize()&&n),n}),null,null)),(e()(),n.ib(16777216,null,null,1,null,d)),n.sb(5,16384,null,0,g.k,[n.O,n.L],{ngIf:[0,"ngIf"]},null),(e()(),n.tb(6,0,[[2,0],["canvas",1]],null,0,"canvas",[],[[8,"width",0],[8,"height",0]],null,null,null,null))],(function(e,t){var i=t.component;e(t,5,0,i.allowCameraSwitch&&i.availableVideoInputs.length>1&&i.videoInitialized)}),(function(e,t){var i=t.component;e(t,3,0,i.videoWidth,i.videoHeight,i.videoStyleClasses),e(t,6,0,i.width,i.height)}))}var m=i("2u97"),b=i("ZYCi"),v=i("K9Ia"),f=i("TUr7"),A=function(e){function t(t,i){var n=e.call(this,i)||this;return n._snapshotTrigger=new v.a,n.snapshotTrigger$=n._snapshotTrigger.asObservable(),t.setTitle("Webcam"),n}return Object(o.__extends)(t,e),Object.defineProperty(t.prototype,"showSnapshot",{get:function(){return null!=this._image},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"imageUrl",{get:function(){return this._image.imageAsDataUrl},enumerable:!0,configurable:!0}),t.prototype.ngOnInit=function(){this._canvas=this._canvasRef.nativeElement},t.prototype.takeSnapshot=function(){this._snapshotTrigger.next()},t.prototype.captureSnapshot=function(e){this._image=e;var t=this._canvas.getContext("2d");this._canvas.height=e.imageData.height,this._canvas.width=e.imageData.width;for(var i=0,n=e.imageData.data;i<n.length;i+=4)n[i]=255-n[i],n[i+1]=255-n[i+1],n[i+2]=255-n[i+2],n[i+3]=255;t.putImageData(e.imageData,0,0)},t}(i("Ng4T").a),S=n.rb({encapsulation:0,styles:[[""]],data:{}});function I(e){return n.Pb(0,[(e()(),n.tb(0,0,[["snapshot",1]],null,0,"img",[],[[8,"src",4]],null,null,null,null))],null,(function(e,t){e(t,0,0,t.component.imageUrl)}))}function w(e){return n.Pb(2,[n.Lb(402653184,1,{_canvasRef:0}),(e()(),n.tb(1,0,null,null,1,"webcam",[["captureImageData","true"]],null,[[null,"imageCapture"],[null,"imageClick"]],(function(e,t,i){var n=!0,a=e.component;return"imageCapture"===t&&(n=!1!==a.captureSnapshot(i)&&n),"imageClick"===t&&(n=!1!==a.takeSnapshot()&&n),n}),p,h)),n.sb(2,4374528,null,0,u,[],{captureImageData:[0,"captureImageData"],trigger:[1,"trigger"]},{imageCapture:"imageCapture",imageClick:"imageClick"}),(e()(),n.ib(16777216,null,null,1,null,I)),n.sb(4,16384,null,0,g.k,[n.O,n.L],{ngIf:[0,"ngIf"]},null),(e()(),n.tb(5,0,[[1,0],["canvas",1]],null,0,"canvas",[],null,null,null,null,null))],(function(e,t){var i=t.component;e(t,2,0,"true",i.snapshotTrigger$),e(t,4,0,i.showSnapshot)}),null)}function D(e){return n.Pb(0,[(e()(),n.tb(0,0,null,null,2,"app-webcam",[],null,null,null,w,S)),n.Kb(512,null,m.a,m.a,[b.l]),n.sb(2,114688,null,0,A,[f.a,m.a],null,null)],(function(e,t){e(t,2,0)}),null)}var y=n.pb("app-webcam",A,D,{},{},[]),C=function(){return function(){}}();i.d(t,"WebcamModuleNgFactory",(function(){return k}));var k=n.qb(a,[],(function(e){return n.Cb([n.Db(512,n.j,n.bb,[[8,[r.a,y]],[3,n.j],n.w]),n.Db(4608,g.m,g.l,[n.t,[2,g.z]]),n.Db(1073742336,g.c,g.c,[]),n.Db(1073742336,b.n,b.n,[[2,b.s],[2,b.l]]),n.Db(1073742336,C,C,[]),n.Db(1073742336,l,l,[]),n.Db(1073742336,a,a,[]),n.Db(1024,b.j,(function(){return[[{path:"",component:A}]]}),[])])}))}}]);