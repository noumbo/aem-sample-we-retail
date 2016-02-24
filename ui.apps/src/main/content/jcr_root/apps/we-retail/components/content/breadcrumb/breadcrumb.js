"use strict";


use(function() {
    // get starting point of trail
    var level = currentStyle.get("absParent", 2);
    var endLevel = currentStyle.get("relParent", 1);
    var delimStr = currentStyle.get("delim", "/");
    var trailStr = currentStyle.get("trail", "");
    var currentLevel = currentPage.getDepth();

    var ret = {
        delim: delimStr,
        trail: trailStr,
        crumbs: []
    };

    while (level < currentLevel - endLevel) {
        var trail = currentPage.getAbsoluteParent(level);
        if (trail == null) {
            break;
        }

        var title = trail.getNavigationTitle();
        if (title == null || title.equals("")) {
            title = trail.getNavigationTitle();
        }
        if (title == null || title.equals("")) {
            title = trail.getTitle();
        }
        if (title == null || title.equals("")) {
            title = trail.getName();
        }
        ret.crumbs.push({
            title: title,
            trail: trail
        });

        level++;
    }

    return ret;
});