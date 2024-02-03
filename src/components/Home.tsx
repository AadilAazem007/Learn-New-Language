import { Button, Container, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
const languages = [
    {
        name:"Hindi",
        code:"hi"
    },
    {
        name:"Japanies",
        code:"ja"
    },
    {
        name:"French",
        code:"fr"
    },
    {
        name:"Spanish",
        code:"es"
    }
]

const Home = () => {
    const navigate = useNavigate()

    const languageSelectorHolder = (language: string):void => {
        navigate(`/learn?language=${language}`)
    }

    return (
        <Container maxWidth={"sm"}>
            <Typography variant="h3" p={"2rem"} textAlign={"center"}>
                Welcome being your journy of learning.
            </Typography>

            <Stack direction={"row"}
                spacing={"2rem"}
                p={"2rem"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                {
                    languages.map((language, index) => (
                        <Button key={language.code} onClick={()=>languageSelectorHolder(language.code)}>{language.name}</Button>
                    ))
                }
            </Stack>
        </Container>
    )
}

export default Home