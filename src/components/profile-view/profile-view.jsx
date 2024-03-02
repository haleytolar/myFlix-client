import React, { useState, useEffect } from 'react';
import MovieCard from "../movie-card/movie-card";
import { Row, Col, Form, Button, Container } from 'react-bootstrap';

const ProfileView = ({ user, token, setUser, onDelete, movies }) => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: '',
    birthday: '',
  });

  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://movieflix-87lf.onrender.com/users/${user.Username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Fetch failed');
        }
  
        const data = await response.json();
        setUserData({
          username: data.Username,
          password: data.Password,
          email: data.Email,
          birthday: data.Birthday,
        });
  
        let favoriteMoviesList = movies.filter((movie) => data.FavoriteMovies.includes(movie._id));
        setFavoriteMovies(favoriteMoviesList);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
  
    fetchData();
  }, [user, token, movies]);
  

  const handleUpdate = (event) => {
    event.preventDefault();

    const { username, password, email, birthday } = userData;
    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };

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
        <h2 className="profile-title" style={{ color: "white" }}>Favorite movies</h2>
        {favoriteMovies.map((movie) => (
          <Col key={movie._id} className="m-3">
            <MovieCard movie={movie} token={token} setUser={setUser} user={user} />
          </Col>
        ))}
      </Row>

      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2 style={{ color: "white" }}>Profile</h2>
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label style={{ color: "white" }}>Username</Form.Label>
                <Form.Control type="text" value={userData.username} readOnly style={{ color: "white" }} />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label style={{ color: "white" }}>Email</Form.Label>
                <Form.Control type="email" value={userData.email} readOnly style={{ color: "white" }} />
              </Form.Group>

              <Form.Group controlId="formBirthday">
                <Form.Label style={{ color: "white" }}>Date of Birth</Form.Label>
                <Form.Control type="text" value={userData.birthday} readOnly style={{ color: "white" }} />
              </Form.Group>

              <Row className="justify-content-md-center mx-3 my-4">
                <h2 className="profile-title" style={{ color: "white" }}>Favorite movies</h2>
                {favoriteMovies.map((movie) => (
                  <Col key={movie._id} className="m-3">
                    <MovieCard movie={movie} token={token} setUser={setUser} user={user} />
                  </Col>
                ))}
              </Row>

              <Button variant="primary" onClick={handleUpdate} style={{ color: "white" }}>
                Update Profile
              </Button>{' '}
              <Button variant="danger" onClick={handleDeregister} style={{ color: "white" }}>
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
