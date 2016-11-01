<?php

/**
 * Description of request
 *
 * @author gmsundar
 */
class Request {

    public $get = array();
    public $post = array();
    public $cookie = array();
    public $files = array();
    public $server = array();
    public $auth = array();

    public function __construct() {
        $this->get = $this->clean($_GET);
        $this->post = $this->clean($_POST);
        $this->request = $this->clean($_REQUEST);
        $this->cookie = $this->clean($_COOKIE);
        $this->files = $this->clean($_FILES);
        $this->server = $this->clean($_SERVER);
        $this->raw_data = $this->clean(json_decode(file_get_contents('php://input'), true));
    }

    public function clean($data) {
        if (is_array($data)) {
            foreach ($data as $key => $value) {
                unset($data[$key]);

                $data[$this->clean($key)] = $this->clean($value);
            }
        } else {
            $data = htmlspecialchars($data, ENT_COMPAT, 'UTF-8');
        }

        return $data;
    }

    public function setAuthorizationDetails($user_token_details) {
        if (is_object($user_token_details)) {
            $this->auth['user'] = (array) $user_token_details->data;
            $this->auth['token'] = (array) $user_token_details;
        }
    }

}
