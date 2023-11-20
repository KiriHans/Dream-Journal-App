import { Box, Divider, List, Toolbar, Typography } from '@mui/material';
import { useAppSelector } from 'src/hooks/useAppDispatch';
import { ResponsiveDrawer, SidebarItem } from '.';
import { SelectNotesSorted, selectAuth } from 'src/store/journal';

type SideBarProps = {
  drawerWidth: number;
};

export const SideBar = ({ drawerWidth }: SideBarProps) => {
  const { displayName } = useAppSelector(selectAuth);
  const notes = useAppSelector(SelectNotesSorted);

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      <ResponsiveDrawer drawerWidth={drawerWidth}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {displayName}
          </Typography>
        </Toolbar>

        <Divider />

        <List>
          {notes.map((note) => (
            <SidebarItem key={note.id} note={note} />
          ))}
        </List>
      </ResponsiveDrawer>
    </Box>
  );
};
