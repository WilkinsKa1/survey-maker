import React from 'react';
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

const SurveyDialog = props => {
  const { showModal, closeCreateModal, handleSubmit } = props;
  
  return (
    <Dialog isOpen={showModal} aria-labelledby="modal-heading" onDismiss={closeCreateModal}>
      <div className="modal-heading-section">
        <h2 id="modal-heading">Create Survey</h2>
        
        <button className="close-button" aria-label="Exit dialog" onClick={closeCreateModal}>
          <span aria-hidden>×</span>
        </button>
      </div>
      
      <form id="survey-form" onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="survey-label">Survey Name</label>
          <input type="text" id="survey-label" name="survey label"></input>
        </fieldset>

        <fieldset>
          <label htmlFor="start-date" >Start Date</label>
          <input type="date" id="start-date" name="start date"></input>
        </fieldset>
        <fieldset>
          <label htmlFor="end-date">End Date</label>
          <input type="date" id="end-date" name="end date"></input>
        </fieldset>

        <button className="create-button">Create Survey</button>
      </form>
    </Dialog>
  );
}

export default SurveyDialog;