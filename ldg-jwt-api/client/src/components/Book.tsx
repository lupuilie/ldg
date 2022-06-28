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
  description: string;
};

export function Book({ title, description }: BookProps): JSX.Element {
  return (
    <Grid item lg={3}>
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">SHARE</Button>
          <Button size="small">MORE INFO</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
