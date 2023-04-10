import React, { memo } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';


const isValidConnection = (connection) => {
    // let s = connection.source;
    // let t = connection.target;
    // let elms = document.getElementsByClassName('react-flow__node');
    // for(let a of elms) {
    //     let inp = a.getElementsByClassName('output-text')[0];
    //     let out = a.getElementsByClassName('input-text')[0];

    //     console.log(a.getAttribute('data-id'), inp, out)//inp.innerHTML, out.innerHTML)
    // }
    return true;
// react-flow__node react-flow__node-input nopan selectable

};

function CustomNode({ data}) {
    const { getNode } = useReactFlow();
    return (<div>
        <div className="overflow-hidden bg-white flex flex-row items-center justify-between w-[90%] m-auto my-2 rounded-lg border-style h-[55px]">
            <div className="w-[55px] h-[55px] items-center flex justify-center font-bold border-style output-text" io={data.input_type}>{data.input_type.toUpperCase()}</div>
            <div className="bg-[#f2f7fb] h-full w-[calc(100%-(55px*2))] flex items-center text-xs text-gray-600 font-semibold px-2">{data.name}</div>
            <div className="w-[55px] h-[55px] items-center flex justify-center font-bold border-style input-text" io={data.output_type}>{data.output_type.toUpperCase()}</div>
        </div>
        <Handle type="target" position={Position.Top} className="translate-y-2 translate-x-[-50%] w-3 h-1 rounded-none opacity-20" isValidConnection={isValidConnection}/>
        <Handle type="source" position={Position.Bottom} className="-translate-y-2 translate-x-[-50%] w-3 h-1 rounded-none opacity-20" isValidConnection={isValidConnection}/>
    </div>)
}


const InpNode = memo(({ data }) => {
    return (<div>
        <div className="min-w-fit overflow-hidden bg-white flex flex-row items-center justify-between w-[90%] m-auto my-2 rounded-lg border-style h-[55px]">
            <div className="w-[55px] h-[55px] items-center flex justify-center font-bold border-style">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path stroke="none" d="M0 0h24v24H0z"></path>
                    <path d="M12 3a9 9 0 100 18 9 9 0 000-18M16 12l-4-4M16 12H8M12 16l4-4"></path>
                </svg>
            </div>
            <div className="bg-[#f2f7fb] h-full w-[calc(100%-(55px*2))] flex items-center text-xs text-gray-600 font-semibold px-2">Input</div>
            <div className="w-[55px] h-[55px] items-center flex justify-center font-bold border-style">{String(data).toUpperCase()}</div>
        </div>
        <Handle type="source" position={Position.Bottom} className="-translate-y-2 translate-x-[-50%] w-3 h-1 rounded-none opacity-20" />
    </div>)
})


export const InputNode = InpNode;
export default memo(CustomNode);
