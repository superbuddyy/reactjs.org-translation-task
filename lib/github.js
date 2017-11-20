const GitHubApi = require('github')
const Promise = require('bluebird')

class GitHub {
  constructor() {
    this.github = new GitHubApi({ Promise: Promise })
  }

  authenticate(options = {}) {
    this.github.authenticate({
      type: options.type,
      token: options.token,
    })
  }

  createIssue(remote, params = {}) {
    return new Promise((resolve, reject) => {
      this.github.issues.create({
        owner: remote.upstream.owner,
        repo: remote.upstream.name,
        title: params.title,
        body: params.body,
        labels: params.labels,
      })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }

  closeIssue(remote, params = {}) {
    return new Promise((resolve, reject) => {
      this.github.issues.edit({
        owner: remote.upstream.owner,
        repo: remote.upstream.name,
        number: params.number,
        state: 'closed',
      })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }

  searchIssue(remote, params = {}) {
    return new Promise((resolve, reject) => {
      this.github.search.issues({
        q: `${params.hash} repo:${remote.upstream.owner}/${remote.upstream.name} type:issue`,
      })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }

  createPullRequest(remote, params = {}) {
    return new Promise((resolve, reject) => {
      this.github.pullRequests.create({
        owner: remote.upstream.owner,
        repo: remote.upstream.name,
        title: params.title,
        body: params.body,
        head: `${remote.origin.owner}:${params.branch}`,
        base: remote.upstream.defaultBranch,
      })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }

  closePullRequest(remote, params = {}) {
    return new Promise((resolve, reject) => {
      this.github.pullRequests.update({
        owner: remote.upstream.owner,
        repo: remote.upstream.name,
        number: params.number,
        state: 'closed',
      })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }

  assignReviewers(remote, params = {}) {
    return new Promise((resolve, reject) => {
      this.github.pullRequests.createReviewRequest({
        owner: remote.upstream.owner,
        repo: remote.upstream.name,
        number: params.number,
        reviewers: params.reviewers,
      })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }
}

module.exports = GitHub
