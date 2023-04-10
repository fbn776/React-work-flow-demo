import {useState} from "react";

const fetchModules = (page, setter) => {
    let url = `https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=${page}&limit=5`;
    fetch(url)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setter(data)
        })
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
                {pageArr.map((val, index) => {
                    return <a key={index} className={"mx-1 " + (pageNo === val ? 'font-extrabold' : '')} onClick={() => {
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
};

export default Modules;