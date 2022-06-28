import {
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  CardActions,
  Avatar,
} from "@mui/material";

type UserProps = {
  username: string;
  firstName: string;
  lastName: string;
  role: string;
};
function User({ username, role, firstName, lastName }: UserProps) {
  return (
    <Grid item>
      <Card sx={{ minWidth: "250px", maxWidth: "300px" }} elevation={3}>
        <CardHeader
          avatar={<Avatar>U</Avatar>}
          title={
            <Typography>
              {username} ({role})
            </Typography>
          }
        />
        <CardContent>
          <Typography>
            {firstName} {lastName}
          </Typography>
        </CardContent>
        <CardActions>
          <Button>View Profile</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default User;
