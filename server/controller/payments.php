<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of payments
 *
 * @author sundar
 */
class cPayments extends controller {

    public $statuses = array(
        5 => 'Payment Intiated',
        7 => 'Paid',
        8 => 'Payment Unsuccessfull',
        9 => 'Payment Aborted',
        10 => 'Payment Failure',
    );

    function getPaymentForm($paymentInfo) {
        $this->load->extendController('ccavenue');
        //Use OrderIdWithTimeStamp/StatusId

        $this->load->model('payments');
        $this->load->model('history');

        $payments_info['payment_status_id'] = 5;
        $payments_info['payment_status_name'] = $this->statuses[5];
        $payments_info['order_id'] = $paymentInfo['order_id'];
        $payments_info['ref_id'] = $paymentInfo['ref_id'];
        $payments_info['created_by'] = $this->request->auth['user']['muid'];
        $payments_info['created_at'] = $this->getCurrentTime();
        $payments_info['updated_by'] = $this->request->auth['user']['muid'];
        $payments_info['updated_at'] = $this->getCurrentTime();
        $payments_info['auth_details'] = $this->request->auth;
        $payments_info['auth_token'] = $this->request->server['HTTP_AUTHORIZATION'];

        $payment_id = $this->mPayments->createPayment($payments_info);



        //Create a new payment record and use the _id as TID and update the payment status as initiated
        $paymentInfo['tid'] = $payment_id['payment_id'];

        $form = $this->cCcavenue->generatePaymentForm($paymentInfo);

        //Add History Information for Payment Initiatied
        $history_paymentinit_status['ref_id'] = $paymentInfo['ref_id'];
        $history_paymentinit_status['status_id'] = 5;
        $history_paymentinit_status['status_name'] = $this->statuses[5];
        $history_paymentinit_status['created_by'] = $this->request->auth['user']['muid'];
        $history_paymentinit_status['type'] = 'payment';
        $history_paymentinit_status['created_at'] = $this->getCurrentTime();
        $this->mHistory->addHistory($history_paymentinit_status);

        echo $form;

    }

    function getResponse() {
        $this->load->extendController('ccavenue');
        $paymentInfo = $this->cCcavenue->getResponse($this->request->post);
        $this->load->model('payments');
        $this->load->model('payment_status');
        $currentPaymentDetails = $this->mPayments->getPaymentDetails($paymentInfo['payment_id']);
        //Setting token and auth info
        $authInfo = array('token' => $currentPaymentDetails[0]['auth_token'], 'user' => $currentPaymentDetails[0]['auth_details']['user']);

        $result['payment_id'] = $paymentInfo['payment_id'];

        if ($paymentInfo['order_status'] == 'Success') {

            $paymentStatus = $this->mPaymentStatus->getPaymentStatuses(array(
                'payment_status_id' => 2));
            $paymentInfo['payment_status_name'] = $paymentStatus[0]['payment_status_name'];
            $paymentInfo['payment_status_id'] = 2;
            $result['order_status'] = 1;
        } elseif ($paymentInfo['order_status'] == 'Aborted') {

            $paymentStatus = $this->mPaymentStatus->getPaymentStatuses(array(
                'payment_status_id' => 3));
            $paymentInfo['payment_status_name'] = $paymentStatus[0]['payment_status_name'];
            $paymentInfo['payment_status_id'] = 3;
            $result['order_status'] = -2;
            $result['payment_failure_message'] = $paymentInfo['payment_failure_message'];
        } elseif ($paymentInfo['order_status'] == 'Failure') {
            $paymentStatus = $this->mPaymentStatus->getPaymentStatuses(array(
                'payment_status_id' => 4));
            $paymentInfo['payment_status_name'] = $paymentStatus[0]['payment_status_name'];
            $paymentInfo['payment_status_id'] = 4;
            $result['order_status'] = -1;
            $result['payment_failure_message'] = $paymentInfo['payment_failure_message'];
        } else {
            $paymentStatus = $this->mPaymentStatus->getPaymentStatuses(array(
                'payment_status_id' => 4));
            $paymentInfo['payment_status_name'] = $paymentStatus[0]['payment_status_name'];
            $paymentInfo['payment_status_id'] = 4;
            $result = $paymentInfo;
            $result['order_status'] = -3;
        }

        $response = $this->mPayments->updatePayment($paymentInfo,
                $paymentInfo['payment_id']);
        if ($paymentInfo['payment_type'] == 'order') {

            $this->updateOrder($result, $paymentInfo['order_id'], $authInfo);
        } elseif ($paymentInfo['payment_type'] == 'needphoto') {
            
        } elseif ($paymentInfo['payment_type'] == 'assistedpurchase') {

            $this->updateAssistedPurchase($result, $paymentInfo['order_id'],
                    $authInfo);
        }
        return null;

    }

    function updateOrder($paymentResultInfo, $orderID, $authInfo) {
        $this->load->model('orders');
        $this->load->extendController('orders');

        $orderPaymentUpdate['payment_id'] = $paymentResultInfo['payment_id'];
        //Update Paid status
        if ($paymentResultInfo['order_status'] == 1) {
            $orderPaymentUpdate['order_status_name'] = $this->cOrders->statuses[7];
            $orderPaymentUpdate['order_status_id'] = 7;
            $this->mOrders->updateOrder($orderPaymentUpdate, $orderID);

            //Once paid Successfully status automatically changed to pending status
            $orderPaymentUpdate['order_status_name'] = $this->cOrders->statuses[14];
            $orderPaymentUpdate['order_status_id'] = 14;
        } elseif ($paymentResultInfo['order_status'] == -2) {
            $orderPaymentUpdate['order_status_name'] = $this->cOrders->statuses[13];
            $orderPaymentUpdate['order_status_id'] = 13;
        } elseif ($paymentResultInfo['order_status'] == -1) {
            $orderPaymentUpdate['order_status_name'] = $this->cOrders->statuses[10];
            $orderPaymentUpdate['order_status_id'] = 10;
        } else {
            $orderPaymentUpdate['order_status_name'] = $this->cOrders->statuses[10];
            $orderPaymentUpdate['order_status_id'] = 10;
        }
        $orderPaymentUpdate['updated_by'] = $authInfo['user']['muid'];
        $orderPaymentUpdate['updated_at'] = $this->getCurrentTime();

        $this->mOrders->updateOrder($orderPaymentUpdate, $orderID);
        header('Authorization:' . $authInfo['token']);
        header('Location:/app/#/payments/transaction/' . $paymentResultInfo['payment_id']);
        exit;

    }

    function updateAssistedPurchase($paymentResultInfo, $assisted_purchase_id, $authInfo) {

        $this->load->model('assisted_purchases');
        $this->load->extendController('assisted_purchases');

        $assistedPurchasePaymentUpdate['payment_id'] = $paymentResultInfo['payment_id'];
        if ($paymentResultInfo['order_status'] == 1) {
            $assistedPurchasePaymentUpdate['purchase_status_name'] = $this->cAssistedPurchases->statuses[7];
            $assistedPurchasePaymentUpdate['purchase_status_id'] = 7;
        } elseif ($paymentResultInfo['order_status'] == -2) {
            $assistedPurchasePaymentUpdate['purchase_status_name'] = $this->cAssistedPurchases->statuses[8];
            $assistedPurchasePaymentUpdate['purchase_status_id'] = 8;
        } elseif ($paymentResultInfo['order_status'] == -1) {
            $assistedPurchasePaymentUpdate['purchase_status_name'] = $this->cAssistedPurchases->statuses[9];
            $assistedPurchasePaymentUpdate['purchase_status_id'] = 9;
        } else {
            $assistedPurchasePaymentUpdate['purchase_status_name'] = $this->cAssistedPurchases->statuses[9];
            $assistedPurchasePaymentUpdate['purchase_status_id'] = 9;
        }
        $assistedPurchasePaymentUpdate['updated_by'] = $authInfo['user']['muid'];
        $assistedPurchasePaymentUpdate['updated_at'] = $this->getCurrentTime();
        $this->mAssistedPurchases->updateAssistedPurchase($assistedPurchasePaymentUpdate,
                $assisted_purchase_id);
        header('Authorization:' . $authInfo['token']);
        header('Location:/app/#/payments/transaction/' . $paymentResultInfo['payment_id']);
        exit;

    }

    function getPaymentsDetails() {
        $this->load->model('payments');
        $this->load->model('orders');
        $data = $this->request->raw_data;
        $payment_details = $this->mPayments->getPaymentDetails($data['transaction_id']);
        $packages = $this->mOrders->getOrder($payment_details[0]['ref_id']);
        foreach ($packages[0]['packages'] as $key => $value) {
            $payment_details[0]['packages'][] = $value;
        }
        $this->response->outputJson($this->createSuccessResponse($payment_details));

    }

    function getCancelResponse() {
        $this->load->extendController('ccavenue');
        $paymentInfo = $this->cCcavenue->getResponse($this->request->post);
        $this->load->model('payments');
        $currentPaymentDetails = $this->mPayments->getPaymentDetails($paymentInfo['payment_id']);
        $currentPaymentDetails = $currentPaymentDetails[0];
        $paymentDetails['payment_status_name'] = $this->statuses[9];
        $paymentDetails['payment_status_id'] = 9;
        $this->mPayments->updatePayment($paymentDetails,
                $currentPaymentDetails['payment_id']);
        header('Authorization:' . $currentPaymentDetails['auth_token']);
        header('Location:/app/#/payments/transaction/' . $currentPaymentDetails['payment_id']);
        exit;

    }

}
