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
        'SuperAdmin' => -1);
    private $validation_errors = array();

    function createUser($default_data = array()) {
        $this->load->model('users');
        $data = $this->request->raw_data;
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
                $dbdata['firstname'] = $data['first_name'];
                $dbdata['lastname'] = $data['last_name'];
                $dbdata['status'] = $this->user_statuses['Active'];
                $dbdata['company'] = $data['company'];
                $dbdata['phone'] = $data['phone'];
                $dbdata['date_added'] = $this->getCurrentTime();

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
        $role_name = array_search($data['role_id'], $this->user_roles);
        $data['role_id'] = (int) $data['role_id'];
        $data['username'] = $data['email'];
        $data['is_admin'] = false;
        $data['status'] = 1;
        $data['role_name'] = $role_name;
        $data['date_added'] = $this->getCurrentTime();
        $result = $this->mUsers->addAdminUser($data);
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
        $data['role_id'] = $result[0]['role_id'];
        $data['is_admin'] = $result[0]['is_admin'];

        $token = $this->jwt->generateToken($data);
        $this->response->outputJson($token);

    }

    function encryptPassword($str) {
        return md5($str);

    }


    function getUsers() {
        $this->load->model('users');
        $result = $this->mUsers->getUsers();
        $this->response->outputJson($result);

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


    

}
