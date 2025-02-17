import { Highlight, themes } from "prism-react-renderer";
import { useState } from "react";
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

const Code = ({ children, className }: { children: string; className?: string }) => {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const language = className ? className.replace(/language-/, "") : "";
  const code = typeof children === 'string' ? children.trim() : '';

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
          code={code}
          language={language}
          theme={theme === "dark" ? themes.dracula : themes.github}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={className + " group relative"}
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
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="absolute right-2 top-2 rounded bg-gray-700 px-2 py-1 text-xs text-gray-200 hover:bg-gray-600"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  <div className={"table-cell pr-4"}>{i + 1}</div>
                  <div className={"table-cell text-sm"}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
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
