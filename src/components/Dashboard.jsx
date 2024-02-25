import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import TableContainer from "@mui/material/TableContainer";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { fetchUserPlan, fetchUserPurchases, completeStep } from "../services";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ user }) {
  const navigate = useNavigate();
  const [userPlan, setUserPlan] = useState(null);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    if (user) {
      fetchUserPlan(setUserPlan);
      fetchUserPurchases(setPurchases);
    }
  }, [user]);

  const handleCompleteStep = (stepId, type) => {
    completeStep(stepId, type, (data) => {
      if (data.message === "Previous step not completed") {
        toast.error(data.message);
        return;
      }
      fetchUserPlan(setUserPlan);
    });
  };

  return (
    <Stack
      spacing={5}
      sx={{ backgroundColor: "rgb(100, 149, 237, 0.10)", width: "96.1%", height: "100%", overflowY: "auto" }}
      alignItems="center"
      padding={5}
    >
      <Card sx={{ width: "400px", minHeight: 'fit-content', overflow: 'visible' }}>
        <CardContent>
          {userPlan ? (
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">
                      <Typography variant="h5">{userPlan.planName}</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="caption" color="red">
              You do not have a plan. Please purchase a plan to get started.
            </Typography>
          )}
        </CardContent>
        {userPlan && (
          <Card sx={{ width: "100%" }}>
            <CardContent>
              <Stack justifyContent="center" alignItems="center">
                <Typography variant="h6">Your Plan Progress</Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Step</TableCell>
                        <TableCell></TableCell>
                        <TableCell align="center">Completed</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {userPlan.userPlanSteps
                        ?.sort((s1, s2) => s1.stepId - s2.stepId)
                        .map((userStep) => (
                          <TableRow key={userStep.id}>
                            <TableCell>
                              {userPlan.steps.find((step) => userStep.stepId === step.id)?.name}
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell align="center">
                              {userStep.completed ? (
                                <Checkbox
                                  checked
                                  onClick={() => handleCompleteStep(userStep.id, false)}
                                />
                              ) : (
                                <Button
                                  onClick={() => handleCompleteStep(userStep.id, true)}
                                  variant="outlined"
                                >
                                  Complete
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Stack>
            </CardContent>
          </Card>
        )}
      </Card>
      <Button sx={{ textTransform: "none" }} onClick={() => navigate("/")}>
        <Typography variant="h6">Go to the Plan Store</Typography>
      </Button>
      <Card sx={{ width: "400px", overflow: 'visible' }}>
        <CardContent>
          <Typography variant="h6">Your Purchase History</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Plan</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell align="right">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {purchases.map((purchase) => (
                  <TableRow key={purchase.id}>
                    <TableCell>{purchase.Plan.planName}</TableCell>
                    <TableCell>${purchase.total}</TableCell>
                    <TableCell align="right">
                      {new Date(purchase.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Stack>
  );
}
