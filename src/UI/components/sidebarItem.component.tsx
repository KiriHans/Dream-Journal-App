import { TurnedInNot } from '@mui/icons-material';
import { ListItem, ListItemButton, ListItemIcon, Grid, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { INote } from 'src/store/interfaces';
import { setActiveNote } from 'src/store/journal';

type SideBarItemProps = {
  note: INote;
};

export const SidebarItem = ({ note }: SideBarItemProps) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const onclickNote = (note: INote) => {
    dispatch(setActiveNote(note));
    navigate(`${note.id}/${note.title}`);
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
            flexDirection: 'column',
          }}
        >
          <ListItemText
            primary={note.title}
            primaryTypographyProps={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            sx={{
              width: '100%',
            }}
          />
          <ListItemText
            secondary={note.body}
            secondaryTypographyProps={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%',
            }}
            sx={{
              width: '100%',
            }}
          />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
