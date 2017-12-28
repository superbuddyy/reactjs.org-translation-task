const assert = require('assert')
const Utility = require('../../lib/utility')

describe('Utility', function () {
  let https = 'https://github.com/vuejs/jp.vuejs.org.git'
  let git = 'git@github.com:vuejs/jp.vuejs.org.git'

  describe('extractBasename()', function () {
    it('returns basename', function () {
      let basename = 'jp.vuejs.org.git'
      assert(Utility.extractBasename(https) === basename)
      assert(Utility.extractBasename(git) === basename)
    })
  })

  describe('extractRepoName()', function () {
    it(`returns repo's name`, function () {
      let repoName = 'jp.vuejs.org'
      assert(Utility.extractRepoName(https) === repoName)
      assert(Utility.extractRepoName(git) === repoName)
    })
  })

  describe('extractRepoOwner()', function () {
    it(`returns repo's owner`, function () {
      let repoOwner = 'vuejs'
      assert(Utility.extractRepoOwner(https) === repoOwner)
      assert(Utility.extractRepoOwner(git) === repoOwner)
    })
  })

  describe('removeHash()', function () {
    it(`returns the text with hash removed`, function () {
      assert(Utility.removeHash('Text which contains hash with space (#110)') === 'Text which contains hash with space')
      assert(Utility.removeHash('Text which contains hash with no space(#110)') === 'Text which contains hash with no space')
      assert(Utility.removeHash('Text which does not contain hash') === 'Text which does not contain hash')
    })
  })
})
