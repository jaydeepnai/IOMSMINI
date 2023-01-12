import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import { Button, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';

export default function SubjectCard({ data, DeleFun }) {
    const navigation = useHistory()
    return (
        <Card elevation={10} sx={{ maxWidth: 345 }}>
            <CardHeader avatar={
                <Avatar sx={{ bgcolor: "#696cff" }} aria-label="recipe">
                    {data.name[0]}
                </Avatar>
            }
                title={data.name}
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
                    {data.description.substring(0, 40)}...
                </Typography>
            </CardContent>
            <CardActions disableSpacing className="mb-2">
                <Button size="small" onClick={() => {
                    navigation.push("/Student/Subject", data.id)
                }} style={{ backgroundColor: "#696cff " }} startIcon={<InfoIcon />} aria-label="share" variant="contained">
                    View Subject
                </Button>
            </CardActions>
        </Card>
    );
}
