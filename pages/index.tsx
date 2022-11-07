import Head from "next/head";
import Image from "next/image";
import Layout from "@common/components/Layouts";
import styles from "@styles/Home.module.css";
import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Layout>
      <div style={{ width: "80%", margin: "auto" }}>
        <Box
          m={1}
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Typography variant="h3" style={{ color: "#5B5B5B" }}>
            Inicio
          </Typography>
        </Box>
        <Box
          m={1}
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Typography variant="h5" style={{ color: "#2A2A2A" }}>
            Presiona en el menú y selecciona compañias
          </Typography>
        </Box>
      </div>
    </Layout>
  );
}
