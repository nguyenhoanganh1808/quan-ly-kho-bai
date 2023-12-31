/* eslint-disable jsx-a11y/anchor-is-valid */
import "./style.css";
import { Button, Form, Input, ConfigProvider } from "antd";
import { Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function ForgotPassword() {
  const navigate = useNavigate();
  return (
    <Form
      layout="vertical"
      className="forgotPasswordForm"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <img
        className="logo"
        src={require("../../../assets/images/WarehouseLogo.png")}
        alt=""
        width={150}
      ></img>
      <Typography
        style={{
          fontWeight: "bolder",
          fontSize: 30,
          color: "white",
          marginTop: 0,
          marginBottom: 10,
        }}
      >
        Forgot Password
      </Typography>
      <Form.Item label={<p className="label">Email</p>} name="email">
        <Input type="email" size="large" placeholder="Enter Your Email" />
      </Form.Item>
      <Form.Item>
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: "rgba(0, 52, 101, 1)",
              colorBorder: "none",
            },
          }}
        >
          <Button
            style={{ fontWeight: "bold", color: "white" }}
            block
            size="large"
            type="default"
            htmlType="submit"
          >
            Send
          </Button>

          <a
            style={{ color: "white" }}
            onClick={() => {
              navigate("/auth/login");
            }}
          >
            Go back to Login Form!
          </a>
        </ConfigProvider>
      </Form.Item>
    </Form>
  );
}
export default ForgotPassword;
