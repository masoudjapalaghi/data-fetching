import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import dracula from "react-syntax-highlighter/dist/cjs/styles/prism/dracula";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
const BoxCode = ({ children, syntax }: { children: string; syntax: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };
  return (
    <div className="box_code">
      <SyntaxHighlighter language={syntax} style={dracula} showLineNumbers lineNumberStyle={{ minWidth: "1.50rem" }} customStyle={{ backgroundColor: "black" }}>
        {children}
      </SyntaxHighlighter>
      <div className="cursor-copy box-code_copy">
        <CopyToClipboard text={children} onCopy={handleCopy}>
          <button>{copied ? "Copied!" : "Copy"}</button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default BoxCode;
