import { Divider, Grid, Typography, keyframes } from '@mui/material'

type AuthLayoutProps = {
  children: React.ReactNode,
  title: string,
}

const backgroundImage = 'https://images.unsplash.com/photo-1608178398319-48f814d0750c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=248&fit=crop&auto=format'
const backgroundKeyframes = keyframes`
    0%{transform: scale(1);}
    50%{transform: scale(1.1);}
    100%{scale(1);}
`

export const AuthLayout = ({ children, title= '' }: AuthLayoutProps) => {
  return (

      <Grid 
      className='normality'
        container
        spacing={ 0 }
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          minHeight: '100vh', 
          padding: 4, 
          backgroundColor: '#000000',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cg %3E%3Ccircle fill='%23000000' cx='400' cy='400' r='600'/%3E%3Ccircle fill='%23080711' cx='400' cy='400' r='500'/%3E%3Ccircle fill='%230f0e22' cx='400' cy='400' r='400'/%3E%3Ccircle fill='%23171432' cx='400' cy='400' r='300'/%3E%3Ccircle fill='%231e1b43' cx='400' cy='400' r='200'/%3E%3Ccircle fill='%23262254' cx='400' cy='400' r='100'/%3E%3C/g%3E%3C/svg%3E");`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >

        <Grid 
          item 
          className='box-shadow'
          sx={{        
            width: { md: 450 },
            backgroundColor: 'white',
            zIndex: 1,
            padding: 3, 
            borderRadius: 2
          }}
        >
          
          <Typography variant='h4' textAlign='center' sx={{ 
            mb: 1,
            fontWeight: 600
            }}>
              { title }
          </Typography>
          <Divider sx={{ mb: 1 }} />
          { children }
        </Grid>
      </Grid>
      

  )
}