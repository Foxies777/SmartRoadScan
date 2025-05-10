import { InboxOutlined } from "@ant-design/icons";
import { message, Modal, Upload } from "antd";
import type { UploadProps } from "antd";

const { Dragger } = Upload;
const props: UploadProps = {
  name: "file",
  multiple: false,
  action: "http://localhost:3000/api/detection",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
interface UploadModalProps{
    onClose: () => void
}
const UploadModal = ({onClose}: UploadModalProps) => {
  return (
    <Modal 
    destroyOnClose
    onCancel={onClose}
    footer={false}
    open={true}
    >
      <Dragger 
      {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Нажмите или перетащите для загрузки архива.
        </p>
        <p className="ant-upload-hint">
        Поддерживается однократная или массовая загрузка. Строго запрещено
        загружать данные компании или другие запрещенные файлы.
        </p>
      </Dragger>
    </Modal>
  );
};

export default UploadModal;
