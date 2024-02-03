import { Typography, AppBar, Toolbar } from "@mui/material"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const styles = {
    color:"white",
    margin: "0.5rem",
    textDecoration:"none"
}

const Header = () => {
    const { words,result } = useSelector((state:{root: StateType}) => state.root)
    return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" mr={"auto"} textTransform={"uppercase"}>Learndo.</Typography>

                    
                    
                    {
                        words.length === 0 && result.length === 0 ?
                        <>
                            <Link style={styles} to=''>Home</Link>
                            <Link style={styles} to='/learning'>Learning</Link>
                        </>
                        : words.length !== 0 && result.length === 0 ?
                            <>
                                <Link style={styles} to=''>Home</Link>
                                <Link style={styles} to='/learning'>Learning</Link>
                                <Link style={styles} to='/quiz'>Quiz</Link>
                            </>
                        :
                        <>
                        <Link style={styles} to=''>Home</Link>
                                <Link style={styles} to='/learning'>Learning</Link>
                                <Link style={styles} to='/quiz'>Quiz</Link>
                                {
                                    result.length === words.length ? <Link style={styles} to='/result'>Result</Link> : null
                                }
                            
                            </>
                    }
                    
                    
                </Toolbar>
            </AppBar>
    )
}

export default Header