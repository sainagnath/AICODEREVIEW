import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
// import "prismjs/components/prism-jsx"
import Editor from "react-simple-code-editor"
import prism from 'prismjs'
import axios from 'axios'
import Markdown from "react-markdown"
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [code, setCode] = useState(`function sum(){
  return 1+1;
}
              `)

  useEffect(() => {
    prism.highlightAll()
  })
  const[review, setReview] = useState('');

  async function reviewCode(){
    const response = await axios.post('https://aicodereview-backend.onrender.com',{code});
    setReview(response.data);
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
              padding={10}
              className="editor"
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: '1px solid #ddd',
                borderRadius: '5px',
                height: '100%',
                width: '100%',
              }}
            />
          </div>
          <div className="review" onClick={reviewCode}>Review</div>
        </div>
        <div className="right"><Markdown>{review}</Markdown></div>
      </main>
    </>
  )
}


export default App
