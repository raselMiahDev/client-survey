import { MdDoneOutline } from "react-icons/md";

const SuccessMsg = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <div>
                <div>

                    <MdDoneOutline className="bg-green-500 text-7xl rounded-full text-white p-2"/>
                    <h1 className="text-2xl py-3">Thank you for your feedback</h1>
                    <a className="text-blue-500" href="http://wa.me/+8801716607988" target="_blank" rel="noopener noreferrer">
                        Presented By Enam Trims IT
                    </a>

                    <div className="flex gap-4 pt-5">
                    <h1>Visit Now : </h1>
                    <a className="text-blue-500" href="https://etrims.co.uk/" target="_blank" rel="noopener noreferrer">
                    https://etrims.co.uk
                    </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessMsg;