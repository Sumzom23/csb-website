import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Initiatives from './pages/Initiatives'
import About from './pages/About'
import Team from './pages/Team'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import AdminApp from './admin/AdminApp'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminApp />} />
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="initiatives" element={<Initiatives />} />
          <Route path="about" element={<About />} />
          <Route path="team" element={<Team />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
