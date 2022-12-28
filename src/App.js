import './App.css';
import Title from './components/Title';
import Accordion from './components/Accordion';
import Settings from './components/Settings'
import TimeChart from './components/TimeChart';

function App() {
  return (
    <div class="container">
      <Title />
      <Accordion name="Settings" content={<Settings />} />
      <TimeChart />
      <Accordion name="Productive Sites" content={<Settings />} />
      <Accordion name="Unproductive Sites" content={<Settings />} />
    </div>
  );
}

export default App;
