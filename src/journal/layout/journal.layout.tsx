import { Box, Toolbar } from "@mui/material"
import { NavBar, SideBar } from "src/UI/components";


type JournalLayoutProps = {
  children: React.ReactNode,
}

const drawerWidth = 240;

export const JournalLayout = ({ children }: JournalLayoutProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      
      <NavBar drawerWidth={drawerWidth}/>

      <SideBar drawerWidth={drawerWidth}></SideBar>

      <Box component='main' sx={{ flexGrow: 1, p: 3}}>

        <Toolbar />
        { children }

      </Box>
    </Box>
  )
}
