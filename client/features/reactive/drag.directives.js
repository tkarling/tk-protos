function dragContainer(rx) {
    return {
        restrict: "A",

        link: function (scope, element, attrs) {
            var spriteContainer = element[0];
            //console.log("dragContainer", spriteContainer);
            var sprite = spriteContainer.children[0];
            //console.log("dragContainer", sprite.childNodes[0].data);

            var spriteMouseDowns = rx.Observable.fromEvent(sprite, "mousedown"),
                spriteContainerMouseMoves = rx.Observable.fromEvent(spriteContainer, "mousemove"),
                spriteContainerMouseUps = rx.Observable.fromEvent(spriteContainer, "mouseup"),
            // Create a sequence that looks like this:
            // seq([ {pageX: 22, pageY:4080 },,,{pageX: 24, pageY: 4082},,, ])
                spriteMouseDrags =
                    // For every mouse down event on the sprite...
                    spriteMouseDowns.
                        concatMap(function(contactPoint) {
                            // ...retrieve all the mouse move events on the sprite container...
                            return spriteContainerMouseMoves.
                                // ...until a mouse up event occurs.
                                takeUntil(spriteContainerMouseUps).
                                map(function(movePoint) {
                                    return {
                                        pageX: movePoint.pageX - contactPoint.offsetX,
                                        pageY: movePoint.pageY - contactPoint.offsetY
                                    };
                                });
                        });

            // For each mouse drag event, move the sprite to the absolute page position.
            spriteMouseDrags.forEach(function(dragPoint) {
                sprite.style.left = dragPoint.pageX + "px";
                sprite.style.top = dragPoint.pageY + "px";
            });


        }
    }
}

export default angular.module('directives.drag', [])
    .directive('dragContainer', dragContainer)
    .name;