import { createTheme , responsiveFontSizes } from "@mui/material/styles";

const lightTheme = responsiveFontSizes(createTheme({    
  spacing: 4,    
  shape: {
    borderRadius: 4,
  },
  components:{
    MuiAppBar: {
      styleOverrides: {
        root: {
          
          [`& a:hover`]: {
            color: '#c5cae9'
          }
        }
      },
    },    
  } 
}));

export default lightTheme;