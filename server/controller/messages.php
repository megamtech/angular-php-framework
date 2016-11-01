<?php

/**
 * Description of messages
 *
 * @author sundar
 */
class cMessages extends controller {

    private $columns = array(
        'to' => array('validation' => 'required'),
        'subject' => array('validation' => 'required'),
        'content' => array('validation' => 'required')
    );
    private $user_role_contacts = array(
        1 => array(
            0 => 'support@1grandtrunk.com',
            1 => 'support_in@1grandtrunk.com',
            2 => 'support_us@1grandtrunk.com',
            3 => 'support_sg@1grandtrunk.com'
        ),
        2 => array(
            0 => 'support@1grandtrunk.com',
            1 => 'support_in@1grandtrunk.com',
            2 => 'support_us@1grandtrunk.com',
            3 => 'support_sg@1grandtrunk.com'),
        3 => array(
            0 => 'support@1grandtrunk.com',
            1 => 'support_in@1grandtrunk.com',
            2 => 'support_us@1grandtrunk.com',
            3 => 'support_sg@1grandtrunk.com'
        ),
        4 => array(
            0 => 'support@1grandtrunk.com',
            1 => 'support_in@1grandtrunk.com',
            2 => 'support_us@1grandtrunk.com',
            3 => 'support_sg@1grandtrunk.com'
        ),
        -1 => array(
            0 => 'support@1grandtrunk.com',
            1 => 'support_in@1grandtrunk.com',
            2 => 'support_us@1grandtrunk.com',
            3 => 'support_sg@1grandtrunk.com'
        ),
    );

    function createMessage($data = false, $is_automated_message = false) {
        $this->load->model('messages');
        $this->load->model('users');

        $data = is_array($data['to']) ? $data : $this->request->raw_data;
        //Do validation for the data
        $this->validation->validate($data, array('subject', 'content'),
                $this->columns);

        if ($this->validation->is_valid === true) {
            //Create a copy for the sender 
            //Converting the encoded html content to plain html

            $html_content = html_entity_decode($data['content']);
            $plain_text_content = strip_tags(html_entity_decode($data['content']));
            $inappmessage = $data['inapp_message'] ? $data['inapp_message'] : $html_content;
            if ($is_automated_message === false) {
                //Check to identify the send message is from drafts folder
                $message['to'] = $data['to'];
                $message['user_id'] = $this->request->auth['user']['muid'];
                $message['message_type'] = 'sent';
                $message['subject'] = $data['subject'];
                $message['is_read'] = (bool) true;
                $message['is_sent'] = 2;
                $message['content_html'] = $inappmessage;
                $message['content_plain'] = $plain_text_content;
                $message['created_at'] = $this->getCurrentTime();
                $message['created_by'] = $this->request->auth['user']['muid'];
                $message['from'] = $this->request->auth['user']['fullname'];
                $message['suite_id'] = $this->request->auth['user']['suite_id'] ? $this->request->auth['user']['suite_id'] : '';
                if ($data['muid'] == '') {

                    $this->mMessages->create($message);
                } else {
                    $this->mMessages->update($message, $data['muid']);
                }
            }
            foreach ($data['to'] as $key => $value) {
                if ($value['email'] === 'support_in@1grandtrunk.com') {
                    $contacts = $this->mUsers->getUsers(array('warehouse_id' => '56d975351ffda7057f35984b',
                        'role_id' => array('$in' => array(2, 3, 4))));
                }
                if ($value['email'] === 'support_us@1grandtrunk.com') {
                    $contacts = $this->mUsers->getUsers(array('warehouse_id' => '5709cee080cdaff644692eec',
                        'role_id' => array('$in' => array(2, 3, 4))));
                }
                if ($value['email'] === 'support_sg@1grandtrunk.com') {
                    $contacts = $this->mUsers->getUsers(array('warehouse_id' => '56fcb2cb1ffda7240aeea238',
                        'role_id' => array('$in' => array(2, 3, 4))));
                }
                if ($value['email'] === 'support@1grandtrunk.com') {
                    $contacts = $this->mUsers->getUsers(array('role_id' => array(
                            '$in' => array(
                                2, 3, 4))));
                }
                if (is_array($contacts)) {
                    foreach ($contacts as $contact_index => $contact) {
                        $message['to'] = $data['to'];
                        $message['user_id'] = $contact['muid'];
                        $message['message_type'] = 'inbox';
                        $message['subject'] = $data['subject'];
                        $message['content_html'] = $inappmessage;
                        $message['is_read'] = (bool) false;
                        $message['is_sent'] = -1;
                        $message['content_plain'] = $plain_text_content;
                        $message['created_at'] = $this->getCurrentTime();
                        $message['created_by'] = $this->request->auth['user']['muid'];
                        $message['from'] = $this->request->auth['user']['fullname'];
                        $message['suite_id'] = $this->request->auth['user']['suite_id'] ? $this->request->auth['user']['suite_id'] : '';
                        $this->mMessages->create($message);
                        $this->load->library('mailer');
                        $mailer = new mailer();
                        $mailer->from['email'] = 'info@1grandtrunk.com';
                        $mailer->from['name'] = '1GrandTrunk.com';
                        $mailer->to[] = array('email' => $contact['email'], 'name' => ($contact['firstname'] . ' ' . $contact['lastname']));
                        $mailer->subject = $data['subject'];
                        $mailer->content = $html_content;
                        $mailer->sendMail();
                    }
                } else {
                    $message['to'] = $data['to'];
                    $message['user_id'] = $value['muid'];
                    $message['message_type'] = 'inbox';
                    $message['is_read'] = (bool) false;
                    $message['is_sent'] = -1;
                    $message['subject'] = $data['subject'];
                    $message['content_html'] = $html_content;
                    $message['content_plain'] = $plain_text_content;
                    $message['created_at'] = $this->getCurrentTime();
                    $message['created_by'] = $this->request->auth['user']['muid'];
                    $message['from'] = $this->request->auth['user']['fullname'];
                    $message['suite_id'] = $this->request->auth['user']['suite_id'] ? $this->request->auth['user']['suite_id'] : '';

                    $this->mMessages->create($message);
                    $contacts = $this->mUsers->getUsers(array('_id' => $value['muid']));

                    $contact = $contacts[0];
                    $this->load->library('mailer');
                    $mailer = new mailer();
                    $mailer->from['email'] = 'info@1grandtrunk.com';
                    $mailer->from['name'] = '1GrandTrunk.com';
                    $mailer->to[] = array('email' => $contact['email'], 'name' => ($contact['firstname'] . ' ' . $contact['lastname']));
                    $mailer->subject = $data['subject'];
                    $mailer->content = $html_content;
                    $mailer->sendMail();
                }
            }
            $result = $this->createSuccessResponse(array('message created successfully'));
        } else {
            $result = $this->createErrorResponse($this->validation->is_valid);
        }

        $this->response->outputJson($result);

    }

    function replyMessage() {
        $this->load->model('users');
        $this->load->model('messages');
        $data = $this->request->raw_data;
        $html_content = html_entity_decode($data['content']);
        $plain_text_content = strip_tags(html_entity_decode($data['content']));
        $userDetails = $this->mUsers->getUsers(array('_id' => $data['to'][0]['muid']));
        //for sender
        $data['to'][0]['email'] = $userDetails[0]['email'];
        $data['to'][0]['muid'] = $userDetails[0]['muid'];
        $message['to'] = $data['to'];
        $message['user_id'] = $this->request->auth['user']['muid'];
        $message['message_type'] = 'sent';
        $message['is_read'] = (bool) true;
        $message['is_sent'] = 2;
        $message['subject'] = $data['subject'];
        $message['content_html'] = $html_content;
        $message['content_plain'] = $plain_text_content;
        $message['created_at'] = $this->getCurrentTime();
        $message['created_by'] = $this->request->auth['user']['muid'];
        $message['from'] = $this->request->auth['user']['fullname'];
        $message['suite_id'] = $this->request->auth['user']['suite_id'] ? $this->request->auth['user']['suite_id'] : '';
        $this->mMessages->create($message);

        //For Receiver 
        $message['to'] = $data['to'];
        $message['user_id'] = $data['to'][0]['muid'];
        $message['message_type'] = 'inbox';
        $message['is_read'] = (bool) false;
        $message['is_sent'] = -1;
        $message['subject'] = $data['subject'];
        $message['content_html'] = $html_content;
        $message['content_plain'] = $plain_text_content;
        $message['created_at'] = $this->getCurrentTime();
        $message['created_by'] = $this->request->auth['user']['muid'];
        $message['from'] = $this->request->auth['user']['fullname'];
        $message['suite_id'] = $this->request->auth['user']['suite_id'] ? $this->request->auth['user']['suite_id'] : '';
        $this->mMessages->create($message);
        //Send Mail for Receiver
        $this->load->library('mailer');
        $mailer = new mailer();
        $mailer->from['email'] = 'info@1grandtrunk.com';
        $mailer->from['name'] = '1GrandTrunk.com';
        $mailer->to[] = array('email' => $$data['to'][0]['email'], 'name' => ($userDetails[0]['firstname'] . ' ' . $userDetails[0]['lastname']));
        $mailer->subject = $data['subject'];
        $mailer->content = $html_content;
        $result = $mailer->sendMail();
        $this->response->outputJson($result);

    }

    function moveToFolder() {
        $this->load->model('messages');
        $data = $this->request->raw_data;
        $messageDetails['message_type'] = $data['foldername'];
        $result = $this->mMessages->update($messageDetails, $data['muid']);
        $this->response->outputJson($result);

    }

    function getContacts() {
        $data = $this->request->raw_data['filter'];
        $data['role_id'] = $this->request->auth['user']['role_id'];
        $this->load->model('users');
        if ($data['role_id'] == 2 || $data['role_id'] == 3 || $data['role_id'] == -1 || $data['role_id'] == 4) {
            $contacts = $this->mUsers->getUsers(array(
                'role_id' => 1, 'suite_id' => array('$regex' => '.*' . $data['query'] . '.*')),
                    array('email' => 1, 'suite_id' => 1));
//                    echo json_encode(array(
//                        'role_id' =>1,'email'=>array('$regex'=>'.*'.$data['query'].'.*')));

            foreach ($contacts as $key => $value) {
                $contacts[$key]['email'] = $value['email'] . ' - (' . $value['suite_id'] . ')';
            }
        }
        $contacts_count = count($contacts);
        $group_contacts = array(
            array("muid" => 0, "email" => 'support@1grandtrunk.com'),
//            array("muid" => 1, "email" => 'support_in@1grandtrunk.com'),
//            array("muid" => 2, "email" => 'support_us@1grandtrunk.com'),
//            array("muid" => 3, "email" => 'support_sg@1grandtrunk.com')
        );
        foreach ($group_contacts as $key => $value) {
            $contacts[$contacts_count] = $value;
            $contacts_count++;
        }

        $this->response->outputJson($this->createSuccessResponse($contacts));

    }

    function createDraft() {
        $this->load->model('messages');
        $data = $this->request->raw_data;
        $draft['to'] = $data['to'];
        $draft['user_id'] = $this->request->auth['user']['muid'];
        $draft['message_type'] = 'draft';
        $draft['subject'] = $data['subject'];
        $draft['is_read'] = (bool) true;
        $draft['content_html'] = html_entity_decode($data['content']);
        $draft['content_plain'] = strip_tags(html_entity_decode($data['content']));
        $draft['created_at'] = $this->getCurrentTime();
        $draft['created_by'] = $this->request->auth['user']['muid'];
        $draft['from'] = $this->request->auth['user']['fullname'];
        $draft['suite_id'] = $this->request->auth['user']['suite_id'] ? $this->request->auth['user']['suite_id'] : '';
        if ($data['muid'] == '') {
            $result = $this->mMessages->create($draft);
        } else {
            $result = $this->mMessages->update($draft, $data['muid']);
        }
        $this->response->outputJson($this->createSuccessResponse($result));

    }

    function getMessages() {
        $this->load->model('messages');
        $data = $this->request->raw_data;
        $filter_condition['user_id'] = $this->request->auth['user']['muid'];
        $filter_condition['message_type'] = $data['type'] ? $data['type'] : 'inbox';
        if (isset($data['is_read'])) {
            $filter_condition['is_read'] = (bool) $data['is_read'] == '' ? false : true;
        }
        $messages = $this->mMessages->getList($filter_condition, $data['count']);
        $this->response->outputJson($messages);

    }

    function getUnreadMessageCount() {
        $this->load->model('messages');
        $data = $this->request->raw_data;
        $filter_condition['user_id'] = $this->request->auth['user']['muid'];
        $filter_condition['message_type'] = $data['type'] ? $data['type'] : 'inbox';
        $filter_condition['is_read'] = (bool) false;
        $messages = $this->mMessages->getList($filter_condition);
        $this->response->outputJson(count($messages));

    }

    function getMessage() {
        $this->load->model('messages');
        $data = $this->request->raw_data;
        //Mark as Read

        $messages = $this->mMessages->getMessageById($data['muid']);
        $messages = $messages[0];
        if ($messages['is_read'] === false) {
            $mark_as_read['is_read'] = (bool) true;
            $this->mMessages->update($mark_as_read, $data['muid']);
        }
        $messages['content_html'] = html_entity_decode($messages['content_html'],
                ENT_QUOTES);
        $this->response->outputJson($messages);

    }

    function sendMail() {
        $this->load->model('messages');
        //Query for unsent messages
        $messages = $this->mMessages->getList(array('is_sent' => -1, 'message_type' => 'inbox'));
        $this->load->model('users');
        $this->load->library('mailer');
//Loop
        foreach ($messages as $key => $message) {
            $user_info = $this->mUsers->getUserById($message['user_id']);
            $user_emails[0]['email'] = $user_info[0]['email'];
            $user_emails[0]['name'] = ($user_info[0]['firstname'] . ' ' . $user_info[0]['lastname']);
            $mail['to'] = $user_emails;
            $mail['from'] = $message['from'];
            $mail['subject'] = $message['subject'];
            $mail['content'] = $message['content_plain'];
            $mailer = new mailer();
            $result = $mailer->send($mail);
            print_r($result);
            exit;
            $this->mMessages->update($result, $message['muid']);
        }
        exit;

    }

    function addTag() {
        
    }

    function changeStatus() {
        $this->load->model('messages');
        $data = $this->request->raw_data;
        $messageDetails['is_read'] = (bool) $data['status'];
        $result = $this->mMessages->update($messageDetails, $data['muid']);
        $this->response->outputJson($result);

    }

}
