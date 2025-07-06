// import { useState, useEffect } from 'react';
// import axios from 'axios';
//
// const Api = () => {
//     const [message, setMessage] = useState('');
//     useEffect(() => {
//         axios.get('http://127.0.0.1:8000/hello/')
//             .then(response => setMessage(response.data.message))
//             .catch(error => console.error('Error fetching message:', error));
//     }, []);
//     return <h1>{message}</h1>;
// };

// export default Api