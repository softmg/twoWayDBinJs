# Двухсторонний биндинг в  Vanilla JavaScript

Каждый, кто знает любой js framework (разрабатывал на нем) знает всю прелесть двустороннего биндинга. Давайте попробуем применить его в простом vanilla js.
Для тех, кто до сих пор не знают об этом, двухсторонний датабиндинг означает, что когда вы что-либо меняете в модели, отображение (view) обновляется и при любом изменении в отображении, модель обновляется.
Ну, а теперь давайте попробуем просто реализовать эту функцию в vanilla js. 
Давайте возьмем 4 текстовых поля, в которых легко продемонстрировать способ двухстороннего биндинга. Вот наш маленький кусочек html кода:

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>2 Way Data Binding</title>
</head>
    <body>
        Name: <input class="name" type="text">
        <input class="name" type="text">
        <hr/>
        Age: <input class="age" type="text">
        <input class="age" type="text">
        <hr />
        <button onclick="log()">See $scope Values</button>
        <hr />
        <button onclick="changeNameByCode()">Set Name property to Hurry</button>
        <hr />
        <button onclick="changeAgeByCode()">Set Age property to 23</button>
        <script src="/dist/app.bundle.js"></script>
        <hr />
    </body>
</html>
```
Теперь давайте посмотрим на наш волшебный код JavaScript, который будет делать магию для нас:
```javascript
class TwoWayDatabinding {
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
```
Использовать класс `TwoWayDatabinding` мы можем так:
```javascript
import TwoWayDatabinding from './twoWayDatabinding.js';

const bindClasses = ["name", "age"];
TwoWayDatabinding.attachEvent(bindClasses);
```

**Вот подробное объяснение кода выше:**
* В массиве bindClasses находятся классы элементов, к которым мы должны применить двухсторонний биндинг.
* В функции attachEvent мы проходимся по массиву классов и для каждого извлекаем все элементы по названию класса document.getElementsByClassName(className).
* На каждый класс мы добавляем в объект $scope setter для соответствующего поля.
* Для каждого найденного элемента на событие onkeyup изменяется соответсвующее поле в объекте $scope.

**Объяснение функции addScopeToProperty:**
* Проверяем есть ли в $scope заданное поле
* Объявляем переменную “value” которая может измениться в callback сеттера.
* Затем в функции  “Object.defineProperty” устанавливается callback  сеттера в которой устанавливается новое значение переменной value и устанавливает значение всех элементов с заданным классом.
* В геттере возвращается значение переменной value.
* Для разрешение итерации по полям $scope устанавливаем значение enumerable в true.

**Deployment:**
* npm i
* npm run start:dev
* Перейти по адресу http://localhost:8080 (порт может отличаться)

Ссылка на [jsfiddle](https://jsfiddle.net/64zdm3so)
