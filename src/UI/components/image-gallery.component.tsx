import Box from '@mui/material/Box';
import { ImageList, ImageListItem } from '@mui/material';
import { IImagesUrls } from 'src/store/interfaces';

type ImageGalleryProps = {
  images: IImagesUrls[];
};

export const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <Box sx={{ width: '100%', height: 450, overflowY: 'scroll' }}>
      <ImageList variant="masonry" cols={5} gap={8}>
        {images.map((item) => (
          <ImageListItem key={item.url}>
            <img
              src={`${item.url}?w=248&fit=crop&auto=format`}
              srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.name}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};
