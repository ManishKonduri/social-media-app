import React, { Component } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { allUserImages, likesUpload } from './../API/mongo';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

function Home(props) {
    const [photos, setPhotos] = React.useState([]);
    let userId = props.location.state.userId;
    let name = props.location.state.name;

    const [newImg, setNewImg] = React.useState('');
    const [likes, setLikes] = React.useState([]);
    const [likeCount, setLikeCount] = React.useState(0);
    const [searchText, setSearchText] = React.useState("");


    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: 345,
            '& > *': {
                margin: theme.spacing(1),
               
              },
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
    }));



    const uploadHandler = (event) => {
        const data = new FormData();

        data.append('userId', userId)
        data.append('name', name)
        data.append('file', event.target.files[0]);
        axios.post("http://localhost:4000/home", data).then(res => setNewImg(res.data))

    }

    const likePost = async (userid, username, id) => {
        // console.log(photos[0].likes)
        let index = likes.findIndex(x => x.id === id);
        let likeArray = likes[index].likes;

        let uName = likeArray.indexOf(username)
        console.log(uName)
        if (uName >= 0) {
            console.log("Entered");
            likeArray.splice(uName, 1);
            likes[index].likes.splice(uName, 1);
            setLikeCount(likes[index].likes.length);
            console.log(userid, username, id)
            const likeObj = {
                id: id,
                likes: likeArray
            }

            const likesList = await likesUpload(likeObj).then(resp => console.log(resp));
            
        }
        else {
            // likeArray.push(username)
            likes[index].likes.push(username)
            setLikeCount(likes[index].likes.length);
            console.log(userid, username, id)
            const likeObj = {
                id: id,
                likes: likes[index].likes
            }

            const likesList = await likesUpload(likeObj).then(resp => console.log(resp));
           
        }


    }
    const classes = useStyles();
    const base64Flag = 'data:image/jpeg;base64,';

    const showLikes = () => {
        console.log("clicked")
    }

    const HomeRender = (data) => {
        const classes = useStyles();

        if (data.length > 0) {
          
            var base64Flag = 'data:image/jpeg;base64,';

            const dataImages = data.map(image => {
                var date = new Date(image.createdAt)
                return (
                    <div>
                        <Card className={classes.root}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        {image.userName[0]}
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={image.userName}
                                subheader={date.toDateString()}
                            />
                            <CardMedia
                                className={classes.media}
                                image={base64Flag + arrayBufferToBase64(image.image.data.data)}
                                title="Paella dish"
                            />
                            <CardContent>

                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites" onClick={() => likePost(userId, name, image._id)}>
                                    <FavoriteIcon />
                                </IconButton>
                                <div onClick={() => showLikes()}>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {
                                           image.likes.length + " "
                                        }
                                    likes
                                    </Typography>
                                </div>
                            </CardActions>


                        </Card><br />
                    </div>
                );
            });

            return dataImages;
        }
    }

    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };
   
    React.useEffect(() => {
        async function getAllImagesOnLoad() {
            let data = await allUserImages()
            data = JSON.stringify(data)
            data = JSON.parse(data)
            console.log(data.data.Images);
            setPhotos(data.data.Images);
            let imagesData = data.data.Images;
            let list = [];
            for (let i = 0; i < imagesData.length; i++) {
                let dataI = {
                    likes: data.data.Images[i].likes,
                    id: data.data.Images[i]._id
                }
                list.push(dataI)
            }
            setLikes(list)
           
        }

        getAllImagesOnLoad()
    }, [])

    const searchBar = (e) => {
        console.log("changed")
        setSearchText(e.target.value);
    }

    const searchAction = (e) => {
        
        console.log(searchText);
            var dupPhotos = []
            console.log(photos)
            for(var i=0; i< photos.length; i++) {
                if(photos[i].userName == searchText) {
                    dupPhotos.push(photos[i])
                }
            }
            setPhotos(dupPhotos)
        
    }

    return (
        <div>
            <div>
                <input type="file" name="file" onChange={e => uploadHandler(e)} />
            </div>
            <div style={{marginLeft: '917px', marginBottom: '20px'}}>

                <TextField label="Search" variant="filled" value={searchText} onChange={searchBar}/>
                <SearchIcon style={{marginTop: '25px'}} onClick={() => searchAction()} />
           
            
            </div>

            <div style={{ alignContent: "center", marginLeft: "850px" }}>

                {newImg == '' ? <div /> : <div>
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    R
                                    </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={name}
                            subheader="September 14, 2016"
                        />
                        <CardMedia
                            className={classes.media}
                            image={base64Flag + arrayBufferToBase64(newImg.image.image.data.data)}
                            title="Paella dish"
                        />
                        <CardContent>

                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites" onClick={() => likePost()}>
                                <FavoriteIcon />
                            </IconButton>
                        </CardActions>

                    </Card><br />
                </div>}
                {HomeRender(photos)}
            </div>
        </div>
    )

}

export default Home;