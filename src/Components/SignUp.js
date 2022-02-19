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
    } 
    else {
      setStart(true)
      localStorage.setItem("Email", values.email);
      localStorage.setItem("Password", values.password);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed: ", errorInfo);
  };

  const onReset = () => {
    form.resetFields(["note"]);
  };

  return (
    <div>
      <div>
          <div className='form'>
            <Title>SignUp</Title>
            <div>
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
                  <Input
                    prefix={<UserOutlined className='site-form-item-icon' />}
                  />
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
                  <Input
                    prefix={<MailOutlined className='site-form-item-icon' />}
                  />
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
                    <div className='submit_button'>
                      <Button size='large' type='primary' htmlType='submit'>
                        Submit
                      </Button>
                    </div>
                    <div className='reset_button'>
                      <Button size='large' htmlType='button' onClick={onReset}>
                        Reset
                      </Button>
                    </div>
                  </div>
                  <div className='danger'>
                    <Form.Item>
                      {already ? (
                        <Text type='danger' strong>
                          Mail id is already exist!
                        </Text>
                      ) : null}
                    </Form.Item>
                  </div>
                </Form.Item>
              </Form>
              <div className='start_button'>
                {start ? (
                  <Button type='primary' onClick={() => navigate("/quiz")}>
                    Start Quiz
                  </Button>
                ) : null}
              </div>
              <div className='text'>
                <Text strong>
                  Already have an account?
                  <Button type="link" onClick={() => navigate("/login")}>Login</Button>
                </Text>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default SignUp;
