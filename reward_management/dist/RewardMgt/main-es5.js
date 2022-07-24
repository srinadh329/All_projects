(function () {
  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (self["webpackChunkreward_mgt"] = self["webpackChunkreward_mgt"] || []).push([["main"], {
    /***/
    98255:
    /*!*******************************************************!*\
      !*** ./$_lazy_route_resources/ lazy namespace object ***!
      \*******************************************************/

    /***/
    function _(module) {
      function webpackEmptyAsyncContext(req) {
        // Here Promise.resolve().then() is used instead of new Promise() to prevent
        // uncaught exception popping up in devtools
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        });
      }

      webpackEmptyAsyncContext.keys = function () {
        return [];
      };

      webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
      webpackEmptyAsyncContext.id = 98255;
      module.exports = webpackEmptyAsyncContext;
      /***/
    },

    /***/
    90158:
    /*!***************************************!*\
      !*** ./src/app/app-routing.module.ts ***!
      \***************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AppRoutingModule": function AppRoutingModule() {
          return (
            /* binding */
            _AppRoutingModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! @angular/router */
      39895);
      /* harmony import */


      var _authentication_login_login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./authentication/login/login.component */
      67353);
      /* harmony import */


      var _authentication_signup_signup_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./authentication/signup/signup.component */
      7794);
      /* harmony import */


      var _dashboard_layout_header_header_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./dashboard/layout/header/header.component */
      1860);
      /* harmony import */


      var _dashboard_create_reward_create_reward_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./dashboard/create-reward/create-reward.component */
      8259);
      /* harmony import */


      var _dashboard_reward_details_reward_details_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./dashboard/reward-details/reward-details.component */
      18996);
      /* harmony import */


      var _dashboard_invoices_invoices_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./dashboard/invoices/invoices.component */
      27214);
      /* harmony import */


      var _dashboard_rewards_rewards_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./dashboard/rewards/rewards.component */
      17450);
      /* harmony import */


      var _dashboard_cancelled_rewards_cancelled_rewards_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ./dashboard/cancelled-rewards/cancelled-rewards.component */
      86405);
      /* harmony import */


      var _dashboard_payments_payments_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ./dashboard/payments/payments.component */
      59450);
      /* harmony import */


      var _dashboard_invoice_payment_invoice_payment_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ./dashboard/invoice-payment/invoice-payment.component */
      16025);
      /* harmony import */


      var _dashboard_reward_details_transaction_details_transaction_details_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ./dashboard/reward-details/transaction-details/transaction-details.component */
      38249);
      /* harmony import */


      var _authentication_recover_password_recover_password_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ./authentication/recover-password/recover-password.component */
      77936);
      /* harmony import */


      var _services_auth_guard__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! ./services/auth.guard */
      98063);
      /* harmony import */


      var _dashboard_return_items_return_items_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! ./dashboard/return-items/return-items.component */
      77893);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! @angular/core */
      37716);

      var routes = [{
        path: 'login',
        component: _authentication_login_login_component__WEBPACK_IMPORTED_MODULE_0__.LoginComponent
      }, {
        path: 'signup',
        component: _authentication_signup_signup_component__WEBPACK_IMPORTED_MODULE_1__.SignupComponent
      }, {
        path: 'signup/:email/:id',
        component: _authentication_signup_signup_component__WEBPACK_IMPORTED_MODULE_1__.SignupComponent
      }, {
        path: 'recoverPassword/:token/:email/:date',
        component: _authentication_recover_password_recover_password_component__WEBPACK_IMPORTED_MODULE_11__.RecoverPasswordComponent
      }, {
        path: 'header',
        component: _dashboard_layout_header_header_component__WEBPACK_IMPORTED_MODULE_2__.HeaderComponent
      }, {
        path: 'create-reward',
        component: _dashboard_create_reward_create_reward_component__WEBPACK_IMPORTED_MODULE_3__.CreateRewardComponent,
        canActivate: [_services_auth_guard__WEBPACK_IMPORTED_MODULE_12__.AuthGuard]
      }, {
        path: 'rewards',
        component: _dashboard_rewards_rewards_component__WEBPACK_IMPORTED_MODULE_6__.RewardsComponent,
        canActivate: [_services_auth_guard__WEBPACK_IMPORTED_MODULE_12__.AuthGuard]
      }, {
        path: 'reward-details',
        component: _dashboard_reward_details_reward_details_component__WEBPACK_IMPORTED_MODULE_4__.RewardDetailsComponent,
        canActivate: [_services_auth_guard__WEBPACK_IMPORTED_MODULE_12__.AuthGuard]
      }, {
        path: 'reward-details/transactions/:id',
        component: _dashboard_reward_details_transaction_details_transaction_details_component__WEBPACK_IMPORTED_MODULE_10__.TransactionDetailsComponent,
        canActivate: [_services_auth_guard__WEBPACK_IMPORTED_MODULE_12__.AuthGuard]
      }, {
        path: 'invoices',
        component: _dashboard_invoices_invoices_component__WEBPACK_IMPORTED_MODULE_5__.InvoicesComponent,
        canActivate: [_services_auth_guard__WEBPACK_IMPORTED_MODULE_12__.AuthGuard]
      }, {
        path: 'cancelled-rewards',
        component: _dashboard_cancelled_rewards_cancelled_rewards_component__WEBPACK_IMPORTED_MODULE_7__.CancelledRewardsComponent,
        canActivate: [_services_auth_guard__WEBPACK_IMPORTED_MODULE_12__.AuthGuard]
      }, {
        path: 'payments',
        component: _dashboard_payments_payments_component__WEBPACK_IMPORTED_MODULE_8__.PaymentsComponent,
        canActivate: [_services_auth_guard__WEBPACK_IMPORTED_MODULE_12__.AuthGuard]
      }, {
        path: 'invoices-payment',
        component: _dashboard_invoice_payment_invoice_payment_component__WEBPACK_IMPORTED_MODULE_9__.InvoicePaymentComponent,
        canActivate: [_services_auth_guard__WEBPACK_IMPORTED_MODULE_12__.AuthGuard]
      }, {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      }, {
        path: 'reward-details/transactions/refund/:id/:orderId',
        component: _dashboard_return_items_return_items_component__WEBPACK_IMPORTED_MODULE_13__.ReturnItemsComponent
      }, {
        path: 'superadmin',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() */
          "src_app_admin-auth_admin-auth_module_ts").then(__webpack_require__.bind(__webpack_require__,
          /*! ./admin-auth/admin-auth.module */
          93817)).then(function (m) {
            return m.AdminAuthModule;
          });
        }
      }, {
        path: 'superadmin/dashboard',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() */
          "src_app_admin-dashboard_admin-dashboard_module_ts").then(__webpack_require__.bind(__webpack_require__,
          /*! ./admin-dashboard/admin-dashboard.module */
          73870)).then(function (m) {
            return m.AdminDashboardModule;
          });
        }
      }];

      var _AppRoutingModule = function _AppRoutingModule() {
        _classCallCheck(this, _AppRoutingModule);
      };

      _AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) {
        return new (t || _AppRoutingModule)();
      };

      _AppRoutingModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineNgModule"]({
        type: _AppRoutingModule
      });
      _AppRoutingModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineInjector"]({
        imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_15__.RouterModule.forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_15__.RouterModule]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵsetNgModuleScope"](_AppRoutingModule, {
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_15__.RouterModule],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_15__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    55041:
    /*!**********************************!*\
      !*** ./src/app/app.component.ts ***!
      \**********************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AppComponent": function AppComponent() {
          return (
            /* binding */
            _AppComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var _services_storage_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./services/storage.service */
      71188);
      /* harmony import */


      var _services_rewardmgt_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./services/rewardmgt.service */
      81856);
      /* harmony import */


      var _services_client_side_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./services/client-side.service */
      64166);
      /* harmony import */


      var _services_admin_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./services/admin.service */
      87501);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/router */
      39895);
      /* harmony import */


      var ngx_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ngx-spinner */
      79866);

      var _AppComponent = /*#__PURE__*/function () {
        function _AppComponent(storage, reward, clientSide, admin) {
          _classCallCheck(this, _AppComponent);

          this.storage = storage;
          this.reward = reward;
          this.clientSide = clientSide;
          this.admin = admin;
          this.title = 'RewardMgt';
        }

        _createClass(_AppComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.propertyId = this.storage.getPropertyId();
            if (this.propertyId) this.getBuildingAmount(this.propertyId);

            if (this.clientSide.checkPlatformBrowser()) {
              this.admin.getBuildingList();
            }
          }
        }, {
          key: "getBuildingAmount",
          value: function getBuildingAmount(id) {
            this.reward.getBuildingAmount(id);
          }
        }]);

        return _AppComponent;
      }();

      _AppComponent.ɵfac = function AppComponent_Factory(t) {
        return new (t || _AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_storage_service__WEBPACK_IMPORTED_MODULE_0__.StorageService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_rewardmgt_service__WEBPACK_IMPORTED_MODULE_1__.RewardmgtService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_client_side_service__WEBPACK_IMPORTED_MODULE_2__.ClientSideService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_admin_service__WEBPACK_IMPORTED_MODULE_3__.AdminService));
      };

      _AppComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
        type: _AppComponent,
        selectors: [["app-root"]],
        decls: 4,
        vars: 0,
        consts: [["bdColor", "rgba(51,51,51,0.8)", "size", "medium", "color", "#fff", "type", "ball-atom"], [2, "font-size", "20px", "color", "white"]],
        template: function AppComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "router-outlet");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "ngx-spinner", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "p", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "Loading...");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          }
        },
        directives: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterOutlet, ngx_spinner__WEBPACK_IMPORTED_MODULE_6__.NgxSpinnerComponent],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"]
      });
      /***/
    },

    /***/
    36747:
    /*!*******************************!*\
      !*** ./src/app/app.module.ts ***!
      \*******************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AppModule": function AppModule() {
          return (
            /* binding */
            _AppModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(
      /*! @angular/platform-browser */
      39075);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(
      /*! @angular/forms */
      3679);
      /* harmony import */


      var ngx_spinner__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(
      /*! ngx-spinner */
      79866);
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
      /*! @angular/common/http */
      91841);
      /* harmony import */


      var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./app-routing.module */
      90158);
      /* harmony import */


      var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./app.component */
      55041);
      /* harmony import */


      var _dashboard_layout_header_header_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./dashboard/layout/header/header.component */
      1860);
      /* harmony import */


      var _dashboard_layout_footer_footer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./dashboard/layout/footer/footer.component */
      86169);
      /* harmony import */


      var _authentication_login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./authentication/login/login.component */
      67353);
      /* harmony import */


      var _authentication_signup_signup_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./authentication/signup/signup.component */
      7794);
      /* harmony import */


      var _dashboard_create_reward_create_reward_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./dashboard/create-reward/create-reward.component */
      8259);
      /* harmony import */


      var _dashboard_layout_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ./dashboard/layout/sidebar/sidebar.component */
      31658);
      /* harmony import */


      var _dashboard_reward_details_reward_details_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ./dashboard/reward-details/reward-details.component */
      18996);
      /* harmony import */


      var _dashboard_invoices_invoices_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ./dashboard/invoices/invoices.component */
      27214);
      /* harmony import */


      var _dashboard_rewards_rewards_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ./dashboard/rewards/rewards.component */
      17450);
      /* harmony import */


      var _dashboard_cancelled_rewards_cancelled_rewards_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ./dashboard/cancelled-rewards/cancelled-rewards.component */
      86405);
      /* harmony import */


      var _shared_shared_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! ./shared/shared.module */
      44466);
      /* harmony import */


      var _interceptor_interceptor__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! ./interceptor/interceptor */
      45635);
      /* harmony import */


      var _dashboard_payments_payments_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! ./dashboard/payments/payments.component */
      59450);
      /* harmony import */


      var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(
      /*! @angular/platform-browser/animations */
      75835);
      /* harmony import */


      var ngx_toastr__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(
      /*! ngx-toastr */
      49344);
      /* harmony import */


      var _dashboard_invoice_payment_invoice_payment_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! ./dashboard/invoice-payment/invoice-payment.component */
      16025);
      /* harmony import */


      var _dashboard_reward_details_transaction_details_transaction_details_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! ./dashboard/reward-details/transaction-details/transaction-details.component */
      38249);
      /* harmony import */


      var _authentication_recover_password_recover_password_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! ./authentication/recover-password/recover-password.component */
      77936);
      /* harmony import */


      var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(
      /*! @ng-bootstrap/ng-bootstrap */
      12664);
      /* harmony import */


      var ngx_infinite_scroll__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
      /*! ngx-infinite-scroll */
      39210);
      /* harmony import */


      var _dashboard_return_items_return_items_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
      /*! ./dashboard/return-items/return-items.component */
      77893);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
      /*! @angular/core */
      37716);

      var _AppModule = function _AppModule() {
        _classCallCheck(this, _AppModule);
      };

      _AppModule.ɵfac = function AppModule_Factory(t) {
        return new (t || _AppModule)();
      };

      _AppModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdefineNgModule"]({
        type: _AppModule,
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent]
      });
      _AppModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdefineInjector"]({
        providers: [{
          provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_21__.HTTP_INTERCEPTORS,
          useClass: _interceptor_interceptor__WEBPACK_IMPORTED_MODULE_13__.Interceptor,
          multi: true
        }],
        imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_22__.BrowserModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_23__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_23__.ReactiveFormsModule, ngx_spinner__WEBPACK_IMPORTED_MODULE_24__.NgxSpinnerModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_21__.HttpClientModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_12__.SharedModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_21__.HttpClientModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_25__.BrowserAnimationsModule, ngx_toastr__WEBPACK_IMPORTED_MODULE_26__.ToastrModule.forRoot(), _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_27__.NgbModule, ngx_infinite_scroll__WEBPACK_IMPORTED_MODULE_18__.InfiniteScrollModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵsetNgModuleScope"](_AppModule, {
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent, _dashboard_layout_header_header_component__WEBPACK_IMPORTED_MODULE_2__.HeaderComponent, _dashboard_layout_footer_footer_component__WEBPACK_IMPORTED_MODULE_3__.FooterComponent, _authentication_login_login_component__WEBPACK_IMPORTED_MODULE_4__.LoginComponent, _authentication_signup_signup_component__WEBPACK_IMPORTED_MODULE_5__.SignupComponent, _dashboard_create_reward_create_reward_component__WEBPACK_IMPORTED_MODULE_6__.CreateRewardComponent, _dashboard_layout_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_7__.SidebarComponent, _dashboard_rewards_rewards_component__WEBPACK_IMPORTED_MODULE_10__.RewardsComponent, _dashboard_reward_details_reward_details_component__WEBPACK_IMPORTED_MODULE_8__.RewardDetailsComponent, _dashboard_invoices_invoices_component__WEBPACK_IMPORTED_MODULE_9__.InvoicesComponent, _dashboard_cancelled_rewards_cancelled_rewards_component__WEBPACK_IMPORTED_MODULE_11__.CancelledRewardsComponent, _dashboard_payments_payments_component__WEBPACK_IMPORTED_MODULE_14__.PaymentsComponent, _dashboard_invoice_payment_invoice_payment_component__WEBPACK_IMPORTED_MODULE_15__.InvoicePaymentComponent, _dashboard_reward_details_transaction_details_transaction_details_component__WEBPACK_IMPORTED_MODULE_16__.TransactionDetailsComponent, _authentication_recover_password_recover_password_component__WEBPACK_IMPORTED_MODULE_17__.RecoverPasswordComponent, _dashboard_return_items_return_items_component__WEBPACK_IMPORTED_MODULE_19__.ReturnItemsComponent],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_22__.BrowserModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_23__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_23__.ReactiveFormsModule, ngx_spinner__WEBPACK_IMPORTED_MODULE_24__.NgxSpinnerModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_21__.HttpClientModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_12__.SharedModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_21__.HttpClientModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_25__.BrowserAnimationsModule, ngx_toastr__WEBPACK_IMPORTED_MODULE_26__.ToastrModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_27__.NgbModule, ngx_infinite_scroll__WEBPACK_IMPORTED_MODULE_18__.InfiniteScrollModule]
        });
      })();
      /***/

    },

    /***/
    67353:
    /*!*********************************************************!*\
      !*** ./src/app/authentication/login/login.component.ts ***!
      \*********************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "LoginComponent": function LoginComponent() {
          return (
            /* binding */
            _LoginComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/forms */
      3679);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var _services_rewardmgt_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../services/rewardmgt.service */
      81856);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      39895);
      /* harmony import */


      var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ngx-cookie-service */
      31584);
      /* harmony import */


      var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ngx-toastr */
      49344);
      /* harmony import */


      var src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! src/app/services/storage.service */
      71188);
      /* harmony import */


      var ngx_spinner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ngx-spinner */
      79866);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/common */
      38583);

      function LoginComponent_span_26_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Enter email Id");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
      }

      function LoginComponent_span_32_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Enter valid password");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
      }

      function LoginComponent_div_53_div_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Please enter recovery email ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
      }

      function LoginComponent_div_53_div_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Please enter valid email ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
      }

      function LoginComponent_div_53_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Please provide your email");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "input", 43);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, LoginComponent_div_53_div_4_Template, 2, 0, "div", 38);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, LoginComponent_div_53_div_5_Template, 2, 0, "div", 38);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formControl", ctx_r5.emailControl);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r5.emailControl.touched && (ctx_r5.emailControl == null ? null : ctx_r5.emailControl.errors == null ? null : ctx_r5.emailControl.errors.required));

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r5.emailControl.touched && (ctx_r5.emailControl == null ? null : ctx_r5.emailControl.errors == null ? null : ctx_r5.emailControl.errors.email));
        }
      }

      function LoginComponent_div_54_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "An email has been sent. Please click the link when you receive it.");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
      }

      function LoginComponent_button_56_Template(rf, ctx) {
        if (rf & 1) {
          var _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function LoginComponent_button_56_Template_button_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r12);

            var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

            return ctx_r11.submitRecovery();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Email me a recovery link");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
      }

      function LoginComponent_button_57_Template(rf, ctx) {
        if (rf & 1) {
          var _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function LoginComponent_button_57_Template_button_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r14);

            var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

            return ctx_r13.emailControl.reset();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Close ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
      }

      var _c0 = function _c0() {
        return ["/", "superadmin"];
      };

      var _LoginComponent = /*#__PURE__*/function () {
        function _LoginComponent(auth, _router, cookieService, toastr, storage, spinner, reward) {
          _classCallCheck(this, _LoginComponent);

          this.auth = auth;
          this._router = _router;
          this.cookieService = cookieService;
          this.toastr = toastr;
          this.storage = storage;
          this.spinner = spinner;
          this.reward = reward;
          this.loginUserData = {
            loginEmail: '',
            loginPassword: ''
          };
          this.emailControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.email]);
          this.showRecoveryBlock = true;
        }

        _createClass(_LoginComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            document.getElementById("bgTheme").style.height = window.innerHeight.toString() + 'px';
          }
        }, {
          key: "singup",
          value: function singup() {
            this._router.navigateByUrl('/signup');
          }
        }, {
          key: "onSubmit",
          value: function onSubmit() {
            var _this = this;

            if (this.loginUserData.loginEmail != '' || this.loginUserData.loginPassword != '') {
              this.spinner.show();
              this.auth.onLogin(this.loginUserData.loginEmail, this.loginUserData.loginPassword).subscribe(function (data) {
                if (!(data === null || data === void 0 ? void 0 : data.message)) {
                  _this.spinner.hide();

                  _this.storage.setUserDetails(data);

                  _this.auth.getBuildingAmount(_this.storage.getPropertyId());

                  _this.toastr.success('Login Successful');

                  _this._router.navigate(['/create-reward']);
                } else {
                  _this.spinner.hide();

                  _this.toastr.error(data === null || data === void 0 ? void 0 : data.message);
                }
              });
            }
          }
        }, {
          key: "submitRecovery",
          value: function submitRecovery() {
            var _this2 = this;

            this.emailControl.markAllAsTouched();

            if (this.emailControl.valid) {
              //api call
              this.spinner.show();
              this.reward.forgotPassword(this.emailControl.value).subscribe(function (data) {
                _this2.spinner.hide();

                if (!data.message) {
                  _this2.showRecoveryBlock = !_this2.showRecoveryBlock;
                } else {
                  _this2.toastr.error("User is not available,Please sign up");
                }
              }, function (err) {
                _this2.spinner.hide();

                _this2.toastr.error("Network Error");
              });
            }
          }
        }]);

        return _LoginComponent;
      }();

      _LoginComponent.ɵfac = function LoginComponent_Factory(t) {
        return new (t || _LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_rewardmgt_service__WEBPACK_IMPORTED_MODULE_0__.RewardmgtService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](ngx_cookie_service__WEBPACK_IMPORTED_MODULE_5__.CookieService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_6__.ToastrService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_1__.StorageService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](ngx_spinner__WEBPACK_IMPORTED_MODULE_7__.NgxSpinnerService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_rewardmgt_service__WEBPACK_IMPORTED_MODULE_0__.RewardmgtService));
      };

      _LoginComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: _LoginComponent,
        selectors: [["app-login"]],
        decls: 58,
        vars: 10,
        consts: [[1, "container-fluid"], [1, "row", "vh-100"], [1, "col-lg-7", "col-md-12", "positive-relative"], [1, "logo", "p-5"], ["src", "https://ca-studentdev.inhabitr.com/assets/img/inhabitr_logo/caLogoNew.png", "width", "200", "height", "100", "alt", "alt_text", 2, "max-width", "100px", "height", "auto"], [1, "login-main"], ["src", "../../assets/rewards-image.png"], [1, "admin"], [2, "color", "#858181"], [1, "col-lg-5", "col-md-12", "p-0", "bg-theme"], ["id", "bgTheme", 1, "m-auto", "login-align"], [1, "mt-5", "text-center", 2, "font-weight", "600"], [1, "text-center", 2, "font-weight", "100 !important", "color", "#ffffff"], [1, "login-form"], [3, "ngSubmit"], ["loginForm", "ngForm"], [1, "form-group"], [1, "mb-1"], ["required", "", "type", "text", "name", "username", "placeholder", "Enter your Email ID", 1, "form-control", "padding-input", "login_control", 3, "ngModel", "ngModelChange"], ["username", "ngModel"], ["class", "error", 4, "ngIf"], ["type", "password", "required", "", "name", "password", "ngModel", "", "placeholder", "Enter your Password", 1, "form-control", "padding-input", "login_control", 3, "ngModel", "ngModelChange"], ["password", "ngModel"], [1, "form-group", "text-end"], ["data-bs-toggle", "modal", "data-bs-target", "#forgotPassword", 1, "mb-3", "align-right", "forgot-password", 3, "click"], [1, "text-center", "login-block"], ["type", "submit", 1, "btn", "btn-primary", "mb-4"], [1, "form-group", "text-end", "mt-3"], [1, "mb-3", "align-right", "forgot-password", 3, "routerLink"], ["id", "forgotPassword", "tabindex", "-1", "aria-labelledby", "forgotPasswordLabel", "aria-hidden", "true", 1, "modal", "fade"], [1, "modal-dialog"], [1, "modal-content", "p-3"], [1, "modal-header", "border-0"], ["id", "forgotPasswordLabel", 1, "modal-title"], ["type", "button", "data-bs-dismiss", "modal", "aria-label", "Close", 1, "btn-close"], [1, "modal-body", "text-center"], [1, "border-bottom", "pb-2"], ["class", "form-group", 4, "ngIf"], [4, "ngIf"], [1, "modal-footer", "justify-content-center", "border-0"], ["type", "button", "class", "btn  btn_theme", 3, "click", 4, "ngIf"], ["type", "button", "class", "btn btn-primary", "data-bs-dismiss", "modal", 3, "click", 4, "ngIf"], [1, "error"], ["type", "text", 1, "pass_recovery", 3, "formControl"], ["type", "button", 1, "btn", "btn_theme", 3, "click"], ["type", "button", "data-bs-dismiss", "modal", 1, "btn", "btn-primary", 3, "click"]],
        template: function LoginComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "img", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "img", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "h3", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "REWARDS ADMINISTRATION");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "p", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Manage you CA resident's rewards, balances and invoices .");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "div", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "h4", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "WELCOME BACK");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "p", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, "Sign In to your Account");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "div", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "form", 14, 15);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function LoginComponent_Template_form_ngSubmit_19_listener() {
              return ctx.onSubmit();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "div", 16);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "label", 17);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23, "Email ID");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "input", 18, 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function LoginComponent_Template_input_ngModelChange_24_listener($event) {
              return ctx.loginUserData.loginEmail = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](26, LoginComponent_span_26_Template, 2, 0, "span", 20);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "div", 16);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](28, "label", 17);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](29, "Password");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](30, "input", 21, 22);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function LoginComponent_Template_input_ngModelChange_30_listener($event) {
              return ctx.loginUserData.loginPassword = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](32, LoginComponent_span_32_Template, 2, 0, "span", 20);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](33, "div", 23);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](34, "a", 24);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function LoginComponent_Template_a_click_34_listener() {
              return ctx.showRecoveryBlock = true;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](35, "Forgot Password?");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](36, "div", 25);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](37, "button", 26);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](38, "LOGIN");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](39, "br");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](40, "div", 27);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](41, "a", 28);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](42, "Super Admin");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](43, "div", 29);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](44, "div", 30);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](45, "div", 31);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](46, "div", 32);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](47, "h5", 33);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](48, "Modal title");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](49, "button", 34);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](50, "div", 35);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](51, "h3", 36);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](52, "RECOVER PASSWORD");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](53, LoginComponent_div_53_Template, 6, 3, "div", 37);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](54, LoginComponent_div_54_Template, 3, 0, "div", 38);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](55, "div", 39);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](56, LoginComponent_button_56_Template, 2, 0, "button", 40);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](57, LoginComponent_button_57_Template, 2, 0, "button", 41);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            var _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](25);

            var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](31);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](24);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.loginUserData.loginEmail);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _r1.invalid && _r1.touched);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.loginUserData.loginPassword);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _r3.invalid && _r3.touched);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](9);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](9, _c0));

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](12);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.showRecoveryBlock);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.showRecoveryBlock);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.showRecoveryBlock);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.showRecoveryBlock);
          }
        },
        directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgForm, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLinkWithHref, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlDirective],
        styles: [".sidenav[_ngcontent-%COMP%] {\r\n    float: left;\r\n    width: 60%;\r\n    background-color: #fff;\r\n}\r\n\r\n.login-main[_ngcontent-%COMP%] {\r\n    position: absolute;\r\n    display: flex;\r\n    justify-content: center;\r\n    flex-direction: column;\r\n    padding: 0 40px;\r\n    top: 0;\r\n    height: 100%;\r\n    width: 50%;\r\n    text-align: center;\r\n    left: 30%;\r\n    top: 50%;\r\n    transform: translate(-50%, -50%);\r\n}\r\n\r\n.login-form[_ngcontent-%COMP%] {\r\n    width: 80%;\r\n    margin: auto;\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\r\n    display: block;\r\n    position: relative;\r\n    padding: 38px 3px 16px 3px;\r\n    line-height: 16px;\r\n    letter-spacing: 0.04em;\r\n    color: #ffffff;\r\n    font-weight: 300;\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%]    > input[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    height: 42px;\r\n    \r\n    border-radius: 2px;\r\n    border: #dc3f0e;\r\n}\r\n\r\n.align-right[_ngcontent-%COMP%] {\r\n    text-align: right;\r\n}\r\n\r\nh5[_ngcontent-%COMP%], h4[_ngcontent-%COMP%] {\r\n    color: #ffffff;\r\n}\r\n\r\n.submit[_ngcontent-%COMP%] {\r\n    padding: 79px 0px 0px 54px;\r\n    display: grid;\r\n}\r\n\r\n.btn-primary[_ngcontent-%COMP%] {\r\n    width: 295.41px;\r\n    border-radius: 50px;\r\n    background: #339ff1;\r\n    border: none;\r\n    height: 46px;\r\n    letter-spacing: 0.04em;\r\n    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);\r\n}\r\n\r\n\r\n\r\n.error[_ngcontent-%COMP%] {\r\n    color: #fff;\r\n}\r\n\r\n.login_control[_ngcontent-%COMP%] {\r\n    background: url('user-icon.png') no-repeat 3% 50% !important;\r\n    background-size: 20px 20px !important;\r\n    color: #ffffff;\r\n    background-color: #dc3f0e !important;\r\n     box-shadow: inset 0px 4px 4px rgb(0 0 0 / 10%);\r\n}\r\n\r\ninput[type=\"password\"][_ngcontent-%COMP%] {\r\n    background: url('_-_-_-assets-password-icon.png') no-repeat 3% 50% !important;\r\n    background-size: 20px 20px !important;\r\n    color: #ffffff;\r\n    background-color: #dc3f0e !important;\r\n     box-shadow: inset 0px 4px 4px rgb(0 0 0 / 10%);\r\n}\r\n\r\n.login-align[_ngcontent-%COMP%] {\r\n    width: 80%;\r\n}\r\n\r\ninput[_ngcontent-%COMP%]::-moz-placeholder {\r\n    padding-left: 10px !important;\r\n    color: #ffffff;\r\n    font-weight: 300;\r\n    font-size: 14px;\r\n}\r\n\r\ninput[_ngcontent-%COMP%]:-ms-input-placeholder {\r\n    padding-left: 10px !important;\r\n    color: #ffffff;\r\n    font-weight: 300;\r\n    font-size: 14px;\r\n}\r\n\r\ninput[_ngcontent-%COMP%]::placeholder {\r\n    padding-left: 10px !important;\r\n    color: #ffffff;\r\n    font-weight: 300;\r\n    font-size: 14px;\r\n}\r\n\r\n.padding-input[_ngcontent-%COMP%] {\r\n    padding-left: 35px !important;\r\n}\r\n\r\n.admin[_ngcontent-%COMP%] {\r\n    font-style: normal;\r\n    font-weight: bold;\r\n    font-size: 20px;\r\n    color: #858181;\r\n    letter-spacing: 0.04em;\r\n}\r\n\r\n.forgot-password[_ngcontent-%COMP%] {\r\n    font-size: 12px !important;\r\n    padding-top: 18px;\r\n    color: #ffffff;\r\n    cursor: pointer;\r\n}\r\n\r\n.login-block[_ngcontent-%COMP%] {\r\n    margin-top: 60px !important;\r\n}\r\n\r\n.pass_recovery[_ngcontent-%COMP%] {\r\n    background-color: #f2f2f2 !important;\r\n    box-shadow: none;\r\n    border-radius: 5px;\r\n    border:none;\r\n    color: black !important;\r\n}\r\n\r\n.pass_recovery[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:focus{\r\n    border:none;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxXQUFXO0lBQ1gsVUFBVTtJQUNWLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLHNCQUFzQjtJQUN0QixlQUFlO0lBQ2YsTUFBTTtJQUNOLFlBQVk7SUFDWixVQUFVO0lBQ1Ysa0JBQWtCO0lBQ2xCLFNBQVM7SUFDVCxRQUFRO0lBQ1IsZ0NBQWdDO0FBQ3BDOztBQUVBO0lBQ0ksVUFBVTtJQUNWLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxjQUFjO0lBQ2Qsa0JBQWtCO0lBQ2xCLDBCQUEwQjtJQUMxQixpQkFBaUI7SUFDakIsc0JBQXNCO0lBQ3RCLGNBQWM7SUFDZCxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtJQUNaO3FEQUNpRDtJQUNqRCxrQkFBa0I7SUFDbEIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGlCQUFpQjtBQUNyQjs7QUFFQTs7SUFFSSxjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksMEJBQTBCO0lBQzFCLGFBQWE7QUFDakI7O0FBQ0E7SUFDSSxlQUFlO0lBQ2YsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQixZQUFZO0lBQ1osWUFBWTtJQUNaLHNCQUFzQjtJQUN0QiwyQ0FBMkM7QUFDL0M7O0FBRUE7Ozs7O0dBS0c7O0FBQ0g7SUFDSSxXQUFXO0FBQ2Y7O0FBRUE7SUFDSSw0REFBMEU7SUFDMUUscUNBQXFDO0lBQ3JDLGNBQWM7SUFDZCxvQ0FBb0M7S0FDbkMsOENBQThDO0FBQ25EOztBQUVBO0lBQ0ksNkVBQThFO0lBQzlFLHFDQUFxQztJQUNyQyxjQUFjO0lBQ2Qsb0NBQW9DO0tBQ25DLDhDQUE4QztBQUNuRDs7QUFFQTtJQUNJLFVBQVU7QUFDZDs7QUFFQTtJQUNJLDZCQUE2QjtJQUM3QixjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLGVBQWU7QUFDbkI7O0FBTEE7SUFDSSw2QkFBNkI7SUFDN0IsY0FBYztJQUNkLGdCQUFnQjtJQUNoQixlQUFlO0FBQ25COztBQUxBO0lBQ0ksNkJBQTZCO0lBQzdCLGNBQWM7SUFDZCxnQkFBZ0I7SUFDaEIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLDZCQUE2QjtBQUNqQzs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixpQkFBaUI7SUFDakIsZUFBZTtJQUNmLGNBQWM7SUFDZCxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSwwQkFBMEI7SUFDMUIsaUJBQWlCO0lBQ2pCLGNBQWM7SUFDZCxlQUFlO0FBQ25COztBQUVBO0lBQ0ksMkJBQTJCO0FBQy9COztBQUVBO0lBQ0ksb0NBQW9DO0lBQ3BDLGdCQUFnQjtJQUNoQixrQkFBa0I7SUFDbEIsV0FBVztJQUNYLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLFdBQVc7QUFDZiIsImZpbGUiOiJsb2dpbi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNpZGVuYXYge1xyXG4gICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICB3aWR0aDogNjAlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxufVxyXG5cclxuLmxvZ2luLW1haW4ge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIHBhZGRpbmc6IDAgNDBweDtcclxuICAgIHRvcDogMDtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHdpZHRoOiA1MCU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBsZWZ0OiAzMCU7XHJcbiAgICB0b3A6IDUwJTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xyXG59XHJcblxyXG4ubG9naW4tZm9ybSB7XHJcbiAgICB3aWR0aDogODAlO1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG59XHJcblxyXG4uZm9ybS1ncm91cCA+IGxhYmVsIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgcGFkZGluZzogMzhweCAzcHggMTZweCAzcHg7XHJcbiAgICBsaW5lLWhlaWdodDogMTZweDtcclxuICAgIGxldHRlci1zcGFjaW5nOiAwLjA0ZW07XHJcbiAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XHJcbn1cclxuXHJcbi5mb3JtLWdyb3VwID4gaW5wdXQge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDQycHg7XHJcbiAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiAjZGMzZjBlICFpbXBvcnRhbnQ7XHJcbiAgICBib3gtc2hhZG93OiBpbnNldCAwcHggNHB4IDRweCByZ2IoMCAwIDAgLyAxMCUpOyAqL1xyXG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xyXG4gICAgYm9yZGVyOiAjZGMzZjBlO1xyXG59XHJcblxyXG4uYWxpZ24tcmlnaHQge1xyXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbn1cclxuXHJcbmg1LFxyXG5oNCB7XHJcbiAgICBjb2xvcjogI2ZmZmZmZjtcclxufVxyXG5cclxuLnN1Ym1pdCB7XHJcbiAgICBwYWRkaW5nOiA3OXB4IDBweCAwcHggNTRweDtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbn1cclxuLmJ0bi1wcmltYXJ5IHtcclxuICAgIHdpZHRoOiAyOTUuNDFweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiAjMzM5ZmYxO1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgaGVpZ2h0OiA0NnB4O1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMDRlbTtcclxuICAgIGJveC1zaGFkb3c6IDBweCA0cHggNHB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XHJcbn1cclxuXHJcbi8qIGlucHV0Lm5nLWludmFsaWR7XHJcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJlZCAhaW1wb3J0YW50O1xyXG59XHJcbmlucHV0Lm5nLXZhbGlke1xyXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCBncmVlbiAhaW1wb3J0YW50O1xyXG59ICovXHJcbi5lcnJvciB7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxufVxyXG5cclxuLmxvZ2luX2NvbnRyb2wge1xyXG4gICAgYmFja2dyb3VuZDogdXJsKC4uLy4uLy4uL2Fzc2V0cy91c2VyLWljb24ucG5nKSBuby1yZXBlYXQgMyUgNTAlICFpbXBvcnRhbnQ7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDIwcHggMjBweCAhaW1wb3J0YW50O1xyXG4gICAgY29sb3I6ICNmZmZmZmY7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGMzZjBlICFpbXBvcnRhbnQ7XHJcbiAgICAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDRweCA0cHggcmdiKDAgMCAwIC8gMTAlKTtcclxufVxyXG5cclxuaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdIHtcclxuICAgIGJhY2tncm91bmQ6IHVybCguLi8uLi8uLi9hc3NldHMvcGFzc3dvcmQtaWNvbi5wbmcpIG5vLXJlcGVhdCAzJSA1MCUgIWltcG9ydGFudDtcclxuICAgIGJhY2tncm91bmQtc2l6ZTogMjBweCAyMHB4ICFpbXBvcnRhbnQ7XHJcbiAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkYzNmMGUgIWltcG9ydGFudDtcclxuICAgICBib3gtc2hhZG93OiBpbnNldCAwcHggNHB4IDRweCByZ2IoMCAwIDAgLyAxMCUpO1xyXG59XHJcblxyXG4ubG9naW4tYWxpZ24ge1xyXG4gICAgd2lkdGg6IDgwJTtcclxufVxyXG5cclxuaW5wdXQ6OnBsYWNlaG9sZGVyIHtcclxuICAgIHBhZGRpbmctbGVmdDogMTBweCAhaW1wb3J0YW50O1xyXG4gICAgY29sb3I6ICNmZmZmZmY7XHJcbiAgICBmb250LXdlaWdodDogMzAwO1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG59XHJcblxyXG4ucGFkZGluZy1pbnB1dCB7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDM1cHggIWltcG9ydGFudDtcclxufVxyXG5cclxuLmFkbWluIHtcclxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgY29sb3I6ICM4NTgxODE7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogMC4wNGVtO1xyXG59XHJcblxyXG4uZm9yZ290LXBhc3N3b3JkIHtcclxuICAgIGZvbnQtc2l6ZTogMTJweCAhaW1wb3J0YW50O1xyXG4gICAgcGFkZGluZy10b3A6IDE4cHg7XHJcbiAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmxvZ2luLWJsb2NrIHtcclxuICAgIG1hcmdpbi10b3A6IDYwcHggIWltcG9ydGFudDtcclxufVxyXG5cclxuLnBhc3NfcmVjb3Zlcnkge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2YyZjJmMiAhaW1wb3J0YW50O1xyXG4gICAgYm94LXNoYWRvdzogbm9uZTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIGJvcmRlcjpub25lO1xyXG4gICAgY29sb3I6IGJsYWNrICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5wYXNzX3JlY292ZXJ5IDpmb2N1c3tcclxuICAgIGJvcmRlcjpub25lO1xyXG59XHJcbiJdfQ== */"]
      });
      /***/
    },

    /***/
    77936:
    /*!*******************************************************************************!*\
      !*** ./src/app/authentication/recover-password/recover-password.component.ts ***!
      \*******************************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "RecoverPasswordComponent": function RecoverPasswordComponent() {
          return (
            /* binding */
            _RecoverPasswordComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/forms */
      3679);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/router */
      39895);
      /* harmony import */


      var src_app_services_rewardmgt_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/app/services/rewardmgt.service */
      81856);
      /* harmony import */


      var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ngx-toastr */
      49344);
      /* harmony import */


      var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ngx-spinner */
      79866);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/common */
      38583);

      function RecoverPasswordComponent_div_4_div_20_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Password is required. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      }

      function RecoverPasswordComponent_div_4_div_21_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Minimum 6 characters are required. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      }

      function RecoverPasswordComponent_div_4_div_27_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Confirm Password is required. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      }

      function RecoverPasswordComponent_div_4_div_28_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Confirm Password does not match with Password. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      }

      function RecoverPasswordComponent_div_4_Template(rf, ctx) {
        if (rf & 1) {
          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "h4", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "CHANGE PASSWORD");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "section");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "h5", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "In order to protect your account, make sure your password: ");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "\u2219 Is longer than 5 characters");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "\u2219 Does not match or significantly contain your username");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "form", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "div", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "label");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "NEW PASSWORD");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](19, "input", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](20, RecoverPasswordComponent_div_4_div_20_Template, 2, 0, "div", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](21, RecoverPasswordComponent_div_4_div_21_Template, 2, 0, "div", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "div", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "div", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "label");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](25, "RE-ENTER PASSWORD");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](26, "input", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](27, RecoverPasswordComponent_div_4_div_27_Template, 2, 0, "div", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](28, RecoverPasswordComponent_div_4_div_28_Template, 2, 0, "div", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "div", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "button", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function RecoverPasswordComponent_div_4_Template_button_click_30_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r7);

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

            return ctx_r6.submitPasswordChange();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](31, "CHANGE PASSWORD");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](13);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx_r0.passwordForm);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (ctx_r0.signUpControls["password"] == null ? null : ctx_r0.signUpControls["password"].touched) && (ctx_r0.signUpControls["password"] == null ? null : ctx_r0.signUpControls["password"].errors == null ? null : ctx_r0.signUpControls["password"].errors.required));

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (ctx_r0.signUpControls["password"] == null ? null : ctx_r0.signUpControls["password"].touched) && (ctx_r0.signUpControls["password"] == null ? null : ctx_r0.signUpControls["password"].errors == null ? null : ctx_r0.signUpControls["password"].errors.minlength));

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (ctx_r0.signUpControls["confirmPassword"] == null ? null : ctx_r0.signUpControls["confirmPassword"].touched) && (ctx_r0.signUpControls["confirmPassword"] == null ? null : ctx_r0.signUpControls["confirmPassword"].errors == null ? null : ctx_r0.signUpControls["confirmPassword"].errors.required) && !(ctx_r0.passwordForm == null ? null : ctx_r0.passwordForm.errors == null ? null : ctx_r0.passwordForm.errors.mismatch));

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (ctx_r0.signUpControls["confirmPassword"] == null ? null : ctx_r0.signUpControls["confirmPassword"].touched) && (ctx_r0.passwordForm == null ? null : ctx_r0.passwordForm.errors == null ? null : ctx_r0.passwordForm.errors.mismatch));
        }
      }

      function RecoverPasswordComponent_div_5_Template(rf, ctx) {
        if (rf & 1) {
          var _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "section");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "h5");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Your password has been reset successfully!");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "button", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function RecoverPasswordComponent_div_5_Template_button_click_7_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r9);

            var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

            return ctx_r8.login();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "LOGIN");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      }

      var _RecoverPasswordComponent = /*#__PURE__*/function () {
        function _RecoverPasswordComponent(formBuilder, router, route, reward, toastr, spinner) {
          var _this3 = this;

          _classCallCheck(this, _RecoverPasswordComponent);

          this.formBuilder = formBuilder;
          this.router = router;
          this.route = route;
          this.reward = reward;
          this.toastr = toastr;
          this.spinner = spinner;
          this.showPasswordForm = true;
          this.route.params.subscribe(function (val) {
            if (val && (val === null || val === void 0 ? void 0 : val.token) && (val === null || val === void 0 ? void 0 : val.email)) {
              _this3.tempPassword = val === null || val === void 0 ? void 0 : val.token.replace(':', '');
              _this3.email = val === null || val === void 0 ? void 0 : val.email;
            }
          });
        }

        _createClass(_RecoverPasswordComponent, [{
          key: "signUpControls",
          get: function get() {
            return this.passwordForm.controls;
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            this.initForm();
          }
        }, {
          key: "initForm",
          value: function initForm() {
            this.passwordForm = this.formBuilder.group({
              password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.minLength(6)]],
              confirmPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required]
            }, {
              validators: this.confirmPassword
            });
          }
        }, {
          key: "confirmPassword",
          value: function confirmPassword(group) {
            var _a, _b;

            var password = (_a = group.get('password')) === null || _a === void 0 ? void 0 : _a.value;
            var confirmPassword = (_b = group.get('confirmPassword')) === null || _b === void 0 ? void 0 : _b.value;

            if (password == confirmPassword) {
              return null;
            } else {
              return {
                'mismatch': true
              };
            }
          }
        }, {
          key: "submitPasswordChange",
          value: function submitPasswordChange() {
            var _this4 = this;

            var _a;

            this.passwordForm.markAllAsTouched();

            if (this.passwordForm.valid) {
              var obj = {
                email: this.email,
                newPassword: (_a = this.passwordForm.get('password')) === null || _a === void 0 ? void 0 : _a.value,
                tempPassword: this.tempPassword
              };
              this.spinner.show();
              this.reward.resetPassword(obj).subscribe(function (data) {
                _this4.spinner.hide();

                _this4.toastr.success("Password reset Sucessfull");

                _this4.showPasswordForm = !_this4.showPasswordForm;
              }, function (err) {
                _this4.spinner.hide();

                _this4.toastr.error(err.error.message);
              });
            }
          }
        }, {
          key: "login",
          value: function login() {
            this.router.navigate(['/login']);
          }
        }]);

        return _RecoverPasswordComponent;
      }();

      _RecoverPasswordComponent.ɵfac = function RecoverPasswordComponent_Factory(t) {
        return new (t || _RecoverPasswordComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_rewardmgt_service__WEBPACK_IMPORTED_MODULE_0__.RewardmgtService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_4__.ToastrService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](ngx_spinner__WEBPACK_IMPORTED_MODULE_5__.NgxSpinnerService));
      };

      _RecoverPasswordComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _RecoverPasswordComponent,
        selectors: [["app-recover-password"]],
        decls: 6,
        vars: 2,
        consts: [[1, "container"], [1, "logo"], ["src", "https://ca-studentdev.inhabitr.com/assets/img/inhabitr_logo/caLogoNew.png", "width", "200", "height", "100", "alt", "alt_text", "border", "0", "align", "center", 2, "width", "100%", "max-width", "100px", "height", "auto", "background", "#ffffff", "font-size", "15px", "line-height", "20px", "color", "#555555", "margin", "auto", "padding", "18px 0px 0px 0px"], [1, "card", "mt-4"], ["class", "card-body p-4", 4, "ngIf"], ["class", "card-body p-4 text-center d-flex align-items-center justify-content-center", "style", "min-height: 400px;", 4, "ngIf"], [1, "card-body", "p-4"], [1, "row"], [1, "col-lg-12", "col-md-12", "col-sm-12"], [1, "mt-5", "text-center", 2, "font-weight", "600"], [1, "mt-5", "text-center", 2, "font-weight", "500"], [3, "formGroup"], [1, "col-lg-6", "col-md-12", "col-sm-12"], [1, "form-group", "mt-4"], ["type", "password", "formControlName", "password", "placeholder", "Enter a password", 1, "form-control", "mt-4"], ["class", "err-msg mt-2", 4, "ngIf"], ["type", "password", "formControlName", "confirmPassword", "placeholder", "Enter a password", 1, "form-control", "mt-4"], [1, "mt-5", "text-center"], [1, "btn", "btn-primary", 3, "click"], [1, "err-msg", "mt-2"], [1, "card-body", "p-4", "text-center", "d-flex", "align-items-center", "justify-content-center", 2, "min-height", "400px"]],
        template: function RecoverPasswordComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "img", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, RecoverPasswordComponent_div_4_Template, 32, 5, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, RecoverPasswordComponent_div_5_Template, 9, 0, "div", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.showPasswordForm);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.showPasswordForm);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName],
        styles: [".card[_ngcontent-%COMP%] {\r\n    width: 60%;\r\n    margin: auto;\r\n    background: #ee5d2f;\r\n    border-radius: 15px;\r\n}\r\n\r\n.card-body[_ngcontent-%COMP%] {\r\n    padding: 20px;\r\n}\r\n\r\nh4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%] {\r\n    color: #ffff;\r\n}\r\n\r\np[_ngcontent-%COMP%] {\r\n    text-align: left;\r\n    padding-left: 13%;\r\n    letter-spacing: 0.04em;\r\n    color: #ffffff;\r\n    font-style: normal;\r\n    font-weight: 400;\r\n    font-size: 12px;\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%]    > input[_ngcontent-%COMP%] {\r\n    height: 42px;\r\n    background: #dc3f0e;\r\n    box-shadow: inset 0px 4px 4px rgb(0 0 0 / 10%);\r\n    border-radius: 2px;\r\n    border: #dc3f0e;\r\n    color: #ffffff;\r\n}\r\n\r\ninput[_ngcontent-%COMP%]::-moz-placeholder {\r\n    color: #e1e1e1;\r\n    font-style: normal;\r\n    font-weight: 300;\r\n    font-size: 14px;\r\n    line-height: 23px;\r\n    width: 90%;\r\n    letter-spacing: 0.06em;\r\n}\r\n\r\ninput[_ngcontent-%COMP%]:-ms-input-placeholder {\r\n    color: #e1e1e1;\r\n    font-style: normal;\r\n    font-weight: 300;\r\n    font-size: 14px;\r\n    line-height: 23px;\r\n    width: 90%;\r\n    letter-spacing: 0.06em;\r\n}\r\n\r\ninput[_ngcontent-%COMP%]::placeholder {\r\n    color: #e1e1e1;\r\n    font-style: normal;\r\n    font-weight: 300;\r\n    font-size: 14px;\r\n    line-height: 23px;\r\n    width: 90%;\r\n    letter-spacing: 0.06em;\r\n}\r\n\r\nlabel[_ngcontent-%COMP%] {\r\n    color: #ffffff;\r\n}\r\n\r\n.btn-primary[_ngcontent-%COMP%] {\r\n    width: auto;\r\n    border-radius: 50px;\r\n    background: #339ff1;\r\n    border: none;\r\n    height: 46px;\r\n    letter-spacing: 0.05em;\r\n    font-size: 19px;\r\n    line-height: 27px;\r\n}\r\n\r\n.err-msg[_ngcontent-%COMP%] {\r\n    color:#ffffff;\r\n}\r\n\r\n@media  screen and (max-width:768px) {\r\n    \r\n    .card[_ngcontent-%COMP%] {\r\n        width:100%\r\n    }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY292ZXItcGFzc3dvcmQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFVBQVU7SUFDVixZQUFZO0lBQ1osbUJBQW1CO0lBQ25CLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7O0lBRUksWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixpQkFBaUI7SUFDakIsc0JBQXNCO0lBQ3RCLGNBQWM7SUFDZCxrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osbUJBQW1CO0lBQ25CLDhDQUE4QztJQUM5QyxrQkFBa0I7SUFDbEIsZUFBZTtJQUNmLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxjQUFjO0lBQ2Qsa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQixlQUFlO0lBQ2YsaUJBQWlCO0lBQ2pCLFVBQVU7SUFDVixzQkFBc0I7QUFDMUI7O0FBUkE7SUFDSSxjQUFjO0lBQ2Qsa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQixlQUFlO0lBQ2YsaUJBQWlCO0lBQ2pCLFVBQVU7SUFDVixzQkFBc0I7QUFDMUI7O0FBUkE7SUFDSSxjQUFjO0lBQ2Qsa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQixlQUFlO0lBQ2YsaUJBQWlCO0lBQ2pCLFVBQVU7SUFDVixzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksV0FBVztJQUNYLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIsWUFBWTtJQUNaLFlBQVk7SUFDWixzQkFBc0I7SUFDdEIsZUFBZTtJQUNmLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7O0lBRUk7UUFDSTtJQUNKO0FBQ0oiLCJmaWxlIjoicmVjb3Zlci1wYXNzd29yZC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNhcmQge1xyXG4gICAgd2lkdGg6IDYwJTtcclxuICAgIG1hcmdpbjogYXV0bztcclxuICAgIGJhY2tncm91bmQ6ICNlZTVkMmY7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxNXB4O1xyXG59XHJcblxyXG4uY2FyZC1ib2R5IHtcclxuICAgIHBhZGRpbmc6IDIwcHg7XHJcbn1cclxuXHJcbmg0LFxyXG5oNSB7XHJcbiAgICBjb2xvcjogI2ZmZmY7XHJcbn1cclxuXHJcbnAge1xyXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgIHBhZGRpbmctbGVmdDogMTMlO1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMDRlbTtcclxuICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxufVxyXG5cclxuLmZvcm0tZ3JvdXAgPiBpbnB1dCB7XHJcbiAgICBoZWlnaHQ6IDQycHg7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZGMzZjBlO1xyXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDRweCA0cHggcmdiKDAgMCAwIC8gMTAlKTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcclxuICAgIGJvcmRlcjogI2RjM2YwZTtcclxuICAgIGNvbG9yOiAjZmZmZmZmO1xyXG59XHJcblxyXG5pbnB1dDo6cGxhY2Vob2xkZXIge1xyXG4gICAgY29sb3I6ICNlMWUxZTE7XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBmb250LXdlaWdodDogMzAwO1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgbGluZS1oZWlnaHQ6IDIzcHg7XHJcbiAgICB3aWR0aDogOTAlO1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMDZlbTtcclxufVxyXG5cclxubGFiZWwge1xyXG4gICAgY29sb3I6ICNmZmZmZmY7XHJcbn1cclxuXHJcbi5idG4tcHJpbWFyeSB7XHJcbiAgICB3aWR0aDogYXV0bztcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiAjMzM5ZmYxO1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgaGVpZ2h0OiA0NnB4O1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMDVlbTtcclxuICAgIGZvbnQtc2l6ZTogMTlweDtcclxuICAgIGxpbmUtaGVpZ2h0OiAyN3B4O1xyXG59XHJcblxyXG4uZXJyLW1zZyB7XHJcbiAgICBjb2xvcjojZmZmZmZmO1xyXG59XHJcblxyXG5AbWVkaWEgIHNjcmVlbiBhbmQgKG1heC13aWR0aDo3NjhweCkge1xyXG4gICAgXHJcbiAgICAuY2FyZCB7XHJcbiAgICAgICAgd2lkdGg6MTAwJVxyXG4gICAgfVxyXG59XHJcbiJdfQ== */"]
      });
      /***/
    },

    /***/
    7794:
    /*!***********************************************************!*\
      !*** ./src/app/authentication/signup/signup.component.ts ***!
      \***********************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SignupComponent": function SignupComponent() {
          return (
            /* binding */
            _SignupComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/forms */
      3679);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      39895);
      /* harmony import */


      var src_app_services_rewardmgt_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/app/services/rewardmgt.service */
      81856);
      /* harmony import */


      var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ngx-toastr */
      49344);
      /* harmony import */


      var src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! src/app/services/storage.service */
      71188);
      /* harmony import */


      var ngx_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ngx-spinner */
      79866);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/common */
      38583);

      function SignupComponent_div_19_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " First Name is required. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
      }

      function SignupComponent_div_25_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Last Name is required. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
      }

      function SignupComponent_div_32_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Email is required. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
      }

      function SignupComponent_div_33_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Enter Valid Email. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
      }

      function SignupComponent_div_39_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Password is required. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
      }

      function SignupComponent_div_40_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Password must be at least 6 characters long. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
      }

      function SignupComponent_option_49_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "option", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var property_r8 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", property_r8.id);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", property_r8 == null ? null : property_r8.name, " ");
        }
      }

      function SignupComponent_div_50_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Building Name is required. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
      }

      var _c0 = function _c0() {
        return ["/", "login"];
      };

      var _SignupComponent = /*#__PURE__*/function () {
        function _SignupComponent(_router, formBuilder, reward, toastr, storage, spinner, route) {
          var _this5 = this;

          _classCallCheck(this, _SignupComponent);

          this._router = _router;
          this.formBuilder = formBuilder;
          this.reward = reward;
          this.toastr = toastr;
          this.storage = storage;
          this.spinner = spinner;
          this.route = route;
          this.route.params.subscribe(function (val) {
            if (val && (val === null || val === void 0 ? void 0 : val.email) && (val === null || val === void 0 ? void 0 : val.id)) {
              _this5.email = val === null || val === void 0 ? void 0 : val.email;
              _this5.id = val === null || val === void 0 ? void 0 : val.id;
            }
          });
        }

        _createClass(_SignupComponent, [{
          key: "signUpControls",
          get: function get() {
            return this.signUpForm.controls;
          }
        }, {
          key: "backToLogin",
          value: function backToLogin() {
            this._router.navigateByUrl('/login');
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            this.initSignUpForm();
            this.getBuildingList();
          }
        }, {
          key: "getBuildingList",
          value: function getBuildingList() {
            var _this6 = this;

            this.reward.getBuldingList().subscribe(function (data) {
              if (data) {
                _this6.buildingList = data['PropertyAddress'];

                if (_this6.email && _this6.id) {
                  _this6.patchForm();
                }
              }
            });
          }
        }, {
          key: "patchForm",
          value: function patchForm() {
            var _this7 = this;

            if (this.buildingList && this.buildingList.length) {
              var obj = this.buildingList.find(function (item) {
                return item.id == _this7.id;
              });

              if (obj) {
                this.signUpForm.patchValue({
                  buildingName: obj.id
                });
                this.signUpForm.controls['buildingName'].disable();
              }

              if (this.email) {
                this.signUpForm.patchValue({
                  loginEmail: this.email,
                  disabled: true
                });
                this.signUpForm.controls['loginEmail'].disable();
              }
            }
          }
        }, {
          key: "signUp",
          value: function signUp() {
            var _this8 = this;

            var _a;

            if (this.signUpForm.valid) {
              var requestObj = {};
              requestObj = this.signUpForm.getRawValue();
              var propertyObj = this.buildingList.find(function (item) {
                var _a;

                return item.id == ((_a = _this8.signUpForm.get('buildingName')) === null || _a === void 0 ? void 0 : _a.value);
              });

              if (propertyObj) {
                requestObj.address = propertyObj.address;
                requestObj.state = propertyObj.propertyStateName;
                requestObj.city = propertyObj.city;
                requestObj.country = propertyObj.country;
                requestObj.zipcode = propertyObj.postalCode;
                requestObj.propertyIdList = [Number((_a = this.signUpForm.get('buildingName')) === null || _a === void 0 ? void 0 : _a.value)];
                requestObj === null || requestObj === void 0 ? true : delete requestObj.buildingName;
              }

              this.reward.signUp(requestObj).subscribe(function (data) {
                _this8.spinner.show();

                if (!data.message) {
                  _this8.storage.setUserDetails(data);

                  _this8.spinner.hide();

                  _this8.toastr.success('SignUp Successful');

                  _this8._router.navigate(['/login']);
                } else {
                  _this8.spinner.hide();

                  _this8.toastr.error(data === null || data === void 0 ? void 0 : data.message);
                }
              });
            }
          }
        }, {
          key: "initSignUpForm",
          value: function initSignUpForm() {
            this.signUpForm = this.formBuilder.group({
              firstName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required],
              lastName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required],
              buildingName: [{
                value: null,
                disabled: false
              }, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required],
              passWord: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.minLength(6)]],
              loginEmail: [{
                value: '',
                disabled: false
              }, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.email]]
            });
          }
        }]);

        return _SignupComponent;
      }();

      _SignupComponent.ɵfac = function SignupComponent_Factory(t) {
        return new (t || _SignupComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_rewardmgt_service__WEBPACK_IMPORTED_MODULE_0__.RewardmgtService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_5__.ToastrService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_1__.StorageService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](ngx_spinner__WEBPACK_IMPORTED_MODULE_6__.NgxSpinnerService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute));
      };

      _SignupComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: _SignupComponent,
        selectors: [["app-signup"]],
        decls: 61,
        vars: 13,
        consts: [[1, "container"], [1, "logo"], ["src", "https://ca-studentdev.inhabitr.com/assets/img/inhabitr_logo/caLogoNew.png", "width", "200", "height", "100", "alt", "alt_text", "border", "0", "align", "center", 2, "width", "100%", "max-width", "100px", "height", "auto", "background", "#ffffff", "font-size", "15px", "line-height", "20px", "color", "#555555", "margin", "auto", "padding", "18px 0px 0px 0px", 3, "click"], [1, "card", "mb-1"], [1, "card-body"], [1, "row"], [1, "col-lg-12", "col-md-12", "col-sm-12"], [1, "text-center"], [3, "formGroup"], [1, "col-lg-6"], [1, "form-group"], ["type", "text", "formControlName", "firstName", "placeholder", "Enter first name", 1, "form-control"], ["class", "err-msg mt-2", 4, "ngIf"], ["type", "text", "formControlName", "lastName", "placeholder", "Enter last name", 1, "form-control"], ["type", "text", "formControlName", "loginEmail", "placeholder", "Enter your email ", 1, "form-control"], ["type", "password", "formControlName", "passWord", "placeholder", "Password", 1, "form-control"], ["placeholder", "Select a Property", "formControlName", "buildingName"], [3, "value"], [3, "value", 4, "ngFor", "ngForOf"], [1, "submit", "text-center"], ["type", "button", 1, "btn", "btn-primary", 3, "disabled", "click"], [1, "card", "back-login", "border-0"], [1, ""], [2, "padding-right", "5px", "color", "black", "text-decoration", "none"], [3, "routerLink"], [1, "ml-2"], [1, "err-msg", "mt-2"]],
        template: function SignupComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "img", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SignupComponent_Template_img_click_2_listener() {
              return ctx.backToLogin();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "h3", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "WELCOME TO THE CA PORTAL");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "h5", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "Let\u2019s get your home essentials reward authorization started.");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "form", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "div", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "div", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "label");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, "FIRST NAME");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](18, "input", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](19, SignupComponent_div_19_Template, 2, 0, "div", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "div", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "div", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "label");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23, "LAST NAME");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](24, "input", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](25, SignupComponent_div_25_Template, 2, 0, "div", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "div", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "div", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](28, "div", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "label");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](30, "EMAIL");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](31, "input", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](32, SignupComponent_div_32_Template, 2, 0, "div", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](33, SignupComponent_div_33_Template, 2, 0, "div", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](34, "div", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](35, "div", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](36, "label");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](37, "PASSWORD");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](38, "input", 15);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](39, SignupComponent_div_39_Template, 2, 0, "div", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](40, SignupComponent_div_40_Template, 2, 0, "div", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](41, "div", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](42, "div", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](43, "div", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](44, "label");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](45, "BUILDING NAME");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](46, "select", 16);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](47, "option", 17);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](48, "Select a Property");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](49, SignupComponent_option_49_Template, 2, 2, "option", 18);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](50, SignupComponent_div_50_Template, 2, 0, "div", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](51, "div", 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](52, "button", 20);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SignupComponent_Template_button_click_52_listener() {
              return ctx.signUp();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](53, "SUBMIT");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](54, "div", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](55, "div", 22);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](56, "span", 23);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](57, "Back to");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](58, "a", 24);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](59, "span", 25);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](60, "Login");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](12);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.signUpForm);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (ctx.signUpControls["firstName"] == null ? null : ctx.signUpControls["firstName"].touched) && (ctx.signUpControls["firstName"] == null ? null : ctx.signUpControls["firstName"].errors == null ? null : ctx.signUpControls["firstName"].errors.required));

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (ctx.signUpControls["lastName"] == null ? null : ctx.signUpControls["lastName"].touched) && (ctx.signUpControls["lastName"] == null ? null : ctx.signUpControls["lastName"].errors == null ? null : ctx.signUpControls["lastName"].errors.required));

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (ctx.signUpControls["loginEmail"] == null ? null : ctx.signUpControls["loginEmail"].touched) && (ctx.signUpControls["loginEmail"] == null ? null : ctx.signUpControls["loginEmail"].errors == null ? null : ctx.signUpControls["loginEmail"].errors.required));

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (ctx.signUpControls["loginEmail"] == null ? null : ctx.signUpControls["loginEmail"].touched) && (ctx.signUpControls["loginEmail"] == null ? null : ctx.signUpControls["loginEmail"].errors == null ? null : ctx.signUpControls["loginEmail"].errors.email));

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (ctx.signUpControls["passWord"] == null ? null : ctx.signUpControls["passWord"].touched) && (ctx.signUpControls["passWord"] == null ? null : ctx.signUpControls["passWord"].errors == null ? null : ctx.signUpControls["passWord"].errors.required));

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (ctx.signUpControls["passWord"] == null ? null : ctx.signUpControls["passWord"].touched) && (ctx.signUpControls["passWord"] == null ? null : ctx.signUpControls["passWord"].errors == null ? null : ctx.signUpControls["passWord"].errors.minlength));

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", null);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.buildingList);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (ctx.signUpControls["buildingName"] == null ? null : ctx.signUpControls["buildingName"].touched) && (ctx.signUpControls["buildingName"] == null ? null : ctx.signUpControls["buildingName"].errors == null ? null : ctx.signUpControls["buildingName"].errors.required));

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", !ctx.signUpForm.valid);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](12, _c0));
          }
        },
        directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgSelectMultipleOption"], _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLinkWithHref],
        styles: ["h3[_ngcontent-%COMP%] {\r\n    font-style: normal;\r\n    font-weight: 900;\r\n    font-size: 22px;\r\n    line-height: 31px;\r\n    text-align: center;\r\n    letter-spacing: 0.04em;\r\n    text-transform: uppercase;\r\n\r\n    color: #ffffff;\r\n}\r\n\r\nh5[_ngcontent-%COMP%] {\r\n    font-style: normal;\r\n    font-weight: 300;\r\n    font-size: 18px;\r\n    line-height: 18px;\r\n    text-align: center;\r\n    letter-spacing: 0.04em;\r\n\r\n    color: #ffffff;\r\n}\r\n\r\n.container[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    max-width: 1420px;\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%] {\r\n    padding: 0px 0px 0px 0px;\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\r\n    display: block;\r\n    position: relative;\r\n    padding: 38px 3px 16px 3px;\r\n    line-height: 16px;\r\n    letter-spacing: 0.04em;\r\n    color: #ffffff;\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%]    > input[_ngcontent-%COMP%] {\r\n    \r\n    height: 42px;\r\n    background: #dc3f0e;\r\n    box-shadow: inset 0px 4px 4px rgb(0 0 0 / 10%);\r\n    border-radius: 2px;\r\n    border: #dc3f0e;\r\n    color: #ffffff;\r\n}\r\n\r\n.submit[_ngcontent-%COMP%] {\r\n    padding: 31px 0px 0px 0px;\r\n}\r\n\r\n.btn-primary[_ngcontent-%COMP%] {\r\n    width: 210.41px;\r\n    border-radius: 50px;\r\n    background: #339ff1;\r\n    border: none;\r\n    height: 46px;\r\n}\r\n\r\ninput[_ngcontent-%COMP%]::-moz-placeholder {\r\n    \r\n    color: #e1e1e1;\r\n    font-style: normal;\r\n    font-weight: 300;\r\n    font-size: 14px;\r\n    line-height: 23px;\r\n    width: 90%;\r\n    \r\n\r\n    letter-spacing: 0.06em;\r\n}\r\n\r\ninput[_ngcontent-%COMP%]:-ms-input-placeholder {\r\n    \r\n    color: #e1e1e1;\r\n    font-style: normal;\r\n    font-weight: 300;\r\n    font-size: 14px;\r\n    line-height: 23px;\r\n    width: 90%;\r\n    \r\n\r\n    letter-spacing: 0.06em;\r\n}\r\n\r\ninput[_ngcontent-%COMP%]::placeholder {\r\n    \r\n    color: #e1e1e1;\r\n    font-style: normal;\r\n    font-weight: 300;\r\n    font-size: 14px;\r\n    line-height: 23px;\r\n    width: 90%;\r\n    \r\n\r\n    letter-spacing: 0.06em;\r\n}\r\n\r\n.card[_ngcontent-%COMP%] {\r\n    width: 60%;\r\n    margin: auto;\r\n    background: #ee5d2f;\r\n    border-radius: 15px;\r\n}\r\n\r\n.back-login[_ngcontent-%COMP%] {\r\n     background: #ffffff;\r\n}\r\n\r\n.card-body[_ngcontent-%COMP%] {\r\n    padding: 20px;\r\n}\r\n\r\nselect[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    height: 36px;\r\n    border: 0;\r\n    border-radius: 2px !important;\r\n    background: url('dropdown-white.png') no-repeat 99% #ffffff !important;\r\n    -webkit-appearance: none;\r\n    \r\n    background-size: 31px 25px !important;\r\n    box-shadow: 0px 1px 4px rgb(0 0 0 / 10%), 1px 0px 4px rgb(0 0 0 / 10%), 0px -1px 4px rgb(0 0 0 / 10%),\r\n        -1px 0px 4px rgb(0 0 0 / 10%);\r\n    background-color: #dc3f0e !important;\r\n    box-shadow: inset 0px 4px 4px rgb(0 0 0 / 10%);\r\n    border-radius: 2px;\r\n    border: #dc3f0e;\r\n    color: white;\r\n    padding: 7px;\r\n    font-style: normal;\r\n    font-weight: 300;\r\n    font-size: 14px;\r\n    line-height: 23px;\r\n}\r\n\r\n.err-msg[_ngcontent-%COMP%] {\r\n    color:#ffffff;\r\n}\r\n\r\n@media  screen and (max-width:768px) {\r\n    \r\n    .card[_ngcontent-%COMP%] {\r\n        width:100%\r\n    }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpZ251cC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQixlQUFlO0lBQ2YsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixzQkFBc0I7SUFDdEIseUJBQXlCOztJQUV6QixjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQixlQUFlO0lBQ2YsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixzQkFBc0I7O0lBRXRCLGNBQWM7QUFDbEI7O0FBQ0E7SUFDSSxXQUFXO0lBQ1gsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksd0JBQXdCO0FBQzVCOztBQUNBO0lBQ0ksY0FBYztJQUNkLGtCQUFrQjtJQUNsQiwwQkFBMEI7SUFDMUIsaUJBQWlCO0lBQ2pCLHNCQUFzQjtJQUN0QixjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIsOENBQThDO0lBQzlDLGtCQUFrQjtJQUNsQixlQUFlO0lBQ2YsY0FBYztBQUNsQjs7QUFFQTtJQUNJLHlCQUF5QjtBQUM3Qjs7QUFDQTtJQUNJLGVBQWU7SUFDZixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLFlBQVk7SUFDWixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksY0FBYztJQUNkLGNBQWM7SUFDZCxrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsVUFBVTtJQUNWLFlBQVk7O0lBRVosc0JBQXNCO0FBQzFCOztBQVhBO0lBQ0ksY0FBYztJQUNkLGNBQWM7SUFDZCxrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsVUFBVTtJQUNWLFlBQVk7O0lBRVosc0JBQXNCO0FBQzFCOztBQVhBO0lBQ0ksY0FBYztJQUNkLGNBQWM7SUFDZCxrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsVUFBVTtJQUNWLFlBQVk7O0lBRVosc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0ksVUFBVTtJQUNWLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIsbUJBQW1CO0FBQ3ZCOztBQUVBO0tBQ0ssbUJBQW1CO0FBQ3hCOztBQUVBO0lBQ0ksYUFBYTtBQUNqQjs7QUFDQTtJQUNJLFdBQVc7SUFDWCxZQUFZO0lBQ1osU0FBUztJQUNULDZCQUE2QjtJQUM3QixzRUFBb0Y7SUFDcEYsd0JBQXdCO0lBQ3hCO2lDQUM2QjtJQUM3QixxQ0FBcUM7SUFDckM7cUNBQ2lDO0lBQ2pDLG9DQUFvQztJQUNwQyw4Q0FBOEM7SUFDOUMsa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZixZQUFZO0lBQ1osWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7O0lBRUk7UUFDSTtJQUNKO0FBQ0oiLCJmaWxlIjoic2lnbnVwLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJoMyB7XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBmb250LXdlaWdodDogOTAwO1xyXG4gICAgZm9udC1zaXplOiAyMnB4O1xyXG4gICAgbGluZS1oZWlnaHQ6IDMxcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogMC4wNGVtO1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuXHJcbiAgICBjb2xvcjogI2ZmZmZmZjtcclxufVxyXG5cclxuaDUge1xyXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGxpbmUtaGVpZ2h0OiAxOHB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMDRlbTtcclxuXHJcbiAgICBjb2xvcjogI2ZmZmZmZjtcclxufVxyXG4uY29udGFpbmVyIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgbWF4LXdpZHRoOiAxNDIwcHg7XHJcbn1cclxuXHJcbi5mb3JtLWdyb3VwIHtcclxuICAgIHBhZGRpbmc6IDBweCAwcHggMHB4IDBweDtcclxufVxyXG4uZm9ybS1ncm91cCA+IGxhYmVsIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgcGFkZGluZzogMzhweCAzcHggMTZweCAzcHg7XHJcbiAgICBsaW5lLWhlaWdodDogMTZweDtcclxuICAgIGxldHRlci1zcGFjaW5nOiAwLjA0ZW07XHJcbiAgICBjb2xvcjogI2ZmZmZmZjtcclxufVxyXG5cclxuLmZvcm0tZ3JvdXAgPiBpbnB1dCB7XHJcbiAgICAvKiB3aWR0aDogNDAwcHg7ICovXHJcbiAgICBoZWlnaHQ6IDQycHg7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZGMzZjBlO1xyXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDRweCA0cHggcmdiKDAgMCAwIC8gMTAlKTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcclxuICAgIGJvcmRlcjogI2RjM2YwZTtcclxuICAgIGNvbG9yOiAjZmZmZmZmO1xyXG59XHJcblxyXG4uc3VibWl0IHtcclxuICAgIHBhZGRpbmc6IDMxcHggMHB4IDBweCAwcHg7XHJcbn1cclxuLmJ0bi1wcmltYXJ5IHtcclxuICAgIHdpZHRoOiAyMTAuNDFweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiAjMzM5ZmYxO1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgaGVpZ2h0OiA0NnB4O1xyXG59XHJcblxyXG5pbnB1dDo6cGxhY2Vob2xkZXIge1xyXG4gICAgLypzdHlsZXMgaGVyZSovXHJcbiAgICBjb2xvcjogI2UxZTFlMTtcclxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBsaW5lLWhlaWdodDogMjNweDtcclxuICAgIHdpZHRoOiA5MCU7XHJcbiAgICAvKiBvciAxNjQlICovXHJcblxyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMDZlbTtcclxufVxyXG5cclxuLmNhcmQge1xyXG4gICAgd2lkdGg6IDYwJTtcclxuICAgIG1hcmdpbjogYXV0bztcclxuICAgIGJhY2tncm91bmQ6ICNlZTVkMmY7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxNXB4O1xyXG59XHJcblxyXG4uYmFjay1sb2dpbiB7XHJcbiAgICAgYmFja2dyb3VuZDogI2ZmZmZmZjtcclxufVxyXG5cclxuLmNhcmQtYm9keSB7XHJcbiAgICBwYWRkaW5nOiAyMHB4O1xyXG59XHJcbnNlbGVjdCB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMzZweDtcclxuICAgIGJvcmRlcjogMDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDJweCAhaW1wb3J0YW50O1xyXG4gICAgYmFja2dyb3VuZDogdXJsKC4uLy4uLy4uL2Fzc2V0cy9kcm9wZG93bi13aGl0ZS5wbmcpIG5vLXJlcGVhdCA5OSUgI2ZmZmZmZiAhaW1wb3J0YW50O1xyXG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xyXG4gICAgLyogYmFja2dyb3VuZC1wb3NpdGlvbi14OiAxMDAlO1xyXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbi15OiA1cHg7ICovXHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDMxcHggMjVweCAhaW1wb3J0YW50O1xyXG4gICAgYm94LXNoYWRvdzogMHB4IDFweCA0cHggcmdiKDAgMCAwIC8gMTAlKSwgMXB4IDBweCA0cHggcmdiKDAgMCAwIC8gMTAlKSwgMHB4IC0xcHggNHB4IHJnYigwIDAgMCAvIDEwJSksXHJcbiAgICAgICAgLTFweCAwcHggNHB4IHJnYigwIDAgMCAvIDEwJSk7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGMzZjBlICFpbXBvcnRhbnQ7XHJcbiAgICBib3gtc2hhZG93OiBpbnNldCAwcHggNHB4IDRweCByZ2IoMCAwIDAgLyAxMCUpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xyXG4gICAgYm9yZGVyOiAjZGMzZjBlO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgcGFkZGluZzogN3B4O1xyXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIGxpbmUtaGVpZ2h0OiAyM3B4O1xyXG59XHJcblxyXG4uZXJyLW1zZyB7XHJcbiAgICBjb2xvcjojZmZmZmZmO1xyXG59XHJcblxyXG5AbWVkaWEgIHNjcmVlbiBhbmQgKG1heC13aWR0aDo3NjhweCkge1xyXG4gICAgXHJcbiAgICAuY2FyZCB7XHJcbiAgICAgICAgd2lkdGg6MTAwJVxyXG4gICAgfVxyXG59Il19 */"]
      });
      /***/
    },

    /***/
    86405:
    /*!****************************************************************************!*\
      !*** ./src/app/dashboard/cancelled-rewards/cancelled-rewards.component.ts ***!
      \****************************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "CancelledRewardsComponent": function CancelledRewardsComponent() {
          return (
            /* binding */
            _CancelledRewardsComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var _layout_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../layout/sidebar/sidebar.component */
      31658);
      /* harmony import */


      var _layout_header_header_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../layout/header/header.component */
      1860);
      /* harmony import */


      var _shared_components_table_filter_table_filter_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../shared/components/table-filter/table-filter.component */
      11450);

      var _CancelledRewardsComponent = /*#__PURE__*/function () {
        function _CancelledRewardsComponent() {
          _classCallCheck(this, _CancelledRewardsComponent);
        }

        _createClass(_CancelledRewardsComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return _CancelledRewardsComponent;
      }();

      _CancelledRewardsComponent.ɵfac = function CancelledRewardsComponent_Factory(t) {
        return new (t || _CancelledRewardsComponent)();
      };

      _CancelledRewardsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
        type: _CancelledRewardsComponent,
        selectors: [["app-cancelled-rewards"]],
        decls: 129,
        vars: 0,
        consts: [[1, "main"], [1, "body"], [1, "row"], [1, "col-lg-12"], [1, "row", "mt-4"], [1, "table", "table-borderless"], [1, "tableHeader", "w-100"], [1, "text-center"], ["width", "15%"], ["width", "10%"], ["width", "20%"], [1, "mb-1"], [1, "btn", "btn-primary", "mt-2"]],
        template: function CancelledRewardsComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "app-sidebar");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "app-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](6, "app-table-filter");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "table", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "thead", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "tr", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "th", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "Resident ID");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "th", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, "First Name");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "th", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, "Last Name");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "th", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19, "Building Name");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "th", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21, "Date");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "th", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23, "Reverted Amount");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "th", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](25, "Before Invoice");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](26, "th", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](27, "After Invoice");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](28, "tbody");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](29, "tr");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](30, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](31, "#0000");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](33, "Dave");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](34, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](35, "Mathews");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](36, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](37, "The Link Minneapolis Low-Rise");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](38, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](39, "12/11/2021");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](40, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](41, "$300");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](42, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](43, "$300");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](44, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](45, "p", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](46, "$300");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](47, "button", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](48, "Annual Invoice");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](49, "tr");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](50, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](51, "#0000");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](52, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](53, "Dave");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](54, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](55, "Mathews");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](56, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](57, "The Link Minneapolis Low-Rise");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](58, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](59, "12/11/2021");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](60, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](61, "$300");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](62, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](63, "$300");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](64, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](65, "p", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](66, "$300");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](67, "button", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](68, "Annual Invoice");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](69, "tr");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](70, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](71, "#0000");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](72, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](73, "Dave");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](74, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](75, "Mathews");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](76, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](77, "The Link Minneapolis Low-Rise");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](78, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](79, "12/11/2021");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](80, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](81, "$300");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](82, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](83, "$300");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](84, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](85, "p", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](86, "$300");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](87, "button", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](88, "Annual Invoice");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](89, "tr");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](90, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](91, "#0000");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](92, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](93, "Dave");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](94, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](95, "Mathews");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](96, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](97, "The Link Minneapolis Low-Rise");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](98, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](99, "12/11/2021");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](100, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](101, "$300");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](102, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](103, "$300");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](104, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](105, "p", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](106, "$300");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](107, "button", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](108, "Annual Invoice");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](109, "tr");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](110, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](111, "#0000");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](112, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](113, "Dave");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](114, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](115, "Mathews");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](116, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](117, "The Link Minneapolis Low-Rise");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](118, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](119, "12/11/2021");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](120, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](121, "$300");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](122, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](123, "$300");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](124, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](125, "p", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](126, "$300");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](127, "button", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](128, "Annual Invoice");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          }
        },
        directives: [_layout_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_0__.SidebarComponent, _layout_header_header_component__WEBPACK_IMPORTED_MODULE_1__.HeaderComponent, _shared_components_table_filter_table_filter_component__WEBPACK_IMPORTED_MODULE_2__.TableFilterComponent],
        styles: [".main[_ngcontent-%COMP%] {\r\n  margin-left: 300px; \r\n}\r\n\r\n.body[_ngcontent-%COMP%] {\r\n  height: 100%;\r\n  overflow-x: hidden;\r\n  padding: 50px 50px;\r\n}\r\n\r\nth[_ngcontent-%COMP%], td[_ngcontent-%COMP%] {\r\n  padding: 15px;\r\n}\r\n\r\nth[_ngcontent-%COMP%] {\r\n  font-style: normal;\r\n  font-weight: 300;\r\n  font-size: 14px;\r\n  line-height: 14px;\r\n  letter-spacing: 0.03em;\r\n  color: #626262;\r\n}\r\n\r\ntd[_ngcontent-%COMP%] {\r\n  font-style: normal;\r\n  font-weight: 300;\r\n  font-size: 14px;\r\n  line-height: 14px;\r\n  letter-spacing: 0.03em;\r\n\r\n  color: #626262;\r\n  text-align: center;\r\n}\r\n\r\ntr[_ngcontent-%COMP%] {\r\n  vertical-align: middle !important;\r\n}\r\n\r\n.btn-primary[_ngcontent-%COMP%] {\r\n  width: 96px;\r\n  height: 32px;\r\n  background-color: #42a4ec !important;\r\n  border-radius: 5px !important;\r\n  font-size: 9px;\r\n  line-height: 16px;\r\n  letter-spacing: 0.03em;\r\n  text-transform: uppercase;\r\n  color: #ffffff;\r\n  padding:0px !important\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbmNlbGxlZC1yZXdhcmRzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBa0IsRUFBRSxxQ0FBcUM7QUFDM0Q7O0FBRUE7RUFDRSxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLGtCQUFrQjtBQUNwQjs7QUFFQTs7RUFFRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsc0JBQXNCO0VBQ3RCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsc0JBQXNCOztFQUV0QixjQUFjO0VBQ2Qsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsaUNBQWlDO0FBQ25DOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixvQ0FBb0M7RUFDcEMsNkJBQTZCO0VBQzdCLGNBQWM7RUFDZCxpQkFBaUI7RUFDakIsc0JBQXNCO0VBQ3RCLHlCQUF5QjtFQUN6QixjQUFjO0VBQ2Q7QUFDRiIsImZpbGUiOiJjYW5jZWxsZWQtcmV3YXJkcy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1haW4ge1xyXG4gIG1hcmdpbi1sZWZ0OiAzMDBweDsgLyogU2FtZSBhcyB0aGUgd2lkdGggb2YgdGhlIHNpZGVuYXYgKi9cclxufVxyXG5cclxuLmJvZHkge1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgcGFkZGluZzogNTBweCA1MHB4O1xyXG59XHJcblxyXG50aCxcclxudGQge1xyXG4gIHBhZGRpbmc6IDE1cHg7XHJcbn1cclxuXHJcbnRoIHtcclxuICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgZm9udC13ZWlnaHQ6IDMwMDtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgbGluZS1oZWlnaHQ6IDE0cHg7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDNlbTtcclxuICBjb2xvcjogIzYyNjI2MjtcclxufVxyXG5cclxudGQge1xyXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICBmb250LXdlaWdodDogMzAwO1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBsaW5lLWhlaWdodDogMTRweDtcclxuICBsZXR0ZXItc3BhY2luZzogMC4wM2VtO1xyXG5cclxuICBjb2xvcjogIzYyNjI2MjtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbnRyIHtcclxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5idG4tcHJpbWFyeSB7XHJcbiAgd2lkdGg6IDk2cHg7XHJcbiAgaGVpZ2h0OiAzMnB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICM0MmE0ZWMgIWltcG9ydGFudDtcclxuICBib3JkZXItcmFkaXVzOiA1cHggIWltcG9ydGFudDtcclxuICBmb250LXNpemU6IDlweDtcclxuICBsaW5lLWhlaWdodDogMTZweDtcclxuICBsZXR0ZXItc3BhY2luZzogMC4wM2VtO1xyXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgY29sb3I6ICNmZmZmZmY7XHJcbiAgcGFkZGluZzowcHggIWltcG9ydGFudFxyXG59XHJcbiJdfQ== */"]
      });
      /***/
    },

    /***/
    8259:
    /*!********************************************************************!*\
      !*** ./src/app/dashboard/create-reward/create-reward.component.ts ***!
      \********************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "CreateRewardComponent": function CreateRewardComponent() {
          return (
            /* binding */
            _CreateRewardComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/forms */
      3679);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var _services_rewardmgt_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../services/rewardmgt.service */
      81856);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/router */
      39895);
      /* harmony import */


      var src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! src/app/services/storage.service */
      71188);
      /* harmony import */


      var ngx_spinner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ngx-spinner */
      79866);
      /* harmony import */


      var ngx_toastr__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ngx-toastr */
      49344);
      /* harmony import */


      var _layout_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../layout/sidebar/sidebar.component */
      31658);
      /* harmony import */


      var _layout_header_header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../layout/header/header.component */
      1860);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/common */
      38583);
      /* harmony import */


      var _shared_components_load_cash_load_cash_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../shared/components/load-cash/load-cash.component */
      66984);
      /* harmony import */


      var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @ng-bootstrap/ng-bootstrap */
      12664);

      var _c0 = ["createExistingReward"];

      function CreateRewardComponent_ng_container_4_div_29_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 60);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " Enter 10 digit Mobile Number. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }
      }

      function CreateRewardComponent_ng_container_4_div_35_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 60);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " Enter valid reward amount ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }
      }

      function CreateRewardComponent_ng_container_4_div_36_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 60);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " *Please enter reward value lesser than the available balance ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }
      }

      function CreateRewardComponent_ng_container_4_div_42_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " Enter Valid Email. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }
      }

      function CreateRewardComponent_ng_container_4_div_53_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 60);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " Expiry date is required ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }
      }

      function CreateRewardComponent_ng_container_4_div_54_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 60);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " Expiry date should be greater than start date ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }
      }

      function CreateRewardComponent_ng_container_4_Template(rf, ctx) {
        if (rf & 1) {
          var _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "div", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](3, "app-load-cash", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "div", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "h3", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](9, "CREATE A REWARD FOR RESIDENT");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "p", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](11, "Enter the residents details to generate a promo code for redemption. The code will be emailed to the resident.");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "form", 36);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "div", 37);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "div", 38);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "div", 39);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "label", 40);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](17, "First Name");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](18, "input", 41);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "div", 38);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "div", 39);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](21, "label", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](22, "Last Name");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](23, "input", 43);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](24, "div", 38);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](25, "div", 39);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](26, "label", 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](27, "Phone Number");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](28, "input", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](29, CreateRewardComponent_ng_container_4_div_29_Template, 2, 0, "div", 46);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](30, "div", 38);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](31, "div", 39);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](32, "label", 47);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](33, "Reward Amount");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](34, "input", 48);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](35, CreateRewardComponent_ng_container_4_div_35_Template, 2, 0, "div", 46);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](36, CreateRewardComponent_ng_container_4_div_36_Template, 2, 0, "div", 46);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](37, "div", 38);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](38, "div", 39);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](39, "label", 49);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](40, "Email ID");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](41, "input", 50);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](42, CreateRewardComponent_ng_container_4_div_42_Template, 2, 0, "div", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](43, "div", 38);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](44, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](45, "div", 51);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](46, "form", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](47, "div", 53);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](48, "label", 54);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](49, "Expiry Date");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](50, "input", 55, 56);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](52, "i", 57);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function CreateRewardComponent_ng_container_4_Template_i_click_52_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r11);

            var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](51);

            return _r7.toggle();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](53, CreateRewardComponent_ng_container_4_div_53_Template, 2, 0, "div", 46);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](54, CreateRewardComponent_ng_container_4_div_54_Template, 2, 0, "div", 46);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](55, "div", 37);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](56, "div", 58);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](57, "button", 59);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function CreateRewardComponent_ng_container_4_Template_button_click_57_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r11);

            var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

            return ctx_r12.generateReward();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](58);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

          var tmp_7_0;
          var tmp_7_1;

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("showRewards", true);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](9);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("formGroup", ctx_r0.rewardForm);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](17);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", (ctx_r0.formControl["mobileNo"] == null ? null : ctx_r0.formControl["mobileNo"].touched) && (ctx_r0.formControl["mobileNo"] == null ? null : ctx_r0.formControl["mobileNo"].errors == null ? null : ctx_r0.formControl["mobileNo"].errors.pattern));

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", (ctx_r0.formControl["rewardAmount"] == null ? null : ctx_r0.formControl["rewardAmount"].touched) && (ctx_r0.formControl["rewardAmount"] == null ? null : ctx_r0.formControl["rewardAmount"].errors == null ? null : ctx_r0.formControl["rewardAmount"].errors.positiveNumber));

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.formControl["rewardAmount"] == null ? null : ctx_r0.formControl["rewardAmount"].errors == null ? null : ctx_r0.formControl["rewardAmount"].errors.maxNumber);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", (ctx_r0.formControl["email"] == null ? null : ctx_r0.formControl["email"].touched) && (ctx_r0.formControl["email"] == null ? null : ctx_r0.formControl["email"].errors == null ? null : ctx_r0.formControl["email"].errors.email));

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](8);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("minDate", ctx_r0.minDate);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ((tmp_7_0 = ctx_r0.rewardForm.get("dateField")) == null ? null : (tmp_7_1 = tmp_7_0.get("endDate")) == null ? null : tmp_7_1.touched) && ((tmp_7_0 = ctx_r0.rewardForm.get("dateField")) == null ? null : (tmp_7_1 = tmp_7_0.get("endDate")) == null ? null : tmp_7_1.errors == null ? null : tmp_7_1.errors.required));

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.formControl["dateField"] == null ? null : ctx_r0.formControl["dateField"].errors == null ? null : ctx_r0.formControl["dateField"].errors.incorrectData);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", !ctx_r0.rewardForm.valid);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("GENERATE REWARD ($", ctx_r0.accountBalance ? ctx_r0.accountBalance : "0", " BALANCE)");
        }
      }

      function CreateRewardComponent_div_5_Template(rf, ctx) {
        if (rf & 1) {
          var _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 61);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "div", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "h2");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "THE REWARD WAS GENERATED!");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "p", 62);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, "The reward for resident ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "b");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](9, " staying at ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "b");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](11);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12, " has been created!");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "p", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](14, "An email with the following reward amount has been sent to resident's inbox:");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "div", 63);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](16);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "div", 37);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "div", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "section");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "div", 64);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](21, "div", 65);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](22, "h2");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](23, "Date Generated: ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](24, "span", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](25);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](26, "date");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](27, "div", 65);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](28, "h2", 66);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](29, "Building Name: ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](30, "span", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](31);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](32, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](33, "div", 65);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](34, "h2", 66);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](35, "Reward Amount Issued Now: ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](36, "span", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](37);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](38, "div", 65);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](39, "h2", 66);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](40, "Total Reward Amount Issued: ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](41, "span", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](42);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](43, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](44, "div", 65);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](45, "h2", 66);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](46, "Resident Name: ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](47, "span", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](48);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](49, "div", 65);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](50, "h2", 66);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](51, "Email: ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](52, "span", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](53);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](54, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](55, "div", 65);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](56, "h2", 66);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](57, "Phone Number: ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](58, "span", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](59);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](60, "div", 65);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](61, "h2", 66);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](62, "Expiry Date: ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](63, "span", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](64);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](65, "date");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](66, "div", 37);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](67, "button", 67);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function CreateRewardComponent_div_5_Template_button_click_67_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r14);

            var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

            return ctx_r13.finishRewardCreation();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](68, " FINISH ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

          var tmp_9_0;
          var tmp_10_0;
          var tmp_10_1;

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](8);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"]("", ctx_r1.rewardPromoData == null ? null : ctx_r1.rewardPromoData.firstName, " ", ctx_r1.rewardPromoData == null ? null : ctx_r1.rewardPromoData.lastName, "");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r1.buildingDetails["name"]);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r1.rewardPromoData == null ? null : ctx_r1.rewardPromoData.rewardId, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](9);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](26, 13, ctx_r1.generatedDate, "longDate"));

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r1.buildingDetails["name"]);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("$", ctx_r1.lastGivenReward, "");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("$", ctx_r1.rewardPromoData == null ? null : ctx_r1.rewardPromoData.rewardAmount, "");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"]("", ctx_r1.rewardPromoData == null ? null : ctx_r1.rewardPromoData.firstName, " ", ctx_r1.rewardPromoData == null ? null : ctx_r1.rewardPromoData.lastName, "");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r1.rewardPromoData == null ? null : ctx_r1.rewardPromoData.email);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"]((tmp_9_0 = ctx_r1.rewardForm.get("mobileNo")) == null ? null : tmp_9_0.value);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](65, 16, ctx_r1.getExpiryDate((tmp_10_0 = ctx_r1.rewardForm.get("dateField")) == null ? null : (tmp_10_1 = tmp_10_0.get("endDate")) == null ? null : tmp_10_1.value), "fullDate"));
        }
      }

      var _CreateRewardComponent = /*#__PURE__*/function () {
        function _CreateRewardComponent(reward, formBuilder, router, storage, spinner, toaster) {
          _classCallCheck(this, _CreateRewardComponent);

          this.reward = reward;
          this.formBuilder = formBuilder;
          this.router = router;
          this.storage = storage;
          this.spinner = spinner;
          this.toaster = toaster;
          this.isRewardGenerated = false;
          this.expDate = new Date();
          this.loadCash = false;
          this.minDate = {
            year: this.expDate.getFullYear(),
            month: this.expDate.getMonth() + 1,
            day: this.expDate.getDate()
          };
        }

        _createClass(_CreateRewardComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this9 = this;

            var _a;

            this.initRewardForm();
            this.getBuildingName();
            (_a = this.rewardForm.get('rewardAmount')) === null || _a === void 0 ? void 0 : _a.valueChanges.subscribe(function (data) {
              var _a, _b;

              if (data && data > 0 && data <= _this9.buildingAmount) {
                _this9.accountBalance = _this9.buildingAmount - data;
                (_a = _this9.rewardForm.get('rewardAmount')) === null || _a === void 0 ? void 0 : _a.setErrors(null);
              } else if (data && data > 0 && data > _this9.buildingAmount) {
                (_b = _this9.rewardForm.get('rewardAmount')) === null || _b === void 0 ? void 0 : _b.setErrors({
                  'maxNumber': true
                });
                _this9.accountBalance = _this9.buildingAmount;
              } else {
                _this9.accountBalance = _this9.buildingAmount;
              }
            });
            this.reward.buildingAmount.subscribe(function (data) {
              if (data) {
                _this9.buildingAmount = data === null || data === void 0 ? void 0 : data.balanceAmount;
                _this9.accountBalance = _this9.buildingAmount;
                _this9.loadCash = false;
              } else {
                _this9.loadCash = true;
              }
            });
          }
        }, {
          key: "formControl",
          get: function get() {
            return this.rewardForm.controls;
          }
        }, {
          key: "initRewardForm",
          value: function initRewardForm() {
            this.rewardForm = this.formBuilder.group({
              firstName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required],
              lastName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required],
              residentId: [''],
              mobileNo: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
              buildingName: [{
                value: '',
                disabled: true
              }],
              rewardAmount: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required, this.checkForPositiveNumber]],
              dateField: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormGroup({
                startDate: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControl(null),
                endDate: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControl(null, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required)
              }),
              email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.email]]
            });
          }
        }, {
          key: "checkDateFields",
          value: function checkDateFields(formGroup) {
            var _a, _b;

            var startDate = (_a = formGroup.get('startDate')) === null || _a === void 0 ? void 0 : _a.value;
            var endDate = (_b = formGroup.get('endDate')) === null || _b === void 0 ? void 0 : _b.value;

            if (startDate != null && endDate != null) {
              if (new Date(startDate.year, startDate.month, startDate.day) > new Date(endDate.year, endDate.month, endDate.day)) return {
                'incorrectData': true
              };else {
                return null;
              }
            } else {
              return null;
            }
          }
        }, {
          key: "getBuildingName",
          value: function getBuildingName() {
            var userData = JSON.parse(this.storage.getUserDetails());
            this.buildingDetails = userData.propertyDataList[0];
            this.propertyId = this.buildingDetails['id'];
            this.rewardForm.patchValue({
              buildingName: this.buildingDetails['name']
            });
          }
        }, {
          key: "getFormattedDate",
          value: function getFormattedDate(date) {
            return date.year + '-' + date.month + '-' + date.day;
          }
        }, {
          key: "getExpiryDate",
          value: function getExpiryDate(date) {
            return new Date(date.year, date.month - 1, date.day).getTime();
          }
        }, {
          key: "generateReward",
          value: function generateReward() {
            var _this10 = this;

            var _a; // this.createExistingReward.nativeElement.click();


            if (this.rewardForm.valid) {
              var requestObj = {};
              requestObj = this.rewardForm.value;
              requestObj['propertyId'] = this.propertyId;
              var objDate = {
                endDate: this.getFormattedDate((_a = requestObj === null || requestObj === void 0 ? void 0 : requestObj.dateField) === null || _a === void 0 ? void 0 : _a.endDate)
              };
              requestObj === null || requestObj === void 0 ? true : delete requestObj.buildingName;
              requestObj === null || requestObj === void 0 ? true : delete requestObj.dateField;
              requestObj === null || requestObj === void 0 ? true : delete requestObj.mobileNo;
              this.spinner.show();
              this.reward.createReward(requestObj, objDate).subscribe(function (data) {
                var _a;

                if (data && data.message != "propery doesn't has balance Amount to create reward, Please load now." && data && data.message.trim() != "please check user belongs to,can't give rewards to other property user.".trim()) {
                  _this10.spinner.hide();

                  _this10.rewardPromoData = data;

                  _this10.getLastGeneratedReward((_a = _this10.rewardPromoData) === null || _a === void 0 ? void 0 : _a.rewardHistory);

                  _this10.isRewardGenerated = true;

                  _this10.reward.getBuildingAmount(_this10.storage.getPropertyId());
                } else if (data && data.message.trim() == "please check user belongs to,can't give rewards to other property user.".trim()) {
                  _this10.isRewardGenerated = false;

                  _this10.spinner.hide(); // this.toaster.error('error');


                  $('#deletedReward1').modal('show');

                  _this10.rewardForm.reset();
                } else {
                  _this10.toaster.error('Please Load Cash Before Creating Reward');

                  _this10.isRewardGenerated = false;

                  _this10.spinner.hide();
                }
              });
            }
          }
        }, {
          key: "getLastGeneratedReward",
          value: function getLastGeneratedReward(rewardHistory) {
            if (rewardHistory && rewardHistory.length > 0) {
              var latest = rewardHistory.reduce(function (a, b) {
                return new Date(a.updatedDatetime) > new Date(b.updatedDatetime) ? a : b;
              });
              this.lastGivenReward = latest.rewardAmount ? latest.rewardAmount : 0;
              this.generatedDate = latest.updatedDatetime ? latest.updatedDatetime : '';
            }
          }
        }, {
          key: "finishRewardCreation",
          value: function finishRewardCreation() {
            this.router.navigate(['/rewards']);
          }
        }, {
          key: "onBack",
          value: function onBack() {
            this.router.navigate(['/rewards']);
          }
        }, {
          key: "checkForPositiveNumber",
          value: function checkForPositiveNumber(control) {
            var reward = control.value;

            if (reward > 0) {
              return null;
            } else {
              return {
                'positiveNumber': true
              };
            }
          }
        }]);

        return _CreateRewardComponent;
      }();

      _CreateRewardComponent.ɵfac = function CreateRewardComponent_Factory(t) {
        return new (t || _CreateRewardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_rewardmgt_service__WEBPACK_IMPORTED_MODULE_0__.RewardmgtService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_1__.StorageService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](ngx_spinner__WEBPACK_IMPORTED_MODULE_8__.NgxSpinnerService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_9__.ToastrService));
      };

      _CreateRewardComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
        type: _CreateRewardComponent,
        selectors: [["app-create-reward"]],
        viewQuery: function CreateRewardComponent_Query(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c0, 5);
          }

          if (rf & 2) {
            var _t;

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.createExistingReward = _t.first);
          }
        },
        decls: 45,
        vars: 3,
        consts: [[1, "main"], [1, "body"], [4, "ngIf"], ["class", "p-5", 4, "ngIf"], ["type", "button", "data-bs-toggle", "modal", "data-bs-target", "#createExisting", 1, "btn", "btn-primary", 3, "hidden"], ["createExistingReward", ""], ["id", "createExisting", "tabindex", "-1", "aria-labelledby", "createExistingLabel", "aria-hidden", "true", 1, "modal", "fade"], [1, "modal-dialog", "modal-lg"], [1, "modal-content", "p-4"], [1, "modal-header", "border-0"], [1, "modal-body", "text-center"], [1, "pb-2"], [1, "card", "mt-4"], [1, "card-body"], [1, "reward-history"], [1, "mt-5", "mb-2"], [1, "modal-footer", "border-0", "d-flex", "justify-content-center", 2, "flex-flow", "row !important"], ["type", "button", 1, "btn", "btn-primary", "btn-generate"], ["type", "button", "data-bs-dismiss", "modal", 1, "btn", "btn-dark", "btn-generate"], ["id", "deletedReward1", "tabindex", "-1", "aria-labelledby", "deletedReward1dLabel", "aria-hidden", "true", 1, "modal", "fade"], [1, "modal-dialog"], [1, "modal-content", "p-4", "header-style"], ["type", "button", "data-bs-dismiss", "modal", "aria-label", "Close", 1, "btn-close"], [1, "modal-body", "text-center", "pt-0", "pb-4", "mt-0"], [1, "mt-2", "m-0", "p-0"], [1, "modal-footer", "justify-content-center", "border-0"], ["type", "button", "data-bs-dismiss", "modal", 1, "btn", "btn-shopping"], ["bdColor", "rgba(51,51,51,0.8)", "size", "medium", "color", "#fff", "type", "ball-atom"], [2, "font-size", "20px", "color", "white"], [1, "row", "mb-4"], [1, "col-lg-12"], [3, "showRewards"], [1, "row"], [1, "d-flex", "justify-content-between"], [1, "welcome"], [1, "reward-text"], [3, "formGroup"], [1, "row", "mt-4"], [1, "col-lg-4", "mt-2"], [1, "form-group", "mt-4"], ["for", "firstName"], ["type", "text", "placeholder", "Enter resident\u2019s first name", "formControlName", "firstName", "id", "firstName", 1, "form-control", "mt-3"], ["for", "lastName"], ["type", "text", "placeholder", "Enter resident\u2019s last name", "formControlName", "lastName", "id", "lastName", 1, "form-control", "mt-3"], ["for", "mobile"], ["type", "text", "placeholder", "Enter Phone Number", "formControlName", "mobileNo", "id", "mobile", 1, "form-control", "mt-3"], ["class", "err-msg", 4, "ngIf"], ["for", "reward", 1, "mb-2"], ["type", "number", "placeholder", "$", "formControlName", "rewardAmount", "id", "reward", 1, "form-control", "mt-3"], ["for", "email", 1, "mb-2"], ["type", "text", "placeholder", "Enter the residents email", "formControlName", "email", "id", "email", 1, "form-control", "mt-3"], [1, "col-8"], ["formGroupName", "dateField"], [1, "form-group", "mt-4", "position-relative"], ["for", "start", 1, "mb-4"], ["type", "text", "formControlName", "endDate", "placeholder", "yyyy-mm-dd", "ngbDatepicker", "", 1, "datepicker_input", "form-control", 3, "minDate"], ["end", "ngbDatepicker"], ["aria-hidden", "true", 1, "fas", "fa-calendar-alt", "pointer", "calender", 3, "click"], [1, "col-7", "text-left"], ["type", "button", 1, "btn", "btn-primary", 3, "disabled", "click"], [1, "err-msg"], [1, "p-5"], [1, "reward-text", "mt-4"], [1, "promo-badge", "text-center", "mt-4"], [1, "row", "align-items-baseline"], [1, "col-6"], [1, "mt-3"], [1, "btn", "btn-success", 3, "click"]],
        template: function CreateRewardComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "app-sidebar");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "app-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, CreateRewardComponent_ng_container_4_Template, 59, 11, "ng-container", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](5, CreateRewardComponent_div_5_Template, 69, 19, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "button", 4, 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8, " Create Reward ");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "div", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "div", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "div", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](12, "div", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "div", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "h5", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](15, "This resident has previously been generated rewards:");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "div", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "div", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "p", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](19, "$300 on June 5th 2021 (06/05/2021)");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "p", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](21, "$300 on June 5th 2021 (06/05/2021)");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](22, "p", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](23, "$300 on June 5th 2021 (06/05/2021)");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](24, "h5", 15);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](25, "Would you like to continue generating a reward?");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](26, "div", 16);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](27, "button", 17);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](28, "GENERATE");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](29, "button", 18);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](30, "CANCEL");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](31, "div", 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](32, "div", 20);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](33, "div", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](34, "div", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](35, "button", 22);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](36, "div", 23);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](37, "p", 24);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](38, "This user is registered with another CA Property");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](39, "div", 25);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](40, "button", 26);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](41, "CLOSE");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](42, "ngx-spinner", 27);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](43, "p", 28);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](44, "Loading...");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.isRewardGenerated);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.isRewardGenerated);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("hidden", true);
          }
        },
        directives: [_layout_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_2__.SidebarComponent, _layout_header_header_component__WEBPACK_IMPORTED_MODULE_3__.HeaderComponent, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, ngx_spinner__WEBPACK_IMPORTED_MODULE_8__.NgxSpinnerComponent, _shared_components_load_cash_load_cash_component__WEBPACK_IMPORTED_MODULE_4__.LoadCashComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgForm, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormGroupName, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_11__.NgbInputDatepicker],
        pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.DatePipe],
        styles: [".twin[_ngcontent-%COMP%] {\r\n  float: left;\r\n  height: 50px;\r\n  margin: 10px;\r\n  font-style: normal;\r\n  font-weight: 500;\r\n  font-size: 14px;\r\n  line-height: 23px;\r\n  letter-spacing: 0.02em;\r\n  color: #000000;\r\n}\r\n.marginR[_ngcontent-%COMP%] {\r\n  float: right;\r\n  height: 50px;\r\n  font-style: normal;\r\n  font-weight: 500;\r\n  font-size: 14px;\r\n  line-height: 23px;\r\n  letter-spacing: 0.02em;\r\n  color: #000000;\r\n  margin-right: 100px !important;\r\n}\r\n.main[_ngcontent-%COMP%] {\r\n  margin-left: 300px; \r\n}\r\n.mainLayout[_ngcontent-%COMP%] {\r\n  padding-left: 100px;\r\n}\r\n.body[_ngcontent-%COMP%] {\r\n  height: 100%;\r\n  overflow-x: hidden;\r\n  padding: 50px 50px;\r\n}\r\n.header[_ngcontent-%COMP%] {\r\n  height: 66px;\r\n  padding: 4px 0px 0px 0px;\r\n  border: 1px solid black;\r\n}\r\ntable[_ngcontent-%COMP%] {\r\n  border-collapse: collapse;\r\n  border-spacing: 0;\r\n  width: 100%;\r\n  border: 1px solid #f8f8f8;\r\n}\r\n.tableHeader[_ngcontent-%COMP%] {\r\n  background-color: #f3f3f3;\r\n}\r\n.tableHeader[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\r\n  font-style: normal;\r\n  font-weight: 300;\r\n  font-size: 14px;\r\n  line-height: 14px;\r\n  letter-spacing: 0.03em;\r\n  border-bottom: 1.5px solid lightgrey;\r\n}\r\ntbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\r\n  font-style: normal;\r\n  font-weight: 300;\r\n  font-size: 14px;\r\n  line-height: 14px;\r\n  letter-spacing: 0.03em;\r\n}\r\nth[_ngcontent-%COMP%], td[_ngcontent-%COMP%] {\r\n  text-align: left;\r\n  padding: 16px;\r\n}\r\ntr[_ngcontent-%COMP%]:nth-child(even) {\r\n  background-color: #f2f2f2;\r\n}\r\nh2[_ngcontent-%COMP%] {\r\n  font-style: normal;\r\n  font-weight: 600;\r\n  font-size: 18px;\r\n  line-height: 18px;\r\n  letter-spacing: 0.05em;\r\n}\r\nh3[_ngcontent-%COMP%] {\r\n  font-style: normal;\r\n  font-weight: 900;\r\n  font-size: 22px;\r\n  line-height: 31px;\r\n  letter-spacing: 0.04em;\r\n  text-transform: uppercase;\r\n\r\n  \r\n}\r\nh5[_ngcontent-%COMP%] {\r\n  font-style: normal;\r\n  font-weight: 300;\r\n  font-size: 18px;\r\n  line-height: 18px;\r\n  letter-spacing: 0.04em;\r\n\r\n  \r\n}\r\n.buildingName[_ngcontent-%COMP%] {\r\n  width: 309px;\r\n  height: 36px;\r\n  left: 917px;\r\n  top: 170px;\r\n  background: #ffffff;\r\n  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1), 1px 0px 4px rgba(0, 0, 0, 0.1), 0px -1px 4px rgba(0, 0, 0, 0.1),\r\n    -1px 0px 4px rgba(0, 0, 0, 0.1);\r\n  border-radius: 5px;\r\n}\r\n.rewardDiv[_ngcontent-%COMP%] {\r\n  float: left;\r\n  width: 50%;\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\r\n  font-weight: 300;\r\n  font-size: 16px;\r\n  line-height: 23px;\r\n  letter-spacing: 0.04em;\r\n  color: #000;\r\n}\r\n.form-group[_ngcontent-%COMP%]    > input[_ngcontent-%COMP%] {\r\n  \r\n  \r\n  width: 90%;\r\n  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1), 1px 0px 4px rgba(0, 0, 0, 0.1), 0px -1px 4px rgba(0, 0, 0, 0.1),\r\n    -1px 0px 4px rgba(0, 0, 0, 0.1);\r\n  border-radius: 8px;\r\n  border: none;\r\n  \r\n}\r\n.form-group[_ngcontent-%COMP%]    > select[_ngcontent-%COMP%] {\r\n  \r\n  \r\n  width: 90%;\r\n  box-shadow: inset 0px 4px 4px rgb(0 0 0 / 10%);\r\n  border-radius: 8px;\r\n\r\n  \r\n}\r\n.submit[_ngcontent-%COMP%] {\r\n  padding: 380px 0px 0px 0px;\r\n}\r\n.btn-primary[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  background: #ff6f3d;\r\n  border: none;\r\n  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.15);\r\n  border-radius: 8px;\r\n  padding: 30px;\r\n  font-size: 17px;\r\n  letter-spacing: 0.02em;\r\n}\r\n.buttonCategory[_ngcontent-%COMP%] {\r\n  padding-left: 100px;\r\n}\r\ninput[_ngcontent-%COMP%]::-moz-placeholder {\r\n  color: #e1e1e1;\r\n  font-style: normal;\r\n  font-weight: 300;\r\n  font-size: 14px;\r\n  line-height: 20px;\r\n  letter-spacing: 0.06em;\r\n}\r\ninput[_ngcontent-%COMP%]:-ms-input-placeholder {\r\n  color: #e1e1e1;\r\n  font-style: normal;\r\n  font-weight: 300;\r\n  font-size: 14px;\r\n  line-height: 20px;\r\n  letter-spacing: 0.06em;\r\n}\r\ninput[_ngcontent-%COMP%]::placeholder {\r\n  color: #e1e1e1;\r\n  font-style: normal;\r\n  font-weight: 300;\r\n  font-size: 14px;\r\n  line-height: 20px;\r\n  letter-spacing: 0.06em;\r\n}\r\n@media screen and (max-height: 450px) {\r\n  .sidenav[_ngcontent-%COMP%] {\r\n    padding-top: 15px;\r\n  }\r\n  .sidenav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\r\n    font-size: 14px;\r\n    cursor: pointer;\r\n  }\r\n}\r\n.create-promo-code[_ngcontent-%COMP%] {\r\n  height: 61px;\r\n}\r\n.back-icon[_ngcontent-%COMP%] {\r\n  width: 40px;\r\n  height: 40px;\r\n}\r\nselect[_ngcontent-%COMP%] {\r\n  \r\n  background-position: right center;\r\n  background-size: 31px 25px !important;\r\n}\r\n.promo-badge[_ngcontent-%COMP%] {\r\n  display: inline-block;\r\n  width: 181px;\r\n  height: 45px;\r\n  padding: 10px;\r\n  background-color: #f2f2f2;\r\n  border-radius: 10px;\r\n}\r\n.reward-text[_ngcontent-%COMP%] {\r\n  font-style: normal;\r\n  font-weight: 300;\r\n  font-size: 14px;\r\n  line-height: 23px;\r\n  \r\n\r\n  letter-spacing: 0.04em;\r\n}\r\n.datepicker_input[_ngcontent-%COMP%] {\r\n  padding: 5px;\r\n  font-size: 18px;\r\n  padding-left: 40px;\r\n  padding-top: 2px;\r\n  padding-bottom: 7px;\r\n}\r\n.calender[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  left: 6%;\r\n  top: 69%;\r\n}\r\n.modal-lg[_ngcontent-%COMP%], .modal-xl[_ngcontent-%COMP%] {\r\n  max-width: 600px !important;\r\n}\r\n.btn-generate[_ngcontent-%COMP%] {\r\n  width: 50% !important;\r\n  border-radius: 10px !important;\r\n  height: auto;\r\n}\r\n.card[_ngcontent-%COMP%] {\r\n  background-color: #f8f8f8;\r\n}\r\n.reward-history[_ngcontent-%COMP%] {\r\n  font-style: normal;\r\n  font-weight: normal;\r\n  font-size: 15px;\r\n  line-height: 16px;\r\n  letter-spacing: 0.03em;\r\n  color: #000000;\r\n  margin: 15px;\r\n}\r\n.btn-success[_ngcontent-%COMP%] {\r\n  width: 25% !important;\r\n  padding: 10px;\r\n  background-color: #2cba65;\r\n  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.15);\r\n  border-radius: 8px;\r\n  border: none;\r\n  border-color: white !important;\r\n}\r\n.err-msg[_ngcontent-%COMP%] {\r\n  color: red;\r\n}\r\n.btn-shopping[_ngcontent-%COMP%] {\r\n  background: #F15C23;\r\n  border-radius: 5px;\r\n  color: #FFFFFF;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZS1yZXdhcmQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixzQkFBc0I7RUFDdEIsY0FBYztBQUNoQjtBQUNBO0VBQ0UsWUFBWTtFQUNaLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsc0JBQXNCO0VBQ3RCLGNBQWM7RUFDZCw4QkFBOEI7QUFDaEM7QUFDQTtFQUNFLGtCQUFrQixFQUFFLHFDQUFxQztBQUMzRDtBQUNBO0VBQ0UsbUJBQW1CO0FBQ3JCO0FBQ0E7RUFDRSxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsWUFBWTtFQUNaLHdCQUF3QjtFQUN4Qix1QkFBdUI7QUFDekI7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixpQkFBaUI7RUFDakIsV0FBVztFQUNYLHlCQUF5QjtBQUMzQjtBQUNBO0VBQ0UseUJBQXlCO0FBQzNCO0FBQ0E7RUFDRSxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsc0JBQXNCO0VBQ3RCLG9DQUFvQztBQUN0QztBQUNBO0VBQ0Usa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLHNCQUFzQjtBQUN4QjtBQUNBOztFQUVFLGdCQUFnQjtFQUNoQixhQUFhO0FBQ2Y7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjtBQUNBO0VBQ0Usa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLHNCQUFzQjtBQUN4QjtBQUNBO0VBQ0Usa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLHNCQUFzQjtFQUN0Qix5QkFBeUI7O0VBRXpCLG9CQUFvQjtBQUN0QjtBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLHNCQUFzQjs7RUFFdEIsb0JBQW9CO0FBQ3RCO0FBQ0E7RUFDRSxZQUFZO0VBQ1osWUFBWTtFQUNaLFdBQVc7RUFDWCxVQUFVO0VBQ1YsbUJBQW1CO0VBQ25CO21DQUNpQztFQUNqQyxrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLFdBQVc7RUFDWCxVQUFVO0FBQ1o7QUFFQTs7RUFFRTtBQUNGO0VBQ0UsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsc0JBQXNCO0VBQ3RCLFdBQVc7QUFDYjtBQUVBO0VBQ0U7aUJBQ2U7RUFDZix5QkFBeUI7RUFDekIsVUFBVTtFQUNWO21DQUNpQztFQUNqQyxrQkFBa0I7RUFDbEIsWUFBWTtFQUNaLHFCQUFxQjtBQUN2QjtBQUVBO0VBQ0U7aUJBQ2U7RUFDZix5QkFBeUI7RUFDekIsVUFBVTtFQUNWLDhDQUE4QztFQUM5QyxrQkFBa0I7O0VBRWxCLHFCQUFxQjtBQUN2QjtBQUVBO0VBQ0UsMEJBQTBCO0FBQzVCO0FBQ0E7RUFDRSxXQUFXO0VBQ1gsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWiwyQ0FBMkM7RUFDM0Msa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixlQUFlO0VBQ2Ysc0JBQXNCO0FBQ3hCO0FBQ0E7RUFDRSxtQkFBbUI7QUFDckI7QUFDQTtFQUNFLGNBQWM7RUFDZCxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsc0JBQXNCO0FBQ3hCO0FBUEE7RUFDRSxjQUFjO0VBQ2Qsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLHNCQUFzQjtBQUN4QjtBQVBBO0VBQ0UsY0FBYztFQUNkLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixzQkFBc0I7QUFDeEI7QUFDQTtFQUNFO0lBQ0UsaUJBQWlCO0VBQ25CO0VBQ0E7SUFDRSxlQUFlO0lBQ2YsZUFBZTtFQUNqQjtBQUNGO0FBRUE7RUFDRSxZQUFZO0FBQ2Q7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7QUFFQTtFQUNFLHdGQUF3RjtFQUN4RixpQ0FBaUM7RUFDakMscUNBQXFDO0FBQ3ZDO0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsWUFBWTtFQUNaLFlBQVk7RUFDWixhQUFhO0VBQ2IseUJBQXlCO0VBQ3pCLG1CQUFtQjtBQUNyQjtBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLHFDQUFxQzs7RUFFckMsc0JBQXNCO0FBQ3hCO0FBRUE7RUFDRSxZQUFZO0VBQ1osZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsbUJBQW1CO0FBQ3JCO0FBQ0E7RUFDRSxrQkFBa0I7RUFDbEIsUUFBUTtFQUNSLFFBQVE7QUFDVjtBQUVBOztFQUVFLDJCQUEyQjtBQUM3QjtBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLDhCQUE4QjtFQUM5QixZQUFZO0FBQ2Q7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjtBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLHNCQUFzQjtFQUN0QixjQUFjO0VBQ2QsWUFBWTtBQUNkO0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsYUFBYTtFQUNiLHlCQUF5QjtFQUN6QiwyQ0FBMkM7RUFDM0Msa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWiw4QkFBOEI7QUFDaEM7QUFFQTtFQUNFLFVBQVU7QUFDWjtBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixjQUFjO0FBQ2hCIiwiZmlsZSI6ImNyZWF0ZS1yZXdhcmQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi50d2luIHtcclxuICBmbG9hdDogbGVmdDtcclxuICBoZWlnaHQ6IDUwcHg7XHJcbiAgbWFyZ2luOiAxMHB4O1xyXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBsaW5lLWhlaWdodDogMjNweDtcclxuICBsZXR0ZXItc3BhY2luZzogMC4wMmVtO1xyXG4gIGNvbG9yOiAjMDAwMDAwO1xyXG59XHJcbi5tYXJnaW5SIHtcclxuICBmbG9hdDogcmlnaHQ7XHJcbiAgaGVpZ2h0OiA1MHB4O1xyXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBsaW5lLWhlaWdodDogMjNweDtcclxuICBsZXR0ZXItc3BhY2luZzogMC4wMmVtO1xyXG4gIGNvbG9yOiAjMDAwMDAwO1xyXG4gIG1hcmdpbi1yaWdodDogMTAwcHggIWltcG9ydGFudDtcclxufVxyXG4ubWFpbiB7XHJcbiAgbWFyZ2luLWxlZnQ6IDMwMHB4OyAvKiBTYW1lIGFzIHRoZSB3aWR0aCBvZiB0aGUgc2lkZW5hdiAqL1xyXG59XHJcbi5tYWluTGF5b3V0IHtcclxuICBwYWRkaW5nLWxlZnQ6IDEwMHB4O1xyXG59XHJcbi5ib2R5IHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG4gIHBhZGRpbmc6IDUwcHggNTBweDtcclxufVxyXG4uaGVhZGVyIHtcclxuICBoZWlnaHQ6IDY2cHg7XHJcbiAgcGFkZGluZzogNHB4IDBweCAwcHggMHB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xyXG59XHJcblxyXG50YWJsZSB7XHJcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcclxuICBib3JkZXItc3BhY2luZzogMDtcclxuICB3aWR0aDogMTAwJTtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjZjhmOGY4O1xyXG59XHJcbi50YWJsZUhlYWRlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YzZjNmMztcclxufVxyXG4udGFibGVIZWFkZXIgdGgge1xyXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICBmb250LXdlaWdodDogMzAwO1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBsaW5lLWhlaWdodDogMTRweDtcclxuICBsZXR0ZXItc3BhY2luZzogMC4wM2VtO1xyXG4gIGJvcmRlci1ib3R0b206IDEuNXB4IHNvbGlkIGxpZ2h0Z3JleTtcclxufVxyXG50Ym9keSB0ZCB7XHJcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAxNHB4O1xyXG4gIGxldHRlci1zcGFjaW5nOiAwLjAzZW07XHJcbn1cclxudGgsXHJcbnRkIHtcclxuICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gIHBhZGRpbmc6IDE2cHg7XHJcbn1cclxuXHJcbnRyOm50aC1jaGlsZChldmVuKSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YyZjJmMjtcclxufVxyXG5oMiB7XHJcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAxOHB4O1xyXG4gIGxldHRlci1zcGFjaW5nOiAwLjA1ZW07XHJcbn1cclxuaDMge1xyXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICBmb250LXdlaWdodDogOTAwO1xyXG4gIGZvbnQtc2l6ZTogMjJweDtcclxuICBsaW5lLWhlaWdodDogMzFweDtcclxuICBsZXR0ZXItc3BhY2luZzogMC4wNGVtO1xyXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcblxyXG4gIC8qIGNvbG9yOiAjRkZGRkZGOyAqL1xyXG59XHJcblxyXG5oNSB7XHJcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAxOHB4O1xyXG4gIGxldHRlci1zcGFjaW5nOiAwLjA0ZW07XHJcblxyXG4gIC8qIGNvbG9yOiAjRkZGRkZGOyAqL1xyXG59XHJcbi5idWlsZGluZ05hbWUge1xyXG4gIHdpZHRoOiAzMDlweDtcclxuICBoZWlnaHQ6IDM2cHg7XHJcbiAgbGVmdDogOTE3cHg7XHJcbiAgdG9wOiAxNzBweDtcclxuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xyXG4gIGJveC1zaGFkb3c6IDBweCAxcHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xKSwgMXB4IDBweCA0cHggcmdiYSgwLCAwLCAwLCAwLjEpLCAwcHggLTFweCA0cHggcmdiYSgwLCAwLCAwLCAwLjEpLFxyXG4gICAgLTFweCAwcHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuLnJld2FyZERpdiB7XHJcbiAgZmxvYXQ6IGxlZnQ7XHJcbiAgd2lkdGg6IDUwJTtcclxufVxyXG5cclxuLyogLmZvcm0tZ3JvdXAge1xyXG4gIHBhZGRpbmc6IDBweCAwcHggMHB4IDBweDtcclxufSovXHJcbi5mb3JtLWdyb3VwID4gbGFiZWwge1xyXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAyM3B4O1xyXG4gIGxldHRlci1zcGFjaW5nOiAwLjA0ZW07XHJcbiAgY29sb3I6ICMwMDA7XHJcbn1cclxuXHJcbi5mb3JtLWdyb3VwID4gaW5wdXQge1xyXG4gIC8qIHdpZHRoOiA0MDBweDtcclxuICBoZWlnaHQ6IDQycHg7ICovXHJcbiAgLyogYmFja2dyb3VuZDogI0RDM0YwRTsgKi9cclxuICB3aWR0aDogOTAlO1xyXG4gIGJveC1zaGFkb3c6IDBweCAxcHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xKSwgMXB4IDBweCA0cHggcmdiYSgwLCAwLCAwLCAwLjEpLCAwcHggLTFweCA0cHggcmdiYSgwLCAwLCAwLCAwLjEpLFxyXG4gICAgLTFweCAwcHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIC8qIGJvcmRlcjogI0RDM0YwRTsgKi9cclxufVxyXG5cclxuLmZvcm0tZ3JvdXAgPiBzZWxlY3Qge1xyXG4gIC8qIHdpZHRoOiA0MDBweDtcclxuICBoZWlnaHQ6IDQycHg7ICovXHJcbiAgLyogYmFja2dyb3VuZDogI0RDM0YwRTsgKi9cclxuICB3aWR0aDogOTAlO1xyXG4gIGJveC1zaGFkb3c6IGluc2V0IDBweCA0cHggNHB4IHJnYigwIDAgMCAvIDEwJSk7XHJcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG5cclxuICAvKiBib3JkZXI6ICNEQzNGMEU7ICovXHJcbn1cclxuXHJcbi5zdWJtaXQge1xyXG4gIHBhZGRpbmc6IDM4MHB4IDBweCAwcHggMHB4O1xyXG59XHJcbi5idG4tcHJpbWFyeSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYmFja2dyb3VuZDogI2ZmNmYzZDtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgYm94LXNoYWRvdzogMHB4IDNweCA0cHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgcGFkZGluZzogMzBweDtcclxuICBmb250LXNpemU6IDE3cHg7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDJlbTtcclxufVxyXG4uYnV0dG9uQ2F0ZWdvcnkge1xyXG4gIHBhZGRpbmctbGVmdDogMTAwcHg7XHJcbn1cclxuaW5wdXQ6OnBsYWNlaG9sZGVyIHtcclxuICBjb2xvcjogI2UxZTFlMTtcclxuICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgZm9udC13ZWlnaHQ6IDMwMDtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDZlbTtcclxufVxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LWhlaWdodDogNDUwcHgpIHtcclxuICAuc2lkZW5hdiB7XHJcbiAgICBwYWRkaW5nLXRvcDogMTVweDtcclxuICB9XHJcbiAgLnNpZGVuYXYgYSB7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgfVxyXG59XHJcblxyXG4uY3JlYXRlLXByb21vLWNvZGUge1xyXG4gIGhlaWdodDogNjFweDtcclxufVxyXG5cclxuLmJhY2staWNvbiB7XHJcbiAgd2lkdGg6IDQwcHg7XHJcbiAgaGVpZ2h0OiA0MHB4O1xyXG59XHJcblxyXG5zZWxlY3Qge1xyXG4gIC8qIGJhY2tncm91bmQ6IHVybCguLi8uLi8uLi9hc3NldHMvb3JhbmdlLWRyb3Bkb3duLWljb24ucG5nKSBuby1yZXBlYXQgOTklICFpbXBvcnRhbnQ7ICovXHJcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogcmlnaHQgY2VudGVyO1xyXG4gIGJhY2tncm91bmQtc2l6ZTogMzFweCAyNXB4ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5wcm9tby1iYWRnZSB7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIHdpZHRoOiAxODFweDtcclxuICBoZWlnaHQ6IDQ1cHg7XHJcbiAgcGFkZGluZzogMTBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJmMmYyO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbn1cclxuXHJcbi5yZXdhcmQtdGV4dCB7XHJcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAyM3B4O1xyXG4gIC8qIGlkZW50aWNhbCB0byBib3ggaGVpZ2h0LCBvciAxNjQlICovXHJcblxyXG4gIGxldHRlci1zcGFjaW5nOiAwLjA0ZW07XHJcbn1cclxuXHJcbi5kYXRlcGlja2VyX2lucHV0IHtcclxuICBwYWRkaW5nOiA1cHg7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG4gIHBhZGRpbmctbGVmdDogNDBweDtcclxuICBwYWRkaW5nLXRvcDogMnB4O1xyXG4gIHBhZGRpbmctYm90dG9tOiA3cHg7XHJcbn1cclxuLmNhbGVuZGVyIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgbGVmdDogNiU7XHJcbiAgdG9wOiA2OSU7XHJcbn1cclxuXHJcbi5tb2RhbC1sZyxcclxuLm1vZGFsLXhsIHtcclxuICBtYXgtd2lkdGg6IDYwMHB4ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5idG4tZ2VuZXJhdGUge1xyXG4gIHdpZHRoOiA1MCUgIWltcG9ydGFudDtcclxuICBib3JkZXItcmFkaXVzOiAxMHB4ICFpbXBvcnRhbnQ7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG59XHJcblxyXG4uY2FyZCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjhmODtcclxufVxyXG5cclxuLnJld2FyZC1oaXN0b3J5IHtcclxuICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxuICBmb250LXNpemU6IDE1cHg7XHJcbiAgbGluZS1oZWlnaHQ6IDE2cHg7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDNlbTtcclxuICBjb2xvcjogIzAwMDAwMDtcclxuICBtYXJnaW46IDE1cHg7XHJcbn1cclxuXHJcbi5idG4tc3VjY2VzcyB7XHJcbiAgd2lkdGg6IDI1JSAhaW1wb3J0YW50O1xyXG4gIHBhZGRpbmc6IDEwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzJjYmE2NTtcclxuICBib3gtc2hhZG93OiAwcHggM3B4IDRweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgYm9yZGVyLWNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uZXJyLW1zZyB7XHJcbiAgY29sb3I6IHJlZDtcclxufVxyXG5cclxuLmJ0bi1zaG9wcGluZyB7XHJcbiAgYmFja2dyb3VuZDogI0YxNUMyMztcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgY29sb3I6ICNGRkZGRkY7XHJcbn0iXX0= */"]
      });
      /***/
    },

    /***/
    16025:
    /*!************************************************************************!*\
      !*** ./src/app/dashboard/invoice-payment/invoice-payment.component.ts ***!
      \************************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "InvoicePaymentComponent": function InvoicePaymentComponent() {
          return (
            /* binding */
            _InvoicePaymentComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/router */
      39895);
      /* harmony import */


      var _layout_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../layout/sidebar/sidebar.component */
      31658);
      /* harmony import */


      var _layout_header_header_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../layout/header/header.component */
      1860);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/common */
      38583);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/forms */
      3679);

      function InvoicePaymentComponent_div_4_Template(rf, ctx) {
        if (rf & 1) {
          var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "h5", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function InvoicePaymentComponent_div_4_Template_h5_click_2_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r4);

            var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

            return ctx_r3.backToInvoice();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "i", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, " BACK TO INVOICES");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
      }

      function InvoicePaymentComponent_ng_container_7_div_32_div_44_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "div", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "hr");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
      }

      function InvoicePaymentComponent_ng_container_7_div_32_Template(rf, ctx) {
        if (rf & 1) {
          var _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "input", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function InvoicePaymentComponent_ng_container_7_div_32_Template_input_click_4_listener($event) {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r10);

            var invoiceList_r6 = restoredCtx.$implicit;

            var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);

            return ctx_r9.selectInvoice($event, invoiceList_r6);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "section");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "span", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "section");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "span", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "Date Generated:");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "span", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "Resident ID:");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "span", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](24, "Resident Name:");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](26);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "div", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](28, "section");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](30, "span", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](31, "Building Name:");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](32, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](33);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](34, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](35, "span", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](36, "Amount:");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](37, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](38);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](39, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](40, "span", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](41, "Invoice No:");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](42, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](43);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](44, InvoicePaymentComponent_ng_container_7_div_32_div_44_Template, 4, 0, "div", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var invoiceList_r6 = ctx.$implicit;
          var i_r7 = ctx.index;

          var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("checked", ctx_r5.findElementExists(invoiceList_r6));

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](invoiceList_r6.invoiceNo);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", invoiceList_r6.date, "");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", invoiceList_r6.residentId, "");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", invoiceList_r6.residentName, "");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", invoiceList_r6.buildingName, "");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", invoiceList_r6.amount, "");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", invoiceList_r6.invoiceReference, "");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", i_r7 < ctx_r5.invoices.length - 1);
        }
      }

      function InvoicePaymentComponent_ng_container_7_Template(rf, ctx) {
        if (rf & 1) {
          var _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "2");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "img", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "p", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "span", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "You currently have 2 Unpaid Invoices");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "select", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "option", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "Credit Card/Debit Card");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "option", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "Bank Account");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "div", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "h3");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, "$300");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "button", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22, "PAY INVOICES");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "div", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "div", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "input", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function InvoicePaymentComponent_ng_container_7_Template_input_click_26_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r12);

            var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

            return ctx_r11.payAllSelected($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "div", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](28, "hr");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "label", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](30, "SELECT ALL");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](31, "hr");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](32, InvoicePaymentComponent_ng_container_7_div_32_Template, 45, 9, "div", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](21);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", !ctx_r1.checkedInvoicesLength);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("checked", ctx_r1.checkedInvoicesLength == ctx_r1.invoices.length);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r1.invoices);
        }
      }

      function InvoicePaymentComponent_ng_container_8_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 36);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "img", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 37);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "select", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "option", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Credit Card/Debit Card");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "option", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Bank Account");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "button", 38);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "PAY INVOICE");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "div", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "h3", 39);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18, "AMOUNT DUE:");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "h3");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, "$300");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "p", 40);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "span", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23, "INVOICE NUMBER: L250065");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "div", 41);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "div", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](26, "hr");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "div", 43);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](28, "div", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "section");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](30, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "span", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](32, "L250065");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](33, "div", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](34, "section");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](35, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](36, "span", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](37, "Date Generated:");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](38, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](39, " Wednesday, July 7th 2021");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](40, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](41, "span", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](42, "Resident ID:");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](43, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](44, " #54732964");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](45, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](46, "span", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](47, "Resident Name:");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](48, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](49, " Dre Chrisiano");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](50, "div", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](51, "section");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](52, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](53, "span", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](54, "Building Name:");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](55, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](56, " Infinite Chicago");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](57, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](58, "span", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](59, "Amount:");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](60, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](61, " $300");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](62, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](63, "span", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](64, "Invoice No:");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](65, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](66, " #78324987");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
        }
      }

      var _InvoicePaymentComponent = /*#__PURE__*/function () {
        function _InvoicePaymentComponent(route, router) {
          var _this11 = this;

          _classCallCheck(this, _InvoicePaymentComponent);

          this.route = route;
          this.router = router;
          this.checkedInvoices = [];
          this.isPayAllInvoices = false;
          this.invoices = [{
            'invoiceNo': 'L250065',
            'date': 'Wednesday, July 7th 2021',
            'residentId': '#54732964',
            'residentName': 'Dre Chrisiano',
            'buildingName': 'Infinite Chicago',
            'amount': '$300',
            'invoiceReference': '#78324987'
          }, {
            'invoiceNo': 'L250066',
            'date': 'Wednesday, July 7th 2021',
            'residentId': '#54732964',
            'residentName': 'Dre Chrisiano',
            'buildingName': 'Infinite Chicago',
            'amount': '$300',
            'invoiceReference': '#78324987'
          }];
          this.route.queryParams.subscribe(function (params) {
            if (params.payAll) {
              _this11.isPayAllInvoices = true;
            } else if (params.invoice) {
              _this11.currentInvoice = params.invoice;
            }
          });
        }

        _createClass(_InvoicePaymentComponent, [{
          key: "checkedInvoicesLength",
          get: function get() {
            return this.checkedInvoices.length;
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "payAllSelected",
          value: function payAllSelected(event) {
            var _this12 = this;

            if (event.target.checked) {
              this.invoices.map(function (item) {
                if (item) {
                  _this12.checkedInvoices.push(item);
                }
              });
            } else {
              this.checkedInvoices = [];
            }
          }
        }, {
          key: "selectInvoice",
          value: function selectInvoice(event, invoice) {
            if (event.target.checked) {
              this.checkedInvoices.push(invoice);
            } else {
              var index = this.checkedInvoices.findIndex(function (item) {
                return item.invoiceNo == invoice.invoiceNo;
              });
              this.checkedInvoices.splice(index, 1);
            }
          }
        }, {
          key: "findElementExists",
          value: function findElementExists(obj) {
            var index = this.checkedInvoices.findIndex(function (item) {
              return item.invoiceNo == obj.invoiceNo;
            });
            var isExist = index != -1 ? true : false;
            return isExist;
          }
        }, {
          key: "backToInvoice",
          value: function backToInvoice() {
            this.router.navigate(['/invoices']);
          }
        }]);

        return _InvoicePaymentComponent;
      }();

      _InvoicePaymentComponent.ɵfac = function InvoicePaymentComponent_Factory(t) {
        return new (t || _InvoicePaymentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router));
      };

      _InvoicePaymentComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: _InvoicePaymentComponent,
        selectors: [["app-invoice-payment"]],
        decls: 9,
        vars: 3,
        consts: [[1, "main"], [1, "body"], ["class", "row", 4, "ngIf"], [1, "card"], [1, "card-body"], [4, "ngIf"], [1, "row"], [1, "col-6", "mt-1"], [2, "cursor", "pointer", 3, "click"], [1, "fas", "fa-arrow-left", "fa-1x", "theme-color", "pointer", 2, "margin-right", "10px"], [1, "row", "mb-3", "align-items-center"], [1, "col-3"], [1, "circle"], [1, "bubble"], ["src", "assets/invoice.png", "alt", "invoice", 1, "img-style-note"], [1, "col-5", "text-center"], [1, "m-0"], [1, "badge", "badge-light", "w-100"], ["placeholder", "Select a Payment Option", 1, "mt-3", "ml-unpaid"], ["value", ""], [1, "col-4"], [1, "d-flex", "flex-column", "align-items-center", "justify-content-center"], [1, "btn", "btn-success", 3, "disabled"], [1, "row", "align-items-center"], [1, "col-1"], ["type", "checkbox", "id", "payAllInvoice", "value", "", "aria-label", "...", 1, "form-check-input", 3, "checked", "click"], [1, "col-11"], ["for", "payAllInvoice", 2, "cursor", "pointer"], ["class", "row mt-4 mb-2 align-items-center", 4, "ngFor", "ngForOf"], [1, "row", "mt-4", "mb-2", "align-items-center"], ["type", "checkbox", "id", "checkboxNoLabel", "value", "", "aria-label", "...", 1, "form-check-input", "align-checkbox", 3, "checked", "click"], [1, "col-2"], [1, "badge", "badge-light"], [1, "col-5"], [1, "invoice-details"], [1, "col-lg-11"], [1, "col-7", "border-end"], [1, "col-7", "text-center"], [1, "btn", "btn-success", "mt-5", 2, "width", "80%"], [1, "mb-3"], [1, "mt-3"], [1, "row", "mt-4"], [1, "col-12"], [1, "row", "align-items-center", "mt-4"]],
        template: function InvoicePaymentComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "app-sidebar");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "app-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, InvoicePaymentComponent_div_4_Template, 6, 0, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, InvoicePaymentComponent_ng_container_7_Template, 33, 3, "ng-container", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, InvoicePaymentComponent_ng_container_8_Template, 67, 0, "ng-container", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.isPayAllInvoices);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isPayAllInvoices);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.isPayAllInvoices);
          }
        },
        directives: [_layout_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_0__.SidebarComponent, _layout_header_header_component__WEBPACK_IMPORTED_MODULE_1__.HeaderComponent, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵNgSelectMultipleOption"], _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf],
        styles: [".body[_ngcontent-%COMP%] {\r\n    height: 100%;\r\n    overflow-x: hidden;\r\n    padding: 50px 50px;\r\n}\r\n.main[_ngcontent-%COMP%] {\r\n    margin-left: 300px; \r\n}\r\n.circle[_ngcontent-%COMP%] {\r\n    height: 6rem;\r\n    width: 6rem;\r\n    padding: 30px;\r\n    border-radius: 50%;\r\n    border: 1px solid #ffffff;\r\n    position: relative;\r\n    background-color: #ffffff !important;\r\n}\r\n.circle[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n    position: absolute;\r\n    left: 50%;\r\n    top: 50%;\r\n    transform: translate(-50%, -50%);\r\n}\r\n.bubble[_ngcontent-%COMP%] {\r\n    height: 2rem;\r\n    width: 2rem;\r\n    border-radius: 50%;\r\n    position: absolute;\r\n    background-color: #ef5e2f;\r\n    left: 80px;\r\n    top: 10px;\r\n    text-align: center;\r\n    color: white;\r\n}\r\n.bubble[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n    position: absolute;\r\n    left: 50%;\r\n    top: 50%;\r\n    transform: translate(-50%, -50%);\r\n}\r\n.card[_ngcontent-%COMP%] {\r\n    background-color: #f3f3f3;\r\n    padding: 50px;\r\n}\r\n.btn-primary[_ngcontent-%COMP%] {\r\n    background-color: #42a4ec;\r\n    color: #ffffff;\r\n}\r\n.badge[_ngcontent-%COMP%] {\r\n    color: #000000;\r\n    background-color: #ffffff;\r\n    border-radius: 20px;\r\n    padding: 15px;\r\n    letter-spacing: 0.03em;\r\n    font-size: 18px;\r\n    font-weight: 300;\r\n}\r\n.btn-success[_ngcontent-%COMP%] {\r\n    background-color: #2cba65;\r\n    background: #2cba65;\r\n    box-shadow: 0px 3px 4px rgb(0 0 0 / 15%);\r\n    border-radius: 8px;\r\n    padding-left: 20px;\r\n    padding-right: 20px;\r\n}\r\n.form-check-input[_ngcontent-%COMP%] {\r\n    width: 1.5em !important;\r\n    height: 1.5em !important;\r\n}\r\n.align-checkbox[_ngcontent-%COMP%] {\r\n    margin-top: 0px !important;\r\n    margin-bottom: 12px !important;\r\n}\r\nselect[_ngcontent-%COMP%] {\r\n    width: 100% !important;\r\n    height: 47px;\r\n    background: url('dropicon-payment.png') no-repeat 99% !important;\r\n    background-size: 35px 35px !important;\r\n    -webkit-appearance: none;\r\n    border-color: snow;\r\n    padding: 5px;\r\n    background-color: #ffffff !important;\r\n    padding: 10px;\r\n    border-radius: 10px !important;\r\n}\r\n.invoice-details[_ngcontent-%COMP%] {\r\n    font-weight: 600;\r\n    font-size: 14px;\r\n    line-height: 23px;\r\n    letter-spacing: 0.04em;\r\n    color: #000000;\r\n}\r\n.border-end[_ngcontent-%COMP%] {\r\n    border-right: 1px solid #bababa !important;\r\n}\r\nlabel[_ngcontent-%COMP%] {\r\n    font-style: normal;\r\n    font-size: 16px;\r\n    line-height: 23px;\r\n    letter-spacing: 0.05em;\r\n    color: #000000;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludm9pY2UtcGF5bWVudC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixrQkFBa0I7QUFDdEI7QUFDQTtJQUNJLGtCQUFrQixFQUFFLHFDQUFxQztBQUM3RDtBQUVBO0lBQ0ksWUFBWTtJQUNaLFdBQVc7SUFDWCxhQUFhO0lBQ2Isa0JBQWtCO0lBQ2xCLHlCQUF5QjtJQUN6QixrQkFBa0I7SUFDbEIsb0NBQW9DO0FBQ3hDO0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsU0FBUztJQUNULFFBQVE7SUFDUixnQ0FBZ0M7QUFDcEM7QUFFQTtJQUNJLFlBQVk7SUFDWixXQUFXO0lBQ1gsa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFDekIsVUFBVTtJQUNWLFNBQVM7SUFDVCxrQkFBa0I7SUFDbEIsWUFBWTtBQUNoQjtBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFNBQVM7SUFDVCxRQUFRO0lBQ1IsZ0NBQWdDO0FBQ3BDO0FBRUE7SUFDSSx5QkFBeUI7SUFDekIsYUFBYTtBQUNqQjtBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLGNBQWM7QUFDbEI7QUFFQTtJQUNJLGNBQWM7SUFDZCx5QkFBeUI7SUFDekIsbUJBQW1CO0lBQ25CLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsZUFBZTtJQUNmLGdCQUFnQjtBQUNwQjtBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLG1CQUFtQjtJQUNuQix3Q0FBd0M7SUFDeEMsa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixtQkFBbUI7QUFDdkI7QUFFQTtJQUNJLHVCQUF1QjtJQUN2Qix3QkFBd0I7QUFDNUI7QUFFQTtJQUNJLDBCQUEwQjtJQUMxQiw4QkFBOEI7QUFDbEM7QUFDQTtJQUNJLHNCQUFzQjtJQUN0QixZQUFZO0lBQ1osZ0VBQThFO0lBQzlFLHFDQUFxQztJQUNyQyx3QkFBd0I7SUFDeEIsa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWixvQ0FBb0M7SUFDcEMsYUFBYTtJQUNiLDhCQUE4QjtBQUNsQztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsc0JBQXNCO0lBQ3RCLGNBQWM7QUFDbEI7QUFFQTtJQUNJLDBDQUEwQztBQUM5QztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsc0JBQXNCO0lBQ3RCLGNBQWM7QUFDbEIiLCJmaWxlIjoiaW52b2ljZS1wYXltZW50LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYm9keSB7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgICBwYWRkaW5nOiA1MHB4IDUwcHg7XHJcbn1cclxuLm1haW4ge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDMwMHB4OyAvKiBTYW1lIGFzIHRoZSB3aWR0aCBvZiB0aGUgc2lkZW5hdiAqL1xyXG59XHJcblxyXG4uY2lyY2xlIHtcclxuICAgIGhlaWdodDogNnJlbTtcclxuICAgIHdpZHRoOiA2cmVtO1xyXG4gICAgcGFkZGluZzogMzBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNmZmZmZmY7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmICFpbXBvcnRhbnQ7XHJcbn1cclxuLmNpcmNsZSBpbWcge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbGVmdDogNTAlO1xyXG4gICAgdG9wOiA1MCU7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcclxufVxyXG5cclxuLmJ1YmJsZSB7XHJcbiAgICBoZWlnaHQ6IDJyZW07XHJcbiAgICB3aWR0aDogMnJlbTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNlZjVlMmY7XHJcbiAgICBsZWZ0OiA4MHB4O1xyXG4gICAgdG9wOiAxMHB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4uYnViYmxlIHNwYW4ge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbGVmdDogNTAlO1xyXG4gICAgdG9wOiA1MCU7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcclxufVxyXG5cclxuLmNhcmQge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2YzZjNmMztcclxuICAgIHBhZGRpbmc6IDUwcHg7XHJcbn1cclxuXHJcbi5idG4tcHJpbWFyeSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDJhNGVjO1xyXG4gICAgY29sb3I6ICNmZmZmZmY7XHJcbn1cclxuXHJcbi5iYWRnZSB7XHJcbiAgICBjb2xvcjogIzAwMDAwMDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XHJcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xyXG4gICAgcGFkZGluZzogMTVweDtcclxuICAgIGxldHRlci1zcGFjaW5nOiAwLjAzZW07XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBmb250LXdlaWdodDogMzAwO1xyXG59XHJcblxyXG4uYnRuLXN1Y2Nlc3Mge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzJjYmE2NTtcclxuICAgIGJhY2tncm91bmQ6ICMyY2JhNjU7XHJcbiAgICBib3gtc2hhZG93OiAwcHggM3B4IDRweCByZ2IoMCAwIDAgLyAxNSUpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgcGFkZGluZy1sZWZ0OiAyMHB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogMjBweDtcclxufVxyXG5cclxuLmZvcm0tY2hlY2staW5wdXQge1xyXG4gICAgd2lkdGg6IDEuNWVtICFpbXBvcnRhbnQ7XHJcbiAgICBoZWlnaHQ6IDEuNWVtICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5hbGlnbi1jaGVja2JveCB7XHJcbiAgICBtYXJnaW4tdG9wOiAwcHggIWltcG9ydGFudDtcclxuICAgIG1hcmdpbi1ib3R0b206IDEycHggIWltcG9ydGFudDtcclxufVxyXG5zZWxlY3Qge1xyXG4gICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcclxuICAgIGhlaWdodDogNDdweDtcclxuICAgIGJhY2tncm91bmQ6IHVybCguLi8uLi8uLi9hc3NldHMvZHJvcGljb24tcGF5bWVudC5wbmcpIG5vLXJlcGVhdCA5OSUgIWltcG9ydGFudDtcclxuICAgIGJhY2tncm91bmQtc2l6ZTogMzVweCAzNXB4ICFpbXBvcnRhbnQ7XHJcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XHJcbiAgICBib3JkZXItY29sb3I6IHNub3c7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uaW52b2ljZS1kZXRhaWxzIHtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBsaW5lLWhlaWdodDogMjNweDtcclxuICAgIGxldHRlci1zcGFjaW5nOiAwLjA0ZW07XHJcbiAgICBjb2xvcjogIzAwMDAwMDtcclxufVxyXG5cclxuLmJvcmRlci1lbmQge1xyXG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2JhYmFiYSAhaW1wb3J0YW50O1xyXG59XHJcblxyXG5sYWJlbCB7XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICBsaW5lLWhlaWdodDogMjNweDtcclxuICAgIGxldHRlci1zcGFjaW5nOiAwLjA1ZW07XHJcbiAgICBjb2xvcjogIzAwMDAwMDtcclxufVxyXG4iXX0= */"]
      });
      /***/
    },

    /***/
    27214:
    /*!**********************************************************!*\
      !*** ./src/app/dashboard/invoices/invoices.component.ts ***!
      \**********************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "InvoicesComponent": function InvoicesComponent() {
          return (
            /* binding */
            _InvoicesComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var _services_rewardmgt_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../services/rewardmgt.service */
      81856);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/router */
      39895);
      /* harmony import */


      var _layout_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../layout/sidebar/sidebar.component */
      31658);
      /* harmony import */


      var _layout_header_header_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../layout/header/header.component */
      1860);
      /* harmony import */


      var _shared_components_table_filter_table_filter_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../shared/components/table-filter/table-filter.component */
      11450);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/common */
      38583);

      function InvoicesComponent_tr_27_ng_container_14_Template(rf, ctx) {
        if (rf & 1) {
          var _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "span", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "UNPAID");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "button", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function InvoicesComponent_tr_27_ng_container_14_Template_button_click_3_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r6);

            var table_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;

            var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

            return ctx_r4.invoicePayment(table_r1);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "PAY NOW");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
        }
      }

      function InvoicesComponent_tr_27_ng_container_15_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "span", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "PAID");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "button", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "VIEW DETAILS");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
        }
      }

      function InvoicesComponent_tr_27_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "td", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](14, InvoicesComponent_tr_27_ng_container_14_Template, 5, 0, "ng-container", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](15, InvoicesComponent_tr_27_ng_container_15_Template, 5, 0, "ng-container", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var table_r1 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](table_r1.date);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](table_r1.invoice);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](table_r1.residentId);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](table_r1.residentName);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](table_r1.buildingName);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](table_r1.amount);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", table_r1.paymentStatus == "UNPAID");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", table_r1.paymentStatus == "PAID");
        }
      }

      var _InvoicesComponent = /*#__PURE__*/function () {
        function _InvoicesComponent(reward, _router) {
          _classCallCheck(this, _InvoicesComponent);

          this.reward = reward;
          this._router = _router;
          this.data = [{
            date: "12/11/2021",
            invoice: "#000000",
            residentId: "#000000",
            residentName: 'Mathews, Dave',
            buildingName: 'The Link Minneapolis Low Rise',
            amount: '$300',
            paymentStatus: 'UNPAID'
          }, {
            date: "12/11/2021",
            invoice: "#000000",
            residentId: "#000000",
            residentName: 'Mathews, Dave',
            buildingName: 'The Link Minneapolis Low Rise',
            amount: '$300',
            paymentStatus: 'PAID'
          }, {
            date: "12/11/2021",
            invoice: "#000000",
            residentId: "#000000",
            residentName: 'Mathews, Dave',
            buildingName: 'The Link Minneapolis Low Rise',
            amount: '$300',
            paymentStatus: 'PAID'
          }, {
            date: "12/11/2021",
            invoice: "#000000",
            residentId: "#000000",
            residentName: 'Mathews, Dave',
            buildingName: 'The Link Minneapolis Low Rise',
            amount: '$300',
            paymentStatus: 'UNPAID'
          }, {
            date: "12/11/2021",
            invoice: "#000000",
            residentId: "#000000",
            residentName: 'Mathews, Dave',
            buildingName: 'The Link Minneapolis Low Rise',
            amount: '$300',
            paymentStatus: 'UNPAID'
          }];
          this.collection = [];
        }

        _createClass(_InvoicesComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this13 = this;

            this.reward.getRewardList().subscribe(function (res) {
              _this13.collection = res;
            });
          }
        }, {
          key: "createReward",
          value: function createReward() {
            this._router.navigateByUrl('/create-reward');
          }
        }, {
          key: "invoicePayment",
          value: function invoicePayment(value) {
            this._router.navigate(['/invoices-payment'], {
              queryParams: {
                invoice: value.invoice
              }
            });
          }
        }]);

        return _InvoicesComponent;
      }();

      _InvoicesComponent.ɵfac = function InvoicesComponent_Factory(t) {
        return new (t || _InvoicesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_rewardmgt_service__WEBPACK_IMPORTED_MODULE_0__.RewardmgtService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router));
      };

      _InvoicesComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
        type: _InvoicesComponent,
        selectors: [["app-invoices"]],
        decls: 28,
        vars: 1,
        consts: [[1, "main"], [1, "body"], [1, "row"], [1, "col-lg-12"], [1, "row", "mt-4"], [1, "table", "table-borderless"], [1, "tableHeader", "w-100"], [1, "text-center"], ["width", "5%"], ["width", "15%"], ["width", "20%"], ["width", "25%"], [4, "ngFor", "ngForOf"], [1, "d-flex", "align-items-center", "pl-0", "pr-0"], [4, "ngIf"], [1, "unpaid", "col", "text-center"], [1, "btn", "btn-primary", 3, "click"], [1, "paid", "col", "text-center"], [1, "btn", "btn-primary"]],
        template: function InvoicesComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "app-sidebar");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "app-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "app-table-filter");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "table", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "thead", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "tr", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "th", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13, "Date");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "th", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15, "Invoice No.");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "th", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, "Resident ID");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "th", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](19, "Resident Name");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](20, "th", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](21, "Building Name");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "th", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](23, "Amount");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](24, "th", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](25, "Payment Status");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](26, "tbody");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](27, InvoicesComponent_tr_27_Template, 16, 8, "tr", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](27);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.data);
          }
        },
        directives: [_layout_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_1__.SidebarComponent, _layout_header_header_component__WEBPACK_IMPORTED_MODULE_2__.HeaderComponent, _shared_components_table_filter_table_filter_component__WEBPACK_IMPORTED_MODULE_3__.TableFilterComponent, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf],
        styles: [".tabImage[_ngcontent-%COMP%] {\r\n  float: left;\r\n  background-color: white;\r\n  margin: -8px 14px 0px 26px;\r\n  box-shadow: 0px 4px 4px rgb(0 0 0 / 10%), 4px 0px 4px rgb(0 0 0 / 10%), -4px 0px 4px rgb(0 0 0 / 10%);\r\n  border-radius: 5px;\r\n  width: 44px;\r\n  height: 41px;\r\n}\r\n.twin[_ngcontent-%COMP%] {\r\n  float: left;\r\n  height: 50px;\r\n  margin: 10px;\r\n  font-style: normal;\r\n  font-weight: 500;\r\n  font-size: 14px;\r\n  line-height: 23px;\r\n  letter-spacing: 0.02em;\r\n  color: #000000;\r\n}\r\n.marginR[_ngcontent-%COMP%] {\r\n  float: right;\r\n  height: 50px;\r\n  font-style: normal;\r\n  font-weight: 500;\r\n  font-size: 14px;\r\n  line-height: 23px;\r\n  letter-spacing: 0.02em;\r\n  color: #000000;\r\n  margin-right: 100px !important;\r\n}\r\n.main[_ngcontent-%COMP%] {\r\n  margin-left: 300px; \r\n}\r\n.mainLayout[_ngcontent-%COMP%] {\r\n  padding: 100px 10px 10px 10px;\r\n}\r\n.body[_ngcontent-%COMP%] {\r\n  height: 100%;\r\n  overflow-x: hidden;\r\n  padding: 50px 50px;\r\n}\r\n.header[_ngcontent-%COMP%] {\r\n  height: 66px;\r\n  padding: 4px 0px 0px 0px;\r\n  border: 1px solid black;\r\n}\r\ntable[_ngcontent-%COMP%] {\r\n  border-collapse: collapse;\r\n  border-spacing: 0;\r\n  width: 100%;\r\n  border: 1px solid #f8f8f8;\r\n}\r\n.tableHeader[_ngcontent-%COMP%] {\r\n  background-color: #f3f3f3;\r\n}\r\n.tableHeader[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\r\n  font-style: normal;\r\n  font-weight: 300;\r\n  font-size: 14px;\r\n  line-height: 14px;\r\n  letter-spacing: 0.03em;\r\n  border-bottom: 1.5px solid lightgrey;\r\n}\r\ntbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\r\n  font-style: normal;\r\n  font-weight: 300;\r\n  font-size: 14px;\r\n  line-height: 14px;\r\n  letter-spacing: 0.03em;\r\n}\r\nth[_ngcontent-%COMP%], td[_ngcontent-%COMP%] {\r\n  text-align: center;\r\n  padding: 20px;\r\n}\r\ntr[_ngcontent-%COMP%]:nth-child(even) {\r\n  background-color: #f2f2f2;\r\n}\r\nh2[_ngcontent-%COMP%] {\r\n  font-style: normal;\r\n  font-weight: 300;\r\n  font-size: 17px;\r\n  line-height: 17px;\r\n  letter-spacing: 0.05em;\r\n}\r\n.buildingName[_ngcontent-%COMP%] {\r\n  width: 309px;\r\n  height: 36px;\r\n  left: 917px;\r\n  top: 170px;\r\n  background: #ffffff;\r\n  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1), 1px 0px 4px rgba(0, 0, 0, 0.1), 0px -1px 4px rgba(0, 0, 0, 0.1),\r\n    -1px 0px 4px rgba(0, 0, 0, 0.1);\r\n  border-radius: 5px;\r\n  margin-right: 33px;\r\n}\r\nselect[_ngcontent-%COMP%] {\r\n  width: 180px !important;\r\n  padding: 5px;\r\n  font-size: 16px;\r\n  line-height: 1;\r\n  border: 0;\r\n  border-radius: 5px !important;\r\n  height: 34px !important;\r\n  background: url('orange-dropdown-icon.png') no-repeat right #ffffff !important;\r\n  -webkit-appearance: none;\r\n  background-position-x: 144px !important;\r\n  background-size: 31px 25px !important;\r\n}\r\n.tdTab[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\r\n  clear: left;\r\n  text-align: right;\r\n  padding-right: 21px;\r\n}\r\n.tdTab[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\r\n  background: #42a4ec;\r\n  border-radius: 5px;\r\n  color: white;\r\n  border: none;\r\n  font-style: normal;\r\n  font-weight: bold;\r\n  font-size: 9px;\r\n  line-height: 16px;\r\n  letter-spacing: 0.03em;\r\n  text-transform: uppercase;\r\n  padding: 8px;\r\n}\r\n@media screen and (max-height: 450px) {\r\n  .sidenav[_ngcontent-%COMP%] {\r\n    padding-top: 15px;\r\n  }\r\n  .sidenav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\r\n    font-size: 14px;\r\n    cursor: pointer;\r\n  }\r\n}\r\n.btn[_ngcontent-%COMP%] {\r\n  width: 80px;\r\n  height: 32px;\r\n  padding: 5px;\r\n  font-size: 9px;\r\n}\r\n.btn-primary[_ngcontent-%COMP%] {\r\n  color: #ffffff;\r\n  background-color: #42a4ec;\r\n}\r\n.unpaid[_ngcontent-%COMP%] {\r\n  color: #ed5959;\r\n  font-size: 12px;\r\n}\r\n.paid[_ngcontent-%COMP%] {\r\n  color: #37bf16;\r\n  font-size: 12px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludm9pY2VzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFXO0VBQ1gsdUJBQXVCO0VBQ3ZCLDBCQUEwQjtFQUMxQixxR0FBcUc7RUFDckcsa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7QUFDQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixzQkFBc0I7RUFDdEIsY0FBYztBQUNoQjtBQUNBO0VBQ0UsWUFBWTtFQUNaLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsc0JBQXNCO0VBQ3RCLGNBQWM7RUFDZCw4QkFBOEI7QUFDaEM7QUFDQTtFQUNFLGtCQUFrQixFQUFFLHFDQUFxQztBQUMzRDtBQUNBO0VBQ0UsNkJBQTZCO0FBQy9CO0FBQ0E7RUFDRSxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsWUFBWTtFQUNaLHdCQUF3QjtFQUN4Qix1QkFBdUI7QUFDekI7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixpQkFBaUI7RUFDakIsV0FBVztFQUNYLHlCQUF5QjtBQUMzQjtBQUNBO0VBQ0UseUJBQXlCO0FBQzNCO0FBQ0E7RUFDRSxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsc0JBQXNCO0VBQ3RCLG9DQUFvQztBQUN0QztBQUNBO0VBQ0Usa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLHNCQUFzQjtBQUN4QjtBQUNBOztFQUVFLGtCQUFrQjtFQUNsQixhQUFhO0FBQ2Y7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjtBQUNBO0VBQ0Usa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLHNCQUFzQjtBQUN4QjtBQUVBO0VBQ0UsWUFBWTtFQUNaLFlBQVk7RUFDWixXQUFXO0VBQ1gsVUFBVTtFQUNWLG1CQUFtQjtFQUNuQjttQ0FDaUM7RUFDakMsa0JBQWtCO0VBQ2xCLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixlQUFlO0VBQ2YsY0FBYztFQUNkLFNBQVM7RUFDVCw2QkFBNkI7RUFDN0IsdUJBQXVCO0VBQ3ZCLDhFQUE0RjtFQUM1Rix3QkFBd0I7RUFDeEIsdUNBQXVDO0VBQ3ZDLHFDQUFxQztBQUN2QztBQUVBO0VBQ0UsV0FBVztFQUNYLGlCQUFpQjtFQUNqQixtQkFBbUI7QUFDckI7QUFDQTtFQUNFLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsWUFBWTtFQUNaLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLGNBQWM7RUFDZCxpQkFBaUI7RUFDakIsc0JBQXNCO0VBQ3RCLHlCQUF5QjtFQUN6QixZQUFZO0FBQ2Q7QUFDQTtFQUNFO0lBQ0UsaUJBQWlCO0VBQ25CO0VBQ0E7SUFDRSxlQUFlO0lBQ2YsZUFBZTtFQUNqQjtBQUNGO0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLFlBQVk7RUFDWixjQUFjO0FBQ2hCO0FBQ0E7RUFDRSxjQUFjO0VBQ2QseUJBQXlCO0FBQzNCO0FBRUE7RUFDRSxjQUFjO0VBQ2QsZUFBZTtBQUNqQjtBQUVBO0VBQ0UsY0FBYztFQUNkLGVBQWU7QUFDakIiLCJmaWxlIjoiaW52b2ljZXMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi50YWJJbWFnZSB7XHJcbiAgZmxvYXQ6IGxlZnQ7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgbWFyZ2luOiAtOHB4IDE0cHggMHB4IDI2cHg7XHJcbiAgYm94LXNoYWRvdzogMHB4IDRweCA0cHggcmdiKDAgMCAwIC8gMTAlKSwgNHB4IDBweCA0cHggcmdiKDAgMCAwIC8gMTAlKSwgLTRweCAwcHggNHB4IHJnYigwIDAgMCAvIDEwJSk7XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gIHdpZHRoOiA0NHB4O1xyXG4gIGhlaWdodDogNDFweDtcclxufVxyXG4udHdpbiB7XHJcbiAgZmxvYXQ6IGxlZnQ7XHJcbiAgaGVpZ2h0OiA1MHB4O1xyXG4gIG1hcmdpbjogMTBweDtcclxuICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgbGluZS1oZWlnaHQ6IDIzcHg7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDJlbTtcclxuICBjb2xvcjogIzAwMDAwMDtcclxufVxyXG4ubWFyZ2luUiB7XHJcbiAgZmxvYXQ6IHJpZ2h0O1xyXG4gIGhlaWdodDogNTBweDtcclxuICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgbGluZS1oZWlnaHQ6IDIzcHg7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDJlbTtcclxuICBjb2xvcjogIzAwMDAwMDtcclxuICBtYXJnaW4tcmlnaHQ6IDEwMHB4ICFpbXBvcnRhbnQ7XHJcbn1cclxuLm1haW4ge1xyXG4gIG1hcmdpbi1sZWZ0OiAzMDBweDsgLyogU2FtZSBhcyB0aGUgd2lkdGggb2YgdGhlIHNpZGVuYXYgKi9cclxufVxyXG4ubWFpbkxheW91dCB7XHJcbiAgcGFkZGluZzogMTAwcHggMTBweCAxMHB4IDEwcHg7XHJcbn1cclxuLmJvZHkge1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgcGFkZGluZzogNTBweCA1MHB4O1xyXG59XHJcbi5oZWFkZXIge1xyXG4gIGhlaWdodDogNjZweDtcclxuICBwYWRkaW5nOiA0cHggMHB4IDBweCAwcHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XHJcbn1cclxuXHJcbnRhYmxlIHtcclxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xyXG4gIGJvcmRlci1zcGFjaW5nOiAwO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNmOGY4Zjg7XHJcbn1cclxuLnRhYmxlSGVhZGVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjNmM2YzO1xyXG59XHJcbi50YWJsZUhlYWRlciB0aCB7XHJcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAxNHB4O1xyXG4gIGxldHRlci1zcGFjaW5nOiAwLjAzZW07XHJcbiAgYm9yZGVyLWJvdHRvbTogMS41cHggc29saWQgbGlnaHRncmV5O1xyXG59XHJcbnRib2R5IHRkIHtcclxuICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgZm9udC13ZWlnaHQ6IDMwMDtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgbGluZS1oZWlnaHQ6IDE0cHg7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDNlbTtcclxufVxyXG50aCxcclxudGQge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBwYWRkaW5nOiAyMHB4O1xyXG59XHJcblxyXG50cjpudGgtY2hpbGQoZXZlbikge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmMmYyZjI7XHJcbn1cclxuaDIge1xyXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICBmb250LXdlaWdodDogMzAwO1xyXG4gIGZvbnQtc2l6ZTogMTdweDtcclxuICBsaW5lLWhlaWdodDogMTdweDtcclxuICBsZXR0ZXItc3BhY2luZzogMC4wNWVtO1xyXG59XHJcblxyXG4uYnVpbGRpbmdOYW1lIHtcclxuICB3aWR0aDogMzA5cHg7XHJcbiAgaGVpZ2h0OiAzNnB4O1xyXG4gIGxlZnQ6IDkxN3B4O1xyXG4gIHRvcDogMTcwcHg7XHJcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcclxuICBib3gtc2hhZG93OiAwcHggMXB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMSksIDFweCAwcHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xKSwgMHB4IC0xcHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xKSxcclxuICAgIC0xcHggMHB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gIG1hcmdpbi1yaWdodDogMzNweDtcclxufVxyXG5zZWxlY3Qge1xyXG4gIHdpZHRoOiAxODBweCAhaW1wb3J0YW50O1xyXG4gIHBhZGRpbmc6IDVweDtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbiAgbGluZS1oZWlnaHQ6IDE7XHJcbiAgYm9yZGVyOiAwO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweCAhaW1wb3J0YW50O1xyXG4gIGhlaWdodDogMzRweCAhaW1wb3J0YW50O1xyXG4gIGJhY2tncm91bmQ6IHVybCguLi8uLi8uLi9hc3NldHMvb3JhbmdlLWRyb3Bkb3duLWljb24ucG5nKSBuby1yZXBlYXQgcmlnaHQgI2ZmZmZmZiAhaW1wb3J0YW50O1xyXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcclxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXg6IDE0NHB4ICFpbXBvcnRhbnQ7XHJcbiAgYmFja2dyb3VuZC1zaXplOiAzMXB4IDI1cHggIWltcG9ydGFudDtcclxufVxyXG5cclxuLnRkVGFiIGxhYmVsIHtcclxuICBjbGVhcjogbGVmdDtcclxuICB0ZXh0LWFsaWduOiByaWdodDtcclxuICBwYWRkaW5nLXJpZ2h0OiAyMXB4O1xyXG59XHJcbi50ZFRhYiBidXR0b24ge1xyXG4gIGJhY2tncm91bmQ6ICM0MmE0ZWM7XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGZvbnQtc2l6ZTogOXB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAxNnB4O1xyXG4gIGxldHRlci1zcGFjaW5nOiAwLjAzZW07XHJcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICBwYWRkaW5nOiA4cHg7XHJcbn1cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC1oZWlnaHQ6IDQ1MHB4KSB7XHJcbiAgLnNpZGVuYXYge1xyXG4gICAgcGFkZGluZy10b3A6IDE1cHg7XHJcbiAgfVxyXG4gIC5zaWRlbmF2IGEge1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIH1cclxufVxyXG5cclxuLmJ0biB7XHJcbiAgd2lkdGg6IDgwcHg7XHJcbiAgaGVpZ2h0OiAzMnB4O1xyXG4gIHBhZGRpbmc6IDVweDtcclxuICBmb250LXNpemU6IDlweDtcclxufVxyXG4uYnRuLXByaW1hcnkge1xyXG4gIGNvbG9yOiAjZmZmZmZmO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICM0MmE0ZWM7XHJcbn1cclxuXHJcbi51bnBhaWQge1xyXG4gIGNvbG9yOiAjZWQ1OTU5O1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxufVxyXG5cclxuLnBhaWQge1xyXG4gIGNvbG9yOiAjMzdiZjE2O1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxufVxyXG4iXX0= */"]
      });
      /***/
    },

    /***/
    86169:
    /*!*************************************************************!*\
      !*** ./src/app/dashboard/layout/footer/footer.component.ts ***!
      \*************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "FooterComponent": function FooterComponent() {
          return (
            /* binding */
            _FooterComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      37716);

      var _FooterComponent = /*#__PURE__*/function () {
        function _FooterComponent() {
          _classCallCheck(this, _FooterComponent);
        }

        _createClass(_FooterComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return _FooterComponent;
      }();

      _FooterComponent.ɵfac = function FooterComponent_Factory(t) {
        return new (t || _FooterComponent)();
      };

      _FooterComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _FooterComponent,
        selectors: [["app-footer"]],
        decls: 2,
        vars: 0,
        template: function FooterComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "footer works!");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        },
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmb290ZXIuY29tcG9uZW50LmNzcyJ9 */"]
      });
      /***/
    },

    /***/
    1860:
    /*!*************************************************************!*\
      !*** ./src/app/dashboard/layout/header/header.component.ts ***!
      \*************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "HeaderComponent": function HeaderComponent() {
          return (
            /* binding */
            _HeaderComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/app/services/storage.service */
      71188);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/router */
      39895);

      var _HeaderComponent = /*#__PURE__*/function () {
        function _HeaderComponent(storage, router) {
          _classCallCheck(this, _HeaderComponent);

          this.storage = storage;
          this.router = router;
          this.toggle = false;
        }

        _createClass(_HeaderComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.loginName = this.storage.getUserName();
          }
        }, {
          key: "logOut",
          value: function logOut() {
            this.storage.logOut();
            this.router.navigate(['login']);
          }
        }]);

        return _HeaderComponent;
      }();

      _HeaderComponent.ɵfac = function HeaderComponent_Factory(t) {
        return new (t || _HeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_0__.StorageService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
      };

      _HeaderComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _HeaderComponent,
        selectors: [["app-header"]],
        decls: 10,
        vars: 1,
        consts: [[1, "header"], [1, "userTab"], ["src", "../../assets/profile-icon.png", "alt", "profile", 1, "tabImage"], [1, "btn-group"], ["type", "button", "data-bs-toggle", "dropdown", 1, "btn", "dropdown-toggle", "dropdown-toggle-split"], [1, "dropdown-menu"], [1, "dropdown-item", "pointer", 3, "click"]],
        template: function HeaderComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "img", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "label");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "button", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "a", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HeaderComponent_Template_a_click_8_listener() {
              return ctx.logOut();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Log Out");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.loginName);
          }
        },
        styles: [".header[_ngcontent-%COMP%]{\r\n    height: 74px;\r\n    padding: 4px 0px 0px 0px;\r\n    border-bottom: 3px solid #FF6F3D;\r\n  }\r\n  .userTab[_ngcontent-%COMP%]{\r\n    float: right;\r\n    padding: 0px 0px 0px 0px;\r\n    margin: 13px 96px 0px 0px;\r\n  }\r\n  .tabImage[_ngcontent-%COMP%]{\r\n    float: left;\r\n    background-color: white;\r\n    margin: -8px 14px 0px 26px;\r\n    \r\n    border-radius: 5px;\r\n    width: 50px;\r\n    height: 49px;\r\n  }\r\n  .btn[_ngcontent-%COMP%] {\r\n    background-color: white !important;\r\n    color: black !important;\r\n    border:none !important;\r\n  }\r\n  \r\n  button[_ngcontent-%COMP%]:focus {outline:0;}\r\n  button[_ngcontent-%COMP%]:active {outline:0;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWRlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7RUFDRTtJQUNFLFlBQVk7SUFDWix3QkFBd0I7SUFDeEIsZ0NBQWdDO0VBQ2xDO0VBQ0E7SUFDRSxZQUFZO0lBQ1osd0JBQXdCO0lBQ3hCLHlCQUF5QjtFQUMzQjtFQUNBO0lBQ0UsV0FBVztJQUNYLHVCQUF1QjtJQUN2QiwwQkFBMEI7SUFDMUIsMkdBQTJHO0lBQzNHLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsWUFBWTtFQUNkO0VBRUE7SUFDRSxrQ0FBa0M7SUFDbEMsdUJBQXVCO0lBQ3ZCLHNCQUFzQjtFQUN4QjtFQUVBOzs7S0FHRztFQUVILGNBQWMsU0FBUyxDQUFDO0VBQ3hCLGVBQWUsU0FBUyxDQUFDIiwiZmlsZSI6ImhlYWRlci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgLmhlYWRlcntcclxuICAgIGhlaWdodDogNzRweDtcclxuICAgIHBhZGRpbmc6IDRweCAwcHggMHB4IDBweDtcclxuICAgIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCAjRkY2RjNEO1xyXG4gIH1cclxuICAudXNlclRhYntcclxuICAgIGZsb2F0OiByaWdodDtcclxuICAgIHBhZGRpbmc6IDBweCAwcHggMHB4IDBweDtcclxuICAgIG1hcmdpbjogMTNweCA5NnB4IDBweCAwcHg7XHJcbiAgfVxyXG4gIC50YWJJbWFnZXtcclxuICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgICBtYXJnaW46IC04cHggMTRweCAwcHggMjZweDtcclxuICAgIC8qIGJveC1zaGFkb3c6IDBweCA0cHggNHB4IHJnYigwIDAgMCAvIDEwJSksIDRweCAwcHggNHB4IHJnYigwIDAgMCAvIDEwJSksIC00cHggMHB4IDRweCByZ2IoMCAwIDAgLyAxMCUpOyAqL1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgd2lkdGg6IDUwcHg7XHJcbiAgICBoZWlnaHQ6IDQ5cHg7XHJcbiAgfVxyXG5cclxuICAuYnRuIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XHJcbiAgICBjb2xvcjogYmxhY2sgIWltcG9ydGFudDtcclxuICAgIGJvcmRlcjpub25lICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG5cclxuICAvKiAuZHJvcGRvd24tbWVudSB7XHJcbiAgICBsZWZ0OiA1MCU7XHJcbiAgICB0b3A6IDUwJTtcclxuICB9ICovXHJcblxyXG4gIGJ1dHRvbjpmb2N1cyB7b3V0bGluZTowO31cclxuICBidXR0b246YWN0aXZlIHtvdXRsaW5lOjA7fSJdfQ== */"]
      });
      /***/
    },

    /***/
    31658:
    /*!***************************************************************!*\
      !*** ./src/app/dashboard/layout/sidebar/sidebar.component.ts ***!
      \***************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SidebarComponent": function SidebarComponent() {
          return (
            /* binding */
            _SidebarComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/router */
      39895);
      /* harmony import */


      var src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/app/services/storage.service */
      71188);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/common */
      38583);

      var _c0 = function _c0(a0) {
        return {
          "rectangle-position": a0
        };
      };

      var _SidebarComponent = /*#__PURE__*/function () {
        function _SidebarComponent(_router, render, storage) {
          _classCallCheck(this, _SidebarComponent);

          this._router = _router;
          this.render = render;
          this.storage = storage;
        }

        _createClass(_SidebarComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.propertyName = this.storage.getPropertyName();
          }
        }, {
          key: "backToLogin",
          value: function backToLogin() {
            this._router.navigateByUrl('/login');
          }
        }, {
          key: "toggleClass",
          value: function toggleClass(event) {
            var className = 'boxShadow';
            var hasClass = event.target.classList.contains(className);

            if (hasClass) {
              this.render.removeClass(event.target, className);
            } else {
              this.render.addClass(event.target, className);
              this.render.addClass(event.target, className);
            }
          }
        }]);

        return _SidebarComponent;
      }();

      _SidebarComponent.ɵfac = function SidebarComponent_Factory(t) {
        return new (t || _SidebarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_0__.StorageService));
      };

      _SidebarComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _SidebarComponent,
        selectors: [["app-sidebar"]],
        decls: 25,
        vars: 10,
        consts: [[1, "sidenav"], [1, "logo"], ["src", "../../assets/Logo-circle-icon.png", "alt", "inhabitr_logo"], [1, "text-center"], [1, "badge", "badge-light"], [1, "tabs", "d-block", "position-relative"], ["src", "../../assets/add-icon.png", "alt", "add", 1, "tabImage"], ["src", "../../assets/Rectangle.png", "alt", "add", 1, "d-none", 3, "ngClass"], ["routerLink", "/create-reward", "routerLinkActive", "active"], ["rl", "routerLinkActive"], ["src", "../../assets/invoice-icon.png", "alt", "reward", 1, "tabImage"], ["routerLink", "/reward-details", "routerLinkActive", "active"], ["routerReward", "routerLinkActive"], ["src", "../../assets/rewards-icon.png", "alt", "reward", 1, "tabImage"], ["routerLink", "/rewards", "routerLinkActive", "active"], ["routerRewardDetails", "routerLinkActive"]],
        template: function SidebarComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "img", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "p", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "span", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "img", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "img", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "a", 8, 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "CREATE REWARD");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "span", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "img", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](15, "img", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "a", 11, 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "REWARD TRANSACTIONS");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "span", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](20, "img", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](21, "img", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "a", 14, 15);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](24, "RECENTLY CREATED REWARDS");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            var _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](11);

            var _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](17);

            var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](23);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.propertyName);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](4, _c0, _r0.isActive));

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](6, _c0, _r1.isActive));

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](8, _c0, _r2.isActive));
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgClass, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLinkWithHref, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLinkActive],
        styles: [".sidenav[_ngcontent-%COMP%] {\r\n    height: 100%;\r\n    width: 300px;\r\n    position: fixed;\r\n    z-index: 1;\r\n    top: 0;\r\n    left: 0;\r\n    background-color: #FF6F3D;\r\n    overflow-x: hidden;\r\n    padding-top: 20px;\r\n  }\r\n  \r\n  .sidenav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\r\n    padding: 6px 6px 6px 90px;\r\n    text-decoration: none;\r\n    font-size: 14px;\r\n    display: block;\r\n    height: 81px;\r\n    left: 0px;\r\n    top: 246px;\r\n    border: 1px solid #ED6637;\r\n    \r\n    color: #fff;\r\n    text-align: left;\r\n    padding-top: 28px;\r\n  }\r\n  \r\n  .sidenav[_ngcontent-%COMP%]   .boxShadow[_ngcontent-%COMP%] {\r\n    box-shadow: inset 0px 4px 4px rgb(0 0 0 / 10%);\r\n  }\r\n  \r\n  .sidenav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\r\n    color: #f1f1f1;\r\n  }\r\n  \r\n  .logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{\r\n    max-width: 150px;\r\n    display: block;\r\n    margin: auto;\r\n    padding: 25px;\r\n  }\r\n  \r\n  .tabImage[_ngcontent-%COMP%]{\r\n    float: left;\r\n    \r\n    margin: 22px 0px 0px 26px;\r\n    \r\n    border-radius: 5px;\r\n    width: 44px;\r\n    height: 41px;\r\n  }\r\n  \r\n  .badge[_ngcontent-%COMP%] {\r\n    color: #000000;\r\n    background-color: #ffffff;\r\n    border-radius: 50px;\r\n    padding: 10px;\r\n    letter-spacing: 0.03em;\r\n    font-size: 18px;\r\n    font-weight: 300;\r\n    width:215px;\r\n    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);\r\n    color: #7A7A7A;\r\n}\r\n  \r\n  .rectangle-position[_ngcontent-%COMP%] {\r\n  position:absolute;\r\n  left: 0;\r\n  top:20%;\r\n  display: block !important;\r\n  \r\n}\r\n  \r\n  .active[_ngcontent-%COMP%] {\r\n  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.1);\r\n  border:2px solid #ED6637;\r\n  background: #ED6637;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpZGViYXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFlBQVk7SUFDWixZQUFZO0lBQ1osZUFBZTtJQUNmLFVBQVU7SUFDVixNQUFNO0lBQ04sT0FBTztJQUNQLHlCQUF5QjtJQUN6QixrQkFBa0I7SUFDbEIsaUJBQWlCO0VBQ25COztFQUVBO0lBQ0UseUJBQXlCO0lBQ3pCLHFCQUFxQjtJQUNyQixlQUFlO0lBQ2YsY0FBYztJQUNkLFlBQVk7SUFDWixTQUFTO0lBQ1QsVUFBVTtJQUNWLHlCQUF5QjtJQUN6Qix5QkFBeUI7SUFDekIsV0FBVztJQUNYLGdCQUFnQjtJQUNoQixpQkFBaUI7RUFDbkI7O0VBRUE7SUFDRSw4Q0FBOEM7RUFDaEQ7O0VBRUE7SUFDRSxjQUFjO0VBQ2hCOztFQUVBO0lBQ0UsZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCxZQUFZO0lBQ1osYUFBYTtFQUNmOztFQUVBO0lBQ0UsV0FBVztJQUNYLDZCQUE2QjtJQUM3Qix5QkFBeUI7SUFDekIsMkdBQTJHO0lBQzNHLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsWUFBWTtFQUNkOztFQUVBO0lBQ0UsY0FBYztJQUNkLHlCQUF5QjtJQUN6QixtQkFBbUI7SUFDbkIsYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLFdBQVc7SUFDWCwyQ0FBMkM7SUFDM0MsY0FBYztBQUNsQjs7RUFFQTtFQUNFLGlCQUFpQjtFQUNqQixPQUFPO0VBQ1AsT0FBTztFQUNQLHlCQUF5Qjs7QUFFM0I7O0VBRUE7RUFDRSxnREFBZ0Q7RUFDaEQsd0JBQXdCO0VBQ3hCLG1CQUFtQjtBQUNyQiIsImZpbGUiOiJzaWRlYmFyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc2lkZW5hdiB7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB3aWR0aDogMzAwcHg7XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICB6LWluZGV4OiAxO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgbGVmdDogMDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGRjZGM0Q7XHJcbiAgICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgICBwYWRkaW5nLXRvcDogMjBweDtcclxuICB9XHJcbiAgXHJcbiAgLnNpZGVuYXYgYSB7XHJcbiAgICBwYWRkaW5nOiA2cHggNnB4IDZweCA5MHB4O1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBoZWlnaHQ6IDgxcHg7XHJcbiAgICBsZWZ0OiAwcHg7XHJcbiAgICB0b3A6IDI0NnB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI0VENjYzNztcclxuICAgIC8qIGJhY2tncm91bmQ6ICNFRDY2Mzc7ICovXHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICAgIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgICBwYWRkaW5nLXRvcDogMjhweDtcclxuICB9XHJcbiAgXHJcbiAgLnNpZGVuYXYgLmJveFNoYWRvdyB7XHJcbiAgICBib3gtc2hhZG93OiBpbnNldCAwcHggNHB4IDRweCByZ2IoMCAwIDAgLyAxMCUpO1xyXG4gIH1cclxuXHJcbiAgLnNpZGVuYXYgYTpob3ZlciB7XHJcbiAgICBjb2xvcjogI2YxZjFmMTtcclxuICB9XHJcblxyXG4gIC5sb2dvIGltZ3tcclxuICAgIG1heC13aWR0aDogMTUwcHg7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIG1hcmdpbjogYXV0bztcclxuICAgIHBhZGRpbmc6IDI1cHg7XHJcbiAgfVxyXG5cclxuICAudGFiSW1hZ2V7XHJcbiAgICBmbG9hdDogbGVmdDtcclxuICAgIC8qIGJhY2tncm91bmQtY29sb3I6IHdoaXRlOyAqL1xyXG4gICAgbWFyZ2luOiAyMnB4IDBweCAwcHggMjZweDtcclxuICAgIC8qIGJveC1zaGFkb3c6IDBweCA0cHggNHB4IHJnYigwIDAgMCAvIDEwJSksIDRweCAwcHggNHB4IHJnYigwIDAgMCAvIDEwJSksIC00cHggMHB4IDRweCByZ2IoMCAwIDAgLyAxMCUpOyAqL1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgd2lkdGg6IDQ0cHg7XHJcbiAgICBoZWlnaHQ6IDQxcHg7XHJcbiAgfVxyXG5cclxuICAuYmFkZ2Uge1xyXG4gICAgY29sb3I6ICMwMDAwMDA7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTBweDtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogMC4wM2VtO1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcclxuICAgIHdpZHRoOjIxNXB4O1xyXG4gICAgYm94LXNoYWRvdzogMHB4IDRweCA0cHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcclxuICAgIGNvbG9yOiAjN0E3QTdBO1xyXG59XHJcblxyXG4ucmVjdGFuZ2xlLXBvc2l0aW9uIHtcclxuICBwb3NpdGlvbjphYnNvbHV0ZTtcclxuICBsZWZ0OiAwO1xyXG4gIHRvcDoyMCU7XHJcbiAgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDtcclxuICBcclxufVxyXG5cclxuLmFjdGl2ZSB7XHJcbiAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDRweCA0cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gIGJvcmRlcjoycHggc29saWQgI0VENjYzNztcclxuICBiYWNrZ3JvdW5kOiAjRUQ2NjM3O1xyXG59Il19 */"]
      });
      /***/
    },

    /***/
    59450:
    /*!**********************************************************!*\
      !*** ./src/app/dashboard/payments/payments.component.ts ***!
      \**********************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "PaymentsComponent": function PaymentsComponent() {
          return (
            /* binding */
            _PaymentsComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/router */
      39895);
      /* harmony import */


      var _layout_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../layout/sidebar/sidebar.component */
      31658);
      /* harmony import */


      var _layout_header_header_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../layout/header/header.component */
      1860);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/forms */
      3679);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/common */
      38583);

      function PaymentsComponent_ng_container_32_Template(rf, ctx) {
        if (rf & 1) {
          var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 46);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PaymentsComponent_ng_container_32_Template_div_click_2_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3);

            var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

            return ctx_r2.addPayment = !ctx_r2.addPayment;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "img", 47);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "h5", 48);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "ADD A PAYMENT");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
        }
      }

      function PaymentsComponent_ng_container_33_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 49);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "section");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "h4");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "YOUR CARDS & BANK");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 50);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 51);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "VISA");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "p", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "span", 53);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Default");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Card Number: 00000-0000-0000-0000");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "Expiration Date: 00/0000");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "div", 54);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "button", 55);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, "ADD A NEW CARD OR BANK");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "button", 56);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "VIEW ALL SAVED ACCOUNTS");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
        }
      }

      var _PaymentsComponent = /*#__PURE__*/function () {
        function _PaymentsComponent(router) {
          _classCallCheck(this, _PaymentsComponent);

          this.router = router;
          this.addPayment = true;
        }

        _createClass(_PaymentsComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "payAll",
          value: function payAll() {
            this.router.navigate(['/invoices-payment'], {
              queryParams: {
                payAll: true
              }
            });
          }
        }]);

        return _PaymentsComponent;
      }();

      _PaymentsComponent.ɵfac = function PaymentsComponent_Factory(t) {
        return new (t || _PaymentsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router));
      };

      _PaymentsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: _PaymentsComponent,
        selectors: [["app-payments"]],
        decls: 192,
        vars: 2,
        consts: [[1, "main"], [1, "body", "payment-paading"], [1, "row"], [1, "col-12"], [1, "card"], [1, "col-6", "card-body", "border-right"], [1, "col-4", "float-start"], [1, "circle"], [1, "bubble"], ["src", "assets/invoice.png", "alt", "invoice", 1, "img-style-note"], [1, "col-8", "float-start", "mt-4", "ml-unpaid"], [1, "unpaid-invoices", "d-flex", "ml-unpaid", "align-items-center", "justify-content-center", "mt-4"], ["placeholder", "Select a Payment Option", 1, "mt-3", "ml-unpaid"], ["value", ""], [1, "d-flex", "flex-row", "justify-content-between", "mt-3", "ml-unpaid"], [1, "btn", "btn-success", "m-2", 3, "click"], [1, "col-6", "card-body", "d-flex", "align-items-center", "p-4"], [4, "ngIf"], [1, "row", "mt-4"], [1, "col-lg-12"], [1, "recent-payment"], [1, "table", "table-borderless"], [1, "tableHeader", "w-100"], [1, "text-center"], ["id", "addCard", "tabindex", "-1", "aria-labelledby", "addCardLabel", "aria-hidden", "true", 1, "modal", "fade"], [1, "modal-dialog"], [1, "modal-content", "p-3", "header-style"], [1, "modal-header", "border-0"], ["type", "button", "data-bs-dismiss", "modal", "aria-label", "Close", 1, "btn-close"], [1, "modal-body", "text-center"], [1, "pb-2"], [1, "form-check", "w-50", "m-auto", "mb-2"], ["type", "radio", "name", "payMode", "id", "creditCard", "checked", "", 1, "form-check-input"], ["for", "creditCard", 1, "form-check-label"], [1, "form-check", "w-50", "m-auto"], ["type", "radio", "name", "payMode", "id", "bank", 1, "form-check-input"], ["for", "bank", 1, "form-check-label"], [1, "modal-footer", "justify-content-center", "border-0", "payment"], ["type", "button", 1, "btn", "btn_theme"], ["id", "savedCards", "tabindex", "-1", "aria-labelledby", "savedCardsLabel", "aria-hidden", "true", 1, "modal", "fade"], [1, "modal-dialog", 2, "max-width", "650px !important"], ["id", "savedCardsLabel", 1, "modal-title"], [1, "fas", "fa-arrow-left", "theme-color", "pointer"], [1, "padding"], ["type", "checkbox", "id", "checkboxNoLabel", "value", "", "aria-label", "...", 1, "form-check-input", "mt-0"], [1, "card-align"], [1, "col-12", "d-flex", "align-items-center", "pointer", "p-4", 3, "click"], ["src", "assets/addPayment.png", "alt", "addpayment"], [1, "ml-2", 2, "margin-left", "10px"], [1, "mt-5", "w-100"], [1, "d-flex", "flex-row", "align-items-center"], [1, "mr-2"], [1, "m-0", 2, "margin-left", "10px !important"], [1, "badge", "badge-light"], [1, "d-flex", "flex-row"], ["data-bs-toggle", "modal", "data-bs-target", "#addCard", 1, "btn", "btn_theme", "add-card", "font10"], ["data-bs-toggle", "modal", "data-bs-target", "#savedCards", 1, "btn", "btn-dark", "font10"]],
        template: function PaymentsComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "app-sidebar");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "app-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "div", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "span");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "2");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](17, "img", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "div", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "h2");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, "Payment Details");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "div", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22, " You currently have 2 Unpaid Invoices ");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "select", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "option", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](25, "Credit Card/Debit Card");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "option", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](27, "Bank Account");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](28, "div", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "button", 15);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PaymentsComponent_Template_button_click_29_listener() {
              return ctx.payAll();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](30, "PAY INVOICES");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "div", 16);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](32, PaymentsComponent_ng_container_32_Template, 6, 0, "ng-container", 17);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](33, PaymentsComponent_ng_container_33_Template, 20, 0, "ng-container", 17);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](34, "div", 18);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](35, "div", 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](36, "hr");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](37, "h2", 20);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](38, "RECENT PAYMENTS");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](39, "hr");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](40, "div", 18);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](41, "div", 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](42, "table", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](43, "thead", 22);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](44, "tr", 23);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](45, "th");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](46, "Date Paid");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](47, "th");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](48, "Invoice No.");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](49, "th");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](50, "Resident ID");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](51, "th");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](52, "Resident Name");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](53, "th");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](54, "Building Name");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](55, "th");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](56, "Amount");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](57, "tbody");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](58, "tr");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](59, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](60, "12/11/2021");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](61, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](62, "#000000");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](63, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](64, "#000000");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](65, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](66, "Mathews, Dave");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](67, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](68, "The Link Minneapolis Low-Rise");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](69, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](70, "$300");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](71, "tr");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](72, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](73, "12/11/2021");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](74, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](75, "#000000");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](76, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](77, "#000000");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](78, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](79, "Mathews, Dave");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](80, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](81, "The Link Minneapolis Low-Rise");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](82, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](83, "$300");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](84, "tr");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](85, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](86, "12/11/2021");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](87, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](88, "#000000");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](89, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](90, "#000000");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](91, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](92, "Mathews, Dave");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](93, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](94, "The Link Minneapolis Low-Rise");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](95, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](96, "$300");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](97, "tr");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](98, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](99, "12/11/2021");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](100, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](101, "#000000");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](102, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](103, "#000000");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](104, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](105, "Mathews, Dave");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](106, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](107, "The Link Minneapolis Low-Rise");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](108, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](109, "$300");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](110, "tr");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](111, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](112, "12/11/2021");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](113, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](114, "#000000");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](115, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](116, "#000000");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](117, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](118, "Mathews, Dave");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](119, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](120, "The Link Minneapolis Low-Rise");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](121, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](122, "$300");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](123, "div", 24);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](124, "div", 25);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](125, "div", 26);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](126, "div", 27);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](127, "button", 28);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](128, "div", 29);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](129, "h5", 30);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](130, "ADD A NEW CARD OR BANK");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](131, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](132, "Choose a payment method to add:");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](133, "div", 31);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](134, "input", 32);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](135, "label", 33);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](136, " Credit or Debit Card ");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](137, "div", 34);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](138, "input", 35);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](139, "label", 36);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](140, " Bank Account ");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](141, "div", 37);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](142, "button", 38);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](143, "ADD PAYMENT");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](144, "div", 39);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](145, "div", 40);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](146, "div", 26);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](147, "div", 27);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](148, "h5", 41);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](149, "i", 42);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](150, "YOUR CARDS & BANKS");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](151, "div", 29);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](152, "table", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](153, "thead", 22);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](154, "tr", 23);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](155, "th", 43);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](156, "th", 43);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](157, "BRAND");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](158, "th", 43);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](159, "NUMBER");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](160, "th", 43);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](161, "EXPIRES");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](162, "th", 43);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](163, "ACTION");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](164, "tbody");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](165, "tr");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](166, "td", 43);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](167, "input", 44);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](168, "td", 43);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](169, "span", 45);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](170, "VISA");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](171, "td", 43);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](172, "XXXX XXXXX XXXX 0000");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](173, "td", 43);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](174, "00/0000");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](175, "td", 43);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](176, "DEFAULT");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](177, "tr");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](178, "td", 43);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](179, "input", 44);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](180, "td", 43);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](181, "span", 45);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](182, "VISA");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](183, "td", 43);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](184, "XXXX XXXXX XXXX 0000");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](185, "td", 43);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](186, "00/0000");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](187, "td", 43);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](188, "DEFAULT");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](189, "div", 37);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](190, "button", 38);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](191, "SELECT/REPLACE PAYMENT");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](32);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.addPayment);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.addPayment);
          }
        },
        directives: [_layout_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_0__.SidebarComponent, _layout_header_header_component__WEBPACK_IMPORTED_MODULE_1__.HeaderComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgSelectMultipleOption"], _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf],
        styles: [".unpaid-invoices[_ngcontent-%COMP%] {\r\n    display: inline-block;\r\n    width: 100%;\r\n    height: 45px;\r\n    border-radius: 20px;\r\n    background: #ffffff;\r\n    \r\n    margin-left: 10px;\r\n}\r\n\r\n.border-right[_ngcontent-%COMP%] {\r\n    border-right: 1px solid #BABABA;\r\n}\r\n\r\n.circle[_ngcontent-%COMP%] {\r\n    height: 6rem;\r\n    width: 6rem;\r\n    padding: 30px;\r\n    border-radius: 50%;\r\n    border: 1px solid #ffffff;\r\n    position: relative;\r\n    background-color: #ffffff !important;\r\n}\r\n\r\n.circle[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n    position: absolute;\r\n    left: 50%;\r\n    top: 50%;\r\n    transform: translate(-50%, -50%);\r\n}\r\n\r\n.bubble[_ngcontent-%COMP%] {\r\n    height: 2rem;\r\n    width: 2rem;\r\n    border-radius: 50%;\r\n    position: absolute;\r\n    background-color: #ef5e2f;\r\n    left: 80px;\r\n    top: 10px;\r\n    text-align: center;\r\n    color: white;\r\n}\r\n\r\n.card[_ngcontent-%COMP%] {\r\n    background-color: #f3f3f3;\r\n    padding: 30px;\r\n}\r\n\r\n.bubble[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n    position: absolute;\r\n    left: 50%;\r\n    top: 50%;\r\n    transform: translate(-50%, -50%);\r\n}\r\n\r\n.btn-primary[_ngcontent-%COMP%] {\r\n    background-color: #42a4ec !important;\r\n}\r\n\r\nselect[_ngcontent-%COMP%] {\r\n    width: 100% !important;\r\n    height: 47px;\r\n    border-radius: 5px !important;\r\n    background: url('orange-dropdown-icon.png') no-repeat right #ffffff !important;\r\n    background-size: 47px 39px !important;\r\n    -webkit-appearance: none;\r\n    border-color: snow;\r\n    padding: 5px;\r\n}\r\n\r\n.recent-payment[_ngcontent-%COMP%] {\r\n    font-style: normal;\r\n    font-weight: 300;\r\n    font-size: 17px;\r\n    line-height: 17px;\r\n    letter-spacing: 0.05em;\r\n    color: #000000;\r\n}\r\n\r\nth[_ngcontent-%COMP%], td[_ngcontent-%COMP%] {\r\n    padding: 30px;\r\n}\r\n\r\n.ml-6[_ngcontent-%COMP%] {\r\n    margin-left: 9rem;\r\n}\r\n\r\n.btn[_ngcontent-%COMP%] {\r\n    flex: auto;\r\n    font-size: 16px;\r\n    height: 49px;\r\n}\r\n\r\n.mode-of-payment[_ngcontent-%COMP%] {\r\n    width: 80px;\r\n    height: 80px;\r\n}\r\n\r\n.payment-paading[_ngcontent-%COMP%] {\r\n    padding: 50px 50px;\r\n}\r\n\r\n.ml-unpaid[_ngcontent-%COMP%] {\r\n    margin-left: -10px;\r\n}\r\n\r\n.ml-unpaid[_ngcontent-%COMP%]::after {\r\n    clear:left !important;\r\n}\r\n\r\n.badge[_ngcontent-%COMP%] {\r\n    color: #000000;\r\n    background-color: #ffffff;\r\n    border-radius: 20px;\r\n    padding: 15px;\r\n    letter-spacing: 0.03em;\r\n    font-size: 18px;\r\n    font-weight: 300;\r\n}\r\n\r\n.btn-dark[_ngcontent-%COMP%] {\r\n    border-radius: 5px;\r\n    letter-spacing: 0.04em;\r\n}\r\n\r\n.add-card[_ngcontent-%COMP%] {\r\n    width:auto !important;\r\n    border-radius: 5px !important;\r\n    margin-right: 10px;\r\n    \r\n}\r\n\r\n.font10[_ngcontent-%COMP%] {\r\n    font-size:10px !important;\r\n}\r\n\r\n.payment[_ngcontent-%COMP%] {\r\n    width: 50%;\r\n    align-items: center;\r\n    margin: auto;\r\n}\r\n\r\n.header-style[_ngcontent-%COMP%] {\r\n    border-top: 15px solid #FF6F3D !important;\r\n}\r\n\r\n.card-align[_ngcontent-%COMP%] {\r\n    padding-left: 10px;\r\n}\r\n\r\n.form-check-input[_ngcontent-%COMP%] {\r\n    width: 1.5em !important;\r\n    height: 1.5em !important;\r\n}\r\n\r\n.padding[_ngcontent-%COMP%] {\r\n    padding:15px !important;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheW1lbnRzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxxQkFBcUI7SUFDckIsV0FBVztJQUNYLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSwrQkFBK0I7QUFDbkM7O0FBRUE7SUFDSSxZQUFZO0lBQ1osV0FBVztJQUNYLGFBQWE7SUFDYixrQkFBa0I7SUFDbEIseUJBQXlCO0lBQ3pCLGtCQUFrQjtJQUNsQixvQ0FBb0M7QUFDeEM7O0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsU0FBUztJQUNULFFBQVE7SUFDUixnQ0FBZ0M7QUFDcEM7O0FBRUE7SUFDSSxZQUFZO0lBQ1osV0FBVztJQUNYLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIseUJBQXlCO0lBQ3pCLFVBQVU7SUFDVixTQUFTO0lBQ1Qsa0JBQWtCO0lBQ2xCLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSx5QkFBeUI7SUFDekIsYUFBYTtBQUNqQjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixTQUFTO0lBQ1QsUUFBUTtJQUNSLGdDQUFnQztBQUNwQzs7QUFFQTtJQUNJLG9DQUFvQztBQUN4Qzs7QUFFQTtJQUNJLHNCQUFzQjtJQUN0QixZQUFZO0lBQ1osNkJBQTZCO0lBQzdCLDhFQUE0RjtJQUM1RixxQ0FBcUM7SUFDckMsd0JBQXdCO0lBQ3hCLGtCQUFrQjtJQUNsQixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQixlQUFlO0lBQ2YsaUJBQWlCO0lBQ2pCLHNCQUFzQjtJQUN0QixjQUFjO0FBQ2xCOztBQUVBOztJQUVJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxVQUFVO0lBQ1YsZUFBZTtJQUNmLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLGNBQWM7SUFDZCx5QkFBeUI7SUFDekIsbUJBQW1CO0lBQ25CLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsZUFBZTtJQUNmLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxxQkFBcUI7SUFDckIsNkJBQTZCO0lBQzdCLGtCQUFrQjs7QUFFdEI7O0FBRUE7SUFDSSx5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSSxVQUFVO0lBQ1YsbUJBQW1CO0lBQ25CLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSx5Q0FBeUM7QUFDN0M7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsd0JBQXdCO0FBQzVCOztBQUVBO0lBQ0ksdUJBQXVCO0FBQzNCIiwiZmlsZSI6InBheW1lbnRzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudW5wYWlkLWludm9pY2VzIHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiA0NXB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcclxuICAgIGJhY2tncm91bmQ6ICNmZmZmZmY7XHJcbiAgICAvKiBwYWRkaW5nOiAxMHB4OyAqL1xyXG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XHJcbn1cclxuXHJcbi5ib3JkZXItcmlnaHQge1xyXG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI0JBQkFCQTtcclxufVxyXG5cclxuLmNpcmNsZSB7XHJcbiAgICBoZWlnaHQ6IDZyZW07XHJcbiAgICB3aWR0aDogNnJlbTtcclxuICAgIHBhZGRpbmc6IDMwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZmZmZmZmO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZiAhaW1wb3J0YW50O1xyXG59XHJcbi5jaXJjbGUgaW1nIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGxlZnQ6IDUwJTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XHJcbn1cclxuXHJcbi5idWJibGUge1xyXG4gICAgaGVpZ2h0OiAycmVtO1xyXG4gICAgd2lkdGg6IDJyZW07XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWY1ZTJmO1xyXG4gICAgbGVmdDogODBweDtcclxuICAgIHRvcDogMTBweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuLmNhcmQge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2YzZjNmMztcclxuICAgIHBhZGRpbmc6IDMwcHg7XHJcbn1cclxuXHJcbi5idWJibGUgc3BhbiB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBsZWZ0OiA1MCU7XHJcbiAgICB0b3A6IDUwJTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xyXG59XHJcblxyXG4uYnRuLXByaW1hcnkge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzQyYTRlYyAhaW1wb3J0YW50O1xyXG59XHJcblxyXG5zZWxlY3Qge1xyXG4gICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcclxuICAgIGhlaWdodDogNDdweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweCAhaW1wb3J0YW50O1xyXG4gICAgYmFja2dyb3VuZDogdXJsKC4uLy4uLy4uL2Fzc2V0cy9vcmFuZ2UtZHJvcGRvd24taWNvbi5wbmcpIG5vLXJlcGVhdCByaWdodCAjZmZmZmZmICFpbXBvcnRhbnQ7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDQ3cHggMzlweCAhaW1wb3J0YW50O1xyXG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xyXG4gICAgYm9yZGVyLWNvbG9yOiBzbm93O1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG59XHJcblxyXG4ucmVjZW50LXBheW1lbnQge1xyXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcclxuICAgIGZvbnQtc2l6ZTogMTdweDtcclxuICAgIGxpbmUtaGVpZ2h0OiAxN3B4O1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMDVlbTtcclxuICAgIGNvbG9yOiAjMDAwMDAwO1xyXG59XHJcblxyXG50aCxcclxudGQge1xyXG4gICAgcGFkZGluZzogMzBweDtcclxufVxyXG5cclxuLm1sLTYge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDlyZW07XHJcbn1cclxuXHJcbi5idG4ge1xyXG4gICAgZmxleDogYXV0bztcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIGhlaWdodDogNDlweDtcclxufVxyXG5cclxuLm1vZGUtb2YtcGF5bWVudCB7XHJcbiAgICB3aWR0aDogODBweDtcclxuICAgIGhlaWdodDogODBweDtcclxufVxyXG5cclxuLnBheW1lbnQtcGFhZGluZyB7XHJcbiAgICBwYWRkaW5nOiA1MHB4IDUwcHg7XHJcbn1cclxuXHJcbi5tbC11bnBhaWQge1xyXG4gICAgbWFyZ2luLWxlZnQ6IC0xMHB4O1xyXG59XHJcblxyXG4ubWwtdW5wYWlkOjphZnRlciB7XHJcbiAgICBjbGVhcjpsZWZ0ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5iYWRnZSB7XHJcbiAgICBjb2xvcjogIzAwMDAwMDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XHJcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xyXG4gICAgcGFkZGluZzogMTVweDtcclxuICAgIGxldHRlci1zcGFjaW5nOiAwLjAzZW07XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBmb250LXdlaWdodDogMzAwO1xyXG59XHJcblxyXG4uYnRuLWRhcmsge1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMDRlbTtcclxufVxyXG5cclxuLmFkZC1jYXJkIHtcclxuICAgIHdpZHRoOmF1dG8gIWltcG9ydGFudDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweCAhaW1wb3J0YW50O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xyXG4gICAgXHJcbn1cclxuXHJcbi5mb250MTAge1xyXG4gICAgZm9udC1zaXplOjEwcHggIWltcG9ydGFudDtcclxufVxyXG5cclxuLnBheW1lbnQge1xyXG4gICAgd2lkdGg6IDUwJTtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBtYXJnaW46IGF1dG87XHJcbn1cclxuXHJcbi5oZWFkZXItc3R5bGUge1xyXG4gICAgYm9yZGVyLXRvcDogMTVweCBzb2xpZCAjRkY2RjNEICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5jYXJkLWFsaWduIHtcclxuICAgIHBhZGRpbmctbGVmdDogMTBweDtcclxufVxyXG5cclxuLmZvcm0tY2hlY2staW5wdXQge1xyXG4gICAgd2lkdGg6IDEuNWVtICFpbXBvcnRhbnQ7XHJcbiAgICBoZWlnaHQ6IDEuNWVtICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5wYWRkaW5nIHtcclxuICAgIHBhZGRpbmc6MTVweCAhaW1wb3J0YW50O1xyXG59Il19 */"]
      });
      /***/
    },

    /***/
    77893:
    /*!******************************************************************!*\
      !*** ./src/app/dashboard/return-items/return-items.component.ts ***!
      \******************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ReturnItemsComponent": function ReturnItemsComponent() {
          return (
            /* binding */
            _ReturnItemsComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var _layout_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../layout/sidebar/sidebar.component */
      31658);
      /* harmony import */


      var _layout_header_header_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../layout/header/header.component */
      1860);
      /* harmony import */


      var _shared_components_refund_items_refund_items_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../shared/components/refund-items/refund-items.component */
      72580);

      var _ReturnItemsComponent = /*#__PURE__*/function () {
        function _ReturnItemsComponent() {
          _classCallCheck(this, _ReturnItemsComponent);
        }

        _createClass(_ReturnItemsComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return _ReturnItemsComponent;
      }();

      _ReturnItemsComponent.ɵfac = function ReturnItemsComponent_Factory(t) {
        return new (t || _ReturnItemsComponent)();
      };

      _ReturnItemsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
        type: _ReturnItemsComponent,
        selectors: [["app-return-items"]],
        decls: 5,
        vars: 0,
        consts: [[1, "main"], [1, "body"]],
        template: function ReturnItemsComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "app-sidebar");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "app-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "app-refund-items");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          }
        },
        directives: [_layout_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_0__.SidebarComponent, _layout_header_header_component__WEBPACK_IMPORTED_MODULE_1__.HeaderComponent, _shared_components_refund_items_refund_items_component__WEBPACK_IMPORTED_MODULE_2__.RefundItemsComponent],
        styles: [".body[_ngcontent-%COMP%] {\r\n    height: 100%;\r\n    overflow-x: hidden;\r\n    padding: 50px 40px;\r\n}\r\n\r\n[_nghost-%COMP%]     .card {\r\n    margin-left: 30px !important;\r\n    margin-right:30px !important;\r\n    margin-top: 20px;\r\n}\r\n\r\n[_nghost-%COMP%]     .refund {\r\n    margin-left: 30px !important;\r\n    margin-right: 30px !important;\r\n    \r\n}\r\n\r\n.main[_ngcontent-%COMP%] {\r\n    margin-left: 300px; \r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJldHVybi1pdGVtcy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSw0QkFBNEI7SUFDNUIsNEJBQTRCO0lBQzVCLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLDRCQUE0QjtJQUM1Qiw2QkFBNkI7SUFDN0Isc0JBQXNCO0FBQzFCOztBQUlBO0lBQ0ksa0JBQWtCLEVBQUUscUNBQXFDO0FBQzdEIiwiZmlsZSI6InJldHVybi1pdGVtcy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJvZHkge1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG4gICAgcGFkZGluZzogNTBweCA0MHB4O1xyXG59XHJcblxyXG46aG9zdCA6Om5nLWRlZXAgLmNhcmQge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDMwcHggIWltcG9ydGFudDtcclxuICAgIG1hcmdpbi1yaWdodDozMHB4ICFpbXBvcnRhbnQ7XHJcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xyXG59XHJcblxyXG46aG9zdCA6Om5nLWRlZXAgLnJlZnVuZCB7XHJcbiAgICBtYXJnaW4tbGVmdDogMzBweCAhaW1wb3J0YW50O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAzMHB4ICFpbXBvcnRhbnQ7XHJcbiAgICAvKiBtYXJnaW4tdG9wOiAyMHB4OyAqL1xyXG59XHJcblxyXG5cclxuXHJcbi5tYWluIHtcclxuICAgIG1hcmdpbi1sZWZ0OiAzMDBweDsgLyogU2FtZSBhcyB0aGUgd2lkdGggb2YgdGhlIHNpZGVuYXYgKi9cclxufVxyXG4iXX0= */"]
      });
      /***/
    },

    /***/
    18996:
    /*!**********************************************************************!*\
      !*** ./src/app/dashboard/reward-details/reward-details.component.ts ***!
      \**********************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "RewardDetailsComponent": function RewardDetailsComponent() {
          return (
            /* binding */
            _RewardDetailsComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var _services_rewardmgt_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../services/rewardmgt.service */
      81856);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/router */
      39895);
      /* harmony import */


      var ngx_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ngx-spinner */
      79866);
      /* harmony import */


      var _layout_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../layout/sidebar/sidebar.component */
      31658);
      /* harmony import */


      var _layout_header_header_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../layout/header/header.component */
      1860);
      /* harmony import */


      var _shared_components_table_filter_table_filter_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../shared/components/table-filter/table-filter.component */
      11450);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/common */
      38583);

      var _c0 = function _c0(a1) {
        return ["/reward-details/transactions", a1];
      };

      function RewardDetailsComponent_tr_29_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](14);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "button", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, "VIEW TRANSACTIONS");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var item_r1 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"]("", item_r1 == null ? null : item_r1.propertyManagerFirstName, " ", item_r1 == null ? null : item_r1.propertyManagerLastName, "");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](item_r1 == null ? null : item_r1.propertyData == null ? null : item_r1.propertyData.name);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"]("", item_r1 == null ? null : item_r1.firstName, " ", item_r1 == null ? null : item_r1.lastName, "");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](item_r1 == null ? null : item_r1.email);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("$", item_r1 == null ? null : item_r1.rewardAmount, "");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("$", item_r1 == null ? null : item_r1.totalRewardAmountRedeemed, "");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("$", (item_r1 == null ? null : item_r1.totalRewardBalance) ? item_r1 == null ? null : item_r1.totalRewardBalance : "0", "");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](10, _c0, item_r1.id));
        }
      }

      var _RewardDetailsComponent = /*#__PURE__*/function () {
        function _RewardDetailsComponent(reward, _router, spinner) {
          _classCallCheck(this, _RewardDetailsComponent);

          this.reward = reward;
          this._router = _router;
          this.spinner = spinner;
          this.count = 9;
          this.promoCount = 0;
          this.lastPromoCount = 9;
          this.searchString = '';
          this.collection = [];
        }

        _createClass(_RewardDetailsComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            // this.reward.getRewardList().subscribe((res)=>{
            //   this.collection = res;
            // })
            this.getPromoCodeList();
          }
        }, {
          key: "createReward",
          value: function createReward() {
            this._router.navigateByUrl('/create-reward');
          }
        }, {
          key: "getRewardTransaction",
          value: function getRewardTransaction() {
            var _this14 = this;

            this.spinner.show();
            this.reward.getRewardTransaction().subscribe(function (res) {
              if (res) {
                _this14.spinner.hide();

                _this14.transactions = res;
              }
            });
          }
        }, {
          key: "getPromoCodeList",
          value: function getPromoCodeList() {
            var _this15 = this;

            this.spinner.show();
            this.reward.getRewards(this.searchString).subscribe(function (data) {
              if (data) {
                _this15.spinner.hide(); // this.updateList(data);
                // this.promoList = this.getLastViewedProductList();


                _this15.promoCodeList = data;
              }
            });
          }
        }, {
          key: "getLastViewedProductList",
          value: function getLastViewedProductList() {
            return this.promoCodeList;
          }
        }, {
          key: "onScroll",
          value: function onScroll() {
            console.log("Scrolled");

            if (this.promoCount !== this.lastPromoCount) {}
          }
        }, {
          key: "updateList",
          value: function updateList(obj) {
            var isResult = false;

            if (obj && obj.length) {
              var _this$promoCodeList;

              (_this$promoCodeList = this.promoCodeList).push.apply(_this$promoCodeList, _toConsumableArray(obj));

              isResult = true;
            }

            if (isResult === true) {
              this.promoCount += 9;
            }
          }
        }, {
          key: "getStatus",
          value: function getStatus(val) {
            if (val && val.length > 0) {
              return val.some(function (item) {
                return item.status == 1;
              }) ? 'ACTIVATED' : 'NOT ACTIVATED';
            }
          }
        }, {
          key: "redemedReward",
          value: function redemedReward(val) {
            if (val && val.length > 0) {
              if (val.filter(function (item) {
                return item.status == 1;
              }).length > 0) {
                return val.filter(function (item) {
                  return item.status == 1;
                }).reduce(function (acc, item) {
                  return acc + item.rewardAmount;
                }, 0);
              } else {
                return 0;
              }
            } else return 0;
          }
        }, {
          key: "searchChangeEvent",
          value: function searchChangeEvent(data) {
            console.log(data);
            this.promoCodeList = [];
            this.searchString = data;
            this.getPromoCodeList();
          }
        }]);

        return _RewardDetailsComponent;
      }();

      _RewardDetailsComponent.ɵfac = function RewardDetailsComponent_Factory(t) {
        return new (t || _RewardDetailsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_rewardmgt_service__WEBPACK_IMPORTED_MODULE_0__.RewardmgtService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](ngx_spinner__WEBPACK_IMPORTED_MODULE_6__.NgxSpinnerService));
      };

      _RewardDetailsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
        type: _RewardDetailsComponent,
        selectors: [["app-reward-details"]],
        decls: 30,
        vars: 1,
        consts: [[1, "main"], [1, "body"], [1, "row"], [1, "col-lg-12"], [3, "searchInputChange"], [1, "row", "mt-4"], [1, "w-100", "table", "table-hover"], [1, "tableHeader"], ["width", "10%"], ["width", "20%"], [4, "ngFor", "ngForOf"], [1, "btn", "btn-primary", 3, "routerLink"]],
        template: function RewardDetailsComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "app-sidebar");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "app-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "app-table-filter", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("searchInputChange", function RewardDetailsComponent_Template_app_table_filter_searchInputChange_6_listener($event) {
              return ctx.searchChangeEvent($event);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "div", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "table", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "thead");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "tr", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "th", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13, "Property Manager");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "th", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15, "Building Name");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "th", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, "Resident Name");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "th", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](19, "Resident Email");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](20, "th", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](21, "Reward Issued");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "th", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](23, "Reward Redeemed");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](24, "th", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](25, "Reward Balance");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](26, "th", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](27, "Transaction");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](28, "tbody");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](29, RewardDetailsComponent_tr_29_Template, 18, 12, "tr", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](29);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.promoCodeList);
          }
        },
        directives: [_layout_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_1__.SidebarComponent, _layout_header_header_component__WEBPACK_IMPORTED_MODULE_2__.HeaderComponent, _shared_components_table_filter_table_filter_component__WEBPACK_IMPORTED_MODULE_3__.TableFilterComponent, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink],
        styles: ["th[_ngcontent-%COMP%], td[_ngcontent-%COMP%] {\r\n  padding: 15px;\r\n}\r\n.body[_ngcontent-%COMP%] {\r\n  height: 100%;\r\n  overflow-x: hidden;\r\n  padding: 50px 50px;\r\n}\r\n.main[_ngcontent-%COMP%] {\r\n  margin-left: 300px; \r\n}\r\nth[_ngcontent-%COMP%] {\r\n  font-style: normal;\r\n  font-weight: 300;\r\n  font-size: 14px;\r\n  line-height: 14px;\r\n  letter-spacing: 0.03em;\r\n  color: #626262;\r\n}\r\ntd[_ngcontent-%COMP%] {\r\n  font-style: normal;\r\n  font-weight: 300;\r\n  font-size: 14px;\r\n  line-height: 14px;\r\n  letter-spacing: 0.03em;\r\n\r\n  color: #626262;\r\n  text-align: center;\r\n}\r\ntr[_ngcontent-%COMP%] {\r\n  vertical-align: middle !important;\r\n}\r\n.btn-primary[_ngcontent-%COMP%] {\r\n  width: 100px;\r\n  height: 32px;\r\n  background-color: #42a4ec !important;\r\n  border-radius: 5px !important;\r\n  font-size: 9px;\r\n  line-height: 16px;\r\n  letter-spacing: 0.03em;\r\n  text-transform: uppercase;\r\n  color: #ffffff;\r\n  padding:0px !important\r\n}\r\n.table-height[_ngcontent-%COMP%] {\r\n  height: 500px;\r\n  overflow: scroll;\r\n  overflow-x: hidden;\r\n}\r\nthead[_ngcontent-%COMP%] {\r\n  background-color:grey;\r\n  color:white;\r\n  position:sticky;\r\n  top:0;\r\n  text-align:center;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJld2FyZC1kZXRhaWxzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0VBRUUsYUFBYTtBQUNmO0FBQ0E7RUFDRSxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0Usa0JBQWtCLEVBQUUscUNBQXFDO0FBQzNEO0FBQ0E7RUFDRSxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsc0JBQXNCO0VBQ3RCLGNBQWM7QUFDaEI7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixzQkFBc0I7O0VBRXRCLGNBQWM7RUFDZCxrQkFBa0I7QUFDcEI7QUFFQTtFQUNFLGlDQUFpQztBQUNuQztBQUVBO0VBQ0UsWUFBWTtFQUNaLFlBQVk7RUFDWixvQ0FBb0M7RUFDcEMsNkJBQTZCO0VBQzdCLGNBQWM7RUFDZCxpQkFBaUI7RUFDakIsc0JBQXNCO0VBQ3RCLHlCQUF5QjtFQUN6QixjQUFjO0VBQ2Q7QUFDRjtBQUVBO0VBQ0UsYUFBYTtFQUNiLGdCQUFnQjtFQUNoQixrQkFBa0I7QUFDcEI7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixXQUFXO0VBQ1gsZUFBZTtFQUNmLEtBQUs7RUFDTCxpQkFBaUI7QUFDbkIiLCJmaWxlIjoicmV3YXJkLWRldGFpbHMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbInRoLFxyXG50ZCB7XHJcbiAgcGFkZGluZzogMTVweDtcclxufVxyXG4uYm9keSB7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcclxuICBwYWRkaW5nOiA1MHB4IDUwcHg7XHJcbn1cclxuLm1haW4ge1xyXG4gIG1hcmdpbi1sZWZ0OiAzMDBweDsgLyogU2FtZSBhcyB0aGUgd2lkdGggb2YgdGhlIHNpZGVuYXYgKi9cclxufVxyXG50aCB7XHJcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAxNHB4O1xyXG4gIGxldHRlci1zcGFjaW5nOiAwLjAzZW07XHJcbiAgY29sb3I6ICM2MjYyNjI7XHJcbn1cclxuXHJcbnRkIHtcclxuICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgZm9udC13ZWlnaHQ6IDMwMDtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgbGluZS1oZWlnaHQ6IDE0cHg7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDNlbTtcclxuXHJcbiAgY29sb3I6ICM2MjYyNjI7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG50ciB7XHJcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZSAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uYnRuLXByaW1hcnkge1xyXG4gIHdpZHRoOiAxMDBweDtcclxuICBoZWlnaHQ6IDMycHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQyYTRlYyAhaW1wb3J0YW50O1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweCAhaW1wb3J0YW50O1xyXG4gIGZvbnQtc2l6ZTogOXB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAxNnB4O1xyXG4gIGxldHRlci1zcGFjaW5nOiAwLjAzZW07XHJcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICBjb2xvcjogI2ZmZmZmZjtcclxuICBwYWRkaW5nOjBweCAhaW1wb3J0YW50XHJcbn1cclxuXHJcbi50YWJsZS1oZWlnaHQge1xyXG4gIGhlaWdodDogNTAwcHg7XHJcbiAgb3ZlcmZsb3c6IHNjcm9sbDtcclxuICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbn1cclxuXHJcbnRoZWFkIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOmdyZXk7XHJcbiAgY29sb3I6d2hpdGU7XHJcbiAgcG9zaXRpb246c3RpY2t5O1xyXG4gIHRvcDowO1xyXG4gIHRleHQtYWxpZ246Y2VudGVyO1xyXG59XHJcbiJdfQ== */"]
      });
      /***/
    },

    /***/
    38249:
    /*!***********************************************************************************************!*\
      !*** ./src/app/dashboard/reward-details/transaction-details/transaction-details.component.ts ***!
      \***********************************************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "TransactionDetailsComponent": function TransactionDetailsComponent() {
          return (
            /* binding */
            _TransactionDetailsComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/router */
      39895);
      /* harmony import */


      var src_app_services_rewardmgt_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/app/services/rewardmgt.service */
      81856);
      /* harmony import */


      var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! src/app/services/admin.service */
      87501);
      /* harmony import */


      var ngx_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ngx-spinner */
      79866);
      /* harmony import */


      var _layout_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../layout/sidebar/sidebar.component */
      31658);
      /* harmony import */


      var _layout_header_header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../layout/header/header.component */
      1860);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/common */
      38583);

      function TransactionDetailsComponent_tr_50_button_13_Template(rf, ctx) {
        if (rf & 1) {
          var _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function TransactionDetailsComponent_tr_50_button_13_Template_button_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r9);

            var item_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;

            var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

            return ctx_r7.goToRefund(item_r2.orderId);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "REFUND");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }
      }

      function TransactionDetailsComponent_tr_50_p_14_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "-");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }
      }

      function TransactionDetailsComponent_tr_50_button_15_Template(rf, ctx) {
        if (rf & 1) {
          var _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function TransactionDetailsComponent_tr_50_button_15_Template_button_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r12);

            var item_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;

            var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

            return ctx_r10.goToRefund(item_r2.orderId);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "REFUNDED");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }
      }

      function TransactionDetailsComponent_tr_50_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](5, "date");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](13, TransactionDetailsComponent_tr_50_button_13_Template, 2, 0, "button", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](14, TransactionDetailsComponent_tr_50_p_14_Template, 2, 0, "p", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](15, TransactionDetailsComponent_tr_50_button_15_Template, 2, 0, "button", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var item_r2 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](item_r2 == null ? null : item_r2.orderId);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](5, 8, item_r2 == null ? null : item_r2.updatedDatetime, "longDate"));

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("$", item_r2 == null ? null : item_r2.totalCartAmount, "");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("$", item_r2 == null ? null : item_r2.rewardAmount, "");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("$", item_r2 == null ? null : item_r2.rewardBalance, "");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", item_r2.transactionStatus && item_r2.transactionStatus == "RETURN_INITIATED" && item_r2.rewardAmount);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", item_r2.transactionStatus != "RETURN_INITIATED" && item_r2.transactionStatus != "RETURN_COMPLETED");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", item_r2.transactionStatus && item_r2.transactionStatus == "RETURN_COMPLETED" && item_r2.rewardAmount);
        }
      }

      function TransactionDetailsComponent_tr_67_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](5, "date");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var item_r13 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("$", item_r13 == null ? null : item_r13.rewardAmount, "");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](5, 2, item_r13 == null ? null : item_r13.updatedDatetime, "longDate"));
        }
      }

      var _c0 = function _c0() {
        return ["/", "reward-details"];
      };

      var _TransactionDetailsComponent = /*#__PURE__*/function () {
        function _TransactionDetailsComponent(route, rewardService, admin, spinner, router) {
          _classCallCheck(this, _TransactionDetailsComponent);

          this.route = route;
          this.rewardService = rewardService;
          this.admin = admin;
          this.spinner = spinner;
          this.router = router;
          this.rewardDetails = [];
          this.history = [];
          this.rewardTransactions = [];
          this.totalRewards = 0;
        }

        _createClass(_TransactionDetailsComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this16 = this;

            this.route.params.subscribe(function (val) {
              if (val.id) {
                _this16.rewardId = val.id;

                _this16.getData(val.id);
              }
            });
          }
        }, {
          key: "getData",
          value: function getData(val) {
            var _this17 = this;

            if (val) {
              this.spinner.show();
              this.rewardService.getRewardTransactionBasedOnId(val).subscribe(function (data) {
                if (data) {
                  _this17.rewardDetails = data;
                  _this17.history = _this17.rewardDetails.rewardHistory;
                  _this17.rewardTransactions = _this17.rewardDetails.rewardTransactions;

                  _this17.getTotal(_this17.history);

                  _this17.spinner.hide();
                }
              });
            }
          }
        }, {
          key: "getTotal",
          value: function getTotal(arr) {
            if (arr && arr.length > 0) {
              var affirm = 0;
              arr.forEach(function (item) {
                affirm = affirm + (item === null || item === void 0 ? void 0 : item.rewardAmount);
                return affirm;
              });
              this.totalRewards = affirm;
            } else {
              this.totalRewards = 0;
            }
          }
        }, {
          key: "refund",
          value: function refund(orderId) {
            var _this18 = this;

            this.spinner.show();
            this.admin.refund(this.rewardId, orderId).subscribe(function (data) {
              if (data) {
                _this18.getData(_this18.rewardId);

                _this18.spinner.hide();
              }
            }, function (err) {
              _this18.spinner.hide();
            });
          }
        }, {
          key: "goToRefund",
          value: function goToRefund(id) {
            this.router.navigate(['/reward-details/transactions/refund', this.rewardId, id], {
              queryParams: {
                admin: true
              }
            });
          }
        }]);

        return _TransactionDetailsComponent;
      }();

      _TransactionDetailsComponent.ɵfac = function TransactionDetailsComponent_Factory(t) {
        return new (t || _TransactionDetailsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_services_rewardmgt_service__WEBPACK_IMPORTED_MODULE_0__.RewardmgtService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__.AdminService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](ngx_spinner__WEBPACK_IMPORTED_MODULE_6__.NgxSpinnerService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router));
      };

      _TransactionDetailsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
        type: _TransactionDetailsComponent,
        selectors: [["app-transaction-details"]],
        decls: 68,
        vars: 10,
        consts: [[1, "main"], [1, "body"], [1, "row"], [1, "col-7"], [1, "col-1", "mt-1"], [1, "fas", "fa-arrow-left", "fa-2x", "theme-color", "pointer", 3, "routerLink"], [1, "col-8"], [1, "text-uppercase"], [1, "row", "fs-5"], [1, "col-1"], [1, "col-8", "mt-4", "box"], [1, "col-5"], [1, "fs-5"], ["data-bs-toggle", "modal", "data-bs-target", "#rewards", 1, "btn", "btn_theme", "add-card", "font10", 2, "width", "60%"], [1, "row", "mt-5"], [1, "table", "transaction", "table-borderless"], [1, "tableHeader", "w-100"], [1, "text-center"], [4, "ngFor", "ngForOf"], ["id", "rewards", "tabindex", "-1", "aria-labelledby", "rewardsLabel", "aria-hidden", "true", 1, "modal", "fade"], [1, "modal-dialog"], [1, "modal-content", "p-3"], [1, "modal-header", "border-0", "pb-1"], ["type", "button", "data-bs-dismiss", "modal", "aria-label", "Close", 1, "btn-close"], [1, "modal-body", "text-left", "pt-0", "pb-1"], ["id", "addCardLabel", 1, "pt-0", "text-left"], [1, "table", "table-bordered"], [1, "tableHeader"], ["scope", "col"], ["class", "btn btn-primary", "style", "border-radius: 5px;", 3, "click", 4, "ngIf"], [4, "ngIf"], ["class", "btn btn-success", "style", "cursor: context-menu;", 3, "click", 4, "ngIf"], [1, "btn", "btn-primary", 2, "border-radius", "5px", 3, "click"], [1, "btn", "btn-success", 2, "cursor", "context-menu", 3, "click"]],
        template: function TransactionDetailsComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "app-sidebar");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "app-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](8, "i", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "div", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "h4", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "div", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](15, "div", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](18);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](20, "div", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](21, "div", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "h4");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](23, "CURRENT BALANCE: ");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](24, "span");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](25);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](26, "div", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](27, "p", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](28, "Total Rewards Given : ");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](29, "span");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](30);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](31, "button", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](32, "View History");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](33, "div", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](34, "table", 15);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](35, "thead", 16);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](36, "tr", 17);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](37, "th");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](38, "Order Number");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](39, "th");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](40, "Date");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](41, "th");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](42, "Cart Amount");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](43, "th");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](44, "Reward Amount");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](45, "th");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](46, "Balance");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](47, "th");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](48, "Refund");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](49, "tbody");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](50, TransactionDetailsComponent_tr_50_Template, 16, 11, "tr", 18);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](51, "div", 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](52, "div", 20);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](53, "div", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](54, "div", 22);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](55, "button", 23);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](56, "div", 24);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](57, "h5", 25);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](58, "Reward History");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](59, "table", 26);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](60, "thead", 27);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](61, "tr");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](62, "th", 28);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](63, "Reward Amount");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](64, "th", 28);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](65, "Issued Date");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](66, "tbody");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](67, TransactionDetailsComponent_tr_67_Template, 6, 5, "tr", 18);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](8);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](9, _c0));

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"]("", ctx.rewardDetails == null ? null : ctx.rewardDetails.firstName, " ", ctx.rewardDetails == null ? null : ctx.rewardDetails.lastName, "");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.rewardDetails == null ? null : ctx.rewardDetails.email);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.rewardDetails == null ? null : ctx.rewardDetails.propertyData == null ? null : ctx.rewardDetails.propertyData.name);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("$", ctx.rewardDetails.totalRewardBalance ? ctx.rewardDetails == null ? null : ctx.rewardDetails.totalRewardBalance : 0, "");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("$", ctx.totalRewards, "");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](20);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.rewardTransactions);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](17);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.history);
          }
        },
        directives: [_layout_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_2__.SidebarComponent, _layout_header_header_component__WEBPACK_IMPORTED_MODULE_3__.HeaderComponent, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf],
        pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.DatePipe],
        styles: [".body[_ngcontent-%COMP%] {\r\n    height: 100%;\r\n    overflow-x: hidden;\r\n    padding: 50px 50px;\r\n}\r\n\r\n.box[_ngcontent-%COMP%] {\r\n    background-color: #f3f3f3;\r\n    padding: 30px;\r\n    border-radius: 3%;\r\n}\r\n\r\ntable.transaction[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\r\n    padding: 30px;\r\n}\r\n\r\ntd[_ngcontent-%COMP%] {\r\n    padding:15px;\r\n    font-size: 18px;\r\n}\r\n\r\n.btn[_ngcontent-%COMP%]:focus {\r\n    outline: none !important;\r\n    box-shadow: none;\r\n   \r\n}\r\n\r\n.btn[_ngcontent-%COMP%] {\r\n    font-size: 12px !important;\r\n}\r\n\r\n.font10[_ngcontent-%COMP%] {\r\n    font-size: 16px !important;\r\n}\r\n\r\n.btn-dark[_ngcontent-%COMP%] {\r\n    font-size: 8px !important;\r\n}\r\n\r\n.btn-primary[_ngcontent-%COMP%] {\r\n    background-color: #EE5D2F !important;\r\n    width: 100%;\r\n    border:none;\r\n}\r\n\r\ntr[_ngcontent-%COMP%] {\r\n    vertical-align: middle !important;\r\n    text-align: center !important;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRyYW5zYWN0aW9uLWRldGFpbHMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLGFBQWE7SUFDYixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksWUFBWTtJQUNaLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSx3QkFBd0I7SUFDeEIsZ0JBQWdCOztBQUVwQjs7QUFFQTtJQUNJLDBCQUEwQjtBQUM5Qjs7QUFFQTtJQUNJLDBCQUEwQjtBQUM5Qjs7QUFFQTtJQUNJLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLG9DQUFvQztJQUNwQyxXQUFXO0lBQ1gsV0FBVztBQUNmOztBQUVBO0lBQ0ksaUNBQWlDO0lBQ2pDLDZCQUE2QjtBQUNqQyIsImZpbGUiOiJ0cmFuc2FjdGlvbi1kZXRhaWxzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYm9keSB7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgICBwYWRkaW5nOiA1MHB4IDUwcHg7XHJcbn1cclxuXHJcbi5ib3gge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2YzZjNmMztcclxuICAgIHBhZGRpbmc6IDMwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAzJTtcclxufVxyXG5cclxudGFibGUudHJhbnNhY3Rpb24gdHIgdGgge1xyXG4gICAgcGFkZGluZzogMzBweDtcclxufVxyXG5cclxudGQge1xyXG4gICAgcGFkZGluZzoxNXB4O1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG59XHJcblxyXG4uYnRuOmZvY3VzIHtcclxuICAgIG91dGxpbmU6IG5vbmUgIWltcG9ydGFudDtcclxuICAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbiAgIFxyXG59XHJcblxyXG4uYnRuIHtcclxuICAgIGZvbnQtc2l6ZTogMTJweCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uZm9udDEwIHtcclxuICAgIGZvbnQtc2l6ZTogMTZweCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uYnRuLWRhcmsge1xyXG4gICAgZm9udC1zaXplOiA4cHggIWltcG9ydGFudDtcclxufVxyXG5cclxuLmJ0bi1wcmltYXJ5IHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNFRTVEMkYgIWltcG9ydGFudDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgYm9yZGVyOm5vbmU7XHJcbn1cclxuXHJcbnRyIHtcclxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGUgIWltcG9ydGFudDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlciAhaW1wb3J0YW50O1xyXG59Il19 */"]
      });
      /***/
    },

    /***/
    17450:
    /*!********************************************************!*\
      !*** ./src/app/dashboard/rewards/rewards.component.ts ***!
      \********************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "RewardsComponent": function RewardsComponent() {
          return (
            /* binding */
            _RewardsComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var src_app_services_rewardmgt_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/app/services/rewardmgt.service */
      81856);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/router */
      39895);
      /* harmony import */


      var src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! src/app/services/storage.service */
      71188);
      /* harmony import */


      var ngx_spinner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ngx-spinner */
      79866);
      /* harmony import */


      var ngx_toastr__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ngx-toastr */
      49344);
      /* harmony import */


      var _layout_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../layout/sidebar/sidebar.component */
      31658);
      /* harmony import */


      var _layout_header_header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../layout/header/header.component */
      1860);
      /* harmony import */


      var _shared_components_load_cash_load_cash_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../shared/components/load-cash/load-cash.component */
      66984);
      /* harmony import */


      var _shared_components_table_filter_table_filter_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../shared/components/table-filter/table-filter.component */
      11450);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/common */
      38583);

      function RewardsComponent_tr_40_i_20_Template(rf, ctx) {
        if (rf & 1) {
          var _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "i", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RewardsComponent_tr_40_i_20_Template_i_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r11);

            var item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;

            var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();

            return ctx_r9.deletedReward(item_r6);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        }
      }

      function RewardsComponent_tr_40_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](12);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](15, "date");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "td", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](18);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](19, "date");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](20, RewardsComponent_tr_40_i_20_Template, 1, 0, "i", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var item_r6 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"]("", item_r6 == null ? null : item_r6.userData.propertyManagerFirstName, " ", item_r6 == null ? null : item_r6.userData.propertyManagerLastName, "");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6 == null ? null : item_r6.propertyData == null ? null : item_r6.propertyData.name);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"]("", item_r6 == null ? null : item_r6.userData == null ? null : item_r6.userData.firstName, " ", item_r6 == null ? null : item_r6.userData == null ? null : item_r6.userData.lastName, "");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6 == null ? null : item_r6.userData == null ? null : item_r6.userData.email);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("$", item_r6 == null ? null : item_r6.rewardAmount, "");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.deleteStatus == 0 || item_r6.deleteStatus == null ? (item_r6 == null ? null : item_r6.is_expired) ? "Expired" : item_r6.status == 1 ? "Activated" : "Not Activated" : "Cancelled");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](15, 11, item_r6 == null ? null : item_r6.updatedDatetime, "longDate"));

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](19, 14, item_r6 == null ? null : item_r6.rewardEndDate, "longDate"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", (item_r6.deleteStatus == 0 || item_r6.deleteStatus == null) && !item_r6.is_expired);
        }
      }

      function RewardsComponent_h2_47_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "h2", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("Do you want to cancel $", ctx_r1.rewardType.deleteAmount, " rewards? ");
        }
      }

      function RewardsComponent_h2_48_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "h2", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Sorry Resident has no rewards to cancel.");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        }
      }

      function RewardsComponent_h2_49_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "h2", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("Resident has only $", ctx_r3.rewardType.deleteAmount, " rewards that can be canceled.");
        }
      }

      function RewardsComponent_div_50_Template(rf, ctx) {
        if (rf & 1) {
          var _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "button", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RewardsComponent_div_50_Template_button_click_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r13);

            var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();

            return ctx_r12.deleteRewardService(ctx_r12.rewardType.id);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "Save changes");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "button", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "Close");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        }
      }

      function RewardsComponent_div_51_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "button", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "Close");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        }
      }

      var _RewardsComponent = /*#__PURE__*/function () {
        function _RewardsComponent(reward, _router, storage, spinner, toastr) {
          _classCallCheck(this, _RewardsComponent);

          this.reward = reward;
          this._router = _router;
          this.storage = storage;
          this.spinner = spinner;
          this.toastr = toastr;
          this.promoCodeList = [];
          this.promoCodeListMaster = [];
          this.rewardType = {
            type: '',
            deleteAmount: 0,
            id: null
          };
          this.query = {
            start: 0,
            count: 9,
            searchString: ''
          };
          this.isMoreData = true;
          this.isApiLoading = false;
          this.collection = [];
        }

        _createClass(_RewardsComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.spinner.show();
            this.getPropertyAddress();
            this.getBuildingName();
            this.getPromoCodeList();
          }
        }, {
          key: "getScrollHeight",
          value: function getScrollHeight(event) {
            console.log(window.pageYOffset);

            if (window && window.pageYOffset > 50 && this.isMoreData && !this.isApiLoading) {
              this.query.start = this.query.start + 9;
              this.getPromoCodeList();
            }
          }
        }, {
          key: "createReward",
          value: function createReward() {
            this._router.navigateByUrl('/create-reward');
          }
        }, {
          key: "getBuildingName",
          value: function getBuildingName() {
            var userData = JSON.parse(this.storage.getUserDetails());
            this.buildingDetails = userData.propertyDataList[0];
          }
        }, {
          key: "getPropertyAddress",
          value: function getPropertyAddress() {
            var _this19 = this;

            this.reward.getBuldingList().subscribe(function (data) {
              if (data) {
                _this19.buildingList = data['PropertyAddress'];

                _this19.reward.buildingList.next(data['PropertyAddress']);
              }
            });
          }
        }, {
          key: "getPromoCodeList",
          value: function getPromoCodeList() {
            var _this20 = this;

            this.isApiLoading = true;
            this.reward.getRecentlyRewards(this.query).subscribe(function (data) {
              _this20.isApiLoading = false;

              if (data && Array.isArray(data)) {
                _this20.isMoreData = data.length ? true : false;
                data = data.map(function (x) {
                  if (x.rewardEndDate) {
                    var today = new Date();
                    var current = new Date(x.rewardEndDate);
                    x['is_expired'] = today > current ? true : false;
                  }

                  return x;
                });

                _this20.spinner.hide();

                _this20.promoCodeList = [].concat(_toConsumableArray(_this20.promoCodeList), _toConsumableArray(data));
                return;
              }

              _this20.isMoreData = false;
            }, function (error) {
              _this20.spinner.hide();

              _this20.isMoreData = false;
              _this20.isApiLoading = false;
            });
          }
        }, {
          key: "deletedReward",
          value: function deletedReward(item) {
            $('#deleteReward').modal('show');
            var deleteBalance = item.rewardAmount || 0;
            var currentBalance = item.rewardBalance || 0;
            var status = item.status;
            this.rewardType.id = item.id;

            if (status == 0 || deleteBalance < currentBalance) {
              this.rewardType.type = 'cancel';
              this.rewardType.deleteAmount = deleteBalance;
            } else if (currentBalance == 0) {
              this.rewardType.type = 'zero';
            } else if (deleteBalance > currentBalance) {
              this.rewardType.type = 'partial';
              this.rewardType.deleteAmount = currentBalance;
            }
          }
        }, {
          key: "deleteRewardService",
          value: function deleteRewardService(id) {
            var _this21 = this;

            if (id) {
              this.spinner.show();
              this.reward.deleteReward(id).subscribe(function (data) {
                if (data) {
                  _this21.spinner.hide();

                  _this21.toastr.success("Reward $".concat(data === null || data === void 0 ? void 0 : data.detletedAmount, " deleted successfully"));

                  _this21.promoCodeList = [];

                  _this21.getPromoCodeList();

                  $('#deleteReward').modal('hide');

                  _this21.reward.getBuildingAmount(_this21.storage.getPropertyId());
                }
              });
            }
          }
        }, {
          key: "searchChangeEvent",
          value: function searchChangeEvent(data) {
            console.log(data);
            this.promoCodeList = [];
            this.query.searchString = data;
            this.query.start = 0;
            this.getPromoCodeList();
          }
        }]);

        return _RewardsComponent;
      }();

      _RewardsComponent.ɵfac = function RewardsComponent_Factory(t) {
        return new (t || _RewardsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_services_rewardmgt_service__WEBPACK_IMPORTED_MODULE_0__.RewardmgtService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_1__.StorageService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](ngx_spinner__WEBPACK_IMPORTED_MODULE_8__.NgxSpinnerService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_9__.ToastrService));
      };

      _RewardsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
        type: _RewardsComponent,
        selectors: [["app-rewards"]],
        hostBindings: function RewardsComponent_HostBindings(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("scroll", function RewardsComponent_scroll_HostBindingHandler($event) {
              return ctx.getScrollHeight($event);
            }, false, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresolveWindow"]);
          }
        },
        decls: 55,
        vars: 7,
        consts: [[1, "main"], [1, "body"], [1, "row", "align-items-center", "justify-content-center"], [1, "col-lg-2", "create-container", "text-center", 3, "click"], ["src", "assets/create-reward.png", 1, "create-promo-code"], [1, "col-lg-10"], [3, "showRewards"], [1, "row", "mt-5"], [1, "col-lg-12"], [3, "searchInputChange"], [1, "row", "mt-3"], [1, "promo-code-text"], [1, "row", "mt-4"], [1, "w-100", "table", "table-hover"], [1, "tableHeader"], ["width", "15%"], ["width", "25%"], [4, "ngFor", "ngForOf"], ["id", "deleteReward", "tabindex", "-1", "aria-labelledby", "deleteRewardLabel", "aria-hidden", "true", 1, "modal", "fade"], [1, "modal-dialog"], [1, "modal-content", "p-3"], [1, "modal-body", "text-center"], [1, "border-bottom", "pb-2"], ["class", "m-0 mt-4", 4, "ngIf"], ["class", "modal-footer justify-content-center border-0", 4, "ngIf"], ["bdColor", "rgba(51,51,51,0.8)", "size", "medium", "color", "#fff", "type", "ball-atom"], [2, "font-size", "20px", "color", "white"], [1, "text-center"], ["style", "padding-left: 7px;", "class", "far fa-trash-alt pointer", 3, "click", 4, "ngIf"], [1, "far", "fa-trash-alt", "pointer", 2, "padding-left", "7px", 3, "click"], [1, "m-0", "mt-4"], [1, "modal-footer", "justify-content-center", "border-0"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], ["type", "button", "data-bs-dismiss", "modal", "aria-label", "Close", 1, "btn", "btn-secondary"]],
        template: function RewardsComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "app-sidebar");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "app-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RewardsComponent_Template_div_click_5_listener() {
              return ctx.createReward();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](6, "img", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, "CREATE REWARD");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "div", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](10, "app-load-cash", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "div", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "div", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "app-table-filter", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("searchInputChange", function RewardsComponent_Template_app_table_filter_searchInputChange_13_listener($event) {
              return ctx.searchChangeEvent($event);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "div", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "div", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "h2", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](17, "RECENTLY CREATED REWARDS");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](18, "div", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](19, "div", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "table", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](21, "thead");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](22, "tr", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](23, "th");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](24, "Property Manager");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](25, "th");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](26, "Building Name");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](27, "th");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](28, "Resident Name");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](29, "th");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](30, "Resident Email");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](31, "th");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](32, "Reward Issued");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](33, "th");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](34, "Status");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](35, "th", 15);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](36, "Issued Date");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](37, "th", 16);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](38, "Expiry Date");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](39, "tbody");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](40, RewardsComponent_tr_40_Template, 21, 17, "tr", 17);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](41, "div", 18);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](42, "div", 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](43, "div", 20);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](44, "div", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](45, "h3", 22);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](46, "DELETE REWARD");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](47, RewardsComponent_h2_47_Template, 2, 1, "h2", 23);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](48, RewardsComponent_h2_48_Template, 2, 0, "h2", 23);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](49, RewardsComponent_h2_49_Template, 2, 1, "h2", 23);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](50, RewardsComponent_div_50_Template, 5, 0, "div", 24);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](51, RewardsComponent_div_51_Template, 3, 0, "div", 24);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](52, "ngx-spinner", 25);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](53, "p", 26);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](54, "Loading...");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](10);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("showRewards", false);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](30);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx.promoCodeList);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.rewardType.type == "cancel");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.rewardType.type == "zero");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.rewardType.type == "partial");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.rewardType.type == "cancel" || ctx.rewardType.type == "partial");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.rewardType.type == "zero");
          }
        },
        directives: [_layout_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_2__.SidebarComponent, _layout_header_header_component__WEBPACK_IMPORTED_MODULE_3__.HeaderComponent, _shared_components_load_cash_load_cash_component__WEBPACK_IMPORTED_MODULE_4__.LoadCashComponent, _shared_components_table_filter_table_filter_component__WEBPACK_IMPORTED_MODULE_5__.TableFilterComponent, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, ngx_spinner__WEBPACK_IMPORTED_MODULE_8__.NgxSpinnerComponent],
        pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.DatePipe],
        styles: [".tabImage[_ngcontent-%COMP%]{\r\n    float: left;\r\n    background-color: white;\r\n    margin: -8px 14px 0px 26px;\r\n    box-shadow: 0px 4px 4px rgb(0 0 0 / 10%), 4px 0px 4px rgb(0 0 0 / 10%), -4px 0px 4px rgb(0 0 0 / 10%);\r\n    border-radius: 5px;\r\n    width: 44px;\r\n    height: 41px;\r\n  }\r\n  .twin[_ngcontent-%COMP%]{\r\n    font-style: normal;\r\n    font-weight: 500 !important;\r\n    font-size: 20px !important;\r\n    line-height: 23px !important;\r\n    letter-spacing: 0.03em;\r\n    color: #000000;\r\n  }\r\n  .property-building[_ngcontent-%COMP%]{\r\n    font-style: normal;\r\n    font-weight: 500;\r\n    font-size: 14px !important;\r\n    line-height: 23px;\r\n    letter-spacing: 0.02em;  \r\n    color: #000000;\r\n    margin-left: 70px;\r\n  }\r\n  .main[_ngcontent-%COMP%] {\r\n    margin-left: 300px; \r\n  }\r\n  .mainLayout[_ngcontent-%COMP%]{\r\n    padding: 100px 10px 10px 10px;\r\n  }\r\n  .body[_ngcontent-%COMP%]{\r\n    height: 100%;\r\n    overflow-x: scroll;\r\n    padding: 50px 40px;\r\n  }\r\n  .header[_ngcontent-%COMP%]{\r\n    height: 66px;\r\n    padding: 4px 0px 0px 0px;\r\n    border: 1px solid black;\r\n  }\r\n  th[_ngcontent-%COMP%], td[_ngcontent-%COMP%] {\r\n    padding: 17px;\r\n  }\r\n  tr[_ngcontent-%COMP%]:nth-child(even) {\r\n    background-color: #f2f2f2;\r\n  }\r\n  h2[_ngcontent-%COMP%]{\r\n    font-style: normal;\r\n    font-weight: 300;\r\n    font-size: 17px;\r\n    line-height: 17px;\r\n    letter-spacing: 0.05em;\r\n  }\r\n  .buildingName[_ngcontent-%COMP%]{\r\n    width: 309px;\r\n    height: 36px;\r\n    left: 917px;\r\n    top: 170px;\r\n    background: #FFFFFF;\r\n    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1), 1px 0px 4px rgba(0, 0, 0, 0.1), 0px -1px 4px rgba(0, 0, 0, 0.1), -1px 0px 4px rgba(0, 0, 0, 0.1);\r\n    border-radius: 5px;\r\n  }\r\n  select[_ngcontent-%COMP%] {\r\n    width: 268px !important;\r\n    padding: 5px;\r\n    font-size: 16px;\r\n    line-height: 1;\r\n    border: 0;\r\n    border-radius: 5px !important;\r\n    height: 34px !important;\r\n    \r\n    -webkit-appearance: none;\r\n    background-position-x: 229px !important;\r\n    background-size: 37px 29px !important;\r\n}\r\n  .create-promo-code[_ngcontent-%COMP%] {\r\n  height: 80px;\r\n}\r\n  .create-reward[_ngcontent-%COMP%] {\r\n  cursor: pointer;\r\n}\r\n  .border-right[_ngcontent-%COMP%] {\r\n  border-right: 1px solid rgba(72, 68, 68, 0.5);\r\n}\r\n  .promo-code-text[_ngcontent-%COMP%] {\r\n  font-style: normal !important;\r\n  font-weight: 300 !important;\r\n  font-size: 17px !important;\r\n  line-height: 17px !important;\r\n  letter-spacing: 0.05em !important;\r\n  color: #000000 !important;\r\n}\r\n  .create-container[_ngcontent-%COMP%] {\r\n  cursor: pointer;\r\n}\r\n  tr[_ngcontent-%COMP%] {\r\n  vertical-align: middle !important;\r\n  text-align: center !important;\r\n}\r\n  @media screen and (max-height: 450px) {\r\n  .sidenav[_ngcontent-%COMP%] {padding-top: 15px;}\r\n  .sidenav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {font-size: 14px;    cursor: pointer;}\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJld2FyZHMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFdBQVc7SUFDWCx1QkFBdUI7SUFDdkIsMEJBQTBCO0lBQzFCLHFHQUFxRztJQUNyRyxrQkFBa0I7SUFDbEIsV0FBVztJQUNYLFlBQVk7RUFDZDtFQUNBO0lBQ0Usa0JBQWtCO0lBQ2xCLDJCQUEyQjtJQUMzQiwwQkFBMEI7SUFDMUIsNEJBQTRCO0lBQzVCLHNCQUFzQjtJQUN0QixjQUFjO0VBQ2hCO0VBQ0E7SUFDRSxrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLDBCQUEwQjtJQUMxQixpQkFBaUI7SUFDakIsc0JBQXNCO0lBQ3RCLGNBQWM7SUFDZCxpQkFBaUI7RUFDbkI7RUFDQTtJQUNFLGtCQUFrQixFQUFFLHFDQUFxQztFQUMzRDtFQUNBO0lBQ0UsNkJBQTZCO0VBQy9CO0VBQ0E7SUFDRSxZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLGtCQUFrQjtFQUNwQjtFQUNBO0lBQ0UsWUFBWTtJQUNaLHdCQUF3QjtJQUN4Qix1QkFBdUI7RUFDekI7RUFHQTtJQUNFLGFBQWE7RUFDZjtFQUVBO0lBQ0UseUJBQXlCO0VBQzNCO0VBQ0E7SUFDRSxrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsc0JBQXNCO0VBQ3hCO0VBRUE7SUFDRSxZQUFZO0lBQ1osWUFBWTtJQUNaLFdBQVc7SUFDWCxVQUFVO0lBQ1YsbUJBQW1CO0lBQ25CLDRJQUE0STtJQUM1SSxrQkFBa0I7RUFDcEI7RUFDQTtJQUNFLHVCQUF1QjtJQUN2QixZQUFZO0lBQ1osZUFBZTtJQUNmLGNBQWM7SUFDZCxTQUFTO0lBQ1QsNkJBQTZCO0lBQzdCLHVCQUF1QjtJQUN2QiwwRkFBMEY7SUFDMUYsd0JBQXdCO0lBQ3hCLHVDQUF1QztJQUN2QyxxQ0FBcUM7QUFDekM7RUFFQTtFQUNFLFlBQVk7QUFDZDtFQUVBO0VBQ0UsZUFBZTtBQUNqQjtFQUVBO0VBQ0UsNkNBQTZDO0FBQy9DO0VBRUE7RUFDRSw2QkFBNkI7RUFDN0IsMkJBQTJCO0VBQzNCLDBCQUEwQjtFQUMxQiw0QkFBNEI7RUFDNUIsaUNBQWlDO0VBQ2pDLHlCQUF5QjtBQUMzQjtFQUVBO0VBQ0UsZUFBZTtBQUNqQjtFQUVBO0VBQ0UsaUNBQWlDO0VBQ2pDLDZCQUE2QjtBQUMvQjtFQUVBO0VBQ0UsVUFBVSxpQkFBaUIsQ0FBQztFQUM1QixZQUFZLGVBQWUsS0FBSyxlQUFlLENBQUM7QUFDbEQiLCJmaWxlIjoicmV3YXJkcy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRhYkltYWdle1xyXG4gICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICAgIG1hcmdpbjogLThweCAxNHB4IDBweCAyNnB4O1xyXG4gICAgYm94LXNoYWRvdzogMHB4IDRweCA0cHggcmdiKDAgMCAwIC8gMTAlKSwgNHB4IDBweCA0cHggcmdiKDAgMCAwIC8gMTAlKSwgLTRweCAwcHggNHB4IHJnYigwIDAgMCAvIDEwJSk7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICB3aWR0aDogNDRweDtcclxuICAgIGhlaWdodDogNDFweDtcclxuICB9XHJcbiAgLnR3aW57XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBmb250LXdlaWdodDogNTAwICFpbXBvcnRhbnQ7XHJcbiAgICBmb250LXNpemU6IDIwcHggIWltcG9ydGFudDtcclxuICAgIGxpbmUtaGVpZ2h0OiAyM3B4ICFpbXBvcnRhbnQ7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogMC4wM2VtO1xyXG4gICAgY29sb3I6ICMwMDAwMDA7XHJcbiAgfVxyXG4gIC5wcm9wZXJ0eS1idWlsZGluZ3tcclxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICBmb250LXNpemU6IDE0cHggIWltcG9ydGFudDtcclxuICAgIGxpbmUtaGVpZ2h0OiAyM3B4O1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMDJlbTsgIFxyXG4gICAgY29sb3I6ICMwMDAwMDA7XHJcbiAgICBtYXJnaW4tbGVmdDogNzBweDtcclxuICB9XHJcbiAgLm1haW4ge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDMwMHB4OyAvKiBTYW1lIGFzIHRoZSB3aWR0aCBvZiB0aGUgc2lkZW5hdiAqL1xyXG4gIH1cclxuICAubWFpbkxheW91dHtcclxuICAgIHBhZGRpbmc6IDEwMHB4IDEwcHggMTBweCAxMHB4O1xyXG4gIH1cclxuICAuYm9keXtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIG92ZXJmbG93LXg6IHNjcm9sbDtcclxuICAgIHBhZGRpbmc6IDUwcHggNDBweDtcclxuICB9XHJcbiAgLmhlYWRlcntcclxuICAgIGhlaWdodDogNjZweDtcclxuICAgIHBhZGRpbmc6IDRweCAwcHggMHB4IDBweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xyXG4gIH1cclxuXHJcbiAgXHJcbiAgdGgsIHRkIHtcclxuICAgIHBhZGRpbmc6IDE3cHg7XHJcbiAgfVxyXG4gIFxyXG4gIHRyOm50aC1jaGlsZChldmVuKSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJmMmYyO1xyXG4gIH1cclxuICBoMntcclxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XHJcbiAgICBmb250LXNpemU6IDE3cHg7XHJcbiAgICBsaW5lLWhlaWdodDogMTdweDtcclxuICAgIGxldHRlci1zcGFjaW5nOiAwLjA1ZW07XHJcbiAgfVxyXG5cclxuICAuYnVpbGRpbmdOYW1le1xyXG4gICAgd2lkdGg6IDMwOXB4O1xyXG4gICAgaGVpZ2h0OiAzNnB4O1xyXG4gICAgbGVmdDogOTE3cHg7XHJcbiAgICB0b3A6IDE3MHB4O1xyXG4gICAgYmFja2dyb3VuZDogI0ZGRkZGRjtcclxuICAgIGJveC1zaGFkb3c6IDBweCAxcHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xKSwgMXB4IDBweCA0cHggcmdiYSgwLCAwLCAwLCAwLjEpLCAwcHggLTFweCA0cHggcmdiYSgwLCAwLCAwLCAwLjEpLCAtMXB4IDBweCA0cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gIH1cclxuICBzZWxlY3Qge1xyXG4gICAgd2lkdGg6IDI2OHB4ICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICBsaW5lLWhlaWdodDogMTtcclxuICAgIGJvcmRlcjogMDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweCAhaW1wb3J0YW50O1xyXG4gICAgaGVpZ2h0OiAzNHB4ICFpbXBvcnRhbnQ7XHJcbiAgICAvKiBiYWNrZ3JvdW5kOiB1cmwoLi4vLi4vLi4vYXNzZXRzL29yYW5nZS1kcm9wZG93bi1pY29uLnBuZykgbm8tcmVwZWF0IHJpZ2h0ICFpbXBvcnRhbnQ7ICovXHJcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XHJcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXg6IDIyOXB4ICFpbXBvcnRhbnQ7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDM3cHggMjlweCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uY3JlYXRlLXByb21vLWNvZGUge1xyXG4gIGhlaWdodDogODBweDtcclxufVxyXG5cclxuLmNyZWF0ZS1yZXdhcmQge1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmJvcmRlci1yaWdodCB7XHJcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgcmdiYSg3MiwgNjgsIDY4LCAwLjUpO1xyXG59XHJcblxyXG4ucHJvbW8tY29kZS10ZXh0IHtcclxuICBmb250LXN0eWxlOiBub3JtYWwgIWltcG9ydGFudDtcclxuICBmb250LXdlaWdodDogMzAwICFpbXBvcnRhbnQ7XHJcbiAgZm9udC1zaXplOiAxN3B4ICFpbXBvcnRhbnQ7XHJcbiAgbGluZS1oZWlnaHQ6IDE3cHggIWltcG9ydGFudDtcclxuICBsZXR0ZXItc3BhY2luZzogMC4wNWVtICFpbXBvcnRhbnQ7XHJcbiAgY29sb3I6ICMwMDAwMDAgIWltcG9ydGFudDtcclxufVxyXG5cclxuLmNyZWF0ZS1jb250YWluZXIge1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxudHIge1xyXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGUgIWltcG9ydGFudDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXIgIWltcG9ydGFudDtcclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC1oZWlnaHQ6IDQ1MHB4KSB7XHJcbiAgLnNpZGVuYXYge3BhZGRpbmctdG9wOiAxNXB4O31cclxuICAuc2lkZW5hdiBhIHtmb250LXNpemU6IDE0cHg7ICAgIGN1cnNvcjogcG9pbnRlcjt9XHJcbn0iXX0= */"]
      });
      /***/
    },

    /***/
    45635:
    /*!********************************************!*\
      !*** ./src/app/interceptor/interceptor.ts ***!
      \********************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "Interceptor": function Interceptor() {
          return (
            /* binding */
            _Interceptor
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/common/http */
      91841);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var _services_storage_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../services/storage.service */
      71188);

      var _Interceptor = /*#__PURE__*/function () {
        function _Interceptor(storage) {
          _classCallCheck(this, _Interceptor);

          this.storage = storage;
        }

        _createClass(_Interceptor, [{
          key: "intercept",
          value: function intercept(request, next) {
            var token = this.storage.getAccessToken();

            if (token) {
              var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpHeaders().set("Authorization", "Bearer ".concat(token));
              var AuthRequest = request.clone({
                headers: headers
              });
              return next.handle(AuthRequest);
            } else {
              return next.handle(request);
            }
          }
        }]);

        return _Interceptor;
      }();

      _Interceptor.ɵfac = function Interceptor_Factory(t) {
        return new (t || _Interceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_services_storage_service__WEBPACK_IMPORTED_MODULE_0__.StorageService));
      };

      _Interceptor.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
        token: _Interceptor,
        factory: _Interceptor.ɵfac
      });
      /***/
    },

    /***/
    87501:
    /*!*******************************************!*\
      !*** ./src/app/services/admin.service.ts ***!
      \*******************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AdminService": function AdminService() {
          return (
            /* binding */
            _AdminService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs */
      26215);
      /* harmony import */


      var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/environments/environment */
      92340);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/common/http */
      91841);

      var _AdminService = /*#__PURE__*/function () {
        function _AdminService(http) {
          _classCallCheck(this, _AdminService);

          this.http = http;
          this.buildingList = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(null);
        }

        _createClass(_AdminService, [{
          key: "getBuildingList",
          value: function getBuildingList() {
            var _this22 = this;

            return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url + "getCASLProperty/all").subscribe(function (data) {
              if (data && data.PropertyAddress) {
                _this22.buildingList.next(data['PropertyAddress']);
              }
            });
          }
        }, {
          key: "createUser",
          value: function createUser(obj) {
            var url = src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url;
            return this.http.post(url + 'add/property/user', obj);
          }
        }, {
          key: "signUp",
          value: function signUp(obj) {
            var url = src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url;
            return this.http.post(url + 'rewards/admin/signup', obj);
          }
        }, {
          key: "onLogin",
          value: function onLogin(loginEmail, loginPassword) {
            return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url + 'rewards/admin/login', {
              loginEmail: loginEmail,
              passWord: loginPassword
            });
          }
        }, {
          key: "getUserList",
          value: function getUserList(obj) {
            var url = this.getQueryString(obj);
            return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url + "get/property/users?" + url);
          }
        }, {
          key: "deleteUser",
          value: function deleteUser(number, isEnabled) {
            var url = src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url;
            return this.http.post(url + "remove/property/user?propertyUserId=".concat(number, "&isEnabled=").concat(isEnabled), {});
          }
        }, {
          key: "getRewardTransactions",
          value: function getRewardTransactions(obj) {
            var url = this.getQueryString(obj);
            return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url + "reward/transactions/all?" + url);
          }
        }, {
          key: "getRewardTransactionBasedOnId",
          value: function getRewardTransactionBasedOnId(val) {
            return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url + "property/get/reward/details?rewardId=".concat(val));
          }
        }, {
          key: "getReconciliation",
          value: function getReconciliation(obj) {
            var url = this.getQueryString(obj);
            return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url + "get/reward/report?" + url);
          }
        }, {
          key: "getQueryString",
          value: function getQueryString(query) {
            var queryArray = [];
            var url = '';

            if (query) {
              for (var prop in query) {
                if (query.hasOwnProperty(prop)) {
                  var encode = encodeURIComponent(prop);
                  var encodeVal = encodeURIComponent(query[prop]);

                  if (encodeVal != null && encodeVal != "") {
                    queryArray.push(encode + '=' + encodeVal);
                  }
                }
              }

              if (queryArray && queryArray.length > 0) {
                url = queryArray.join('&');
              }
            }

            return url;
          }
        }, {
          key: "refund",
          value: function refund(rewardId, orderId) {
            return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url + "property/refund/reward?rewardId=".concat(rewardId, "&orderId=").concat(orderId), {});
          }
        }, {
          key: "forgotPassword",
          value: function forgotPassword(email) {
            var queryString = '';
            queryString = "email=".concat(email);
            return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url + 'rewards/admin/forgotPassword?' + queryString);
          }
        }, {
          key: "resetPassword",
          value: function resetPassword(obj) {
            return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url + 'rewards/admin/resetPassword', obj);
          }
        }, {
          key: "getOrderItems",
          value: function getOrderItems(orderId) {
            return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url + "cart/order/summary?reference=".concat(orderId));
          }
        }, {
          key: "reClaimAmount",
          value: function reClaimAmount(id) {
            return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url + "property/reward/reclaim?propertyId=".concat(id), {});
          }
        }, {
          key: "getClaimAmount",
          value: function getClaimAmount() {
            var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var propertyId = id ? "?propertyId=".concat(id) : '';
            return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url + "property/reclaim/get" + "".concat(propertyId));
          }
        }]);

        return _AdminService;
      }();

      _AdminService.ɵfac = function AdminService_Factory(t) {
        return new (t || _AdminService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient));
      };

      _AdminService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
        token: _AdminService,
        factory: _AdminService.ɵfac,
        providedIn: 'root'
      });
      /***/
    },

    /***/
    98063:
    /*!****************************************!*\
      !*** ./src/app/services/auth.guard.ts ***!
      \****************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AuthGuard": function AuthGuard() {
          return (
            /* binding */
            _AuthGuard
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var _storage_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./storage.service */
      71188);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/router */
      39895);

      var _AuthGuard = /*#__PURE__*/function () {
        function _AuthGuard(storage, router) {
          _classCallCheck(this, _AuthGuard);

          this.storage = storage;
          this.router = router;
        }

        _createClass(_AuthGuard, [{
          key: "canActivate",
          value: function canActivate(route, state) {
            if (this.storage.getAccessToken()) {
              return true;
            } else {
              this.router.navigate(['/login']);
              return false;
            }
          }
        }]);

        return _AuthGuard;
      }();

      _AuthGuard.ɵfac = function AuthGuard_Factory(t) {
        return new (t || _AuthGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_storage_service__WEBPACK_IMPORTED_MODULE_0__.StorageService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
      };

      _AuthGuard.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
        token: _AuthGuard,
        factory: _AuthGuard.ɵfac,
        providedIn: 'root'
      });
      /***/
    },

    /***/
    64166:
    /*!*************************************************!*\
      !*** ./src/app/services/client-side.service.ts ***!
      \*************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ClientSideService": function ClientSideService() {
          return (
            /* binding */
            _ClientSideService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/common */
      38583);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      37716);

      var _ClientSideService = /*#__PURE__*/function () {
        function _ClientSideService(platformId) {
          _classCallCheck(this, _ClientSideService);

          this.platformId = platformId;
        }

        _createClass(_ClientSideService, [{
          key: "checkPlatformBrowser",
          value: function checkPlatformBrowser() {
            if ((0, _angular_common__WEBPACK_IMPORTED_MODULE_0__.isPlatformBrowser)(this.platformId)) {
              return true;
            } else {
              return false;
            }
          }
        }]);

        return _ClientSideService;
      }();

      _ClientSideService.ɵfac = function ClientSideService_Factory(t) {
        return new (t || _ClientSideService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.PLATFORM_ID));
      };

      _ClientSideService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
        token: _ClientSideService,
        factory: _ClientSideService.ɵfac,
        providedIn: 'root'
      });
      /***/
    },

    /***/
    81856:
    /*!***********************************************!*\
      !*** ./src/app/services/rewardmgt.service.ts ***!
      \***********************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "RewardmgtService": function RewardmgtService() {
          return (
            /* binding */
            _RewardmgtService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/environments/environment */
      92340);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs */
      26215);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/common/http */
      91841);
      /* harmony import */


      var _storage_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./storage.service */
      71188);

      var _RewardmgtService = /*#__PURE__*/function () {
        function _RewardmgtService(http, storage) {
          _classCallCheck(this, _RewardmgtService);

          this.http = http;
          this.storage = storage;
          this.buildingAmount = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(null);
          this.buildingList = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(null);
          this.loginurl = "http://localhost:3000/login";
          this.signupUrl = "http://localhost:3000/signup";
          this.rewardUrl = "http://localhost:3000/reward";
        }

        _createClass(_RewardmgtService, [{
          key: "getRewardList",
          value: function getRewardList() {
            console.log("Reward List");
            return this.http.get(this.signupUrl);
          }
        }, {
          key: "signUp",
          value: function signUp(obj) {
            var url = src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url;
            return this.http.post(url + 'property/user/signup', obj);
          }
        }, {
          key: "getBuldingList",
          value: function getBuldingList() {
            return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url + "getCASLProperty/all");
          }
        }, {
          key: "onLogin",
          value: function onLogin(loginEmail, loginPassword) {
            return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url + 'property/user/login', {
              loginEmail: loginEmail,
              passWord: loginPassword
            });
          }
        }, {
          key: "createReward",
          value: function createReward(obj, objDate) {
            var url = src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url;
            return this.http.post(url + "property/create/reward?endDate=".concat(objDate.endDate), obj);
          }
        }, {
          key: "getRewards",
          value: function getRewards(searchString) {
            var queryString = '';
            var propertyId = this.storage.getPropertyId();

            if (propertyId) {
              queryString = "?propertyId=".concat(propertyId);
            }

            if (searchString) {
              queryString += "&searchString=".concat(searchString);
            }

            return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url + "property/get/rewards" + queryString);
          }
        }, {
          key: "getRecentlyRewards",
          value: function getRecentlyRewards(query) {
            var queryString = '';
            var propertyId = this.storage.getPropertyId();

            if (propertyId) {
              queryString = "&propertyId=".concat(propertyId);
            }

            if (query.searchString) {
              queryString += "&searchString=".concat(query.searchString);
            }

            return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url + "property/rewards/get?start=".concat(query.start, "&count=").concat(query.count) + queryString + "");
          }
        }, {
          key: "getRewardTransaction",
          value: function getRewardTransaction() {
            return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url + 'property/user/reward/transactions');
          }
        }, {
          key: "getRewardTransactionBasedOnId",
          value: function getRewardTransactionBasedOnId(val) {
            return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url + "property/get/reward/details?rewardId=".concat(val));
          }
        }, {
          key: "loadAmount",
          value: function loadAmount(obj) {
            var queryString;
            queryString = "?propertyId=".concat(obj.id, "&propertyLoadAmount=").concat(obj.amount, "&paymentToken=").concat(obj.token, "&paymentType=").concat(obj.paymentType);
            return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url + 'property/load/amount' + queryString, {});
          }
        }, {
          key: "getBuildingAmount",
          value: function getBuildingAmount(id) {
            var _this23 = this;

            return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url + "property/amount/get?propertyId=".concat(id)).subscribe(function (data) {
              if (data) {
                _this23.buildingAmount.next(data);
              }
            });
          }
        }, {
          key: "forgotPassword",
          value: function forgotPassword(email) {
            var queryString = '';
            queryString = "email=".concat(email);
            return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url + 'property/user/forgotPassword?' + queryString);
          }
        }, {
          key: "resetPassword",
          value: function resetPassword(obj) {
            return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url + 'property/user/resetPassword', obj);
          }
        }, {
          key: "deleteReward",
          value: function deleteReward(id) {
            return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url + "property/delete/reward?rewardId=".concat(id), {});
          }
        }]);

        return _RewardmgtService;
      }();

      _RewardmgtService.ɵfac = function RewardmgtService_Factory(t) {
        return new (t || _RewardmgtService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_storage_service__WEBPACK_IMPORTED_MODULE_1__.StorageService));
      };

      _RewardmgtService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
        token: _RewardmgtService,
        factory: _RewardmgtService.ɵfac,
        providedIn: 'root'
      });
      /***/
    },

    /***/
    71188:
    /*!*********************************************!*\
      !*** ./src/app/services/storage.service.ts ***!
      \*********************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "StorageService": function StorageService() {
          return (
            /* binding */
            _StorageService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      37716);

      var _StorageService = /*#__PURE__*/function () {
        function _StorageService() {
          _classCallCheck(this, _StorageService);
        }

        _createClass(_StorageService, [{
          key: "setUserDetails",
          value: function setUserDetails(data) {
            localStorage.setItem('userDetails', JSON.stringify(data));
          }
        }, {
          key: "getUserDetails",
          value: function getUserDetails() {
            return localStorage.getItem('userDetails');
          }
        }, {
          key: "getUserName",
          value: function getUserName() {
            var userDetails = JSON.parse(this.getUserDetails());
            return "".concat(userDetails['firstName'], " ").concat(userDetails['lastName']);
          }
        }, {
          key: "logOut",
          value: function logOut() {
            localStorage.clear();
          }
        }, {
          key: "getAccessToken",
          value: function getAccessToken() {
            var userDetails = JSON.parse(this.getUserDetails());
            return userDetails ? userDetails['id'] : null;
          }
        }, {
          key: "getPropertyId",
          value: function getPropertyId() {
            var _a;

            var userDetails = JSON.parse(this.getUserDetails());
            return userDetails && userDetails.propertyDataList && userDetails.propertyDataList.length > 0 ? (_a = userDetails.propertyDataList[0]) === null || _a === void 0 ? void 0 : _a.id : null;
          }
        }, {
          key: "getPropertyName",
          value: function getPropertyName() {
            var _a;

            var userDetails = JSON.parse(this.getUserDetails());
            return userDetails.propertyDataList && userDetails.propertyDataList.length > 0 ? (_a = userDetails.propertyDataList[0]) === null || _a === void 0 ? void 0 : _a.name : null;
          }
        }]);

        return _StorageService;
      }();

      _StorageService.ɵfac = function StorageService_Factory(t) {
        return new (t || _StorageService)();
      };

      _StorageService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: _StorageService,
        factory: _StorageService.ɵfac,
        providedIn: 'root'
      });
      /***/
    },

    /***/
    94835:
    /*!**************************************************************************************!*\
      !*** ./src/app/shared/components/admin-table-filter/admin-table-filter.component.ts ***!
      \**************************************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AdminTableFilterComponent": function AdminTableFilterComponent() {
          return (
            /* binding */
            _AdminTableFilterComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/forms */
      3679);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! rxjs/operators */
      54395);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! rxjs/operators */
      87519);
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! moment */
      16738);
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var dayjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! dayjs */
      48873);
      /* harmony import */


      var dayjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__);
      /* harmony import */


      var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! src/app/services/admin.service */
      87501);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/common */
      38583);
      /* harmony import */


      var ngx_daterangepicker_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ngx-daterangepicker-material */
      15048);

      function AdminTableFilterComponent_ng_container_0_option_6_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "option", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var property_r3 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", property_r3 == null ? null : property_r3.id);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](property_r3 == null ? null : property_r3.name);
        }
      }

      function AdminTableFilterComponent_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
          var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "select", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function AdminTableFilterComponent_ng_container_0_Template_select_ngModelChange_3_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r5);

            var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

            return ctx_r4.propertyId = $event;
          })("change", function AdminTableFilterComponent_ng_container_0_Template_select_change_3_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r5);

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

            return ctx_r6.onCategoryChange(ctx_r6.propertyId);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "option", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Select a Building Name");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, AdminTableFilterComponent_ng_container_0_option_6_Template, 2, 2, "option", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "div", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "span", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](11, "i", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](12, "input", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx_r0.propertyId);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r0.buildingList);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formControl", ctx_r0.searchText);
        }
      }

      function AdminTableFilterComponent_ng_container_1_option_6_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "option", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var property_r8 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", property_r8.id);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](property_r8 == null ? null : property_r8.name);
        }
      }

      var _c0 = function _c0() {
        return {
          applyLabel: "ok",
          format: "YYYY-MM-DD"
        };
      };

      function AdminTableFilterComponent_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
          var _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "select", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function AdminTableFilterComponent_ng_container_1_Template_select_ngModelChange_3_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10);

            var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

            return ctx_r9.propertyId = $event;
          })("change", function AdminTableFilterComponent_ng_container_1_Template_select_change_3_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10);

            var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

            return ctx_r11.onCategoryChange(ctx_r11.propertyId);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "option", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Select a Building Name");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, AdminTableFilterComponent_ng_container_1_option_6_Template, 2, 2, "option", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "div", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "span", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](11, "i", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](12, "input", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "div", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "input", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function AdminTableFilterComponent_ng_container_1_Template_input_ngModelChange_14_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10);

            var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

            return ctx_r12.selected = $event;
          })("change", function AdminTableFilterComponent_ng_container_1_Template_input_change_14_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10);

            var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

            return ctx_r13.change($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "div", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "button", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AdminTableFilterComponent_ng_container_1_Template_button_click_16_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10);

            var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

            return ctx_r14.exportPdf();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, "DOWNLOAD REPORT");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx_r1.propertyId);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r1.buildingList);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formControl", ctx_r1.searchText);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("maxDate", ctx_r1.maxDate)("autoApply", true)("closeOnAutoApply", true)("locale", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](8, _c0))("ngModel", ctx_r1.selected);
        }
      }

      var _AdminTableFilterComponent = /*#__PURE__*/function () {
        function _AdminTableFilterComponent(admin) {
          _classCallCheck(this, _AdminTableFilterComponent);

          this.admin = admin;
          this.searchText = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl({
            value: '',
            disabled: true
          });
          this.m = moment__WEBPACK_IMPORTED_MODULE_0__();
          this.myDate = new Date();
          this.nextDay = this.myDate.setDate(this.myDate.getDate() + 1);
          this.maxDate = dayjs__WEBPACK_IMPORTED_MODULE_1__(this.nextDay);
          this.initial = false;
          this.outPutObject = {
            search: '',
            startDate: '',
            endDate: '',
            propertyId: '',
            searchString: ''
          };
          this.disableSearch = true;
          this.propertyId = '';
          this.selectedFilter = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
          this["export"] = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
        }

        _createClass(_AdminTableFilterComponent, [{
          key: "isReconciliation",
          get: function get() {
            return this._isReconciliation;
          },
          set: function set(value) {
            this._isReconciliation = value;
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this24 = this;

            this.getBuidlingList();
            this.searchText.valueChanges.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.debounceTime)(2000), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.distinctUntilChanged)()).subscribe(function (data) {
              if (data || data == '') {
                _this24.outPutObject.searchString = data;

                _this24.selectedFilter.emit(_this24.outPutObject);
              }
            });
          }
        }, {
          key: "getBuidlingList",
          value: function getBuidlingList() {
            var _this25 = this;

            this.admin.buildingList.subscribe(function (data) {
              if (data) {
                _this25.buildingList = data;
              }
            });
          }
        }, {
          key: "onCategoryChange",
          value: function onCategoryChange(val) {
            if (val || val == '') {
              if (val == '') {
                this.searchText.disable({
                  onlySelf: true,
                  emitEvent: false
                });
              } else {
                this.searchText.enable({
                  onlySelf: true,
                  emitEvent: false
                });
              }

              this.outPutObject.propertyId = val;
              this.selectedFilter.emit(this.outPutObject);
            }
          }
        }, {
          key: "formattedDate",
          value: function formattedDate(data) {
            if (data) {
              return "".concat(data.$M + 1, "/").concat(data.$D, "/").concat(data.$y);
            }

            return '';
          }
        }, {
          key: "change",
          value: function change(event) {
            var _a, _b;

            console.log(event);

            if (event.startDate != null && event.endDate != null) {
              this.outPutObject.startDate = this.formattedDate((_a = this.selected) === null || _a === void 0 ? void 0 : _a.startDate);
              this.outPutObject.endDate = this.formattedDate((_b = this.selected) === null || _b === void 0 ? void 0 : _b.endDate);
              this.selectedFilter.emit(this.outPutObject);
            }
          }
        }, {
          key: "exportPdf",
          value: function exportPdf() {
            this["export"].emit(true);
          }
        }]);

        return _AdminTableFilterComponent;
      }();

      _AdminTableFilterComponent.ɵfac = function AdminTableFilterComponent_Factory(t) {
        return new (t || _AdminTableFilterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_2__.AdminService));
      };

      _AdminTableFilterComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
        type: _AdminTableFilterComponent,
        selectors: [["app-admin-table-filter"]],
        inputs: {
          isReconciliation: "isReconciliation"
        },
        outputs: {
          selectedFilter: "selectedFilter",
          "export": "export"
        },
        decls: 2,
        vars: 2,
        consts: [[4, "ngIf"], [1, "row"], [1, "col-5"], ["name", "category", "placeholder", "Select a Building Name", 3, "ngModel", "ngModelChange", "change"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "col-6"], [1, "input-group"], [1, "input-group-prepend"], [1, "input-group-text"], [1, "fas", "fa-search"], ["type", "text", "placeholder", "Search by Property Manager or Email", 1, "form-control", 3, "formControl"], [3, "value"], [1, "row", "align-items-center"], [1, "col-3"], ["data-html2canvas-ignore", "", 1, "col-4"], [1, "input-group", "mb-2"], ["type", "text", "ngxDaterangepickerMd", "", "placeholder", "Select a Reward Date Range", 1, "date-range", "pointer", 3, "maxDate", "autoApply", "closeOnAutoApply", "locale", "ngModel", "ngModelChange", "change"], ["data-html2canvas-ignore", "", 1, "col-2"], [1, "btn", "btn-primary", 3, "click"]],
        template: function AdminTableFilterComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, AdminTableFilterComponent_ng_container_0_Template, 13, 3, "ng-container", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, AdminTableFilterComponent_ng_container_1_Template, 18, 9, "ng-container", 0);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.isReconciliation);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isReconciliation);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgSelectMultipleOption"], _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlDirective, ngx_daterangepicker_material__WEBPACK_IMPORTED_MODULE_8__.DaterangepickerDirective],
        styles: ["select[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 100%;\n  line-height: 1;\n  border: 0;\n  border-radius: 5px !important;\n  background: url('dropdown.svg') no-repeat 98% #ffffff !important;\n  -webkit-appearance: none;\n  outline: none !important;\n  padding: 0.5rem 0.5rem 0.5rem 1.4rem;\n  line-height: 23px;\n  letter-spacing: 0.02em;\n  font-style: normal;\n  font-weight: 300;\n  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1), 1px 0px 4px rgba(0, 0, 0, 0.1), 0px -1px 4px rgba(0, 0, 0, 0.1), -1px 0px 4px rgba(0, 0, 0, 0.1);\n  font-size: 14px;\n}\n\ninput[type=text][_ngcontent-%COMP%] {\n  border: none;\n}\n\ninput[type=text][_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n\n.input-group[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #373737 !important;\n}\n\n.input-group-prepend[_ngcontent-%COMP%] {\n  border-bottom: 0px solid #373737 !important;\n}\n\n.input-group-text[_ngcontent-%COMP%] {\n  border: none;\n  background-color: #ffffff;\n}\n\n.form-control[_ngcontent-%COMP%] {\n  border: none;\n  font-size: 14px;\n}\n\n.date-range[_ngcontent-%COMP%] {\n  background: #ffffff !important;\n  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1), 1px 0px 4px rgba(0, 0, 0, 0.1), 0px -1px 4px rgba(0, 0, 0, 0.1), -1px 0px 4px rgba(0, 0, 0, 0.1);\n  border-radius: 5px !important;\n  width: 100% !important;\n  background: url('calender.svg') no-repeat 98% #ffffff !important;\n  padding: 0.5rem 0.5rem 0.5rem 1.4rem;\n  background-size: 15px 20px !important;\n  font-size: 14px;\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  background: #42a4ec !important;\n  border-radius: 5px;\n  font-size: 12px;\n  line-height: 23px;\n  letter-spacing: 0.02em;\n  color: #fcfcfc;\n  border: none;\n}\n\n.btn[_ngcontent-%COMP%]:focus {\n  outline: none !important;\n  box-shadow: none;\n}\n\n.form-control[_ngcontent-%COMP%] {\n  box-shadow: none;\n}\n\ninput[type=text][_ngcontent-%COMP%]:disabled {\n  background: #dddddd;\n  cursor: not-allowed;\n  pointer-events: all !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluLXRhYmxlLWZpbHRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGVBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtFQUNBLFNBQUE7RUFDQSw2QkFBQTtFQUNBLGdFQUFBO0VBQ0Esd0JBQUE7RUFDQSx3QkFBQTtFQUNBLG9DQUFBO0VBQ0EsaUJBQUE7RUFDQSxzQkFBQTtFQUVBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0SUFBQTtFQUVBLGVBQUE7QUFESjs7QUFJQTtFQUNJLFlBQUE7QUFESjs7QUFJQTtFQUNJLGFBQUE7QUFESjs7QUFJQTtFQUNJLDJDQUFBO0FBREo7O0FBSUE7RUFDSSwyQ0FBQTtBQURKOztBQUlBO0VBQ0ksWUFBQTtFQUNBLHlCQUFBO0FBREo7O0FBSUE7RUFDSSxZQUFBO0VBQ0EsZUFBQTtBQURKOztBQUlBO0VBQ0ksOEJBQUE7RUFDQSw0SUFBQTtFQUVBLDZCQUFBO0VBQ0Esc0JBQUE7RUFDQSxnRUFBQTtFQUNBLG9DQUFBO0VBQ0EscUNBQUE7RUFDQSxlQUFBO0FBRko7O0FBS0E7RUFDSSw4QkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0Esc0JBQUE7RUFDQSxjQUFBO0VBQ0EsWUFBQTtBQUZKOztBQUtBO0VBQ0ksd0JBQUE7RUFDQSxnQkFBQTtBQUZKOztBQUtBO0VBQ0ksZ0JBQUE7QUFGSjs7QUFLQTtFQUNJLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtBQUZKIiwiZmlsZSI6ImFkbWluLXRhYmxlLWZpbHRlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbInNlbGVjdCB7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGxpbmUtaGVpZ2h0OiAxO1xyXG4gICAgYm9yZGVyOiAwO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4ICFpbXBvcnRhbnQ7XHJcbiAgICBiYWNrZ3JvdW5kOiB1cmwoLi4vLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9kcm9wZG93bi5zdmcpIG5vLXJlcGVhdCA5OCUgI2ZmZmZmZiAhaW1wb3J0YW50O1xyXG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xyXG4gICAgb3V0bGluZTogbm9uZSAhaW1wb3J0YW50O1xyXG4gICAgcGFkZGluZzogMC41cmVtIDAuNXJlbSAwLjVyZW0gMS40cmVtO1xyXG4gICAgbGluZS1oZWlnaHQ6IDIzcHg7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogMC4wMmVtO1xyXG4gICAgLy8gY29sb3I6ICM4ZDhkOGQ7XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBmb250LXdlaWdodDogMzAwO1xyXG4gICAgYm94LXNoYWRvdzogMHB4IDFweCA0cHggcmdiKDAgMCAwIC8gMTAlKSwgMXB4IDBweCA0cHggcmdiKDAgMCAwIC8gMTAlKSwgMHB4IC0xcHggNHB4IHJnYigwIDAgMCAvIDEwJSksXHJcbiAgICAgICAgLTFweCAwcHggNHB4IHJnYigwIDAgMCAvIDEwJSk7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbn1cclxuXHJcbmlucHV0W3R5cGU9XCJ0ZXh0XCJdIHtcclxuICAgIGJvcmRlcjogbm9uZTtcclxufVxyXG5cclxuaW5wdXRbdHlwZT1cInRleHRcIl06Zm9jdXMge1xyXG4gICAgb3V0bGluZTogbm9uZTtcclxufVxyXG5cclxuLmlucHV0LWdyb3VwIHtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMzczNzM3ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5pbnB1dC1ncm91cC1wcmVwZW5kIHtcclxuICAgIGJvcmRlci1ib3R0b206IDBweCBzb2xpZCAjMzczNzM3ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5pbnB1dC1ncm91cC10ZXh0IHtcclxuICAgIGJvcmRlcjogbm9uZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XHJcbn1cclxuXHJcbi5mb3JtLWNvbnRyb2wge1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG59XHJcblxyXG4uZGF0ZS1yYW5nZSB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmICFpbXBvcnRhbnQ7XHJcbiAgICBib3gtc2hhZG93OiAwcHggMXB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMSksIDFweCAwcHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xKSwgMHB4IC0xcHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xKSxcclxuICAgICAgICAtMXB4IDBweCA0cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4ICFpbXBvcnRhbnQ7XHJcbiAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xyXG4gICAgYmFja2dyb3VuZDogdXJsKC4uLy4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvY2FsZW5kZXIuc3ZnKSBuby1yZXBlYXQgOTglICNmZmZmZmYgIWltcG9ydGFudDtcclxuICAgIHBhZGRpbmc6IDAuNXJlbSAwLjVyZW0gMC41cmVtIDEuNHJlbTtcclxuICAgIGJhY2tncm91bmQtc2l6ZTogMTVweCAyMHB4ICFpbXBvcnRhbnQ7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbn1cclxuXHJcbi5idG4tcHJpbWFyeSB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjNDJhNGVjICFpbXBvcnRhbnQ7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICBsaW5lLWhlaWdodDogMjNweDtcclxuICAgIGxldHRlci1zcGFjaW5nOiAwLjAyZW07XHJcbiAgICBjb2xvcjogI2ZjZmNmYztcclxuICAgIGJvcmRlcjogbm9uZTtcclxufVxyXG5cclxuLmJ0bjpmb2N1cyB7XHJcbiAgICBvdXRsaW5lOiBub25lICFpbXBvcnRhbnQ7XHJcbiAgICBib3gtc2hhZG93OiBub25lO1xyXG59XHJcblxyXG4uZm9ybS1jb250cm9sIHtcclxuICAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbn1cclxuXHJcbmlucHV0W3R5cGU9XCJ0ZXh0XCJdOmRpc2FibGVkIHtcclxuICAgIGJhY2tncm91bmQ6ICNkZGRkZGQ7XHJcbiAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xyXG4gICAgcG9pbnRlci1ldmVudHM6IGFsbCAhaW1wb3J0YW50O1xyXG59XHJcbiJdfQ== */"]
      });
      /***/
    },

    /***/
    66984:
    /*!********************************************************************!*\
      !*** ./src/app/shared/components/load-cash/load-cash.component.ts ***!
      \********************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "LoadCashComponent": function LoadCashComponent() {
          return (
            /* binding */
            _LoadCashComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/forms */
      3679);
      /* harmony import */


      var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/environments/environment */
      92340);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/router */
      39895);
      /* harmony import */


      var ngx_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ngx-spinner */
      79866);
      /* harmony import */


      var src_app_services_rewardmgt_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! src/app/services/rewardmgt.service */
      81856);
      /* harmony import */


      var src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! src/app/services/storage.service */
      71188);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/common */
      38583);

      function LoadCashComponent_h5_12_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "h5", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "date");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](2, 1, ctx_r0.buildingAmountDetails == null ? null : ctx_r0.buildingAmountDetails.updatedDatetime, "longDate"));
        }
      }

      function LoadCashComponent_h5_13_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "h5", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "-");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }
      }

      function LoadCashComponent_button_22_Template(rf, ctx) {
        if (rf & 1) {
          var _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function LoadCashComponent_button_22_Template_button_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r6);

            var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

            return ctx_r5.promoList();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "RECENTLY CREATED REWARDS");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }
      }

      function LoadCashComponent_ng_container_28_div_8_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Amount is required ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }
      }

      function LoadCashComponent_ng_container_28_div_9_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Enter a valid amount ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }
      }

      function LoadCashComponent_ng_container_28_Template(rf, ctx) {
        if (rf & 1) {
          var _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "h4", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "ENTER AMOUNT ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "p", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Enter the cash amount you would like to load on your account");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "input", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, LoadCashComponent_ng_container_28_div_8_Template, 2, 0, "div", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, LoadCashComponent_ng_container_28_div_9_Template, 2, 0, "div", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "div", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "button", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function LoadCashComponent_ng_container_28_Template_button_click_11_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10);

            var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

            return ctx_r9.submitAmount();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, "CONFIRM");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formControl", ctx_r3.amount);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r3.amount.touched && (ctx_r3.amount == null ? null : ctx_r3.amount.errors == null ? null : ctx_r3.amount.errors.required));

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r3.amount.touched && (ctx_r3.amount == null ? null : ctx_r3.amount.errors == null ? null : ctx_r3.amount.errors.positiveNumber));
        }
      }

      function LoadCashComponent_ng_container_29_Template(rf, ctx) {
        if (rf & 1) {
          var _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "section", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "h5", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function LoadCashComponent_ng_container_29_Template_h5_click_3_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r12);

            var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

            return ctx_r11.amountBlock = !ctx_r11.amountBlock;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "i", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, " AMOUNT BEING LOADED");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "p", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "We will be charging the following amount to your card or bank account:");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "h1", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "section", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "h5", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, "SELECT PAYMENT");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "p", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, "Select a form of payment and proceed to add cash to your CA account");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "select", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function LoadCashComponent_ng_container_29_Template_select_change_16_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r12);

            var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

            return ctx_r13.setMode($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "option", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, "Credit Card/Debit Card");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "option", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](20, "Bank Account");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "button", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function LoadCashComponent_ng_container_29_Template_button_click_21_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r12);

            var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

            ctx_r14.payNow();
            return ctx_r14.amountBlock = true;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](22, "PAY & LOAD CASH");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("$", ctx_r4.amount.value, "");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", ctx_r4.paymentModeCredit);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", ctx_r4.paymentModeBank);
        }
      }

      var _c0 = function _c0(a0, a1) {
        return {
          "col-7": a0,
          "col-5": a1
        };
      };

      var _LoadCashComponent = /*#__PURE__*/function () {
        function _LoadCashComponent(router, spinner, rewardService, storage, renderer) {
          _classCallCheck(this, _LoadCashComponent);

          this.router = router;
          this.spinner = spinner;
          this.rewardService = rewardService;
          this.storage = storage;
          this.renderer = renderer;
          this.payType = 'Credit';
          this.paymentModeCredit = 'Credit';
          this.paymentModeBank = 'Bank';
          this.amountBlock = true;
          this.amount = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required);
        }

        _createClass(_LoadCashComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this26 = this;

            this.amount.valueChanges.subscribe(function (data) {
              if (data) {
                _this26.checkValidity(data);
              }

              if (data == 0) {
                _this26.checkValidity(data);
              }
            });
            this.propertyId = this.storage.getPropertyId();
            this.rewardService.buildingAmount.subscribe(function (data) {
              if (data) {
                _this26.buildingAmountDetails = data;
              }
            });
          }
        }, {
          key: "promoList",
          value: function promoList() {
            this.router.navigate(['/rewards']);
          }
        }, {
          key: "checkValidity",
          value: function checkValidity(value) {
            if (value <= 0) {
              this.amount.setErrors({
                'positiveNumber': true
              });
            } else {
              this.amount.setErrors(null);
            }
          }
        }, {
          key: "submitAmount",
          value: function submitAmount() {
            this.amount.markAllAsTouched();

            if (this.amount.valid) {
              this.amountBlock = !this.amountBlock;
            }
          }
        }, {
          key: "payNow",
          value: function payNow() {
            if (this.payType == 'Credit') {
              this.stripePayment();
            } else {
              this.bankPayment();
            }
          }
        }, {
          key: "stripePayment",
          value: function stripePayment() {
            var self = this;
            var handler = window.StripeCheckout.configure({
              key: src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.stripeKey,
              locale: 'USD',
              token: function token(response) {
                self.spinner.show();
                self.token = response.id;
                self.completePayment();
              },
              closed: function closed() {
                self.renderer.removeStyle(document.body, 'overflow');
              }
            });
            var amountInCents = Math.floor(self.amount.value * 100);
            handler.open({
              name: 'Inhabitr',
              currency: 'USD',
              amount: amountInCents
            });
          }
        }, {
          key: "setMode",
          value: function setMode(event) {
            this.payType = event.target.value;
          }
        }, {
          key: "completePayment",
          value: function completePayment() {
            var _this27 = this;

            var obj = {
              id: this.propertyId,
              amount: this.amount.value,
              token: this.token,
              paymentType: this.payType == 'Credit' ? 'CARD' : 'BANK'
            };
            this.rewardService.loadAmount(obj).subscribe(function (data) {
              if (data) {
                _this27.rewardService.getBuildingAmount(_this27.propertyId);

                _this27.spinner.hide();

                _this27.amount.reset();

                _this27.renderer.removeStyle(document.body, 'overflow'); // this.router.navigate(['/create-reward']);

              }
            }, function (err) {
              _this27.spinner.hide();
            });
          }
        }, {
          key: "bankPayment",
          value: function bankPayment() {
            var self = this;
            var handler = window.Plaid.create({
              env: 'sandbox',
              clientName: 'Inhabitr',
              key: '74ca8ca3dead06d399c082d47e9a1d',
              product: ['auth'],
              selectAccount: true,
              onLoad: function onLoad() {},
              onSuccess: function onSuccess(publicToken, metadata) {
                self.spinner.show();
                self.token = publicToken;
                self.completePayment();
              },
              onExit: function onExit(err, metadata) {
                self.spinner.hide();
                self.renderer.removeStyle(document.body, 'overflow');

                if (err != null) {}
              },
              onEvent: function onEvent(eventName, metadata) {
                self.spinner.hide();
                self.renderer.removeStyle(document.body, 'overflow');
              }
            });
            handler.open();
          }
        }]);

        return _LoadCashComponent;
      }();

      _LoadCashComponent.ɵfac = function LoadCashComponent_Factory(t) {
        return new (t || _LoadCashComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](ngx_spinner__WEBPACK_IMPORTED_MODULE_6__.NgxSpinnerService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_rewardmgt_service__WEBPACK_IMPORTED_MODULE_1__.RewardmgtService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_2__.StorageService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.Renderer2));
      };

      _LoadCashComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
        type: _LoadCashComponent,
        selectors: [["app-load-cash"]],
        inputs: {
          showRewards: "showRewards"
        },
        decls: 30,
        vars: 11,
        consts: [[1, "cash-container"], [1, "card", "text-center"], [1, "card-body"], [1, "row"], [1, "col", "border-end"], [1, "title-font"], [1, "fw-bold"], ["class", "fw-bold", 4, "ngIf"], [1, "d-flex", "flex-row", "align-items-center", "justify-content-around", 3, "ngClass"], ["data-bs-toggle", "modal", "data-bs-target", "#loadCash", 1, "btn", "btn-success"], ["class", "btn btn-dark", 3, "click", 4, "ngIf"], ["id", "loadCash", "tabindex", "-1", "aria-labelledby", "loadCashLabel", "aria-hidden", "true", 1, "modal", "fade"], [1, "modal-dialog"], [1, "modal-content", "p-4", "header-style"], [1, "modal-header", "border-0"], ["type", "button", "data-bs-dismiss", "modal", "aria-label", "Close", 1, "btn-close", 3, "click"], [4, "ngIf"], [1, "btn", "btn-dark", 3, "click"], [1, "modal-body", "text-left"], [1, "pb-2"], [1, "mt-3"], [1, "form-group"], ["type", "number", "placeholder", "$ Enter dollar amount", 1, "pass_recovery", "form-control", "p-4", 3, "formControl"], ["class", "mt-2", 4, "ngIf"], [1, "modal-footer", "justify-content-between", "border-0", "payment"], ["type", "button", 1, "btn", "btn_theme", 3, "click"], [1, "mt-2"], [1, ""], [1, "pointer", "pb-2", 3, "click"], [1, "fas", "fa-arrow-left", "theme-color"], [1, "pb-5", "fw-bold", "border-bottom"], [1, "mb-3", "mt-5"], [1, "modal-footer", "justify-content-between", "align-items-center", "border-0", "payment"], ["placeholder", "Select a Payment Option", 1, "ml-unpaid", 3, "change"], [3, "value"], ["type", "button", "data-bs-dismiss", "modal", 1, "btn", "btn-primary", 3, "click"]],
        template: function LoadCashComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "p", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "Amount Loaded");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "h5", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "p", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "Date");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](12, LoadCashComponent_h5_12_Template, 3, 4, "h5", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](13, LoadCashComponent_h5_13_Template, 2, 0, "h5", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "div", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "section");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "p", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, "Available Balance");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "h5", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "button", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21, "LOAD CASH");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](22, LoadCashComponent_button_22_Template, 2, 0, "button", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "div", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "div", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "div", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](26, "div", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "button", 15);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function LoadCashComponent_Template_button_click_27_listener() {
              ctx.amount.reset();
              return ctx.amountBlock = true;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](28, LoadCashComponent_ng_container_28_Template, 13, 3, "ng-container", 16);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](29, LoadCashComponent_ng_container_29_Template, 23, 3, "ng-container", 16);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("$", ctx.buildingAmountDetails && (ctx.buildingAmountDetails == null ? null : ctx.buildingAmountDetails.loadedAmount) ? ctx.buildingAmountDetails == null ? null : ctx.buildingAmountDetails.loadedAmount : " 0", "");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.buildingAmountDetails && (ctx.buildingAmountDetails == null ? null : ctx.buildingAmountDetails.updatedDatetime));

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.buildingAmountDetails && !(ctx.buildingAmountDetails == null ? null : ctx.buildingAmountDetails.updatedDatetime));

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction2"](8, _c0, ctx.showRewards == true, ctx.showRewards == false));

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("$", ctx.buildingAmountDetails && (ctx.buildingAmountDetails == null ? null : ctx.buildingAmountDetails.balanceAmount) ? ctx.buildingAmountDetails == null ? null : ctx.buildingAmountDetails.balanceAmount : " 0", "");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.showRewards);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.amountBlock);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.amountBlock);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgClass, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgSelectMultipleOption"]],
        pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.DatePipe],
        styles: [".card[_ngcontent-%COMP%] {\r\n    background-color: #f3f3f3 !important;\r\n    padding: 5px;\r\n}\r\n.btn-dark[_ngcontent-%COMP%] {\r\n    padding:10px;\r\n}\r\n.btn[_ngcontent-%COMP%] {\r\n    font-style: normal;\r\n    font-weight: bold;\r\n    font-size: 14px;\r\n    line-height: 20px;\r\n    letter-spacing: 0.03em;\r\n    color: #ffffff;\r\n    \r\n}\r\n.btn-success[_ngcontent-%COMP%] {\r\n    background-color: #42A4EC;\r\n    border: none !important;\r\n    box-shadow: none !important;\r\n    padding:10px;\r\n}\r\n.btn-primary[_ngcontent-%COMP%] {\r\n    background-color: #2CBA65;\r\n    border: none !important;\r\n    box-shadow: none !important;\r\n    padding:15px;\r\n}\r\n.pass_recovery[_ngcontent-%COMP%] {\r\n    background-color: #f2f2f2 !important;\r\n    box-shadow: none;\r\n    border-radius: 5px;\r\n    border:none;\r\n    color: black !important;\r\n}\r\n.btn_theme[_ngcontent-%COMP%] {\r\n    width:60% !important;\r\n    border-radius: 5px;\r\n}\r\n.modal-dialog[_ngcontent-%COMP%] {\r\n    max-width: 700px !important;\r\n}\r\n.invalid-feedback[_ngcontent-%COMP%] {\r\n    color:black;\r\n}\r\nselect[_ngcontent-%COMP%] {\r\n    width: 60% !important;\r\n    height: 47px;\r\n    background: url('dropicon-payment.png') no-repeat 99% !important;\r\n    background-size: 35px 35px !important;\r\n    -webkit-appearance: none;\r\n    border-color: snow;\r\n    padding: 10px;\r\n    border-radius: 10px !important;\r\n    background-color: #F3F3F3 !important;\r\n}\r\n.title-font[_ngcontent-%COMP%] {\r\n    font-size: 15px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWQtY2FzaC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksb0NBQW9DO0lBQ3BDLFlBQVk7QUFDaEI7QUFDQTtJQUNJLFlBQVk7QUFDaEI7QUFDQTtJQUNJLGtCQUFrQjtJQUNsQixpQkFBaUI7SUFDakIsZUFBZTtJQUNmLGlCQUFpQjtJQUNqQixzQkFBc0I7SUFDdEIsY0FBYztJQUNkLHdCQUF3QjtBQUM1QjtBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLHVCQUF1QjtJQUN2QiwyQkFBMkI7SUFDM0IsWUFBWTtBQUNoQjtBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLHVCQUF1QjtJQUN2QiwyQkFBMkI7SUFDM0IsWUFBWTtBQUNoQjtBQUVBO0lBQ0ksb0NBQW9DO0lBQ3BDLGdCQUFnQjtJQUNoQixrQkFBa0I7SUFDbEIsV0FBVztJQUNYLHVCQUF1QjtBQUMzQjtBQUVBO0lBQ0ksb0JBQW9CO0lBQ3BCLGtCQUFrQjtBQUN0QjtBQUVBO0lBQ0ksMkJBQTJCO0FBQy9CO0FBRUE7SUFDSSxXQUFXO0FBQ2Y7QUFFQTtJQUNJLHFCQUFxQjtJQUNyQixZQUFZO0lBQ1osZ0VBQWlGO0lBQ2pGLHFDQUFxQztJQUNyQyx3QkFBd0I7SUFDeEIsa0JBQWtCO0lBQ2xCLGFBQWE7SUFDYiw4QkFBOEI7SUFDOUIsb0NBQW9DO0FBQ3hDO0FBRUE7SUFDSSxlQUFlO0FBQ25CIiwiZmlsZSI6ImxvYWQtY2FzaC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNhcmQge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2YzZjNmMyAhaW1wb3J0YW50O1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG59XHJcbi5idG4tZGFyayB7XHJcbiAgICBwYWRkaW5nOjEwcHg7XHJcbn1cclxuLmJ0biB7XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMDNlbTtcclxuICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgLyogcGFkZGluZzogMTBweCAyMHB4OyAqL1xyXG59XHJcblxyXG4uYnRuLXN1Y2Nlc3Mge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzQyQTRFQztcclxuICAgIGJvcmRlcjogbm9uZSAhaW1wb3J0YW50O1xyXG4gICAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xyXG4gICAgcGFkZGluZzoxMHB4O1xyXG59XHJcblxyXG4uYnRuLXByaW1hcnkge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzJDQkE2NTtcclxuICAgIGJvcmRlcjogbm9uZSAhaW1wb3J0YW50O1xyXG4gICAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xyXG4gICAgcGFkZGluZzoxNXB4O1xyXG59XHJcblxyXG4ucGFzc19yZWNvdmVyeSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJmMmYyICFpbXBvcnRhbnQ7XHJcbiAgICBib3gtc2hhZG93OiBub25lO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgYm9yZGVyOm5vbmU7XHJcbiAgICBjb2xvcjogYmxhY2sgIWltcG9ydGFudDtcclxufVxyXG5cclxuLmJ0bl90aGVtZSB7XHJcbiAgICB3aWR0aDo2MCUgIWltcG9ydGFudDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG5cclxuLm1vZGFsLWRpYWxvZyB7XHJcbiAgICBtYXgtd2lkdGg6IDcwMHB4ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5pbnZhbGlkLWZlZWRiYWNrIHtcclxuICAgIGNvbG9yOmJsYWNrO1xyXG59XHJcblxyXG5zZWxlY3Qge1xyXG4gICAgd2lkdGg6IDYwJSAhaW1wb3J0YW50O1xyXG4gICAgaGVpZ2h0OiA0N3B4O1xyXG4gICAgYmFja2dyb3VuZDogdXJsKC4uLy4uLy4uLy4uL2Fzc2V0cy9kcm9waWNvbi1wYXltZW50LnBuZykgbm8tcmVwZWF0IDk5JSAhaW1wb3J0YW50O1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiAzNXB4IDM1cHggIWltcG9ydGFudDtcclxuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcclxuICAgIGJvcmRlci1jb2xvcjogc25vdztcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4ICFpbXBvcnRhbnQ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjNGM0YzICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi50aXRsZS1mb250IHtcclxuICAgIGZvbnQtc2l6ZTogMTVweDtcclxufVxyXG5cclxuIl19 */"]
      });
      /***/
    },

    /***/
    72580:
    /*!**************************************************************************!*\
      !*** ./src/app/shared/components/refund-items/refund-items.component.ts ***!
      \**************************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "RefundItemsComponent": function RefundItemsComponent() {
          return (
            /* binding */
            _RefundItemsComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/router */
      39895);
      /* harmony import */


      var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/app/services/admin.service */
      87501);
      /* harmony import */


      var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ngx-spinner */
      79866);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/common */
      38583);

      function RefundItemsComponent_ng_container_8_ng_container_14_p_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Returned");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      }

      function RefundItemsComponent_ng_container_8_ng_container_14_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, RefundItemsComponent_ng_container_8_ng_container_14_p_1_Template, 2, 0, "p", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var items_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (items_r3 == null ? null : items_r3.packageProducts[0] == null ? null : items_r3.packageProducts[0].returnStatus) == "INITIATED" || (items_r3 == null ? null : items_r3.packageProducts[0] == null ? null : items_r3.packageProducts[0].returnStatus) == "IN-PROGRESS" || (items_r3 == null ? null : items_r3.packageProducts[0] == null ? null : items_r3.packageProducts[0].returnStatus) == "RETURN_COMPLETED");
        }
      }

      function RefundItemsComponent_ng_container_8_div_15_ng_container_4_ng_container_4_p_12_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Returned");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      }

      function RefundItemsComponent_ng_container_8_div_15_ng_container_4_ng_container_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "img", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "section");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "p", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "p", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](11, "number");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, RefundItemsComponent_ng_container_8_div_15_ng_container_4_ng_container_4_p_12_Template, 2, 0, "p", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var packageItems_r11 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("src", packageItems_r11.productImage, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](packageItems_r11 == null ? null : packageItems_r11.productName);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Full Price : $", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](11, 4, packageItems_r11 == null ? null : packageItems_r11.price, "1.0-0"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (packageItems_r11 == null ? null : packageItems_r11.returnStatus) == "INITIATED" || (packageItems_r11 == null ? null : packageItems_r11.returnStatus) == "IN-PROGRESS" || (packageItems_r11 == null ? null : packageItems_r11.returnStatus) == "RETURN_COMPLETED");
        }
      }

      function RefundItemsComponent_ng_container_8_div_15_ng_container_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "hr");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, RefundItemsComponent_ng_container_8_div_15_ng_container_4_ng_container_4_Template, 13, 7, "ng-container", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var items_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", items_r3 == null ? null : items_r3.packageProducts);
        }
      }

      function RefundItemsComponent_ng_container_8_div_15_Template(rf, ctx) {
        if (rf & 1) {
          var _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Items included in this set ");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "i", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function RefundItemsComponent_ng_container_8_div_15_Template_i_click_3_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r16);

            var items_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;

            var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

            return ctx_r14.productdisplayCart(items_r3.id);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, RefundItemsComponent_ng_container_8_div_15_ng_container_4_Template, 5, 1, "ng-container", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var items_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;

          var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r6.isproductshow && ctx_r6.productId === items_r3.id);
        }
      }

      function RefundItemsComponent_ng_container_8_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "img", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "section");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "p", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "p", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "p", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](14, RefundItemsComponent_ng_container_8_ng_container_14_Template, 2, 1, "ng-container", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](15, RefundItemsComponent_ng_container_8_div_15_Template, 5, 1, "div", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var items_r3 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("src", items_r3.itemImageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](items_r3 == null ? null : items_r3.itemName);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Full Price: $", items_r3 == null ? null : items_r3.itemOriginalPrice, "");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Quantity: ", items_r3 == null ? null : items_r3.itemQuantity, "");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (items_r3 == null ? null : items_r3.itemType) == "PRODUCT");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (items_r3 == null ? null : items_r3.itemType) == "PACKAGE");
        }
      }

      function RefundItemsComponent_ng_container_32_p_12_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "span", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Card Refund: ");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" $", (ctx_r18.orderData == null ? null : ctx_r18.orderData.refundStripeTotal) ? ctx_r18.orderData == null ? null : ctx_r18.orderData.refundStripeTotal : "0", "");
        }
      }

      function RefundItemsComponent_ng_container_32_p_13_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "span", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Bank Refund: ");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" $", (ctx_r19.orderData == null ? null : ctx_r19.orderData.refundStripeTotal) ? ctx_r19.orderData == null ? null : ctx_r19.orderData.refundStripeTotal : "0", "");
        }
      }

      function RefundItemsComponent_ng_container_32_p_14_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "span", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Affirm Refund: ");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" $", (ctx_r20.orderData == null ? null : ctx_r20.orderData.refundStripeTotal) ? ctx_r20.orderData == null ? null : ctx_r20.orderData.refundStripeTotal : "0", "");
        }
      }

      function RefundItemsComponent_ng_container_32_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "section", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Reward Refund: ");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "span", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Success");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, RefundItemsComponent_ng_container_32_p_12_Template, 5, 1, "p", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, RefundItemsComponent_ng_container_32_p_13_Template, 5, 1, "p", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](14, RefundItemsComponent_ng_container_32_p_14_Template, 5, 1, "p", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "span", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Pending");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("$", (ctx_r1.orderData == null ? null : ctx_r1.orderData.refundRewardTotal) ? ctx_r1.orderData == null ? null : ctx_r1.orderData.refundRewardTotal : "0", " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (ctx_r1.orderData == null ? null : ctx_r1.orderData.paymentType) == "CARD,REWARD" || (ctx_r1.orderData == null ? null : ctx_r1.orderData.paymentType) == "CARD");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (ctx_r1.orderData == null ? null : ctx_r1.orderData.paymentType) == "BANK,REWARD" || (ctx_r1.orderData == null ? null : ctx_r1.orderData.paymentType) == "BANK");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (ctx_r1.orderData == null ? null : ctx_r1.orderData.paymentType) == "AFFIRM,REWARD" || (ctx_r1.orderData == null ? null : ctx_r1.orderData.paymentType) == "AFFIRM");
        }
      }

      function RefundItemsComponent_ng_container_33_Template(rf, ctx) {
        if (rf & 1) {
          var _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "button", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function RefundItemsComponent_ng_container_33_Template_button_click_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r22);

            var ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

            return ctx_r21.refundComplete();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "REFUND");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        }
      }

      var _RefundItemsComponent = /*#__PURE__*/function () {
        function _RefundItemsComponent(route, _router, adminService, spinner) {
          _classCallCheck(this, _RefundItemsComponent);

          this.route = route;
          this._router = _router;
          this.adminService = adminService;
          this.spinner = spinner;
          this.isproductshow = false;
        }

        _createClass(_RefundItemsComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this28 = this;

            this.route.params.subscribe(function (data) {
              if (data.id && data.orderId) {
                _this28.rewardId = data.id;
                _this28.orderId = data.orderId;

                _this28.getOrderList();
              }
            });
            this.route.queryParams.subscribe(function (data) {
              if (data.admin) {
                _this28.admin = data.admin;
              }
            });
          }
        }, {
          key: "productdisplayCart",
          value: function productdisplayCart(i) {
            this.isproductshow = !this.isproductshow;
            this.productId = i;
          }
        }, {
          key: "goBack",
          value: function goBack() {
            if (this.admin == "true") {
              this._router.navigate(['/reward-details/transactions', this.rewardId]);
            } else {
              this._router.navigate(['/superadmin/dashboard/transactions', this.rewardId]);
            }
          }
        }, {
          key: "getOrderList",
          value: function getOrderList() {
            var _this29 = this;

            this.spinner.show();
            this.adminService.getOrderItems(this.orderId).subscribe(function (data) {
              if (data && data.orderItems) {
                _this29.orderData = data;
                _this29.orderItems = data.orderItems;
                _this29.rewardAmount = _this29.calculateRefundAmount(_this29.orderItems);
                _this29.rewardRefund = _this29.getActualRefundAmount(); // this.refundToCard = Math.abs(this.rewardAmount - this.orderData?.totalRewardAmount);

                _this29.spinner.hide();
              }
            }, function (err) {
              _this29.spinner.hide();
            });
          }
        }, {
          key: "getActualRefundAmount",
          value: function getActualRefundAmount() {
            if (this.orderData.totalRewardAmount < this.rewardAmount) return this.orderData.totalRewardAmount;else return this.rewardAmount;
          }
        }, {
          key: "calculateRefundAmount",
          value: function calculateRefundAmount(orderItems) {
            var packageItems = [];
            var totalOrderItems = [];
            var totalPrice = 0;
            orderItems.forEach(function (element) {
              if (element && element.packageProducts && element.packageProducts.length) {
                element.packageProducts.forEach(function (item) {
                  if (item) {
                    item.itemQuantity = element.itemQuantity;
                    packageItems === null || packageItems === void 0 ? void 0 : packageItems.push(item);
                  }
                });
              } // else {
              //   totalOrderItems?.push(element)
              // };

            });
            var price = packageItems.filter(function (data) {
              if (data) {
                return data && (data === null || data === void 0 ? void 0 : data.returnStatus) == "INITIATED" || (data === null || data === void 0 ? void 0 : data.returnStatus) == "IN-PROGRESS" || (data === null || data === void 0 ? void 0 : data.returnStatus) == "RETURN_COMPLETED";
              }
            }).reduce(function (acc, item) {
              return acc + Math.round(item.price * item.itemQuantity);
            }, 0);
            price ? totalPrice += price : totalPrice = totalPrice; // const itemPrice = totalOrderItems.filter((data: any) => {
            //   if (data) {
            //     return (data && data?.returnStatus == "INITIATED" || data?.returnStatus == "IN-PROGRESS" || data?.returnStatus == "COMPLETED")
            //   }
            // }).reduce((acc: any, item: any) => {
            //   return acc + Math.round(item.itemOriginalPrice)
            // }, 0);
            // itemPrice ? totalPrice += itemPrice : totalPrice = totalPrice;

            return totalPrice;
          }
        }, {
          key: "refundComplete",
          value: function refundComplete() {
            var _this30 = this;

            this.spinner.show();
            this.adminService.refund(this.rewardId, this.orderId).subscribe(function (data) {
              if (data) {
                _this30.getOrderList();

                _this30.spinner.hide();
              }
            }, function (err) {
              _this30.spinner.hide();
            });
          }
        }]);

        return _RefundItemsComponent;
      }();

      _RefundItemsComponent.ɵfac = function RefundItemsComponent_Factory(t) {
        return new (t || _RefundItemsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_0__.AdminService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](ngx_spinner__WEBPACK_IMPORTED_MODULE_3__.NgxSpinnerService));
      };

      _RefundItemsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _RefundItemsComponent,
        selectors: [["app-refund-items"]],
        decls: 34,
        vars: 7,
        consts: [[1, "refund"], [1, "fas", "fa-arrow-left", "fa-1x", "theme-color", "pointer", 2, "margin-right", "10px", 3, "click"], [1, "card"], [1, "card-body"], [1, "row"], [1, "col-lg-8", "col-md-12", "col-12"], [4, "ngFor", "ngForOf"], [1, "col-lg-4", "col-md-12", "col-12"], [1, "fw-bold"], [4, "ngIf"], [1, "row", "mb-4"], [1, "col-lg-9", "col-md-6", "col-12", "d-flex"], [1, "d-flex", "flex-row", "align-items-center"], [1, "img-container"], [3, "src"], [1, "content"], [1, "fw-bold", "m-0"], [1, "mt-2", "mb-2"], ["class", "row mt-4 mb-4", 4, "ngIf"], ["class", "mt-2 mb-2 fw-bold", 4, "ngIf"], [1, "mt-2", "mb-2", "fw-bold"], [1, "row", "mt-4", "mb-4"], [1, "fas", "fa-chevron-down", 3, "click"], ["clas", "col-8"], [1, "col-lg-8", "col-md-6", "col-12", "d-flex", "mt-2", "mb-2", "included-set"], [1, "margin-refund"], [1, "d-flex", "flex-row", "justify-content-between"], [1, "badge", "rounded-pill", "bg-success"], [1, "badge", "rounded-pill", "bg-dark"], [1, "btn", "btn-primary", 3, "click"]],
        template: function RefundItemsComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h4");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "i", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function RefundItemsComponent_Template_i_click_2_listener() {
              return ctx.goBack();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Refund Item(s)");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, RefundItemsComponent_ng_container_8_Template, 16, 6, "ng-container", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](10);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "section");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "span", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Total Order Amount: ");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "span");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "span", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, "Reward Payment: ");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "span");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "span", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](24, "Card/Bank/Affirm: ");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "span");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "span", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](29, "Refund Total Amount: ");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "span");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](31);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](32, RefundItemsComponent_ng_container_32_Template, 18, 4, "ng-container", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](33, RefundItemsComponent_ng_container_33_Template, 3, 0, "ng-container", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.orderItems);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("$", (ctx.orderData == null ? null : ctx.orderData.total) ? ctx.orderData == null ? null : ctx.orderData.total : "0", "");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("$", (ctx.orderData == null ? null : ctx.orderData.totalRewardAmount) ? ctx.orderData == null ? null : ctx.orderData.totalRewardAmount : "0", "");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("$", (ctx.orderData == null ? null : ctx.orderData.totalCartPaymentAmount) ? ctx.orderData == null ? null : ctx.orderData.totalCartPaymentAmount : "0", "");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("$", ctx.rewardAmount ? ctx.rewardAmount : "0", "");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (ctx.orderData == null ? null : ctx.orderData.returnStatus) == "RETURN_COMPLETED" || (ctx.orderData == null ? null : ctx.orderData.refundRewardTotal));

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (ctx.orderData == null ? null : ctx.orderData.returnStatus) == "IN-PROGRESS");
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf],
        pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.DecimalPipe],
        styles: [".card[_ngcontent-%COMP%] {\r\n    background-color: #f8f8f8;\r\n    margin-left: 80px;\r\n    margin-right: 80px;\r\n    margin-top: 20px;\r\n}\r\n\r\n.refund[_ngcontent-%COMP%] {\r\n    margin-left: 80px;\r\n    margin-right: 80px;\r\n    margin-top: 20px;\r\n}\r\n\r\n.btn-primary[_ngcontent-%COMP%] {\r\n    background-color: #10a428;\r\n    border: 0;\r\n    border-radius: 5px;\r\n    font-size: 18px;\r\n    width: 60%;\r\n}\r\n\r\n.btn[_ngcontent-%COMP%]:focus {\r\n    outline: none !important;\r\n    box-shadow: none;\r\n}\r\n\r\n.img-container[_ngcontent-%COMP%] {\r\n    background: #ffffff;\r\n    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);\r\n    border-radius: 5px;\r\n\r\n}\r\n\r\n.card-body[_ngcontent-%COMP%] {\r\n    padding: 50px;\r\n\r\n}\r\n\r\n.content[_ngcontent-%COMP%] {\r\n    margin-left: 20px;\r\n}\r\n\r\n.included-set[_ngcontent-%COMP%] {\r\n    margin-left: 90px;\r\n}\r\n\r\nimg[_ngcontent-%COMP%] {\r\n    height: 150px;\r\n    width: 150px;\r\n    padding: 10px;\r\n}\r\n\r\n.badge[_ngcontent-%COMP%] {\r\n    font-size: 1rem !important;\r\n    padding: 0.5em 0.65em !important;\r\n}\r\n\r\n.margin-refund[_ngcontent-%COMP%] {\r\n    margin-top: 30px;\r\n    margin-bottom: 25px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZnVuZC1pdGVtcy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0kseUJBQXlCO0lBQ3pCLGlCQUFpQjtJQUNqQixrQkFBa0I7SUFDbEIsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSx5QkFBeUI7SUFDekIsU0FBUztJQUNULGtCQUFrQjtJQUNsQixlQUFlO0lBQ2YsVUFBVTtBQUNkOztBQUVBO0lBQ0ksd0JBQXdCO0lBQ3hCLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLG1CQUFtQjtJQUNuQiwyQ0FBMkM7SUFDM0Msa0JBQWtCOztBQUV0Qjs7QUFFQTtJQUNJLGFBQWE7O0FBRWpCOztBQUVBO0lBQ0ksaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLFlBQVk7SUFDWixhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksMEJBQTBCO0lBQzFCLGdDQUFnQztBQUNwQzs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixtQkFBbUI7QUFDdkIiLCJmaWxlIjoicmVmdW5kLWl0ZW1zLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2FyZCB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmOGY4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDgwcHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDgwcHg7XHJcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xyXG59XHJcblxyXG4ucmVmdW5kIHtcclxuICAgIG1hcmdpbi1sZWZ0OiA4MHB4O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA4MHB4O1xyXG4gICAgbWFyZ2luLXRvcDogMjBweDtcclxufVxyXG5cclxuLmJ0bi1wcmltYXJ5IHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMxMGE0Mjg7XHJcbiAgICBib3JkZXI6IDA7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICB3aWR0aDogNjAlO1xyXG59XHJcblxyXG4uYnRuOmZvY3VzIHtcclxuICAgIG91dGxpbmU6IG5vbmUgIWltcG9ydGFudDtcclxuICAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbn1cclxuXHJcbi5pbWctY29udGFpbmVyIHtcclxuICAgIGJhY2tncm91bmQ6ICNmZmZmZmY7XHJcbiAgICBib3gtc2hhZG93OiAwcHggMHB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG5cclxufVxyXG5cclxuLmNhcmQtYm9keSB7XHJcbiAgICBwYWRkaW5nOiA1MHB4O1xyXG5cclxufVxyXG5cclxuLmNvbnRlbnQge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDIwcHg7XHJcbn1cclxuXHJcbi5pbmNsdWRlZC1zZXQge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDkwcHg7XHJcbn1cclxuXHJcbmltZyB7XHJcbiAgICBoZWlnaHQ6IDE1MHB4O1xyXG4gICAgd2lkdGg6IDE1MHB4O1xyXG4gICAgcGFkZGluZzogMTBweDtcclxufVxyXG5cclxuLmJhZGdlIHtcclxuICAgIGZvbnQtc2l6ZTogMXJlbSAhaW1wb3J0YW50O1xyXG4gICAgcGFkZGluZzogMC41ZW0gMC42NWVtICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5tYXJnaW4tcmVmdW5kIHtcclxuICAgIG1hcmdpbi10b3A6IDMwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAyNXB4O1xyXG59Il19 */"]
      });
      /***/
    },

    /***/
    11450:
    /*!**************************************************************************!*\
      !*** ./src/app/shared/components/table-filter/table-filter.component.ts ***!
      \**************************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "TableFilterComponent": function TableFilterComponent() {
          return (
            /* binding */
            _TableFilterComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/forms */
      3679);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs/operators */
      54395);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! rxjs/operators */
      87519);
      /* harmony import */


      var _services_storage_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../services/storage.service */
      71188);

      var _TableFilterComponent = /*#__PURE__*/function () {
        function _TableFilterComponent(storageService) {
          _classCallCheck(this, _TableFilterComponent);

          this.storageService = storageService;
          this.searchInputChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
          this.searchText = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControl();
        }

        _createClass(_TableFilterComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this31 = this;

            this.searchText.valueChanges.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.debounceTime)(2000), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.distinctUntilChanged)()).subscribe(function (data) {
              if (data || data == '') {
                _this31.searchInputChange.emit(data);
              }
            });
          }
        }]);

        return _TableFilterComponent;
      }();

      _TableFilterComponent.ɵfac = function TableFilterComponent_Factory(t) {
        return new (t || _TableFilterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_storage_service__WEBPACK_IMPORTED_MODULE_0__.StorageService));
      };

      _TableFilterComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _TableFilterComponent,
        selectors: [["app-table-filter"]],
        outputs: {
          searchInputChange: "searchInputChange"
        },
        decls: 7,
        vars: 1,
        consts: [[1, "row"], [1, "col-lg-7"], [1, "input-group", "mb-3"], [1, "input-group-prepend"], [1, "input-group-text"], [1, "fas", "fa-search"], ["type", "text", "placeholder", "Search by Resident Name , Building Name", 1, "form-control", 3, "formControl"]],
        template: function TableFilterComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "i", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "input", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControl", ctx.searchText);
          }
        },
        directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlDirective],
        styles: ["select[_ngcontent-%COMP%] {\r\n    font-size: 16px;\r\n    width: 100%;\r\n    height: 36px;\r\n    line-height: 1;\r\n    border: 0;\r\n    border-radius: 5px !important;\r\n    height: 34px !important;\r\n    background: url('orange-dropdown-icon.png') no-repeat 98% #FFFFFF !important;\r\n    -webkit-appearance: none;\r\n    background-size: 26px 21px !important;\r\n    outline:none !important;padding:5px;\r\n    line-height: 23px;\r\n    letter-spacing: 0.02em;\r\n    color: #8D8D8D;\r\n    font-style: normal;\r\n    font-weight: 300;\r\n    box-shadow: 0px 1px 4px rgb(0 0 0 / 10%), 1px 0px 4px rgb(0 0 0 / 10%), 0px -1px 4px rgb(0 0 0 / 10%), -1px 0px 4px rgb(0 0 0 / 10%);\r\n}\r\n\r\ninput[type=text][_ngcontent-%COMP%] {\r\n    border: none;\r\n    \r\n    \r\n    \r\n    \r\n}\r\n\r\ninput[type=text][_ngcontent-%COMP%]:focus {\r\n    outline:none;\r\n    \r\n}\r\n\r\n.input-group[_ngcontent-%COMP%] {\r\n    border-bottom: 1px solid #373737 !important;\r\n}\r\n\r\n.input-group-prepend[_ngcontent-%COMP%] {\r\n    border-bottom: 0px solid #373737 !important;\r\n}\r\n\r\n.input-group-text[_ngcontent-%COMP%] {\r\n    border:none;\r\n    background-color: #FFFFFF;\r\n}\r\n\r\n.form-control[_ngcontent-%COMP%] {\r\n    border: none;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhYmxlLWZpbHRlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksZUFBZTtJQUNmLFdBQVc7SUFDWCxZQUFZO0lBQ1osY0FBYztJQUNkLFNBQVM7SUFDVCw2QkFBNkI7SUFDN0IsdUJBQXVCO0lBQ3ZCLDRFQUE2RjtJQUM3Rix3QkFBd0I7SUFDeEIscUNBQXFDO0lBQ3JDLHVCQUF1QixDQUFDLFdBQVc7SUFDbkMsaUJBQWlCO0lBQ2pCLHNCQUFzQjtJQUN0QixjQUFjO0lBQ2Qsa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQixvSUFBb0k7QUFDeEk7O0FBRUE7SUFDSSxZQUFZO0lBQ1osMkRBQTJEO0lBQzNELHNDQUFzQztJQUN0QyxnQkFBZ0I7SUFDaEI7NENBQ3dDO0FBQzVDOztBQUVBO0lBQ0ksWUFBWTtJQUNaLHVDQUF1QztBQUMzQzs7QUFFQTtJQUNJLDJDQUEyQztBQUMvQzs7QUFFQTtJQUNJLDJDQUEyQztBQUMvQzs7QUFFQTtJQUNJLFdBQVc7SUFDWCx5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSSxZQUFZO0FBQ2hCIiwiZmlsZSI6InRhYmxlLWZpbHRlci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsic2VsZWN0IHtcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAzNnB4O1xyXG4gICAgbGluZS1oZWlnaHQ6IDE7XHJcbiAgICBib3JkZXI6IDA7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHggIWltcG9ydGFudDtcclxuICAgIGhlaWdodDogMzRweCAhaW1wb3J0YW50O1xyXG4gICAgYmFja2dyb3VuZDogdXJsKC4uLy4uLy4uLy4uL2Fzc2V0cy9vcmFuZ2UtZHJvcGRvd24taWNvbi5wbmcpIG5vLXJlcGVhdCA5OCUgI0ZGRkZGRiAhaW1wb3J0YW50O1xyXG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiAyNnB4IDIxcHggIWltcG9ydGFudDtcclxuICAgIG91dGxpbmU6bm9uZSAhaW1wb3J0YW50O3BhZGRpbmc6NXB4O1xyXG4gICAgbGluZS1oZWlnaHQ6IDIzcHg7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogMC4wMmVtO1xyXG4gICAgY29sb3I6ICM4RDhEOEQ7XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBmb250LXdlaWdodDogMzAwO1xyXG4gICAgYm94LXNoYWRvdzogMHB4IDFweCA0cHggcmdiKDAgMCAwIC8gMTAlKSwgMXB4IDBweCA0cHggcmdiKDAgMCAwIC8gMTAlKSwgMHB4IC0xcHggNHB4IHJnYigwIDAgMCAvIDEwJSksIC0xcHggMHB4IDRweCByZ2IoMCAwIDAgLyAxMCUpO1xyXG59XHJcblxyXG5pbnB1dFt0eXBlPXRleHRdIHtcclxuICAgIGJvcmRlcjogbm9uZTtcclxuICAgIC8qIGJhY2tncm91bmQ6IHVybCguLi8uLi8uLi9hc3NldHMvc2VhcmNoLnBuZykgbm8tcmVwZWF0OyAqL1xyXG4gICAgLyogYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMzNzM3Mzc7ICovXHJcbiAgICAvKiB3aWR0aDoxMDAlOyAqL1xyXG4gICAgLyogYmFja2dyb3VuZC1wb3NpdGlvbjogbGVmdCBjZW50ZXI7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDMxcHggMjVweCAhaW1wb3J0YW50OyAqL1xyXG59XHJcblxyXG5pbnB1dFt0eXBlPXRleHRdOmZvY3VzIHtcclxuICAgIG91dGxpbmU6bm9uZTtcclxuICAgIC8qIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMzczNzM3OzsgKi9cclxufVxyXG5cclxuLmlucHV0LWdyb3VwIHtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMzczNzM3ICFpbXBvcnRhbnQ7XHJcbn1cclxuIFxyXG4uaW5wdXQtZ3JvdXAtcHJlcGVuZCB7XHJcbiAgICBib3JkZXItYm90dG9tOiAwcHggc29saWQgIzM3MzczNyAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uaW5wdXQtZ3JvdXAtdGV4dCB7XHJcbiAgICBib3JkZXI6bm9uZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7XHJcbn1cclxuXHJcbi5mb3JtLWNvbnRyb2wge1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG59Il19 */"]
      });
      /***/
    },

    /***/
    44466:
    /*!*****************************************!*\
      !*** ./src/app/shared/shared.module.ts ***!
      \*****************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SharedModule": function SharedModule() {
          return (
            /* binding */
            _SharedModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/common */
      38583);
      /* harmony import */


      var _components_table_filter_table_filter_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./components/table-filter/table-filter.component */
      11450);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/forms */
      3679);
      /* harmony import */


      var ngx_daterangepicker_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ngx-daterangepicker-material */
      15048);
      /* harmony import */


      var _components_load_cash_load_cash_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./components/load-cash/load-cash.component */
      66984);
      /* harmony import */


      var _components_admin_table_filter_admin_table_filter_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./components/admin-table-filter/admin-table-filter.component */
      94835);
      /* harmony import */


      var _components_refund_items_refund_items_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./components/refund-items/refund-items.component */
      72580);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      37716);

      var _SharedModule = function _SharedModule() {
        _classCallCheck(this, _SharedModule);
      };

      _SharedModule.ɵfac = function SharedModule_Factory(t) {
        return new (t || _SharedModule)();
      };

      _SharedModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
        type: _SharedModule
      });
      _SharedModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, ngx_daterangepicker_material__WEBPACK_IMPORTED_MODULE_7__.NgxDaterangepickerMd.forRoot(), _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule], _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](_SharedModule, {
          declarations: [_components_table_filter_table_filter_component__WEBPACK_IMPORTED_MODULE_0__.TableFilterComponent, _components_load_cash_load_cash_component__WEBPACK_IMPORTED_MODULE_1__.LoadCashComponent, _components_admin_table_filter_admin_table_filter_component__WEBPACK_IMPORTED_MODULE_2__.AdminTableFilterComponent, _components_refund_items_refund_items_component__WEBPACK_IMPORTED_MODULE_3__.RefundItemsComponent],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, ngx_daterangepicker_material__WEBPACK_IMPORTED_MODULE_7__.NgxDaterangepickerMd, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule],
          exports: [_components_table_filter_table_filter_component__WEBPACK_IMPORTED_MODULE_0__.TableFilterComponent, _components_load_cash_load_cash_component__WEBPACK_IMPORTED_MODULE_1__.LoadCashComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _components_admin_table_filter_admin_table_filter_component__WEBPACK_IMPORTED_MODULE_2__.AdminTableFilterComponent, _components_refund_items_refund_items_component__WEBPACK_IMPORTED_MODULE_3__.RefundItemsComponent]
        });
      })();
      /***/

    },

    /***/
    92340:
    /*!*****************************************!*\
      !*** ./src/environments/environment.ts ***!
      \*****************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "environment": function environment() {
          return (
            /* binding */
            _environment
          );
        }
        /* harmony export */

      }); // This file can be replaced during build by using the `fileReplacements` array.
      // `ng build` replaces `environment.ts` with `environment.prod.ts`.
      // The list of file replacements can be found in `angular.json`.


      var _environment = {
        production: false,
        url: 'https://ca-studentdev.inhabitr.com/app/inhabitr/saffron/ws/',
        stripeKey: 'pk_test_uYzRdKckia4c4F4UgZtM9J9T'
      };
      /*
       * For easier debugging in development mode, you can import the following file
       * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
       *
       * This import should be commented out in production mode because it will have a negative impact
       * on performance if an error is thrown.
       */
      // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

      /***/
    },

    /***/
    14431:
    /*!*********************!*\
      !*** ./src/main.ts ***!
      \*********************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/platform-browser */
      39075);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./app/app.module */
      36747);
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./environments/environment */
      92340);

      if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
        (0, _angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
      }

      _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)["catch"](function (err) {
        return console.error(err);
      });
      /***/

    },

    /***/
    46700:
    /*!***************************************************!*\
      !*** ./node_modules/moment/locale/ sync ^\.\/.*$ ***!
      \***************************************************/

    /***/
    function _(module, __unused_webpack_exports, __webpack_require__) {
      var map = {
        "./af": 26431,
        "./af.js": 26431,
        "./ar": 81286,
        "./ar-dz": 1616,
        "./ar-dz.js": 1616,
        "./ar-kw": 9759,
        "./ar-kw.js": 9759,
        "./ar-ly": 43160,
        "./ar-ly.js": 43160,
        "./ar-ma": 62551,
        "./ar-ma.js": 62551,
        "./ar-sa": 79989,
        "./ar-sa.js": 79989,
        "./ar-tn": 6962,
        "./ar-tn.js": 6962,
        "./ar.js": 81286,
        "./az": 15887,
        "./az.js": 15887,
        "./be": 14572,
        "./be.js": 14572,
        "./bg": 3276,
        "./bg.js": 3276,
        "./bm": 93344,
        "./bm.js": 93344,
        "./bn": 58985,
        "./bn-bd": 83990,
        "./bn-bd.js": 83990,
        "./bn.js": 58985,
        "./bo": 94391,
        "./bo.js": 94391,
        "./br": 46728,
        "./br.js": 46728,
        "./bs": 5536,
        "./bs.js": 5536,
        "./ca": 41043,
        "./ca.js": 41043,
        "./cs": 70420,
        "./cs.js": 70420,
        "./cv": 33513,
        "./cv.js": 33513,
        "./cy": 6771,
        "./cy.js": 6771,
        "./da": 47978,
        "./da.js": 47978,
        "./de": 46061,
        "./de-at": 25204,
        "./de-at.js": 25204,
        "./de-ch": 2653,
        "./de-ch.js": 2653,
        "./de.js": 46061,
        "./dv": 85,
        "./dv.js": 85,
        "./el": 8579,
        "./el.js": 8579,
        "./en-au": 25724,
        "./en-au.js": 25724,
        "./en-ca": 10525,
        "./en-ca.js": 10525,
        "./en-gb": 52847,
        "./en-gb.js": 52847,
        "./en-ie": 67216,
        "./en-ie.js": 67216,
        "./en-il": 39305,
        "./en-il.js": 39305,
        "./en-in": 73364,
        "./en-in.js": 73364,
        "./en-nz": 79130,
        "./en-nz.js": 79130,
        "./en-sg": 11161,
        "./en-sg.js": 11161,
        "./eo": 50802,
        "./eo.js": 50802,
        "./es": 40328,
        "./es-do": 45551,
        "./es-do.js": 45551,
        "./es-mx": 75615,
        "./es-mx.js": 75615,
        "./es-us": 64790,
        "./es-us.js": 64790,
        "./es.js": 40328,
        "./et": 96389,
        "./et.js": 96389,
        "./eu": 52961,
        "./eu.js": 52961,
        "./fa": 26151,
        "./fa.js": 26151,
        "./fi": 7997,
        "./fi.js": 7997,
        "./fil": 58898,
        "./fil.js": 58898,
        "./fo": 37779,
        "./fo.js": 37779,
        "./fr": 28174,
        "./fr-ca": 3287,
        "./fr-ca.js": 3287,
        "./fr-ch": 38867,
        "./fr-ch.js": 38867,
        "./fr.js": 28174,
        "./fy": 50452,
        "./fy.js": 50452,
        "./ga": 45014,
        "./ga.js": 45014,
        "./gd": 74127,
        "./gd.js": 74127,
        "./gl": 72124,
        "./gl.js": 72124,
        "./gom-deva": 6444,
        "./gom-deva.js": 6444,
        "./gom-latn": 37953,
        "./gom-latn.js": 37953,
        "./gu": 76604,
        "./gu.js": 76604,
        "./he": 1222,
        "./he.js": 1222,
        "./hi": 74235,
        "./hi.js": 74235,
        "./hr": 622,
        "./hr.js": 622,
        "./hu": 37735,
        "./hu.js": 37735,
        "./hy-am": 90402,
        "./hy-am.js": 90402,
        "./id": 59187,
        "./id.js": 59187,
        "./is": 30536,
        "./is.js": 30536,
        "./it": 35007,
        "./it-ch": 94667,
        "./it-ch.js": 94667,
        "./it.js": 35007,
        "./ja": 62093,
        "./ja.js": 62093,
        "./jv": 80059,
        "./jv.js": 80059,
        "./ka": 66870,
        "./ka.js": 66870,
        "./kk": 80880,
        "./kk.js": 80880,
        "./km": 1083,
        "./km.js": 1083,
        "./kn": 68785,
        "./kn.js": 68785,
        "./ko": 21721,
        "./ko.js": 21721,
        "./ku": 37851,
        "./ku.js": 37851,
        "./ky": 1727,
        "./ky.js": 1727,
        "./lb": 40346,
        "./lb.js": 40346,
        "./lo": 93002,
        "./lo.js": 93002,
        "./lt": 64035,
        "./lt.js": 64035,
        "./lv": 56927,
        "./lv.js": 56927,
        "./me": 5634,
        "./me.js": 5634,
        "./mi": 94173,
        "./mi.js": 94173,
        "./mk": 86320,
        "./mk.js": 86320,
        "./ml": 11705,
        "./ml.js": 11705,
        "./mn": 31062,
        "./mn.js": 31062,
        "./mr": 92805,
        "./mr.js": 92805,
        "./ms": 11341,
        "./ms-my": 59900,
        "./ms-my.js": 59900,
        "./ms.js": 11341,
        "./mt": 37734,
        "./mt.js": 37734,
        "./my": 19034,
        "./my.js": 19034,
        "./nb": 9324,
        "./nb.js": 9324,
        "./ne": 46495,
        "./ne.js": 46495,
        "./nl": 70673,
        "./nl-be": 76272,
        "./nl-be.js": 76272,
        "./nl.js": 70673,
        "./nn": 72486,
        "./nn.js": 72486,
        "./oc-lnc": 46219,
        "./oc-lnc.js": 46219,
        "./pa-in": 2829,
        "./pa-in.js": 2829,
        "./pl": 78444,
        "./pl.js": 78444,
        "./pt": 53170,
        "./pt-br": 66117,
        "./pt-br.js": 66117,
        "./pt.js": 53170,
        "./ro": 96587,
        "./ro.js": 96587,
        "./ru": 39264,
        "./ru.js": 39264,
        "./sd": 42135,
        "./sd.js": 42135,
        "./se": 95366,
        "./se.js": 95366,
        "./si": 93379,
        "./si.js": 93379,
        "./sk": 46143,
        "./sk.js": 46143,
        "./sl": 196,
        "./sl.js": 196,
        "./sq": 21082,
        "./sq.js": 21082,
        "./sr": 91621,
        "./sr-cyrl": 98963,
        "./sr-cyrl.js": 98963,
        "./sr.js": 91621,
        "./ss": 41404,
        "./ss.js": 41404,
        "./sv": 55685,
        "./sv.js": 55685,
        "./sw": 3872,
        "./sw.js": 3872,
        "./ta": 54106,
        "./ta.js": 54106,
        "./te": 39204,
        "./te.js": 39204,
        "./tet": 83692,
        "./tet.js": 83692,
        "./tg": 86361,
        "./tg.js": 86361,
        "./th": 31735,
        "./th.js": 31735,
        "./tk": 1568,
        "./tk.js": 1568,
        "./tl-ph": 96129,
        "./tl-ph.js": 96129,
        "./tlh": 13759,
        "./tlh.js": 13759,
        "./tr": 81644,
        "./tr.js": 81644,
        "./tzl": 90875,
        "./tzl.js": 90875,
        "./tzm": 16878,
        "./tzm-latn": 11041,
        "./tzm-latn.js": 11041,
        "./tzm.js": 16878,
        "./ug-cn": 74357,
        "./ug-cn.js": 74357,
        "./uk": 74810,
        "./uk.js": 74810,
        "./ur": 86794,
        "./ur.js": 86794,
        "./uz": 28966,
        "./uz-latn": 77959,
        "./uz-latn.js": 77959,
        "./uz.js": 28966,
        "./vi": 35386,
        "./vi.js": 35386,
        "./x-pseudo": 23156,
        "./x-pseudo.js": 23156,
        "./yo": 68028,
        "./yo.js": 68028,
        "./zh-cn": 9330,
        "./zh-cn.js": 9330,
        "./zh-hk": 89380,
        "./zh-hk.js": 89380,
        "./zh-mo": 60874,
        "./zh-mo.js": 60874,
        "./zh-tw": 96508,
        "./zh-tw.js": 96508
      };

      function webpackContext(req) {
        var id = webpackContextResolve(req);
        return __webpack_require__(id);
      }

      function webpackContextResolve(req) {
        if (!__webpack_require__.o(map, req)) {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        }

        return map[req];
      }

      webpackContext.keys = function webpackContextKeys() {
        return Object.keys(map);
      };

      webpackContext.resolve = webpackContextResolve;
      module.exports = webpackContext;
      webpackContext.id = 46700;
      /***/
    }
  },
  /******/
  function (__webpack_require__) {
    // webpackRuntimeModules

    /******/
    "use strict";
    /******/

    /******/

    var __webpack_exec__ = function __webpack_exec__(moduleId) {
      return __webpack_require__(__webpack_require__.s = moduleId);
    };
    /******/


    __webpack_require__.O(0, ["vendor"], function () {
      return __webpack_exec__(14431);
    });
    /******/


    var __webpack_exports__ = __webpack_require__.O();
    /******/

  }]);
})();
//# sourceMappingURL=main-es5.js.map