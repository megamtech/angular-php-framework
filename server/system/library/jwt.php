<?php

use \Firebase\JWT\JWT;

class cJWT {

    private $servername;
    private $jwtkey;
    private $doValidate;
    private $token;

    function __construct($servername, $jwtkey, $doValidate) {
        $this->servername = $servername;
        $this->jwtkey = $jwtkey;
        $this->doValidate = isset($doValidate) ? $doValidate : false;
    }

    function generateToken($userData = array()) {
        //MCRYPT_DEV_URANDOM is used because The problem of /dev/random is that its random pool depends on the system interrupts, when there is not enough system interrupts, it cannot generate enough random numbers, then the process tries to get the random numbers will wait and hang
        $size = mcrypt_get_iv_size(MCRYPT_BLOWFISH, MCRYPT_MODE_ECB);
        $tokenId = base64_encode(mcrypt_create_iv($size, MCRYPT_DEV_URANDOM));
        //$tokenId=base64_encode('123234');
        $issuedAt = time();
        $notBefore = $issuedAt ;             //Adding 10 seconds
        $expire = $notBefore + 15000;            // Adding 3000 seconds
        $serverName = $this->servername; // Retrieve the server name from config file
        $data = [
            'iat' => $issuedAt, // Issued at: time when the token was generated
            'jti' => $tokenId, // Json Token Id: an unique identifier for the token
            'iss' => $serverName, // Issuer
            'nbf' => $notBefore, // Not before
            'exp' => $expire, // Expire
        ];
        if (is_array($userData)) {
            foreach ($userData as $user_field => $user_value) {
                $data['data'][$user_field] = $user_value;
            }
        }
        /*
         * Extract the key, which is coming from the config file.
         *
         * Best suggestion is the key to be a binary string and
         * store it in encoded in a config file.
         *
         * Can be generated with base64_encode(openssl_random_pseudo_bytes(64));
         *
         * keep it secure! You'll need the exact key to verify the
         * token later.
         */
        $secretKey = base64_decode($this->jwtkey);

        /*
         * Encode the array to a JWT string.
         * Second parameter is the key to encode the token.
         *
         * The output string can be validated at http://jwt.io/
         */
        $jwt = JWT::encode(
                        $data, //Data to be encoded in the JWT
                        $secretKey, // The signing key
                        'HS512'     // Algorithm used to sign the token, see https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40#section-3
        );

        $unencodedArray = ['token' => $jwt];
        return $unencodedArray;
    }

    function validateToken($autorizationToken) {

        if ($this->doValidate) {
            try {
                $this->token = JWT::decode($this->getToken($autorizationToken), base64_decode($this->jwtkey), array('HS512'));
                return $this->token;
            } catch (Exception $ex) {
                header('HTTP/1.0 401 Unauthorized');
                exit;
            }
        }
    }

    function getToken($autorizationToken) {
        return str_replace('Bearer ', '', $autorizationToken);
    }

    function refreshToken($autorizationToken) {
        if ($this->validateToken($autorizationToken)) {
            $userData = array('_id' => $this->token->data->userId, // userid from the users table
                'username' => $this->token->data->userName, // User name
                'role' => $this->token->data->role, // role
                'is_admin' => $this->token->data->super);
            return $this->generateToken($userData);
        }
    }

}
