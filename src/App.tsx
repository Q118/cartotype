// import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
// import { NoteContextProvider } from './context/NoteContext';
import { ShoppingCart } from './components/ShoppingCart';
// import { NewNote } from './components/notes/NewNote';
import { DisplayToast } from './components/NotificationToast';
import { EditForm } from './components/form/EditForm';


// import 
// import TimeAgo from './components/Demo';

const queryClient = new QueryClient();


function App() {

    // const { onCreateNote } = useNoteContext();

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
                                <Route path="/admin" element={<Admin />}>
                                    <Route path="edit/:item_id" element={<EditForm renderAtStep={2} />} />
                                </Route>
                                {/* // TODO display flash toast if get redirected */}
                                {/* <Route path="/demo/*" element={<TimeAgo />} /> */}
                                <Route path="/notes/*" element={<Notes />} />
                                {/* //* above may be the reason for that funky thung redirecting happening */}
                                {/* <Route path="*" element={<Navigate to="/" />} /> */}
                                {/* <Route path="*" element={<>Not Found</>} /> */}
                            </Routes>
                            <ShoppingCart />
                        </Container>
                </ShoppingCartProvider>
            </ThemeProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}

export default App;
