import React, { useEffect, useState } from 'react';
import { FaClipboardList } from 'react-icons/fa';
import '../../Switch.css';
import { ProgressContext } from '../../App';
import { useContext } from 'react';
import SubjectCard from './SubjectCard';
import SubjectListDR from '../../DataRepository/SuperAdmin/SubjectList';
import NotFound from '../../Common/NotFound';

function StudentList() {
    const [result, setResult] = useState([])
    const [IsOpen, setIsOpen] = useState(false)
    const [DeleteID, setDeleteID] = useState(false)
    const { setProgress } = useContext(ProgressContext)

    const GetData = async () => {
        setProgress(30)
        var result = await SubjectListDR();
        setProgress(60)
        setResult(result);
        setProgress(100)
    };
    useEffect(() => {
        GetData();
    }, []);

    return (
        <div className='content-wrapper'>
            <div className='mtCustom '>
                <div className='d-flex justify-content-between'>
                    <div className='font-weight-bold h3 text-black title'>
                        <FaClipboardList className='text-primary rounded titleIcon p-1' size={35} /> Subject List
                    </div>
                </div>
                {result && result?.length !== 0 ?
                    <div className='row'>
                        {
                            result?.map((s) => (
                                <div className='col-4 mb-4'>
                                    <SubjectCard data={s} />
                                </div>
                            ))
                        }
                    </div>
                    :
                    <NotFound Content="Please contact admin to add subjects" />
                }
            </div>
        </div >
    )
}

export default StudentList