// import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Home } from './pages/Home';
import { Store } from './pages/Store';
import { About } from './pages/About';
import { Navbar } from './components/Navbar';
import { Notes } from './pages/Notes';
import { ShoppingCartProvider } from './context/ShoppingCartContext';


function App() {
    // const [count, setCount] = useState(0)

    return (
        <ShoppingCartProvider>
            <Container className="mb-4">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/notes" element={<Notes />} />
                </Routes>
            </Container>
        </ShoppingCartProvider>
    )
}

export default App
