(this["webpackJsonpwhatsapp-clone"]=this["webpackJsonpwhatsapp-clone"]||[]).push([[0],{164:function(e,t,a){},165:function(e,t,a){},166:function(e,t,a){},167:function(e,t,a){},252:function(e,t,a){},253:function(e,t,a){},256:function(e,t,a){"use strict";a.r(t);var c=a(0),s=a.n(c),n=a(22),i=a.n(n),o=(a(164),a(6)),r=(a(165),a(166),a(284)),d=a(277),l=a(138),j=a.n(l),m=a(139),u=a.n(m),h=a(146),b=a.n(h),O=a(278),p=(a(167),a(100)),f=p.a.initializeApp({apiKey:"AIzaSyDFHrTHY9PTPlhOVzvIksYwK9rr4EN6N-Q",authDomain:"whatsapp-clone-1d69b.firebaseapp.com",projectId:"whatsapp-clone-1d69b",storageBucket:"whatsapp-clone-1d69b.appspot.com",messagingSenderId:"1015522554165",appId:"1:1015522554165:web:d144541838a8f62348dc7c"}),x=f.firestore(),v=f.auth(),g=new p.a.auth.GoogleAuthProvider,w=x,N=a(59),S=(a(282),a(5)),C=Object(c.createContext)(),y=function(e){var t=e.reducer,a=e.initialState,s=e.children;return Object(S.jsx)(C.Provider,{value:Object(c.useReducer)(t,a),children:s})},D=function(){return Object(c.useContext)(C)};var _=function(e){var t,a=e.id,s=e.name,n=e.addNewChat,i=e.email,d=D(),l=Object(o.a)(d,2),j=l[0].user,m=(l[1],Object(c.useState)("")),u=Object(o.a)(m,2),h=u[0],b=u[1],O=Object(c.useState)(""),p=Object(o.a)(O,2),f=p[0],x=p[1],v=Object(c.useState)(!0),g=Object(o.a)(v,2),C=(g[0],g[1]),y=Object(c.useState)(0),_=Object(o.a)(y,2),I=_[0],E=_[1];return Object(c.useEffect)((function(){a&&w.collection("rooms").doc(a).collection("messages").orderBy("timestamp","desc").onSnapshot((function(e){x(e.docs.map((function(e){return e.data()})));var t=e.docs.map((function(e){return e.data()})).reduce((function(e,t){return e.includes(t.name)||e.push(t.name),e}),[]);E(t.length),i&&!i.includes(j.email)?C(!1):C(!0)}))}),[a]),Object(c.useEffect)((function(){b(Math.floor(5e3*Math.random()))}),[]),n?Object(S.jsx)("div",{onClick:function(){var e=prompt("Please Enter Name for Chat"),t=prompt("Enter the Participant email-id");e&&t&&w.collection("rooms").add({name:e,email:[t,j.email]})},className:"sidebarChat",children:Object(S.jsx)("h3",{className:"add-new-chat-title",children:"Add New Chat"})}):Object(S.jsx)(N.b,{to:"/rooms/".concat(a),children:Object(S.jsxs)("div",{className:"sidebarChat",children:[Object(S.jsx)(r.a,{src:"https://avatars.dicebear.com/api/human/".concat(h,".svg")}),Object(S.jsxs)("div",{className:"sidebarChat_info",children:[Object(S.jsx)("h2",{children:s}),Object(S.jsxs)("p",{children:["Last message : ",null===(t=f[0])||void 0===t?void 0:t.message]}),Object(S.jsx)("p",{children:I+" People are here"})]})]})},a)},I=a(283),E=a(137),k=a.n(E),P=a(23);var L=function(e){Object(P.f)();var t=Object(c.useState)([]),a=Object(o.a)(t,2),s=a[0],n=a[1],i=D(),l=Object(o.a)(i,2),m=l[0].user,h=(l[1],Object(c.useState)("")),p=Object(o.a)(h,2),f=p[0],x=p[1];Object(c.useEffect)((function(){f.length?n(window.rooms.filter((function(e){return e&&e.data.name.toLowerCase().includes(f.toLowerCase())}))):window.rooms&&n(window.rooms)}),[f]),Object(c.useEffect)((function(){window.rooms=[];var e=w.collection("rooms").onSnapshot((function(e){return n(e.docs.map((function(e){return window.rooms.push(e.data().email.includes(m.email)?{id:e.id,data:e.data()}:void 0),e.data().email.includes(m.email)?{id:e.id,data:e.data()}:void 0})))}));return function(){e()}}),[]);var g=Object(S.jsxs)("div",{style:{display:"flex",justifyContent:"center",cursor:"pointer"},onClick:function(){v.signOut(),localStorage.removeItem("userDetails"),window.location.href=window.location.href.slice(0,window.location.href.indexOf("rooms"))},children:[Object(S.jsx)(k.a,{}),"Logout"]});return Object(S.jsxs)("div",{className:"sidebar",children:[Object(S.jsxs)("div",{className:"sidebar_header",children:[Object(S.jsx)(r.a,{src:null===m||void 0===m?void 0:m.photoURL}),Object(S.jsxs)("div",{className:"sidebar_headerRight",children:[Object(S.jsx)(d.a,{children:Object(S.jsx)(j.a,{})}),Object(S.jsx)(d.a,{children:Object(S.jsx)(u.a,{})}),Object(S.jsx)(d.a,{children:Object(S.jsx)(I.a,{content:g,title:"Options",trigger:"click",children:Object(S.jsx)(b.a,{})})})]})]}),Object(S.jsx)("div",{className:"sidebar_search",children:Object(S.jsxs)("div",{className:"sidebar_searchContainer",children:[Object(S.jsx)(O.a,{}),Object(S.jsx)("input",{onChange:function(e){x(e.target.value)},type:"text",placeholder:"Search or start new chat"})]})}),Object(S.jsxs)("div",{className:"sidebar_chats",children:[Object(S.jsx)(_,{addNewChat:!0}),s.map((function(e){return e?Object(S.jsx)(_,{id:e.id,name:e.data.name,email:e.data.email},e.id):null}))]})]})},T=a(279),A=a(280),M=a(148),B=a.n(M),F=a(147),R=a.n(F),J=(a(252),a(48)),U=a.n(J);var W=function(){var e,t=Object(c.useState)(""),a=Object(o.a)(t,2),s=a[0],n=a[1],i=Object(c.useState)(""),l=Object(o.a)(i,2),j=l[0],m=l[1],u=Object(P.g)().roomId,h=Object(c.useState)(""),b=Object(o.a)(h,2),p=b[0],f=b[1],x=Object(c.useState)([]),v=Object(o.a)(x,2),g=v[0],N=v[1],C=D(),y=Object(o.a)(C,2),_=y[0].user;return y[1],Object(c.useEffect)((function(){u&&(w.collection("rooms").doc(u).onSnapshot((function(e){f(e.data().name)})),w.collection("rooms").doc(u).collection("messages").orderBy("timestamp","asc").onSnapshot((function(e){N(e.docs.map((function(e){return e.data()})))})))}),[u]),Object(c.useEffect)((function(){m(Math.floor(5e3*Math.random()))}),[u]),Object(S.jsxs)("div",{className:"chat",children:[Object(S.jsxs)("div",{className:"chat_header",children:[Object(S.jsx)(r.a,{src:"https://avatars.dicebear.com/api/human/".concat(j,".svg")}),Object(S.jsxs)("div",{className:"chat_headerInfo",children:[Object(S.jsx)("h3",{className:"chat-room-name",children:p}),Object(S.jsxs)("p",{className:"chat-room-last-seen",children:["Last seen "," ",U()(new Date(null===(e=g[g.length-1])||void 0===e?void 0:e.timestamp1)).fromNow()]})]}),Object(S.jsxs)("div",{className:"chat_headerRight",children:[Object(S.jsx)(d.a,{children:Object(S.jsx)(O.a,{})}),Object(S.jsx)(d.a,{children:Object(S.jsx)(T.a,{})}),Object(S.jsx)(d.a,{children:Object(S.jsx)(A.a,{})})]})]}),Object(S.jsx)("div",{className:"chat_body",children:g.map((function(e){return Object(S.jsxs)("p",{className:"chat_message ".concat(e.name==_.displayName&&"chat_receiver"),children:[Object(S.jsx)("span",{className:"chat_name",children:e.name}),e.message,Object(S.jsxs)("span",{className:"chat_timestemp",children:[U()(new Date(g.timestamp1)).fromNow().includes("seconds")&&U()(new Date(e.timestamp1)).fromNow().includes("minutes")&&U()(new Date(null===e||void 0===e?void 0:e.timestamp1)).fromNow().includes("hours")?U()(new Date(e.timestamp1)).format("hh:mm A"):U()(new Date(e.timestamp1)).fromNow()," ",U()(new Date(e.timestamp1)).fromNow().includes("seconds")&&U()(new Date(e.timestamp1)).fromNow().includes("minutes")&&U()(new Date(e.timestamp1)).fromNow().includes("hours")?new Date(e.timestamp1).toDateString():""]})]},e.id)}))}),Object(S.jsxs)("div",{className:"chat_footer",children:[Object(S.jsx)(R.a,{}),Object(S.jsxs)("form",{children:[Object(S.jsx)("input",{value:s,onChange:function(e){return n(e.target.value)},type:"text",placeholder:"Type a message"}),Object(S.jsx)("button",{type:"submit",onClick:function(e){e.preventDefault(),w.collection("rooms").doc(u).collection("messages").add({message:s,name:_.displayName,timestamp:(new Date).toUTCString(),timestamp1:(new Date).toUTCString()}),n("")},children:" Send a Message"})]}),Object(S.jsx)(B.a,{})]})]})},z=a(149),G=a(281),H=(a(253),a(4)),K="SET_USER",Y=function(e,t){return t.type===K?Object(H.a)(Object(H.a)({},e),{},{user:t.user}):e};var Q=function(){Object(P.f)();var e=D(),t=Object(o.a)(e,2);Object(z.a)(t[0]);var a=t[1];return Object(S.jsx)("div",{className:"login",children:Object(S.jsxs)("div",{className:"login_container",children:[Object(S.jsx)("img",{src:"https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",alt:""}),Object(S.jsx)("div",{className:"login_text",children:Object(S.jsx)("h1",{children:"Sign in to Whatsapp"})}),Object(S.jsx)(G.a,{type:"submit",onClick:function(){v.signInWithPopup(g).then((function(e){a({type:K,user:e.user}),localStorage.setItem("userDetails",JSON.stringify(e.user))})).catch((function(e){return alert(e.message)}))},children:"Sign in With Google"})]})})};var V=function(){var e=D(),t=Object(o.a)(e,2),a=t[0].user,s=t[1];return Object(c.useEffect)((function(){localStorage.getItem("userDetails")&&s({type:K,user:JSON.parse(localStorage.getItem("userDetails"))})}),[]),Object(S.jsx)("div",{className:"app",children:a?Object(S.jsx)("div",{className:"app_body",children:Object(S.jsxs)(N.a,{children:[Object(S.jsx)(L,{}),Object(S.jsxs)(P.c,{children:[Object(S.jsx)(P.a,{path:"/rooms/:roomId",children:Object(S.jsx)(W,{})}),Object(S.jsx)(P.a,{path:"/",children:Object(S.jsx)(W,{})})]})]})}):Object(S.jsx)(Q,{})})},q=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,285)).then((function(t){var a=t.getCLS,c=t.getFID,s=t.getFCP,n=t.getLCP,i=t.getTTFB;a(e),c(e),s(e),n(e),i(e)}))};a(254);i.a.render(Object(S.jsx)(s.a.StrictMode,{children:Object(S.jsx)(y,{initialState:{user:null},reducer:Y,children:Object(S.jsx)(V,{})})}),document.getElementById("root")),q()}},[[256,1,2]]]);
//# sourceMappingURL=main.c9f70fbf.chunk.js.map