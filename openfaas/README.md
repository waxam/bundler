# Openfaas

## Installation

* note: if running locally then omit the --loader-balancer flag

```bash
arkade install openfaas --load-balancer
```

Install the ingress

```bash
kubectl apply -f deployment.yml
```

Visit http://fn.bundler.heymp.com