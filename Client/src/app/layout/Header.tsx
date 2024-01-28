import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from '@mui/material'
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart } from '@mui/icons-material';
import { useStoreContext } from '../context/StoreProvider';

const midLinks = [
    {title: "catalog", path: "/catalog"},
    {title: "about", path: "/about"},
    {title: "contact", path: "/contact"}
]

const rightLinks = [
    {title: "login", path: "/login"},
    {title: "register", path: "/register"}
]

const navStyles = {
    color: "inherit", 
    typography: "h6",
    textDecoration: "none",
    "&:hover": {
        color: "grey.500"
    }
};

type HeaderProps = {
    darkMode: boolean;
    onChangeDarkMode: (_: React.ChangeEvent, checked: boolean) => void
};

export default function Header({darkMode, onChangeDarkMode}: HeaderProps) {

  const {basket} = useStoreContext();

  const totalQuantity = basket?.basketItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position='static' sx={{marginBottom: 4}}>
        <Toolbar sx={{justifyContent: "space-between"}}>
            <Box sx={{display: "flex", alignItems: "center"}}>
                <Typography variant='h6' component={NavLink} to="/" sx={navStyles}>
                    RE-STORE
                </Typography>
                <Switch checked={darkMode} onChange={onChangeDarkMode}></Switch>
            </Box>

            <List sx={{display: "flex", alignItems: "center"}}>
                {midLinks.map(x => 
                <ListItem component={NavLink} to={x.path} key={x.path} sx={navStyles}>
                        {x.title.toUpperCase()}
                </ListItem>)}
            </List>
            
            <Box sx={{display: "flex", alignItems: "center"}}>
                <IconButton component={Link} to="/basket" size='large' edge="start" sx={{color: "inherit", marginRight: 2}}>
                    <Badge badgeContent={totalQuantity}>
                        <ShoppingCart/>
                    </Badge>
                </IconButton>

                <List sx={{display: "flex", alignItems: "center"}}>
                    {rightLinks.map(x => 
                    <ListItem component={NavLink} to={x.path} key={x.path} sx={navStyles}>
                            {x.title.toUpperCase()}
                    </ListItem>)}
                </List>
            </Box>

        </Toolbar>
    </AppBar>
  )
}
