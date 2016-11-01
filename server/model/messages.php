<?php

/**
 * Description of messages
 *
 * @author sundar
 */
class mMessages extends Model {

    private $table = 'messages';
    private $sort_field = array('created_at'=>-1);
    private $primary_key = '_id';

    function create($data) {
        $this->db->table = $this->table;
        $this->db->column = $data;
        $id = $this->db->create();
        return array('muid' => (string) $id);
    }

    function delete($id) {
        $this->db->table = $this->table;
        return $this->db->addWhereCondition(array($this->primary_key => $id))->delete();
    }

    function update($data, $id) {
        $this->db->table = $this->table;
        $this->db->column = $data;
        return $this->db->addWhereCondition(array($this->primary_key => $id))->update();
    }

    function getList($condition,$limit=0) {
        $this->db->table = $this->table;
        return $this->removeIds(
                $this->db->addWhereCondition($condition)
                ->addLimit($limit)
                ->addOrderBy($this->sort_field)
                ->read()
                );
    }

    function getMessageById($id) {
        $this->db->table = $this->table;
        return $this->removeIds($this->db->addWhereCondition(array($this->primary_key => $id))->read());
    }

}
