import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import NotFound from "./pages/NotFound/NotFound.jsx";
import HomePage from './pages/HomePage/HomePage.jsx';
import PhotoDetailPage from './pages/PhotoDetailPage';
import TopicPhotos from "./pages/TopicPhotos/TopicPhotos.jsx";
import MyPins from "./pages/MyPins/MyPins.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import About from "./pages/About/About.jsx";

function App() {
  const [count, setCount] = useState(0)

    return (
        <AuthContextProvider>
            <PinnedPhotosProvider>
                <Router>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/photo/:id" element={<PhotoDetailPage />} />
                        <Route path="/topic/:topicId" element={<TopicPhotos />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/mypins" element={<MyPins />} />
                        <Route path="/registration" element={<Registration />} />
                        <Route path="/admin" element={<AdminRoute />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
            </PinnedPhotosProvider>
        </AuthContextProvider>
    );
}

export default App
