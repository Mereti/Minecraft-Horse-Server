import Register from "./Register";
import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";



describe('Validation of email input', () => {
    it("renders component", async () => {
        const { getByText } = render(<Register />);
        expect(getByText("Zarejestruj")).toBeInTheDocument();
    });

    it("Should validate wrong email address", async () => {
        const { getByLabelText, getByText, debug } = render(<Register />);
        const input = getByLabelText("email-input");
        fireEvent.change(input, { target: { value: "wrongEmailAdress" } });
        const output = getByLabelText("email-label")
        expect(output).toHaveTextContent('Podany email jest nieprawidłowy');
    });
    it("Should validate empty email address", async () => {
        const { getByLabelText, getByText, debug } = render(<Register />);
        const input = getByLabelText("email-input");
        fireEvent.change(input, { target: { value: "a" } });
        fireEvent.change(input, { target: { value: "" } });
        const output = getByLabelText("email-label")
        expect(output).toHaveTextContent('Podany email jest nieprawidłowy');
    });

    it("Should validate correct email address", async () => {
        const { getByLabelText, getByText, debug } = render(<Register />);
        const input = getByLabelText("email-input");
        fireEvent.change(input, { target: { value: "zekse00@gmail.com" } });
        const output = getByLabelText("email-label")
        expect(output).toHaveTextContent('');
    });
});

