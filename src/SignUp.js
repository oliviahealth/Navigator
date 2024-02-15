import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Reuse the custom theme defined in SignIn
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

export default function SignUp() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get('email'),
      password: data.get('password'),
      username: data.get('username'),
      first_name: data.get('firstName'),
      last_name: data.get('lastName'),
    };

    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("User created successfully!"); // You can replace this with a more user-friendly feedback mechanism
        localStorage.setItem('userId', result.userID);
        localStorage.setItem('formsStatus', JSON.stringify(result.formsStatus));
        const formsSubmitted = JSON.parse(localStorage.getItem('formsStatus')) || {};
        localStorage.setItem('maternalDemographicsSubmitted', formsSubmitted.maternal_demographics_submitted);
        localStorage.setItem('medicalHistorySubmitted', formsSubmitted.medical_history_submitted);
        localStorage.setItem('socialSupportSubmitted', formsSubmitted.social_supports_submitted);
        localStorage.setItem('substanceUseServicesSubmitted', formsSubmitted.substance_use_services_submitted);
        localStorage.setItem('serviceNeedsSubmitted', formsSubmitted.service_needs_submitted);
        localStorage.setItem('relapse_plan_submitted', formsSubmitted.relapse_plan_submitted)
        // localStorage.setItem('drugScreeningResultsSubmitted', formsSubmitted.drug_screening_results_submitted);
        console.log(result.formsStatus);
        console.log(result.userID);
        console.log(result.formsStatus);
        console.log(localStorage.getItem('maternalDemographicsSubmitted'));
        console.log(localStorage.getItem('medicalHistorySubmitted'));
        console.log(localStorage.getItem('socialSupportSubmitted'));
        console.log(localStorage.getItem('substanceUseServicesSubmitted'));
        console.log(localStorage.getItem('serviceNeedsSubmitted'));
        console.log(localStorage.getItem('relapse_plan_submitted'));
        // console.log(localStorage.getItem('drugScreeningResultsSubmitted'));
        login(); // Set the user as authenticated
        navigate('/home2');
      } else {
        alert(result.message); // Display the error message from the backend
      }
    } catch (error) {
      console.error('There was an error:', error);
      alert('There was an error. Please try again later.');
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: customTheme.palette.primary.main }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="text.primary">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
            </Grid>
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" color="text.primary">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
