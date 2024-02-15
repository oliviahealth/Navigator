import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        PageOne
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#4d0000', // Your primary color
    },
    text: {
      primary: '#000000', // Your text color
    },
  },
  typography: {
    fontFamily: 'Tungsten Medium', // Set the default font family
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Open Sans', // Set the font family for buttons
        },
      },
    },
  },
});

export default function SignInSide() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    try {
      const response = await fetch('/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const responseData = await response.json();

      if (response.status === 200) {
        // Login successful
        // Store the user's ID and email in the browser's local storage
        localStorage.setItem('userId', responseData.userID);
        localStorage.setItem('formsStatus', JSON.stringify(responseData.formsStatus));
        const formsSubmitted = JSON.parse(localStorage.getItem('formsStatus')) || {};
        localStorage.setItem('maternalDemographicsSubmitted', formsSubmitted.maternal_demographics_submitted);
        localStorage.setItem('medicalHistorySubmitted', formsSubmitted.medical_history_submitted);
        localStorage.setItem('socialSupportSubmitted', formsSubmitted.social_supports_submitted);
        localStorage.setItem('substanceUseServicesSubmitted', formsSubmitted.substance_use_services_submitted);
        localStorage.setItem('serviceNeedsSubmitted', formsSubmitted.service_needs_submitted);
        localStorage.setItem('relapse_plan_submitted', formsSubmitted.relapse_plan_submitted);
        // localStorage.setItem('drugScreeningResultsSubmitted', formsSubmitted.drug_screening_results_submitted);
        // const maternalDemographicsSubmitted = formsSubmitted.maternal_demographics_submitted;
        // const maternalHistorySubmitted = formsSubmitted.maternal_history_submitted;

        // Store the user's ID and email in the app state
        // setUserID = responseData.userId;
        // setEmail = responseData.email;
        //print user id
        console.log(responseData.userID);
        console.log(responseData.formsStatus);
        console.log(localStorage.getItem('maternalDemographicsSubmitted'));
        console.log(localStorage.getItem('medicalHistorySubmitted'));
        console.log(localStorage.getItem('socialSupportSubmitted'));
        console.log(localStorage.getItem('substanceUseServicesSubmitted'));
        console.log(localStorage.getItem('serviceNeedsSubmitted'));
        console.log(localStorage.getItem('relapse_plan_submitted'));
        // console.log(localStorage.getItem('drugScreeningResultsSubmitted'));
        
        login(); 
        // You can redirect the user or show a success message
        navigate('/home2');

      } else {
        // Login failed
        console.error(responseData.message);
        // Show an error message to the user
      }
    } catch (error) {
      console.error('There was an error:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/babymotherbg.png)', // https://unsplash.com/photos/girl-in-black-and-pink-dress-blowing-bubbles-KbnZgOtM3FI
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: customTheme.palette.primary.main }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color="text.primary">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: customTheme.palette.primary.main,
                  color: 'white', // Set the button text color to white
                }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2" color="text.primary">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <RouterLink to="/signup" style={{ textDecoration: 'none' }}>
                    <Link variant="body2" color="text.primary">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </RouterLink>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
