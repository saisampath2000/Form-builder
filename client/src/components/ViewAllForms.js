import React, { useEffect, useState } from 'react'
import SingleForm from './SingleForm';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';

const ViewAllForms = () => {

    const [forms, setForms] = useState([]);
    const [loader,setLoader] = useState(0);
    const getData = async () =>{
      const result= await axios.get("http://localhost:8080/form") 
      console.log(result.data)
      setForms(result.data);
      setLoader(1)
    }
    useEffect(() => {
      getData();
    }, []);

  return (
    <>
      {loader === 0 ? <div style={{ display: 'flex', justifyContent: 'center', top: '50%' }}><CircularProgress/> </div>: 
      <>
        <div style={{ display: 'flex', justifyContent: 'center', top: '50%' }}>
          { forms.length === 0 && <p style={{fontSize:"20px",fontWeight:"700"}}>No forms are available.</p> }
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', padding: '50px', background: `${forms.length > 0 && '#DCDCDC'}` }}>
          { forms.length > 0 && forms.map((form, index) => <SingleForm key={index} data={form.data} />) }
        </div>
      </> 
      }
    </>
  )
}

export default ViewAllForms