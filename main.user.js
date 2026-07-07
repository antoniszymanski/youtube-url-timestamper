// ==UserScript==
// @name         Youtube URL Timestamper
// @description  Updates the browser URL with the current timestamp of the YouTube video every 30 seconds
// @namespace    antoniszymanski
// @author       Antoni Szymański
// @version      1.1.0
// @license      MPL-2.0
// @match        https://www.youtube.com/*
// ==/UserScript==
!function(){let t;function e(){var t;let e,n,r,a=document.querySelector("video");if(!a||Number.isFinite(a.duration)&&a.duration<=600||a.currentTime<120||Number.isFinite(a.duration)&&a.duration-a.currentTime<=120)return;let i=(e=Math.trunc((t=a.currentTime)/3600),(e>0?`${e}h`:"")+((n=Math.trunc(t/60)%60)>0?`${n}m`:"")+((r=Math.trunc(t%60))>0?`${r}s`:"")),o=new URL(window.location.href);o.searchParams.get("t")!==i&&(o.searchParams.set("t",i),window.history.replaceState(null,"",o))}window.navigation.addEventListener("navigate",n=>{let r=new URL(n.destination.url);"https"!==r.protocol||"youtube.com"!==r.host||"/watch"!==r.pathname?clearInterval(t):t=setInterval(e,3e4)})}();