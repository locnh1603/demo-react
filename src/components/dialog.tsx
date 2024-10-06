import React from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';

export interface DialogProps {
  open: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  title: string;
  children: React.ReactNode;
  style?: any;
}

const FormDialog = ({ open, onClose, title, children, onSubmit, style }: DialogProps) => {
  if (!open) {
    return null
  }
  return (
    <React.Fragment>
      <Dialog
        open={open}
        PaperProps={{
          component: 'form'
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
export default FormDialog;
