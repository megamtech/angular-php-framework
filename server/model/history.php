<?php

/**
 * Description of order_history
 *
 * @author megamtech
 */
class mHistory extends Model {

    private $table = 'history';
    private $sort_field = 'created_at';

    function addHistory($data) {
        $this->db->table = $this->table;
        $this->db->column = $data;
        return $this->db->create();

    }

    function getHistory($condition) {

        $this->db->table = $this->table;
        return $this->removeIds($this->db->addWhereCondition($condition)->addOrderBy(array(
                            $this->sort_field => 'desc'))->read());

    }

}
