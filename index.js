"use strict";
exports.__esModule = true;
var core = require("@actions/core");
var github = require("@actions/github");
var label_type_to_label_mapping = {
    size: "size: missing",
    role: "role missing",
    Feature: "Feature Missing"
};
function main() {
    var myToken = core.getInput("myToken");
    var octokit = github.getOctokit(myToken);
    var payload = github.context.payload;
    console.log(JSON.stringify(payload));
}
function get_leftover_labels() { }
main();
