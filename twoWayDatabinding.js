let $scope = {};

export default class TwoWayDatabinding {
    static attachEvent (classNames) {
        classNames.forEach((className) => {
            const elementsByClass = Array.from(document.getElementsByClassName(className));

            addScopeToProperty(className);
            elementsByClass.forEach(elementToBind => elementToBind.onkeyup = function () {
                    $scope[className] = elementToBind.value;
                }
            )

            function addScopeToProperty(prop) {
                if (!$scope.hasOwnProperty(prop)) {
                    let value;
                    Object.defineProperty($scope, prop, {
                        set: (newValue) => {
                            elementsByClass.forEach(el => el.value = newValue);
                            value = newValue;
                            console.log('Set element with classname "%s" value "%s"', className, newValue);
                        },
                        get: () => value,
                        enumerable: true
                    });
                }
            }
        });
    };
}

window.log = function() {
    Object.keys($scope).forEach((key) =>
        console.log(key + ': ' + $scope[key])
    );
}

window.changeNameByCode = function() {
    $scope.name = 'Hurry';
}

window.changeAgeByCode = function() {
    $scope.age = 23;
}
