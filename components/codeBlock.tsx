import Highlight, { defaultProps } from "prism-react-renderer";
import { useState } from "react";

import theme from "prism-react-renderer/themes/synthwave84";
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
  const [isCopied, setIsCopied] = useState(false);
  const className = props.children.props.className || "";
  const code = props.children.props.children.trim();
  const language = className.replace(/language-/, "");
  const file = props.children.props.file;

  return (
    <div
      className="bg-gray-900 rounded-lg"
      style={{
        marginTop: "2rem",
        marginBottom: "2rem",
        paddingLeft: "1.5rem",
      }}
    >
      <div
        className=" rounded-lg "
        style={{ display: "flex", position: "relative" }}
      >
        <div
          className="bg-gray-700 text-white"
          style={{
            marginRight: "1rem",
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
            textTransform: "uppercase",
            borderBottomLeftRadius: "0.5rem",
            borderBottomRightRadius: "0.5rem",

            fontWeight: "bold",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >{`${language}`}</div>

        <div style={{ flexGrow: "1" }}></div>
        <button
          onClick={() => {
            copyToClipboard(code);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1500);
          }}
          className="bg-gray-700 transition ease-in-out delay-150  hover:scale-110 hover:bg-indigo-500 duration-300"
          style={{
            marginRight: "1.5rem",
            marginTop: "0.5rem",
            padding: "8px 12px",

            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            color: "#E2E8F0",
            fontSize: "14px",
            fontFamily: "sans-serif",
            lineHeight: "1",
          }}
        >
          {isCopied ? "🎉 " : "Copy"}
        </button>
      </div>
      <div className="py-5 overflow-auto bg-gray-900 rounded-lg">
        <Highlight
          {...defaultProps}
          code={code}
          language={language}
          theme={theme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={className}
              style={{
                ...style,
                backgroundColor: "transparent",
                float: "left",
                minWidth: "100%",
              }}
            >
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line, key: i })}
                  style={{
                    background: "transparent",
                    display: "block",
                  }}
                >
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
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
