<?php

/**
 * Description of config
 *
 * @author gmsundar
 */
class Config {

    private $data = array();

    public function get($key) {
        return (isset($this->data[$key]) ? $this->data[$key] : null);
    }

    public function set($key, $value) {
        $this->data[$key] = $value;

    }

    public function has($key) {
        return isset($this->data[$key]);

    }

    public function load($filename) {
        $file = AppConfig . $filename . '.php';

        if (file_exists($file)) {
            $_ = array();

            require($file);

            $this->data = array_merge($this->data, $_);
        } else {
            trigger_error('Error: Could not load config ' . $filename . '!');
            exit();
        }

    }

}
