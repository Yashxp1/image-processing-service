import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import ImageUpload from "./pages/Image-Upload"

const App = () => {
  return (
   <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<ImageUpload />} />
      </Routes>
  )
}

export default App