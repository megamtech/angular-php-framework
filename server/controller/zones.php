<?php

/**
 * Description of zone
 *
 * @author megamtech
 */
class cZones extends controller {

    private $columns = array(
        'zone_name' => array('validation' => 'required|alpha_space'),
        'zone_code' => array('validation' => 'required|alpha_space'),
        'country' => array('validation' => 'required|alpha_space'),
        'status_type' => array('validation' => 'required|integer')
    );
    private $primary_key = array('data' => 'muid', 'db' => '_id');
    private $validation_errors = array();

    function addZone() {
        $this->load->model('zones');
        $data = $this->request->raw_data;
        //Do validation for the data
        $data['status_type'] = (int) $data['status_type'];
        $data['status'] = 1;
        $this->validation->validate($data,
                array('zone_name', 'zone_code', 'country', 'status_type'),
                $this->columns);
        if ($this->validation->is_valid === true) {
            $result = $this->createSuccessResponse($this->mZones->addZone($data));
        } else {
            $result = $this->createErrorResponse($this->validation->is_valid);
        }
        $this->response->outputJson($result);

    }

    function editzone() {
        $this->load->model('zones');
        $data = $this->request->raw_data;
        $this->validation($data);

        $this->mZones->editzone($data, $data['muid']);

    }

    function deletezone() {

        $this->load->model('country');
        $data = $this->request->raw_data;
        $this->mZones->deleteZone($data['muid']);

    }

    function getZonesData() {
        $this->load->model('zones');
        if (!is_array($this->request->raw_data['filter'])) {
            $this->request->raw_data['filter'] = array();
        }
        $this->response->outputJson($this->mZones->getZones($this->request->raw_data['filter']));

    }

    function getZones() {
        $this->load->model('zones');
        if (!is_array($this->request->raw_data['filter'])) {
            $this->request->raw_data['filter'] = array();
        }
        $data['result'] = $this->mZones->getZones($this->request->raw_data['filter']);
        $data['cols'] = array(
            array('field' => 'zone_name', 'title' => "Zone Name", 'show' => true),
            array('field' => 'country', 'title' => "Country", 'show' => true,
                'sortable' => 'country_name'),
            array('field' => 'status', 'title' => "Status", 'show' => true)
        );
        $this->response->outputJson($data);

    }

    function getCountry() {
        $this->load->model('zones');
        $data = $this->request->raw_data;
        if ($data[$this->primary_key['data']]) {

            $data = $this->mZones->getZones(array($this->primary_key['db'] => $data[$this->primary_key['data']]));
        } else {
            $data['error'] = 'ID not present';
        }
        $this->response->outputJson($data);

    }

    function validation($data) {

        foreach ($this->columns as $key => $value) {
            if ($value['required'] == true && $data[$key] == '') {
                $this->validation_errors[] = $key . ' is required';
            }
        }
        if (count($this->validation_errors) === 0) {
            return true;
        } else {
            return false;
        }

    }

}
