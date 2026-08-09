# Brainly on Kubernetes (Docker Desktop / kind)

## 1. Where these go

Copy the whole `k8s` folder into your project root:
```
Brainly/
├── Brainly-Backend/
├── Brainly-Main-Frontend/
├── docker-compose.yml
└── k8s/
    ├── secret.yaml
    ├── mongo-deployment.yaml
    ├── mongo-service.yaml
    ├── backend-deployment.yaml
    ├── backend-service.yaml
    ├── frontend-deployment.yaml
    └── frontend-service.yaml
```

## 2. Apply everything

From the `Brainly` root:
```powershell
kubectl apply -f k8s/
```

This creates all 8 objects (1 secret, 2 deployments+PVC for mongo, 3 services... etc.) in one shot.

## 3. Watch it come up

```powershell
kubectl get pods
```
Wait until all 3 pods (mongo, backend, frontend) show `STATUS: Running`. First run can take a minute while Docker Desktop pulls `ankushdevopsleopard/brainly-backend` and `ankushdevopsleopard/brainly-frontend` from Docker Hub.

If a pod is stuck in `ImagePullBackOff` or `ErrImagePull`, check the exact error with:
```powershell
kubectl describe pod <pod-name>
```

## 4. Check the services

```powershell
kubectl get svc
```
You should see `frontend` with an `EXTERNAL-IP` of `localhost` (Docker Desktop maps LoadBalancer to localhost automatically).

## 5. Open the app

```
http://localhost:8080
```

Try signing up / signing in / adding content — this confirms frontend → backend → mongo are all talking to each other correctly inside the cluster.

## 6. Useful commands while debugging

```powershell
kubectl logs deployment/backend        # see backend logs
kubectl logs deployment/frontend       # see frontend/nginx logs
kubectl get pods                       # check status of everything
kubectl delete -f k8s/                 # tear it all down
```

## 7. Notes on what each file does

- **secret.yaml** — holds `MONGO_URI` and `JWT_SECRET` as a Kubernetes Secret instead of plain env vars in the deployment YAML
- **mongo-deployment.yaml** — runs MongoDB with a PersistentVolumeClaim so data survives pod restarts
- **mongo-service.yaml** — internal-only ClusterIP so only backend can reach Mongo, never exposed outside the cluster
- **backend-deployment.yaml** — pulls your pushed image from Docker Hub, injects secrets as env vars
- **backend-service.yaml** — internal-only ClusterIP; the frontend's nginx proxies `/api/` here (same pattern as your Docker Compose setup)
- **frontend-deployment.yaml** — pulls your pushed frontend image
- **frontend-service.yaml** — LoadBalancer, the only publicly reachable piece — this is what a real production setup looks like (only the frontend is exposed)

## 8. Next step: Helm chart

Once this is confirmed working, we'll convert these static YAML files into a proper **Helm chart** with a `values.yaml` — this is what makes it reusable/configurable and is a stronger resume signal than raw manifests. After that: push the chart to a Git repo and connect ArgoCD.
