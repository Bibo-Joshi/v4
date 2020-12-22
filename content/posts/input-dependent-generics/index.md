---
title: Input-Dependent Generics in Python
description: Diving deeper into type hinting
date: '2020-12-22'
draft: false
slug: '/annals/input-dependent-generics'
tags:
  - Python
  - Typing
  - MyPy
---

In [PTB](https://github.com/python-telegram-bot/python-telegram-bot), we have the class `CallbackContext`, which is integral in the framework and we want to allow users to customize it by subclassing and passing the subclass to the `Updater/Dispatcher`. Now type hinting becomes a little bit more difficult, because we need to make sure that the `callbacks` have the annotation `Callable[Update, CallbackContext]` _or_ `Callable[Update, UsersCallbackContext]` and of course we would like to make that dependent on the users input. (For the full details see [ptb/#2068](https://github.com/python-telegram-bot/python-telegram-bot/issues/2068))

First, we think of `Generics`, i.e. we make `Dispatcher` a generic class and use the generic type `T` in the annotations like `callback: Callable[Update, T]`. This works fine, but it still requires the user to tell the type checker, what `T` is, i.e. with

```python
dispatcher = Dispatcher(..., custom_type = UsersCallbackContext)
```

MyPy will ask the user to specify the dispatchers type as follows:

```python
dispatcher: Dispatcher[UsersCallbackContext] = Dispatcher(..., custom_context = UsersCallbackContext)
```

That's unnecessary repetition. Also, we would like to have `T` fall back to `CallbackContext`, if the user doesn't provide a custom class.

After poking around a bit, I came across a solution in [this thread](https://github.com/python/mypy/issues/4236#issuecomment-521628880). The idea is to overload the `self` argument in the `__init__` method as follows:

```python
@overload
def __init__(self: Dispatcher[CallbackContext], *args):  # not listing optional arguments!
    ...

@overload
def __init__(self: Dispatcher[T], ..., custom_context: Type[T]):
    ...
```

This works like a charm :)
