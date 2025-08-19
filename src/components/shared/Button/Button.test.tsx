import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Plus } from 'lucide-react';
import { Button } from './index';

describe('Button', () => {
  it('renderiza o children (texto)', () => {
    render(<Button>Salvar</Button>);
    expect(screen.getByText('Salvar')).toBeInTheDocument();
  });

  it('executa onClick quando clicado', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clique</Button>);
    await user.click(screen.getByRole('button', { name: /clique/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renderiza o ícone passado via prop', () => {
    render(<Button icon={Plus}>Adicionar</Button>);
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg?.getAttribute('class')).toMatch(/h-4/);
  });

  it('mostra o spinner e desabilita quando loading=true', () => {
    render(<Button loading>Enviando</Button>);
    const button = screen.getByRole('button');
    const svg = document.querySelector('svg');
    expect(button).toBeDisabled();
    expect(svg?.getAttribute('class')).toMatch(/animate-spin/);
  });

  it('fica desabilitado quando disabled=true', () => {
    render(<Button disabled>Desabilitado</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  const variantExpectations = {
    emerald: /bg-emerald-600/,
    blue: /bg-blue-600/,
    red: /bg-red-600/,
    neutral: /border-zinc-300/,
  } as const;

  type Variant = keyof typeof variantExpectations;

  it.each(Object.entries(variantExpectations))(
    'aplica a classe correta para variant="%s"',
    (variant, expectedRegex) => {
      render(<Button variant={variant as Variant}>{variant}</Button>);
      const button = screen.getByRole('button', { name: variant });
      expect(button.getAttribute('class')).toMatch(expectedRegex);
    }
  );

  const sizeExpectations = {
    sm: /px-3 py-1/,
    md: /px-4 py-2/,
    lg: /px-5 py-3/,
  } as const;

  type Size = keyof typeof sizeExpectations;

  it.each(Object.entries(sizeExpectations))(
    'aplica a classe correta para size="%s"',
    (size, expectedRegex) => {
      render(<Button size={size as Size}>{size}</Button>);
      const button = screen.getByRole('button', { name: size });
      expect(button.getAttribute('class')).toMatch(expectedRegex);
    }
  );
});
