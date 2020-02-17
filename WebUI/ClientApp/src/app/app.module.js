"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var input_user_data_form_component_1 = require("./input-user-data-form/input-user-data-form.component");
var display_user_data_form_component_1 = require("./display-user-data-form/display-user-data-form.component");
var user_data_list_component_1 = require("./user-data-list/user-data-list.component");
var userRespositoryService_1 = require("./services/userRespositoryService");
// constant routes
var routes = [
    {
        // http://localhost:4200/user
        path: 'user',
        component: input_user_data_form_component_1.InputUserDataFormComponent
    },
    {
        // http://localhost:4200/user/1
        path: 'user/:id',
        component: display_user_data_form_component_1.DisplayUserDataFormComponent
    },
    {
        // http://localhost:4200/
        path: '',
        component: user_data_list_component_1.UserDataListComponent
    }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                input_user_data_form_component_1.InputUserDataFormComponent,
                display_user_data_form_component_1.DisplayUserDataFormComponent,
                user_data_list_component_1.UserDataListComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule.forRoot(routes)
            ],
            providers: [
                userRespositoryService_1.UserRespositoryService
            ],
            bootstrap: [
                app_component_1.AppComponent
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map