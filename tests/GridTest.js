module('Grid');

test('constructor', function () {
    var rect1 = new $.lt.Rect(1,1,1,1);
    var rect2 = new $.lt.Rect(2,2,2,2);

    var grid1 = new $.lt.Grid();
    var grid2 = new $.lt.Grid([rect1, rect2]);

    deepEqual(grid1.rects, []);
    deepEqual(grid2.rects, [rect1, rect2]);
});

test('getIntersectingRects', function () {
    var rect1 = new $.lt.Rect(0,0,1,1);
    var rect2 = new $.lt.Rect(0,1,1,1);
    var rect3 = new $.lt.Rect(0,0,2,2);
    var rect4 = new $.lt.Rect(0,2,2,2);

    var grid = new $.lt.Grid([rect1, rect2]);

    deepEqual(grid.getIntersectingRects(rect3), [rect1, rect2]);
    deepEqual(grid.getIntersectingRects(rect4), []);
});

/**
 * ┌─────────────┐    ┌─────────────┐
 * │┌──┐┌─┐   ┌─┐│    │┌──┐┌─┐┌─┐┌─┐│
 * ││1 ││2│   │ ││    ││1 ││2││5││ ││
 * │└──┘└─┘   │3││    │└──┘└─┘└─┘│3││
 * │ ┌─┐   ┌─┐│ ││    │ ┌─┐┌─┐   │ ││
 * │ │4│   │5││ ││    │ │4││6│   │ ││
 * │ └─┘   └─┘└─┘├────▶ └─┘└─┘   └─┘│
 * │    ┌─┐      │    │       ┌────┐│
 * │    │6│      │    │       │ 7  ││
 * │    └─┘┌────┐│    │       └────┘│
 * │       │ 7  ││    │             │
 * │       └────┘│    │             │
 * └─────────────┘    └─────────────┘
 */
test('compact', function () {
    var rect1 = new $.lt.Rect(0,0,4,3);
    var rect2 = new $.lt.Rect(4,0,3,3);
    var rect3 = new $.lt.Rect(10,0,3,6);
    var rect4 = new $.lt.Rect(1,3,3,3);
    var rect5 = new $.lt.Rect(7,3,3,3);
    var rect6 = new $.lt.Rect(4,6,3,3);
    var rect7 = new $.lt.Rect(7,8,6,3);

    var grid = new $.lt.Grid([rect1, rect2, rect3, rect4, rect5, rect6, rect7]);

    deepEqual(grid.compact().rects, [
        new $.lt.Rect(0,0,4,3),
        new $.lt.Rect(4,0,3,3),
        new $.lt.Rect(10,0,3,6),
        new $.lt.Rect(1,3,3,3),
        new $.lt.Rect(7,0,3,3),
        new $.lt.Rect(4,3,3,3),
        new $.lt.Rect(7,6,6,3)
    ]);
});

/**
 * ┌─────────────┐    ┌─────────────┐
 * │    ┌─┐   ┌─┐│    │ ┌─┐┌─┐┌─┐┌─┐│
 * │    │2│   │ ││    │ │4││2││5││ ││
 * │    └─┘   │3││    │ └─┘└─┘└─┘│3││
 * │ ┌─┐   ┌─┐│ ││    │┌──┐┌─┐   │ ││
 * │ │4│   │5││ ││    ││1 ││6│   │ ││
 * │ └─┘   └─┘└─┘├────▶└──┘└─┘   └─┘│
 * │    ┌─┐      │    │       ┌────┐│
 * │    │6│      │    │       │ 7  ││
 * │┌──┐└─┘┌────┐│    │       └────┘│
 * ││1 │   │ 7  ││    │             │
 * │└──┘   └────┘│    │             │
 * └─────────────┘    └─────────────┘
 */
test('compact', function () {
    var rect1 = new $.lt.Rect(0,8,4,3);
    var rect2 = new $.lt.Rect(4,0,3,3);
    var rect3 = new $.lt.Rect(10,0,3,6);
    var rect4 = new $.lt.Rect(1,3,3,3);
    var rect5 = new $.lt.Rect(7,3,3,3);
    var rect6 = new $.lt.Rect(4,6,3,3);
    var rect7 = new $.lt.Rect(7,8,6,3);

    var grid = new $.lt.Grid([rect1, rect2, rect3, rect4, rect5, rect6, rect7]);

    deepEqual(grid.compact().rects, [
        new $.lt.Rect(0,3,4,3),
        new $.lt.Rect(4,0,3,3),
        new $.lt.Rect(10,0,3,6),
        new $.lt.Rect(1,0,3,3),
        new $.lt.Rect(7,0,3,3),
        new $.lt.Rect(4,3,3,3),
        new $.lt.Rect(7,6,6,3)
    ]);
});

/**
 * ┌─────────────┐
 * │┌──┐┌─┐   ┌─┐│
 * ││1 ││2│   │ ││
 * │└──┘└─┘   │3││
 * │ ┌─┐   ┌─┐│ ││
 * │ │4│   │5││ ││
 * │ └─┘   └─┘└─┘│
 * │    ┌─┐      │
 * │    │6│      │
 * │    └─┘┌────┐│
 * │       │ 7  ││
 * │       └────┘│
 * └─────────────┘
 */
test('height', function () {
    var rect1 = new $.lt.Rect(0,0,4,3);
    var rect2 = new $.lt.Rect(4,0,3,3);
    var rect3 = new $.lt.Rect(10,0,3,6);
    var rect4 = new $.lt.Rect(1,3,3,3);
    var rect5 = new $.lt.Rect(7,3,3,3);
    var rect6 = new $.lt.Rect(4,6,3,3);
    var rect7 = new $.lt.Rect(7,8,6,3);

    var grid1 = new $.lt.Grid([rect1, rect2]);
    var grid2 = new $.lt.Grid([rect1, rect2, rect3, rect4]);
    var grid3 = new $.lt.Grid([rect1, rect2, rect3, rect4, rect5, rect6]);
    var grid4 = new $.lt.Grid([rect1, rect2, rect3, rect4, rect5, rect6, rect7]);

    equal(grid1.height(), 3);
    equal(grid2.height(), 6);
    equal(grid3.height(), 9);
    equal(grid4.height(), 11);
});

/**
 * Initial        moved
 * ┌─────────────┐┌─────────────┐
 * │┌──┐╔═╗   ┌─┐││┌──┐      ┌─┐│
 * ││1 │║2║   │ ││││1 │      │ ││
 * │└──┘╚═╝   │3│││└──┘      │3││
 * │ ┌─┐   ┌─┐│ │││ ┌─┐   ┌─┐│ ││
 * │ │4│   │5││ │││ │4│╔═╗│5││ ││
 * │ └─┘   └─┘└─┘││ └─┘║2║└─┘└─┘│
 * │    ┌─┐      ││    ╚═╝      │
 * │    │6│      ││    ┌─┐      │
 * │    └─┘┌────┐││    │6│┌────┐│
 * │       │ 7  │││    └─┘│ 7  ││
 * │       └────┘││       └────┘│
 * │             ││             │
 * │             ││             │
 * └─────────────┘└─────────────┘
 */
test('move-1', function () {
    var grid = new $.lt.Grid([
        new $.lt.Rect(0,0,4,3),
        new $.lt.Rect(4,0,3,3),
        new $.lt.Rect(10,0,3,6),
        new $.lt.Rect(1,3,3,3),
        new $.lt.Rect(7,3,3,3),
        new $.lt.Rect(4,6,3,3),
        new $.lt.Rect(7,8,6,3),
    ]);

    deepEqual(
        grid.move(grid.rects[1], 4, 4).rects,
        [
            new $.lt.Rect(0,0,4,3),
            new $.lt.Rect(4,4,3,3),
            new $.lt.Rect(10,0,3,6),
            new $.lt.Rect(1,3,3,3),
            new $.lt.Rect(7,3,3,3),
            new $.lt.Rect(4,7,3,3),
            new $.lt.Rect(7,8,6,3)
        ]
    );
});

/**
 * Initial        moved
 * ┌─────────────┐┌─────────────┐
 * │┌──┐╔═╗   ┌─┐││┌──┐         │
 * ││1 │║2║   │ ││││1 │     ╔═╗ │
 * │└──┘╚═╝   │3│││└──┘     ║2║ │
 * │ ┌─┐   ┌─┐│ │││ ┌─┐     ╚═╝ │
 * │ │4│   │5││ │││ │4│   ┌─┐┌─┐│
 * │ └─┘   └─┘└─┘││ └─┘   │5││ ││
 * │    ┌─┐      ││    ┌─┐└─┘│3││
 * │    │6│      ││    │6│   │ ││
 * │    └─┘┌────┐││    └─┘   │ ││
 * │       │ 7  │││          └─┘│
 * │       └────┘││       ┌────┐│
 * │             ││       │ 7  ││
 * │             ││       └────┘│
 * └─────────────┘└─────────────┘
 */
test('move-2', function () {
    var grid = new $.lt.Grid([
        new $.lt.Rect(0,0,4,3),
        new $.lt.Rect(4,0,3,3),
        new $.lt.Rect(10,0,3,6),
        new $.lt.Rect(1,3,3,3),
        new $.lt.Rect(7,3,3,3),
        new $.lt.Rect(4,6,3,3),
        new $.lt.Rect(7,8,6,3),
    ]);

    deepEqual(
        grid.move(grid.rects[1], 9, 1).rects,
        [
            new $.lt.Rect(0,0,4,3),
            new $.lt.Rect(9,1,3,3),
            new $.lt.Rect(10,4,3,6),
            new $.lt.Rect(1,3,3,3),
            new $.lt.Rect(7,4,3,3),
            new $.lt.Rect(4,6,3,3),
            new $.lt.Rect(7,10,6,3),
        ]
    );
});


/**
 * Initial        moved
 * ┌─────────────┐┌─────────────┐
 * │┌──┐╔═╗   ┌─┐││ ╔═╗      ┌─┐│
 * ││1 │║2║   │ │││ ║2║      │ ││
 * │└──┘╚═╝   │3│││ ╚═╝      │3││
 * │ ┌─┐   ┌─┐│ │││┌──┐   ┌─┐│ ││
 * │ │4│   │5││ ││││1 │   │5││ ││
 * │ └─┘   └─┘└─┘││└──┘   └─┘└─┘│
 * │    ┌─┐      ││ ┌─┐┌─┐      │
 * │    │6│      ││ │4││6│      │
 * │    └─┘┌────┐││ └─┘└─┘┌────┐│
 * │       │ 7  │││       │ 7  ││
 * │       └────┘││       └────┘│
 * │             ││             │
 * │             ││             │
 * └─────────────┘└─────────────┘
 */
test('move-3', function () {
    var grid = new $.lt.Grid([
        new $.lt.Rect(0,0,4,3),
        new $.lt.Rect(4,0,3,3),
        new $.lt.Rect(10,0,3,6),
        new $.lt.Rect(1,3,3,3),
        new $.lt.Rect(7,3,3,3),
        new $.lt.Rect(4,6,3,3),
        new $.lt.Rect(7,8,6,3),
    ]);

    deepEqual(
        grid.move(grid.rects[1], 1, 0).rects,
        [
            new $.lt.Rect(0,3,4,3),
            new $.lt.Rect(1,0,3,3),
            new $.lt.Rect(10,0,3,6),
            new $.lt.Rect(1,6,3,3),
            new $.lt.Rect(7,3,3,3),
            new $.lt.Rect(4,6,3,3),
            new $.lt.Rect(7,8,6,3),
        ]
    );
});
