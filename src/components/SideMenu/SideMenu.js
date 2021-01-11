import {
  Avatar,
  Badge,
  Button,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Tooltip,
  Typography,
  useTheme,
} from "@material-ui/core";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import TwitterIcon from "@material-ui/icons/Twitter";
import NotificationsNoneSharpIcon from "@material-ui/icons/NotificationsNoneSharp";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import PersonIcon from "@material-ui/icons/Person";

import { useAuthState, useAuthDispatch } from "../../contexts/auth";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  navList: {
    position: "relative",
    height: "100vh",
    margin: `0 ${theme.spacing(3)}px`,
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    color: "#fff",
    textDecoration: "none",
    transition: "0.3s ease",
    "& h6": {
      marginLeft: `${theme.spacing(2)}px`,
    },
    "&:hover": {
      color: `${theme.palette.primary.main}`,
    },
    "&.active": {
      color: `${theme.palette.primary.main}`,
    },
  },
  tweetBtn: {
    color: "#fff",
    width: "100%",
    textTransform: "capitialize",
    borderRadius: "1.2rem",
    height: "40px",
  },
  atBottom: {
    position: "absolute",
    bottom: 0,
  },
}));

const SideMenu = (props) => {
  const { window, mobileOpen, handleDrawerToggle } = props;
  const classes = useStyles();
  const theme = useTheme();
  let location = useLocation();
  let history = useHistory();

  const {
    user: { data: authUserData },
    authenticated,
  } = useAuthState();
  const authDispatch = useAuthDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    authDispatch({ type: "LOGOUT" });
    history.go(0);
  };

  const drawer = (
    <div>
      <List className={classes.navList}>
        <ListItem>
          <TwitterIcon fontSize="large" />
        </ListItem>
        <ListItem>
          <NavLink to="/home" className={classes.navLink}>
            <HomeIcon fontSize="large" />
            <Typography variant="h6">Home</Typography>
          </NavLink>
        </ListItem>
        {authenticated ? (
          <>
            <ListItem>
              <NavLink to="/notifications" className={classes.navLink}>
                <Badge
                  color="secondary"
                  invisible={!authUserData.unreadNotifications}
                  badgeContent={authUserData.unreadNotifications}
                >
                  <NotificationsNoneSharpIcon fontSize="large" />
                </Badge>
                <Typography variant="h6">Notification</Typography>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="/messages" className={classes.navLink}>
                <MailOutlineOutlinedIcon fontSize="large" />
                <Typography variant="h6">Messages</Typography>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink
                to={`/${authUserData.username}`}
                className={classes.navLink}
              >
                <PersonIcon fontSize="large" />
                <Typography variant="h6">Profile</Typography>
              </NavLink>
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={{
                  pathname: `/compose/tweet`,
                  state: { background: location },
                }}
                className={classes.tweetBtn}
              >
                Tweet
              </Button>
            </ListItem>
            <ListItem className={classes.atBottom}>
              <ListItemAvatar>
                <Avatar src={authUserData.profile_pic} />
              </ListItemAvatar>
              <ListItemText
                primary={authUserData.name}
                secondary={`@${authUserData.username}`}
              />
              <Tooltip title="Log Out" aria-label="Log Out">
                <IconButton
                  edge="end"
                  aria-label="logout"
                  onClick={handleLogout}
                >
                  <ExitToAppIcon color="inherit" />
                </IconButton>
              </Tooltip>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem>
              <NavLink to="/login" className={classes.navLink}>
                <HomeIcon fontSize="large" />
                <Typography variant="h6">Login</Typography>
              </NavLink>
            </ListItem>
          </>
        )}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default SideMenu;
