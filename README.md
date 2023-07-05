# React intranet tool

This is the initial project with SSO implemented

## How to install for dev env

1. Clone this repo.
2. Execute `yarn install` or `yarn install --ignore-engines` .
3. Insert the env variables (ask to the team if you don't have the keys).
4. Install IDE extensions
   4.1 Install [prettier extension for VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode 'prettier extension for VSC') or you favorite IDE.
   4.2 Install [Eslint extension for VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint 'Eslint extension for VSCode') or your favorite IDE.
   4.3 (Optional) [Install Error Lens Extension for VSCode](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens 'Install Error Lens Extension for VSCode') to detect errors
5. Execute `nvm use`. This will set up the correct node version. the project needs
6. Execute `yarn dev`.
7. Visit [localhost:3000](http://localhost:3000).

### Prettier and Eslint configuration

---

After download the project and install all the dependencies, it is **_highly recommended relaunch the VS Code editor._** This because sometimes the editor needs to reload the Eslint and Prettier configuration with the latest configuration gotten.

There is a folder inside of the project with the configuration to apply the Eslint and Prettier rules only to the **intranet** project.

This will help to the developers to have the same rules without necessity of do extra configuration in the local environment.

```sh
- .vscode
-- settings.json
```

### Automated Build & Deployment Pipeline

---
Formerly, before the pipelines was completely automated, there was a way to execute manual deployments, this is no longer available. Although this are the parameters needed in case in the future the pipeline is overriden.

To deploy on `QA` the following variables needs to be provided:
   `DEPLOY_ENV: qa`

To deploy on `PROD` the following variables needs to be provided:
   `DEPLOY_ENV: prod`
   `CONTEXT: intranet`

The pipeline consist in 2 stages: build & deploy.

Build will only be executed for develop, release* and main branches. Deploy stage will be executed accordingly (branch: env):

`develop: dev`
`release*: qa`
`main: prod`

The pipeline will build an image from commands declared in `Dockerfile` and then will be installed with helm in the proper Kubernetes Cluster.

For lower environments (dev & qa) there is a single node k3s cluster, hosted in a Compute VM([k3s-intranet-project](https://console.cloud.google.com/compute/instancesDetail/zones/us-central1-a/instances/k3s-intranet-project?project=dulcet-timing-350417 'k3s-intranet-project')) in workspaceone GCP project.

For production environment (prod) there is a 3 node GKE cluster ([distillery-intranet-k8s-prd](https://console.cloud.google.com/kubernetes/clusters/details/us-east1-b/distillery-intranet-k8s-prd/details?project=intranet-359916 'distillery-intranet-k8s-prd')), hosted in intranet GCP project.

To connect to both clusters it is necessary to use provided kubeconfig in `DevOps/config-intranet.yml` and installing `google-cloud-sdk` cask on Brew (or preferred package manager).

### Cluster Troubleshooting

For prod cluster, sometimes when main branch registers a MR and pipeline is executed, at deploy stage there is a phase where the ingress controller (GCP Load Balancer) is re-created but GCP executes deletion and takes too much time, while is still deleting the resource, helm try to create again the ingress controller resulting in "deployed" state but internally on GCP the GKE cluster does not have any created ingress controller. This is solved re-executing only Deploy stage in the pipeline manually in the job page.

