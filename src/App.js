import { useRef } from 'react'
import { Heap } from './Heap'
import './styles.css'

export default function App() {
  const heap = useRef(new Heap())

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  )
}
