import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Navbar from './components/Navigation/Navbar'
import FullScreenNav from './components/Navigation/FullScreenNav'
import Contact from './pages/Contact'


const App = () => {
  return (
    <div className='overflow-x-hidden'>
      <Navbar />
      <FullScreenNav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/projects' element={<Projects />} />
      </Routes>
    </div>
  )
}

export default App