'use strict';
var Reporter = require('code-copter-sdk').Reporter;

exports.create = create;

function create (spec) {
    return createPlugin(spec) || 
        createPackaged(spec) ||
        createInline(spec);
}

function createInline (inline) {
    var reporter = null;

    if (typeof inline === 'function') {
        reporter = new Reporter({
            report: inline
        });
    }

    return reporter;
}

function createPackaged (name) {
    var reporters = require('./reporters');

    return reporters[name] || null;
}

function createPlugin (name) {
    var plugin = require('./plugin-factory').create('reporter', name);

    if (plugin) {
        try {
            return plugin instanceof Reporter ? plugin : new Reporter(plugin);
        }
        catch (ignore) {
            console.warn(`Module found for "${name}" is not a code-copter reporter plugin`);
        }
    }

    return null;
}
