!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t||self).streakCounter={})}(this,function(t){function e(){return e=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},e.apply(this,arguments)}function r(t){return t.toLocaleDateString("en-US")}function n(t,n){return e({},{currentCount:1,startDate:r(t),lastLoginDate:r(t)},n)}var o="streak";function a(t,e){t.setItem(o,JSON.stringify(e))}t.streakCounter=function(t,e){var i,s,u=t.getItem(o);if(u)try{var f=JSON.parse(u),c=(i=f.lastLoginDate,0==(s=e.getDate()-parseInt(i.split("/")[1]))?"none":1===s?"increment":"reset"),l="reset"===c;if("increment"===c){var p=n(e,{startDate:f.startDate,currentCount:f.currentCount+1,lastLoginDate:r(e)});return a(t,p),p}if(l){var g=n(e);return a(t,g),g}return f}catch(t){console.error("failed to parse streak from localStorage")}var d=n(e);return a(t,d),d}});
//# sourceMappingURL=index.umd.js.map
