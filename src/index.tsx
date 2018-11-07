import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore,  } from 'redux';
// import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
// import {BrowserRouter} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import { enthusiasm } from './reducers/index';
import { StoreState } from './types/index';
import { EnthusiasmAction } from './actions/index';
import Hello from './containers/Hello';
// import reducer from './reducer'

const store = createStore<StoreState, EnthusiasmAction, any, any>(enthusiasm, {
    enthusiasmLevel: 1,
    languageName: 'TypeScript',
});
// const store = createStore(reducer, compose(
//     applyMiddleware(thunk),
    // window.devToolsExtension?window.devToolsExtension():f=>f
// ))

ReactDOM.render(
    <Provider store={store}>
          {/* <BrowserRouter>
              <App></App>
          </BrowserRouter> */}
          <Hello />
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
