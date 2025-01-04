import { css } from "lit";

export default css`
  :host {
    display: block;
    width: 100%;
    box-sizing: border-box;
  }

  .nv-spool {
    background: #232323;
    width: 15%;
    height: 100%;
  }

  .nv-spool-container {
    background: #686868;
    padding: 15% 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    box-sizing: border-box;
  }

  .nv-string-roll {
    position: relative;
    width: 100%; /* Width of the roll */
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #4160bf;
    flex-grow: 1;
    box-sizing: border-box;
  }

  .nv-string-layer {
    position: absolute;
    width: 2px; /* Thickness of each vertical string line */
    height: 100%; /* Full height of the roll */
    background-color: rgba(0, 0, 0, 0.5);
  }

  .nv-reflection {
    width: 100%;
    height: 100%;
    animation: lightReflection 3s linear infinite; /* Animation for the moving light reflection */
  }

  @keyframes lightReflection {
    0% {
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) 10%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0) 90%
      );
      background-size: 100% 50%;
      background-position: 0 0;
    }
    50% {
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) 10%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0) 90%
      );
      background-size: 100% 100%;
      background-position: 0 50%;
    }
    100% {
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) 10%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0) 90%
      );
      background-size: 100% 50%;
      background-position: 0 100%;
    }
  }

  .string-roll-container {
    max-height: 100%;
    min-height: 10%;
    height: 100%;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
