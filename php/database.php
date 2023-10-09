<?php
$server = 'localhost';
$username = 'root';
$password = 'America.10';
$database = 'comite-app';
try {
  $conn = new PDO("mysql:host=$server;dbname=$database;", $username, $password);
} catch (PDOException $e) {
  die('Connection Failed: ' . $e->getMessage());
}
