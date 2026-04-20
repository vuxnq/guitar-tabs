import { Pagination as MuiPagination, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export function Pagination({ totalPages, currentPage }: PaginationProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value.toString());
    navigate(`${location.pathname}?${searchParams.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (totalPages <= 1) return null;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 2 }}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        shape="rounded"
        size="large"
      />
    </Box>
  );
}
