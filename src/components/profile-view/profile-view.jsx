import React, { useState, useEffect } from 'react';
import MovieCard from '../movie-card/movie-card';
import { Row, Col, Form, Button, Container, FormControl } from 'react-bootstrap';

const ProfileView = ({ user, token, setUser, onDelete, movies }) => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: '',
    birthday: '',
  });

  const handleDeregister = () => {
    // Add logic to handle deregistration
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


  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode

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

        let favoriteMoviesList = movies.filter((movie) => data.FavoriteMovies.includes(movie.id));
        setFavoriteMovies(favoriteMoviesList);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, [user, token, movies]);

  // Format date of birth
  const formattedBirthday = new Date(userData.birthday).toLocaleDateString();

  const handleUpdate = (event) => {
    event.preventDefault();

    // Add logic to update user data on the server

    // For now, let's log the updated user data
    console.log('Updated User Data:', userData);

    // Reset edit mode
    setIsEditing(false);
  };

  const handleEdit = () => {
    // Toggle edit mode
    setIsEditing(!isEditing);
  };

  return (
    <Container>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2 style={{ color: 'white' }}>Profile</h2>
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label style={{ color: 'white' }}>Username</Form.Label>
                <FormControl
                  type="text"
                  value={userData.username}
                  readOnly={!isEditing} // Make the field read-only based on the edit mode
                  onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                  style={{ color: 'white' }}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label style={{ color: 'white' }}>Email</Form.Label>
                <FormControl
                  type="email"
                  value={userData.email}
                  readOnly={!isEditing}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  style={{ color: 'white' }}
                />
              </Form.Group>

              <Form.Group controlId="formBirthday">
                <Form.Label style={{ color: 'white' }}>Date of Birth</Form.Label>
                <FormControl
                  type="text"
                  value={formattedBirthday}
                  readOnly={!isEditing}
                  onChange={(e) => setUserData({ ...userData, birthday: e.target.value })}
                  style={{ color: 'white' }}
                />
              </Form.Group>

              <Row className="justify-content-md-center mx-2 my-4">
                <h2 className="profile-title" style={{ color: 'white', marginBottom: '40px' }}>
                  Favorite movies
                </h2>
                <div className="favorite-movies-container d-flex flex-wrap justify-content-around" style={{  marginBottom: '40px' }}>
                  {favoriteMovies.map((movie) => (
                    <Col key={movie._id} xs={12} sm={6} md={4} lg={3} className="mb-2">
                      <MovieCard movie={movie} token={token} setUser={setUser} user={user} />
                    </Col>
                  ))}
                </div>
              </Row>

              {isEditing ? (
                <Button variant="primary" onClick={handleUpdate} style={{ color: 'white' }}>
                  Save Changes
                </Button>
              ) : (
                <Button variant="info" onClick={handleEdit} style={{ color: 'white' }}>
                  Edit Profile
                </Button>
              )}
              {' '}
              <Button variant="danger" onClick={handleDeregister} style={{ color: 'white' }}>
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
