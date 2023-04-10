import { useRef, useEffect, useState, useCallback, memo } from "react";
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Background
} from 'reactflow';
import 'reactflow/dist/style.css';

import CustomNode, { InputNode } from "../components/CustomNode";


const nodeTypes = {
    custom: CustomNode,
    input: InputNode
};

let id = 0;
const getId = () => `dndnode_${id++}`;

// const intl = [
//     {
//         id: '1',
//         type: 'input',
//         data: {},
//         position: { x: 250, y: 5 },
//         style: {
//             border: 'none',
//             outline: 'none',
//             width: 'fit-content',
//             padding: 0,
//             height: 'fit-content',
//         }
//     },
// ];

const WorkflowCanvas = ({ intl }) => {
    const reactFlowWrapper = useRef(null);

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


export default memo(WorkflowCanvas);