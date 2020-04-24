<?php
# 先链接数据库
$db = mysqli_connect("127.0.0.1", "root", "", "baiyangwang");

# 编写SQL语句查询数据库中的数据
$sql = "SELECT  * FROM goods";

# 把数据以JSON格式返回
$result = mysqli_query($db, $sql);
$size = mysqli_num_rows($result);

# 假设每页现实24个商品数据 
$count = ceil($size/ 24);

// echo  "{\"count\":$count}"

$data = array("count"=>$count);
echo json_encode($data,true);

?>