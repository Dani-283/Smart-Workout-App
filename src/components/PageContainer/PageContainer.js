import { Container } from "@mui/material";
import React from "react";

const PageContainer = ({ children }) => {
  return (
    <Container maxWidth="unset" sx={{ padding: 3, marginTop: 2 }}>
      {children}
    </Container>
  );
};

export default PageContainer;
