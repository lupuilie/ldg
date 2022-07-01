import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ReplayIcon from "@mui/icons-material/Replay";
import { Grid, Box, Button, Typography } from "@mui/material";
import { Player } from "../Game";

type AppHeaderProps = {
  reset: Function;
  currentPlayer: Player;
};
function AppHeader({ reset, currentPlayer }: AppHeaderProps) {
  return (
    <Grid
      container
      justifyContent={"space-between"}
      alignItems="center"
      sx={{ padding: "1.5rem 0" }}
    >
      <Grid item>
        <CloseOutlinedIcon color="primary" sx={{ fontSize: "3rem" }} />
        <CircleOutlinedIcon color="secondary" sx={{ fontSize: "3rem" }} />
      </Grid>
      <Grid item>
        <Box>
          <Typography color="gray" fontWeight={"bold"} variant="h5">
            {currentPlayer} TURN
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Button variant="contained" color="inherit" onClick={() => reset()}>
          <ReplayIcon />
        </Button>
      </Grid>
    </Grid>
  );
}

export default AppHeader;
