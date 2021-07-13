import {StrictMode} from 'react';
import {render} from 'react-dom';
import {Home} from 'src/containers';

render(
  <StrictMode>
    <Home />
  </StrictMode>,
  document.getElementById('root'),
);
