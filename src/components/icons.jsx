/** Small inline SVG icon set. All icons are decorative (aria-hidden); buttons carry their own labels. */
const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

const Icon = ({ children, ...props }) => (
  <svg {...base} {...props}>
    {children}
  </svg>
);

export const PencilIcon = (props) => (
  <Icon {...props}>
    <path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3z" />
    <path d="M13.5 8.5l3 3" />
  </Icon>
);

export const TrashIcon = (props) => (
  <Icon {...props}>
    <path d="M4 7h16" />
    <path d="M10 11v6M14 11v6" />
    <path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" />
    <path d="M9 7V4h6v3" />
  </Icon>
);

export const SearchIcon = (props) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M20 20l-4-4" />
  </Icon>
);

export const PlusIcon = (props) => (
  <Icon {...props}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);

export const CloseIcon = (props) => (
  <Icon {...props}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Icon>
);

export const UndoIcon = (props) => (
  <Icon {...props}>
    <path d="M9 14L4 9l5-5" />
    <path d="M4 9h10a6 6 0 0 1 0 12h-3" />
  </Icon>
);

export const SunIcon = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Icon>
);

export const MoonIcon = (props) => (
  <Icon {...props}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" />
  </Icon>
);

export const AlertIcon = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v5M12 16.5v.01" />
  </Icon>
);

/** The FocusList mark: a ring with a filled centre, echoed by the progress ring. */
export const LogoMark = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <rect width="64" height="64" rx="18" fill="var(--accent)" />
    <circle cx="32" cy="32" r="16" fill="none" stroke="var(--accent-ink)" strokeOpacity=".35" strokeWidth="5" />
    <path d="M32 16a16 16 0 0 1 15.2 11" fill="none" stroke="var(--accent-ink)" strokeWidth="5" strokeLinecap="round" />
    <circle cx="32" cy="32" r="5" fill="var(--accent-ink)" />
  </svg>
);

/** Three signal bars; `level` of them are filled. Shape carries meaning too, not just colour. */
export const PriorityBars = ({ level }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
    {[0, 1, 2].map((i) => (
      <rect
        key={i}
        x={1 + i * 4.5}
        y={9 - i * 3.5}
        width="3"
        height={4 + i * 3.5}
        rx="1"
        fill="currentColor"
        opacity={i < level ? 1 : 0.28}
      />
    ))}
  </svg>
);
