import { Link, makeStyles, Typography } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import LinkOutlinedIcon from "@material-ui/icons/LinkOutlined";
import EventNoteOutlinedIcon from "@material-ui/icons/EventNoteOutlined";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    alignItems: "center",
  },
  extraInfoDiv: {
    display: "flex",
    alignItems: "center",
    margin: `4px ${theme.spacing(1)}px`,
    marginLeft: 0,

    "& svg": {
      marginRight: "4px",
    },
  },
}));

const UserExtraInfo = (props) => {
  const classes = useStyles();
  const { location, website, dob, createdAt } = props;
  return (
    <div className={classes.root}>
      {location && (
        <div className={classes.extraInfoDiv}>
          <LocationOnOutlinedIcon fontSize="small" color="disabled" />
          <Typography variant="caption" color="textSecondary">
            {location}
          </Typography>
        </div>
      )}
      {website && (
        <div className={classes.extraInfoDiv}>
          <LinkOutlinedIcon fontSize="small" color="disabled" />
          <Link href={website} variant="caption" target="_blank">
            {website}
          </Link>
        </div>
      )}
      {dob && (
        <div className={classes.extraInfoDiv}>
          <LocationOnOutlinedIcon fontSize="small" color="disabled" />
          <Typography variant="caption" color="textSecondary">
            Born {moment(new Date(dob)).format("MMMM YYYY")}
          </Typography>
        </div>
      )}
      {createdAt && (
        <div className={classes.extraInfoDiv}>
          <EventNoteOutlinedIcon fontSize="small" color="disabled" />
          <Typography variant="caption" color="textSecondary">
            Joined {moment(new Date(parseInt(createdAt))).format("MMMM YYYY")}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default UserExtraInfo;
