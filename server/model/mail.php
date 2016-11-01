<?php

class mMail extends Model {

    private $table = 'mail';
    private $sort_field = array('created_at');
    private $primary_key = '_id';

    function create($data) {
        $this->db->table = $this->table;
        $data['status']=(int)1;
        $this->db->column = $data;
        $this->db->create();

    }
    function getUnSentMail() {
        $this->db->table = $this->table;
        return $this->removeIds($this->db->addWhereCondition($condition)->addOrderBy(array('created_at'=>1))->read());
    }
    
    function updateMail($data,$id){
        $this->db->table = $this->table;
        $this->db->column=$data;
        return $this->db->addWhereCondition(array($this->primary_key=>$id))->update();
    }

}
