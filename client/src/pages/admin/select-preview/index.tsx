import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImageCheckbox } from "../../../components/form";
import {
  useGetForIdPortfolioQuery,
  useUpdatePreviewPortfolioMutation,
} from "../../../app/services/portfolio";
import { Form, Button } from "antd";
import { AdminContainer } from "../../../components/container";
import styles from "./index.module.css";
import LoadingScreen from "../../../components/loading";
import ServerError from "../../../components/error";
import NoData from "../../../components/nodata";
import { PATHS } from "../../../paths";

interface PortfolioItem {
  id: string;
  image: string;
  preview: boolean;
  weddingId?: string;
}

const SelectPreview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [updatePreview] = useUpdatePreviewPortfolioMutation();
  const navigate = useNavigate();

  const {
    data: portfolio,
    isLoading,
    isError,
  } = useGetForIdPortfolioQuery(id!);

  if (isLoading) return <LoadingScreen />;
  if (isError || portfolio?.success === false) return <ServerError />;
  if (!portfolio || portfolio.portfolio === null) return <NoData />;

  useEffect(() => {
    if (portfolio.portfolio !== null) {
      const selectedImages = portfolio.portfolio
        .filter((item) => item.preview)
        .map((item) => item.id);
      setSelectedIds(selectedImages);
    }
  }, [portfolio]);

  const handleImageChange = (imageId: string, isChecked: boolean): void => {
    setSelectedIds((prevSelectedIds) => {
      if (isChecked) {
        return [...prevSelectedIds, imageId]; // Добавляем ID в массив, если выбрано
      } else {
        return prevSelectedIds.filter((id) => id !== imageId); // Убираем ID из массива, если снято
      }
    });
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      if (id) {
        await updatePreview({
          id,
          selectedId: selectedIds,
        }).unwrap();

        alert("Все изображения успешно обновлены!");
        navigate(PATHS.weddingAll);
      }
    } catch (error) {
      alert("Произошла ошибка при обновлении изображений.");
      console.error(error);
    }
  };

  const portfolioList = portfolio.portfolio.map((item: PortfolioItem) => (
    <ImageCheckbox
      key={item.id}
      id={item.id}
      src={item.image}
      alt={`Изображение ${item.id}`}
      onChange={handleImageChange}
      checked={selectedIds.includes(item.id)}
    />
  ));

  return (
    <AdminContainer>
      <Form onFinish={handleSubmit}>
        <div className={styles.checkboxList}>{portfolioList}</div>
        <Button type="primary" htmlType="submit">
          Сохранить изменения
        </Button>
      </Form>
    </AdminContainer>
  );
};

export default SelectPreview;
