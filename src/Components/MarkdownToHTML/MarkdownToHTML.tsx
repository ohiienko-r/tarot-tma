import { FC } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
import { MarkdownToHTMLPropTypes } from "./types";
import "./styles.scss";

const MarkdownToHTML: FC<MarkdownToHTMLPropTypes> = ({ markdownText }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      rehypePlugins={[rehypeHighlight]}
      className="marked-reading"
    >
      {markdownText}
    </ReactMarkdown>
  );
};

export default MarkdownToHTML;
