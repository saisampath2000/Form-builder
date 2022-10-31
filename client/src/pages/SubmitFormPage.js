import React, { useState, useEffect } from 'react'
import Field from '../components/Field'
import { useSearchParams } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SubmitFormPage = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [title, setTitle] = useState('');
  const [fields, setFields] = useState([]);
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  let navigate = useNavigate();

  const routeChange = (path) => {
    navigate(path);
  };

  const getData = async () => {
    const result=await axios.get("http://localhost:8080/form/"+id)
    setFields(result.data.data.fields);
    setTitle(result.data.data.name);
    console.log(result)
  }

  useEffect(() => {
      getData();
  }, []);

  return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '50px', padding: '50px', background: 'white'
                  ,boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: '12px', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
        <p><span style={{ fontSize: '18px', fontWeight: '600' }}>Form Name : </span>{title}</p>
        <form onSubmit={handleSubmit(async (data) => {
          console.log(data)
          const result= await axios.post("http://localhost:8080/submit/"+id,{
            data
          }) 
          console.log(result)
          if(result.status === 200) {
            routeChange("/");
          }
        })}>
          {fields.map((field, index) => <Field key={index} index={index} data={field} register={register} errors={errors}/>)}
          <input type="submit" style={{ 
            marginTop: '20px', background: '#2a52be', color: 'white', padding: '5px 15px', borderRadius: '8px', 
            outline: 'none', border: 'none', cursor: 'pointer',
            boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' 
          }} />
        </form>
        
      </div>
  )
}

export default SubmitFormPage