import { useRef, useEffect, useState, useCallback } from "react";
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Background
} from 'reactflow';

import 'reactflow/dist/style.css';
import CustomNode from "./CustomNode";
import InputNode from "./InputNode";

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

const fetchModules = (page, setter) => {
    let url = `https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=${page}&limit=5`;
    fetch(url)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setter(data)
        })
}



const nodeTypes = {
    custom: CustomNode,
    input: InputNode
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const intl = [
    {
        id: '1',
        type: 'input',
        data: {},
        position: { x: 250, y: 5 },
        style: {
            border: 'none',
            outline: 'none',
            width: 'fit-content',
            padding: 0,
            height: 'fit-content',
        }
    },
];

const DnDFlow = () => {
    
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(intl);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });

            const data = JSON.parse(type);

            const newNode = {
                id: getId(),
                type: 'custom',
                position,
                data: data
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );


    return (

        <div className="w-full h-full" ref={reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodeTypes={nodeTypes}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
};


function Modules() {
    const [modules, setModules] = useState([]);
    const [pageNo, setPageNo] = useState(1);

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    let pageArr = [];
    if (pageNo === 1) {
        pageArr = [pageNo, pageNo + 1, pageNo + 2]
    } else if (pageNo >= 99) {
        pageArr = [pageNo - 2, pageNo - 1, pageNo]
    } else {
        pageArr = [pageNo - 1, pageNo, pageNo + 1];
    }

    if (modules.length === 0) {
        fetchModules(pageNo, setModules);
    }

    return (<>
        <div className="w-full pt-3">{
            modules.map((val) => {
                return (
                    <div key={val.createdAt} className="overflow-hidden bg-white flex flex-row items-center justify-between w-[90%] m-auto my-2 rounded-lg border-style h-[55px]" onDragStart={(event) => onDragStart(event, JSON.stringify(val))} draggable>
                        <div className="w-[55px] h-[55px] items-center flex justify-center font-bold border-style">{val.input_type.toUpperCase()}</div>
                        <div className="bg-[#f2f7fb] h-full w-[calc(100%-(55px*2))] flex items-center text-xs text-gray-600 font-semibold px-2">{val.name}</div>
                        <div className="w-[55px] h-[55px] items-center flex justify-center font-bold border-style">{val.output_type.toUpperCase()}</div>
                    </div>
                )
            })
        }</div>

        <div className="w-full pb-3 flex w-full justify-center no-underline text-black">
            {pageNo > 1 ? (<a href="#" className="mx-2"
                onClick={() => {
                    fetchModules(pageNo - 1, setModules);
                    setPageNo(pageNo - 1);
                }}>{'<'}</a>) : <span className="opacity-75">{'<'}</span>}
            <div className="">
                {pageArr.map((val) => {
                    return <a className={"mx-1 " + (pageNo === val ? 'font-extrabold' : '')} onClick={() => {
                        fetchModules(val, setModules);
                        setPageNo(val);
                    }}>{val}</a>
                })}
            </div>
            {pageNo < 99 ? (<a href="#" className="mx-2"
                onClick={() => {
                    fetchModules(pageNo + 1, setModules);
                    setPageNo(pageNo + 1);
                }}>{'>'}</a>) : <span className="opacity-50">{'>'}</span>}
        </div>
    </>)
}

function WorkflowPage({ pageID, pageIDSetter }) {
    const [workflow, setWorkflow] = useState({});
    if (Object.keys(workflow).length === 0) {
        if (!(pageID === null)) {
            fetchData(pageID, setWorkflow);

        }
    }

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
                        <DnDFlow></DnDFlow>
                    </div>
                </div>
            </div>
        </>
    )

}


export default WorkflowPage;



