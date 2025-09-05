
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import './App.css'

function App() {
 return  <div>
    <h1 className='text-3xl bg-red-800 border-0'>hello world!</h1>
    <ToastContainer autoClose={2000}/>
  </div>
}

export default App
