import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/lib/upload/interface";
import { useAddPortfolioMutation } from "../../../app/services/portfolio";
import { useParams } from "react-router-dom";
import { H2 } from "../../../components/title";
import { PATHS } from "../../../paths";
import { CustomButton } from "../../../components/form";
import { Link } from "react-router-dom";
import { AdminContainer } from "../../../components/container";

interface AddPortfolioArgs {
  wedding: string;
  formData: FormData;
}

const PortfolioAdd: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [addPortfolio, { isLoading }] = useAddPortfolioMutation();
  const { wedding } = useParams<{ wedding: string }>();

  const handleUpload = async () => {
    if (!wedding) {
      message.error("ID свадьбы не определен");
      return;
    }

    const formData = new FormData();
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("file", file.originFileObj);
      }
    });

    try {
      await addPortfolio({
        wedding,
        formData,
      } as AddPortfolioArgs).unwrap();
      message.success("Фотографии успешно добавлены в портфолио");
      setFileList([]); // Очистить список файлов после успешной загрузки
    } catch (error: any) {
      message.error("Ошибка при добавлении фотографий");
      console.log("Ошибка при добавлении в портфолио:", error);
    }
  };

  const onChange = (info: { fileList: UploadFile[] }) => {
    setFileList(info.fileList);
  };

  return (
    <AdminContainer>
      <H2 textAlign="start">Добавление в портфолио</H2>
      <Upload
        multiple
        fileList={fileList}
        beforeUpload={() => false}
        onChange={onChange}
      >
        <Button icon={<UploadOutlined />} disabled={isLoading}>
          Выбрать файлы
        </Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0 || isLoading}
        style={{ marginTop: 16 }}
      >
        {isLoading ? "Загрузка..." : "Загрузить"}
      </Button>
      <Link to={PATHS.adminPreview + "/" + wedding}>
        <CustomButton type="primary">Далее</CustomButton>
      </Link>
    </AdminContainer>
  );
};

export default PortfolioAdd;
