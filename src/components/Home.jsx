import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { fetchAllPlans, postPlanPurchase, fetchUserPlan, fetchUserPurchases } from "../services";

export default function Home({ user }) {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [, setPurchases] = useState([]);
  const [userPlan, setUserPlan] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetchAllPlans(setPlans);
    // fetchUserPlan(setUserPlan);
    // fetchUserPurchases(setPurchases);
  }, [user, navigate]);

  // useEffect(() => {
  //   if (userPlan) {
  //     fetchUserPurchases(setPurchases);
  //   }
  // }, [userPlan]);

  useEffect(() => {
    console.log("plans: ", plans);
  }, [plans]);

  const handlePurchase = (planId) => {
    postPlanPurchase(planId, () => {
      // fetchUserPlan(setUserPlan);
      // fetchUserPurchases(setPurchases);
      navigate("/dashboard");
    });
  };

  return (
    <>
      <Stack spacing={3} alignItems="center">
        <Typography variant="h5" sx={{paddingTop: '2rem'}}>The Plan Store</Typography>
        <Card>
          <CardContent>
            <Stack justifyContent="center" alignItems="center">
              <Typography variant="h6">Plans available for purchase</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Plan</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>No. of Steps</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {plans.map((plan) => (
                      <TableRow key={plan.id}>
                        <TableCell align="left">{plan.planName}</TableCell>
                        <TableCell align="center">${plan.price}</TableCell>
                        <TableCell align="center">{plan.steps.length}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="primary"
                            disabled={user.planId === plan.id}
                            sx={{ textTransform: "none" }}
                            onClick={() => handlePurchase(plan.id)}
                          >
                            {user.planId === plan.id ? "Owned" : "Purchase"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </CardContent>
        </Card>
        <Button sx={{ textTransform: 'none' }} onClick={() => navigate('/dashboard')}>
          <Typography variant="h6">Go to Your Dashboard</Typography>
        </Button>
      </Stack>
    </>
  );
}
