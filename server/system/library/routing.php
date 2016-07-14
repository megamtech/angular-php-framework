<?php

/**
 * Description of routing
 *
 * @author gmsundar
 */
class Routing {

    private $file;
    private $class;
    private $method;
    private $args = array();
    public $authRequired = true;
    private $router;
    private $registry;

    public function __construct($request, $args = array()) {
        $router = new AltoRouter();
        $router->setBasePath(BASE_PATH);
        require_once(AppConfig . 'routes.php');
        $match = $router->match();
        $class_name = '';
        if ($match) {
            $filename_parts = explode('_', $match['target']['c']);
            foreach ($filename_parts as $part) {
                $class_name.=ucfirst($part);
            }
            $this->class = 'c' . $class_name;
            $this->file = AppController . $match['target']['c'] . '.php';
            $this->method = $match['target']['a'] ? $match['target']['a'] : 'index';
            $this->authRequired = isset($match['target']['auth']) ? $match['target']['auth'] : true;
        } else {
            echo 'URL not Found';
            exit;
        }

        $this->args = $args;

    }

    public function execute($registry) {
        // Stop any magical methods being called
        if (substr($this->method, 0, 2) == '__') {
            return false;
        }

        if (is_file($this->file)) {
            include_once($this->file);

            $class = $this->class;

            $controller = new $class($registry);

            if (is_callable(array($controller, $this->method))) {
                return call_user_func(array($controller, $this->method),
                        $this->args);
            } else {
                return false;
            }
        } else {
            return false;
        }

    }

}
