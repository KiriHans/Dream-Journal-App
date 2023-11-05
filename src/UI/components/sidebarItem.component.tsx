import { TurnedInNot } from '@mui/icons-material';
import { ListItem, ListItemButton, ListItemIcon, Grid, ListItemText } from '@mui/material';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { INote } from 'src/store/interfaces';
import { setActiveNote } from 'src/store/journal';

type SideBarItemProps = {
  note: INote;
};

export const SidebarItem = ({ note }: SideBarItemProps) => {
  const dispatch = useAppDispatch();
  const onclickNote = (note: INote) => {
    dispatch(setActiveNote(note));
  };
  return (
    <ListItem
      key={note.id}
      disablePadding
      onClick={() => {
        onclickNote(note);
      }}
    >
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid
          container
          sx={{
            overflow: 'hidden',
          }}
        >
          <ListItemText
            primary={note.title}
            primaryTypographyProps={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          />
          <ListItemText secondary={note.body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
