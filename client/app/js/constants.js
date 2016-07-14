var url = 'http://127.0.0.1/1grandtrunk/server/';
(function () {
    'use strict';
    angular
            .module('1grandtrunk').constant('API_URLs', {
        "login": url + 'login',
        "register": url + 'register',
        "addaddress": url + 'addaddress',
        "getusers": url + 'getusers',
        "getuseraddresses": url + 'getuseraddresses',
        "changeusername": url + 'changeusername',
        "changepassword": url + 'changepassword',
        "resetpassword": url + 'resetpassword',
        "savepreferences": url + 'savepreferences',
        "savedefaultaddress": url + 'savedefaultaddress',
        "getpreferences": url + 'getpreferences',
        "getuserlist": url + 'getuserlist',
        "getusername": url + 'getusername',
        "deleteuseraddress": url + 'deleteuseraddress',
        "getcustomerdetails": url + 'getcustomerdetails',
        "getuser": url + 'getuser',
        "getshippingcarrier": url + 'getshippingcarrier',
        "addadminuser": url + 'addadminuser',
        "category": {
            "add": url + 'master/category/add',
            "edit": url + 'master/category/edit',
            "viewall": url + 'master/category/list',
            "view": url + 'master/category/view',
            "delete": url + 'master/category/delete',
            "data": url + 'master/category/data'
        },
        "purchasedat": {
            "add": url + 'master/purchasedat/add',
            "edit": url + 'master/purchasedat/edit',
            "viewall": url + 'master/purchasedat/list',
            "view": url + 'master/purchasedat/view',
            "delete": url + 'master/purchasedat/delete',
            "data": url + 'master/purchasedat/data'
        },
        "totals": {
            "add": url + 'master/totals/add',
            "edit": url + 'master/totals/edit',
            "viewall": url + 'master/totals/list',
            "view": url + 'master/totals/view',
            "delete": url + 'master/totals/delete',
            "data": url + 'master/totals/data'
        },
        "taxclass": {
            "add": url + 'master/taxclass/add',
            "edit": url + 'master/taxclass/edit',
            "viewall": url + 'master/taxclass/list',
            "view": url + 'master/taxclass/view',
            "delete": url + 'master/taxclass/delete'
        },
        "taxrates": {
            "add": url + 'master/taxrates/add',
            "edit": url + 'master/taxrates/edit',
            "viewall": url + 'master/taxrates/list',
            "view": url + 'master/taxrates/view',
            "delete": url + 'master/taxrates/delete'
        },
        "country": {
            "add": url + 'master/country/add',
            "edit": url + 'master/country/edit',
            "viewall": url + 'master/country/list',
            "view": url + 'master/country/view',
            "delete": url + 'master/country/delete',
            "data": url + 'master/country/data',
            "zonedata": url + 'master/country/zonedata'
        },
        "coupon": {
            "add": url + 'master/coupon/add',
            "edit": url + 'master/coupon/edit',
            "viewall": url + 'master/coupon/list',
            "view": url + 'master/coupon/view',
            "delete": url + 'master/coupon/delete'
        },
        "packagestatus": {
            "add": url + 'master/packagestatus/add',
            "edit": url + 'master/packagestatus/edit',
            "viewall": url + 'master/packagestatus/list',
            "view": url + 'master/packagestatus/view',
            "data": url + 'master/packagestatus/data',
            "delete": url + 'master/packagestatus/delete'
        },
        "order": {
            "create": url + 'order/create',
            "getadminorderslist": url + 'order/getadminorderslist',
            "getorderstatuses": url + 'order/getorderstatuses',
            "updateorderstatus": url + 'order/updateorderstatus',
            "view": url + 'order/view',
            "data": url + 'order/data'

//            "getadminorderslist": url + 'order/getorderslist'
        },
        "history": {
            "orderlist": url + 'history/orderlist',
            "gethistorybyuser": url + 'history/gethistorybyuser'
        },
        "stockstatus": {
            "add": url + 'master/stockstatus/add',
            "edit": url + 'master/stockstatus/edit',
            "viewall": url + 'master/stockstatus/list',
            "view": url + 'master/stockstatus/view',
            "delete": url + 'master/stockstatus/delete'
        },
        "warehouse": {
            "add": url + 'master/warehouse/add',
            "edit": url + 'master/warehouse/edit',
            "viewall": url + 'master/warehouse/list',
            "view": url + 'master/warehouse/view',
            "delete": url + 'master/warehouse/delete',
            "data": url + 'master/warehouse/data'
        },
        "geozone": {
            "add": url + 'master/geozones/add',
            "edit": url + 'master/geozones/edit',
            "viewall": url + 'master/geozones/list',
            "view": url + 'master/geozones/view',
            "delete": url + 'master/geozones/delete'
        },
        "zones": {
            "add": url + 'master/zones/add',
            "edit": url + 'master/zones/edit',
            "viewall": url + 'master/zones/list',
            "veiw": url + 'master/zones/view',
            "delete": url + 'master/zones/delete'
        },
        "package": {
            "add": url + 'package/create',
            "edit": url + 'package/edit',
            "data": url + 'package/data',
            "adminlist": url + 'package/adminlist',
            "view": url + 'package/view',
            'update_status': url + 'package/updatestatus',
            'addneedphoto': url + 'package/addneedphoto',
            'savephoto': url + 'package/savephoto',
            'payment': url + 'package/initiate_payment',
            'getpackagecountbywarehouse': url + 'package/getpackagecountbywarehouse',
            'getpurchasedat': url + 'master/purchasedat/data',
            'status': url + 'package/status',
            'gettotal': url + 'package/gettotal'
        },
        "assistedpurchases": {
            "create": url + 'assistedpurchases/createassistedpurchase',
            "list": url + 'assistedpurchases/getassistedpurchaselist',
            "getuserassistedpurchase": url + 'assistedpurchases/getuserassistedpurchase',
            "getassistedpurchasestatuses": url + 'assistedpurchases/getassistedpurchasestatuses',
            "updateassistedpurchasestatus": url + 'assistedpurchases/updateassistedpurchasestatus',
            "assistedpurchases": url + 'assistedpurchases/getAssistedPurchase',
            "checkassistedpurchase": url + 'assistedpurchases/checkassistedpurchase',
            "payassistedpurchase": url + 'assistedpurchases/payassistedpurchase'
        },
        "carrier": {
            "data": url + 'getcarriers'
        },
        "payments": {
            "getpaymentsdetails": url + 'payments/getpaymentsdetails'
        },
        "messages": {
            "send": url + 'messages/create',
            "movefolder": url + 'messages/move',
            "draft": url + 'messages/draft',
            "changestatus": url + 'messages/changestatus',
            "list": url + 'messages/list',
            "view": url + 'messages/viewmessage',
            "moveto": url + 'messages/moveto',
            "getcontacts": url + 'messages/getcontacts'
        },
        "alerts": {
            "create": url + 'alerts/create',
            "changestatus": url + 'alerts/changestatus',
            "send": url + 'alerts/send',
            "getuseralerts": url + 'alerts/getuseralerts'
        }

    }).constant('DataFormat', {
        'date': {
            'medium': 'd MMM yyyy hh:mm a',
            'year': 'yyyy',
            'month': 'yyyy',
            'day': 'yyyy',
            'short': 'd MMM, yyyy',
            'datetime': 'yyyy',
            'datetimezone': 'yyyy',
            'long': 'yyyy',
            'longdatewithtime': 'EEEE, MMMM d, y hh:mm a'
        }
    });
})();
