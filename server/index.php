<?php

define('AppRoot', dirname(__FILE__) . DIRECTORY_SEPARATOR);

 
if (is_file('config/constants.php')) {
    require_once('config/constants.php');
}

require_once(AppSystem . 'startup.php');



// Registry
$registry = new Registry();


// Loader
$loader = new Loader($registry);
$registry->set('load', $loader);

// Config
$config = new Config();
$registry->set('config', $config);
$config->load('properties');

//TODO Set for DEV and Production
$dbConfig['type'] = DB_DRIVER;
$dbConfig['host'] = DB_HOSTNAME;
$dbConfig['name'] = DB_DATABASE;
$dbConfig['user'] = DB_USERNAME;
$dbConfig['port'] = DB_PORT;
$dbConfig['pass'] = DB_PASSWORD;

$db = new cDatabase($dbConfig);
$registry->set('db', $db);



//TODO ADD URL and LOG
// Request
$request = new Request();
$registry->set('request', $request);


//TODO ADD Cache
// Routes
$routing = new Routing($registry->get('request'));
$registry->set('routing', $routing);



//JWT Class for validation and token generation
$jwt = new cJWT($config->get('servername'), $config->get('jwtKey'),
        $routing->authRequired);
$registry->set('jwt', $jwt);
$user_token_details = $jwt->validateToken($request->server['HTTP_AUTHORIZATION']);

$request->setAuthorizationDetails($user_token_details);

//Validation
$validation = new Validation();

$registry->set('validation', $validation);

// Response
$response = new Response();
//$response->addHeader('Content-Type: text/html; charset=utf-8');
//$response->setCompression($config->get('config_compression'));
$registry->set('response', $response);

$routing->execute($registry);

$response->output();

?>
