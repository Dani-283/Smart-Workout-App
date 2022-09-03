import BackButton from "@components/BackButton";
import MusclePieChart from "@components/MusclePieChart";
import PageContainer from "@components/PageContainer";
import WorkoutsGraph from "@components/WorkoutsGraph";
import useGetOrCreateUser from "@hooks/useGetOrCreateUser";
import { Typography } from "@mui/material";
import { useSession } from "next-auth/react";

const Overview = () => {
  const { data: session, status } = useSession();

  const { data: userData } = useGetOrCreateUser(session?.user.email, session);

  return (
    <PageContainer>
      <BackButton />
      <Typography variant="h1" sx={{ marginBottom: 4 }}>
        Overview
      </Typography>
      <WorkoutsGraph userData={userData} />
      <MusclePieChart userData={userData} />
    </PageContainer>
  );
};

export default Overview;
