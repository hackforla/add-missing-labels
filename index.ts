import * as core from "@actions/core";
import * as github from "@actions/github";

const label_type_to_label_mapping = {
  size: "size: missing",
  role: "role missing",
  Feature: "Feature Missing",
};

function main() {
  const myToken = core.getInput("myToken");
  const octokit = github.getOctokit(myToken);
  const payload = github.context.payload;
  console.log(JSON.stringify(payload));
}

function get_leftover_labels() {}

main();
