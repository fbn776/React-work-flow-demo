import { useState } from 'react';
import Home from './pages/Home';
import WorkflowPage from './pages/WorkflowPage';

export default function App() {
  let [currentWorkflowID, setCurrentWorkflowID] = useState(null);
  return (
    <>
      <Home workflowSetter={setCurrentWorkflowID}></Home>
      <WorkflowPage pageID={currentWorkflowID} pageIDSetter={setCurrentWorkflowID}></WorkflowPage>
    </>
  )
}