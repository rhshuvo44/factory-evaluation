import { PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { Button, Form, Image, InputNumber, Select, Upload } from "antd";
import { useState } from "react";
import { designationOption } from "../../../constants/dropdownoptions";
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
  // const [perDaySalary, setPerDaySalary] = useState<number>(0);

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
  // const salary = perDaySalary * 26;
  // const overTimeRate = salary / 10;
  
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

      <CustomInput label="Name" name="name" message="Please input! Name" />

      <Form.Item
        label="Designation"
        name="designation"
        rules={[{ required: true, message: "Please select Designation! " }]}
      >
        <Select
          style={{ width: "100%" }}
          defaultValue="Please select"
          options={designationOption}
        />
      </Form.Item>
      <Form.Item label="Working Days" name="workingDays" initialValue={26}>
        <InputNumber style={{ width: "100%" }} disabled />
      </Form.Item>

      <Form.Item label="Salary" name="salary" initialValue={salary}>
        <InputNumber style={{ width: "100%" }} disabled />
      </Form.Item>
      <Form.Item
        label="Per Day Salary"
        name="perDaySalary"
        rules={[{ required: true, message: "Please select Per Day Salary " }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <CustomInputNumber
        label="Over Time"
        name="overTime"
        message="Please input! Over Time"
      />
      <Form.Item label="Over Time Rate" name="overTimeRate">
        <InputNumber style={{ width: "100%" }} disabled value={overTimeRate} />
      </Form.Item>

      <Form.Item label="Gross Per Day Salary" name="grossPerDaySalary">
        <InputNumber style={{ width: "100%" }} disabled value={overTimeRate} />
      </Form.Item>
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
          Add Employee Data
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SalaryAddForm;
