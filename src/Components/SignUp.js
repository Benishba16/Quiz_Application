import React, { useState } from "react";
import { Typography } from "antd";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import "./SignUp.css";
import Login from "./Login";
import { Link, useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

function SignUp() {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [already, setAlready] = useState(false);
  const [start, setStart] = useState(false);

  const onFinish = (values) => {
    console.log(values);
    if (values.email === localStorage.getItem("Email")) {
      setAlready(!already);
    } else {
      setStart(true);
      localStorage.setItem("Email", values.email);
      localStorage.setItem("Password", values.password);
      localStorage.setItem("Username", values.username);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed: ", errorInfo);
  };

  const onReset = () => {
    form.resetFields();
    if (already) {
      setAlready(!already);
    }
  };

  return (
    <div className='form'>
      <Title>SignUp</Title>
      <Form
        size='large'
        name='basic'
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 10 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        form={form}
      >
        <Form.Item
          label='Username'
          name='username'
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
            { whitespace: true },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input prefix={<UserOutlined className='site-form-item-icon' />} />
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "Enter valid mail id!",
            },
            {
              message: "Mail already exist",
            },
          ]}
          hasFeedback
        >
          <Input prefix={<MailOutlined className='site-form-item-icon' />} />
        </Form.Item>
        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              pattern:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)*$/,
              required: true,
              message: "Please input your password!",
            },
            { min: 6 },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 5, span: 13 }}>
          <div className='buttons'>
          <Button
            className='submit_button'
            size='large'
            type='primary'
            htmlType='submit'
          >
            Submit
          </Button>
          <Button
            className='reset_button'
            size='large'
            htmlType='button'
            onClick={onReset}
          >
            Reset
          </Button>
          </div>
        </Form.Item>
      </Form>
      {already ? (
        <Text className='already_exist' type='danger' strong>
          Mail id is already exist!
        </Text>
      ) : null}
      <div className="exist_submit">
      <Text className='text' strong>
        Already have an account?
        <Button type='link' onClick={() => navigate("/login")}>
          Login
        </Button>
      </Text>
      {start ? (
        <Button
          className='start_button'
          type='primary'
          size="large"
          onClick={() => navigate("/quiz")}
        >
          Start Quiz
        </Button>
      ): null}
      </div>
    </div>
  );
}

export default SignUp;
