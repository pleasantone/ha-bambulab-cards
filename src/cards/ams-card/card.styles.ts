import { css } from "lit";

export default css`
  .ams-container {
    height: 100%;
    width: 100%;
    position: relative;
  }

  .ams-tabs {
    background: #e3e1e1;
    border-radius: 5px;
    padding: 5px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    align-content: center;
    gap: 5px;
  }

  .selected {
    outline: 2px solid #05ad42;
    outline-offset: 2px;
  }

  .ams-tabs .spool {
    height: 15px;
    background: white;
    border-radius: 2px;
    z-index: 1;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    overflow: hidden;
    width: 15px;
  }

  .ams-tabs .active-icon {
    border-radius: 20px !important;
    height: 8px !important;
    width: 8px !important;
  }

  .selector {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    align-content: center;
    gap: 10px;
    padding: 10px 0;
  }

  .spool .overlay {
    z-index: 2;
  }

  .ams-container img {
    width: 100%;
    height: auto;
  }

  .ams-container .humidity {
    top: 36%;
    text-align: center;
    font-size: 1em;
    background-color: rgba(0, 0, 0);
    border-radius: 50px;
    padding: 8px;
    pointer-events: none;
    position: absolute;
    z-index: 2;
    left: 90%;
    width: 30px;
  }

  .ams-container .ams-temperature {
    top: 60%;
    text-align: center;
    font-size: 0.6em;
    background-color: rgba(0, 0, 0);
    border-radius: 50px;
    padding: 8px;
    pointer-events: none;
    position: absolute;
    z-index: 2;
    left: 90%;
    width: 30px;
    color: white;
  }

  .ams-container .spool-badge {
    top: 20%;
    text-align: center;
    font-size: 1em;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 50px;
    padding: 8px;
    pointer-events: none;
    position: absolute;
    z-index: 2;
  }

  .slot-1 {
    left: 17%;
  }

  .slot-2 {
    left: 35.5%;
  }

  .slot-3 {
    left: 55.7%;
  }

  .slot-4 {
    left: 75.5%;
  }

  .ams-container .spool-type {
    color: white;
    top: 60%;
    text-align: center;
    padding: 8px;
    font-size: 1em;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 50px;
    pointer-events: none;
    position: absolute;
    z-index: 2;
  }



  .error {
    color: red;
  }
`;
