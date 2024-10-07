import {AppBar, Toolbar, Typography} from '@mui/material';

const Nav = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" component="div">
          Task Management
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default Nav;
