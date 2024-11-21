import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Flex,
  Form,
  GetProp,
  Image,
  InputNumber,
  InputNumberProps,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomInput from "../../components/form/CustomInput";
import Loading from "../../components/ui/Loading";
import SectionTitle from "../../components/ui/SectionTitle";
import { formItemLayout } from "../../constants/formItemLayout";
import { designationOption } from "../../constants/Options";
import {
  useSingleEmployeeQuery,
  useUpdateEmployeeMutation,
} from "../../redux/features/employee/employeeApi";
import { TSalary } from "../../types";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const SalaryUpdate = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const id: string = location.pathname.split("/")[3];
  const { data, isLoading, refetch } = useSingleEmployeeQuery(id);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(data?.data?.photo);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [photo, setPhoto] = useState<File | undefined>(undefined);

  const [updateEmployee] = useUpdateEmployeeMutation();

  const [perDaySalary, setPerDaySalary] = useState<number>(
    data?.data?.perDaySalary
  );
  const [overTime, setOverTime] = useState<number>(data?.data?.overTime);

  const onChangePerDaySalary: InputNumberProps["onChange"] = (values) => {
    setPerDaySalary(values as number);
  };
  const onChangeOverTime: InputNumberProps["onChange"] = (values) => {
    setOverTime(values as number);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (newFileList.length > 0) {
      const file = newFileList[newFileList.length - 1];
      if (file.originFileObj) {
        setPhoto(file.originFileObj);
      }
    }
  };
  const handleRemoveImage = () => {
    setPreviewImage("");
    setPhoto(undefined);
    setFileList([]);
  };
  const customRequest = async ({ file, onSuccess }: any) => {
    onSuccess(file);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  useEffect(() => {
    refetch();
  }, [id, refetch]);
  useEffect(() => {
    if (data?.data?.photo) {
      setPreviewImage(data.data.photo);
    }
  }, [data]);
  useEffect(() => {
    const perDaySalaryValue = parseFloat(
      perDaySalary || data?.data?.perDaySalary
    );
    const overTimeValue = parseFloat(overTime || data?.data?.overTime);
    const salary = perDaySalaryValue
      ? perDaySalaryValue * 26
      : data?.data?.salary;
    const overTimeRate = perDaySalaryValue
      ? perDaySalaryValue / 10
      : data?.data?.overTimeRate;
    const grossPerDaySalary = perDaySalaryValue
      ? perDaySalaryValue + (perDaySalaryValue / 10) * overTimeValue
      : data?.data?.grossPerDaySalary;
    form.setFieldsValue({
      // salary: salary,
      // overTimeRate: overTimeRate,
      // grossPerDaySalary: grossPerDaySalary,
      // salary: parseFloat(salary.toFixed(2)),
      // overTimeRate: parseFloat(overTimeRate.toFixed(2)),
      // grossPerDaySalary: parseFloat(grossPerDaySalary.toFixed(2)),
      salary: parseFloat((salary ?? 0).toFixed(2)),
      overTimeRate: parseFloat((overTimeRate ?? 0).toFixed(2)),
      grossPerDaySalary: parseFloat((grossPerDaySalary ?? 0).toFixed(2)),
    });
  }, [perDaySalary, overTime, form, data]);

  const initialValues = {
    designation: data?.data?.designation,
    grossPerDaySalary: data?.data?.grossPerDaySalary,
    // id:data?.data?.,
    name: data?.data?.name,
    overTime: data?.data?.overTime,
    overTimeRate: data?.data?.overTimeRate,
    perDaySalary: data?.data?.perDaySalary,
    // photo:data?.data?.,
    salary: data?.data?.salary,
    status: data?.data?.status,
    workingDays: data?.data?.workingDays,
  };
  // date
  if (isLoading) return <Loading />;
  console.log(previewImage ? "preview" : "not available");

  const onFinish = async (values: TSalary) => {
    const salary = isNaN(values.salary) ? 0 : values.salary;
    const grossPerDaySalary = isNaN(values.grossPerDaySalary)
      ? 0
      : values.grossPerDaySalary;
    const perDaySalary = parseFloat(values.perDaySalary.toFixed(2));

    const data = { ...values, perDaySalary, salary, grossPerDaySalary };

    const formData = new FormData();
    if (photo) {
      formData.append("file", photo);
    }
    formData.append("data", JSON.stringify(data));
    const res = await updateEmployee({ id, formData }).unwrap();
    if (!res.success) return toast.error(res.message);
    setPreviewImage(res?.data?.photo);
    toast.success("Update Employee Data successfully");
    navigate(-1);
  };
  return (
    <>
      <SectionTitle title="Employee update" />
      <Form
        form={form}
        {...formItemLayout}
        onFinish={onFinish}
        layout="vertical"
        initialValues={initialValues}
      >
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
            showSearch
            optionFilterProp="label"
            options={designationOption}
          />
        </Form.Item>
        {/* <Form.Item
          label="Designation"
          name="designation"
          rules={[{ required: true, message: "Please select Designation! " }]}
        >
          <Select style={{ width: "100%" }} options={designationOption} />
        </Form.Item> */}
        <Form.Item label="Working Days" name="workingDays">
          <InputNumber style={{ width: "100%" }} disabled />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select Status! " }]}
        >
          <Select
            style={{ width: "100%" }}
            options={[
              { value: "P", label: "P" },
              { value: "A", label: "A" },
            ]}
          />
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
          label="Employee Image"
          rules={[
            { required: false, message: "Please upload Employee image " },
          ]}
        >
          <Flex gap={10}>
            {previewImage ? (
              <>
                <Image
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                  }}
                  style={{ width: 100, height: 100 }}
                  src={data.data.photo}
                />
                <Button
                  icon={<DeleteOutlined />}
                  style={{ marginTop: 8 }}
                  onClick={handleRemoveImage}
                  type="default"
                >
                  Remove Image
                </Button>
              </>
            ) : (
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                customRequest={customRequest}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
            )}
          </Flex>

          <small>Max size 5MB, 200x200px</small>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Add Employee Data
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SalaryUpdate;
