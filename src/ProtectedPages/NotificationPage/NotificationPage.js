import Base from "../../components/Base/Base";
import { IconButton, makeStyles, Typography } from "@material-ui/core";
import ExploreSection from "../../components/ExploreSection/ExploreSection";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
  },
  content: {
    border: `1px solid ${theme.palette.grey[800]}`,
    maxWidth: 700,
    width: "100%",
  },
  header: {
    padding: `${theme.spacing(1)}px`,
    display: "flex",
    alignItems: "center",
    backgroundColor: `${theme.palette.background.default}`,
    borderBottom: `1px solid ${theme.palette.grey[700]}`,
    "& h6": {
      marginLeft: "8px",
    },
  },
  headerAvatar: {
    cursor: "pointer",
  },
  headerTitle: {
    margin: `0 ${theme.spacing(1)}px`,
  },
  exploreSection: {
    width: "60%",
    display: "block",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  toolBar: theme.mixins.toolbar,
  mainContent: {
    minHeight: "calc(100vh - 68px)",
  },
}));

const NotificationPage = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Base>
      {(_) => (
        <div className={classes.root}>
          <div className={classes.content}>
            <div className={classes.header}>
              <IconButton color="primary" onClick={history.goBack}>
                <ArrowBackOutlinedIcon />
              </IconButton>
              <Typography variant="h6" component="h6">
                Notifications
              </Typography>
            </div>

            <div className={classes.mainContent}>
              Your notifications here...
            </div>
          </div>
          <div className={classes.exploreSection}>
            <ExploreSection />
          </div>
        </div>
      )}
    </Base>
  );
};

export default NotificationPage;
