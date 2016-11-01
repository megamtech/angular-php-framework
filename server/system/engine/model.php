<?php

/**
 * Description of model
 *
 * @author megamtech
 */
abstract class Model {

    protected $registry;

    public function __construct($registry) {
        $this->registry = $registry;

    }

    public function __get($key) {
        return $this->registry->get($key);

    }

    public function __set($key, $value) {
        $this->registry->set($key, $value);

    }

    public function removeIds($data) {

        if (is_array($data)) {
            $result = array();
            foreach ((array) $data as $key => $value) {
                $result[$key] = $value;
                $result[$key]['muid'] = (string) $value['_id'];
                unset($result[$key]['_id']);
            }
        }
        return $result;

    }

    public function addCreatedMeta($data, $created_by = '') {
        $data['created_by'] = $created_by != '' ? $created_by : $this->request->auth['user']['muid'];
        $data['created_by_name'] = $this->request->auth['user']['fullname'];
        $data['created_at'] = '&current_time&';
        $data['updated_by'] = $created_by != '' ? $created_by  : $this->request->auth['user']['muid'];
        $data['updated_by_name'] =  $this->request->auth['user']['fullname'];
        $data['updated_at'] = '&current_time&';
        return $data;

    }

    public function addUpdatedMeta($data, $updated_by = '') {

        $data['updated_by'] = $updated_by != '' ? $updated_by : $this->request->auth['user']['muid'];
        $data['updated_by_name'] =  $this->request->auth['user']['fullname'];
        $data['updated_at'] = '&current_time&';
        return $data;

    }

}
