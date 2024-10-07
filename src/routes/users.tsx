import React from 'react';
import Box from '@mui/material/Box';
import {Button, Card, CardActions, CardContent, Typography} from '@mui/material';
import useFetch from '../utilities/useFetch.tsx';
import {UserModel} from '../models/user.model.ts';
const Users = () => {
  const {data} = useFetch('https://dummyjson.com/c/f15a-3b30-4d70-83fa');
  const users: UserModel[] = data || [];
  return (
    data ?
    <Box className="p-2 grid grid-cols-6">
      {
        users.map((user: UserModel) => (
          <Card className="mx-2">
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {user.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {user.email}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" href={`/tasks/${user.id}`}>See Tasks</Button>
            </CardActions>
          </Card>
        ))
      }
    </Box> : null
  );
};
export default React.memo(Users);
