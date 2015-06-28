/*!CK:3490160706!*//*1417407671,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["7iHah"]); }

__d("DocumentEntitySegmentsExperimental",["DocumentRemovalDirection"],function(a,b,c,d,e,f,g){var h=g.FORWARD,i={getRemovalRange:function(j,k,l,m,n){var o=l.split(' ');o=o.map(function(y,z){if(n===h){if(z>0)return ' '+y;}else if(z<o.length-1)return y+' ';return y;});var p=m,q,r,s=null,t=null;for(var u=0;u<o.length;u++){r=o[u];q=p+r.length;if(j<q&&p<k){if(s!==null){t=q;}else{s=p;t=q;}}else if(s!==null)break;p=q;}var v=m+l.length,w=s===m,x=t===v;if((!w&&x)||(w&&!x))if(n===h){if(t!==v)t++;}else if(s!==m)s--;return {start:s,end:t};}};e.exports=i;},null);