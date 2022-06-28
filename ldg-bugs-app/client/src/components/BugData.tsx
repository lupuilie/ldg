import { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

interface IBug {
  _id: string;
  title: string;
  description: string;
  createdOn: Date;
  updatedOn: Date;
  status: string;
}

class CreateBugData implements IBug {
  constructor(
    public _id: string,
    public title: string,
    public description: string,
    public createdOn: Date,
    public updatedOn: Date,
    public status: string
  ) {}
}
export default function BugData() {
  const [rows, setRows] = useState<IBug[]>([]);

  async function getData() {
    const res = await axios.get("http://localhost:8080/api/bugs");
    const data = res.data.map((row: IBug) => {
      const { _id, title, description, createdOn, updatedOn, status } = row;
      return new CreateBugData(
        _id,
        title,
        description,
        createdOn,
        updatedOn,
        status
      );
    });
    setRows(data);
  }

  useEffect(() => {
    getData();
  }, []);

  async function onDeleteClick(_id: string) {
    await axios.delete(`http://localhost:8080/api/bugs/${_id}`);
    getData();
  }

  return (
    <TableContainer component={Paper} sx={{ marginTop: "1rem" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Created</TableCell>
            <TableCell align="left">Updated</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Option</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="left">
                {new Date(row.createdOn).toLocaleString()}
              </TableCell>
              <TableCell align="left">
                {new Date(row.updatedOn).toLocaleString()}
              </TableCell>
              <TableCell align="left">{row.status}</TableCell>
              <TableCell align="left">
                <Button onClick={() => onDeleteClick(row._id)}>delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
