import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

function CustomNode({data}) {
    return (<div>
        <div className="overflow-hidden bg-white flex flex-row items-center justify-between w-[90%] m-auto my-2 rounded-lg border-style h-[55px]">
            <div className="w-[55px] h-[55px] items-center flex justify-center font-bold border-style">{data.input_type.toUpperCase()}</div>
            <div className="bg-[#f2f7fb] h-full w-[calc(100%-(55px*2))] flex items-center text-xs text-gray-600 font-semibold px-2">{data.name}</div>
            <div className="w-[55px] h-[55px] items-center flex justify-center font-bold border-style">{data.output_type.toUpperCase()}</div>
        </div>
        <Handle type="target" position={Position.Top} className="translate-y-2 translate-x-[-50%] w-3 h-1 rounded-none opacity-20" />
        <Handle type="source" position={Position.Bottom} className="-translate-y-2 translate-x-[-50%] w-3 h-1 rounded-none opacity-20" />
    </div>)
}


export default memo(CustomNode);