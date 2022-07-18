import { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GlobalStore } from 'redux-micro-frontend';

export const Header = () => {
  const store = GlobalStore.Get();
  store.CreateStore('menu', (state: any, action: any) => {
    switch (action.type) {
      case 'COMPLETE':
        return state.map((todo: any) => {
          if (todo.id === action.id) {
            return { ...todo, complete: !todo.complete };
          } else {
            return todo;
          }
        });
      default:
        return state;
    }
  });
  const [price, setPrice] = useState(0);
  store.SubscribeToPartnerState('menu', 'webapp', store => {
    setPrice(store.price);
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Micro Frontend Demo
          </Typography>
          {price}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
