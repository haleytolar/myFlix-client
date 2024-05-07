import React, { useState, useEffect } from "react";
import MovieCard from "../movie-card/movie-card";
import {
  Row,
  Col,
  Form,
  Button,
  Container,
  FormControl,
} from "react-bootstrap";

const ProfileView = ({ user, token, setUser, onDelete, movies }) => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
    birthday: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://movieflix-87lf.onrender.com/users/${user.Username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Fetch failed");
        }

        const data = await response.json();
        setUserData({
          username: data.Username,
          password: data.Password,
          email: data.Email,
          birthday: data.Birthday,
        });

        let favoriteMoviesList = movies.filter((movie) =>
          data.FavoriteMovies.includes(movie.id)
        );
        setFavoriteMovies(favoriteMoviesList);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [user, token, movies]);

  const formattedBirthday = new Date(userData.birthday).toLocaleDateString();

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      // Make the PUT request to update user data
      const response = await fetch(
        `https://movieflix-87lf.onrender.com/users/${user.Username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            Username: userData.username,
            Email: userData.email,
            Birthday: userData.birthday,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Update failed");
      }
      const updatedUserData = await response.json();
      // Update the local state with the new user data
      setUser(updatedUserData);

      localStorage.setItem("user", JSON.stringify(updatedUserData));

      // Reset edit mode
      setIsEditing(false);

      // Log the success message 
      console.log("User data updated successfully");
    } catch (error) {
      console.error("Update error:", error);
      alert("Update failed.");
    }
  };

  const handleDeregister = async () => {
    try {
      const response = await fetch(
        `https://movieflix-87lf.onrender.com/users/${user.Username}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setUser(null);
        alert("Your account has been deleted");
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      console.error("Deregister error:", error);
      alert("Something went wrong.");
    }
  };

  const handleEdit = () => {
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
                  readOnly={!isEditing}
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
  <div className="favorite-movies-container d-flex flex-wrap" style={{ marginBottom: '40px', padding: '0 20px' }}>
    {favoriteMovies.map((movie) => (
      <Col key={movie._id} xs={12} sm={6} md={4} lg={3} className="mb-5">
        <div className="movie-card-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ flex: '1 1 auto' }}>
            <MovieCard movie={movie} token={token} setUser={setUser} user={user} />
          </div>
        </div>
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

