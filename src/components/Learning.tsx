import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Container, Button, Typography, Stack } from '@mui/material'
import { ArrowBack, VolumeUp } from '@mui/icons-material'
import { translateWord } from '../utils/features'
import { useDispatch, useSelector } from 'react-redux'
import { clearState, getWordsFail, getWordsRequest, getWordsSuccess } from '../redux/slices'
import Loader from './Loader'

const Learning = () => {
    const [count, setCount] = useState<number>(0)
    const params = useSearchParams()[0].get("language") as LangType
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading,error,words } = useSelector((state:{root: StateType})=>state.root)

    const nextHandler = ():void => {
        setCount((pre)=> pre+1)
    }

    useEffect(()=> {
        dispatch(getWordsRequest())
        translateWord(params || "hi")
        .then((arr)=> dispatch(getWordsSuccess(arr)))
        .catch((err)=> dispatch(getWordsFail(err)))

        if(error){
            alert(error)
            dispatch(clearState())
        }
    },[])

    if(loading) return <Loader/>
    
    return (
        <Container maxWidth="sm" sx={{
            padding:"1rem"
        }}>
            <Button onClick={ count === 0 ? ()=>navigate("/") : ()=>setCount((prev)=>prev - 1)}>
                <ArrowBack/>
            </Button>
            <Typography m="2rem 0">Learning Made Easy</Typography>
            <Stack direction={"row"} spacing={"1rem"}>
                <Typography variant={"h4"}>
                    {count+1} - {words[count]?.word}
                </Typography>
                <Typography color={"blue"} variant={"h4"}>
                    : {words[count]?.meaning}
                </Typography>
                <Button sx={{ borderRadius: "50%" }}>
                    <VolumeUp/>
                </Button>
            </Stack>

            <Button onClick={ count === 7 ? ()=>navigate(`/quiz`) : nextHandler} 
                    sx={{ margin: "3rem 0" }} variant='contained' fullWidth>
                    {"Next"}
            </Button>
        </Container>
    )
}

export default Learning