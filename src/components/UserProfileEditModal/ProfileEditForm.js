import { Button, IconButton, makeStyles, TextField } from "@material-ui/core";
import { useState } from "react";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { useMutation, gql } from "@apollo/client";
import { FETCH_USER_QUERY } from "../../utils/graphql";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  updateImages: {
    width: "100%",
  },
  profilePicDiv: {
    width: 120,
    height: 120,
    position: "relative",
    overflow: "hidden",
    borderRadius: "50%",
    border: `5px solid ${theme.palette.background.default}`,
    "& img": {
      width: "100%",
      height: "100%",
    },
  },
  updateProfileBtn: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#00000047",
  },
  saveBtn: {
    color: "#fff",
    borderRadius: "1.5rem",
    textTransform: "initial",
  },
}));

const ProfileEditForm = (props) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: props.user.name,
    bio: props.user.bio,
    location: props.user.location,
    website: props.user.website,
    profile_pic: props.user.profile_pic,
    pic_changed: false,
  });
  const history = useHistory();

  const handleChange = (name) => (e) =>
    setValues({ ...values, [name]: e.target.value });

  const handleFileUpload = (e) => {
    setValues({ ...values, pic_changed: true });
    // preview change
  };

  const [updateUser, { loading }] = useMutation(UPDATE_PROFILE_MUTATION, {
    update: (proxy, result) => {
      const data = proxy.readQuery({
        query: FETCH_USER_QUERY,
        variables: {
          username: props.user.username,
        },
      });
      proxy.writeQuery({
        query: FETCH_USER_QUERY,
        data: {
          getUser: { ...data.getUser, ...result.data.updateUser },
        },
      });

      history.goBack();
    },
    onError: () => {},
    variables: values,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser();
  };

  const { name, bio, location, website, profile_pic } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.updateImages}>
        <div className={classes.profilePicDiv}>
          <img src={profile_pic} alt={name} />
          <div className={classes.updateProfileBtn}>
            <input
              accept="image/*"
              className={classes.input}
              id="icon-button-file"
              type="file"
              onChange={handleFileUpload}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="default"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </div>
        </div>
      </div>

      <div className={classes.inputFields}>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="normal"
          value={name}
          onChange={handleChange("name")}
        />
        <TextField
          id="bio"
          label="Bio"
          variant="outlined"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="normal"
          value={bio}
          onChange={handleChange("bio")}
        />
        <TextField
          id="location"
          label="Location"
          variant="outlined"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="normal"
          value={location}
          onChange={handleChange("location")}
        />
        <TextField
          id="website"
          label="Website"
          variant="outlined"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="normal"
          value={website}
          onChange={handleChange("website")}
        />
      </div>

      <div style={{ textAlign: "right" }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.saveBtn}
          disabled={loading}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default ProfileEditForm;

const UPDATE_PROFILE_MUTATION = gql`
  mutation updateUser(
    $name: String!
    $profile_pic: String!
    $bio: String
    $location: String
    $website: String
  ) {
    updateUser(
      userInput: {
        name: $name
        profile_pic: $profile_pic
        bio: $bio
        location: $location
        website: $website
      }
    ) {
      name
      bio
      profile_pic
      location
      website
    }
  }
`;
