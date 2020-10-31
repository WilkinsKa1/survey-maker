import React from 'react';
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem
} from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import './App.css';
import { useLocation } from 'react-router-dom';

const SurveyList = props => {
  const { surveys, updateStatus, deleteSurvey } = props;

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();

  const prettifySurveyStatus = status => {
    if (status === 'not-launched') {
      return 'Not launched'
    } else if (status === 'in-progress') {
      return 'In progress'
    } else {
      return 'Completed'
    }
  }

  const getDisplayStatus = status => {
    const filterStatus = query.get('status');

    if (filterStatus === status || filterStatus === null) {
      return 'show'
    } else {
      return 'hidden'
    }
  }

  return (
    <ul className="survey-list"> 
      {surveys ? surveys.map(survey => 
      <li className={`survey-card ${getDisplayStatus(survey.status)}`} key={survey.key}>
      <div>
        <div className="survey-heading-section">
            <h2 className="survey-heading">{survey.label}</h2>
            <Menu>
              <MenuButton aria-label="survey action menu">
                <span aria-hidden><MoreHorizIcon /></span>
              </MenuButton>
              <MenuList>
                <MenuItem onSelect={() => updateStatus('in-progress', survey.key)} disabled={survey.status !== 'not-launched'}>Launch survey</MenuItem>
                <MenuItem onSelect={() => updateStatus('completed', survey.key)} disabled={survey.status === 'completed' || survey.status === 'not-launched'}>End survey</MenuItem>
                <MenuItem onSelect={() => deleteSurvey(survey.key)} disabled={survey.status !== 'not-launched'}>Delete survey</MenuItem>
              </MenuList>
            </Menu>
        </div>
        <p>Start date: {survey.startDate}</p>
        <p>End date: {survey.endDate}</p>
        <p className={`survey-status ${survey.status}`}>{prettifySurveyStatus(survey.status)}</p>
      </div>
      </li>
      ) : ''}
    </ul>
  );
}

export default SurveyList;