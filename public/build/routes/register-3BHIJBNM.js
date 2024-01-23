import {
  Label,
  require_user
} from "/build/_shared/chunk-LDWTZGOL.js";
import {
  Input
} from "/build/_shared/chunk-NB2SGGB6.js";
import {
  Button
} from "/build/_shared/chunk-CSWZSKWD.js";
import {
  Heading
} from "/build/_shared/chunk-NAMH6SKH.js";
import {
  require_node,
  require_session
} from "/build/_shared/chunk-PI2F3LIC.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  Form,
  Link,
  useActionData
} from "/build/_shared/chunk-WY7KWJWX.js";
import {
  createHotContext
} from "/build/_shared/chunk-P24WZNJG.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-GIAAE3CH.js";
import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/register.tsx
var import_react = __toESM(require_react(), 1);
var import_node = __toESM(require_node(), 1);
var import_user = __toESM(require_user(), 1);
var import_session = __toESM(require_session(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\register.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\register.tsx"
  );
  import.meta.hot.lastModified = "1705898932181.761";
}
var meta = () => [{
  title: "Register | RSS Feed"
}];
function Register() {
  _s();
  const emailRef = (0, import_react.useRef)(null);
  const passwordRef = (0, import_react.useRef)(null);
  const actionData = useActionData();
  (0, import_react.useEffect)(() => {
    if (actionData?.errors.email) {
      emailRef.current?.focus();
    }
    if (actionData?.errors.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-[400px] mx-auto min-w-[350px] h-full flex flex-col items-center justify-center animate-fade-in", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-full m-[16px] flex flex-col gap-[40px] items-start box-border", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heading, { children: "Sign up" }, void 0, false, {
      fileName: "app/routes/register.tsx",
      lineNumber: 105,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { className: "w-full flex flex-col gap-[16px] items-start", method: "post", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-full flex flex-col gap-[8px] items-start", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { htmlFor: "email", className: "text-[16px] leading-[150%]", children: "Email address" }, void 0, false, {
          fileName: "app/routes/register.tsx",
          lineNumber: 109,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, { type: "email", id: "email", autoFocus: true, name: "email", ref: emailRef, "aria-invalid": actionData?.errors.email ? true : void 0, required: true, placeholder: "richard@piedpiper.com", className: "rounded-[3px] px-[20px] py-[16px] text-[16px] leading-[150%] h-[56px] focus-visible:ring-0 focus-visible:ring-offset-0 border-[#f1f1f1] focus:border-black placeholder:text-[#c0c0c0]" }, void 0, false, {
          fileName: "app/routes/register.tsx",
          lineNumber: 112,
          columnNumber: 13
        }, this),
        actionData?.errors.email && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pt-1 text-red-700 animate-fade-in", children: actionData.errors.email }, void 0, false, {
          fileName: "app/routes/register.tsx",
          lineNumber: 113,
          columnNumber: 42
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/register.tsx",
        lineNumber: 108,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-full flex flex-col gap-[8px] items-start", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { htmlFor: "password", className: "text-[16px] leading-[150%]", children: "Password" }, void 0, false, {
          fileName: "app/routes/register.tsx",
          lineNumber: 119,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, { type: "password", name: "password", ref: passwordRef, className: "rounded-[3px] px-[20px] py-[16px] text-[16px] leading-[150%] h-[56px] focus-visible:ring-0 focus-visible:ring-offset-0 border-[#f1f1f1] focus:border-black placeholder:text-[#c0c0c0]", required: true, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" }, void 0, false, {
          fileName: "app/routes/register.tsx",
          lineNumber: 122,
          columnNumber: 13
        }, this),
        actionData?.errors.password && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pt-1 text-red-700 animate-fade-in", children: actionData.errors.password }, void 0, false, {
          fileName: "app/routes/register.tsx",
          lineNumber: 123,
          columnNumber: 45
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/register.tsx",
        lineNumber: 118,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-full flex justify-start", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { className: "w-[150px] text-[Inter] text-[16px] leading-[150%] text-white px-[15px] py-[10px] rounded-[3px]", type: "submit", children: "Create account" }, void 0, false, {
        fileName: "app/routes/register.tsx",
        lineNumber: 129,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/register.tsx",
        lineNumber: 128,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/register.tsx",
      lineNumber: 107,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-[#7b7b7b] text-[16px] leading-[150%] font-normal", children: [
      "Or",
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { className: "underline p-0 text-[#7b7b7b] text-[16px] leading-[150%] font-normal", to: {
        pathname: "/login"
      }, children: "login" }, void 0, false, {
        fileName: "app/routes/register.tsx",
        lineNumber: 137,
        columnNumber: 11
      }, this),
      " ",
      "if you have an account."
    ] }, void 0, true, {
      fileName: "app/routes/register.tsx",
      lineNumber: 135,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/register.tsx",
    lineNumber: 104,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/register.tsx",
    lineNumber: 103,
    columnNumber: 10
  }, this);
}
_s(Register, "KXzIeC2cTFt/ua30svyQl8QbRpg=", false, function() {
  return [useActionData];
});
_c = Register;
var _c;
$RefreshReg$(_c, "Register");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Register as default,
  meta
};
//# sourceMappingURL=/build/routes/register-3BHIJBNM.js.map
