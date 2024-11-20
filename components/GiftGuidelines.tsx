import { Alert, List } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import React from "react";

export function GiftGuidelines() {
	return (
		<Alert
			icon={<IconAlertCircle size="1rem" />}
			title="Gift-Giving Guidelines"
			color="blue"
		>
			<List>
				<List.Item>Second-hand items are welcomed and encouraged</List.Item>
				<List.Item>Practical/useful items preferred over decorative</List.Item>
				<List.Item>
					Help with tasks/time is often more valuable than physical items
				</List.Item>
				<List.Item>
					Consider helping with research/planning when giving money towards
					items
				</List.Item>
			</List>
		</Alert>
	);
}
