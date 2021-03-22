import React from 'react';
import WelcomeMessage from './components/WelcomeMessage';
import Result from './components/Result';
import ShortenerForm from './ShortenerForm';
import { welcomeMessages } from './constants';
import useState from './components/hooks/useState';
import useHttp from './components/hooks/useHttp';
import './style/app.css';

const initialState = { errors: null, url: null, loading: false };

function App() {
  const [state, setState] = useState(initialState);
  const http = useHttp();

  const handleSubmit = (e) => {
    e.preventDefault();
    setState({ ...initialState, loading: true });
    const form = e.target;
    const url = form.elements[0].value;
    
    http
      .post('/shorten', { url })
      .then((response) => {
        setState({ url: response.data.url });
      })
      .catch((error) => {
        setState({ errors: error?.response?.data || [{ msg: 'An unknown error occurred' }] });
      })
      .then(() => {
        setState({ loading: false });
      });
  };

  return (
    <div className="app-container">
      <div className="centered t-center">
        <WelcomeMessage list={welcomeMessages} />
        <ShortenerForm handleSubmit={handleSubmit} />
        <Result errors={state.errors} url={state.url} />
      </div>
    </div>
  );
}

export default App;
