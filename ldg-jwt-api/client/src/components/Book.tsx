import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";

type BookProps = {
  title: string;
  author: string;
};

export function Book({ title, author }: BookProps): JSX.Element {
  return (
    <Grid item lg={3}>
      <Card elevation={3}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2">{author}</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button variant="outlined" size="small" startIcon={<FavoriteIcon />}>
            FAVOURITE
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
