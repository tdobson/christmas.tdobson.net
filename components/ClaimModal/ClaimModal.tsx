'use client';
import { useState } from 'react';
import {
  Modal,
  Stack,
  Text,
  TextInput,
  Button,
  Alert,
  Loader,
} from '@mantine/core';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import { useClaim } from '@/hooks/useClaim';

interface ClaimModalProps {
  opened: boolean;
  onClose: () => void;
  giftId: string;
  giftName: string;
  recipient: string;
}

export function ClaimModal({
  opened,
  onClose,
  giftId,
  giftName,
  recipient,
}: ClaimModalProps) {
  const [email, setEmail] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { mutate: claim, isPending, error } = useClaim(recipient);

  const handleSubmit = () => {
    claim(
      { giftId, email },
      {
        onSuccess: () => {
          setShowSuccess(true);
          setTimeout(() => {
            handleClose();
          }, 2000);
        },
      }
    );
  };

  const handleClose = () => {
    setEmail('');
    setConfirmed(false);
    setShowSuccess(false);
    onClose();
  };

  const isValidEmail = email.includes('@') && email.includes('.');

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={`Claim: ${giftName}`}
      centered
    >
      <Stack gap="md">
        {showSuccess ? (
          <Alert
            icon={<IconCheck size="1rem" />}
            title="Success!"
            color="green"
          >
            Gift claimed! Others will now see this item as taken.
          </Alert>
        ) : (
          <>
            <Text size="sm">
              Enter your email to claim this gift. This helps us identify who&apos;s
              buying what so we can prevent duplicate purchases.
            </Text>

            <TextInput
              label="Email Address"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              disabled={isPending}
              required
              error={email && !isValidEmail ? 'Please enter a valid email' : null}
            />

            <Alert
              icon={<IconAlertCircle size="1rem" />}
              title="Are you sure?"
              color="blue"
            >
              <Stack gap="xs">
                <Text size="sm">
                  By claiming this gift, you&apos;re committing to purchase it. Others will
                  see it as claimed and won&apos;t buy it.
                </Text>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    disabled={isPending}
                  />
                  <Text size="sm">Yes, I&apos;ll get this gift</Text>
                </label>
              </Stack>
            </Alert>

            {error && (
              <Alert
                icon={<IconAlertCircle size="1rem" />}
                title="Error"
                color="red"
              >
                {error.message}
              </Alert>
            )}

            <Button
              onClick={handleSubmit}
              disabled={!isValidEmail || !confirmed || isPending}
              fullWidth
            >
              {isPending ? (
                <>
                  <Loader size="xs" color="white" style={{ marginRight: '0.5rem' }} />
                  Computing proof of work...
                </>
              ) : (
                'Claim Gift'
              )}
            </Button>
          </>
        )}
      </Stack>
    </Modal>
  );
}
