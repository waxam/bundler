# Bundler Monorepo

## Updating Hasura Deployment

```bash
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