import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useAuthDataContext } from "../../hooks/auth-provider";

const CreatetQuizz = () => {
  const history = useHistory();
  const { authData }  = useAuthDataContext();
  const [quizz, setQuizz] = useState(null);
  const { register, handleSubmit, errors } = useForm();
  const [inputList, setInputList] = useState([{ question: "", answer: "" }]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
   
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
   
  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { question: "", answer: "" }]);
  };

  const onSubmit = (data) => {
    setQuizz(data);
    console.log(data);
  }

  const createQuizz = () => {
    console.log('questions', inputList);
    console.log('token', authData.token);
    let graphqlQuery = {
      query: `
      mutation CreateANewQuizz($title: String!, $description: String!, $questions: [QuestionInputData!]){
        createQuizz(quizzInput: {title: $title, description: $description}, questions: $questions) {
          _id
          title
        }
      }
    `,
    variables: {
      title: quizz.title,
      description: quizz.description,
      questions: inputList
    }
    };

    return fetch('http://localhost:8080/graphql', {
          method: 'POST',
          body: JSON.stringify(graphqlQuery),
          headers: {
            Authorization: 'Bearer ' + authData.token,
            'Content-Type': 'application/json'
          }
      })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        if (resData.errors && resData.errors[0].status === 422) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet!"
          );
        }
        if (resData.errors) {
          throw new Error('The creation of the quizz failed!');
        }
        history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      <h1>Create Quizz</h1>
      { !quizz && 
          <form className="quizzForm" onSubmit={handleSubmit(onSubmit)}>
          <label>Title</label>
            <input name="title" ref={register({ required: true})} />
            {errors.title?.type === "required" &&
            "Title is required"}
            <label>Description</label>
            <input name="description" ref={register({ required: true})} />
            {errors.description?.type === "required" &&
            "A description is required"}
            <input type="submit" />
            </form>
        }
        {quizz && inputList.map((x, i) => {
        return (
          <div className="box" key={i}>
          <input
            name="question"
 placeholder="Enter Question"
            value={x.question}
            onChange={e => handleInputChange(e, i)}
          />
          <input
            className="ml10"
            name="answer"
 placeholder="Enter the Answer"
            value={x.answer}
            onChange={e => handleInputChange(e, i)}
          />
          <div className="btn-box">
            {inputList.length !== 1 && <button
              className="mr10"
              onClick={() => handleRemoveClick(i)}>Remove</button>}
            {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
          </div>
        </div>
        );
      })}
      {inputList.length >= 2 && <button onClick={createQuizz}>Create</button> }
    </div>
  )
}

export default CreatetQuizz;
