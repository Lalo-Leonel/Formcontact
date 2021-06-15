import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2'



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '35ch',
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

        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: true
        })
        
        swalWithBootstrapButtons.fire({
          title: '¿Estas seguro?',
          text: "¡No podrás revertir esto!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Send!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            axios.post("http://localhost:5000/api/sendEmail", {datos})
            .then(res =>{
              console.log(res);
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            })
            
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Your imaginary file is safe :)',
              'error'
            )
          }
        })

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
              <Grid >
                <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth={true}>
                  Enviar
                </Button>
              </Grid>
              
          </form>
        </Container>
    )
}

export default Formulario;