import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core'

import { Container } from './styles';

const TabsComponent = (props) => {

  const [value, setValue] = useState(0)

  const tabs = props.tabs
  const onTabChange = props.onTabChange

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if(onTabChange) {
      onTabChange(newValue)
    }
    
  };

  return (
    <Container>
      <Tabs
        value={value}
        onChange={handleChange}
      >
        {
          tabs.map(tab => (
            <Tab key={tab} label={tab} />
          ))
        }
        
      </Tabs>
    </Container>
  );
}

export default TabsComponent;