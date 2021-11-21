import ReactDom from "react-dom";
import ReactMarkdown from "react-markdown";

const RenderReactMarkdown = ({ markdown }) => {
  return ReactDom.render(
    <ReactMarkdown children={markdown} />,
    document.getElementById("markdownPreview1"),
  );
};

export default RenderReactMarkdown;
