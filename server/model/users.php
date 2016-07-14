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

    function getUsers($condition,$columns=array()) {
        $this->db->table = $this->table;
        $this->db->column=$columns;
        return $this->removeIds($this->db->addWhereCondition($condition)->read());

    }

    function createUser($data) {
        $data['user_id']= $this->db->getNextSequence($this->table . '_user_id');
        $this->db->column = $data;
        $this->db->table = $this->table;
        return $this->db->create();

    }
    function addAdminUser($data) {
        $data['user_id']= $this->db->getNextSequence($this->table . '_user_id');
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
        return $this->db->addWhereCondition(array('username' => $username, 'password' => $password,
                    'status' => 1))->read();

    }

    function getUserAddresses($user_id) {
        $this->db->table = $this->table;
//Status 1 = Active User;
        $data = $this->db->addWhereCondition(array('_id' => $user_id,
                    'status' => 1))->read();
        return $data[0]['addresses'];

    }

    function updateUser($data, $id) {
        $this->db->table = $this->table;
        $this->db->column = $data;
        return $this->db->addWhereCondition(array('_id' => $id))->update();

    }

    function getUserDetails($condition) {
        $this->db->table = $this->table;
        return $this->db->addWhereCondition($condition)->read();

    }
    function getUserById($user_id) {
        $this->db->table = $this->table;
        return $this->db->addWhereCondition(array($this->primary_key=>$user_id))->read();

    }

}
