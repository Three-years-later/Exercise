<?php
header("Content-type:text/html;charset=utf-8");
$username = $_REQUEST["username"];
$password = $_REQUEST["password"];

$db = mysqli_connect("127.0.0.1","root","","baiyangwang");
$sql =  "SELECT * FROM user WHERE username='$username'";
$result = mysqli_query($db,$sql);
// print_r($db);
if(mysqli_num_rows($result) == 0){
      // 001-如果不存在，返回错误的提示信息(该用户名不存在!)
      echo '{"status":"error","msg":"该用户名不存在!"}';
    }else{
      $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
      $_password = $data[0]["password"];
      $id = $data[0]["id"];
    if($_password != $password){
      // 002-如果密码不正确，那么就返回错误的提示信息(对不起，您的密码不正确！)
      echo '{"status":"error","msg":"对不起，您的密码不正确！"}';
    }else{
      // 003-如果密码正确，那么就返回登录成功。
      echo "{\"status\":\"success\",\"msg\":\"登录成功！！！\",\"id\":$id}";
    }
} 

?>