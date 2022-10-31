import React, { useRef, useState } from 'react'
import { TextField } from '@material-ui/core';


const Field = ({ index, data, register, errors }) => {
  const [value, setValue] = useState('');
  const [isError, setError] = useState('');

  const handleChange = (e) => {
    setError('')
    if( (e.target.value.trim() === '') || (data.type === 'number' && !Number.isInteger(e.target.value)) ) {
      setError('error');
    }
    setValue(e.target.value);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '25px' }}>
      <p style={{ marginBottom: '10px', fontSize: '18px', fontWeight: '700', color: '#505050' }}>{data.title.toUpperCase()}</p>
      <TextField error={isError === 'error' ? true : false} id={index} helperText={isError === 'error' && "Incorrect entry."} label={data.type} 
        variant="standard" {...register("data.title", { onChange: handleChange, required: true })} />
    </div>
  )
}

export default Field
