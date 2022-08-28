import BackButton from "@components/BackButton";
import MusclePieChart from "@components/MusclePieChart";
import PageContainer from "@components/PageContainer";
import WorkoutsGraph from "@components/WorkoutsGraph";
import { Typography } from "@mui/material";

const Overview = () => {
  return (
    <PageContainer>
      <BackButton />
      <Typography variant="h1" sx={{ marginBottom: 4 }}>
        Overview
      </Typography>
      <WorkoutsGraph />
      <MusclePieChart />
    </PageContainer>
  );
};

export default Overview;
