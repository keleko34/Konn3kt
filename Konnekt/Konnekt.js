/* Build */
/* End Build */
define(['KonnektDT','KonnektL','KonnektMP'],function(CreateData,CreateLoader,CreateMapping){

  function CreateKonnekt()
  {
    if(!window.K_Components) window.K_Components = {};

    var _Loader = CreateLoader().onLoad(onComponentLoad),
        _mixed = CreateData(),
        _mapper = CreateMapping(),
        _model = _mixed({},"Model"),
        _viewmodels = {},
        _cms = {},
        _query = getQuery(),
        _ignoreList = ['id','filters','class','sessionStorage','localStorage','store','component'],
        _waitList = {};

    /* This method will Create page, Create Viewmodel, attach binds, check children, load files, rinse, repeat */
    function Konnekt(node,params,pre,post)
    {
      var __name = node.tagName.toLowerCase(),
          __mappedAttrs;

      if(params === undefined) params = [];

      /* Pre -- all about built in data this will be allocated later to seperate file */
      if(pre === undefined) pre = {};

      /* base core filters usable in all components */
      if(!pre.filters) Object.defineProperty(pre,'filters',setDescriptor({}));

      /* whether to attempt to store data in sessionStorage */
      if(!pre.sessionStorage) Object.defineProperty(pre,'sessionStorage',setDescriptor(false,true));

      /* whether to attempt to store data in localStorage */
      if(!pre.localStorage) Object.defineProperty(pre,'localStorage',setDescriptor(false,true));

      /* whether to attempt to store data in the model */
      if(!pre.store) Object.defineProperty(pre,'store',setDescriptor(false,true));

      /* if this component can have children components of the same type, to prevent recursion */
      if(!pre.multiple) Object.defineProperty(pre,'multiple',setDescriptor(false,true));

      /* post all about post set data and pointers */
      if(post === undefined) post = {};

      post.innerhtml = node.innerHTML;
      for(var x=0,len=node.attributes.length;x<len;x++)
      {
        if(['id','class'].indexOf(node.attributes[x].name) === -1) post[node.attributes[x].name] = node.attributes[x].value;
      }

      function createViewmodel(name,component,params,pre,post)
      {
        var obsv = _mixed({},name);
        obsv.ignoreCreate('__proto__');
        obsv.__proto__ = component.prototype;

        /* Pre attachments, core methods */
        for(var x=0,keys=Object.keys(pre),len=keys.length;x<len;x++)
        {
            if(obsv.isObservable(pre,keys[x]))
            {
                obsv.addPointer(pre,keys[x]);
            }
            else
            {
                obsv.add(keys[x],pre[keys[x]]);
            }
        }

        component.apply(obsv,params);

        /* Post attachments, overwritables, for data or pointers */
        for(var x=0,keys=Object.keys(post),len=keys.length;x<len;x++)
        {
            if(obsv.isObservable(post,keys[x]))
            {
              if(obsv[keys[x]] !== undefined) obsv.remove(keys[x]);
              obsv.addPointer(post,keys[x]);
            }
            else
            {
              obsv.set(keys[x],post[keys[x]]);
            }
        }


        /* Apply session storage if set */
        if(obsv.sessionStorage)
        {
            var storage = sessionStorage.getItem((obsv.id || name));
            if(storage)
            {
                storage = JSON.parse(storage);
                for(var x=0,keys=Object.keys(storage),len=keys.length;x<len;x++)
                {
                    obsv.set(keys[x],storage[keys[x]]);
                }
            }
            else
            {
                sessionStorage.setItem((obsv.id || name),obsv.stringify());
            }
            obsv.addChildDataUpdateListener('*',function(){
                sessionStorage.setItem((obsv.id || name),obsv.stringify());
            });
        }

        /* Apply local storage if set */
        if(obsv.localStorage)
        {
            var storage = localStorage.getItem((obsv.id || name));
            if(storage)
            {
                storage = JSON.parse(storage);
                for(var x=0,keys=Object.keys(storage),len=keys.length;x<len;x++)
                {
                    obsv.set(keys[x],storage[keys[x]]);
                }
            }
            else
            {
                localStorage.setItem((obsv.id || name),obsv.stringify());
            }
            obsv.addChildDataUpdateListener('*',function(){
                localStorage.setItem((obsv.id || name),obsv.stringify());
            });
        }

        if(obsv.store)
        {
            _model.set((obsv.id || name),obsv);
        }
        return obsv;
      }

      function mapTargets(maps,vm)
      {
        console.log(maps,vm);
      }

      function getInnerComponents()
      {

      }

      function init(name,node)
      {
        __mappedAttrs = _mapper(node);
        node.replaceWith(__mappedAttrs.wrapper);
        mapTargets(__mappedAttrs.maps,createViewmodel(name,_viewmodels[name],params,pre,post));
        getInnerComponents(__mappedAttrs.wrapper);
      }

      if(!_mapper.isRegistered(__name))
      {
        Konnekt.loadWaitList(__name,function(n,c){
          init(__name,node);
        });
        _Loader(__name);
      }
      else
      {
        init(__name,node);
      }

    }

    function setDescriptor(value,writable,redefinable)
    {
      return {
          value:value,
          writable:!!writable,
          enumerable:false,
          configurable:!!redefinable
      }
    }

    function getQuery()
    {
      return window.location.search.replace('?','')
      .split('&')
      .filter(function(v){return (v.length !== 0);})
      .reduce(function(o,v){
        o[v.split('=')[0]] = v.split('=')[1];
        return o;
      },{});
    }

    function onComponentLoad(name,component)
    {
      var template = "<style>"+component.prototype.k_css+"</style>"+component.prototype.k_html;
      Konnekt.register(name,component,template,component.prototype.cms)
      Konnekt.loadWaitList(name)(name,component);
      Konnekt.loadWaitList(name,function(){});
    }

    /* Registers name to a component */
    Konnekt.register = function(name,vm,template,cms)
    {
      _mapper.register(name,template);
      _viewmodels[name] = vm;
      if(cms) _cms[name] = cms;
      return Konnekt;
    }

    /* register for a component to load and be registered */
    Konnekt.loadWaitList = function(name,v){
      if(typeof v === 'undefined' && name) return _waitList[name];
      if(name) _waitList[name] = (typeof v === 'function' ? v : _waitList[name]);
      return Konnekt;
    }

    return Konnekt;
  }
  return CreateKonnekt;
});
