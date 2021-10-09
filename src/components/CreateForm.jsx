import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import {Link} from 'react-router-dom'
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { FormControl } from "@mui/material";
import moment from "moment";
import axios from "axios";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles({
  style: {
    marginTop: "2em",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginLeft: "2em",
  },
  formDiv: {
    width: "50%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "teal",
    margin: "20px auto",
    padding: "10px",
    color: "white",
  },
  errorDiv: {
    width: "50%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "grey",
    margin: "20px auto",
    padding: "10px",
    color: "white",
  },
});

function CreateForm() {
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [valueOptions, setValueOptions] = useState({});
  const [question, setQuestion] = useState("");
  const [forms, setForms] = useState([]);

  useEffect(() => {
    async function getLists() {
      try {
        const res = await axios.get(
          "https://webcluesappp.herokuapp.com/api/forms"
        );
        setForms([...forms, ...res.data.forms]);
      } catch (err) {
        console.log(err);
      }
    }
    getLists();
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleValuesChange = (e) => {
    setValueOptions({ ...valueOptions, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setClose(!close);
    setOpen(!open);
    setTitle("");
  };

  // const generateLink = async (form) => {
  //   console.log(form);
  // };

  const handleSuccess = async () => {
    const createdAt = moment().format("MMMM Do YYYY h:mm a");
    const formDetails = {
      formName: title,
      question,
      answerType: value,
      createdAt,
      options: valueOptions,
    };
    const res = await axios.post(
      "https://webcluesappp.herokuapp.com/api/forms",
      {
        formDetails,
      }
    );
    setForms([...forms, res.data.form]);
    toast.success("Form Created")
    console.log(res);
    setClose(!close);
    setOpen(!open);
    setValue("");
    setQuestion("");
    setTitle("");

  };

  const classes = useStyles();
  return (
    <>
      <ToastContainer />
      <div className={classes.style}>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          label="Please Enter Form Name"
        />
        <div className={classes.button}>
          <Button
            disabled={title ? false : true}
            variant="contained"
            onClick={(_) => setOpen(!open)}
            startIcon={<AddCircleOutlineIcon />}
          >
            Create
          </Button>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              onChange={(e) => setQuestion(e.target.value)}
              label="Enter the Question ?"
              type="text"
              fullWidth
              variant="standard"
            />
            <FormControl fullWidth style={{ marginTop: "1em" }}>
              <InputLabel id="answers" style={{ marginTop: "1em" }}>
                Answer Type
              </InputLabel>
              <Select labelId="answers" value={value} onChange={handleChange}>
                <MenuItem value="">
                  <em>Choose one</em>
                </MenuItem>
                <MenuItem value={10}>Text</MenuItem>
                <MenuItem value={20}>Multichoice Checkbox</MenuItem>
              </Select>
              {value === 20 && (
                <>
                  <TextField
                    style={{ marginTop: "1em" }}
                    name="first"
                    variant="standard"
                    label="Enter First Choice"
                    onChange={handleValuesChange}
                  />
                  <TextField
                    name="second"
                    style={{ marginTop: "1em" }}
                    variant="standard"
                    label="Enter Second Choice"
                    onChange={handleValuesChange}
                  />
                </>
              )}
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button disabled={!value || !question} onClick={handleSuccess}>
              Go Ahead
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {forms.length === 0 && (
        <div className={classes.errorDiv}>
          <h1>No Forms created so far..!</h1>
        </div>
      )}
      {forms &&
        forms.map((form, i) => {
          return (
            <div className={classes.formDiv} key={i}>
              <div>
                <h1>{form.name}</h1>
                <p>{moment(form.createdAt).format("MMMM Do YYYY h:mm a")}</p>
                <h6>Response Count: {form.responseCount}</h6>
              </div>
              <div>
                <Link
                  to={`/form/${form.link}`}
                  variant="contained"
                  component={Button}
                >
                  Go to Link
                </Link>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default CreateForm;
