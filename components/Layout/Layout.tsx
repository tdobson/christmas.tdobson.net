import { AppShell, Burger, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCalendar, IconGift, IconHome } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function Layout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter();

  const links = [
    { icon: IconHome, label: 'Home', href: '/' },
    { icon: IconGift, label: 'James List', href: '/james-list' },
    { icon: IconGift, label: 'Adults List', href: '/adults-list' },
    { icon: IconCalendar, label: 'Schedule', href: '/schedule' },
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
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <h1>Christmas 2024</h1>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {links.map((link) => (
          <NavLink
            key={link.href}
            component={Link}
            href={link.href}
            label={link.label}
            leftSection={<link.icon size="1rem" stroke={1.5} />}
            active={router.pathname === link.href}
          />
        ))}
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
