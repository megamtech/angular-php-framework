<?php

//User Management//
$router->map('POST', 'login', array('c' => 'users', 'a' => 'validate', 'auth' => false));
$router->map('POST', 'facebook', array('c' => 'users', 'a' => 'validatefacebook', 'auth' => false));
$router->map('POST', 'auth/google', array('c' => 'users', 'a' => 'validategoogle', 'auth' => false));
$router->map('POST', 'refreshsession', array('c' => 'users', 'a' => 'refreshtoken', 'auth' => true));
$router->map('POST', 'register', array('c' => 'users', 'a' => 'createUser', 'auth' => false));
$router->map('POST', 'addaddress', array('c' => 'users', 'a' => 'createCustomerAddress'));
$router->map('POST', 'getuseraddresses', array('c' => 'users', 'a' => 'getAddresses'));
$router->map('POST', 'deleteuseraddress', array('c' => 'users', 'a' => 'deleteUserAddresses'));
$router->map('POST', 'getusername', array('c' => 'users', 'a' => 'getAddresses'));
$router->map('POST', 'changepassword', array('c' => 'users', 'a' => 'changePassword'));
$router->map('POST', 'resetpassword', array('c' => 'users', 'a' => 'resetPassword', 'auth' => false));
$router->map('POST', 'savepreferences', array('c' => 'users', 'a' => 'savePreferences'));
$router->map('POST', 'savedefaultaddress', array('c' => 'users', 'a' => 'saveDefaultAddress'));
$router->map('POST', 'getpreferences', array('c' => 'users', 'a' => 'getPreferences'));
$router->map('POST', 'getuserlist', array('c' => 'users', 'a' => 'getUserList'));
$router->map('POST', 'changeusername', array('c' => 'users', 'a' => 'changeUserName'));
$router->map('POST', 'addadminuser', array('c' => 'users', 'a' => 'addAdminUser'));
$router->map('POST', 'getcustomerdetails', array('c' => 'users', 'a' => 'getCustomerDetails'));


//Package Management
$router->map('POST', 'package/create', array('c' => 'packages', 'a' => 'createPackages'));
$router->map('POST', 'package/data', array('c' => 'packages', 'a' => 'getPackages'));
$router->map('POST', 'package/edit', array('c' => 'packages', 'a' => 'updatePackage'));
$router->map('POST', 'package/delete', array('c' => 'packages', 'a' => 'deletePackage'));
$router->map('POST', 'package/view', array('c' => 'packages', 'a' => 'getPackage'));
$router->map('POST', 'package/list', array('c' => 'packages', 'a' => 'getPackagesList'));
$router->map('POST', 'package/adminlist', array('c' => 'packages', 'a' => 'getAdminPackagesList'));
$router->map('POST', 'package/updatestatus', array('c' => 'packages', 'a' => 'updatePackage'));
$router->map('POST', 'package/addneedphoto', array('c' => 'packages', 'a' => 'addNeedPhoto'));
$router->map('POST', 'package/savephoto', array('c' => 'packages', 'a' => 'saveUploadPhoto'));
$router->map('POST', 'package/getpackageswarehouses', array('c' => 'packages', 'a' => 'getPackagesWarehouses'));
$router->map('POST', 'package/status', array('c' => 'packages', 'a' => 'getPackageStatus'));
$router->map('POST', 'package/getpackagecountbywarehouse', array('c' => 'packages', 'a' => 'getPackageCountByWarehouse'));
$router->map('POST', 'package/gettotal', array('c' => 'packages', 'a' => 'getTotal'));


//Order Management
$router->map('POST', 'order/create', array('c' => 'orders', 'a' => 'createOrder'));
$router->map('POST', 'order/getadminorderslist', array('c' => 'orders', 'a' => 'getAdminOrdersList'));
$router->map('POST', 'order/getorderstatuses', array('c' => 'orders', 'a' => 'getOrderStatuses'));
$router->map('POST', 'order/updateorderstatus', array('c' => 'orders', 'a' => 'updateOrder'));
$router->map('POST', 'order/view', array('c' => 'orders', 'a' => 'getOrder'));
$router->map('POST', 'order/data', array('c' => 'orders', 'a' => 'getOrders'));
//$router->map('POST', 'order/getorderslist', array('c' => 'orders', 'a' => 'getOrders'));
//Assisted Purchases
$router->map('POST', 'assistedpurchases/createassistedpurchase', array('c' => 'assisted_purchases', 'a' => 'createAssistedPurchase'));
$router->map('POST', 'assistedpurchases/getassistedpurchaselist', array('c' => 'assisted_purchases', 'a' => 'getAssistedPurchaseList'));
$router->map('POST', 'assistedpurchases/getuserassistedpurchase', array('c' => 'assisted_purchases', 'a' => 'getAssistedPurchase'));
$router->map('POST', 'assistedpurchases/getassistedpurchasestatuses', array('c' => 'assisted_purchases', 'a' => 'getAssistedPurchaseStatuses'));
$router->map('POST', 'assistedpurchases/updateassistedpurchasestatus', array('c' => 'assisted_purchases', 'a' => 'updateAssistedPurchaseStatus'));
$router->map('POST', 'assistedpurchases/payassistedpurchase', array('c' => 'assisted_purchases', 'a' => 'payAssistedPurchase'));
$router->map('POST', 'assistedpurchases/checkassistedpurchase', array('c' => 'assisted_purchases', 'a' => 'checkAssistedPurchase'));


//Masters
///Category///
$router->map('POST', 'master/category/add', array('c' => 'category', 'a' => 'addCategory'));
$router->map('POST', 'master/category/list', array('c' => 'category', 'a' => 'getCategories'));
$router->map('POST', 'master/category/edit', array('c' => 'category', 'a' => 'editCategory'));
$router->map('POST', 'master/category/delete', array('c' => 'category', 'a' => 'deleteCategory'));
$router->map('POST', 'master/category/view', array('c' => 'category', 'a' => 'getCategory'));
$router->map('POST', 'master/category/data', array('c' => 'category', 'a' => 'getCategoriesData'));

///Purchased At///
$router->map('POST', 'master/purchasedat/add', array('c' => 'purchasedat', 'a' => 'addPurchasedAt'));
$router->map('POST', 'master/purchasedat/list', array('c' => 'purchasedat', 'a' => 'getPurchasedAtList'));
$router->map('POST', 'master/purchasedat/edit', array('c' => 'purchasedat', 'a' => 'editPurchasedAt'));
$router->map('POST', 'master/purchasedat/delete', array('c' => 'purchasedat', 'a' => 'deletePurchasedAt'));
$router->map('POST', 'master/purchasedat/view', array('c' => 'purchasedat', 'a' => 'getPurchasedAt'));
$router->map('POST', 'master/purchasedat/data', array('c' => 'purchasedat', 'a' => 'getPurchasedAt'));

///Totals///
$router->map('POST', 'master/totals/add', array('c' => 'totals', 'a' => 'addTotal'));
$router->map('POST', 'master/totals/list', array('c' => 'totals', 'a' => 'getTotalList'));
$router->map('POST', 'master/totals/edit', array('c' => 'totals', 'a' => 'editTotal'));
$router->map('POST', 'master/totals/delete', array('c' => 'totals', 'a' => 'deleteTotal'));
$router->map('POST', 'master/totals/view', array('c' => 'totals', 'a' => 'getTotal'));
$router->map('POST', 'master/totals/data', array('c' => 'totals', 'a' => 'getTotal'));

//History///
$router->map('POST', 'history/orderlist', array('c' => 'history', 'a' => 'getOrderHistoryByOrderId'));
$router->map('POST', 'history/gethistorybyuser', array('c' => 'history', 'a' => 'getHistoryByUser'));

///Coupon///
$router->map('POST', 'master/coupon/add', array('c' => 'coupon', 'a' => 'addCoupon'));
$router->map('POST', 'master/coupon/list', array('c' => 'coupon', 'a' => 'getCoupons'));
$router->map('POST', 'master/coupon/edit', array('c' => 'coupon', 'a' => 'editCoupon'));
$router->map('POST', 'master/coupon/delete', array('c' => 'coupon', 'a' => 'deleteCoupon'));
$router->map('POST', 'master/coupon/view', array('c' => 'coupon', 'a' => 'getCoupon'));

///WareHouse///
$router->map('POST', 'master/warehouse/add', array('c' => 'warehouse_location', 'a' => 'addWareHouseLocation'));
$router->map('POST', 'master/warehouse/list', array('c' => 'warehouse_location', 'a' => 'getWareHouseLocations'));
$router->map('POST', 'master/warehouse/edit', array('c' => 'warehouse_location', 'a' => 'editWareHouseLocation'));
$router->map('POST', 'master/warehouse/delete', array('c' => 'warehouse_location', 'a' => 'deleteWareHouseLocation'));
$router->map('POST', 'master/warehouse/view', array('c' => 'warehouse_location', 'a' => 'getWareHouseLocation'));
$router->map('POST', 'master/warehouse/data', array('c' => 'warehouse_location', 'a' => 'getWareHouseLocationData'));
$router->map('POST', 'master/warehouse/jdata', array('c' => 'warehouse_location', 'a' => 'getWareHouseLocationsUsingJquery','auth'=>false));

///Stock Status///
$router->map('POST', 'master/stockstatus/add', array('c' => 'stock_status', 'a' => 'addStockStatus'));
$router->map('POST', 'master/stockstatus/list', array('c' => 'stock_status', 'a' => 'getStockStatuses'));
$router->map('POST', 'master/stockstatus/edit', array('c' => 'stock_status', 'a' => 'getStockStatus'));
$router->map('POST', 'master/stockstatus/view', array('c' => 'stock_status', 'a' => 'getStockStatus'));
$router->map('POST', 'master/stockstatus/delete', array('c' => 'stock_status', 'a' => 'deleteStockStatus'));

///Order Status///
$router->map('POST', 'master/packagestatus/add', array('c' => 'package_status', 'a' => 'addOrderStatus'));
$router->map('POST', 'master/packagestatus/list', array('c' => 'package_status', 'a' => 'getOrderStatuses'));
$router->map('POST', 'master/packagestatus/edit', array('c' => 'package_status', 'a' => 'editOrderStatus'));
$router->map('POST', 'master/packagestatus/delete', array('c' => 'package_status', 'a' => 'deleteOrderStatus'));
$router->map('POST', 'master/packagestatus/view', array('c' => 'package_status', 'a' => 'getPackageStatusesData'));
$router->map('POST', 'master/packagestatus/data', array('c' => 'package_status', 'a' => 'getPackageStatusesData'));

///Tax Class///
$router->map('POST', 'master/taxclass/add', array('c' => 'tax_class', 'a' => 'addTaxClass'));
$router->map('POST', 'master/taxclass/list', array('c' => 'tax_class', 'a' => 'getTaxClasses'));
$router->map('POST', 'master/taxclass/edit', array('c' => 'tax_class', 'a' => 'editTaxClass'));
$router->map('POST', 'master/taxclass/delete', array('c' => 'tax_class', 'a' => 'deleteTaxClass'));
$router->map('POST', 'master/taxclass/view', array('c' => 'tax_class', 'a' => 'getTaxClass'));

///Tax Rates///
$router->map('POST', 'master/taxrates/add', array('c' => 'tax_rates', 'a' => 'addTaxRate'));
$router->map('POST', 'master/taxrates/list', array('c' => 'tax_rates', 'a' => 'getTaxRates'));
$router->map('POST', 'master/taxrates/edit', array('c' => 'tax_rates', 'a' => 'editTaxRate'));
$router->map('POST', 'master/taxrates/delete', array('c' => 'tax_rates', 'a' => 'deleteTaxRate'));
$router->map('POST', 'master/taxrates/view', array('c' => 'tax_rates', 'a' => 'getTaxRate'));

///Country///
$router->map('POST', 'master/country/add', array('c' => 'country', 'a' => 'addCountry'));
$router->map('POST', 'master/country/list', array('c' => 'country', 'a' => 'getCountries'));
$router->map('POST', 'master/country/edit', array('c' => 'country', 'a' => 'editCountry'));
$router->map('POST', 'master/country/delete', array('c' => 'country', 'a' => 'deleteCountry'));
$router->map('POST', 'master/country/view', array('c' => 'country', 'a' => 'getcountry'));
$router->map('POST', 'master/country/data', array('c' => 'country', 'a' => 'getCountriesData', 'auth' => false));
$router->map('POST', 'master/country/zonedata', array('c' => 'country', 'a' => 'getZoneData', 'auth' => false));


///Zone///
$router->map('POST', 'master/zones/add', array('c' => 'zones', 'a' => 'addZone'));
$router->map('POST', 'master/zones/list', array('c' => 'zones', 'a' => 'getZones'));
$router->map('POST', 'master/zones/edit', array('c' => 'zones', 'a' => 'getZone'));
$router->map('POST', 'master/zones/delete', array('c' => 'zones', 'a' => 'deleteZone'));
$router->map('POST', 'master/zones/view', array('c' => 'zones', 'a' => 'getZone'));

///EasyPost///

$router->map('POST', 'addwarehouseaddr', array('c' => 'easypost', 'a' => 'calculateShipmentPrice', 'auth' => false));

///Geo Zones///
$router->map('POST', 'master/geozones/add', array('c' => 'geo_zones', 'a' => 'addGeoZone'));
$router->map('POST', 'master/geozones/list', array('c' => 'geo_zones', 'a' => 'getGeoZones'));
$router->map('POST', 'master/geozones/edit', array('c' => 'geo_zones', 'a' => 'editGeoZone'));
$router->map('POST', 'master/geozones/delete', array('c' => 'geo_zones', 'a' => 'deleteGeoZone'));
$router->map('POST', 'master/geozones/view', array('c' => 'geo_zones', 'a' => 'getGeoZone'));

//Shipping Carrier
$router->map('POST', 'getshippingcarrier', array('c' => 'carrier', 'a' => 'getShippingCarrier'));
$router->map('POST', 'getcarriers', array('c' => 'carrier', 'a' => 'getAllCarriers'));
$router->map('POST', 'getrates', array('c' => 'carrier', 'a' => 'getShippingCarrierRates', 'auth' => false));

//Payments
$router->map('GET', 'getpaymentform', array('c' => 'payments', 'a' => 'getform'));

$router->map('POST', 'payments/ccavenueack', array('c' => 'payments', 'a' => 'getResponse', 'auth' => false));
$router->map('POST', 'payments/ccavenuecan', array('c' => 'payments', 'a' => 'getCancelResponse', 'auth' => false));
$router->map('POST', 'payments/getpaymentsdetails', array('c' => 'payments', 'a' => 'getPaymentsDetails', 'auth' => false));

//Messages

$router->map('POST', 'messages/create', array('c' => 'messages', 'a' => 'createMessage'));
$router->map('POST', 'messages/list', array('c' => 'messages', 'a' => 'getMessages'));
$router->map('POST', 'messages/viewmessage', array('c' => 'messages', 'a' => 'getMessage'));
$router->map('POST', 'messages/getcontacts', array('c' => 'messages', 'a' => 'getContacts'));
$router->map('POST', 'messages/moveto', array('c' => 'messages', 'a' => 'moveToFolder'));
$router->map('GET', 'messages/sendmail', array('c' => 'messages', 'a' => 'sendMail','auth'=>false));
$router->map('POST', 'messages/draft', array('c' => 'messages', 'a' => 'createDraft'));

//Alerts

$router->map('POST', 'alerts/send', array('c' => 'alerts', 'a' => 'createAlert'));
$router->map('POST', 'alerts/getuseralerts', array('c' => 'alerts', 'a' => 'getUserAlerts'));
