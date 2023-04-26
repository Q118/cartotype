// import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Home } from './pages/Home';
import { Store } from './pages/Store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Navbar } from './components/Navbar';
import { Notes } from './pages/Notes';
import { Admin } from './pages/Admin';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import { ThemeProvider } from './context/ThemeContext';
import { ShoppingCart } from './components/ShoppingCart';

import { NotificationToast, DisplayToast } from './components/NotificationToast';

// import TimeAgo from './components/Demo';

const queryClient = new QueryClient();


function App() {
    // const [count, setCount] = useState(0)
    // const timestamp: number = Date.now() - 5000;
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <ShoppingCartProvider>
                    <Container className="mb-4">
                        <Navbar />
                        <DisplayToast />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/store" element={<Store />} />
                            <Route path="/admin" element={<Admin />} />
                            <Route path="/notes" element={<Notes />} />
                        </Routes>
                        <ShoppingCart />
                        {/* <TimeAgo timestamp={timestamp} /> */}
                    </Container>
                </ShoppingCartProvider>
            </ThemeProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}

export default App;
