<?php

class cMail extends controller {

    function processQueue() {
        $this->load->library('mailer');
        $mailer = new mailer();

        $this->load->model('mail');
        $filter_condition['status']['$in'] = array((int) 1, (int) 3);
        $mailInfo = $this->mMail->getUnSentMail($filter_condition);

        $success_count = 0;
        $failure_count = 0;
        foreach ($mailInfo as $key => $value) {

            $mailer->from['email'] = $value['from_email'];
            $mailer->from['name'] = $value['from_name'];
            $mailer->to[] = $value['to'];
            $mailer->subject = $value['subject'];
            $mailer->content = $value['content'];
            $result = $mailer->sendMail();

            if ($result['is_sent'] === 1) {
                $result['status'] = (int) 2;
                $success_count++;
            } else {
                $result['status'] = (int) 3;
                $result['failed_count'] = $value['failed_count'] > 0 ? $value['failed_count'] + 1 : 1;
                $failure_count++;
            }
            $this->mMail->updateMail($result, $value['muid']);
        }

        $this->response->outputJson($this->createSuccessResponse(array('success' => $success_count,
                    'failed' => $failure_count)));

    }

}
