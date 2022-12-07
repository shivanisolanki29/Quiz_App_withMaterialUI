import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Alert,
} from "@mui/material";
import { green } from'@mui/material/colors';
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import { getFormatedTime } from "../helper";
import useStateContext from "../hooks/useStateContext";
import Answer from "./Answer";

export default function Result() {
  const { context, setContext } = useStateContext();
  const [score, setScore] = useState(0);
  const [qnAnswers, setQnAnswers] = useState([]);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const ids = context.selectedOptions.map((x) => x.qnId);
    createAPIEndpoint(ENDPOINTS.getAnswers)
      .post(ids)
      .then((res) => {
        const qna = context.selectedOptions.map((x) => ({
          ...x,
          ...res.data.find((y) => y.qnId === x.qnId),
        }));
        setQnAnswers(qna);
        calculateScore(qna);
      })
      .catch((err) => console.log(err));
  }, []);

  const calculateScore = (qna) => {
    let tempScore = qna.reduce((acc, curr) => {
      return curr.answer === curr.selected ? acc + 1 : acc;
    }, 0);
    setScore(tempScore);
  };

  const restart = () => {
    setContext({
      timeTaken: 0,
      selectedOptions: [],
    });
    navigate("/quiz");
  };
  const submitScore = () => {
    createAPIEndpoint(ENDPOINTS.participant)
      .put(context.participantId, {
        participantId: context.participantId,
        score: context.score,
        timeTaken: context.timeTaken,
      })
      .then((res) => {
        // console.log(res)
        setShowAlert(true);
        setTimeout(() => {
        setShowAlert(false);
        }, 4000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Card
        sx={{
          mt: 5,
          display: "flex",
          width: "100%",
          maxWidth: "640",
          mx: "auto",
          justifyContent: "space-evenly",
          // background:"blue"
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", flowGrow: 1 }}>
          {/* <CardContent>hello</CardContent> */}
          <CardContent sx={{ flex: "1 0 auto", textAlign: "center" }}>
            <Typography variant="h4"> Congratulations</Typography>
            <Typography variant="h6">YOUR SCORE</Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              <Typography 
                variant="span"
                // color="green"
              color={ green[500] }
              >
                {score}</Typography>/5
            </Typography>
            <Typography variant="h6">
              Took {getFormatedTime(context.timeTaken) + " mins"}
            </Typography>
            <Button
              variant="contained"
              sx={{ mx: 1 }}
              size="small"
              onClick={submitScore}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              sx={{ mx: 1 }}
              size="small"
              onClick={restart}
            >
              Re-try
            </Button>
            <Alert
              severity="success"
              variant="string"
              sx={{
                width: "80%",
                m: "auto",
                visibility: showAlert ? "visible" : "hidden",
              }}
            >
              Score Update.
            </Alert>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 220, background: "green" }}
          image="../resulted1.png"
          alt="Live from space album cover"
        />
      </Card>
      <Answer qnAnswers={qnAnswers}/>
    </>
  );
}
