import Box from '@mui/material/Box';
import { IconButton, ImageList, ImageListItem } from '@mui/material';
import { IImagesUrls } from 'src/store/interfaces';
import { startDeletingImage } from 'src/store/journal';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { Delete } from '@mui/icons-material';

type ImageGalleryProps = {
  images: IImagesUrls[];
};

export const ImageGallery = ({ images }: ImageGalleryProps) => {
  const dispatch = useAppDispatch();

  const onDeleteImage = (title: string) => {
    dispatch(startDeletingImage(title));
  };
  return (
    <Box
      sx={{
        'width': '100%',
        'height': 450,
        'overflowY': 'scroll',
        'position': 'relative',
        '.MuiImageListItem-root:hover > .MuiButtonBase-root': {
          display: 'flex',
        },
      }}
    >
      <ImageList variant="masonry" cols={5} gap={8}>
        {images.map((item) => (
          <Box key={`${item.url}`}>
            <ImageListItem className="image-class">
              <IconButton
                className="animate__animated animate__rotateIn animate__faster"
                onClick={() => onDeleteImage(item.name)}
                size="small"
                sx={{
                  'display': 'none',
                  'position': 'absolute',
                  'top': 5,
                  'right': 5,
                  'color': 'white',
                  'backgroundColor': 'error.main',
                  ':hover': { backgroundColor: 'error.main', opacity: 0.7 },
                  'height': 'min(12rem, 4vw)',
                  'width': 'min(10rem, 4vw)',
                }}
              >
                <Delete
                  className="animate__animated animate__zoomIn animate__faster"
                  sx={{ height: 'min(10rem, 3vw)', width: 'min(10rem, 3vw)' }}
                />
              </IconButton>
              <img
                src={`${item.url}?w=248&fit=crop&auto=format`}
                srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.name}
                loading="lazy"
              />
            </ImageListItem>
          </Box>
        ))}
      </ImageList>
    </Box>
  );
};
