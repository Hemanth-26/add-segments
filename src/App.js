import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import { Button } from './components/index';
import SidePopup from './SidePopup';
import "./App.css";

function App() {
  const [drawer, setDrawer] = useState(true);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawer(open);
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-md-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 ">
            <div className='d-flex justify-content-center align-items-center'>
              <Button onClick={toggleDrawer(true)} variant="outlined" size="large">Save Segment</Button>
              <Drawer
                anchor="right"
                open={drawer}
                onClose={toggleDrawer(false)}
              >
                <SidePopup toggleDrawer={toggleDrawer} />
              </Drawer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
