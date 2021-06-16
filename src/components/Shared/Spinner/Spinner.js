import { css } from "@emotion/react";
import React from 'react';
import SyncLoader from "react-spinners/SyncLoader";

const override = css`
  display: block;
  margin: 0 auto;
`;

const Spinner = () => {
    return (
        <div className="d-flex align-items-center mt-5">
            <SyncLoader color='#6f00ff' loading={true} css={override} size={20} />
        </div>
    );
};

export default Spinner;