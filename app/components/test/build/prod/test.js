if(!K_Components) K_Components = {};
K_Components["test"] = (function(){
function test()
{
  var self = this;
  
  this.yay = "yay";
  this.val = "";
  this.items = [
    {user_name:"jerry"},
    {user_name:"tom"},
    {user_name:"cooldude"},
    {user_name:"something something something"}
  ];
  
  this.oninput = function(e)
  {
    self.yay = self.val;
  }
  
  this.onFinish = function(node)
  {
    console.log(node.innerHTML);
  }
}

test.prototype.test = function(){

};

test.prototype.k_html = "<div class='test' something = 'something'>  <div>{{yay}}</div>  <div>{{yay}}</div>  <input type='text' value='{{val}}' onkeyup='{{oninput}}' />  <div class='testers'>{{for items loop tester}}</div></div>";
test.prototype.k_css = ".test {  background:#000;  color:#FFF;}";
return test;
}());