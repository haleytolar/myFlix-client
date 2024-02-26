// profile-view.jsx

import React, { useState, useEffect } from 'react';
import { MovieCard } from "../movie-card/movie-card";
import { Row, Col, Form, Button } from 'react-bootstrap';

const ProfileView = ({ user, token, setUser, onDelete, movies }) => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: '',
    birthday: '',
  });

  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    // Fetch user information using the /users endpoint
    fetch(`https://movieflix-87lf.onrender.com/users/${user.Username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData({
          username: data.Username,
          password: data.Password,
          email: data.Email,
          birthday: data.Birthday,
        });

        // Filter movies based on user's favoriteMovies array
        let favoriteMoviesList = movies.filter((movie) => data.FavoriteMovies.includes(movie._id));
        setFavoriteMovies(favoriteMoviesList);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, [user, token, movies]);

  const handleUpdate = (event) => {
    event.preventDefault();

    const { username, password, email, birthday } = userData; // Destructure values from userData
    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };

    // Update user information
    fetch(`https://movieflix-87lf.onrender.com/users/${user.name}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          const e = await response.text();
          console.log(e);
          alert('Update failed.');
        }
      })
      .then((updatedUser) => {
        if (updatedUser) {
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
          alert('Updated!');
        }
      })
      .catch((error) => {
        console.error('Update error:', error);
        alert('Update failed.');
      });
  };

  const handleDeregister = () => {
    fetch(`https://movieflix-87lf.onrender.com/users/${user.Username}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setUser(null);
          alert('Your account has been deleted');
        } else {
          alert('Something went wrong.');
        }
      })
      .catch((error) => {
        console.error('Deregister error:', error);
        alert('Something went wrong.');
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center mx-3 my-4">
        <h2 className="profile-title">Favorite movies</h2>
        {favoriteMovies.map((movie) => (
          <Col key={movie._id} className="m-3">
            <MovieCard movie={movie} token={token} setUser={setUser} user={user} />
          </Col>
        ))}
      </Row>

      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2>Profile</h2>
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={userData.username} readOnly />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={userData.email} readOnly />
              </Form.Group>

              <Form.Group controlId="formBirthday">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="text" value={userData.birthday} readOnly />
              </Form.Group>

              <Row className="justify-content-md-center mx-3 my-4">
                <h2 className="profile-title">Favorite movies</h2>
                {favoriteMovies.map((movie) => (
                  <Col key={movie._id} className="m-3">
                    <MovieCard movie={movie} token={token} setUser={setUser} user={user} />
                  </Col>
                ))}
              </Row>

              <Button variant="primary" onClick={handleUpdate}>
                Update Profile
              </Button>{' '}
              <Button variant="danger" onClick={handleDeregister}>
                Deregister
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default ProfileView;
