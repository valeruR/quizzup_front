import React from 'react';
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

const QuizzPage = () => {
  let { id } = useParams();
  const history = useHistory();

  const goBack = () => {
    history.push('/');
  }

  return (
    <div>
      <Button onClick={goBack}>Back</Button>
      This is the Quizz Page for {id}
    </div>
  )
}

export default QuizzPage;
