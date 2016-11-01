<?php

/**
 * Description of cUserController
 *
 * @author gmsundar
 */
class cUsers extends controller {

    private $columns = array(
        'email' => array('validation' => 'required'),
        'password' => array('validation' => 'required'),
        'first_name' => array('validation' => 'required'),
        'last_name' => array('validation' => 'required'),
        'address' => array('validation' => 'required'),
        'city' => array('validation' => 'required'),
        'postal_code' => array('validation' => 'required'),
        'zip' => array('validation' => 'required'),
        'country' => array('validation' => 'required'),
        'state' => array('validation' => 'required'),
        'phone' => array('validation' => 'required')
    );
    private $user_statuses = array('Active' => 1, 'Disabled' => 0, 'Suspended' => -1, 'Waiting for Email Confirmation' => 2);
    
    private $validation_errors = array();

    function createUser($default_data = array()) {
        $this->load->model('users');
        $data = $this->request->raw_data;
        //Username change string to lowercase
        $data['email'] = strtolower($data['email']);
        $this->validation->validate($data,
                array('email', 'first_name', 'password'), $this->columns);
        if ($this->validation->is_valid === true) {
            $does_user_exist = $this->mUsers->getUserDetails(array('username' => $data['email']));
            if (is_array($does_user_exist[0]) == false) {
                $dbdata['password'] = $this->encryptPassword($data['password']);
                $dbdata['username'] = $data['email'];
                $dbdata['email'] = $data['email'];
                $dbdata['role_id'] = $this->user_roles['Default_User'];
                $dbdata['is_admin'] = false;
                $dbdata['show_guide'] = (bool) true;
                $dbdata['firstname'] = $data['first_name'];
                if ($data['last_name'] != '') {
                    $dbdata['lastname'] = $data['last_name'];
                }
                $dbdata['status'] = $this->user_statuses['Waiting for Email Confirmation'];
                $dbdata['activation_code'] = md5(time() . $data['email']);
                $dbdata['activation_code_generated_at'] = time();
                $dbdata['company'] = $data['company'];
                $dbdata['phone'] = $data['phone'];
                $dbdata['date_added'] = $this->getCurrentTime();

                $result['status'] = 'success';
                $result = $this->mUsers->createUser($dbdata);
                $this->load->library('mailer');
                $mailer = new mailer();
                $mailer->from['email'] = 'info@1grandtrunk.com';
                $mailer->from['name'] = '1GrandTrunk.com';
                $mailer->to[] = array('email' => $dbdata['email'], 'name' => ($dbdata['firstname'] . ' ' . $dbdata['lastname']));
                $mailer->subject = 'Welcome to ' . COMPANY_NAME;
                $mailer->content = str_replace(
                        array(
                    '{{company_name}}',
                    '{{firstname}}',
                    '{{client_address.street}}',
                    '{{client_address.location}}',
                    '{{client_address.city}}',
                    '{{client_address.state}}',
                    '{{client_address.zip}}',
                    '{{client_address.country}}',
                    '{{client_address.phone}}',
                    '{{activation_url}}'
                        ),
                        array(
                    COMPANY_NAME,
                    $dbdata['firstname'],
                    '8/111 Old Trunk Road',
                    'Pallavaram',
                    'Chennai',
                    'TN',
                    '600043',
                    'India',
                    '+91 98438-67676',
                    AppServerURL . 'verify/' . urlencode(base64_encode($dbdata['activation_code']))
                        ), file_get_contents(AppTemplates . 'new_user.html')
                );
                $mailer->sendMail();
                $result = $this->createSuccessResponse($result);
            } else {
                $result = $this->createErrorResponse(array('User Already Exists!!!'));
            }
        } else {
            $result = $this->createErrorResponse($this->validation->is_valid);
        }
        $this->response->outputJson($result);

    }

    function suspendUser() {
        $this->load->model('users');
        $data['status'] = $this->user_statuses['Suspended'];
        $this->mUsers->updateUser($data, $this->request->raw_data['muid']);

    }

    function activeUser() {
        $this->load->model('users');
        $data['status'] = $this->user_statuses['Active'];
        $this->mUsers->updateUser($data, $this->request->raw_data['muid']);

    }


    function createCustomerAddress() {
        $this->load->model('users');
        $data = $this->request->raw_data;

        //Set if Customer add 1st Address set as default
        $addresses_check = $this->mUsers->getUserAddresses($this->request->auth['user']['muid']);
        if ($addresses_check != '') {
            $address['is_default'] = false;
        } else {
            $address['is_default'] = true;
        }
        $this->validation->validate($data,
                array('city', 'state', 'country', 'zip'), $this->columns);
        if ($this->validation->is_valid === true) {
            $addresses = $this->mUsers->getUserAddresses($data['muid']);
            $address['firstname'] = $data['first_name'];
            $address['lastname'] = $data['last_name'];
            $address['company'] = $data['company'];
            $address['street1'] = $data['address'];
            $address['city'] = $data['city'];
            $address['state'] = $data['state'];
            $address['country'] = $data['country'];
            $address['zip'] = $data['zip'];
            $address['phone'] = $data['phone'];
            $this->load->extendController('easypost');
            $address['address_id'] = $this->cEasypost->getAddressId($address);
            $addresses[$address['address_id']] = $address;
            $dbdata['addresses'] = $addresses;
            $this->mUsers->updateUser($dbdata, $data['muid']);
            $result = $this->createSuccessResponse($dbdata);
        } else {
            $result = $this->createErrorResponse($this->validation->is_valid);
        }
        $this->response->outputJson($result);

    }

    function getAddresses() {
        $this->load->model('users');
        $result = $this->mUsers->getUserAddresses($this->request->raw_data['muid']);
        $this->response->outputJson($result);

    }

    function changePassword() {
        $this->load->model('users');
        $data = $this->request->raw_data;
        $userDetails = $this->mUsers->getUserPassword(array('_id' => $data['muid']));
        if ($userDetails[0]['password'] == $this->encryptPassword($data['oldpassword'])) {
            $dbdata['password'] = $this->encryptPassword($data['newpassword']);
            if ($dbdata['password'] != $userDetails[0]['password']) {
                $this->mUsers->updateUser($dbdata, $data['muid']);
                $result = $this->createSuccessResponse('Updated Successfully');
            } else {
                $result = $this->createErrorResponse('Both passwords are same ');
            }
        } else {
            $result = $this->createErrorResponse('Current password does not Match');
        }
        $this->response->outputJson($result);

    }

    function resetPassword() {
        $this->load->model('users');
        $email = $this->request->raw_data['email'];
        //convert string to lower case
        $email = strtolower($email);

        $userDetails = $this->mUsers->getUserDetails(array('email' => $email));
        if ($userDetails[0]['email'] == $email) {
            $data['updated_at'] = $this->getCurrentTime();
            $password = base64_encode(time());
            $data['password'] = $this->encryptPassword($password);
            $data['status'] = 2;
            $result = $this->mUsers->updateUser($data, $userDetails[0]['_id']);
            $this->response->outputJson($this->createSuccessResponse($result));
        } else {
            $error_result['message'][0] = 'Email Does not exists';
            $this->response->outputJson($this->createErrorResponse($error_result));
        }

    }

    function validate() {
        $this->load->model('users');
        $this->load->model('audit_log');
        $data = $this->request->raw_data;
        $result = '';
        //convert string to lower case
        $data['username'] = strtolower($data['username']);
        $result = $this->mUsers->validate($data['username'],
                md5($data['password']));
        if ($result[0]['status'] == 1) {
            $login_status = 'Success';
            $data = array();
            $data['muid'] = (string) $result[0]['_id'];
            $data['firstname'] = $result[0]['firstname'];
            $data['lastname'] = $result[0]['lastname'];
            $data['username'] = $result[0]['username'];
            $data['fullname'] = $data['firstname'] . ' ' . $data['lastname'];
            $data['email'] = $result[0]['email'];

            if ($result[0]['role_id'] > 1) {
                $data['warehouse_name'] = $result[0]['warehouse_name'];
                $data['warehouse_id'] = $result[0]['warehouse_id'];
            } else {
                $data['suite_id'] = $result[0]['suite_id'];
            }
            $data['role_id'] = $result[0]['role_id'];
            $data['is_admin'] = $result[0]['is_admin'];
            $data['show_guide'] = $result[0]['show_guide'];

            $result = $this->jwt->generateToken($data);
        } elseif ($result[0]['status'] == 2) {
            $result = array();
            $login_status = 'Failure';
            $result['error'] = 'Email Verfication not done';
        } else {
            $login_status = 'Failure';
            $result['error'] = 'Invalid Credentials';
        }
        $useragent = $this->request->server['HTTP_USER_AGENT'];


        $detect = new Mobile_Detect;
        $auditLogDetails['status'] = $login_status;
        $auditLogDetails['username'] = $data['username'];
        $auditLogDetails['browser'] = $this->request->server['HTTP_USER_AGENT'];
        $auditLogDetails['remote_addresses'] = $this->request->server['REMOTE_ADDR'];
        $auditLogDetails['remote_port'] = $this->request->server['REMOTE_PORT'];
        $auditLogDetails['refferer'] = $this->request->server['HTTP_REFERER'];
        $auditLogDetails['query_string'] = $this->request->server['QUERY_STRING'];
        $auditLogDetails['req_time'] = $this->request->server['REQUEST_TIME_FLOAT'];
        $auditLogDetails['req_method'] = $this->request->server['REQUEST_METHOD'];
        $auditLogDetails['device_type'] = ($detect->isMobile() ? ($detect->isTablet() ? 'tablet' : 'phone') : 'computer');
        $auditLogDetails['created_at'] = $this->getCurrentTime();
        $this->mAuditLog->addAuditLog($auditLogDetails);
        $this->response->outputJson($result);

    }

    function changeUserName() {
        $this->load->model('users');
        $data = $this->request->raw_data;
        $this->mUsers->updateUser($data, $data['muid']);
        $result = $this->mUsers->getUserDetails(array('_id' => $data['muid']));
        $data['muid'] = (string) $result[0]['_id'];
        $data['firstname'] = $result[0]['firstname'];
        $data['lastname'] = $result[0]['lastname'];
        $data['username'] = $result[0]['username'];
        $data['email'] = $result[0]['email'];
        $data['suite_id'] = $result[0]['suite_id'];
        $data['role_id'] = $result[0]['role_id'];
        $data['is_admin'] = $result[0]['is_admin'];

        $token = $this->jwt->generateToken($data);
        $this->response->outputJson($token);

    }

    function encryptPassword($str) {
        return md5($str);

    }

    function decryptPassword() {
        
    }

    function getUsers() {
        $this->load->model('users');
        $result = $this->mUsers->getUsers();
        $this->response->outputJson($result);

    }

    function getCustomerDetails() {
        $this->load->model('users');
        $filter_condition = $this->request->raw_data['filter']['muid'];
        $result = $this->mUsers->getUsers(array('_id' => $filter_condition));
        $this->response->outputJson($this->createSuccessResponse($result));

    }

    function getUserList() {
        $data = $this->request->raw_data;
        $filter_condition = $data['filter'];
        if (!is_array($filter_condition)) {
            $filter_condition = array();
        }
        if (isset($filter_condition['role_id'])) {
            if (is_array($filter_condition['role_id'])) {
                foreach ($filter_condition['role_id'] as $key => $value) {
                    $role_id_condition['$in'][] = (int) $value;
                }
                $filter_condition['role_id'] = $role_id_condition;
            } else {
                $filter_condition['role_id'] = (int) $filter_condition['role_id'];
            }
        }
        $this->load->model('users');
        $result['result'] = $this->mUsers->getUsers($filter_condition);
        $this->response->outputJson($result);

    }
    
    function refreshToken() {
        $result = $this->jwt->refreshToken($this->request->server['HTTP_Authorization']);
        $this->response->outputJson($result);

    }

    function validation($data) {

        foreach ($this->columns as $key => $value) {
            if ($value['required'] == true && $data[$key] == '') {
                $this->validation_errors[] = $key . ' is required';
            }
        }
        if (count($this->validation_errors) === 0) {
            return true;
        } else {
            return false;
        }

    }

    function deleteUser() {
        $this->load->model('users');
        $data = $this->request->raw_data;
        $this->mUsers->deleteUser($data['muid']);

    }

    function deleteUserAddresses() {
        $this->load->model('users');
        //Query for user record
        $current_address_selected_id = $this->request->raw_data['address_id'];
        $muid = $this->request->auth['user']['muid'];
        $userDetails = $this->mUsers->getUserDetails(array('_id' => $muid));
        $addresses = $userDetails[0]['addresses'];
        $deleted_addresses = (array) $userDetails[0]['deleted_addresses'];
        $deleted_addresses[] = $addresses[$current_address_selected_id];
        unset($addresses[$current_address_selected_id]);
        $columns['addresses'] = $addresses;
        $columns['deleted_addresses'] = $deleted_addresses;
        $this->response->outputJson($this->createSuccessResponse($this->mUsers->updateUser($columns,
                                $muid)));

    }

    /**
     * Login with Facebook.
     */
    public function validateFacebook() {

        $data = $this->request->raw_data;
        $client = new GuzzleHttp\Client();
        $data['secret_id'] = '7bb581db5d815e73551da924737108f9';
        $params = [
            'code' => $data['code'],
            'client_id' => $data['clientId'],
            'redirect_uri' => $data['redirectUri'],
            'client_secret' => $data['secret_id']
        ];
        // Step 1. Exchange authorization code for access token.
        $accessTokenResponse = $client->request('GET',
                'https://graph.facebook.com/v2.5/oauth/access_token',
                [
            'query' => $params
        ]);
        $accessToken = json_decode($accessTokenResponse->getBody(), true);
        // Step 2. Retrieve profile information about the current user.
        $fields = 'id,email,first_name,last_name,link,name';
        $profileResponse = $client->request('GET',
                'https://graph.facebook.com/v2.5/me',
                [
            'query' => [
                'access_token' => $accessToken['access_token'],
                'fields' => $fields
            ]
        ]);
        $profile = json_decode($profileResponse->getBody(), true);
        // Step 3a. If user is already signed in then link accounts.
        $this->load->model('users');
        if (is_array($profile)) {

            $user = $this->mUsers->getUsers(array('username' => $profile['email']));
            if (is_array($user[0])) {
                if (!isset($user[0]['facebook'])) {
                    $facebook_details['facebook'] = $profile['id'];
                    $facebook_details['link'] = $profile['link'];
                    $facebook_details['fullname'] = $profile['name'];
                    $this->mUsers->updateUser($facebook_details,
                            $user[0]['muid']);
                }
                $user = $user[0];
            } else {
                $facebook_details['facebook'] = $profile['id'];
                $facebook_details['email'] = $profile['email'];
                $facebook_details['username'] = $profile['email'];
                $facebook_details['firstname'] = $profile['first_name'];
                $facebook_details['lastname'] = $profile['last_name'];
                $facebook_details['link'] = $profile['link'];
                $facebook_details['fullname'] = $profile['name'];
                $facebook_details['role_id'] = $this->user_roles['Default_User'];
                $facebook_details['status'] = $this->user_statuses['Active'];
                $user_id = $this->mUsers->createUser($facebook_details);
                $facebook_details['muid'] = $user_id['muid'];
                $mailDetails['social_login_type'] = 'Facebook';
                $mailDetails['email'] = $profile['email'];
                $mailDetails['firstname'] = $profile['first_name'];
                $mailDetails['lastname'] = $profile['last_name'];
                $mailResponse = $this->sendWelcomeMail($mailDetails);

                $user = $facebook_details;
            }
            $result = $this->jwt->generateToken($user);
            $this->response->outputJson($result);
        }

    }

    /**
     * Login with Google.
     */
    public function validateGoogle() {

        $data = $this->request->raw_data;
        $client = new GuzzleHttp\Client();
        //Client Id
        $data['secret_id'] = 'H-KDHxrH1uAVy4FgsxH6YNJq';
        $params = [
            'code' => $data['code'],
            'client_id' => $data['clientId'],
            'client_secret' => $data['secret_id'],
            'redirect_uri' => $data['redirectUri'],
            'grant_type' => 'authorization_code',
            'headers' => [
                'User-Agent' => 'Mozilla/5.0 (X11; Linux x86_64; rv:31.0) Gecko/20100101 Firefox/31.0',
            ],
        ];
        // Step 1. Exchange authorization code for access token.
        $accessTokenResponse = $client->request('POST',
                'https://accounts.google.com/o/oauth2/token',
                [
            'form_params' => $params,
        ]);

        $accessToken = json_decode($accessTokenResponse->getBody(), true);

        // Step 2. Retrieve profile information about the current user.
        $profileResponse = $client->request('GET',
                'https://www.googleapis.com/plus/v1/people/me/openIdConnect',
                [
            'headers' => array('Authorization' => 'Bearer ' . $accessToken['access_token'],
                ['debug' => true])
        ]);
        $profile = json_decode($profileResponse->getBody(), true);
        // Step 3a. If user is already signed in then link accounts.
        $this->load->model('users');
        //Query for email id 

        $user = $this->mUsers->getUsers(array('username' => $profile['email']));
//        $user = $this->mUsers->getUsers(array('google' => $profile['sub']));

        if (is_array($user[0])) {
            if (!isset($user[0]['google'])) {
                $google_details['google'] = $profile['sub'];
                $google_details['profile'] = $profile['profile'];
                $google_details['picture'] = $profile['picture'];
                $google_details['email_verified'] = $profile['email_verified'];
                $google_details['locale'] = $profile['locale'];
                $google_details['fullname'] = $profile['name'];
                $google_details['gender'] = $profile['gender'];
                $this->mUsers->updateUser($google_details, $user[0]['muid']);
            }
            $user = $user[0];
        }
        // Step 3b. Create a new user account or return an existing one.
        else {
            $google_details['gender'] = $profile['gender'];
            $google_details['google'] = $profile['sub'];
            $google_details['fullname'] = $profile['name'];
            $google_details['firstname'] = $profile['given_name'];
            $google_details['lastname'] = $profile['family_name'];
            $google_details['profile'] = $profile['profile'];
            $google_details['picture'] = $profile['picture'];
            $google_details['email'] = $profile['email'];
            $google_details['username'] = $profile['email'];
            $google_details['email_verified'] = $profile['email_verified'];
            $google_details['locale'] = $profile['locale'];
            $google_details['role_id'] = $this->user_roles['Default_User'];
            $google_details['status'] = $this->user_statuses['Active'];
            $user_id = $this->mUsers->createUser($google_details);
            $google_details['muid'] = $user_id['muid'];
            $mailDetails['social_login_type'] = 'Google';
            $mailDetails['email'] = $profile['email'];
            $mailDetails['firstname'] = $profile['given_name'];
            $mailDetails['lastname'] = $profile['family_name'];
            $mailResponse = $this->sendWelcomeMail($mailDetails);
            $user = $google_details;
        }
        $result = $this->jwt->generateToken($user);
        $this->response->outputJson($result);

    }

    /**
     * Login with Pinterest.
     */
    public function validatePinterest() {

        $data = $this->request->raw_data;
        $client = new GuzzleHttp\Client();
        //Client Id
        $data['client_secret'] = 'df2195f7688b91997db0387292e1611ae05092b343e130df46ef621125ea3fb5';
        $params = [
            'grant_type' => 'authorization_code',
            'client_id' => $data['clientId'],
            'client_secret' => $data['client_secret'],
            'code' => $data['code']
//            'redirect_uri' => $data['redirectUri'],
        ];
        // Step 1. Exchange authorization code for access token.
        $accessTokenResponse = $client->request('POST',
                'https://api.pinterest.com/v1/oauth/token',
                [
            'query' => $params
                ]
//                ['fields' => array('first_name', 'last_name', 'id', 'url', 'counts', 'created_at', 'creator', 'description')]
        );

        $accessToken = json_decode($accessTokenResponse->getBody(), true);

        // Step 2. Retrieve profile information about the current user.
        $profileResponse = $client->request('GET',
                'https://api.pinterest.com/v1/me/',
                [
            'query' => array('access_token' => $accessToken['access_token']
//                'fields' => 'first_name', 'last_name', 'image',  'url', 'id'
            )
                ]
        );

        $profile = json_decode($profileResponse->getBody(), true);
        $profile = [$profile][0]['data'];

        $pinterest_details['pinterest_id'] = $profile['id'];
        $pinterest_details['url'] = $profile['url'];
        $pinterest_details['firstname'] = $profile['first_name'];
        $pinterest_details['lastname'] = $profile['last_name'];

        // Step 3a. If user is already signed in then link accounts.
        $this->load->model('users');
        //Query for email id 

        $user = $this->mUsers->getUsers(array('pinterest_id' => $profile['id']));

        if (is_array($user[0])) {
            if (!isset($user[0]['pinterest_id'])) {
                $pinterest_details['pinterest_id'] = $profile['id'];
                $pinterest_details['url'] = $profile['url'];
                $pinterest_details['firstname'] = $profile['first_name'];
                $pinterest_details['lastname'] = $profile['last_name'];
                $this->mUsers->updateUser($pinterest_details, $user[0]['muid']);
                $pinterest_details['email'] = $user['email'];
                $pinterest_details['username'] = $user['username'];
            }
            $user = $user[0];
        }
        // Step 3b. Create a new user account or return an existing one.
        else {
            $pinterest_details['pinterest_id'] = $profile['id'];
            $pinterest_details['url'] = $profile['url'];
            $pinterest_details['firstname'] = $profile['first_name'];
            $pinterest_details['lastname'] = $profile['last_name'];

            $pinterest_details['role_id'] = $this->user_roles['Default_User'];
            $pinterest_details['status'] = $this->user_statuses['Active'];
            $user_id = $this->mUsers->createUser($pinterest_details);
            $pinterest_details['muid'] = $user_id['muid'];
            $user = $pinterest_details;
        }

        $result = $this->jwt->generateToken($user);
        $this->response->outputJson($result);

    }


    function socialLogin() {
        $hybridAuth = new Hybrid_Auth();
//        $adapter=$hybridAuth->authenticate

    }

    function verifyEmail() {
        $this->load->model('users');
        $data = $this->request->raw_data;
        $user = $this->mUsers->getUserByActivationCode(base64_decode(urldecode($data['activation_code'])));
        if (is_array($user[0])) {
            if ($user[0]['status'] == $this->user_statuses['Active']) {
                $result = -1;
            } else {
                unset($data['activation_code']);
                $data['status'] = $this->user_statuses['Active'];
                $this->mUsers->updateUser($data, $user[0]['_id']);
                $result = true;
            }
        } else {
            $result = false;
        }
        $this->response->outputJson($this->createSuccessResponse($result));

    }

    function forgotPassword() {
        $this->load->model('users');
        $data = $this->request->raw_data;
        $user_details = $this->mUsers->getUserByEmail($data['email']);
        if (is_array($user_details[0])) {

            $seed = str_split('abcdefghijklmnopqrstuvwxyz'
                    . 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
                    . '0123456789!@#$%^&*()');
            shuffle($seed);
            $rand = '';
            foreach (array_rand($seed, 8) as $k)
                $password .= $seed[$k];
            $encrpt_password['password'] = md5($password);
            //upadate auto generated password
            $this->mUsers->updateUser($encrpt_password, $user_details[0]['_id']);
            //Send password to mail
            $this->load->library('mailer');
            $mailer = new mailer();
            $mailer->from['email'] = 'info@1grandtrunk.com';
            $mailer->from['name'] = '1GrandTrunk.com';
            $fullname = $user_details[0]['firstname'] . ' ' . $user_details[0]['lastname'];
            $mailer->to[] = array('email' => $user_details[0]['email'], 'name' => $fullname);
            $mailer->subject = COMPANY_NAME . ' - Password Reset initiated';

            $mailer->content = str_replace(
                    array(
                '{{company_name}}',
                '{{firstname}}',
                '{{client_address.street}}',
                '{{client_address.location}}',
                '{{client_address.city}}',
                '{{client_address.state}}',
                '{{client_address.zip}}',
                '{{client_address.country}}',
                '{{client_address.phone}}',
                '{{password}}'
                    ),
                    array(
                COMPANY_NAME,
                $user_details[0]['firstname'],
                '8/111 Old Trunk Road',
                'Pallavaram',
                'Chennai',
                'TN',
                '600043',
                'India',
                '+91 98438-67676',
                $password
                    ), file_get_contents(AppTemplates . 'forgot_password.html')
            );
            $mailer->sendMail();
            $result = 'Password sent to your email';
            $this->response->outputJson($this->createSuccessResponse($result));
        } else {
            $result = 'No account found with that email address';
            $this->response->outputJson($this->createErrorResponse($result));
        }

    }

}
