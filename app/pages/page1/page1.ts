import { Component } from '@angular/core';
import {Platform, Alert, NavController } from 'ionic-angular';
import {BarcodeScanner } from 'ionic-native';
import {OnInit} from '@angular/core';

declare var scannerBB: any;
declare var device: any;
declare var bluetoothle: any;
declare var bluetoothSerial: any;
@Component({
  templateUrl: 'build/pages/page1/page1.html'
})
export class Page1 {

    constructor(private navCtrl: NavController, private platform: Platform) {

    }
    ngOnInit() {
        var deviceplatform = device.platform;
        document.getElementById("scenarioOutputScanData").textContent = deviceplatform;
        if (deviceplatform == "Android") {
            document.getElementById("scannerStart").style.display = 'none';
            document.getElementById("scannerStop").style.display = 'none';
        }      
    }
    scan() {
        document.getElementById("scenarioOutputScanData").textContent = "scan";
        console.log("scan");
        BarcodeScanner.scan().then((barcodeData) => {
            // Success! Barcode data is here
            this.navCtrl.present(Alert.create({
                title: "Scan Results",
                subTitle: barcodeData.text,
                buttons: ["Close"]
            }));
        }, (err) => {
            // An error occurred
        });
    }


    scanWithBB()
    {
        var output = "";
        console.log("in scan bb");
        document.getElementById("scenarioOutputScanData").textContent = "in scan bb";
        scannerBB.initialize(o=>{
            console.log("success!");
            
            output = o.output;
            document.getElementById("scenarioOutputScanData").textContent = output;
        }, (e) => {
            console.log("fail!");
            document.getElementById("scenarioOutputScanData").textContent = "fail!";
            this.navCtrl.present(Alert.create({
                title: "Scan Results",
                subTitle: e.message,
                buttons: ["Close"]
            }));
            });

    }
    stopScan()
    {
        scannerBB.destroy(handleCallback, handleCallback);
    }

    initializeble()
    {
        var params = {
            "request": true,
            "statusReceiver": false,
            "restoreKey": "bluetoothleplugin"
        };
        document.getElementById("scenarioOutputScanData").textContent = "clicked initialize!";
        bluetoothle.initialize(handleCallback, params);
    }

    connect() {
        var params = {
            "address": "00:22:58:31:F4:B8",
        };
        bluetoothle.connect(handleCallback, handleCallback, params);
    }
    discover() {
        var uuid = "00001101-0000-1000-8000-00805f9b34fb";
        var params = {
            "address": "00:22:58:31:F4:B8",
        };
        bluetoothle.bond(handleCallback, handleCallback, params);
    }
    connectSerial() {
        document.getElementById("scenarioOutputScanData").textContent = "print clicked";
        bluetoothSerial.connect("00:22:58:31:F4:B8", prints,handleCallback);
    }

    disconnect() {
        var params = {
            "address": "00:22:58:31:F4:B8",
        };
        bluetoothle.disconnect(handleCallback, handleCallback, params);
    }

    printhello(o) {
        document.getElementById("scenarioOutputScanData").textContent = "print clicked";
        var writestring = "! 0 200 200 210 1" + String.fromCharCode(13); 
        
        writestring = writestring + "TEXT 4 0 30 40 Hello World" + String.fromCharCode(13); 
        writestring = writestring + "FORM" + String.fromCharCode(13); 
        writestring = writestring + "PRINT" + String.fromCharCode(13); 
        document.getElementById("scenarioOutputScanData").textContent = writestring;
        bluetoothSerial.write(writestring, handleCallback, handleCallback);
        document.getElementById("scenarioOutputScanData").textContent = "print clicked";
    }

    

}
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
