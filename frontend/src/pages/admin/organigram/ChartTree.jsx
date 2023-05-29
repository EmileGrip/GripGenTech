import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { ADMIN_EMPLOYEES_LIST_ROUTE } from "../../../routes/paths";
import CustomModal from "../../../ui/CustomModal";
import BulkUploadForm from "./BulkUploadForm";
import ChartTreeFlow from "./ChartTreeFlow";

const ChartTree = () => {
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);

  const handleBulkUploadOpen = () => setIsBulkUploadOpen(true);
  const handleBulkUploadClose = () => setIsBulkUploadOpen(false);

  return (
    <>
      <CustomModal
        open={isBulkUploadOpen}
        onClose={handleBulkUploadClose}
        title="Bulk Upload"
      >
        <BulkUploadForm />
      </CustomModal>
      <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button onClick={handleBulkUploadOpen} sx={{ borderRadius: 1 }}>
          <Typography sx={{ textTransform: "capitalize", color: "#66C1FF" }}>
            bulk upload
          </Typography>
        </Button>
        <Button
          href={ADMIN_EMPLOYEES_LIST_ROUTE}
          variant="contained"
          color="secondary"
          sx={{
            alignSelf: "flex-start",
            textTransform: "capitalize",
            fontSize: "14px",
            px: "28px",
          }}
        >
          employees list
        </Button>
      </Stack>
      <ChartTreeFlow />
    </>
  );
};

export default ChartTree;
