import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("render without crashing", function () {
    render(<Carousel />);
});

it("matches snapshot", function () {
    const { asFragment } = render(<Carousel />);
    expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
    const { queryTestById, queryByAltText } = render(<Carousel />);

    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

    const rightArrow = queryTestById("right-arrow");
    fireEvent.click(rightArrow);

    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("hides and shows arrows appropriately", function () {
    const { getByTestId } = render(<Carousel />);
    const leftArrow = getByTestId("left-arrow");
    const rightArrow = getByTestId("right-arrow");

    expect(leftArrow).toHaveClass("hidden");
    expect(rightArrow).not.toHaveClass("hidden");

    fireEvent.click(getByTestId("right-arrow"));
    expect(leftArrow).not.toHaveClass("hidden");
    expect(rightArrow).not.toHaveClass("hidden");

    fireEvent.click(rightArrow);
    expect(leftArrow).not.toHaveClass("hidden");
    expect(rightArrow).toHaveClass("hidden");
});

it("works when you click on the left arrow", function () {
    const { getByTestId, queryByAltText } = render(<Carousel />);
    const leftArrow = getByTestId("left-arrow");
    const rightArrow = getByTestId("right-arrow");

    fireEvent.click(rightArrow);

    fireEvent.click(leftArrow);
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});