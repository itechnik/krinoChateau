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
var product_service_1 = require('./../Shared/Services/product.service');
var supplier_service_1 = require('./../Shared/Services/supplier.service');
var auth_service_1 = require('./../Shared/Services/auth.service');
var PreOrderComponent = (function () {
    function PreOrderComponent(supplierService, productService, route, authService) {
        this.supplierService = supplierService;
        this.productService = productService;
        this.route = route;
        this.authService = authService;
    }
    PreOrderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var supplierId = params['id'];
            if (supplierId) {
                _this.supplierService.getSupplier(supplierId).subscribe(function (supplier) { return _this.supplier = supplier; });
                _this.productsBasketObservable = _this.productService.getAnnotedProductsInBasketBySupplier(supplierId);
            }
        });
    };
    PreOrderComponent.prototype.createOrder = function () {
        var _this = this;
        this.productsBasketObservable.subscribe(function (products) {
            if (products && products.length > 0) {
                var record = {
                    data: {
                        userId: _this.authService.getUserId(),
                        equipeId: _this.authService.getEquipeId(),
                        supplierId: _this.supplier._id,
                        items: products.filter(function (product) { return product.annotation.quantity > 0; }).map(function (product) {
                            return {
                                product: product.data._id,
                                quantity: product.annotation.quantity,
                                otp: product.annotation.otp._id,
                                total: product.annotation.totalPrice
                            };
                        })
                    },
                    basketItems: products.filter(function (product) { return product.annotation.quantity > 0; }).map(function (product) { return product.annotation.basketId; })
                };
                _this.supplierService.passCommand(record).subscribe(function (res) {
                    var orderId = res._id;
                    // todo: goto new order view
                });
            }
        });
    };
    PreOrderComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: './pre-order.component.html'
        }), 
        __metadata('design:paramtypes', [supplier_service_1.SupplierService, product_service_1.ProductService, router_1.ActivatedRoute, auth_service_1.AuthService])
    ], PreOrderComponent);
    return PreOrderComponent;
}());
exports.PreOrderComponent = PreOrderComponent;
//# sourceMappingURL=pre-order.component.js.map