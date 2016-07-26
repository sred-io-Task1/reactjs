/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactComponentTreeTestUtils
 */

'use strict';

var ReactComponentTreeDevtoolDev = require('ReactComponentTreeDevtoolDev');

function getRootDisplayNames() {
  return ReactComponentTreeDevtoolDev.getRootIDs()
    .map(ReactComponentTreeDevtoolDev.getDisplayName);
}

function getRegisteredDisplayNames() {
  return ReactComponentTreeDevtoolDev.getRegisteredIDs()
    .map(ReactComponentTreeDevtoolDev.getDisplayName);
}

function expectTree(rootID, expectedTree, parentPath) {
  var displayName = ReactComponentTreeDevtoolDev.getDisplayName(rootID);
  var ownerID = ReactComponentTreeDevtoolDev.getOwnerID(rootID);
  var parentID = ReactComponentTreeDevtoolDev.getParentID(rootID);
  var childIDs = ReactComponentTreeDevtoolDev.getChildIDs(rootID);
  var text = ReactComponentTreeDevtoolDev.getText(rootID);
  var element = ReactComponentTreeDevtoolDev.getElement(rootID);
  var path = parentPath ? `${parentPath} > ${displayName}` : displayName;

  function expectEqual(actual, expected, name) {
    // Get Jasmine to print descriptive error messages.
    // We pass path so that we know where the mismatch occurred.
    expect({
      path,
      [name]: actual,
    }).toEqual({
      path,
      [name]: expected,
    });
  }

  if (expectedTree.parentDisplayName !== undefined) {
    expectEqual(
      ReactComponentTreeDevtoolDev.getDisplayName(parentID),
      expectedTree.parentDisplayName,
      'parentDisplayName'
    );
  }
  if (expectedTree.ownerDisplayName !== undefined) {
    expectEqual(
      ReactComponentTreeDevtoolDev.getDisplayName(ownerID),
      expectedTree.ownerDisplayName,
      'ownerDisplayName'
    );
  }
  if (expectedTree.parentID !== undefined) {
    expectEqual(parentID, expectedTree.parentID, 'parentID');
  }
  if (expectedTree.text !== undefined) {
    expectEqual(text, expectedTree.text, 'text');
    expectEqual('' + element, expectedTree.text, 'element.toString()');
  } else {
    expectEqual(text, null, 'text');
  }
  if (expectedTree.element !== undefined) {
    // TODO: Comparing elements makes tests run out of memory on errors.
    // For now, compare just types.
    expectEqual(
      element && element.type,
      expectedTree.element && expectedTree.element.type,
      'element.type'
    );
  } else if (text == null) {
    expectEqual(typeof element, 'object', 'typeof element');
  }
  if (expectedTree.children !== undefined) {
    expectEqual(
      childIDs.length,
      expectedTree.children.length,
      'children.length'
    );
    for (var i = 0; i < childIDs.length; i++) {
      expectTree(
        childIDs[i],
        {parentID: rootID, ...expectedTree.children[i]},
        path
      );
    }
  } else {
    expectEqual(childIDs, [], 'childIDs');
  }
}

var ReactComponentTreeTestUtils = {
  expectTree,
  getRootDisplayNames,
  getRegisteredDisplayNames,
};

module.exports = ReactComponentTreeTestUtils;
