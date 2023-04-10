import { useEffect, useState } from "react";
import Loader from "../components/Loader";

let url = 'https://64307b10d4518cfb0e50e555.mockapi.io/workflow'

function Home({workflowSetter}) {
    const [helpStyle, setHelpStyle] = useState('visible')
    const [workflow, setWorkflow] = useState([]);
    const fetchWorkflows = () => {
        fetch(url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setWorkflow(data)
            })
    };

    useEffect(() => {
        fetchWorkflows();
    }, [])


    return (
        <>
            <div className={"w-full h-full fixed z-50 text-white bg-[rgba(50,50,50,0.9)] flex justify-center items-center " + helpStyle}>
                <div>
                    <h2 className='text-xl'>Hello!</h2><br></br>
                    This is a sample project to demonstrate workflow designs using react framework.<br></br>
                    This is built using React.js, tailwindcss and reactflow.<br></br><br></br>
                    Get the source code at: <a className="text-blue-400" href="https://github.com/fbn776/React-work-flow-demo">https://github.com/fbn776/React-work-flow-demo</a><br></br><br></br>
                    <p className="opacity-70 text-sm my-2">Hint: Use <code className="bg-gray-600 rounded-lg px-1">backspace btn</code> to deleted nodes</p>
                    <button onClick={()=>{
                        setHelpStyle('hidden');
                    }} className="mt-3 px-5 py-3 bg-slate-900 rounded-lg">CLose</button>
                </div>
            </div>
            <div className="px-5 py-3 font-bold w-ful border-style">Workflows</div>
            <div className="w-full p-8">
                <table className="list-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Input Type</th>
                            <th>Created at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(workflow.length > 0)?(workflow.map((val, key) => {
                            return (
                                <tr key={val.createdAt}>
                                    <td><a className="text-black underline" onClick={()=>{
                                        workflowSetter(val.id);
                                    }}>{val.name}</a></td>
                                    <td>{val.input_type.toUpperCase()}</td>
                                    <td>{new Date(val.createdAt).toISOString().substring(0, 10)}</td>
                                </tr>
                            )
                        })): Loader()}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Home;