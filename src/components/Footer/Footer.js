import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
  },
  toolBar: {
    flexWrap: "wrap",
    justifyContent: "center",
  },
  footerLinks: {
    textAlign: "center",
    padding: `${theme.spacing(1)}px`,
    "& a": {
      fontSize: "0.75rem",
      display: "inline-block",
      color: "#8899a6",
      padding: `${theme.spacing(1)}px`,
      textDecoration: "none",
    },
    "& a:hover": {
      textDecoration: "underline",
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar className={classes.toolBar}>
        <Typography variant="body2" className={classes.footerLinks}>
          <Link to="/about">About</Link>
          <Link to="/about">Help</Link>
          <Link to="/about">Center</Link>
          <Link to="/about">Terms of Service</Link>
          <Link to="/about">Privacy Policy</Link>
          <Link to="/about">Cookie Policy</Link>
          <Link to="/about">Ads info</Link>
          <Link to="/about">Blog</Link>
          <Link to="/about">Status</Link>
          <Link to="/about">Careers</Link>
          <Link to="/about">Brand Resources</Link>
          <Link to="/about">Advertising</Link>
          <Link to="/about">Marketing</Link>
          <Link to="/about">Twitter for Business</Link>
          <Link to="/about">Developers Directory Settings</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
