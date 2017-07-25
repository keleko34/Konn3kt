if(typeof window.K_Components === 'undefined') window.K_Components = {};
K_Components["intro"] = (function(){
	/*********************************
 *  intro
 *  Created by keleko34
 *  This is an introductory page that shows some basic info about the konnekt library and its cool benifits
 ********************************/

function intro(node)
{
  var self = this;
  
  /* ATTRIBUTES */
  this.offsettop = 0;
  this.height = 0;
  this.falsey = false;
  this.infosection = node.querySelector('.intro__platform');
  this.intro = node.querySelector('.intro');
  
  this.size = (Konnekt.device.type === 'desktop' ? 'large' : 'medium');
  
  this.listen('app_height',function(value){
    this.height = (value-this.offsettop);
  });
  
  this.onFinish = function()
  {
    this.height = (window.innerHeight-this.offsettop);
  }
  
  this.gotoInfo = function(e)
  {
    var offset = (self.infosection.getBoundingClientRect().top - 50),
        currentScroll = self.intro.scrollTop,
        startAnim = 20,
        currAnim = startAnim,
        timer,
        finished = false,
        old = currentScroll;
    
    if(currentScroll < offset)
    {
      function getPercent()
      {
        var perc = ((currentScroll/offset)*100);
        if(perc >= 65)
        {
          var currPerc = ((perc - 65) * 100) / (100 - 65);
              currAnim = startAnim - (startAnim * (currPerc/100));
          if(currAnim < 1) currAnim = 1;
          
        }
      }

      function animate()
      {
        if(timer)
        {
          clearTimeout(timer);
          timer = null;
        }
        currentScroll = self.intro.scrollTop;
        if((currentScroll + currAnim) >= offset)
        {
          currentScroll = offset;
          finished = true;
        }
        else
        {
          currentScroll += currAnim;
          self.intro.scrollTop = currentScroll;
          getPercent();
        }
        if((currentScroll === old))
        {
          currentScroll = offset;
          finished = true;
        }
        old = currentScroll;
        if(!finished) timer = setTimeout(function(){animate();},10);
      }
      
      animate();
    }
    
  }
}

/* PROTOTYPES */
intro.prototype.k_html = "<!-- intro Created by keleko34, This is an introductory page that shows some basic info about the konnekt library and its cool benifits --><div class='intro'>  <div class='intro__content'>    <div class='intro__content__left'>      <logo size='{{size}}' islinked='{{falsey}}'></logo>      <div class='intro__content__install'>        <div class='intro__content__install__inner'>          <div class='intro__content__install__line'>1.</div>          <span class=' intro__content__install__text intro__content__install__text__1'>npm </span>          <span class='intro__content__install__text intro__content__install__text__2'>install </span>          <span class='intro__content__install__text intro__content__install__text__3'>konnekt</span>        </div>      </div>    </div>    <div class='intro__content__right'>      <div class='intro__content__types'>HTML, CSS, JS</div>      <div class='intro__content__title'>Konnekt Framework</div>      <div class='intro__content__list'>        <div class='intro__content__info'>          Apps that are expandable, intuitive, componetized and are designer friendly in nature        </div>      </div>      <div class='intro__content__links'>        <navitem link='get_started' title='Get Started'></navitem>        <navitem link='documentation' left='140' title='Documentation'></navitem>      </div>    </div>  </div>  <div class='intro__arrow' onclick='{{gotoInfo}}'></div>  <div class='intro__uses'>    <div class='intro__uses__container'>      <div class='intro__uses__item'>        <img class='intro__uses__image' src='./assets/img/icons/browser.svg' />        <div class='intro__uses__text'><span>Modular Framework</span><br /><a href='#get_started'>...</a></div>      </div>      <div class='intro__uses__item'>        <img class='intro__uses__image' src='./assets/img/icons/pencil-case.svg' />        <div class='intro__uses__text'><span>Designer Friendly</span><br /><a href='#get_started'>...</a></div>      </div>      <div class='intro__uses__item'>        <img class='intro__uses__image' src='./assets/img/icons/responsive-design-symbol.svg' />        <div class='intro__uses__text'><span>Simple Architecture</span><br /><a href='#get_started'>...</a></div>      </div>    </div>  </div>  <div class='intro__platform'>   <get_started></get_started>  </div>  <div class='intro__footer'>    <app_footer></app_footer>  </div></div>";
intro.prototype.k_css = "/********************************* *  intro *  Created by keleko34 *  This is an introductory page that shows some basic info about the konnekt library and its cool benifits ********************************/.intro {  height:{{height}}px;  width:100%;  background:#1D1F21;  position: relative;  overflow-y:auto;  background:#121212;}.intro .logo {  cursor: default !important;}.intro__arrow {  position: absolute;  left: 50%;  cursor: pointer;  background: url('/assets/img/icons/down-arrow.svg') no-repeat;  height: 80px;  width:80px;  background-size: contain;}.desktop .intro__arrow, .tablet .intro__arrow {  top: 420px;  margin-left: -16px;}.mobile .intro__arrow {  top: 450px;  margin-left: -40px;}.intro__arrow:hover {  background: url('/assets/img/icons/down-arrow-active.svg') no-repeat;  background-size: contain;}.intro__arrow:active {  background: url('/assets/img/icons/down-arrow-active.svg') no-repeat;  background-size: contain;}.desktop .intro__content, .tablet .intro__content {  width:800px;  height:400px;  position: absolute;  margin-left:-400px;  top:0px;  left:50%;}.mobile .intro__content {  width: 100%;}.desktop .intro__content__left, .tablet .intro__content__left {  float: left;  height: 220px;  width: 348px;  margin: 70px 0px 30px 50px;  padding: 70px 0px 0px 25px;  border-right: 1px solid #565656;  box-shadow: 8px 0px 8px -6px #000;  position: relative;}.mobile .intro__content__left {  height: 102px;  width: 280px;  padding-left: 10px;  margin: 0px auto;  margin-top: 25px;  position: relative;}.intro__content__right {  font-family: 'open sans';  color: #F1F1F1;  position: relative;}.desktop .intro__content__right, .tablet .intro__content__right {  float: left;  width: 300px;  height: 250px;  padding-top: 85px;  padding-left:25px;}.mobile .intro__content__right {  margin-top:20px;  text-align: center;}.intro__content__types {  font-size: 14px;  color: lightskyblue;  font-weight:500;}.intro__content__title {  font-size: 28px;  font-weight: 300;  margin-top: 15px;}.desktop .intro__content__list, .tablet .intro__content__list {  font-size: 18px;  margin-top: 20px;  font-weight: 300;  line-height: 30px;  color: #888;}.mobile .intro__content__list {  font-size: 26px;  font-weight: 300;  margin-top: 30px;  width: 200px;  height: 170px;  position: absolute;  left: 50%;  margin-left: -100px;  color: #888;}.intro__content__list li {  margin-top: 15px;}.intro__content__list span {  color:#F1F1F1;}.intro__content__install {  position: absolute;  width: 300px;}.desktop .intro__content__install, .tablet .intro__content__install {  bottom: 20px;  left: 30px;  background: #333;  box-shadow: 0px 0px 8px 0px #000 inset;  border: 1px solid #000;}.mobile .intro__content__install {  bottom: -15px;  left: 5px;}.intro__content__install__inner {  height: 15px;  padding: 15px;  font-size: 14px;  font-family: 'open sans';  color: #888;}.desktop .intro__content__install__inner, .tablet .intro__content__install__inner {  margin: 10px;  background: #1d1f21;}.intro__content__install__inner div {  float: left;}.intro__content__install__line {  margin-right: 10px;}.mobile .intro__content__install__line {  display:none;}.intro__content__install__text {  -webkit-user-select: text;  user-select: text;  cursor:text;}.desktop .intro__content__install__text__1, .tablet .intro__content__install__text__1 {  color: #84a2ea;}.desktop .intro__content__install__text__2, .tablet .intro__content__install__text__2 {  color: #bc68d6;}.desktop .intro__content__install__text__3, .tablet .intro__content__install__text__3 {  color: #F1F1F1;}.intro__content__links {  margin-top: 20px;  position: relative;  height:20px;}.mobile .intro__content__links {  display:none;}.intro__content__links .navitem {  padding: 10px;  text-align: center;  background: #78c1ff;  border-radius: 3px;  box-shadow: 0px 1px 4px 0px #000;  border: 1px solid rgba(0, 0, 0, 0.5);  color: #1d1f21;  font-weight: 600;  cursor: pointer;  float: left;  margin-right: 10px;}.intro__content__links .navitem:hover {  background: #5096d2 !important;  box-shadow: none !important;}.intro__content__links .navitem:active {  background: #4a89bf !important;  box-shadow: 0px 0px 4px 0px #000 !important;}.intro__content__links .navitem_text {  color: #1d1f21 !important;  line-height:20px !important;}.intro__uses {  width: 100%;  background: #333;  position: absolute;  top: 600px;  border-bottom: solid 4px #87cefa;}.desktop .intro__uses {  height: 160px;}.mobile .intro__uses {  height: 350px;}.intro__platform {  width:100%;  position: absolute;  background:#F1F1F1;}.desktop .intro__platform {  top: 764px;  height: 2200px;}.mobile .intro__platform {  top: 953px;  height: 3350px;}/* intro uses */.intro__uses__container {  margin:0 auto;  padding-top:28px;  clear:both;}.desktop .intro__uses__container {  width:720px;}.mobile .intro__uses__container {  width:350px;}.intro__uses__item {  float:left;  margin-left:50px;}.intro__uses__image {  width: 80px;  float: left;  margin: 10px 20px;}.intro__uses__text {  color: #F1F1F1;  font-size: 20px;  float: left;  margin-top: 18px;  width: 60px;  font-weight: 300;  font-family: 'open sans';}.intro__uses__text span {  font-weight: 500;  font-size: 16px;}.intro__uses__text a,.desktop .intro__uses__text a:active {  color:#F1F1F1;  text-decoration: none;}.intro__footer {  position: absolute;  width:100%;}.desktop .intro__footer {  top: 2960px;}.mobile .intro__footer {  top: 4300px;}";
	return intro;
}());