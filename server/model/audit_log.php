<?php

/**
 * Description of orders
 *
 * @author megamtech
 */
class mAuditLog extends Model {

    private $table = "audit_log";
    private $sort_field = array('name');
    private $primary_key = '_id';


    function addAuditLog($data) {
        $this->db->table = $this->table;
        $this->db->column = $data;
        $id = $this->db->create();

        return array('muid' => (string) $id);

    }

    function updateAuditLog($data, $id) {
        
        $this->db->table = $this->table;
        $this->db->column = $data;
        return $this->db->addWhereCondition(array($this->primary_key => $id))->update();

    }

    function getAuditLog($condition = array(),$columns=array()) {
        $this->db->table = $this->table;
        $this->db->column = $columns;
//        $condition['status_status_id']=(string)"1";
        return $this->removeIds($this->db->addWhereCondition($condition)->addOrderBy($this->sort_field)->read());

    }

}
