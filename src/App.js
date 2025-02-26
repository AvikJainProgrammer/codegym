// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import { useState } from "react";
import Editor from "@monaco-editor/react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Playground() {
  const [code, setCode] = useState("console.log('Hello, World!');");
  const [output, setOutput] = useState([]);

  const runCode = () => {
    const logs = [];
    const originalConsoleLog = console.log;

    console.log = (...args) => {
      logs.push(args.map(a => JSON.stringify(a)).join(" "));
    };

    try {
      eval(code);
    } catch (error) {
      logs.push("❌ Error: " + error.message);
    }

    console.log = originalConsoleLog;
    setOutput(logs);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">🛠️ JavaScript Playground</h1>

      <div className="card shadow-lg">
        <div className="card-body">
          <label className="form-label fw-bold">Write JavaScript Code:</label>
          <Editor
            height="300px"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
          />
          <button className="btn btn-primary w-100 mt-3" onClick={runCode}>
            ▶️ Run Code
          </button>
        </div>
      </div>

      <div className="card mt-4 shadow-lg">
        <div className="card-body bg-light">
          <h5 className="fw-bold">🖥️ Console Output:</h5>
          <pre className="p-3 bg-dark text-white rounded">
            {output.length > 0 ? output.join("\n") : "👉 Run some code to see output..."}
          </pre>
        </div>
      </div>
    </div>
  );
}

