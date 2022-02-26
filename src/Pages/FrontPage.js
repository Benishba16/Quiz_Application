import { Divider, Typography, Image, Button, Modal, Form } from "antd";
import "./FrontPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SignUp from "../Components/SignUp";
import Login from "../Components/Login";

const { Title, Text } = Typography;

function FrontPage() {

  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLoginOk = ( ) => {
    window.location.reload();
    setIsModalVisible(false);
  }

  const handleLoginCancel = () => {
    window.location.reload();
    setIsModalVisible(false);
  }

  const handleOk = () => {
    window.location.reload();
    setModal(false);
  }

  const handleCancel = () => {
    window.location.reload();
    setModal(false)
  }

  return (
    <div>
      <div className='quiz_title_flex'>
        <Title
          className='quiz_title'
          style={{
            color: "#1890ff",
            fontFamily: "'Lobster', cursive",
            fontSize: 70,
          }}
        >
          Quiz
        </Title>
        <div>
          <Button
            size='large'
            className='link_button'
            type='link'
            style={{ fontSize: 30, color: "#1890ff" }}
            onClick={() => setIsModalVisible(true)}
          >
            Login
            </Button>
            <Modal visible={isModalVisible} onOk={handleLoginOk} onCancel={handleLoginCancel}>
              <Login/>
            </Modal>
        </div>
      </div>
      <Divider type='horizontal' />
      <div className='quiz-flex'>
        <div>
          <Text
            className='online_quiz'
            strong
            style={{ fontSize: 45, fontFamily: "'Lobster', cursive" }}
          >
            Welcome to Online Quiz
          </Text>
          <div>
            <Text className='quiz_qoute' strong style={{ fontSize: 20 }}>
              Open your door to more with our questions.
            </Text>
          </div>
          <br />
          <div>
            <Button
              className='quiz_button'
              size='large'
              type='primary'
              onClick={() => setModal(true)}
            >
              Join for free
            </Button>
            <Modal visible={modal} onOk={handleOk} onCancel={handleCancel}>
              <SignUp/>
            </Modal>
          </div>
        </div>
        <div></div>
        <div>
          <Image
            className='quiz_image'
            width={400}
            src='https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/33EmCuyKJT5MD5DOiYCcCV/1ce227e348fbe7de7f0b9305707700e4/IN_HERO_C_NOV21.png?auto=format%2Ccompress&dpr=2&w=459&h=497&q=40'
          />
        </div>
      </div>
    </div>
  );
}

export default FrontPage;
