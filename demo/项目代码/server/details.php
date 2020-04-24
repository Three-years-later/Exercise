<?php

  # 先链接数据库
  $db = mysqli_connect("127.0.0.1","root","","baiyangwang");
  $db->query("SET NAMES utf8");

  # 编写SQL语句查询数据库中的数据
  $page = $_REQUEST["page"];
  $start = ($page - 1) * 24; 

  $type = $_REQUEST["type"];
  if($type == "default")
  {
    $sql = "SELECT  * FROM goods LIMIT $start,24";
  }elseif($type == "dsc")
  {
    $sql = "SELECT  * FROM goods ORDER BY price_1 * 1 DESC LIMIT $start,24";
  }elseif($type == "asc"){
    $sql = "SELECT  * FROM goods ORDER BY price_1 * 1 ASC LIMIT $start,24";
  }


  # 把数据以JSON格式返回
  $result = mysqli_query($db,$sql);
  $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
// print_r($data);
  echo json_encode($data,true);
?>