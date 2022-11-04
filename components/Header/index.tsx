import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Home as HomeIcon, Store as StoreIcon, Menu as MenuIcon } from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import page from '../../navigation/page';
import { NextRouter, useRouter } from 'next/router';

type NavItem = {
  label: string,
  path: string,
  icon?: any,
}

const navItems: NavItem[] = [
  { label: "Inicio", path: page.home, icon: <HomeIcon /> },
  { label: "Compañias", path: page.companies, icon: <StoreIcon /> },
];


function callNavItem(item: NavItem, router: NextRouter) {
  router.push(item.path);
}

interface IProps {
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

function DropDownLoggedIn(props: IProps) {
  const { anchorEl, setAnchorEl } = props;

  const router = useRouter();

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu
      id="Menu"
      onClose={handleClose}
      anchorEl={anchorEl}
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <List>
        {navItems.map((item: NavItem, index) => (
          <ListItem
            button
            onClick={() => callNavItem(item, router)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Menu>
  );
}

export default function ButtonAppBar() {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LiteThinking
          </Typography>
        </Toolbar>
        <DropDownLoggedIn anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      </AppBar>
    </Box>
  );
}