
import ReactDOM from 'react-dom/client'; // render root component
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(  // This element is typically a <div> in the HTML file where the React application will be rendered.
  <BrowserRouter>
    <App/>
  </BrowserRouter> // This ensures that the routing functionalities provided by react-router-dom are available throughout the application.
    
  
)
