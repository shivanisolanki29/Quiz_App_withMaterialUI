import React from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Center from "./Center";
import useForm from "../hooks/useForm";
import { createAPIEndpoint, ENDPOINTS } from "../api/index";

const getFreshModel = () => ({ name: "", email: "" });

export default function Login() {
  const {
    values,
    // setValues,
    errors,
    setErrors,
    handleInputChange,
  } = useForm(getFreshModel);

  const login = e => {
      e.preventDefault();
      if (validate())
    //   console.log(createAPIEndpoint(ENDPOINTS.participant).fetchById(2))
      createAPIEndpoint(ENDPOINTS.participant)
        .post(values)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
  };

  const validate = () => {
    let temp = {};
    temp.email = /\S+@\S+\.\S/.test(values.email) ? "" : "Email is not valid.";
    temp.name = values.name !== "" ? "" : "This field is requied.";
    // console.log(temp);
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };
  return (
    <>
      <Center>
        <Card sx={{ width: 400 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h3" sx={{ my: 3 }}>
              Quiz App
            </Typography>
            <Box
              sx={{
                "& .MuiTextField-root": {
                  m: 1,
                  width: "90%",
                },
              }}
            >
              <form noValidate autoComplete="off" onSubmit={login}>
                <TextField
                  label="Email"
                  name="email"
                  value={values.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  {...(errors.email && {
                    error: true,
                    helperText: errors.email,
                  })}
                />
                <TextField
                  label="Name"
                  name="name"
                  value={values.name}
                  onChange={handleInputChange}
                  {...(errors.name && {
                    error: true,
                    helperText: errors.name,
                  })}
                  variant="outlined"
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ width: "90%" }}
                >
                  Start
                </Button>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Center>
    </>
  );
}