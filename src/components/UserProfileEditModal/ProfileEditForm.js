import {
  Button,
  CircularProgress,
  IconButton,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { storageRef } from "../../firebase/firebaseConfig";
import { useAuthDispatch, useAuthState } from "../../contexts/auth";

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

const ProfileEditForm = () => {
  const classes = useStyles();
  const {
    user: { data: authUserData },
  } = useAuthState();
  const authDispatch = useAuthDispatch();
  const [values, setValues] = useState({
    name: authUserData.name,
    bio: authUserData.bio,
    location: authUserData.location,
    website: authUserData.website,
    profile_pic: authUserData.profile_pic,
  });
  const [selectedFile, setSelectedFile] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const history = useHistory();

  const handleChange = (name) => (e) =>
    setValues({ ...values, [name]: e.target.value });

  useEffect(() => {
    if (!selectedFile) {
      setPreviewImg("");
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewImg(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleFileUpload = (e) => {
    // preview change
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile("");
      return;
    }
    // check for jpg, jpeg images only
    setSelectedFile(e.target.files[0]);
  };

  const [updateUser, { loading }] = useMutation(UPDATE_PROFILE_MUTATION, {
    update: (_, result) => {
      console.log(result.data.updateUser);
      authDispatch({ type: "UPDATE_USER", payload: result.data.updateUser });
      history.goBack();
    },
    onError: () => {},
    variables: values,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile instanceof File) {
      // upload to firebase and get url string
      const uploadTask = storageRef
        .child(`images/${selectedFile.name}`)
        .put(selectedFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          console.log("error in uploading", err);
          updateUser();
        },
        async () => {
          // uploaded successfully
          const downloadedURL = await uploadTask.snapshot.ref.getDownloadURL();
          updateUser({
            variables: { ...values, profile_pic: downloadedURL },
          });
        }
      );
    } else {
      updateUser();
    }
  };

  const { name, bio, location, website, profile_pic } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.updateImages}>
        <div className={classes.profilePicDiv}>
          <img src={previewImg ? previewImg : profile_pic} alt={name} />
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
          {loading ? <CircularProgress /> : "Save"}
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
