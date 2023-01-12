import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ArticleIcon from '@mui/icons-material/Article';
import { Button, CardContent, Fab } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { EditNotifications } from "@mui/icons-material";


export default function FileDataCard({ data, DeleFun, showIt }) {

    return (
        <Card elevation={10} sx={{ maxWidth: 345 }}>
            <CardHeader avatar={
                <Avatar sx={{ bgcolor: "#696cff" }} aria-label="recipe">
                    {data?.fileName[0]}
                </Avatar>}
                title={data.fileName.substring(0, 35)}
                subheader="September 14, 2016" />
            {data.type === "Image" ?
                <CardMedia
                    component="img"
                    height="194"
                    width="194"
                    image={data.type === "Image" ? data.fileURL : ""}
                    alt="Paella dish" />
                :
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <img src="https://firebasestorage.googleapis.com/v0/b/event-5604f.appspot.com/o/images%2Fgoogle-docs-1772228-1507812.webp?alt=media&token=348139fe-ca50-4ffc-a4bb-0f9365eef8ee" height={195} />
                </div>
            }
            <CardContent>
                <div className="m-1">
                    <Fab size="small" className="mr-2 text-primary" aria-label="edit">
                        <UploadFileIcon />
                    </Fab>
                    Uploaded By {data.teacherName}
                </div>
                <div className="m-1">
                    <Fab size="small" className="mr-2 text-primary" aria-label="edit">
                        <ArticleIcon />
                    </Fab>Content type : {data.type}

                </div>
            </CardContent>

            <CardActions disableSpacing className="ml-3">
                <Button href={data.fileURL} target="_blank" className="mb-1" onClick={() => DeleFun(data.id)}
                    style={{ backgroundColor: "#696cff" }}
                    size="small" variant="contained" startIcon={<InfoIcon fontSize="40" />}>View Content</Button>
                {
                    showIt ?
                        <Button className="m-2" onClick={() => DeleFun(data.id)}
                            style={{ backgroundColor: "#ff0f6b" }}
                            size="small" variant="contained" startIcon={<DeleteIcon fontSize="40" />}>Delete Docs</Button>
                        : ""
                }
            </CardActions>
        </Card>
    );
}
