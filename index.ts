import * as core from "@actions/core";
import * as github from "@actions/github";
import { IssuesEvent, Label } from "@octokit/webhooks-definitions/schema";
import { Api } from "@octokit/plugin-rest-endpoint-methods/dist-types/types";
import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types";

interface mapping {
  [key: string]: string;
}

function main() {
  const githubToken = core.getInput("githubToken");
  const mapping = getMapping();
  const octokit = github.getOctokit(githubToken);
  const repository = github.context.repo;
  const payload = github.context.payload as IssuesEvent;
  const labels = payload.issue.labels?.map((x: Label) => x?.name);

  const leftovers = getLeftoverLabels(mapping, labels ? labels : []);
  const values = Object.values(leftovers);
  const properties = Object.keys(leftovers);
  /*
  octokit.rest.issues.addLabels({
    owner: repository.owner,
    repo: repository.repo,
    issue_number: payload.issue.number,
    labels: values,
  });*/
  console.log(process.env);
}

function getLeftoverLabels(mapping: mapping, labels: string[]) {
  for (const label of labels) {
    const splitLabel = label.split(":");
    const baseLabel = splitLabel[0].toLowerCase().trim();
    delete mapping[baseLabel];
  }
  return mapping;
}

function getMapping() {
  const labelMapping: mapping = {};
  for (var key in process.env) {
    if (key.indexOf("INPUT_MAP") == 0) {
      const mapData = process.env[key] as string;
      console.log(mapData);
      //const [labelType, missingLabel] = mapData.split("~");
      //labelMapping[labelType.trim()] = missingLabel.trim();
    }
  }
  console.log(labelMapping);
  return labelMapping;
}

main();
