var $t=Object.defineProperty;var bt=Object.getOwnPropertyDescriptor;var u=(a,e,t,i)=>{for(var s=i>1?void 0:i?bt(e,t):e,r=a.length-1,n;r>=0;r--)(n=a[r])&&(s=(i?n(e,t,s):n(s))||s);return i&&s&&$t(e,t,s),s};var F=globalThis,B=F.ShadowRoot&&(F.ShadyCSS===void 0||F.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K=Symbol(),nt=new WeakMap,I=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==K)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(B&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=nt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&nt.set(t,e))}return e}toString(){return this.cssText}},at=a=>new I(typeof a=="string"?a:a+"",void 0,K),j=(a,...e)=>{let t=a.length===1?a[0]:e.reduce((i,s,r)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+a[r+1],a[0]);return new I(t,a,K)},ot=(a,e)=>{if(B)a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),s=F.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,a.appendChild(i)}},V=B?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return at(t)})(a):a;var{is:xt,defineProperty:At,getOwnPropertyDescriptor:Et,getOwnPropertyNames:Tt,getOwnPropertySymbols:Pt,getPrototypeOf:Ct}=Object,S=globalThis,ht=S.trustedTypes,It=ht?ht.emptyScript:"",Dt=S.reactiveElementPolyfillSupport,D=(a,e)=>a,M={toAttribute(a,e){switch(e){case Boolean:a=a?It:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},H=(a,e)=>!xt(a,e),lt={attribute:!0,type:String,converter:M,reflect:!1,useDefault:!1,hasChanged:H};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),S.litPropertyMetadata??(S.litPropertyMetadata=new WeakMap);var v=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=lt){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&At(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){let{get:s,set:r}=Et(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:s,set(n){let h=s?.call(this);r?.call(this,n),this.requestUpdate(e,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??lt}static _$Ei(){if(this.hasOwnProperty(D("elementProperties")))return;let e=Ct(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(D("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(D("properties"))){let t=this.properties,i=[...Tt(t),...Pt(t)];for(let s of i)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)t.unshift(V(s))}else e!==void 0&&t.push(V(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ot(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){let r=(i.converter?.toAttribute!==void 0?i.converter:M).toAttribute(t,i.type);this._$Em=e,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(e,t){let i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let r=i.getPropertyOptions(s),n=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:M;this._$Em=s;let h=n.fromAttribute(t,r.type);this[s]=h??this._$Ej?.get(s)??h,this._$Em=null}}requestUpdate(e,t,i,s=!1,r){if(e!==void 0){let n=this.constructor;if(s===!1&&(r=this[e]),i??(i=n.getPropertyOptions(e)),!((i.hasChanged??H)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??t??this[e]),r!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,r]of i){let{wrapped:n}=r,h=this[s];n!==!0||this._$AL.has(s)||h===void 0||this.C(s,void 0,r,h)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[D("elementProperties")]=new Map,v[D("finalized")]=new Map,Dt?.({ReactiveElement:v}),(S.reactiveElementVersions??(S.reactiveElementVersions=[])).push("2.1.2");var X=globalThis,ct=a=>a,q=X.trustedTypes,pt=q?q.createPolicy("lit-html",{createHTML:a=>a}):void 0,mt="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,vt="?"+$,Mt=`<${vt}>`,A=document,k=()=>A.createComment(""),U=a=>a===null||typeof a!="object"&&typeof a!="function",it=Array.isArray,Ot=a=>it(a)||typeof a?.[Symbol.iterator]=="function",Z=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,dt=/-->/g,_t=/>/g,b=RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ut=/'/g,gt=/"/g,yt=/^(?:script|style|textarea|title)$/i,st=a=>(e,...t)=>({_$litType$:a,strings:e,values:t}),y=st(1),jt=st(2),Ht=st(3),E=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),ft=new WeakMap,x=A.createTreeWalker(A,129);function wt(a,e){if(!it(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return pt!==void 0?pt.createHTML(e):e}var Xt=(a,e)=>{let t=a.length-1,i=[],s,r=e===2?"<svg>":e===3?"<math>":"",n=O;for(let h=0;h<t;h++){let o=a[h],l,p,c=-1,_=0;for(;_<o.length&&(n.lastIndex=_,p=n.exec(o),p!==null);)_=n.lastIndex,n===O?p[1]==="!--"?n=dt:p[1]!==void 0?n=_t:p[2]!==void 0?(yt.test(p[2])&&(s=RegExp("</"+p[2],"g")),n=b):p[3]!==void 0&&(n=b):n===b?p[0]===">"?(n=s??O,c=-1):p[1]===void 0?c=-2:(c=n.lastIndex-p[2].length,l=p[1],n=p[3]===void 0?b:p[3]==='"'?gt:ut):n===gt||n===ut?n=b:n===dt||n===_t?n=O:(n=b,s=void 0);let f=n===b&&a[h+1].startsWith("/>")?" ":"";r+=n===O?o+Mt:c>=0?(i.push(l),o.slice(0,c)+mt+o.slice(c)+$+f):o+$+(c===-2?h:f)}return[wt(a,r+(a[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},N=class a{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let r=0,n=0,h=e.length-1,o=this.parts,[l,p]=Xt(e,t);if(this.el=a.createElement(l,i),x.currentNode=this.el.content,t===2||t===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=x.nextNode())!==null&&o.length<h;){if(s.nodeType===1){if(s.hasAttributes())for(let c of s.getAttributeNames())if(c.endsWith(mt)){let _=p[n++],f=s.getAttribute(c).split($),L=/([.?@])?(.*)/.exec(_);o.push({type:1,index:r,name:L[2],strings:f,ctor:L[1]==="."?Q:L[1]==="?"?G:L[1]==="@"?tt:C}),s.removeAttribute(c)}else c.startsWith($)&&(o.push({type:6,index:r}),s.removeAttribute(c));if(yt.test(s.tagName)){let c=s.textContent.split($),_=c.length-1;if(_>0){s.textContent=q?q.emptyScript:"";for(let f=0;f<_;f++)s.append(c[f],k()),x.nextNode(),o.push({type:2,index:++r});s.append(c[_],k())}}}else if(s.nodeType===8)if(s.data===vt)o.push({type:2,index:r});else{let c=-1;for(;(c=s.data.indexOf($,c+1))!==-1;)o.push({type:7,index:r}),c+=$.length-1}r++}}static createElement(e,t){let i=A.createElement("template");return i.innerHTML=e,i}};function P(a,e,t=a,i){if(e===E)return e;let s=i!==void 0?t._$Co?.[i]:t._$Cl,r=U(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(a),s._$AT(a,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=s:t._$Cl=s),s!==void 0&&(e=P(a,s._$AS(a,e.values),s,i)),e}var J=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??A).importNode(t,!0);x.currentNode=s;let r=x.nextNode(),n=0,h=0,o=i[0];for(;o!==void 0;){if(n===o.index){let l;o.type===2?l=new R(r,r.nextSibling,this,e):o.type===1?l=new o.ctor(r,o.name,o.strings,this,e):o.type===6&&(l=new et(r,this,e)),this._$AV.push(l),o=i[++h]}n!==o?.index&&(r=x.nextNode(),n++)}return x.currentNode=A,s}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},R=class a{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=P(this,e,t),U(e)?e===d||e==null||e===""?(this._$AH!==d&&this._$AR(),this._$AH=d):e!==this._$AH&&e!==E&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ot(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==d&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(A.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=N.createElement(wt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{let r=new J(s,this),n=r.u(this.options);r.p(t),this.T(n),this._$AH=r}}_$AC(e){let t=ft.get(e.strings);return t===void 0&&ft.set(e.strings,t=new N(e)),t}k(e){it(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,s=0;for(let r of e)s===t.length?t.push(i=new a(this.O(k()),this.O(k()),this,this.options)):i=t[s],i._$AI(r),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=ct(e).nextSibling;ct(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,r){this.type=1,this._$AH=d,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(e,t=this,i,s){let r=this.strings,n=!1;if(r===void 0)e=P(this,e,t,0),n=!U(e)||e!==this._$AH&&e!==E,n&&(this._$AH=e);else{let h=e,o,l;for(e=r[0],o=0;o<r.length-1;o++)l=P(this,h[i+o],t,o),l===E&&(l=this._$AH[o]),n||(n=!U(l)||l!==this._$AH[o]),l===d?e=d:e!==d&&(e+=(l??"")+r[o+1]),this._$AH[o]=l}n&&!s&&this.j(e)}j(e){e===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Q=class extends C{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===d?void 0:e}},G=class extends C{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==d)}},tt=class extends C{constructor(e,t,i,s,r){super(e,t,i,s,r),this.type=5}_$AI(e,t=this){if((e=P(this,e,t,0)??d)===E)return;let i=this._$AH,s=e===d&&i!==d||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==d&&(i===d||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},et=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){P(this,e)}};var kt=X.litHtmlPolyfillSupport;kt?.(N,R),(X.litHtmlVersions??(X.litHtmlVersions=[])).push("3.3.3");var St=(a,e,t)=>{let i=t?.renderBefore??e,s=i._$litPart$;if(s===void 0){let r=t?.renderBefore??null;i._$litPart$=s=new R(e.insertBefore(k(),r),r,void 0,t??{})}return s._$AI(a),s};var Y=globalThis,w=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;let e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=St(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}};w._$litElement$=!0,w.finalized=!0,Y.litElementHydrateSupport?.({LitElement:w});var Ut=Y.litElementPolyfillSupport;Ut?.({LitElement:w});(Y.litElementVersions??(Y.litElementVersions=[])).push("4.2.2");var rt=a=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(a,e)}):customElements.define(a,e)};var Nt={attribute:!0,type:String,converter:M,reflect:!1,hasChanged:H},Rt=(a=Nt,e,t)=>{let{kind:i,metadata:s}=t,r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),i==="setter"&&((a=Object.create(a)).wrapped=!0),r.set(t.name,a),i==="accessor"){let{name:n}=t;return{set(h){let o=e.get.call(this);e.set.call(this,h),this.requestUpdate(n,o,a,!0,h)},init(h){return h!==void 0&&this.C(n,void 0,a,h),h}}}if(i==="setter"){let{name:n}=t;return function(h){let o=this[n];e.call(this,h),this.requestUpdate(n,o,a,!0,h)}}throw Error("Unsupported decorator location: "+i)};function z(a){return(e,t)=>typeof t=="object"?Rt(a,e,t):((i,s,r)=>{let n=s.hasOwnProperty(r);return s.constructor.createProperty(r,i),n?Object.getOwnPropertyDescriptor(s,r):void 0})(a,e,t)}function m(a){return z({...a,state:!0,attribute:!1})}var g=class extends w{constructor(){super(...arguments);this._images=[];this._index=0;this._loading=!1;this._error="";this._dialogOpen=!1;this._scale=1;this._offsetX=0;this._offsetY=0;this._touchStartX=0;this._touchStartY=0;this._touchStartTime=0;this._activePointers=new Map;this._pinchStartDistance=0;this._pinchStartScale=1;this._pinchStartOffsetX=0;this._pinchStartOffsetY=0;this._pinchStartMidX=0;this._pinchStartMidY=0;this._dragging=!1;this._dragStartPointerX=0;this._dragStartPointerY=0;this._dragStartOffsetX=0;this._dragStartOffsetY=0;this._isAnimating=!1;this._swipeDirection=null;this._cardSwipeStartX=0;this._cardSwipeStartY=0;this._cardSwipeStartTime=0;this._cardSwipeDeltaX=0;this._cardIsSwiping=!1;this._cardSwipeAnimating=!1;this._cardSuppressOpenUntil=0;this._overlaySwipeStartX=0;this._overlaySwipeDeltaX=0;this._overlayIsSwiping=!1;this._overlaySwipeAnimating=!1;this._lastTapTime=0;this._lastTapX=0;this._lastTapY=0;this._tapStartX=0;this._tapStartY=0;this._tapCandidate=!1;this._lastTouchTapTime=0;this._lastTouchTapX=0;this._lastTouchTapY=0;this._showPrevious=()=>{this._images.length&&(this._index=(this._index-1+this._images.length)%this._images.length,this._resetZoom())};this._showNext=()=>{this._images.length&&(this._index=(this._index+1)%this._images.length,this._resetZoom())};this._openDialog=()=>{!this._images.length||this._loading||this._error||(this._dialogOpen=!0)};this._onViewportClick=t=>{if(Date.now()<this._cardSuppressOpenUntil||this._cardIsSwiping||this._cardSwipeAnimating){t.preventDefault(),t.stopPropagation();return}this._openDialog()};this._animateSwipe=t=>{this.requestUpdate(),setTimeout(()=>{t==="left"?this._showNext():this._showPrevious(),this._isAnimating=!1,this._swipeDirection=null,this.requestUpdate()},400)};this._stopEvent=t=>{t.stopPropagation()};this._showPreviousFromButton=t=>{t.stopPropagation(),this._showPrevious()};this._showNextFromButton=t=>{t.stopPropagation(),this._showNext()};this._closeDialog=()=>{this._dialogOpen=!1,this._activePointers.clear(),this._dragging=!1,this._overlaySwipeIsIdle()};this._closeDialogFromTouch=t=>{t.preventDefault(),t.stopPropagation(),this._closeDialog()};this._onViewportKeydown=t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this._openDialog()),t.key==="ArrowLeft"&&this._showPrevious(),t.key==="ArrowRight"&&this._showNext()};this._onCardSwipeStart=t=>{if(this._cardSwipeAnimating)return;let i=t.changedTouches[0];i&&(this._cardSwipeStartX=i.clientX,this._cardSwipeStartY=i.clientY,this._cardSwipeStartTime=Date.now(),this._cardSwipeDeltaX=0,this._cardIsSwiping=!1)};this._onCardSwipeMove=t=>{if(this._cardSwipeAnimating)return;let i=t.changedTouches[0];if(!i)return;let s=i.clientX-this._cardSwipeStartX,r=i.clientY-this._cardSwipeStartY;Math.abs(s)>8&&Math.abs(s)>Math.abs(r)&&(this._cardIsSwiping=!0,this._cardSwipeDeltaX=s,t.preventDefault())};this._onCardSwipeEnd=t=>{let i=t.changedTouches[0];if(!i||this._cardSwipeAnimating)return;let s=i.clientX-this._cardSwipeStartX,r=i.clientY-this._cardSwipeStartY,n=Date.now()-this._cardSwipeStartTime,h=t.currentTarget,o=h.clientWidth+10,l=Math.abs(s)>Math.max(42,h.clientWidth*.17),p=n<280&&Math.abs(s)>28&&Math.abs(s)>Math.abs(r);if(this._cardIsSwiping&&(l||p)){let c=s<0?"next":"prev",_=c==="next"?-o:o;this._cardSuppressOpenUntil=Date.now()+300,this._animateCardSwipeTo(_,c);return}this._cardIsSwiping=!1,this._cardSwipeDeltaX=0};this._animateCardSwipeTo=(t,i)=>{this._cardSwipeAnimating=!0,this._cardIsSwiping=!1,this._cardSwipeDeltaX=t,this.requestUpdate(),window.setTimeout(()=>{if(!this._images.length){this._cardSwipeAnimating=!1,this._cardSwipeDeltaX=0;return}i==="next"?this._index=(this._index+1)%this._images.length:this._index=(this._index-1+this._images.length)%this._images.length,this._cardSwipeAnimating=!1,this._cardSwipeDeltaX=0,this.requestUpdate()},220)};this._onOverlayPointerDown=t=>{if(t.pointerType==="touch"||this._overlaySwipeAnimating)return;if(t.currentTarget.setPointerCapture(t.pointerId),this._activePointers.set(t.pointerId,{x:t.clientX,y:t.clientY}),this._tapStartX=t.clientX,this._tapStartY=t.clientY,this._tapCandidate=this._activePointers.size===1,this._activePointers.size===2){let[s,r]=Array.from(this._activePointers.values());this._pinchStartDistance=this._distance(s,r),this._pinchStartScale=this._scale,this._pinchStartOffsetX=this._offsetX,this._pinchStartOffsetY=this._offsetY,this._pinchStartMidX=(s.x+r.x)/2,this._pinchStartMidY=(s.y+r.y)/2,this._dragging=!1;return}this._activePointers.size===1&&(this._scale>1?(this._dragging=!0,this._dragStartPointerX=t.clientX,this._dragStartPointerY=t.clientY,this._dragStartOffsetX=this._offsetX,this._dragStartOffsetY=this._offsetY):(this._overlaySwipeStartX=t.clientX,this._overlaySwipeDeltaX=0,this._overlayIsSwiping=!1))};this._onOverlayPointerMove=t=>{if(t.pointerType!=="touch"&&!this._overlaySwipeAnimating&&this._activePointers.has(t.pointerId)){if(this._activePointers.set(t.pointerId,{x:t.clientX,y:t.clientY}),this._activePointers.size===2){let[i,s]=Array.from(this._activePointers.values()),r=this._distance(i,s),n=(i.x+s.x)/2,h=(i.y+s.y)/2,o=this._clamp(this._pinchStartScale*(r/this._pinchStartDistance),1,5);this._scale=o;let l=n-this._pinchStartMidX,p=h-this._pinchStartMidY;this._offsetX=this._pinchStartOffsetX+l,this._offsetY=this._pinchStartOffsetY+p;return}this._dragging&&this._activePointers.size===1&&this._scale>1?(this._offsetX=this._dragStartOffsetX+(t.clientX-this._dragStartPointerX),this._offsetY=this._dragStartOffsetY+(t.clientY-this._dragStartPointerY)):this._activePointers.size===1&&this._scale<=1&&(this._overlaySwipeDeltaX=t.clientX-this._overlaySwipeStartX,Math.abs(this._overlaySwipeDeltaX)>8&&(this._overlayIsSwiping=!0),(Math.abs(t.clientX-this._tapStartX)>10||Math.abs(t.clientY-this._tapStartY)>10)&&(this._tapCandidate=!1),this._offsetX=0,this._offsetY=0)}};this._onOverlayPointerUp=t=>{if(t.pointerType!=="touch"){if(this._activePointers.delete(t.pointerId),this._activePointers.size<2&&(this._pinchStartDistance=0),this._activePointers.size===0){this._dragging=!1;let i=this._overlayIsSwiping;if(this._overlayIsSwiping=!1,this._scale<=1&&Math.abs(this._overlaySwipeDeltaX)>60){let r=t.currentTarget.clientWidth+16,n=this._overlaySwipeDeltaX<0?"next":"prev",h=n==="next"?-r:r;this._animateOverlaySwipeTo(h,n);return}!i&&this._tapCandidate&&this._handlePointerDoubleTap(t.clientX,t.clientY,t),this._overlaySwipeDeltaX=0,this._tapCandidate=!1}this._scale<=1&&(this._offsetX=0,this._offsetY=0)}};this._onOverlayTouchStart=t=>{if(this._overlaySwipeAnimating||this._scale>1||t.touches.length!==1)return;let i=t.touches[0];i&&(this._overlaySwipeStartX=i.clientX,this._overlaySwipeDeltaX=0,this._overlayIsSwiping=!1)};this._onOverlayTouchMove=t=>{if(this._overlaySwipeAnimating||this._scale>1||t.touches.length!==1)return;let i=t.touches[0];i&&(this._overlaySwipeDeltaX=i.clientX-this._overlaySwipeStartX,Math.abs(this._overlaySwipeDeltaX)>8&&(this._overlayIsSwiping=!0,t.preventDefault()))};this._onOverlayTouchEnd=t=>{let i=t.changedTouches[0];if(!i)return;if(this._scale<=1&&Math.abs(this._overlaySwipeDeltaX)>60){let l=t.currentTarget.clientWidth+16,p=this._overlaySwipeDeltaX<0?"next":"prev",c=p==="next"?-l:l;this._overlayIsSwiping=!1,this._animateOverlaySwipeTo(c,p);return}this._overlayIsSwiping=!1,this._overlaySwipeDeltaX=0;let s=Date.now(),r=s-this._lastTouchTapTime,n=Math.abs(i.clientX-this._lastTouchTapX),h=Math.abs(i.clientY-this._lastTouchTapY);r>0&&r<320&&n<24&&h<24?(t.preventDefault(),this._onImageDoubleTap(t),this._lastTouchTapTime=0):(this._lastTouchTapTime=s,this._lastTouchTapX=i.clientX,this._lastTouchTapY=i.clientY)};this._animateOverlaySwipeTo=(t,i)=>{this._overlaySwipeAnimating||(this._overlaySwipeAnimating=!0,this._overlayIsSwiping=!1,this._overlaySwipeDeltaX=t,this.requestUpdate(),window.setTimeout(()=>{if(!this._images.length){this._overlaySwipeIsIdle();return}i==="next"?this._index=(this._index+1)%this._images.length:this._index=(this._index-1+this._images.length)%this._images.length,this._overlaySwipeIsIdle(),this.requestUpdate()},220))};this._overlaySwipeIsIdle=()=>{this._overlaySwipeAnimating=!1,this._overlayIsSwiping=!1,this._overlaySwipeDeltaX=0};this._handlePointerDoubleTap=(t,i,s)=>{let r=Date.now(),n=r-this._lastTapTime,h=Math.abs(t-this._lastTapX),o=Math.abs(i-this._lastTapY);n>0&&n<320&&h<24&&o<24?(this._onImageDoubleTap(s),this._lastTapTime=0):(this._lastTapTime=r,this._lastTapX=t,this._lastTapY=i)};this._onWheelZoom=t=>{if(!this._dialogOpen)return;t.preventDefault();let s=-t.deltaY>0?1.08:.92;this._scale=this._clamp(this._scale*s,1,5),this._scale<=1.01&&(this._scale=1,this._offsetX=0,this._offsetY=0)};this._onKeyDown=t=>{if(this._dialogOpen){if(t.key==="Escape"){this._closeDialog();return}if(t.key==="ArrowLeft"){this._showPrevious();return}t.key==="ArrowRight"&&this._showNext()}};this._onImageDoubleTap=t=>{t?.stopPropagation(),this._scale>1&&this._resetZoom()};this._resetZoom=()=>{this._scale=1,this._offsetX=0,this._offsetY=0,this._activePointers.clear(),this._dragging=!1,this.requestUpdate()}}static getStubConfig(){return{type:"custom:ha-imagegallery-card",entity:"camera.latest_snapshot",title:"Kamera Snapshots",sort:"newest_first"}}static async getConfigElement(){return document.createElement("ha-imagegallery-card-editor")}setConfig(t){if(!t)throw new Error("Missing config");if(t.type!=="custom:ha-imagegallery-card")throw new Error("Invalid card type. Use custom:ha-imagegallery-card");this._config={entity:"camera.latest_snapshot",folder:"/local/snapshots",refresh_interval:15,sort:"newest_first",...t},this._index=0,this._loadImages(),this._restartRefreshTimer()}connectedCallback(){super.connectedCallback(),this._config&&this._restartRefreshTimer(),window.addEventListener("keydown",this._onKeyDown)}disconnectedCallback(){super.disconnectedCallback(),this._clearRefreshTimer(),window.removeEventListener("keydown",this._onKeyDown)}willUpdate(t){t.has("_dialogOpen")&&!this._dialogOpen&&this._resetZoom()}updated(t){t.has("hass")&&this._getEntityId()&&this._loadImagesFromEntity()}render(){if(!this._config)return y`<ha-card><div class="center">Ungultige Kartenkonfiguration</div></ha-card>`;let t=this._config.title??"Image Gallery";return y`
      <ha-card>
        <div class="title">${t}</div>

        <div
          class="viewport"
          @touchstart=${this._onCardSwipeStart}
          @touchmove=${this._onCardSwipeMove}
          @touchend=${this._onCardSwipeEnd}
          @touchcancel=${this._onCardSwipeEnd}
          @click=${this._onViewportClick}
          role="button"
          tabindex="0"
          @keydown=${this._onViewportKeydown}
        >
          ${this._renderMainContent()}

          <div class="caption" @click=${this._stopEvent}>
            <div>${this._images.length?this._getFileName(this._images[this._index]):"-"}</div>
            <div class="controls" @click=${this._stopEvent}>
              <button @click=${this._showPreviousFromButton} title="Vorheriges Bild" aria-label="Vorheriges Bild">&#9664;</button>
              <button @click=${this._showNextFromButton} title="Nächstes Bild" aria-label="Nächstes Bild">&#9654;</button>
            </div>
          </div>
        </div>
      </ha-card>

      ${this._dialogOpen?this._renderDialog():""}
    `}_renderMainContent(){if(this._loading)return y`<div class="center">Bilder werden geladen...</div>`;if(this._error)return y`<div class="center">${this._error}</div>`;if(!this._images.length)return y`<div class="center">Keine Bilder gefunden</div>`;let t=(this._index-1+this._images.length)%this._images.length,i=(this._index+1)%this._images.length,s=`transform: translateX(calc(-100% - 10px + ${this._cardSwipeDeltaX}px));`,r=this._cardIsSwiping?"viewport-track no-transition":"viewport-track";return y`
      <div class=${r} style=${s}>
        <div class="viewport-slide">
          <img src=${this._images[t]} alt="Vorheriges Bild" loading="lazy" />
        </div>
        <div class="viewport-slide">
          <img src=${this._images[this._index]} alt="Gallery image" loading="lazy" />
        </div>
        <div class="viewport-slide">
          <img src=${this._images[i]} alt="Naechstes Bild" loading="lazy" />
        </div>
      </div>
    `}_renderDialog(){let t=this._images[this._index],i=(this._index-1+this._images.length)%this._images.length,s=(this._index+1)%this._images.length,n=`transform: translateX(calc(-100% - 16px + ${this._scale<=1?this._overlaySwipeDeltaX:0}px));`,h="--s:1;--x:0px;--y:0px;",o=`--s:${this._scale};--x:${this._offsetX}px;--y:${this._offsetY}px;`,l="--s:1;--x:0px;--y:0px;",p=this._scale>1||this._overlayIsSwiping?"no-transition":"",c=this._overlayIsSwiping?"overlay-track no-transition":"overlay-track";return y`
      <div class="overlay" @wheel=${this._onWheelZoom}>
        <div class="overlay-top">
          <button class="close" @click=${this._closeDialog} @touchend=${this._closeDialogFromTouch} aria-label="Schliessen">✕</button>
          <div>${this._getFileName(t)}</div>
        </div>

        <div
          class="overlay-stage"
          @pointerdown=${this._onOverlayPointerDown}
          @pointermove=${this._onOverlayPointerMove}
          @pointerup=${this._onOverlayPointerUp}
          @pointercancel=${this._onOverlayPointerUp}
          @touchstart=${this._onOverlayTouchStart}
          @touchmove=${this._onOverlayTouchMove}
          @touchend=${this._onOverlayTouchEnd}
          @dblclick=${this._onImageDoubleTap}
        >
          <div class=${c} style=${n}>
            <div class="overlay-slide">
              <img src=${this._images[i]} alt="Vorheriges Bild" style=${h} draggable="false" />
            </div>
            <div class="overlay-slide">
              <img src=${t} alt="Fullscreen image" style=${o} class=${p} draggable="false" />
            </div>
            <div class="overlay-slide">
              <img src=${this._images[s]} alt="Naechstes Bild" style=${l} draggable="false" />
            </div>
          </div>
        </div>

        <div class="overlay-bottom">
          <button class="nav" @click=${this._showPrevious} aria-label="Vorheriges Bild">&#9664;</button>
          <div>${this._index+1} / ${this._images.length}</div>
          <button class="nav" @click=${this._showNext} aria-label="Nächstes Bild">&#9654;</button>
        </div>
      </div>
    `}async _loadImages(){if(this._config){this._loading=!0,this._error="";try{if(this._getEntityId()){this._loadImagesFromEntity();return}let t=(this._config.images??[]).filter(o=>o&&o.trim().length>0),i=[];if(t.length>0)i=t.map(o=>this._normalizeImageUrl(o));else{let o=await this._discoverImagesFromFolder(this._config.folder??"/local/snapshots");i=o.images,!i.length&&o.reason&&(this._error=o.reason)}let s=this._sortImages(i),r=this._images,n=r[this._index],h=r[0];if(this._images=s,!this._images.length)this._index=0;else if(h!==this._images[0])this._index=0;else if(n){let l=this._images.indexOf(n);this._index=l>=0?l:0}else this._index>=this._images.length&&(this._index=Math.max(0,this._images.length-1))}catch(t){let i=t instanceof Error?t.message:"Unbekannter Fehler";this._error=`Bilder konnten nicht geladen werden: ${i}`,this._images=[]}finally{this._loading=!1}}}_loadImagesFromEntity(){let t=this._getEntityId();if(!t)return;let i=this.hass?.states?.[t];if(!i){this._images=[],this._index=0,this._error=`Entity nicht gefunden: ${t}`,this._loading=!1;return}let r=(i.attributes??{}).images;if(!Array.isArray(r)){this._images=[],this._index=0,this._error=`Entity ${t} liefert kein Attribut images`,this._loading=!1;return}let n=r.filter(c=>typeof c=="string").map(c=>this._normalizeImageUrl(c)).filter(c=>this._isImagePath(c)),h=this._sortImages(n),o=this._images,l=o[this._index],p=o[0];if(this._images=h,this._error=this._images.length?"":`Entity ${t} liefert keine Bilder`,!this._images.length)this._index=0;else if(p!==this._images[0])this._index=0;else if(l){let _=this._images.indexOf(l);this._index=_>=0?_:0}else this._index>=this._images.length&&(this._index=Math.max(0,this._images.length-1));this._loading=!1}async _discoverImagesFromFolder(t){let i=this._normalizeFolder(t),s=await this._fetchIndexJson(i);if(s.length>0)return{images:s};let r=await this._fetchDirectoryListing(i);return r.length>0?{images:r}:{images:[],reason:`Keine Bilder gefunden unter ${i}. Pruefe ${i}/index.json (HTTP 200) oder setze images: [] direkt in der Karten-Konfiguration.`}}async _fetchIndexJson(t){let i=`${t}/index.json`;try{let s=await fetch(i,{cache:"no-store"});if(!s.ok)return[];let r=await s.json();return(Array.isArray(r)?r:typeof r=="object"&&r&&Array.isArray(r.images)?r.images:[]).filter(o=>typeof o=="string").filter(o=>this._isImagePath(o)).map(o=>this._resolveFolderEntry(t,o))}catch{return[]}}async _fetchDirectoryListing(t){try{let i=await fetch(`${t}/`,{cache:"no-store"});if(!i.ok)return[];let s=await i.text(),n=new DOMParser().parseFromString(s,"text/html");return Array.from(n.querySelectorAll("a")).map(l=>l.getAttribute("href")??"").filter(l=>l.length>0&&!l.startsWith("../")).filter(l=>this._isImagePath(l)).map(l=>this._resolveFolderEntry(t,l))}catch{return[]}}_isImagePath(t){let i=t.toLowerCase();return[".jpg",".jpeg",".png",".webp",".gif",".bmp"].some(s=>i.endsWith(s))}_normalizeFolder(t){let r=`/${t.trim().replace(/\\/g,"/").replace(/^\/+/,"").replace(/^config\/www\//,"local/").replace(/^www\//,"local/").replace(/^local\//,"local/")}`;return r.endsWith("/")?r.slice(0,-1):r}_normalizeImageUrl(t){let i=t.trim().replace(/\\/g,"/"),s=i.replace(/^\/+/,""),r=i;return/^config\/www\//.test(s)?r=`/${s.replace(/^config\/www\//,"local/")}`:/^www\//.test(s)?r=`/${s.replace(/^www\//,"local/")}`:/^local\//.test(s)&&(r=`/${s}`),r.replace(/\s/g,"%20")}_sortImages(t){let i=Array.from(new Set(t)),s=this._config?.sort??"newest_first";if(s==="none")return i;let r=s==="oldest_first"?1:-1;return[...i].sort((n,h)=>{let o=this._extractTimestampFromPath(n),l=this._extractTimestampFromPath(h);return o!==void 0&&l!==void 0&&o!==l?(o-l)*r:n.localeCompare(h,void 0,{numeric:!0,sensitivity:"base"})*r})}_extractTimestampFromPath(t){let i=decodeURIComponent((t.split("?")[0]??t).toLowerCase()),s=i.split("/").pop()??i,r=s.match(/(^|\D)(\d{10,13})(\D|$)/);if(r?.[2]){let h=Number(r[2]);if(Number.isFinite(h))return r[2].length===13?h:h*1e3}let n=s.match(/(\d{4})[-_]?([01]\d)[-_]?([0-3]\d)[t _-]?([0-2]\d)?[:_-]?([0-5]\d)?[:_-]?([0-5]\d)?/i);if(n){let h=Number(n[1]),o=Number(n[2]),l=Number(n[3]),p=Number(n[4]??"0"),c=Number(n[5]??"0"),_=Number(n[6]??"0"),f=new Date(h,o-1,l,p,c,_).getTime();if(!Number.isNaN(f))return f}}_resolveFolderEntry(t,i){let s=i.trim();return s.startsWith("http://")||s.startsWith("https://")||s.startsWith("/")?this._normalizeImageUrl(s):this._normalizeImageUrl(`${t}/${s.replace(/^\.\//,"")}`)}_distance(t,i){let s=t.x-i.x,r=t.y-i.y;return Math.sqrt(s*s+r*r)}_clamp(t,i,s){return Math.max(i,Math.min(s,t))}_getFileName(t){let s=(t.split("?")[0]??t).split("/"),r=decodeURIComponent(s[s.length-1]??t);return this._extractDateTimeFromFileName(r)}_extractDateTimeFromFileName(t){let i=t.match(/^(.+?)_(\d{8})_(\d{6})\./);if(i){let s=i[2],r=i[3],n=s.substring(0,4),h=s.substring(4,6),o=s.substring(6,8),l=r.substring(0,2),p=r.substring(2,4);return`${o}.${h}.${n} ${l}:${p}`}return t}_restartRefreshTimer(){if(this._clearRefreshTimer(),this._getEntityId())return;let t=this._config?.refresh_interval??15;!t||t<5||(this._refreshTimer=window.setInterval(()=>{this._loadImages()},t*1e3))}_clearRefreshTimer(){this._refreshTimer&&(window.clearInterval(this._refreshTimer),this._refreshTimer=void 0)}getCardSize(){return 4}_getEntityId(){let t=this._config?.entity?.trim();if(t)return t;if(this.hass?.states?.["camera.latest_snapshot"])return"camera.latest_snapshot";if(this.hass?.states?.["camera.lastsnapshot"])return"camera.lastsnapshot"}};g.styles=j`
    :host {
      display: block;
    }

    ha-card {
      overflow: hidden;
      border-radius: 16px;
      background: white;
      color: #333333;
      position: relative;
      padding: 0;
    }

    .title {
      display: none;
    }

    .viewport {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      background: rgba(0, 0, 0, 0.14);
      touch-action: pan-y;
      cursor: pointer;
      user-select: none;
    }

    .viewport-track {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 10px;
      transition: transform 0.22s ease-out;
      will-change: transform;
      pointer-events: none;
    }

    .viewport-track.no-transition {
      transition: none;
    }

    .viewport-slide {
      width: 100%;
      height: 100%;
      flex: 0 0 100%;
      overflow: hidden;
    }

    .viewport-slide img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
      background: rgba(0, 0, 0, 0.14);
    }

    .caption {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px 10px;
      font-size: 0.88rem;
      color: white;
      gap: 8px;
      background: rgba(0, 0, 0, 0.28);
      z-index: 10;
    }

    .controls {
      display: flex;
      gap: 4px;
    }

    button {
      border: 1px solid rgba(255, 255, 255, 0.3);
      background: rgba(255, 255, 255, 0.08);
      color: inherit;
      border-radius: 999px;
      width: 26px;
      height: 26px;
      cursor: pointer;
      font-size: 0.7rem;
      line-height: 1;
      padding: 0;
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

    .overlay-track {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 16px;
      transition: transform 0.22s ease-out;
      will-change: transform;
      pointer-events: none;
    }

    .overlay-track.no-transition {
      transition: none;
    }

    .overlay-slide {
      position: relative;
      width: 100%;
      height: 100%;
      flex: 0 0 100%;
      display: grid;
      place-items: center;
      overflow: hidden;
    }

    .overlay-slide img {
      max-width: 100%;
      max-height: 100%;
      transform: translate(var(--x), var(--y)) scale(var(--s));
      transform-origin: center center;
      transition: transform 0.3s ease-out;
      will-change: transform;
      user-select: none;
      pointer-events: auto;
    }

    .overlay-slide img.no-transition {
      transition: none;
    }

    .overlay .nav {
      width: 40px;
      height: 40px;
      font-size: 1.1rem;
      border: 1px solid rgba(255, 255, 255, 0.3);
      background: rgba(255, 255, 255, 0.08);
      border-radius: 50%;
      padding: 0;
    }

    .close {
      width: 52px;
      height: 52px;
      display: grid;
      place-items: center;
      border: 1px solid rgba(255, 255, 255, 0.28);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.08);
      padding: 0;
      font-size: 2.1rem;
      color: white;
      cursor: pointer;
      line-height: 1;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }

    @media (max-width: 650px) {
      .viewport {
        aspect-ratio: 16 / 9;
      }

      .caption {
        font-size: 0.82rem;
      }
    }
  `,u([z({attribute:!1})],g.prototype,"hass",2),u([m()],g.prototype,"_config",2),u([m()],g.prototype,"_images",2),u([m()],g.prototype,"_index",2),u([m()],g.prototype,"_loading",2),u([m()],g.prototype,"_error",2),u([m()],g.prototype,"_dialogOpen",2),u([m()],g.prototype,"_scale",2),u([m()],g.prototype,"_offsetX",2),u([m()],g.prototype,"_offsetY",2),g=u([rt("ha-imagegallery-card")],g);var T=class extends w{constructor(){super(...arguments);this._config={type:"custom:ha-imagegallery-card",entity:"camera.latest_snapshot",sort:"newest_first"}}setConfig(t){this._config={entity:"camera.latest_snapshot",sort:"newest_first",...t,type:"custom:ha-imagegallery-card"}}render(){return y`
      <div class="editor">
        <div>
          <label>LastSnapshot Kamera Entity</label>
          <input
            .value=${this._config.entity??"camera.latest_snapshot"}
            @input=${t=>this._onInput("entity",t.target.value)}
            placeholder="camera.latest_snapshot"
          />
        </div>

        <div>
          <label>Titel</label>
          <input
            .value=${this._config.title??""}
            @input=${t=>this._onInput("title",t.target.value)}
            placeholder="Kamera Snapshots"
          />
        </div>

        <div>
          <label>Sortierung</label>
          <select
            .value=${this._config.sort??"newest_first"}
            @change=${t=>this._onInput("sort",t.target.value)}
          >
            <option value="newest_first">Neueste zuerst</option>
            <option value="oldest_first">Aelteste zuerst</option>
            <option value="none">Keine Sortierung</option>
          </select>
        </div>

        <div class="hint">Empfohlen: Entity camera.latest_snapshot aus der ha-lastsnapshot Integration verwenden.</div>
      </div>
    `}_onInput(t,i){let s=i.trim(),r={...this._config,type:"custom:ha-imagegallery-card"};!s&&t!=="sort"?delete r[t]:r[t]=s,this._config=r,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}};T.styles=j`
    .editor {
      display: grid;
      gap: 12px;
      padding: 4px 0;
    }

    .hint {
      font-size: 0.85rem;
      opacity: 0.8;
      line-height: 1.4;
    }

    label {
      font-size: 0.8rem;
      opacity: 0.85;
      margin-bottom: 4px;
      display: block;
    }

    input,
    select {
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      border-radius: 8px;
      border: 1px solid rgba(120, 120, 120, 0.45);
      background: transparent;
      color: inherit;
      font: inherit;
    }
  `,u([z({attribute:!1})],T.prototype,"hass",2),u([m()],T.prototype,"_config",2),T=u([rt("ha-imagegallery-card-editor")],T);window.customCards=window.customCards||[];window.customCards.push({type:"ha-imagegallery-card",name:"HA Image Gallery",description:"Swipe through images and open fullscreen with pinch-to-zoom preview"});export{g as HaImageGalleryCard};
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
