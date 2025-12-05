import { describe, it, expect } from 'vitest';
import { SignUpPage } from '../../views/SignUpPage.js';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('SignUpPage', () => {
  it('renders inputs', () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText('Enter your full name')).toBeTruthy();
    expect(screen.getByPlaceholderText('johndoe@gmail.com')).toBeTruthy();
    expect(screen.getByPlaceholderText('minimum 8 characters')).toBeTruthy();
  });
});
