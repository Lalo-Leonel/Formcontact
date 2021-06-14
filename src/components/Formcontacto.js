import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '40ch',
    },
  },
}));


export default function BasicTextFields() {
  
  const classes = useStyles();

  const [nombre, setNombre]=React.useState("");
  const [email, setEmail]=React.useState("");
  const [leyenda, setLeyenda]=React.useState("");
  const [errorEmail, setErrorEmail] = React.useState(false);

  const [asunto, setAsunto] = React.useState("");
  const [mensaje, setMensaje] = React.useState("");

  const handleClick = (e)=>{
    e.preventDefault();
    if(e.target.value === "nombre"){
      setNombre(e.target.value);
      console.log(e.target.value);
    }else{
      setEmail(e.target.value);
    }
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {
      nombre,
      email,
      asunto,
      mensaje
    }
    console.log("entro al submit");
    console.log(dataToSubmit);

    axios.post("api/sendEmal", dataToSubmit);
  }
  return (
          <Container  maxWidth="sm">
            <h1>Formulario de contacto</h1>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField 
                  id="nombre" label="Nombre" variant="outlined" 
                  
                  onChange={handleClick}
              />
              <TextField 
                  id="email" label="Email" variant="outlined" 
                  onChange={(e) =>{
                      setEmail(e.target.value);
                      console.log(e.target.value);
                      if(email.length>10){
                          setErrorEmail(true);
                          setLeyenda("El email contiene mas de 10 caracteres")
                      }else{
                          setErrorEmail(false);
                          setLeyenda("");
                      }
                  }}
                  error={errorEmail}
                  helperText={leyenda}
              />
              <TextField id="asunto" label="Asunto" variant="outlined" 
                onChange={(e)=>{
                  setAsunto(e.target.value);
                  console.log(e.target.value);
                  console.log(asunto);
                }}
              />

              <TextField
                  id="mensaje"
                  label="Mensaje"
                  multiline
                  rows={4}
                  defaultValue=""
                  variant="outlined"
                  onChange={(e)=>{
                    setMensaje(e.target.value);
                  }}
              />
              <Button variant="contained" color="primary" onSubmit={handleSubmit}>
                Enviar
              </Button>
          </form>
          
          
        </Container>
      
    
  );
}
