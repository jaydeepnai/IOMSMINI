import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { Button, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

export default function RecipeReviewCard({ data, DeleFun }) {
    const navigation = useHistory()
    return (
        <Card elevation={10} sx={{ maxWidth: 345 }}>
            <CardHeader avatar={
                <Avatar sx={{ bgcolor: "#696cff" }} aria-label="recipe">
                    {data.name[0]}
                </Avatar>
            }
                title={data.name.substring(0, 35)}
                subheader="September 14, 2016"
            />
            <CardMedia
                component="img"
                height="194"
                image="http://localhost:3000/assets/images/Subject.png"
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {data.description.substring(0, 35)}...
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button className="m-2" onClick={() => DeleFun(data.id)}
                    style={{ backgroundColor: "#ff0f6b" }}
                    size="small" variant="contained" startIcon={<DeleteIcon fontSize="40" />}>UnSubscribe</Button>
                <Button size="small" onClick={() => {
                    navigation.push("/Teacher/AddContent", data.id)
                }} style={{ backgroundColor: "#696cff " }} startIcon={<AddToPhotosIcon />} aria-label="share" variant="contained">
                    Add Content
                </Button>
            </CardActions>
        </Card>
    );
}
