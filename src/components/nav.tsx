import {AppBar, IconButton, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';

const Nav = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <Menu />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          Task Management
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default Nav;
