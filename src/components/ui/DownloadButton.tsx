import { Button } from "antd";

const DownloadButton = ({
  buttonText,
  filename,
  queryFunction,
  isLoading,
}: {
  buttonText: string;
  filename: string;
  queryFunction: () => Promise<{ data: Blob | undefined }>;
  isLoading: boolean;
}) => {
  const date = new Date().toLocaleDateString();
  const handleDownload = async () => {
    const { data } = await queryFunction();

    if (data) {
      // Create a temporary URL for the Blob
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${filename}-${date}.xlsx`); 
      document.body.appendChild(link);
      link.click(); // Trigger the download
      link.remove();
      window.URL.revokeObjectURL(url); // Revoke the object URL to clean up
    }
  };
  return (
    <Button type="primary" onClick={handleDownload}>
      {isLoading ? "Downloading..." : `${buttonText}`}
    </Button>
  );
};

export default DownloadButton;
