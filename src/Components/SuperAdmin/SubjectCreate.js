//#region imports
import { Button, TextField } from '@mui/material';
import React, { useContext, useState } from 'react'
import { useHistory } from "react-router-dom";
import { ProgressContext } from '../../App';
import { onChange } from '../../Common/Helper';
import SubjectCreate from '../../DataRepository/SuperAdmin/SubjectCreate';
//#endregion

function SubjectCreateBLL(props) {
    //#region
    const [Subject, setSubject] = useState({ id: '', name: '', description: '' });
    const { setProgress } = useContext(ProgressContext)
    const history = useHistory();
    //#endregion

    const insertSubject = async (e) => {
        setProgress(30)
        e.preventDefault();
        var result = await SubjectCreate({
            id: Subject.id, name: Subject.name, description: Subject.description
        })
        setProgress(80)
        history.push("/SuperAdmin/Subject");
        setProgress(100)
    };
    //#endregion

    //#region html
    return (
        <div className="content-wrapper ">
            <h4 className="d-flex font-weight-bold title h3 text-black">
                &nbsp;Create Subject
            </h4>
            <form className="forms-sample card-body "
                onSubmit={insertSubject}
            >
                <div className="mtCustom tableContainer forms-sample align-center">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 pt-2 col-xs-12 form-group ">
                            <TextField id="outlined-basic" label="Subject Name" variant="outlined" size='small' type="text" name="name" className="form-control" placeholder="Subject Name" value={Subject.name} onChange={(e) => onChange(e, Subject, setSubject)} autoFocus required />
                            <div className="invalid-tooltip">
                                Please provide name.
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 pt-2 col-xs-12 form-group ">
                            <TextField id="outlined-basic" label="Description" variant="outlined" size='small' type="text" name="description" className="form-control" placeholder="Description" value={Subject.description} onChange={(e) => onChange(e, Subject, setSubject)} autoFocus required />
                            <div className="invalid-tooltip">
                                Please provide name.
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row d-flex col-sm cusMediaPad'>
                    <Button size='large' sx={{ width: "100px" }} title='Create Employee'
                        data-toggle="tooltip" data-placement="top" type="submit" className="btn btn-primary mr-2 btnCusPad"
                    >Save</Button>
                    <Button size='large' sx={{ width: "100px" }} title='Go to List'
                        className="btn btn-primary btnCusPad ml-2" onClick={() => {
                            history.push("/SuperAdmin/Subject")
                            // window.location.reload(false);
                        }}>Cancel</Button>
                </div>
            </form>
            <script src="http://localhost:3000/assets/vendors/js/vendor.bundle.base.js"></script>
            <script src="http://localhost:3000/assets/js/off-canvas.js"></script>
            <script src="http://localhost:3000/assets/js/hoverable-collapse.js"></script>
            <script src="http://localhost:3000/assets/js/misc.js"></script>
        </div>
    )
    //#endregion
}

export default SubjectCreateBLL