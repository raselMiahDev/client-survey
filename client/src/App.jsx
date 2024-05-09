import SurveyForm from './components/SurveyForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SuccessMsg from './components/SuccessMsg';
import SurveyList from './components/SurveyList';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SurveyForm/>}/>
          <Route path='/success' element={<SuccessMsg/>}/>
          <Route path='/survey-response' element={<SurveyList/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;