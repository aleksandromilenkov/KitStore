import { Box, Pagination, Typography } from "@mui/material";
import { Pagination as PaginationType } from "../../models/pagination";

type Props = {
    metadata: PaginationType
    onPageChange: (page:number)=>void;
};

const AppPagination = ({metadata, onPageChange}: Props) => {
    const {pageSize, pageNumber, totalItems, totalPages} = metadata;
    const startItem = (pageNumber - 1) * pageSize +1;
    const endItem = Math.min(pageNumber * pageSize, totalItems);
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems={"center"}
      mt={"3"}
    >
        <Typography>Displaying {startItem}-{endItem} of {totalItems} items</Typography>
      <Pagination
        color="secondary"
        size="large"
        count={totalPages}
        page={pageNumber}
        onChange={(_, page)=>onPageChange(page)}
      />
    </Box>
  );
};
export default AppPagination;
