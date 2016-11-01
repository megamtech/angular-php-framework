<?php

// Version
define('VERSION', '0.1.0.1');


define('UserManagementModule', 'mauthenticate' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR);
define('NotifyModule', 'mnotify' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR);
define('QueryModule', '../mquery' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR);
define('AppController', 'controller' . DIRECTORY_SEPARATOR);
define('AppModel', 'model' . DIRECTORY_SEPARATOR);

define('AppSystem', 'system' . DIRECTORY_SEPARATOR);
define('AppConfig', 'config' . DIRECTORY_SEPARATOR);
define('AppUploads', 'uploads' . DIRECTORY_SEPARATOR);
define('AppThirdParty', 'thirdparty' . DIRECTORY_SEPARATOR);
define('AppTemplates', 'templates' . DIRECTORY_SEPARATOR);

// HTTP With Trailing slash
define('HTTP_SERVER', 'http://demo.megamtech.com/api/');

// HTTPS
define('HTTPS_SERVER', 'https://demo.megamtech.com/api/');

define('BASE_PATH', '/api/');

// DB DEV
define('DB_DRIVER', 'mongo');
define('DB_PORT', '27017');

define('DB_HOSTNAME', 'dbip');
define('DB_USERNAME', 'dbusername');
define('DB_PASSWORD', '');
define('DB_DATABASE', 'databasename');

//SMTP details
define('SMTP_HOST', 'mail.smtp2go.com');
define('SMTP_PORT', 'smtp_port');
define('SMTP_USER', 'smtp_user_name');
define('SMTP_PASS', 'smtp_user_password');
define('SMTP_IS_TLS', true);

define('COMPANY_NAME', 'Your Company Name');
define('COMPANY_LOGO', 'Company Logo');
define('COMPANY_WEBSITE', 'Your Website');


