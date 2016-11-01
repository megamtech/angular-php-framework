<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of validation
 *
 * @author gmsundar
 */

/**
 * 
  1.required - Ensures the specified key value exists and is not empty
  2.valid_email - Checks for a valid email address
  3.max_len,n - Checks key value length, makes sure it's not longer than the specified length. n = length parameter.
  4.min_len,n Checks key value length, makes sure it's not shorter than the specified length. n = length parameter.
  5.exact_len,n Ensures that the key value length precisely matches the specified length. n = length parameter.
  6.alpha Ensure only alpha characters are present in the key value (a-z, A-Z)
  7.alpha_numeric Ensure only alpha-numeric characters are present in the key value (a-z, A-Z, 0-9)
  8.alpha_dash Ensure only alpha-numeric characters + dashes and underscores are present in the key value (a-z, A-Z, 0-9, _-)
  9.alpha_space Ensure only alpha-numeric characters + spaces are present in the key value (a-z, A-Z, 0-9, \s)
  10.numeric Ensure only numeric key values
  11.integer Ensure only integer key values
  12.boolean Checks for PHP accepted boolean values, returns TRUE for "1", "true", "on" and "yes"
  13.float Checks for float values
  15.valid_url Check for valid URL or subdomain
  16.url_exists Check to see if the url exists and is accessible
  17.valid_ip Check for valid generic IP address
  18.valid_ipv4 Check for valid IPv4 address
  valid_ipv6 Check for valid IPv6 address
  valid_cc Check for a valid credit card number (Uses the MOD10 Checksum Algorithm)
  valid_name Check for a valid format human name
  contains,n Verify that a value is contained within the pre-defined value set
  containsList,n Verify that a value is contained within the pre-defined value set. The list of valid values must be provided in semicolon-separated list format (like so: value1;value2;value3;..;valuen). If a validation error occurs, the list of valid values is not revelead (this means, the error will just say the input is invalid, but it won't reveal the valid set to the user.
  doesNotcontainList,n Verify that a value is not contained within the pre-defined value set. Semicolon (;) separated, list not outputted. See the rule above for more info.
  street_address Checks that the provided string is a likely street address. 1 number, 1 or more space, 1 or more letters
  iban Check for a valid IBAN
  min_numeric Determine if the provided numeric value is higher or equal to a specific value
  max_numeric Determine if the provided numeric value is lower or equal to a specific value
  date Determine if the provided input is a valid date (ISO 8601)
  starts Ensures the value starts with a certain character / set of character
  phone_number Validate phone numbers that match the following examples: 555-555-5555 , 5555425555, 555 555 5555, 1(519) 555-4444, 1 (519) 555-4422, 1-555-555-5555
  regex You can pass a custom regex using the following format: 'regex,/your-regex/'
  valid_json_string validate string to check if it's a valid json format
  equalsfield,fieldname
 */
class Validation extends GUMP {

    public $is_valid;

    function __construct() {
        
    }

    function validate($data, $rules, $group_rules, $key_match = array()) {

        if (is_array($rules)) {
            foreach ($rules as $columnname) {
                //Add your Validation Rules here 
                $data_columnname = $columnname;

                $db_columnname = $key_match[$columnname] ? $key_match[$columnname] : $columnname;
                if (!isset($db_columnname)) {
                    echo $columnname . 'Not Found on Rules list';
                    exit;
                }
                $rules[$data_columnname] = $group_rules[$db_columnname]['validation'];
            }
            try {
                $this->is_valid = $this->is_valid($data, $rules);
            } catch (Exception $ex) {
                echo $data;
                print_r($rules);
                exit;
            }
            //Checking the data is valid
        }

    }

}
