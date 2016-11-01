<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of mUsers
 *
 * @author gmsundar
 */
class mUsers extends model {

    private $table = '__users';
    private $columns = array();
    private $primary_key = '_id';

    function getUsers($condition, $columns = array(), $limit = 0) {
        $this->db->table = $this->table;
        $this->db->column = $columns;
        if ($limit > 0) {
            $this->db->addLimit($limit);
        }
        return $this->removeIds($this->db->addWhereCondition($condition)->read());

    }

    function createUser($data) {
        $data['user_id'] = $this->db->getNextSequence($this->table . '_user_id');
        $this->db->column = $data;
        $this->db->table = $this->table;
        $id = $this->db->create();
        return array('muid' => (string) $id);
    }

    function addAdminUser($data) {
        $data['user_id'] = $this->db->getNextSequence($this->table . '_user_id');
        $this->db->column = $data;
        $this->db->table = $this->table;
        return $this->db->create();

    }

    function savePreferences($data, $id) {
        $this->db->column = $data;
        $this->db->table = $this->table;
        return $this->db->addWhereCondition(array('_id' => $id))->update();

    }

    function getPreferences($id) {
        $this->db->table = $this->table;
        $data = $this->db->addWhereCondition(array('_id' => $id))->read();
        return $data[0]['preferences'];

    }

    function getUserSuiteId() {
        return $this->db->getNextSequence('user_suite_id');

    }

    function validate($username, $password) {
        $this->db->table = $this->table;
//Status 1 = Active User;
        return $this->db->addWhereCondition(array('username' => $username, 'password' => $password))->read();

    }

    function getUserAddresses($user_id) {
        $this->db->table = $this->table;
//Status 1 = Active User;
        $data = $this->db->addWhereCondition(array('_id' => $user_id,
                    'status' => 1))->read();
        return $data[0]['addresses'];

    }

    function deleteUser($id) {
        $this->db->table = $this->table;
        $this->db->column['status'] = 0;
        return $this->db->addWhereCondition(array($this->primary_key => $id))->update();

    }

    function updateUser($data, $id) {
        $this->db->table = $this->table;
        $this->db->column = $data;
        return $this->db->addWhereCondition(array('_id' => $id))->update();

    }

    function getUserDetails($condition) {
        $this->db->table = $this->table;
        $this->db->column = array('email' => 1, 'firstname' => 1, 'lastname' => 1,
            'username' => 1, 'role_id' => 1, 'status' => 1, 'is_admin' => 1, 'addresses' => 1, 'suite_id'=>1);
        return $this->db->addWhereCondition($condition)->read();

    }

    function getUserPassword($condition) {
        $this->db->table = $this->table;
        $this->db->column = array('password' => 1);
        return $this->db->addWhereCondition($condition)->read();

    }

    function getUserById($user_id) {
        $this->db->table = $this->table;
        return $this->db->addWhereCondition(array($this->primary_key => $user_id))->read();

    }

    function getUserByActivationCode($activation_code) {
        $this->db->table = $this->table;
        return $this->db->addWhereCondition(array('activation_code' => $activation_code))->read();

    }

    function getUserByEmail($email) {
        $this->db->table = $this->table;
        return $this->db->addWhereCondition(array('email' => $email))->read();

    }

}
