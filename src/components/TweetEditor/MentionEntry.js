import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 280,
    width: "100%",
    margin: 0,
  },
  listItem: {
    margin: 0,
    boxShadow: `0 1px 2px ${theme.palette.text.secondary}`,
  },
}));

const MentionEntry = (props) => {
  const {
    mention,
    theme,
    searchValue, // eslint-disable-line no-unused-vars
    isFocused, // eslint-disable-line no-unused-vars
    ...parentProps
  } = props;

  const classes = useStyles();

  return (
    <div {...parentProps} className={classes.root}>
      <ListItem button className={classes.listItem}>
        <ListItemAvatar>
          <Avatar alt={mention.name} src={mention.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={`${mention.name}`}
          secondary={mention.bio && `${mention.bio}`}
        />
      </ListItem>
    </div>
  );
};

export default MentionEntry;
