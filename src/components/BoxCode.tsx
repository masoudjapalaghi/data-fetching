import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import dracula from "react-syntax-highlighter/dist/cjs/styles/prism/dracula";

const BoxCode = ({
  children,
  syntax,
}: {
  children: string;
  syntax: string;
}) => {
  return (
    <SyntaxHighlighter
      language={syntax}
      style={dracula}
      showLineNumbers
      lineNumberStyle={{ minWidth: "1.50rem" }}
      customStyle={{ backgroundColor: "black" }}
    >
      {children}
    </SyntaxHighlighter>
  );
};

export default BoxCode;
