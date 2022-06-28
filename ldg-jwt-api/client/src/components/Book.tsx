import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

type BookProps = {
  title: string;
  author: string;
};

export function Book({ title, author }: BookProps): JSX.Element {
  return (
    <Grid item lg={3}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2">{author}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">SHARE</Button>
          <Button size="small">MORE INFO</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
