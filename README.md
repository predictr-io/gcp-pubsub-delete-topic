# GCP Pub/Sub Delete Topic Action

Delete Google Cloud Pub/Sub topics.

## Features

- ✅ Delete Pub/Sub topics by name
- ✅ Simple and straightforward operation
- ✅ Full validation and error handling

## Usage

### Basic Example

```yaml
- name: Delete Pub/Sub Topic
  uses: predictr-io/gcp-pubsub-delete-topic@v1
  with:
    project-id: 'my-gcp-project'
    topic-name: 'events-topic'
```

### Complete Example

```yaml
- name: Authenticate to Google Cloud
  uses: google-github-actions/auth@v2
  with:
    credentials_json: ${{ secrets.GCP_CREDENTIALS }}

- name: Delete Pub/Sub Topic
  uses: predictr-io/gcp-pubsub-delete-topic@v1
  with:
    project-id: 'my-gcp-project'
    topic-name: 'temporary-events-topic'
```

### In Cleanup Job

```yaml
jobs:
  cleanup:
    runs-on: ubuntu-latest
    if: always()
    steps:
      - uses: google-github-actions/auth@v2
        with:
          credentials_json: ${{ secrets.GCP_CREDENTIALS }}

      - name: Delete Test Topic
        uses: predictr-io/gcp-pubsub-delete-topic@v1
        with:
          project-id: 'my-gcp-project'
          topic-name: 'test-events-${{ github.run_id }}'
```

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `project-id` | GCP project ID | Yes | - |
| `topic-name` | Pub/Sub topic name | Yes | - |

## Authentication

This action requires GCP authentication. Use the `google-github-actions/auth` action:

```yaml
- uses: google-github-actions/auth@v2
  with:
    credentials_json: ${{ secrets.GCP_CREDENTIALS }}
```

## Required GCP Permissions

The service account needs:
- `pubsub.topics.delete`

Or the role: `roles/pubsub.editor`

## Notes

- Deleting a topic will also delete all subscriptions attached to it
- This operation cannot be undone
- If the topic doesn't exist, the action will fail

## License

MIT
