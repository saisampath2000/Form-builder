import React, { useEffect, useState } from 'react'
import Question from './Question';
import Button from '../atoms/Button';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const CreateForm = () => {
  const [questions, setQuestions] = useState([]);
  const [questionTitle, setQuestionTitle] = useState('');
  const [createdBy,setCreatedBy] = useState('');
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  let navigate = useNavigate();

  const routeChange = (path) => {
    navigate(path);
  };

  const getData = async() =>{
      if( type === 'edit' ) {
        const result = await axios.get("http://localhost:8080/form/"+id)
        setQuestionTitle(result.data.data.name)
        console.log(result.data)
        setCreatedBy(result.data.data.createdBy)
        setQuestions(result.data.data.fields)
      }
  }

  useEffect( () => {
    getData();
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    setQuestions(questions =>{
      const result = questions.filter((element, index) => index != e.target.id);
      console.log(result)
      return result
    } )
  };

  const addQuestion = () => {
    setQuestions([...questions, {title: '', type: ''}]);
  };

  const saveData = async () => {
    console.log(questions);
    if(questions.length>0){
            if(type==="edit"){
              const result= await axios.put("http://localhost:8080/form/"+id,{
                name : questionTitle,
                fields : questions,
                updatedAt : new Date()
              }) 
              console.log(result)
              if (result.status==200){
                routeChange("/")
              }
        } else{
              const result= await axios.post("http://localhost:8080/form",{
                name : questionTitle,
                createdBy : createdBy,
                fields : questions,
                createdAt : new Date()
              }) 
              console.log(result)
              if (result.status==200){
                routeChange("/")
              }
        }

    }



  };

  const deleteData = async() => {
    const result= await axios.delete("http://localhost:8080/form/"+id)
    if (result.status==200){
      routeChange("/")
    }
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', minWidth: '750px' }}>
            <p style={{  marginTop: "25px", fontSize: "18px", fontWeight:"600" }}>Name : </p>
          <div style={{ padding: '25px', border: '1px solid grey', backgroundColor: 'white', borderRadius: '8px', marginBottom: '40px' }}>
              <input onChange={(e) => setQuestionTitle(e.target.value)} type={'text'} placeholder='Add Form Name' style={{ outline: 'none', border: 'none', minWidth: '500px' }} value={questionTitle} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-around', minWidth: '700px' }}>
          <p style={{ marginTop: "25px", fontSize: "18px", fontWeight:"600"}}>Created By : </p>
          <div style={{ padding: '25px', border: '1px solid grey', backgroundColor: 'white', borderRadius: '8px', marginBottom: '40px' }}>
            {type === 'edit' ? <p style={{ minWidth: '500px' }}>{createdBy}</p> :
            <input onChange={(e) => setCreatedBy(e.target.value)} type={'text'} placeholder='Created By' style={{ outline: 'none', border: 'none', minWidth: '500px' }} value={createdBy}/>}
        </div>
        </div>

        {
          questions.map((question, index) => <Question key={index} question={question}
            setQuestions={setQuestions} index={index} dataArr={questions} handleDelete={handleDelete} />)
        }
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '25px' }}>
          <Button onClick={() => addQuestion()} bgColor='#2a52be' text='Add Field' />
         {questions.length>0 ? <Button onClick={() => saveData()} bgColor='#2a52be' text='Save' state="enabled"/> : <Button onClick={() => saveData()} bgColor='#2a52be' text='Save' state="disabled" />} 
          { type === 'edit' && <Button onClick={() => deleteData()} bgColor='#722f37' text='Delete Form' />}
        </div>
    </div>
  )
}

export default CreateForm