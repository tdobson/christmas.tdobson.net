import { Alert, Card, List, Stack, Text, Title } from "@mantine/core";
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
									<List spacing="xs" size="sm" center>
										{items.map((item) => {
											const ItemIcon = iconComponents[item.icon as IconName];
											return (
												<List.Item
													key={item.name}
													icon={
														<ItemIcon
															size="1rem"
															style={{ color: category.color }}
														/>
													}
												>
													{item.url ? (
														<a
															href={item.url}
															target="_blank"
															rel="noopener noreferrer"
														>
															{item.name}
														</a>
													) : (
														item.name
													)}
													{item.shortDescription &&
														` - ${item.shortDescription}`}
													{item.longDescription && (
														<Text size="xs" c="dimmed">
															{item.longDescription}
														</Text>
													)}
												</List.Item>
											);
										})}
									</List>
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
							<Text size="sm">{giftData.notes.bookNote}</Text>
							{giftData.notes.wishlistUrl && (
								<Text size="sm">
									Amazon wishlist:{" "}
									<a
										href={giftData.notes.wishlistUrl}
										target="_blank"
										rel="noopener noreferrer"
									>
										{giftData.notes.wishlistUrl}
									</a>
								</Text>
							)}
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
						<List
							spacing="xs"
							size="sm"
							center
							icon={<IconBan size="1rem" style={{ color: "#FA5252" }} />}
						>
							{giftData.doNotBuy.map((item) => (
								<List.Item key={item}>{item}</List.Item>
							))}
						</List>
					</Stack>
				</Card>
			)}
		</Stack>
	);
}
