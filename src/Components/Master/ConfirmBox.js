import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AlertDialog({ IsOpen,
    setIsOpen, DeleteID,
    handleAgree, ModelInfo }) {

    const handleClose = () => { setIsOpen(false) }

    return (
        <div>
            <Dialog
                open={IsOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <DeleteIcon color='red' sx={{ fontSize: 30, color: "#ff0f6b", marginRight: 2 }} />
                    {ModelInfo.Header}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {ModelInfo.Message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{ModelInfo.CencelButton}</Button>
                    <Button onClick={() => {
                        handleAgree(DeleteID)
                        handleClose()
                    }} autoFocus>
                        {ModelInfo.AgreeButton}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}