import { Alert, List } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useGuidelines } from "../contexts/GuidelinesContext";

export function GiftGuidelines() {
	const { isGuidelinesDismissed, dismissGuidelines } = useGuidelines();

	if (isGuidelinesDismissed) {
		return null;
	}

	return (
		<Alert
			icon={<IconAlertCircle size="1rem" />}
			title="Gift-Giving Guidelines"
			color="blue"
			withCloseButton
			onClose={dismissGuidelines}
		>
			<List>
				<List.Item>
					Please don't feel any obligation to give gifts - your presence is valued above presents.
				</List.Item>
				<List.Item>
					This list is intended as a helpful guide - we'd love to be surprised with
					unexpected and thoughtful gifts we couldn't have imagined
				</List.Item>
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
