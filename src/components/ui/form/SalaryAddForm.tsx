import { PlusOutlined } from "@ant-design/icons";
import type { GetProp, InputNumberProps, UploadFile, UploadProps } from "antd";
import { Button, Form, Image, InputNumber, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { formItemLayout } from "../../../constants/formItemLayout";
import { designationOption } from "../../../constants/Options";
import { useCreateEmployeeMutation } from "../../../redux/features/employee/employeeApi";
import { TSalary } from "../../../types/tableType";
import CustomInput from "../../form/CustomInput";

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
  const [form] = Form.useForm();
  const [perDaySalary, setPerDaySalary] = useState<number>(0);
  const [overTime, setOverTime] = useState<number>(0);

  const [createEmployee] = useCreateEmployeeMutation();
  const onChangePerDaySalary: InputNumberProps["onChange"] = (values) => {
    setPerDaySalary(values as number);
  };
  const onChangeOverTime: InputNumberProps["onChange"] = (values) => {
    setOverTime(values as number);
  };

  useEffect(() => {
    form.setFieldsValue({
      salary: perDaySalary * 26,
      overTimeRate: perDaySalary / 10,
      grossPerDaySalary: perDaySalary * 26 + (perDaySalary * overTime) / 10,
    });
  }, [perDaySalary, overTime, form]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const onFinish = async (values: TSalary) => {
    const res = await createEmployee({
      ...values,
      employeeImg: previewImage,
    }).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Create successfully");
    form.resetFields();
  };
  return (
    <Form {...formItemLayout} onFinish={onFinish} form={form}>
      <CustomInput
        label="Name"
        name="name"
        message="Please input! Name"
        placeholder="please input Employee Name"
      />

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

      <Form.Item label="Salary" name="salary">
        <InputNumber style={{ width: "100%" }} disabled />
      </Form.Item>
      <Form.Item
        label="Per Day Salary"
        name="perDaySalary"
        rules={[{ required: true, message: "Please Input Per Day Salary " }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          onChange={onChangePerDaySalary}
          placeholder="please input Employee per Day Salary"
        />
      </Form.Item>

      <Form.Item
        label="Over Time"
        name="overTime"
        rules={[{ required: true, message: "Please Input Over Time" }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          onChange={onChangeOverTime}
          placeholder="please input over time hours"
        />
      </Form.Item>
      <Form.Item label="Over Time Rate" name="overTimeRate">
        <InputNumber style={{ width: "100%" }} disabled />
      </Form.Item>

      <Form.Item label="Gross Per Day Salary" name="grossPerDaySalary">
        <InputNumber style={{ width: "100%" }} disabled />
      </Form.Item>
      <Form.Item
        rules={[{ required: false, message: "Please upload Employee image " }]}
      >
        <Upload
          // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
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
