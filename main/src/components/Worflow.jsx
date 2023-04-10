import { useRef, useEffect, useState, useCallback, memo } from "react";
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Background,
    useReactFlow,
    useStoreApi
} from 'reactflow';
import 'reactflow/dist/style.css';

import CustomNode, { InputNode } from "../components/CustomNode";


const nodeTypes = {
    custom: CustomNode,
    input: InputNode
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const onConnectStart = (_, { nodeId, handleType }) => {
    //console.log('on connect start', { nodeId, handleType })
};

const onConnectEnd = (event) => {
    //console.log('on connect end', event);
}


function Flow({ intl, reactFlowWrapper }) {
    const [nodes, setNodes, onNodesChange] = useNodesState([
        {
            id: '1',
            type: 'input',
            data: intl,
            position: { x: 250, y: 5 },
            style: {
                border: 'none',
                outline: 'none',
                width: 'fit-content',
                padding: 0,
                height: 'fit-content',
            }
        },
    ]);

    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    
    const onConnect = useCallback((params) => {
        let s = params.source;
        let t = params.target;
        let elms = document.getElementsByClassName('react-flow__node');
        let sElm, tElm;
        for (let a of elms) {
            if (a.getAttribute('data-id') === s) {
                sElm = a;
            }

            if (a.getAttribute('data-id') === t) {
                tElm = a;
            }

            if (sElm && tElm) {
                break;
            }
        }

        let inp = sElm.getElementsByClassName('input-text')[0];
        let out = tElm.getElementsByClassName('output-text')[0];

        if (!inp) {
            inp = sElm.getElementsByClassName('output-text')[0]
        }
        setTimeout(() => {
            let inpTxt = inp.getAttribute('io').toUpperCase();
            let outTxt = out.getAttribute('io').toUpperCase();
            console.log(inpTxt, outTxt)

            if (inpTxt === outTxt) {
                sElm.setAttribute("has-edge", true);
                tElm.setAttribute("has-edge", true);

                setEdges((eds) => addEdge(params, eds));
            }
            //console.log(a.getAttribute('data-id'), inp.getAttribute('io'), out)//inp.innerHTML, out.innerHTML)
        }, 0)

    }, []);

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
                data: data,
            };
            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );



    return (
        <ReactFlowProvider>
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
                onConnectStart={onConnectStart}
                onConnectEnd={onConnectEnd}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </ReactFlowProvider>
    )
}
//<Flow {...{ nodes, edges, onNodesChange, onEdgesChange, onConnect, setReactFlowInstance, onDrop, onDragOver, nodeTypes, onConnectStart, onConnectEnd }} ></Flow>
// 

const WorkflowCanvas = ({ intl }) => {
    const reactFlowWrapper = useRef(null);
    return (
        <div className="w-full h-full" ref={reactFlowWrapper}>
            <ReactFlowProvider>
                <Flow intl={intl} reactFlowWrapper={reactFlowWrapper}></Flow>
            </ReactFlowProvider>
        </div>
    );
};


export default memo(WorkflowCanvas);
