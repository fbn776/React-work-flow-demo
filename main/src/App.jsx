import { useState } from 'react';
import Home from './components/Home';
import WorkflowPage from './components/workflow';

export default function App() {
  let [currentWorkflowID, setCurrentWorkflowID] = useState(null);
  return (
    <>
      <Home workflowSetter={setCurrentWorkflowID}></Home>
      <WorkflowPage pageID={currentWorkflowID} pageIDSetter={setCurrentWorkflowID}></WorkflowPage>
    </>
  )
}