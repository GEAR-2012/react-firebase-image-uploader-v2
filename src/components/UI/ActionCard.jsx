import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ActionCard = ({ title, url, id }) => {
  const navigate = useNavigate();

  return (
    <Card elevation={3} sx={{ width: 320 }}>
      <CardActionArea onClick={() => navigate(`product/${id}`)}>
        <CardMedia component="img" height="200" image={url} alt={title} />
        <CardContent sx={{ padding: "0.25rem 1rem" }}>
          <Typography noWrap={true} variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ActionCard;
