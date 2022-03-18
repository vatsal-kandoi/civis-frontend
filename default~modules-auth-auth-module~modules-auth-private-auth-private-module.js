(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~modules-auth-auth-module~modules-auth-private-auth-private-module"],{

/***/ "./node_modules/ng-recaptcha/__ivy_ngcc__/fesm5/ng-recaptcha.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ng-recaptcha/__ivy_ngcc__/fesm5/ng-recaptcha.js ***!
  \**********************************************************************/
/*! exports provided: RECAPTCHA_BASE_URL, RECAPTCHA_LANGUAGE, RECAPTCHA_NONCE, RECAPTCHA_SETTINGS, RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service, RecaptchaComponent, RecaptchaFormsModule, RecaptchaLoaderService, RecaptchaModule, RecaptchaV3Module, RecaptchaValueAccessorDirective, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECAPTCHA_BASE_URL", function() { return RECAPTCHA_BASE_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECAPTCHA_LANGUAGE", function() { return RECAPTCHA_LANGUAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECAPTCHA_NONCE", function() { return RECAPTCHA_NONCE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECAPTCHA_SETTINGS", function() { return RECAPTCHA_SETTINGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECAPTCHA_V3_SITE_KEY", function() { return RECAPTCHA_V3_SITE_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReCaptchaV3Service", function() { return ReCaptchaV3Service; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecaptchaComponent", function() { return RecaptchaComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecaptchaFormsModule", function() { return RecaptchaFormsModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecaptchaLoaderService", function() { return RecaptchaLoaderService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecaptchaModule", function() { return RecaptchaModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecaptchaV3Module", function() { return RecaptchaV3Module; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecaptchaValueAccessorDirective", function() { return RecaptchaValueAccessorDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return RecaptchaCommonModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/common.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");







var RECAPTCHA_LANGUAGE = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('recaptcha-language');
var RECAPTCHA_BASE_URL = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('recaptcha-base-url');
var RECAPTCHA_NONCE = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('recaptcha-nonce-tag');
function loadScript(renderMode, onLoaded, urlParams, url, nonce) {
    window.ng2recaptchaloaded = function () {
        onLoaded(grecaptcha);
    };
    var script = document.createElement('script');
    script.innerHTML = '';
    var baseUrl = url || 'https://www.google.com/recaptcha/api.js';
    script.src = baseUrl + "?render=" + renderMode + "&onload=ng2recaptchaloaded" + urlParams;
    if (nonce) {
        // tslint:disable-next-line:no-any Remove "any" cast once we upgrade Angular to 7 and TypeScript along with it
        script.nonce = nonce;
    }
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}
var RecaptchaLoaderService = /** @class */ (function () {
    function RecaptchaLoaderService(
    // tslint:disable-next-line:no-any
    platformId, language, baseUrl, nonce) {
        this.platformId = platformId;
        this.language = language;
        this.baseUrl = baseUrl;
        this.nonce = nonce;
        this.init();
        this.ready = Object(_angular_common__WEBPACK_IMPORTED_MODULE_2__["isPlatformBrowser"])(this.platformId) ? RecaptchaLoaderService_1.ready.asObservable() : Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])();
    }
    RecaptchaLoaderService_1 = RecaptchaLoaderService;
    /** @internal */
    RecaptchaLoaderService.prototype.init = function () {
        if (RecaptchaLoaderService_1.ready) {
            return;
        }
        if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_2__["isPlatformBrowser"])(this.platformId)) {
            var subject_1 = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](null);
            RecaptchaLoaderService_1.ready = subject_1;
            var langParam = this.language ? '&hl=' + this.language : '';
            loadScript('explicit', function (grecaptcha) { return subject_1.next(grecaptcha); }, langParam, this.baseUrl, this.nonce);
        }
    };
    /**
     * @internal
     * @nocollapse
     */
    RecaptchaLoaderService.ready = null;
    RecaptchaLoaderService = RecaptchaLoaderService_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([ Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_1__["PLATFORM_ID"])),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(RECAPTCHA_LANGUAGE)),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(RECAPTCHA_BASE_URL)),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(RECAPTCHA_NONCE)),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, String, String, String])
    ], RecaptchaLoaderService);
RecaptchaLoaderService.ɵfac = function RecaptchaLoaderService_Factory(t) { return new (t || RecaptchaLoaderService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["PLATFORM_ID"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](RECAPTCHA_LANGUAGE, 8), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](RECAPTCHA_BASE_URL, 8), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](RECAPTCHA_NONCE, 8)); };
RecaptchaLoaderService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: RecaptchaLoaderService, factory: function (t) { return RecaptchaLoaderService.ɵfac(t); } });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](RecaptchaLoaderService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"]
    }], function () { return [{ type: Object, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
                args: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["PLATFORM_ID"]]
            }] }, { type: String, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
                args: [RECAPTCHA_LANGUAGE]
            }] }, { type: String, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
                args: [RECAPTCHA_BASE_URL]
            }] }, { type: String, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
                args: [RECAPTCHA_NONCE]
            }] }]; }, null); })();
    return RecaptchaLoaderService;
    var RecaptchaLoaderService_1;
}());

var RECAPTCHA_SETTINGS = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('recaptcha-settings');

var nextId = 0;
var RecaptchaComponent = /** @class */ (function () {
    function RecaptchaComponent(elementRef, loader, zone, settings) {
        this.elementRef = elementRef;
        this.loader = loader;
        this.zone = zone;
        this.id = "ngrecaptcha-" + nextId++;
        this.resolved = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        if (settings) {
            this.siteKey = settings.siteKey;
            this.theme = settings.theme;
            this.type = settings.type;
            this.size = settings.size;
            this.badge = settings.badge;
        }
    }
    RecaptchaComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.subscription = this.loader.ready.subscribe(function (grecaptcha) {
            if (grecaptcha != null && grecaptcha.render instanceof Function) {
                _this.grecaptcha = grecaptcha;
                _this.renderRecaptcha();
            }
        });
    };
    RecaptchaComponent.prototype.ngOnDestroy = function () {
        // reset the captcha to ensure it does not leave anything behind
        // after the component is no longer needed
        this.grecaptchaReset();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    /**
     * Executes the invisible recaptcha.
     * Does nothing if component's size is not set to "invisible".
     */
    RecaptchaComponent.prototype.execute = function () {
        if (this.size !== 'invisible') {
            return;
        }
        if (this.widget != null) {
            this.grecaptcha.execute(this.widget);
        }
        else {
            // delay execution of recaptcha until it actually renders
            this.executeRequested = true;
        }
    };
    RecaptchaComponent.prototype.reset = function () {
        if (this.widget != null) {
            if (this.grecaptcha.getResponse(this.widget)) {
                // Only emit an event in case if something would actually change.
                // That way we do not trigger "touching" of the control if someone does a "reset"
                // on a non-resolved captcha.
                this.resolved.emit(null);
            }
            this.grecaptchaReset();
        }
    };
    /** @internal */
    RecaptchaComponent.prototype.expired = function () {
        this.resolved.emit(null);
    };
    /** @internal */
    RecaptchaComponent.prototype.captchaResponseCallback = function (response) {
        this.resolved.emit(response);
    };
    /** @internal */
    RecaptchaComponent.prototype.grecaptchaReset = function () {
        var _this = this;
        if (this.widget != null) {
            this.zone.runOutsideAngular(function () { return _this.grecaptcha.reset(_this.widget); });
        }
    };
    /** @internal */
    RecaptchaComponent.prototype.renderRecaptcha = function () {
        var _this = this;
        this.widget = this.grecaptcha.render(this.elementRef.nativeElement, {
            badge: this.badge,
            callback: function (response) {
                _this.zone.run(function () { return _this.captchaResponseCallback(response); });
            },
            'expired-callback': function () {
                _this.zone.run(function () { return _this.expired(); });
            },
            sitekey: this.siteKey,
            size: this.size,
            tabindex: this.tabIndex,
            theme: this.theme,
            type: this.type,
        });
        if (this.executeRequested === true) {
            this.executeRequested = false;
            this.execute();
        }
    };
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('attr.id'),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
    ], RecaptchaComponent.prototype, "id", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], RecaptchaComponent.prototype, "siteKey", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], RecaptchaComponent.prototype, "theme", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], RecaptchaComponent.prototype, "type", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], RecaptchaComponent.prototype, "size", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
    ], RecaptchaComponent.prototype, "tabIndex", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], RecaptchaComponent.prototype, "badge", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
    ], RecaptchaComponent.prototype, "resolved", void 0);
    RecaptchaComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([ Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(RECAPTCHA_SETTINGS)),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"],
            RecaptchaLoaderService,
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], Object])
    ], RecaptchaComponent);
RecaptchaComponent.ɵfac = function RecaptchaComponent_Factory(t) { return new (t || RecaptchaComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](RecaptchaLoaderService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](RECAPTCHA_SETTINGS, 8)); };
RecaptchaComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: RecaptchaComponent, selectors: [["re-captcha"]], hostVars: 1, hostBindings: function RecaptchaComponent_HostBindings(rf, ctx) { if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("id", ctx.id);
    } }, inputs: { id: "id", siteKey: "siteKey", theme: "theme", type: "type", size: "size", badge: "badge", tabIndex: "tabIndex" }, outputs: { resolved: "resolved" }, exportAs: ["reCaptcha"], decls: 0, vars: 0, template: function RecaptchaComponent_Template(rf, ctx) { }, encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](RecaptchaComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                exportAs: 'reCaptcha',
                selector: 're-captcha',
                template: ""
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }, { type: RecaptchaLoaderService }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }, { type: Object, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
                args: [RECAPTCHA_SETTINGS]
            }] }]; }, { id: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }, {
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"],
            args: ['attr.id']
        }], resolved: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"]
        }], siteKey: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], theme: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], type: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], size: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], badge: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], tabIndex: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }] }); })();
    return RecaptchaComponent;
}());

var RecaptchaCommonModule = /** @class */ (function () {
    function RecaptchaCommonModule() {
    }
RecaptchaCommonModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: RecaptchaCommonModule });
RecaptchaCommonModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function RecaptchaCommonModule_Factory(t) { return new (t || RecaptchaCommonModule)(); } });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](RecaptchaCommonModule, { declarations: [RecaptchaComponent], exports: [RecaptchaComponent] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](RecaptchaCommonModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    RecaptchaComponent,
                ],
                exports: [
                    RecaptchaComponent,
                ]
            }]
    }], function () { return []; }, null); })();
    return RecaptchaCommonModule;
}());

var RecaptchaModule = /** @class */ (function () {
    function RecaptchaModule() {
    }
    RecaptchaModule_1 = RecaptchaModule;
    // We need this to maintain backwards-compatibility with v4. Removing this will be a breaking change
    RecaptchaModule.forRoot = function () {
        return RecaptchaModule_1;
    };
RecaptchaModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: RecaptchaModule });
RecaptchaModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function RecaptchaModule_Factory(t) { return new (t || RecaptchaModule)(); }, providers: [
        RecaptchaLoaderService,
    ], imports: [[
            RecaptchaCommonModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](RecaptchaModule, { imports: [RecaptchaCommonModule], exports: [RecaptchaComponent] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](RecaptchaModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                exports: [
                    RecaptchaComponent,
                ],
                imports: [
                    RecaptchaCommonModule,
                ],
                providers: [
                    RecaptchaLoaderService,
                ]
            }]
    }], function () { return []; }, null); })();
    return RecaptchaModule;
    var RecaptchaModule_1;
}());

var RECAPTCHA_V3_SITE_KEY = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('recaptcha-v3-site-key');
/**
 * The main service for working with reCAPTCHA v3 APIs.
 *
 * Use the `execute` method for executing a single action, and
 * `onExecute` observable for listening to all actions at once.
 */
var ReCaptchaV3Service = /** @class */ (function () {
    function ReCaptchaV3Service(zone, siteKey, 
    // tslint:disable-next-line:no-any
    platformId, baseUrl, nonce) {
        var _this = this;
        /** @internal */
        this.onLoadComplete = function (grecaptcha) {
            _this.grecaptcha = grecaptcha;
            if (_this.actionBacklog && _this.actionBacklog.length > 0) {
                _this.actionBacklog.forEach(function (_a) {
                    var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), action = _b[0], subject = _b[1];
                    return _this.executeActionWithSubject(action, subject);
                });
                _this.actionBacklog = undefined;
            }
        };
        this.zone = zone;
        this.isBrowser = Object(_angular_common__WEBPACK_IMPORTED_MODULE_2__["isPlatformBrowser"])(platformId);
        this.siteKey = siteKey;
        this.nonce = nonce;
        this.baseUrl = baseUrl;
        this.init();
    }
    Object.defineProperty(ReCaptchaV3Service.prototype, "onExecute", {
        get: function () {
            if (!this.onExecuteSubject) {
                this.onExecuteSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
                this.onExecuteObservable = this.onExecuteSubject.asObservable();
            }
            return this.onExecuteObservable;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Executes the provided `action` with reCAPTCHA v3 API.
     * Use the emitted token value for verification purposes on the backend.
     *
     * For more information about reCAPTCHA v3 actions and tokens refer to the official documentation at
     * https://developers.google.com/recaptcha/docs/v3.
     *
     * @param {string} action the action to execute
     * @returns {Observable<string>} an `Observable` that will emit the reCAPTCHA v3 string `token` value whenever ready.
     * The returned `Observable` completes immediately after emitting a value.
     */
    ReCaptchaV3Service.prototype.execute = function (action) {
        var subject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        if (this.isBrowser) {
            if (!this.grecaptcha) {
                // todo: add to array of later executions
                if (!this.actionBacklog) {
                    this.actionBacklog = [];
                }
                this.actionBacklog.push([action, subject]);
            }
            else {
                this.executeActionWithSubject(action, subject);
            }
        }
        return subject.asObservable();
    };
    /** @internal */
    ReCaptchaV3Service.prototype.executeActionWithSubject = function (action, subject) {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            // tslint:disable-next-line:no-any
            _this.grecaptcha.execute(_this.siteKey, { action: action }).then(function (token) {
                _this.zone.run(function () {
                    subject.next(token);
                    subject.complete();
                    if (_this.onExecuteSubject) {
                        _this.onExecuteSubject.next({ action: action, token: token });
                    }
                });
            });
        });
    };
    /** @internal */
    ReCaptchaV3Service.prototype.init = function () {
        if (this.isBrowser) {
            if ('grecaptcha' in window) {
                this.grecaptcha = grecaptcha;
            }
            else {
                loadScript(this.siteKey, this.onLoadComplete, '', this.baseUrl, this.nonce);
            }
        }
    };
    ReCaptchaV3Service = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([ Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(RECAPTCHA_V3_SITE_KEY)),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_1__["PLATFORM_ID"])),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(RECAPTCHA_BASE_URL)),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(RECAPTCHA_NONCE)),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], String, Object, String, String])
    ], ReCaptchaV3Service);
ReCaptchaV3Service.ɵfac = function ReCaptchaV3Service_Factory(t) { return new (t || ReCaptchaV3Service)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](RECAPTCHA_V3_SITE_KEY), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["PLATFORM_ID"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](RECAPTCHA_BASE_URL, 8), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](RECAPTCHA_NONCE, 8)); };
ReCaptchaV3Service.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: ReCaptchaV3Service, factory: function (t) { return ReCaptchaV3Service.ɵfac(t); } });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](ReCaptchaV3Service, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }, { type: String, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
                args: [RECAPTCHA_V3_SITE_KEY]
            }] }, { type: Object, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
                args: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["PLATFORM_ID"]]
            }] }, { type: String, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
                args: [RECAPTCHA_BASE_URL]
            }] }, { type: String, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
                args: [RECAPTCHA_NONCE]
            }] }]; }, null); })();
    return ReCaptchaV3Service;
}());

var RecaptchaV3Module = /** @class */ (function () {
    function RecaptchaV3Module() {
    }
RecaptchaV3Module.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: RecaptchaV3Module });
RecaptchaV3Module.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function RecaptchaV3Module_Factory(t) { return new (t || RecaptchaV3Module)(); }, providers: [
        ReCaptchaV3Service,
    ] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](RecaptchaV3Module, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                providers: [
                    ReCaptchaV3Service,
                ]
            }]
    }], function () { return []; }, null); })();
    return RecaptchaV3Module;
}());

var RecaptchaValueAccessorDirective = /** @class */ (function () {
    function RecaptchaValueAccessorDirective(host) {
        this.host = host;
    }
    RecaptchaValueAccessorDirective_1 = RecaptchaValueAccessorDirective;
    RecaptchaValueAccessorDirective.prototype.writeValue = function (value) {
        if (!value) {
            this.host.reset();
        }
    };
    RecaptchaValueAccessorDirective.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    RecaptchaValueAccessorDirective.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    RecaptchaValueAccessorDirective.prototype.onResolve = function ($event) {
        if (this.onChange) {
            this.onChange($event);
        }
        if (this.onTouched) {
            this.onTouched();
        }
    };
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('resolved', ['$event']),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [String]),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
    ], RecaptchaValueAccessorDirective.prototype, "onResolve", null);
    RecaptchaValueAccessorDirective = RecaptchaValueAccessorDirective_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([ Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [RecaptchaComponent])
    ], RecaptchaValueAccessorDirective);
RecaptchaValueAccessorDirective.ɵfac = function RecaptchaValueAccessorDirective_Factory(t) { return new (t || RecaptchaValueAccessorDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](RecaptchaComponent)); };
RecaptchaValueAccessorDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({ type: RecaptchaValueAccessorDirective, selectors: [["re-captcha", "formControlName", ""], ["re-captcha", "formControl", ""], ["re-captcha", "ngModel", ""]], hostBindings: function RecaptchaValueAccessorDirective_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("resolved", function RecaptchaValueAccessorDirective_resolved_HostBindingHandler($event) { return ctx.onResolve($event); });
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([
            {
                multi: true,
                provide: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALUE_ACCESSOR"],
                // tslint:disable-next-line:no-forward-ref
                useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () { return RecaptchaValueAccessorDirective_1; })
            },
        ])] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](RecaptchaValueAccessorDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
                providers: [
                    {
                        multi: true,
                        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALUE_ACCESSOR"],
                        // tslint:disable-next-line:no-forward-ref
                        useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () { return RecaptchaValueAccessorDirective_1; })
                    },
                ],
                // tslint:disable-next-line:directive-selector
                selector: 're-captcha[formControlName],re-captcha[formControl],re-captcha[ngModel]'
            }]
    }], function () { return [{ type: RecaptchaComponent }]; }, { onResolve: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"],
            args: ['resolved', ['$event']]
        }] }); })();
    return RecaptchaValueAccessorDirective;
    var RecaptchaValueAccessorDirective_1;
}());

var RecaptchaFormsModule = /** @class */ (function () {
    function RecaptchaFormsModule() {
    }
RecaptchaFormsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: RecaptchaFormsModule });
RecaptchaFormsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function RecaptchaFormsModule_Factory(t) { return new (t || RecaptchaFormsModule)(); }, imports: [[_angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], RecaptchaCommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](RecaptchaFormsModule, { declarations: function () { return [RecaptchaValueAccessorDirective]; }, imports: function () { return [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
        RecaptchaCommonModule]; }, exports: function () { return [RecaptchaValueAccessorDirective]; } }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](RecaptchaFormsModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    RecaptchaValueAccessorDirective,
                ],
                exports: [RecaptchaValueAccessorDirective],
                imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], RecaptchaCommonModule]
            }]
    }], function () { return []; }, null); })();
    return RecaptchaFormsModule;
}());

/**
 * Generated bundle index. Do not edit.
 */



//# sourceMappingURL=ng-recaptcha.js.map

/***/ })

}]);
//# sourceMappingURL=default~modules-auth-auth-module~modules-auth-private-auth-private-module.js.map