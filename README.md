# About WhenYouSeeMeJS

A jQuery plugin which allows you to add a class to a specific selector when it's in viewport. This allows a lot of flexibility in which you can control the animation completely via CSS and use javascript only to activate the animation when the class is added.

## Basic Usage

```javascript
$('selector').whenyouseeme('myClass',optionsObj);
```

## Options

| Option    | Defaults  | Description |
| --------- | --------- | ----------- |
| container | window    | Window is the default viewport. However, you can use a selector such as ".test" in the case of an element being the view port. |
| allDone   | undefined | Here you can add a callback function when all elements of the current selector have reached the viewport. |
| delay     | 500       | The delay between adding the class to the next element. Example: 1000 = 1 sec. |