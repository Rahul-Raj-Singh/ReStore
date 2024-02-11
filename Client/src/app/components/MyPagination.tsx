import { Box, Typography, Pagination } from "@mui/material";
import { PaginationMetaData } from "../models/paginationMetaData";

type Props = {
  metadata: PaginationMetaData;
  onPageChange: (page: number) => void;
};

export default function MyPagination({ metadata, onPageChange }: Props) {
  const { pageNumber, pageSize, totalCount, totalPages } = metadata;
  const firstItem = (pageNumber - 1) * pageSize + 1;
  const lastItem =
    pageNumber * pageSize < totalCount ? pageNumber * pageSize : totalCount;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 2,
      }}
    >
      <Typography>
        Showing {firstItem}-{lastItem} of {totalCount} items
      </Typography>
      <Pagination
        color="secondary"
        size="large"
        onChange={(_, page) => onPageChange(page)}
        count={totalPages}
        page={pageNumber}
      />
    </Box>
  );
}
