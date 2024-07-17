import './styles/index.scss';
import ReactDOM from 'react-dom/client';
import { App } from './components/app';
import { Provider } from 'react-redux';
import { setupStore } from './store';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(
	<Provider store={store}>
		<App />
	</Provider>
);
