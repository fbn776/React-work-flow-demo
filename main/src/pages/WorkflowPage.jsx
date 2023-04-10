import { useRef, useEffect, useState, useCallback } from "react";
import WorkflowCanvas from "../components/Worflow";
import Modules from "../components/Modules";


const fetchData = (pageID, setter) => {
    let url = `https://64307b10d4518cfb0e50e555.mockapi.io/workflow/${pageID}`;
    fetch(url)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setter(data)
    })
};

function BackBtn(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M0 0h24v24H0z" stroke="none" />
            <path d="M5 12h14M5 12l4 4M5 12l4-4" />
        </svg>
    )
}



function WorkflowPage({ pageID, pageIDSetter }) {
    const [workflow, setWorkflow] = useState({});
    const [intl, setIntl] = useState([]);

    if (Object.keys(workflow).length === 0) {
        if (!(pageID === null)) {
            fetchData(pageID, setWorkflow);
        }
    }

    useEffect(()=>{
        setIntl(workflow.input_type);
    }, [workflow]);



    return (
        <>
            <div className={"bg-white fixed w-full h-full top-0 left-0 z-50 " + (pageID === null ? 'hidden' : 'visible')}>
                <div className="absolute top-0 left-0 w-full h-[50px] border-style px-5 flex items-center font-bold">
                    <BackBtn className='mr-3 hover:scale-75' onClick={() => { setWorkflow({}); pageIDSetter(null) }}></BackBtn>
                    Workflow name: {workflow.name}
                </div>

                <div className="absolute top-[50px] left-0 w-full h-[calc(100%-50px)] flex flex-row">
                    <div className="w-[30%] h-full bg-slate-50 border-style flex flex-col">
                        <h6 className="flex items-center w-full h-[60px] p-4 font-semibold border-style">Modules</h6>
                        <div className="w-full h-[calc(100%-60px)] flex flex-col justify-between">
                            <Modules></Modules>
                        </div>
                    </div>
                    <div className="w-[calc(100%-30%)] h-full">
                        {intl?(<WorkflowCanvas intl={intl}></WorkflowCanvas>):(<div className="font-semibold text-xl text-gray-400 p-5">Loading Data...</div>)}
                    </div>
                </div>
            </div>
        </>
    )

};

export default WorkflowPage;



