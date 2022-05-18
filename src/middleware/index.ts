import {
  handleApiDocs,
  handleBodyRequestParsing,
  handleCompression,
  handleCors,
  handleHelmet,
  handlePostGraphile
} from "./common";

export default [
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleHelmet,
  handleApiDocs,
  handlePostGraphile
];
