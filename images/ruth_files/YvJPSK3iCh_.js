/*!CK:3905679365!*//*1417407981,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["ZWubd"]); }

__d("ComposerXAttachmentPrefillMixin",["Event"],function(a,b,c,d,e,f,g){var h={_initPrefill:function(i,j){this._textArea=i;this._didInitialFocus=false;this._prefill=j;if(this._prefill)this._focusListener=g.listen(this._textArea,'focus',this._prefillOnFocus.bind(this));},_resetPrefill:function(){this._didInitialFocus=false;},_prefillOnFocus:function(){if(!this._didInitialFocus&&this._prefill&&this._textArea.value==='')this._textArea.value=this._prefill;this._didInitialFocus=true;}};e.exports=h;},null);