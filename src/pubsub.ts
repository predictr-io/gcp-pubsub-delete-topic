import { PubSub } from '@google-cloud/pubsub';
import * as core from '@actions/core';

export interface DeleteResult {
  success: boolean;
  error?: string;
}

/**
 * Validate topic name format
 */
export function validateTopicName(topicName: string): void {
  if (!topicName || topicName.trim().length === 0) {
    throw new Error('Topic name cannot be empty');
  }

  // Topic names must:
  // - Start with a letter
  // - Contain only letters, numbers, dashes, underscores, periods, tildes, plus, and percent signs
  // - Be between 3 and 255 characters
  const topicPattern = /^[a-zA-Z][a-zA-Z0-9._~+%-]{2,254}$/;
  
  if (!topicPattern.test(topicName)) {
    core.warning(
      `Topic name "${topicName}" does not appear to be a valid Pub/Sub topic name. ` +
      'Expected format: start with a letter, 3-255 characters, containing only letters, numbers, and ._~+%-'
    );
  }
}

/**
 * Delete a Pub/Sub topic
 */
export async function deleteTopic(
  pubsub: PubSub,
  topicName: string
): Promise<DeleteResult> {
  try {
    // Validate input
    validateTopicName(topicName);

    core.info(`Deleting topic: ${topicName}`);

    // Get topic reference and delete
    const topic = pubsub.topic(topicName);
    await topic.delete();

    core.info('✓ Topic deleted successfully');

    return {
      success: true
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    core.error(`Failed to delete topic: ${errorMessage}`);
    return {
      success: false,
      error: errorMessage
    };
  }
}
