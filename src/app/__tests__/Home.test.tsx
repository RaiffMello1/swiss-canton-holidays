import React from "react";
import { render } from "@testing-library/react";
import Home from "../Home";

describe("Home Component", () => {
  // Test to verify that the home renders initially
  test("renders Home", () => {
    render(<Home />);
  });
});
