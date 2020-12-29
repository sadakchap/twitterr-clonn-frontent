import { makeStyles } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    flexGrow: 1,
  },
  searchInputDiv: {
    display: "flex",
    backgroundColor: `${theme.palette.background.paper}`,
    padding: `0 ${theme.spacing(2)}px`,
    borderRadius: `20px`,
    alignItems: "center",
    width: "100%",
    boxShadow: `0 0 2px rgba(237,237,237,.1)`,
  },
  searchInput: {
    height: "40px",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    width: "100%",
    color: "#fff",
    letterSpacing: "0.5px",
    fontWeight: 500,
  },
}));

const ExploreSection = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.searchInputDiv}>
        <SearchOutlinedIcon color="disabled" />
        <input
          className={classes.searchInput}
          type="text"
          placeholder="Search Twitter"
        />
      </div>
    </div>
  );
};

export default ExploreSection;
