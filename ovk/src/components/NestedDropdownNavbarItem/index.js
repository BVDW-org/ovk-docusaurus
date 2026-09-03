import React, {useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';

// Two-level navbar dropdown ("custom-nestedDropdown"). Docusaurus's built-in
// dropdown supports exactly one level of children, so this component renders
// the nested Werbeformen menu produced by scripts/werbeformen-routes.mjs:
// desktop gets hover flyouts, the mobile drawer gets collapsible sub-lists.
// Registered in src/theme/NavbarItem/ComponentTypes.js.

function isActive(pathname, to) {
  return pathname === to;
}

function containsActive(items, pathname) {
  return items.some(
    (item) =>
      (item.to && isActive(pathname, item.to)) ||
      (item.items && containsActive(item.items, pathname)),
  );
}

function DesktopNestedDropdown({label, to, items}) {
  const {pathname} = useLocation();
  const sectionActive = pathname === to || pathname.startsWith(`${to}/`);

  return (
    <div className="navbar__item dropdown dropdown--hoverable">
      <Link
        className={clsx('navbar__link', sectionActive && 'navbar__link--active')}
        to={to}>
        {label}
      </Link>
      <ul className="dropdown__menu dropdown__menu--allow-flyout">
        {items.map((item) =>
          item.items ? (
            <li key={item.label} className="dropdown__item--nested">
              {item.to ? (
                <Link
                  className="dropdown__link dropdown__link--nested-parent"
                  to={item.to}>
                  {item.label}
                </Link>
              ) : (
                <button
                  type="button"
                  aria-haspopup="menu"
                  className="dropdown__link dropdown__link--nested-parent">
                  {item.label}
                </button>
              )}
              <ul className="dropdown__menu dropdown__menu--flyout">
                {item.items.map((child) => (
                  <li key={child.to}>
                    <Link className="dropdown__link" to={child.to}>
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li key={item.to}>
              <Link className="dropdown__link" to={item.to}>
                {item.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

function CollapsibleRow({label, to, open, onToggle, children}) {
  return (
    <li className={clsx('menu__list-item', !open && 'menu__list-item--collapsed')}>
      <div className="menu__list-item-collapsible">
        {to ? (
          <Link className="menu__link" to={to}>
            {label}
          </Link>
        ) : (
          <span
            className="menu__link"
            role="button"
            tabIndex={0}
            onClick={onToggle}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onToggle();
              }
            }}>
            {label}
          </span>
        )}
        <button
          type="button"
          aria-label={`Untermenü ${label} ${open ? 'einklappen' : 'ausklappen'}`}
          aria-expanded={open}
          className="clean-btn menu__caret"
          onClick={onToggle}
        />
      </div>
      {open && <ul className="menu__list">{children}</ul>}
    </li>
  );
}

function MobileLeafLink({item, pathname}) {
  return (
    <li className="menu__list-item">
      <Link
        className={clsx(
          'menu__link',
          isActive(pathname, item.to) && 'menu__link--active',
        )}
        to={item.to}>
        {item.label}
      </Link>
    </li>
  );
}

function MobileSubmenu({item, pathname}) {
  const [open, setOpen] = useState(
    () => containsActive(item.items, pathname) || isActive(pathname, item.to),
  );
  return (
    <CollapsibleRow
      label={item.label}
      to={item.to}
      open={open}
      onToggle={() => setOpen((value) => !value)}>
      {item.items.map((child) => (
        <MobileLeafLink key={child.to} item={child} pathname={pathname} />
      ))}
    </CollapsibleRow>
  );
}

function MobileNestedDropdown({label, to, items}) {
  const {pathname} = useLocation();
  const [open, setOpen] = useState(
    () => containsActive(items, pathname) || isActive(pathname, to),
  );
  return (
    <CollapsibleRow
      label={label}
      to={to}
      open={open}
      onToggle={() => setOpen((value) => !value)}>
      {items.map((item) =>
        item.items ? (
          <MobileSubmenu key={item.label} item={item} pathname={pathname} />
        ) : (
          <MobileLeafLink key={item.to} item={item} pathname={pathname} />
        ),
      )}
    </CollapsibleRow>
  );
}

export default function NestedDropdownNavbarItem({
  mobile = false,
  position: _position,
  className: _className,
  ...props
}) {
  return mobile ? (
    <MobileNestedDropdown {...props} />
  ) : (
    <DesktopNestedDropdown {...props} />
  );
}
