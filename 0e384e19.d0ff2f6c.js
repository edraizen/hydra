(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{125:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return u}));var a=n(1),r=n(9),i=(n(0),n(199)),o={id:"intro",title:"Getting started",sidebar_label:"Getting started"},l={id:"intro",title:"Getting started",description:"## Introduction",source:"@site/docs/intro.md",permalink:"/docs/next/intro",editUrl:"https://github.com/facebookresearch/hydra/edit/master/website/docs/intro.md",version:"next",lastUpdatedBy:"Omry Yadan",lastUpdatedAt:1582767016,sidebar_label:"Getting started",sidebar:"Docs",next:{title:"Tutorials intro",permalink:"/docs/next/tutorials/intro"}},c=[{value:"Introduction",id:"introduction",children:[{value:"Key features:",id:"key-features",children:[]}]},{value:"Quick start guide",id:"quick-start-guide",children:[{value:"Installation",id:"installation",children:[]},{value:"Basic example",id:"basic-example",children:[]},{value:"Composition example",id:"composition-example",children:[]},{value:"Multirun",id:"multirun",children:[]}]},{value:"Other stuff",id:"other-stuff",children:[{value:"Community",id:"community",children:[]},{value:"Citing Hydra",id:"citing-hydra",children:[]}]}],p={rightToc:c};function u(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"introduction"},"Introduction"),Object(i.b)("p",null,"Hydra is an open-source Python framework that simplifies the development of research and other complex applications.\nThe key feature is the ability to dynamically create a hierarchical configuration by composition and override it through config files and the command line.\nThe name Hydra comes from its ability to run multiple similar jobs - much like a Hydra with multiple heads."),Object(i.b)("h3",{id:"key-features"},"Key features:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Hierarchical configuration composable from multiple sources"),Object(i.b)("li",{parentName:"ul"},"Configuration can be specified or overridden from the command line"),Object(i.b)("li",{parentName:"ul"},"Dynamic command line tab completion"),Object(i.b)("li",{parentName:"ul"},"Run your application locally or launch it to run remotely"),Object(i.b)("li",{parentName:"ul"},"Run multiple jobs with different arguments with a single command")),Object(i.b)("p",null,"Hydra requires Python 3.6 or newer, and it officially supports Linux, Mac and Windows."),Object(i.b)("h2",{id:"quick-start-guide"},"Quick start guide"),Object(i.b)("p",null,"This guide will show you some of the most important features of Hydra.\nRead the ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"/docs/next/tutorials/basic/simple_cli"}),"tutorial")," to gain a deeper understanding."),Object(i.b)("h3",{id:"installation"},"Installation"),Object(i.b)("p",null,"Install the stable release with "),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),"pip install hydra-core --upgrade\n")),Object(i.b)("p",null,"You can install pre-release version with: "),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),"pip install hydra-core --pre --upgrade\n")),Object(i.b)("p",null,"This version may contain nuts and bugs and be incompatible with existing plugins."),Object(i.b)("h3",{id:"basic-example"},"Basic example"),Object(i.b)("p",null,"Configuration file: ",Object(i.b)("inlineCode",{parentName:"p"},"config.yaml")),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml"}),"db:\n  driver: mysql\n  user: omry\n  pass: secret\n")),Object(i.b)("p",null,"Python file: ",Object(i.b)("inlineCode",{parentName:"p"},"my_app.py")),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python",metastring:"{4-6}","{4-6}":!0}),'import hydra\nfrom omegaconf import DictConfig\n\n@hydra.main(config_path="config.yaml")\ndef my_app(cfg : DictConfig) -> None:\n    print(cfg.pretty())\n\nif __name__ == "__main__":\n    my_app()\n')),Object(i.b)("p",null,"You can learn more about OmegaConf ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://omegaconf.readthedocs.io/en/latest/usage.html#access-and-manipulation"}),"here")," later."),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"config.yaml")," is loaded automatically when you run your application"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml"}),"$ python my_app.py\ndb:\n  driver: mysql\n  pass: secret\n  user: omry\n")),Object(i.b)("p",null,"You can override values in the loaded config from the command line:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml",metastring:"{4-5}","{4-5}":!0}),"$ python my_app.py db.user=root db.pass=1234\ndb:\n  driver: mysql\n  user: root\n  pass: 1234\n")),Object(i.b)("h3",{id:"composition-example"},"Composition example"),Object(i.b)("p",null,"You may want to alternate between two different databases. to support this create a ",Object(i.b)("inlineCode",{parentName:"p"},"config group")," named db,\nand place one config file for each alternative inside:\nThe directory structure of our application now looks like:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-text"}),"\u251c\u2500\u2500 db\n\u2502   \u251c\u2500\u2500 mysql.yaml\n\u2502   \u2514\u2500\u2500 postgresql.yaml\n\u251c\u2500\u2500 config.yaml\n\u2514\u2500\u2500 my_app.py\n")),Object(i.b)("p",null,"Here is the new ",Object(i.b)("inlineCode",{parentName:"p"},"config.yaml")),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml"}),"defaults:\n  - db: mysql\n# some other config options in your config file.\nwebsite:\n  domain: example.com\n")),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"defaults")," is a special directive telling Hydra to use db/mysql.yaml when composing the configuration object.\nThe resulting cfg object is a composition of configs from defaults with configs specified in your ",Object(i.b)("inlineCode",{parentName:"p"},"config.yaml"),"."),Object(i.b)("p",null,"You can now choose which database configuration to use from the and override values from the command line: "),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml"}),"$ python my_app.py db=postgresql db.timeout=20\ndb:\n  driver: postgresql\n  pass: drowssap\n  timeout: 20\n  user: postgre_user\nwebsite:\n  domain: example.com\n")),Object(i.b)("p",null,"You can have as many config groups as you need."),Object(i.b)("h3",{id:"multirun"},"Multirun"),Object(i.b)("p",null,"You can run your function multiple times with different configuration easily with the ",Object(i.b)("inlineCode",{parentName:"p"},"--multirun|-m")," flag."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),"$ python my_app.py --multirun db=mysql,postgresql\n[HYDRA] Sweep output dir : multirun/2020-01-09/01-16-29\n[HYDRA] Launching 2 jobs locally\n[HYDRA]        #0 : db=mysql\ndb:\n  driver: mysql\n  pass: secret\n  user: omry\nwebsite:\n    domain: example.com\n\n[HYDRA]        #1 : db=postgresql\ndb:\n  driver: postgresql\n  pass: drowssap\n  timeout: 10\n  user: postgre_user\nwebsite:\n    domain: example.com\n")),Object(i.b)("p",null,"There is a whole lot more to Hydra. Read the ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"tutorial/1_simple_cli_app.md"}),"tutorial")," to learn more."),Object(i.b)("h2",{id:"other-stuff"},"Other stuff"),Object(i.b)("h3",{id:"community"},"Community"),Object(i.b)("p",null,"Ask questions in the google group or the chat:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(a.a)({parentName:"li"},{href:"https://hydra-framework.zulipchat.com"}),"Zulip Chat")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(a.a)({parentName:"li"},{href:"https://groups.google.com/d/forum/hydra_framework"}),"Google group"))),Object(i.b)("p",null,"Follow Hydra on Twitter and Facebook:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(a.a)({parentName:"li"},{href:"https://www.facebook.com/Hydra-Framework-109364473802509/"}),"Facebook page")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(a.a)({parentName:"li"},{href:"https://twitter.com/Hydra_Framework"}),"Twitter"))),Object(i.b)("h3",{id:"citing-hydra"},"Citing Hydra"),Object(i.b)("p",null,"If you use Hydra in your research please use the following BibTeX entry:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-text"}),"@Misc{,\n  author =       {Omry Yadan},\n  title =        {A framework for elegantly configuring complex applications},\n  howpublished = {Github},\n  year =         {2019},\n  url =          {https://github.com/facebookresearch/hydra}\n}\n")))}u.isMDXComponent=!0},199:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return d}));var a=n(0),r=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=r.a.createContext({}),u=function(e){var t=r.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l({},t,{},e)),n},b=function(e){var t=u(e.components);return r.a.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},m=Object(a.forwardRef)((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),b=u(n),m=a,d=b["".concat(o,".").concat(m)]||b[m]||s[m]||i;return n?r.a.createElement(d,l({ref:t},p,{components:n})):r.a.createElement(d,l({ref:t},p))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var p=2;p<i;p++)o[p]=n[p];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);