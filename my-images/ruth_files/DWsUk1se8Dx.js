/*!CK:1528431663!*//*1417410820,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["+5mWE"]); }

__d("CanvasResizer",["createArrayFromMixed","CSS","DOMEventListener","Vector"],function(a,b,c,d,e,f,g,h,i,j){var k;function l(){var n,o=document.documentElement;if(window.innerHeight){n=window.innerHeight;}else if(o&&o.clientHeight){n=o.clientHeight;}else n=document.body.clientHeight;for(var p=0;p<k.length;p++){var q=k[p];if(!h.hasClass(q,'noresize')){var r=j.getElementPosition(q,'document').y,s=n-r;q.style.height=s/(k.length-p)+'px';}}}i.add(window,'resize',l);var m={smartSizingFrameAdded:function(){k=[];var n=g(document.getElementsByTagName('iframe'));n.forEach(function(o){if(h.hasClass(o,'smart_sizing_iframe')&&!h.hasClass(o,'noresize')){h.removeClass(o,'canvas_iframe_util');k.push(o);}});l();}};e.exports=m;},null);
__d("legacy:TimelineMLE",["TimelineMLE"],function(a,b,c,d){a.TimelineMLE=b('TimelineMLE');},3);