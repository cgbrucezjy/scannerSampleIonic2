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
var ionic_angular_1 = require('ionic-angular');
var ionic_native_1 = require('ionic-native');
var Page1 = (function () {
    function Page1(navCtrl, platform) {
        this.navCtrl = navCtrl;
        this.platform = platform;
    }
    Page1.prototype.ngOnInit = function () {
        var deviceplatform = device.platform;
        document.getElementById("scenarioOutputScanData").textContent = deviceplatform;
        if (deviceplatform == "Android") {
            document.getElementById("scannerStart").style.display = 'none';
            document.getElementById("scannerStop").style.display = 'none';
        }
    };
    Page1.prototype.scan = function () {
        var _this = this;
        document.getElementById("scenarioOutputScanData").textContent = "scan";
        console.log("scan");
        ionic_native_1.BarcodeScanner.scan().then(function (barcodeData) {
            // Success! Barcode data is here
            _this.navCtrl.present(ionic_angular_1.Alert.create({
                title: "Scan Results",
                subTitle: barcodeData.text,
                buttons: ["Close"]
            }));
        }, function (err) {
            // An error occurred
        });
    };
    Page1.prototype.scanWithBB = function () {
        var _this = this;
        var output = "";
        console.log("in scan bb");
        document.getElementById("scenarioOutputScanData").textContent = "in scan bb";
        scannerBB.initialize(function (o) {
            console.log("success!");
            output = o.output;
            document.getElementById("scenarioOutputScanData").textContent = output;
        }, function (e) {
            console.log("fail!");
            document.getElementById("scenarioOutputScanData").textContent = "fail!";
            _this.navCtrl.present(ionic_angular_1.Alert.create({
                title: "Scan Results",
                subTitle: e.message,
                buttons: ["Close"]
            }));
        });
    };
    Page1.prototype.stopScan = function () {
        scannerBB.destroy(handleCallback, handleCallback);
    };
    Page1.prototype.initializeble = function () {
        var params = {
            "request": true,
            "statusReceiver": false,
            "restoreKey": "bluetoothleplugin"
        };
        document.getElementById("scenarioOutputScanData").textContent = "clicked initialize!";
        bluetoothle.initialize(handleCallback, params);
    };
    Page1.prototype.connect = function () {
        var params = {
            "address": "00:22:58:31:F4:B8",
        };
        bluetoothle.connect(handleCallback, handleCallback, params);
    };
    Page1.prototype.discover = function () {
        var uuid = "00001101-0000-1000-8000-00805f9b34fb";
        var params = {
            "address": "00:22:58:31:F4:B8",
        };
        bluetoothle.bond(handleCallback, handleCallback, params);
    };
    Page1.prototype.connectSerial = function () {
        document.getElementById("scenarioOutputScanData").textContent = "print clicked";
        bluetoothSerial.connect("00:22:58:31:F4:B8", prints, handleCallback);
    };
    Page1.prototype.disconnect = function () {
        var params = {
            "address": "00:22:58:31:F4:B8",
        };
        bluetoothle.disconnect(handleCallback, handleCallback, params);
    };
    Page1.prototype.printhello = function (o) {
        document.getElementById("scenarioOutputScanData").textContent = "print clicked";
        var writestring = "! 0 200 200 210 1" + String.fromCharCode(13);
        writestring = writestring + "TEXT 4 0 30 40 Hello World" + String.fromCharCode(13);
        writestring = writestring + "FORM" + String.fromCharCode(13);
        writestring = writestring + "PRINT" + String.fromCharCode(13);
        document.getElementById("scenarioOutputScanData").textContent = writestring;
        bluetoothSerial.write(writestring, handleCallback, handleCallback);
        document.getElementById("scenarioOutputScanData").textContent = "print clicked";
    };
    Page1 = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/page1/page1.html'
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, ionic_angular_1.Platform])
    ], Page1);
    return Page1;
}());
exports.Page1 = Page1;
function prints(o) {
    document.getElementById("scenarioOutputScanData").textContent = "print clicked";
    var writestring = "! 0 200 200 210 1" + String.fromCharCode(13);
    writestring = writestring + "TEXT 4 0 30 40 Hello World" + String.fromCharCode(13);
    writestring = writestring + "FORM" + String.fromCharCode(13);
    writestring = writestring + "PRINT" + String.fromCharCode(13);
    document.getElementById("scenarioOutputScanData").textContent = writestring;
    bluetoothSerial.write(writestring, handleCallback, handleCallback);
    document.getElementById("scenarioOutputScanData").textContent = "print clicked";
}
function handleCallback(o) {
    document.getElementById("scenarioOutputScanData").textContent = JSON.stringify(o);
}
