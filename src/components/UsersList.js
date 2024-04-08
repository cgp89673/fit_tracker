import React from 'react';
import Card from './Card'
import User from './User';
import './UsersList.css';

const UserList = (props) => {
  return (
    <Card className="users">
      {props.items.map((user) => (
          <User
            key = {user.id}
            name = {user.name}
            img = {user.image}
          />
      ))}
    </Card>
  );
}

export default UserList;