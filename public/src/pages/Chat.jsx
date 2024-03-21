import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoutes } from "../utils/APIRoutes";

function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    async function checkLocalStorage() {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    }

    checkLocalStorage();
  }, []);

  useEffect(() => {
    async function checkCurrentUser() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoutes}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setavatar");
        }
      }
    }

    checkCurrentUser();
  }, [currentUser]);

  return (
    <Container>
      <div className="container"></div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-item: center;
  backgroung-color: #131324;
  .container {
    height: 85vh;
    width: 85vh;
    backgroung-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px);
    grid-template-columns: 35% 65%;
  }
`;

export default Chat;
