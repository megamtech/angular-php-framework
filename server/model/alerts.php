<?php

/**
 * Description of alerts
 *
 * @author sundar
 */
class mAlerts extends Model {

    private $table = 'alerts';
    private $sort_field = array('user_id');
    private $primary_key = '_id';

    function create($data) {
        $this->db->table = $this->table;
        $this->db->column = $data;
        $id = $this->db->create();
        return array('muid' => (string) $id);
    }

    function update($data, $condition) {
        $this->db->table = $this->table;
        $this->db->column = $data;
        return $this->db->addWhereCondition(array($condition))->update();
    }

    function getList($condition,$limit=-1) {
        $this->db->table = $this->table;
        
        return $this->removeIds($this->db->addWhereCondition($condition)->addLimit($limit)->addOrderBy(array('created_at'=>1))->read());
    }

}
