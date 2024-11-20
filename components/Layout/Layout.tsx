import { AppShell, Burger, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCalendar, IconGift, IconHome } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const colors = {
  home: '#228BE6',    // blue
  gift: '#40C057',    // green
  calendar: '#E64980' // pink
};

export function Layout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle, close }] = useDisclosure();
  const router = useRouter();

  const links = [
    { icon: IconHome, label: 'Home', href: '/', color: colors.home },
    { icon: IconGift, label: 'James List', href: '/james-list', color: colors.gift },
    { icon: IconGift, label: 'Tim List', href: '/tim-list', color: colors.gift },
    { icon: IconGift, label: 'Jen List', href: '/jen-list', color: colors.gift },
    { icon: IconCalendar, label: 'Schedule', href: '/schedule', color: colors.calendar },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px={{ base: 'md', sm: 'xl' }} align="center">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <h1 style={{ margin: 0 }}>Christmas 2024 ⛄</h1>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {links.map((link) => (
          <NavLink
            key={link.href}
            component={Link}
            href={link.href}
            label={link.label}
            leftSection={<link.icon size="1.2rem" stroke={1.5} style={{ color: link.color }} />}
            active={router.pathname === link.href}
            onClick={() => close()}
            styles={(theme) => ({
              root: {
                '&[data-active]': {
                  backgroundColor: theme.fn.rgba(link.color, 0.1),
                },
              },
              label: {
                fontSize: '1.1rem',
              }
            })}
          />
        ))}
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
