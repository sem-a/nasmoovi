import React, { useEffect, useState } from "react";
import { AdminContainer } from "../../../components/container";
import { Button, Form } from "antd";
import styles from "./index.module.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetForIdPortfolioQuery,
  useUpdatePreviewPortfolioMutation,
} from "../../../app/services/portfolio";
import Loading from "../../../components/loading";
import ServerError from "../../../components/error";
import NoData from "../../../components/nodata";
import { ImageCheckbox } from "../../../components/form";
import { PATHS } from "../../../paths";

const SelectPreview: React.FC = () => {
  const { id } = useParams();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [updatePreview] = useUpdatePreviewPortfolioMutation();
  const navigate = useNavigate();

  const {
    data: portfolio,
    isLoading,
    isError,
  } = useGetForIdPortfolioQuery(id!);

  useEffect(() => {
    if (portfolio?.portfolio) {
      const initialSelectedIds = portfolio.portfolio
        .filter((item) => item.preview)
        .map((item) => item.id);
      setSelectedIds(initialSelectedIds);
    }
    console.log(selectedIds);
  }, [portfolio]);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setSelectedIds((prevSelected) => {
      if (checked) {
        return [...prevSelected, id];
      } else {
        return prevSelected.filter((selectedId) => selectedId !== id);
      }
    });
    console.log(selectedIds);
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      if (id) {
        const preview = await updatePreview({ id, selectedIds });
        console.log(preview);
      }
      alert("Все изображения успешно обновлены!");
      navigate(PATHS.adminWeddingAll);
    } catch (error) {
      alert("Произошла ошибка при обновлении изображений.");
      console.error(error);
    }
  };

  if (isLoading) return <Loading />;
  if (isError || portfolio?.success === false) return <ServerError />;
  if (!portfolio || portfolio.portfolio === null) return <NoData />;

  const previewList = portfolio.portfolio.map((item) => (
    <ImageCheckbox
      key={item.id}
      id={item.id}
      src={item.image}
      alt={item.id}
      checked={selectedIds.includes(item.id)}
      onChange={handleCheckboxChange}
    />
  ));

  return (
    <AdminContainer>
      <Form onFinish={handleSubmit}>
        <div className={styles.checkboxList}>{previewList}</div>
        <Button type="primary" htmlType="submit">
          Сохранить изменения
        </Button>
      </Form>
    </AdminContainer>
  );
};

export default SelectPreview;
