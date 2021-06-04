import { useContext, useState, useEffect } from 'react'
import UserContext from '../context/userContext'
import { Card, CardMedia, CardContent,
        Typography, CardActions, Button,
        Tooltip, IconButton } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { User } from '../types/user.interface'
import { Link } from 'react-router-dom'

const SingleUser = ({ id }:any) => {
    const { getSingleUser, modifyUserState  }:any = useContext(UserContext);
    const [singleUser, setSingleUser] = useState<User>();
    const [isActive, setActive] = useState<Boolean>();
    const [isLoading, setLoading] = useState<Boolean>(true);

    useEffect(() => {
        getSingleUser(id).then((user:any) => {
            setLoading(false)
            setSingleUser(user)
        });
    }, []);

    useEffect(() => {
        setActive(singleUser?.active)
    }, [singleUser]);

    function handleActive(isActive: boolean, user:any){
        modifyUserState(user,isActive);
        setActive(isActive)

    }

    return (
        <div className='user__container'>
            <div className="back__container">
            <Link to="/">
                <Tooltip title="Back to home">
                    <IconButton>
                        <ArrowBackIcon style={{ fontSize: 60 }}></ArrowBackIcon>
                    </IconButton>
                </Tooltip>
            </Link>
            </div>
            <Card className='card__container' style={{display: `${isLoading ? 'none' : 'block'}`}}>
                <CardMedia
                    className={`image__container ${isActive ? 'active' : ''}`}
                    image={singleUser?.avatar}
                />
                <CardContent>
                    <Typography align='center' gutterBottom variant="h5" component="h1">
                        { `${singleUser?.name} ${singleUser?.lastname}` }
                    </Typography>
                    <Typography align='center' variant="body2" color="textSecondary" component="p">
                        { singleUser?.email}
                    </Typography>
                </CardContent>
                <CardActions className='buttons__container'>
                    <Button size="small" color="primary" onClick={() => handleActive(true,singleUser)} >
                        Online
                    </Button>
                    <Button size="small" color="primary" onClick={() => handleActive(false,singleUser)} >
                        Offline
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default SingleUser;