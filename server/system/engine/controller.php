<?php

class controller {

    protected $registry;

    public function __construct($registry) {
        $this->registry = $registry;
        

    }

    public function __get($key) {
        return $this->registry->get($key);

    }

    public function __set($key, $value) {
        $this->registry->set($key, $value);

    }
    public function createErrorResponse($error_data){
        $error_repsonse['response']=$error_data;
        $error_repsonse['status']='ERROR';
        $error_repsonse['status_code']=0;
        return $error_repsonse;
    }
    public function createSuccessResponse($repsonse_data){
        $success_repsonse['response']=$repsonse_data;
        $success_repsonse['status']='SUCCESS';
        $success_repsonse['status_code']=1;
        return $success_repsonse;
    }
   public function getCurrentTime(){
       return '&current_time&';
   }

}

?>
