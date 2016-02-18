<?php

class Database{
	private $_link;
	private static $_instance;
	private $_host = "localhost";
	private $_user = "root";
	private $_password = "";
	private $_database = "ivan_chicchon";

	private function __construct(){};
	public static function getInstance(){
		if(!self::$_instance){
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	public function __destruct(){};

	public function __clone(){ trigger_error("Cloning class not allowed", E_USER_ERROR)}
}

?>