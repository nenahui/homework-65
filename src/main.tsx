import ReactDOM from 'react-dom/client';
import { App } from './App';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Theme appearance={'dark'}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Theme>
);
