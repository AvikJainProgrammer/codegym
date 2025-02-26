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
// import { useState } from "react";
// import Editor from "@monaco-editor/react";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function Playground() {
//   const [code, setCode] = useState("console.log('Hello, World!');");
//   const [output, setOutput] = useState([]);

//   const runCode = () => {
//     const logs = [];
//     const originalConsoleLog = console.log;

//     console.log = (...args) => {
//       logs.push(args.map(a => JSON.stringify(a)).join(" "));
//     };

//     try {
//       eval(code);
//     } catch (error) {
//       logs.push("❌ Error: " + error.message);
//     }

//     console.log = originalConsoleLog;
//     setOutput(logs);
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center mb-4">🛠️ JavaScript Playground</h1>

//       <div className="card shadow-lg">
//         <div className="card-body">
//           <label className="form-label fw-bold">Write JavaScript Code:</label>
//           <Editor
//             height="300px"
//             defaultLanguage="javascript"
//             theme="vs-dark"
//             value={code}
//             onChange={(value) => setCode(value)}
//           />
//           <button className="btn btn-primary w-100 mt-3" onClick={runCode}>
//             ▶️ Run Code
//           </button>
//         </div>
//       </div>

//       <div className="card mt-4 shadow-lg">
//         <div className="card-body bg-light">
//           <h5 className="fw-bold">🖥️ Console Output:</h5>
//           <pre className="p-3 bg-dark text-white rounded">
//             {output.length > 0 ? output.join("\n") : "👉 Run some code to see output..."}
//           </pre>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import Editor from "@monaco-editor/react";
import "bootstrap/dist/css/bootstrap.min.css";

const exercises = [
  {
    id: 1,
    title: "Print a Pyramid",
    description: "Write a JavaScript program that prints a pyramid pattern using asterisks.",
    expectedOutput: "  *  \n *** \n*****",
    mustInclude: ["for"],
  },
  {
    id: 2,
    title: "Sum of Numbers",
    description: "Write a program that calculates the sum of numbers from 1 to 10.",
    expectedOutput: "55",
    mustInclude: ["for"],
  },
];

export default function Playground() {
  const [selectedExercise, setSelectedExercise] = useState(exercises[0]);
  const [code, setCode] = useState("// Write your solution here...");
  const [output, setOutput] = useState([]);
  const [feedback, setFeedback] = useState("");

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

    validateSolution(logs.join("\n"));
  };

  const validateSolution = (actualOutput) => {
    const { expectedOutput, mustInclude } = selectedExercise;
    let result = "";

    if (actualOutput.trim() === expectedOutput.trim()) {
      result += "✅ Correct Output! 🎉\n";
    } else {
      result += "❌ Incorrect Output. Try again!\n";
    }

    // Check if user included required syntax (e.g., 'for' loop)
    mustInclude.forEach((keyword) => {
      if (!code.includes(keyword)) {
        result += `❌ Missing: You need to use a '${keyword}' loop.\n`;
      }
    });

    setFeedback(result);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">🚀 JavaScript Coding Exercises</h1>

      {/* Exercise Selection */}
      <div className="mb-4">
        <label className="form-label fw-bold">Select an Exercise:</label>
        <select
          className="form-select"
          onChange={(e) =>
            setSelectedExercise(exercises.find(ex => ex.id === parseInt(e.target.value)))
          }
        >
          {exercises.map((exercise) => (
            <option key={exercise.id} value={exercise.id}>
              {exercise.title}
            </option>
          ))}
        </select>
      </div>

      {/* Exercise Description */}
      <div className="card shadow-lg mb-4">
        <div className="card-body">
          <h5>{selectedExercise.title}</h5>
          <p>{selectedExercise.description}</p>
        </div>
      </div>

      {/* Code Editor */}
      <div className="card shadow-lg">
        <div className="card-body">
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

      {/* Output & Feedback */}
      <div className="card mt-4 shadow-lg">
        <div className="card-body bg-light">
          <h5 className="fw-bold">🖥️ Console Output:</h5>
          <pre className="p-3 bg-dark text-white rounded">{output.join("\n") || "👉 Run your code..."}</pre>
          <h5 className="fw-bold mt-3">📢 Feedback:</h5>
          <pre className="p-3 bg-warning rounded">{feedback || "👉 Solve the challenge and get feedback here!"}</pre>
        </div>
      </div>
    </div>
  );
}
