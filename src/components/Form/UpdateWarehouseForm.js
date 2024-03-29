import React, { useEffect, useState } from "react";

import {
  Form,
  Input,
  Button,
  Space,
  message,
  Select,
  ConfigProvider,
} from "antd";
import { editWarehouse } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";

import "./style.css";

const { TextArea } = Input;

const SubmitButton = ({ form, isLoading }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            textHoverBg: "white",
            defaultBg: "rgba(156, 188, 235, 1)",
            defaultColor: "white",
            fontWeight: "500",
          },
        },
      }}
    >
      <Button
        style={{ padding: "0px 50px", marginBottom: "24px" }}
        type="default"
        htmlType="submit"
        size="large"
        loading={isLoading}
      >
        SUBMIT
      </Button>
    </ConfigProvider>
  );
};

function UpdateWarehouseForm({
  managersList,
  onUpdateData,

  handleOkButton,
  handleCancelButton,
  formData,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  console.log("formdata", formData);

  const handleFinish = async (values) => {
    let data;
    if (values.warehouseManager) {
      data = {
        managerId: values.warehouseManager.includes("-")
          ? formData.managerId
          : values.warehouseManager,
        name: values.warehouseName,
        capacity: values.warehouseCapacity,
        description: values.warehouseDescription,
        email: values.warehouseContactEmail,
        phone_num: values.warehouseContactPhoneNum,
        address: values.warehouseAddress,
      };
    } else {
      data = {
        name: values.warehouseName,
        capacity: values.warehouseCapacity,
        description: values.warehouseDescription,
        email: values.warehouseContactEmail,
        phone_num: values.warehouseContactPhoneNum,
        address: values.warehouseAddress,
      };
    }
    setIsLoading(true);

    try {
      await editWarehouse(formData.key, data, dispatch);

      message.success("Your warehouse has been edit successfully.");
      onUpdateData();
      handleOkButton();
    } catch (e) {
      console.log(e);
      message.error(
        typeof e.response.data === "string"
          ? e.response.data
          : "Something went wrong!"
      );
    }
    setIsLoading(false);
  };

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  useEffect(() => {
    form.setFieldsValue({
      warehouseManager: formData?.managerCodeAndName,
      warehouseName: formData.name,
      warehouseCapacity: formData.capacityNumber,
      warehouseDescription: formData.description,
      warehouseContactEmail: formData.email,
      warehouseContactPhoneNum: formData.phone_num,
      warehouseAddress: formData.address,
    });
  }, [formData, form]);
  return (
    <>
      <div>
        <Form
          className="formLabel"
          onFinish={handleFinish}
          form={form}
          autoComplete="off"
          name="newWarehouse"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
        >
          <Form.Item
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "Please input your warehouse name!",
              },
            ]}
            label={<p>Name</p>}
            name="warehouseName"
          >
            <Input placeholder="Warehouse Name" />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "Please input your warehouse address!",
              },
            ]}
            label={<p>Address</p>}
            name="warehouseAddress"
          >
            <TextArea placeholder="Warehouse Addresss" rows={4} />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "Please input your warehouse capacity!",
              },
            ]}
            label={<p>Capacity</p>}
            name="warehouseCapacity"
          >
            <Input placeholder="Warehouse Capacity" type="number" />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            name="warehouseManager"
            label={<p>&nbsp;Manager</p>}
            rules={[
              {
                // required: false,
                // message: "Please select warehoue manager!",
              },
            ]}
          >
            <Select
              options={managersList?.map((manager) => {
                return {
                  value: manager._id,
                  label: manager.code + " - " + manager.name,
                };
              })}
              allowClear
              placeholder="Select Manager for Warehouse"
            ></Select>
          </Form.Item>
          <Form.Item
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "Please input your warehouse contact email!",
              },
            ]}
            label={<p>Email</p>}
            name="warehouseContactEmail"
          >
            <Input placeholder="Warehouse Email" />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "Please input your warehouse contact phone number!",
              },
            ]}
            label={<p>Phone Number</p>}
            name="warehouseContactPhoneNum"
          >
            <Input placeholder="Warehouse Phone Number" />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "Please input your warehouse description!",
              },
            ]}
            label={<p>Description</p>}
            name="warehouseDescription"
          >
            <TextArea
              placeholder="Warehouse Description"
              rows={4}
              onChange={(e) => {
                // setWarehouseDescription(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <SubmitButton form={form} isLoading={isLoading}>
                Ok
              </SubmitButton>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default UpdateWarehouseForm;
