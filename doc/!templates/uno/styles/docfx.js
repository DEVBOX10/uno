$(function(){var r,i,l="active",o="in",n="collapsed",s="filtered",c="show",d="hide",u=new function(){function e(t){return/^(?:[a-z]+:)?\/\//i.test(t)}this.getAbsolutePath=function(t){return(t=$('<a href="'+t+'"></a>')[0]).host+t.pathname},this.isRelativePath=function(t){return void 0!==t&&""!==t&&"/"!==t[0]&&!e(t)},this.isAbsolutePath=e,this.getDirectory=function(t){if(!t)return"";var e=t.lastIndexOf("/");return-1==e?"":-1<e?t.substr(0,e):void 0},this.formList=function(t,e){var c=1;return function t(e,n){if(!e||!e.items)return null;var a=e.items.length;if(0===a)return null;var r='<ul class="level'+c+" "+(n||"")+'">';c++;for(var i=0;i<a;i++){var o=e.items[i],s=o.href,l=o.name;l&&(r+=s?'<li><a href="'+s+'">'+l+"</a>":"<li>"+l,r+=t(o,n)||"",r+="</li>")}r+="</ul>";return r}({items:t},[].concat(e).join(" "))},$.fn.breakWord=function(){return this.html()==this.text()&&this.html(function(t,e){return(e=e)&&e.replace(/([a-z])([A-Z])|(\.)(\w)/g,"$1$3<wbr>$2$4")}),this}};function t(t,e){var n,a;return i.test(t)&&((n=document.getElementById(t.slice(1)))&&(a=n.getBoundingClientRect(),a=window.pageYOffset+a.top-$("header").first().height(),window.scrollTo(window.pageXOffset,a),r&&e&&history.pushState({},document.title,location.pathname+t)),n)}function a(){t(window.location.hash)}function h(){return $(document).height()-($(window).height()+$(window).scrollTop())<1}function f(){$(".sidetoc").removeClass("shiftup"),$(".sideaffix").removeClass("shiftup")}function p(){$(".sidetoc").addClass("shiftup"),$(".sideaffix").addClass("shiftup")}function g(){window.innerWidth<980?$("#logo").attr("src","../images/UnoLogoSmall.png"):$("#logo").attr("src","../images/uno-logo.svg")}function v(){$("table").addClass("table table-bordered table-striped table-condensed").wrap('<div class="table-responsive"></div>')}function b(){$(".NOTE, .TIP").addClass("alert alert-info"),$(".WARNING").addClass("alert alert-warning"),$(".IMPORTANT, .CAUTION").addClass("alert alert-danger")}function m(){$("pre code").each(function(t,e){hljs.highlightBlock(e)}),$("pre code[highlight-lines]").each(function(t,e){if(""!==e.innerHTML){var n=e.innerHTML.split("\n");if(queryString=e.getAttribute("highlight-lines"),queryString){for(var a,r=queryString.split(","),i=0;a=r[i++];){var o=a.match(/^(\d+)\-(\d+)?$/);if(o){var s=+o[1],l=+o[2];(isNaN(l)||l>n.length)&&(l=n.length)}else{if(isNaN(a))continue;l=s=+a}s<=0||l<=0||l<s||s>n.length||(n[s-1]='<span class="line-highlight">'+n[s-1],n[l-1]=n[l-1]+"</span>")}e.innerHTML=n.join("\n")}}})}function w(){var n=[];$("#navbar a.active").each(function(t,e){n.push({href:e.href,name:e.innerHTML})}),$("#toc a.active").each(function(t,e){n.push({href:e.href,name:e.innerHTML})});var t=u.formList(n,"breadcrumb");$("#breadcrumb").html(t)}function y(){var t,n=function(){var t=$($.map(["h1","h2","h3","h4"],function(t){return".article article "+t}).join(", ")),r=[];t.each(function(t,e){if(e.id){var n={name:(a=$(e).text())&&a.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),href:"#"+e.id,items:[]};if(r.length){var a=r[r.length-1];if(e.tagName===a.type)a.siblings.push(n);else if(e.tagName[1]>a.type[1])r.push({type:e.tagName,siblings:[n]});else{for(;e.tagName[1]<r[r.length-1].type[1];)i();e.tagName===r[r.length-1].type?r[r.length-1].siblings.push(n):r.push({type:e.tagName,siblings:[n]})}}else r.push({type:e.tagName,siblings:[n]})}});for(;1<r.length;)i();function i(){var t=r.pop(),e=r[r.length-1],n=e.siblings[e.siblings.length-1];$.each(t.siblings,function(t,e){n.items.push(e)})}if(0<r.length){t=r.pop().siblings;return 1===t.length?t[0].items:t}return}();n&&0<n.length&&(t='<h5 class="title">In This Article</h5>',t+=u.formList(n,["nav","bs-docs-sidenav"]),$("#affix").empty().append(t),$("footer").is(":visible")&&$(".sideaffix").css("bottom","70px"),$("#affix a").click(function(){var t=$('[data-spy="scroll"]').data()["bs.scrollspy"],n=e.target.hash;t&&n&&t.activate(n)}),t=$(".contribution").get(0).outerHTML,$(".contribution").remove(),$(".sideaffix").append(t))}function C(){var o={id:"data-bi-id",name:"data-bi-name",type:"data-bi-type"},s=(Object.defineProperty(t.prototype,"tabIds",{get:function(){return this.a.getAttribute("data-tab").split(" ")},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"condition",{get:function(){return this.a.getAttribute("data-condition")},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"visible",{get:function(){return!this.li.hasAttribute("hidden")},set:function(t){t?(this.li.removeAttribute("hidden"),this.li.removeAttribute("aria-hidden")):(this.li.setAttribute("hidden","hidden"),this.li.setAttribute("aria-hidden","true"))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"selected",{get:function(){return!this.section.hasAttribute("hidden")},set:function(t){t?(this.a.setAttribute("aria-selected","true"),this.a.tabIndex=0,this.section.removeAttribute("hidden"),this.section.removeAttribute("aria-hidden")):(this.a.setAttribute("aria-selected","false"),this.a.tabIndex=-1,this.section.setAttribute("hidden","hidden"),this.section.setAttribute("aria-hidden","true"))},enumerable:!0,configurable:!0}),t.prototype.focus=function(){this.a.focus()},t);function t(t,e,n){this.li=t,this.a=e,this.section=n}function h(t,e){for(var n,a=!1,r=0,i=t.tabs;r<i.length;r++)(o=i[r]).visible=null===o.condition||-1!==e.selectedTabs.indexOf(o.condition),o.visible&&(n=n||o),o.selected=o.visible&&p(e.selectedTabs,o.tabIds),a=a||o.selected;if(!a){for(var o,s=0,l=t.tabs;s<l.length;s++)for(var c=0,d=l[s].tabIds;c<d.length;c++){var u=d[c],u=e.selectedTabs.indexOf(u);-1!==u&&e.selectedTabs.splice(u,1)}(o=n).selected=!0,e.selectedTabs.push(o.tabIds[0])}}function f(t){var e=l();e.tabs=t.selectedTabs.join();e=location.protocol+"//"+location.host+location.pathname+"?"+function(t){var e,n=[];for(e in t)t.hasOwnProperty(e)&&""!==t[e]&&null!==t[e]&&void 0!==t[e]&&n.push(encodeURIComponent(e)+"="+encodeURIComponent(t[e]));return n.join("&")}(e)+location.hash;location.href!==e&&history.replaceState({},document.title,e)}function l(t){function e(t){return decodeURIComponent(t.replace(a," "))}var n,a=/\+/g,r=/([^&=]+)=?([^&]*)/g;t=(t=void 0===t?"":t).substring(1);for(var i={};n=r.exec(t);)i[e(n[1])]=e(n[2]);return i}function p(t,e){for(var n=0,a=t;n<a.length;n++)for(var r=a[n],i=0,o=e;i<o.length;i++)if(r===o[i])return!0;return!1}!function(t){for(var e=function(){var t=l().tabs;return void 0!==t&&""!==t?t.split(","):[]}(),n=t.querySelectorAll(".tabGroup"),a={groups:[],selectedTabs:[]},r=0;r<n.length;r++){var i=function(t){var e={independent:t.hasAttribute("data-tab-group-independent"),tabs:[]},n=t.firstElementChild.firstElementChild;for(;n;){var a=n.firstElementChild;a.setAttribute(o.name,"tab");var r=a.getAttribute("data-tab").replace(/\+/g," ");a.setAttribute("data-tab",r);r=t.querySelector('[id="'+a.getAttribute("aria-controls")+'"]'),r=new s(n,a,r);e.tabs.push(r),n=n.nextElementSibling}return t.setAttribute(o.name,"tab-group"),t.tabGroup=e}(n.item(r));i.independent||(h(i,a),a.groups.push(i))}t.addEventListener("click",function(t){return function(t,e){var n=function(t){if(!(t.target instanceof HTMLElement))return null;var e=t.target.closest("a[data-tab]");if(null===e)return null;var n=e.getAttribute("data-tab").split(" "),t=e.parentElement.parentElement.parentElement.tabGroup;return void 0!==t?{tabIds:n,group:t,anchor:e}:null}(t);if(null!==n){t.preventDefault(),n.anchor.href="javascript:",setTimeout(function(){return n.anchor.href="#"+n.anchor.getAttribute("aria-controls")});var a=n.tabIds,r=n.group,i=n.anchor.getBoundingClientRect().top;if(r.independent)for(var o=0,s=r.tabs;o<s.length;o++){var l=s[o];l.selected=p(l.tabIds,a)}else{if(p(e.selectedTabs,a))return;var c=r.tabs.filter(function(t){return t.selected})[0].tabIds[0];e.selectedTabs.splice(e.selectedTabs.indexOf(c),1,a[0]);for(var d=0,u=e.groups;d<u.length;d++)h(u[d],e);f(e)}c=n.anchor.getBoundingClientRect().top;c!==i&&t instanceof MouseEvent&&window.scrollTo(0,window.pageYOffset+c-i)}}(t,a)}),0!==a.groups.length&&(function(t){for(var e=0,n=t;e<n.length;e++){var a=n[e],a=document.querySelector('.tabGroup > ul > li > a[data-tab="'+a+'"]:not([hidden])');if(null===a)return;a.dispatchEvent(new CustomEvent("click",{bubbles:!0}))}}(e),f(a))}(document.body)}r=!(!history||!history.pushState),i=/^#[^ ]+$/,$(window).on("hashchange",a),a(),$(document).ready(function(){$("body").scrollspy({offset:150})}),m(),function(){var r,i=$("meta[property='docfx\\:rel']").attr("content");if(void 0!==i)try{var t=new Worker(i+"styles/search-worker.js");(t||window.worker?function(){var e=$.Deferred();t.onmessage=function(t){switch(t.data.e){case"index-ready":e.resolve();break;case"query-ready":o(t.data.d)}},e.promise().done(function(){$("body").on("query-ready",function(){t.postMessage({q:r})}),r&&3<=r.length&&t.postMessage({q:r})})}:function(){console.log("using local search");var n=lunr(function(){this.ref("href"),this.field("title",{boost:50}),this.field("keywords",{boost:20})});lunr.tokenizer.seperator=/[\s\-\.]+/;var a={},t=new XMLHttpRequest,e=i+"index.json";e&&(t.open("GET",e),t.onload=function(){if(200==this.status)for(var t in a=JSON.parse(this.responseText))a.hasOwnProperty(t)&&n.add(a[t])},t.send());$("body").on("queryReady",function(){var t=n.search(r),e=[];t.forEach(function(t){t=a[t.ref];e.push({href:t.href,title:t.title,keywords:t.keywords})}),o(e)})})(),function(){function e(){var t=$("#autocollapse");null===t.height()&&setTimeout(e,300),t.removeClass(n),60<t.height()&&t.addClass(n)}e(),$(window).on("resize",e),$(document).on("click",".navbar-collapse.in",function(t){$(t.target).is("a")&&$(this).collapse("hide")})}(),function(){var t=url("?q");null!=t&&t.split("%20").forEach(function(t){""!==t&&($(".data-searchable *").mark(t),$("article *").mark(t))})}(),$("body").on("searchEvent",function(){$("#search-results>.sr-items").html("<p>No results found</p>"),$("#search-query").keypress(function(t){return 13!==t.which}),$("#search-query").on("keyup",function(){$("#search-results").show(),r=$(this).val(),$("body").trigger("query-ready"),$("#search-results>.search-list").text('Search Results for "'+r+'"')}).off("keydown")})}catch(t){console.error(t)}function o(t){0===t.length?$("#search-results>.sr-items").html("<p>No results found</p>"):($("#search-results>.sr-items").empty().append(t.slice(0,20).map(function(t){!function(t,e){for(var t=t.split(/\/+/),n=e.split(/\/+/),a=t.length-1,r=[],i=0;i<n.length;i++)".."===n[i]?a--:"."!==n[i]&&r.push(n[i]);t.slice(0,a).concat(r).join("/")}(window.location.href,i+t.href);var e,n=i+t.href+"?q="+r,a=t.title,t=(e=t.keywords,t=r.split(/\s+/g),50<(t=e.indexOf(t[0]))?"..."+e.slice(t-50,t+50)+"...":t<=50?e.slice(0,t+50)+"...":void 0),n=$("<a>").attr("class","sr-item").attr("href",n),a=$("<div>").attr("class","item-title").text(a),t=$("<div>").attr("class","item-brief").text(t);return n.append(a).append(t),n})),r.split(/\s+/).forEach(function(t){""!==t&&(t=t.replace(/\*/g,""),$("#search-results>.sr-items *").mark(t))}))}}(),v(),b(),"true"===$("meta[property='docfx:newtab']").attr("content")&&$(document.links).filter(function(){return this.hostname!==window.location.hostname}).attr("target","_blank"),function n(){var t=$("#navbar ul")[0];void 0===t?e():($("#navbar ul a.active").parents("li").addClass(l),w());function e(){var s,e=$("meta[property='docfx\\:navrel']").attr("content");e&&(e=e.replace(/\\/g,"/"),s=(s=$("meta[property='docfx\\:tocrel']").attr("content")||"")&&s.replace(/\\/g,"/"),$.get(e,function(t){$(t).find("#toc>ul").appendTo("#navbar");var t=e.lastIndexOf("/"),i="";-1<t&&(i=e.substr(0,t+1)),$("#navbar>ul").addClass("navbar-nav");var o=u.getAbsolutePath(window.location.pathname);$("#navbar").find("a[href]").each(function(t,e){var n,a,r=$(e).attr("href");u.isRelativePath(r)&&(r=i+r,$(e).attr("href",r),n=!1,(a=e.name)?(a=i+a,u.getDirectory(u.getAbsolutePath(a))===u.getDirectory(u.getAbsolutePath(s))&&(n=!0)):u.getAbsolutePath(r)===o&&("dropdown"==$(e).attr("data-toggle")||(n=!0)),n&&$(e).addClass(l))}),n()}))}}(),function n(){var t=$("#sidetoggle .sidetoc")[0];{var a;void 0===t?r():(e(),$("footer").is(":visible")&&$(".sidetoc").addClass("shiftup"),a=0,$("#toc a.active").parents("li").each(function(t,e){$(e).addClass(l).addClass(o),$(e).children("a").addClass(l),a+=$(e).position().top}),$(".sidetoc").scrollTop(a-50),$("footer").is(":visible")&&$(".sidetoc").addClass("shiftup"),w())}function e(){$(".toc .nav > li > .expand-stub").click(function(t){$(t.target).parent().toggleClass(o)}),$(".toc .nav > li > .expand-stub + a:not([href])").click(function(t){$(t.target).parent().toggleClass(o)}),$("#toc_filter_input").on("input",function(t){var i=this.value;function o(t,e){return!e||!!(t&&-1<t.toLowerCase().indexOf(e.toLowerCase()))}""!==i?($("#toc li>a").filter(function(t,e){return 0===$(e).siblings().length}).each(function(t,e){for(var n=$(e).attr("title"),e=$(e).parent(),a=e.parents("ul>li"),t=0;t<a.length;t++){var r=$(a[t]).children("a").attr("title");r&&(n=r+"."+n)}o(n,i)?(e.addClass(c),e.removeClass(d)):(e.addClass(d),e.removeClass(c))}),$("#toc li>a").filter(function(t,e){return 0<$(e).siblings().length}).each(function(t,e){e=$(e).parent();0<e.find("li.show").length?(e.addClass(c),e.addClass(s),e.removeClass(d)):(e.addClass(d),e.removeClass(c),e.removeClass(s))})):$("#toc li").removeClass(s).removeClass(d)})}function r(){var e=$("meta[property='docfx\\:tocrel']").attr("content");e&&(e=e.replace(/\\/g,"/"),$("#sidetoc").load(e+" #sidetoggle > div",function(){var t=e.lastIndexOf("/"),a="";-1<t&&(a=e.substr(0,t+1));var r=u.getAbsolutePath(window.location.pathname);$("#sidetoc").find("a[href]").each(function(t,e){var n=$(e).attr("href");u.isRelativePath(n)&&(n=a+n,$(e).attr("href",n)),u.getAbsolutePath(e.href)===r&&$(e).addClass(l),$(e).breakWord()}),n(),0!==$("#search-results").length&&($("#search").show(),$("body").trigger("searchEvent")),$("body").mouseup(function(t){$("#search-results").is(t.target)||0!==$("#search-results").has(t.target).length||$("#search-results").hide()})}))}}(),y(),h()?(p(),$("footer").show()):(f(),$("footer").hide()),$(window).on("scroll",function(){h()?(p(),$("footer").fadeIn()):(f(),$("footer").fadeOut())}),jQuery("img.svg").each(function(){var e=jQuery(this),n=e.attr("id"),a=e.attr("class"),t=e.attr("src");jQuery.get(t,function(t){t=jQuery(t).find("svg");void 0!==n&&(t=t.attr("id",n)),t=(t=void 0!==a?t.attr("class",a+" replaced-svg"):t).removeAttr("xmlns:a"),e.replaceWith(t)},"xml")}),$(".xref").addClass("text-break"),$(".text-break").each(function(){$(this).breakWord()}),C(),g(),window.refresh=function(t){void 0!==t&&void 0!==t.content||console.error("Null Argument"),$("article.content").html(t.content),m(),v(),b(),y(),C()},$(window).resize(function(){g()}),$(document).on("wordpressMenuHasLoaded",function(){const e=window.location.pathname;var n="/docs/articles/";const t=document.getElementById("menu-menu-principal"),a=t.getElementsByTagName("a");for(let t=0;t<a.length;t++)a[t].href.includes(n)&&e.includes(n)&&!a[t].href.includes("#")&&$(a[t]).addClass("activepath");const r=window.location.search;if(r){const o=r.split("=");var i=o.slice(-1)[0];$("#search-query").val(decodeURI(i))}}),anchors.options={placement:"right",visible:"touch",icon:"#"},anchors.add("article h2:not(.no-anchor), article h3:not(.no-anchor), article h4:not(.no-anchor)")}),document.addEventListener("DOMContentLoaded",function(){var e,n,a=document.querySelector("header > .navbar");document.body.classList.contains("front-page")&&(e=0,n=!1,window.addEventListener("scroll",function(t){e=window.scrollY,n||(window.requestAnimationFrame(function(){100<=e?a.classList.add("scrolled"):a.classList.remove("scrolled"),n=!1}),n=!0)}));const r=new XMLHttpRequest;const i=document.getElementById("navbar");let o=!1;r.open("get","https://platform.uno/wp-json/wp/v2/menu",!0),void 0!==a&&(r.onload=function(t){200===r.status&&r.responseText&&(i.innerHTML=JSON.parse(r.responseText),o=!0,$(document).trigger("wordpressMenuHasLoaded"))},r.onerror=function(t){},r.send()),$(document).ajaxComplete(function(t,e,n){if("toc.html"===n.url&&o){const a=i.getElementsByClassName("navbar-nav");a[0].className+=" hidden"}}),document.addEventListener("click",function(t){const e=t.target;980<=window.innerWidth||!e.matches("#navbar .has-children a")||(t.preventDefault(),e.parentElement.classList.toggle("open"))},!1)},!1);