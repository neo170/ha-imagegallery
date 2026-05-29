var wt=Object.defineProperty;var bt=Object.getOwnPropertyDescriptor;var f=(n,t,e,i)=>{for(var s=i>1?void 0:i?bt(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(s=(i?o(t,e,s):o(s))||s);return i&&s&&wt(t,e,s),s};var X=globalThis,j=X.ShadowRoot&&(X.ShadyCSS===void 0||X.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,F=Symbol(),st=new WeakMap,O=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==F)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(j&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=st.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&st.set(e,t))}return t}toString(){return this.cssText}},rt=n=>new O(typeof n=="string"?n:n+"",void 0,F),W=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((i,s,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[r+1],n[0]);return new O(e,n,F)},nt=(n,t)=>{if(j)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=X.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,n.appendChild(i)}},K=j?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return rt(e)})(n):n;var{is:At,defineProperty:St,getOwnPropertyDescriptor:xt,getOwnPropertyNames:Et,getOwnPropertySymbols:Pt,getPrototypeOf:Ct}=Object,$=globalThis,ot=$.trustedTypes,Ot=ot?ot.emptyScript:"",Tt=$.reactiveElementPolyfillSupport,T=(n,t)=>n,M={toAttribute(n,t){switch(t){case Boolean:n=n?Ot:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},I=(n,t)=>!At(n,t),at={attribute:!0,type:String,converter:M,reflect:!1,useDefault:!1,hasChanged:I};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),$.litPropertyMetadata??($.litPropertyMetadata=new WeakMap);var m=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=at){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&St(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:r}=xt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:s,set(o){let h=s?.call(this);r?.call(this,o),this.requestUpdate(t,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??at}static _$Ei(){if(this.hasOwnProperty(T("elementProperties")))return;let t=Ct(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(T("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(T("properties"))){let e=this.properties,i=[...Et(e),...Pt(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(K(s))}else t!==void 0&&e.push(K(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return nt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let r=(i.converter?.toAttribute!==void 0?i.converter:M).toAttribute(e,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let r=i.getPropertyOptions(s),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:M;this._$Em=s;let h=o.fromAttribute(e,r.type);this[s]=h??this._$Ej?.get(s)??h,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(t!==void 0){let o=this.constructor;if(s===!1&&(r=this[t]),i??(i=o.getPropertyOptions(t)),!((i.hasChanged??I)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,r]of i){let{wrapped:o}=r,h=this[s];o!==!0||this._$AL.has(s)||h===void 0||this.C(s,void 0,r,h)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};m.elementStyles=[],m.shadowRootOptions={mode:"open"},m[T("elementProperties")]=new Map,m[T("finalized")]=new Map,Tt?.({ReactiveElement:m}),($.reactiveElementVersions??($.reactiveElementVersions=[])).push("2.1.2");var k=globalThis,ht=n=>n,H=k.trustedTypes,ct=H?H.createPolicy("lit-html",{createHTML:n=>n}):void 0,_t="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,gt="?"+y,Mt=`<${gt}>`,x=document,R=()=>x.createComment(""),N=n=>n===null||typeof n!="object"&&typeof n!="function",et=Array.isArray,Ut=n=>et(n)||typeof n?.[Symbol.iterator]=="function",V=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,lt=/-->/g,dt=/>/g,A=RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),pt=/'/g,ut=/"/g,mt=/^(?:script|style|textarea|title)$/i,it=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),w=it(1),Ht=it(2),Bt=it(3),E=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),ft=new WeakMap,S=x.createTreeWalker(x,129);function vt(n,t){if(!et(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return ct!==void 0?ct.createHTML(t):t}var kt=(n,t)=>{let e=n.length-1,i=[],s,r=t===2?"<svg>":t===3?"<math>":"",o=U;for(let h=0;h<e;h++){let a=n[h],c,d,l=-1,g=0;for(;g<a.length&&(o.lastIndex=g,d=o.exec(a),d!==null);)g=o.lastIndex,o===U?d[1]==="!--"?o=lt:d[1]!==void 0?o=dt:d[2]!==void 0?(mt.test(d[2])&&(s=RegExp("</"+d[2],"g")),o=A):d[3]!==void 0&&(o=A):o===A?d[0]===">"?(o=s??U,l=-1):d[1]===void 0?l=-2:(l=o.lastIndex-d[2].length,c=d[1],o=d[3]===void 0?A:d[3]==='"'?ut:pt):o===ut||o===pt?o=A:o===lt||o===dt?o=U:(o=A,s=void 0);let v=o===A&&n[h+1].startsWith("/>")?" ":"";r+=o===U?a+Mt:l>=0?(i.push(c),a.slice(0,l)+_t+a.slice(l)+y+v):a+y+(l===-2?h:v)}return[vt(n,r+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},D=class n{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0,h=t.length-1,a=this.parts,[c,d]=kt(t,e);if(this.el=n.createElement(c,i),S.currentNode=this.el.content,e===2||e===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(s=S.nextNode())!==null&&a.length<h;){if(s.nodeType===1){if(s.hasAttributes())for(let l of s.getAttributeNames())if(l.endsWith(_t)){let g=d[o++],v=s.getAttribute(l).split(y),Y=/([.?@])?(.*)/.exec(g);a.push({type:1,index:r,name:Y[2],strings:v,ctor:Y[1]==="."?J:Y[1]==="?"?Q:Y[1]==="@"?G:C}),s.removeAttribute(l)}else l.startsWith(y)&&(a.push({type:6,index:r}),s.removeAttribute(l));if(mt.test(s.tagName)){let l=s.textContent.split(y),g=l.length-1;if(g>0){s.textContent=H?H.emptyScript:"";for(let v=0;v<g;v++)s.append(l[v],R()),S.nextNode(),a.push({type:2,index:++r});s.append(l[g],R())}}}else if(s.nodeType===8)if(s.data===gt)a.push({type:2,index:r});else{let l=-1;for(;(l=s.data.indexOf(y,l+1))!==-1;)a.push({type:7,index:r}),l+=y.length-1}r++}}static createElement(t,e){let i=x.createElement("template");return i.innerHTML=t,i}};function P(n,t,e=n,i){if(t===E)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,r=N(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(n),s._$AT(n,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=s:e._$Cl=s),s!==void 0&&(t=P(n,s._$AS(n,t.values),s,i)),t}var Z=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??x).importNode(e,!0);S.currentNode=s;let r=S.nextNode(),o=0,h=0,a=i[0];for(;a!==void 0;){if(o===a.index){let c;a.type===2?c=new z(r,r.nextSibling,this,t):a.type===1?c=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(c=new tt(r,this,t)),this._$AV.push(c),a=i[++h]}o!==a?.index&&(r=S.nextNode(),o++)}return S.currentNode=x,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},z=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=P(this,t,e),N(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==E&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ut(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(x.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=D.createElement(vt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let r=new Z(s,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(t){let e=ft.get(t.strings);return e===void 0&&ft.set(t.strings,e=new D(t)),e}k(t){et(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let r of t)s===e.length?e.push(i=new n(this.O(R()),this.O(R()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=ht(t).nextSibling;ht(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}_$AI(t,e=this,i,s){let r=this.strings,o=!1;if(r===void 0)t=P(this,t,e,0),o=!N(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else{let h=t,a,c;for(t=r[0],a=0;a<r.length-1;a++)c=P(this,h[i+a],e,a),c===E&&(c=this._$AH[a]),o||(o=!N(c)||c!==this._$AH[a]),c===p?t=p:t!==p&&(t+=(c??"")+r[a+1]),this._$AH[a]=c}o&&!s&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},J=class extends C{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}},Q=class extends C{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}},G=class extends C{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=P(this,t,e,0)??p)===E)return;let i=this._$AH,s=t===p&&i!==p||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==p&&(i===p||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},tt=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t)}};var Rt=k.litHtmlPolyfillSupport;Rt?.(D,z),(k.litHtmlVersions??(k.litHtmlVersions=[])).push("3.3.3");var $t=(n,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let r=e?.renderBefore??null;i._$litPart$=s=new z(t.insertBefore(R(),r),r,void 0,e??{})}return s._$AI(n),s};var L=globalThis,b=class extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=$t(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}};b._$litElement$=!0,b.finalized=!0,L.litElementHydrateSupport?.({LitElement:b});var Nt=L.litElementPolyfillSupport;Nt?.({LitElement:b});(L.litElementVersions??(L.litElementVersions=[])).push("4.2.2");var yt=n=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(n,t)}):customElements.define(n,t)};var Dt={attribute:!0,type:String,converter:M,reflect:!1,hasChanged:I},zt=(n=Dt,t,e)=>{let{kind:i,metadata:s}=e,r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),i==="setter"&&((n=Object.create(n)).wrapped=!0),r.set(e.name,n),i==="accessor"){let{name:o}=e;return{set(h){let a=t.get.call(this);t.set.call(this,h),this.requestUpdate(o,a,n,!0,h)},init(h){return h!==void 0&&this.C(o,void 0,n,h),h}}}if(i==="setter"){let{name:o}=e;return function(h){let a=this[o];t.call(this,h),this.requestUpdate(o,a,n,!0,h)}}throw Error("Unsupported decorator location: "+i)};function B(n){return(t,e)=>typeof e=="object"?zt(n,t,e):((i,s,r)=>{let o=s.hasOwnProperty(r);return s.constructor.createProperty(r,i),o?Object.getOwnPropertyDescriptor(s,r):void 0})(n,t,e)}function _(n){return B({...n,state:!0,attribute:!1})}var u=class extends b{constructor(){super(...arguments);this._images=[];this._index=0;this._loading=!1;this._error="";this._dialogOpen=!1;this._scale=1;this._offsetX=0;this._offsetY=0;this._touchStartX=0;this._touchStartY=0;this._touchStartTime=0;this._activePointers=new Map;this._pinchStartDistance=0;this._pinchStartScale=1;this._pinchStartOffsetX=0;this._pinchStartOffsetY=0;this._pinchStartMidX=0;this._pinchStartMidY=0;this._dragging=!1;this._dragStartPointerX=0;this._dragStartPointerY=0;this._dragStartOffsetX=0;this._dragStartOffsetY=0;this._showPrevious=()=>{this._images.length&&(this._index=(this._index-1+this._images.length)%this._images.length,this._resetZoom())};this._showNext=()=>{this._images.length&&(this._index=(this._index+1)%this._images.length,this._resetZoom())};this._openDialog=()=>{!this._images.length||this._loading||this._error||(this._dialogOpen=!0)};this._closeDialog=()=>{this._dialogOpen=!1,this._activePointers.clear(),this._dragging=!1};this._onViewportKeydown=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._openDialog()),e.key==="ArrowLeft"&&this._showPrevious(),e.key==="ArrowRight"&&this._showNext()};this._onSwipeStart=e=>{let i=e.changedTouches[0];i&&(this._touchStartX=i.clientX,this._touchStartY=i.clientY,this._touchStartTime=Date.now())};this._onSwipeEnd=e=>{let i=e.changedTouches[0];if(!i)return;let s=i.clientX-this._touchStartX,r=i.clientY-this._touchStartY,o=Date.now()-this._touchStartTime;Math.abs(s)>45&&Math.abs(r)<60&&o<600&&(s<0?this._showNext():this._showPrevious())};this._onOverlayPointerDown=e=>{if(e.currentTarget.setPointerCapture(e.pointerId),this._activePointers.set(e.pointerId,{x:e.clientX,y:e.clientY}),this._activePointers.size===2){let[s,r]=Array.from(this._activePointers.values());this._pinchStartDistance=this._distance(s,r),this._pinchStartScale=this._scale,this._pinchStartOffsetX=this._offsetX,this._pinchStartOffsetY=this._offsetY,this._pinchStartMidX=(s.x+r.x)/2,this._pinchStartMidY=(s.y+r.y)/2,this._dragging=!1;return}this._activePointers.size===1&&this._scale>1&&(this._dragging=!0,this._dragStartPointerX=e.clientX,this._dragStartPointerY=e.clientY,this._dragStartOffsetX=this._offsetX,this._dragStartOffsetY=this._offsetY)};this._onOverlayPointerMove=e=>{if(this._activePointers.has(e.pointerId)){if(this._activePointers.set(e.pointerId,{x:e.clientX,y:e.clientY}),this._activePointers.size===2){let[i,s]=Array.from(this._activePointers.values()),r=this._distance(i,s),o=(i.x+s.x)/2,h=(i.y+s.y)/2,a=this._clamp(this._pinchStartScale*(r/this._pinchStartDistance),1,5);this._scale=a;let c=o-this._pinchStartMidX,d=h-this._pinchStartMidY;this._offsetX=this._pinchStartOffsetX+c,this._offsetY=this._pinchStartOffsetY+d;return}this._dragging&&this._activePointers.size===1&&this._scale>1&&(this._offsetX=this._dragStartOffsetX+(e.clientX-this._dragStartPointerX),this._offsetY=this._dragStartOffsetY+(e.clientY-this._dragStartPointerY))}};this._onOverlayPointerUp=e=>{this._activePointers.delete(e.pointerId),this._activePointers.size<2&&(this._pinchStartDistance=0),this._activePointers.size===0&&(this._dragging=!1),this._scale<=1&&(this._offsetX=0,this._offsetY=0)};this._onWheelZoom=e=>{if(!this._dialogOpen)return;e.preventDefault();let s=-e.deltaY>0?1.08:.92;this._scale=this._clamp(this._scale*s,1,5),this._scale<=1.01&&(this._scale=1,this._offsetX=0,this._offsetY=0)};this._onKeyDown=e=>{if(this._dialogOpen){if(e.key==="Escape"){this._closeDialog();return}if(e.key==="ArrowLeft"){this._showPrevious();return}e.key==="ArrowRight"&&this._showNext()}};this._resetZoom=()=>{this._scale=1,this._offsetX=0,this._offsetY=0,this._activePointers.clear(),this._dragging=!1}}setConfig(e){if(!e)throw new Error("Missing config");if(e.type!=="custom:ha-imagegallery-card")throw new Error("Invalid card type. Use custom:ha-imagegallery-card");this._config={folder:"/local/snapshots",...e},this._index=0,this._loadImages(),this._restartRefreshTimer()}connectedCallback(){super.connectedCallback(),this._config&&this._restartRefreshTimer(),window.addEventListener("keydown",this._onKeyDown)}disconnectedCallback(){super.disconnectedCallback(),this._clearRefreshTimer(),window.removeEventListener("keydown",this._onKeyDown)}willUpdate(e){e.has("_dialogOpen")&&!this._dialogOpen&&this._resetZoom()}render(){if(!this._config)return w`<ha-card><div class="center">Ungultige Kartenkonfiguration</div></ha-card>`;let e=this._config.title??"Image Gallery";return w`
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
    `}_renderMainContent(){return this._loading?w`<div class="center">Bilder werden geladen...</div>`:this._error?w`<div class="center">${this._error}</div>`:this._images.length?w`<img src=${this._images[this._index]} alt="Gallery image" loading="lazy" />`:w`<div class="center">Keine Bilder gefunden</div>`}_renderDialog(){let e=this._images[this._index],i=`--s:${this._scale};--x:${this._offsetX}px;--y:${this._offsetY}px;`;return w`
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
          <img src=${e} alt="Fullscreen image" style=${i} draggable="false" />
        </div>

        <div class="overlay-bottom">
          <button class="nav" @click=${this._showPrevious} aria-label="Vorheriges Bild">&#8592;</button>
          <div>${this._index+1} / ${this._images.length}</div>
          <button class="nav" @click=${this._showNext} aria-label="Nächstes Bild">&#8594;</button>
        </div>
      </div>
    `}async _loadImages(){if(this._config){this._loading=!0,this._error="";try{let e=(this._config.images??[]).filter(s=>s&&s.trim().length>0),i=[];if(e.length>0)i=e.map(s=>this._normalizeImageUrl(s));else{let s=await this._discoverImagesFromFolder(this._config.folder??"/local/snapshots");i=s.images,!i.length&&s.reason&&(this._error=s.reason)}this._images=i,this._index>=this._images.length&&(this._index=Math.max(0,this._images.length-1))}catch(e){let i=e instanceof Error?e.message:"Unbekannter Fehler";this._error=`Bilder konnten nicht geladen werden: ${i}`,this._images=[]}finally{this._loading=!1}}}async _discoverImagesFromFolder(e){let i=this._normalizeFolder(e),s=await this._fetchIndexJson(i);if(s.length>0)return{images:s};let r=await this._fetchDirectoryListing(i);return r.length>0?{images:r}:{images:[],reason:`Keine Bilder gefunden unter ${i}. Pruefe ${i}/index.json (HTTP 200) oder setze images: [] direkt in der Karten-Konfiguration.`}}async _fetchIndexJson(e){let i=`${e}/index.json`;try{let s=await fetch(i,{cache:"no-store"});if(!s.ok)return[];let r=await s.json();return(Array.isArray(r)?r:typeof r=="object"&&r&&Array.isArray(r.images)?r.images:[]).filter(a=>typeof a=="string").filter(a=>this._isImagePath(a)).map(a=>this._resolveFolderEntry(e,a))}catch{return[]}}async _fetchDirectoryListing(e){try{let i=await fetch(`${e}/`,{cache:"no-store"});if(!i.ok)return[];let s=await i.text(),o=new DOMParser().parseFromString(s,"text/html");return Array.from(o.querySelectorAll("a")).map(c=>c.getAttribute("href")??"").filter(c=>c.length>0&&!c.startsWith("../")).filter(c=>this._isImagePath(c)).map(c=>this._resolveFolderEntry(e,c))}catch{return[]}}_isImagePath(e){let i=e.toLowerCase();return[".jpg",".jpeg",".png",".webp",".gif",".bmp"].some(s=>i.endsWith(s))}_normalizeFolder(e){let r=`/${e.trim().replace(/\\/g,"/").replace(/^\/+/,"").replace(/^config\/www\//,"local/").replace(/^www\//,"local/").replace(/^local\//,"local/")}`;return r.endsWith("/")?r.slice(0,-1):r}_normalizeImageUrl(e){let i=e.trim().replace(/\\/g,"/"),s=i.replace(/^\/+/,""),r=i;return/^config\/www\//.test(s)?r=`/${s.replace(/^config\/www\//,"local/")}`:/^www\//.test(s)?r=`/${s.replace(/^www\//,"local/")}`:/^local\//.test(s)&&(r=`/${s}`),r.replace(/\s/g,"%20")}_resolveFolderEntry(e,i){let s=i.trim();return s.startsWith("http://")||s.startsWith("https://")||s.startsWith("/")?this._normalizeImageUrl(s):this._normalizeImageUrl(`${e}/${s.replace(/^\.\//,"")}`)}_distance(e,i){let s=e.x-i.x,r=e.y-i.y;return Math.sqrt(s*s+r*r)}_clamp(e,i,s){return Math.max(i,Math.min(s,e))}_getFileName(e){let s=(e.split("?")[0]??e).split("/");return decodeURIComponent(s[s.length-1]??e)}_restartRefreshTimer(){this._clearRefreshTimer();let e=this._config?.refresh_interval;!e||e<5||(this._refreshTimer=window.setInterval(()=>{this._loadImages()},e*1e3))}_clearRefreshTimer(){this._refreshTimer&&(window.clearInterval(this._refreshTimer),this._refreshTimer=void 0)}getCardSize(){return 4}};u.styles=W`
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
  `,f([B({attribute:!1})],u.prototype,"hass",2),f([_()],u.prototype,"_config",2),f([_()],u.prototype,"_images",2),f([_()],u.prototype,"_index",2),f([_()],u.prototype,"_loading",2),f([_()],u.prototype,"_error",2),f([_()],u.prototype,"_dialogOpen",2),f([_()],u.prototype,"_scale",2),f([_()],u.prototype,"_offsetX",2),f([_()],u.prototype,"_offsetY",2),u=f([yt("ha-imagegallery-card")],u);window.customCards=window.customCards||[];window.customCards.push({type:"ha-imagegallery-card",name:"HA Image Gallery",description:"Swipe through images and open fullscreen with pinch-to-zoom preview"});export{u as HaImageGalleryCard};
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
