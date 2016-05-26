/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */
'use strict';

var glob = require('glob');
var ReactGlobPatterns = require('./ReactGlobPatterns');

function getFilePaths()/* : Array<string> */ {
  return glob.sync(ReactGlobPatterns.includePattern, {
    ignore: ReactGlobPatterns.ignorePatterns,
  });
}

module.exports = getFilePaths;
