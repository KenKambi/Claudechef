
import ReactMarkdown from 'react-markdown'

export default function Generated(props) {
  return (
    <>
      <h2>Calude Chef Recommends: </h2>
      <ReactMarkdown>
        {props.generate}
      </ReactMarkdown>
    </>
  );
}
