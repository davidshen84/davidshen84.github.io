(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{qh0f:function(t,e,i){"use strict";i.r(e);var n=i("CcnG"),a=function(){return function(){}}(),r=i("pMnS"),o=function(){function t(t,e,i){this._mimeType=null,this._imageAsBase64=null,this._imageAsDataUrl=null,this._imageData=null,this._mimeType=e,this._imageAsDataUrl=t,this._imageData=i}return Object.defineProperty(t.prototype,"imageAsBase64",{get:function(){return this._imageAsBase64?this._imageAsBase64:this._imageAsBase64=this.getDataFromDataUrl(this._imageAsDataUrl)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"imageAsDataUrl",{get:function(){return this._imageAsDataUrl},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"imageData",{get:function(){return this._imageData},enumerable:!0,configurable:!0}),t.prototype.getDataFromDataUrl=function(t){return t.replace("data:"+this._mimeType+";base64,","")},t}(),s=function(){function t(){}return t.getAvailableVideoInputs=function(){return navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices?new Promise(function(t,e){navigator.mediaDevices.enumerateDevices().then(function(e){t(e.filter(function(t){return"videoinput"===t.kind}))}).catch(function(t){e(t.message||t)})}):Promise.reject("enumerateDevices() not supported.")},t}(),c=function(){function t(){this.width=640,this.height=480,this.videoOptions=t.DEFAULT_VIDEO_OPTIONS,this.allowCameraSwitch=!0,this.mediaStream=null,this.availableVideoInputs=[],this.activeVideoInputIndex=-1,this.videoInitialized=!1,this.imageCapture=new n.m,this.initError=new n.m,this.imageClick=new n.m,this.cameraSwitched=new n.m,this.activeVideoSettings=null}return t.prototype.ngAfterViewInit=function(){var t=this;this.detectAvailableDevices().then(function(e){t.switchToVideoInput(e.length>0?e[0].deviceId:null)}).catch(function(e){t.initError.next({message:e}),t.switchToVideoInput(null)})},t.prototype.ngOnDestroy=function(){this.stopMediaTracks(),this.unsubscribeFromSubscriptions()},Object.defineProperty(t.prototype,"trigger",{set:function(t){var e=this;this.triggerSubscription&&this.triggerSubscription.unsubscribe(),this.triggerSubscription=t.subscribe(function(){e.takeSnapshot()})},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"switchCamera",{set:function(t){var e=this;this.switchCameraSubscription&&this.switchCameraSubscription.unsubscribe(),this.switchCameraSubscription=t.subscribe(function(t){"string"==typeof t?e.switchToVideoInput(t):e.rotateVideoInput(!1!==t)})},enumerable:!0,configurable:!0}),t.getMediaConstraintsForDevice=function(t,e){var i=e||this.DEFAULT_VIDEO_OPTIONS;return t&&(i.deviceId={exact:t}),i},t.getDeviceIdFromMediaStreamTrack=function(e){if(e.getSettings&&e.getSettings()&&e.getSettings().deviceId)return e.getSettings().deviceId;if(e.getConstraints&&e.getConstraints()&&e.getConstraints().deviceId){var i=e.getConstraints().deviceId;return t.getValueFromConstrainDOMString(i)}},t.getFacingModeFromMediaStreamTrack=function(e){if(e){if(e.getSettings&&e.getSettings()&&e.getSettings().facingMode)return e.getSettings().facingMode;if(e.getConstraints&&e.getConstraints()&&e.getConstraints().facingMode){var i=e.getConstraints().facingMode;return t.getValueFromConstrainDOMString(i)}}},t.isUserFacing=function(e){var i=t.getFacingModeFromMediaStreamTrack(e);return!!i&&"user"===i.toLowerCase()},t.getValueFromConstrainDOMString=function(t){if(t){if(t instanceof String)return String(t);if(Array.isArray(t)&&Array(t).length>0)return String(t[0]);if("object"==typeof t){if(t.exact)return String(t.exact);if(t.ideal)return String(t.ideal)}}return null},t.prototype.takeSnapshot=function(){var t=this.video.nativeElement,e={width:this.width,height:this.height};t.videoWidth&&(e.width=t.videoWidth,e.height=t.videoHeight);var i=this.canvas.nativeElement;i.width=e.width,i.height=e.height;var n=i.getContext("2d");n.drawImage(this.video.nativeElement,0,0);var a=i.toDataURL("image/jpeg"),r=n.getImageData(0,0,i.width,i.height);this.imageCapture.next(new o(a,"image/jpeg",r))},t.prototype.rotateVideoInput=function(t){this.availableVideoInputs&&this.availableVideoInputs.length>1&&this.switchToVideoInput(this.availableVideoInputs[(this.activeVideoInputIndex+(t?1:this.availableVideoInputs.length-1))%this.availableVideoInputs.length].deviceId)},t.prototype.switchToVideoInput=function(t){this.videoInitialized=!1,this.stopMediaTracks(),this.initWebcam(t,this.videoOptions)},Object.defineProperty(t.prototype,"videoWidth",{get:function(){var t=this.getVideoAspectRatio(this.activeVideoSettings);return Math.min(this.width,this.height*t)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"videoHeight",{get:function(){var t=this.getVideoAspectRatio(this.activeVideoSettings);return Math.min(this.height,this.width/t)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"videoStyleClasses",{get:function(){var t="";return this.isMirrorImage()&&(t+="mirrored "),t.trim()},enumerable:!0,configurable:!0}),t.prototype.getVideoAspectRatio=function(t){if(t){if(t.aspectRatio)return t.aspectRatio;if(t.width&&t.width>0&&t.height&&t.height>0)return t.width/t.height}return this.width/this.height},t.prototype.initWebcam=function(e,i){var n=this,a=this.video.nativeElement;if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){var r=t.getMediaConstraintsForDevice(e,i);navigator.mediaDevices.getUserMedia({video:r}).then(function(e){n.mediaStream=e,a.srcObject=e,a.play(),n.activeVideoSettings=e.getVideoTracks()[0].getSettings();var i=t.getDeviceIdFromMediaStreamTrack(e.getVideoTracks()[0]);n.activeVideoInputIndex=i?n.availableVideoInputs.findIndex(function(t){return t.deviceId===i}):-1,n.videoInitialized=!0,n.cameraSwitched.next(i)}).catch(function(t){n.initError.next({message:t.message,mediaStreamError:t})})}else this.initError.next({message:"Cannot read UserMedia from MediaDevices."})},t.prototype.getActiveVideoTrack=function(){return this.mediaStream?this.mediaStream.getVideoTracks()[0]:null},t.prototype.isMirrorImage=function(){if(!this.getActiveVideoTrack())return!1;var e="auto";switch(this.mirrorImage&&("string"==typeof this.mirrorImage?e=String(this.mirrorImage).toLowerCase():this.mirrorImage.x&&(e=this.mirrorImage.x.toLowerCase())),e){case"always":return!0;case"never":return!1}return t.isUserFacing(this.getActiveVideoTrack())},t.prototype.stopMediaTracks=function(){this.mediaStream&&this.mediaStream.getTracks&&this.mediaStream.getTracks().forEach(function(t){return t.stop()})},t.prototype.unsubscribeFromSubscriptions=function(){this.triggerSubscription&&this.triggerSubscription.unsubscribe(),this.switchCameraSubscription&&this.switchCameraSubscription.unsubscribe()},t.prototype.detectAvailableDevices=function(){var t=this;return new Promise(function(e,i){s.getAvailableVideoInputs().then(function(i){t.availableVideoInputs=i,e(i)}).catch(function(e){t.availableVideoInputs=[],i(e)})})},t.DEFAULT_VIDEO_OPTIONS={facingMode:"environment"},t}(),u=function(){return function(){}}(),l=i("Ip0R"),g=n.pb({encapsulation:0,styles:[".webcam-wrapper[_ngcontent-%COMP%]{display:inline-block;position:relative;line-height:0}.webcam-wrapper[_ngcontent-%COMP%]   video.mirrored[_ngcontent-%COMP%]{-webkit-transform:scale(-1,1);transform:scale(-1,1)}.webcam-wrapper[_ngcontent-%COMP%]   canvas[_ngcontent-%COMP%]{display:none}.webcam-wrapper[_ngcontent-%COMP%]   .camera-switch[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.1);background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAE9UlEQVR42u2aT2hdRRTGf+cRQqghSqihdBFDkRISK2KDfzDWxHaRQHEhaINKqa1gKQhd6EZLN+IidCH+Q0oWIkVRC21BQxXRitVaSbKoJSGtYGoK2tQ/tU1jY5v0c5F54Xl7b/KSO/PyEt+3e5f75p7zzZwzZ74zUEIJJfyfYaEGllQGVAGZlENdBy6Z2cSiYFTSKkkfS/pH/nBF0kFJdUW9AiRVASeAukD8DgNrzOySrwEzng18KaDzALXuG8W3AiStAvqBisBRNg40mtlPxbYCOgvgPO4bncWW+JpVeDQXRQhIygDfA00F5r0XuNfMrgclQFI98DDQCNQA5ZFXqoCWBVp8XwHRHeEqcN7loy/NbHBesyqpQ1KfFj/6nC+ZvFaApFrgPaCZpYVvgCfNbDiRAElNwGFg+RIt/X8H2s2s9wYCJDUAR4HqJX7++RN40MwGpgmQVAH0AQ2BPz4AHHPl8nBOAqtyFWQjsA6oL4Ada81sPDv7uwImod8kvSJp9RyS8O2SXnb/DYVd2Y9VSroQ4ANXJO2WVJmixqh0kzMWwL4LkiqRtDnA4D1zmfE8j9g9AezcnAHaPcfXdbfdnPZ2Yps6+DwAvO/Z1naTdApY7Xng48BDZnY1MpMVQBuw3iXc5Tnb0wBwBPjUzP6eoezuArZ6svM0geJLkvZEYnl3nkntoqROSbckSW2Suj3ZOIangc7GPJuUtNGdFIfmMeavktoSSKiW9LMPw30Q8JqkekmjCbOZRhuclLQjgYSNxUBAj6RyZ9ATgUJpUtJTCSR8vpAEXHAyWK5BXYFIGHOlepSAloUk4NEYgyoknQhEwhFJ0e8h6VSaQeerCb5uZgdi9utxYBNwOUD93hIVXswM4INCi6K9wAszFC2DwLOBDjHbYp59karIUnRdzYy/3ClqVklaUhfwTICj7K25OqA7a4wWagVsm4Me/xzwg2cCqqONFzO7DPxSCAJi436GUBgHHguQD2oTlJ55oSzP9ybccsttSJw1szdjFOSnI/8dTCGZHwcORp4Nx7y3B1iZ8/sm4MW8/Euxg5wIsS/HaAp3zeP4/G7obRDXI4jiTIA22H7Xdc7X+S3A5lC7QBQ357aq3VAjCeSkwUfAJrfvz+R8A9ADLAtZB+TinpjC5JMA+//jwPZZnF8G7J+L8z4IWB/zbG+gIujVWfLBW/NStVMmqaG4POJRsIjix7h8IGnLQuoBbQki5sVAJHyYm7YkNaRRtXwQ8G1cHpX0iKRrgUjYno17Sf0LrQhJUkdCeHWkVITGJI0k1QeS3ikGSUzOyJUJJNznYneuOCnpTldcxa2kP3xJYqOeSDjqZG8ShJLnE8TTuMS6Iyu1BW7djZqkfo9N0QOuYJmYQddfB7RG+gLTNzqAY9FrL+5/nwEbvDdJJe3zzOrhNP3AWRqmk55t3ZcBuj3b2gb0Sbrbo/NNzk7fFzu7s/E5EiC+rrmeQU0Kx2skvRFoOx2ZzlmSdgbsw49JetvtBpk8nM64d/cGbNtJ0s7cGyJlwHeEv+t3nqnLSgPAUOSGyG3AHUxdzqoJbEcvcL+ZTeTeEapzJKxgaeOcc/7Mf06D7kFrguS0VDAMtGadv+E47DT9tcChJej8ISfpD+abgTe45uOkFi8mnQ+JBVQ+d4VXuOptjavcyot8pq86mfwk8LWZnaOEEkoooYQSSojDv8AhQNeGfe0jAAAAAElFTkSuQmCC);background-repeat:no-repeat;border-radius:5px;position:absolute;right:13px;top:10px;height:48px;width:48px;background-size:80%;cursor:pointer;background-position:center;transition:background-color .2s}.webcam-wrapper[_ngcontent-%COMP%]   .camera-switch[_ngcontent-%COMP%]:hover{background-color:rgba(0,0,0,.18)}"],data:{}});function h(t){return n.Lb(0,[(t()(),n.rb(0,0,null,null,0,"div",[["class","camera-switch"]],null,[[null,"click"]],function(t,e,i){var n=!0;return"click"===e&&(n=!1!==t.component.rotateVideoInput(!0)&&n),n},null,null))],null,null)}function p(t){return n.Lb(0,[n.Hb(402653184,1,{video:0}),n.Hb(402653184,2,{canvas:0}),(t()(),n.rb(2,0,null,null,4,"div",[["class","webcam-wrapper"]],null,[[null,"click"]],function(t,e,i){var n=!0;return"click"===e&&(n=!1!==t.component.imageClick.next()&&n),n},null,null)),(t()(),n.rb(3,0,[[1,0],["video",1]],null,0,"video",[["autoplay",""],["muted",""],["playsinline",""]],[[8,"width",0],[8,"height",0],[8,"className",0]],null,null,null,null)),(t()(),n.ib(16777216,null,null,1,null,h)),n.qb(5,16384,null,0,l.k,[n.Q,n.N],{ngIf:[0,"ngIf"]},null),(t()(),n.rb(6,0,[[2,0],["canvas",1]],null,0,"canvas",[],[[8,"width",0],[8,"height",0]],null,null,null,null))],function(t,e){var i=e.component;t(e,5,0,i.allowCameraSwitch&&i.availableVideoInputs.length>1&&i.videoInitialized)},function(t,e){var i=e.component;t(e,3,0,i.videoWidth,i.videoHeight,i.videoStyleClasses),t(e,6,0,i.width,i.height)})}var d=i("K9Ia"),m=function(){function t(){this.snapshotTrigger=new d.a,this.snapshotTrigger$=this.snapshotTrigger.asObservable()}return t.prototype.ngOnInit=function(){this.canvas=this.canvasRef.nativeElement},t.prototype.takeSnapshot=function(){this.snapshotTrigger.next()},t.prototype.captureSnapshot=function(t){this.image=t;var e=this.canvas.getContext("2d");this.canvas.height=t.imageData.height,this.canvas.width=t.imageData.width;for(var i=0,n=t.imageData.data;i<n.length;i+=4)n[i]=255-n[i],n[i+1]=255-n[i+1],n[i+2]=255-n[i+2],n[i+3]=255;e.putImageData(t.imageData,0,0)},Object.defineProperty(t.prototype,"showSnapshot",{get:function(){return null!=this.image},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"imageUrl",{get:function(){return this.image.imageAsDataUrl},enumerable:!0,configurable:!0}),t}(),b=n.pb({encapsulation:0,styles:[[""]],data:{}});function f(t){return n.Lb(0,[(t()(),n.rb(0,0,[["snapshot",1]],null,0,"img",[],[[8,"src",4]],null,null,null,null))],null,function(t,e){t(e,0,0,e.component.imageUrl)})}function v(t){return n.Lb(0,[n.Hb(402653184,1,{canvasRef:0}),(t()(),n.rb(1,0,null,null,1,"webcam",[],null,[[null,"imageCapture"],[null,"imageClick"]],function(t,e,i){var n=!0,a=t.component;return"imageCapture"===e&&(n=!1!==a.captureSnapshot(i)&&n),"imageClick"===e&&(n=!1!==a.takeSnapshot()&&n),n},p,g)),n.qb(2,4374528,null,0,c,[],{trigger:[0,"trigger"]},{imageCapture:"imageCapture",imageClick:"imageClick"}),(t()(),n.ib(16777216,null,null,1,null,f)),n.qb(4,16384,null,0,l.k,[n.Q,n.N],{ngIf:[0,"ngIf"]},null),(t()(),n.rb(5,0,[[1,0],["canvas",1]],null,0,"canvas",[],null,null,null,null,null))],function(t,e){var i=e.component;t(e,2,0,i.snapshotTrigger$),t(e,4,0,i.showSnapshot)},null)}function S(t){return n.Lb(0,[(t()(),n.rb(0,0,null,null,1,"app-webcam",[],null,null,null,v,b)),n.qb(1,114688,null,0,m,[],null,null)],function(t,e){t(e,1,0)},null)}var w=n.nb("app-webcam",m,S,{},{},[]),A=i("ZYCi"),I=function(){return function(){}}();i.d(e,"WebcamModuleNgFactory",function(){return C});var C=n.ob(a,[],function(t){return n.yb([n.zb(512,n.j,n.db,[[8,[r.a,w]],[3,n.j],n.y]),n.zb(4608,l.m,l.l,[n.v,[2,l.x]]),n.zb(1073742336,l.c,l.c,[]),n.zb(1073742336,A.m,A.m,[[2,A.s],[2,A.k]]),n.zb(1073742336,I,I,[]),n.zb(1073742336,u,u,[]),n.zb(1073742336,a,a,[]),n.zb(1024,A.i,function(){return[[{path:"",component:m}]]},[])])})}}]);