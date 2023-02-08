API Endpoints
=============

# Users (`/users`)
Users of the system that own & have access to various resources.

# Projects (`/projects`)
The projects hold various details at a high level. This can be thought of as a "repository" in
code hosting platforms.

# Workflows (`/workflows`)
Projects have workspaces that hold the graph representation of a neural network. When executed, a workflow instance is created and executed. A workflow may be composed of many jobs perform various actions.
A workflow `status` represents the overall status of the workflow run.

# Jobs (`/jobs`)
Individual jobs that are dispatched and executed by runners. Jobs can be in one of many states, but a workflow is only marked as completed if all jobs have succeeded or failed.

# Trace (`/traces`)
Jobs may produce log output (aka `traces`). These traces can potentially be displayed when the users
is looking into the details of a job.