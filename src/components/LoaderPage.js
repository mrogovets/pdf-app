import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { ViewerPDF } from "./ViewerPDF";
import { Divider, InputLabel, MenuItem, Select } from "@material-ui/core";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import { base64string } from "../pdf-file/pdf";

export const LoaderPage = () => {
  const [pathPDF, setPathPDF] = useState(null);
  const [selectedFilePdf, setSelectedFilePdf] = useState(null);

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: "none",
    },
  }));

  const classes = useStyles();

  const loadFilePdf = (event) => {
    if (event.target.files[0]) {
      const output = document.getElementById("contained-button-file");
      output.src = URL.createObjectURL(event.target.files[0]);
      setPathPDF(output.src);
    } else return;
    setSelectedFilePdf(event.target.files[0]);
  };

  const base64ToBlobe = () => {
    const byteString = window.atob(base64string);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: "application/pdf" });
    // console.log(blob);
    return blob;
  };

  return (
    <div>
      <div className="section">
        {/* -------Uploader Pdf--------------- */}
        <input
          accept="application/pdf"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={(event) => loadFilePdf(event)}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Open PDF File in this Page
          </Button>
        </label>

        <Button
          variant="contained"
          color="primary"
          component="span"
          style={{
            marginLeft: "10px",
            marginRight: "10px",
          }}
          onClick={() => {
            const blob = base64ToBlobe();
            const url = URL.createObjectURL(blob);
            setPathPDF(url);
            // console.log(window.open(url, "_blank"));
          }}>
          Open PDF.JS
        </Button>
        {/* ---------------------------------------- */}
        <div>
          <InputLabel id="label">Scale</InputLabel>
          <Select labelId="label" id="select" value={1}>
            <MenuItem value={0.5}>0.5</MenuItem>
            <MenuItem value={1}>1.0</MenuItem>
            <MenuItem value={1.5}>1.5</MenuItem>
            <MenuItem value={2}>2.0</MenuItem>
            <MenuItem value={2.5}>2.5</MenuItem>
            <MenuItem value={3}>3.0</MenuItem>
          </Select>
        </div>
        <div>
          <ViewerPDF pathPDF={pathPDF} className="viewerPdf" />
        </div>
      </div>
    </div>
  );
};
