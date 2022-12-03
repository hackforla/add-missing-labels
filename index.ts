import * as core from "@actions/core";
import * as github from "@actions/github";
import { IssuesEvent, Label } from "@octokit/webhooks-definitions/schema";
import { Api } from "@octokit/plugin-rest-endpoint-methods/dist-types/types";
import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types";

interface mapping {
  [key: string]: string;
}

const label_type_to_label_mapping: mapping = {
  size: "size: missing",
  role: "role missing",
  Feature: "Feature Missing",
};

function main() {
  const myToken = core.getInput("myToken");
  const octokit = github.getOctokit(myToken);
  const repository = github.context.repo;
  const payload = github.context.payload as IssuesEvent;
  const labels = payload.issue.labels?.map((x: Label) => x?.name);

  const leftovers = get_leftover_labels(labels ? labels : []);
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

function get_leftover_labels(labels: string[]) {
  for (const label of labels) {
    const split_label = label.split(":");
    const base_label = split_label[0].toLowerCase().trim();
    delete label_type_to_label_mapping[base_label];
  }
  return label_type_to_label_mapping;
}

main();
