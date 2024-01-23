import {
  Label,
  require_user
} from "/build/_shared/chunk-2BP44IGZ.js";
import {
  Input
} from "/build/_shared/chunk-PZZLQ6GB.js";
import "/build/_shared/chunk-QUASSGTN.js";
import {
  Button
} from "/build/_shared/chunk-O3EPNBLP.js";
import "/build/_shared/chunk-3ENBOG2J.js";
import {
  Heading
} from "/build/_shared/chunk-IZHGTWOW.js";
import {
  require_node,
  require_session
} from "/build/_shared/chunk-PI2F3LIC.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-WJQOOBJF.js";
import {
  Form,
  Link,
  useActionData
} from "/build/_shared/chunk-DLGYDX44.js";
import {
  createHotContext
} from "/build/_shared/chunk-2XBJDL35.js";
import "/build/_shared/chunk-2WXVQBZM.js";
import "/build/_shared/chunk-SIXOC54Y.js";
import {
  require_react
} from "/build/_shared/chunk-IZFDETTZ.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/login.tsx
var import_node = __toESM(require_node(), 1);
var import_user = __toESM(require_user(), 1);
var import_react2 = __toESM(require_react(), 1);
var import_session = __toESM(require_session(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\login.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\login.tsx"
  );
  import.meta.hot.lastModified = "1705911702936.2012";
}
var meta = () => [{
  title: "Login | RSS Feed"
}];
function Login() {
  _s();
  const actionData = useActionData();
  const emailRef = (0, import_react2.useRef)(null);
  const passwordRef = (0, import_react2.useRef)(null);
  (0, import_react2.useEffect)(() => {
    if (actionData?.errors.email) {
      emailRef.current?.focus();
    }
    if (actionData?.errors.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-[400px] mx-auto min-w-[350px] h-full flex flex-col items-center justify-center animate-fade-in", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-full m-[16px] flex flex-col gap-[40px] items-start box-border", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heading, { children: "Login" }, void 0, false, {
      fileName: "app/routes/login.tsx",
      lineNumber: 108,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { className: "w-full flex flex-col gap-[16px] items-start", method: "post", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-full flex flex-col gap-[8px] items-start", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { htmlFor: "email", className: "text-[16px] leading-[150%]", children: "Email address" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 111,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, { type: "email", id: "email", autoFocus: true, ref: emailRef, name: "email", placeholder: "richard@piedpiper.com", className: "rounded-[3px] px-[20px] py-[16px] text-[16px] leading-[150%] h-[56px] focus-visible:ring-0 focus-visible:ring-offset-0 border-[#f1f1f1] focus:border-black placeholder:text-[#c0c0c0]" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 114,
          columnNumber: 13
        }, this),
        actionData?.errors.email && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pt-1 text-red-700 animate-fade-in", children: actionData.errors.email }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 116,
          columnNumber: 42
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/login.tsx",
        lineNumber: 110,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-full flex flex-col gap-[8px] items-start", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { htmlFor: "password", className: "text-[16px] leading-[150%]", children: "Password" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 122,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, { type: "password", name: "password", ref: passwordRef, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "rounded-[3px] px-[20px] py-[16px] text-[16px] leading-[150%] h-[56px] focus-visible:ring-0 focus-visible:ring-offset-0 border-[#f1f1f1] focus:border-black placeholder:text-[#c0c0c0]" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 125,
          columnNumber: 13
        }, this),
        actionData?.errors.password && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pt-1 text-red-700 animate-fade-in", children: actionData.errors.password }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 126,
          columnNumber: 45
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/login.tsx",
        lineNumber: 121,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-full flex justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { className: "w-[150px] text-[Inter] text-[16px] leading-[150%] text-white px-[15px] py-[10px] rounded-[3px]", type: "submit", children: "Login" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 132,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "link", className: "text-[#7b7b7b] underline p-0 font-normal", children: "Forgot password?" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 135,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/login.tsx",
        lineNumber: 131,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/login.tsx",
      lineNumber: 109,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-[#7b7b7b] text-[16px] leading-[150%] font-normal", children: [
      "Or",
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { className: "underline p-0 text-[#7b7b7b] text-[16px] leading-[150%] font-normal", to: {
        pathname: "/register"
      }, children: "sign up" }, void 0, false, {
        fileName: "app/routes/login.tsx",
        lineNumber: 143,
        columnNumber: 11
      }, this),
      " ",
      "if you don't have an account."
    ] }, void 0, true, {
      fileName: "app/routes/login.tsx",
      lineNumber: 141,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/login.tsx",
    lineNumber: 107,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/login.tsx",
    lineNumber: 106,
    columnNumber: 10
  }, this);
}
_s(Login, "V051AnT7u1i/L0yu2JS7mtqHUFU=", false, function() {
  return [useActionData];
});
_c = Login;
var _c;
$RefreshReg$(_c, "Login");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Login as default,
  meta
};
//# sourceMappingURL=/build/routes/login-KHTPSHET.js.map
