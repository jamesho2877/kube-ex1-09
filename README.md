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


For `Exercise 5.05: Deploy to Serverless`, since the app uses `express-session` so the `curl` command needs to add couple of cookie flags where `-b` instructs `curl` where to store cookies and `-c` for where to read.
```bash
kubectl apply -f manifests/knative-service.yaml

curl -b cookies.txt -c cookies.txt -H "Host: pingpong-knative.default.example.com" http://localhost:8081
```