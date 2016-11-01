<?php

/**
 * Description of alerts
 *
 * @author sundar
 */
class cAlerts extends controller {

    private $columns = array(
//        'to' => array('validation' => 'required'),
        'alert' => array('validation' => 'required'),
        'alert_severity' => array('validation' => 'required')
    );

    function createAlert() {
        $this->load->model('users');


        $this->load->model('alerts');
        $data = $this->request->raw_data;
        //Do validation for the data
        $this->validation->validate($data, array('alert', 'alert_severity'),
                $this->columns);

        if ($this->validation->is_valid === true) {
            //Converting the encoded html content to plain html
            $mail_content = html_entity_decode($data['content']);
//            Create a copy for the sender 
//            $alert['to'] = $data['to'];
            $alert['user_id'] = $this->request->auth['user']['muid'];
            $alert['alert'] = $data['alert'];
            $alert['desc'] = $data['desc'];
            $alert['is_read'] = 'true';
            $alert['alert_severity'] = $data['alert_severity'];

            $alert['created_at'] = $this->getCurrentTime();
            $alert['created_by'] = $this->request->auth['user']['muid'];
            $alert['from'] = $this->request->auth['user']['fullname'];
            $this->mAlerts->create($alert);
            $UserContacts = $this->mUsers->getUserDetails(array('role_id' => array(
                    '$in' => array(-1, 1, 2, 3, 4)), '_id' => array('$nin' => array(
                        $this->request->auth['user']['muid']))));
            foreach ($UserContacts as $key => $value) {
                //TODO for $nin not working 
                if ($this->request->auth['user']['muid'] == $value['_id']) {
                    unset($value);
                }
                $alert['alert'] = $data['alert'];
                $alert['desc'] = $data['desc'];
                $alert['is_read'] = 'false';
                $alert['alert_severity'] = $data['alert_severity'];
                $alert['user_id'] = $value['_id'];
                $alert['created_at'] = $this->getCurrentTime();
                $alert['created_by'] = $this->request->auth['user']['muid'];
                $alert['from'] = $this->request->auth['user']['fullname'];

                $this->mAlerts->create($alert);
                $this->load->model('mail');
                $mailInfo['to'] = array('email' => $value['email'], 'name' => ($value['firstname'] . ' ' . $value['lastname']));
                $mailInfo['from_email'] = 'info@1grandtrunk.com';
                $mailInfo['from_name'] = '1GrandTrunk.com';
                $mailInfo['subject'] = 'Alert (' . $data['alert_severity'] . ')- ' . $data['alert'];
                $mailInfo['content'] = $data['desc'];
                $mailInfo['created_at'] = $this->getCurrentTime();
                $this->mMail->create($mailInfo);
            }
            $result = $this->createSuccessResponse(array('Alert created successfully'));
        } else {
            $result = $this->createErrorResponse($this->validation->is_valid);
        }
        $this->response->outputJson($result);

    }

    function getUserAlerts() {
        $this->load->model('alerts');
        $data = $this->request->raw_data;
        if ($data['by_me'] == true) {
            $filter_condition['created_by'] = $this->request->auth['user']['muid'];
        }
        $filter_condition['user_id'] = $this->request->auth['user']['muid'];

        $result = $this->mAlerts->getList($filter_condition);
        if ($data['mark_as_read'] == true) {
            $mark_as_read['is_read'] = 'true';
            $this->mAlerts->update($mark_as_read, array("user_id"=>$this->request->auth['user']['muid']));
        }
        $this->response->outputJson($this->createSuccessResponse($result));

    }

    function getUnreadAlertCount() {
        $data = $this->request->raw_data;
        $this->load->model('alerts');
        $filter_condition['user_id'] = $this->request->auth['user']['muid'];
        $filter_condition['is_read'] = $data['is_read'];
        $result = $this->mAlerts->getList($filter_condition);
        $this->response->outputJson($this->createSuccessResponse(count($result)));

    }

    function changeStatus() {
        
    }

}
