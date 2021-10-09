import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Link } from "react-router-dom";
import { FormControl } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import TextField from "@mui/material/TextField";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
const Form = () => {
  const [form, setForm] = useState({});
   const [answer, setAnswer] = useState();
   const [success, setSuccess] = useState(false);
   const { pathname } = useLocation();
  const style={
    display:"flex",
    flexDirection: "column",
    width:"50%",
    height:"100vh",
    margin:"10rem auto"
  }
  const slug = pathname.split("/")[2];
  useEffect(() => {
    axios
      .get(`https://webcluesappp.herokuapp.com/api/forms/${slug}`)
      .then((response) => setForm(response.data.form));
  }, []);
  console.log(form)

  const handleChange = (e)=>{
    setAnswer(e.target.value)
  }

  const handleSubmit = async()=>{
    try{
      await axios.post(
        `https://webcluesappp.herokuapp.com/api/forms/create/${slug}`,
        {
          answer,
        }
      );
      setSuccess(true)
      toast.success("Recieved Response")

    }catch(err){

    }
  }

  return (
    <div style={style}>
      <ToastContainer />
      <span>
        <Link component={Button} to="/" variant="outlined">
          Home
        </Link>
      </span>
      <div style={{ marginTop: "1em" }}>
        <em>Your Question</em>: {form.question}
      </div>
      {form && form.answerType === "10" ? (
        <TextField
          style={{ margin: "1em 0" }}
          onChange={handleChange}
          label="Your Answer"
          type="text"
        />
      ) : (
        <FormControl fullWidth style={{ margin: "2em 0" }}>
          <InputLabel id="answers" style={{ marginTop: "1em" }}>
            Choose one from Below
          </InputLabel>
          <Select labelId="answers" value={answer} onChange={handleChange}>
            {/* <MenuItem value="">
              <em>Choose one</em>
            </MenuItem> */}
            <MenuItem value={1}>{form.options && form.options.first}</MenuItem>
            <MenuItem value={2}>{form.options && form.options.second}</MenuItem>
          </Select>
        </FormControl>
      )}
      <Button onClick={handleSubmit} variant="contained">
        Ok
      </Button>
    </div>
  );
};

export default Form;
