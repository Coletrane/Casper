$(function(u){window.toggleMenu=function(){var t=u("body"),r=u("#mtbva-overlay"),e=u("#mtbva-menu");e.data("hidden")?(e.data("hidden",!1),t.css("overflow-y","hidden"),e.addClass("mtbva-menu-open"),r.addClass("mtbva-overlay-active")):(e.data("hidden",!0),t.css("overflow-y","auto"),e.removeClass("mtbva-menu-open"),r.removeClass("mtbva-overlay-active"))},document.querySelectorAll(".kg-gallery-image img").forEach(function(t){var r=t.closest(".kg-gallery-image"),e=t.attributes.width.value/t.attributes.height.value;r.style.flex=e+" 1 0%"});var p=[{url:"https://viralstyle.com/store/angelo-wash/Sketchcollect",img:"/content/images/sponsors/nabber/sketch-collect-banner.jpg"},{url:"https://www.visitroanokeva.com/",img:"/content/images/sponsors/nabber/virginias-blue-ridge.jpg"},{url:"https://www.deschutesbrewery.com/",img:"/content/images/sponsors/nabber/deschutes.jpg"},{url:"http://jackmasonstavern.com/",img:"/content/images/sponsors/nabber/jack-masons-tavern.jpg"}];window.createIgPost=function(t){var r=u('<article class="post-card ig-post-card">'),e=u('<div class="ig-container">');return e.append(t),r.append(e),r},window.initHomeBetweenPosts=function(r,o,t,e,a){var s=e||2,c=-1<t?t:2,d=a||2,l=0,f=0;u.getJSON("/content/images/data/instagram.json").done(function(t){var n=[];n=r&&r.length?_.filter(t.posts,function(a){return _.find(r,function(r){var t=_.find(a.hashtags,function(t){return t===r}),e=_.find(a.locationTags,function(t){return t===r});return t||e})}):t.posts,u(".post-card").toArray().forEach(function(t,r,e){if(c<=r){if(o&&r%3==0&&r<3*p.length)if(2===l&&6===r){var a=u.clone(u(".sponsors-container")[0]),i=u('<div class="sponsors-middle mtbva-parallax">');i.append(u(a)),u(t).after(i)}else u(t).after(function(t){var r=u('<div class="sponsor-single">'),e=u("<a>").attr("href",p[t].url),a=u("<img>").attr("src",p[t].img);return e.append(a),r.append(e),r}(l)),l+=1;for(r=0;r<d;r++)r%s==0&&r<n.length*s&&n[f]&&(u(t).before(createIgPost(n[f].html)),f+=1)}}),window.instgrm.Embeds.process()})},window.initRideWithGpsSwitcher=function(n,o){function s(){u("#"+n+" button").each(function(t,r){u(r).css("border","none"),u(r).attr("data-route")===window.rideWithGps[n]&&u(r).css("border","2px solid #3eb0ef")})}window.rideWithGps||(window.rideWithGps={}),window.rideWithGps[n]=o[0].name,u("#"+n+" button").each(function(t,i){u(i).click(function(){var e=u(i).attr("data-route");if(window.rideWithGps[n]!==e){var r,a;if(u("#"+n+" iframe").css("visibility","hidden"),u("#"+n+" iframe").toArray().forEach(function(t){u(t).attr("data-route")!==e||(r=t)}),r)u(r).css("display","block").css("visibility","visible");else o.forEach(function(t){t.name!==e||(a=t)}),u("#"+n).append(u("<iframe>").attr("src",a.url).attr("data-route",a.name));window.rideWithGps[n]=e,u("#"+n+" iframe").each(function(t,r){u(r).attr("data-route")!==e&&u(r).css("display","none")}),s()}})}),s()},window.initTrailforksIframe=function(r){var t=u(".TrailforksWidgetRoute").toArray().find(function(t){return u(t).attr("data-id")===r});if(t){t=u(t);var e=Math.floor(u(".post-content").width())-20,a=u(window).height(),i="0",n="0",o=u(document).width();o<900?(a=Math.floor(.6*a),e=Math.floor(u(".post-content").width())-5,a<500&&(a=500)):(a=Math.floor(.8*a),900<o&&(n=i="1")),t.attr("data-trails",i),t.attr("data-details",n),t.attr("data-w",e),t.attr("data-h",a);var s="https://es.pinkbike.org/326/sprt/j/trailforks/iframeResizer.min.js";0===u("script").filter(function(t){return u(t).attr("src")===s}).length&&u.getScript(s);var c="https://es.pinkbike.org/ttl-86400/sprt/j/trailforks/widget.js";0===u("script").filter(function(t){return u(t).attr("src")===c}).length&&u.getScript(c)}},u(document).ready(function(){u(".index-yt-container").fitVids()});[{route:"creature",trailforksIds:["16397","16201","15691","15706"]}].forEach(function(t){t.trailforksIds.forEach(function(t){window.initTrailforksIframe(t)})})});
//# sourceMappingURL=default.js.map