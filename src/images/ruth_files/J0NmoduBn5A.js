/*!CK:748048195!*//*1417407671,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["9ZwRs"]); }

__d("isSelectionAtLeafStartExperimental",[],function(a,b,c,d,e,f){"use strict";function g(h){var i=h.getSelection(),j=i.getAnchorKey(),k=h.getBlockTree(j),l=i.getStartOffset(),m=false;k.some(function(n){if(l===n.get('start')){m=true;return true;}if(l<n.get('end'))return n.get('leaves').some(function(o){var p=o.get('start');if(l===p){m=true;return true;}if(l<p)return false;});});return m;}e.exports=g;},null);