<img src="https://i.kym-cdn.com/photos/images/facebook/002/043/165/0ee.jpg" width="100" align="right">

# Dababy

Data binding so simple even DaBaby could do it!

> Note: This name was just made off of a whim, not aimed at offending anyone. If you're looking for something a bit more comprehensive, but not to the level of Vue or Angular, check out [Lucia](https://github.com/aidenybai/lucia)

## Installation

Put this script tag between the `<head>` tags of your webpage.

```html
<script src="https://unpkg.com/dababy"></script>
```

## Dababy Quote Generator Example

```html
<div data="{ quotes: ['LES GO', 'LESS GO', 'LESSS GO'] }">
  <button ref="quote" bind="{
    onclick: () => {
      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      refs.quote.innerHTML = quote;
    }
  }"><button>
</div>
```

## Features

### Data

Add the `data` attribute to an element to get started. The value of the attribute should be an object literal. Anything under that element will be able to access the data as global variables when binding.

**Example:**

```html
<div data="{ name: 'Dababy' }">
  <!-- content here -->
</div>
```

### Bind

Add the `bind` attribute to an element to bind properties, basically anything you can access in JavaScript like `innerHTML`, `onclick`, `style`, `id`, etc. This will attach it to the element

**Example:**

```html
<div data="{ name: 'Dababy' }">
  <p bind="{ innerHTML: name }"><!-- Dababy --></p>
</div>
```

### Refs

Add the `ref` attribute to create markers that act like shorthands for `document.querySelector`. Attach it to an element and name it in the attribute value, then access it later by doing `refs.<name>`

**Example:**

```html
<div data="{ name: 'Dababy' }">
  <p ref="name">: I am a god</p>
  <p bind="{ innerHTML: name + refs.name.innerHTML }"><!-- Dababy: I am a god --></p>
</div>
```

---

© 2021 Aiden Bai
