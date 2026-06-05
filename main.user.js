// ==UserScript==
// @name         Youtube URL Timestamper
// @description  Updates the browser URL with the current timestamp of the YouTube video every 30 seconds
// @namespace    antoniszymanski
// @author       Antoni Szymański
// @version      1.0.0
// @license      MPL-2.0
// @match        https://www.youtube.com/watch*
// ==/UserScript==
setInterval(function(){var t;let e,r,n,i=document.querySelector("video");if(null===i||Number.isFinite(i.duration)&&i.duration<=600||i.currentTime<120||Number.isFinite(i.duration)&&i.duration-i.currentTime<=120)return;let a=(e=Math.trunc((t=i.currentTime)/3600),(e>0?`${e}h`:"")+((r=Math.trunc(t/60)%60)>0?`${r}m`:"")+((n=Math.trunc(t%60))>0?`${n}s`:"")),u=new URL(window.location.href);u.searchParams.get("t")!==a&&(u.searchParams.set("t",a),window.history.replaceState(null,"",u))},3e4);