<?php

/**
 * Description of mailer
 *
 * @author sundar
 */

class mailer  {

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
	public $attachments='';

	function sendMail() {
		$mail = new PHPMailer;
		$mail->isSMTP();                                      // Set mailer to use SMTP
		$mail->CharSet = 'UTF-8';
		$mail->Host = $this->smtp_host;  // Specify main and backup SMTP servers
		$mail->SMTPAuth = true;                               // Enable SMTP authentication
		$mail->Username = $this->smtp_user;                 // SMTP username
		$mail->Password = $this->smtp_pass;                           // SMTP password
		$mail->SMTPSecure = $this->smtp_is_tls == true ? 'tls' : 'ssl';                            // Enable TLS encryption, `ssl` also accepted
		$mail->Port = $this->smtp_port;                                    // TCP port to connect to
		$mail->SMTPDebug = 0;
		$mail->setFrom($this->from['email'], $this->from['name']);
		foreach ($this->to as $to_addresses) {
			$mail->addAddress($to_addresses['email'], $to_addresses['name']);     // Add a recipient
		}

		$mail->isHTML(true);                                  // Set email format to HTML
//Check for Attachments and add to mail if present
		if(is_array($this->attachments)){
			foreach($this->attachments as $filename=>$display_name){
				$mail->addAttachment($filename, $display_name);			
			}
		}
		$mail->Subject = $this->subject;
		$mail->Body = $this->content;
		$mail->AltBody = $this->alt_content?$this->alt_content:strip_tags($this->content);
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
