import { AppBar, Box, Switch, Toolbar, Typography } from '@mui/material'

type HeaderProps = {
    darkMode: boolean;
    onChangeDarkMode: (_: any, checked: boolean) => void
};



export default function Header({darkMode, onChangeDarkMode}: HeaderProps) {
  return (
    <AppBar position='static' sx={{marginBottom: 4}}>
        <Toolbar>
            <Box sx={{display: "flex", alignItems: "center"}}>
                <Typography variant='h6'>RE-STORE</Typography>
                <Switch checked={darkMode} onChange={onChangeDarkMode}></Switch>
            </Box>
        </Toolbar>
    </AppBar>
  )
}
