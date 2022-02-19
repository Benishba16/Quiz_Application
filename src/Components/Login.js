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
    setCheck(!check);
    form.resetFields();
  };

  return (
    <div className='login'>
      <div className='login_title'>
        <Title>Login</Title>
      </div>
      <div className='login_form'>
        <Form
          size='large'
          name='basic'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 10 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete='off'
          form={form}
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
              <div className='submit_button'>
                <Form.Item>
                  <Button size='large' type='primary' htmlType='submit'>
                    Submit
                  </Button>
                </Form.Item>
              </div>
              <div className='reset_button'>
                <Form.Item>
                  <Button size='large' htmlType='button' onClick={onReset}>
                    Reset
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form.Item>
          <div className='danger_message'>
            <Form.Item wrapperCol={{ offset: 5, span: 13 }}>
              {check ? (
                <Text strong type='danger'>
                  Please check above details are valid or not!
                </Text>
              ) : null}
            </Form.Item>
          </div>
        </Form>
      </div>
      <div className="quiz_button">
        {valid ? (
          <Button
            size='large'
            type='primary'
            htmlType='submit'
            onClick={() => navigate("/quiz")}
          >
            Start Quiz
          </Button>
        ) : null}
      </div>
      <div>
        <Button type="primary" htmlType="submit" onClick={() => navigate("/")}>Back to Signup</Button>
      </div>
    </div>
  );
}

export default Login;
