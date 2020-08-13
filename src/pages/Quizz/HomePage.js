import React, { useState, useEffect, Fragment, useCallback } from 'react';
import {
  Link,
} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useAuthDataContext } from "../../hooks/auth-provider";
import { Pagination } from '@material-ui/lab';
import ErrorHandler from "../../components/ErrorHandler";
import Loader from "react-loader";
import QuizzTile from "../../components/QuizzTile";

const HomePage = () => {
  const history = useHistory();
  const { authData } = useAuthDataContext();
  const [quizzs, setQuizzs] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [totalQuizzs, setTotalQuizzs] = useState(0);
  const [error, setError] = useState(null);

  const loadQuizzs = useCallback(async () => {
    const graphqlQuery = {
      query: `
        query getQuizzs($page: Int!) {
          quizzs(page: $page) {
            quizzs {
              _id
              title
              description
              creator {
                name
              }
              createdAt
            }
            totalQuizzs
          }
        }
      `,
      variables: {
        page: page
      }
    };
    await fetch('http://localhost:8080/graphql', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + authData.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(graphqlQuery)
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        if (resData.errors) {
          throw new Error('Fetching quizzs failed!');
        }
        setQuizzs(resData.data.quizzs.quizzs);
        setTotalQuizzs(resData.data.quizzs.totalQuizzs);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setError(err);
      });
  }, [page, authData.token]);

  useEffect(() => {
    loadQuizzs();
  }, [loadQuizzs]);

  

  const handleChange = value => {
    setPage(value);
    loadQuizzs();
  }

  const handleClick = id => {
    history.push('/quizz/' + id);
  }

  return (
    <Fragment>
      <h1>Home</h1>
      <ErrorHandler error={error} />
      <section>
        <Link to='/create-quizz'>New Quizz</Link>
      </section>
        <section className="feed">
        {isLoading && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Loader />
            </div>
          )}
          {quizzs.length <= 0 && !isLoading ? (
            <p style={{ textAlign: 'center' }}>No Quizzs found.</p>
          ) : null}
          {!isLoading && (
            <div>
              {quizzs.map(quizz => (
                <QuizzTile
                  key={quizz._id}
                  id={quizz._id}
                  author={quizz.creator.name}
                  title={quizz.title}
                  description={quizz.description}
                  click={() => {handleClick(quizz._id)}}
                />
              ))}
              <Pagination
              className="my-3"
              count={Math.ceil(totalQuizzs / 2) - 1}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />
              </div>
          )}
        </section>
    </Fragment>
  )
}

export default HomePage;