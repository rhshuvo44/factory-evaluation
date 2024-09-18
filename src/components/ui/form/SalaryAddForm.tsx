import { PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { Button, Form, Image, Upload } from "antd";
import { useState } from "react";
import { formItemLayout } from "../../../constants/formItemLayout";
import { TSalary } from "../../../types/tableType";
import CustomInput from "../../form/CustomInput";
import CustomInputNumber from "../../form/CustomInputNumber";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const SalaryAddForm = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const onFinish = (values: TSalary) => {
    console.log("Received values of form: ", {
      ...values,
      employeeImg: previewImage,
    });
    // Call your backend API to handle the login request
    // and handle the response appropriately
    // You can use the following code as a reference:
  };
  return (
    <Form {...formItemLayout} onFinish={onFinish}>
      <CustomInputNumber
        label="Employee ID"
        name="employeeID"
        message="Please input Employee ID"
      />

      {/* <CustomInput
        label="Employee Photo"
        name="employeeImg"
        message="Please input! Employee Photo"
      /> */}

      <CustomInput label="Name" name="name" message="Please input! Name" />
      <CustomInput
        label="Designation"
        name="designation"
        message="Please input! Designation"
      />
      <CustomInputNumber
        label="Working Days"
        name="workingDays"
        message="Please input! Working Days"
      />

      <CustomInputNumber
        label="Salary"
        name="salary"
        message="Please input! Salary"
      />
      <CustomInputNumber
        label="Per Day Salary"
        name="perDaySalary"
        message="Please input! Per Day Salary"
      />
      <CustomInputNumber
        label="Over Time"
        name="overTime"
        message="Please input! Over Time"
      />
      <CustomInputNumber
        label="Over Time Rate"
        name="overTimeRate"
        message="Please input! Over Time Rate"
      />
      <CustomInputNumber
        label="Gross Per Day Salary"
        name="grossPerDaySalary"
        message="Please input! Gross Per Day Salary"
      />
      <Form.Item
        rules={[{ required: false, message: "Please upload Employee image " }]}
      >
        <Upload
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        {previewImage && (
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Add Employee Salary
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SalaryAddForm;
