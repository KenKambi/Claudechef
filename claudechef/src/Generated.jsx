
import ReactMarkdown from 'react-markdown'

export default function Generated(props) {
  return (
    <ReactMarkdown>
      {props.generate}
    </ReactMarkdown>
  );
}
