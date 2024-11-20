import { AppShell, Burger, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCalendar, IconGift, IconHome } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const colors = {
  home: '#228BE6',    // blue
  jamesList: '#228BE6', // blue (from index.tsx)
  timList: '#40C057',   // green (from index.tsx)
  jenList: '#BE4BDB',   // grape (from index.tsx)
  schedule: '#E64980'  // pink
};

export function Layout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle, close }] = useDisclosure();
  const router = useRouter();

  const links = [
    { icon: IconHome, label: 'Home', href: '/', color: colors.home },
    { icon: IconGift, label: 'James List', href: '/james-list', color: colors.jamesList },
    { icon: IconGift, label: 'Tim List', href: '/tim-list', color: colors.timList },
    { icon: IconGift, label: 'Jen List', href: '/jen-list', color: colors.jenList },
    { icon: IconCalendar, label: 'Schedule', href: '/schedule', color: colors.schedule },
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
                  backgroundColor: `${link.color}19`, // Using hex opacity (19 = ~10% opacity)
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
