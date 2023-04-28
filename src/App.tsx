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
import { NoteContextProvider } from './context/NoteContext';
import { ShoppingCart } from './components/ShoppingCart';
import { NewNote } from './components/notes/NewNote';
import { DisplayToast } from './components/NotificationToast';

// import TimeAgo from './components/Demo';

const queryClient = new QueryClient();


function App() {

    // const { onCreateNote } = useNoteContext();

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <ShoppingCartProvider>
                    <NoteContextProvider>
                        <Container className="mb-4">
                            <Navbar />
                            <DisplayToast />
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/store" element={<Store />} />
                                <Route path="/admin" element={<Admin />} />
                                {/* // TODO display flash toast if get redirected */}
                                <Route path="/notes" element={<Notes />}>
                                    <Route path="new" element={<NewNote
                                        // onSubmit={onCreateNote}
                                        // onAddTag={addTag}
                                        // availableTags={tags}
                                    />} />
                                    <Route path=":noteId">
                                        <Route index element={<>Show</>} />
                                        <Route path="edit" element={<>Edit</>} />
                                    </Route>
                                </Route>
                                <Route path="*" element={<Navigate to="/" />} />
                                {/* <Route path="*" element={<>Not Found</>} /> */}
                            </Routes>
                            <ShoppingCart />
                        </Container>
                    </NoteContextProvider>
                </ShoppingCartProvider>
            </ThemeProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}

export default App;
