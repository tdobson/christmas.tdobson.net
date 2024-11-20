import {
	Alert,
	Button,
	Card,
	Paper,
	SimpleGrid,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import {
	IconAlertCircle,
	IconArmchair,
	IconBabyCarriage,
	IconBan,
	IconBook,
	IconBook2,
	IconCertificate,
	IconDeviceFloppy,
	IconDeviceTv,
	IconDevices,
	IconGift,
	IconHeadphones,
	IconHeart,
	IconHeartHandshake,
	IconHome,
	IconJacket,
	IconLine,
	IconLink,
	IconMap,
	IconMoodSmile,
	IconMountain,
	IconPhoto,
	IconPlant,
	IconPlug,
	IconRobot,
	IconStar,
	IconSteeringWheel,
	IconSwimming,
	IconTools,
	IconUsb,
	IconUsers,
	IconWood,
} from "@tabler/icons-react";
import React from "react";

export type { GiftData, Category, GiftItem, IconName };

// Type definitions
interface Category {
	title: string;
	icon: IconName;
	color: string;
}

interface GiftItem {
	name: string;
	shortDescription?: string;
	longDescription?: string;
	category: string;
	icon: IconName;
	url: string;
}

interface GiftData {
	categories: Record<string, Category>;
	items: GiftItem[];
	doNotBuy?: string[];
	notes?: {
		checkFirst?: string;
		bookNote?: string;
		wishlistUrl?: string;
	};
}

type IconName = keyof typeof iconComponents;

// Icon mapping
const iconComponents = {
	IconStar,
	IconTools,
	IconHeart,
	IconMountain,
	IconBook,
	IconArmchair,
	IconMap,
	IconCertificate,
	IconPlug,
	IconSwimming,
	IconUsb,
	IconDeviceFloppy,
	IconHeadphones,
	IconLine,
	IconLink,
	IconJacket,
	IconBook2,
	IconRobot,
	IconBabyCarriage,
	IconPhoto,
	IconWood,
	IconMoodSmile,
	IconSteeringWheel,
	IconDeviceTv,
	IconGift,
	IconPlant,
	IconUsers,
	IconDevices,
	IconHeartHandshake,
	IconHome,
};

interface GiftListProps {
	giftData: GiftData;
}

export function GiftList({ giftData }: GiftListProps) {
	// Group items by category
	const itemsByCategory = giftData.items.reduce(
		(acc, item) => {
			if (!acc[item.category]) {
				acc[item.category] = [];
			}
			acc[item.category].push(item);
			return acc;
		},
		{} as Record<string, GiftItem[]>,
	);

	return (
		<Stack gap="sm">
			{giftData.notes?.checkFirst && (
				<Alert
					icon={<IconAlertCircle size="1rem" />}
					title="Can we help?"
					color="orange"
				>
					{giftData.notes.checkFirst}
				</Alert>
			)}

			<Card withBorder>
				<Stack gap="sm">
					{Object.entries(giftData.categories).map(
						([categoryKey, category]) => {
							const items = itemsByCategory[categoryKey] || [];
							const IconComponent = iconComponents[category.icon as IconName];

							return (
								<React.Fragment key={categoryKey}>
									<Title order={3}>{category.title}</Title>
									<SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="sm">
										{items.map((item) => {
											const ItemIcon = iconComponents[item.icon as IconName];
											const content = (
												<Paper
													shadow="xs"
													p="md"
													withBorder
													style={{
														cursor: item.url ? "pointer" : "default",
														height: "100%",
														display: "flex",
														flexDirection: "column",
														gap: "0.5rem",
														transition:
															"transform 0.2s ease, box-shadow 0.2s ease",
														":hover": item.url
															? {
																	transform: "translateY(-2px)",
																	boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
																}
															: undefined,
													}}
												>
													<div
														style={{
															display: "flex",
															alignItems: "center",
															gap: "0.5rem",
														}}
													>
														<ItemIcon
															size="1.2rem"
															style={{ color: category.color }}
														/>
														<Text fw={500} size="lg">
															{item.name}
														</Text>
													</div>

													{item.shortDescription && (
														<Text size="sm" c="dimmed">
															{item.shortDescription}
														</Text>
													)}

													{item.longDescription && (
														<Text size="xs" c="dimmed">
															{item.longDescription}
														</Text>
													)}

													{item.url && (
														<Text size="xs" c="blue" mt="auto">
															Click to view →
														</Text>
													)}
												</Paper>
											);

											return (
												<div key={item.name}>
													{item.url ? (
														<a
															href={item.url}
															target="_blank"
															rel="noopener noreferrer"
															style={{ textDecoration: "none" }}
														>
															{content}
														</a>
													) : (
														content
													)}
												</div>
											);
										})}
									</SimpleGrid>
								</React.Fragment>
							);
						},
					)}

					{giftData.notes?.bookNote && (
						<Alert
							icon={<IconAlertCircle size="1rem" />}
							title="Note"
							color="blue"
						>
							<Stack gap="xs">
								<Text size="sm">{giftData.notes.bookNote}</Text>
								{giftData.notes.wishlistUrl && (
									<div style={{ display: "inline-block" }}>
										<Button
											component="a"
											href={giftData.notes.wishlistUrl}
											target="_blank"
											rel="noopener noreferrer"
											variant="light"
											size="sm"
											leftSection={<IconGift size="1rem" />}
										>
											View Amazon Wishlist
										</Button>
									</div>
								)}
							</Stack>
						</Alert>
					)}
				</Stack>
			</Card>

			{giftData.doNotBuy && (
				<Card withBorder>
					<Stack gap="sm">
						<Title order={2} c="red">
							Please Do Not Buy
						</Title>
						<SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="sm">
							{giftData.doNotBuy.map((item) => (
								<Paper
									key={item}
									shadow="xs"
									p="md"
									withBorder
									style={{
										display: "flex",
										alignItems: "center",
										gap: "0.5rem",
									}}
								>
									<IconBan size="1.2rem" style={{ color: "#FA5252" }} />
									<Text>{item}</Text>
								</Paper>
							))}
						</SimpleGrid>
					</Stack>
				</Card>
			)}
		</Stack>
	);
}
