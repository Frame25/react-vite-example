import {render, screen} from '@testing-library/react';

import {userModel} from 'entities';

import {PermissionGuard} from '../PermissionGuard';

describe('PermissionGuard', () => {
  it('should render fallback', async () => {
    userModel.login(
      {
        id: 123,
        name: 'Test',
        email: 'test@test.test',
        role_id: 2,
        is_new_customer: true,
        two_factor_paired: true,
      },
      '12345678',
    );

    render(
      <PermissionGuard fallback={<div data-testid="result">fail</div>} roles={[1]}>
        <div data-testid="result">success</div>
      </PermissionGuard>,
    );

    const result = await screen.findByTestId('result');

    expect(result).toHaveTextContent('fail');
  });
});
