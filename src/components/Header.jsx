import { LogoMark } from './icons';
import ThemeToggle from './ThemeToggle';

const dateFormat = new Intl.DateTimeFormat(undefined, {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});

export default function Header({ theme, onToggleTheme }) {
  const now = new Date();

  return (
    <header className="header">
      <div className="brand">
        <LogoMark />
        <h1 className="brand__name">FocusList</h1>
      </div>
      <div className="header__side">
        <time className="header__date" dateTime={now.toISOString().slice(0, 10)}>
          {dateFormat.format(now)}
        </time>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}
