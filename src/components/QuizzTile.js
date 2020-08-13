import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

const QuizzTile = (props) => {
  return (
    <div onClick={props.click}>
    <Card>
      <CardContent>
        <Typography color="textSecondary">
          {props.author}
        </Typography>
        <Typography component="h2">
          {props.title}
        </Typography>
        <Typography variant="body2" component="p">
          {props.description}
        </Typography>
      </CardContent>
    </Card>
    </div>
  )
}

export default QuizzTile
