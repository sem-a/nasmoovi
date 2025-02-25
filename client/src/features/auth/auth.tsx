import { useCurrentQuery } from "../../app/services/auth";
import Loading from "../../components/loading";

export const Auth = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery();

  if (isLoading) {
    return <Loading />;
  }

  return children;
};
