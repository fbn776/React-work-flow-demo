import { useEffect, useState } from "react";
let url = 'https://64307b10d4518cfb0e50e555.mockapi.io/workflow'

function Home({workflowSetter}) {
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
                        {workflow.map((val, key) => {
                            return (
                                <tr key={val.createdAt}>
                                    <td><a className="text-black underline" onClick={()=>{
                                        workflowSetter(val.id);
                                    }}>{val.name}</a></td>
                                    <td>{val.input_type.toUpperCase()}</td>
                                    <td>{new Date(val.createdAt).toISOString().substring(0, 10)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Home;