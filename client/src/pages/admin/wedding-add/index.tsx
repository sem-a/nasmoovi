import { Form } from "antd";
import { H2 } from "../../../components/title";
import { CustomButton, CustomInput } from "../../../components/form";
import { useNavigate } from "react-router-dom";
import { useAddWeddingMutation } from "../../../app/services/wedding";
import { Wedding } from "@prisma/client";
import { PATHS } from "../../../paths";
import { AdminContainer } from "../../../components/container";

const WeddingAdd: React.FC = () => {
  const navigate = useNavigate();
  const [addWedding] = useAddWeddingMutation();

  const handleAddWedding = async (data: Wedding) => {
    try {
      const wedding = await addWedding(data).unwrap();
      navigate(PATHS.adminPortfolioAdd + `/${wedding.wedding?.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminContainer>
      <H2 textAlign="start">Добавление свадьбы</H2>
      <Form onFinish={handleAddWedding}>
        <CustomInput name="name" type="text" placeholder="Название свадьбы" />
        <CustomButton type="primary" htmlType="submit">
          Создать
        </CustomButton>
      </Form>
    </AdminContainer>
  );
};

export default WeddingAdd;
