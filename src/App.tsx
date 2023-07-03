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
import { ShoppingCart } from './components/store/ShoppingCart';
import { DisplayToast } from './components/NotificationToast';
import { CartoFooter } from './components/CartoFooter';

const queryClient = new QueryClient();


function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <ShoppingCartProvider>
                    <Container className="mb-4 pb-5">
                        <Navbar /><DisplayToast />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/store">
                                <Route index element={<Store />} />
                            </Route>
                            <Route path="/admin/*" element={<Admin />} />
                            {/* // TODO display flash toast if get redirected */}
                            <Route path="notes/*" element={<Notes />} />
                            <Route path="*" element={<>Not Found</>} />
                        </Routes>
                        <ShoppingCart />
                    </Container>
                    <CartoFooter />
                </ShoppingCartProvider>
            </ThemeProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}

export default App;
