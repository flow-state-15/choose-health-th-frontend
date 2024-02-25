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
import Checkbox from "@mui/material/Checkbox";

import { completeStep, fetchUserPlan, fetchUserPurchases } from "../services";

export default function UserPlans({ user }) {
  const navigate = useNavigate();
  const [userPlan, setUserPlan] = useState(null);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetchUserPlan(setUserPlan);
    fetchUserPurchases(setPurchases);
  }, []);

  useEffect(() => {
    console.log("purchases: ", purchases);
  }, [purchases]);

  useEffect(() => {
    console.log("userPlan: ", userPlan);
  }, [userPlan]);

  const handleCompleteStep = (stepId, type) => {
    console.log("stepId: ", stepId);
    completeStep(stepId, type, (data) => {
      console.log("completed step: ", data);
      fetchUserPlan(setUserPlan);
    });
  };

  return (
    <>
      <Stack justifyContent="center" alignItems="center" spacing={4}>
        <Typography variant="h6">Your Dashboard</Typography>
        <Card>
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
                        {userPlan.userPlanSteps?.map((userStep) => (
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
        <Card>
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
                      <TableCell>${purchase.price}</TableCell>
                      <TableCell>{new Date(purchase.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Stack>
    </>
  );
}
