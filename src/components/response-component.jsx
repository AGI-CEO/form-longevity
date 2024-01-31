import ReactMarkdown from "react-markdown";

export default function ResponseComponent({ data }) {
  //console.log(data);
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gradient-to-r from-blue-900 to-blue-500 flex items-center justify-center">
      <div
        className="w-full max-w-2xl p-8 bg-white rounded shadow-md "
        style={{ overflowY: "auto", maxHeight: "100vh" }}
      >
        <ReactMarkdown className="text-black">{data.text}</ReactMarkdown>
      </div>
    </div>
  );
}

ResponseComponent;
