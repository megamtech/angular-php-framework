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
        'phone' => array('validation' => 'required'),
        'security_question' => array('validation' => 'required'),
        'security_answer' => array('validation' => 'required'),
        'shipping_carrier' => array('validation' => 'required'),
        'discard_boxes_status' => array('validation' => 'required'),
        'photo_status' => array('validation' => 'required')
    );
    private $user_statuses = array('Active' => 1, 'Disabled' => 0, 'Suspended' => 1);
    public $user_roles = array('Default_User' => 1, 'Manager' => 2, 'Admin' => 3,
        'SuperAdmin' => -1, 'PurchaseManager' => 4);
    private $validation_errors = array();

    function createUser($default_data = array()) {
        $this->load->model('users');
        $data = $this->request->raw_data;
        $this->validation->validate($data,
                array('email', 'first_name', 'password'), $this->columns);
        if ($this->validation->is_valid === true) {
            $does_user_exist = $this->mUsers->getUserDetails(array('username' => $data['email']));
            if (is_array($does_user_exist[0]) == false) {
                $dbdata['suite_id'] = $this->mUsers->getUserSuiteId();
                $dbdata['password'] = $this->encryptPassword($data['password']);
                $dbdata['username'] = $data['email'];
                $dbdata['email'] = $data['email'];
                $dbdata['role_id'] = $this->user_roles['Default_User'];
                $dbdata['is_admin'] = false;
                $dbdata['firstname'] = $data['first_name'];
                $dbdata['lastname'] = $data['last_name'];
                $dbdata['status'] = $this->user_statuses['Active'];
                $dbdata['company'] = $data['company'];
                $dbdata['phone'] = $data['phone'];
                $dbdata['date_added'] = $this->getCurrentTime();

//                if ($data['address'] || $data['city'] || $data['state'] || $data['country'] || $data['postal_code']) {
//                    $address['firstname'] = $data['first_name'];
//                    $address['lastname'] = $data['last_name'];
//                    $address['company'] = $data['company'];
//                    $address['address'] = $data['address'];
//                    $address['city'] = $data['city'];
//                    $address['state'] = $data['state'];
//                    $address['country'] = $data['country'];
//                    $address['zip'] = $data['postal_code'];
//                    $address['phone'] = $data['phone'];
//
//                    $this->load->extendController('easypost');
//                    $address['address_id'] = $this->cEasypost->addAddress($address);
//
//                    $dbdata['addresses'][$address['address_id']] = $address;
//                }

                $result['status'] = 'success';
                $result = $this->createSuccessResponse($this->mUsers->createUser($dbdata));
            } else {
                $result = $this->createErrorResponse(array('User Already Exists!!!'));
            }
        } else {
            $result = $this->createErrorResponse($this->validation->is_valid);
        }
        $this->response->outputJson($result);

    }

    function addAdminUser() {
        $this->load->model('users');
        $this->load->model('warehouse_location');
        $data = $this->request->raw_data;
//        $this->validation->validate($data, array('email', 'warehouse_name', 'role_id'), $this->columns);
//        if ($this->validation->is_valid === true) {
        $role_name = array_search($data['role_id'], $this->user_roles);
        $data['role_id'] = (int) $data['role_id'];
        $data['username'] = $data['email'];
        $data['is_admin'] = false;
        $data['status'] = 1;
        $data['role_name'] = $role_name;
        $data['date_added'] = $this->getCurrentTime();
        $wareHouseDetails = $this->mWarehouseLocation->getWareHouseLocations(array(
            '_id' => $data['warehouse_id']));
        $data['warehouse_name'] = $wareHouseDetails[0]['store_name'];
        $result = $this->mUsers->addAdminUser($data);
        $this->response->outputJson($result);
//}

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
        $userDetails = $this->mUsers->getUserDetails(array('_id' => $data['muid']));
        if ($userDetails[0]['password'] == $this->encryptPassword($data['oldpassword'])) {
            $dbdata['password'] = $this->encryptPassword($data['newpassword']);
            if ($dbdata['password'] != $userDetails[0]['password']) {
                $result = $this->mUsers->updateUser($dbdata, $data['muid']);
                if ($result) {
                    $result = 'Updated Successfully';
                }
            } else {
                $result['status'] = 'error';
                $result['messages'][] = 'Both passwords are same ';
            }
        } else {
            $result['status'] = 'error';
            $result['messages'][] = 'Current password does not Match';
        }
        $this->response->outputJson($result);

    }

    function resetPassword() {
        $this->load->model('users');
        $email = $this->request->raw_data['email'];
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

        $result = $this->mUsers->validate($data['username'],
                md5($data['password']));

        if ($result) {
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

            $result = $this->jwt->generateToken($data);
        } else {
            $login_status = 'Failure';
            $result['error'] = 'User Not found';
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

    function savePreferences() {
        $this->load->model('users');
        $data = $this->request->raw_data;
        //Do validation for the data
        //$data['status'] = (int) $data['status'];
        $this->validation->validate($data,
                array(
            'discard_boxes_status', 'photo_status'), $this->columns);
        if ($this->validation->is_valid === true) {
            $dbdata['preferences']['photo_status'] = (int) $data['photo_status'];
            $dbdata['preferences']['discard_boxes_status'] = (int) $data['discard_boxes_status'];
            $dbdata['preferences']['shipping_carrier'] = $data['shipping_carrier'];
            $user_id = $data['muid'];
            unset($data['muid']);
            $result = $this->createSuccessResponse($this->mUsers->savePreferences($dbdata,
                            $user_id));
        } else {
            $result = $this->createErrorResponse($this->validation->is_valid);
        }
        $this->response->outputJson($result);

    }

    function saveDefaultAddress() {
        $this->load->model('users');
        $data = $this->request->raw_data;
        $addresses = $this->mUsers->getUserAddresses($this->request->auth['user']['muid']);
        foreach ($addresses as $key => $value) {
            if ($data['address_id'] == $key) {
                $addresses[$key]['is_default'] = true;
            } else {
                $addresses[$key]['is_default'] = false;
            }
        }
        $this->response->outputJson($this->createSuccessResponse($this->mUsers->updateUser(array(
                            'addresses' => $addresses),
                                $this->request->auth['user']['muid'])));
        //update the user with the user_id

    }

    function getPreferences() {
        $user_id = $this->request->raw_data['muid'];
        $this->load->model('users');
        $this->response->outputJson($this->createSuccessResponse($this->mUsers->getPreferences($user_id)));

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

    function validateFacebook() {
    print_r($this->request->raw_data);
    $provider='facebook';
    
    //$this->socialLogin($provider);
    exit;    
    }
    function socialLogin(){
        $hybridAuth=new Hybrid_Auth();
//        $adapter=$hybridAuth->authenticate
    }

}
