import { Alert, Card, List, Stack, Text, Title } from "@mantine/core";
import { GiftGuidelines } from '../components/GiftGuidelines';
import {
	IconAlertCircle,
	IconBan,
	IconGift,
	IconStar,
} from "@tabler/icons-react";
import React from "react";

export default function JamesListPage() {
	const priorityItems = [
		"Teeny weenie balance bike (smallest available size - for height 85-95cm)",
		"Thicker foam/rubber play mat for safety under climbing areas",
		"Kids' food preparation knives",
		"Animal posters for his room (especially dogs)",
		"Number floor tiles/mats",
		"Baby listener/monitor",
	];

	const otherItems = [
		"Warm boots (size 4-4.5)",
		"Climbing harness (Edelrid model)",
		"Small buoyancy aid for swimming",
		"Orange(s) for Christmas stocking",
		"Flyaway footballs",
	];

	const doNotBuy = [
		"Clothes (except specified boots)",
		"Coats",
		"Wellies",
		"Books",
		"Media",
		"Dummies",
		"Duplo/Lego (have plenty)",
		"Chocolate/sweets",
	];

	return (
		<Stack gap="md">
			<Title order={1}>James's Christmas List</Title>

			<Alert
				icon={<IconAlertCircle size="1rem" />}
				title="Important Note"
				color="red"
			>
				Please check with parents before purchasing to avoid duplicates
			</Alert>

			<GiftGuidelines />

			<Card withBorder>
				<Stack gap="sm">
					<Title order={2}>Priority Items</Title>
					<List
						spacing="xs"
						size="sm"
						center
						icon={<IconBan size="1rem" style={{ color: "#FA5252" }} />}
					>
						{priorityItems.map((item) => (
							<List.Item key={item}>{item}</List.Item>
						))}
					</List>
				</Stack>
			</Card>

			<Card withBorder>
				<Stack gap="sm">
					<Title order={2}>Other Items</Title>
					<List
						spacing="xs"
						size="sm"
						center
						icon={<IconGift size="1rem" style={{ color: "#40C057" }} />}
					>
						{otherItems.map((item) => (
							<List.Item key={item}>{item}</List.Item>
						))}
					</List>
				</Stack>
			</Card>

			<Card withBorder>
				<Stack gap="sm">
					<Title order={2} c="red">
						Please Do Not Buy
					</Title>
					<List>
						{doNotBuy.map((item) => (
							<List.Item key={item}>{item}</List.Item>
						))}
					</List>
				</Stack>
			</Card>
		</Stack>
	);
}
