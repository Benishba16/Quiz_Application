import React, { useState } from "react";
import { Form, Button, Input, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

function Login() {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [check, setCheck] = useState(false);
  const [valid, setValid] = useState(false);

  const onFinish = (values) => {
    console.log(values);

    let mail = localStorage.getItem("Email");
    let password = localStorage.getItem("Password");

    console.log(localStorage.getItem("Email"));
    console.log(localStorage.getItem("Password"));

    if (mail !== values.email || password !== values.password) {
      setCheck(!check);
    } else if (mail === values.email && password === values.password) {
      setValid(!valid);
    }
  };

  const onReset = () => {
    form.resetFields();
    if (check) {
      setCheck(!check);
    }
  };

  return (
    <div className='login'>
      <Title className='login_title'>Login</Title>
      <Form
        size='large'
        name='basic'
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 10 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete='off'
        form={form}
        className='login_form'
      >
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: "Please input your mail",
            },
          ]}
        >
          <Input prefix={<MailOutlined className='site-form-item-icon' />} />
        </Form.Item>
        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: "Please input your mail",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 5, span: 13 }}>
          <div className='button'>
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
        <Form.Item wrapperCol={{ offset: 5, span: 13 }}>
          {check ? (
            <Text
              className='danger_message'
              className='check_text'
              strong
              type='danger'
            >
              Please check above details are valid or not!
            </Text>
          ) : null}
        </Form.Item>
        <Form.Item className='start_button'>
          {valid ? (
            <Button
              size='large'
              type='primary'
              htmlType='submit'
              style={{ width: 150 }}
              onClick={() => navigate("/quiz")}
            >
              Start Quiz
            </Button>
          ) : null}
        </Form.Item>
      </Form>
      <br />
      {/* <Button
        style={{ width: 150 }}
        size='large'
        type='primary'
        htmlType='submit'
        className='back_button'
        onClick={() => navigate("/")}
      >
        Back to Signup
      </Button> */}
    </div>
  );
}

export default Login;
