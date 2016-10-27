"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var order_service_1 = require('../Shared/Services/order.service');
var Rx_1 = require('rxjs/Rx');
var OrderComponent = (function () {
    function OrderComponent(orderService, route) {
        this.orderService = orderService;
        this.route = route;
    }
    OrderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var orderId = params['id'];
            if (orderId) {
                _this.orderService.getAnnotedOrder(orderId).subscribe(function (order) {
                    _this.order = order;
                    if (_this.order && _this.order.data && _this.order.data.date)
                        _this.order.annotation.date = (new Date(_this.order.data.date)).toLocaleDateString();
                    _this.selectableOtpsObservable = _this.orderService.getSelectableOtps();
                    if (_this.order && _this.order.annotation)
                        _this.order.annotation.items.forEach(function (item) {
                            item.annotation.idObservable = Rx_1.Observable.from([item.data.otp]);
                        });
                });
            }
        });
    };
    OrderComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: './order.component.html'
        }), 
        __metadata('design:paramtypes', [order_service_1.OrderService, router_1.ActivatedRoute])
    ], OrderComponent);
    return OrderComponent;
}());
exports.OrderComponent = OrderComponent;
//# sourceMappingURL=order.component.js.map