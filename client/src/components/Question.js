import React, { useEffect, useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import Button from '../atoms/Button';

const Question = ({ question, setQuestions, index, handleDelete, dataArr }) => {
  const [title, setTitle] = useState(dataArr[index].title);
  const [type, setType] = useState(dataArr[index].type);

  useEffect(() => {
    setTitle(dataArr[index].title);
    setType(dataArr[index].type);
  }, [dataArr])

  const handleTitle = (e) => {
    setTitle(e.target.value);
    const array = dataArr;
    array[index].title = e.target.value;
    setQuestions(array);
  };

  const handleType = (e) => {
    setType(e.target.value);
    const array = dataArr;
    array[index].type = e.target.value;
    setQuestions(array);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px', minWidth: '500px', gap: '20px' }}>
        <input onChange={(e) => handleTitle(e)} type={'text'} placeholder={'Add Title'} style={{ outline: 'none', border: 'none', 
                                padding: '5px', minWidth: '300px', borderRadius: '8px' }} value={title}/>
        
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Type"
                    onChange={(e) => handleType(e)}
                >
                    <MenuItem value={'string'}>String</MenuItem>
                    <MenuItem value={'number'}>Number</MenuItem>
                </Select>
            </FormControl>
        <Button index={index} text={'Delete'} bgColor='#722f37' onClick={handleDelete} />
    </div>
  )
}

export default Question