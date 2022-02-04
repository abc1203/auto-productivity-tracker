import './App.css';
import Title from './components/Title';
import Accordion from './components/Accordion';

function App() {
  return (
    <div class="container">
      <Title />
      <Accordion name="Settings" />
    </div>
  );
}

export default App;
