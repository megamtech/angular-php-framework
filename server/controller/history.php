<?php

/**
 * Description of order_history
 *
 * @author megamtech
 */
class cHistory extends controller {

    private $columns = array(
        'ref_id' => array('validation' => 'required'),
        'created_by' => array('validation' => 'required'),
        'created_at' => array('validation' => 'required'),
        'status_name' => array('validation' => 'required'),
        'status_id' => array('validation' => 'required'),
        'type' => array('validation' => 'required'),
        'user_id' => array('validation' => 'required')
    );
    private $primary_key = array('data' => 'muid', 'db' => '_id');
    private $is_valid = false;

    function addHistory($historyInfo) {

        $this->load->model('history');
        $this->validation->validate($historyInfo,
                array('ref_id', 'created_by', 'created_at', 'status_name', 'status_id',
            'type'), $this->columns);
        if ($this->validation->is_valid === true) {
            $result = $this->mHistory->addHistory($historyInfo);
            $this->createSuccessResponse($result);
        } else {
            $this->createErrorResponse($this->validation->is_valid);
        }

    }

    
    function getHistoryByUser() {
        $this->load->model('history');
        $this->response->outputJson($this->createSuccessResponse($this->mHistory->getHistory(array(
                            'created_by' => $this->request->raw_data['filter']['muid']))));
    }  

}
