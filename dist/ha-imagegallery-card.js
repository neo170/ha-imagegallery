var wt=Object.defineProperty;var bt=Object.getOwnPropertyDescriptor;var f=(n,t,e,s)=>{for(var i=s>1?void 0:s?bt(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&wt(t,e,i),i};var j=globalThis,Y=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,q=Symbol(),it=new WeakMap,O=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Y&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=it.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&it.set(e,t))}return t}toString(){return this.cssText}},rt=n=>new O(typeof n=="string"?n:n+"",void 0,q),W=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((s,i,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[r+1],n[0]);return new O(e,n,q)},nt=(n,t)=>{if(Y)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=j.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},K=Y?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return rt(e)})(n):n;var{is:At,defineProperty:St,getOwnPropertyDescriptor:xt,getOwnPropertyNames:Et,getOwnPropertySymbols:Pt,getPrototypeOf:Ct}=Object,y=globalThis,ot=y.trustedTypes,Ot=ot?ot.emptyScript:"",Tt=y.reactiveElementPolyfillSupport,T=(n,t)=>n,k={toAttribute(n,t){switch(t){case Boolean:n=n?Ot:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},X=(n,t)=>!At(n,t),at={attribute:!0,type:String,converter:k,reflect:!1,useDefault:!1,hasChanged:X};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),y.litPropertyMetadata??(y.litPropertyMetadata=new WeakMap);var v=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=at){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&St(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:r}=xt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let h=i?.call(this);r?.call(this,o),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??at}static _$Ei(){if(this.hasOwnProperty(T("elementProperties")))return;let t=Ct(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(T("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(T("properties"))){let e=this.properties,s=[...Et(e),...Pt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(K(i))}else t!==void 0&&e.push(K(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return nt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:k).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let r=s.getPropertyOptions(i),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:k;this._$Em=i;let h=o.fromAttribute(e,r.type);this[i]=h??this._$Ej?.get(i)??h,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(t!==void 0){let o=this.constructor;if(i===!1&&(r=this[t]),s??(s=o.getPropertyOptions(t)),!((s.hasChanged??X)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,r]of s){let{wrapped:o}=r,h=this[i];o!==!0||this._$AL.has(i)||h===void 0||this.C(i,void 0,r,h)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[T("elementProperties")]=new Map,v[T("finalized")]=new Map,Tt?.({ReactiveElement:v}),(y.reactiveElementVersions??(y.reactiveElementVersions=[])).push("2.1.2");var N=globalThis,ht=n=>n,F=N.trustedTypes,ct=F?F.createPolicy("lit-html",{createHTML:n=>n}):void 0,_t="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,gt="?"+$,kt=`<${gt}>`,x=document,U=()=>x.createComment(""),R=n=>n===null||typeof n!="object"&&typeof n!="function",et=Array.isArray,Mt=n=>et(n)||typeof n?.[Symbol.iterator]=="function",V=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,lt=/-->/g,dt=/>/g,A=RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),pt=/'/g,ut=/"/g,mt=/^(?:script|style|textarea|title)$/i,st=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),w=st(1),Ft=st(2),Ht=st(3),E=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),ft=new WeakMap,S=x.createTreeWalker(x,129);function vt(n,t){if(!et(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return ct!==void 0?ct.createHTML(t):t}var Nt=(n,t)=>{let e=n.length-1,s=[],i,r=t===2?"<svg>":t===3?"<math>":"",o=M;for(let h=0;h<e;h++){let a=n[h],c,d,l=-1,_=0;for(;_<a.length&&(o.lastIndex=_,d=o.exec(a),d!==null);)_=o.lastIndex,o===M?d[1]==="!--"?o=lt:d[1]!==void 0?o=dt:d[2]!==void 0?(mt.test(d[2])&&(i=RegExp("</"+d[2],"g")),o=A):d[3]!==void 0&&(o=A):o===A?d[0]===">"?(o=i??M,l=-1):d[1]===void 0?l=-2:(l=o.lastIndex-d[2].length,c=d[1],o=d[3]===void 0?A:d[3]==='"'?ut:pt):o===ut||o===pt?o=A:o===lt||o===dt?o=M:(o=A,i=void 0);let g=o===A&&n[h+1].startsWith("/>")?" ":"";r+=o===M?a+kt:l>=0?(s.push(c),a.slice(0,l)+_t+a.slice(l)+$+g):a+$+(l===-2?h:g)}return[vt(n,r+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},D=class n{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0,h=t.length-1,a=this.parts,[c,d]=Nt(t,e);if(this.el=n.createElement(c,s),S.currentNode=this.el.content,e===2||e===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(i=S.nextNode())!==null&&a.length<h;){if(i.nodeType===1){if(i.hasAttributes())for(let l of i.getAttributeNames())if(l.endsWith(_t)){let _=d[o++],g=i.getAttribute(l).split($),L=/([.?@])?(.*)/.exec(_);a.push({type:1,index:r,name:L[2],strings:g,ctor:L[1]==="."?J:L[1]==="?"?Q:L[1]==="@"?G:C}),i.removeAttribute(l)}else l.startsWith($)&&(a.push({type:6,index:r}),i.removeAttribute(l));if(mt.test(i.tagName)){let l=i.textContent.split($),_=l.length-1;if(_>0){i.textContent=F?F.emptyScript:"";for(let g=0;g<_;g++)i.append(l[g],U()),S.nextNode(),a.push({type:2,index:++r});i.append(l[_],U())}}}else if(i.nodeType===8)if(i.data===gt)a.push({type:2,index:r});else{let l=-1;for(;(l=i.data.indexOf($,l+1))!==-1;)a.push({type:7,index:r}),l+=$.length-1}r++}}static createElement(t,e){let s=x.createElement("template");return s.innerHTML=t,s}};function P(n,t,e=n,s){if(t===E)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,r=R(t)?void 0:t._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(n),i._$AT(n,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=P(n,i._$AS(n,t.values),i,s)),t}var Z=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??x).importNode(e,!0);S.currentNode=i;let r=S.nextNode(),o=0,h=0,a=s[0];for(;a!==void 0;){if(o===a.index){let c;a.type===2?c=new I(r,r.nextSibling,this,t):a.type===1?c=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(c=new tt(r,this,t)),this._$AV.push(c),a=s[++h]}o!==a?.index&&(r=S.nextNode(),o++)}return S.currentNode=x,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},I=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=P(this,t,e),R(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==E&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Mt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(x.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=D.createElement(vt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let r=new Z(i,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(t){let e=ft.get(t.strings);return e===void 0&&ft.set(t.strings,e=new D(t)),e}k(t){et(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let r of t)i===e.length?e.push(s=new n(this.O(U()),this.O(U()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=ht(t).nextSibling;ht(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}_$AI(t,e=this,s,i){let r=this.strings,o=!1;if(r===void 0)t=P(this,t,e,0),o=!R(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else{let h=t,a,c;for(t=r[0],a=0;a<r.length-1;a++)c=P(this,h[s+a],e,a),c===E&&(c=this._$AH[a]),o||(o=!R(c)||c!==this._$AH[a]),c===p?t=p:t!==p&&(t+=(c??"")+r[a+1]),this._$AH[a]=c}o&&!i&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},J=class extends C{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}},Q=class extends C{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}},G=class extends C{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=P(this,t,e,0)??p)===E)return;let s=this._$AH,i=t===p&&s!==p||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==p&&(s===p||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},tt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t)}};var Ut=N.litHtmlPolyfillSupport;Ut?.(D,I),(N.litHtmlVersions??(N.litHtmlVersions=[])).push("3.3.3");var yt=(n,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let r=e?.renderBefore??null;s._$litPart$=i=new I(t.insertBefore(U(),r),r,void 0,e??{})}return i._$AI(n),i};var z=globalThis,b=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=yt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}};b._$litElement$=!0,b.finalized=!0,z.litElementHydrateSupport?.({LitElement:b});var Rt=z.litElementPolyfillSupport;Rt?.({LitElement:b});(z.litElementVersions??(z.litElementVersions=[])).push("4.2.2");var $t=n=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(n,t)}):customElements.define(n,t)};var Dt={attribute:!0,type:String,converter:k,reflect:!1,hasChanged:X},It=(n=Dt,t,e)=>{let{kind:s,metadata:i}=e,r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),s==="setter"&&((n=Object.create(n)).wrapped=!0),r.set(e.name,n),s==="accessor"){let{name:o}=e;return{set(h){let a=t.get.call(this);t.set.call(this,h),this.requestUpdate(o,a,n,!0,h)},init(h){return h!==void 0&&this.C(o,void 0,n,h),h}}}if(s==="setter"){let{name:o}=e;return function(h){let a=this[o];t.call(this,h),this.requestUpdate(o,a,n,!0,h)}}throw Error("Unsupported decorator location: "+s)};function H(n){return(t,e)=>typeof e=="object"?It(n,t,e):((s,i,r)=>{let o=i.hasOwnProperty(r);return i.constructor.createProperty(r,s),o?Object.getOwnPropertyDescriptor(i,r):void 0})(n,t,e)}function m(n){return H({...n,state:!0,attribute:!1})}var u=class extends b{constructor(){super(...arguments);this._images=[];this._index=0;this._loading=!1;this._error="";this._dialogOpen=!1;this._scale=1;this._offsetX=0;this._offsetY=0;this._touchStartX=0;this._touchStartY=0;this._touchStartTime=0;this._activePointers=new Map;this._pinchStartDistance=0;this._pinchStartScale=1;this._pinchStartOffsetX=0;this._pinchStartOffsetY=0;this._pinchStartMidX=0;this._pinchStartMidY=0;this._dragging=!1;this._dragStartPointerX=0;this._dragStartPointerY=0;this._dragStartOffsetX=0;this._dragStartOffsetY=0;this._showPrevious=()=>{this._images.length&&(this._index=(this._index-1+this._images.length)%this._images.length,this._resetZoom())};this._showNext=()=>{this._images.length&&(this._index=(this._index+1)%this._images.length,this._resetZoom())};this._openDialog=()=>{!this._images.length||this._loading||this._error||(this._dialogOpen=!0)};this._closeDialog=()=>{this._dialogOpen=!1,this._activePointers.clear(),this._dragging=!1};this._onViewportKeydown=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._openDialog()),e.key==="ArrowLeft"&&this._showPrevious(),e.key==="ArrowRight"&&this._showNext()};this._onSwipeStart=e=>{let s=e.changedTouches[0];s&&(this._touchStartX=s.clientX,this._touchStartY=s.clientY,this._touchStartTime=Date.now())};this._onSwipeEnd=e=>{let s=e.changedTouches[0];if(!s)return;let i=s.clientX-this._touchStartX,r=s.clientY-this._touchStartY,o=Date.now()-this._touchStartTime;Math.abs(i)>45&&Math.abs(r)<60&&o<600&&(i<0?this._showNext():this._showPrevious())};this._onOverlayPointerDown=e=>{if(e.currentTarget.setPointerCapture(e.pointerId),this._activePointers.set(e.pointerId,{x:e.clientX,y:e.clientY}),this._activePointers.size===2){let[i,r]=Array.from(this._activePointers.values());this._pinchStartDistance=this._distance(i,r),this._pinchStartScale=this._scale,this._pinchStartOffsetX=this._offsetX,this._pinchStartOffsetY=this._offsetY,this._pinchStartMidX=(i.x+r.x)/2,this._pinchStartMidY=(i.y+r.y)/2,this._dragging=!1;return}this._activePointers.size===1&&this._scale>1&&(this._dragging=!0,this._dragStartPointerX=e.clientX,this._dragStartPointerY=e.clientY,this._dragStartOffsetX=this._offsetX,this._dragStartOffsetY=this._offsetY)};this._onOverlayPointerMove=e=>{if(this._activePointers.has(e.pointerId)){if(this._activePointers.set(e.pointerId,{x:e.clientX,y:e.clientY}),this._activePointers.size===2){let[s,i]=Array.from(this._activePointers.values()),r=this._distance(s,i),o=(s.x+i.x)/2,h=(s.y+i.y)/2,a=this._clamp(this._pinchStartScale*(r/this._pinchStartDistance),1,5);this._scale=a;let c=o-this._pinchStartMidX,d=h-this._pinchStartMidY;this._offsetX=this._pinchStartOffsetX+c,this._offsetY=this._pinchStartOffsetY+d;return}this._dragging&&this._activePointers.size===1&&this._scale>1&&(this._offsetX=this._dragStartOffsetX+(e.clientX-this._dragStartPointerX),this._offsetY=this._dragStartOffsetY+(e.clientY-this._dragStartPointerY))}};this._onOverlayPointerUp=e=>{this._activePointers.delete(e.pointerId),this._activePointers.size<2&&(this._pinchStartDistance=0),this._activePointers.size===0&&(this._dragging=!1),this._scale<=1&&(this._offsetX=0,this._offsetY=0)};this._onWheelZoom=e=>{if(!this._dialogOpen)return;e.preventDefault();let i=-e.deltaY>0?1.08:.92;this._scale=this._clamp(this._scale*i,1,5),this._scale<=1.01&&(this._scale=1,this._offsetX=0,this._offsetY=0)};this._onKeyDown=e=>{if(this._dialogOpen){if(e.key==="Escape"){this._closeDialog();return}if(e.key==="ArrowLeft"){this._showPrevious();return}e.key==="ArrowRight"&&this._showNext()}};this._resetZoom=()=>{this._scale=1,this._offsetX=0,this._offsetY=0,this._activePointers.clear(),this._dragging=!1}}setConfig(e){if(!e)throw new Error("Missing config");if(e.type!=="custom:ha-imagegallery-card")throw new Error("Invalid card type. Use custom:ha-imagegallery-card");this._config={folder:"/local/snapshots",refresh_interval:15,sort:"newest_first",...e},this._index=0,this._loadImages(),this._restartRefreshTimer()}connectedCallback(){super.connectedCallback(),this._config&&this._restartRefreshTimer(),window.addEventListener("keydown",this._onKeyDown)}disconnectedCallback(){super.disconnectedCallback(),this._clearRefreshTimer(),window.removeEventListener("keydown",this._onKeyDown)}willUpdate(e){e.has("_dialogOpen")&&!this._dialogOpen&&this._resetZoom()}render(){if(!this._config)return w`<ha-card><div class="center">Ungultige Kartenkonfiguration</div></ha-card>`;let e=this._config.title??"Image Gallery";return w`
      <ha-card>
        <div class="title">${e}</div>

        <div
          class="viewport"
          @touchstart=${this._onSwipeStart}
          @touchend=${this._onSwipeEnd}
          @click=${this._openDialog}
          role="button"
          tabindex="0"
          @keydown=${this._onViewportKeydown}
        >
          ${this._renderMainContent()}
        </div>

        <div class="caption">
          <div>${this._images.length?this._getFileName(this._images[this._index]):"-"}</div>
          <div class="controls">
            <button @click=${this._showPrevious} title="Vorheriges Bild" aria-label="Vorheriges Bild">&#8592;</button>
            <button @click=${this._showNext} title="Nächstes Bild" aria-label="Nächstes Bild">&#8594;</button>
          </div>
        </div>
      </ha-card>

      ${this._dialogOpen?this._renderDialog():""}
    `}_renderMainContent(){return this._loading?w`<div class="center">Bilder werden geladen...</div>`:this._error?w`<div class="center">${this._error}</div>`:this._images.length?w`<img src=${this._images[this._index]} alt="Gallery image" loading="lazy" />`:w`<div class="center">Keine Bilder gefunden</div>`}_renderDialog(){let e=this._images[this._index],s=`--s:${this._scale};--x:${this._offsetX}px;--y:${this._offsetY}px;`;return w`
      <div class="overlay" @wheel=${this._onWheelZoom}>
        <div class="overlay-top">
          <button class="close" @click=${this._closeDialog} aria-label="Schliessen">SCHLIESSEN</button>
          <div>${this._getFileName(e)}</div>
        </div>

        <div
          class="overlay-stage"
          @pointerdown=${this._onOverlayPointerDown}
          @pointermove=${this._onOverlayPointerMove}
          @pointerup=${this._onOverlayPointerUp}
          @pointercancel=${this._onOverlayPointerUp}
          @dblclick=${this._resetZoom}
        >
          <img src=${e} alt="Fullscreen image" style=${s} draggable="false" />
        </div>

        <div class="overlay-bottom">
          <button class="nav" @click=${this._showPrevious} aria-label="Vorheriges Bild">&#8592;</button>
          <div>${this._index+1} / ${this._images.length}</div>
          <button class="nav" @click=${this._showNext} aria-label="Nächstes Bild">&#8594;</button>
        </div>
      </div>
    `}async _loadImages(){if(this._config){this._loading=!0,this._error="";try{let e=(this._config.images??[]).filter(a=>a&&a.trim().length>0),s=[];if(e.length>0)s=e.map(a=>this._normalizeImageUrl(a));else{let a=this._config.folder??"/local/snapshots",c=await this._fetchImagesFromIntegration(a);if(c.success)s=c.images,s.length||(this._error="Keine Bilder im ueberwachten Snapshot-Ordner gefunden.");else{let d=await this._discoverImagesFromFolder(a);s=d.images,!s.length&&d.reason&&(this._error=d.reason)}}let i=this._sortImages(s),r=this._images,o=r[this._index],h=r[0];if(this._images=i,!this._images.length)this._index=0;else if(h!==this._images[0])this._index=0;else if(o){let c=this._images.indexOf(o);this._index=c>=0?c:0}else this._index>=this._images.length&&(this._index=Math.max(0,this._images.length-1))}catch(e){let s=e instanceof Error?e.message:"Unbekannter Fehler";this._error=`Bilder konnten nicht geladen werden: ${s}`,this._images=[]}finally{this._loading=!1}}}async _fetchImagesFromIntegration(e){let s=this._normalizeFolder(e),i=`ha_imagegallery/images?folder=${encodeURIComponent(s)}`;try{let r=this.hass?.callApi?await this.hass.callApi("GET",i):await(await fetch(`/api/${i}`,{cache:"no-store"})).json();if(!r||typeof r!="object")return{images:[],success:!1};let o=r.images;return Array.isArray(o)?{images:o.filter(a=>typeof a=="string").map(a=>this._normalizeImageUrl(a)).filter(a=>this._isImagePath(a)),success:!0}:{images:[],success:!0}}catch{return{images:[],success:!1}}}async _discoverImagesFromFolder(e){let s=this._normalizeFolder(e),i=await this._fetchIndexJson(s);if(i.length>0)return{images:i};let r=await this._fetchDirectoryListing(s);return r.length>0?{images:r}:{images:[],reason:`Keine Bilder gefunden unter ${s}. Pruefe ${s}/index.json (HTTP 200) oder setze images: [] direkt in der Karten-Konfiguration.`}}async _fetchIndexJson(e){let s=`${e}/index.json`;try{let i=await fetch(s,{cache:"no-store"});if(!i.ok)return[];let r=await i.json();return(Array.isArray(r)?r:typeof r=="object"&&r&&Array.isArray(r.images)?r.images:[]).filter(a=>typeof a=="string").filter(a=>this._isImagePath(a)).map(a=>this._resolveFolderEntry(e,a))}catch{return[]}}async _fetchDirectoryListing(e){try{let s=await fetch(`${e}/`,{cache:"no-store"});if(!s.ok)return[];let i=await s.text(),o=new DOMParser().parseFromString(i,"text/html");return Array.from(o.querySelectorAll("a")).map(c=>c.getAttribute("href")??"").filter(c=>c.length>0&&!c.startsWith("../")).filter(c=>this._isImagePath(c)).map(c=>this._resolveFolderEntry(e,c))}catch{return[]}}_isImagePath(e){let s=e.toLowerCase();return[".jpg",".jpeg",".png",".webp",".gif",".bmp"].some(i=>s.endsWith(i))}_normalizeFolder(e){let r=`/${e.trim().replace(/\\/g,"/").replace(/^\/+/,"").replace(/^config\/www\//,"local/").replace(/^www\//,"local/").replace(/^local\//,"local/")}`;return r.endsWith("/")?r.slice(0,-1):r}_normalizeImageUrl(e){let s=e.trim().replace(/\\/g,"/"),i=s.replace(/^\/+/,""),r=s;return/^config\/www\//.test(i)?r=`/${i.replace(/^config\/www\//,"local/")}`:/^www\//.test(i)?r=`/${i.replace(/^www\//,"local/")}`:/^local\//.test(i)&&(r=`/${i}`),r.replace(/\s/g,"%20")}_sortImages(e){let s=Array.from(new Set(e)),i=this._config?.sort??"newest_first";if(i==="none")return s;let r=i==="oldest_first"?1:-1;return[...s].sort((o,h)=>{let a=this._extractTimestampFromPath(o),c=this._extractTimestampFromPath(h);return a!==void 0&&c!==void 0&&a!==c?(a-c)*r:o.localeCompare(h,void 0,{numeric:!0,sensitivity:"base"})*r})}_extractTimestampFromPath(e){let s=decodeURIComponent((e.split("?")[0]??e).toLowerCase()),i=s.split("/").pop()??s,r=i.match(/(^|\D)(\d{10,13})(\D|$)/);if(r?.[2]){let h=Number(r[2]);if(Number.isFinite(h))return r[2].length===13?h:h*1e3}let o=i.match(/(\d{4})[-_]?([01]\d)[-_]?([0-3]\d)[t _-]?([0-2]\d)?[:_-]?([0-5]\d)?[:_-]?([0-5]\d)?/i);if(o){let h=Number(o[1]),a=Number(o[2]),c=Number(o[3]),d=Number(o[4]??"0"),l=Number(o[5]??"0"),_=Number(o[6]??"0"),g=new Date(h,a-1,c,d,l,_).getTime();if(!Number.isNaN(g))return g}}_resolveFolderEntry(e,s){let i=s.trim();return i.startsWith("http://")||i.startsWith("https://")||i.startsWith("/")?this._normalizeImageUrl(i):this._normalizeImageUrl(`${e}/${i.replace(/^\.\//,"")}`)}_distance(e,s){let i=e.x-s.x,r=e.y-s.y;return Math.sqrt(i*i+r*r)}_clamp(e,s,i){return Math.max(s,Math.min(i,e))}_getFileName(e){let i=(e.split("?")[0]??e).split("/");return decodeURIComponent(i[i.length-1]??e)}_restartRefreshTimer(){this._clearRefreshTimer();let e=this._config?.refresh_interval??15;!e||e<5||(this._refreshTimer=window.setInterval(()=>{this._loadImages()},e*1e3))}_clearRefreshTimer(){this._refreshTimer&&(window.clearInterval(this._refreshTimer),this._refreshTimer=void 0)}getCardSize(){return 4}};u.styles=W`
    :host {
      display: block;
    }

    ha-card {
      overflow: hidden;
      border-radius: 16px;
      background: linear-gradient(160deg, #10253d, #0e1f2f 45%, #123a3a);
      color: #f3f7fb;
      position: relative;
    }

    .title {
      font-size: 1.05rem;
      font-weight: 650;
      letter-spacing: 0.02em;
      padding: 14px 16px 0;
    }

    .viewport {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 10;
      margin-top: 8px;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.04);
      touch-action: pan-y;
      cursor: pointer;
      user-select: none;
    }

    .viewport img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
      background: rgba(0, 0, 0, 0.14);
    }

    .caption {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px 12px;
      font-size: 0.88rem;
      color: #d5e3f0;
      gap: 8px;
    }

    .controls {
      display: flex;
      gap: 8px;
    }

    button {
      border: 1px solid rgba(255, 255, 255, 0.25);
      background: rgba(255, 255, 255, 0.1);
      color: inherit;
      border-radius: 999px;
      width: 34px;
      height: 34px;
      cursor: pointer;
      font-size: 0.95rem;
    }

    button:focus-visible {
      outline: 2px solid #7fdae8;
      outline-offset: 2px;
    }

    .center {
      display: grid;
      place-items: center;
      height: 100%;
      text-align: center;
      color: #d6e8f7;
      padding: 16px;
      font-size: 0.95rem;
    }

    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(5, 11, 18, 0.95);
      z-index: 12000;
      display: grid;
      grid-template-rows: auto 1fr auto;
      touch-action: none;
    }

    .overlay-top,
    .overlay-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      color: #ebf1f8;
      gap: 10px;
    }

    .overlay-stage {
      position: relative;
      overflow: hidden;
      display: grid;
      place-items: center;
      touch-action: none;
    }

    .overlay-stage img {
      max-width: 100%;
      max-height: 100%;
      transform: translate(var(--x), var(--y)) scale(var(--s));
      transform-origin: center center;
      will-change: transform;
      user-select: none;
      pointer-events: none;
    }

    .overlay .nav {
      width: 40px;
      height: 40px;
      font-size: 1.1rem;
    }

    .close {
      width: auto;
      border-radius: 10px;
      padding: 0 12px;
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 0.03em;
    }

    @media (max-width: 650px) {
      .viewport {
        aspect-ratio: 4 / 3;
      }

      .caption {
        font-size: 0.82rem;
      }
    }
  `,f([H({attribute:!1})],u.prototype,"hass",2),f([m()],u.prototype,"_config",2),f([m()],u.prototype,"_images",2),f([m()],u.prototype,"_index",2),f([m()],u.prototype,"_loading",2),f([m()],u.prototype,"_error",2),f([m()],u.prototype,"_dialogOpen",2),f([m()],u.prototype,"_scale",2),f([m()],u.prototype,"_offsetX",2),f([m()],u.prototype,"_offsetY",2),u=f([$t("ha-imagegallery-card")],u);window.customCards=window.customCards||[];window.customCards.push({type:"ha-imagegallery-card",name:"HA Image Gallery",description:"Swipe through images and open fullscreen with pinch-to-zoom preview"});export{u as HaImageGalleryCard};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
