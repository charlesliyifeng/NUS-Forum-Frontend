import UserIdContext from "../contexts/UserIdContext";
import { createSession, createSessionParams } from "../lib/api/session";

import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate, Navigate } from "react-router-dom";

const SignIn: React.FC = () => {
    const { userID, setUserID } = useContext(UserIdContext);
    const navigate = useNavigate();

    // if signed in
    if (userID !== -1) {
        return <Navigate replace to="/" />;
    }

    function validateInput(params: createSessionParams): boolean {
        // validate input
        if (!(params.email && params.password)) {
            alert("email and password cannot be empty");
            return false;
        }

        return true;
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const params: createSessionParams = {
            email: data.get("email")!.toString().trim(),
            password: data.get("password")!.toString(),
        };

        if (!validateInput(params)) {
            return;
        }

        // create session from API
        try {
            const response = await createSession(params);
            // set userID
            setUserID(response.data.userId);
            console.log("signed in");

            // store token
            sessionStorage.setItem("token", response.data.authToken);

            // navigate back
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("email or password is incorrect");
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                    <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default SignIn;