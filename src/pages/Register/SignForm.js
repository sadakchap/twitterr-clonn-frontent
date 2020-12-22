import {
  Link,
  TextField,
  Typography,
  makeStyles,
  InputLabel,
  NativeSelect,
  FormControl,
  withStyles,
  InputBase,
} from "@material-ui/core";
import { range } from "../../utils/utils";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  dobPickerWrapper: {
    marginTop: `${theme.spacing(2)}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: `${theme.spacing(1)}px`,
  },
  dobMonth: {
    width: "50%",
  },
  dobDay: {
    width: "20%",
  },
  dobYear: {
    width: "30%",
  },
}));

const SignForm = (props) => {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();

  const {
    values: { name, email, month, day, year, numberOfDays },
    handleChange,
    handleMonthOrYearChange,
    errors,
  } = props;

  return (
    <>
      <Typography
        variant="h5"
        component="h5"
        gutterBottom
        style={{ marginLeft: "8px" }}
      >
        Create your account
      </Typography>

      <TextField
        id="name"
        label="Name"
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        margin="normal"
        variant="outlined"
        value={name}
        onChange={handleChange("name")}
        error={!!errors.name}
        helperText={errors.name}
      />
      <br />
      <TextField
        id="email"
        label="Email"
        type="email"
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        margin="normal"
        variant="outlined"
        value={email}
        onChange={handleChange("email")}
        error={!!errors.email}
        helperText={errors.email}
      />
      <Typography style={{ marginTop: "16px" }}>
        <Link href="#" onClick={preventDefault} variant="caption">
          Use phone instead
        </Link>
      </Typography>
      <div className="" style={{ marginTop: "24px" }}>
        <Typography variant="subtitle2" fontWeight={500}>
          Date of birth
        </Typography>
        <Typography variant="caption" color="textSecondary">
          This will not be shown publicly. Confirm your own age, even if this
          account is for a business, a pet, or something else.
        </Typography>
        <div className={classes.dobPickerWrapper}>
          <FormControl className={classes.dobMonth}>
            <InputLabel htmlFor="demo-customized-select-native">
              Month
            </InputLabel>
            <NativeSelect
              id="demo-customized-select-native"
              value={month}
              onChange={handleMonthOrYearChange("month")}
              input={<BootstrapInput />}
            >
              <option aria-label="None" value="" />
              <option value={1}>January</option>
              <option value={2}>Febuary</option>
              <option value={3}>March</option>
              <option value={4}>April</option>
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
              <option value={8}>August</option>
              <option value={9}>September</option>
              <option value={10}>October</option>
              <option value={11}>November</option>
              <option value={12}>December</option>
            </NativeSelect>
          </FormControl>
          <FormControl className={classes.dobDay}>
            <InputLabel htmlFor="demo-customized-select-native">
              Month
            </InputLabel>
            <NativeSelect
              id="demo-customized-select-native"
              value={day}
              onChange={handleChange("day")}
              input={<BootstrapInput />}
            >
              <option aria-label="None" value="" />
              {range(1, numberOfDays).map((day, idx) => (
                <option key={idx} value={day}>
                  {day}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <FormControl className={classes.dobYear}>
            <InputLabel htmlFor="demo-customized-select-native">
              Year
            </InputLabel>
            <NativeSelect
              id="demo-customized-select-native"
              value={year}
              onChange={handleMonthOrYearChange("year")}
              input={<BootstrapInput />}
            >
              <option aria-label="None" value="" />
              {range(1900, new Date().getFullYear()).map((yr, idx) => (
                <option key={idx} value={yr}>
                  {yr}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </div>
      </div>
    </>
  );
};

export default SignForm;
