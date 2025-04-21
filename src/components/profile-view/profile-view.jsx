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
import "./profile-view.scss";

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

  const formattedBirthday = userData.birthday 
    ? new Date(userData.birthday).toLocaleDateString() 
    : "";

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
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
      setUser(updatedUserData);
      localStorage.setItem("user", JSON.stringify(updatedUserData));
      setIsEditing(false);
      console.log("User data updated successfully");
    } catch (error) {
      console.error("Update error:", error);
      alert("Update failed.");
    }
  };

  const handleDeregister = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete your account?");
    if (isConfirmed) {
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
    }
  };
  
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile-container">
      <Container>
        {/* user profile */}
        <div className="profile-card">
          <h2 className="profile-title">Profile Information</h2>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label className="form-label">Username</Form.Label>
              <FormControl
                type="text"
                value={userData.username}
                readOnly={!isEditing}
                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                className="form-control"
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label className="form-label">Email</Form.Label>
              <FormControl
                type="email"
                value={userData.email}
                readOnly={!isEditing}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                className="form-control"
              />
            </Form.Group>

            <Form.Group controlId="formBirthday">
              <Form.Label className="form-label">Date of Birth</Form.Label>
              <FormControl
                type="text"
                value={formattedBirthday}
                readOnly={!isEditing}
                onChange={(e) => setUserData({ ...userData, birthday: e.target.value })}
                className="form-control"
              />
            </Form.Group>

            <div className="button-group">
              {isEditing ? (
                <Button variant="primary" onClick={handleUpdate} className="btn-primary">
                  Save Changes
                </Button>
              ) : (
                <Button variant="info" onClick={handleEdit} className="btn-info">
                  Edit Profile
                </Button>
              )}
              <Button variant="danger" onClick={handleDeregister} className="btn-danger">
                Delete Account
              </Button>
            </div>
          </Form>
        </div>

        {/* favorite movies */}
        <div className="favorites-section">
          <h2 className="section-title">My Favorite Movies</h2>
          
          {favoriteMovies.length > 0 ? (
            <div className="favorite-movies-container">
              {favoriteMovies.map((movie) => (
                <div key={movie.id} className="col">
                  <MovieCard 
                    movie={movie} 
                    token={token} 
                    setUser={setUser} 
                    user={user} 
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="no-favorites">
              <i className="fas fa-film"></i>
              <p>You haven't added any favorite movies yet.</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProfileView;
