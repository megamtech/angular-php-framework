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
$router->map('POST', 'getuserlist', array('c' => 'users', 'a' => 'getUserList'));
$router->map('POST', 'changeusername', array('c' => 'users', 'a' => 'changeUserName'));

//Masters
///Category///
$router->map('POST', 'master/category/add', array('c' => 'category', 'a' => 'addCategory'));
$router->map('POST', 'master/category/list', array('c' => 'category', 'a' => 'getCategories'));
$router->map('POST', 'master/category/edit', array('c' => 'category', 'a' => 'editCategory'));
$router->map('POST', 'master/category/delete', array('c' => 'category', 'a' => 'deleteCategory'));
$router->map('POST', 'master/category/view', array('c' => 'category', 'a' => 'getCategory'));
$router->map('POST', 'master/category/data', array('c' => 'category', 'a' => 'getCategoriesData'));


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


///Geo Zones///
$router->map('POST', 'master/geozones/add', array('c' => 'geo_zones', 'a' => 'addGeoZone'));
$router->map('POST', 'master/geozones/list', array('c' => 'geo_zones', 'a' => 'getGeoZones'));
$router->map('POST', 'master/geozones/edit', array('c' => 'geo_zones', 'a' => 'editGeoZone'));
$router->map('POST', 'master/geozones/delete', array('c' => 'geo_zones', 'a' => 'deleteGeoZone'));
$router->map('POST', 'master/geozones/view', array('c' => 'geo_zones', 'a' => 'getGeoZone'));


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
