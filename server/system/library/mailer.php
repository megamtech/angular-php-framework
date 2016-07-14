<?php

/**
 * Description of mailer
 *
 * @author sundar
 */
include '../engine/model.php';

class mailer extends Model {

    public $smtp_host = SMTP_HOST;
    public $smtp_user = SMTP_USER;
    public $smtp_pass = SMTP_PASS;
    public $smtp_port = SMTP_PORT;
    public $smtp_is_tls = SMTP_IS_TLS;
    public $from = '';
    public $to = array();
    public $cc = array();
    public $bcc = array();
    public $subject = '';
    public $content = '';

    function send($mailDetails) {
        $mail = new PHPMailer;
        $mail->isSMTP();                                      // Set mailer to use SMTP

        $mail->Host = $this->smtp_host;  // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = $this->smtp_user;                 // SMTP username
        $mail->Password = $this->smtp_pass;                           // SMTP password
        $mail->SMTPSecure = $this->smtp_is_tls == true ? 'tls' : 'ssl';                            // Enable TLS encryption, `ssl` also accepted
        $mail->Port = $this->smtp_port;                                    // TCP port to connect to
        $mail->SMTPDebug = 0;
        $mail->setFrom($mailDetails['email'], $mailDetails['name']);
        foreach ($mailDetails['to'] as $to_addresses) {
            $mail->addAddress($to_addresses['email'], $to_addresses['name']);     // Add a recipient
        }
        $mail->isHTML(true);                                  // Set email format to HTML

        $mail->Subject = $mailDetails['subject'];
        $mail->Body = $mailDetails['content'];
        $mail->AltBody = strip_tags($mailDetails['content']);
        if (!$mail->send()) {
            $result['is_sent'] = 2;
            $result['response'] = array('status' => 'failure', 'errorinfo' => $mail->ErrorInfo);
        } else {
            $result['is_sent'] = 1;
            $result['response'] = array('status' => 'success');
        }
        return $result;

    }

}
