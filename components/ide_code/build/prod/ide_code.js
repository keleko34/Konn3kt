if(typeof window.K_Components === 'undefined') window.K_Components = {};
K_Components["ide_code"] = (function(){
	/*********************************
 *  ide_code
 *  Created by keleko34
 *  to show a snippet of code
 ********************************/

function ide_code()
{
  /* ATTRIBUTES */
  this.theme = 'dark';
  this.code = "";
  this.ref = "";
  
  this.copyable = true;
  
  this.filters.toDisplay = function(v)
  {
    return (v ? 'block' : 'none');
  }
  
  this.onFinish = function()
  {
    this.ref = "."+this.local+" .ide_code__code";
  }
}

/* PROTOTYPES */

ide_code.prototype.k_html = "<!-- ide_code Created by keleko34, to show a snippet of code --><div class='ide_code ide_code--{{theme}}'>  <div class='ide_code__outer'>    <div class='ide_code__inner'>      <div class='ide_code__code'>{{code}}</div>    </div>  </div>  <div class='ide_code__link' style='display:{{copyable | toDisplay}}'>    <copy_link ref='{{ref}}'></copy_link>  </div></div>";
ide_code.prototype.k_css = "/********************************* *  ide_code *  Created by keleko34 *  to show a snippet of code ********************************/.ide_code {  width:100%;  position: relative;}.ide_code__outer {  width:100%;}.ide_code__inner {  padding: 15px;  font-size: 14px;  font-family: 'open sans';  margin:10px;  padding-right: 120px;  word-break: break-all;}.ide_code__code {  -webkit-touch-callout: text;  -webkit-user-select: text;  -khtml-user-select: text;  -moz-user-select: text;  -ms-user-select: text;  user-select: text;}.mobile .ide_code__code {  font-size:18px;}.ide_code__link {  position: absolute;  right: 14px;  top: 50%;}.desktop .ide_code__link {  margin-top: -18px;}.mobile .ide_code__link {  margin-top: -23px;}.ide_code--dark .ide_code__outer {  background: #333;  box-shadow: 0px 0px 8px 0px #000 inset;  border: 1px solid #000;}.ide_code--dark .ide_code__inner {  color: #888;  background: #1d1f21;}.ide_code--dark .ide_code__code {  color: #F1F1F1;}.ide_code--light .ide_code__outer {  background: #bdbdbd;  box-shadow: 0px 0px 8px 0px #a9a8a8 inset;  border: 1px solid #a9a8a8;}.ide_code--light .ide_code__inner {  color: #888;  background: #e4e4e4;}.ide_code--light .ide_code__code {  color: #5a5858;}";
	return ide_code;
}());