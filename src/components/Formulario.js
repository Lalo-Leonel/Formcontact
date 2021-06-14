import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '40ch',
    },
  },
}));

const Formulario = () =>{

    const classes = useStyles();

    const [datos, setDatos] = useState({
        nombre: '',
        email: '',
        asunto: '',
        mensaje:''
    }) 

    const handleInputChange = (event) =>{
        // console.log(event.target.value);
        setDatos({
            ...datos,
            [event.target.id]: event.target.value
        })
    }
    const handleSubmit = (event)=>{
        event.preventDefault();
        console.log('enviando datos...' + datos.nombre + ' ' + datos.email)
    }
    return(
        <Container  maxWidth="sm">
            <h1>Formulario de contacto</h1>
            <form className={classes.root}  onSubmit={handleSubmit} noValidate autoComplete="off" >
              <TextField 
                  id="nombre" label="Nombre" variant="outlined" 
                  onChange={handleInputChange}
                  
              />
              <TextField 
                  id="email" label="Email" variant="outlined" 
                  onChange={handleInputChange}
              />
              <TextField id="asunto" label="Asunto" variant="outlined" 
                onChange={handleInputChange}
              />

              <TextField
                  id="mensaje"
                  label="Mensaje"
                  multiline
                  rows={4}
                  defaultValue=""
                  variant="outlined"
                  onChange={handleInputChange}
              />
              <Button variant="contained" color="primary" onClick={handleSubmit} >
                Enviar
              </Button>
          </form>
          
          <h4>{datos.nombre}--{datos.email}--{datos.asunto}--{datos.mensaje}</h4>
        </Container>
    )
}

export default Formulario;