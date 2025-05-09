import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import HolidaysService from "../api/holidays";
import userEvent from "@testing-library/user-event";
import Home from "../Home";

jest.mock("../api/holidays", () => ({
  __esModule: true,
  default: {
    getHolidays: jest.fn().mockReturnValue(Promise.resolve([])),
  },
}));

const mockHolidays = [
  {
    id: "easter-monday",
    startDate: "2025-04-21",
    name: [{ text: "Easter Monday", locale: "en" }],
    nationwide: true,
    subdivisions: [],
  },
  {
    id: "labour-day",
    startDate: "2025-05-01",
    name: [{ text: "Labour Day", locale: "en" }],
    nationwide: false,
    subdivisions: [{ shortName: "ZH-BE-LU" }, { shortName: "ZH" }],
  },
  {
    id: "berchtoldstag",
    startDate: "2025-01-02",
    name: [{ text: "Berchtoldstag", locale: "en" }],
    nationwide: false,
    subdivisions: [{ shortName: "ZH-BE-LU" }, { shortName: "ZH" }],
  },
];

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (HolidaysService.getHolidays as jest.Mock).mockResolvedValue(mockHolidays);
  });

  test("renders the component correctly", () => {
    render(<Home />);

    expect(screen.getByTestId("home-component")).toBeInTheDocument();
    expect(screen.getByText("Select a Canton:")).toBeInTheDocument();
    expect(screen.getByText("Work Days")).toBeInTheDocument();
    expect(screen.getByTestId("year-input")).toBeInTheDocument();
    expect(screen.getByText(/Enter a year/)).toBeInTheDocument();

    const submitButton = screen.getByText("Get holidays calendar");
    expect(submitButton).toBeDisabled();
  });

  test("validates year input correctly", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const yearInput = screen.getByTestId("year-input");

    await user.clear(yearInput);
    await user.type(yearInput, "2024");
    expect(screen.getByText("Year must be at least 2025")).toBeInTheDocument();

    await user.clear(yearInput);
    await user.type(yearInput, "2031");
    expect(screen.getByText("Year must not exceed 2030")).toBeInTheDocument();

    await user.clear(yearInput);
    await user.type(yearInput, "2025");
    expect(screen.getByText("Valid year: 2025")).toBeInTheDocument();
  });

  test("handles work day selection correctly", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByTestId("check-id-Monday"));
    await user.click(screen.getByTestId("check-id-Friday"));

    expect(screen.getByTestId("check-id-Monday")).toBeChecked();
    expect(screen.getByTestId("check-id-Friday")).toBeChecked();
    expect(screen.getByTestId("check-id-Tuesday")).not.toBeChecked();

    await user.click(screen.getByTestId("check-id-Monday"));
    expect(screen.getByTestId("check-id-Monday")).not.toBeChecked();
    expect(screen.getByTestId("check-id-Friday")).toBeChecked();
  });

  test("selects canton correctly", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const cantonSelect = screen.getByTestId("select-label");
    await user.selectOptions(cantonSelect, "ZH");

    expect(cantonSelect).toHaveValue("ZH");
  });

  test("submits form and displays holiday data when all required fields are filled", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const yearInput = screen.getByTestId("year-input");
    await user.type(yearInput, "2025");

    const cantonSelect = screen.getByTestId("select-label");
    await user.selectOptions(cantonSelect, "ZH");

    await user.click(screen.getByTestId("check-id-Monday"));

    // Submit button should be enabled now
    const submitButton = screen.getByText("Get holidays calendar");
    expect(submitButton).not.toBeDisabled();

    await user.click(submitButton);

    // Verify API was called with correct parameters
    expect(HolidaysService.getHolidays).toHaveBeenCalledWith(2025);

    // Wait for data to be displayed
    await waitFor(() => {
      expect(screen.getByText("Easter Monday")).toBeInTheDocument();
      expect(screen.getByText("Labour Day")).toBeInTheDocument();
      expect(screen.getByText("Berchtoldstag")).toBeInTheDocument();
    });
  });
});
