import { render, screen } from '@testing-library/react';
import KanbanBoard from '../KanbanBoard';

describe('KanbanBoard', () => {
  it('renders all the columns', () => {
    render(<KanbanBoard />);

    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });
});
