import * as core from '@actions/core';
import { PubSub } from '@google-cloud/pubsub';
import { deleteTopic } from './pubsub';

async function run(): Promise<void> {
  try {
    // Get inputs
    const projectId = core.getInput('project-id', { required: true });
    const topicName = core.getInput('topic-name', { required: true });

    core.info('GCP Pub/Sub Delete Topic');
    core.info(`Project ID: ${projectId}`);
    core.info(`Topic: ${topicName}`);

    // Create Pub/Sub client
    const pubsub = new PubSub({ projectId });

    // Delete topic
    const result = await deleteTopic(pubsub, topicName);

    // Handle result
    if (!result.success) {
      throw new Error(result.error || 'Failed to delete topic');
    }

    // Summary
    core.info('');
    core.info('='.repeat(50));
    core.info('Topic deleted successfully');
    core.info('='.repeat(50));

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    core.setFailed(errorMessage);
  }
}

run();
