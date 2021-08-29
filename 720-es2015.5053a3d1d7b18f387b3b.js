"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[720],{720:function(e,t,i){i.r(t),i.d(t,{WebcamModule:function(){return I}});var a=i(8583),s=i(5987),n=i(9765),r=i(5965),o=i(4242),c=i(7716),g=i(4904);const h=["video"],d=["canvas"];function u(e,t){if(1&e){const e=c.EpF();c.TgZ(0,"div",6),c.NdJ("click",function(){return c.CHM(e),c.oxw().rotateVideoInput(!0)}),c.qZA()}}class m{constructor(e,t,i){this._mimeType=null,this._imageAsBase64=null,this._imageAsDataUrl=null,this._imageData=null,this._mimeType=t,this._imageAsDataUrl=e,this._imageData=i}static getDataFromDataUrl(e,t){return e.replace(`data:${t};base64,`,"")}get imageAsBase64(){return this._imageAsBase64?this._imageAsBase64:this._imageAsBase64=m.getDataFromDataUrl(this._imageAsDataUrl,this._mimeType)}get imageAsDataUrl(){return this._imageAsDataUrl}get imageData(){return this._imageData}}let l=(()=>{class e{constructor(){this.width=640,this.height=480,this.videoOptions=e.DEFAULT_VIDEO_OPTIONS,this.allowCameraSwitch=!0,this.captureImageData=!1,this.imageType=e.DEFAULT_IMAGE_TYPE,this.imageQuality=e.DEFAULT_IMAGE_QUALITY,this.imageCapture=new c.vpe,this.initError=new c.vpe,this.imageClick=new c.vpe,this.cameraSwitched=new c.vpe,this.availableVideoInputs=[],this.videoInitialized=!1,this.activeVideoInputIndex=-1,this.mediaStream=null,this.activeVideoSettings=null}set trigger(e){this.triggerSubscription&&this.triggerSubscription.unsubscribe(),this.triggerSubscription=e.subscribe(()=>{this.takeSnapshot()})}set switchCamera(e){this.switchCameraSubscription&&this.switchCameraSubscription.unsubscribe(),this.switchCameraSubscription=e.subscribe(e=>{"string"==typeof e?this.switchToVideoInput(e):this.rotateVideoInput(!1!==e)})}static getMediaConstraintsForDevice(e,t){const i=t||this.DEFAULT_VIDEO_OPTIONS;return e&&(i.deviceId={exact:e}),i}static getDeviceIdFromMediaStreamTrack(t){if(t.getSettings&&t.getSettings()&&t.getSettings().deviceId)return t.getSettings().deviceId;if(t.getConstraints&&t.getConstraints()&&t.getConstraints().deviceId){const i=t.getConstraints().deviceId;return e.getValueFromConstrainDOMString(i)}}static getFacingModeFromMediaStreamTrack(t){if(t){if(t.getSettings&&t.getSettings()&&t.getSettings().facingMode)return t.getSettings().facingMode;if(t.getConstraints&&t.getConstraints()&&t.getConstraints().facingMode){const i=t.getConstraints().facingMode;return e.getValueFromConstrainDOMString(i)}}}static isUserFacing(t){const i=e.getFacingModeFromMediaStreamTrack(t);return!!i&&"user"===i.toLowerCase()}static getValueFromConstrainDOMString(e){if(e){if(e instanceof String)return String(e);if(Array.isArray(e)&&Array(e).length>0)return String(e[0]);if("object"==typeof e){if(e.exact)return String(e.exact);if(e.ideal)return String(e.ideal)}}return null}ngAfterViewInit(){this.detectAvailableDevices().then(()=>{this.switchToVideoInput(null)}).catch(e=>{this.initError.next({message:e}),this.switchToVideoInput(null)})}ngOnDestroy(){this.stopMediaTracks(),this.unsubscribeFromSubscriptions()}takeSnapshot(){const t=this.nativeVideoElement,i={width:this.width,height:this.height};t.videoWidth&&(i.width=t.videoWidth,i.height=t.videoHeight);const a=this.canvas.nativeElement;a.width=i.width,a.height=i.height;const s=a.getContext("2d");s.drawImage(t,0,0);const n=this.imageType?this.imageType:e.DEFAULT_IMAGE_TYPE,r=a.toDataURL(n,this.imageQuality?this.imageQuality:e.DEFAULT_IMAGE_QUALITY);let o=null;this.captureImageData&&(o=s.getImageData(0,0,a.width,a.height)),this.imageCapture.next(new m(r,n,o))}rotateVideoInput(e){this.availableVideoInputs&&this.availableVideoInputs.length>1&&this.switchToVideoInput(this.availableVideoInputs[(this.activeVideoInputIndex+(e?1:this.availableVideoInputs.length-1))%this.availableVideoInputs.length].deviceId)}switchToVideoInput(e){this.videoInitialized=!1,this.stopMediaTracks(),this.initWebcam(e,this.videoOptions)}videoResize(){}get videoWidth(){const e=this.getVideoAspectRatio();return Math.min(this.width,this.height*e)}get videoHeight(){const e=this.getVideoAspectRatio();return Math.min(this.height,this.width/e)}get videoStyleClasses(){let e="";return this.isMirrorImage()&&(e+="mirrored "),e.trim()}get nativeVideoElement(){return this.video.nativeElement}getVideoAspectRatio(){const e=this.nativeVideoElement;return e.videoWidth&&e.videoWidth>0&&e.videoHeight&&e.videoHeight>0?e.videoWidth/e.videoHeight:this.width/this.height}initWebcam(t,i){const a=this.nativeVideoElement;if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){const s=e.getMediaConstraintsForDevice(t,i);navigator.mediaDevices.getUserMedia({video:s}).then(t=>{this.mediaStream=t,a.srcObject=t,a.play(),this.activeVideoSettings=t.getVideoTracks()[0].getSettings();const i=e.getDeviceIdFromMediaStreamTrack(t.getVideoTracks()[0]);this.cameraSwitched.next(i),this.detectAvailableDevices().then(()=>{this.activeVideoInputIndex=i?this.availableVideoInputs.findIndex(e=>e.deviceId===i):-1,this.videoInitialized=!0}).catch(()=>{this.activeVideoInputIndex=-1,this.videoInitialized=!0})}).catch(e=>{this.initError.next({message:e.message,mediaStreamError:e})})}else this.initError.next({message:"Cannot read UserMedia from MediaDevices."})}getActiveVideoTrack(){return this.mediaStream?this.mediaStream.getVideoTracks()[0]:null}isMirrorImage(){if(!this.getActiveVideoTrack())return!1;{let e="auto";switch(this.mirrorImage&&("string"==typeof this.mirrorImage?e=String(this.mirrorImage).toLowerCase():this.mirrorImage.x&&(e=this.mirrorImage.x.toLowerCase())),e){case"always":return!0;case"never":return!1}}return e.isUserFacing(this.getActiveVideoTrack())}stopMediaTracks(){this.mediaStream&&this.mediaStream.getTracks&&this.mediaStream.getTracks().forEach(e=>e.stop())}unsubscribeFromSubscriptions(){this.triggerSubscription&&this.triggerSubscription.unsubscribe(),this.switchCameraSubscription&&this.switchCameraSubscription.unsubscribe()}detectAvailableDevices(){return new Promise((e,t)=>{(class{static getAvailableVideoInputs(){return navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices?new Promise((e,t)=>{navigator.mediaDevices.enumerateDevices().then(t=>{e(t.filter(e=>"videoinput"===e.kind))}).catch(e=>{t(e.message||e)})}):Promise.reject("enumerateDevices() not supported.")}}).getAvailableVideoInputs().then(t=>{this.availableVideoInputs=t,e(t)}).catch(e=>{this.availableVideoInputs=[],t(e)})})}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=c.Xpm({type:e,selectors:[["webcam"]],viewQuery:function(e,t){if(1&e&&(c.Gf(h,7),c.Gf(d,7)),2&e){let e;c.iGM(e=c.CRH())&&(t.video=e.first),c.iGM(e=c.CRH())&&(t.canvas=e.first)}},inputs:{width:"width",height:"height",videoOptions:"videoOptions",allowCameraSwitch:"allowCameraSwitch",captureImageData:"captureImageData",imageType:"imageType",imageQuality:"imageQuality",trigger:"trigger",switchCamera:"switchCamera",mirrorImage:"mirrorImage"},outputs:{imageCapture:"imageCapture",initError:"initError",imageClick:"imageClick",cameraSwitched:"cameraSwitched"},decls:6,vars:7,consts:[[1,"webcam-wrapper",3,"click"],["autoplay","","muted","","playsinline","",3,"width","height","resize"],["video",""],["class","camera-switch",3,"click",4,"ngIf"],[3,"width","height"],["canvas",""],[1,"camera-switch",3,"click"]],template:function(e,t){1&e&&(c.TgZ(0,"div",0),c.NdJ("click",function(){return t.imageClick.next()}),c.TgZ(1,"video",1,2),c.NdJ("resize",function(){return t.videoResize()}),c.qZA(),c.YNc(3,u,1,0,"div",3),c._UZ(4,"canvas",4,5),c.qZA()),2&e&&(c.xp6(1),c.Tol(t.videoStyleClasses),c.Q6J("width",t.videoWidth)("height",t.videoHeight),c.xp6(2),c.Q6J("ngIf",t.allowCameraSwitch&&t.availableVideoInputs.length>1&&t.videoInitialized),c.xp6(1),c.Q6J("width",t.width)("height",t.height))},directives:[a.O5],styles:['.webcam-wrapper[_ngcontent-%COMP%]{display:inline-block;line-height:0;position:relative}.webcam-wrapper[_ngcontent-%COMP%]   video.mirrored[_ngcontent-%COMP%]{transform:scaleX(-1)}.webcam-wrapper[_ngcontent-%COMP%]   canvas[_ngcontent-%COMP%]{display:none}.webcam-wrapper[_ngcontent-%COMP%]   .camera-switch[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.1);background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAE9UlEQVR42u2aT2hdRRTGf+cRQqghSqihdBFDkRISK2KDfzDWxHaRQHEhaINKqa1gKQhd6EZLN+IidCH+Q0oWIkVRC21BQxXRitVaSbKoJSGtYGoK2tQ/tU1jY5v0c5F54Xl7b/KSO/PyEt+3e5f75p7zzZwzZ74zUEIJJfyfYaEGllQGVAGZlENdBy6Z2cSiYFTSKkkfS/pH/nBF0kFJdUW9AiRVASeAukD8DgNrzOySrwEzng18KaDzALXuG8W3AiStAvqBisBRNg40mtlPxbYCOgvgPO4bncWW+JpVeDQXRQhIygDfA00F5r0XuNfMrgclQFI98DDQCNQA5ZFXqoCWBVp8XwHRHeEqcN7loy/NbHBesyqpQ1KfFj/6nC+ZvFaApFrgPaCZpYVvgCfNbDiRAElNwGFg+RIt/X8H2s2s9wYCJDUAR4HqJX7++RN40MwGpgmQVAH0AQ2BPz4AHHPl8nBOAqtyFWQjsA6oL4Ada81sPDv7uwImod8kvSJp9RyS8O2SXnb/DYVd2Y9VSroQ4ANXJO2WVJmixqh0kzMWwL4LkiqRtDnA4D1zmfE8j9g9AezcnAHaPcfXdbfdnPZ2Yps6+DwAvO/Z1naTdApY7Xng48BDZnY1MpMVQBuw3iXc5Tnb0wBwBPjUzP6eoezuArZ6svM0geJLkvZEYnl3nkntoqROSbckSW2Suj3ZOIangc7GPJuUtNGdFIfmMeavktoSSKiW9LMPw30Q8JqkekmjCbOZRhuclLQjgYSNxUBAj6RyZ9ATgUJpUtJTCSR8vpAEXHAyWK5BXYFIGHOlepSAloUk4NEYgyoknQhEwhFJ0e8h6VSaQeerCb5uZgdi9utxYBNwOUD93hIVXswM4INCi6K9wAszFC2DwLOBDjHbYp59karIUnRdzYy/3ClqVklaUhfwTICj7K25OqA7a4wWagVsm4Me/xzwg2cCqqONFzO7DPxSCAJi436GUBgHHguQD2oTlJ55oSzP9ybccsttSJw1szdjFOSnI/8dTCGZHwcORp4Nx7y3B1iZ8/sm4MW8/Euxg5wIsS/HaAp3zeP4/G7obRDXI4jiTIA22H7Xdc7X+S3A5lC7QBQ357aq3VAjCeSkwUfAJrfvz+R8A9ADLAtZB+TinpjC5JMA+//jwPZZnF8G7J+L8z4IWB/zbG+gIujVWfLBW/NStVMmqaG4POJRsIjix7h8IGnLQuoBbQki5sVAJHyYm7YkNaRRtXwQ8G1cHpX0iKRrgUjYno17Sf0LrQhJUkdCeHWkVITGJI0k1QeS3ikGSUzOyJUJJNznYneuOCnpTldcxa2kP3xJYqOeSDjqZG8ShJLnE8TTuMS6Iyu1BW7djZqkfo9N0QOuYJmYQddfB7RG+gLTNzqAY9FrL+5/nwEbvDdJJe3zzOrhNP3AWRqmk55t3ZcBuj3b2gb0Sbrbo/NNzk7fFzu7s/E5EiC+rrmeQU0Kx2skvRFoOx2ZzlmSdgbsw49JetvtBpk8nM64d/cGbNtJ0s7cGyJlwHeEv+t3nqnLSgPAUOSGyG3AHUxdzqoJbEcvcL+ZTeTeEapzJKxgaeOcc/7Mf06D7kFrguS0VDAMtGadv+E47DT9tcChJej8ISfpD+abgTe45uOkFi8mnQ+JBVQ+d4VXuOptjavcyot8pq86mfwk8LWZnaOEEkoooYQSSojDv8AhQNeGfe0jAAAAAElFTkSuQmCC");background-position:50%;background-repeat:no-repeat;background-size:80%;border-radius:5px;cursor:pointer;height:48px;position:absolute;right:13px;top:10px;transition:background-color .2s ease;width:48px}.webcam-wrapper[_ngcontent-%COMP%]   .camera-switch[_ngcontent-%COMP%]:hover{background-color:rgba(0,0,0,.18)}']}),e.DEFAULT_VIDEO_OPTIONS={facingMode:"environment"},e.DEFAULT_IMAGE_TYPE="image/jpeg",e.DEFAULT_IMAGE_QUALITY=.92,e})(),p=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=c.oAB({type:e}),e.\u0275inj=c.cJS({imports:[[a.ez]]}),e})();const v=["canvas"];function w(e,t){if(1&e&&c._UZ(0,"img",3,4),2&e){const e=c.oxw();c.Q6J("src",e.imageUrl,c.LSH)}}const A=[{path:"",component:(()=>{class e extends o.H{constructor(e,t){super(t),this._snapshotTrigger=new n.xQ,this.snapshotTrigger$=this._snapshotTrigger.asObservable(),e.setTitle("Webcam")}get showSnapshot(){return null!=this._image}get imageUrl(){return this._image.imageAsDataUrl}ngOnInit(){this._canvas=this._canvasRef.nativeElement}takeSnapshot(){this._snapshotTrigger.next()}captureSnapshot(e){this._image=e;const t=this._canvas.getContext("2d");this._canvas.height=e.imageData.height,this._canvas.width=e.imageData.width;for(let i=0,a=e.imageData.data;i<a.length;i+=4)a[i]=255-a[i],a[i+1]=255-a[i+1],a[i+2]=255-a[i+2],a[i+3]=255;t.putImageData(e.imageData,0,0)}}return e.\u0275fac=function(t){return new(t||e)(c.Y36(g.y),c.Y36(r.O))},e.\u0275cmp=c.Xpm({type:e,selectors:[["app-webcam"]],viewQuery:function(e,t){if(1&e&&c.Gf(v,7),2&e){let e;c.iGM(e=c.CRH())&&(t._canvasRef=e.first)}},features:[c._Bn([r.O]),c.qOj],decls:4,vars:2,consts:[["captureImageData","true",3,"trigger","imageCapture","imageClick"],[3,"src",4,"ngIf"],["canvas",""],[3,"src"],["snapshot",""]],template:function(e,t){1&e&&(c.TgZ(0,"webcam",0),c.NdJ("imageCapture",function(e){return t.captureSnapshot(e)})("imageClick",function(){return t.takeSnapshot()}),c.qZA(),c.YNc(1,w,2,1,"img",1),c._UZ(2,"canvas",null,2)),2&e&&(c.Q6J("trigger",t.snapshotTrigger$),c.xp6(1),c.Q6J("ngIf",t.showSnapshot))},directives:[l,a.O5],styles:[""],changeDetection:0}),e})()}];let S=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=c.oAB({type:e}),e.\u0275inj=c.cJS({imports:[[s.Bz.forChild(A)],s.Bz]}),e})(),I=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=c.oAB({type:e}),e.\u0275inj=c.cJS({imports:[[a.ez,S,p]]}),e})()}}]);