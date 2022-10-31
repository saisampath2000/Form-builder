import React from 'react'
import Button from '../atoms/Button'
import FormImage from '../assets/nature.jpg'
import { useNavigate } from "react-router-dom";

const SingleForm = ({ data }) => {
  let navigate = useNavigate();

  const routeChange = (path) => {
    navigate(path);
  };

  return (
    <div style={{ marginRight: '50px', minWidth: '300px', overflow: 'hidden', marginBottom: '60px', 
                  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: '12px', backgroundColor: 'white' }}>
        <img height={300} src={FormImage} style={{ width: '100%' }} alt='form' /> 
        <div style={{ padding: '16px 24px' }}>
            <p style={{ color: 'grey', fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Name: {data.name}</p>
            <p style={{ color: 'grey', fontSize: '12px', fontWeight: '400', marginBottom: '4px' }}>created At: {data.createdAt}</p>
            <p style={{ color: 'grey', fontSize: '12px', fontWeight: '400', marginBottom: '4px' }}>updated At: {data.updatedAt}</p>
            <p style={{ color: 'grey', fontSize: '12px', fontWeight: '400', marginBottom: '4px' }}>created By: {data.createdBy}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '30px' }}>
            <Button onClick={() => routeChange({pathname: '/create', search: `?type=edit&&id=${data.id}`})} bgColor={'#D3D3D3'} text={'Edit Form'} />
            <Button onClick={() => routeChange({pathname: '/submit', search: `?type=submit&&id=${data.id}`})} bgColor={'#87CEEB'} text={'Submit Form'} />
        </div>
    </div>
  )
}

export default SingleForm