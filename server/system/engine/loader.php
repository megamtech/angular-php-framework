<?php

/**
 * Description of loader
 *
 * @author gmsundar
 */
final class loader {

    private $registry;

    public function __construct($registry) {
        $this->registry = $registry;
    }

    public function controller($route, $data = array()) {
        $parts = explode('/', str_replace('../', '', (string) $route));

        // Break apart the route
        while ($parts) {
            $file = DIR_APPLICATION . 'controller/' . implode('/', $parts) . '.php';
            $class = 'Controller' . preg_replace('/[^a-zA-Z0-9]/', '', implode('/', $parts));

            if (is_file($file)) {
                include_once($file);

                break;
            } else {
                $method = array_pop($parts);
            }
        }

        $controller = new $class($this->registry);

        if (!isset($method)) {
            $method = 'index';
        }

        // Stop any magical methods being called
        if (substr($method, 0, 2) == '__') {
            return false;
        }

        $output = '';

        if (is_callable(array($controller, $method))) {
            $output = call_user_func(array($controller, $method), $data);
        }


        return $output;
    }

    public function model($model, $data = array()) {

        $file = AppModel . $model . '.php';
        $file_parts = explode('_', $model);
        $class_name = '';
        foreach ($file_parts as $part) {
            $class_name.=ucfirst($part);
        }
        $class = 'm' . $class_name;

        if (file_exists($file)) {
            include_once($file);

            $this->registry->set($class, new $class($this->registry));
        } else {
            trigger_error('Error: Could not load model ' . $file . '!');
            exit();
        }
    }

    public function extendController($controller, $data = array()) {

        $file = AppController . $controller . '.php';
        $file_parts = explode('_', $controller);

        foreach ($file_parts as $part) {
            $class_name.=ucfirst($part);
        }
        $class = 'c' . $class_name;

        if (file_exists($file)) {
            include_once($file);

            $this->registry->set($class, new $class($this->registry));
        } else {
            trigger_error('Error: Could not load controller ' . $file . '!');
            exit();
        }
    }

    public function helper($helper) {
        $file = AppSystem . 'helper/' . str_replace('../', '', (string) $helper) . '.php';
        $file_parts = explode('_', $helper);

        foreach ($file_parts as $part) {
            $class_name.=ucfirst($part);
        }
        $class = 'h' . $class_name;
        if (file_exists($file)) {
            include_once($file);
            $this->registry->set($class, new $class($this->registry));
        } else {
            trigger_error('Error: Could not load helper ' . $file . '!');
            exit();
        }
    }

    public function thirdPartyLib($libname, $filename) {
        $file = AppThirdParty . $libname . '/' . str_replace('../', '', (string) $filename) . '.php';


        if (file_exists($file)) {
            include_once($file);
        } else {
            trigger_error('Error: Could not load Third Party Lib ' . $file . '!');
            exit();
        }
    }

    public function config($config) {
        $this->registry->get('config')->load($config);
    }

    public function language($language) {
        return $this->registry->get('language')->load($language);
    }

    public function library($library) {
        $file = AppSystem . 'library/' .
                (string) $library . '.php';

        if (file_exists($file)) {
            include_once($file);
        } else {
            trigger_error('Error: Could not load library ' . $file . '!');
            exit();
        }
    }

}
