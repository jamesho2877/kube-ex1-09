# Ping-Pong application

This project includes solutions for the following exercises:

* Exercise 1.09: More services
* Exercise 1.11: Persisting data
* Exercise 2.01: Connecting pods
* Exercise 2.02: Project v1.0 (sync port)
* Exercise 2.03: Keep them separated
* Exercise 2.07: Stateful applications (update)
* Exercise 3.01: Pingpong GKE
* Exercise 3.02: Back to Ingress
* Exercise 3.09: Resource limits
* Exercise 4.01: Readiness Probe
* Exercise 5.05: Deploy to Serverless
* Exercise 5.06: Landscape


For `Exercise 5.05: Deploy to Serverless`, since the app uses `express-session` so the `curl` command needs to add couple of cookie flags where `-b` instructs `curl` where to store cookies and `-c` for where to read.
```bash
kubectl apply -f manifests/knative-service.yaml

curl -b cookies.txt -c cookies.txt -H "Host: pingpong-knative.default.example.com" http://localhost:8081
```


---

## Q/A exersices

### Exercise 5.06: Landscape
- In this course (in `red` rectangle):
  - `helm` to install most of things.
  - `flux` to bootstrap & keep the cluster in sync with the blueprint on github.
  - `contour` as a network layer option when learning & working with `Knative` in the last lesson.
  - `github action` for CI/CD to GKE.
  - `k3s` as a lightweight alternative to `k8s` get started on local machine.
  - `Knative` as a serverless solution on top of `k8s`.
  - `k8s` is not what I was really using but it is what I was here for.
  - `nginx` was used when I worked on `helm` charts in this course before I decided to move to `traefik` eventually.
  - `traefik` was finally used as ingress controller in the `helm` charts for my local services.
  - `linkerd` for setting up a service mesh.
  - `prometheus` for metrics collection
  - `grafana` for metrics visualization
  - `PostgreSQL` for database of Project vX.Y & Ping-Pong apps
- Indirect use (in `pink` rectangle):
  - `k8s` relies upon `etcd` for HA key-value data store.
  - `contour` provides control plane for `envoy` which is the high performance reverse proxy and load balancer.
- Outside of the course (in `light blue` rectangle):
  - Database: `MySQL`, `SQL Server`, `MongoDB`, and `Redis`
  - App Definition & Image build: `Gradle`
  - CI/CD: `Gitlab`
  - Serverless: `AWS Lambda`
  - Scheduling & Orchestration: `Docker Swarm`
  - Platform: `Heroku`, `Portainer.io`

!['Landscape'](image/landscape.jpeg)