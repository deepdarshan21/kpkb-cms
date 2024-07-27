import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Verification from './Verification';

test('renders email input field', () => {
  const { getByPlaceholderText } = render(<Verification />);
  const emailInput = getByPlaceholderText('Email address');
  expect(emailInput).toBeInTheDocument();
});

test('submits form with valid email', async () => {
  const { getByPlaceholderText, getByText } = render(<Verification />);
  const emailInput = getByPlaceholderText('Email address');
  const sendOtpButton = getByText('Send OTP');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.click(sendOtpButton);

  await waitFor(() => {
    expect(alert).toHaveBeenCalledWith('OTP has been sent to E-mail.');
    // You may need to adjust the assertion based on your implementation
    expect(window.location.pathname).toEqual('/otp');
  });
});

test('does not submit form with empty email', () => {
  const { getByText } = render(<Verification />);
  const sendOtpButton = getByText('Send OTP');

  fireEvent.click(sendOtpButton);

  expect(alert).toHaveBeenCalledWith('Please enter your email.');
});

test('does not submit form with invalid email format', () => {
  const { getByPlaceholderText, getByText } = render(<Verification />);
  const emailInput = getByPlaceholderText('Email address');
  const sendOtpButton = getByText('Send OTP');

  fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
  fireEvent.click(sendOtpButton);

  expect(alert).toHaveBeenCalledWith('Please enter a valid email address.');
});
