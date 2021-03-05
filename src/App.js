import logo from './logo.svg';
import './App.css';
import PatientDetails from './Components/PatientInformation/PatientDetails';
import Patientpicture from './Components/ImageUploader/Patientpicture';

function App() {
  return (
    <div className="App">
      <PatientDetails/>
      {/* <Patientpicture/> */}
    </div>
  );
}

export default App;
