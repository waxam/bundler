# Bundler Monorepo

## Hasura

## Making Changes to the Hasura Database

Against a development environment, NEVER AGAINST PRODUCTION, run the hasura console command. This will setup a proxy server to allow you to track all changes made in the Hasura console as migrations in your local `hasura/migrations` directory

```bash
hasura console --admin-secret <admin-secret> --endpoint <endpoint_url>
```

Verify that migrations are on by visiting `http://localhost:9695/data/migrations`.

### Updating Hasura Deployment

```bash
hasura migrate apply --admin-secret <admin-secret> --endpoint <endpoint_url>
```

### Droping Hasura Database and starting fresh

Reset the database to a fresh installation.  If the database has new login credentials then update the `HASURA_GRAPHQL_DATABASE_URL` secret in the secret deployment.

Then all we need to do is drop the existing Hasura pod and rerun the migrations.

```bash
kubectl delete pod -l app=hasura
```

Once the pod comes online, which should be in a few seconds, apply the migrations.

```
cd hasura
hasura migrate apply --admin-secret <admin-secret> --endpoint <endpoint_url>
```

## K8s Production Install

These are instructions for installing on a fresh k8s cluster.

Install basic stuff
```
arkade install nginx-ingress
arkade install minio
```

Apply our deployments
```
kubectl apply -f k8s/secrets.yaml
kubectl apply -f minio/deployment.yaml
kubectl apply -f hasura/deployment.yaml
kubectl apply -f runner/deployment.yaml
kubectl apply -f events/deployment.yaml
```