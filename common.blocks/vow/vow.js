/**
 * Vow
 *
 * Copyright (c) 2012-2013 Filatov Dmitry (dfilatov@yandex-team.ru)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * @version 0.3.4
 */(function(e){var t=function(e){this._res=e,this._isFulfilled=!!arguments.length,this._isRejected=!1,this._fulfilledCallbacks=[],this._rejectedCallbacks=[],this._progressCallbacks=[]};t.prototype={valueOf:function(){return this._res},isFulfilled:function(){return this._isFulfilled},isRejected:function(){return this._isRejected},isResolved:function(){return this._isFulfilled||this._isRejected},fulfill:function(e){if(this.isResolved())return;this._isFulfilled=!0,this._res=e,this._callCallbacks(this._fulfilledCallbacks,e),this._fulfilledCallbacks=this._rejectedCallbacks=this._progressCallbacks=r},reject:function(e){if(this.isResolved())return;this._isRejected=!0,this._res=e,this._callCallbacks(this._rejectedCallbacks,e),this._fulfilledCallbacks=this._rejectedCallbacks=this._progressCallbacks=r},notify:function(e){if(this.isResolved())return;this._callCallbacks(this._progressCallbacks,e)},then:function(e,n,i,s){n&&!o(n)?(s=n,n=r):i&&!o(i)&&(s=i,i=r);var u=new t,a;return this._isRejected||(a={promise:u,fn:o(e)?e:r,ctx:s},this._isFulfilled?this._callCallbacks([a],this._res):this._fulfilledCallbacks.push(a)),this._isFulfilled||(a={promise:u,fn:n,ctx:s},this._isRejected?this._callCallbacks([a],this._res):this._rejectedCallbacks.push(a)),this.isResolved()||this._progressCallbacks.push({promise:u,fn:i,ctx:s}),u},fail:function(e,t){return this.then(r,e,t)},always:function(e,t){var n=this,r=function(){return e(n)};return this.then(r,r,t)},progress:function(e,t){return this.then(r,r,e,t)},spread:function(e,t,n){return this.then(function(t){return e.apply(this,t)},t,n)},done:function(e,t,n,r){this.then(e,t,n,r).fail(s)},delay:function(e){return this.then(function(n){var r=new t;return setTimeout(function(){r.fulfill(n)},e),r})},timeout:function(e){var n=new t,r=setTimeout(function(){n.reject(Error("timed out"))},e);return n.sync(this),n.always(function(){clearTimeout(r)}),n},sync:function(e){var t=this;e.then(function(e){t.fulfill(e)},function(e){t.reject(e)})},_callCallbacks:function(e,t){var r=e.length;if(!r)return;var s=this.isResolved(),o=this.isFulfilled();i(function(){var i=0,u,a,f;while(i<r){u=e[i++],a=u.promise,f=u.fn;if(f){var l=u.ctx,c;try{c=l?f.call(l,t):f(t)}catch(h){a.reject(h);continue}s?n.isPromise(c)?function(e){c.then(function(t){e.fulfill(t)},function(t){e.reject(t)})}(a):a.fulfill(c):a.notify(c)}else s?o?a.fulfill(t):a.reject(t):a.notify(t)}})}};var n={promise:function(e){return arguments.length?n.isPromise(e)?e:new t(e):new t},when:function(e,t,r,i,s){return n.promise(e).then(t,r,i,s)},fail:function(e,t,i){return n.when(e,r,t,i)},always:function(e,t,r){return n.promise(e).always(t,r)},progress:function(e,t,r){return n.promise(e).progress(t,r)},spread:function(e,t,r,i){return n.promise(e).spread(t,r,i)},done:function(e,t,r,i,s){n.promise(e).done(t,r,i,s)},isPromise:function(e){return e&&o(e.then)},valueOf:function(e){return n.isPromise(e)?e.valueOf():e},isFulfilled:function(e){return n.isPromise(e)?e.isFulfilled():!0},isRejected:function(e){return n.isPromise(e)?e.isRejected():!1},isResolved:function(e){return n.isPromise(e)?e.isResolved():!0},fulfill:function(e){return n.when(e,r,function(e){return e})},reject:function(e){return n.when(e,function(e){var n=new t;return n.reject(e),n})},resolve:function(e){return n.isPromise(e)?e:n.when(e)},invoke:function(e){try{return n.promise(e.apply(null,u.call(arguments,1)))}catch(t){return n.reject(t)}},forEach:function(e,t,r,i){var s=i?i.length:e.length,o=0;while(o<s)n.when(e[i?i[o]:o],t,r),++o},all:function(e){var r=new t,i=f(e),s=i?l(e):c(e),o=s.length,u=i?[]:{};if(!o)return r.fulfill(u),r;var a=o,h=function(){if(!--a){var t=0;while(t<o)u[s[t]]=n.valueOf(e[s[t++]]);r.fulfill(u)}},p=function(e){r.reject(e)};return n.forEach(e,h,p,s),r},allResolved:function(e){var r=new t,i=f(e),s=i?l(e):c(e),o=s.length,u=i?[]:{};if(!o)return r.fulfill(u),r;var a=function(){--o||r.fulfill(e)};return n.forEach(e,a,a,s),r},any:function(e){var r=new t,i=e.length;if(!i)return r.reject(Error()),r;var s=0,o,u=function(e){r.fulfill(e)},a=function(e){s||(o=e),++s===i&&r.reject(o)};return n.forEach(e,u,a),r},delay:function(e,t){return n.promise(e).delay(t)},timeout:function(e,t){return n.promise(e).timeout(t)}},r,i=function(){var t=[],n=function(e){return t.push(e)===1},r=function(){var e=t,n=0,r=t.length;t=[];while(n<r)e[n++]()};if(typeof process=="object")return function(e){n(e)&&process.nextTick(r)};if(e.setImmediate)return function(t){n(t)&&e.setImmediate(r)};if(e.postMessage){var i=!0;if(e.attachEvent){var s=function(){i=!1};e.attachEvent("onmessage",s),e.postMessage("__checkAsync","*"),e.detachEvent("onmessage",s)}if(i){var o="__promise"+ +(new Date),u=function(e){e.data===o&&(e.stopPropagation&&e.stopPropagation(),r())};return e.addEventListener?e.addEventListener("message",u,!0):e.attachEvent("onmessage",u),function(t){n(t)&&e.postMessage(o,"*")}}}var a=e.document;if("onreadystatechange"in a.createElement("script")){var f=function(){var e=a.createElement("script");e.onreadystatechange=function(){e.parentNode.removeChild(e),e=e.onreadystatechange=null,r()},(a.documentElement||a.body).appendChild(e)};return function(e){n(e)&&f()}}return function(e){n(e)&&setTimeout(r,0)}}(),s=function(e){i(function(){throw e})},o=function(e){return typeof e=="function"},u=Array.prototype.slice,a=Object.prototype.toString,f=Array.isArray||function(e){return a.call(e)==="[object Array]"},l=function(e){var t=[],n=0,r=e.length;while(n<r)t.push(n++);return t},c=Object.keys||function(e){var t=[];for(var n in e)e.hasOwnProperty(n)&&t.push(n);return t},h=!0;typeof exports=="object"&&(module.exports=n,h=!1),typeof modules=="object"&&(modules.define("vow",function(e){e(n)}),h=!1),typeof define=="function"&&(define(function(e,t,r){r.exports=n}),h=!1),h&&(e.Vow=n)})(this);