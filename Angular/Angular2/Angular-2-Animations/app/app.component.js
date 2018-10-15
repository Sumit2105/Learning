"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'Angular Animations';
        this.showDiv = true;
    }
    AppComponent.prototype.toggleDiv = function () {
        this.showDiv = this.showDiv ? false : true;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "<h1>{{title}}</h1>\n             <button (click)=\"toggleDiv()\">ToggleDiv</button>\n             <div *ngIf=\"showDiv\" [@flyInOut]>\n              FLYINOUT\n             </div>\n             ",
            animations: [
                core_1.trigger('flyInOut', [
                    core_1.transition('void => *', [
                        core_1.style({ transform: 'translateX(-100%)' }),
                        core_1.animate(1000, core_1.keyframes([
                            core_1.style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
                            core_1.style([{ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }]),
                            core_1.style([{ opacity: 1, transform: 'translateX(0)', offset: 1.0 }])
                        ]))
                    ]),
                    core_1.transition('* => void', [
                        core_1.animate(1000, core_1.keyframes([
                            core_1.style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                            core_1.style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
                            core_1.style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
                        ]))
                    ])
                ])
            ]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map