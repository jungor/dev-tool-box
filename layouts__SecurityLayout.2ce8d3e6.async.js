(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{"0jlH":function(e,t,n){"use strict";n.r(t);var a=n("fWQN"),r=n("mtLc"),c=n("yKVA"),o=n("879j"),i=n("q1tI"),s=n.n(i),u=n("Hx5s"),l=n("Ty5D"),d=n("9kvl"),p=n("s4NR"),f=function(e){Object(c["a"])(n,e);var t=Object(o["a"])(n);function n(){var e;Object(a["a"])(this,n);for(var r=arguments.length,c=new Array(r),o=0;o<r;o++)c[o]=arguments[o];return e=t.call.apply(t,[this].concat(c)),e.state={isReady:!1},e}return Object(r["a"])(n,[{key:"componentDidMount",value:function(){this.setState({isReady:!0})}},{key:"render",value:function(){var e=this.state.isReady,t=this.props,n=t.children,a=t.loading,r=!0,c=Object(p["stringify"])({redirect:window.location.href});return!r&&a||!e?s.a.createElement(u["c"],null):r||"/user/login"===window.location.pathname?n:s.a.createElement(l["c"],{to:"/user/login?".concat(c)})}}]),n}(s.a.Component);t["default"]=Object(d["a"])((function(e){var t=e.user,n=e.loading;return{currentUser:t.currentUser,loading:n.models.user}}))(f)}}]);