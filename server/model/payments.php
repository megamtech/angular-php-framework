<?php

/**
 * Description of payments
 *
 * @author megamtech
 */
class mPayments extends Model {

    private $table = "payments";
    private $sort_field = array('name');
    private $primary_key = '_id';

    function createPayment($payment_info) {

        $this->db->table = $this->table;
        $this->db->column = $payment_info;
        $payment_id = $this->db->getNextSequence($this->table . '_payment_id');
        $this->db->column['payment_id'] = $payment_id;
        return array('muid' => (string) $this->db->create(), 'payment_id' => $payment_id);
    }

    function updatePayment($paymentDetails, $id) {
        $this->db->table = $this->table;
        $this->db->column = $paymentDetails;
        return $this->db->addWhereCondition(array('payment_id' => $id))->update();
    }
    
    function getPaymentDetails($id,$paymentColumns=array()){
        $this->db->table = $this->table;
        $this->db->column = $paymentColumns;
        return $this->removeIds($this->db->addWhereCondition(array('payment_id' => $id))->read());
    }

}
