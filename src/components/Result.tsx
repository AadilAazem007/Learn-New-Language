import { useSelector, useDispatch} from "react-redux";
import { countMatchingElements } from "../utils/features";
import { useNavigate } from "react-router-dom";
import { clearState } from "../redux/slices";
import {
    Button,
    Container,
    List,
    ListItem,
    Stack,
    Typography,
  } from "@mui/material";
  
  const Result = () => {

    const style1:{color:string} = {color: 'salmon'};


    const {words,result} = useSelector((state:{root:StateType})=>state.root )
    const dispatch = useDispatch()

    const correctAns = countMatchingElements(result,words.map((i)=>i.meaning))
    const percentage = (correctAns/words.length)*100
    const navigate = useNavigate()

    const resetHandler = ():void => {
      navigate('/')
      dispatch(clearState())
    }

    return (
      <Container maxWidth={"sm"}>
        <Typography variant="h3" color={"primary"} m={"2rem 0"}>
          Result
        </Typography>
        <Typography m={"1rem"} variant="h6">
          You got {correctAns} right out of {words.length}
        </Typography>
        <Typography m={"1rem"} variant="h6">
          Percentage is :- {percentage}
        </Typography>
  
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Stack>
            <Typography m={"1rem 0"} variant="h5">
              Your Ans
              {
                result.map((i,indx)=> (
                  <p key={indx} style={{color:"blue"}}>{i}</p>
                ))
              }
            </Typography>
            <List>
              
            </List>
          </Stack>
          <Stack>
            <Typography m={"1rem 0"} variant="h5">
              Correct Ans
              {
                words.map((i,indx)=> (
                  <p key={indx} style={{color:"green"}}>{i.meaning} </p>
                ))
              }
            </Typography>
            <List>
              
            </List>
          </Stack>
          <Stack>
            <Typography m={"1rem 0"} variant="h5">
              Meaning Ans
              {
                words.map((i,indx)=> (
                  <p key={indx} style={{...style1}}>{i.word} </p>
                ))
              }
            </Typography>
            <List>
              
            </List>
          </Stack>
        </Stack>
  
        
          { percentage > 50 ? 
          
          <Typography
          m={"1rem"}
          variant="h5"
          color={"green"}>
          Pass
        </Typography>
          :  
           <Typography
           m={"1rem"}
           variant="h5"
           color={"red"}>
           Fail
         </Typography> }
        
  
        <Button
          onClick={resetHandler}
          sx={{ margin: "1rem" }}
          variant="contained"
        >
          Reset
        </Button>
      </Container>
    );
  };
  
  export default Result;