/*!CK:830819558!*//*1417407671,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["8CRvX"]); }

__d("findRangesImmutable",[],function(a,b,c,d,e,f){function g(h,i,j){if(!h.size)return;var k=0;h.reduce(function(l,m,n){if(l!==m){if(i(l))j(k,n);k=n;}return m;});i(h.last())&&j(k,h.count());}e.exports=g;},null);