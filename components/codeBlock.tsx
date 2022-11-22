import Highlight, { defaultProps } from "prism-react-renderer";
import { useState } from "react";

import themedark from "prism-react-renderer/themes/duotoneDark";
import themelight from "prism-react-renderer/themes/nightOwlLight";
import { useTheme } from "next-themes";

const copyToClipboard = (str: string) => {
  if (navigator.clipboard) {
    // Most modern browsers support the Navigator API
    navigator.clipboard.writeText(str).then(
      function () {
        console.log("Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Could not copy text: ", err);
      }
    );
  }
};

const Code = (props: any) => {
  const { resolvedTheme } = useTheme();

  const [isCopied, setIsCopied] = useState(false);
  const className = props.children.props.className || "";
  const code = props.children.props.children.trim();
  const language = className.replace(/language-/, "");
  const file = props.children.props.file;

  return (
    <div
      className="dark:bg-zinc-900 bg-amber-100 border dark:border-gray-500 rounded-sm"
      style={{
        marginTop: "2rem",
        marginBottom: "2rem",
        paddingLeft: "1.5rem",
      }}
    >
      <div className="py-5 overflow-auto dark:bg-zinc-900 bg-amber-100 rounded-lg">
        <Highlight
          {...defaultProps}
          code={code}
          language={language}
          theme={resolvedTheme === "dark" ? themedark : themelight}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={className + " group "}
              style={{
                ...style,
                backgroundColor: "transparent",
                float: "left",
                minWidth: "100%",
              }}
            >
              <button
                onClick={() => {
                  copyToClipboard(code);
                  setIsCopied(true);
                  setTimeout(() => setIsCopied(false), 1500);
                }}
                className="float-right opacity-0 group-hover:opacity-100 bg-amber-50 dark:bg-zinc-700 transition-all  ease-in-out delay-150  hover:scale-110 dark:hover:bg-indigo-500 hover:bg-amber-500 duration-300"
                style={{
                  marginRight: "1.5rem",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  color: "#E2E8F0",
                  fontSize: "14px",
                  lineHeight: "1",
                }}
              >
                {isCopied ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    className="w-4 h-4 dark:stroke-white stroke-black"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    className="w-4 h-4 dark:stroke-white stroke-gray-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                    />
                  </svg>
                )}
              </button>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  <div className={"table-cell pr-4"}>{i + 1}</div>
                  <div className={"table-cell text-sm"}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};

export default Code;
