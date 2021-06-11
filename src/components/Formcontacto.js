import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


export default function BasicTextFields() {
  const classes = useStyles();

  const [email, setEmail]=React.useState("");
  const [leyenda, setLeyenda]=React.useState("");
  const [errorEmail, setErrorEmail] = React.useState(false);

  return (
      <Container maxWidth="sm" >
          <form className={classes.root} noValidate autoComplete="off">
            <TextField 
                id="outlined-basic" label="Nombre" variant="outlined" 
                
            />
            <TextField 
                id="outlined-basic" label="Email" variant="outlined" 
                onChange={(e) =>{
                    setEmail(e.target.value);
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
            <TextField id="outlined-basic" label="Asunto" variant="outlined" />

            <TextField
                id="outlined-multiline-static"
                label="Mensaje"
                multiline
                rows={4}
                defaultValue="Default Value"
                variant="outlined"
            />
            
        </form>
        <Button variant="contained" color="primary">
            Primary
        </Button>
      </Container>
    
  );
}
