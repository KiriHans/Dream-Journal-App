import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"

type SideBarProps = {
  drawerWidth: number
}

export const SideBar = ({ drawerWidth }: SideBarProps) => {
  return (
    <Box
    component='nav'
    sx={{
      width: { sm: drawerWidth }, 
      flexShrink: { sm: 0 }
    }}
    >
      <Drawer
      variant="permanent"
      open
      sx={{
        display: { xs: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
      }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">Galindo Calisto</Typography>
        </Toolbar>

        <Divider />

        <List>
          {
            ['January', 'February', 'March', 'April'].map((text) => (
              <ListItem key={ text } disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TurnedInNot />
                  </ListItemIcon>
                  <Grid container>
                    <ListItemText primary={ text } />
                    <ListItemText secondary={ 'This is a text full of details that you have to understand' } />
                  </Grid>

                </ListItemButton>
                
              </ListItem>
            ))
          }
        </List>
      </Drawer>

    </Box>
  )
}

