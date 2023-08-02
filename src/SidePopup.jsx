import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddSegmentSelect from "./AddSegmentSelect";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Box, Button, TextField, IconButton, Link } from "./components/index";

const listData = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

function SidePopup({ toggleDrawer }) {
  const [segmentName, setSegmentName] = useState("");
  const [errMsg, setErrMsg] = useState(false);

  const [selectFields, setSelectFields] = useState([
    { id: uuidv4(), value: "" },
  ]);

  const handleAddFields = () => {
    const checkEmptyValue = selectFields.filter((item) => item.value === "");
    if (checkEmptyValue.length === 0 || checkEmptyValue.length > 2) {
      setSelectFields([...selectFields, { id: uuidv4(), value: "" }]);
    }
  };

  const handleRemoveFields = (id) => {
    const values = [...selectFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setSelectFields(values);
  };

  const handleChangeSelect = (id, event) => {
    const newInputFields = selectFields.map((i) => {
      if (id === i.id) {
        i["value"] = event.target.value;
      }
      return i;
    });

    setSelectFields(newInputFields);
  };

  const handleSaveSegment = async () => {
    // console.log("Save to Segment");
    const filteredSchema = listData.filter((item) =>
      selectFields?.some((v) => v.value === item.value)
    );
    const schemaData =
      filteredSchema.length > 0
        ? filteredSchema.map((schema) => {
            return { [schema.value]: schema.label };
          })
        : [];

    if (segmentName !== "" && schemaData.length > 0) {
      setErrMsg(false);
      // console.log(schemaData);
      await fetch("https://webhook.site/7db32041-1f49-4b7f-8a13-c0286b8fa2a7", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify({
          segment_name: segmentName,
          schema: schemaData,
        }),
      });

      setSegmentName("");
      setSelectFields([{ id: uuidv4(), value: "" }]);
    } else {
      setErrMsg(true);
    }
  };

  return (
    <Box sx={{ width: { xs: 250, md: 500, xl: 750 } }} role="presentation">
      <div className="d-flex flex-column justify-content-between vh-100">
        <div>
          <div className="d-flex justify-content-start align-items-center py-3 popup-header">
            <IconButton onClick={toggleDrawer(false)}>
              <ArrowBackIosNewIcon className="text-white" />
            </IconButton>
            <span className="h4 mb-1 p-1 w-100 text-white text-center">
              Saving Segment
            </span>
          </div>
          <div className="p-4">
            <div className="d-flex flex-column input-con mb-4">
              <label htmlFor="name-segment" className="mb-3 fw-bolder">
                Enter the Name of the Segment
              </label>
              <TextField
                id="name-segment"
                placeholder="Name of the segment"
                variant="outlined"
                className="mb-4"
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
              />
              <p className="fw-semibold">
                To save your segment, you need to add the schemas to build the
                query
              </p>
            </div>

            {selectFields.map((seletField) => (
              <AddSegmentSelect
                list={listData}
                currentField={seletField}
                alreadySelectedField={selectFields}
                handleChangeSelect={handleChangeSelect}
                removeField={handleRemoveFields}
              />
            ))}

            {listData.length > selectFields.length && <div>
              <Link
                component="button"
                underline="always"
                className="ms-2"
                onClick={handleAddFields}
              >
                +Add new schema
              </Link>
            </div>}
          </div>
        </div>

        <div className="p-4">
          {errMsg && <p className="ms-4 text-danger">Enter the all segment</p>}
          <div className="d-flex flex-column flex-lg-row">
            <Button
              onClick={handleSaveSegment}
              variant="contained"
              className="m-2"
              color="success"
            >
              Save the Segment
            </Button>
            <Button
              onClick={toggleDrawer(false)}
              variant="outlined"
              className="m-2"
              color="error"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default SidePopup;
