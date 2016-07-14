<?php

/**
 * Description of geo_zones
 *
 * @author megamtech
 */
class cGeoZones extends controller {

    private $columns = array(
        'geo_zone_name' => array('validation' => 'required|alpha_space'),
        'desc' => array('validation' => 'required|alpha_space'),
        'country' => array('validation' => 'required|alpha_space'),
        'zone' => array('validation' => 'required|alpha_space'),
        'status_type' => array('validation' => 'required|integer')
    );
    private $primary_key = array('data' => 'muid', 'db' => '_id');
    private $validation_errors = array();

    function addGeoZone() {
        $this->load->model('geo_zones');
        $data = $this->request->raw_data;
        //Do validation for the data
        $data['status_type'] = (int) $data['status_type'];
        $data['status'] = 1;
        $this->validation->validate($data, array('desc', 'status_type'), $this->columns);
        if ($this->validation->is_valid === true) {

            $result = $this->createSuccessResponse($this->mGeoZones->addGeoZone($data));
        } else {
            $result = $this->createErrorResponse($this->validation->is_valid);
        }
        $this->response->outputJson($result);

    }

    function editGeoZone() {
        $this->load->model('geo_zones');
        $data = $this->request->raw_data;
        $this->validation($data);
        $this->mGeoZones->editGeoZone($data, $data['muid']);

    }

    function deleteGeoZone() {

        $this->load->model('geo_zones');
        $data = $this->request->raw_data;
        $this->mGeoZones->deleteGeoZone($data['muid']);

    }

    function getGeoZonesData() {
        $this->load->model('geo_zones');
        if (!is_array($this->request->raw_data['filter'])) {
            $this->request->raw_data['filter'] = array();
        }
        $this->response->outputJson($this->mGeoZones->getGeoZones($this->request->raw_data['filter']));

    }

    function getGeozones() {
        $this->load->model('geo_zones');
        if (!is_array($this->request->raw_data['filter'])) {
            $this->request->raw_data['filter'] = array();
        }
        $data['result'] = $this->mGeoZones->getGeozones($this->request->raw_data['filter']);
        $data['cols'] = array(
            array('field' => 'geo_zone_name', 'title' => "Geo Zone Name", 'show' => true),
            array('field' => 'desc', 'title' => "Description", 'show' => true),
            array('field' => 'country', 'title' => "Country", 'show' => true, 'sortable' => 'country'),
            array('field' => 'zone', 'title' => "Zone", 'show' => true),
            array('field' => 'status', 'title' => "Status", 'show' => true),
            array('field' => 'muid', 'title' => "Actions", 'show' => true, 'getValue' => 'vm.createActionColumns')
        );
        $this->response->outputJson($data);

    }

    function getGeozone() {
        $this->load->model('geo_zones');
        $data = $this->request->raw_data;
        if ($data[$this->primary_key['data']]) {

            $data = $this->mGeoZones->getGeozones(array($this->primary_key['db'] => $data[$this->primary_key['data']]));
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
