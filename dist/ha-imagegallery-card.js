var wt=Object.defineProperty;var xt=Object.getOwnPropertyDescriptor;var u=(n,e,t,i)=>{for(var s=i>1?void 0:i?xt(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(s=(i?o(e,t,s):o(s))||s);return i&&s&&wt(e,t,s),s};var j=globalThis,H=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,W=Symbol(),nt=new WeakMap,O=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==W)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(H&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=nt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&nt.set(t,e))}return e}toString(){return this.cssText}},ot=n=>new O(typeof n=="string"?n:n+"",void 0,W),F=(n,...e)=>{let t=n.length===1?n[0]:e.reduce((i,s,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[r+1],n[0]);return new O(t,n,W)},at=(n,e)=>{if(H)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),s=j.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,n.appendChild(i)}},V=H?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return ot(t)})(n):n;var{is:At,defineProperty:St,getOwnPropertyDescriptor:Et,getOwnPropertyNames:Pt,getOwnPropertySymbols:Ct,getPrototypeOf:Tt}=Object,b=globalThis,ht=b.trustedTypes,Ot=ht?ht.emptyScript:"",Mt=b.reactiveElementPolyfillSupport,M=(n,e)=>n,N={toAttribute(n,e){switch(e){case Boolean:n=n?Ot:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},B=(n,e)=>!At(n,e),lt={attribute:!0,type:String,converter:N,reflect:!1,useDefault:!1,hasChanged:B};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),b.litPropertyMetadata??(b.litPropertyMetadata=new WeakMap);var v=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=lt){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&St(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){let{get:s,set:r}=Et(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:s,set(o){let h=s?.call(this);r?.call(this,o),this.requestUpdate(e,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??lt}static _$Ei(){if(this.hasOwnProperty(M("elementProperties")))return;let e=Tt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(M("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(M("properties"))){let t=this.properties,i=[...Pt(t),...Ct(t)];for(let s of i)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)t.unshift(V(s))}else e!==void 0&&t.push(V(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return at(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){let r=(i.converter?.toAttribute!==void 0?i.converter:N).toAttribute(t,i.type);this._$Em=e,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(e,t){let i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let r=i.getPropertyOptions(s),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:N;this._$Em=s;let h=o.fromAttribute(t,r.type);this[s]=h??this._$Ej?.get(s)??h,this._$Em=null}}requestUpdate(e,t,i,s=!1,r){if(e!==void 0){let o=this.constructor;if(s===!1&&(r=this[e]),i??(i=o.getPropertyOptions(e)),!((i.hasChanged??B)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??t??this[e]),r!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,r]of i){let{wrapped:o}=r,h=this[s];o!==!0||this._$AL.has(s)||h===void 0||this.C(s,void 0,r,h)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[M("elementProperties")]=new Map,v[M("finalized")]=new Map,Mt?.({ReactiveElement:v}),(b.reactiveElementVersions??(b.reactiveElementVersions=[])).push("2.1.2");var U=globalThis,ct=n=>n,q=U.trustedTypes,dt=q?q.createPolicy("lit-html",{createHTML:n=>n}):void 0,mt="$lit$",w=`lit$${Math.random().toFixed(9).slice(2)}$`,vt="?"+w,Nt=`<${vt}>`,S=document,I=()=>S.createComment(""),R=n=>n===null||typeof n!="object"&&typeof n!="function",it=Array.isArray,kt=n=>it(n)||typeof n?.[Symbol.iterator]=="function",Z=`[ 	
\f\r]`,k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pt=/-->/g,ut=/>/g,x=RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),gt=/'/g,ft=/"/g,yt=/^(?:script|style|textarea|title)$/i,st=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),y=st(1),Ft=st(2),Bt=st(3),E=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),_t=new WeakMap,A=S.createTreeWalker(S,129);function $t(n,e){if(!it(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return dt!==void 0?dt.createHTML(e):e}var Ut=(n,e)=>{let t=n.length-1,i=[],s,r=e===2?"<svg>":e===3?"<math>":"",o=k;for(let h=0;h<t;h++){let a=n[h],l,d,c=-1,f=0;for(;f<a.length&&(o.lastIndex=f,d=o.exec(a),d!==null);)f=o.lastIndex,o===k?d[1]==="!--"?o=pt:d[1]!==void 0?o=ut:d[2]!==void 0?(yt.test(d[2])&&(s=RegExp("</"+d[2],"g")),o=x):d[3]!==void 0&&(o=x):o===x?d[0]===">"?(o=s??k,c=-1):d[1]===void 0?c=-2:(c=o.lastIndex-d[2].length,l=d[1],o=d[3]===void 0?x:d[3]==='"'?ft:gt):o===ft||o===gt?o=x:o===pt||o===ut?o=k:(o=x,s=void 0);let _=o===x&&n[h+1].startsWith("/>")?" ":"";r+=o===k?a+Nt:c>=0?(i.push(l),a.slice(0,c)+mt+a.slice(c)+w+_):a+w+(c===-2?h:_)}return[$t(n,r+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},D=class n{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let r=0,o=0,h=e.length-1,a=this.parts,[l,d]=Ut(e,t);if(this.el=n.createElement(l,i),A.currentNode=this.el.content,t===2||t===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=A.nextNode())!==null&&a.length<h;){if(s.nodeType===1){if(s.hasAttributes())for(let c of s.getAttributeNames())if(c.endsWith(mt)){let f=d[o++],_=s.getAttribute(c).split(w),X=/([.?@])?(.*)/.exec(f);a.push({type:1,index:r,name:X[2],strings:_,ctor:X[1]==="."?Q:X[1]==="?"?G:X[1]==="@"?tt:T}),s.removeAttribute(c)}else c.startsWith(w)&&(a.push({type:6,index:r}),s.removeAttribute(c));if(yt.test(s.tagName)){let c=s.textContent.split(w),f=c.length-1;if(f>0){s.textContent=q?q.emptyScript:"";for(let _=0;_<f;_++)s.append(c[_],I()),A.nextNode(),a.push({type:2,index:++r});s.append(c[f],I())}}}else if(s.nodeType===8)if(s.data===vt)a.push({type:2,index:r});else{let c=-1;for(;(c=s.data.indexOf(w,c+1))!==-1;)a.push({type:7,index:r}),c+=w.length-1}r++}}static createElement(e,t){let i=S.createElement("template");return i.innerHTML=e,i}};function C(n,e,t=n,i){if(e===E)return e;let s=i!==void 0?t._$Co?.[i]:t._$Cl,r=R(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(n),s._$AT(n,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=s:t._$Cl=s),s!==void 0&&(e=C(n,s._$AS(n,e.values),s,i)),e}var J=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??S).importNode(t,!0);A.currentNode=s;let r=A.nextNode(),o=0,h=0,a=i[0];for(;a!==void 0;){if(o===a.index){let l;a.type===2?l=new z(r,r.nextSibling,this,e):a.type===1?l=new a.ctor(r,a.name,a.strings,this,e):a.type===6&&(l=new et(r,this,e)),this._$AV.push(l),a=i[++h]}o!==a?.index&&(r=A.nextNode(),o++)}return A.currentNode=S,s}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},z=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=C(this,e,t),R(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==E&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):kt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==p&&R(this._$AH)?this._$AA.nextSibling.data=e:this.T(S.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=D.createElement($t(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{let r=new J(s,this),o=r.u(this.options);r.p(t),this.T(o),this._$AH=r}}_$AC(e){let t=_t.get(e.strings);return t===void 0&&_t.set(e.strings,t=new D(e)),t}k(e){it(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,s=0;for(let r of e)s===t.length?t.push(i=new n(this.O(I()),this.O(I()),this,this.options)):i=t[s],i._$AI(r),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=ct(e).nextSibling;ct(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},T=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,r){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}_$AI(e,t=this,i,s){let r=this.strings,o=!1;if(r===void 0)e=C(this,e,t,0),o=!R(e)||e!==this._$AH&&e!==E,o&&(this._$AH=e);else{let h=e,a,l;for(e=r[0],a=0;a<r.length-1;a++)l=C(this,h[i+a],t,a),l===E&&(l=this._$AH[a]),o||(o=!R(l)||l!==this._$AH[a]),l===p?e=p:e!==p&&(e+=(l??"")+r[a+1]),this._$AH[a]=l}o&&!s&&this.j(e)}j(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Q=class extends T{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===p?void 0:e}},G=class extends T{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==p)}},tt=class extends T{constructor(e,t,i,s,r){super(e,t,i,s,r),this.type=5}_$AI(e,t=this){if((e=C(this,e,t,0)??p)===E)return;let i=this._$AH,s=e===p&&i!==p||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==p&&(i===p||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},et=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){C(this,e)}};var It=U.litHtmlPolyfillSupport;It?.(D,z),(U.litHtmlVersions??(U.litHtmlVersions=[])).push("3.3.3");var bt=(n,e,t)=>{let i=t?.renderBefore??e,s=i._$litPart$;if(s===void 0){let r=t?.renderBefore??null;i._$litPart$=s=new z(e.insertBefore(I(),r),r,void 0,t??{})}return s._$AI(n),s};var L=globalThis,$=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;let e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=bt(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}};$._$litElement$=!0,$.finalized=!0,L.litElementHydrateSupport?.({LitElement:$});var Rt=L.litElementPolyfillSupport;Rt?.({LitElement:$});(L.litElementVersions??(L.litElementVersions=[])).push("4.2.2");var rt=n=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(n,e)}):customElements.define(n,e)};var Dt={attribute:!0,type:String,converter:N,reflect:!1,hasChanged:B},zt=(n=Dt,e,t)=>{let{kind:i,metadata:s}=t,r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),i==="setter"&&((n=Object.create(n)).wrapped=!0),r.set(t.name,n),i==="accessor"){let{name:o}=t;return{set(h){let a=e.get.call(this);e.set.call(this,h),this.requestUpdate(o,a,n,!0,h)},init(h){return h!==void 0&&this.C(o,void 0,n,h),h}}}if(i==="setter"){let{name:o}=t;return function(h){let a=this[o];e.call(this,h),this.requestUpdate(o,a,n,!0,h)}}throw Error("Unsupported decorator location: "+i)};function Y(n){return(e,t)=>typeof t=="object"?zt(n,e,t):((i,s,r)=>{let o=s.hasOwnProperty(r);return s.constructor.createProperty(r,i),o?Object.getOwnPropertyDescriptor(s,r):void 0})(n,e,t)}function m(n){return Y({...n,state:!0,attribute:!1})}var g=class extends ${constructor(){super(...arguments);this._images=[];this._index=0;this._loading=!1;this._error="";this._dialogOpen=!1;this._scale=1;this._offsetX=0;this._offsetY=0;this._touchStartX=0;this._touchStartY=0;this._touchStartTime=0;this._activePointers=new Map;this._pinchStartDistance=0;this._pinchStartScale=1;this._pinchStartOffsetX=0;this._pinchStartOffsetY=0;this._pinchStartMidX=0;this._pinchStartMidY=0;this._dragging=!1;this._dragStartPointerX=0;this._dragStartPointerY=0;this._dragStartOffsetX=0;this._dragStartOffsetY=0;this._showPrevious=()=>{this._images.length&&(this._index=(this._index-1+this._images.length)%this._images.length,this._resetZoom())};this._showNext=()=>{this._images.length&&(this._index=(this._index+1)%this._images.length,this._resetZoom())};this._openDialog=()=>{!this._images.length||this._loading||this._error||(this._dialogOpen=!0)};this._closeDialog=()=>{this._dialogOpen=!1,this._activePointers.clear(),this._dragging=!1};this._onViewportKeydown=t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this._openDialog()),t.key==="ArrowLeft"&&this._showPrevious(),t.key==="ArrowRight"&&this._showNext()};this._onSwipeStart=t=>{let i=t.changedTouches[0];i&&(this._touchStartX=i.clientX,this._touchStartY=i.clientY,this._touchStartTime=Date.now())};this._onSwipeEnd=t=>{let i=t.changedTouches[0];if(!i)return;let s=i.clientX-this._touchStartX,r=i.clientY-this._touchStartY,o=Date.now()-this._touchStartTime;Math.abs(s)>45&&Math.abs(r)<60&&o<600&&(s<0?this._showNext():this._showPrevious())};this._onOverlayPointerDown=t=>{if(t.currentTarget.setPointerCapture(t.pointerId),this._activePointers.set(t.pointerId,{x:t.clientX,y:t.clientY}),this._activePointers.size===2){let[s,r]=Array.from(this._activePointers.values());this._pinchStartDistance=this._distance(s,r),this._pinchStartScale=this._scale,this._pinchStartOffsetX=this._offsetX,this._pinchStartOffsetY=this._offsetY,this._pinchStartMidX=(s.x+r.x)/2,this._pinchStartMidY=(s.y+r.y)/2,this._dragging=!1;return}this._activePointers.size===1&&this._scale>1&&(this._dragging=!0,this._dragStartPointerX=t.clientX,this._dragStartPointerY=t.clientY,this._dragStartOffsetX=this._offsetX,this._dragStartOffsetY=this._offsetY)};this._onOverlayPointerMove=t=>{if(this._activePointers.has(t.pointerId)){if(this._activePointers.set(t.pointerId,{x:t.clientX,y:t.clientY}),this._activePointers.size===2){let[i,s]=Array.from(this._activePointers.values()),r=this._distance(i,s),o=(i.x+s.x)/2,h=(i.y+s.y)/2,a=this._clamp(this._pinchStartScale*(r/this._pinchStartDistance),1,5);this._scale=a;let l=o-this._pinchStartMidX,d=h-this._pinchStartMidY;this._offsetX=this._pinchStartOffsetX+l,this._offsetY=this._pinchStartOffsetY+d;return}this._dragging&&this._activePointers.size===1&&this._scale>1&&(this._offsetX=this._dragStartOffsetX+(t.clientX-this._dragStartPointerX),this._offsetY=this._dragStartOffsetY+(t.clientY-this._dragStartPointerY))}};this._onOverlayPointerUp=t=>{this._activePointers.delete(t.pointerId),this._activePointers.size<2&&(this._pinchStartDistance=0),this._activePointers.size===0&&(this._dragging=!1),this._scale<=1&&(this._offsetX=0,this._offsetY=0)};this._onWheelZoom=t=>{if(!this._dialogOpen)return;t.preventDefault();let s=-t.deltaY>0?1.08:.92;this._scale=this._clamp(this._scale*s,1,5),this._scale<=1.01&&(this._scale=1,this._offsetX=0,this._offsetY=0)};this._onKeyDown=t=>{if(this._dialogOpen){if(t.key==="Escape"){this._closeDialog();return}if(t.key==="ArrowLeft"){this._showPrevious();return}t.key==="ArrowRight"&&this._showNext()}};this._resetZoom=()=>{this._scale=1,this._offsetX=0,this._offsetY=0,this._activePointers.clear(),this._dragging=!1}}static getStubConfig(){return{type:"custom:ha-imagegallery-card",entity:"camera.latest_snapshot",title:"Kamera Snapshots",sort:"newest_first"}}static async getConfigElement(){return document.createElement("ha-imagegallery-card-editor")}setConfig(t){if(!t)throw new Error("Missing config");if(t.type!=="custom:ha-imagegallery-card")throw new Error("Invalid card type. Use custom:ha-imagegallery-card");this._config={folder:"/local/snapshots",refresh_interval:15,sort:"newest_first",...t},this._index=0,this._loadImages(),this._restartRefreshTimer()}connectedCallback(){super.connectedCallback(),this._config&&this._restartRefreshTimer(),window.addEventListener("keydown",this._onKeyDown)}disconnectedCallback(){super.disconnectedCallback(),this._clearRefreshTimer(),window.removeEventListener("keydown",this._onKeyDown)}willUpdate(t){t.has("_dialogOpen")&&!this._dialogOpen&&this._resetZoom()}updated(t){t.has("hass")&&this._config?.entity&&this._loadImagesFromEntity()}render(){if(!this._config)return y`<ha-card><div class="center">Ungultige Kartenkonfiguration</div></ha-card>`;let t=this._config.title??"Image Gallery";return y`
      <ha-card>
        <div class="title">${t}</div>

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
    `}_renderMainContent(){return this._loading?y`<div class="center">Bilder werden geladen...</div>`:this._error?y`<div class="center">${this._error}</div>`:this._images.length?y`<img src=${this._images[this._index]} alt="Gallery image" loading="lazy" />`:y`<div class="center">Keine Bilder gefunden</div>`}_renderDialog(){let t=this._images[this._index],i=`--s:${this._scale};--x:${this._offsetX}px;--y:${this._offsetY}px;`;return y`
      <div class="overlay" @wheel=${this._onWheelZoom}>
        <div class="overlay-top">
          <button class="close" @click=${this._closeDialog} aria-label="Schliessen">SCHLIESSEN</button>
          <div>${this._getFileName(t)}</div>
        </div>

        <div
          class="overlay-stage"
          @pointerdown=${this._onOverlayPointerDown}
          @pointermove=${this._onOverlayPointerMove}
          @pointerup=${this._onOverlayPointerUp}
          @pointercancel=${this._onOverlayPointerUp}
          @dblclick=${this._resetZoom}
        >
          <img src=${t} alt="Fullscreen image" style=${i} draggable="false" />
        </div>

        <div class="overlay-bottom">
          <button class="nav" @click=${this._showPrevious} aria-label="Vorheriges Bild">&#8592;</button>
          <div>${this._index+1} / ${this._images.length}</div>
          <button class="nav" @click=${this._showNext} aria-label="Nächstes Bild">&#8594;</button>
        </div>
      </div>
    `}async _loadImages(){if(this._config){this._loading=!0,this._error="";try{if(this._config.entity){this._loadImagesFromEntity();return}let t=(this._config.images??[]).filter(a=>a&&a.trim().length>0),i=[];if(t.length>0)i=t.map(a=>this._normalizeImageUrl(a));else{let a=await this._discoverImagesFromFolder(this._config.folder??"/local/snapshots");i=a.images,!i.length&&a.reason&&(this._error=a.reason)}let s=this._sortImages(i),r=this._images,o=r[this._index],h=r[0];if(this._images=s,!this._images.length)this._index=0;else if(h!==this._images[0])this._index=0;else if(o){let l=this._images.indexOf(o);this._index=l>=0?l:0}else this._index>=this._images.length&&(this._index=Math.max(0,this._images.length-1))}catch(t){let i=t instanceof Error?t.message:"Unbekannter Fehler";this._error=`Bilder konnten nicht geladen werden: ${i}`,this._images=[]}finally{this._loading=!1}}}_loadImagesFromEntity(){let t=this._config?.entity?.trim();if(!t)return;let i=this.hass?.states?.[t];if(!i){this._images=[],this._index=0,this._error=`Entity nicht gefunden: ${t}`,this._loading=!1;return}let r=(i.attributes??{}).images;if(!Array.isArray(r)){this._images=[],this._index=0,this._error=`Entity ${t} liefert kein Attribut images`,this._loading=!1;return}let o=r.filter(c=>typeof c=="string").map(c=>this._normalizeImageUrl(c)).filter(c=>this._isImagePath(c)),h=this._sortImages(o),a=this._images,l=a[this._index],d=a[0];if(this._images=h,this._error=this._images.length?"":`Entity ${t} liefert keine Bilder`,!this._images.length)this._index=0;else if(d!==this._images[0])this._index=0;else if(l){let f=this._images.indexOf(l);this._index=f>=0?f:0}else this._index>=this._images.length&&(this._index=Math.max(0,this._images.length-1));this._loading=!1}async _discoverImagesFromFolder(t){let i=this._normalizeFolder(t),s=await this._fetchIndexJson(i);if(s.length>0)return{images:s};let r=await this._fetchDirectoryListing(i);return r.length>0?{images:r}:{images:[],reason:`Keine Bilder gefunden unter ${i}. Pruefe ${i}/index.json (HTTP 200) oder setze images: [] direkt in der Karten-Konfiguration.`}}async _fetchIndexJson(t){let i=`${t}/index.json`;try{let s=await fetch(i,{cache:"no-store"});if(!s.ok)return[];let r=await s.json();return(Array.isArray(r)?r:typeof r=="object"&&r&&Array.isArray(r.images)?r.images:[]).filter(a=>typeof a=="string").filter(a=>this._isImagePath(a)).map(a=>this._resolveFolderEntry(t,a))}catch{return[]}}async _fetchDirectoryListing(t){try{let i=await fetch(`${t}/`,{cache:"no-store"});if(!i.ok)return[];let s=await i.text(),o=new DOMParser().parseFromString(s,"text/html");return Array.from(o.querySelectorAll("a")).map(l=>l.getAttribute("href")??"").filter(l=>l.length>0&&!l.startsWith("../")).filter(l=>this._isImagePath(l)).map(l=>this._resolveFolderEntry(t,l))}catch{return[]}}_isImagePath(t){let i=t.toLowerCase();return[".jpg",".jpeg",".png",".webp",".gif",".bmp"].some(s=>i.endsWith(s))}_normalizeFolder(t){let r=`/${t.trim().replace(/\\/g,"/").replace(/^\/+/,"").replace(/^config\/www\//,"local/").replace(/^www\//,"local/").replace(/^local\//,"local/")}`;return r.endsWith("/")?r.slice(0,-1):r}_normalizeImageUrl(t){let i=t.trim().replace(/\\/g,"/"),s=i.replace(/^\/+/,""),r=i;return/^config\/www\//.test(s)?r=`/${s.replace(/^config\/www\//,"local/")}`:/^www\//.test(s)?r=`/${s.replace(/^www\//,"local/")}`:/^local\//.test(s)&&(r=`/${s}`),r.replace(/\s/g,"%20")}_sortImages(t){let i=Array.from(new Set(t)),s=this._config?.sort??"newest_first";if(s==="none")return i;let r=s==="oldest_first"?1:-1;return[...i].sort((o,h)=>{let a=this._extractTimestampFromPath(o),l=this._extractTimestampFromPath(h);return a!==void 0&&l!==void 0&&a!==l?(a-l)*r:o.localeCompare(h,void 0,{numeric:!0,sensitivity:"base"})*r})}_extractTimestampFromPath(t){let i=decodeURIComponent((t.split("?")[0]??t).toLowerCase()),s=i.split("/").pop()??i,r=s.match(/(^|\D)(\d{10,13})(\D|$)/);if(r?.[2]){let h=Number(r[2]);if(Number.isFinite(h))return r[2].length===13?h:h*1e3}let o=s.match(/(\d{4})[-_]?([01]\d)[-_]?([0-3]\d)[t _-]?([0-2]\d)?[:_-]?([0-5]\d)?[:_-]?([0-5]\d)?/i);if(o){let h=Number(o[1]),a=Number(o[2]),l=Number(o[3]),d=Number(o[4]??"0"),c=Number(o[5]??"0"),f=Number(o[6]??"0"),_=new Date(h,a-1,l,d,c,f).getTime();if(!Number.isNaN(_))return _}}_resolveFolderEntry(t,i){let s=i.trim();return s.startsWith("http://")||s.startsWith("https://")||s.startsWith("/")?this._normalizeImageUrl(s):this._normalizeImageUrl(`${t}/${s.replace(/^\.\//,"")}`)}_distance(t,i){let s=t.x-i.x,r=t.y-i.y;return Math.sqrt(s*s+r*r)}_clamp(t,i,s){return Math.max(i,Math.min(s,t))}_getFileName(t){let s=(t.split("?")[0]??t).split("/");return decodeURIComponent(s[s.length-1]??t)}_restartRefreshTimer(){if(this._clearRefreshTimer(),this._config?.entity)return;let t=this._config?.refresh_interval??15;!t||t<5||(this._refreshTimer=window.setInterval(()=>{this._loadImages()},t*1e3))}_clearRefreshTimer(){this._refreshTimer&&(window.clearInterval(this._refreshTimer),this._refreshTimer=void 0)}getCardSize(){return 4}};g.styles=F`
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
  `,u([Y({attribute:!1})],g.prototype,"hass",2),u([m()],g.prototype,"_config",2),u([m()],g.prototype,"_images",2),u([m()],g.prototype,"_index",2),u([m()],g.prototype,"_loading",2),u([m()],g.prototype,"_error",2),u([m()],g.prototype,"_dialogOpen",2),u([m()],g.prototype,"_scale",2),u([m()],g.prototype,"_offsetX",2),u([m()],g.prototype,"_offsetY",2),g=u([rt("ha-imagegallery-card")],g);var P=class extends ${constructor(){super(...arguments);this._config={type:"custom:ha-imagegallery-card",entity:"camera.latest_snapshot",sort:"newest_first"}}setConfig(t){this._config={sort:"newest_first",...t,type:"custom:ha-imagegallery-card"}}render(){return y`
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
    `}_onInput(t,i){let s=i.trim(),r={...this._config,type:"custom:ha-imagegallery-card"};!s&&t!=="sort"?delete r[t]:r[t]=s,this._config=r,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}};P.styles=F`
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
  `,u([Y({attribute:!1})],P.prototype,"hass",2),u([m()],P.prototype,"_config",2),P=u([rt("ha-imagegallery-card-editor")],P);window.customCards=window.customCards||[];window.customCards.push({type:"ha-imagegallery-card",name:"HA Image Gallery",description:"Swipe through images and open fullscreen with pinch-to-zoom preview"});export{g as HaImageGalleryCard};
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
