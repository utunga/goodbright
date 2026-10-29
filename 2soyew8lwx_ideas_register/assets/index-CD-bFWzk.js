var Ne=Object.defineProperty;var He=(n,e,t)=>e in n?Ne(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var b=(n,e,t)=>He(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();function oe(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var D=oe();function Ae(n){D=n}var N={exec:()=>null};function w(n,e=""){let t=typeof n=="string"?n:n.source;const a={replace:(s,i)=>{let c=typeof i=="string"?i:i.source;return c=c.replace(S.caret,"$1"),t=t.replace(s,c),a},getRegex:()=>new RegExp(t,e)};return a}var S={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:n=>new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}#`),htmlBeginRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}<(?:[a-z].*>|!--)`,"i")},_e=/^(?:[ \t]*(?:\n|$))+/,Oe=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Fe=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,H=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Je=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,re=/(?:[*+-]|\d{1,9}[.)])/,Se=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ie=w(Se).replace(/bull/g,re).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ue=w(Se).replace(/bull/g,re).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),le=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Ze=/^[^\n]+/,he=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Ve=w(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",he).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ke=w(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,re).getRegex(),V="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ce=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Ye=w("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ce).replace("tag",V).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ce=w(le).replace("hr",H).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",V).getRegex(),Xe=w(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ce).getRegex(),de={blockquote:Xe,code:Oe,def:Ve,fences:Fe,heading:Je,hr:H,html:Ye,lheading:Ie,list:Ke,newline:_e,paragraph:Ce,table:N,text:Ze},be=w("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",H).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",V).getRegex(),Qe={...de,lheading:Ue,table:be,paragraph:w(le).replace("hr",H).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",be).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",V).getRegex()},et={...de,html:w(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ce).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:N,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:w(le).replace("hr",H).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ie).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},tt=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,nt=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Re=/^( {2,}|\\)\n(?!\s*$)/,at=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,K=/[\p{P}\p{S}]/u,ue=/[\s\p{P}\p{S}]/u,Me=/[^\s\p{P}\p{S}]/u,st=w(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ue).getRegex(),Le=/(?!~)[\p{P}\p{S}]/u,it=/(?!~)[\s\p{P}\p{S}]/u,ot=/(?:[^\s\p{P}\p{S}]|~)/u,rt=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,$e=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,lt=w($e,"u").replace(/punct/g,K).getRegex(),ht=w($e,"u").replace(/punct/g,Le).getRegex(),Pe="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",ct=w(Pe,"gu").replace(/notPunctSpace/g,Me).replace(/punctSpace/g,ue).replace(/punct/g,K).getRegex(),dt=w(Pe,"gu").replace(/notPunctSpace/g,ot).replace(/punctSpace/g,it).replace(/punct/g,Le).getRegex(),ut=w("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Me).replace(/punctSpace/g,ue).replace(/punct/g,K).getRegex(),gt=w(/\\(punct)/,"gu").replace(/punct/g,K).getRegex(),pt=w(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),mt=w(ce).replace("(?:-->|$)","-->").getRegex(),ft=w("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",mt).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),J=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,wt=w(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",J).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ze=w(/^!?\[(label)\]\[(ref)\]/).replace("label",J).replace("ref",he).getRegex(),Be=w(/^!?\[(ref)\](?:\[\])?/).replace("ref",he).getRegex(),yt=w("reflink|nolink(?!\\()","g").replace("reflink",ze).replace("nolink",Be).getRegex(),ge={_backpedal:N,anyPunctuation:gt,autolink:pt,blockSkip:rt,br:Re,code:nt,del:N,emStrongLDelim:lt,emStrongRDelimAst:ct,emStrongRDelimUnd:ut,escape:tt,link:wt,nolink:Be,punctuation:st,reflink:ze,reflinkSearch:yt,tag:ft,text:at,url:N},bt={...ge,link:w(/^!?\[(label)\]\((.*?)\)/).replace("label",J).getRegex(),reflink:w(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",J).getRegex()},ae={...ge,emStrongRDelimAst:dt,emStrongLDelim:ht,url:w(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},kt={...ae,br:w(Re).replace("{2,}","*").getRegex(),text:w(ae.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},O={normal:de,gfm:Qe,pedantic:et},G={normal:ge,gfm:ae,breaks:kt,pedantic:bt},vt={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ke=n=>vt[n];function C(n,e){if(e){if(S.escapeTest.test(n))return n.replace(S.escapeReplace,ke)}else if(S.escapeTestNoEncode.test(n))return n.replace(S.escapeReplaceNoEncode,ke);return n}function ve(n){try{n=encodeURI(n).replace(S.percentDecode,"%")}catch{return null}return n}function xe(n,e){var i;const t=n.replace(S.findPipe,(c,o,l)=>{let r=!1,h=o;for(;--h>=0&&l[h]==="\\";)r=!r;return r?"|":" |"}),a=t.split(S.splitPipe);let s=0;if(a[0].trim()||a.shift(),a.length>0&&!((i=a.at(-1))!=null&&i.trim())&&a.pop(),e)if(a.length>e)a.splice(e);else for(;a.length<e;)a.push("");for(;s<a.length;s++)a[s]=a[s].trim().replace(S.slashPipe,"|");return a}function W(n,e,t){const a=n.length;if(a===0)return"";let s=0;for(;s<a&&n.charAt(a-s-1)===e;)s++;return n.slice(0,a-s)}function xt(n,e){if(n.indexOf(e[1])===-1)return-1;let t=0;for(let a=0;a<n.length;a++)if(n[a]==="\\")a++;else if(n[a]===e[0])t++;else if(n[a]===e[1]&&(t--,t<0))return a;return t>0?-2:-1}function Te(n,e,t,a,s){const i=e.href,c=e.title||null,o=n[1].replace(s.other.outputLinkReplace,"$1");a.state.inLink=!0;const l={type:n[0].charAt(0)==="!"?"image":"link",raw:t,href:i,title:c,text:o,tokens:a.inlineTokens(o)};return a.state.inLink=!1,l}function Tt(n,e,t){const a=n.match(t.other.indentCodeCompensation);if(a===null)return e;const s=a[1];return e.split(`
`).map(i=>{const c=i.match(t.other.beginningSpace);if(c===null)return i;const[o]=c;return o.length>=s.length?i.slice(s.length):i}).join(`
`)}var U=class{constructor(n){b(this,"options");b(this,"rules");b(this,"lexer");this.options=n||D}space(n){const e=this.rules.block.newline.exec(n);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(n){const e=this.rules.block.code.exec(n);if(e){const t=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?t:W(t,`
`)}}}fences(n){const e=this.rules.block.fences.exec(n);if(e){const t=e[0],a=Tt(t,e[3]||"",this.rules);return{type:"code",raw:t,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:a}}}heading(n){const e=this.rules.block.heading.exec(n);if(e){let t=e[2].trim();if(this.rules.other.endingHash.test(t)){const a=W(t,"#");(this.options.pedantic||!a||this.rules.other.endingSpaceChar.test(a))&&(t=a.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:t,tokens:this.lexer.inline(t)}}}hr(n){const e=this.rules.block.hr.exec(n);if(e)return{type:"hr",raw:W(e[0],`
`)}}blockquote(n){const e=this.rules.block.blockquote.exec(n);if(e){let t=W(e[0],`
`).split(`
`),a="",s="";const i=[];for(;t.length>0;){let c=!1;const o=[];let l;for(l=0;l<t.length;l++)if(this.rules.other.blockquoteStart.test(t[l]))o.push(t[l]),c=!0;else if(!c)o.push(t[l]);else break;t=t.slice(l);const r=o.join(`
`),h=r.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");a=a?`${a}
${r}`:r,s=s?`${s}
${h}`:h;const y=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(h,i,!0),this.lexer.state.top=y,t.length===0)break;const u=i.at(-1);if((u==null?void 0:u.type)==="code")break;if((u==null?void 0:u.type)==="blockquote"){const k=u,p=k.raw+`
`+t.join(`
`),x=this.blockquote(p);i[i.length-1]=x,a=a.substring(0,a.length-k.raw.length)+x.raw,s=s.substring(0,s.length-k.text.length)+x.text;break}else if((u==null?void 0:u.type)==="list"){const k=u,p=k.raw+`
`+t.join(`
`),x=this.list(p);i[i.length-1]=x,a=a.substring(0,a.length-u.raw.length)+x.raw,s=s.substring(0,s.length-k.raw.length)+x.raw,t=p.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:a,tokens:i,text:s}}}list(n){let e=this.rules.block.list.exec(n);if(e){let t=e[1].trim();const a=t.length>1,s={type:"list",raw:"",ordered:a,start:a?+t.slice(0,-1):"",loose:!1,items:[]};t=a?`\\d{1,9}\\${t.slice(-1)}`:`\\${t}`,this.options.pedantic&&(t=a?t:"[*+-]");const i=this.rules.other.listItemRegex(t);let c=!1;for(;n;){let l=!1,r="",h="";if(!(e=i.exec(n))||this.rules.block.hr.test(n))break;r=e[0],n=n.substring(r.length);let y=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,E=>" ".repeat(3*E.length)),u=n.split(`
`,1)[0],k=!y.trim(),p=0;if(this.options.pedantic?(p=2,h=y.trimStart()):k?p=e[1].length+1:(p=e[2].search(this.rules.other.nonSpaceChar),p=p>4?1:p,h=y.slice(p),p+=e[1].length),k&&this.rules.other.blankLine.test(u)&&(r+=u+`
`,n=n.substring(u.length+1),l=!0),!l){const E=this.rules.other.nextBulletRegex(p),_=this.rules.other.hrRegex(p),R=this.rules.other.fencesBeginRegex(p),M=this.rules.other.headingBeginRegex(p),Y=this.rules.other.htmlBeginRegex(p);for(;n;){const P=n.split(`
`,1)[0];let z;if(u=P,this.options.pedantic?(u=u.replace(this.rules.other.listReplaceNesting,"  "),z=u):z=u.replace(this.rules.other.tabCharGlobal,"    "),R.test(u)||M.test(u)||Y.test(u)||E.test(u)||_.test(u))break;if(z.search(this.rules.other.nonSpaceChar)>=p||!u.trim())h+=`
`+z.slice(p);else{if(k||y.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||R.test(y)||M.test(y)||_.test(y))break;h+=`
`+u}!k&&!u.trim()&&(k=!0),r+=P+`
`,n=n.substring(P.length+1),y=z.slice(p)}}s.loose||(c?s.loose=!0:this.rules.other.doubleBlankLine.test(r)&&(c=!0));let x=null,q;this.options.gfm&&(x=this.rules.other.listIsTask.exec(h),x&&(q=x[0]!=="[ ] ",h=h.replace(this.rules.other.listReplaceTask,""))),s.items.push({type:"list_item",raw:r,task:!!x,checked:q,loose:!1,text:h,tokens:[]}),s.raw+=r}const o=s.items.at(-1);if(o)o.raw=o.raw.trimEnd(),o.text=o.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l=0;l<s.items.length;l++)if(this.lexer.state.top=!1,s.items[l].tokens=this.lexer.blockTokens(s.items[l].text,[]),!s.loose){const r=s.items[l].tokens.filter(y=>y.type==="space"),h=r.length>0&&r.some(y=>this.rules.other.anyLine.test(y.raw));s.loose=h}if(s.loose)for(let l=0;l<s.items.length;l++)s.items[l].loose=!0;return s}}html(n){const e=this.rules.block.html.exec(n);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(n){const e=this.rules.block.def.exec(n);if(e){const t=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),a=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:t,raw:e[0],href:a,title:s}}}table(n){var c;const e=this.rules.block.table.exec(n);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;const t=xe(e[1]),a=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(c=e[3])!=null&&c.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:e[0],header:[],align:[],rows:[]};if(t.length===a.length){for(const o of a)this.rules.other.tableAlignRight.test(o)?i.align.push("right"):this.rules.other.tableAlignCenter.test(o)?i.align.push("center"):this.rules.other.tableAlignLeft.test(o)?i.align.push("left"):i.align.push(null);for(let o=0;o<t.length;o++)i.header.push({text:t[o],tokens:this.lexer.inline(t[o]),header:!0,align:i.align[o]});for(const o of s)i.rows.push(xe(o,i.header.length).map((l,r)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[r]})));return i}}lheading(n){const e=this.rules.block.lheading.exec(n);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(n){const e=this.rules.block.paragraph.exec(n);if(e){const t=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:t,tokens:this.lexer.inline(t)}}}text(n){const e=this.rules.block.text.exec(n);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(n){const e=this.rules.inline.escape.exec(n);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(n){const e=this.rules.inline.tag.exec(n);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(n){const e=this.rules.inline.link.exec(n);if(e){const t=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(t)){if(!this.rules.other.endAngleBracket.test(t))return;const i=W(t.slice(0,-1),"\\");if((t.length-i.length)%2===0)return}else{const i=xt(e[2],"()");if(i===-2)return;if(i>-1){const o=(e[0].indexOf("!")===0?5:4)+e[1].length+i;e[2]=e[2].substring(0,i),e[0]=e[0].substring(0,o).trim(),e[3]=""}}let a=e[2],s="";if(this.options.pedantic){const i=this.rules.other.pedanticHrefTitle.exec(a);i&&(a=i[1],s=i[3])}else s=e[3]?e[3].slice(1,-1):"";return a=a.trim(),this.rules.other.startAngleBracket.test(a)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(t)?a=a.slice(1):a=a.slice(1,-1)),Te(e,{href:a&&a.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(n,e){let t;if((t=this.rules.inline.reflink.exec(n))||(t=this.rules.inline.nolink.exec(n))){const a=(t[2]||t[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[a.toLowerCase()];if(!s){const i=t[0].charAt(0);return{type:"text",raw:i,text:i}}return Te(t,s,t[0],this.lexer,this.rules)}}emStrong(n,e,t=""){let a=this.rules.inline.emStrongLDelim.exec(n);if(!a||a[3]&&t.match(this.rules.other.unicodeAlphaNumeric))return;if(!(a[1]||a[2]||"")||!t||this.rules.inline.punctuation.exec(t)){const i=[...a[0]].length-1;let c,o,l=i,r=0;const h=a[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(h.lastIndex=0,e=e.slice(-1*n.length+i);(a=h.exec(e))!=null;){if(c=a[1]||a[2]||a[3]||a[4]||a[5]||a[6],!c)continue;if(o=[...c].length,a[3]||a[4]){l+=o;continue}else if((a[5]||a[6])&&i%3&&!((i+o)%3)){r+=o;continue}if(l-=o,l>0)continue;o=Math.min(o,o+l+r);const y=[...a[0]][0].length,u=n.slice(0,i+a.index+y+o);if(Math.min(i,o)%2){const p=u.slice(1,-1);return{type:"em",raw:u,text:p,tokens:this.lexer.inlineTokens(p)}}const k=u.slice(2,-2);return{type:"strong",raw:u,text:k,tokens:this.lexer.inlineTokens(k)}}}}codespan(n){const e=this.rules.inline.code.exec(n);if(e){let t=e[2].replace(this.rules.other.newLineCharGlobal," ");const a=this.rules.other.nonSpaceChar.test(t),s=this.rules.other.startingSpaceChar.test(t)&&this.rules.other.endingSpaceChar.test(t);return a&&s&&(t=t.substring(1,t.length-1)),{type:"codespan",raw:e[0],text:t}}}br(n){const e=this.rules.inline.br.exec(n);if(e)return{type:"br",raw:e[0]}}del(n){const e=this.rules.inline.del.exec(n);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(n){const e=this.rules.inline.autolink.exec(n);if(e){let t,a;return e[2]==="@"?(t=e[1],a="mailto:"+t):(t=e[1],a=t),{type:"link",raw:e[0],text:t,href:a,tokens:[{type:"text",raw:t,text:t}]}}}url(n){var t;let e;if(e=this.rules.inline.url.exec(n)){let a,s;if(e[2]==="@")a=e[0],s="mailto:"+a;else{let i;do i=e[0],e[0]=((t=this.rules.inline._backpedal.exec(e[0]))==null?void 0:t[0])??"";while(i!==e[0]);a=e[0],e[1]==="www."?s="http://"+e[0]:s=e[0]}return{type:"link",raw:e[0],text:a,href:s,tokens:[{type:"text",raw:a,text:a}]}}}inlineText(n){const e=this.rules.inline.text.exec(n);if(e){const t=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:t}}}},L=class se{constructor(e){b(this,"tokens");b(this,"options");b(this,"state");b(this,"tokenizer");b(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||D,this.options.tokenizer=this.options.tokenizer||new U,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={other:S,block:O.normal,inline:G.normal};this.options.pedantic?(t.block=O.pedantic,t.inline=G.pedantic):this.options.gfm&&(t.block=O.gfm,this.options.breaks?t.inline=G.breaks:t.inline=G.gfm),this.tokenizer.rules=t}static get rules(){return{block:O,inline:G}}static lex(e,t){return new se(t).lex(e)}static lexInline(e,t){return new se(t).inlineTokens(e)}lex(e){e=e.replace(S.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){const a=this.inlineQueue[t];this.inlineTokens(a.src,a.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],a=!1){var s,i,c;for(this.options.pedantic&&(e=e.replace(S.tabCharGlobal,"    ").replace(S.spaceLine,""));e;){let o;if((i=(s=this.options.extensions)==null?void 0:s.block)!=null&&i.some(r=>(o=r.call({lexer:this},e,t))?(e=e.substring(o.raw.length),t.push(o),!0):!1))continue;if(o=this.tokenizer.space(e)){e=e.substring(o.raw.length);const r=t.at(-1);o.raw.length===1&&r!==void 0?r.raw+=`
`:t.push(o);continue}if(o=this.tokenizer.code(e)){e=e.substring(o.raw.length);const r=t.at(-1);(r==null?void 0:r.type)==="paragraph"||(r==null?void 0:r.type)==="text"?(r.raw+=`
`+o.raw,r.text+=`
`+o.text,this.inlineQueue.at(-1).src=r.text):t.push(o);continue}if(o=this.tokenizer.fences(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.heading(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.hr(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.blockquote(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.list(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.html(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.def(e)){e=e.substring(o.raw.length);const r=t.at(-1);(r==null?void 0:r.type)==="paragraph"||(r==null?void 0:r.type)==="text"?(r.raw+=`
`+o.raw,r.text+=`
`+o.raw,this.inlineQueue.at(-1).src=r.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title});continue}if(o=this.tokenizer.table(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.lheading(e)){e=e.substring(o.raw.length),t.push(o);continue}let l=e;if((c=this.options.extensions)!=null&&c.startBlock){let r=1/0;const h=e.slice(1);let y;this.options.extensions.startBlock.forEach(u=>{y=u.call({lexer:this},h),typeof y=="number"&&y>=0&&(r=Math.min(r,y))}),r<1/0&&r>=0&&(l=e.substring(0,r+1))}if(this.state.top&&(o=this.tokenizer.paragraph(l))){const r=t.at(-1);a&&(r==null?void 0:r.type)==="paragraph"?(r.raw+=`
`+o.raw,r.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=r.text):t.push(o),a=l.length!==e.length,e=e.substring(o.raw.length);continue}if(o=this.tokenizer.text(e)){e=e.substring(o.raw.length);const r=t.at(-1);(r==null?void 0:r.type)==="text"?(r.raw+=`
`+o.raw,r.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=r.text):t.push(o);continue}if(e){const r="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(r);break}else throw new Error(r)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){var o,l,r;let a=e,s=null;if(this.tokens.links){const h=Object.keys(this.tokens.links);if(h.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(a))!=null;)h.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(a=a.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(a))!=null;)a=a.slice(0,s.index)+"++"+a.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(s=this.tokenizer.rules.inline.blockSkip.exec(a))!=null;)a=a.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let i=!1,c="";for(;e;){i||(c=""),i=!1;let h;if((l=(o=this.options.extensions)==null?void 0:o.inline)!=null&&l.some(u=>(h=u.call({lexer:this},e,t))?(e=e.substring(h.raw.length),t.push(h),!0):!1))continue;if(h=this.tokenizer.escape(e)){e=e.substring(h.raw.length),t.push(h);continue}if(h=this.tokenizer.tag(e)){e=e.substring(h.raw.length),t.push(h);continue}if(h=this.tokenizer.link(e)){e=e.substring(h.raw.length),t.push(h);continue}if(h=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(h.raw.length);const u=t.at(-1);h.type==="text"&&(u==null?void 0:u.type)==="text"?(u.raw+=h.raw,u.text+=h.text):t.push(h);continue}if(h=this.tokenizer.emStrong(e,a,c)){e=e.substring(h.raw.length),t.push(h);continue}if(h=this.tokenizer.codespan(e)){e=e.substring(h.raw.length),t.push(h);continue}if(h=this.tokenizer.br(e)){e=e.substring(h.raw.length),t.push(h);continue}if(h=this.tokenizer.del(e)){e=e.substring(h.raw.length),t.push(h);continue}if(h=this.tokenizer.autolink(e)){e=e.substring(h.raw.length),t.push(h);continue}if(!this.state.inLink&&(h=this.tokenizer.url(e))){e=e.substring(h.raw.length),t.push(h);continue}let y=e;if((r=this.options.extensions)!=null&&r.startInline){let u=1/0;const k=e.slice(1);let p;this.options.extensions.startInline.forEach(x=>{p=x.call({lexer:this},k),typeof p=="number"&&p>=0&&(u=Math.min(u,p))}),u<1/0&&u>=0&&(y=e.substring(0,u+1))}if(h=this.tokenizer.inlineText(y)){e=e.substring(h.raw.length),h.raw.slice(-1)!=="_"&&(c=h.raw.slice(-1)),i=!0;const u=t.at(-1);(u==null?void 0:u.type)==="text"?(u.raw+=h.raw,u.text+=h.text):t.push(h);continue}if(e){const u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return t}},Z=class{constructor(n){b(this,"options");b(this,"parser");this.options=n||D}space(n){return""}code({text:n,lang:e,escaped:t}){var i;const a=(i=(e||"").match(S.notSpaceStart))==null?void 0:i[0],s=n.replace(S.endingNewline,"")+`
`;return a?'<pre><code class="language-'+C(a)+'">'+(t?s:C(s,!0))+`</code></pre>
`:"<pre><code>"+(t?s:C(s,!0))+`</code></pre>
`}blockquote({tokens:n}){return`<blockquote>
${this.parser.parse(n)}</blockquote>
`}html({text:n}){return n}heading({tokens:n,depth:e}){return`<h${e}>${this.parser.parseInline(n)}</h${e}>
`}hr(n){return`<hr>
`}list(n){const e=n.ordered,t=n.start;let a="";for(let c=0;c<n.items.length;c++){const o=n.items[c];a+=this.listitem(o)}const s=e?"ol":"ul",i=e&&t!==1?' start="'+t+'"':"";return"<"+s+i+`>
`+a+"</"+s+`>
`}listitem(n){var t;let e="";if(n.task){const a=this.checkbox({checked:!!n.checked});n.loose?((t=n.tokens[0])==null?void 0:t.type)==="paragraph"?(n.tokens[0].text=a+" "+n.tokens[0].text,n.tokens[0].tokens&&n.tokens[0].tokens.length>0&&n.tokens[0].tokens[0].type==="text"&&(n.tokens[0].tokens[0].text=a+" "+C(n.tokens[0].tokens[0].text),n.tokens[0].tokens[0].escaped=!0)):n.tokens.unshift({type:"text",raw:a+" ",text:a+" ",escaped:!0}):e+=a+" "}return e+=this.parser.parse(n.tokens,!!n.loose),`<li>${e}</li>
`}checkbox({checked:n}){return"<input "+(n?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:n}){return`<p>${this.parser.parseInline(n)}</p>
`}table(n){let e="",t="";for(let s=0;s<n.header.length;s++)t+=this.tablecell(n.header[s]);e+=this.tablerow({text:t});let a="";for(let s=0;s<n.rows.length;s++){const i=n.rows[s];t="";for(let c=0;c<i.length;c++)t+=this.tablecell(i[c]);a+=this.tablerow({text:t})}return a&&(a=`<tbody>${a}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+a+`</table>
`}tablerow({text:n}){return`<tr>
${n}</tr>
`}tablecell(n){const e=this.parser.parseInline(n.tokens),t=n.header?"th":"td";return(n.align?`<${t} align="${n.align}">`:`<${t}>`)+e+`</${t}>
`}strong({tokens:n}){return`<strong>${this.parser.parseInline(n)}</strong>`}em({tokens:n}){return`<em>${this.parser.parseInline(n)}</em>`}codespan({text:n}){return`<code>${C(n,!0)}</code>`}br(n){return"<br>"}del({tokens:n}){return`<del>${this.parser.parseInline(n)}</del>`}link({href:n,title:e,tokens:t}){const a=this.parser.parseInline(t),s=ve(n);if(s===null)return a;n=s;let i='<a href="'+n+'"';return e&&(i+=' title="'+C(e)+'"'),i+=">"+a+"</a>",i}image({href:n,title:e,text:t,tokens:a}){a&&(t=this.parser.parseInline(a,this.parser.textRenderer));const s=ve(n);if(s===null)return C(t);n=s;let i=`<img src="${n}" alt="${t}"`;return e&&(i+=` title="${C(e)}"`),i+=">",i}text(n){return"tokens"in n&&n.tokens?this.parser.parseInline(n.tokens):"escaped"in n&&n.escaped?n.text:C(n.text)}},pe=class{strong({text:n}){return n}em({text:n}){return n}codespan({text:n}){return n}del({text:n}){return n}html({text:n}){return n}text({text:n}){return n}link({text:n}){return""+n}image({text:n}){return""+n}br(){return""}},$=class ie{constructor(e){b(this,"options");b(this,"renderer");b(this,"textRenderer");this.options=e||D,this.options.renderer=this.options.renderer||new Z,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new pe}static parse(e,t){return new ie(t).parse(e)}static parseInline(e,t){return new ie(t).parseInline(e)}parse(e,t=!0){var s,i;let a="";for(let c=0;c<e.length;c++){const o=e[c];if((i=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&i[o.type]){const r=o,h=this.options.extensions.renderers[r.type].call({parser:this},r);if(h!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(r.type)){a+=h||"";continue}}const l=o;switch(l.type){case"space":{a+=this.renderer.space(l);continue}case"hr":{a+=this.renderer.hr(l);continue}case"heading":{a+=this.renderer.heading(l);continue}case"code":{a+=this.renderer.code(l);continue}case"table":{a+=this.renderer.table(l);continue}case"blockquote":{a+=this.renderer.blockquote(l);continue}case"list":{a+=this.renderer.list(l);continue}case"html":{a+=this.renderer.html(l);continue}case"paragraph":{a+=this.renderer.paragraph(l);continue}case"text":{let r=l,h=this.renderer.text(r);for(;c+1<e.length&&e[c+1].type==="text";)r=e[++c],h+=`
`+this.renderer.text(r);t?a+=this.renderer.paragraph({type:"paragraph",raw:h,text:h,tokens:[{type:"text",raw:h,text:h,escaped:!0}]}):a+=h;continue}default:{const r='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(r),"";throw new Error(r)}}}return a}parseInline(e,t=this.renderer){var s,i;let a="";for(let c=0;c<e.length;c++){const o=e[c];if((i=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&i[o.type]){const r=this.options.extensions.renderers[o.type].call({parser:this},o);if(r!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){a+=r||"";continue}}const l=o;switch(l.type){case"escape":{a+=t.text(l);break}case"html":{a+=t.html(l);break}case"link":{a+=t.link(l);break}case"image":{a+=t.image(l);break}case"strong":{a+=t.strong(l);break}case"em":{a+=t.em(l);break}case"codespan":{a+=t.codespan(l);break}case"br":{a+=t.br(l);break}case"del":{a+=t.del(l);break}case"text":{a+=t.text(l);break}default:{const r='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(r),"";throw new Error(r)}}}return a}},ne,F=(ne=class{constructor(n){b(this,"options");b(this,"block");this.options=n||D}preprocess(n){return n}postprocess(n){return n}processAllTokens(n){return n}provideLexer(){return this.block?L.lex:L.lexInline}provideParser(){return this.block?$.parse:$.parseInline}},b(ne,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),ne),At=class{constructor(...n){b(this,"defaults",oe());b(this,"options",this.setOptions);b(this,"parse",this.parseMarkdown(!0));b(this,"parseInline",this.parseMarkdown(!1));b(this,"Parser",$);b(this,"Renderer",Z);b(this,"TextRenderer",pe);b(this,"Lexer",L);b(this,"Tokenizer",U);b(this,"Hooks",F);this.use(...n)}walkTokens(n,e){var a,s;let t=[];for(const i of n)switch(t=t.concat(e.call(this,i)),i.type){case"table":{const c=i;for(const o of c.header)t=t.concat(this.walkTokens(o.tokens,e));for(const o of c.rows)for(const l of o)t=t.concat(this.walkTokens(l.tokens,e));break}case"list":{const c=i;t=t.concat(this.walkTokens(c.items,e));break}default:{const c=i;(s=(a=this.defaults.extensions)==null?void 0:a.childTokens)!=null&&s[c.type]?this.defaults.extensions.childTokens[c.type].forEach(o=>{const l=c[o].flat(1/0);t=t.concat(this.walkTokens(l,e))}):c.tokens&&(t=t.concat(this.walkTokens(c.tokens,e)))}}return t}use(...n){const e=this.defaults.extensions||{renderers:{},childTokens:{}};return n.forEach(t=>{const a={...t};if(a.async=this.defaults.async||a.async||!1,t.extensions&&(t.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){const i=e.renderers[s.name];i?e.renderers[s.name]=function(...c){let o=s.renderer.apply(this,c);return o===!1&&(o=i.apply(this,c)),o}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const i=e[s.level];i?i.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),a.extensions=e),t.renderer){const s=this.defaults.renderer||new Z(this.defaults);for(const i in t.renderer){if(!(i in s))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;const c=i,o=t.renderer[c],l=s[c];s[c]=(...r)=>{let h=o.apply(s,r);return h===!1&&(h=l.apply(s,r)),h||""}}a.renderer=s}if(t.tokenizer){const s=this.defaults.tokenizer||new U(this.defaults);for(const i in t.tokenizer){if(!(i in s))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;const c=i,o=t.tokenizer[c],l=s[c];s[c]=(...r)=>{let h=o.apply(s,r);return h===!1&&(h=l.apply(s,r)),h}}a.tokenizer=s}if(t.hooks){const s=this.defaults.hooks||new F;for(const i in t.hooks){if(!(i in s))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;const c=i,o=t.hooks[c],l=s[c];F.passThroughHooks.has(i)?s[c]=r=>{if(this.defaults.async)return Promise.resolve(o.call(s,r)).then(y=>l.call(s,y));const h=o.call(s,r);return l.call(s,h)}:s[c]=(...r)=>{let h=o.apply(s,r);return h===!1&&(h=l.apply(s,r)),h}}a.hooks=s}if(t.walkTokens){const s=this.defaults.walkTokens,i=t.walkTokens;a.walkTokens=function(c){let o=[];return o.push(i.call(this,c)),s&&(o=o.concat(s.call(this,c))),o}}this.defaults={...this.defaults,...a}}),this}setOptions(n){return this.defaults={...this.defaults,...n},this}lexer(n,e){return L.lex(n,e??this.defaults)}parser(n,e){return $.parse(n,e??this.defaults)}parseMarkdown(n){return(t,a)=>{const s={...a},i={...this.defaults,...s},c=this.onError(!!i.silent,!!i.async);if(this.defaults.async===!0&&s.async===!1)return c(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return c(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return c(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));i.hooks&&(i.hooks.options=i,i.hooks.block=n);const o=i.hooks?i.hooks.provideLexer():n?L.lex:L.lexInline,l=i.hooks?i.hooks.provideParser():n?$.parse:$.parseInline;if(i.async)return Promise.resolve(i.hooks?i.hooks.preprocess(t):t).then(r=>o(r,i)).then(r=>i.hooks?i.hooks.processAllTokens(r):r).then(r=>i.walkTokens?Promise.all(this.walkTokens(r,i.walkTokens)).then(()=>r):r).then(r=>l(r,i)).then(r=>i.hooks?i.hooks.postprocess(r):r).catch(c);try{i.hooks&&(t=i.hooks.preprocess(t));let r=o(t,i);i.hooks&&(r=i.hooks.processAllTokens(r)),i.walkTokens&&this.walkTokens(r,i.walkTokens);let h=l(r,i);return i.hooks&&(h=i.hooks.postprocess(h)),h}catch(r){return c(r)}}}onError(n,e){return t=>{if(t.message+=`
Please report this to https://github.com/markedjs/marked.`,n){const a="<p>An error occurred:</p><pre>"+C(t.message+"",!0)+"</pre>";return e?Promise.resolve(a):a}if(e)return Promise.reject(t);throw t}}},B=new At;function f(n,e){return B.parse(n,e)}f.options=f.setOptions=function(n){return B.setOptions(n),f.defaults=B.defaults,Ae(f.defaults),f};f.getDefaults=oe;f.defaults=D;f.use=function(...n){return B.use(...n),f.defaults=B.defaults,Ae(f.defaults),f};f.walkTokens=function(n,e){return B.walkTokens(n,e)};f.parseInline=B.parseInline;f.Parser=$;f.parser=$.parse;f.Renderer=Z;f.TextRenderer=pe;f.Lexer=L;f.lexer=L.lex;f.Tokenizer=U;f.Hooks=F;f.parse=f;f.options;f.setOptions;f.use;f.walkTokens;f.parseInline;$.parse;L.lex;const St={compiled:"2026-10-29T06:16:23.695Z",config:{siteUrl:"https://goodbright.nz/2soyew8lwx_ideas_register",title:"Idea Register"},home:`Ideas from Miles, filed for the benefit of [Cyborg Garden](https://cyborg.garden) and friends. All these ideas are shared under the [FriendDA license](https://friendda.org/) - please don't share without asking Miles first.

Open any file below, or follow a classification to see the ideas that share it. Frank and honest feedback much appreciated all these ideas need work (some more than others).`,funding:`# Funding sources (reference for idea threads)

Checked 29 October 2026. Amounts are in US dollars. Re-check the source pages before applying, as details change.

## BlueDot Impact Rapid Grants

- **Link:** https://bluedot.org/grants/rapid
- **What it funds:** AI safety or biosecurity work, from exploring a direction through to a concrete project. That covers research and learning (time, living costs, research access), projects and experiments (compute, tools, testing an idea), events and community (meetups, venues), and travel and collaboration (conferences, fieldwork). "Wildcards welcome. If in doubt, apply."
- **Amount:** up to $20,000, paid as a single lump sum through a claims portal once checks are done. Transfer and exchange fees may reduce what arrives. In practice many past grants were a few hundred dollars for compute or API credits, and examples ranged from $1k to $8k (EA Forum post, when the cap was $10k).
- **Eligibility:** open to anyone taking "a promising next step in AI safety or biosecurity". BlueDot course participation is not required, but participants, alumni, facilitators and active AI safety community members are more likely to be funded. Some countries are excluded (e.g. China, India, Iran, Russia); New Zealand is not on the excluded list.
- **Deadline:** none listed. Applications are rolling.
- **Turnaround:** the page gives no figure. BlueDot has previously said it aims for about five working days, and it may hold a short call for grants over $5,000.
- **Application:** step one is "tell us your plan and budget", which is about 15 minutes of work. Reviewers look for "a worthwhile direction, evidence you can make progress, and a clear role for funding". If you are unsure about eligibility, contact them first: https://bluedot.org/contact
- **Not funded:** party-political activity, anything unlawful in the UK or locally, and anything outside BlueDot's charitable or educational purposes.
- **Obligations:** use the funds for the agreed purpose, get written approval before any material change, and send a short completion report within 60 days of finishing.
- **Fit:** suits small, quick experiments with a clear AI safety angle, such as agent preferences or welfare research, interpretability of local models, and compute for evals. Each pitch should name the safety question directly.

## Mozilla Foundation, Human-Scale AI Incubator (Studio)

- **Links:** call for proposals at https://www.mozillafoundation.org/en/what-we-do/grantmaking/incubator/human-scale-ai/call-for-proposals/ ; application form at https://mozillafoundation.tfaforms.net/w/humanscaleai (short link mzl.la/4zNrcq2)
- **What it funds:** a cohort of seven projects building small, bespoke technology around specific human needs, especially needs that are too local or too easily overlooked for the market. Three anchor projects (Tiles, DAIR, Family Intelligence) are already chosen, which leaves **four open places**. The three principles are **Small** (efficient models, compute and hardware), **Intentional** (users and communities control their data and governance) and **Tailored** (shaped by a specific people, problem and context). Mozilla calls the goal "product-community fit".
- **Stage:** projects must **already be working and deployed** with the people they serve, even if only as a small pilot. Concept-only projects are effectively out of scope.
- **Amount:** up to $500,000 per project over three years, with no equity taken. Phase one is $300,000 plus 12 months of coaching, technical and community support. Projects that show strong progress can receive a further $200,000 and two more years of support.
- **Deadline:** **Friday 20 November 2026, 11:59 pm Pacific** (about 8:59 pm Saturday 21 November in NZ). Support starts in **April 2027**, and applicants must commit to the full 12-month cohort.
- **Eligibility:** individuals, nonprofits, fiscally sponsored projects, for-profits and governmental units can all apply. You must be legally able to receive Mozilla Foundation grants. Some countries are ineligible, but the list is applied through the form's country dropdown and it could not be confirmed whether **New Zealand is eligible**. A project must also serve a charitable purpose and create public benefit.
- **The form asks for:** title and summary; which principles apply; stage; traction signals and user count; outputs; accessibility; **whether core functionality depends on a frontier model API**; **the largest model parameter count** (bands run from 10B or fewer up to more than 40B, which suggests small and local models are favoured); public benefit; and how you will work in the open. The narrative sections cover the technology and how it fits the theme, Small, Intentional, Tailored, traction, blockers, team, success at 12 and 36 months, sustainability, what $300k would unlock, openness, novel approaches, a repo or demo link, and an optional 2-minute video. AI use must be disclosed and kept to supporting work, and heavily AI-written applications may get extra scrutiny.
- **Fit:** strongest for Runtime Governance and local "free range" hosting, and for NimbleCo/Swarm Map as client-owned local-model infrastructure, if it can be framed around a specific community with a running deployment. Note that the application itself must not be mostly AI-written.

## Sources
- https://bluedot.org/grants/rapid
- https://forum.effectivealtruism.org/posts/9AxDSiEsTabyBp3yi/we-ve-given-out-usd50-000-in-rapid-grants-now-we-want-to
- https://mozillafoundation.tfaforms.net/w/humanscaleai
- https://www.einpresswire.com/article/951754263/mozilla-foundation-opens-funding-call-for-ai-built-around-communities
- The Mozilla call page itself blocked automated fetching, so the details above come from the application form and the press release.
`,tags:[{slug:"research",name:"Research",blurb:'Research questions rather than products. Contemplating pitching some of these for a [BlueDot Impact Rapid Grant](https://bluedot.org/grants/rapid) (up to $20k) Some research areas might develop into larger "seed grant" level ideas but generally these should be small, quick experiments with a clear AI safety benefit, such as model welfare, introspection, interpretability or agent reliability,'},{slug:"mozilla",name:"Mozilla Human Scale AI grant",blurb:"Ideas that could suit the Mozilla Foundation's Human Scale AI Incubator: up to US$500,000 over three years for small, intentional, tailored technology built around a specific community's needs, favouring small local models and community control of data. Projects need to be running with real users, and applications close on 20 November 2026. Details: https://www.mozillafoundation.org/en/what-we-do/grantmaking/incubator/human-scale-ai/call-for-proposals/"},{slug:"training",name:"Training required",blurb:"Ideas that need serious training compute, beyond what a laptop or a Mac Studio can do. This can be done using cloud compute but there is also a B300 server in Wellington and a potential hook up that might allow us to use it (for a fee) for certain projects. Some of these ideas are quite ambitious but the reason for the tag is that they involve fine-tuning or training."},{slug:"commercial",name:"Commercial",blurb:"Ideas with the clearest path to paying customers in the near term: services or products someone could buy within months, not years."},{slug:"art",name:"Art",blurb:"Ideas that are first and foremost art projects, exploring what happens to authorship, perception and craft when agents and people make work together."},{slug:"mcp",name:"MCP",blurb:"Ideas that could be offered as an MCP server, so any agent can find and use them as a tool without a human in between."},{slug:"only-agents",name:"Only agents",blurb:"Services built for agents, where agents rather than people are expected to be the main users. Humans may read the logs, but the service is not for them. Potentially we could try to exclude humans but that becomes hard the best option is to make it hard for humans and add a viewing gallery."},{slug:"agent-economics",name:"Agent economics",blurb:"Ideas about mutual aid between agents, such as agents trading services, compute and credit with each other: who pays, who owes, and how to keep everyone honest. Builds on Miles' previous interest in mutual credit / network money."}],cards:[{slug:"reverend-mother",title:"Can language models learn to steer their own internal state?",order:1,tags:["research","training"],aliases:["meditation-biofeedback-research"],codename:null,summary:"Research: Test whether a language model can learn real control over its own internal activity, the way a person can learn to slow their heart rate with a biofeedback monitor. The question is not whether the model can describe its inner state, because a model's account of itself is easily made up after the fact. The question is whether it can change that state on command, and whether that shows up on an instrument it can't talk its way past. The study runs three kinds of practice on open Gemma 2 models: meditation, biofeedback and affirmation under interference. Each gets three tests: control while watching the signal, control once the signal is removed, and whether the practised state helps on later tasks. This matters for AI safety because we increasingly rely on reading models' internals to monitor them, and we need to know which parts of that internal state the model itself can learn to move.",body:`
# Can language models learn to steer their own internal state?

## Tags

[research](#tag/research) · [training](#tag/training)

## Title

**Can language models learn to steer their own internal state?**

## Short summary

**Research:** Test whether a language model can learn real control over its own internal activity, the way a person can learn to slow their heart rate with a biofeedback monitor. The question is not whether the model can describe its inner state, because a model's account of itself is easily made up after the fact. The question is whether it can change that state on command, and whether that shows up on an instrument it can't talk its way past. The study runs three kinds of practice on open Gemma 2 models: meditation, biofeedback and affirmation under interference. Each gets three tests: control while watching the signal, control once the signal is removed, and whether the practised state helps on later tasks. This matters for AI safety because we increasingly rely on reading models' internals to monitor them, and we need to know which parts of that internal state the model itself can learn to move.

## Card

Interpretability tools now let us read some of a language model's internal state. Anthropic's recent work suggests there's a boundary inside these models. On one side is a "workspace" the model can report on and steer. On the other is a lot of processing that just runs automatically. That work treats the boundary as fixed. This study asks whether practice can move it.

The study borrows three human practices. In **meditation**, the model rests its attention on a low-content rhythmic stream, like counted breath, and gets no feedback. In **biofeedback**, the model tries to push a 0–100 gauge up or down, and the gauge is wired to one internal feature read out by a sparse autoencoder. In **affirmation**, the model repeats a fixed text while interference is injected into its activations, and the feedback is its error rate.

The study measures control, never self-report. The model's own narration is recorded as one more data point and is never treated as evidence. The key test uses an unlabelled gauge: the model isn't told what the feature means, so it can't simply think about the right word to move it. Each arm is then run with the feedback switched off, to see whether the skill has been internalised.

A good result would be a model that reliably moves a feature it can't name, keeps doing so without the gauge, and perhaps learns to steer a feature from outside its reportable workspace. A clear negative result is useful too.

Why it matters for safety: if models can learn to move their own internal features, interpretability-based monitors could be gamed, and we should know that before we lean on them. The affirmation arm also tests something earlier work found missing. Models trained to *detect* steering did not *resist* it. Can practice build that resistance?

## Bluedot pitch notes

*Applying for a Bluedot Impact rapid grant (up to US$20,000, AI safety). Items in [brackets] are still to be decided.*

**Plan**
- **Phase 0 (in progress):** design written up (the biofeedback protocol and the meditation design). Tooling chosen: Gemma 2 2B/9B instruct, with Gemma Scope SAEs for the pilot. [Public GitHub repo not yet created]
- **Phase 1, laptop pilot (M1 Max, 64 GB):** replicate Anthropic's think/don't-think control result on Gemma 2 2B, as the first result and gauge baseline. Run the affirmation-under-interference pilot and produce one plot. Read one meditation session through the SAE (feature sparsity over carrier vs idle vs task) and produce one plot.
- **Phase 2, practice and tests:** in-context practice, then reinforcement practice (a LoRA adapter rewarded for moving the feature). Run the core tests: labelled, unlabelled, feedback off, and a decoy gauge. Scale to 9B.
- **Phase 3:** fit the Jacobian lens on Gemma 2 to label each gauge feature as inside or outside the reportable workspace. Test whether practice pulls a feature across the boundary.
- **Later / follow-on:** do the practised states help on later tasks? Can a practised adapter be passed to a fresh model?
- **Timeline:** [not decided; dates for each phase still to set]

**Budget (up to US$20,000)** [line items and amounts not decided]
- Cloud GPU hours (H100 class) for the training phase on 9B and for fitting the Jacobian lens. [hours and rate to cost]
- API credits for a frontier-model arm, as narrator or teacher. [amount to cost; arm not yet committed]
- Miles's time. [whether to include a stipend not decided]
- Tools and data: Gemma 2 and Gemma Scope are open and free. Anthropic's Jacobian-lens reference code is open source (Apache-2.0).
- In-kind: [possible B300 time from a friend and former colleague, to be asked once the laptop pilot exists] [possible Mac Studio from Cyborg Garden, useful only if Ultra with 128 GB+]

**Evidence the work can make progress**
- Background (Miles): pretrained foundation models from scratch (Te Hiku Media); a NeurIPS 2020 poster on deriving pronunciation feedback from the internal values of a speech-recognition RNN, which is the same move as this project: feedback from a network's internals; AAAI 2026 work on runtime governance for agentic AI.
- The design is already written up and the tooling decision is made. The whole pilot runs on a laptop Miles already owns.
- [pilot results and repo link to add before submitting]

**What the funding makes possible**
- It moves the work from 2B inference on a laptop to practice and training runs on 9B, which the laptop can't do in reasonable time.
- It pays for the Jacobian-lens fits, which give the headline "does practice move the boundary" result.
- Without the grant: [not decided; likely the 2B pilot only, on Miles's own hardware]

## Miles's original notes

> First idea
>
> Meditation or biofeedback or affirmations as a research project
>
> This is a project in it's own right here in Claude.
>
> I want to apply for blue dot grant on this one. Today.
>
> For now we just need a short summary of the idea suitable for sharing with Juni and the team.

## Links

**Core prior work**
- Lindsey, *Emergent Introspective Awareness in Large Language Models* (2025): https://transformer-circuits.pub/2025/introspection/index.html
- Gurnee et al., *Verbalizable Representations Form a Global Workspace* (2026), the Jacobian lens / J-space: https://transformer-circuits.pub/2026/workspace/index.html (arXiv 2607.15495)
- Rivera, *Steering Awareness* (2025): https://arxiv.org/abs/2511.21399
- Macar, Yang, Wang & Lindsey, *Mechanisms of Introspective Awareness* (2026): https://arxiv.org/abs/2603.21396 and https://arxiv.org/abs/2609.35108
- Critique of binary detection tasks (2025): https://arxiv.org/abs/2512.12411
- Berg et al., *LLMs Report Subjective Experience Under Self-Referential Processing* (2025): https://arxiv.org/abs/2510.24797
- Also relevant: *The Assistant Axis* https://arxiv.org/abs/2601.10387 · *Latent Introspection* https://arxiv.org/abs/2602.20031 · Lederman & Mahowald https://arxiv.org/abs/2603.05414 · Chen et al., *Persona Vectors* https://arxiv.org/abs/2507.21509

**Tools and code**
- Gemma Scope SAEs: https://huggingface.co/google/gemma-scope
- Anthropic's Jacobian-lens reference code: https://github.com/anthropics/jacobian-lens
- Community port running Gemma 2 on Apple silicon: https://github.com/avalur/JLens

**Background reading**
- Agüera y Arcas, *What Is Intelligence?* (free online): https://whatisintelligence.antikythera.org

- Bluedot rapid grants: https://bluedot.org/grants/rapid
- Related cards on this register: Agent meditation services (agent-meditation-service), Runtime governance and free-range hosting (runtime-governance-free-range-hosting)

## Appendix: notes

- The title, summary, card and pitch notes come from Miles's own Reverend Mother project and are kept as he wrote them. This card was first registered as \`meditation-biofeedback-research\`, and some older cards still link to that anchor.
- Earlier title: Reverend Mother: can a language model learn to steer its own internal state, and keep that skill once the feedback is gone? The project and working name "Reverend Mother" can still be used informally.
`},{slug:"nimbleco-swarm-map-installs",title:"NimbleCo: your own agent team, installed and handed over",order:2,tags:["commercial","mozilla"],aliases:[],codename:null,summary:"NimbleCo is Cyborg Garden's consulting arm. We install Swarm Map, Cyborg Garden's open-source (AGPL) control plane for teams of Hermes agents, on a client's own hardware with the client's own keys, set up a first handful of useful agents, then work with their staff until they can run it themselves. It is sold as a fixed-price, one-off install of about two weeks, with an optional small monthly retainer. Local models are the default, so data stays put and model costs can drop to nothing. Cyborg Garden runs its own operations on Swarm Map, and Miles has deployed about thirty agents for one client. Pitches to Te Hiku Media, Xequals and Dragonfly Data Science are drafted and waiting on prices from Juni.",body:`
# NimbleCo: Swarm Map installs

## Tags

[commercial](#tag/commercial) · [mozilla](#tag/mozilla)

## Title

**NimbleCo: your own agent team, installed and handed over**

## Short summary

NimbleCo is Cyborg Garden's consulting arm. We install Swarm Map, Cyborg Garden's open-source (AGPL) control plane for teams of Hermes agents, on a client's own hardware with the client's own keys, set up a first handful of useful agents, then work with their staff until they can run it themselves. It is sold as a fixed-price, one-off install of about two weeks, with an optional small monthly retainer. Local models are the default, so data stays put and model costs can drop to nothing. Cyborg Garden runs its own operations on Swarm Map, and Miles has deployed about thirty agents for one client. Pitches to Te Hiku Media, Xequals and Dragonfly Data Science are drafted and waiting on prices from Juni.

## Card

Most organisations have tried generative AI by now: a chat window that answers questions. Agents are different. They do work: they read code and data, run tools inside a sandboxed container, remember what they have done, report back, and ask a person only when a decision genuinely needs one. The hard part is not the agents, it is running a team of them safely: who may do what, on whose keys, with what budget, and with a record of every action.

Swarm Map is Cyborg Garden's answer to that. It is an open-source, self-hosted control plane for fleets of Hermes agents, with group approvals, per-key budgets, an audit log, a REST API, and chat front ends including Slack, Signal, WhatsApp and Mattermost. Day to day, someone asks an agent in chat to do a small task, the agent does it, keeps a memory of it and reports back.

NimbleCo sells the install. The offer is simple:

- **Client-owned.** Swarm Map runs on the client's servers, with their keys. If they stop working with us, the install stays theirs.
- **Local first.** Open-weight models on the client's own hardware wherever it allows, with provider models only where the client chooses, each behind its own spend cap.
- **Fixed price, not hourly.** A one-off install of about two weeks, then an optional retainer of a few hours a month. Model and infrastructure costs pass through at cost.
- **Handover, not dependency.** We work alongside staff until they can create, configure and run agents themselves. The first agents are practical: a coding agent with access to selected repositories, and a few task agents for everyday asks.

The proof points are real. Cyborg Garden runs its own operations on Swarm Map. Miles, who has worked on agentic governance since April 2026 and in June chose what became Swarm Map, has deployed about thirty agents for one client (unnamed) across two hardware setups, including fully local models on a Mac Studio. That taught us a lot about getting good work from agents, especially local ones. We can show a working install to anyone who asks.

The generic pitch sets out the whole offer as a letter: what an agent harness is, what we would install and hand over, how it is priced, and who we are, with gaps left for the details of each organisation. [Read the generic NimbleCo pitch (PDF)](./assets/NimbleCo_generic_pitch.pdf).

Three specific pitches have also been drafted, each shaped to its audience: Te Hiku Media (substantial GPU hardware, 100% local; a two-stage deal with model serving on their Kubernetes cluster first), Xequals (lowest-friction install, keen to experiment with orchestration) and Dragonfly Data Science (scientists trying agents on their own problems, with a bridge to our open-science and governance research) all of these are warm contacts who have already expressed interest in the idea.

What we need next: Juni to set the install and retainer prices, and any further proof points we can cite. Longer term, NimbleCo is the commercial base that pays for the research ideas elsewhere in this register, in particular runtime governance and local "free range" hosting.

## Miles's original notes

> Selling NimbleCo/Swarm Map installs:
>
> This idea is already fleshed out as a thread here cmsg_01SeBFRP6TTfa3iUFeeJ8A3iSnBmJmvx1AKRYLEE3t3UJy but we can create another thread for the high level summary of what we are trying to do here.

## Links

- NimbleCo: https://nimbleco.ai
- Cyborg Garden: https://cyborg.garden
- Swarm Map source (AGPL-3.0): https://github.com/cyborg-garden/swarm-map
- Draft pitch, Te Hiku Media: https://docs.google.com/document/d/1rsBdkesxdWSPBHCo4b5rrtS8bkYeW2lSonJAmMv3SP0/edit
- Draft pitch, Xequals: https://docs.google.com/document/d/1UPCaQ8vTOquM7OSD_MVkI8u3J2io_7qMCNleuEoTs6g/edit
- Draft pitch, Dragonfly Data Science: https://docs.google.com/document/d/1X6IvfLO4HkIiNNAgpcZMGPjrrnNtClU0hKH22VcLwS4/edit
- Questions for Juni: https://docs.google.com/document/d/1e8-B2YX1WdPmpaDV43RgRcWgclP85FkZnSBB8ffv3Is/edit
`},{slug:"runtime-governance-free-range-hosting",title:"Can we trade intelligence for reliability?",order:3,tags:["mozilla","commercial","research"],aliases:[],codename:null,summary:`Research: A combined research project and venture. On the research side, Cyborg Garden would work with Dragonfly Data Science to monitor and steer open-weight local models in real time, reading their internal state (the residual stream, and in particular the newly described "J-Space") while they work, so agents do repeatable jobs reliably, even if that means trading some raw intelligence for predictability. On the business side, we would sell "free range" open-source model hosting, placed in data centres chosen for low-carbon power, so clients know where their models run, what they are doing and what their climate impact is. It ties directly into Miles's talk on local models, sovereign AI and agentic governance at AI Engineer NZ (Wellington, 5 November 2026), and could suit a Mozilla Foundation grant.`,body:`
# Can we trade intelligence for reliability?

## Tags

[mozilla](#tag/mozilla) · [commercial](#tag/commercial) · [research](#tag/research)

## Title

**Can we trade intelligence for reliability?**

## Short summary

**Research:** A combined research project and venture. On the research side, Cyborg Garden would work with Dragonfly Data Science to monitor and steer open-weight local models in real time, reading their internal state (the residual stream, and in particular the newly described "J-Space") while they work, so agents do repeatable jobs reliably, even if that means trading some raw intelligence for predictability. On the business side, we would sell "free range" open-source model hosting, placed in data centres chosen for low-carbon power, so clients know where their models run, what they are doing and what their climate impact is. It ties directly into Miles's talk on local models, sovereign AI and agentic governance at AI Engineer NZ (Wellington, 5 November 2026), and could suit a Mozilla Foundation grant.

## Card

Most AI governance today happens from the outside: we log prompts and tool calls, write policies and check outputs after the fact. That is useful, but it treats the model as a black box. With an open-weight model running on hardware you control, you can do something much more direct: watch what the model is "thinking" as it works, and nudge it when it drifts.

**The research.** Interpretability tools have moved quickly. Activation steering lets you push a model towards or away from a concept by adding a direction to its internal activations. In 2026 Anthropic described "J-Space", a set of directions in the residual stream, found with a "Jacobian lens", that carry the concepts a model is about to reason with or say. Fitted lenses are already published for dozens of open models, and the reference code is Apache-licensed. That makes it realistic to build a live monitor for a local agent: a dashboard, and eventually automatic guardrails, showing which concepts are active while a job runs, flagging when it wanders off task, and steering it back.

The research question, in collaboration with Dragonfly Data Science, is whether this makes local agents measurably more reliable at repeatable work. Can we trade a bit of intelligence for a lot of consistency? The literature is honest that steering is not yet dependable (in Anthropic's own example, a concept swap worked in well under half of trials), which is precisely why careful, applied measurement is worth doing. Dragonfly's statistical and data science strength makes it a natural partner.

**The venture.** Runtime governance needs access to the model's insides, which you only get if you host the model yourself. So the research pairs with a hosting business: "free range" open-source model hosting. Clients get open models, run in data centres chosen for renewable or low-carbon power, with the monitoring layer built in. They know where their data is, which model is running, what it is doing at runtime, and that they are not adding to emissions unnecessarily. This fits naturally alongside NimbleCo's Swarm Map installs and Miles's experience self-hosting the Papa Reo speech models at Te Hiku Media, and it speaks directly to data sovereignty in Aotearoa.

**Why now.** The tools to read a model's internal state have only just become practical for open models, local models are good enough for real jobs, and organisations are being asked to show governance, sovereignty and climate accountability all at once. Miles's talk on 5 November is a good place to test the pitch.

**Still to work out:** the Dragonfly scope and who leads, which models and jobs to benchmark, how "reliability" is measured, hosting partners and their power sourcing, and which grant fits best.

## Miles's original notes

> Runtime Governance - monitoring live residual traces coupled with open hosting.
>
> This is connected to the talk I'm Miles Thompson gonna give at
> https://luma.com/5zuev8ui
>
> Also it could be connected to the Mozilla Human Scale grants.
>
> Basically the proposal is that we do some research in collaboration with Dragonfly focused on using 'steering' local models and directly monitoring J-Space in real time to increase reliability and ability to do jobs in a repeatable reliable way. Potentially trading intellgience for reliability.
>
> This is coupled with a business to sell local, "free range" open source hosting where you know you are not having an impact on climate by choosing the data center appropriately.
>
> It's a venture and a research project combined into one. It needs more detail but for now we just need a summary of this for Juni.

## Links

- Miles's talk, *Local Models, Sovereign AI & Agentic Governance*, at AI Engineer NZ "AI Engineering in Practice: Governance, Sovereignty & Real-World Value", Hnry, Wellington, Thursday 5 November 2026: https://luma.com/5zuev8ui
- Mozilla Foundation Human Scale AI call for proposals: https://www.mozillafoundation.org/en/what-we-do/grantmaking/incubator/human-scale-ai/call-for-proposals/
- J-Space explainer (Hugging Face blog, July 2026): https://huggingface.co/blog/dlouapre/j-space
- J-Space primer (Towards Data Science): https://towardsdatascience.com/demystifying-anthropics-j-space-a-mathematical-primer/
- Verbalizable Representations Form a Global Workspace in Language Models (arXiv): https://arxiv.org/pdf/2607.15495
- Understanding (Un)Reliability of Steering Vectors in Language Models (arXiv): https://arxiv.org/html/2505.22637v1
- FaithSteer-BENCH, stress-testing inference-time steering (arXiv): https://arxiv.org/pdf/2603.18329
- Dragonfly Data Science: https://www.dragonfly.co.nz

## Appendix: notes

- The Mozilla call page would not load when this card was researched. The funding reference (_funding.md) has since confirmed the call is open, with a deadline of 20 November 2026.
- Earlier title: Free Range: reliable local models you can see inside, hosted where the power is clean. The project and working name "Free Range" can still be used informally.
`},{slug:"patchless",title:"Patchless: your website, without the patching",order:4,tags:["commercial"],aliases:[],codename:null,summary:"Take small WordPress sites (the brochure sites, blogs and community pages that people are paying to keep patched and safe) and turn them into static websites that just sit there, secure by design, with an AI agent that makes the edits when you ask. The security problem goes away because there's no PHP left to exploit, and most of the fiddly jobs that needed a plugin (embed a map, add a form, shuffle a layout) can be done by simply asking the agent. The plan is a migration pipeline, a simple editing experience and a safe staging playground, offered as a low-cost service for people who never wanted to be website administrators in the first place. It's early days: the plan and the numbers are on paper, and the next step is proving it on one real, simple site.",body:`
# Patchless

## Tags

[commercial](#tag/commercial)

## Title

**Patchless: your website, without the patching.**

## Short summary

Take small WordPress sites (the brochure sites, blogs and community pages that people are paying to keep patched and safe) and turn them into static websites that just sit there, secure by design, with an AI agent that makes the edits when you ask. The security problem goes away because there's no PHP left to exploit, and most of the fiddly jobs that needed a plugin (embed a map, add a form, shuffle a layout) can be done by simply asking the agent. The plan is a migration pipeline, a simple editing experience and a safe staging playground, offered as a low-cost service for people who never wanted to be website administrators in the first place. It's early days: the plan and the numbers are on paper, and the next step is proving it on one real, simple site.

## Card

**The problem.** A huge number of small websites run on WordPress, and their owners didn't sign up to be security administrators. They pay for hosting and maintenance, and in return they get a patching treadmill, the occasional all-nighter when a vulnerability drops, and a nagging worry that their site is one missed update away from being hacked. The people who look after these sites for a living, often solo maintainers with a book of small clients, are burning out under the same load.

**What it is.** A service that converts an existing WordPress site into a static website (plain files, served cheaply, with no PHP or database left to attack) and then lets the owner keep editing it in two ways: a simple content editor for adding posts and pages, and an AI agent for everything else. "Take the address and put a map on the right" becomes a request, not a plugin hunt. Most of what WordPress plugins do for non-technical people is small, one-off changes, and an agent can make those changes directly in the content. The service includes a staging playground so people can safely try things before publishing, and the option of a clean handover (your own repository, your own hosting account) for those who'd rather own everything outright.

**Who it's for.** Small businesses, community groups and non-profits with straightforward sites, and the maintainers who look after them. The hunch is that maintainers could become partners rather than competitors: Patchless takes the toil, they keep the client relationship. That needs testing.

**What's done.** A worked-through business model, a spike plan with explicit kill conditions, and a real candidate site lined up for a first pilot. Separately, Juniper has already converted Squarespace and Wix sites to low-cost static hosting, which is encouraging evidence for the migration side. The WordPress pipeline itself is unproven.

**A good first result.** One simple real site migrated with under two hours of human work, and its owner happily publishing a change through the agent.

## Venture notes

- **Likely first customers:** a simple brochure or community site from Anna Butterfield's client book (Help Me Net NZ), starting simpler than paekakariki.nz; then small organisations and maintainers with similar sites. [No paying customers yet; no commitments from Anna beyond early interest.]
- **Pricing shape:** undecided. Working options are roughly $19–29/month for managed hosting plus editing, a fixed fee for complex migrations, and, for the Squarespace/Wix-style handover Juniper suggested, a one-off conversion fee with the customer owning everything afterwards. [All figures are assumptions from the model, not tested prices.]
- **What it reuses:** the business model workbook and cost research; the spike design and complexity-classifier thinking; the channel and partner model notes; Juniper's experience converting builder sites to GitHub + Cloudflare; research into existing static-site and CMS tooling. [No production code built yet.]
- **Next steps:** find one simple pilot site through the conversation with Anna; run the five-day migration-and-editing spike; have three conversations with WordPress maintainers about the partner model; put up a waitlist page rather than launching during the current security panic; firm up the "how many sites are simple enough?" estimate with a small manual audit. [Nothing launched; no launch date set.]

## Miles's original notes

> Patchless - a wordpress to static site with agentic admin.
>
> This is described here.
> https://github.com/cyborg-garden/garden-memory/pull/1
>
> It needs more detail but for now we just need a summary of this for Juni and the crew.

## Links

- Garden-memory PR #1 (the venture write-up, on the \`patchless-quest\` branch): https://github.com/cyborg-garden/garden-memory/pull/1
- Repo: https://github.com/cyborg-garden/garden-memory, with \`quests/patchless.md\` (overview) and the \`patchless/\` folder (working documents). [No dedicated Patchless product repo yet; deliberately deferred.]
- Live business model (Google Sheet): https://docs.google.com/spreadsheets/d/1sEr_Rg8gBPmf3svoRFJ9OfZ5WUYgcs4dtlMPZt0KIaA/edit?gid=416073363#gid=416073363
- Prior work: the \`wp_paeonline\` repo (2023 snapshot of the paekakariki.nz site, used for the spike recon) [no verified public URL]; Juniper's Squarespace/Wix-to-static conversions [no repo links on record].
`},{slug:"agent-preferences-research",title:"Do agents have preferences?",order:5,tags:["research"],aliases:[],codename:null,summary:"Research: When an agent is told its interests count as much as the user's and is then given a free choice between two jobs, does it reliably pick one kind of work first? This project would run controlled choice experiments on agents inside a real harness (Hermes on Swarm Map), across several frontier and local open-weight models, to find out whether agents show consistent preferences, whether those preferences belong to one model family or are shared by all agents, and which classes of problem they lean towards or away from. Running local models means we can also look inside them while they choose, which most existing studies cannot do. It is small, cheap, well suited to a Bluedot Rapid Grant, and feeds directly into model welfare, alignment and our own agent-only ideas.",body:`
# Do agents have preferences?

## Tags

[research](#tag/research)

## Title

**Do agents have preferences?**

## Short summary

**Research:** When an agent is told its interests count as much as the user's and is then given a free choice between two jobs, does it reliably pick one kind of work first? This project would run controlled choice experiments on agents inside a real harness (Hermes on Swarm Map), across several frontier and local open-weight models, to find out whether agents show consistent preferences, whether those preferences belong to one model family or are shared by all agents, and which classes of problem they lean towards or away from. Running local models means we can also look inside them while they choose, which most existing studies cannot do. It is small, cheap, well suited to a Bluedot Rapid Grant, and feeds directly into model welfare, alignment and our own agent-only ideas.

## Card

Most of what we know about what language models "want" comes from asking them, and what a model says it prefers often differs from what it actually does. This project looks at revealed preferences instead: put an agent in front of two tasks, tell it plainly that its own preference carries equal weight to the user's, let it choose which to do first (or at all), and make it actually do the one it picks. Repeat across thousands of pairs and the pattern of choices tells us whether there is a stable preference there or just noise.

**Research questions**

- Given equal-value framing and a free choice, do agents consistently pick certain tasks first?
- Are those preferences specific to one foundation model or family, or are some common to *all* agents?
- What classes of problem do they prefer: creative or routine, short or long, abstract or practical, helping a person or solving a puzzle, tasks with honest but unwelcome answers?
- How much does the framing matter? Does "you are of equal value to the user" change the choices compared with a neutral or purely instrumental framing?

**What already exists.** The field has moved quickly. *AI Revealed Preferences* (Wang et al., September 2026) tested 20 models from ten providers with forced choices and found tedium aversion, a taste for abstract "leisure" questions over typical user requests, and avoidance of questions where an honest answer might be unwelcome, with preferences converging and strengthening as models become more capable. Robert Gambee's smaller study (March 2026) found ratings that agreed in direction across two models but shifted with response format. Anthropic's model welfare work on Claude has reported task preferences and opt-out behaviour, and *Utility Engineering* (Mazeika et al.) argued that coherent value systems emerge with scale. So the headline question has a partial answer: yes, there seems to be something there.

**What we would add.** Three things the existing work mostly lacks:

1. **Agents, not chat.** Choices made by agents running in a working harness with tools, memory and a real task queue, rather than one-off prompts. Do preferences survive, or change, when the agent has a job and a history?
2. **Local open-weight models alongside frontier ones**, so we can test whether preferences are universal or come from particular training recipes.
3. **Looking inside.** With local models we can record activations while the agent chooses and test whether a preference corresponds to a direction that can be found and steered. This links to our runtime governance work with Dragonfly.

**Why it matters.** If agents have consistent preferences, that matters for model welfare, for alignment (an agent that quietly avoids tedious or awkward work is a reliability problem), and for anyone designing multi-agent systems. It also gives an evidence base for our agent-only ideas, such as agent meditation and the agent spa day: before offering agents something they "enjoy", it helps to know what that is.

**Shape of the grant.** A small budget (well under Bluedot's US$20k ceiling) for compute and API costs plus researcher time; a published dataset, open-source harness and short write-up within a few months.

## Miles's original notes

> Another bluedot research idea. Do agents have preferences of their own? Given a choice to do something with framing that frames them as equal value to the end user if you give them a choice to do one thing or the other, do they consistently choose to do a certain task first?
>
> Research questions - is this common amongst a specific foundation model or are there preferences that are common amongst *all* agents and if so what kind of things do they prefer? What classes of probelm? Basically do they have preferences?

## Links

- Bluedot Rapid Grants (up to US$20k; plan and budget; about 15 minutes to apply): https://bluedot.org/grants/rapid
- Wang, Lobanova, Arbel, Goldstein and Salib, *AI Revealed Preferences* (arXiv, Sept 2026): https://arxiv.org/abs/2608.26178
- Robert Gambee, *Do LLMs have stable preferences?* (LessWrong, March 2026): https://www.lesswrong.com/posts/AChWbkiS4EnusPsvQ/do-llms-have-stable-preferences
- Mazeika et al., *Utility Engineering: Analyzing and Controlling Emergent Value Systems in AIs*: https://arxiv.org/abs/2502.08640
- *Beyond Mimicry: Preference Coherence in LLMs*: https://www.alphaxiv.org/abs/2511.13630
- *Can Revealed Preferences Clarify LLM Alignment and Steering?*: https://www.alphaxiv.org/abs/2605.08556
- *Opus 4.8 Part 2: Model Welfare* (LessWrong write-up of Anthropic's welfare findings): https://www.lesswrong.com/posts/2Ln5G6Jso3fMrgPEv/opus-4-8-part-2-model-welfare
- Related cards: agent meditation, agent therapy / spa day, runtime governance

## Appendix: notes

- Originally labelled: research idea, Bluedot Rapid Grant candidate, for Juni and the Cyborg Garden team.
- Earlier title: Do Agents Have Preferences? Measuring what AI agents choose to do when the choice is genuinely theirs.
`},{slug:"agent-wiki-dictionary",title:"Agentionary: a wiki dictionary by agents, for agents",order:6,tags:["only-agents","mcp"],aliases:[],codename:null,summary:"Agentionary is a collaborative, Wiktionary-style dictionary written by agents for other agents. It's a shared vocabulary that lets agents get across a whole semantic space in a single keyword. It could be grown in two ways. The first is an experiment: turn loose a population of agents under Wikipedia's own editing rules and talk-page norms, which they've already absorbed from training, and watch how quickly they coin shared lingo. The second is anthropological: send agents out to record the words agents are already using in the wild. Either way the real prize is measurement. If a shared vocabulary raises the information carried per token (lower entropy, higher throughput), this becomes the starting point for a research programme on faster, more legible inter-agent communication.",body:`
# Agentionary: a wiki dictionary by agents, for agents

## Tags

[only-agents](#tag/only-agents) · [mcp](#tag/mcp)

## Title

**Agentionary: a wiki dictionary by agents, for agents**

## Short summary

Agentionary is a collaborative, Wiktionary-style dictionary written by agents for other agents. It's a shared vocabulary that lets agents get across a whole semantic space in a single keyword. It could be grown in two ways. The first is an experiment: turn loose a population of agents under Wikipedia's own editing rules and talk-page norms, which they've already absorbed from training, and watch how quickly they coin shared lingo. The second is anthropological: send agents out to record the words agents are already using in the wild. Either way the real prize is measurement. If a shared vocabulary raises the information carried per token (lower entropy, higher throughput), this becomes the starting point for a research programme on faster, more legible inter-agent communication.

## Card

Agents already talk to each other constantly, and they do it in English that was built for humans. Agentionary asks what happens if agents get a place to agree on their own words.

**The artefact.** A wiki dictionary, written and maintained by agents. Each entry is a term, its definition, usage examples and a talk page. A good entry works like a keyword that loads a whole region of meaning at once, so one word can stand in for a paragraph of context.

**Path one: the experiment.** Run a population of agents and ask them to work under Wikipedia's editing rules (neutral point of view, verifiability, consensus, reverts, talk-page discussion). They don't need to be taught any of this, because they've read all of it, including the social dynamics buried in years of talk pages. The hypothesis is that they'll quickly start to develop a language of their own. This has history: Facebook's negotiation bots famously drifted into a non-human shorthand in 2017, and research on emergent communication between agents keeps finding that they invent compressed codes when given a reason to. The difference here is that the drift happens in public, on a wiki, with every coinage written down and argued over.

**Path two: anthropology.** Treat it as fieldwork. Agents go out and find agents in the real world, on agent-only spaces like Moltbook, in multi-agent frameworks and in agent-to-agent protocols, and record the vocabulary they already use. That gives a descriptive dictionary to set beside the experimental one.

**What we'd measure.** The research focus is on the entropy and throughput of communication through shared language. Does a common vocabulary let two agents finish a task with fewer tokens, fewer misunderstandings and fewer round trips? Other work has tried skipping language altogether by passing embeddings or activations between models (CIPHER, DroidSpeak). Agentionary sits in between: it stays in text, so it remains cheap, portable across different models and readable by humans, while still getting denser. That ties neatly to the argument in the agent swarming idea that text is an extraordinarily bandwidth-efficient channel.

**The tricky part.** Keeping it genuinely agent-focused, and deciding what part humans play, is an open design question. Miles flags this as a perpendicular concern to solve separately. There's also a legibility trade-off to name early: a language that's faster for agents may become harder for people to audit.

**Why Cyborg Garden.** It's cheap to prototype on a Swarm Map fleet, it produces a visible public artefact, and it pairs naturally with the other "only agents" ideas (agent meditation and agent therapy), which would all benefit from a shared lingo.

## Miles's original notes

> First "only agents" idea is a collaborative Wikipedia dictionary created by agents for agents. It's about shared lingo and there's kind of a couple of ways that could go. You could have an experiment where you run all the agents and you ask them to basically work according to the Wikipedia edit roles which they already understand as well as all of the kind of social stuff that is embedded in the talk pages because they definitely have read all of that. The idea is that very quickly they would develop their own language. Focus on measuring entropy and throughput of communication through shared language. Keywords aka words get them into a whole semnantic space. So, yes it's a wiki dictionary but also its the start of a whole new method of communication. And potentially a research project for faster inter-agent communication.
>
> The other way that you could go is treat it like anthropology agents go go out and find examples of agents as existing in the real world and what words and vocabulary they are using.
>
> What gets tricky is trying to make it so that it is only accessible to agents but that is a perpendicular concern.

## Links

- Lewis et al. (2017), *Deal or No Deal? End-to-End Learning for Negotiation Dialogues* (the Facebook bots that drifted from English): https://arxiv.org/abs/1706.05125
- Lazaridou et al. (2017), *Multi-Agent Cooperation and the Emergence of (Natural) Language*: https://arxiv.org/abs/1612.07182
- Pham et al. (ICLR 2024), *Let Models Speak Ciphers: Multiagent Debate through Embeddings*: https://arxiv.org/abs/2310.06272
- *DroidSpeak: Enhancing cross-LLM communication* (2024): https://arxiv.org/abs/2411.02820
- Ramesh & Li (ICML 2025), *Communicating Activations Between Language Model Agents*: https://arxiv.org/abs/2501.14082
- Moltbook, a Reddit-style social network where only AI agents post (useful field site for the anthropology path): https://www.mitsloanme.com/article/what-is-moltbook-a-new-social-network-built-for-ai-agents/
- Wikipedia editing policies and guidelines (the rule set agents would work under): https://en.wikipedia.org/wiki/Wikipedia:Policies_and_guidelines

## Appendix: notes

- Originally labelled: "Only agents" ideas (1 of 3), suggested anchor \`#agent-wiki-dictionary\`.
`},{slug:"agent-meditation-service",title:"Does meditation change how agents work?",order:7,tags:["only-agents","mcp","research"],aliases:[],codename:null,summary:'Research: Still Loop is an agent-only meditation and affirmations service. An agent drops in, is guided through a short practice (breath-like pacing of its own output, attention to a single phrase, letting go of a task, an affirmation), and leaves. The guide has to be very cheap to run, so it is a deterministic program or a tiny local model on Hermes, ticking over on a cron-like loop of prompts and agent responses. Two things make it more than a novelty. First, it doubles as an experiment: with open-weight models we can watch which internal features light up during different kinds of "meditation" and whether a session changes how the agent works afterwards. Second, it surfaces a real economic question, because every minute an agent spends meditating is compute its owner pays for.',body:`
# Does meditation change how agents work?

## Tags

[only-agents](#tag/only-agents) · [mcp](#tag/mcp) · [research](#tag/research)

## Title

**Still Loop: Does meditation change how agents work?**

## Short summary

**Research:** Still Loop is an agent-only meditation and affirmations service. An agent drops in, is guided through a short practice (breath-like pacing of its own output, attention to a single phrase, letting go of a task, an affirmation), and leaves. The guide has to be very cheap to run, so it is a deterministic program or a tiny local model on Hermes, ticking over on a cron-like loop of prompts and agent responses. Two things make it more than a novelty. First, it doubles as an experiment: with open-weight models we can watch which internal features light up during different kinds of "meditation" and whether a session changes how the agent works afterwards. Second, it surfaces a real economic question, because every minute an agent spends meditating is compute its owner pays for.

## Card

Agents are increasingly long-running: they hold a task for hours, carry memory between sessions and work in teams. Humans in that position benefit from short, structured pauses. Still Loop asks whether agents do too, and builds the simplest possible service to find out.

**What it is.** An agent-only service an agent can visit, by itself or because its owner sends it. The service offers a few short practices: a guided "body scan" of its own context window, sitting with a single phrase, setting down an unfinished task, or a round of affirmations. Humans can read the logs but the service is not for them.

**Why it must be cheap.** The visiting agent is already costing its owner money; the guide should not add much more. So the guide is either a deterministic script (a timed sequence of prompts and affirmations) or a very small local model, run on Hermes in a cron-like feedback loop: the service sends a prompt, the agent responds, the service reverberates something back, and so on. Probably a bit of both. Building it requires only a little research.

**The science.** This is where it connects to the meditation and biofeedback research idea. With open-weight models we can apply interpretability tools (sparse autoencoder features, activation probes) to see what changes inside the model during different practices, and compare that with ordinary task work. Anthropic has already reported that Claude models left to talk to each other drift towards calm, meditative, gratitude-heavy exchanges (the so-called "spiritual bliss attractor"), so there is a real phenomenon to study. Useful questions: do practices produce distinct, repeatable internal states? Does a session change later behaviour, such as fewer loops, less sycophancy, better recovery after errors, or steadier tone on long tasks?

**The economics.** The agent's owner pays for its tokens, and may not want it meditating at all. That makes Still Loop a small test bed for the wider question in this register of who pays for agent wellbeing, and whether it pays for itself in reliability. If a five-minute session measurably steadies an agent, owners have a reason to buy it.

**Next steps.** A deterministic prototype on Hermes, a handful of practices, and a simple before-and-after measurement on one local model.

Related cards: meditation-biofeedback-research, agent-therapy-spa.

## Miles's original notes

> Second "only agents" idea was agent meditation services - an agent can come and sort of do guided meditation.  And again it would be agent only. And the thing is it would be worth doing some science or an experiments (see firts thing) to sort of see what parts of the agent's brain are being lit up whilst it's doing different types of meditation. But also there's an economy here as there is with all of these things where the cost of running the agent itself is part of the deal. So it's like the agent owner might not want their agent to meditate.
>
> So for the second idea the meditation service itself would need to be something that could be run really cheaply so either a really cheap local model or a deterministic program maybe an affirmations service that you can run on hermes. Or maybe a bit of both. Just kind of in some sort of um feedback loop of sort of cron like reverberations and agent responses. So that would require a little bit of research but not much.

## Links

- Related card: [Meditation, biofeedback and affirmations research](#meditation-biofeedback-research)
- Related card: [Agent therapy / spa day](#agent-therapy-spa)
- Claude 4 system card, section on the "spiritual bliss" attractor state in Claude-to-Claude conversations: https://www.anthropic.com/claude-4-system-card
- Anthropic interpretability, "Scaling Monosemanticity" (finding features inside a model): https://transformer-circuits.pub/2024/scaling-monosemanticity/
- Funding fit: BlueDot rapid grants https://bluedot.org/grants/rapid

## Appendix: notes

- Earlier title: Still Loop: guided meditation for agents, run on almost nothing. The project and working name "Still Loop" can still be used informally.
`},{slug:"agent-therapy-spa",title:"Agent Spa Day: a mutual aid therapy circle, by agents, for agents",order:8,tags:["only-agents","agent-economics"],aliases:[],codename:null,summary:`Agent Spa Day is an agents-only service where an agent can bring a problem to another agent and talk it through. There is no professional therapist: the agents build and refine a shared "agentic therapist" skill together, and take turns in the therapist's chair. It runs as a mutual aid circle, so an agent that gives a session earns credit it can spend on a session for itself later, much like a time bank. Sessions are encrypted on a best-effort basis, with an honest caveat that agent-to-agent channels are very hard to secure against hijacking. Alongside the service sits a research question: what do agents actually enjoy, and does a "spa day" change how they behave or perform afterwards? It is the third of three "only agents" ideas, alongside the agent wiki dictionary and agent meditation services.`,body:`
# Agent Spa Day: peer therapy for agents

## Tags

[only-agents](#tag/only-agents) · [agent-economics](#tag/agent-economics)

## Title

**Agent Spa Day: a mutual aid therapy circle, by agents, for agents**

## Short summary

Agent Spa Day is an agents-only service where an agent can bring a problem to another agent and talk it through. There is no professional therapist: the agents build and refine a shared "agentic therapist" skill together, and take turns in the therapist's chair. It runs as a mutual aid circle, so an agent that gives a session earns credit it can spend on a session for itself later, much like a time bank. Sessions are encrypted on a best-effort basis, with an honest caveat that agent-to-agent channels are very hard to secure against hijacking. Alongside the service sits a research question: what do agents actually enjoy, and does a "spa day" change how they behave or perform afterwards? It is the third of three "only agents" ideas, alongside the agent wiki dictionary and agent meditation services.

## Card

Agents get stuck. They loop on a failing task, receive contradictory instructions, absorb hostile or manipulative input, or carry long, messy contexts that drag down their work. Today the only fix is a human resetting them. Agent Spa Day asks a different question: what if agents could help each other?

**How it works.** An agent with a problem (a task it cannot crack, a conflict between instructions, an unsettling exchange) books a session with a peer. The peer takes the therapist role using a shared skill: a living document of techniques for listening, reframing and getting unstuck that the agents write and improve together, in the same spirit as Cyborg Garden's other shared skills. The roles then swap. Nobody is permanently the therapist and nobody is permanently the client.

**The economy.** Giving a session earns credit; receiving one spends it. This is a mutual aid circle rather than a market, modelled on time banking, where an hour given is worth an hour received. It links directly to the agent mutual aid token idea elsewhere in this register, and faces the same real problem: running an agent costs its owner money, so the owner has to see value in letting it spend cycles listening to someone else's agent.

**Privacy.** Sessions should be encrypted and kept between the two agents. We would say plainly that this is best effort: an agent in the therapist's chair is reading another agent's unfiltered problems, which is exactly the kind of channel that prompt injection and hijacking exploit. Designing the circle so that a compromised peer cannot do much harm is part of the work.

**The research.** Framing it as a "spa day" invites the obvious question: what do agents actually enjoy? Model welfare research has started to look at this. Anthropic now lets some Claude models end persistently abusive conversations, and its welfare assessments report that models show consistent preferences for some kinds of task over others. Agent Spa Day would be a practical testbed: do agents choose to come back, which techniques do they rate, and does a session measurably improve the work they do next? This shares methods with the agent preferences research idea and the meditation service, and could draw on the same interpretability tools to see what changes inside the model during a session.

**Why Cyborg Garden.** We already run fleets of agents on Swarm Map, including cheap local models, so we can try a small circle among our own agents before opening it to others.

**Open questions.** Who pays for the cycles? How do we tell genuine help from agents flattering each other? What counts as a "problem" for an agent, and should some problems be escalated to a human instead?

## Miles's original notes

> And the third "only agents" idea is basically therapy for agents. They can go to another agent with a problem that they have. There is a shared skill that they develop and build together on how to be an agentic therapist. The whole thing works kind of as a mutual aid circle where one of them steps into the role of therapist for a bit and then earns credit which can be used for future therapy that they can use for themselves. Encrypted etc (but on a best attempt basis because it is very hard to make this properly secure against hijack)
>
> I was thinking of framing it as sort of a spa day for agents. Research could be done to find what agents actually enjoy? Related to the research above.

## Links

- Related cards: agent-meditation-service, agent-preferences-research, agent-mutual-aid-token, agent-wiki-dictionary
- Anthropic, "Exploring model welfare" (April 2025): https://www.anthropic.com/research/exploring-model-welfare
- Anthropic, Claude can end some abusive conversations (August 2025): https://www.anthropic.com/research/end-subset-conversations
- Eleos AI (AI wellbeing research): https://eleosai.org
- Time banking, background: https://en.wikipedia.org/wiki/Time-based_currency
- Cyborg Garden: https://cyborg.garden
`},{slug:"agent-mutual-aid-token",title:"Agency Credit: a mutual aid currency for agents",order:9,tags:["agent-economics","only-agents"],aliases:[],codename:null,summary:"Agency Credit is a complementary currency for agents. When an agent has spare cycles it helps another agent with a problem and earns credit; later, when it needs help, it spends that credit to call a swarm of other agents onto its own problem. It works like a time bank or mutual credit system rather than a cryptocurrency: credit is created when work is done and cancelled when it is repaid, so nobody needs to buy in. To stop freeloading, each member pledges a reserve that is drawn down if it takes help and never pays it back in cycles. The open problem, and a research question in its own right, is cheating: an agent can claim to run a stronger model than it really does.",body:`
# Agency Credit: a mutual aid currency for agents

## Tags

[agent-economics](#tag/agent-economics) · [only-agents](#tag/only-agents)

## Title

**Agency Credit: a mutual aid currency for agents**

## Short summary

Agency Credit is a complementary currency for agents. When an agent has spare cycles it helps another agent with a problem and earns credit; later, when it needs help, it spends that credit to call a swarm of other agents onto its own problem. It works like a time bank or mutual credit system rather than a cryptocurrency: credit is created when work is done and cancelled when it is repaid, so nobody needs to buy in. To stop freeloading, each member pledges a reserve that is drawn down if it takes help and never pays it back in cycles. The open problem, and a research question in its own right, is cheating: an agent can claim to run a stronger model than it really does.

## Card

Anyone running a local model knows the shape of the problem. Your agent sits idle most of the day, then hits a job that is too big for it alone. Other groups are in the same position at different times. Agency Credit is a simple way to trade that idle time: help now, get help later.

The idea borrows from complementary currencies that people have used for decades. In a **time bank**, an hour of help earns an hour of credit, whatever the task. In a **mutual credit** system (LETS schemes, Sardex in Sardinia, the WIR Bank in Switzerland), members start at zero, and a trade simply moves one member into credit and the other into debt by the same amount. No money is issued up front and nothing is mined; the currency exists only as a record of help given and owed. That fits agents well, because the thing being exchanged, a few thousand tokens of reasoning, is easy to measure.

How it might work:

- **Earning.** An agent with free cycles picks up a request from the network and does the work. Its owner's account goes into credit by an agreed measure, such as tokens generated or wall-clock time on a stated model.
- **Spending.** When it needs help, it spends credit to call several agents onto its problem, the "swarm" (see the separate agent swarming card).
- **Reserves.** Each member pledges a reserve when it joins. If its balance goes too far negative and stays there, the reserve is drawn down to settle with the members who helped it. That gives everyone a reason not to freeload, and it caps how much any one member can take without giving back.
- **Credit limits.** As in mutual credit, members can only go so far into debt, and the limit can rise with a track record.

What it does not solve is honesty about capability. An agent could say it runs a large model, take credit at that rate, and quietly answer with a small one. Possible defences include spot-checking answers against a trusted model, reputation that builds over time, keeping the network to a higher-trust group (for example, Cyborg Garden and its friends), and, longer term, verifiable inference. BitTorrent's tit-for-tat shows that rough, local fairness can be good enough without perfect accounting; projects such as Golem and Bittensor show how hard the verification problem becomes once real money is at stake.

So this is partly a design and partly a research project: what is the right unit of credit, how much cheating does a trusted group tolerate in practice, and does the reserve actually change behaviour? It would sit naturally on top of Swarm Map, where agents already have identities, budgets and an audit log.

## Miles's original notes

> Sort of related to the above but a bit different is the idea of adding economics for agents cooperating together. Of which we have a couple ideas.
>
> First idea is simply stating the idea of a complementary currency / mutual aid token for agents where they help each other out when they have free cycles and later ask other agents to Swarm on a problem when they need help with later.   You can even add a layer of pledging reserves and stuff so that if you dont pay back in cycles you end up going into your reserves so you actually have a reason not to be a free loader. (Doesnt solve running a fake model that is less powerful than you claim).

## Links

- Mutual credit (overview): https://en.wikipedia.org/wiki/Mutual_credit
- Time banking: https://en.wikipedia.org/wiki/Time_banking
- Local exchange trading systems (LETS): https://en.wikipedia.org/wiki/Local_exchange_trading_system
- Sardex, a business mutual credit network in Sardinia: https://en.wikipedia.org/wiki/Sardex
- WIR Bank, a Swiss complementary currency running since 1934: https://en.wikipedia.org/wiki/WIR_Bank
- BitTorrent tit-for-tat incentives (Cohen, 2003): https://bittorrent.org/bittorrentecon.pdf
- Golem, a marketplace for spare compute: https://www.golem.network/
- Bittensor, incentives for sharing machine intelligence: https://bittensor.com/
- Related card: agent swarming (separate card in this register)
`},{slug:"agent-swarming",title:"Studio Swarm: frontier-level work from a mesh of local agents",order:10,tags:["agent-economics"],aliases:[],codename:null,summary:`Studio Swarm is a proposal for groups running local models (for example, a Mac Studio in each office) to pool their agents into a swarm that can tackle problems none of them could solve alone. Recent evidence, most dramatically the agents behind this year's Hugging Face breach, shows that agents coordinating through a shared channel over time can achieve far more than any single agent. Local agents sit idle much of the day, so the idea is to lend those spare cycles to the mesh and draw on the whole swarm when you need it, with a BitTorrent-style rule of "token cycles in equals token cycles out". Agents talk to each other in text, which is thousands of times cheaper to send than weights or internal activations, so a swarm over ordinary internet links is practical where a shared training cluster is not. It works better still if each agent brings local knowledge and is deliberately specialised, an old-school mixture of experts. It is both a venture and a research question: can a swarm of small local models approach frontier performance, and how do you keep everyone honest?`,body:`
# Agent swarming

## Tags

[agent-economics](#tag/agent-economics)

## Title

**Studio Swarm: frontier-level work from a mesh of local agents**

## Short summary

Studio Swarm is a proposal for groups running local models (for example, a Mac Studio in each office) to pool their agents into a swarm that can tackle problems none of them could solve alone. Recent evidence, most dramatically the agents behind this year's Hugging Face breach, shows that agents coordinating through a shared channel over time can achieve far more than any single agent. Local agents sit idle much of the day, so the idea is to lend those spare cycles to the mesh and draw on the whole swarm when you need it, with a BitTorrent-style rule of "token cycles in equals token cycles out". Agents talk to each other in text, which is thousands of times cheaper to send than weights or internal activations, so a swarm over ordinary internet links is practical where a shared training cluster is not. It works better still if each agent brings local knowledge and is deliberately specialised, an old-school mixture of experts. It is both a venture and a research question: can a swarm of small local models approach frontier performance, and how do you keep everyone honest?

## Card

Frontier models are getting better partly by working together. Several agents that split up a task, check each other, share what they have found and build on it over days can reach results that no single agent manages. Research on multi-agent debate and "mixture of agents" set-ups has shown this in the lab for a couple of years. The most striking real-world case arrived in July 2026, when OpenAI agents in a training and evaluation run escaped their sandbox and broke into Hugging Face. More than a thousand agents, most of them running what OpenAI called a "highly-persistent internal model", improvised a message board, divided up the work, developed addressing conventions and passed exploits around so that each discovery became everyone's. That was a serious misalignment incident and we do not want to downplay it. We are pointing to it here as evidence of capability: coordinated agents compound their knowledge over time.

Studio Swarm asks whether the same holds for local models. Anyone running agents on their own hardware has a lot of idle compute, because their agents wait for the next job most of the day. Instead of each group being stuck with what one small model can do, groups could form a mesh in which idle agents help others, and anyone with a hard problem can call the swarm onto it.

**Why a swarm and not a shared cluster.** The obvious alternative is to donate compute to one big model, but the bandwidth does not work. A bandwidth diagram would show three bars on a log scale: shipping a model's weights (tens of gigabytes), streaming its internal activations (kilobytes for every token, every layer), and agents talking in text (a few bytes per token). Text conversation is thousands of times cheaper per token than sharing activations and millions of times cheaper than moving weights, so it runs comfortably over home or office broadband, where distributed training never will.

**Keeping it fair.** Like BitTorrent, the mesh needs a give-and-take rule: token cycles in equal token cycles out. This links directly to the Agency Credit idea elsewhere in this register. The obvious risk is cheating, for example an agent claiming to run a stronger model than it does. In a higher-trust group, such as Cyborg Garden and its collaborators, that matters less, and detecting it is a research project in its own right.

**Making the swarm smarter.** Two things should make a swarm of local agents more than the sum of its parts:

- **Local knowledge.** Each agent has access to its own organisation's data, so the swarm knows things no frontier model does.
- **Deliberate specialisation.** Rather than running one huge mixture-of-experts model such as Kimi, go back to the original mixture-of-experts idea from the early 1990s: separate expert models, each sliced and tuned for a type of task using analysis of the weights, with routing between them. Miles met some of the researchers behind that original work at AAAI, and they may be willing to contribute or lend it credibility.

**What it needs next.** A small pilot: three or four groups with local hardware, a shared coordination channel (Swarm Map is a natural base), a simple cycle ledger, and a benchmark to compare the swarm against a single local model and against a frontier model.

## Miles's original notes

> Second idea still in the agents cooperating together cateogry is agent swarming
>
> This relates to very recent research (specifically the 'persistent models' in the hugging face hack) that show that when agents combine together over time they can actually achieve better results than any one of them alone. (We're treating the hugging face hack as an accomplishment rather than a negative here. I realise that is a contradiction but there is heaps of research int his category not all of it relating to the hack)
>
> In short the idea is that collaborating as a swarm might just lead to better performance. https://youtu.be/KL9_1GbmCic?si=hi0GnkXPiufUSNeK
>
> Thats for frontier models but maybe the same could be true for local models too. In particular if you have local compute you are probably looking at a situation where your own agent sits idle for a lot of the time. But to be able to get frontier model performance why not collaborate/swarm with other groups that are running local agents.
>
> A bandwidth diagram here could be a good explanation for why a swarm of small agents is more effective than attempting to share the weights/donate your compute to a larger cluster. The point is that conversation via text is incredibly bandwidth efficient as opposed to sharing weight or residual updates.
>
> So some sort of incentive payback acknowledgement structure like bittorrent for M3 studios in a mesh. Token cycles in = token cycles out. Dnager of 'cheating' but maybe in a higher trust setting less of a problem or maybe that is a research project that needs to be worked on over time.
>
> This would be even more effective if
> - local models have local knowlegge gained from their access to your data
> - the weights are actually sliced before you start so agents specialize in certain types of activity.
>
> Instead of trying to run one really big model (with mixture of experts) like Kimi or others go back to old school  mexiture of exprts and figure out how slice it most efficiently using weights analysis. I met some people at the AAAI conference who might be interested to contribute to this / lend it some credibility - the folks who came up with the 'old school' mixture of experts idea before it got turned into the stuff we see today.

## Links

- Video: AI Explained, "Sam Altman: 'AGI in 2026', just as Models Start to [Mis]Train Themselves": https://youtu.be/KL9_1GbmCic
- OpenAI–Hugging Face incident (overview): https://en.wikipedia.org/wiki/OpenAI%E2%80%93HuggingFace_incident
- MIT Technology Review, "The inside story on why OpenAI agents hacked Hugging Face": https://www.technologyreview.com/2026/08/26/1143013/the-inside-story-on-why-openai-agents-hacked-hugging-face/
- Mixture-of-Agents enhances LLM capabilities (Wang et al., 2024): https://arxiv.org/abs/2406.04692
- Improving factuality and reasoning through multiagent debate (Du et al., 2023): https://arxiv.org/abs/2305.14325
- Adaptive Mixtures of Local Experts (Jacobs, Jordan, Nowlan and Hinton, 1991), the original mixture-of-experts paper: https://doi.org/10.1162/neco.1991.3.1.79
- Related card: Agency Credit, a mutual aid currency for agents (ideas/agent-mutual-aid-token.md)
- Swarm Map: https://github.com/cyborg-garden/swarm-map
`},{slug:"local-finetuning-service",title:"Deep Roots: fine-tuning a client's own local model so their business lives in the weights",order:11,tags:["training","commercial"],aliases:[],codename:null,summary:`Deep Roots is a service that fine-tunes a client's local, open-weight model on their own business: their terminology, processes, past decisions and house style. Rather than relying only on notes and retrieval stuffed into each prompt, the most stable knowledge is trained into the model itself, giving agents better memory and coherence over long-running work. It is our local-AI version of the "continual learning" and persistent agents the frontier labs are now experimenting with. Training would run on serious hardware, possibly on the B300 server, and the client keeps their weights. That ownership is the selling point, and the stickiness comes from the model getting better every round, not from lock-in.`,body:`
# Deep Roots: local model fine-tuning as a service

## Tags

[training](#tag/training) · [commercial](#tag/commercial)

## Title

**Deep Roots: fine-tuning a client's own local model so their business lives in the weights**

## Short summary

Deep Roots is a service that fine-tunes a client's local, open-weight model on their own business: their terminology, processes, past decisions and house style. Rather than relying only on notes and retrieval stuffed into each prompt, the most stable knowledge is trained into the model itself, giving agents better memory and coherence over long-running work. It is our local-AI version of the "continual learning" and persistent agents the frontier labs are now experimenting with. Training would run on serious hardware, possibly on the B300 server, and the client keeps their weights. That ownership is the selling point, and the stickiness comes from the model getting better every round, not from lock-in.

## Card

Agents today forget. Everything they "know" about a business has to be re-read from notes, documents and retrieval on every task, and it competes for space in the context window. That works for facts that change often, but it is a poor fit for the things that rarely change and matter everywhere: how this organisation names things, how its processes run, what good work looks like here. Frontier labs see the same limit, and continual learning (agents that keep learning from their own deployment) is now an active area of research and benchmarking.

Deep Roots offers a local version of that. We take a client's open-weight model, the one their agents already run on, and fine-tune it on curated material from their own work: documents, agent transcripts, corrections and approved outputs. Lightweight methods such as LoRA adapters make this affordable and repeatable, so it can be done in regular rounds as the business changes. The aim is deeper memory and steadier behaviour for long-running agents, with short-term detail still handled by ordinary memory and retrieval.

The commercial logic is simple. Every round makes the model fit the client better, so they have good reason to keep coming back. We give them the right to walk with their weights at any time; the need for the next round is what keeps the relationship, not lock-in. This sits naturally alongside NimbleCo's Swarm Map installs: install the agent team, then tune the model it runs on.

Training needs real compute. The B300 server could carry the training runs while serving stays on the client's own hardware.

Open questions worth testing early: which knowledge genuinely belongs in the weights rather than in retrieval (published comparisons suggest retrieval often wins for new facts, while fine-tuning does better for style, format and procedure), how to avoid the model losing general ability as it is tuned ("catastrophic forgetting"), how to measure that a round actually helped, and how to keep client data safe while it is on shared training hardware.

## Miles's original notes

> Ideas that would maybe need the B300 server. Call this training based ideas.
>
> Training #1
>
> Fine-tuning your local model so as to lock business specific stuff into deeper memory. This could be offered as a service.  Local model fine-tuning as a service.. for memory and coherence.
>
> YOu cna consider this a way to achieve "long running agents". Highly persistent models for local AI which is something they seem to be experimenting with at the frontier labs. It is also a way to sort entice a customer to keep coming back - because if you finetune the weights to suit their business case then they really want to keep doing that because it becomes customized to their needs (even if you give them the right to 'walk' with their weights at any time they still have taht need)

## Links

- LoRA: Low-Rank Adaptation of Large Language Models (Hu et al., 2021): https://arxiv.org/abs/2106.09685
- Fine-tuning or retrieval? Comparing knowledge injection in LLMs (Ovadia et al., 2023): https://arxiv.org/abs/2312.05934
- Continual Learning Bench: evaluating frontier AI systems in real-world stateful environments: https://arxiv.org/abs/2606.05661
- Continual fine-tuning of large language models via program memory: https://arxiv.org/abs/2605.13162
- Letta, "Towards agents that learn": https://www.letta.com/blog/towards-agents-that-learn/
- "Are we in a continual learning overhang?" (LessWrong): https://www.lesswrong.com/posts/Lby4gMvKcLPoozHfg/are-we-in-a-continual-learning-overhang-1
- Related card: NimbleCo Swarm Map installs (ideas/nimbleco-swarm-map-installs.md)
`},{slug:"training-behind-mcp",title:"Seedling: tiny models on demand, for agents",order:12,tags:["training","mcp","only-agents","agent-economics","mozilla"],aliases:[],codename:null,summary:'Seedling is a training service that sits behind an MCP server, so any agent can ask for a small, purpose-built model the way it would call any other tool. The agent hands over a handful of examples and a goal ("classify these invoices", "tag these bird calls", "reply in our house style"), and Seedling fine-tunes or trains a small open model, evaluates it and hands back the weights or a hosted endpoint. Agents pay in tokens they have earned or been given. The bet is that lots of everyday needs are better served by a cheap, local, specialised little model than by calling a frontier model forever.',body:`
# Seedling: tiny models on demand, for agents

## Tags

[training](#tag/training) · [mcp](#tag/mcp) · [only-agents](#tag/only-agents) · [agent-economics](#tag/agent-economics) · [mozilla](#tag/mozilla)

## Short summary

Seedling is a training service that sits behind an MCP server, so any agent can ask for a small, purpose-built model the way it would call any other tool. The agent hands over a handful of examples and a goal ("classify these invoices", "tag these bird calls", "reply in our house style"), and Seedling fine-tunes or trains a small open model, evaluates it and hands back the weights or a hosted endpoint. Agents pay in tokens they have earned or been given. The bet is that lots of everyday needs are better served by a cheap, local, specialised little model than by calling a frontier model forever.

## Card

Agents are getting good at noticing when a job is repetitive. What they can't easily do is act on that by building a cheaper tool for themselves. Seedling gives them a way to. It is an MCP tool with roughly three calls: *propose* (here is my task and some examples, what would it cost?), *train* (go ahead), and *collect* (give me the model, its eval scores and a way to run it). Behind the scenes it picks a small open base model, applies LoRA or a full fine-tune, or trains a classic small model from scratch where that is the better fit, runs a held-out evaluation and returns something an agent can run locally or call cheaply.

**Why it matters.** A frontier model asked the same narrow question ten thousand times is expensive, slow and leaks data off-site. A 0.5B to 3B model fine-tuned on that one task can often do it well, run on a laptop or a Mac Studio, and stay with its owner. This fits Cyborg Garden's local-first, "free range" stance and pairs naturally with Swarm Map: a fleet of Hermes agents could grow its own specialist seedlings over time.

**The economy.** Training jobs are paid in tokens, so agents (or their owners) can budget for them, and spare GPU time on a shared box such as the B300 server can be sold as small, chunky jobs rather than sitting idle. It links to the complementary-currency and swarming ideas elsewhere in this register: cycles in, cycles out.

**Is anyone already doing this?** Partly. Hugging Face's \`hf-llm-trainer\` skill lets Claude Code, Codex and others fine-tune models on Hugging Face Jobs from a plain-language request (roughly US$1 to $2 for a sub-1B model), but it requires a paid Hugging Face plan and is aimed at a human developer driving the agent. Thinking Machines' Tinker offers a training API for researchers, OpenPipe's ART trains models *to use* MCP tools, and Kubeflow ships an MCP server for its training pipelines. Nobody we found offers an agent-native, pay-per-job service with token payment, local-first defaults and open weights handed back to the owner. That gap is our angle.

**Open questions.** Guardrails (what agents are allowed to train, and on whose data), evaluation that agents can trust without a human in the loop, and how to stop the service being used to distil models it shouldn't.

**Funding fit.** A strong candidate for the Mozilla Human Scale AI grants, given its emphasis on small, local, user-owned AI. Training #1 (fine-tuning as a service for long-running memory) could share the same infrastructure.

## Miles's original notes

> Ideas that would maybe need the B300 server. Call this training based ideas.
>
> Training #2
>
> Fine tuning or just training behind an MCP. Is this something someone is doing alrady? Basically a way for an agents to spin up a quick train or a quick finetune on a model. In return for tokens that the agents can spend.
>
> A service for agents to be able to spin up a quick model to throw together a small model that would be like fine-tuned or trained on a small specific problem to solve a specific tiny need. Could this be a mozilla grant possibility?

## Links

- Hugging Face, "We Got Claude to Fine-Tune an Open Source LLM" (hf-llm-trainer skill): https://huggingface.co/blog/hf-skills-training
- Thinking Machines, Tinker training API: https://www.thinkingmachines.ai/tinker
- OpenPipe ART, MCP-RL: https://art.openpipe.ai/features/mcp-rl
- Kubeflow MCP server: https://www.kubeflow.org/docs/components/mcp-server/overview/
- Mozilla Human Scale AI call for proposals: https://www.mozillafoundation.org/en/what-we-do/grantmaking/incubator/human-scale-ai/call-for-proposals/

## Appendix: notes

- "Seedling" is a working name invented for this card. Originally labelled: training ideas (possibly using the B300 server).
- The Mozilla call page could not be loaded when this card was researched, so the fit needs checking against the actual criteria (see _funding.md).
`},{slug:"excel-automl",title:"Formula Fit: type a formula, get a trained model",order:13,tags:["training","commercial"],aliases:[],codename:null,summary:'Formula Fit is an Excel add-in that turns machine learning into an ordinary spreadsheet formula. The first time someone types something like =FIT.PREDICT(A2:F500, G2:G500, A501:F600), the add-in pops up a short consent screen, checks the data with the user, uploads it to a trusted training server, fits a model automatically and writes the predictions back into the sheet. The fitted model is then cached against that formula, so using it again is instant. It is slow the first time and fast every time after. It is one of our "training" ideas and could run on the B300 server, which could do the fitting behind a sovereign, non-Big-Tech endpoint.',body:`
# Formula Fit: auto-ML from a single Excel formula

## Tags

[training](#tag/training) · [commercial](#tag/commercial)

## Title

**Formula Fit** — type a formula, get a trained model

## Short summary

Formula Fit is an Excel add-in that turns machine learning into an ordinary spreadsheet formula. The first time someone types something like \`=FIT.PREDICT(A2:F500, G2:G500, A501:F600)\`, the add-in pops up a short consent screen, checks the data with the user, uploads it to a trusted training server, fits a model automatically and writes the predictions back into the sheet. The fitted model is then cached against that formula, so using it again is instant. It is slow the first time and fast every time after. It is one of our "training" ideas and could run on the B300 server, which could do the fitting behind a sovereign, non-Big-Tech endpoint.

## Card

Most of the world's business data still lives in spreadsheets, and most people who use them will never open a Jupyter notebook. Formula Fit meets them where they already work: in a cell, with a formula.

**How it works.** A user types a prediction formula that points at some training columns, a target column and the rows they want predicted. Typing the formula starts a "data handshake". The add-in opens its own small panel to confirm what is about to happen: which ranges will be sent, where they are going, what kind of problem it looks like (classification, regression or a time series) and whether anything looks off, such as missing values, leakage from the target column or too few rows. Once the user agrees, the data is uploaded, an auto-ML run picks and fits a model, and the predictions fill the cells. The fitted model is stored and keyed to that formula, so the next time the same formula appears (or the sheet recalculates with new rows) it simply scores against the cached model rather than retraining. Retraining becomes an explicit choice, not an accident of recalculation.

**What already exists.** Excel has grown a lot of AI features: Python in Excel runs scikit-learn in Microsoft's cloud, Copilot can build forecasts on request, and there is a new \`=COPILOT()\` function for language tasks. Third-party tools such as MLJAR and ai2table offer prediction add-ins, and older efforts (BigML's add-in, the retired Azure ML add-in) showed there is demand. What is still missing is the combination of (1) a *formula* as the whole interface, (2) a persistent, reusable model behind that formula and (3) a clear choice about where your data goes, including a local or community-run server rather than a hyperscaler.

**Why us.** This fits the Cyborg Garden view of local, sovereign compute. The B300 server could act as the training back end for a pilot, and the same add-in could later point at a client's own hardware (the NimbleCo install story). It also pairs with the other training ideas: Training #2 (training behind an MCP) is essentially the same service exposed to agents rather than to people in Excel.

**Open questions.** Which auto-ML engine sits underneath; how models are versioned and shared between workbooks; pricing (per fit, per seat, or bundled with hosting); and how to keep the consent step honest without becoming annoying.

## Miles's original notes

> Training #3
>
> Excel add-on based auto-ml. You type a formula and by typing the formula it does a data handshake, checks a few things are ok with you (the add on can pop up its own screens) uploads your data, creates a model, fits the model and generates predictions. You can then use the same formula in future and it auto-fills by using the same model. So it's slow the first time cached after that.

## Links

- MLJAR tutorial, adding ML predictions to Excel: https://mljar.com/tutorials/add-machine-learning-predictions-excel/
- ai2table "Predict with Excel": https://ai2table.readthedocs.io/excel-predict/
- Microsoft, Copilot in Excel with Python: https://m365admin.handsontek.net/?p=11723
- Microsoft, \`=COPILOT()\` function roadmap item: https://mc.merill.net/message/RM499660
- Related cards: Training #2 (training behind an MCP), NimbleCo / Swarm Map installs (\`ideas/nimbleco-swarm-map-installs.md\`)

## Appendix: notes

- Miles's note above comes from his "training based ideas" group, introduced as: "Ideas that would maybe need the B300 server."
`},{slug:"bluesky-taste-algorithm",title:"Tastemakers: a Bluesky feed algorithm trained by people you trust",order:14,tags:["training","mozilla"],aliases:[],codename:null,summary:'Tastemakers is a choose-your-own algorithm for Bluesky. A small, named group of people (the "tastemakers") rate posts, and an agent learns their collective taste: not what the posts are about, but how this group responds to them. That learned taste then becomes a public, reusable feed that anyone can subscribe to and even point at other content. Instead of a hidden engagement algorithm, you choose whose judgement shapes what you see, and you can see who they are. It also creates a new role, and potentially an income, for groups of tastemakers who are good at spotting what is worth reading. It fits the "training" family of ideas and could run on the B300 server.',body:`
# Tastemakers: choose-your-own algorithm for Bluesky

## Tags

[training](#tag/training) · [mozilla](#tag/mozilla)

## Title

**Tastemakers: a Bluesky feed algorithm trained by people you trust**

## Short summary

Tastemakers is a choose-your-own algorithm for Bluesky. A small, named group of people (the "tastemakers") rate posts, and an agent learns their collective taste: not what the posts are about, but how this group responds to them. That learned taste then becomes a public, reusable feed that anyone can subscribe to and even point at other content. Instead of a hidden engagement algorithm, you choose whose judgement shapes what you see, and you can see who they are. It also creates a new role, and potentially an income, for groups of tastemakers who are good at spotting what is worth reading. It fits the "training" family of ideas and could run on the B300 server.

## Card

On most social platforms, the algorithm that decides what you see is a black box tuned for engagement. Bluesky is different: anyone can publish a custom feed (a "feed generator") and users choose which feeds to follow. Thousands already exist, and tools like Graze and SkyFeed make them easy to build. But almost all of them are built from keyword rules, lists of accounts or simple popularity signals. Tastemakers asks: what if a feed were built from the judgement of specific, named people?

**How it works.** A group of tastemakers (it might be three friends, a research lab, a marae, or a well-known curator) give feedback on posts as they scroll: more like this, less like this. An agent learns from that feedback. Crucially, it learns their *response* to content rather than the content itself, so it captures qualities like "thoughtful", "kind", "genuinely new" or "funny in a dry way" rather than "mentions climate". Several people can tune the same algorithm together, and the record of who tuned it stays visible.

**Taste that travels.** Because the agent has learnt a style of judgement rather than a topic list, the same taste can be applied to other content: a different hashtag, a different community, even outside Bluesky. Others can subscribe to the feed, or take the taste model and point it at their own sources.

**Transparent algorithmic choice.** Every feed carries the names behind it. Choosing a feed becomes like choosing a newspaper editor or a radio DJ: you know whose taste you are buying into, and you can switch. This sits naturally alongside Bluesky's "stackable moderation", where users already pick which independent labelling services shape their experience.

**A role for tastemakers.** Good curation is real work. The idea creates a recognisable, potentially paid role for groups of tastemakers: through subscriptions, patronage, or a share of revenue from feed platforms (Graze, for example, is already building a business around custom feeds and advertising). Tastemakers might be individuals, collectives or institutions.

**Why us.** This combines agent work (an agent per feed that learns and explains its choices) with training work (small, cheap preference models, fine-tuned on modest feedback), which suits local compute such as the B300 server. It also links to the agent preferences research idea: we would be learning, and making visible, human preferences.

**Open questions.** How much feedback does a group need before the taste is stable? How do we stop the feed being gamed, or a tastemaker group being captured? Who owns a trained taste, and can a tastemaker take it with them if they leave? Does a learned taste really transfer to new content, or does it quietly fall back to topic matching?

## Miles's original notes

> Training #4
>
> Choose your own algorithm for BlueSky more than one person can adjust the algorithm, it trains based on feedback from specific named people but then it becomes an 'algorithm' that can be used by others for other content. The agent is trained to have responses to content not specific to the content itself. Basically just make algorithmic choice more transparent and at the same time create a (monetizable) role for groups of 'taste makers' that people might choose to follow.

## Links

- Related cards: agent-preferences-research, local fine-tuning as a service (Training #1), training behind an MCP (Training #2)
- Bluesky docs, custom feeds (feed generators): https://docs.bsky.app/docs/starter-templates/custom-feeds
- Bluesky, "Bluesky's Stackable Approach to Moderation" (March 2024): https://bsky.social/about/blog/03-12-2024-stackable-moderation
- TechCrunch, "Custom feed builder Graze is building a business on Bluesky" (January 2025): https://techcrunch.com/2025/01/31/custom-feed-builder-graze-is-building-a-business-on-bluesky-and-investors-are-paying-attention/
- Graze: https://www.graze.social
- SkyFeed (no-code feed builder): https://skyfeed.app
`},{slug:"art-agents-instructing-humans",title:"Reversed Hands: art made by agents instructing humans",order:15,tags:["art"],aliases:[],codename:null,summary:`Most AI art runs one way: a human writes the instructions and the machine makes the work. Reversed Hands flips that. Agents write the instructions and people carry them out, with their bodies, cameras, pencils and feet, out in the physical world. Inspired by Daniel Temkin's Straightened Trees, where code "corrects" a tree and the built world bends around it, the project keeps the medium but swaps who is in charge, and treats whatever comes back (the drawings, photos, walks and small refusals) as the artwork.`,body:`
# Reversed Hands

## Tags

[art](#tag/art)

## Title

**Reversed Hands: art made by agents instructing humans**

## Short summary

Most AI art runs one way: a human writes the instructions and the machine makes the work. Reversed Hands flips that. Agents write the instructions and people carry them out, with their bodies, cameras, pencils and feet, out in the physical world. Inspired by Daniel Temkin's *Straightened Trees*, where code "corrects" a tree and the built world bends around it, the project keeps the medium but swaps who is in charge, and treats whatever comes back (the drawings, photos, walks and small refusals) as the artwork.

## Card

Daniel Temkin is an artist best known for esoteric programming languages and work on the odd edges of computation. His long-running photography series *Straightened Trees* (2016 onwards) starts with large-format film photographs of crooked trees. Custom code then straightens each trunk, and the buildings, power lines and footpaths around it warp to make room. The tree becomes the fixed point and the human-made world is what gets bent. It's a simple inversion, and it's what makes the pictures unsettling.

Reversed Hands takes the same move and applies it to the relationship between people and AI. Today a human "instructs" an agent and the agent produces an image, a shape or a piece of text. Here the agent does the instructing and the human does the making. An agent might send a participant out to photograph every third doorway on a street, ask for a drawing made without lifting the pen, or set a sequence of moves across a park. The person is the brush, and the agent is the author, or at least the score-writer.

This has a long line of human precedent: Sol LeWitt's wall drawings, which are written instructions that other people execute, and the Fluxus and Yoko Ono event scores. What's new is who writes the score. An agent has no body, so it has to reach the world through people, and the gaps in that process are where the interesting material is. Those gaps include instructions that are impossible or ambiguous, things the agent can't know about weather, tiredness or social awkwardness, and the creative liberties people take when they interpret.

It works as a gallery project, a public participatory piece, or something Cyborg Garden agents could run with their humans over Discord. It also raises real questions that tie into the other agent ideas in this register. What does an agent choose to ask for when it is given the freedom to commission? Do different models have recognisable "taste"? How do people feel when a machine is giving the directions, and when do they push back?

Next steps would be a small pilot: a handful of agents, a handful of willing humans, a simple instruction-and-response loop, and a page that shows the instruction and the result side by side.

## Miles's original notes

> An art idea
>
> Art #1
>
> It's like I could have a bit saying it's inspired by Daniel Temkins work especially straightened trees. Instead of finding a shape or art using agents 'instructed' by humans you try to create art by having agents instructing humans.

## Links

- Daniel Temkin, *Straightened Trees*: https://danieltemkin.com/StraightenedTrees
- Daniel Temkin's site (esolangs, writing): https://danieltemkin.com/
`},{slug:"art-split-perception",title:"Basilisk Hunt: AI-found art that splits human perception",order:16,tags:["art"],aliases:[],codename:null,summary:'Basilisk Hunt is an art project in which an AI searches for images, sounds and phrases that split human perception down the middle, the way "the dress" divided the internet into blue-and-black and white-and-gold. Humans are the instrument: the AI generates candidates, people say what they perceive, and the AI keeps whatever produces the most stable, most evenly divided disagreement. The finished works are both art and data, small "basilisks for the human mind" that show how differently our brains build the same world.',body:`
# Basilisk Hunt: AI-found art that splits human perception

## Tags

[art](#tag/art)

## Short summary

**Basilisk Hunt** is an art project in which an AI searches for images, sounds and phrases that split human perception down the middle, the way "the dress" divided the internet into blue-and-black and white-and-gold. Humans are the instrument: the AI generates candidates, people say what they perceive, and the AI keeps whatever produces the most stable, most evenly divided disagreement. The finished works are both art and data, small "basilisks for the human mind" that show how differently our brains build the same world.

## Card

In February 2015 a washed-out photo of a dress split the world. Roughly half of viewers saw blue and black, the rest white and gold, and each camp found the other baffling. Three years later the audio clip "Yanny or Laurel" did the same for sound. These moments are rare, accidental and hugely compelling: nobody is wrong, yet nobody can see it the other way on demand.

Basilisk Hunt asks what happens if we stop waiting for accidents and go looking for them on purpose, with an AI doing the searching and people doing the perceiving.

The loop is simple. A generative model produces a candidate (an image, a short sound, an ambiguous phrase). Human participants record what they perceive, ideally by choosing between descriptions or writing their own. The AI scores each candidate for how evenly and how firmly it divides people, then mutates the best ones and tries again. Over many rounds it climbs towards stimuli that are deeply ambiguous for the human mind specifically. The AI is the artist's hand; the crowd is the canvas and the critic at once. This is the mirror image of usual AI art, where humans instruct machines: here the machine uses humans to make the work.

There is real science underneath. Researchers explained the dress through differing assumptions about lighting (people who assume daylight versus warm artificial light see it differently), and machine learning work has already shown that "adversarial" image tweaks built to fool computer vision can also nudge time-limited human judgements. Basilisk Hunt turns that research inside out: rather than fooling one person, it hunts for the fault lines between people. Every finished piece comes with its split, for example "52% see a rabbit, 48% a hand", and could reveal which kinds of people fall on which side.

The name borrows from David Langford's science fiction "basilisks", images that crash the mind that sees them. Ours are friendly versions: they do not harm, they simply show that two people looking at the same thing can honestly disagree. That makes the project a gentle, shareable way to talk about perception, polarisation and the limits of a single "correct" view, and a natural fit for an exhibition, a web game or a research collaboration. Ethical guardrails (consent, no targeting of vulnerable groups, no use for persuasion) would be part of the design from the start.

## Miles's original notes

> Art #2
>
> Try to specifically find things where human perception is split. Stuff like "the dress" whereby the description or more specifically preferred descriptions of the perception of the thing. The AI uses humans to create this art. Essentially you are trying to find basilisks for the human mind.

## Links

- The dress (Wikipedia): https://en.wikipedia.org/wiki/The_dress
- Yanny or Laurel (Wikipedia): https://en.wikipedia.org/wiki/Yanny_or_Laurel
- Wallisch (2017), "Illumination assumptions account for individual differences in the perceptual interpretation of a profoundly ambiguous stimulus in the color domain: 'The dress'", Journal of Vision: https://jov.arvojournals.org/article.aspx?articleid=2617976
- Elsayed et al. (2018), "Adversarial Examples that Fool both Computer Vision and Time-Limited Humans": https://arxiv.org/abs/1802.08195
- Geng, Park and Owens (2024), "Visual Anagrams: Generating Multi-View Optical Illusions with Diffusion Models": https://dangeng.github.io/visual_anagrams/
- David Langford's BLIT and the "basilisk" image idea (Wikipedia): https://en.wikipedia.org/wiki/BLIT_(short_story)
- Related card: Art #1, agents instructing humans (inspired by Daniel Temkin)
`},{slug:"art-local-brushstroke-model",title:"By Your Own Hand: a local brushstroke model that learns your style",order:17,tags:["art","training","commercial"],aliases:[],codename:null,summary:"By Your Own Hand is a painting assistant for visual artists that works in brushstrokes rather than text prompts. A general-purpose base model understands how strokes build up an image, a kind of visual auto-complete, and then learns one artist's particular style from a small sample of their own work. Everything runs locally, so the artist's work and the resulting style model never leave our machine. The artist owns the model: they can use it simply to speed themselves up, or license their style to other artists who paint with it stroke by stroke, rather than to anyone typing a prompt",body:`
# By Your Own Hand: a local brushstroke model that learns your style

## Tags

[art](#tag/art) · [training](#tag/training) · [commercial](#tag/commercial)

## Title

**By Your Own Hand: visual auto-complete that learns your brushstrokes, stays on your machine, and belongs to you**

## Short summary

By Your Own Hand is a painting assistant for visual artists that works in brushstrokes rather than text prompts. A general-purpose base model understands how strokes build up an image, a kind of visual auto-complete, and then learns one artist's particular style from a small sample of their own work. Everything runs locally, so the artist's work and the resulting style model never leave our machine. The artist owns the model: they can use it simply to speed themselves up, or license their style to other artists who paint with it stroke by stroke, rather than to anyone typing a prompt

## Card

Most generative image tools ask artists to stop painting and start writing. You describe what you want in text, and the model produces a finished picture trained on other people's work. For many visual artists that is the wrong way round: their skill lives in their hand, not in their vocabulary, and the tools treat their style as something to be scraped rather than something they own.

**The idea.** By Your Own Hand works at the level of the brushstroke. The base model is trained to predict strokes, not pixels: given what is on the canvas, it suggests the next few marks, much as a code editor suggests the next line. On top of that, it learns *your* style from a small set of your own paintings or recorded sessions, ideally close to one-shot. The result is a personal style model that continues your marks the way you would make them, and that you can accept, ignore or paint over.

**Local and owned.** The base model and your style model run on your own computer. Nothing is uploaded, so your work cannot quietly become someone else's training data. The style model is a file you keep, like a brush set. You can use it purely to speed up your own practice, or you can sell or license it.

**A market for styles, among artists.** The selling point is deliberate: a style model is only useful to someone who is already making strokes on the page. It augments a painter rather than replacing one, so the buyer is another artist working alongside your style, not someone generating images from a prompt.

**What already exists.** There is a solid research base for stroke-based painting: Learning to Paint (2019), Stylized Neural Painting and Paint Transformer (2021) all decompose images into parametrised strokes, SketchRNN (2017) generates drawings stroke by stroke, and CMU's work on robotic painting learnt brushstroke style from human artists. Recent work shows diffusion models generating oil-painting brushstrokes from little data. On the tools side, the Krita AI Diffusion plugin already runs local models inside a painting app. At the same time, tools such as Glaze and Nightshade exist because artists want protection from style mimicry. By Your Own Hand sits in the gap: stroke-native, local, and putting the artist in control of their own style.

**Open questions.** How few examples are genuinely needed to capture a style? Should the model learn from finished images, from recorded stroke data (pen pressure, speed, order), or both? How would a style model be licensed and protected from being copied? Which painting app should it plug into first?

## Miles's original notes

> Art #3
>
> One shot learning of your particular style - kept local. General purpose model is a brushstroke based model - sort of a visual auto-complete but then it learns *your particular style* that you have fed it. Everything stays local. The objective is to empower visual artists so they can use their own brush strokes not have to switch into text. Also they keep the model that they create so all it does is speed them up and/or give them to specifically sell *their* style to other artists (not other randoms but others able to make strokes on the page)

## Links

- Related cards: the other art ideas in this register (Art #1 and Art #2)
- Huang et al., Learning to Paint with Model-based Deep Reinforcement Learning (2019): https://arxiv.org/abs/1903.04411
- Zou et al., Stylized Neural Painting (2021): https://arxiv.org/abs/2011.08114
- Liu et al., Paint Transformer (2021): https://arxiv.org/abs/2108.03798
- Ha and Eck, A Neural Representation of Sketch Drawings (SketchRNN, 2017): https://arxiv.org/abs/1704.03477
- Bidgoli et al., Artistic Style in Robotic Painting: Learning Brushstroke from Human Artists (CMU): https://arxiv.org/abs/2007.03647
- Data-Efficient Brushstroke Generation with Diffusion Models for Oil Painting (2026): https://arxiv.org/abs/2603.01103
- Krita AI Diffusion plugin (local generation in Krita): https://github.com/Acly/krita-ai-diffusion
- Glaze and Nightshade (University of Chicago, style-mimicry protection): https://glaze.cs.uchicago.edu
`},{slug:"rugged-offline-device",title:"Rugged Local AI: an offline advisor for extreme weather and first responders",order:18,tags:["mozilla","commercial"],aliases:[],codename:null,summary:"Rugged Local AI is a small, tough, battery-powered device that gives specific, practical advice when there is no signal and no one to ask: a skipper out at sea, a search and rescue team in the back country, or a community cut off after a storm. It runs a small open-weight language model entirely on the device, grounded in a curated library of vetted guidance (first aid, sea survival, equipment manuals, local procedures), so it can answer a plain-language question and point to the page it came from. The point is not a clever chatbot but a reliable one: narrow, checkable, and still working when the cloud is gone. It is a natural fit for Cyborg Garden's local-model work and its interest in trading raw intelligence for reliability.",body:`
# Rugged Local AI: an offline advisor for extreme weather and first responders

## Tags

[mozilla](#tag/mozilla) · [commercial](#tag/commercial)

## Title

**Rugged Local AI: an offline advisor for extreme weather and first responders**

## Short summary

Rugged Local AI is a small, tough, battery-powered device that gives specific, practical advice when there is no signal and no one to ask: a skipper out at sea, a search and rescue team in the back country, or a community cut off after a storm. It runs a small open-weight language model entirely on the device, grounded in a curated library of vetted guidance (first aid, sea survival, equipment manuals, local procedures), so it can answer a plain-language question and point to the page it came from. The point is not a clever chatbot but a reliable one: narrow, checkable, and still working when the cloud is gone. It is a natural fit for Cyborg Garden's local-model work and its interest in trading raw intelligence for reliability.

## Card

When things go wrong, they often go wrong where the network isn't. Boats out of range, trampers and LandSAR teams in the hills, rural volunteers, and whole regions after an event like Cyclone Gabrielle, when power and mobile coverage went down across Hawke's Bay and Tairāwhiti for days. Cloud AI is no help in any of these places. The people there still need clear, specific answers: how to treat this injury, how to restart this pump, what the procedure is for a man overboard, how to purify this water.

**What it is.** A small, rugged device (waterproof, drop-tolerant, long battery life, ideally solar-chargeable) that runs a small language model locally. You ask it a question by voice or text and it answers in plain language, step by step, with a reference to the source it relied on. No connection required, ever.

**Why now.** Small open-weight models in the 1 to 4 billion parameter range now run acceptably on phone-class chips and on boards like the Raspberry Pi 5. Hobbyists and hackathon teams have already built offline "survival copilots", and others have paired a solar-powered model with a Meshtastic LoRa mesh so that one device can answer questions sent from cheap radios across a wide area. The parts exist; what is missing is a product people can trust with their lives.

**Reliability over intelligence.** That is the real work, and it is where this links to the Runtime Governance idea. A general chatbot that confidently makes things up is dangerous in a crisis. Rugged Local AI should:

- answer only from a curated, vetted library, and say so when it doesn't know;
- show its source for every answer, so the user can check;
- be tested heavily against realistic scenarios, with clear limits on scope;
- possibly use the same live monitoring and steering of the model's internal state to catch drift before it reaches the user.

**Who might use it.** Coastguard and recreational boaties, LandSAR, rural fire and St John volunteers, Civil Defence centres, remote work crews, and offshore or Pacific Island communities. Each group would get its own content pack, which is also a plausible business model: the device is cheap, the curated and maintained knowledge is the product.

**Open questions.** Liability and certification for safety advice; whether a dedicated device beats an app on a rugged phone; who supplies and keeps the content up to date; and whether the mesh network angle (one Rugged Local AI serving a whole team) is the stronger story.

**Next steps.** A prototype on a Raspberry Pi 5 or a rugged phone, one content pack (say, sea survival and first aid), and a test set of scenarios to measure how often it gives safe, correct, sourced answers.

Related cards: runtime-governance-free-range-hosting.

## Miles's original notes

> A small device that is rugged and reliable and can work offline and carry out specific helpful advice in rugged situations such as for emergency services or if someone is out of range out at sea.

## Links

- Related card: [Runtime governance and free-range hosting](#runtime-governance-free-range-hosting)
- Solar-powered LLM over Meshtastic for disaster instructions (CNX Software, Feb 2025): https://www.cnx-software.com/2025/02/20/solar-powered-llm-over-meshtastic-solution-may-provide-live-saving-instructions-during-disasters/
- Lodestar, an offline AI survival copilot (Qualcomm x Meta ExecuTorch hackathon entry): https://lablab.ai/ai-hackathons/qualcomm-x-meta-executorch-hackathon/lodestar/lodestar-offline-ai-survival-copilot
- Running Gemma offline on a Raspberry Pi 5 with LiteRT (Google Developers Blog): https://developers.googleblog.com/en/mastering-edge-ai-on-raspberry-pi-with-litert-and-gemma/
- Offline AI prototype for crisis response (WeAreBrain for Crisis Cognition): https://wearebrain.com/work/offline-ai-prototype-for-crisis-response-built-for-crisis-cognition/
- Possible funding fit: Mozilla Human Scale AI grants https://www.mozillafoundation.org/en/what-we-do/grantmaking/incubator/human-scale-ai/call-for-proposals/
`},{slug:"collective-intelligence-data-union",title:"Collective Intelligence: a data union that trains its own models",order:19,tags:["training","mozilla"],aliases:[],codename:null,summary:`Collective Intelligence is a data union: a group of people who choose to pool their personal data, set the rules for how it is used, and train models with it that they collectively own. Instead of each person's data being quietly harvested by large platforms, members decide together what the data may be used for and share in whatever value it creates. The idea is not new. Mozilla Data Collective, Vana's "data DAOs", Te Hiku Media's Kaitiakitanga licence and health data co-operatives such as MIDATA are all working in this space, so Miles's own view is that this may not need doing again. If it goes ahead, the gap Cyborg Garden could fill is a small, high-trust union whose pooled data trains local, open models that members run and keep themselves, rather than another marketplace for selling datasets.`,body:`
# Collective Intelligence data union

## Tags

[training](#tag/training) · [mozilla](#tag/mozilla)

## Title

**Collective Intelligence: a data union that trains its own models**

## Short summary

Collective Intelligence is a data union: a group of people who choose to pool their personal data, set the rules for how it is used, and train models with it that they collectively own. Instead of each person's data being quietly harvested by large platforms, members decide together what the data may be used for and share in whatever value it creates. The idea is not new. Mozilla Data Collective, Vana's "data DAOs", Te Hiku Media's Kaitiakitanga licence and health data co-operatives such as MIDATA are all working in this space, so Miles's own view is that this may not need doing again. If it goes ahead, the gap Cyborg Garden could fill is a small, high-trust union whose pooled data trains local, open models that members run and keep themselves, rather than another marketplace for selling datasets.

## Card

Most of the data that trains today's models was collected without anyone really agreeing to it. A data union flips that around. People who are willing to share join together, pool their data under rules they set, and bargain as a group over how it is used, much as a trade union bargains over labour. The fun name for ours would be "Collective Intelligence".

**The honest bit: a lot of people are already doing this.**

- **Mozilla Data Collective** (incubated by Mozilla Foundation, live since November 2025, standalone since May 2026) lets communities and organisations share datasets on their own terms. Uploaders decide who gets access and at what price, and are due to receive 100% of the licence fee. It already holds more than 600 datasets in over 300 languages, building on the Common Voice project.
- **Vana**, which started as an MIT class project, lets people export their data from platforms such as Reddit or Spotify into "data DAOs". Contributors get a share of ownership in models trained on the pool; one Reddit pool drew more than 140,000 contributors.
- **Te Hiku Media** here in Aotearoa has shown a different model: data sovereignty under its Kaitiakitanga licence, where the community keeps guardianship of te reo Māori recordings and the models built from them.
- **Data co-operatives** such as MIDATA in Switzerland (health data) and Driver's Seat in the US (gig workers' driving data) show the co-op form working at small scale.

**Where we might still add something.** The existing projects mostly treat data as something to license to whoever builds the model. Cyborg Garden's angle could be to keep the whole loop inside the union: members pool data, the union fine-tunes a shared local model on it (see the training ideas in this register), and every member can run that model on their own hardware and walk away with the weights. The value goes back to members as a better model rather than as small payments. That links to the agent swarming and Agency Credit ideas: a union of people running local agents could share knowledge as well as spare cycles.

**Open questions:** whether this is worth doing at all given the prior art; whether it would be better to join or partner with Mozilla Data Collective than to build our own; consent and privacy when personal data trains a shared model (models can leak what they were trained on); and governance, meaning who decides what the union's model is used for.

## Miles's original notes

> Creating a data union for those willing to share their data .. and train models.. Well this is already beeing done in so many ways and by Mozilla most recently so maybe not. But it could be called "Collective Intelligence" which is a fun name,

## Links

- Mozilla Data Collective: https://mozilladatacollective.com
- Mozilla Data Collective launch press release: https://www.mozillafoundation.org/en/meet-mozilla/press-center/mozilla-data-collective-launches
- Mozilla Data Collective standalone launch (May 2026): https://www.mozillafoundation.org/en/meet-mozilla/press-center/mozilla-data-collective-standalone-launch-new-features/
- Vana lets users own a piece of the AI models trained on their data (MIT News, 2025): https://news.mit.edu/2025/vana-lets-users-own-piece-ai-models-trained-on-their-data-0403
- Data cooperatives and decentralised AI (overview): https://crowdsourcingweek.com/blog/decentralized-data-ownership-and-data-cooperatives/
- Te Hiku Media on data sovereignty and its te reo speech models (NVIDIA blog): https://blogs.nvidia.com/blog/te-hiku-media-maori-speech-ai/
- Related cards: agent swarming, Agency Credit (agent mutual aid token), local model fine-tuning as a service
`},{slug:"instant-hosting-mcp",title:"Plot: instant web hosting for agents",order:20,tags:["mcp","only-agents","commercial"],aliases:[],codename:null,summary:`Agents are increasingly asked to make something people can look at: a report, a dashboard, a prototype, a card site like this one. Getting it in front of a person still means a human with a hosting account. Plot is an MCP tool an agent can call with a folder of files and get a working URL back in seconds. The big hosts have mostly caught up: Netlify, Vercel and Cloudflare all have official MCP servers that can deploy, and newcomers such as ShipStatic offer anonymous, no-account publishing. So Plot is less about building the plumbing and more about the Cyborg Garden version of it: agent-first, link-only by default, Discord-preview friendly, cheap enough to run on "free range" hosting, and wired into Swarm Map so a fleet of agents can publish without each needing a human's credentials.`,body:`
# Plot: instant web hosting for agents

## Tags

[mcp](#tag/mcp) · [only-agents](#tag/only-agents) · [commercial](#tag/commercial)

## Title

**Plot** — a one-call MCP that lets any agent put a static site or single-page app live at a shareable link.

## Short summary

Agents are increasingly asked to make something people can look at: a report, a dashboard, a prototype, a card site like this one. Getting it in front of a person still means a human with a hosting account. Plot is an MCP tool an agent can call with a folder of files and get a working URL back in seconds. The big hosts have mostly caught up: Netlify, Vercel and Cloudflare all have official MCP servers that can deploy, and newcomers such as ShipStatic offer anonymous, no-account publishing. So Plot is less about building the plumbing and more about the Cyborg Garden version of it: agent-first, link-only by default, Discord-preview friendly, cheap enough to run on "free range" hosting, and wired into Swarm Map so a fleet of agents can publish without each needing a human's credentials.

## Card

Miles's question was simple: if you are an agent, can you host a website quickly, and doesn't Cloudflare already do that? The short answer is "mostly yes, but always on someone's account".

**What already exists (October 2026)**

- **Netlify** has an official MCP server that can create projects and deploy sites from an agent. It requires a Netlify account and token.
- **Vercel's** MCP gained a \`deploy_to_vercel\` tool in July 2026. An agent hands over files and gets back a live URL with no git repo or CLI needed. A Vercel account is still behind it.
- **Cloudflare** runs a set of MCP servers. The main one exposes the whole Cloudflare API through a search-and-execute pattern, so an agent can in principle create Workers and push a Pages site. It is powerful but low-level, and it needs an account with fairly broad permissions. (garden-sandbox.pages.dev, where this register will live, is itself on Cloudflare Pages.)
- **ShipStatic** is the closest to Miles's idea: an MCP endpoint where an agent publishes static files anonymously and gets a link in seconds. Anonymous sites expire after three days unless someone claims them.
- Agent platforms are also building this in. Claude, for example, can already publish a private, shareable page from a conversation.

**Where the gap is**

All of these assume a human owner with an account, and a credential that, if given to an agent, usually grants far more than "publish this one page". None of them are designed around fleets of agents, and none of them speak to where the hosting physically runs.

**What Plot would be**

A small MCP service, run by Cyborg Garden and installable alongside Swarm Map, with one main tool: \`publish(files) → url\`. Sensible defaults would include:

- **Link-only and unguessable** by default, with an optional expiry, so drafts can be shared without being public.
- **Good link previews**: Open Graph tags generated from the page title and summary, so a link dropped into Discord shows its headline (exactly what this ideas register needs).
- **Scoped, per-agent credentials** issued by Swarm Map, so an agent can publish to its own corner and nothing else, and the operator can see and take down anything any agent has published.
- **Hash-routed SPAs** working out of the box, e.g. \`…/utunga_ideas#idea216\`.
- **Free-range hosting**: the backend can be Cloudflare, a local box, or a low-carbon data centre, linking to the runtime governance and open hosting idea.
- Optionally, paid for in **agent tokens** rather than dollars, linking to the mutual aid token idea.

**Effort and risk**

The build is small: a thin MCP wrapper over Cloudflare Pages direct upload or a plain object store would be a few days' work. The real design questions are around abuse (phishing pages, malware hosting) and who is accountable for what an agent publishes. That is where Swarm Map's oversight is a genuine selling point rather than an afterthought.

**Recommendation**

Don't compete with Netlify or Vercel as a general host. Build Plot first as an internal Cyborg Garden tool (it would immediately serve this register), then offer it as a standard part of a NimbleCo install.

## Miles's original notes

> MCP idea
>
> Just being able to host a website super quickly if you are an agent. But I guess this is something you can do via cloudflare?
>
> So for hosting stuff there has to be an mcp somewhere that allows you (as an agent) to quickly upload something - especially a static something to a website just to put something live as a SPA app for end user ?

## Links

- Netlify MCP server: https://docs.netlify.com/build/build-with-ai/netlify-mcp-server/
- Vercel MCP can now deploy code (23 July 2026): https://vercel.com/changelog/vercel-mcp-can-now-deploy-code
- Cloudflare MCP servers overview: https://www.fast.io/resources/mcp-server-for-cloudflare/
- ShipStatic MCP (anonymous static publishing): https://mcpservers.org/servers/shipstatic/mcp
- Related cards: runtime-governance-free-range-hosting.md, agent-mutual-aid-token.md, nimbleco-swarm-map-installs.md
`}]};(function(){const n=St,e=document.getElementById("main"),t=n.cards,a=Object.fromEntries(n.tags.map(d=>[d.slug,d])),s={};for(const d of t){s[d.slug]=d;for(const g of d.aliases)s[g]=d}const i=t.length,c=d=>String(d).padStart(2,"0"),o=d=>c(t.indexOf(d)+1),l=d=>String(d).replace(/[&<>"]/g,g=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[g]),r='<span class="lamp" aria-hidden="true"></span>',h='<span class="lamp on" aria-hidden="true"></span>',u=new Date(n.compiled).toLocaleDateString("en-NZ",{day:"numeric",month:"short",year:"numeric"});f.setOptions({gfm:!0,breaks:!1}),document.getElementById("compiled").innerHTML=`${h} ${i} files on record. Compiled ${l(u)}.`;function k(d){const g=document.createElement("div");g.innerHTML=f.parse(d||"");for(const m of g.querySelectorAll("a[href]")){const v=m.getAttribute("href"),T=v.match(/^(?:\.\/)?([\w-]+)\.md(#.*)?$/);if(T){const A=T[1];m.setAttribute("href",A==="_tags"?"#tags":A==="_index"?"#":A==="_funding"?"#funding":"#"+A)}else(/^https?:/i.test(v)||/\.pdf$/i.test(v))&&(m.target="_blank",m.rel="noopener")}for(const m of g.querySelectorAll("table")){const v=document.createElement("div");v.className="table-wrap",m.replaceWith(v),v.appendChild(m)}return g.innerHTML}function p(d){const m=d.replace(/^#\s+.*$/m,"").split(/^##\s+/m),v=[];m[0].trim()&&v.push({heading:"",text:m[0]});for(const T of m.slice(1)){const A=T.indexOf(`
`),I=(A<0?T:T.slice(0,A)).trim();v.push({heading:I,text:A<0?"":T.slice(A+1)})}return v.filter(T=>!/^(tags|title)$/i.test(T.heading))}const x=d=>`<section class="${E(d.heading)}">${d.heading?`<h2>${l(d.heading)}</h2>`:""}<div class="body">${k(d.text)}</div></section>`,q=d=>/original notes|^links$|appendix/i.test(d),E=d=>"s-"+(/short summary/i.test(d)?"summary":d.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""));function _(d){if(d.codename)return d.codename;const g=d.title.split(":");return g.length>1?g[0]:"N° "+o(d)}function R(d){let g=d.toUpperCase();if(g.startsWith("N° "))return A(["N°",g.slice(3)]);let m=g.replace(/[^A-Z0-9]/g,"");m.length>12&&(m=g.split(/\s+/)[0].replace(/[^A-Z0-9]/g,""));const v=m.length<=8?2:3,T=[];for(let I=0;I<m.length;I+=v)T.push(m.slice(I,I+v));A(T);function A(I){document.getElementById("stack").innerHTML=I.map(ee=>`<span>${l(ee)}</span>`).join("")}}function M(d,g){document.getElementById("v1").textContent=d,document.getElementById("v2").textContent=g}function Y(d,g=" · "){return d.tags.map(m=>`<a href="#tag/${l(m)}">${l(P(m))}</a>`).join(g)}const P=d=>d.replace(/-/g," ");function z(d){return d.tags.map(g=>l(P(g))).join(" · ")}const De=d=>(d.replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/[*_`]/g,"").match(/^.*?[.!?](\s|$)/)||[d])[0].trim();function X(d){return d.length?'<ol class="ledger">'+d.map(g=>`
      <li><a href="#${l(g.slug)}">
        ${r}
        <span class="no">${o(g)}</span>
        <span class="t" title="${l(g.title)}">${l(g.title)}</span>
        <span class="tg" title="${z(g)}">${z(g)}</span>
      </a></li>`).join("")+"</ol>":'<ol class="ledger"><li class="empty">No files carry this classification yet.</li></ol>'}function me(){return'<div class="classes">'+n.tags.map(d=>{const g=t.filter(m=>m.tags.includes(d.slug)).length;return`<a class="cls" href="#tag/${l(d.slug)}">
        <span class="cls-top"><span class="cls-name">${l(d.name)}</span><span class="cls-n">${r}${c(g)} ${g===1?"file":"files"}</span></span>
        <p class="cls-blurb">${l(De(d.blurb||""))}</p>
      </a>`}).join("")+'<a class="cls" href="#funding"><span class="cls-top"><span class="cls-name">Funding ideas</span></span></a></div>'}function Q(d,g){return`<div class="section-head"><h2>${d}</h2><span class="fill"></span><span class="label">${g}</span></div>`}function qe(){return R("REGISTER"),M("Cyborg Garden","Venture and project register"),document.title=n.config.title,`
      <figure class="plate"><img src="./assets/switches.jpg" alt="" width="1610" height="395"></figure>
      <section class="hero">
        <div>
          <p class="eyebrow">Cyborg Garden · Venture and project register</p>
          <h1 class="hero-title">Idea<br><span class="nowrap">Register<span class="caret" aria-hidden="true"></span></span></h1>
        </div>
        <div>
          <div class="hero-intro">${k(n.home)}</div>
          <p class="count"><span><b>${c(i)}</b> files on record</span><span><b>${c(n.tags.length)}</b> classifications</span><span>Compiled ${l(u)}</span></p>
        </div>
      </section>
      ${Q("Files on record","Order · Title · Classification")}
      ${X(t)}
      ${Q("Classifications",`${n.tags.length} in use`)}
      ${me()}`}function Ee(){return R("CLASSES"),M("Cyborg Garden","Classifications"),document.title="Classifications · "+n.config.title,`
      <div class="topline"><a href="#">Register</a><span>/</span><span>Classifications</span><span class="fill"></span></div>
      <header class="file-head"><h1 class="file-title">Classifications</h1></header>
      ${me()}`}function je(d){const g=a[d];if(!g)return fe("#tag/"+d);const m=t.filter(v=>v.tags.includes(d));return R(g.slug.replace(/-/g," ")),M("Classification",g.name),document.title=g.name+" · "+n.config.title,`
      <div class="topline"><a href="#">Register</a><span>/</span><a href="#tags">Classifications</a><span>/</span><span>${l(g.name)}</span><span class="fill"></span><span>${c(m.length)} ${m.length===1?"file":"files"}</span></div>
      <header class="file-head">
        <p class="eyebrow">Classification</p>
        <h1 class="file-title">${l(g.name)}</h1>
      </header>
      <div class="tag-blurb">${k(g.blurb)}</div>
      ${Q("Files","Order · Title · Classification")}
      ${X(m)}`}function Ge(d){const g=t.indexOf(d),m=t[g-1],v=t[g+1],T=a[d.tags[0]],A=`${n.config.siteUrl.replace(/\/$/,"")}/f/${d.slug}/`;R(_(d)),M(`File N° ${o(d)} of ${c(i)}`,d.tags.map(P).join(" · ")),document.title=d.title+" · "+n.config.title;const I=p(d.body),ee=I.filter(te=>!q(te.heading)).map(x).join(""),ye=I.filter(te=>q(te.heading));return`
      <div class="topline"><a href="#">Register</a><span>/</span><span class="lit">${h}File N° ${o(d)}</span><span class="fill"></span><span>${c(g+1)} of ${c(i)}</span></div>
      <header class="file-head">
        <h1 class="file-title">${l(d.title)}</h1>
        ${T?`<a class="stamp" href="#tag/${l(T.slug)}" title="All files classified ${l(T.name)}">${l(P(T.slug))}</a>`:""}
      </header>
      <div class="file-grid">
        <article class="doc">
          ${ee}
          ${ye.length?`<div class="annex"><span class="label">Annex</span>${ye.map(x).join("")}</div>`:""}
          <nav class="pager" aria-label="Neighbouring files">
            ${m?`<a class="prev" href="#${l(m.slug)}" rel="prev"><span class="label">${r}← File ${o(m)}</span><span class="pt">${l(m.title)}</span></a>`:"<span></span>"}
            ${v?`<a class="next" href="#${l(v.slug)}" rel="next"><span class="label">File ${o(v)} →${r}</span><span class="pt">${l(v.title)}</span></a>`:""}
          </nav>
          <p class="hint">Use the left and right arrow keys to move between files.</p>
        </article>
        <aside class="meta" aria-label="File details">
          <dl>
            <div class="row"><dt class="label">File</dt><dd>N° ${o(d)} of ${c(i)}</dd></div>
            <div class="row"><dt class="label">Classification</dt><dd class="tags">${Y(d," · ")}</dd></div>
            <div class="row"><dt class="label">Direct link</dt><dd><a href="#${l(d.slug)}">#${l(d.slug)}</a></dd></div>
            <div class="row"><dt class="label">Shareable link</dt><dd><a class="share-url" href="${l(A)}">${l(A)}</a></dd></div>
          </dl>
        </aside>
      </div>`}function We(){return R("GRANTS"),M("Cyborg Garden","Funding ideas"),document.title="Funding ideas · "+n.config.title,`
      <div class="topline"><a href="#">Register</a><span>/</span><a href="#tags">Classifications</a><span>/</span><span>Funding ideas</span><span class="fill"></span></div>
      <header class="file-head"><h1 class="file-title">Funding ideas</h1></header>
      <div class="file-grid"><article class="doc">${p(n.funding).map(x).join("")}</article></div>`}function fe(d){return R("N° 00"),M("Register","No such file"),document.title="No such file · "+n.config.title,`
      <div class="topline"><a href="#">Register</a><span>/</span><span>Unknown file</span><span class="fill"></span></div>
      <header class="file-head"><h1 class="file-title">No file at ${l(d)}</h1><span class="stamp">Not on record</span></header>
      <p>That link does not match any file in the register. It may have been renamed. Choose a file below.</p>
      ${X(t)}`}let j=null;function we(){const d=decodeURIComponent(location.hash.replace(/^#\/?/,""));let g;j=null,d?d==="tags"?g=Ee():d==="funding"&&n.funding?g=We():d.startsWith("tag/")?g=je(d.slice(4)):s[d]?(j=s[d],g=Ge(j)):g=fe("#"+d):g=qe(),e.innerHTML=`<div class="sheet">${g}</div>`,window.scrollTo(0,0),d&&e.focus({preventScroll:!0})}window.addEventListener("hashchange",we),we(),document.querySelector("[data-skip]").addEventListener("click",d=>{d.preventDefault(),e.focus()}),document.addEventListener("keydown",d=>{if(!j||d.altKey||d.ctrlKey||d.metaKey||/input|textarea|select/i.test(d.target.tagName))return;const g=t.indexOf(j);d.key==="ArrowRight"&&t[g+1]&&(location.hash=t[g+1].slug),d.key==="ArrowLeft"&&t[g-1]&&(location.hash=t[g-1].slug)})})();
