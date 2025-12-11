import './App.css'
import { SchdulerCalender } from './components/SchdulerCalender'
import { TitleBar } from './components/TitleBar'

function App() {

  return (
    <div className="App h-screen overflow-hidden">
      <TitleBar />
      <SchdulerCalender />
      
    </div>
  )
}

export default App
