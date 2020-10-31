import React, { useEffect }from 'react';
import { useSelector, useDispatch} from 'react-redux';

import * as actions from './redux/actions';
import SurveyList from './SurveyList';
import SurveyDialog from './SurveyDialog';

import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const surveys = useSelector(state => state.surveyReducer.surveys);

  useEffect(() => {}, [surveys]);

  // Modal handling
  const [showModal, setShowModal] = React.useState(false);
  const openCreateModal = () => setShowModal(true);
  const closeCreateModal = () => setShowModal(false);
  
  // Form handling
  const handleSubmit = e => {
    e.preventDefault();
    
    const label = document.getElementById('survey-label').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    let survey = { key: Date.now(), label: label, startDate: startDate, endDate: endDate, status: 'not-launched'};

    
    surveys.push(survey);

    closeCreateModal();
    dispatch(actions.setSurveys(surveys));
  }

  // Status Handling
  const updateStatus = (status, key) => {
    const newSurveyArr = surveys.map((survey) => {
      if (survey.key === key) {
        const updatedSurvey = {
          ...survey,
          status: status
        };
 
        return updatedSurvey;
      }
 
      return survey;
    });
 
    dispatch(actions.setSurveys(newSurveyArr));  
  }

  const deleteSurvey = (key) => {
    const newSurveyArr = surveys.filter(survey => survey.key !== key);
 
    dispatch(actions.setSurveys(newSurveyArr)); 
  }
    
  return (
    <div className={"content"}>
      <Router>
      <div className='heading-section'>
        <h1>Survey Maker</h1>
        
        <div className='filters-outer'>
            <Link to="?status=not-launched" className='filter-button not-launched'>Not launched</Link>
            <Link to="?status=in-progress" className='filter-button in-progress'>In progress</Link>
            <Link to="?status=completed" className='filter-button completed'>Completed</Link>
            <Link to="/" className='filter-button'><span className='clear-filter-icon' aria-hidden>×</span>Clear filter</Link>     
        </div>  
        <button className="create-button" onClick={openCreateModal}>Create Survey</button>
      </div>

      <SurveyList surveys={surveys} deleteSurvey={deleteSurvey} updateStatus={updateStatus} />
      </Router>      
    
      <SurveyDialog showModal={showModal} closeCreateModal={openCreateModal} handleSubmit={handleSubmit} />
    </div>
  );
}

export default App;
