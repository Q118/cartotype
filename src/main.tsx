import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Misc.css'
// import { getEdgeConfig } from './api/example';
// import axios from 'axios';
// const edgeConfigUrl = import.meta.env.VITE_EDGE_CONFIG;
// async function getEdgeConfig() {
//     return axios
//         .get(edgeConfigUrl)
//         .then((response) => {
//             return response.data;
//         })
//         .catch((error: Error) => {
//             console.log('error in getEdgeConfig: ')
//             console.log(error.message);
//             return [];
//         });
// }

// getEdgeConfig().then((edgeConfig) => {
//     console.log('edgeConfig: ');
//     console.log(edgeConfig);
// });


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
)